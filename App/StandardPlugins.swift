import UIKit
import SafariServices

/// @capacitor/status-bar
final class StatusBarPlugin: CapPlugin {
    let pluginName = "StatusBar"
    let methodNames = ["setStyle", "setBackgroundColor", "show", "hide", "setOverlaysWebView", "getInfo"]
    weak var bridge: Bridge?
    private weak var viewController: ViewController?

    init(viewController: ViewController) { self.viewController = viewController }

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self, let vc = self.viewController else { resolve([:]); return }
            switch method {
            case "setStyle":
                let style = (options["style"] as? String) ?? "LIGHT"
                vc.statusBarStyle = (style == "DARK") ? .darkContent : .lightContent
                vc.refreshStatusBar()
                resolve([:])
            case "show":
                vc.statusBarHiddenFlag = false
                vc.refreshStatusBar()
                resolve([:])
            case "hide":
                vc.statusBarHiddenFlag = true
                vc.refreshStatusBar()
                resolve([:])
            case "getInfo":
                resolve(["visible": !vc.statusBarHiddenFlag,
                         "style": vc.statusBarStyle == .darkContent ? "DARK" : "LIGHT"])
            default:
                resolve([:])
            }
        }
    }
}

/// @capacitor/splash-screen — the app hides it once React mounts.
final class SplashScreenPlugin: CapPlugin {
    let pluginName = "SplashScreen"
    let methodNames = ["show", "hide"]
    weak var bridge: Bridge?

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        resolve([:])
    }
}

/// @capacitor/browser
final class BrowserPlugin: CapPlugin {
    let pluginName = "Browser"
    let methodNames = ["open", "close"]
    weak var bridge: Bridge?
    private weak var viewController: ViewController?

    init(viewController: ViewController) { self.viewController = viewController }

    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject) {
        switch method {
        case "open":
            guard let urlString = options["url"] as? String, let url = URL(string: urlString) else {
                reject("Invalid URL", "INVALID_ARGUMENT"); return
            }
            DispatchQueue.main.async { [weak self] in
                guard let self = self, let presenter = self.bridge?.presenterProvider?() else { resolve([:]); return }
                let safari = SFSafariViewController(url: url)
                presenter.present(safari, animated: true) {
                    self.notify("browserPageLoaded", [:])
                    resolve([:])
                }
            }
        case "close":
            DispatchQueue.main.async { [weak self] in
                guard let self = self, let presenter = self.bridge?.presenterProvider?() else { resolve([:]); return }
                presenter.dismiss(animated: true) {
                    self.notify("browserFinished", [:])
                    resolve([:])
                }
            }
        default:
            resolve([:])
        }
    }
}
