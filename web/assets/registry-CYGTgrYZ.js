import{B as e,Lr as t,Vr as n,ri as r,ti as i}from"./md5-UtpR8CWv.js";import{n as a,o}from"./react-vendor-CbA1u6HB.js";import{$i as s,Ai as c,Ca as l,Ea as u,Ga as d,Ii as f,Li as p,Ni as m,Oa as h,Qi as g,Yi as _,Zi as v,_a as y,aa as b,ao as x,ba as S,bo as C,co as w,da as T,ea as E,fa as D,ga as ee,ia as te,io as ne,ja as re,ka as ie,la as ae,ma as oe,na as O,no as se,oa as ce,pa as le,ra as ue,ro as de,sa as fe,ua as pe,xa as k,yo as me,zi as he}from"./noLyricLines-BzL-NvAK.js";import{$ as ge,Co as _e,Gr as ve,L as ye,Va as be,_i as xe,ai as Se,dn as Ce,k as we,r as Te,yn as Ee}from"./lucide-icons-C3wv_8J1.js";import{G as De,L as Oe,V as ke,at as Ae,ct as je,lt as Me,st as Ne,z as A}from"./motionSignals-B0bNcZfY.js";import{t as Pe}from"./FastColorPicker-B10biEJU.js";function Fe(...e){let t=!Array.isArray(e[0]),n=t?0:-1,r=e[0+n],i=e[1+n],a=e[2+n],o=e[3+n],s=w(i,a,o);return t?s(r):s}var Ie=new Set,Le=({timestamp:e})=>{Ie.forEach(t=>t.tick(e))},Re=class extends se{constructor(e){super(),this.state=`idle`,this.startTime=0,this.currentTime=0,this.started=!1,this.hasNextTarget=!1,this.nextTarget=0,this.stop=()=>{this.state!==`idle`&&(this.teardown(),this.options.onStop?.())},this.options=e,de(e),this.factory=e.type||x,this.generator=this.factory(e);let{driver:t}=e;t&&(this.driver=t(e=>this.tick(e))),this.startTime=this.now(),this.state=`running`,this.driver?this.driver.start():(Ie.size||Me.update(Le,!0),Ie.add(this))}setTarget(e,t){this.nextTarget=e,this.nextVelocity=t,this.hasNextTarget=!0}retarget(e,t){let{options:n,generator:r}=this;n.keyframes=e,n.velocity=t,this.startTime=this.now(),this.currentTime=0,r.retarget?r.retarget(e,t):this.generator=this.factory(n)}tick(e){let{options:t,hasNextTarget:n}=this,{delay:r=0,onUpdate:i,onPlay:a}=t,o=Math.round(e-this.startTime)-r,s=this.currentTime=Math.max(0,o),c=this.generator.next(s),l=o<0?t.keyframes[0]:c.value;if(n){this.hasNextTarget=!1;let{keyframes:e}=t;e[0]=l,e[1]=this.nextTarget,this.retarget(e,this.nextVelocity??this.getGeneratorVelocity())}(n||!this.started)&&(this.started=!0,a?.()),this.state===`running`&&(i?.(l),c.done&&o>=0&&!n&&!this.hasNextTarget&&this.state===`running`&&(this.notifyFinished(),this.teardown(),this.state=`finished`,t.onComplete?.()))}getGeneratorVelocity(){return ne(this.generator,this.currentTime,this.options.velocity)}now(){return this.driver?this.driver.now():Ne.now()}teardown(){this.state=`idle`,this.driver?this.driver.stop():(Ie.delete(this),Ie.size||je(Le))}};function ze(e,t,n={}){let r=e.get(),i=null,a,o=typeof r==`string`?r.replace(/[\d.-]/g,``):void 0,s=e=>a(o?e+o:e),c=()=>e.events.animationStart?.notify(),l=()=>{i&&=(i.stop(),null),e.animation=void 0};if(e.attach((t,r)=>{a=r;let o=Ve(t);if(i?.state===`running`){i.setTarget(o,n.velocity);return}let u=Ve(e.get()),d=i?i.getGeneratorVelocity():e.getVelocity();if(l(),u===o)return;let f=i=new Re({keyframes:[u,o],velocity:d,type:`spring`,restDelta:.001,restSpeed:.01,...n,onUpdate:s,onPlay:c});e.animation=f,f.then(()=>{i===f&&(i=null,e.animation=void 0,e.events.animationComplete?.notify())})},l),d(t)){let r=n.skipInitialAnimation===!0,i=t.on(`change`,t=>{r?(r=!1,e.jump(Be(t,o),!1)):e.set(Be(t,o))}),a=e.on(`destroy`,i);return()=>{i(),a()}}return l}function Be(e,t){return t?e+t:e}function Ve(e){return typeof e==`number`?e:parseFloat(e)}var j=r(o(),1);function He(e,t){let n=u(t()),r=()=>n.set(t());return r(),me(()=>{let t=()=>Me.preRender(r,!1,!0),n=e.map(e=>e.on(`change`,t));return()=>{n.forEach(e=>e()),je(r)}}),n}function Ue(e){Ae.current=[],e();let t=He(Ae.current,e);return Ae.current=void 0,t}function We(e,t,n,r){if(typeof e==`function`)return Ue(e);if(n!==void 0&&!Array.isArray(n)&&typeof t!=`function`)return Ke(e,t,n,r);let i=typeof t==`function`?t:Fe(t,n,r),a=Array.isArray(e)?Ge(e,i):Ge([e],([e])=>i(e)),o=Array.isArray(e)?void 0:e.accelerate;return o&&!o.isTransformed&&typeof t!=`function`&&Array.isArray(n)&&r?.clamp!==!1&&(a.accelerate={...o,times:t,keyframes:n,isTransformed:!0,...r?.ease?{ease:r.ease}:{}}),a}function Ge(e,t){let n=C(()=>[]);return He(e,()=>{n.length=0;let r=e.length;for(let t=0;t<r;t++)n[t]=e[t].get();return t(n)})}function Ke(e,t,n,r){let i=C(()=>Object.keys(n)),a=C(()=>({}));for(let o of i)a[o]=We(e,t,n[o],r);return a}function qe(e,t={}){let{isStatic:n}=(0,j.useContext)(re),r=()=>d(e)?e.get():e;if(n)return We(r);let i=u(r());return(0,j.useInsertionEffect)(()=>ze(i,e,t),[i,JSON.stringify(t)]),i}function Je(e,t={}){return qe(e,{type:`spring`,...t})}var M=a(),Ye=e=>e,Xe=({onClick:e,label:t,title:n,isDaylight:r})=>(0,M.jsx)(`button`,{type:`button`,onClick:e,className:`h-6 rounded-md px-1.5 text-[10px] font-bold transition-all ${r?`bg-white shadow-sm hover:bg-white/90`:`bg-white/20 shadow-sm hover:bg-white/30`}`,title:n,"aria-label":n,children:t}),Ze=({active:e,onToggle:t,label:n,theme:r,children:i})=>(0,M.jsx)(`button`,{type:`button`,onClick:t,className:`flex h-6 w-6 items-center justify-center rounded-md transition-all ${e?``:`opacity-40 hover:opacity-100`}`,style:e?{color:r.accentColor}:void 0,title:n,"aria-label":n,"aria-pressed":e,children:i}),N=({label:e,description:t,checked:n,onChange:r,theme:i})=>(0,M.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,"data-settings-style":`{"align":"between","gap":16}`,"data-settings-layout":`row`,children:[(0,M.jsxs)(`div`,{className:`space-y-1`,"data-settings-style":`{"gap":4,"grow":true}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:i.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:e}),t&&(0,M.jsx)(`div`,{className:`max-w-[320px] text-xs opacity-70`,style:{color:i.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:t})]}),(0,M.jsx)(`button`,{type:`button`,"aria-pressed":n,disabled:!r,onClick:()=>r?.(!n),className:`h-6 w-12 shrink-0 rounded-full p-1 transition-colors disabled:opacity-45`,style:{backgroundColor:n?i.secondaryColor:k(i.secondaryColor,.18)},"data-settings-style":`{"height":24,"width":48,"radius":64,"padding":[4,4,4,4]}`,"data-settings-layout":`column`,"data-settings-swatch":n?i.secondaryColor:k(i.secondaryColor,.18),children:(0,M.jsx)(`div`,{className:`h-4 w-4 rounded-full shadow-sm transition-transform ${n?`translate-x-6`:`translate-x-0`}`,style:{backgroundColor:i.backgroundColor},"data-settings-style":`{"height":16,"width":16,"radius":64}`,"data-settings-layout":`column`,"data-settings-swatch":i.backgroundColor})})]}),Qe=({config:e,actions:t,t:n,theme:r,controlCardBg:i,rangeInputClass:a,onSliderPointerDown:o,onSliderCommit:s})=>{let c=e?.common,l=t?.common,u=k(r.secondaryColor,.16),d=c?.opacity??.75;return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:u},"data-settings-style":`{"radius":24,"border":true,"gap":16,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(N,{label:n(`options.disableVisualizerVignette`),description:n(`options.disableVisualizerVignetteDesc`),checked:c?.disableVignette??!1,onChange:l?.onDisableVignetteChange,theme:r}),(0,M.jsx)(N,{label:n(`options.disableVisualizerGeometricBackground`),description:n(`options.disableVisualizerGeometricBackgroundDesc`),checked:c?.disableGeometricBackground??!1,onChange:l?.onDisableGeometricChange,theme:r})]}),(0,M.jsx)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:i,borderColor:u},"data-settings-style":`{"radius":24,"border":true,"gap":16,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:r.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:n(`options.previewCoverBackgroundSettings`)}),(0,M.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:r.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:n(`options.previewCoverBackgroundSettingsDesc`)}),(0,M.jsx)(N,{label:n(`theme.addCoverColor`),description:n(`options.coverColorBackgroundDesc`),checked:c?.useCoverColorBg??!1,onChange:l?.onCoverColorChange,theme:r}),(0,M.jsxs)(`div`,{className:`flex items-center justify-between text-sm`,style:{color:r.primaryColor},"data-settings-style":`{"align":"between","font":14}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`span`,{"data-settings-style":`{"grow":true}`,"data-settings-layout":`wrap`,children:n(`options.previewCoverBackgroundOpacity`)}),(0,M.jsxs)(`span`,{className:`font-mono opacity-70`,style:{color:r.secondaryColor},"data-settings-layout":`wrap`,children:[Math.round(d*100),`%`]})]}),(0,M.jsx)(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:d,onChange:e=>l?.onOpacityChange?.(Number(e.target.value)),onPointerDown:o,onPointerUp:s,className:a,"data-settings-layout":`column`})]})})]})},P=24,$e=96,et=()=>{if(typeof navigator>`u`)return!1;let e=navigator.userAgent,t=/iPad|iPhone|iPod/i.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1,n=/WebKit/i.test(e),r=/CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|YaBrowser|GSA/i.test(e);return t&&n&&!r},tt=e=>new Promise(t=>{if(typeof document>`u`){t(null);return}let n=new Image;n.crossOrigin=`anonymous`,n.decoding=`async`,n.onload=()=>{try{let e=document.createElement(`canvas`),r=document.createElement(`canvas`);e.width=P,e.height=P,r.width=$e,r.height=$e;let i=e.getContext(`2d`),a=r.getContext(`2d`);if(!i||!a){t(null);return}let o=n.naturalWidth||n.width,s=n.naturalHeight||n.height,c=Math.min(o,s),l=Math.max(0,(o-c)/2),u=Math.max(0,(s-c)/2);i.imageSmoothingEnabled=!0,i.imageSmoothingQuality=`high`,i.drawImage(n,l,u,c,c,0,0,P,P),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality=`high`,a.globalAlpha=1,a.drawImage(e,0,0,P,P,0,0,$e,$e),[{x:-8,y:-8,size:112,alpha:.22},{x:6,y:0,size:$e,alpha:.14},{x:0,y:6,size:$e,alpha:.14}].forEach(({x:t,y:n,size:r,alpha:i})=>{a.globalAlpha=i,a.drawImage(e,0,0,P,P,t,n,r,r)}),a.globalAlpha=1,t(r.toDataURL(`image/jpeg`,.72))}catch(e){console.warn(`[FluidBackground] Failed to build soft focus cover`,e),t(null)}},n.onerror=()=>t(null),n.src=e}),nt=384,rt=(e,t)=>new Promise(n=>{if(typeof document>`u`){n(null);return}let r=new Image;r.crossOrigin=`anonymous`,r.decoding=`async`,r.onload=()=>{try{let e=r.naturalWidth||r.width,i=r.naturalHeight||r.height;if(!e||!i){n(null);return}let a=Math.min(1,t/Math.max(e,i)),o=Math.max(1,Math.round(e*a)),s=Math.max(1,Math.round(i*a)),c=document.createElement(`canvas`);c.width=o,c.height=s;let l=c.getContext(`2d`);if(!l){n(null);return}l.imageSmoothingEnabled=!0,l.imageSmoothingQuality=`high`,l.drawImage(r,0,0,o,s),n(c.toDataURL(`image/jpeg`,.82))}catch(e){console.warn(`[FluidBackground] Failed to downscale cover`,e),n(null)}},r.onerror=()=>n(null),r.src=e}),it=(0,j.memo)(({coverUrl:e,theme:t})=>{let r=(0,j.useMemo)(et,[]),[i,a]=(0,j.useState)(null);(0,j.useEffect)(()=>{let t=!1;return!r||!e?(a(null),()=>{t=!0}):(a(null),tt(e).then(e=>{t||a(e)}),()=>{t=!0})},[e,r]);let o=(0,j.useRef)(0),[s,c]=(0,j.useState)([]),[l,u]=(0,j.useState)(()=>new Set);(0,j.useEffect)(()=>{if(r)return;if(!e){c([]);return}let t=!1;return rt(e,nt).then(n=>{if(t)return;let r=n??e;c(t=>{let n=t[t.length-1];return n&&n.sourceCover===e?t:(o.current+=1,[...n?[n]:[],{url:r,sourceCover:e,key:o.current}])})}),()=>{t=!0}},[e,r]);let d=(0,j.useCallback)(e=>{u(t=>t.has(e)?t:new Set(t).add(e))},[]),f=r?i??e??null:null,p=r&&!!i,m=(0,j.useMemo)(()=>r?{transform:`scale(${p?1.28:1.2}) translateZ(0)`,opacity:p?.94:.3,willChange:`transform, opacity`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`}:{filter:`blur(40px)`,transform:`scale(1.5) translateZ(0)`,opacity:1,willChange:`transform, opacity, filter`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`},[r,p]);return(0,M.jsxs)(`div`,{className:`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0`,style:{isolation:`isolate`,contain:`paint`,transform:`translateZ(0)`},children:[e?(0,M.jsxs)(M.Fragment,{children:[r?(0,M.jsx)(`img`,{src:f??e,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out`,style:m}):s.map((e,t)=>{let r=t===s.length-1,i=l.has(e.key);return(0,M.jsx)(h.div,{className:`absolute inset-0 w-full h-full`,style:{willChange:`opacity`},initial:{opacity:+!r},animate:{opacity:r&&!i?0:1},transition:{duration:1.5,ease:`easeInOut`},onAnimationComplete:()=>{r&&i&&(c(t=>t.filter(t=>t.key===e.key)),u(t=>t.has(e.key)?new Set([e.key]):t))},children:(0,M.jsx)(`img`,{src:e.url,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover`,style:m,ref:t=>{t&&!l.has(e.key)&&t.decode().then(()=>n(()=>d(e.key))).catch(()=>d(e.key))},onError:()=>{c(t=>t.length>1?t.filter(t=>t.key!==e.key):t)}})},e.key)}),r&&(0,M.jsxs)(M.Fragment,{children:[!p&&(0,M.jsx)(`img`,{src:e,alt:``,"aria-hidden":`true`,draggable:!1,decoding:`async`,className:`absolute inset-0 w-full h-full object-cover`,style:{transform:`scale(1.36) translateZ(0)`,opacity:.12,willChange:`transform, opacity`,backfaceVisibility:`hidden`,WebkitBackfaceVisibility:`hidden`}}),(0,M.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{backgroundColor:t.backgroundColor,opacity:.28}}),(0,M.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{background:`radial-gradient(circle at 20% 20%, ${t.accentColor}55 0%, transparent 42%), radial-gradient(circle at 80% 28%, ${t.secondaryColor}50 0%, transparent 44%), radial-gradient(circle at 50% 78%, ${t.primaryColor}28 0%, transparent 52%)`,opacity:p?.52:.7}})]})]}):(0,M.jsx)(`div`,{className:`absolute inset-0 w-full h-full transition-colors duration-1000`,style:{backgroundColor:t.backgroundColor,opacity:.8}}),(0,M.jsx)(`div`,{className:`absolute inset-0 w-full h-full`,style:{background:`linear-gradient(to bottom right, ${t.primaryColor}, transparent, ${t.secondaryColor})`,opacity:r?.2:.4,mixBlendMode:r?`normal`:`overlay`}})]})},(e,t)=>{if(e.coverUrl!==t.coverUrl)return!1;let n=e.theme,r=t.theme;return n.backgroundColor===r.backgroundColor&&n.primaryColor===r.primaryColor&&n.secondaryColor===r.secondaryColor}),at=e=>{let t=e?.join(`
`)??``;return(0,j.useEffect)(()=>{t&&ee(t.split(`
`))},[t]),(0,j.useSyncExternalStore)(S,le,le)},ot=e=>{switch(e.type){case`circle`:return`bass`;case`square`:return`lowMid`;case`triangle`:return`mid`;case`cross`:return`treble`;case`icon`:return`vocal`;default:return`default`}},st=e=>e===`triangle`?`polygon(50% 0%, 0% 100%, 100% 100%)`:e===`cross`?`polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)`:`none`,ct=(e,t)=>{let n=(e.type===`circle`||e.type===`square`)&&!e.filled;return{left:`${e.initialX}%`,top:`${e.initialY}%`,width:e.size,height:e.size,border:n?`1px solid ${t.secondaryColor}`:`none`,backgroundColor:n?`transparent`:t.secondaryColor,borderRadius:e.type===`circle`?`50%`:`0%`,opacity:e.opacity,clipPath:st(e.type)}},lt=({disabled:e=!1})=>e?null:(0,M.jsx)(`div`,{className:`absolute inset-0 pointer-events-none`,style:{background:`radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)`}}),ut=({theme:e,shapes:t,particles:n,hideShapes:r,disableVignette:i})=>(0,M.jsxs)(`div`,{className:`absolute inset-0`,children:[!r&&(0,M.jsxs)(M.Fragment,{children:[t.map(t=>{if(t.type===`icon`&&t.iconName){if(oe(t.iconName)===`loading`)return null;let n=y(t.iconName);if(n)return(0,M.jsx)(`div`,{className:`absolute flex items-center justify-center`,style:{left:`${t.initialX}%`,top:`${t.initialY}%`,width:t.size,height:t.size,color:e.secondaryColor,opacity:t.opacity,transform:`rotate(${t.initialRotation}deg)`},children:(0,M.jsx)(n,{size:t.size,strokeWidth:1,absoluteStrokeWidth:!0})},t.id)}return(0,M.jsx)(`div`,{className:`absolute`,style:{...ct(t,e),transform:`rotate(${t.initialRotation}deg)`}},t.id)}),n.map(t=>(0,M.jsx)(`div`,{className:`absolute rounded-full`,style:{backgroundColor:e.accentColor,width:t.size,height:t.size,left:`${t.left}%`,top:`${t.top}%`,opacity:t.opacity}},`p-${t.id}`))]}),(0,M.jsx)(lt,{disabled:i})]}),dt=({theme:e,audioPower:t,audioBands:n,shapes:r,particles:i,hideShapes:a,disableVignette:o})=>{let s=e=>We(Je(e||t,{stiffness:300,damping:30}),[10,200],[.95,1.45]),c={bass:s(n?.bass),lowMid:s(n?.lowMid),mid:s(n?.mid),vocal:s(n?.vocal),treble:s(n?.treble),default:s(t)};return(0,M.jsxs)(`div`,{className:`absolute inset-0`,children:[!a&&(0,M.jsxs)(M.Fragment,{children:[r.map(t=>{if(t.type===`icon`&&t.iconName){if(oe(t.iconName)===`loading`)return null;let n=y(t.iconName);if(n)return(0,M.jsx)(h.div,{className:`absolute flex items-center justify-center`,style:{left:`${t.initialX}%`,top:`${t.initialY}%`,width:t.size,height:t.size,color:e.secondaryColor,scale:c.vocal},animate:{y:t.reverse?[-30,30,-30]:[30,-30,30],x:t.reverse?[15,-15,15]:[-15,15,-15],rotate:[t.initialRotation,t.initialRotation+360],opacity:[0,t.opacity*3,0]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay,opacity:{duration:t.duration*.5,repeat:1/0,ease:`easeInOut`,delay:t.delay}},children:(0,M.jsx)(n,{size:t.size,strokeWidth:1,absoluteStrokeWidth:!0})},t.id)}return(0,M.jsx)(h.div,{className:`absolute`,style:{...ct(t,e),scale:c[ot(t)]},animate:{y:t.reverse?[-30,30,-30]:[30,-30,30],x:t.reverse?[15,-15,15]:[-15,15,-15],rotate:[t.initialRotation,t.initialRotation+360]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay}},t.id)}),i.map(t=>(0,M.jsx)(h.div,{className:`absolute rounded-full`,style:{backgroundColor:e.accentColor,width:t.size,height:t.size,left:`${t.left}%`,top:`${t.top}%`,opacity:t.opacity},animate:{y:[0,-100],opacity:[0,t.opacity,0]},transition:{duration:t.duration,repeat:1/0,ease:`linear`,delay:t.delay}},`p-${t.id}`))]}),(0,M.jsx)(lt,{disabled:o})]})},ft=({theme:e,audioPower:t,audioBands:n,seed:r,hideShapes:i=!1,disableVignette:a=!1,paused:o=!1})=>{at(e.lyricsIcons);let s=(0,j.useMemo)(()=>{let t=[`circle`,`square`,`triangle`,`cross`],n=e.lyricsIcons||[],r=0;return Array.from({length:15}).map((e,i)=>{let a=n.length>0&&Math.random()>.7&&r<6;a&&(r+=1);let o=a?n[Math.floor(Math.random()*n.length)]:null;return{id:i,type:a?`icon`:t[Math.floor(Math.random()*t.length)],iconName:o,initialX:Math.random()*100,initialY:Math.random()*100,size:40+Math.random()*100,duration:a?20+Math.random()*20:30+Math.random()*30,delay:Math.random()*5,opacity:.11+Math.random()*.08,reverse:Math.random()>.5,filled:Math.random()<.3,initialRotation:Math.random()*360}})},[e.lyricsIcons,r]),c=(0,j.useMemo)(()=>Array.from({length:20}).map((e,t)=>({id:t,size:Math.random()*4+1,left:Math.random()*100,top:Math.random()*100,opacity:Math.random()*.3,duration:15+Math.random()*20,delay:Math.random()*10})),[r]);return(0,M.jsx)(h.div,{className:`absolute inset-0`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.6,ease:`easeInOut`},children:o?(0,M.jsx)(ut,{theme:e,shapes:s,particles:c,hideShapes:i,disableVignette:a}):(0,M.jsx)(dt,{theme:e,audioPower:t,audioBands:n,shapes:s,particles:c,hideShapes:i,disableVignette:a})})},pt=j.memo(e=>{let t=String(e.seed??`default`);return(0,M.jsx)(`div`,{className:`absolute inset-0 overflow-hidden pointer-events-none`,children:(0,M.jsx)(ie,{mode:`sync`,children:(0,M.jsx)(ft,{...e},t)})})},(e,t)=>{if(e.seed!==t.seed||e.audioPower!==t.audioPower||e.hideShapes!==t.hideShapes||e.disableVignette!==t.disableVignette||e.paused!==t.paused)return!1;let n=e.audioBands,r=t.audioBands;if(!n!=!r)return!1;let i=!0;if(n&&r&&(i=n.bass===r.bass&&n.lowMid===r.lowMid&&n.mid===r.mid&&n.vocal===r.vocal&&n.treble===r.treble),!i)return!1;let a=e.theme,o=t.theme,s=a.backgroundColor===o.backgroundColor&&a.primaryColor===o.primaryColor&&a.secondaryColor===o.secondaryColor&&a.accentColor===o.accentColor,c=!!(a.lyricsIcons===o.lyricsIcons||a.lyricsIcons?.length===o.lyricsIcons?.length&&a.lyricsIcons?.every((e,t)=>e===o.lyricsIcons?.[t]));return s&&c}),mt=i({default:()=>ht}),ht=Ye({mode:`common`,order:10,labelKey:`options.visualizerBackgroundModeCommon`,labelFallback:`Common`,render:({config:e,theme:t,coverUrl:n,audioPower:r,audioBands:i,seed:a,staticMode:o,paused:s})=>{let c=e?.common,l=c?.useCoverColorBg??!1;return(0,M.jsxs)(M.Fragment,{children:[l&&(0,M.jsx)(h.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:1},className:`absolute inset-0 z-0`,children:(0,M.jsx)(it,{coverUrl:n,theme:t})},`fluid-bg`),(0,M.jsx)(`div`,{className:`absolute inset-0 z-0 transition-all duration-1000`,style:{backgroundColor:t.backgroundColor,opacity:l?c?.opacity??.75:1}}),!o&&(0,M.jsx)(`div`,{className:`absolute inset-0 z-0`,children:(0,M.jsx)(pt,{theme:t,audioPower:r,audioBands:i,seed:a,hideShapes:c?.disableGeometricBackground??!1,disableVignette:c?.disableVignette??!1,paused:s})})]})},renderSettingsPanel:e=>(0,M.jsx)(Qe,{...e}),renderQuickControls:({config:e,actions:t,t:n,theme:r})=>{let i=e?.common?.useCoverColorBg??!1;return(0,M.jsx)(Ze,{active:i,theme:r,label:n(i?`theme.addCoverColor`:`theme.useDefaultColor`),onToggle:()=>t?.common?.onCoverColorChange?.(!i),children:(0,M.jsx)(be,{size:14})})},resetSettings:e=>{e?.common?.onOpacityChange?.(.75),e?.common?.onCoverColorChange?.(!1),e?.common?.onDisableVignetteChange?.(!1),e?.common?.onDisableGeometricChange?.(!1)}}),gt={maxColorCount:10},_t=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${gt.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${O}
${ce}
${b}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${gt.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,vt=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${fe}
${O}
${te}
${b}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,yt={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},bt={random:1,"2x2":2,"4x4":3,"8x8":4},xt=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_contrast;
uniform float u_roughness;
uniform float u_fiber;
uniform float u_fiberSize;
uniform float u_crumples;
uniform float u_crumpleSize;
uniform float u_folds;
uniform float u_foldCount;
uniform float u_drops;
uniform float u_seed;
uniform float u_fade;

uniform sampler2D u_noiseTexture;

in vec2 v_imageUV;

out vec4 fragColor;

float getUvFrame(vec2 uv) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);

  float left   = smoothstep(0., aax, uv.x);
  float right = 1. - smoothstep(1. - aax, 1., uv.x);
  float bottom = smoothstep(0., aay, uv.y);
  float top = 1. - smoothstep(1. - aay, 1., uv.y);

  return left * right * bottom * top;
}

