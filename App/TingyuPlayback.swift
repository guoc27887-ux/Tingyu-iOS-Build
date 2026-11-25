import AVFoundation
import MediaPlayer

/// Lock-screen / control-center now-playing, shared by the native AVPlayer
/// engine and the web-engine state sync (FoliaNative.updatePlaybackState).
final class NowPlaying {
    static let shared = NowPlaying()
    private var artworkCache: [String: MPMediaItemArtwork] = [:]

    func update(title: String, artist: String, album: String, coverUrl: String?,
                playing: Bool, positionSec: Double, durationSec: Double) {
        var info: [String: Any] = [
            MPMediaItemPropertyTitle: title,
            MPMediaItemPropertyArtist: artist,
            MPMediaItemPropertyAlbumTitle: album,
            MPNowPlayingInfoPropertyElapsedPlaybackTime: max(0, positionSec),
            MPNowPlayingInfoPropertyPlaybackRate: playing ? 1.0 : 0.0,
            MPMediaItemPropertyPlaybackDuration: max(0, durationSec),
        ]
        if let coverUrl = coverUrl, !coverUrl.isEmpty {
            if let art = artworkCache[coverUrl] {
                info[MPMediaItemPropertyArtwork] = art
            } else {
                fetchArtwork(coverUrl) { [weak self] art in
                    guard let self = self, let art = art else { return }
                    self.artworkCache[coverUrl] = art
                    var current = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [:]
                    current[MPMediaItemPropertyArtwork] = art
                    MPNowPlayingInfoCenter.default().nowPlayingInfo = current
                }
            }
        }
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
    }

    func clear() {
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
    }

    private func fetchArtwork(_ urlString: String, completion: @escaping (MPMediaItemArtwork?) -> Void) {
        guard let url = URL(string: urlString) else { completion(nil); return }
        URLSession.shared.dataTask(with: url) { data, _, _ in
            guard let data = data, let image = UIImage(data: data) else { completion(nil); return }
            completion(MPMediaItemArtwork(boundsSize: image.size) { _ in image })
        }.resume()
    }
}

/// AVPlayer-backed playback engine standing in for the Android
/// FoliaPlaybackService + ExoPlayer stack.
final class PlaybackEngine {
    let player = AVPlayer()
    private(set) var tracks: [[String: Any]] = []
    private(set) var currentIndex = -1
    private(set) var mode = "off"          // off | all | one | shuffle
    private(set) var loopAll = false
    private(set) var quality = ""
    var onStateChange: (() -> Void)?
    /// Fired for lock-screen commands when the native queue is empty
    /// (web engine is driving) — forwarded to JS as a mediaAction event.
    var onRemoteAction: ((_ action: String, _ positionMs: Double?) -> Void)?

    private var timeObserver: Any?
    private var endObserver: NSObjectProtocol?
    private var statusObserver: NSKeyValueObservation?

    init() {
        player.actionAtItemEnd = .none
        timeObserver = player.addPeriodicTimeObserver(
            forInterval: CMTime(seconds: 1, preferredTimescale: 10),
            queue: .main) { [weak self] _ in self?.onStateChange?() }
        endObserver = NotificationCenter.default.addObserver(
            forName: .AVPlayerItemDidPlayToEndTime, object: nil, queue: .main) { [weak self] note in
            guard let self = self,
                  let item = note.object as? AVPlayerItem,
                  item == self.player.currentItem else { return }
            self.handleItemEnd()
        }
        setupRemoteCommands()
    }

    // MARK: playlist

    func setPlaylist(tracks: [[String: Any]], mode: String?, loopAll: Bool?, quality: String?,
                     startKey: String?) {
        self.tracks = tracks
        if let mode = mode { self.mode = mode }
        if let loopAll = loopAll { self.loopAll = loopAll }
        if let quality = quality { self.quality = quality }
        if tracks.isEmpty {
            currentIndex = -1
            player.pause()
            player.replaceCurrentItem(with: nil)
            NowPlaying.shared.clear()
            onStateChange?()
            return
        }
        var start = 0
        if let key = startKey, let idx = tracks.firstIndex(where: { ($0["songKey"] as? String) == key }) {
            start = idx
        }
        play(index: start, autoplay: true)
    }

    func setMode(_ mode: String) {
        self.mode = mode
        onStateChange?()
    }

    // MARK: transport

    func play(index: Int, autoplay: Bool) {
        guard tracks.indices.contains(index) else { return }
        currentIndex = index
        guard let url = Self.resolveURL(tracks[index]) else {
            // Unresolvable track (needs LX/platform resolution): skip forward.
            if index + 1 < tracks.count { play(index: index + 1, autoplay: autoplay) }
            onStateChange?()
            return
        }
        let item = AVPlayerItem(url: url)
        player.replaceCurrentItem(with: item)
        statusObserver = item.observe(\.status, options: [.new]) { [weak self] item, _ in
            if item.status == .failed { self?.handleItemEnd() }
        }
        if autoplay { player.play() }
        syncNowPlaying()
        onStateChange?()
    }

