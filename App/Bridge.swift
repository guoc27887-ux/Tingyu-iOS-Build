import WebKit

typealias PluginResolve = ([String: Any]) -> Void
typealias PluginReject = (_ message: String, _ code: String) -> Void

/// A Capacitor-compatible plugin. Methods listed in `methodNames` are advertised
/// to JS through Capacitor.PluginHeaders with rtype "promise"; addListener /
/// removeListener are added automatically by the bridge.
protocol CapPlugin: AnyObject {
    var pluginName: String { get }
    var methodNames: [String] { get }
    var bridge: Bridge? { get set }
    func handle(_ method: String, _ options: [String: Any],
                resolve: @escaping PluginResolve, reject: @escaping PluginReject)
}

extension CapPlugin {
    func notify(_ event: String, _ data: [String: Any]) {
        bridge?.notifyListeners(pluginName, event, data)
    }
}

/// Minimal re-implementation of the Capacitor iOS bridge wire protocol:
/// JS -> native via webkit.messageHandlers.bridge.postMessage({callbackId, pluginId, methodName, options})
/// native -> JS via window.Capacitor.fromNative({callbackId, pluginId, methodName, success, data|error})
final class Bridge: NSObject, WKScriptMessageHandler {
    weak var webView: WKWebView?
    /// Supplies the top view controller for pickers / share sheets / browser.
    var presenterProvider: (() -> UIViewController?)?
    /// Supplies current safe-area insets in points: [top, bottom, left, right].
    var insetsProvider: (() -> [String: Any])?

    private var plugins: [String: CapPlugin] = [:]
    private var pluginOrder: [String] = []
    private var listeners: [String: [String: [String]]] = [:] // plugin -> event -> callbackIds

    func register(_ plugin: CapPlugin) {
        plugin.bridge = self
        if plugins[plugin.pluginName] == nil { pluginOrder.append(plugin.pluginName) }
        plugins[plugin.pluginName] = plugin
    }

    /// Injected before native-bridge.js at document start.
    var bootstrapScript: String {
        var headers: [[String: Any]] = []
        for name in pluginOrder {
            guard let p = plugins[name] else { continue }
            var methods: [[String: Any]] = p.methodNames.map { ["name": $0, "rtype": "promise"] }
            methods.append(["name": "addListener"])
            methods.append(["name": "removeListener"])
            headers.append(["name": name, "methods": methods])
        }
        let json = (try? JSONSerialization.data(withJSONObject: headers))
            .flatMap { String(data: $0, encoding: .utf8) } ?? "[]"
        return """
        window.WEBVIEW_SERVER_URL = 'capacitor://localhost';
        window.Capacitor = { PluginHeaders: \(json) };
        """
    }