${O}
${ce}
${ae}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
float fbm(vec2 n) {
  float total = 0.0, amplitude = .4;
  for (int i = 0; i < 3; i++) {
    total += valueNoise(n) * amplitude;
    n *= 1.99;
    amplitude *= 0.65;
  }
  return total;
}


float randomG(vec2 p) {
  vec2 uv = floor(p) / 50. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float roughness(vec2 p) {
  p *= .1;
  float o = 0.;
  for (float i = 0.; ++i < 4.; p *= 2.1) {
    vec4 w = vec4(floor(p), ceil(p));
    vec2 f = fract(p);
    o += mix(
    mix(randomG(w.xy), randomG(w.xw), f.y),
    mix(randomG(w.zy), randomG(w.zw), f.y),
    f.x);
    o += .2 / exp(2. * abs(sin(.2 * p.x + .5 * p.y)));
  }
  return o / 3.;
}

${ue}

vec2 randomGB(vec2 p) {
  vec2 uv = floor(p) / 50. + .5;
  return texture(u_noiseTexture, fract(uv)).gb;
}
float crumpledNoise(vec2 t, float pw) {
  vec2 p = floor(t);
  float wsum = 0.;
  float cl = 0.;
  for (int y = -1; y < 2; y += 1) {
    for (int x = -1; x < 2; x += 1) {
      vec2 b = vec2(float(x), float(y));
      vec2 q = b + p;
      vec2 q2 = q - floor(q / 8.) * 8.;
      vec2 c = q + randomGB(q2);
      vec2 r = c - t;
      float w = pow(smoothstep(0., 1., 1. - abs(r.x)), pw) * pow(smoothstep(0., 1., 1. - abs(r.y)), pw);
      cl += (.5 + .5 * sin((q2.x + q2.y * 5.) * 8.)) * w;
      wsum += w;
    }
  }
  return pow(wsum != 0.0 ? cl / wsum : 0.0, .5) * 2.;
}
float crumplesShape(vec2 uv) {
  return crumpledNoise(uv * .25, 16.) * crumpledNoise(uv * .5, 2.);
}


vec2 folds(vec2 uv) {
  vec3 pp = vec3(0.);
  float l = 9.;
  for (float i = 0.; i < 15.; i++) {
    if (i >= u_foldCount) break;
    vec2 rand = randomGB(vec2(i, i * u_seed));
    float an = rand.x * TWO_PI;
    vec2 p = vec2(cos(an), sin(an)) * rand.y;
    float dist = distance(uv, p);
    l = min(l, dist);

    if (l == dist) {
      pp.xy = (uv - p.xy);
      pp.z = dist;
    }
  }
  return mix(pp.xy, vec2(0.), pow(pp.z, .25));
}

float drops(vec2 uv) {
  vec2 iDropsUV = floor(uv);
  vec2 fDropsUV = fract(uv);
  float dropsMinDist = 1.;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 offset = randomGB(iDropsUV + neighbor);
      offset = .5 + .5 * sin(10. * u_seed + TWO_PI * offset);
      vec2 pos = neighbor + offset - fDropsUV;
      float dist = length(pos);
      dropsMinDist = min(dropsMinDist, dropsMinDist*dist);
    }
  }
  return 1. - smoothstep(.05, .09, pow(dropsMinDist, .5));
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  vec2 imageUV = v_imageUV;
  vec2 patternUV = v_imageUV - .5;
  patternUV = 5. * (patternUV * vec2(u_imageAspectRatio, 1.));

  vec2 roughnessUv = 1.5 * (gl_FragCoord.xy - .5 * u_resolution) / u_pixelRatio;
  float roughness = roughness(roughnessUv + vec2(1., 0.)) - roughness(roughnessUv - vec2(1., 0.));

  vec2 crumplesUV = fract(patternUV * .02 / u_crumpleSize - u_seed) * 32.;
  float crumples = u_crumples * (crumplesShape(crumplesUV + vec2(.05, 0.)) - crumplesShape(crumplesUV));

  vec2 fiberUV = 2. / u_fiberSize * patternUV;
  float fiber = fiberNoise(fiberUV, vec2(0.));
  fiber = .5 * u_fiber * (fiber - 1.);

  vec2 normal = vec2(0.);
  vec2 normalImage = vec2(0.);

  vec2 foldsUV = patternUV * .12;
  foldsUV = rotate(foldsUV, 4. * u_seed);
  vec2 w = folds(foldsUV);
  foldsUV = rotate(foldsUV + .007 * cos(u_seed), .01 * sin(u_seed));
  vec2 w2 = folds(foldsUV);

  float drops = u_drops * drops(patternUV * 2.);

  float fade = u_fade * fbm(.17 * patternUV + 10. * u_seed);
  fade = clamp(8. * fade * fade * fade, 0., 1.);

  w = mix(w, vec2(0.), fade);
  w2 = mix(w2, vec2(0.), fade);
  crumples = mix(crumples, 0., fade);
  drops = mix(drops, 0., fade);
  fiber *= mix(1., .5, fade);
  roughness *= mix(1., .5, fade);

  normal.xy += u_folds * min(5. * u_contrast, 1.) * 4. * max(vec2(0.), w + w2);
  normalImage.xy += u_folds * 2. * w;

  normal.xy += crumples;
  normalImage.xy += 1.5 * crumples;

  normal.xy += 3. * drops;
  normalImage.xy += .2 * drops;

  normal.xy += u_roughness * 1.5 * roughness;
  normal.xy += fiber;

  normalImage += u_roughness * .75 * roughness;
  normalImage += .2 * fiber;

  vec3 lightPos = vec3(1., 2., 1.);
  float res = dot(normalize(vec3(normal, 9.5 - 9. * pow(u_contrast, .1))), normalize(lightPos));

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  imageUV += .02 * normalImage;
  float frame = getUvFrame(imageUV);
  vec4 image = texture(u_image, imageUV);
  image.rgb += .6 * pow(u_contrast, .4) * (res - .7);

  frame *= image.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);
  opacity = mix(opacity, 1., frame);

  color -= .007 * drops;

  color.rgb = mix(color, image.rgb, frame);

  fragColor = vec4(color, opacity);
}
`,St=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_rotation;

uniform vec4 u_colorBack;
uniform vec4 u_colorShadow;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_shadows;
uniform float u_angle;
uniform float u_stretch;
uniform float u_shape;
uniform float u_distortion;
uniform float u_highlights;
uniform float u_distortionShape;
uniform float u_shift;
uniform float u_blur;
uniform float u_edges;
uniform float u_marginLeft;
uniform float u_marginRight;
uniform float u_marginTop;
uniform float u_marginBottom;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_imageUV;

out vec4 fragColor;

${O}
${ce}
${b}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float getUvFrame(vec2 uv, float softness) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);
  float left   = smoothstep(0., aax + softness, uv.x);
  float right  = 1. - smoothstep(1. - softness - aax, 1., uv.x);
  float bottom = smoothstep(0., aay + softness, uv.y);
  float top    = 1. - smoothstep(1. - softness - aay, 1., uv.y);
  return left * right * bottom * top;
}

const int MAX_RADIUS = 50;
vec4 samplePremultiplied(sampler2D tex, vec2 uv) {
  vec4 c = texture(tex, uv);
  c.rgb *= c.a;
  return c;
}
vec4 getBlur(sampler2D tex, vec2 uv, vec2 texelSize, vec2 dir, float sigma) {
  if (sigma <= .5) return texture(tex, uv);
  int radius = int(min(float(MAX_RADIUS), ceil(3.0 * sigma)));

  float twoSigma2 = 2.0 * sigma * sigma;
  float gaussianNorm = 1.0 / sqrt(TWO_PI * sigma * sigma);

  vec4 sum = samplePremultiplied(tex, uv) * gaussianNorm;
  float weightSum = gaussianNorm;

  for (int i = 1; i <= MAX_RADIUS; i++) {
    if (i > radius) break;

    float x = float(i);
    float w = exp(-(x * x) / twoSigma2) * gaussianNorm;

    vec2 offset = dir * texelSize * x;
    vec4 s1 = samplePremultiplied(tex, uv + offset);
    vec4 s2 = samplePremultiplied(tex, uv - offset);

    sum += (s1 + s2) * w;
    weightSum += 2.0 * w;
  }

  vec4 result = sum / weightSum;
  if (result.a > 0.) {
    result.rgb /= result.a;
  }

  return result;
}

vec2 rotateAspect(vec2 p, float a, float aspect) {
  p.x *= aspect;
  p = rotate(p, a);
  p.x /= aspect;
  return p;
}

float smoothFract(float x) {
  float f = fract(x);
  float w = fwidth(x);

  float edge = abs(f - 0.5) - 0.5;
  float band = smoothstep(-w, w, edge);

  return mix(f, 1.0 - f, band);
}

void main() {

  float patternRotation = -u_angle * PI / 180.;
  float patternSize = mix(200., 5., u_size);

  vec2 uv = v_imageUV;

  vec2 uvMask = gl_FragCoord.xy / u_resolution.xy;
  vec2 sw = vec2(.005);
  vec4 margins = vec4(u_marginLeft, u_marginTop, u_marginRight, u_marginBottom);
  float mask =
  smoothstep(margins[0], margins[0] + sw.x, uvMask.x + sw.x) *
  smoothstep(margins[2], margins[2] + sw.x, 1.0 - uvMask.x + sw.x) *
  smoothstep(margins[1], margins[1] + sw.y, uvMask.y + sw.y) *
  smoothstep(margins[3], margins[3] + sw.y, 1.0 - uvMask.y + sw.y);
  float maskOuter =
  smoothstep(margins[0] - sw.x, margins[0], uvMask.x + sw.x) *
  smoothstep(margins[2] - sw.x, margins[2], 1.0 - uvMask.x + sw.x) *
  smoothstep(margins[1] - sw.y, margins[1], uvMask.y + sw.y) *
  smoothstep(margins[3] - sw.y, margins[3], 1.0 - uvMask.y + sw.y);
  float maskStroke = maskOuter - mask;
  float maskInner =
  smoothstep(margins[0] - 2. * sw.x, margins[0], uvMask.x) *
  smoothstep(margins[2] - 2. * sw.x, margins[2], 1.0 - uvMask.x) *
  smoothstep(margins[1] - 2. * sw.y, margins[1], uvMask.y) *
  smoothstep(margins[3] - 2. * sw.y, margins[3], 1.0 - uvMask.y);
  float maskStrokeInner = maskInner - mask;

  uv -= .5;
  uv *= patternSize;
  uv = rotateAspect(uv, patternRotation, u_imageAspectRatio);

  float curve = 0.;
  float patternY = uv.y / u_imageAspectRatio;
  if (u_shape > 4.5) {
    // pattern
    curve = .5 + .5 * sin(.5 * PI * uv.x) * cos(.5 * PI * patternY);
  } else if (u_shape > 3.5) {
    // zigzag
    curve = 10. * abs(fract(.1 * patternY) - .5);
  } else if (u_shape > 2.5) {
    // wave
    curve = 4. * sin(.23 * patternY);
  } else if (u_shape > 1.5) {
    // lines irregular
    curve = .5 + .5 * sin(.5 * uv.x) * sin(1.7 * uv.x);
  } else {
    // lines
  }

  vec2 UvToFract = uv + curve;
  vec2 fractOrigUV = fract(uv);
  vec2 floorOrigUV = floor(uv);

  float x = smoothFract(UvToFract.x);
  float xNonSmooth = fract(UvToFract.x) + .0001;

  float highlightsWidth = 2. * max(.001, fwidth(UvToFract.x));
  highlightsWidth += 2. * maskStrokeInner;
  float highlights = smoothstep(0., highlightsWidth, xNonSmooth);
  highlights *= smoothstep(1., 1. - highlightsWidth, xNonSmooth);
  highlights = 1. - highlights;
  highlights *= u_highlights;
  highlights = clamp(highlights, 0., 1.);
  highlights *= mask;

  float shadows = pow(x, 1.3);
  float distortion = 0.;
  float fadeX = 1.;
  float frameFade = 0.;

  float aa = fwidth(xNonSmooth);
  aa = max(aa, fwidth(uv.x));
  aa = max(aa, fwidth(UvToFract.x));
  aa = max(aa, .0001);

  if (u_distortionShape == 1.) {
    distortion = -pow(1.5 * x, 3.);
    distortion += (.5 - u_shift);

    frameFade = pow(1.5 * x, 3.);
    aa = max(.2, aa);
    aa += mix(.2, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion = mix(.5, distortion, fadeX);
  } else if (u_distortionShape == 2.) {
    distortion = 2. * pow(x, 2.);
    distortion -= (.5 + u_shift);

    frameFade = pow(abs(x - .5), 4.);
    aa = max(.2, aa);
    aa += mix(.2, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion = mix(.5, distortion, fadeX);
    frameFade = mix(1., frameFade, .5 * fadeX);
  } else if (u_distortionShape == 3.) {
    distortion = pow(2. * (xNonSmooth - .5), 6.);
    distortion -= .25;
    distortion -= u_shift;

    frameFade = 1. - 2. * pow(abs(x - .4), 2.);
    aa = .15;
    aa += mix(.1, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    frameFade = mix(1., frameFade, fadeX);

  } else if (u_distortionShape == 4.) {
    x = xNonSmooth;
    distortion = sin((x + .25) * TWO_PI);
    shadows = .5 + .5 * asin(distortion) / (.5 * PI);
    distortion *= .5;
    distortion -= u_shift;
    frameFade = .5 + .5 * sin(x * TWO_PI);
  } else if (u_distortionShape == 5.) {
    distortion -= pow(abs(x), .2) * x;
    distortion += .33;
    distortion -= 3. * u_shift;
    distortion *= .33;

    frameFade = .3 * (smoothstep(.0, 1., x));
    shadows = pow(x, 2.5);

    aa = max(.1, aa);
    aa += mix(.1, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion *= fadeX;
  }

  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec2 grainUV = v_imageUV - .5;
  grainUV *= (.8 / vec2(length(dudx), length(dudy)));
  grainUV += .5;
  float grain = valueNoise(grainUV);
  grain = smoothstep(.4, .7, grain);
  grain *= u_grainMixer;
  distortion = mix(distortion, 0., grain);

  shadows = min(shadows, 1.);
  shadows += maskStrokeInner;
  shadows *= mask;
  shadows = min(shadows, 1.);
  shadows *= pow(u_shadows, 2.);
  shadows = clamp(shadows, 0., 1.);

  distortion *= 3. * u_distortion;
  frameFade *= u_distortion;

  fractOrigUV.x += distortion;
  floorOrigUV = rotateAspect(floorOrigUV, -patternRotation, u_imageAspectRatio);
  fractOrigUV = rotateAspect(fractOrigUV, -patternRotation, u_imageAspectRatio);

  uv = (floorOrigUV + fractOrigUV) / patternSize;
  uv += pow(maskStroke, 4.);

  uv += vec2(.5);

  uv = mix(v_imageUV, uv, smoothstep(0., .7, mask));
  float blur = mix(0., 50., u_blur);
  blur = mix(0., blur, smoothstep(.5, 1., mask));

  float edgeDistortion = mix(.0, .04, u_edges);
  edgeDistortion += .06 * frameFade * u_edges;
  edgeDistortion *= mask;
  float frame = getUvFrame(uv, edgeDistortion);

  float stretch = 1. - smoothstep(0., .5, xNonSmooth) * smoothstep(1., 1. - .5, xNonSmooth);
  stretch = pow(stretch, 2.);
  stretch *= mask;
  stretch *= getUvFrame(uv, .1 + .05 * mask * frameFade);
  uv.y = mix(uv.y, .5, u_stretch * stretch);

  vec4 image = getBlur(u_image, uv, 1. / u_resolution / u_pixelRatio, vec2(0., 1.), blur);
  image.rgb *= image.a;
  vec4 backColor = u_colorBack;
  backColor.rgb *= backColor.a;
  vec4 highlightColor = u_colorHighlight;
  highlightColor.rgb *= highlightColor.a;
  vec4 shadowColor = u_colorShadow;

  vec3 color = highlightColor.rgb * highlights;
  float opacity = highlightColor.a * highlights;

  shadows = mix(shadows * shadowColor.a, 0., highlights);
  color = mix(color, shadowColor.rgb * shadowColor.a, .5 * shadows);
  color += .5 * pow(shadows, .5) * shadowColor.rgb;
  opacity += shadows;
  color = clamp(color, vec3(0.), vec3(1.));
  opacity = clamp(opacity, 0., 1.);

  color += image.rgb * (1. - opacity) * frame;
  opacity += image.a * (1. - opacity) * frame;

  color += backColor.rgb * (1. - opacity);
  opacity += backColor.a * (1. - opacity);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  grainOverlayStrength *= mask;
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,Ct={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},wt={prism:1,lens:2,contour:3,cascade:4,flat:5},Tt=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_type;
uniform float u_pxSize;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_colorSteps;

out vec4 fragColor;


${b}
${O}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

vec2 getImageUV(vec2 uv) {
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  vec2 imageUV = uv;
  imageUV *= imageBoxScale;
  imageUV += boxOrigin * (imageBoxScale - 1.);
  imageUV += graphicOffset;
  imageUV /= u_scale;
  imageUV.x *= u_imageAspectRatio;
  imageUV = graphicRotation * imageUV;
  imageUV.x /= u_imageAspectRatio;

  imageUV += .5;
  imageUV.y = 1. - imageUV.y;

  return imageUV;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 imageUV = getImageUV(normalizedUV);
  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec4 image = texture(u_image, imageUV);
  float frame = getUvFrame(imageUV, pxSize / u_resolution);

  int type = int(floor(u_type));
  float dithering = 0.0;

  float lum = dot(vec3(.2126, .7152, .0722), image.rgb);
  lum = u_inverted ? (1. - lum) : lum;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), lum);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  float colorSteps = max(floor(u_colorSteps), 1.);
  vec3 color = vec3(0.0);
  float opacity = 1.;

  dithering -= .5;
  float brightness = clamp(lum + dithering / colorSteps, 0.0, 1.0);
  brightness = mix(0.0, brightness, frame);
  brightness = mix(0.0, brightness, image.a);
  float quantLum = floor(brightness * colorSteps + 0.5) / colorSteps;
  quantLum = mix(0.0, quantLum, frame);

  if (u_originalColors == true) {
    vec3 normColor = image.rgb / max(lum, 0.001);
    color = normColor * quantLum;

    float quantAlpha = floor(image.a * colorSteps + 0.5) / colorSteps;
    opacity = mix(quantLum, 1., quantAlpha);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;
    vec3 hlColor = u_colorHighlight.rgb * u_colorHighlight.a;
    float hlOpacity = u_colorHighlight.a;

    fgColor = mix(fgColor, hlColor, step(1.02 - .02 * u_colorSteps, brightness));
    fgOpacity = mix(fgOpacity, hlOpacity, step(1.02 - .02 * u_colorSteps, brightness));

    color = fgColor * quantLum;
    opacity = fgOpacity * quantLum;
    color += bgColor * (1.0 - opacity);
    opacity += bgOpacity * (1.0 - opacity);
  }

  fragColor = vec4(color, opacity);
}
`,Et=`#version 300 es
precision mediump float;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;
uniform float u_spread;
uniform float u_bias;
uniform float u_angle;
uniform float u_perspective;
uniform float u_count;
uniform float u_dispersion;
uniform float u_dispersionShift;
uniform float u_dispersionColor;
uniform float u_focusCenter;
uniform float u_focusEdges;
uniform float u_swirl;
uniform float u_noise;
uniform float u_noiseFrequency;
uniform float u_noiseOffset;
uniform float u_lensBulge;
uniform float u_lensCircle;
uniform float u_grainMixer;
uniform float u_grainOverlay;
uniform float u_imageX;
uniform float u_imageY;

in vec2 v_imageUV;

out vec4 fragColor;

${O}
${b}
${ce}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1., 0.));
  float c = hash21(i + vec2(0., 1.));
  float d = hash21(i + vec2(1., 1.));
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float getUvFrame(vec2 uv) {
  vec2 invAA = 1. / clamp(fwidth(uv), 1e-5, .02);
  vec2 lo = clamp(uv * invAA + .5, 0., 1.);
  vec2 hi = clamp((1. - uv) * invAA + .5, 0., 1.);
  return lo.x * hi.x * lo.y * hi.y;
}

vec4 sampleOverWhite(vec2 uv) {
  vec4 img = texture(u_image, uv);
  float cover = img.a * getUvFrame(uv);
  vec3 colorOverWhite = mix(vec3(1.), img.rgb, cover);
  return vec4(colorOverWhite, cover);
}

vec3 hueColor(float hue) {
  vec3 rgb = clamp(abs(mod(hue * 6. + vec3(0., 4., 2.), 6.) - 3.) - 1., 0., 1.);
  rgb = rgb * rgb * (3. - 2. * rgb);
  return rgb;
}
                                            
float boxInradius() {
  return .5 * min(u_imageAspectRatio, 1.);
}

float boxOutradius() {
  return .5 * length(vec2(u_imageAspectRatio, 1.));
}

float spreadReach() {
  return .7 * pow(u_spread, 1.3 + 2.7 * u_spread);
}

float innerCircleMask(float radius, float inradius) {
  return 1. - smoothstep(.5 * inradius, 1.1 * inradius, radius);
}

float dispersionCurve(float t, float biasPow) {
  float mirroredT = u_bias < 0. ? 1. - t : t;
  float curved = pow(mirroredT, biasPow);
  return u_bias < 0. ? 1. - curved : curved;
}

vec2 getSpread(vec2 fromCenter, float radius, vec2 warpedUV, float edgeAA, float inradius, float outradius, float reach, out float outStrength) {
  float angleRad = radians(u_angle);
  vec2 uniformDir = vec2(cos(angleRad), sin(angleRad));

  float invInradius = 1. / inradius;
  vec2 radialDir = fromCenter * invInradius;
  float maxLen = (outradius + reach) * invInradius;
  float radialLen = radius * invInradius;
  if (radialLen > maxLen) radialDir *= maxLen / radialLen;
  vec2 spreadDir = mix(uniformDir, radialDir, u_perspective);

  float bandProximity = smoothstep(inradius * .8, inradius, radius);
  float lensCircleMaxing = bandProximity * u_lensCircle * u_lensCircle * u_lensCircle;
  spreadDir = mix(spreadDir, radialDir, lensCircleMaxing);

  vec2 warpedAbs = abs(warpedUV - .5);
  float inner = mix(1., smoothstep(0., mix(inradius, outradius, u_focusCenter), radius), u_focusCenter);
  float boxDist = max(warpedAbs.x, warpedAbs.y) * 2.;
  float outer = mix(1., 1. - min(boxDist, 1.), u_focusEdges);
  float strength = inner * outer;

  strength *= mix(1., mix(.15, .03, max(-u_lensBulge, 0.)), lensCircleMaxing);

  vec2 outside = max(warpedAbs - .5, 0.);
  float margin = max(reach * length(spreadDir) * (1. - u_lensCircle), edgeAA);
  strength *= 1. - smoothstep(0., margin, length(outside));

  outStrength = strength;
  vec2 axis = spreadDir * (reach * strength);

  if (u_noise > 0.) {
    float turn = (valueNoise(fromCenter * u_noiseFrequency * 18. + u_noiseOffset * 30.) - .5) * 2. * u_noise;
    float cs = cos(turn), sn = sin(turn);
    axis = mat2(cs, -sn, sn, cs) * axis;
  }

  axis.x /= u_imageAspectRatio;
  return axis;
}

vec2 lensWarp(vec2 fromCenter, float radius, float inradius, out float bulgeFade) {
  bulgeFade = 1.;
  if (u_lensBulge == 0. && u_lensCircle <= 0.) return fromCenter;
  if (radius < 1e-5) return fromCenter;
  
  float r = radius;

  if (u_lensBulge != 0.) {
    float rn = radius / inradius;
    float bulge = abs(u_lensBulge) * (u_lensBulge > 0. ? 1.4 : 1.2);
    if (u_lensBulge > 0.) bulgeFade = 1. - smoothstep(1.45, 1.53, rn * bulge);
    float map = u_lensBulge > 0.
      ? tan(min(rn * bulge, 1.53)) / tan(bulge)
      : atan(rn * tan(bulge)) / bulge;
    float bulgeScale = map / rn;
    fromCenter *= bulgeScale;
    r *= bulgeScale;
  }

  if (u_lensCircle > 0.) {
    vec2 dir = fromCenter / max(r, 1e-5);
    vec2 halfBox = vec2(u_imageAspectRatio, 1.) * .5;
    float rBox = min(halfBox.x / max(abs(dir.x), 1e-4), halfBox.y / max(abs(dir.y), 1e-4));
    float band = inradius * mix(.03, .2, .5 * (u_lensBulge + 1.));
    float innerEdge = inradius - band;
    float over = smoothstep(0., 1., (r - innerEdge) / band);
    float g = r + (rBox - inradius) * pow(over, 14.);
    fromCenter = dir * mix(r, g, u_lensCircle);
  }

  return fromCenter;
}

void main() {
  vec2 uv = v_imageUV;

  float invAspect = 1. / u_imageAspectRatio;
  float inradius = boxInradius();
  float outradius = boxOutradius();
  float reach = spreadReach();

  vec2 fromCenter = uv - .5;
  fromCenter.x *= u_imageAspectRatio;
  float radius = length(fromCenter);

  float bulgeFade;
  vec2 warpedFromCenter = lensWarp(fromCenter, radius, inradius, bulgeFade);
  vec2 baseUV = vec2(warpedFromCenter.x * invAspect, warpedFromCenter.y) + .5;

  vec2 baseDerivative = fwidth(baseUV);
  float edgeAA = clamp(2. * max(baseDerivative.x, baseDerivative.y), .001, .02);

  float spreadStrength;
  vec2 spreadAxis = getSpread(fromCenter, radius, baseUV, edgeAA, inradius, outradius, reach, spreadStrength);

  vec2 grainUV = vec2(0.);
  if (u_grainMixer > 0. || u_grainOverlay > 0.) {
    vec2 dudx = dFdx(v_imageUV);
    vec2 dudy = dFdy(v_imageUV);
    grainUV = (v_imageUV - .5) * (.8 / vec2(length(dudx), length(dudy))) + .5;
  }

  if (u_grainMixer > 0.) {
    float grainSeed = valueNoise(grainUV);
    vec2 jit = fract(grainSeed * vec2(157.31, 113.57)) * 2. - 1.;
    spreadAxis += jit * .3 * u_grainMixer * length(spreadAxis);
  }

  float count = floor(u_count);
  int countInteger = int(count);

  float invCount = 1. / count;
  float invSpan = 1. / max(count - 1., 1.);
  float hueBase = u_dispersionColor + .5;
  float biasPower = 1. + 2. * abs(u_bias);
  vec2 tapBias = .5 - vec2(u_imageX, u_imageY);

  float centerAmount = clamp(1. - u_dispersionShift, 0., 1.);
  float edgesAmount = clamp(1. + u_dispersionShift, 0., 1.);
  float dispersion = u_dispersion * mix(edgesAmount, centerAmount, innerCircleMask(radius, inradius));
  float dispersionPower = pow(dispersion, .8);

  float warpedRadius = length(warpedFromCenter);
  float swirlAngle = u_swirl * .4 * PI * spreadStrength * u_spread * min(1., inradius / max(warpedRadius, 1e-4));

  vec3 colorSum = vec3(0.);
  vec3 weightSum = vec3(0.);
  float coverSum = 0.;

  for (int i = 0; i < ${{maxSamples:50}.maxSamples}; i++) {
    if (i >= countInteger) break;

    float layer = float(i);
    float hue = hueBase + layer * invCount;

    float spread = layer * invSpan;
    if (u_bias != 0.) spread = dispersionCurve(spread, biasPower);

    // mix(axis, -axis, spread) is axis scaled by the signed position along the fan
    float fanPos = 1. - 2. * spread;
    vec2 tapUV = baseUV + spreadAxis * fanPos - .5;

    if (u_swirl != 0.) {
      tapUV.x *= u_imageAspectRatio;
      tapUV = rotate(tapUV, swirlAngle * fanPos);
      tapUV.x *= invAspect;
    }

    vec4 tap = sampleOverWhite(tapUV + tapBias);
    vec3 weight = 1. - dispersionPower * hueColor(hue);

    colorSum += tap.rgb * weight;
    weightSum += weight;
    coverSum += tap.a;
  }

  vec3 color = colorSum / max(weightSum, 1e-4);
  float coverAvg = coverSum * invCount;

  float ground = min(color.r, min(color.g, color.b));
  float alpha = max(coverAvg, 1. - ground);
  vec3 premult = max(color - (1. - alpha), 0.);
  fragColor = vec4(premult, alpha) * bulgeFade;

  if (u_grainOverlay > 0.) {
    float grain = valueNoise(rotate(grainUV, 1.) + vec2(3.));
    grain = mix(grain, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
    grain = pow(grain, 1.3);
    float grainV = grain * 2. - 1.;
    float grainStrength = pow(u_grainOverlay * abs(grainV), .8) * fragColor.a;
    fragColor.rgb = mix(fragColor.rgb, vec3(step(0., grainV)) * fragColor.a, .35 * grainStrength);
  }
}
`,Dt=`#version 300 es
precision mediump float;

uniform float u_rotation;

uniform float u_time;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_radius;
uniform float u_contrast;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_grainMixer;
uniform float u_grainOverlay;
uniform float u_grainSize;
uniform float u_grid;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_type;

in vec2 v_imageUV;

out vec4 fragColor;

${O}
${ce}
${b}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float getCircle(vec2 uv, float r, float baseR) {
  r = mix(.25 * baseR, 0., r);
  float d = length(uv - .5);
  float aa = fwidth(d);
  return 1. - smoothstep(r - aa, r + aa, d);
}

float getCell(vec2 uv) {
  float insideX = step(0.0, uv.x) * (1.0 - step(1.0, uv.x));
  float insideY = step(0.0, uv.y) * (1.0 - step(1.0, uv.y));
  return insideX * insideY;
}

float getCircleWithHole(vec2 uv, float r, float baseR) {
  float cell = getCell(uv);

  r = mix(.75 * baseR, 0., r);
  float rMod = mod(r, .5);

  float d = length(uv - .5);
  float aa = fwidth(d);
  float circle = 1. - smoothstep(rMod - aa, rMod + aa, d);
  if (r < .5) {
    return circle;
  } else {
    return cell - circle;
  }
}

float getGooeyBall(vec2 uv, float r, float baseR) {
  float d = length(uv - .5);
  float sizeRadius = .3;
  if (u_grid == 1.) {
    sizeRadius = .42;
  }
  sizeRadius = mix(sizeRadius * baseR, 0., r);
  d = 1. - sst(0., sizeRadius, d);

  d = pow(d, 2. + baseR);
  return d;
}

float getSoftBall(vec2 uv, float r, float baseR) {
  float d = length(uv - .5);
  float sizeRadius = clamp(baseR, 0., 1.);
  sizeRadius = mix(.5 * sizeRadius, 0., r);
  d = 1. - lst(0., sizeRadius, d);
  float powRadius = 1. - lst(0., 2., baseR);
  d = pow(d, 4. + 3. * powRadius);
  return d;
}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

float sigmoid(float x, float k) {
  return 1.0 / (1.0 + exp(-k * (x - 0.5)));
}

float getLumAtPx(vec2 uv, float contrast) {
  vec4 tex = texture(u_image, uv);
  vec3 color = vec3(
  sigmoid(tex.r, contrast),
  sigmoid(tex.g, contrast),
  sigmoid(tex.b, contrast)
  );
  float lum = dot(vec3(0.2126, 0.7152, 0.0722), color);
  lum = mix(1., lum, tex.a);
  lum = u_inverted ? (1. - lum) : lum;
  return lum;
}

float getLumBall(vec2 p, vec2 pad, vec2 inCellOffset, float contrast, float baseR, float stepSize, out vec4 ballColor) {
  p += inCellOffset;
  vec2 uv_i = floor(p);
  vec2 uv_f = fract(p);
  vec2 samplingUV = (uv_i + .5 - inCellOffset) * pad + vec2(.5);
  float outOfFrame = getUvFrame(samplingUV, pad * stepSize);

  float lum = getLumAtPx(samplingUV, contrast);
  ballColor = texture(u_image, samplingUV);
  ballColor.rgb *= ballColor.a;
  ballColor *= outOfFrame;

  float ball = 0.;
  if (u_type == 0.) {
    // classic
    ball = getCircle(uv_f, lum, baseR);
  } else if (u_type == 1.) {
    // gooey
    ball = getGooeyBall(uv_f, lum, baseR);
  } else if (u_type == 2.) {
    // holes
    ball = getCircleWithHole(uv_f, lum, baseR);
  } else if (u_type == 3.) {
    // soft
    ball = getSoftBall(uv_f, lum, baseR);
  }

  return ball * outOfFrame;
}


void main() {

  float stepMultiplier = 1.;
  if (u_type == 0.) {
    // classic
    stepMultiplier = 2.;
  } else if (u_type == 1. || u_type == 3.) {
    // gooey & soft
    stepMultiplier = 6.;
  }

  float cellsPerSide = mix(300., 7., pow(u_size, .7));
  cellsPerSide /= stepMultiplier;
  float cellSizeY = 1. / cellsPerSide;
  vec2 pad = cellSizeY * vec2(1. / u_imageAspectRatio, 1.);
  if (u_type == 1. && u_grid == 1.) {
    // gooey diagonal grid works differently
    pad *= .7;
  }

  vec2 uv = v_imageUV;
  uv -= vec2(.5);
  uv /= pad;

  float contrast = mix(0., 15., pow(u_contrast, 1.5));
  float baseRadius = u_radius;
  if (u_originalColors == true) {
    contrast = mix(.1, 4., pow(u_contrast, 2.));
    baseRadius = 2. * pow(.5 * u_radius, .3);
  }

  float totalShape = 0.;
  vec3 totalColor = vec3(0.);
  float totalOpacity = 0.;

  vec4 ballColor;
  float shape;
  float stepSize = 1. / stepMultiplier;
  for (float x = -0.5; x < 0.5; x += stepSize) {
    for (float y = -0.5; y < 0.5; y += stepSize) {
      vec2 offset = vec2(x, y);

      if (u_grid == 1.) {
        float rowIndex = floor((y + .5) / stepSize);
        float colIndex = floor((x + .5) / stepSize);
        if (stepSize == 1.) {
          rowIndex = floor(uv.y + y + 1.);
          if (u_type == 1.) {
            colIndex = floor(uv.x + x + 1.);
          }
        }
        if (u_type == 1.) {
          if (mod(rowIndex + colIndex, 2.) == 1.) {
            continue;
          }
        } else {
          if (mod(rowIndex, 2.) == 1.) {
            offset.x += .5 * stepSize;
          }
        }
      }

      shape = getLumBall(uv, pad, offset, contrast, baseRadius, stepSize, ballColor);
      totalColor   += ballColor.rgb * shape;
      totalShape   += shape;
      totalOpacity += shape;
    }
  }

  const float eps = 1e-4;

  totalColor /= max(totalShape, eps);
  totalOpacity /= max(totalShape, eps);

  float finalShape = 0.;
  if (u_type == 0.) {
    finalShape = min(1., totalShape);
  } else if (u_type == 1.) {
    float aa = fwidth(totalShape);
    float th = .5;
    finalShape = smoothstep(th - aa, th + aa, totalShape);
  } else if (u_type == 2.) {
    finalShape = min(1., totalShape);
  } else if (u_type == 3.) {
    finalShape = totalShape;
  }

  vec2 grainSize = mix(2000., 200., u_grainSize) * vec2(1., 1. / u_imageAspectRatio);
  vec2 grainUV = v_imageUV - .5;
  grainUV *= grainSize;
  grainUV += .5;
  float grain = valueNoise(grainUV);
  grain = smoothstep(.55, .7 + .2 * u_grainMixer, grain);
  grain *= u_grainMixer;
  finalShape = mix(finalShape, 0., grain);

  vec3 color = vec3(0.);
  float opacity = 0.;

  if (u_originalColors == true) {
    color = totalColor * finalShape;
    opacity = totalOpacity * finalShape;

    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    color = color + bgColor * (1. - opacity);
    opacity = opacity + u_colorBack.a * (1. - opacity);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;

    color = fgColor * finalShape;
    opacity = fgOpacity * finalShape;
    color += bgColor * (1. - opacity);
    opacity += bgOpacity * (1. - opacity);
  }

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .5 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,Ot={classic:0,gooey:1,holes:2,soft:3},kt={square:0,hex:1};function At(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let n in e){if(n===`colors`){let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1;continue}if(Object.is(e[n],t[n])===!1)return!1}return!0}var F={name:`Default`,params:{...T,speed:1,frame:0,colors:[`#e0eaff`,`#241d9a`,`#f75092`,`#9f50d3`],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}};({...T}),{...T},{...T};var jt=(0,j.memo)(function({speed:e=F.params.speed,frame:t=F.params.frame,colors:n=F.params.colors,distortion:r=F.params.distortion,swirl:i=F.params.swirl,grainMixer:a=F.params.grainMixer,grainOverlay:o=F.params.grainOverlay,fit:s=F.params.fit,rotation:c=F.params.rotation,scale:l=F.params.scale,originX:u=F.params.originX,originY:d=F.params.originY,offsetX:f=F.params.offsetX,offsetY:p=F.params.offsetY,worldWidth:m=F.params.worldWidth,worldHeight:h=F.params.worldHeight,..._}){let v={u_colors:n.map(E),u_colorsCount:n.length,u_distortion:r,u_swirl:i,u_grainMixer:a,u_grainOverlay:o,u_fit:pe[s],u_rotation:c,u_scale:l,u_offsetX:f,u_offsetY:p,u_originX:u,u_originY:d,u_worldWidth:m,u_worldHeight:h};return(0,M.jsx)(g,{..._,speed:e,frame:t,fragmentShader:_t,uniforms:v})},At),I={name:`Default`,params:{...D,speed:1,frame:0,scale:.6,colorBack:`#000000`,colorFront:`#00b2ff`,shape:`sphere`,type:`4x4`,size:2}};({...D}),{...D},{...T},{...T},{...T};var Mt=(0,j.memo)(function({speed:e=I.params.speed,frame:t=I.params.frame,colorBack:n=I.params.colorBack,colorFront:r=I.params.colorFront,shape:i=I.params.shape,type:a=I.params.type,pxSize:o,size:s=o===void 0?I.params.size:o,fit:c=I.params.fit,scale:l=I.params.scale,rotation:u=I.params.rotation,originX:d=I.params.originX,originY:f=I.params.originY,offsetX:p=I.params.offsetX,offsetY:m=I.params.offsetY,worldWidth:h=I.params.worldWidth,worldHeight:_=I.params.worldHeight,...v}){let y={u_colorBack:E(n),u_colorFront:E(r),u_shape:yt[i],u_type:bt[a],u_pxSize:s,u_fit:pe[c],u_scale:l,u_rotation:u,u_offsetX:p,u_offsetY:m,u_originX:d,u_originY:f,u_worldWidth:h,u_worldHeight:_};return(0,M.jsx)(g,{...v,speed:e,frame:t,fragmentShader:vt,uniforms:y})}),L={name:`Default`,params:{...T,fit:`cover`,scale:.6,speed:0,frame:0,colorFront:`#9fadbc`,colorBack:`#ffffff`,contrast:.3,roughness:.4,fiber:.3,fiberSize:.2,crumples:.3,crumpleSize:.35,folds:.65,foldCount:5,fade:0,drops:.2,seed:5.8}};({...T}),{...T},{...T};var Nt=(0,j.memo)(function({speed:e=L.params.speed,frame:t=L.params.frame,colorFront:n=L.params.colorFront,colorBack:r=L.params.colorBack,image:i=``,contrast:a=L.params.contrast,roughness:o=L.params.roughness,fiber:c=L.params.fiber,crumples:l=L.params.crumples,folds:u=L.params.folds,drops:d=L.params.drops,seed:f=L.params.seed,fiberScale:p,fiberSize:m=p===void 0?L.params.fiberSize:.2/p,crumplesScale:h,crumpleSize:_=h===void 0?L.params.crumpleSize:.2/h,blur:v,fade:y=v===void 0?L.params.fade:v,foldsNumber:b,foldCount:x=b===void 0?L.params.foldCount:b,fit:S=L.params.fit,scale:C=L.params.scale,rotation:w=L.params.rotation,originX:T=L.params.originX,originY:D=L.params.originY,offsetX:ee=L.params.offsetX,offsetY:te=L.params.offsetY,worldWidth:ne=L.params.worldWidth,worldHeight:re=L.params.worldHeight,...ie}){let ae=typeof window<`u`&&{u_noiseTexture:s()},oe={u_image:i,u_colorFront:E(n),u_colorBack:E(r),u_contrast:a,u_roughness:o,u_fiber:c,u_fiberSize:m,u_crumples:l,u_crumpleSize:_,u_foldCount:x,u_folds:u,u_fade:y,u_drops:d,u_seed:f,...ae,u_fit:pe[S],u_scale:C,u_rotation:w,u_offsetX:ee,u_offsetY:te,u_originX:T,u_originY:D,u_worldWidth:ne,u_worldHeight:re};return(0,M.jsx)(g,{...ie,speed:e,frame:t,fragmentShader:xt,mipmaps:[`u_image`],uniforms:oe})},At),R={name:`Default`,params:{...T,fit:`cover`,speed:0,frame:0,colorBack:`#00000000`,colorShadow:`#000000`,colorHighlight:`#ffffff`,shadows:.25,size:.5,angle:0,distortionShape:`prism`,highlights:.1,shape:`lines`,distortion:.5,shift:0,blur:0,edges:.25,stretch:0,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:0}};({...T}),{...T},{...T};var Pt=(0,j.memo)(function({speed:e=R.params.speed,frame:t=R.params.frame,colorBack:n=R.params.colorBack,colorShadow:r=R.params.colorShadow,colorHighlight:i=R.params.colorHighlight,image:a=``,shadows:o=R.params.shadows,angle:s=R.params.angle,distortion:c=R.params.distortion,distortionShape:l=R.params.distortionShape,highlights:u=R.params.highlights,shape:d=R.params.shape,shift:f=R.params.shift,blur:p=R.params.blur,edges:m=R.params.edges,margin:h,marginLeft:_=h??R.params.marginLeft,marginRight:v=h??R.params.marginRight,marginTop:y=h??R.params.marginTop,marginBottom:b=h??R.params.marginBottom,grainMixer:x=R.params.grainMixer,grainOverlay:S=R.params.grainOverlay,stretch:C=R.params.stretch,count:w,size:T=w===void 0?R.params.size:(1/(w*1.6))**(1/6)/.7-.5,fit:D=R.params.fit,scale:ee=R.params.scale,rotation:te=R.params.rotation,originX:ne=R.params.originX,originY:re=R.params.originY,offsetX:ie=R.params.offsetX,offsetY:ae=R.params.offsetY,worldWidth:oe=R.params.worldWidth,worldHeight:O=R.params.worldHeight,...se}){let ce={u_image:a,u_colorBack:E(n),u_colorShadow:E(r),u_colorHighlight:E(i),u_shadows:o,u_size:T,u_angle:s,u_distortion:c,u_shift:f,u_blur:p,u_edges:m,u_stretch:C,u_distortionShape:wt[l],u_highlights:u,u_shape:Ct[d],u_marginLeft:_,u_marginRight:v,u_marginTop:y,u_marginBottom:b,u_grainMixer:x,u_grainOverlay:S,u_fit:pe[D],u_scale:ee,u_rotation:te,u_offsetX:ie,u_offsetY:ae,u_originX:ne,u_originY:re,u_worldWidth:oe,u_worldHeight:O};return(0,M.jsx)(g,{...se,speed:e,frame:t,fragmentShader:St,mipmaps:[`u_image`],uniforms:ce})}),z={name:`Default`,params:{...T,fit:`cover`,speed:0,frame:0,colorFront:`#94ffaf`,colorBack:`#000c38`,colorHighlight:`#eaff94`,type:`8x8`,size:2,colorSteps:2,originalColors:!1,inverted:!1}};({...T}),{...T},{...T};var Ft=(0,j.memo)(function({speed:e=z.params.speed,frame:t=z.params.frame,colorFront:n=z.params.colorFront,colorBack:r=z.params.colorBack,colorHighlight:i=z.params.colorHighlight,image:a=``,type:o=z.params.type,colorSteps:s=z.params.colorSteps,originalColors:c=z.params.originalColors,inverted:l=z.params.inverted,pxSize:u,size:d=u===void 0?z.params.size:u,fit:f=z.params.fit,scale:p=z.params.scale,rotation:m=z.params.rotation,originX:h=z.params.originX,originY:_=z.params.originY,offsetX:v=z.params.offsetX,offsetY:y=z.params.offsetY,worldWidth:b=z.params.worldWidth,worldHeight:x=z.params.worldHeight,...S}){let C={u_image:a,u_colorFront:E(n),u_colorBack:E(r),u_colorHighlight:E(i),u_type:bt[o],u_pxSize:d,u_colorSteps:s,u_originalColors:c,u_inverted:l,u_fit:pe[f],u_rotation:m,u_scale:p,u_offsetX:v,u_offsetY:y,u_originX:h,u_originY:_,u_worldWidth:b,u_worldHeight:x};return(0,M.jsx)(g,{...S,speed:e,frame:t,fragmentShader:Tt,uniforms:C})},At),B={name:`Default`,params:{...T,scale:1,fit:`contain`,speed:0,frame:0,spread:.6,bias:1,angle:0,perspective:.1,count:35,dispersion:1,dispersionShift:0,dispersionColor:.6,focusCenter:.8,focusEdges:1,swirl:.35,noise:0,noiseFrequency:.25,noiseOffset:0,lensBulge:0,lensCircle:0,grainMixer:0,grainOverlay:0,imageX:0,imageY:0}};({...T}),{...T},{...T};var It=(0,j.memo)(function({speed:e=B.params.speed,frame:t=B.params.frame,image:n=``,spread:r=B.params.spread,bias:i=B.params.bias,angle:a=B.params.angle,perspective:o=B.params.perspective,count:s=B.params.count,dispersion:c=B.params.dispersion,dispersionShift:l=B.params.dispersionShift,dispersionColor:u=B.params.dispersionColor,focusCenter:d=B.params.focusCenter,focusEdges:f=B.params.focusEdges,swirl:p=B.params.swirl,noise:m=B.params.noise,noiseFrequency:h=B.params.noiseFrequency,noiseOffset:_=B.params.noiseOffset,lensBulge:v=B.params.lensBulge,lensCircle:y=B.params.lensCircle,grainMixer:b=B.params.grainMixer,grainOverlay:x=B.params.grainOverlay,imageX:S=B.params.imageX,imageY:C=B.params.imageY,fit:w=B.params.fit,scale:T=B.params.scale,rotation:E=B.params.rotation,originX:D=B.params.originX,originY:ee=B.params.originY,offsetX:te=B.params.offsetX,offsetY:ne=B.params.offsetY,worldWidth:re=B.params.worldWidth,worldHeight:ie=B.params.worldHeight,...ae}){let oe={u_image:n,u_spread:r,u_bias:i,u_angle:a,u_perspective:o,u_count:s,u_dispersion:c,u_dispersionShift:l,u_dispersionColor:u,u_focusCenter:d,u_focusEdges:f,u_swirl:p,u_noise:m,u_noiseFrequency:h,u_noiseOffset:_,u_lensBulge:v,u_lensCircle:y,u_grainMixer:b,u_grainOverlay:x,u_imageX:S,u_imageY:C,u_fit:pe[w],u_rotation:E,u_scale:T,u_offsetX:te,u_offsetY:ne,u_originX:D,u_originY:ee,u_worldWidth:re,u_worldHeight:ie};return(0,M.jsx)(g,{...ae,speed:e,frame:t,fragmentShader:Et,mipmaps:[`u_image`],uniforms:oe})},At),V={name:`Default`,params:{...T,fit:`cover`,speed:0,frame:0,colorBack:`#f2f1e8`,colorFront:`#2b2b2b`,size:.5,radius:1.25,contrast:.4,originalColors:!1,inverted:!1,grainMixer:.2,grainOverlay:.2,grainSize:.5,grid:`hex`,type:`gooey`}};({...T}),{...T},{...T};var Lt=(0,j.memo)(function({speed:e=V.params.speed,frame:t=V.params.frame,colorFront:n=V.params.colorFront,colorBack:r=V.params.colorBack,image:i=``,size:a=V.params.size,radius:o=V.params.radius,contrast:s=V.params.contrast,originalColors:c=V.params.originalColors,inverted:l=V.params.inverted,grainMixer:u=V.params.grainMixer,grainOverlay:d=V.params.grainOverlay,grainSize:f=V.params.grainSize,grid:p=V.params.grid,type:m=V.params.type,fit:h=V.params.fit,scale:_=V.params.scale,rotation:v=V.params.rotation,originX:y=V.params.originX,originY:b=V.params.originY,offsetX:x=V.params.offsetX,offsetY:S=V.params.offsetY,worldWidth:C=V.params.worldWidth,worldHeight:w=V.params.worldHeight,...T}){let D={u_image:i,u_colorFront:E(n),u_colorBack:E(r),u_size:a,u_radius:o,u_contrast:s,u_originalColors:c,u_inverted:l,u_grainMixer:u,u_grainOverlay:d,u_grainSize:f,u_grid:kt[p],u_type:Ot[m],u_fit:pe[h],u_rotation:v,u_scale:_,u_offsetX:x,u_offsetY:S,u_originX:y,u_originY:b,u_worldWidth:C,u_worldHeight:w};return(0,M.jsx)(g,{...T,speed:e,frame:t,fragmentShader:Dt,uniforms:D})},At),Rt=Object.freeze({antialias:!1,depth:!1}),zt=e=>(t=>{if(e.current=t,t)return()=>{e.current=null;let n=t.paperShaderMount?.canvasElement;if(!n)return;let r=n.getContext(`webgl2`);queueMicrotask(()=>{!r||n.isConnected||r.isContextLost()||r.getExtension(`WEBGL_lose_context`)?.loseContext()})}}),Bt=921600,Vt=0,H=e=>Math.min(1,Math.max(0,e/255)),Ht=e=>Math.min(2,Math.max(0,e)),Ut=e=>Math.min(1,Math.max(0,e)),Wt=(e,t,n)=>e+(t-e)*n,Gt=(e,t,n,r,i)=>(H(e)*.22+H(t)*.18+H(n)*.22+H(r)*.28+H(i)*.1)**.55,Kt=(e,t,n)=>Math.max(n*.84,Ut((e-t)*7)),qt=(e,t)=>Ut(e*.42+t*.85),Jt=(e,t,n)=>n?qt(e,t):Ut(e),Yt=(e,t,n,r)=>Ht(r?e*Vt:Wt(e,t,n)),Xt=(e,t,n)=>{let r=e[0]??t.secondaryColor;if(n===`cover-only`){let t=e[1]??r,n=e[2]??t;return{ditheringBack:n,ditheringFront:r,mesh:[r,t,n,e[3]??r,e[4]??t,e[5]??n]}}let i=e[1]??t.primaryColor,a=e[2]??r,o=e[3]??i;return{ditheringBack:t.backgroundColor,ditheringFront:r,mesh:[r,i,a,o,t.backgroundColor,t.accentColor]}},Zt=j.memo(({theme:e,coverUrl:r,audioPower:i,audioBands:a,staticMode:o,paused:s,tuning:c})=>{let l=(0,j.useRef)(null),u=(0,j.useRef)(null),d=(0,j.useMemo)(()=>zt(l),[]),f=(0,j.useMemo)(()=>zt(u),[]),p=(0,j.useRef)(null),m=(0,j.useRef)(null),h=(0,j.useRef)(s),[g,y]=(0,j.useState)([]),b=c??Oe,x=b.displayMode!==`mesh`,S=b.displayMode!==`dithering`;h.current=s,(0,j.useEffect)(()=>{let e=!0;return r?(v(r,6).then(t=>{e&&y(t)}),()=>{e=!1}):(y([]),()=>{e=!1})},[r]);let C=(0,j.useMemo)(()=>Xt(g,e,b.colorSource),[g,e,b.colorSource]);return(0,j.useEffect)(()=>{let e=l.current?.paperShaderMount,r=u.current?.paperShaderMount;if(o){e?.setSpeed(0),r?.setSpeed(0);return}let c=0,d=new WeakMap,f=(e,t,n)=>{let r=d.get(e);r||(r={},d.set(e,r)),r[t]!==n&&(r[t]=n,e.style[t]=n)},g=0,v=0,y=0,x=0,C=0,w=0,T=()=>{let e=h.current,t=e?0:H(i.get()),r=e?0:H(a.bass.get()),o=e?0:Gt(a.bass.get(),a.lowMid.get(),a.mid.get(),a.vocal.get(),a.treble.get()),s=e?0:H(Math.max(a.mid.get(),a.vocal.get()));g=Wt(g,t,.12),v=Wt(v,r,.16),y=Wt(y,s,.13),w=b.enhancedBeatResponse?Kt(o,C,w):0,C=o;let d=Jt(o,w,b.enhancedBeatResponse);x=Wt(x,d,d>x?.42:.14);let E=l.current?.paperShaderMount,D=u.current?.paperShaderMount;if(E){let t=Yt(b.ditheringSpeed,b.ditheringAudioSpeed,x,e);E.setSpeed(t),_(E,{u_pxSize:Math.max(.5,b.ditheringSize-v*b.ditheringSize*.34)},t!==0)}if(D){let t=Yt(b.meshSpeed,b.meshAudioSpeed,x,e);D.setSpeed(t),_(D,{u_distortion:b.meshDistortion+g*.62,u_swirl:b.meshSwirl+y*.38},t!==0)}p.current&&(f(p.current,`opacity`,S?`${Math.min(1,b.ditheringOpacity+v*.25)}`:`1`),f(p.current,`transform`,`scale(${1.015+v*.025})`)),m.current&&(f(m.current,`filter`,`saturate(${1.04+y*.34}) brightness(${.94+g*.16})`),f(m.current,`transform`,`scale(${1.025+g*.018})`)),e||(c=n(T))};return s||(c=n(T)),()=>t(c)},[a,i,S,o,b,s]),(0,M.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,style:{backgroundColor:e.backgroundColor,pointerEvents:`none`},children:[S&&(0,M.jsx)(`div`,{ref:m,className:`absolute inset-0`,style:{transform:`scale(1.025)`,transformOrigin:`center`},children:(0,M.jsx)(jt,{ref:f,width:`100%`,height:`100%`,colors:C.mesh,distortion:b.meshDistortion,swirl:b.meshSwirl,grainMixer:0,grainOverlay:.01,speed:o?0:Yt(b.meshSpeed,b.meshAudioSpeed,0,s),minPixelRatio:1,maxPixelCount:Bt,webGlContextAttributes:Rt,style:{width:`100%`,height:`100%`}})}),x&&(0,M.jsx)(`div`,{ref:p,className:`absolute inset-0`,style:{mixBlendMode:S?`soft-light`:`normal`,opacity:S?b.ditheringOpacity:1,transform:`scale(1.015)`,transformOrigin:`center`},children:(0,M.jsx)(Mt,{ref:d,width:`100%`,height:`100%`,colorBack:C.ditheringBack,colorFront:C.ditheringFront,shape:`warp`,type:`4x4`,size:b.ditheringSize,speed:o?0:Yt(b.ditheringSpeed,b.ditheringAudioSpeed,0,s),minPixelRatio:1,maxPixelCount:Bt,webGlContextAttributes:Rt,style:{width:`100%`,height:`100%`}})}),b.overlayEnabled&&b.overlayOpacity>0&&(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:e.backgroundColor,opacity:b.overlayOpacity}})]})}),U=({label:e,value:t,min:n,max:r,step:i,format:a=e=>e.toFixed(1),rangeInputClass:o,theme:s,onChange:c,onPointerDown:l,onPointerUp:u,disabled:d=!1})=>(0,M.jsxs)(`label`,{className:`block space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`wrap`,children:[(0,M.jsxs)(`span`,{className:`flex justify-between gap-3 text-sm`,style:{color:s.primaryColor},"data-settings-style":`{"align":"between","gap":12,"font":14}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`span`,{"data-settings-style":`{"grow":true}`,"data-settings-layout":`wrap`,children:e}),(0,M.jsx)(`span`,{className:`font-mono opacity-70`,"data-settings-layout":`wrap`,children:a(t)})]}),(0,M.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,disabled:d,onChange:e=>c(Number(e.target.value)),onPointerDown:l,onPointerUp:u,className:o,"data-settings-layout":`column`})]}),Qt=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a,onTuningChange:o,onSliderPointerDown:s,onSliderCommit:c})=>{let l=k(n.secondaryColor,t?.18:.16),u=k(n.accentColor,t?.1:.16),d=[[`dithering`,e(`options.latentDisplayDithering`)],[`mesh`,e(`options.latentDisplayMesh`)],[`both`,e(`options.latentDisplayBoth`)]],f=[[`cover-theme`,e(`options.latentColorSourceCoverTheme`)],[`cover-only`,e(`options.latentColorSourceCoverOnly`)]],p={rangeInputClass:i,theme:n,onPointerDown:s,onPointerUp:c};return(0,M.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-5`,style:{backgroundColor:r,borderColor:l},"data-settings-style":`{"radius":24,"border":true,"gap":20,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:[(0,M.jsxs)(`div`,{className:`space-y-1`,"data-settings-style":`{"gap":4}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:e(`options.latentBackgroundSettings`)}),(0,M.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:e(`options.latentBackgroundSettingsDesc`)})]}),(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},"data-settings-style":`{"font":14}`,"data-settings-layout":`column`,children:e(`options.latentDisplayMode`)}),(0,M.jsx)(`div`,{className:`grid grid-cols-3 gap-2`,"data-settings-style":`{"columns":3,"gap":8}`,"data-settings-layout":`grid`,children:d.map(([e,t])=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":a.displayMode===e,onClick:()=>o?.({displayMode:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:a.displayMode===e?n.accentColor:l,backgroundColor:a.displayMode===e?u:`transparent`,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":12,"padding":[8,8,8,8]}`,"data-settings-layout":`row`,children:t},e))})]}),(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},"data-settings-style":`{"font":14}`,"data-settings-layout":`column`,children:e(`options.latentColorSource`)}),(0,M.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,"data-settings-style":`{"columns":2,"gap":8}`,"data-settings-layout":`grid`,children:f.map(([e,t])=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":a.colorSource===e,onClick:()=>o?.({colorSource:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:a.colorSource===e?n.accentColor:l,backgroundColor:a.colorSource===e?u:`transparent`,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":12,"padding":[8,8,8,8]}`,"data-settings-layout":`row`,children:t},e))})]}),(0,M.jsx)(N,{label:e(`options.latentDynamicOnlyInPlayer`),description:e(`options.latentDynamicOnlyInPlayerDesc`),checked:a.dynamicOnlyInPlayer,onChange:e=>o?.({dynamicOnlyInPlayer:e}),theme:n}),(0,M.jsx)(N,{label:e(`options.latentEnhancedBeatResponse`),description:e(`options.latentEnhancedBeatResponseDesc`),checked:a.enhancedBeatResponse,onChange:e=>o?.({enhancedBeatResponse:e}),theme:n}),(0,M.jsxs)(`div`,{className:`space-y-3 rounded-2xl border p-3`,style:{borderColor:l},"data-settings-style":`{"gap":12,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(N,{label:e(`options.nomandBackgroundOverlay`),description:e(`options.nomandBackgroundOverlayDesc`),checked:a.overlayEnabled,onChange:e=>o?.({overlayEnabled:e}),theme:n}),(0,M.jsx)(`div`,{className:a.overlayEnabled?``:`opacity-45`,"data-settings-style":`{"tone":"muted"}`,"data-settings-layout":`column`,children:(0,M.jsx)(U,{...p,label:e(`options.nomandBackgroundOverlayOpacity`),value:a.overlayOpacity,disabled:!a.overlayEnabled,min:0,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,onChange:e=>o?.({overlayOpacity:e})})})]}),(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:l},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.latentDitheringGroup`)}),(0,M.jsx)(U,{...p,label:e(`options.latentBaseSpeed`),value:a.ditheringSpeed,min:0,max:2,step:.1,onChange:e=>o?.({ditheringSpeed:e})}),(0,M.jsx)(U,{...p,label:e(`options.latentAudioSpeed`),value:a.ditheringAudioSpeed,min:0,max:2,step:.1,onChange:e=>o?.({ditheringAudioSpeed:e})}),(0,M.jsx)(U,{...p,label:e(`options.latentDitheringSize`),value:a.ditheringSize,min:.5,max:8,step:.25,onChange:e=>o?.({ditheringSize:e})}),(0,M.jsx)(U,{...p,label:e(`options.latentDitheringOpacity`),value:a.ditheringOpacity,min:0,max:1,step:.05,format:e=>`${Math.round(e*100)}%`,onChange:e=>o?.({ditheringOpacity:e})})]}),(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:l},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.latentMeshGroup`)}),(0,M.jsx)(U,{...p,label:e(`options.latentBaseSpeed`),value:a.meshSpeed,min:0,max:2,step:.1,onChange:e=>o?.({meshSpeed:e})}),(0,M.jsx)(U,{...p,label:e(`options.latentAudioSpeed`),value:a.meshAudioSpeed,min:0,max:2,step:.1,onChange:e=>o?.({meshAudioSpeed:e})}),(0,M.jsx)(U,{...p,label:e(`options.latentMeshDistortion`),value:a.meshDistortion,min:0,max:2,step:.05,onChange:e=>o?.({meshDistortion:e})}),(0,M.jsx)(U,{...p,label:e(`options.latentMeshSwirl`),value:a.meshSwirl,min:0,max:1,step:.05,onChange:e=>o?.({meshSwirl:e})})]})]})},$t=i({default:()=>nn}),en=[`dithering`,`mesh`,`both`],tn={dithering:`options.latentDisplayDithering`,mesh:`options.latentDisplayMesh`,both:`options.latentDisplayBoth`},nn=Ye({mode:`latent`,order:35,labelKey:`options.visualizerBackgroundModeLatent`,labelFallback:`Latent`,render:({config:e,theme:t,coverUrl:n,audioPower:r,audioBands:i,staticMode:a,paused:o})=>(0,M.jsx)(Zt,{theme:t,coverUrl:n,audioPower:r,audioBands:i,staticMode:a,paused:o,tuning:e?.latent?.tuning}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,M.jsx)(Qt,{...n,tuning:e?.latent?.tuning??Oe,onTuningChange:t?.latent?.onTuningChange}),renderQuickControls:({config:e,actions:t,t:n,isDaylight:r,theme:i})=>{let a=e?.latent?.tuning??Oe,o=n(tn[a.displayMode]);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(Xe,{isDaylight:r,label:o,title:`${n(`options.latentDisplayMode`)}: ${o}`,onClick:()=>{let e=en.indexOf(a.displayMode);t?.latent?.onTuningChange?.({displayMode:en[(e+1)%en.length]})}}),(0,M.jsx)(Ze,{active:a.overlayEnabled,theme:i,label:n(`options.nomandBackgroundOverlay`),onToggle:()=>t?.latent?.onTuningChange?.({overlayEnabled:!a.overlayEnabled}),children:(0,M.jsx)(ve,{size:14})})]})},resetSettings:e=>e?.latent?.onResetTuning?.()}),rn=({children:e,theme:t})=>(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.24em] opacity-45`,style:{color:t.secondaryColor},"data-settings-style":`{"font":12,"weight":500,"tone":"muted"}`,"data-settings-layout":`column`,children:e}),an=({label:e,value:t,options:n,onChange:r,isDaylight:i,theme:a})=>(0,M.jsxs)(`div`,{className:`space-y-2.5`,"data-settings-style":`{"gap":10}`,"data-settings-layout":`column`,children:[(0,M.jsx)(rn,{theme:a,children:e}),(0,M.jsx)(`div`,{className:`flex flex-wrap gap-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`wrap`,children:n.map(e=>{let n=e.value===t;return(0,M.jsx)(`button`,{type:`button`,"aria-pressed":n,onClick:()=>{e.disabled||r(e.value)},disabled:e.disabled,className:`rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:e.disabled?k(a.secondaryColor,.72):a.primaryColor,borderColor:n?a.accentColor:k(a.secondaryColor,i?.18:.14),backgroundColor:n?k(a.accentColor,i?.1:.16):k(a.backgroundColor,i?.24:.34),boxShadow:n?`inset 0 0 0 1px ${a.accentColor}`:`none`},"data-settings-style":`{"radius":64,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`row`,children:e.label},String(e.value))})})]}),on=({label:e,valueLabel:t,value:n,min:r,max:i,step:a,onChange:o,rangeInputClass:s,onSliderPointerDown:c,onSliderCommit:l})=>(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsxs)(`div`,{className:`flex items-center justify-between gap-3 text-sm`,style:{color:`var(--text-primary)`},"data-settings-style":`{"align":"between","gap":12,"font":14,"tone":"text"}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`span`,{"data-settings-style":`{"grow":true}`,"data-settings-layout":`wrap`,children:e}),(0,M.jsx)(`span`,{className:`font-mono opacity-70`,style:{color:`var(--text-secondary)`},"data-settings-style":`{"tone":"muted"}`,"data-settings-layout":`wrap`,children:t})]}),(0,M.jsx)(`input`,{type:`range`,min:r,max:i,step:a,value:n,onChange:e=>o(parseFloat(e.target.value)),onPointerDown:c,onPointerUp:l,onPointerCancel:l,onBlur:l,className:s,"data-settings-layout":`column`})]}),sn=(e,t,n,r)=>Number.isFinite(e)?Math.min(n,Math.max(t,e)):r,cn=e=>{let t=e.trim().replace(/^#/,``);return/^[0-9a-fA-F]{6}$/.test(t)?`#${t.toLowerCase()}`:null},ln=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a=A,onTuningChange:o,monetBackgroundImage:s,onUploadMonetBackgroundImage:c,onClearMonetBackgroundImage:l,isLoadingMonetBackgroundImage:u=!1,onSliderPointerDown:d,onSliderCommit:f})=>{let p=(0,j.useRef)(null),[m,h]=(0,j.useState)(null),g={backgroundSource:a.backgroundSource??A.backgroundSource,backgroundLayout:a.backgroundLayout??A.backgroundLayout,backgroundBlurPx:sn(a.backgroundBlurPx??A.backgroundBlurPx,0,60,A.backgroundBlurPx),backgroundOverlayOpacity:sn(a.backgroundOverlayOpacity??A.backgroundOverlayOpacity,0,1,A.backgroundOverlayOpacity),backgroundGrayscale:sn(a.backgroundGrayscale??A.backgroundGrayscale,0,1,A.backgroundGrayscale),backgroundSaturation:sn(a.backgroundSaturation??A.backgroundSaturation,0,2,A.backgroundSaturation),backgroundWash:sn(a.backgroundWash??A.backgroundWash,0,1,A.backgroundWash),backgroundHalfPaneOffsetX:sn(a.backgroundHalfPaneOffsetX??A.backgroundHalfPaneOffsetX,-40,40,A.backgroundHalfPaneOffsetX),backgroundWashColorMode:a.backgroundWashColorMode??A.backgroundWashColorMode,backgroundWashCustomColor:cn(a.backgroundWashCustomColor)??A.backgroundWashCustomColor,backgroundDriftEnabled:a.backgroundDriftEnabled??A.backgroundDriftEnabled,backgroundDriftStrength:sn(a.backgroundDriftStrength??A.backgroundDriftStrength,0,1,A.backgroundDriftStrength),backgroundStreaksEnabled:a.backgroundStreaksEnabled??A.backgroundStreaksEnabled},_=(0,j.useMemo)(()=>[{value:`cover-derived`,label:e(`options.monetBackgroundSourceCover`)},{value:`uploaded-global`,label:e(`options.monetBackgroundSourceUploaded`),disabled:!s&&!u}],[u,s,e]),v=(0,j.useMemo)(()=>[{value:`half-pane-gradient`,label:e(`options.monetLayoutHalfPane`)},{value:`full-overlay`,label:e(`options.monetLayoutFullOverlay`)}],[e]),y=(0,j.useMemo)(()=>[{value:`theme`,label:e(`options.monetBackgroundWashTheme`)},{value:`custom`,label:e(`options.monetBackgroundWashCustom`)}],[e]),b=async t=>{let n=Array.from(t.target.files??[]);if(t.target.value=``,h(null),!n.length||!c)return;let r=await c(n);r.ok?(o?.({backgroundSource:`uploaded-global`}),h(n[0].name)):h(r.error||e(`options.monetUploadBackground`))};return(0,M.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:k(n.secondaryColor,.16)},"data-settings-style":`{"radius":24,"border":true,"gap":16,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:[(0,M.jsxs)(`div`,{className:`space-y-1`,"data-settings-style":`{"gap":4}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:e(`options.monetBackgroundSettings`)}),(0,M.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:e(`options.monetBackgroundSettingsDesc`)})]}),(0,M.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,"data-settings-style":`{"gap":14,"radius":18,"border":true,"fill":true,"padding":[14,14,14,14]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},"data-settings-style":`{"font":12,"weight":600,"tone":"muted"}`,"data-settings-layout":`column`,children:e(`options.monetGroupBackgroundSource`)}),(0,M.jsx)(an,{label:e(`options.monetBackgroundSource`),value:g.backgroundSource,options:_,onChange:e=>o?.({backgroundSource:e}),isDaylight:t,theme:n}),(0,M.jsxs)(`div`,{className:`space-y-2.5`,"data-settings-style":`{"gap":10}`,"data-settings-layout":`column`,children:[(0,M.jsx)(rn,{theme:n,children:e(`options.monetUploadBackground`)}),(0,M.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,"data-settings-style":`{"align":"center","gap":8}`,"data-settings-layout":`wrap`,children:[(0,M.jsxs)(`button`,{type:`button`,onClick:()=>p.current?.click(),disabled:u||!c,className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:n.primaryColor,borderColor:k(n.secondaryColor,t?.18:.14),backgroundColor:k(n.backgroundColor,t?.24:.34)},"data-settings-style":`{"align":"center","gap":8,"radius":64,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`row`,children:[(0,M.jsx)(Se,{size:15}),(0,M.jsx)(`span`,{"data-settings-layout":`wrap`,children:e(`options.monetUploadBackground`)})]}),(0,M.jsxs)(`button`,{type:`button`,onClick:()=>void l?.(),disabled:!s||!l,className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-45`,style:{color:n.primaryColor,borderColor:k(n.secondaryColor,t?.18:.14),backgroundColor:k(n.backgroundColor,t?.24:.34)},"data-settings-style":`{"align":"center","gap":8,"radius":64,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`row`,children:[(0,M.jsx)(ye,{size:15}),(0,M.jsx)(`span`,{"data-settings-layout":`wrap`,children:e(`options.monetClearBackground`)})]})]}),(0,M.jsx)(`div`,{className:`text-xs opacity-60`,style:{color:`var(--text-secondary)`},"data-settings-style":`{"font":12,"tone":"muted"}`,"data-settings-layout":`column`,children:m||s?.name||`-`}),(0,M.jsx)(`input`,{ref:p,type:`file`,accept:`.png,.jpg,.jpeg,.gif,.webp,.svg,image/*`,className:`hidden`,onChange:e=>void b(e),"data-settings-layout":`column`})]})]}),(0,M.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,"data-settings-style":`{"gap":14,"radius":18,"border":true,"fill":true,"padding":[14,14,14,14]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},"data-settings-style":`{"font":12,"weight":600,"tone":"muted"}`,"data-settings-layout":`column`,children:e(`options.monetGroupLayoutPosition`)}),(0,M.jsx)(an,{label:e(`options.monetBackgroundLayout`),value:g.backgroundLayout,options:v,onChange:e=>o?.({backgroundLayout:e}),isDaylight:t,theme:n}),g.backgroundLayout===`half-pane-gradient`&&(0,M.jsx)(on,{label:e(`options.monetHalfPaneOffsetX`),valueLabel:`${Math.round(g.backgroundHalfPaneOffsetX)}%`,min:-40,max:40,step:2,value:g.backgroundHalfPaneOffsetX,onChange:e=>o?.({backgroundHalfPaneOffsetX:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f}),(0,M.jsx)(N,{label:e(`options.monetBackgroundDriftEnabled`),description:e(`options.monetBackgroundDriftEnabledDesc`),checked:g.backgroundDriftEnabled,onChange:e=>o?.({backgroundDriftEnabled:e}),theme:n}),g.backgroundDriftEnabled&&(0,M.jsx)(on,{label:e(`options.monetBackgroundDriftStrength`),valueLabel:`${Math.round(g.backgroundDriftStrength*100)}%`,min:0,max:1,step:.05,value:g.backgroundDriftStrength,onChange:e=>o?.({backgroundDriftStrength:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f})]}),(0,M.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,"data-settings-style":`{"gap":14,"radius":18,"border":true,"fill":true,"padding":[14,14,14,14]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},"data-settings-style":`{"font":12,"weight":600,"tone":"muted"}`,"data-settings-layout":`column`,children:e(`options.monetGroupFiltersPostProcessing`)}),(0,M.jsx)(on,{label:e(`options.monetBackgroundBlur`),valueLabel:`${Math.round(g.backgroundBlurPx)}px`,min:0,max:60,step:2,value:g.backgroundBlurPx,onChange:e=>o?.({backgroundBlurPx:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f}),(0,M.jsx)(on,{label:e(`options.monetBackgroundSaturation`),valueLabel:`${Math.round(g.backgroundSaturation*100)}%`,min:0,max:2,step:.05,value:g.backgroundSaturation,onChange:e=>o?.({backgroundSaturation:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f}),(0,M.jsx)(on,{label:e(`options.monetBackgroundGrayscale`),valueLabel:`${Math.round(g.backgroundGrayscale*100)}%`,min:0,max:1,step:.02,value:g.backgroundGrayscale,onChange:e=>o?.({backgroundGrayscale:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f})]}),(0,M.jsxs)(`div`,{className:`space-y-3.5 rounded-[18px] border border-white/5 p-3.5 bg-black/5 dark:bg-white/5`,"data-settings-style":`{"gap":14,"radius":18,"border":true,"fill":true,"padding":[14,14,14,14]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-semibold uppercase tracking-wider opacity-65`,style:{color:n.accentColor},"data-settings-style":`{"font":12,"weight":600,"tone":"muted"}`,"data-settings-layout":`column`,children:e(`options.monetGroupColorTintWash`)}),(0,M.jsx)(on,{label:e(`options.monetBackgroundOverlayOpacity`),valueLabel:`${Math.round(g.backgroundOverlayOpacity*100)}%`,min:0,max:1,step:.02,value:g.backgroundOverlayOpacity,onChange:e=>o?.({backgroundOverlayOpacity:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f}),(0,M.jsx)(on,{label:e(`options.monetBackgroundWash`),valueLabel:`${Math.round(g.backgroundWash*100)}%`,min:0,max:1,step:.02,value:g.backgroundWash,onChange:e=>o?.({backgroundWash:e}),rangeInputClass:i,onSliderPointerDown:d,onSliderCommit:f}),(0,M.jsx)(N,{label:e(`options.monetBackgroundStreaksEnabled`),description:e(`options.monetBackgroundStreaksEnabledDesc`),checked:g.backgroundStreaksEnabled,onChange:e=>o?.({backgroundStreaksEnabled:e}),theme:n}),(0,M.jsx)(an,{label:e(`options.monetBackgroundWashColorMode`),value:g.backgroundWashColorMode,options:y,onChange:e=>o?.({backgroundWashColorMode:e}),isDaylight:t,theme:n}),g.backgroundWashColorMode===`custom`&&(0,M.jsxs)(`div`,{className:`space-y-3 rounded-[20px] border p-3`,style:{borderColor:k(n.secondaryColor,.14),backgroundColor:k(n.backgroundColor,.2)},"data-settings-style":`{"gap":12,"radius":20,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsxs)(`div`,{className:`flex items-center justify-between gap-3`,"data-settings-style":`{"align":"between","gap":12}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"grow":true}`,"data-settings-layout":`column`,children:e(`options.monetBackgroundWashCustomColor`)}),(0,M.jsx)(`div`,{className:`rounded-full px-3 py-1 text-xs font-mono`,style:{color:n.backgroundColor,backgroundColor:g.backgroundWashCustomColor},"data-settings-style":`{"radius":64,"font":12,"padding":[12,4,12,4]}`,"data-settings-layout":`column`,children:g.backgroundWashCustomColor.toUpperCase()})]}),(0,M.jsx)(Pe,{color:g.backgroundWashCustomColor,onChange:e=>o?.({backgroundWashCustomColor:e}),height:180})]})]})]})},un=1920,dn=1080,fn=new Map,pn={r:10,g:10,b:12},mn={r:245,g:245,b:245},W=(e,t,n)=>Math.min(n,Math.max(t,e)),G=(e,t,n)=>e+(t-e)*n,hn=(e,t,n)=>.2126*e+.7152*t+.0722*n,gn=(e,t)=>hn(e.r,e.g,e.b)<=hn(t.r,t.g,t.b)?{shadow:e,highlight:t}:{shadow:t,highlight:e},_n=({coverUrl:e,monetBackgroundImage:t,tuning:n})=>n.backgroundSource===`uploaded-global`?t?.url??e??null:e??t?.url??null,vn=async e=>{let t=new Image;(e.startsWith(`http://`)||e.startsWith(`https://`))&&(t.crossOrigin=`anonymous`),t.decoding=`async`;let n=new Promise((n,r)=>{t.onload=()=>n(),t.onerror=()=>r(Error(`Failed to load image: ${e}`))});t.src=e;try{await t.decode()}catch{await n}return t},yn=(e,t,n)=>{let r=e[t];return typeof r==`number`&&Number.isFinite(r)?r:n},bn=(e,t,n,r)=>{let i=yn(t,`width`,n),a=yn(t,`height`,r);if(!i||!a)return;let o=Math.max(n/i,r/a),s=i*o,c=a*o,l=(n-s)/2,u=(r-c)/2;e.drawImage(t,l,u,s,c)},xn=(e,t)=>{let n=l(e);return n?{r:W(n.r,0,255),g:W(n.g,0,255),b:W(n.b,0,255)}:t},Sn=(e,t,n,r)=>{let{shadow:i,highlight:a}=gn(t,r);if(e<=.55){let t=e/.55;return{r:G(i.r,n.r,t),g:G(i.g,n.g,t),b:G(i.b,n.b,t)}}let o=(e-.55)/.45;return{r:G(n.r,a.r,o),g:G(n.g,a.g,o),b:G(n.b,a.b,o)}},Cn=(e,t,n,r,i)=>{let a=W(i.backgroundGrayscale,0,1),o=W(i.backgroundSaturation,0,2),s=W(i.backgroundWash,0,1);if(a<=0&&Math.abs(o-1)<.001&&s<=0)return;let c=e.getImageData(0,0,t,n),l=c.data,u=xn(r.backgroundColor,pn),d=xn(r.accentColor,u),f=xn(r.primaryColor,mn),p=xn(i.backgroundWashCustomColor,d),m=i.backgroundWashColorMode===`custom`?p:d;for(let e=0;e<l.length;e+=4){let t=l[e],n=l[e+1],r=l[e+2];if(l[e+3]===0)continue;let i=hn(t,n,r);if(a>0&&(t=G(t,i,a),n=G(n,i,a),r=G(r,i,a)),Math.abs(o-1)>=.001){let e=hn(t,n,r);t=e+(t-e)*o,n=e+(n-e)*o,r=e+(r-e)*o}if(s>0){let e=Sn(W(i/255,0,1),u,m,f);t=G(t,e.r,s),n=G(n,e.g,s),r=G(r,e.b,s)}l[e]=Math.round(W(t,0,255)),l[e+1]=Math.round(W(n,0,255)),l[e+2]=Math.round(W(r,0,255))}e.putImageData(c,0,0)},wn=(e,t,n,r,i)=>{let a=W(i.backgroundOverlayOpacity,0,1),o=e.createLinearGradient(0,0,t,n);o.addColorStop(0,k(r.accentColor,.08+a*.62)),o.addColorStop(.44,k(r.backgroundColor,.16+a*.58)),o.addColorStop(1,k(r.primaryColor,.06+a*.36)),e.fillStyle=o,e.fillRect(0,0,t,n);let s=e.createRadialGradient(t*.18,n*.34,0,t*.18,n*.34,t*.55);s.addColorStop(0,k(r.accentColor,a*.42)),s.addColorStop(1,k(r.backgroundColor,0)),e.fillStyle=s,e.fillRect(0,0,t,n);let c=e.createLinearGradient(t*.45,0,t,0);if(c.addColorStop(0,k(r.backgroundColor,0)),c.addColorStop(1,k(r.backgroundColor,.18+a*.38)),e.fillStyle=c,e.fillRect(0,0,t,n),i.backgroundStreaksEnabled!==!1){e.fillStyle=k(r.backgroundColor,.1+a*.08);for(let r=0;r<18;r+=1){let i=r*127%t,a=r*211%n-40;e.fillRect(i,a,1,n*.28)}}},Tn=({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:r})=>JSON.stringify({sourceUrl:_n({coverUrl:e,monetBackgroundImage:t,tuning:r}),uploadedId:r.backgroundSource===`uploaded-global`?t?.id??null:null,theme:{backgroundColor:n.backgroundColor,primaryColor:n.primaryColor,accentColor:n.accentColor},tuning:{backgroundSource:r.backgroundSource,backgroundBlurPx:r.backgroundBlurPx,backgroundOverlayOpacity:r.backgroundOverlayOpacity,backgroundGrayscale:r.backgroundGrayscale,backgroundSaturation:r.backgroundSaturation,backgroundWash:r.backgroundWash,backgroundWashColorMode:r.backgroundWashColorMode,backgroundWashCustomColor:r.backgroundWashCustomColor,backgroundStreaksEnabled:r.backgroundStreaksEnabled}}),En=null,Dn=()=>{if(En!==null)return En;if(typeof document>`u`)return!1;try{let e=document.createElement(`canvas`);e.width=2,e.height=2;let t=e.getContext(`2d`);return!t||typeof t.filter!=`string`?(En=!1,!1):(t.fillStyle=`#000000`,t.fillRect(0,0,2,2),t.filter=`blur(1px)`,t.fillStyle=`#ffffff`,t.fillRect(0,0,1,1),En=t.getImageData(1,1,1,1).data[0]>0,En)}catch{return En=!1,!1}},On=async({coverUrl:t,monetBackgroundImage:n,theme:r,tuning:i})=>{let a=_n({coverUrl:t,monetBackgroundImage:n,tuning:i});if(!a)return null;let o=await e(a),s;try{s=await vn(o?.url??a)}catch(e){throw o?.revoke(),e}o?.revoke();let c=document.createElement(`canvas`);c.width=un,c.height=dn;let l=c.getContext(`2d`);return l?(l.fillStyle=r.backgroundColor,l.fillRect(0,0,c.width,c.height),l.save(),Dn()&&(l.filter=`blur(${W(i.backgroundBlurPx,0,60)}px)`),bn(l,s,c.width,c.height),l.restore(),Cn(l,c.width,c.height,r,i),wn(l,c.width,c.height,r,i),c.toDataURL(`image/jpeg`,.92)):null},kn=e=>{let t=Tn(e),n=fn.get(t);if(n)return n;let r=On(e).catch(()=>null);return fn.set(t,r),r},An=240,jn=76,Mn=156,Nn=3.4,Pn=.035,Fn=.01,In=12.9898,Ln=78.233,Rn=39.425,zn=(e,t)=>(e%t+t)%t,Bn=(e,t)=>{let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)},Vn=e=>e*e*(3-2*e),Hn=(e,t,n)=>{let r=Math.floor(e),i=Bn(zn(r,t),n);return i+(Bn(zn(r+1,t),n)-i)*Vn(e-r)},Un=(e,t)=>{let n=Hn(e,jn,t),r=Hn(e*2,152,t+17.31);return(n*.68+r*.32)*2-1},Wn=e=>{let t=e.reduce((e,t)=>Math.max(e,Math.abs(t)),0);return t>0?e.map(e=>e/t):e},Gn=e=>{let t=Math.min(1,Math.max(0,e)),n=Nn*t,r=1+n/100*2+Fn,i=Pn*t,a=[],o=[],s=[];for(let e=0;e<=Mn;e+=1){let t=jn*e/Mn;a.push(Un(t,In)),o.push(Un(t,Ln)),s.push(Un(t,Rn))}let c=Wn(a),l=Wn(o),u=Wn(s);return{keyframes:c.map((e,t)=>({transform:`translate3d(${(e*n).toFixed(4)}%, ${(l[t]*n).toFixed(4)}%, 0) scale(${(r+i*((u[t]+1)/2)).toFixed(5)})`})),durationMs:An*1e3,maxTravelPercent:n,minScale:r}},Kn=180,qn=(e,t,n)=>Math.min(n,Math.max(t,e)),Jn=(e,t,n,r,i)=>{let a=(0,j.useRef)(null),o=(0,j.useRef)(i);o.current=i,(0,j.useEffect)(()=>{let i=e.current;if(!i||!t||n<=0||typeof i.animate!=`function`||r)return;let s=Gn(n),c=i.animate(s.keyframes,{duration:s.durationMs,iterations:1/0,easing:`linear`});return a.current=c,o.current&&c.pause(),()=>{c.cancel(),a.current=null}},[t,e,n,r]),(0,j.useEffect)(()=>{i?a.current?.pause():a.current?.play()},[i])},Yn=(e,t,n)=>n.backgroundSource===`uploaded-global`?t?.url??e??null:e??t?.url??null,Xn=({coverUrl:e,monetBackgroundImage:t,theme:n,isDaylight:r=!1,tuning:i=A,transparentBackground:a=!1,staticMode:o=!1,paused:s=!1})=>{let[c,l]=(0,j.useState)(null),u=Yn(e,t,i),d=(0,j.useMemo)(()=>`linear-gradient(135deg, ${k(n.accentColor,.22)}, ${k(n.backgroundColor,.96)} 50%, ${k(n.primaryColor,.18)})`,[n]),f=(0,j.useMemo)(()=>`linear-gradient(90deg, ${k(n.backgroundColor,.18)} 0%, ${k(n.backgroundColor,.32)} 34%, ${k(n.backgroundColor,.66)} 70%, ${k(n.backgroundColor,.82)} 100%)`,[n]),p=(0,j.useMemo)(()=>Tn({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:i}),[e,t,n,i]);(0,j.useEffect)(()=>{let r=!1,o;return!u||a?(l(null),()=>{r=!0}):(o=window.setTimeout(()=>{kn({coverUrl:e,monetBackgroundImage:t,theme:n,tuning:i}).then(e=>{r||l(t=>t===e?t:e)})},Kn),()=>{r=!0,o!==void 0&&window.clearTimeout(o)})},[p,u,a]);let m=(0,j.useRef)(null),g=qn(i.backgroundDriftStrength??0,0,1),_=!!i.backgroundDriftEnabled&&!o&&g>0;Jn(m,_,g,he(`monetBackground`),s);let v=(0,j.useMemo)(()=>_?{willChange:`transform`}:void 0,[_]),y=(0,j.useMemo)(()=>Dn(),[])?0:i.backgroundBlurPx,b=(0,j.useMemo)(()=>y<=0?{}:{filter:`blur(${y}px)`,WebkitFilter:`blur(${y}px)`,transform:`scale(1.1) translateZ(0)`},[y]);if(a)return null;let x=c?`url(${c})`:u?`linear-gradient(135deg, ${k(n.accentColor,.2)}, ${k(n.backgroundColor,.78)}), url(${u})`:d;if(i.backgroundLayout===`full-overlay`)return(0,M.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,children:[(0,M.jsx)(`div`,{ref:m,className:`absolute inset-0`,style:v,children:(0,M.jsx)(ie,{initial:!1,children:(0,M.jsx)(h.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,ease:`easeInOut`},className:`absolute inset-0`,style:{backgroundColor:n.backgroundColor,backgroundImage:x,backgroundSize:`cover`,backgroundPosition:`center`,...b}},c||u||`fallback`)})}),(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{background:f}})]});let S=(r?.7:.3)+qn(i.backgroundOverlayOpacity,0,1)*.16,C=qn(50+i.backgroundHalfPaneOffsetX,10,90);return(0,M.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,children:[(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:n.backgroundColor,backgroundImage:d}}),(0,M.jsx)(ie,{initial:!1,children:c||u?(0,M.jsx)(`div`,{className:`absolute inset-y-0 left-0 w-[72%] sm:w-[68%] lg:w-[60%] overflow-hidden`,style:{WebkitMaskImage:`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.46) 74%, rgba(0,0,0,0) 100%)`,maskImage:`linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.94) 48%, rgba(0,0,0,0.46) 74%, rgba(0,0,0,0) 100%)`},children:(0,M.jsx)(`div`,{ref:m,className:`absolute inset-0`,style:v,children:(0,M.jsx)(h.div,{initial:{opacity:0},animate:{opacity:S},exit:{opacity:0},transition:{duration:.8,ease:`easeInOut`},className:`absolute inset-0`,style:{backgroundImage:x,backgroundRepeat:`no-repeat`,backgroundSize:`cover`,backgroundPosition:`${C}% center`,...b}},c||u||`fallback`)})}):null}),(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{background:`linear-gradient(90deg, ${k(n.backgroundColor,.14)} 0%, ${k(n.backgroundColor,.28)} 28%, ${k(n.backgroundColor,.62)} 64%, ${k(n.backgroundColor,.86)} 100%)`}}),(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundImage:`radial-gradient(circle at 18% 34%, ${k(n.accentColor,.18)}, transparent 36%)`,backgroundSize:`cover`,backgroundPosition:`center`}}),(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{background:f}})]})},Zn=i({default:()=>Qn}),Qn=Ye({mode:`monet`,order:20,labelKey:`options.visualizerBackgroundModeMonet`,labelFallback:`Monet`,render:({config:e,coverUrl:t,theme:n,isDaylight:r,staticMode:i,paused:a})=>(0,M.jsx)(Xn,{coverUrl:t,monetBackgroundImage:e?.customImage,theme:n,isDaylight:r,tuning:e?.monet?.tuning,transparentBackground:e?.transparent,staticMode:i,paused:a}),renderSettingsPanel:({config:e,actions:t,t:n,isDaylight:r,theme:i,controlCardBg:a,rangeInputClass:o,onSliderPointerDown:s,onSliderCommit:c})=>(0,M.jsx)(ln,{t:n,isDaylight:r,theme:i,controlCardBg:a,rangeInputClass:o,tuning:e?.monet?.tuning??A,onTuningChange:t?.monet?.onTuningChange,monetBackgroundImage:e?.customImage,onUploadMonetBackgroundImage:t?.customImage?.onUpload,onClearMonetBackgroundImage:t?.customImage?.onClear,isLoadingMonetBackgroundImage:t?.customImage?.isLoading,onSliderPointerDown:s,onSliderCommit:c}),renderQuickControls:({config:e,actions:t,t:n,isDaylight:r})=>{let i=(e?.monet?.tuning??A).backgroundLayout===`full-overlay`,a=n(i?`options.monetLayoutFullOverlay`:`options.monetLayoutHalfPane`);return(0,M.jsx)(Xe,{isDaylight:r,label:a,title:`${n(`options.monetBackgroundLayout`)}: ${a}`,onClick:()=>t?.monet?.onTuningChange?.({backgroundLayout:i?`half-pane-gradient`:`full-overlay`})})},resetSettings:e=>e?.monet?.onResetTuning?.()}),$n=1.8,er=.01,tr=16/9,nr={fiberSize:.2,crumples:.35,crumpleSize:.35,folds:.65,foldCount:5,drops:.2,seed:5.8},rr={perspective:.4,count:20,focusCenter:.55,focusEdges:.8,swirl:.08,lensCircle:.1},ir=e=>Math.min(1,Math.max(0,e)),ar=e=>Math.min($n,Math.max(1,e)),or=e=>e<=1?1:ar(e+er),sr=e=>or(1/(1-2*Math.min(Math.max(e,0),.45))),cr=(e,t,n)=>n&&!t?!e:e,lr=(e,t,n)=>cr(!e,t,n),ur=(e,t)=>{let{folds:n,crumples:r,drops:i}=nr;return sr(.02*(2*n+1.5*r+.2*i+.75*ir(e)+.1*ir(t)))},dr=(e,t)=>{let n=.5*Math.hypot(tr,1),r=ir(t),i=.7*r**(1.3+2.7*r)*(1-rr.focusEdges),a=Math.max(.35,1-i/n);if(e<=0)return or(1/a);let o=Math.min(e,1)*1.4,s=e=>{let t=2*n/e;return Math.tan(t*o)/Math.tan(o)/t},c=Math.max(1,2*n*o/1.45);if(c>=$n||s($n)>$n*a)return $n;if(c===1&&s(1)<=a)return or(1/a);let l=$n;for(let e=0;e<32;e+=1){let e=(c+l)/2;s(e)>e*a?c=e:l=e}return or(l)},fr=j.memo(({coverUrl:e,monetBackgroundImage:t,tuning:n,theme:r,isDaylight:i})=>{let a={...ke,...n},o=a.imageSource===`uploaded-global`?t?.url??e:e??t?.url;return o?(0,M.jsxs)(`div`,{className:`absolute inset-0 z-0 overflow-hidden`,style:{backgroundColor:r.backgroundColor,pointerEvents:`none`},children:[(()=>{let e={width:`100%`,height:`100%`,image:o,fit:`cover`,minPixelRatio:1,maxPixelCount:2073600,style:{width:`100%`,height:`100%`}};switch(a.effect){case`fluted-glass`:return(0,M.jsx)(Pt,{...e,colorBack:r.backgroundColor,colorShadow:r.secondaryColor,colorHighlight:r.primaryColor,shadows:.25,size:a.flutedGlassSize,distortion:a.flutedGlassDistortion,blur:a.flutedGlassBlur,shape:`lines`,distortionShape:`prism`,highlights:.1,edges:.25},`${o}:fluted-glass`);case`paper-texture`:return(0,M.jsx)(Nt,{...e,...nr,colorFront:r.accentColor,colorBack:r.backgroundColor,contrast:a.paperTextureContrast,roughness:a.paperTextureRoughness,fiber:a.paperTextureFiber,scale:ur(a.paperTextureRoughness,a.paperTextureFiber)},`${o}:paper-texture`);case`halftone-dots`:return(0,M.jsx)(Lt,{...e,colorBack:r.backgroundColor,colorFront:r.accentColor,size:a.halftoneDotsSize,radius:a.halftoneDotsRadius,contrast:a.halftoneDotsContrast,originalColors:a.halftoneDotsOriginalColors,inverted:lr(a.halftoneDotsInverted,a.halftoneDotsOriginalColors,i),grid:`hex`,type:`gooey`,grainMixer:.12,grainOverlay:.06,grainSize:.5},`${o}:halftone-dots`);case`lens-distortion`:return(0,M.jsx)(It,{...e,...rr,spread:a.lensDistortionSpread,dispersion:a.lensDistortionDispersion,lensBulge:a.lensDistortionBulge,scale:dr(a.lensDistortionBulge,a.lensDistortionSpread)},`${o}:lens-distortion`);default:return(0,M.jsx)(Ft,{...e,colorBack:r.backgroundColor,colorFront:r.accentColor,colorHighlight:r.primaryColor,originalColors:a.originalColors,inverted:cr(a.inverted,a.originalColors,i),type:a.ditheringType,size:a.size,colorSteps:a.colorSteps},`${o}:dithering`)}})(),a.overlayEnabled&&a.overlayOpacity>0&&(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{backgroundColor:r.backgroundColor,opacity:a.overlayOpacity}})]}):(0,M.jsx)(`div`,{className:`absolute inset-0 z-0`,style:{backgroundColor:r.backgroundColor}})}),pr=e=>e.toFixed(2),K=e=>`${Math.round(e*100)}%`,mr=(e,t)=>({borderColor:k(e.secondaryColor,t?.18:.16),selectedBg:k(e.accentColor,t?.1:.16)}),q=({label:e,value:t,min:n,max:r,step:i,rangeInputClass:a,theme:o,onChange:s,onPointerDown:c,onPointerUp:l,format:u=pr})=>(0,M.jsxs)(`label`,{className:`block space-y-2`,children:[(0,M.jsxs)(`span`,{className:`flex justify-between gap-3 text-sm`,style:{color:o.primaryColor},children:[(0,M.jsx)(`span`,{children:e}),(0,M.jsx)(`span`,{className:`font-mono opacity-70`,children:u(t)})]}),(0,M.jsx)(`input`,{type:`range`,min:n,max:r,step:i,value:t,onChange:e=>s(Number(e.target.value)),onPointerDown:c,onPointerUp:l,onPointerCancel:l,className:a})]}),hr=[`2x2`,`4x4`,`8x8`],gr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c,selectedBg:l}=mr(n,t),u={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundEffectDithering`)}),(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},"data-settings-style":`{"font":14}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundDitheringType`)}),(0,M.jsx)(`div`,{className:`grid grid-cols-3 gap-2`,"data-settings-style":`{"columns":3,"gap":8}`,"data-settings-layout":`grid`,children:hr.map(e=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":i.ditheringType===e,onClick:()=>a?.({ditheringType:e}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:i.ditheringType===e?n.accentColor:c,backgroundColor:i.ditheringType===e?l:`transparent`,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":12,"padding":[8,8,8,8]}`,"data-settings-layout":`row`,children:e},e))})]}),(0,M.jsx)(q,{...u,label:e(`options.nomandBackgroundSize`),value:i.size,min:.5,max:20,step:.5,format:e=>e.toFixed(1),onChange:e=>a?.({size:e})}),(0,M.jsx)(q,{...u,label:e(`options.nomandBackgroundColorSteps`),value:i.colorSteps,min:1,max:7,step:1,format:e=>String(Math.round(e)),onChange:e=>a?.({colorSteps:e})}),(0,M.jsx)(N,{label:e(`options.nomandBackgroundOriginalColors`),checked:i.originalColors,onChange:e=>a?.({originalColors:e}),theme:n}),(0,M.jsx)(N,{label:e(`options.nomandBackgroundInverted`),checked:i.inverted,onChange:e=>a?.({inverted:e}),theme:n})]})},_r=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=mr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundEffectFlutedGlass`)}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassSize`),value:i.flutedGlassSize,min:.1,max:1,step:.05,onChange:e=>a?.({flutedGlassSize:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassDistortion`),value:i.flutedGlassDistortion,min:0,max:1,step:.05,format:K,onChange:e=>a?.({flutedGlassDistortion:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundFlutedGlassBlur`),value:i.flutedGlassBlur,min:0,max:1,step:.05,format:K,onChange:e=>a?.({flutedGlassBlur:e})})]})},vr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=mr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundEffectHalftoneDots`)}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsSize`),value:i.halftoneDotsSize,min:.1,max:1,step:.05,onChange:e=>a?.({halftoneDotsSize:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsRadius`),value:i.halftoneDotsRadius,min:.1,max:2,step:.05,onChange:e=>a?.({halftoneDotsRadius:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundHalftoneDotsContrast`),value:i.halftoneDotsContrast,min:0,max:1,step:.05,format:K,onChange:e=>a?.({halftoneDotsContrast:e})}),(0,M.jsx)(N,{label:e(`options.nomandBackgroundOriginalColors`),checked:i.halftoneDotsOriginalColors,onChange:e=>a?.({halftoneDotsOriginalColors:e}),theme:n}),(0,M.jsx)(N,{label:e(`options.nomandBackgroundInverted`),checked:i.halftoneDotsInverted,onChange:e=>a?.({halftoneDotsInverted:e}),theme:n})]})},yr=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=mr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundEffectLensDistortion`)}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionSpread`),value:i.lensDistortionSpread,min:0,max:1,step:.05,format:K,onChange:e=>a?.({lensDistortionSpread:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionBulge`),value:i.lensDistortionBulge,min:-1,max:1,step:.05,onChange:e=>a?.({lensDistortionBulge:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundLensDistortionDispersion`),value:i.lensDistortionDispersion,min:0,max:1,step:.05,format:K,onChange:e=>a?.({lensDistortionDispersion:e})})]})},br=({t:e,isDaylight:t,theme:n,rangeInputClass:r,tuning:i,onTuningChange:a,onSliderPointerDown:o,onSliderCommit:s})=>{let{borderColor:c}=mr(n,t),l={rangeInputClass:r,theme:n,onPointerDown:o,onPointerUp:s};return(0,M.jsxs)(`div`,{className:`space-y-4 rounded-2xl border p-3`,style:{borderColor:c},"data-settings-style":`{"gap":16,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`text-xs font-medium uppercase tracking-[0.2em]`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"weight":500}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundEffectPaperTexture`)}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureContrast`),value:i.paperTextureContrast,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureContrast:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureRoughness`),value:i.paperTextureRoughness,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureRoughness:e})}),(0,M.jsx)(q,{...l,label:e(`options.nomandBackgroundPaperTextureFiber`),value:i.paperTextureFiber,min:0,max:1,step:.05,format:K,onChange:e=>a?.({paperTextureFiber:e})})]})},xr=[`dithering`,`fluted-glass`,`paper-texture`,`halftone-dots`,`lens-distortion`],Sr={dithering:`options.nomandBackgroundEffectDithering`,"fluted-glass":`options.nomandBackgroundEffectFlutedGlass`,"paper-texture":`options.nomandBackgroundEffectPaperTexture`,"halftone-dots":`options.nomandBackgroundEffectHalftoneDots`,"lens-distortion":`options.nomandBackgroundEffectLensDistortion`},Cr=e=>{let{t,isDaylight:n,theme:r,tuning:i}=e,{borderColor:a,selectedBg:o}=mr(r,n);return(0,M.jsxs)(`div`,{className:`space-y-4`,"data-settings-style":`{"gap":16}`,"data-settings-layout":`column`,children:[(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm`,style:{color:r.primaryColor},"data-settings-style":`{"font":14}`,"data-settings-layout":`column`,children:t(`options.nomandBackgroundEffect`)}),(0,M.jsx)(`div`,{className:`grid grid-cols-2 gap-2 sm:grid-cols-3`,"data-settings-style":`{"columns":2,"gap":8}`,"data-settings-layout":`grid`,children:xr.map(n=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":i.effect===n,onClick:()=>e.onTuningChange?.({effect:n}),className:`rounded-xl border px-2 py-2 text-xs`,style:{borderColor:i.effect===n?r.accentColor:a,backgroundColor:i.effect===n?o:`transparent`,color:r.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":12,"padding":[8,8,8,8]}`,"data-settings-layout":`row`,children:t(Sr[n])},n))})]}),i.effect===`dithering`&&(0,M.jsx)(gr,{...e}),i.effect===`fluted-glass`&&(0,M.jsx)(_r,{...e}),i.effect===`paper-texture`&&(0,M.jsx)(br,{...e}),i.effect===`halftone-dots`&&(0,M.jsx)(vr,{...e}),i.effect===`lens-distortion`&&(0,M.jsx)(yr,{...e})]})},wr=({t:e,isDaylight:t,theme:n,controlCardBg:r,rangeInputClass:i,tuning:a,onTuningChange:o,monetBackgroundImage:s,onUploadMonetBackgroundImage:c,onClearMonetBackgroundImage:l,isLoadingMonetBackgroundImage:u=!1,onSliderPointerDown:d,onSliderCommit:f})=>{let p={...ke,...a},m=(0,j.useRef)(null),[h,g]=(0,j.useState)(``),_=k(n.secondaryColor,t?.18:.16),v=k(n.accentColor,t?.1:.16),y=e=>{o?.({imageSource:e})},b=async t=>{if(!t.length||!c)return;let n=await c(t);g(n.ok?e(`options.nomandBackgroundUploadSuccess`):n.error??e(`options.nomandBackgroundUploadFailed`)),n.ok&&y(`uploaded-global`)};return(0,M.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:_},"data-settings-style":`{"radius":24,"border":true,"gap":16,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:[(0,M.jsxs)(`div`,{className:`space-y-1`,"data-settings-style":`{"gap":4}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundSettings`)}),(0,M.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundSettingsDesc`)})]}),(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm`,style:{color:n.primaryColor},"data-settings-style":`{"font":14}`,"data-settings-layout":`column`,children:e(`options.nomandBackgroundSource`)}),(0,M.jsx)(`div`,{className:`grid grid-cols-2 gap-2`,"data-settings-style":`{"columns":2,"gap":8}`,"data-settings-layout":`grid`,children:[[`cover-derived`,e(`options.monetBackgroundSourceCover`)],[`uploaded-global`,e(`options.monetBackgroundSourceUploaded`)]].map(([e,t])=>(0,M.jsx)(`button`,{type:`button`,"aria-pressed":p.imageSource===e,disabled:e===`uploaded-global`&&!s&&!u,onClick:()=>y(e),className:`rounded-2xl border px-3 py-2 text-sm disabled:opacity-40`,style:{borderColor:p.imageSource===e?n.accentColor:_,backgroundColor:p.imageSource===e?v:`transparent`,color:n.primaryColor},"data-settings-style":`{"radius":16,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`row`,children:t},e))}),(0,M.jsxs)(`div`,{className:`flex flex-wrap gap-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`wrap`,children:[(0,M.jsx)(`input`,{ref:m,type:`file`,accept:`image/png,image/jpeg,image/webp,image/gif`,className:`hidden`,onChange:e=>{b(Array.from(e.target.files??[])),e.target.value=``},"data-settings-layout":`column`}),(0,M.jsxs)(`button`,{type:`button`,disabled:u||!c,onClick:()=>m.current?.click(),className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs disabled:opacity-40`,style:{borderColor:_,color:n.primaryColor},"data-settings-style":`{"align":"center","gap":8,"radius":64,"border":true,"font":12,"padding":[12,8,12,8]}`,"data-settings-layout":`row`,children:[(0,M.jsx)(we,{size:14}),e(`options.monetUploadBackground`)]}),(0,M.jsxs)(`button`,{type:`button`,disabled:!s||!l,onClick:()=>void l?.(),className:`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs disabled:opacity-40`,style:{borderColor:_,color:n.secondaryColor},"data-settings-style":`{"align":"center","gap":8,"radius":64,"border":true,"font":12,"padding":[12,8,12,8]}`,"data-settings-layout":`row`,children:[(0,M.jsx)(ye,{size:14}),e(`options.monetClearBackground`)]})]}),(0,M.jsx)(`div`,{className:`truncate text-xs opacity-60`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"tone":"muted"}`,"data-settings-layout":`column`,children:h||s?.name||`-`})]}),(0,M.jsx)(Cr,{t:e,isDaylight:t,theme:n,rangeInputClass:i,tuning:p,onTuningChange:o,onSliderPointerDown:d,onSliderCommit:f}),(0,M.jsxs)(`div`,{className:`space-y-3 rounded-2xl border p-3`,style:{borderColor:_},"data-settings-style":`{"gap":12,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(N,{label:e(`options.nomandBackgroundOverlay`),description:e(`options.nomandBackgroundOverlayDesc`),checked:p.overlayEnabled,onChange:e=>o?.({overlayEnabled:e}),theme:n}),(0,M.jsxs)(`label`,{className:`block space-y-2 ${p.overlayEnabled?``:`opacity-45`}`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`wrap`,children:[(0,M.jsxs)(`span`,{className:`flex justify-between text-sm`,style:{color:n.primaryColor},"data-settings-style":`{"align":"between","font":14}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`span`,{"data-settings-style":`{"grow":true}`,"data-settings-layout":`wrap`,children:e(`options.nomandBackgroundOverlayOpacity`)}),(0,M.jsxs)(`span`,{className:`font-mono opacity-70`,"data-settings-layout":`wrap`,children:[Math.round(p.overlayOpacity*100),`%`]})]}),(0,M.jsx)(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:p.overlayOpacity,disabled:!p.overlayEnabled,onChange:e=>o?.({overlayOpacity:Number(e.target.value)}),onPointerDown:d,onPointerUp:f,className:i,"data-settings-layout":`column`})]})]})]})},Tr=i({default:()=>Er}),Er=Ye({mode:`nomand`,order:30,labelKey:`options.visualizerBackgroundModeNomand`,labelFallback:`Nomand`,render:({config:e,coverUrl:t,theme:n,isDaylight:r})=>(0,M.jsx)(fr,{coverUrl:t,monetBackgroundImage:e?.customImage,tuning:e?.nomand?.tuning,theme:n,isDaylight:r}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,M.jsx)(wr,{...n,tuning:e?.nomand?.tuning??ke,onTuningChange:t?.nomand?.onTuningChange,monetBackgroundImage:e?.customImage,onUploadMonetBackgroundImage:t?.customImage?.onUpload,onClearMonetBackgroundImage:t?.customImage?.onClear,isLoadingMonetBackgroundImage:t?.customImage?.isLoading}),renderQuickControls:({config:e,actions:t,t:n,theme:r})=>{let i=e?.nomand?.tuning??ke;return(0,M.jsx)(Ze,{active:i.overlayEnabled,theme:r,label:n(`options.nomandBackgroundOverlay`),onToggle:()=>t?.nomand?.onTuningChange?.({overlayEnabled:!i.overlayEnabled}),children:(0,M.jsx)(ve,{size:14})})},resetSettings:e=>e?.nomand?.onResetTuning?.()}),Dr=5120,Or=5121,kr=5122,Ar=5123,jr=5124,Mr=5125,Nr=5126,Pr=32819,Fr=32820,Ir=33635,Lr=5131,Rr=33640,zr=35899,Br=35902,Vr=36269,Hr=34042,Ur={};{let e=Ur;e[Dr]=Int8Array,e[Or]=Uint8Array,e[kr]=Int16Array,e[Ar]=Uint16Array,e[jr]=Int32Array,e[Mr]=Uint32Array,e[Nr]=Float32Array,e[Pr]=Uint16Array,e[Fr]=Uint16Array,e[Ir]=Uint16Array,e[Lr]=Uint16Array,e[Rr]=Uint32Array,e[zr]=Uint32Array,e[Br]=Uint32Array,e[Vr]=Uint32Array,e[Hr]=Uint32Array}function Wr(e){if(e instanceof Int8Array)return Dr;if(e instanceof Uint8Array||e instanceof Uint8ClampedArray)return Or;if(e instanceof Int16Array)return kr;if(e instanceof Uint16Array)return Ar;if(e instanceof Int32Array)return jr;if(e instanceof Uint32Array)return Mr;if(e instanceof Float32Array)return Nr;throw Error(`unsupported typed array type`)}function Gr(e){if(e===Int8Array)return Dr;if(e===Uint8Array||e===Uint8ClampedArray)return Or;if(e===Int16Array)return kr;if(e===Uint16Array)return Ar;if(e===Int32Array)return jr;if(e===Uint32Array)return Mr;if(e===Float32Array)return Nr;throw Error(`unsupported typed array type`)}function Kr(e){let t=Ur[e];if(!t)throw Error(`unknown gl type`);return t}var qr=typeof SharedArrayBuffer<`u`?function(e){return e&&e.buffer&&(e.buffer instanceof ArrayBuffer||e.buffer instanceof SharedArrayBuffer)}:function(e){return e&&e.buffer&&e.buffer instanceof ArrayBuffer};function Jr(...e){console.error(...e)}function Yr(...e){console.warn(...e)}var Xr=new Map;function Zr(e,t){if(!e||typeof e!=`object`)return!1;let n=Xr.get(t);n||(n=new WeakMap,Xr.set(t,n));let r=n.get(e);if(r===void 0){let i=Object.prototype.toString.call(e);r=i.substring(8,i.length-1)===t,n.set(e,r)}return r}function Qr(e,t){return typeof WebGLBuffer<`u`&&Zr(t,`WebGLBuffer`)}function $r(e,t){return typeof WebGLTexture<`u`&&Zr(t,`WebGLTexture`)}var ei=35044,ti=34962,ni=34963,ri=34660,ii=5120,ai=5121,oi=5122,si=5123,ci=5124,li=5125,ui=5126,di={attribPrefix:``};function fi(e,t,n,r,i){e.bindBuffer(t,n),e.bufferData(t,r,i||ei)}function pi(e,t,n,r){if(Qr(e,t))return t;n||=ti;let i=e.createBuffer();return fi(e,n,i,t,r),i}function mi(e){return e===`indices`}function hi(e){return e===Int8Array||e===Uint8Array}function gi(e){return e.length?e:e.data}var _i=/coord|texture/i,vi=/color|colour/i;function yi(e,t){let n;if(n=_i.test(e)?2:vi.test(e)?4:3,t%n>0)throw Error(`Can not guess numComponents for attribute '${e}'. Tried ${n} but ${t} values is not evenly divisible by ${n}. You should specify it.`);return n}function bi(e,t,n){return e.numComponents||e.size||yi(t,n||gi(e).length)}function xi(e,t){if(qr(e))return e;if(qr(e.data))return e.data;Array.isArray(e)&&(e={data:e});let n=e.type?Ci(e.type):void 0;return n||=mi(t)?Uint16Array:Float32Array,new n(e.data)}function Si(e){return typeof e==`number`?e:e?Gr(e):ui}function Ci(e){return typeof e==`number`?Kr(e):e||Float32Array}function wi(e,t){return{buffer:t.buffer,numValues:24,type:Si(t.type),arrayType:Ci(t.type)}}function Ti(e,t){let n=t.data||t,r=Ci(t.type),i=n*r.BYTES_PER_ELEMENT,a=e.createBuffer();return e.bindBuffer(ti,a),e.bufferData(ti,i,t.drawType||ei),{buffer:a,numValues:n,type:Gr(r),arrayType:r}}function Ei(e,t,n){let r=xi(t,n);return{arrayType:r.constructor,buffer:pi(e,r,void 0,t.drawType),type:Wr(r),numValues:0}}function Di(e,t){let n={};return Object.keys(t).forEach(function(r){if(!mi(r)){let i=t[r],a=i.attrib||i.name||i.attribName||di.attribPrefix+r;if(i.value){if(!Array.isArray(i.value)&&!qr(i.value))throw Error(`array.value is not array or typedarray`);n[a]={value:i.value}}else{let t;t=i.buffer&&i.buffer instanceof WebGLBuffer?wi:typeof i==`number`||typeof i.data==`number`?Ti:Ei;let{buffer:o,type:s,numValues:c,arrayType:l}=t(e,i,r),u=i.normalize===void 0?hi(l):i.normalize,d=bi(i,r,c);n[a]={buffer:o,numComponents:d,type:s,normalize:u,stride:i.stride||0,offset:i.offset||0,divisor:i.divisor===void 0?void 0:i.divisor,drawType:i.drawType}}}}),e.bindBuffer(ti,null),n}function Oi(e,t){return t===ii||t===ai?1:t===oi||t===si?2:t===ci||t===li||t===ui?4:0}var ki=[`position`,`positions`,`a_position`];function Ai(e,t){let n,r=0;for(;r<ki.length&&(n=ki[r],!(n in t||(n=di.attribPrefix+n,n in t)));++r);r===ki.length&&(n=Object.keys(t)[0]);let i=t[n];if(!i.buffer)return 1;e.bindBuffer(ti,i.buffer);let a=e.getBufferParameter(ti,ri);e.bindBuffer(ti,null);let o=a/Oi(e,i.type),s=i.numComponents||i.size,c=o/s;if(c%1!=0)throw Error(`numComponents ${s} not correct for length ${length}`);return c}function ji(e,t,n){let r=Di(e,t),i=Object.assign({},n||{});i.attribs=Object.assign({},n?n.attribs:{},r);let a=t.indices;if(a){let t=xi(a,`indices`);i.indices=pi(e,t,ni),i.numElements=t.length,i.elementType=Wr(t)}else i.numElements||=Ai(e,i.attribs);return i}function Mi(e){return!!e.texStorage2D}var Ni=function(){let e={},t={};function n(n){let r=n.constructor.name;if(!e[r]){for(let e in n)if(typeof n[e]==`number`){let r=t[n[e]];t[n[e]]=r?`${r} | ${e}`:e}e[r]=!0}}return function(e,r){return n(e),t[r]||(typeof r==`number`?`0x${r.toString(16)}`:r)}}();new Uint8Array([128,192,255,255]);var Pi=6406,Fi=6407,Ii=6408,Li=6409,Ri=6410,zi=6402,Bi=34041,Vi=33319,Hi=33320,Ui=6403,Wi=36244,Gi=36248,Ki=36249,qi={};{let e=qi;e[Pi]={numColorComponents:1},e[Li]={numColorComponents:1},e[Ri]={numColorComponents:2},e[Fi]={numColorComponents:3},e[Ii]={numColorComponents:4},e[Ui]={numColorComponents:1},e[Wi]={numColorComponents:1},e[Vi]={numColorComponents:2},e[Hi]={numColorComponents:2},e[Fi]={numColorComponents:3},e[Gi]={numColorComponents:3},e[Ii]={numColorComponents:4},e[Ki]={numColorComponents:4},e[zi]={numColorComponents:1},e[Bi]={numColorComponents:2}}var Ji=Jr;function Yi(e){return typeof document<`u`&&document.getElementById?document.getElementById(e):null}var Xi=33984,Zi=34962,Qi=34963,$i=35713,ea=35714,ta=35632,na=35633,ra=35981,ia=35718,aa=35721,oa=35971,sa=35382,ca=35396,la=35398,ua=35392,da=35395,fa=5126,pa=35664,ma=35665,ha=35666,ga=5124,_a=35667,va=35668,ya=35669,ba=35670,xa=35671,Sa=35672,Ca=35673,wa=35674,Ta=35675,Ea=35676,Da=35678,Oa=35680,ka=35679,Aa=35682,ja=35685,Ma=35686,Na=35687,Pa=35688,Fa=35689,Ia=35690,La=36289,Ra=36292,za=36293,Ba=5125,Va=36294,Ha=36295,Ua=36296,Wa=36298,Ga=36299,Ka=36300,qa=36303,Ja=36306,Ya=36307,Xa=36308,Za=36311,Qa=3553,$a=34067,eo=32879,to=35866,J={};function no(e,t){return J[t].bindPoint}function ro(e,t){return function(n){e.uniform1f(t,n)}}function io(e,t){return function(n){e.uniform1fv(t,n)}}function ao(e,t){return function(n){e.uniform2fv(t,n)}}function oo(e,t){return function(n){e.uniform3fv(t,n)}}function so(e,t){return function(n){e.uniform4fv(t,n)}}function co(e,t){return function(n){e.uniform1i(t,n)}}function lo(e,t){return function(n){e.uniform1iv(t,n)}}function uo(e,t){return function(n){e.uniform2iv(t,n)}}function fo(e,t){return function(n){e.uniform3iv(t,n)}}function po(e,t){return function(n){e.uniform4iv(t,n)}}function mo(e,t){return function(n){e.uniform1ui(t,n)}}function ho(e,t){return function(n){e.uniform1uiv(t,n)}}function go(e,t){return function(n){e.uniform2uiv(t,n)}}function _o(e,t){return function(n){e.uniform3uiv(t,n)}}function vo(e,t){return function(n){e.uniform4uiv(t,n)}}function yo(e,t){return function(n){e.uniformMatrix2fv(t,!1,n)}}function bo(e,t){return function(n){e.uniformMatrix3fv(t,!1,n)}}function xo(e,t){return function(n){e.uniformMatrix4fv(t,!1,n)}}function So(e,t){return function(n){e.uniformMatrix2x3fv(t,!1,n)}}function Co(e,t){return function(n){e.uniformMatrix3x2fv(t,!1,n)}}function wo(e,t){return function(n){e.uniformMatrix2x4fv(t,!1,n)}}function To(e,t){return function(n){e.uniformMatrix4x2fv(t,!1,n)}}function Eo(e,t){return function(n){e.uniformMatrix3x4fv(t,!1,n)}}function Do(e,t){return function(n){e.uniformMatrix4x3fv(t,!1,n)}}function Y(e,t,n,r){let i=no(e,t);return Mi(e)?function(t){let a,o;!t||$r(e,t)?(a=t,o=null):(a=t.texture,o=t.sampler),e.uniform1i(r,n),e.activeTexture(Xi+n),e.bindTexture(i,a),e.bindSampler(n,o)}:function(t){e.uniform1i(r,n),e.activeTexture(Xi+n),e.bindTexture(i,t)}}function X(e,t,n,r,i){let a=no(e,t),o=new Int32Array(i);for(let e=0;e<i;++e)o[e]=n+e;return Mi(e)?function(t){e.uniform1iv(r,o),t.forEach(function(t,r){e.activeTexture(Xi+o[r]);let i,s;!t||$r(e,t)?(i=t,s=null):(i=t.texture,s=t.sampler),e.bindSampler(n,s),e.bindTexture(a,i)})}:function(t){e.uniform1iv(r,o),t.forEach(function(t,n){e.activeTexture(Xi+o[n]),e.bindTexture(a,t)})}}J[fa]={Type:Float32Array,size:4,setter:ro,arraySetter:io},J[pa]={Type:Float32Array,size:8,setter:ao,cols:2},J[ma]={Type:Float32Array,size:12,setter:oo,cols:3},J[ha]={Type:Float32Array,size:16,setter:so,cols:4},J[ga]={Type:Int32Array,size:4,setter:co,arraySetter:lo},J[_a]={Type:Int32Array,size:8,setter:uo,cols:2},J[va]={Type:Int32Array,size:12,setter:fo,cols:3},J[ya]={Type:Int32Array,size:16,setter:po,cols:4},J[Ba]={Type:Uint32Array,size:4,setter:mo,arraySetter:ho},J[Va]={Type:Uint32Array,size:8,setter:go,cols:2},J[Ha]={Type:Uint32Array,size:12,setter:_o,cols:3},J[Ua]={Type:Uint32Array,size:16,setter:vo,cols:4},J[ba]={Type:Uint32Array,size:4,setter:co,arraySetter:lo},J[xa]={Type:Uint32Array,size:8,setter:uo,cols:2},J[Sa]={Type:Uint32Array,size:12,setter:fo,cols:3},J[Ca]={Type:Uint32Array,size:16,setter:po,cols:4},J[wa]={Type:Float32Array,size:32,setter:yo,rows:2,cols:2},J[Ta]={Type:Float32Array,size:48,setter:bo,rows:3,cols:3},J[Ea]={Type:Float32Array,size:64,setter:xo,rows:4,cols:4},J[ja]={Type:Float32Array,size:32,setter:So,rows:2,cols:3},J[Ma]={Type:Float32Array,size:32,setter:wo,rows:2,cols:4},J[Na]={Type:Float32Array,size:48,setter:Co,rows:3,cols:2},J[Pa]={Type:Float32Array,size:48,setter:Eo,rows:3,cols:4},J[Fa]={Type:Float32Array,size:64,setter:To,rows:4,cols:2},J[Ia]={Type:Float32Array,size:64,setter:Do,rows:4,cols:3},J[Da]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Qa},J[Oa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:$a},J[ka]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:eo},J[Aa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Qa},J[La]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:to},J[Ra]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:to},J[za]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:$a},J[Wa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Qa},J[Ga]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:eo},J[Ka]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:$a},J[qa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:to},J[Ja]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:Qa},J[Ya]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:eo},J[Xa]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:$a},J[Za]={Type:null,size:0,setter:Y,arraySetter:X,bindPoint:to};function Oo(e,t){return function(n){if(n.value)switch(e.disableVertexAttribArray(t),n.value.length){case 4:e.vertexAttrib4fv(t,n.value);break;case 3:e.vertexAttrib3fv(t,n.value);break;case 2:e.vertexAttrib2fv(t,n.value);break;case 1:e.vertexAttrib1fv(t,n.value);break;default:throw Error(`the length of a float constant value must be between 1 and 4!`)}else e.bindBuffer(Zi,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribPointer(t,n.numComponents||n.size,n.type||fa,n.normalize||!1,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function Z(e,t){return function(n){if(n.value){if(e.disableVertexAttribArray(t),n.value.length===4)e.vertexAttrib4iv(t,n.value);else throw Error(`The length of an integer constant value must be 4!`)}else e.bindBuffer(Zi,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,n.numComponents||n.size,n.type||ga,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function ko(e,t){return function(n){if(n.value){if(e.disableVertexAttribArray(t),n.value.length===4)e.vertexAttrib4uiv(t,n.value);else throw Error(`The length of an unsigned integer constant value must be 4!`)}else e.bindBuffer(Zi,n.buffer),e.enableVertexAttribArray(t),e.vertexAttribIPointer(t,n.numComponents||n.size,n.type||Ba,n.stride||0,n.offset||0),e.vertexAttribDivisor&&e.vertexAttribDivisor(t,n.divisor||0)}}function Ao(e,t,n){let r=n.size,i=n.count;return function(n){e.bindBuffer(Zi,n.buffer);let a=n.size||n.numComponents||r,o=a/i,s=n.type||fa,c=J[s].size*a,l=n.normalize||!1,u=n.offset||0,d=c/i;for(let r=0;r<i;++r)e.enableVertexAttribArray(t+r),e.vertexAttribPointer(t+r,o,s,l,c,u+d*r),e.vertexAttribDivisor&&e.vertexAttribDivisor(t+r,n.divisor||0)}}var Q={};Q[fa]={size:4,setter:Oo},Q[pa]={size:8,setter:Oo},Q[ma]={size:12,setter:Oo},Q[ha]={size:16,setter:Oo},Q[ga]={size:4,setter:Z},Q[_a]={size:8,setter:Z},Q[va]={size:12,setter:Z},Q[ya]={size:16,setter:Z},Q[Ba]={size:4,setter:ko},Q[Va]={size:8,setter:ko},Q[Ha]={size:12,setter:ko},Q[Ua]={size:16,setter:ko},Q[ba]={size:4,setter:Z},Q[xa]={size:8,setter:Z},Q[Sa]={size:12,setter:Z},Q[Ca]={size:16,setter:Z},Q[wa]={size:4,setter:Ao,count:2},Q[Ta]={size:9,setter:Ao,count:3},Q[Ea]={size:16,setter:Ao,count:4};var jo=/ERROR:\s*\d+:(\d+)/gi;function Mo(e,t=``,n=0){let r=[...t.matchAll(jo)],i=new Map(r.map((e,n)=>{let i=parseInt(e[1]),a=r[n+1],o=a?a.index:t.length,s=t.substring(e.index,o);return[i-1,s]}));return e.split(`
`).map((e,t)=>{let r=i.get(t);return`${t+1+n}: ${e}${r?`\n\n^^^ ${r}`:``}`}).join(`
`)}var No=/^[ \t]*\n/;function Po(e){let t=0;return No.test(e)&&(t=1,e=e.replace(No,``)),{lineOffset:t,shaderSource:e}}function Fo(e,t){return e.errorCallback(t),e.callback&&setTimeout(()=>{e.callback(`${t}\n${e.errors.join(`
`)}`)}),null}function Io(e,t,n,r){if(r||=Ji,!e.getShaderParameter(n,$i)){let i=e.getShaderInfoLog(n),{lineOffset:a,shaderSource:o}=Po(e.getShaderSource(n)),s=`${Mo(o,i,a)}\nError compiling ${Ni(e,t)}: ${i}`;return r(s),s}return``}function Lo(e,t,n){let r,i,a;if(typeof t==`function`&&(n=t,t=void 0),typeof e==`function`)n=e,e=void 0;else if(e&&!Array.isArray(e)){let t=e;n=t.errorCallback,e=t.attribLocations,r=t.transformFeedbackVaryings,i=t.transformFeedbackMode,a=t.callback}let o=n||Ji,s=[],c={errorCallback(e,...t){s.push(e),o(e,...t)},transformFeedbackVaryings:r,transformFeedbackMode:i,callback:a,errors:s};{let n={};Array.isArray(e)?e.forEach(function(e,r){n[e]=t?t[r]:r}):n=e||{},c.attribLocations=n}return c}var Ro=[`VERTEX_SHADER`,`FRAGMENT_SHADER`];function zo(e,t){if(t.indexOf(`frag`)>=0)return ta;if(t.indexOf(`vert`)>=0)return na}function Bo(e,t,n){let r=e.getAttachedShaders(t);for(let t of r)n.has(t)||e.deleteShader(t);e.deleteProgram(t)}var Vo=(e=0)=>new Promise(t=>setTimeout(t,e));function Ho(e,t,n){let r=e.createProgram(),{attribLocations:i,transformFeedbackVaryings:a,transformFeedbackMode:o}=Lo(n);for(let n=0;n<t.length;++n){let i=t[n];if(typeof i==`string`){let t=Yi(i),r=t?t.text:i,a=e[Ro[n]];t&&t.type&&(a=zo(e,t.type)||a),i=e.createShader(a),e.shaderSource(i,Po(r).shaderSource),e.compileShader(i)}e.attachShader(r,i)}Object.entries(i).forEach(([t,n])=>e.bindAttribLocation(r,n,t));{let t=a;t&&(t.attribs&&(t=t.attribs),Array.isArray(t)||(t=Object.keys(t)),e.transformFeedbackVaryings(r,t,o||ra))}return e.linkProgram(r),r}function Uo(e,t,n,r,i){let a=Lo(n,r,i),o=new Set(t),s=Ho(e,t,a);function c(e,t){let n=Go(e,t,a.errorCallback);return n&&Bo(e,t,o),n}if(a.callback){Wo(e,s).then(()=>{let t=c(e,s);a.callback(t,t?void 0:s)});return}return c(e,s)?void 0:s}async function Wo(e,t){let n=e.getExtension(`KHR_parallel_shader_compile`),r=n?(e,t)=>e.getProgramParameter(t,n.COMPLETION_STATUS_KHR):()=>!0,i=0;do await Vo(i),i=1e3/60;while(!r(e,t))}function Go(e,t,n){if(n||=Ji,!e.getProgramParameter(t,ea)){let r=e.getProgramInfoLog(t);return n(`Error in program linking: ${r}`),`${r}\n${e.getAttachedShaders(t).map(t=>Io(e,e.getShaderParameter(t,e.SHADER_TYPE),t,n)).filter(e=>e).join(`
`)}`}}function Ko(e,t,n,r,i){return Uo(e,t,n,r,i)}function qo(e){let t=e.name;return t.startsWith(`gl_`)||t.startsWith(`webgl_`)}var Jo=/(\.|\[|]|\w+)/g,Yo=e=>e>=`0`&&e<=`9`;function Xo(e,t,n,r){let i=e.split(Jo).filter(e=>e!==``),a=0,o=``;for(;;){let e=i[a++];o+=e;let s=Yo(e[0]),c=s?parseInt(e):e;if(s&&(o+=i[a++]),a===i.length){n[c]=t;break}{let e=i[a++],t=e===`[`,s=n[c]||(t?[]:{});n[c]=s,n=s,r[o]=r[o]||function(e){return function(t){es(e,t)}}(s),o+=e}}}function Zo(e,t){let n=0;function r(t,r,i){let a=r.name.endsWith(`[0]`),o=r.type,s=J[o];if(!s)throw Error(`unknown type: 0x${o.toString(16)}`);let c;if(s.bindPoint){let t=n;n+=r.size,c=a?s.arraySetter(e,o,t,i,r.size):s.setter(e,o,t,i,r.size)}else c=s.arraySetter&&a?s.arraySetter(e,i):s.setter(e,i);return c.location=i,c}let i={},a={},o=e.getProgramParameter(t,ia);for(let n=0;n<o;++n){let o=e.getActiveUniform(t,n);if(qo(o))continue;let s=o.name;s.endsWith(`[0]`)&&(s=s.substr(0,s.length-3));let c=e.getUniformLocation(t,o.name);if(c){let e=r(t,o,c);i[s]=e,Xo(s,e,a,i)}}return i}function Qo(e,t){let n={},r=e.getProgramParameter(t,oa);for(let i=0;i<r;++i){let r=e.getTransformFeedbackVarying(t,i);n[r.name]={index:i,type:r.type,size:r.size}}return n}function $o(e,t){let n=e.getProgramParameter(t,ia),r=[],i=[];for(let a=0;a<n;++a){i.push(a),r.push({});let n=e.getActiveUniform(t,a);r[a].name=n.name}[[`UNIFORM_TYPE`,`type`],[`UNIFORM_SIZE`,`size`],[`UNIFORM_BLOCK_INDEX`,`blockNdx`],[`UNIFORM_OFFSET`,`offset`]].forEach(function(n){let a=n[0],o=n[1];e.getActiveUniforms(t,i,e[a]).forEach(function(e,t){r[t][o]=e})});let a={},o=e.getProgramParameter(t,sa);for(let n=0;n<o;++n){let r=e.getActiveUniformBlockName(t,n),i={index:e.getUniformBlockIndex(t,r),usedByVertexShader:e.getActiveUniformBlockParameter(t,n,ca),usedByFragmentShader:e.getActiveUniformBlockParameter(t,n,la),size:e.getActiveUniformBlockParameter(t,n,ua),uniformIndices:e.getActiveUniformBlockParameter(t,n,da)};i.used=i.usedByVertexShader||i.usedByFragmentShader,a[r]=i}return{blockSpecs:a,uniformData:r}}function es(e,t){for(let n in t){let r=e[n];typeof r==`function`?r(t[n]):es(e[n],t[n])}}function ts(e,...t){let n=e.uniformSetters||e,r=t.length;for(let e=0;e<r;++e){let r=t[e];if(Array.isArray(r)){let e=r.length;for(let t=0;t<e;++t)ts(n,r[t])}else for(let e in r){let t=n[e];t&&t(r[e])}}}function ns(e,t){let n={},r=e.getProgramParameter(t,aa);for(let i=0;i<r;++i){let r=e.getActiveAttrib(t,i);if(qo(r))continue;let a=e.getAttribLocation(t,r.name),o=Q[r.type],s=o.setter(e,a,o);s.location=a,n[r.name]=s}return n}function rs(e,t){for(let n in t){let r=e[n];r&&r(t[n])}}function is(e,t,n){n.vertexArrayObject?e.bindVertexArray(n.vertexArrayObject):(rs(t.attribSetters||t,n.attribs),n.indices&&e.bindBuffer(Qi,n.indices))}function as(e,t){let n=Zo(e,t),r=ns(e,t),i={program:t,uniformSetters:n,attribSetters:r,uniformLocations:Object.fromEntries(Object.entries(n).map(([e,t])=>[e,t.location])),attribLocations:Object.fromEntries(Object.entries(r).map(([e,t])=>[e,t.location]))};return Mi(e)&&(i.uniformBlockSpec=$o(e,t),i.transformFeedbackInfo=Qo(e,t)),i}var os=/\s|{|}|;/;function ss(e,t,n,r,i){let a=Lo(n,r,i),o=[];if(t=t.map(function(e){if(!os.test(e)){let t=Yi(e);if(t)e=t.text;else{let t=`no element with id: ${e}`;a.errorCallback(t),o.push(t)}}return e}),o.length)return Fo(a,``);let s=a.callback;s&&(a.callback=(t,n)=>{s(t,t?void 0:as(e,n))});let c=Ko(e,t,a);return c?as(e,c):null}var cs=4,ls=5123;function us(e,t,n,r,i,a){n=n===void 0?cs:n;let o=t.indices,s=t.elementType,c=r===void 0?t.numElements:r;i=i===void 0?0:i,s||o?a===void 0?e.drawElements(n,c,s===void 0?ls:t.elementType,i):e.drawElementsInstanced(n,c,s===void 0?ls:t.elementType,i,a):a===void 0?e.drawArrays(n,i,c):e.drawArraysInstanced(n,i,c,a)}var ds=6402,fs=33190,ps=36012,ms=35056,hs=36013,gs=32854,_s=32855,vs=36194,ys=33189,bs=6401,xs=36168,Ss=34041,Cs=36096,ws=36128,Ts=33306,$={};$[Ss]=Ts,$[bs]=ws,$[xs]=ws,$[ds]=Cs,$[ys]=Cs,$[fs]=Cs,$[ps]=Cs,$[ms]=Ts,$[hs]=Ts;var Es={};Es[gs]=!0,Es[_s]=!0,Es[vs]=!0,Es[Ss]=!0,Es[ys]=!0,Es[bs]=!0,Es[xs]=!0;var Ds={addExtensionsToContext:!0},Os=/^(.*?)_/;function ks(e,t){Ni(e,0);let n=e.getExtension(t);if(n){let r={},i=Os.exec(t)[1],a=`_`+i;for(let t in n){let o=n[t],s=typeof o==`function`,c=s?i:a,l=t;t.endsWith(c)&&(l=t.substring(0,t.length-c.length)),e[l]===void 0?s?e[l]=function(e){return function(){return e.apply(n,arguments)}}(o):(e[l]=o,r[l]=o):!s&&e[l]!==o&&Yr(l,e[l],o,t)}r.constructor={name:n.constructor.name},Ni(r,0)}return n}var As=`ANGLE_instanced_arrays.EXT_blend_minmax.EXT_color_buffer_float.EXT_color_buffer_half_float.EXT_disjoint_timer_query.EXT_disjoint_timer_query_webgl2.EXT_frag_depth.EXT_sRGB.EXT_shader_texture_lod.EXT_texture_compression_bptc.EXT_texture_compression_rgtc.EXT_texture_filter_anisotropic.OES_element_index_uint.OES_standard_derivatives.OES_texture_float.OES_texture_float_linear.OES_texture_half_float.OES_texture_half_float_linear.OES_vertex_array_object.WEBGL_color_buffer_float.WEBGL_compressed_texture_atc.WEBGL_compressed_texture_etc1.WEBGL_compressed_texture_etc.WEBGL_compressed_texture_pvrtc.WEBGL_compressed_texture_s3tc.WEBGL_compressed_texture_s3tc_srgb.WEBGL_depth_texture.WEBGL_draw_buffers`.split(`.`);function js(e){for(let t=0;t<As.length;++t)ks(e,As[t])}function Ms(e,t){let n=[`webgl2`,`webgl`,`experimental-webgl`],r=null;for(let i=0;i<n.length;++i)if(r=e.getContext(n[i],t),r){Ds.addExtensionsToContext&&js(r);break}return r}function Ns(e,t){return Ms(e,t)}function Ps(e,t){t||=1,t=Math.max(0,t);let n=e.clientWidth*t|0,r=e.clientHeight*t|0;return e.width!==n||e.height!==r?(e.width=n,e.height=r,!0):!1}var Fs=150,Is=`
attribute float a_index;
uniform vec2 u_resolution;
uniform float u_time;
varying float v_color_type;
varying float v_intensity_base;

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  float seed = a_index * 123.456;
  
  float speed_rand = hash2(vec2(seed, 1.1));
  float size_rand = hash2(vec2(seed, 2.2));
  float y_rand = hash2(vec2(seed, 3.3));
  float x_rand = hash2(vec2(seed, 4.4));
  float blink_rand = hash2(vec2(seed, 5.5));
  float color_type_rand = hash2(vec2(seed, 6.6));

  float aspect = u_resolution.x / u_resolution.y;
  float speed = 0.008 + speed_rand * 0.024;
  float size = 0.0006 + 0.0032 * pow(size_rand, 3.8);
  
  float y = -0.45 + y_rand * 0.9;
  
  float margin = 0.05;
  float width = aspect + margin * 2.0;
  float x = fract(x_rand + u_time * speed);
  x = x * width - (aspect * 0.5 + margin);
  
  float wave = sin(u_time * 0.3 + y_rand * 6.283) * 0.005;
  
  float ndc_x = x / (aspect * 0.5);
  float ndc_y = (y + wave) / 0.5;
  
  gl_Position = vec4(ndc_x, ndc_y, 0.0, 1.0);
  
  // Point size in pixels. 
  float pointSize = size * u_resolution.y * 3.5;
  gl_PointSize = max(2.0, pointSize);
  
  float blink = 0.3 + 0.7 * sin(u_time * (1.0 + blink_rand * 2.5) + x_rand * 6.283);
  v_intensity_base = blink;
  v_color_type = color_type_rand;
}
`,Ls=`
precision mediump float;
uniform vec3 u_particle_color;
uniform vec3 u_particle_accent_color;