    func resume() { player.play(); syncNowPlaying(); onStateChange?() }
    func pause() { player.pause(); syncNowPlaying(); onStateChange?() }
    func stop() {
        player.pause()
        player.replaceCurrentItem(with: nil)
        currentIndex = -1
        NowPlaying.shared.clear()
        onStateChange?()
    }

    func seek(toMs ms: Double) {
        let time = CMTime(seconds: ms / 1000.0, preferredTimescale: 1000)
        player.seek(to: time, toleranceBefore: .zero, toleranceAfter: .zero) { [weak self] _ in
            self?.syncNowPlaying()
            self?.onStateChange?()
        }
    }

    func next() {
        guard !tracks.isEmpty else { onRemoteAction?("next", nil); return }
        if mode == "shuffle" {
            play(index: Int.random(in: 0..<tracks.count), autoplay: true)
            return
        }
        let n = currentIndex + 1
        if n < tracks.count { play(index: n, autoplay: true) }
        else if loopAll || mode == "all" { play(index: 0, autoplay: true) }
    }

    func previous() {
        guard !tracks.isEmpty else { onRemoteAction?("previous", nil); return }
        if positionSec > 3 { seek(toMs: 0); return }
        let p = currentIndex - 1
        if p >= 0 { play(index: p, autoplay: true) }
        else if loopAll || mode == "all" { play(index: tracks.count - 1, autoplay: true) }
        else { seek(toMs: 0) }
    }

    private func handleItemEnd() {
        if mode == "one" {
            seek(toMs: 0)
            player.play()
            return
        }
        let wasLast = currentIndex >= tracks.count - 1
        if wasLast && !(loopAll || mode == "all") {
            player.pause()
            onStateChange?()
            return
        }
        next()
    }

    // MARK: state

    var isPlaying: Bool { player.timeControlStatus == .playing }
    var positionSec: Double {
        let t = player.currentTime().seconds
        return t.isFinite ? max(0, t) : 0
    }
    var durationSec: Double {
        if let d = player.currentItem?.duration.seconds, d.isFinite { return max(0, d) }
        if currentIndex >= 0, tracks.indices.contains(currentIndex),
           let ms = (tracks[currentIndex]["durationMs"] as? NSNumber)?.doubleValue {
            return ms / 1000.0
        }
        return 0
    }
    var currentTrack: [String: Any]? {
        tracks.indices.contains(currentIndex) ? tracks[currentIndex] : nil
    }
    var currentKey: String { (currentTrack?["songKey"] as? String) ?? "" }

    /// State payload shaped for the web layer's native-state transform
    /// (live / snapshot / liveTrack fields, see nativePlaybackBridge).
    func statePayload() -> [String: Any] {
        let queue: [[String: Any]] = tracks.map { t in
            ["songKey": (t["songKey"] as? String) ?? "", "song": t]
        }
        var payload: [String: Any] = [
            "status": tracks.isEmpty ? "empty" : (isPlaying ? "playing" : "paused"),
            "liveMode": mode,
            "liveLoopAll": loopAll,
            "snapshot": [
                "queue": queue,
                "currentKey": currentKey,
                "positionMs": positionSec * 1000,
                "mode": mode,
                "loopMode": (mode == "one") ? "one" : (loopAll || mode == "all" ? "all" : "off"),
                "order": tracks.map { ($0["songKey"] as? String) ?? "" },
            ],
        ]
        if let t = currentTrack {
            payload["live"] = [
                "songKey": currentKey,
                "position": positionSec,
                "duration": durationSec,
            ]
            payload["liveTrack"] = [
                "providerId": (t["providerId"] as? String) ?? "",
                "mediaId": (t["mediaId"] as? String) ?? "",
                "title": (t["title"] as? String) ?? (t["name"] as? String) ?? "",
                "artist": (t["artist"] as? String) ?? "",
                "album": (t["album"] as? String) ?? "",
                "artwork": (t["artwork"] as? String) ?? (t["coverUrl"] as? String) ?? "",
                "durationMs": durationSec * 1000,
                "providerData": (t["providerData"] as? [String: Any]) ?? [:],
            ]
        }
        return payload
    }

    func syncNowPlaying() {
        guard let t = currentTrack else { return }
        NowPlaying.shared.update(
            title: (t["title"] as? String) ?? (t["name"] as? String) ?? "",
            artist: (t["artist"] as? String) ?? "",
            album: (t["album"] as? String) ?? "",
            coverUrl: (t["artwork"] as? String) ?? (t["coverUrl"] as? String),
            playing: isPlaying,
            positionSec: positionSec,
            durationSec: durationSec)
    }

