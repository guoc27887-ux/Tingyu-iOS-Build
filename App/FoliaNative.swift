import UIKit
import Security
import Photos

/// FoliaNative: the app's general-purpose native toolbox.
/// Real implementations: HTTP, cookies, Keychain secure storage, keep-screen-on,
/// window insets, web-engine now-playing sync, share/save.
/// Benign defaults: update/announcement/diagnostic bookkeeping, rear-screen group
/// (cut), local-audio picking/scanning (arrives with the Files integration).
final class FoliaNative: CapPlugin {
    let pluginName = "FoliaNative"
    let methodNames = ["applyPlaybackState", "cancelHttpRequest", "cancelLocalAudioScan",
                       "captureRearFaultDiagnostics", "checkAppUpdate", "clearCrashDiagnostics",
                       "clearDiagnosticData", "clearPlaybackState", "clearRearFaultDiagnostics",
                       "cloudDiagnosticSnapshot", "completePickedAudioImport", "cookiesGet", "cookiesGetAll",
                       "cookiesRemove", "cookiesRemoveBatch", "cookiesSet", "copyLocalAudio",
                       "deleteDiagnosticFiles", "deleteImportedAudio", "diagnosticEvent", "diagnosticSession",
                       "exitApp", "exportDiagnosticPackage", "getAdaptiveLayout", "getAnnouncementSummary",
                       "getAppUpdateStatus", "getCrashDiagnostics", "getDisplayCutout", "getMainWindowInsets",
                       "getPhoneFitLayout", "getPlaybackDiagnostics", "getRearLyricsRuntimeState",
                       "getRearLyricsStatus", "getSecureItem", "getStageOrientation", "getTelemetryStatus",
                       "httpRequest", "inspectScanDirectories", "leaveBetaProgram", "localAudioInfo",
                       "localAudioServerPort", "moveTaskToBack", "openAnnouncementCenter",
                       "openAppReleaseHistory", "openAppUpdateDialog", "openBetaActivationDialog",
                       "pickAudioFiles", "pickAudioFolder", "pickLxSourceFile", "pickScanDirectory",
                       "pickSettingsFiles", "preparePlaybackTestTone", "publishRearLyricsSnapshot",
                       "readEmbeddedCover", "readLocalAudioBytes", "readLocalLyricSidecar",
                       "readSettingsFileChunk", "recordDiagnosticEvent", "recordPlaybackHeartbeat",
                       "recordRuntimeDiagnostic", "registerRemoteAudio", "releaseSettingsFiles",
                       "removeSecureItem", "reportCompatListening", "requestAllFilesAccess",
                       "resolveLocalAudioScan", "returnFromRearLyrics", "saveImageToGallery",
                       "scanLocalAudio", "selectSongVisualizerMode", "setAdaptiveLayout",
                       "setAppUpdateChannel", "setBackHandlerState", "setKeepScreenOn",
                       "setMainSystemBarsVisible", "setPhoneFitLayout", "setRearCardAod",
                       "setRearCardKeepAwake", "setRearControlEngine", "setRearCoverSleep",
                       "setRearLockedRoute", "setRearLyricsBackend", "setSecureItem",
                       "setStageOrientation", "setTelemetryEnabled", "shareImageFile", "shareTextFile",
                       "startRearLyrics", "startupStage", "updatePlaybackState"]
    weak var bridge: Bridge?
    /// The playback plugin, so lock-screen actions can reach the native engine
    /// and web-engine playback can be mirrored to the now-playing center.
    weak var playback: TingyuPlayback?

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {

        // MARK: HTTP
        case "httpRequest":
            HTTPHelper.shared.request(options) { result in
                switch result {
                case .success(let out): resolve(out)
                case .failure(let err): reject(err.localizedDescription, "HTTP_ERROR")
                }
            }
        case "cancelHttpRequest":
            if let rid = options["requestId"] as? String { HTTPHelper.shared.cancel(requestId: rid) }
            resolve(["ok": true])

        // MARK: Cookies
        case "cookiesGet":
            resolve(cookiePayload(for: options["url"] as? String))
        case "cookiesGetAll":
            resolve(cookiePayload(for: nil))
        case "cookiesSet":
            setCookie(options)
            resolve(["ok": true])
        case "cookiesRemove":
            removeCookies(options)
            resolve(["ok": true])
        case "cookiesRemoveBatch":
            if let keys = options["keys"] as? [String] {
                for key in keys { removeCookies(["key": key, "url": options["url"] as Any]) }
            }
            resolve(["ok": true])

        // MARK: Secure storage (Keychain)
        case "getSecureItem":
            guard let key = options["key"] as? String else { reject("Missing key", "INVALID_ARGUMENT"); return }
            if let value = Keychain.get(key) { resolve(["value": value]) }
            else { reject("Item not found", "NOT_FOUND") }
        case "setSecureItem":
            guard let key = options["key"] as? String,
                  let value = options["value"] as? String else {
                reject("Missing key/value", "INVALID_ARGUMENT"); return
            }
            Keychain.set(key, value)
            resolve(["ok": true])
        case "removeSecureItem":
            if let key = options["key"] as? String { Keychain.remove(key) }
            resolve(["ok": true])

        // MARK: Web-engine playback state sync -> now playing
        case "updatePlaybackState", "applyPlaybackState":
            applyWebPlaybackState(options)
            resolve(["ok": true])
        case "clearPlaybackState":
            NowPlaying.shared.clear()
            resolve(["ok": true])
        case "getPlaybackDiagnostics":
            resolve(["ok": true, "engine": "web-mirror"])

        // MARK: Window / system
        case "getMainWindowInsets":
            resolve(bridge?.insetsProvider?() ?? ["top": 0, "bottom": 0, "left": 0, "right": 0])
        case "getDisplayCutout":
            let insets = bridge?.insetsProvider?() ?? [:]
            resolve(["hasCutout": true, "insets": insets])
        case "setKeepScreenOn":
            let enabled = (options["enabled"] as? Bool) ?? (options["keepScreenOn"] as? Bool) ?? false
            DispatchQueue.main.async { UIApplication.shared.isIdleTimerDisabled = enabled }
            resolve(["ok": true])
        case "getStageOrientation":
            resolve(["orientation": "portrait", "locked": false])
        case "exitApp", "moveTaskToBack":
            resolve(["ok": true]) // iOS apps don't exit programmatically

        // MARK: Share / save
        case "shareTextFile":
            shareText(options, resolve: resolve)
        case "shareImageFile":
            shareImage(options, resolve: resolve)
        case "saveImageToGallery":
            saveImage(options, resolve: resolve, reject: reject)

        // MARK: Updates / announcements (this build updates via the sign source)
        case "checkAppUpdate":
            resolve(["hasUpdate": false, "status": "none", "available": false])
        case "getAppUpdateStatus":
            resolve(["status": "none", "hasUpdate": false])
        case "getAnnouncementSummary":
            resolve(["count": 0, "items": [Any](), "unread": 0])

        // MARK: Diagnostics / telemetry bookkeeping
        case "getTelemetryStatus":
            resolve(["enabled": false])
        case "getCrashDiagnostics":
            resolve(["entries": [Any]()])
        case "cloudDiagnosticSnapshot":
            resolve(["ok": true])

        // MARK: Local audio (Files integration lands next; report empty library)
        case "scanLocalAudio":
            notify("localAudioScanProgress", ["done": true, "count": 0, "scanned": 0])
            resolve(["tracks": [Any](), "count": 0, "songs": [Any]()])
        case "localAudioServerPort":
            resolve(["port": 0])
        case "pickAudioFiles", "pickAudioFolder", "pickLxSourceFile", "pickScanDirectory", "pickSettingsFiles":
            resolve(["cancelled": true, "files": [Any]()])

        default:
            // Rear-screen group (cut), layout persistence, diagnostic recorders,
            // beta/update dialogs: acknowledge without effect.
            resolve(["ok": true])
        }
    }

    // MARK: - media action forwarding (lock screen -> web engine)

    func emitMediaAction(_ action: String, positionMs: Double?) {
        var data: [String: Any] = ["action": action]
        if let positionMs = positionMs { data["positionMs"] = positionMs }
        notify("mediaAction", data)
        playback?.notify("mediaAction", data)
    }

    // MARK: - helpers

    private func applyWebPlaybackState(_ options: [String: Any]) {
        let title = (options["title"] as? String) ?? ""
        guard !title.isEmpty else { return }
        NowPlaying.shared.update(
            title: title,
            artist: (options["artist"] as? String) ?? "",
            album: (options["album"] as? String) ?? "",
            coverUrl: options["coverUrl"] as? String,
            playing: (options["playing"] as? Bool) ?? false,
            positionSec: ((options["position"] as? NSNumber)?.doubleValue ?? 0) / 1000.0,
            durationSec: ((options["duration"] as? NSNumber)?.doubleValue ?? 0) / 1000.0)
    }

    private func cookiePayload(for urlString: String?) -> [String: Any] {
        let storage = HTTPCookieStorage.shared
        var cookies: [HTTPCookie] = []
        if let urlString = urlString, let url = URL(string: urlString),
           let found = storage.cookies(for: url) {
            cookies = found
        } else {
            cookies = storage.cookies ?? []
        }
        var map: [String: String] = [:]
        var list: [[String: Any]] = []
        for c in cookies {
            map[c.name] = c.value
            list.append(["name": c.name, "value": c.value, "domain": c.domain, "path": c.path])
        }
        return ["cookies": list, "values": map]
    }

    private func setCookie(_ options: [String: Any]) {
        let name = (options["key"] as? String) ?? (options["name"] as? String) ?? ""
        let value = (options["value"] as? String) ?? ""
        guard !name.isEmpty else { return }
        var domain = (options["domain"] as? String) ?? ""
        if domain.isEmpty, let urlString = options["url"] as? String,
           let host = URL(string: urlString)?.host { domain = host }
        guard !domain.isEmpty else { return }
        var props: [HTTPCookiePropertyKey: Any] = [
            .name: name, .value: value, .domain: domain,
            .path: (options["path"] as? String) ?? "/",
        ]
        if let expires = (options["expires"] as? NSNumber)?.doubleValue {
            props[.expires] = Date(timeIntervalSince1970: expires)
        }
        if let cookie = HTTPCookie(properties: props) {
            HTTPCookieStorage.shared.setCookie(cookie)
        }
    }

    private func removeCookies(_ options: [String: Any]) {
        let name = (options["key"] as? String) ?? (options["name"] as? String) ?? ""
        let storage = HTTPCookieStorage.shared
        for cookie in storage.cookies ?? [] where name.isEmpty || cookie.name == name {
            storage.deleteCookie(cookie)
        }
    }

    private func shareText(_ options: [String: Any], resolve: @escaping PluginResolve) {
        let text = (options["text"] as? String) ?? (options["content"] as? String) ?? ""
        presentShare(items: [text], resolve: resolve)
    }

    private func shareImage(_ options: [String: Any], resolve: @escaping PluginResolve) {
        if let b64 = (options["base64"] as? String) ?? (options["data"] as? String),
           let data = Data(base64Encoded: b64), let image = UIImage(data: data) {
            presentShare(items: [image], resolve: resolve)
        } else {
            resolve(["ok": false])
        }
    }

    private func presentShare(items: [Any], resolve: @escaping PluginResolve) {
        DispatchQueue.main.async { [weak self] in
            guard let presenter = self?.bridge?.presenterProvider?() else { resolve(["ok": false]); return }
            let vc = UIActivityViewController(activityItems: items, applicationActivities: nil)
            vc.popoverPresentationController?.sourceView = presenter.view
            presenter.present(vc, animated: true) { resolve(["ok": true]) }
        }
    }

    private func saveImage(_ options: [String: Any],
                           resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        guard let b64 = (options["base64"] as? String) ?? (options["data"] as? String),
              let data = Data(base64Encoded: b64), let image = UIImage(data: data) else {
            reject("No image data", "INVALID_ARGUMENT"); return
        }
        PHPhotoLibrary.requestAuthorization(for: .addOnly) { status in
            guard status == .authorized || status == .limited else {
                reject("Photo permission denied", "PERMISSION_DENIED"); return
            }
            PHPhotoLibrary.shared().performChanges({
                PHAssetChangeRequest.creationRequestForAsset(from: image)
            }, completionHandler: { ok, _ in
                resolve(["saved": ok])
            })
        }
    }
}

/// Minimal Keychain string store backing FoliaNative secure items.
enum Keychain {
    private static let service = "io.github.huleixin.tingyu.secure"

    static func get(_ key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
              let data = item as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }

    static func set(_ key: String, _ value: String) {
        let data = Data(value.utf8)
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
        ]
        let status = SecItemUpdate(query as CFDictionary,
                                     [kSecValueData as String: data] as CFDictionary)
        if status == errSecItemNotFound {
            var attrs = query
            attrs[kSecValueData as String] = data
            SecItemAdd(attrs as CFDictionary, nil)
        }
    }

    static func remove(_ key: String) {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: key,
        ]
        SecItemDelete(query as CFDictionary)
    }
}
