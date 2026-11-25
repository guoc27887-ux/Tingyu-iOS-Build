import{c as e}from"./sonnetMotion-MCBrbW9P.js";import{t}from"./pixiFilterVertex-BtSTEYGP.js";function n(e,t,n,r,i,a=0){if(i||!r.postProcessEnabled&&a<=0)return e;let o=r.postProcessEnabled?2+n*.012*r.postProcessLensDispersion+3*r.postProcessRgbShift:1,s={left:e.left+o+a,top:e.top+o,width:Math.max(4,e.width-2*(o+a)),height:Math.max(4,e.height-2*o)};if(!r.postProcessEnabled)return s;let c=t/n,l=r.postProcessLensDistortion*.32,u=(e,t)=>{let n=(e-.5)*c,r=t-.5,i=n*n+r*r,a=1-l*i+l*.16*i*i;return{x:(e-.5)*a+.5,y:r*a+.5}},d=0,f=1,p=0,m=1,h=s.left/t,g=(s.left+s.width)/t,_=s.top/n,v=(s.top+s.height)/n;for(let e=0;e<=48;e++)for(let t=0;t<=48;t++){let n=e/48,r=t/48;d=Math.max(d,u(n*h,r).x),f=Math.min(f,u(g+n*(1-g),r).x),p=Math.max(p,u(n,r*_).y),m=Math.min(m,u(n,v+r*(1-v)).y)}let y=1+n*.012*r.postProcessLensDispersion;return{left:d*t+y,top:p*n+y,width:Math.max(4,(f-d)*t-2*y),height:Math.max(4,(m-p)*n-2*y)}}var r=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform highp vec4 uInputSize;
uniform vec4 uInputClamp;
uniform highp vec4 uOutputFrame;
uniform float uDistortion;
uniform float uDispersion;

vec2 screenToTextureUv(vec2 screenUv) {
    return screenUv * uOutputFrame.zw * uInputSize.zw;
}

vec4 sampleInside(vec2 uv) {
    if (uv.x < uInputClamp.x || uv.y < uInputClamp.y
        || uv.x > uInputClamp.z || uv.y > uInputClamp.w) {
        return vec4(0.0);
    }
    return texture(uTexture, uv);
}

void main(void) {
    vec2 screenUv = vTextureCoord * uInputSize.xy / max(uOutputFrame.zw, vec2(1.0));
    vec2 centered = screenUv - 0.5;
    float aspect = uOutputFrame.z / max(uOutputFrame.w, 1.0);
    centered.x *= aspect;

    float radiusSquared = dot(centered, centered);
    // Keep the low end subtle but leave enough headroom for the broad barrel warp in the
    // reference look; the UI/store expose this as a 0..2 amount.
    float curvature = uDistortion * 0.32;
    float radialScale = 1.0 - curvature * radiusSquared
        + curvature * 0.16 * radiusSquared * radiusSquared;
    vec2 lensCentered = centered * radialScale;
    lensCentered.x /= aspect;
    vec2 lensUv = lensCentered + 0.5;

    float radius = sqrt(radiusSquared);
    vec2 radialDirection = radius > 0.0001 ? centered / radius : vec2(0.0);
    float edgeWeight = smoothstep(0.12, 0.9, radius);
    vec2 dispersion = radialDirection * uDispersion * 0.012 * edgeWeight;
    dispersion.x /= aspect;

    vec4 center = sampleInside(screenToTextureUv(lensUv));
    vec4 redSample = sampleInside(screenToTextureUv(lensUv + dispersion));
    vec4 blueSample = sampleInside(screenToTextureUv(lensUv - dispersion));
    float alpha = max(center.a, max(redSample.a, blueSample.a));
    float coreWeight = 0.84 - clamp(uDispersion, 0.0, 1.0) * 0.18;
    vec3 core = center.rgb * coreWeight;
    vec3 separated = vec3(redSample.r, center.g, blueSample.b);
    // Keep a neutral core for thin MG strokes, then add the displaced channels as colored
    // fringes. Without this fallback, a one-pixel line can sample transparent red/blue texels
    // and become an unintended green-only stroke.
    vec3 color = max(core, separated);

    // Pixi render textures are premultiplied; the max channel values remain premultiplied.
    finalColor = vec4(color, alpha);
}
`,i=(e,n)=>{let i=new e.UniformGroup({uDistortion:{value:n.distortion,type:`f32`},uDispersion:{value:n.dispersion,type:`f32`}});return new e.Filter({glProgram:e.GlProgram.from({vertex:t,fragment:r,name:`sonnet-lens-distortion`}),resources:{lensUniforms:i},antialias:`on`})},a=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform highp vec4 uInputSize;
uniform vec4 uInputClamp;
uniform float uAmount;

vec4 sampleInside(vec2 uv) {
    if (uv.x < uInputClamp.x || uv.y < uInputClamp.y
        || uv.x > uInputClamp.z || uv.y > uInputClamp.w) {
        return vec4(0.0);
    }
    return texture(uTexture, uv);
}

void main(void) {
    vec2 offset = vec2(0.9063, 0.4226) * uAmount * 3.0 * uInputSize.zw;
    vec4 redSample = sampleInside(vTextureCoord + offset);
    vec4 center = sampleInside(vTextureCoord);
    vec4 blueSample = sampleInside(vTextureCoord - offset);
    float alpha = max(center.a, max(redSample.a, blueSample.a));
    float coreWeight = 0.84 - clamp(uAmount, 0.0, 1.0) * 0.18;
    vec3 core = center.rgb * coreWeight;
    vec3 separated = vec3(redSample.r, center.g, blueSample.b);
    // Preserve a neutral core for thin strokes so transparent red/blue offset samples cannot
    // collapse a white MG line into an unintended green-only result.
    finalColor = vec4(max(core, separated), alpha);
}
`,o=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uAmount;

