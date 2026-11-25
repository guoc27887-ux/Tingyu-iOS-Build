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