    // MARK: - JS -> native

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage) {
        guard message.name == "bridge",
              let body = message.body as? [String: Any] else { return }
        let type = body["type"] as? String ?? "message"
        guard type == "message" else { return } // js.error / console noise: ignore
        let callbackId = (body["callbackId"] as? String) ?? "-1"
        let pluginId = (body["pluginId"] as? String) ?? ""
        let method = (body["methodName"] as? String) ?? ""
        let options = (body["options"] as? [String: Any]) ?? [:]

        if method == "addListener" {
            let event = (options["eventName"] as? String) ?? ""
            var byEvent = listeners[pluginId] ?? [:]
            var ids = byEvent[event] ?? []
            if !ids.contains(callbackId) { ids.append(callbackId) }
            byEvent[event] = ids
            listeners[pluginId] = byEvent
            return
        }
        if method == "removeListener" {
            let event = (options["eventName"] as? String) ?? ""
            let target = (options["callbackId"] as? String) ?? ""
            listeners[pluginId]?[event]?.removeAll { $0 == target }
            return
        }
        guard let plugin = plugins[pluginId] else {
            sendResult(callbackId, pluginId, method, success: false, data: nil,
                       error: ["message": "Plugin \(pluginId) is not implemented on iOS", "code": "UNIMPLEMENTED"])
            return
        }
        let resolve: PluginResolve = { [weak self] data in
            self?.sendResult(callbackId, pluginId, method, success: true, data: data, error: nil)
        }
        let reject: PluginReject = { [weak self] message, code in
            self?.sendResult(callbackId, pluginId, method, success: false, data: nil,
                             error: ["message": message, "code": code])
        }
        plugin.handle(method, options, resolve: resolve, reject: reject)
    }

    // MARK: - native -> JS

    func notifyListeners(_ pluginId: String, _ event: String, _ data: [String: Any]) {
        guard let ids = listeners[pluginId]?[event], !ids.isEmpty else { return }
        for id in ids {
            sendResult(id, pluginId, "addListener", success: true, data: data, error: nil)
        }
    }

    private func sendResult(_ callbackId: String, _ pluginId: String, _ method: String,
                            success: Bool, data: [String: Any]?, error: [String: Any]?) {
        var result: [String: Any] = [
            "callbackId": callbackId,
            "pluginId": pluginId,
            "methodName": method,
            "success": success,
        ]
        if let data = data { result["data"] = data }
        if let error = error { result["error"] = error }
        guard let jsonData = try? JSONSerialization.data(withJSONObject: result),
              let json = String(data: jsonData, encoding: .utf8) else { return }
        DispatchQueue.main.async { [weak self] in
            self?.webView?.evaluateJavaScript("window.Capacitor && window.Capacitor.fromNative(\(json));")
        }
    }
}

/// Serves the bundled web/ folder under capacitor://localhost.
final class LocalWebServer: NSObject, WKURLSchemeHandler {
    private let root: URL

    init(root: URL) { self.root = root }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(URLError(.badURL)); return
        }
        var path = url.path
        if path.isEmpty || path == "/" { path = "/index.html" }
        var fileURL = root.appendingPathComponent(String(path.dropFirst()))
        var isDir: ObjCBool = false
        if FileManager.default.fileExists(atPath: fileURL.path, isDirectory: &isDir), isDir.boolValue {
            fileURL = fileURL.appendingPathComponent("index.html")
        }
        if !FileManager.default.fileExists(atPath: fileURL.path) {
            // SPA fallback for extension-less paths
            if (path as NSString).pathExtension.isEmpty {
                fileURL = root.appendingPathComponent("index.html")
            } else {
                let resp = HTTPURLResponse(url: url, statusCode: 404, httpVersion: "HTTP/1.1", headerFields: nil)!
                urlSchemeTask.didReceive(resp)
                urlSchemeTask.didReceive(Data())
                urlSchemeTask.didFinish()
                return
            }
        }
        do {
            let data = try Data(contentsOf: fileURL)
            let headers = [
                "Content-Type": Self.mimeType(for: fileURL.pathExtension),
                "Content-Length": "\(data.count)",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
            ]
            let resp = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: headers)!
            urlSchemeTask.didReceive(resp)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()
        } catch {
            urlSchemeTask.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html; charset=utf-8"
        case "js", "mjs": return "text/javascript; charset=utf-8"
        case "css": return "text/css; charset=utf-8"
        case "json": return "application/json; charset=utf-8"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "gif": return "image/gif"
        case "webp": return "image/webp"
        case "svg": return "image/svg+xml"
        case "ico": return "image/x-icon"
        case "woff": return "font/woff"
        case "woff2": return "font/woff2"
        case "ttf": return "font/ttf"
        case "otf": return "font/otf"
        case "wasm": return "application/wasm"
        case "mp3": return "audio/mpeg"
        case "flac": return "audio/flac"
        case "m4a": return "audio/mp4"
        case "wav": return "audio/wav"
        case "txt": return "text/plain; charset=utf-8"
        default: return "application/octet-stream"
        }
    }
}