    // MARK: remote commands

    private func setupRemoteCommands() {
        let center = MPRemoteCommandCenter.shared()
        center.playCommand.addTarget { [weak self] _ in
            guard let self = self else { return .commandFailed }
            if self.tracks.isEmpty { self.onRemoteAction?("play", nil); return .success }
            self.resume(); return .success
        }
        center.pauseCommand.addTarget { [weak self] _ in
            guard let self = self else { return .commandFailed }
            if self.tracks.isEmpty { self.onRemoteAction?("pause", nil); return .success }
            self.pause(); return .success
        }
        center.togglePlayPauseCommand.addTarget { [weak self] _ in
            guard let self = self else { return .commandFailed }
            if self.tracks.isEmpty { self.onRemoteAction?("toggle", nil); return .success }
            self.isPlaying ? self.pause() : self.resume(); return .success
        }
        center.nextTrackCommand.addTarget { [weak self] _ in
            self?.next(); return .success
        }
        center.previousTrackCommand.addTarget { [weak self] _ in
            self?.previous(); return .success
        }
        center.changePlaybackPositionCommand.addTarget { [weak self] event in
            guard let self = self else { return .commandFailed }
            let pos = (event as? MPChangePlaybackPositionCommandEvent)?.positionTime ?? 0
            if self.tracks.isEmpty { self.onRemoteAction?("seek", pos * 1000); return .success }
            self.seek(toMs: pos * 1000); return .success
        }
    }

    // MARK: URL resolution

    static func resolveURL(_ track: [String: Any]) -> URL? {
        let directKeys = ["url", "playUrl", "src", "fileUrl", "localPath", "path"]
        for key in directKeys {
            if let s = track[key] as? String, !s.isEmpty, let u = asURL(s) { return u }
        }
        if let pd = track["providerData"] as? [String: Any] {
            for key in directKeys {
                if let s = pd[key] as? String, !s.isEmpty, let u = asURL(s) { return u }
            }
            if let ref = pd["localAudioRef"] as? String, let u = asURL(ref) { return u }
        }
        return nil
    }

    private static func asURL(_ s: String) -> URL? {
        if s.hasPrefix("http://") || s.hasPrefix("https://") { return URL(string: s) }
        if s.hasPrefix("/") { return URL(fileURLWithPath: s) }
        if s.hasPrefix("file://") { return URL(string: s) }
        return nil
    }
}

/// TingyuPlayback plugin: native playback + LX runtime host + resolver/cache surface.
final class TingyuPlayback: CapPlugin {
    let pluginName = "TingyuPlayback"
    let methodNames = ["audioCacheAppend", "audioCacheBegin", "audioCacheFinish", "audioCacheRelease",
                       "audioOffline", "cacheSongLyrics", "cancelLxHttp", "cancelLxValidation",
                       "cancelSleepTimer", "checkpointPlaybackRecovery", "clearListeningSessions",
                       "clearPlaybackDiagnostics", "command", "compatiblePlayback", "configureUsbAudio",
                       "diagnostics", "dolbyCapabilities", "drainListeningSessions", "getSleepTimerState",
                       "lxHttp", "lxSourceStatus", "playbackDiagnostics", "probe", "readPlaybackRecovery",
                       "readSongResources", "reportEngineState", "resetForTest", "resourceCache",
                       "resourceCandidates", "resourcePlatformResult", "resourceSnapshot",
                       "savePlaybackRecovery", "setLxScript", "setNativePlaylist", "setNativePlaylistMode",
                       "setResolverCredentials", "startSleepTimer", "usbAudioState", "validateLxScript"]
    weak var bridge: Bridge?

    let engine = PlaybackEngine()
    private var lxScript: String?
    private var resolverCredentials: [String: Any] = [:]
    private var sleepTimer: Timer?
    private var sleepEndsAt: Date?

