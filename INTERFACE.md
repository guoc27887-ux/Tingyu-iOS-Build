# 听屿 iOS 精简版 — 原生接口清单（自 APK 1.5.151 静态逆向，2026-11-25）

源 APK：~/workspace/tingyu-inspect/tingyu-1.5.151-release.apk（io.github.huleixin.tingyu，Capacitor 混合应用）
网页资源已整套解出到 web/（45 MB，React/Vite，333 个 JS chunk），iOS 壳直接复用。
桥协议：标准 Capacitor native bridge（assets/native-bridge.js 为证），iOS 侧自写 Swift WKWebView 壳实现同一协议（webkit.messageHandlers.bridge → Capacitor.fromNative 回调）。

## 配置（assets/capacitor.config.json）
- appId io.github.huleixin.tingyu，appName 听屿，server hostname localhost / scheme https
- 官方插件仅 3 个：Browser、SplashScreen、StatusBar（均需在壳里实现）

## 自定义插件（JS 注册名 → 安卓类 → iOS 处置）

### TingyuPlayback（playback/TingyuPlaybackPlugin）— 核心，AVPlayer 重写
command, compatiblePlayback, setNativePlaylist({mode,loopAll,quality,tracks,browserBeforePlay,previous}), setNativePlaylistMode,
setLxScript, validateLxScript, cancelLxValidation, lxSourceStatus, lxHttp, cancelLxHttp, setResolverCredentials,
resourceSnapshot, resourceCache, resourceCandidates, resourcePlatformResult, readSongResources, cacheSongLyrics,
audioCacheBegin/Append/Finish/Release, audioOffline, startSleepTimer, cancelSleepTimer, getSleepTimerState,
savePlaybackRecovery, readPlaybackRecovery, checkpointPlaybackRecovery, drainListeningSessions, clearListeningSessions,
diagnostics, playbackDiagnostics, clearPlaybackDiagnostics, reportEngineState, probe, resetForTest,
configureUsbAudio, usbAudioState, dolbyCapabilities
事件：state / update / resourceReady / mediaAction / sleepTimerStateChanged

### FoliaNative（FoliaNativePlugin）— 大杂烩，分组实现
- 网络：httpRequest, performHttpRequest, cancelHttpRequest（URLSession）
- Cookie：cookiesGet, cookiesGetAll, cookiesSet, cookiesRemove, cookiesRemoveBatch（WKHTTPCookieStore/HTTPCookieStorage）
- 安全存储：getSecureItem, setSecureItem, removeSecureItem（Keychain）
- 本地音频：scanLocalAudio, cancelLocalAudioScan, resolveLocalAudioScan, inspectScanDirectories, localAudioInfo,
readLocalAudioBytes, readEmbeddedCover, readLocalLyricSidecar, copyLocalAudio, deleteImportedAudio,
localAudioServerPort, registerRemoteAudio, completePickedAudioImport（文档选择器+安全作用域书签；事件 localAudioScanProgress）
- 文件选择：pickAudioFiles, pickAudioFolder, pickLxSourceFile, pickScanDirectory, pickSettingsFiles, readSettingsFileChunk, releaseSettingsFiles
- 播放状态同步：updatePlaybackState, applyPlaybackState, clearPlaybackState, getPlaybackDiagnostics, recordPlaybackHeartbeat, preparePlaybackTestTone
- 更新/公告：checkAppUpdate, getAppUpdateStatus, setAppUpdateChannel, openAppUpdateDialog, openAppReleaseHistory,
getAnnouncementSummary, openAnnouncementCenter, openBetaActivationDialog, leaveBetaProgram（iOS 侧返回无更新/空公告桩）
- 诊断：diagnosticEvent, diagnosticSession, recordDiagnosticEvent, recordRuntimeDiagnostic, cloudDiagnosticSnapshot,
getCrashDiagnostics, clearCrashDiagnostics, exportDiagnosticPackage, deleteDiagnosticFiles, clearDiagnosticData,
getTelemetryStatus, setTelemetryEnabled, reportCompatListening（本地空实现为主）
- 布局/系统：getAdaptiveLayout, setAdaptiveLayout, getDisplayCutout, getMainWindowInsets（事件 mainWindowInsetsChanged）,
getPhoneFitLayout, setPhoneFitLayout, getStageOrientation, setStageOrientation（事件 stageOrientationChanged）,
setMainSystemBarsVisible, setKeepScreenOn, setBackHandlerState, startupStage, exitApp, moveTaskToBack（iOS 桩/近似）
- 分享：saveImageToGallery, shareImageFile, shareTextFile（UIActivityViewController / PHPhotoLibrary）
- 视觉：selectSongVisualizerMode
- 背屏歌词全组：captureRearFaultDiagnostics, clearRearFaultDiagnostics, getRearLyricsRuntimeState, getRearLyricsStatus,
publishRearLyricsSnapshot, returnFromRearLyrics, setRearCardAod, setRearCardKeepAwake, setRearControlEngine,
setRearCoverSleep, setRearLockedRoute, setRearLyricsBackend, startRearLyrics

### TingyuChrome（chrome/TingyuChromePlugin + BrandLaunchPlugin）— 安卓原生舞台 UI，iOS 以桩为主
appearance, clock, shell, update, remove, pageUpdate, pageRemove, panelUpdate, panelRemove, playerStyle,
minimalPlayerFrame, minimalPlayerRelease, minimalQueue, minimalQueueCurrent, minimalTools, openMinimalQueue,
openMinimalTools, openSleepTimer, openDiscoveryCovers, setDiscoveryCoverScope, openThirdPartyLicenses,
graphicsProbe, graphicsConfigure, motionPreference, navigationDiagnostics, getStageLayout, getStageControlBlock,
collapseStage, probe, openUsbAudioSettings
事件：action, pageAction, panelAction, stageLayout, stageControlBlock, playerStyleChanged, appearanceChanged, motionPreferenceChanged