float dotScreen(vec2 fragCoord, float angle, float value, float cellSize) {
    float c = cos(angle);
    float s = sin(angle);
    vec2 rotated = mat2(c, s, -s, c) * fragCoord;
    float dist = length(fract(rotated / cellSize) - 0.5) * cellSize;
    float radius = sqrt(clamp(value, 0.0, 1.0)) * cellSize * 0.62;
    return 1.0 - smoothstep(radius - 1.2, radius + 1.2, dist);
}

void main(void) {
    vec4 color = texture(uTexture, vTextureCoord);
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }
    float cellSize = 5.0;
    vec3 screened = vec3(
        dotScreen(gl_FragCoord.xy, radians(15.0), color.r, cellSize),
        dotScreen(gl_FragCoord.xy, radians(75.0), color.g, cellSize),
        dotScreen(gl_FragCoord.xy, radians(0.0), color.b, cellSize)
    );
    color.rgb = mix(color.rgb, screened, uAmount);
    color.rgb *= color.a;
    finalColor = color;
}
`,s=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform highp vec4 uInputSize;
uniform highp vec4 uOutputFrame;
uniform float uAmount;

void main(void) {
    vec4 color = texture(uTexture, vTextureCoord);
    // The filtered container uses a viewport-sized filterArea, so this recovers stable
    // 0..1 viewport coordinates instead of coordinates derived from lyric bounds.
    vec2 screenUv = vTextureCoord * uInputSize.xy / uOutputFrame.zw;
    vec2 centered = screenUv - 0.5;
    centered.x *= uOutputFrame.z / uOutputFrame.w;
    float vignette = clamp(smoothstep(0.52, 1.08, length(centered)) * uAmount * 0.6, 0.0, 1.0);
    finalColor = mix(color, vec4(0.0, 0.0, 0.0, 1.0), vignette);
}
`,c=(e,n,r,i)=>new e.Filter({glProgram:e.GlProgram.from({vertex:t,fragment:r,name:n}),resources:{printUniforms:new e.UniformGroup({uAmount:{value:i,type:`f32`}})},antialias:`on`}),l=(e,t)=>{let n=[];return t.rgbShift>0&&n.push(c(e,`sonnet-print-rgb-shift`,a,t.rgbShift)),t.halftone>0&&n.push(c(e,`sonnet-print-halftone`,o,t.halftone)),t.vignette>0&&n.push(c(e,`sonnet-print-vignette`,s,t.vignette)),n},u={rgbShift:0,halftone:0,vignette:0},d=(t,n,r)=>{if(r)return{glowStrength:0,glowAlpha:0,noise:0,contrast:0,glitchIntensity:0,lensDistortion:0,lensDispersion:0,printEffects:u};let i=n.typographyMotion*e(t),a=n.postProcessEnabled;return{glowStrength:2.8+i*1.8,glowAlpha:Math.min(.62,.28+i*.12),noise:a?n.postProcessGrain*.35:0,contrast:a?n.postProcessContrast*.5:0,glitchIntensity:1,lensDistortion:a?n.postProcessLensDistortion:0,lensDispersion:a?n.postProcessLensDispersion:0,printEffects:a?{rgbShift:n.postProcessRgbShift,halftone:n.postProcessHalftone,vignette:n.postProcessVignette}:u}},f=(e,t)=>{let n=new e.Container,r=[];if(t.glowStrength>0){let i=new e.BlurFilter({strength:t.glowStrength,quality:2,kernelSize:5,resolution:.75});n.filters=[i],n.alpha=t.glowAlpha,n.blendMode=`screen`,r.push(i)}return{layer:n,filters:r}},p=(e,t,n)=>{let r=[];if((t.lensDistortion>0||t.lensDispersion>0)&&r.push(i(e,{distortion:t.lensDistortion,dispersion:t.lensDispersion})),t.noise>0){let i=new e.NoiseFilter({noise:t.noise,seed:n%1e4/1e4,antialias:`on`});r.push(i)}if(t.contrast>0){let n=new e.ColorMatrixFilter;n.contrast(t.contrast,!1),n.antialias=`on`,r.push(n)}let a=l(e,t.printEffects);return a.length>0&&r.push(...a),r},m=(e,t,n,r)=>{let i=p(e,n,r);return i.length>0&&(t.filters=i),i};export{n as a,d as i,f as n,p as r,m as t};