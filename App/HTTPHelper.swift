import Foundation

/// Shared native HTTP used by FoliaNative.httpRequest and TingyuPlayback.lxHttp.
/// Cookies flow through HTTPCookieStorage.shared, which the FoliaNative cookie
/// methods also manage — matching the Android behaviour where the web layer
/// logs in to music platforms through this channel.
final class HTTPHelper {
    static let shared = HTTPHelper()

    private let session: URLSession = {
        let cfg = URLSessionConfiguration.default
        cfg.httpCookieStorage = HTTPCookieStorage.shared
        cfg.httpShouldSetCookies = true
        cfg.httpCookieAcceptPolicy = .always
        return URLSession(configuration: cfg)
    }()
    private var tasks: [String: URLSessionDataTask] = [:]
    private let lock = NSLock()

    func cancel(requestId: String) {
        lock.lock()
        let task = tasks.removeValue(forKey: requestId)
        lock.unlock()
        task?.cancel()
    }

    func request(_ options: [String: Any],
                 completion: @escaping (Result<[String: Any], NSError>) -> Void) {
        guard let urlString = options["url"] as? String, let url = URL(string: urlString) else {
            completion(.failure(NSError(domain: "HTTPHelper", code: -1,
                                        userInfo: [NSLocalizedDescriptionKey: "Missing or invalid url"])))
            return
        }
        var req = URLRequest(url: url)
        req.httpMethod = (options["method"] as? String)?.uppercased() ?? "GET"
        if let timeoutMs = (options["timeoutMs"] as? NSNumber)?.doubleValue, timeoutMs > 0 {
            req.timeoutInterval = timeoutMs / 1000.0
        }
        if let headers = options["headers"] as? [String: Any] {
            for (k, v) in headers {
                if let s = v as? String { req.setValue(s, forHTTPHeaderField: k) }
                else if let arr = v as? [String] { req.setValue(arr.joined(separator: ", "), forHTTPHeaderField: k) }
            }
        }
        if let bodyBase64 = options["bodyBase64"] as? String, !bodyBase64.isEmpty,
           let data = Data(base64Encoded: bodyBase64) {
            req.httpBody = data
        } else if let bodyText = options["bodyText"] as? String, !bodyText.isEmpty {
            req.httpBody = bodyText.data(using: .utf8)
        } else if let body = options["data"] as? String, !body.isEmpty {
            req.httpBody = body.data(using: .utf8)
        }

        let requestId = (options["requestId"] as? String) ?? UUID().uuidString
        let task = session.dataTask(with: req) { [weak self] data, response, error in
            self?.lock.lock()
            self?.tasks.removeValue(forKey: requestId)
            self?.lock.unlock()
            if let error = error {
                completion(.failure(error as NSError))
                return
            }
            let http = response as? HTTPURLResponse
            let status = http?.statusCode ?? 0
            var respHeaders: [String: String] = [:]
            http?.allHeaderFields.forEach { respHeaders["\($0.key)"] = "\($0.value)" }
            let body = data ?? Data()
            var out: [String: Any] = [
                "status": status,
                "statusCode": status,
                "headers": respHeaders,
                "bodyBase64": body.base64EncodedString(),
                "url": http?.url?.absoluteString ?? urlString,
            ]
            if let text = String(data: body, encoding: .utf8) { out["bodyText"] = text }
            completion(.success(out))
        }
        lock.lock()
        tasks[requestId] = task
        lock.unlock()
        task.resume()
    }
}