### TingyuLyrics（lyrics/TingyuLyricsPlugin）— 桩
bluetoothPermission, requestBluetooth, openSettings, restoreStyle, snapshot

### FoliaColorOsLyrics（coloros/）— 安卓独占，桩
clear, isSupported(=false), markUserChoice, publish, setLyricOffset, setVariantRule, status

### TingyuGlass（glass/）— 桩
probe, update, hide

### TingyuPro（pro/ProEntitlementPlugin）— 权益按他指示砍掉，返回未开通状态
callCloudAi, claimPromoCampaign, getPromoStatus, getStatus, recoverAccount, redeemCard, refreshStatus, resetRecoveryCode, unbindDevice

## LX 音源
安卓用 libquickjs.so 跑 LX 脚本（LxAudioProxy + TingyuPlayback.setLxScript/lxHttp）。iOS 用 JavaScriptCore 实现同一 LX 运行时接口。
Beans 的 1010-mobile.js / ikun 音源可作测试脚本（~/workspace/your_files/）。

## 砍掉清单（他 2026-11-25 拍板）
背屏歌词（Shizuku/LSPosed/Rear* 全组）、USB 独占输出、权益/Pro 功能（音效 Pro、AI 调音、Hi-Fi 权益）。

## 内置音源（他 2026-11-25 21:34 拍板放进 App）
- web/builtin-sources/1010-mobile.js（21,307 字节，v1.2.0，五平台聚合）
- web/builtin-sources/ikun-music-source.js（3,716 字节，v26）
- 落地方式：文件随包发；FoliaNative.pickLxSourceFile 实现时优先给出这两个内置源（拷入沙盒后走原导入流），
  免去他再从文件 App 找。LX 管理界面的预置列表格式（web 侧 store）仍在追，未确认前不硬塞 localStorage/IDB。

## 平台 API 的真身：folia-extension-bridge（2026-11-25 22:10 查明）
- 构建变量 VITE_NETEASE_API_BASE / VITE_QQ_API_BASE / VITE_KUGOU_API_BASE 全是 `extension`：网页层不直连平台 API，而是走 postMessage 桥找「扩展」代发。
- 协议（providerRegistry-BuBc_mfU.js）：页面 window.postMessage({source:'folia-web-page', type:'FOLIA_BRIDGE_PING'})；扩展回 {source:'folia-extension-bridge', type:'FOLIA_BRIDGE_PONG'|'FOLIA_BRIDGE_READY', version, extId}（监听方要求 e.source===window，即扩展必须与页面同 window 运行）。请求 {type:'FOLIA_API_REQUEST', id, provider, operation, ...}，响应 {type:'FOLIA_API_RESPONSE', id, ok, data|error}。
- Nt() 调用形状：netease={operation:path 名（如 /weapi/...), path, method, query, body, headers}（页面自备加密 body，扩展只做带 Cookie 的传输，真实主机 music.163.com / interface.music.163.com）；qq={operation, method, path, params}；qq_raw={operation:'musicu', method:'POST', body}（POST u.y.qq.com/cgi-bin/musicu.fcg）；kugou/qishui/bodian={operation, params}（需扩展内建 operation→URL+签名表，汽水的 runtime-unavailable 即指这层缺失）。
- 扩展允许域名白名单 Ji：music.163.com、interface.music.163.com、interface3.music.163.com、c.y.qq.com、u.y.qq.com、ssl.ptlogin2.qq.com、xui.ptlogin2.qq.com、graph.qq.com 等。
- 上游开源仓库 chthollyphile/folia-major（桌面版，sources/ 下有 netease/qq/kugou/qishui/bodian 的 TS 实现）可作 operation 表移植来源；扩展本体是 Tingyu 闭源移动端组件，安卓靠原生注入与页面同 window 运行。
- iOS 实现方案：在 WKWebView 注入 JS shim（document start）冒充扩展：答 PING、把 FOLIA_API_REQUEST 转发 FoliaNative.extensionRequest（新增原生法），Swift 用共享 Cookie 存储的 URLSession 代发，回来后 shim 回投 FOLIA_API_RESPONSE。先做 netease/qq/qq_raw 传输型，再移植 kugou/bodian/qishui 操作表。

## 扩展桥看门狗（2026-11-25 22:40 新增）
- 真机首验：界面能开，但网易云扫码登录报「连不上 API 服务器（extension→localhost）」，即设备上 folia 桥未生效（桌面 Chromium 同桥复现全通，故断点在 WKWebView 环境/原生应答差异，无法远程确诊是哪一环）。
- 对策 App/ext-watchdog.js（随桥脚本注入）：load 后 2.5s 起 PING 探测（失败隔 3s 再试），再发 /login/qr/key 探针（收到任何 FOLIA_API_RESPONSE 即算通）；不通则自装等价接线（chrome 垫片走 FoliaNative cookies*、fetch 按 Ji 白名单走 FoliaNative.httpRequest、message 监听 + 动态 import folia-DsqYZxm6.js 的 handleFoliaApiRequest 应答），并在屏幕左上显示 12 秒状态徽章（EXT shim | ping/api 结果）供截图诊断；健康时完全隐形。
- 已本地验证：健康场景不干预；人为破坏 main chunk 注册门（if(true)return）后看门狗全量接管且 PING/API 应答与原生路径一致。