    init() {
        engine.onStateChange = { [weak self] in
            guard let self = self else { return }
            self.notify("state", self.engine.statePayload())
        }
    }

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {
        case "setNativePlaylist":
            let tracks = (options["tracks"] as? [[String: Any]]) ?? []
            let startKey = (options["previous"] as? [String: Any])?["songKey"] as? String
                ?? options["startKey"] as? String
            DispatchQueue.main.async { [weak self] in
                self?.engine.setPlaylist(tracks: tracks,
                                         mode: options["mode"] as? String,
                                         loopAll: options["loopAll"] as? Bool,
                                         quality: options["quality"] as? String,
                                         startKey: startKey)
                resolve(self?.engine.statePayload() ?? [:])
            }
        case "setNativePlaylistMode":
            let mode = (options["mode"] as? String) ?? "off"
            DispatchQueue.main.async { [weak self] in
                self?.engine.setMode(mode)
                resolve(self?.engine.statePayload() ?? [:])
            }
        case "command":
            handleCommand(options, resolve: resolve)
        case "probe", "compatiblePlayback":
            if method == "compatiblePlayback", let enabled = options["enabled"] as? Bool {
                _ = enabled // web engine drives playback; native mirrors via FoliaNative state sync
            }
            resolve(engine.statePayload())
        case "lxHttp":
            HTTPHelper.shared.request(options) { result in
                switch result {
                case .success(let out): resolve(out)
                case .failure(let err): reject(err.localizedDescription, "HTTP_ERROR")
                }
            }
        case "cancelLxHttp":
            if let rid = options["requestId"] as? String { HTTPHelper.shared.cancel(requestId: rid) }
            resolve(["ok": true])
        case "setLxScript":
            lxScript = (options["script"] as? String) ?? (options["content"] as? String)
                ?? (options["source"] as? String)
            resolve(["ok": true, "loaded": lxScript != nil])
        case "validateLxScript":
            let script = (options["script"] as? String) ?? (options["content"] as? String) ?? ""
            resolve(["valid": !script.isEmpty, "ok": !script.isEmpty])
        case "cancelLxValidation":
            resolve(["ok": true])
        case "lxSourceStatus":
            resolve(["ready": lxScript != nil, "loaded": lxScript != nil,
                     "status": lxScript != nil ? "ready" : "empty"])
        case "setResolverCredentials":
            resolverCredentials = options
            resolve(["ok": true])
        case "startSleepTimer":
            let minutes = (options["minutes"] as? NSNumber)?.doubleValue
                ?? ((options["durationMs"] as? NSNumber)?.doubleValue ?? 0) / 60000.0
            startSleepTimer(minutes: minutes)
            resolve(sleepTimerState())
        case "cancelSleepTimer":
            sleepTimer?.invalidate(); sleepTimer = nil; sleepEndsAt = nil
            notify("sleepTimerStateChanged", sleepTimerState())
            resolve(sleepTimerState())
        case "getSleepTimerState":
            resolve(sleepTimerState())
        case "drainListeningSessions":
            resolve(["sessions": [Any]()])
        case "readPlaybackRecovery":
            resolve(["found": false])
        case "dolbyCapabilities", "usbAudioState":
            resolve(["supported": false, "enabled": false])
        case "diagnostics", "playbackDiagnostics":
            resolve(["ok": true, "engine": "avplayer-ios"])
        default:
            // resource*, audioCache*, cacheSongLyrics, recovery checkpoints,
            // session/diagnostic bookkeeping: benign no-ops in this build.
            resolve(["ok": true])
        }
    }

    private func handleCommand(_ options: [String: Any], resolve: @escaping PluginResolve) {
        let action = (options["action"] as? String) ?? (options["type"] as? String)
            ?? (options["command"] as? String) ?? ""
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { resolve([:]); return }
            switch action {
            case "play", "resume":
                self.engine.resume()
            case "pause":
                self.engine.pause()
            case "toggle", "togglePlay", "playPause":
                self.engine.isPlaying ? self.engine.pause() : self.engine.resume()
            case "stop":
                self.engine.stop()
            case "next", "skipNext":
                self.engine.next()
            case "previous", "prev", "skipPrevious":
                self.engine.previous()
            case "seek":
                let ms = (options["positionMs"] as? NSNumber)?.doubleValue
                    ?? (options["seekMs"] as? NSNumber)?.doubleValue
                    ?? ((options["position"] as? NSNumber)?.doubleValue ?? 0) * 1000
                self.engine.seek(toMs: ms)
            case "playIndex", "skipTo":
                if let idx = (options["index"] as? NSNumber)?.intValue {
                    self.engine.play(index: idx, autoplay: true)
                }
            default:
                break
            }
            resolve(self.engine.statePayload())
        }
    }

    private func startSleepTimer(minutes: Double) {
        sleepTimer?.invalidate()
        guard minutes > 0 else { sleepEndsAt = nil; return }
        sleepEndsAt = Date().addingTimeInterval(minutes * 60)
        sleepTimer = Timer.scheduledTimer(withTimeInterval: minutes * 60, repeats: false) { [weak self] _ in
            guard let self = self else { return }
            DispatchQueue.main.async { self.engine.pause() }
            self.sleepEndsAt = nil
            self.notify("sleepTimerStateChanged", ["active": false, "expired": true])
        }
        notify("sleepTimerStateChanged", sleepTimerState())
    }

    private func sleepTimerState() -> [String: Any] {
        if let end = sleepEndsAt {
            return ["active": true, "remainingMs": max(0, end.timeIntervalSinceNow * 1000)]
        }
        return ["active": false, "remainingMs": 0]
    }
}
