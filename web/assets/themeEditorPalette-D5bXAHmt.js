import{t as e}from"./react-BbOHeKyE.js";var t=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,n={light:{name:`AI Light`,backgroundColor:`#ffffff`,primaryColor:`#111827`,accentColor:`#2563eb`,secondaryColor:`#475569`,fontStyle:`sans`,animationIntensity:`normal`,wordColors:[],lyricsIcons:[],provider:`AI`},dark:{name:`AI Dark`,backgroundColor:`#0f172a`,primaryColor:`#f8fafc`,accentColor:`#7dd3fc`,secondaryColor:`#cbd5e1`,fontStyle:`sans`,animationIntensity:`normal`,wordColors:[],lyricsIcons:[],provider:`AI`}},r=e=>!!e&&typeof e==`object`&&!Array.isArray(e),i=e=>{if(typeof e!=`string`)return null;let n=e.trim();if(!t.test(n))return null;let r=n.slice(1).toLowerCase();return r.length===3?`#${r.split(``).map(e=>`${e}${e}`).join(``)}`:`#${r}`},a=(e,t,n=`#ffffff`)=>i(e)??i(t)??n,o=(e,t)=>e===`serif`||e===`mono`||e===`sans`?e:t,s=(e,t)=>e===`calm`||e===`chaotic`||e===`normal`?e:t,c=(e,t)=>Array.isArray(e)?e.flatMap(e=>{if(!r(e))return[];let n=typeof e.word==`string`?e.word.trim():``;return n?[{word:n,color:a(e.color,t)}]:[]}):[],l=e=>Array.isArray(e)?e.filter(e=>typeof e==`string`).map(e=>e.trim()).filter(Boolean).slice(0,12):[],u=(e,t)=>{let n=r(e)?e:{},i=a(n.accentColor,t.accentColor);return{...t,name:typeof n.name==`string`&&n.name.trim()?n.name.trim():t.name,description:typeof n.description==`string`?n.description.trim():t.description,backgroundColor:a(n.backgroundColor,t.backgroundColor),primaryColor:a(n.primaryColor,t.primaryColor),accentColor:i,secondaryColor:a(n.secondaryColor,t.secondaryColor),fontStyle:o(n.fontStyle,t.fontStyle),animationIntensity:s(n.animationIntensity,t.animationIntensity),wordColors:n.wordColors===void 0?t.wordColors:c(n.wordColors,i),lyricsIcons:n.lyricsIcons===void 0?t.lyricsIcons:l(n.lyricsIcons),provider:typeof n.provider==`string`&&n.provider.trim()?n.provider.trim():t.provider}},d=(e,t=n)=>{let i=r(e)?e:{};return{light:u(i.light,t.light),dark:u(i.dark,t.dark)}},f=(e,t)=>t===`ai`||!!e.customTheme,p=e=>e.bgMode===`custom`&&e.customTheme?`custom`:e.bgMode===`ai`||e.aiTheme?`ai`:e.customTheme?`custom`:`ai`,m=e((e,t)=>({aiTheme:null,customTheme:null,bgMode:`default`,coverUrl:null,song:null,songKey:null,isDaylight:!1,promptSourceText:null,isPureMusic:!1,songTitle:void 0,isOpen:!1,editorKind:null,canOpenEditor:!1,setContext:t=>e(e=>{let n=e.editorKind&&f(t,e.editorKind)?e.editorKind:null;return{...t,isOpen:e.isOpen&&!!n,editorKind:n,canOpenEditor:!0}}),openEditor:n=>{let r=t(),i=n??p(r);i&&f(r,i)&&e({isOpen:!0,editorKind:i})},closeEditor:()=>e({isOpen:!1,editorKind:null})})),h=e=>!!e&&typeof e==`object`&&!Array.isArray(e),g=e=>h(e)&&h(e.light)&&h(e.dark),_=e=>{let t=e.indexOf(`{`);if(t===-1)return null;let n=0,r=!1,i=!1;for(let a=t;a<e.length;a+=1){let o=e[a];if(r){i?i=!1:o===`\\`?i=!0:o===`"`&&(r=!1);continue}if(o===`"`)r=!0;else if(o===`{`)n+=1;else if(o===`}`&&(--n,n===0))return e.slice(t,a+1)}return null},v=e=>{let t=e.trim(),n=[t],r=/```(?:json)?\s*([\s\S]*?)```/gi,i;for(;(i=r.exec(t))!==null;)n.push(i[1].trim());let a=_(t);return a&&n.push(a),Array.from(new Set(n.filter(Boolean)))},y=e=>{let t=null;for(let n of v(e))try{let e=JSON.parse(n);if(g(e))return e}catch(e){t=e}throw Error(`Invalid AI theme JSON format`,{cause:t})},b=`Analyze the mood of the provided song source text and generate TWO visual theme configurations for a music player - one for LIGHT mode and one for DARK mode.

DUAL THEME REQUIREMENTS:
1. Generate TWO complete themes: one optimized for LIGHT/DAYLIGHT mode, one for DARK/MIDNIGHT mode.
2. Both themes should capture the SAME emotional essence of the source text, but with appropriate color palettes for their respective modes.
3. The theme names must be in Chinese and strictly limited to 10 characters or less. They should reflect both the mood AND the mode (e.g., "忧郁破晓" for light, "忧郁子夜" for dark).
4. The theme description must be a brief, emotional sentence in Chinese (strictly limited to 15 to 30 Chinese characters) reflecting a stream-of-consciousness style with youth and literary characteristics, capturing a listener's immediate emotional reaction to this song. Do not write formal analytical text. Must be written from a first-person listener perspective.
   GUIDELINES FOR THE EXPRESSIVE STYLE:
   - Stream of Consciousness & Literary Vibe: Emphasize poetic, reflective, or introspective thoughts (e.g., emotional connection, existential thoughts, quiet solitude).
   - Youth & Nostalgia: Associate the mood with nostalgic memories of youth, dreams, seasons, or romantic longing.
   - Spatial & Situational Synesthesia: Translate the music's vibe into a vivid situation, atmosphere, weather, or imagery (e.g., summer breeze, starry sky, quiet room).
   Examples for reference: "戴上耳机的那一刻，喧嚣的世界瞬间消失了。", "然后，这份爱编织了太阳和所有星星", "你的世界，也包括我在内吗？", "微醺的夏夜吹拂过一阵海风。", "青春是一种眺望的姿态！", "仿佛回到了那个满是汽水味和单车后座的夏天。"。

SOURCE MODE:
1. If 'Pure instrumental' is yes, the source text below is the song title of a pure instrumental track, not lyrics.
2. If 'Pure instrumental' is no, the source text below is a lyrics snippet.
3. Base your mood inference only on the provided source text.

COLOR & THEME GENERATION WORKFLOW:
1. First, identify 10-20 key emotional standalone words from the source text that represent the core mood and atmosphere of the song.
2. Assign a specific, representative color to each of these key emotional standalone words under 'wordColors'.
3. Based on the emotional direction and colors of these identified words, construct the overall color palettes (backgroundColor, primaryColor, secondaryColor, accentColor) for the light and dark themes.
4. Coordinated Colors: The colors assigned in 'wordColors' must be designed in coordination and harmony with the overall color schemes of the themes.

LIGHT THEME RULES:
- Use LIGHT backgrounds. Avoid defaulting to pure white background for every light theme. Generate diverse and rich light-colored backgrounds (e.g., warm creams, soft pastel blues, pale sage greens, gentle peach, warm sands, pale lavenders) that directly match the song's mood.
- Ensure text/icons are dark enough for contrast, but avoid defaulting to pure black (#000000). Generate a very dark tone that coordinates with the background color's hue (e.g., deep navy, dark charcoal, dark plum).
- 'accentColor' must be visible against the light background.

DARK THEME RULES:
- Use DARK backgrounds. Avoid generic pure black backgrounds; use rich, diverse dark colors (e.g., deep midnight blue, dark forest green, charcoal gray, dark plum, deep chocolate, burgundy) matching the song's mood.
- Ensure text/icons are light enough for contrast, but avoid defaulting to pure white (#ffffff). Generate a very bright, soft tone that coordinates with the background color's hue (e.g., soft sky blue, pale mint green, light warm cream).
- 'accentColor' must contrast with the dark background and should be creatively derived from the song's specific mood (e.g., soft blues, mint greens, warm corals, lavender, pale gold) rather than defaulting to generic bright yellow.

SHARED RULES FOR BOTH THEMES:
1. CRITICAL for 'secondaryColor': This color is used for secondary TEXT (e.g., album name, artist name).
   - It MUST have sufficient contrast against 'backgroundColor' to be easily readable.
   - Aim for a contrast ratio of at least 4.5:1 for accessibility.
2. 'wordColors' and 'lyricsIcons' should be the SAME for both themes (they represent the source text's meaning).

IMPORTANT for 'wordColors':
1. Extract 10-20 emotional standalone words. For Latin-script text, each 'word' MUST be one complete word only, not a phrase.
2. CRITICAL: Do NOT include punctuation, apostrophes, curly quotes, hyphens, or spaces in Latin-script 'word' values. Use clean whole words like "train", "gone", "hidden", "cities"; do NOT return "train’s gone", "well-hidden", "set me free", or "shun the light".
3. Avoid function words such as articles, prepositions, pronouns, particles, and auxiliaries (for example: the, a, an, to, me, and, of, in, on).
4. For CJK lyrics, short meaningful semantic terms may contain multiple CJK characters, but do not select single particles unless they are emotionally meaningful.
5. The 'word' field MUST match text from the source snippet after removing surrounding punctuation. If the pure-instrumental title is very short, using the exact full title as a phrase is allowed.

IMPORTANT for 'lyricsIcons':
1. Identify 3-5 visual concepts/objects mentioned in or strongly implied by the source text.
2. Return them as valid Lucide React icon names (PascalCase, e.g., 'CloudLightning', 'HeartHandshake').

OUTPUT CONTRACT:
Return one JSON object with required "light" and "dark" objects. Each theme object requires "name", "backgroundColor", "primaryColor", "accentColor", "secondaryColor", "wordColors", and "lyricsIcons".

Expected JSON structure:
{
  "light": {
    "name": "string (max 10 chars, in Chinese)",
    "description": "string (15-30 chars, in Chinese)",
    "backgroundColor": "hex string",
    "primaryColor": "hex string",
    "accentColor": "hex string",
    "secondaryColor": "hex string",
    "wordColors": [
      {
        "word": "string",
        "color": "hex string"
      }
    ],
    "lyricsIcons": ["string", "string"]
  },
  "dark": {
    "name": "string (max 10 chars, in Chinese)",
    "description": "string (15-30 chars, in Chinese)",
    "backgroundColor": "hex string",
    "primaryColor": "hex string",
    "accentColor": "hex string",
    "secondaryColor": "hex string",
    "wordColors": [
      {
        "word": "string",
        "color": "hex string"
      }
    ],
    "lyricsIcons": ["string", "string"]
  }
}`,x=(e,t,n)=>`Pure instrumental: ${t?`yes`:`no`}
${t&&n?`Song title: ${n}\n`:``}Source snippet:
${e}`,S=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,C=e=>{let t=typeof e==`string`?e.trim():``;if(!S.test(t))return null;let n=t.slice(1).toLowerCase();return n.length===3?`#${n.split(``).map(e=>`${e}${e}`).join(``)}`:`#${n}`},w=e=>[e.light.backgroundColor,e.light.primaryColor,e.light.accentColor,e.light.secondaryColor,e.dark.backgroundColor,e.dark.primaryColor,e.dark.accentColor,e.dark.secondaryColor],T=(e,t)=>{let n=new Set;return[...t,...w(e)].flatMap(e=>{let t=C(e);return!t||n.has(t)?[]:(n.add(t),[t])}).slice(0,12)};export{m as a,d as c,y as i,u as l,b as n,n as o,x as r,a as s,T as t};