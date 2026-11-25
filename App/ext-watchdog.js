// Folia extension-bridge watchdog (iOS shell).
// The app normally self-registers its embedded extension bridge at boot
// (chrome shim + fetch reroute + FOLIA_BRIDGE message listener). If any link
// of that chain is missing in the WKWebView environment, this watchdog
// installs an equivalent wiring so platform login/search/playback work.
// It stays invisible when the app's own bridge is healthy.
(function () {
  'use strict';
  var SRC_PAGE = 'folia-web-page';
  var SRC_EXT = 'folia-extension-bridge';
  var VERSION = 'android-0.1.0';
  var EXT_ID = 'folia-native-android';
  var ALLOW = ['music.163.com', 'interface.music.163.com', 'interface3.music.163.com',
    'c.y.qq.com', 'u.y.qq.com', 'ssl.ptlogin2.qq.com', 'xui.ptlogin2.qq.com',
    'graph.qq.com', 'weixin.qq.com', 'kugou.com', 'kuwo.cn', 'migu.cn',
    'api.qrserver.com', 'y.gtimg.cn', 'qlogo.cn', '126.net', 'kgimg.com',
    'y.qq.com', 'api.tencentmusic.com', 'qishui.com', 'douyin.com',
    'snssdk.com', 'douyinpic.com'];
  var state = { installed: [], pingOk: false, apiOk: false, apiInfo: '', mode: 'app' };

  function foliaNative() {
    try { return window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.FoliaNative || null; }
    catch (e) { return null; }
  }
  function post(msg) {
    var m = { source: SRC_EXT };
    for (var k in msg) m[k] = msg[k];
    window.postMessage(m, '*');
  }
  function ping(timeoutMs) {
    return new Promise(function (resolve) {
      var done = false;
      var to = setTimeout(function () { if (!done) { done = true; window.removeEventListener('message', h); resolve(false); } }, timeoutMs);
      function h(e) {
        var t = e.data;
        if (e.source === window && t && t.source === SRC_EXT && (t.type === 'FOLIA_BRIDGE_PONG' || t.type === 'FOLIA_BRIDGE_READY')) {
          if (!done) { done = true; clearTimeout(to); window.removeEventListener('message', h); resolve(true); }
        }
      }
      window.addEventListener('message', h);
      window.postMessage({ source: SRC_PAGE, type: 'FOLIA_BRIDGE_PING' }, '*');
    });
  }
  function apiProbe(timeoutMs) {
    // Any FOLIA_API_RESPONSE (ok or not) proves the dispatcher is wired;
    // only a timeout means the request was queued with nobody answering.
    return new Promise(function (resolve) {
      var done = false;
      var to = setTimeout(function () { if (!done) { done = true; window.removeEventListener('message', h); resolve({ responded: false, ok: false, info: 'timeout' }); } }, timeoutMs);
      function h(e) {
        var t = e.data;
        if (e.source === window && t && t.source === SRC_EXT && t.type === 'FOLIA_API_RESPONSE' && t.id === 'wdprobe1') {
          if (!done) {
            done = true; clearTimeout(to); window.removeEventListener('message', h);
            if (t.ok) resolve({ responded: true, ok: true, info: 'data' });
            else resolve({ responded: true, ok: false, info: 'err:' + String(t.error || '').slice(0, 60) });
          }
        }
      }
      window.addEventListener('message', h);
      window.postMessage({ source: SRC_PAGE, type: 'FOLIA_API_REQUEST', id: 'wdprobe1',
        payload: { provider: 'netease', operation: '/login/qr/key', path: '/login/qr/key', method: 'GET', query: {}, headers: {} } }, '*');
    });
  }

  // ---- chrome shim (mirrors the app bootstrap's ra()) ----
  function installChrome() {
    var plugin = foliaNative();
    if (!plugin) return;
    if (window.chrome && window.chrome.cookies && typeof window.chrome.cookies.getAll === 'function') return;
    var t = window.chrome || {};
    t.runtime = { id: EXT_ID, getManifest: function () { return { version: VERSION }; } };
    t.storage = { local: {
      get: function (e) {
        var out = {};
        (e == null ? Object.keys(localStorage) : Array.isArray(e) ? e : [e]).forEach(function (k) {
          var v = localStorage.getItem(String(k));
          if (v != null) { try { out[String(k)] = JSON.parse(v); } catch (x) { out[String(k)] = v; } }
        });
        return Promise.resolve(out);
      },
      set: function (e) { Object.entries(e || {}).forEach(function (kv) { localStorage.setItem(kv[0], JSON.stringify(kv[1])); }); return Promise.resolve(); },
      remove: function (e) { (Array.isArray(e) ? e : [e]).forEach(function (k) { localStorage.removeItem(String(k)); }); return Promise.resolve(); }
    } };
    function wrap(name, fallback, fn) {
      return function () {
        var args = arguments;
        return Promise.race([
          Promise.resolve().then(function () { return fn.apply(null, args); }),
          new Promise(function (res) { setTimeout(function () { res(fallback); }, 4000); })
        ]).catch(function () { return fallback; });
      };
    }
    t.cookies = {
      getAll: wrap('cookies.getAll', [], function (q) { return plugin.cookiesGetAll(q || {}).then(function (r) { return (r && r.cookies) || []; }); }),
      get: wrap('cookies.get', null, function (q) { return plugin.cookiesGet(q || {}).then(function (r) { return (r && r.cookie) || null; }); }),
      set: function (q) { return plugin.cookiesSet(q || {}).then(function () { return q; }).catch(function () { return { ok: false }; }); },
      remove: wrap('cookies.remove', null, function (q) { return plugin.cookiesRemove(q || {}).then(function (r) { return r && r.ok ? q : null; }); }),
      removeBatch: wrap('cookies.removeBatch', null, function (entries) { return plugin.cookiesRemoveBatch({ entries: entries }).then(function () { return entries; }); })
    };
    t.declarativeNetRequest = { RuleActionType: { MODIFY_HEADERS: 'modifyHeaders' }, updateSessionRules: function () { return Promise.resolve(); } };
    t.tabs = { create: function (o) { if (o && o.url) window.open(o.url, '_blank', 'noopener,noreferrer'); return Promise.resolve({}); },
               query: function () { return Promise.resolve([]); },
               onRemoved: { addListener: function () {} }, onUpdated: { addListener: function () {} } };
    window.chrome = t;
    state.installed.push('chrome');
  }

  // ---- fetch reroute (mirrors the app bootstrap's ia()) ----
  function installFetch() {
    var plugin = foliaNative();
    if (!plugin || window.__wdFetchPatched) return;
    window.__wdFetchPatched = true;
    var origFetch = window.fetch.bind(window);
    function allowlisted(urlStr) {
      var u;
      try { u = new URL(urlStr, location.href); } catch (e) { return null; }
      for (var i = 0; i < ALLOW.length; i++) {
        if (u.hostname === ALLOW[i] || u.hostname.endsWith('.' + ALLOW[i])) return u.toString();
      }
      if (u.hostname === location.hostname && u.protocol === location.protocol && u.port === location.port && /^\/api\/lyric-proxy\/?$/.test(u.pathname)) {
        var n = u.searchParams.get('url');
        if (n) { try { return new URL(n).toString(); } catch (e) { return null; } }
      }
      return null;
    }
    function b64encode(bytes) {
      var s = '', chunk = 32768;
      for (var i = 0; i < bytes.length; i += chunk) s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
      return btoa(s);
    }
    function b64decode(b64) {
      if (!b64) return new Uint8Array(0);
      var bin = atob(b64), out = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    }
    window.fetch = async function (input, init) {
      var req = input instanceof Request ? input : null;
      var target = allowlisted(req ? req.url : String(input));
      if (!target) return origFetch(input, init);
      var method = ((init && init.method) || (req && req.method) || 'GET').toUpperCase();
      var headers = new Headers();
      var pairs = [];
      if (req) req.headers.forEach(function (v, k) { pairs.push([k, v]); });
      if (init && init.headers) new Headers(init.headers).forEach(function (v, k) { pairs.push([k, v]); });
      pairs.forEach(function (p) { headers.append(p[0], p[1]); });
      var body = (init && init.body != null) ? init.body : null;
      var bodyText = '', bodyBase64 = '';
      if (body != null) {
        if (typeof body === 'string') bodyText = body;
        else if (body instanceof URLSearchParams) { bodyText = body.toString(); if (!headers.has('content-type')) headers.set('content-type', 'application/x-www-form-urlencoded'); }
        else { var buf = await new Response(body).arrayBuffer(); bodyBase64 = b64encode(new Uint8Array(buf)); }
      }
      var timeoutMs = 15000;
      var f = Number(init && init.foliaTimeoutMs);
      if (isFinite(f) && f > 0) timeoutMs = Math.min(f, 120000);
      var resp = await plugin.httpRequest({
        requestId: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'wd-' + Date.now() + '-' + Math.random(),
        url: target, method: method,
        headers: Object.fromEntries(headers.entries()),
        bodyText: bodyText, bodyBase64: bodyBase64,
        redirect: (init && init.redirect) || (req && req.redirect) || 'follow',
        timeoutMs: timeoutMs
      });
      var bytes = b64decode(resp.bodyBase64);
      var rh = new Headers();
      var cookies = [];
      if (Array.isArray(resp.headers)) {
        resp.headers.forEach(function (e) {
          if (e && e.name && e.value != null) {
            if (String(e.name).toLowerCase() === 'set-cookie') { rh.append(e.name, String(e.value)); cookies.push(String(e.value)); }
            else rh.set(e.name, String(e.value));
          }
        });
      } else if (resp.headers && typeof resp.headers === 'object') {
        Object.entries(resp.headers).forEach(function (kv) { if (kv[1] != null) rh.set(kv[0], String(kv[1])); });
      }
      cookies.forEach(function (c) { rh.append('x-folia-set-cookie', c); });
      return new Response(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
        { status: resp.status, headers: rh });
    };
    state.installed.push('fetch');
  }

  // ---- message listener + dispatcher (mirrors the app bootstrap's la()/ca()) ----
  var foliaModulePromise = null;
  function loadDispatcher() {
    if (!foliaModulePromise) {
      foliaModulePromise = import(new URL('assets/folia-DsqYZxm6.js', location.href).toString())
        .then(function (m) { return m.handleFoliaApiRequest; });
    }
    return foliaModulePromise;
  }
  function installListener() {
    if (window.__wdListener) return;
    window.__wdListener = true;
    window.addEventListener('message', function (e) {
      if (e.source !== window) return;
      var t = e.data;
      if (!t || t.source !== SRC_PAGE) return;
      if (t.type === 'FOLIA_BRIDGE_PING') {
        post({ type: 'FOLIA_BRIDGE_PONG', ready: true, version: VERSION, extId: EXT_ID });
        return;
      }
      if (t.type === 'FOLIA_API_REQUEST' && typeof t.id === 'string') {
        var id = t.id, payload = t.payload || {};
        loadDispatcher().then(function (handler) { return handler(payload); }).then(function (data) {
          post({ type: 'FOLIA_API_RESPONSE', id: id, ok: true, data: data });
        }).catch(function (err) {
          post({ type: 'FOLIA_API_RESPONSE', id: id, ok: false, error: err instanceof Error ? err.message : String(err) });
        });
      }
    });
    state.installed.push('listener');
  }

  function badge() {
    try {
      var d = document.createElement('div');
      d.textContent = 'EXT ' + state.mode + ' | ping:' + (state.pingOk ? 'ok' : 'FAIL') +
        ' api:' + (state.apiOk ? 'ok' : 'FAIL') + (state.apiInfo ? ' ' + state.apiInfo : '') +
        (state.installed.length ? ' | +' + state.installed.join(',') : '');
      d.style.cssText = 'position:fixed;top:54px;left:8px;z-index:99999;background:rgba(0,0,0,.78);color:#7CFC9A;' +
        'font:11px/1.5 monospace;padding:4px 8px;border-radius:6px;pointer-events:none;max-width:92vw;';
      document.body.appendChild(d);
      setTimeout(function () { d.remove(); }, 12000);
    } catch (e) {}
  }

  async function run() {
    await new Promise(function (r) { setTimeout(r, 2500); });
    state.pingOk = await ping(1200);
    if (!state.pingOk) {
      // Slow boot can miss the first window; give the app a second chance.
      await new Promise(function (r) { setTimeout(r, 3000); });
      state.pingOk = await ping(1500);
    }
    if (state.pingOk) {
      var r = await apiProbe(25000);
      state.apiOk = r.responded; state.apiInfo = r.info;
      if (state.apiOk) return; // app's own bridge fully healthy: stay invisible
      // Ping works but requests are never answered: dispatcher not wired.
      state.mode = 'shim';
      installChrome(); installFetch(); installListener();
    } else {
      state.mode = 'shim';
      installChrome(); installFetch(); installListener();
      state.pingOk = await ping(1200);
      var r2 = await apiProbe(25000);
      state.apiOk = r2.responded; state.apiInfo = r2.info;
    }
    badge();
  }
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', function () { run(); });
})();