varying float v_color_type;
varying float v_intensity_base;

void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float dist = length(pc);
  
  float alpha = smoothstep(0.5, 0.1, dist) * v_intensity_base;
  if (alpha < 0.01) discard;
  
  vec3 baseColor = v_color_type > 0.90 ? u_particle_accent_color : u_particle_color;
  
  // Pre-multiplied alpha blending
  gl_FragColor = vec4(baseColor * alpha, alpha);
}
`,Rs=({theme:e,isDaylight:r,paused:i=!1})=>{let a=(0,j.useRef)(null),o=(0,j.useRef)(null),s=(0,j.useRef)(0),c=(0,j.useRef)(null),u=l(e.primaryColor)||(r?{r:0,g:0,b:0}:{r:255,g:255,b:255}),d=[u.r/255,u.g/255,u.b/255],f=l(e.accentColor)||u,p=[f.r/255,f.g/255,f.b/255],m=r?[1,1,1]:[0,0,0],h=(0,j.useRef)(i),g=(0,j.useRef)(d),_=(0,j.useRef)(p),v=(0,j.useRef)(m);return h.current=i,g.current=d,_.current=p,v.current=m,(0,j.useEffect)(()=>{let e=a.current;if(!e)return;let r=Ns(e,{alpha:!1,depth:!1,antialias:!1});if(!r)return;let i=ss(r,[Is,Ls],e=>{console.error(`SoraBackground twgl program error:`,e)});if(!i)return;let l=new Float32Array(Fs);for(let e=0;e<Fs;e++)l[e]=e;let u=ji(r,{a_index:{numComponents:1,data:l}}),d=null,f=()=>{o.current===null&&(o.current=n(p))},p=t=>{if(o.current=null,!h.current&&d!==null){let e=(t-d)/1e3;s.current+=e}d=h.current?null:t,Ps(e),r.viewport(0,0,r.canvas.width,r.canvas.height);let n=v.current;r.clearColor(n[0],n[1],n[2],1),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE_MINUS_SRC_ALPHA);let a={u_resolution:[r.canvas.width,r.canvas.height],u_time:s.current,u_particle_color:g.current,u_particle_accent_color:_.current};r.useProgram(i.program),is(r,i,u),ts(i,a),us(r,u,r.POINTS),h.current||f()},m=new ResizeObserver(f);return m.observe(e),c.current=f,f(),()=>{c.current=null,m.disconnect(),o.current!==null&&(t(o.current),o.current=null),r.deleteProgram(i.program),u.attribs&&u.attribs.a_index&&u.attribs.a_index.buffer&&r.deleteBuffer(u.attribs.a_index.buffer)}},[]),(0,j.useEffect)(()=>{c.current?.()},[i,r,e.primaryColor,e.accentColor]),(0,M.jsx)(`canvas`,{ref:a,className:`absolute inset-0 w-full h-full block pointer-events-none`,style:{width:`100%`,height:`100%`,willChange:`transform`,transform:`translateZ(0)`}})},zs=({t:e,isDaylight:t,theme:n,controlCardBg:r,tuning:i,onTuningChange:a})=>{let o=k(n.secondaryColor,t?.18:.16);return(0,M.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-5`,style:{backgroundColor:r,borderColor:o},"data-settings-style":`{"radius":24,"border":true,"gap":20,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`div`,{className:`space-y-1`,"data-settings-style":`{"gap":4}`,"data-settings-layout":`column`,children:(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:e(`options.soraBackgroundSettings`)})}),(0,M.jsx)(N,{label:e(`options.soraBlank`),description:e(`options.soraBlankDesc`),checked:i.blank,onChange:e=>a?.({blank:e}),theme:n})]})},Bs=i({default:()=>Vs}),Vs=Ye({mode:`sora`,order:50,labelKey:`options.visualizerBackgroundModeSora`,labelFallback:`Sora`,render:({config:e,theme:t,isDaylight:n,paused:r,staticMode:i})=>(0,M.jsx)(`div`,{className:`absolute inset-0 z-0`,style:{backgroundColor:n?`#ffffff`:`#000000`},children:!e?.sora?.tuning?.blank&&(0,M.jsx)(Rs,{theme:t,isDaylight:n,paused:r||i})}),renderSettingsPanel:({config:e,actions:t,t:n,isDaylight:r,theme:i,controlCardBg:a})=>(0,M.jsx)(zs,{t:n,isDaylight:r,theme:i,controlCardBg:a,tuning:e?.sora?.tuning??De,onTuningChange:t?.sora?.onTuningChange}),renderQuickControls:({config:e,actions:t,t:n,theme:r})=>{let i=e?.sora?.tuning??De;return(0,M.jsx)(Ze,{active:i.blank,theme:r,label:n(`options.soraBlank`),onToggle:()=>t?.sora?.onTuningChange?.({blank:!i.blank}),children:(0,M.jsx)(ge,{size:14})})},resetSettings:e=>e?.sora?.onResetTuning?.()}),Hs=({urlBackgroundList:e=[],urlBackgroundSelectedId:t=null})=>{let n=(0,j.useMemo)(()=>p(e.find(e=>e.id===t)),[e,t]),r=(0,j.useRef)(null),[i,a]=(0,j.useState)(!1);return(0,j.useEffect)(()=>{a(!1);let e=r.current;if(!e)return;let t=e.getBoundingClientRect();if(t.width>0&&t.height>0){a(!0);return}let n=new ResizeObserver(e=>{for(let t of e){let{width:e,height:r}=t.contentRect;e>0&&r>0&&(a(!0),n.disconnect())}});return n.observe(e),()=>{n.disconnect()}},[n]),n?.url?(0,M.jsxs)(`div`,{ref:r,className:`absolute inset-0 z-0 overflow-hidden`,children:[i&&(0,M.jsx)(`iframe`,{src:n.url,title:n.note||n.url,className:`w-full h-full border-0`,style:{pointerEvents:`none`},sandbox:`allow-scripts`,allowFullScreen:!0},n.url),(0,M.jsx)(`div`,{className:`absolute inset-0`,style:{background:`linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))`,pointerEvents:`none`}})]}):null},Us=()=>`url-bg-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,Ws=({t:e,isDaylight:t,theme:n,controlCardBg:r,urlBackgroundList:i=[],urlBackgroundSelectedId:a=null,onAddUrlBackgroundItem:o,onUpdateUrlBackgroundItem:s,onDeleteUrlBackgroundItem:c,onSetUrlBackgroundSelectedId:l})=>{let[u,d]=(0,j.useState)(!1),[p,m]=(0,j.useState)(null),[h,g]=(0,j.useState)(``),[_,v]=(0,j.useState)(``),y=(0,j.useCallback)(()=>{g(``),v(``),d(!1),m(null)},[]),b=(0,j.useCallback)(()=>{let e=f(h);if(!e)return;let t={id:Us(),url:e,note:_.trim()||e};o?.(t),l?.(t.id),y()},[h,_,o,l,y]),x=(0,j.useCallback)(e=>{m(e.id),g(e.url),v(e.note)},[]),S=(0,j.useCallback)(()=>{if(!p)return;let e=f(h);e&&(s?.(p,{url:e,note:_.trim()||e}),y())},[p,h,_,s,y]),C=(0,j.useCallback)(e=>{c?.(e)},[c]),w=(0,j.useCallback)(e=>{l?.(e)},[l]),T=k(n.secondaryColor,t?.18:.16),E=k(n.backgroundColor,t?.24:.34),D=k(n.backgroundColor,t?.42:.52);return(0,M.jsxs)(`div`,{className:`rounded-[24px] border p-4 space-y-4`,style:{backgroundColor:r,borderColor:T},"data-settings-style":`{"radius":24,"border":true,"gap":16,"padding":[16,16,16,16]}`,"data-settings-layout":`card`,children:[(0,M.jsxs)(`div`,{className:`space-y-1`,"data-settings-style":`{"gap":4}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:e(`options.urlBackgroundSettings`)}),(0,M.jsx)(`div`,{className:`text-xs opacity-70`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:e(`options.urlBackgroundSettingsDesc`)})]}),i.length>0&&(0,M.jsx)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:i.map(r=>(0,M.jsx)(`div`,{className:`rounded-2xl border p-3 transition-all`,style:{borderColor:r.id===a?n.accentColor:T,backgroundColor:r.id===a?k(n.accentColor,t?.1:.16):E},"data-settings-style":`{"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:p===r.id?(0,M.jsxs)(`div`,{className:`space-y-2`,"data-settings-style":`{"gap":8}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`input`,{type:`url`,value:h,onChange:e=>g(e.target.value),placeholder:`https://example.com`,className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:T,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`column`}),(0,M.jsx)(`input`,{type:`text`,value:_,onChange:e=>v(e.target.value),placeholder:e(`options.urlBackgroundNotePlaceholder`),className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:T,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`column`}),(0,M.jsxs)(`div`,{className:`flex gap-2 justify-end`,"data-settings-style":`{"align":"end","gap":8}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`button`,{type:`button`,onClick:y,className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:T,color:n.secondaryColor},"data-settings-style":`{"align":"center","center":true,"height":32,"width":32,"radius":64,"border":true}`,"data-settings-layout":`row`,children:(0,M.jsx)(Te,{size:14})}),(0,M.jsx)(`button`,{type:`button`,onClick:S,disabled:!h.trim(),className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-40`,style:{borderColor:n.accentColor,color:n.accentColor},"data-settings-style":`{"align":"center","center":true,"height":32,"width":32,"radius":64,"border":true}`,"data-settings-layout":`row`,children:(0,M.jsx)(_e,{size:14})})]})]}):(0,M.jsxs)(`div`,{className:`flex items-center gap-3`,"data-settings-style":`{"align":"center","gap":12}`,"data-settings-layout":`row`,children:[(0,M.jsxs)(`button`,{type:`button`,"aria-pressed":r.id===a,onClick:()=>w(r.id),className:`flex-1 text-left min-w-0`,"data-settings-style":`{"grow":true}`,"data-settings-layout":`column`,children:[(0,M.jsx)(`div`,{className:`text-sm font-medium truncate`,style:{color:n.primaryColor},"data-settings-style":`{"font":14,"weight":500}`,"data-settings-layout":`column`,children:r.note}),(0,M.jsx)(`div`,{className:`text-xs opacity-60 truncate mt-0.5`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12,"tone":"muted","margin":[0,2,0,0]}`,"data-settings-layout":`column`,children:r.url})]}),(0,M.jsxs)(`div`,{className:`flex items-center gap-1 shrink-0`,"data-settings-style":`{"align":"center","gap":4}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`button`,{type:`button`,onClick:()=>x(r),className:`h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:T,color:n.secondaryColor},"data-settings-style":`{"align":"center","center":true,"height":28,"width":28,"radius":64,"border":true}`,"data-settings-layout":`row`,children:(0,M.jsx)(Ee,{size:12})}),(0,M.jsx)(`button`,{type:`button`,onClick:()=>C(r.id),className:`h-7 w-7 rounded-full border flex items-center justify-center transition-colors hover:bg-red-500/10`,style:{borderColor:T,color:n.secondaryColor},"data-settings-style":`{"align":"center","center":true,"height":28,"width":28,"radius":64,"border":true}`,"data-settings-layout":`row`,children:(0,M.jsx)(ye,{size:12})})]})]})},r.id))}),u?(0,M.jsxs)(`div`,{className:`space-y-2 rounded-2xl border p-3`,style:{borderColor:T,backgroundColor:E},"data-settings-style":`{"gap":8,"radius":16,"border":true,"padding":[12,12,12,12]}`,"data-settings-layout":`card`,children:[(0,M.jsx)(`input`,{type:`url`,value:h,onChange:e=>g(e.target.value),placeholder:`https://example.com`,autoFocus:!0,className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:T,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`column`}),(0,M.jsx)(`input`,{type:`text`,value:_,onChange:e=>v(e.target.value),placeholder:e(`options.urlBackgroundNotePlaceholder`),className:`w-full rounded-xl border px-3 py-2 text-sm outline-none`,style:{backgroundColor:D,borderColor:T,color:n.primaryColor},"data-settings-style":`{"radius":12,"border":true,"font":14,"padding":[12,8,12,8]}`,"data-settings-layout":`column`}),(0,M.jsxs)(`div`,{className:`flex gap-2 justify-end`,"data-settings-style":`{"align":"end","gap":8}`,"data-settings-layout":`row`,children:[(0,M.jsx)(`button`,{type:`button`,onClick:y,className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10`,style:{borderColor:T,color:n.secondaryColor},"data-settings-style":`{"align":"center","center":true,"height":32,"width":32,"radius":64,"border":true}`,"data-settings-layout":`row`,children:(0,M.jsx)(Te,{size:14})}),(0,M.jsx)(`button`,{type:`button`,onClick:b,disabled:!h.trim(),className:`h-8 w-8 rounded-full border flex items-center justify-center transition-colors hover:bg-white/10 disabled:opacity-40`,style:{borderColor:n.accentColor,color:n.accentColor},"data-settings-style":`{"align":"center","center":true,"height":32,"width":32,"radius":64,"border":true}`,"data-settings-layout":`row`,children:(0,M.jsx)(_e,{size:14})})]})]}):(0,M.jsxs)(`button`,{type:`button`,onClick:()=>{g(``),v(``),d(!0)},className:`flex h-10 w-full items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-medium transition-colors hover:bg-white/5`,style:{borderColor:T,color:n.primaryColor},"data-settings-style":`{"align":"center","center":true,"height":40,"gap":8,"radius":16,"border":true,"font":14,"weight":500,"padding":[16,0,16,0]}`,"data-settings-layout":`row`,children:[(0,M.jsx)(Ce,{size:16}),e(`options.urlBackgroundAdd`)]}),i.length===0&&!u&&(0,M.jsxs)(`div`,{className:`flex flex-col items-center gap-2 py-3 opacity-50`,"data-settings-style":`{"align":"center","gap":8,"tone":"muted","padding":[0,12,0,12]}`,"data-settings-layout":`column`,children:[(0,M.jsx)(xe,{size:24,style:{color:n.secondaryColor}}),(0,M.jsx)(`div`,{className:`text-xs`,style:{color:n.secondaryColor},"data-settings-style":`{"font":12}`,"data-settings-layout":`column`,children:e(`options.urlBackgroundEmpty`)})]})]})},Gs=i({default:()=>Ks}),Ks=Ye({mode:`url`,order:40,labelKey:`options.visualizerBackgroundModeUrl`,labelFallback:`Embed`,render:({config:e})=>(0,M.jsx)(Hs,{urlBackgroundList:e?.url?.items,urlBackgroundSelectedId:e?.url?.selectedId}),renderSettingsPanel:({config:e,actions:t,...n})=>(0,M.jsx)(Ws,{...n,urlBackgroundList:e?.url?.items,urlBackgroundSelectedId:e?.url?.selectedId,onAddUrlBackgroundItem:t?.url?.onAdd,onUpdateUrlBackgroundItem:t?.url?.onUpdate,onDeleteUrlBackgroundItem:t?.url?.onDelete,onSetUrlBackgroundSelectedId:t?.url?.onSelect})}),{entries:qs,byMode:Js}=(e=>{let t=Object.entries(e).map(([e,t])=>{if(!t.default)throw Error(`[VisualizerBackgroundRegistry] Missing default export in ${e}`);return t.default}),n={};return t.forEach(e=>{if(n[e.mode])throw Error(`[VisualizerBackgroundRegistry] Duplicate background mode "${e.mode}"`);n[e.mode]=e}),{entries:[...t].sort((e,t)=>e.order-t.order),byMode:n}})(Object.assign({"./common/entry.tsx":mt,"./latent/entry.tsx":$t,"./monet/entry.tsx":Zn,"./nomand/entry.tsx":Tr,"./sora/entry.tsx":Bs,"./url/entry.tsx":Gs}));m(`VisualizerBackgroundRegistry`,qs.map(e=>e.mode),c);var Ys=e=>typeof e==`string`&&!!Js[e],Xs=e=>Js[e]??Js.latent,Zs=(e,t)=>{let n=Xs(e),r=t(n.labelKey);return!r||r===n.labelKey?n.labelFallback:r},Qs=e=>!Js[e.mode]&&(Js[e.mode]=e,qs.push(e),qs.sort((e,t)=>e.order-t.order),!0),$s=e=>{if(!Js[e])return!1;delete Js[e];let t=qs.findIndex(t=>t.mode===e);return t>=0&&qs.splice(t,1),!0};export{Ys as a,Je as c,Xs as i,We as l,Qs as n,$s as o,Zs as r,at as s,qs as t};