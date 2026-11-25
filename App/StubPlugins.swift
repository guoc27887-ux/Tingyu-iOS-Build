import Foundation

/// Android-only or deliberately cut features (his call, 2026-11-25):
/// rear-screen lyrics, USB exclusive output, ColorOS status lyrics, Pro entitlements.
/// These plugins exist so the web layer's capability checks get clean "not supported"
/// answers instead of bridge errors.

/// TingyuChrome drives Android's native stage/minimal-player overlays.
/// On iOS the web UI renders everything itself, so this reports unavailable.
final class TingyuChrome: CapPlugin {
    let pluginName = "TingyuChrome"
    let methodNames = ["appearance", "clock", "collapseStage", "getStageControlBlock", "getStageLayout",
                       "graphicsConfigure", "graphicsProbe", "minimalPlayerFrame", "minimalPlayerRelease",
                       "minimalQueue", "minimalQueueCurrent", "minimalTools", "motionPreference",
                       "navigationDiagnostics", "openDiscoveryCovers", "openMinimalQueue", "openMinimalTools",
                       "openSleepTimer", "openThirdPartyLicenses", "openUsbAudioSettings", "pageRemove",
                       "pageUpdate", "panelRemove", "panelUpdate", "playerStyle", "probe", "remove",
                       "setDiscoveryCoverScope", "shell", "update"]
    weak var bridge: Bridge?

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {
        case "probe", "graphicsProbe":
            resolve(["supported": false, "native": false, "available": false])
        case "getStageLayout":
            resolve(["mode": "web", "native": false])
        case "getStageControlBlock":
            resolve(["available": false])
        default:
            resolve(["ok": true])
        }
    }
}

/// TingyuLyrics: floating/Bluetooth lyric helpers on Android. Stubbed on iOS;
/// lock-screen lyrics go through MPNowPlayingInfoCenter instead.
final class TingyuLyrics: CapPlugin {
    let pluginName = "TingyuLyrics"
    let methodNames = ["bluetoothPermission", "openSettings", "requestBluetooth", "restoreStyle", "snapshot"]
    weak var bridge: Bridge?

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {
        case "bluetoothPermission", "requestBluetooth":
            resolve(["granted": false, "supported": false])
        case "snapshot":
            resolve(["available": false])
        default:
            resolve(["ok": true])
        }
    }
}

/// TingyuGlass: Android native liquid-glass overlay probe. Web CSS handles iOS.
final class TingyuGlass: CapPlugin {
    let pluginName = "TingyuGlass"
    let methodNames = ["hide", "probe", "update"]
    weak var bridge: Bridge?

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        if method == "probe" { resolve(["supported": false, "native": false]) }
        else { resolve(["ok": true]) }
    }
}

/// FoliaColorOsLyrics: ColorOS status-bar lyrics — Android OEM feature, no iOS equivalent.
final class FoliaColorOsLyrics: CapPlugin {
    let pluginName = "FoliaColorOsLyrics"
    let methodNames = ["clear", "isSupported", "markUserChoice", "publish", "setLyricOffset", "setVariantRule", "status"]
    weak var bridge: Bridge?

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {
        case "isSupported":
            resolve(["supported": false, "isSupported": false])
        case "status":
            resolve(["supported": false, "active": false])
        case "publish":
            resolve(["ok": false])
        default:
            resolve(["ok": true])
        }
    }
}

/// TingyuPro: entitlement / paid features are cut in this build (his call).
/// Reports a plain free state so the app doesn't gate the free features.
final class TingyuPro: CapPlugin {
    let pluginName = "TingyuPro"
    let methodNames = ["callCloudAi", "claimPromoCampaign", "getPromoStatus", "getStatus",
                       "recoverAccount", "redeemCard", "refreshStatus", "resetRecoveryCode", "unbindDevice"]
    weak var bridge: Bridge?

    private var freeStatus: [String: Any] {
        ["active": false, "isPro": false, "pro": false, "status": "free", "tier": "free",
         "plan": "free", "expiresAt": 0, "features": [String]()]
    }

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {
        case "getStatus", "refreshStatus":
            resolve(freeStatus)
        case "getPromoStatus":
            resolve(["active": false, "campaigns": [Any]()])
        case "callCloudAi":
            reject("Pro features are not included in this build", "UNAVAILABLE")
        default:
            resolve(["ok": false])
        }
    }
}
