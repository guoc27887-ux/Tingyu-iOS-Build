import UIKit
import WebKit

final class ViewController: UIViewController {
    private var webView: WKWebView!
    private let bridge = Bridge()
    private let playback = TingyuPlayback()

    override func loadView() {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.preferences.javaScriptCanOpenWindowsAutomatically = true

        let ucc = WKUserContentController()
        // 1) Capacitor config (PluginHeaders) must exist before native-bridge.js runs.
        ucc.addUserScript(WKUserScript(source: bridge.bootstrapScript,
                                       injectionTime: .atDocumentStart,
                                       forMainFrameOnly: false))
        // 2) The stock Capacitor native bridge, extracted from the Android APK.
        if let bridgeURL = Bundle.main.url(forResource: "native-bridge", withExtension: "js"),
           let bridgeJS = try? String(contentsOf: bridgeURL, encoding: .utf8) {
            ucc.addUserScript(WKUserScript(source: bridgeJS,
                                           injectionTime: .atDocumentStart,
                                           forMainFrameOnly: false))
        }
        // 3) Extension-bridge watchdog: if the app's own folia extension
        //    bootstrap does not register in this WebView, install an
        //    equivalent wiring (chrome shim + fetch reroute + dispatcher).
        if let wdURL = Bundle.main.url(forResource: "ext-watchdog", withExtension: "js"),
           let wdJS = try? String(contentsOf: wdURL, encoding: .utf8) {
            ucc.addUserScript(WKUserScript(source: wdJS,
                                           injectionTime: .atDocumentStart,
                                           forMainFrameOnly: false))
        }
        ucc.add(bridge, name: "bridge")
        config.userContentController = ucc

        if let webRoot = Bundle.main.url(forResource: "web", withExtension: nil) {
            config.setURLSchemeHandler(LocalWebServer(root: webRoot), forURLScheme: "capacitor")
        }

        let wv = WKWebView(frame: .zero, configuration: config)
        wv.scrollView.contentInsetAdjustmentBehavior = .never
        wv.backgroundColor = UIColor(red: 0.063, green: 0.176, blue: 0.145, alpha: 1)
        wv.isOpaque = false
        self.webView = wv
        self.view = wv

        bridge.webView = wv
        bridge.presenterProvider = { [weak self] in self }
        bridge.insetsProvider = { [weak self] in
            let insets = self?.view.safeAreaInsets ?? .zero
            return ["top": insets.top, "bottom": insets.bottom,
                    "left": insets.left, "right": insets.right]
        }

        let folia = FoliaNative()
        folia.playback = playback
        playback.engine.onRemoteAction = { [weak folia] action, positionMs in
            folia?.emitMediaAction(action, positionMs: positionMs)
        }
        bridge.register(playback)
        bridge.register(folia)
        bridge.register(StatusBarPlugin(viewController: self))
        bridge.register(SplashScreenPlugin())
        bridge.register(BrowserPlugin(viewController: self))
        bridge.register(TingyuChrome())
        bridge.register(TingyuLyrics())
        bridge.register(TingyuGlass())
        bridge.register(FoliaColorOsLyrics())
        bridge.register(TingyuPro())
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        if let url = URL(string: "capacitor://localhost/index.html") {
            webView.load(URLRequest(url: url))
        }
    }

    // MARK: - Status bar (driven by StatusBarPlugin)

    var statusBarStyle: UIStatusBarStyle = .lightContent
    var statusBarHiddenFlag = false
    override var preferredStatusBarStyle: UIStatusBarStyle { statusBarStyle }
    override var prefersStatusBarHidden: Bool { statusBarHiddenFlag }
    func refreshStatusBar() { setNeedsStatusBarAppearanceUpdate() }
}
