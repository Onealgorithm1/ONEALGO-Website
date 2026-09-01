/* Apple Business Connect cover photo — 1600x1040 exactly (Apple's minimum).
 *
 * Why this is drawn rather than photographed: DESIGN.md's rule for the site is
 * that no stock photography or AI imagery may stand in for OneAlgorithm's own
 * work, because none exists with consent. The one wide "hero" in Brand_Assets
 * is byte-identical to a file named after a third-party ERP blog post, so its
 * licence is unknown and Apple's upload asks you to affirm you hold the rights.
 * Everything below is the company's own mark, palette and words.
 *
 * ⛔ THE REAL LOGOTYPE IS NOT A GLOBE ABOVE A WORD. It is one line —
 * One(orange) + Alg(blue) + the globe STANDING IN FOR THE "o" + rithm(blue) —
 * exactly as client/components/OneAlgorithmText.tsx renders it in the site
 * header. The first version of this file stacked the globe above plain white
 * "OneAlgorithm" on navy, which is not our mark and not our ground (Louis,
 * 2026-09-01: "the background should be white and that is not our brand logo").
 * If you change the wordmark here, change it to match that component, or the
 * card stops matching the website a visitor just came from.
 *
 * ⛔ Apple asks for 1600x1040 (1.538:1) but does NOT display that shape:
 * measured on the real place card 2026-08-26, `.cover-preview` is 244x96 —
 * **2.542:1**. Apple crops a wide band out of the middle, so only the central
 * **1600 x 629** ever reaches the place card; the top and bottom ~205px rows
 * are Wallet-only. The previous version laid its stack out against the full
 * frame and the city line fell outside the band. The stack is now sized to the
 * band and the render ASSERTS it fits, because this has now been got wrong
 * twice and viewport maths is not proof.
 *
 * Same renderer as research/_post-images.mjs: puppeteer at deviceScaleFactor 2,
 * no image library added. Fonts and logo are inlined as data URIs so the render
 * never depends on the network.
 *
 *   node research/_apple-cover.mjs
 */
import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'node:fs'

const OUT = 'public/work/apple-cover-1600x1040.jpg'
const W = 1600
const H = 1040
const BAND = 629 // the only part of the upload the place card ever shows

const b64 = (p) => readFileSync(p).toString('base64')
const font = b64('public/fonts/ibm-plex-sans-latin-wght-normal.woff2')
const logo = b64('public/globe-logo.png')

/* Brand values, from client/global.css — not eyeballed:
   --onealgo-orange-500: 36 100% 60%  = #ffa634   (the "One")
   --onealgo-blue-950:  210 100% 21%  = #005eaa   ("Alg" + "rithm")
   ink2 #35485c / ink3 #5a6b7d from DESIGN.md for the two support lines.
   ⛔ #ffa634 on white is ~2:1 and would fail WCAG 1.4.3 as body text. It is
   permitted here for the same reason it is permitted in the site header:
   1.4.3 exempts logotypes. Do NOT reuse this orange for the tagline. */
const html = `<style>
  @font-face{font-family:"IBM Plex Sans";
    src:url(data:font/woff2;base64,${font}) format("woff2-variations");
    font-weight:400 700;font-style:normal}
  html,body{margin:0;width:${W / 2}px;height:${H / 2}px;background:#ffffff;
    font-family:"IBM Plex Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  body{display:flex;align-items:center;justify-content:center;overflow:hidden}
  /* Sized to the BAND, not the frame. Everything that matters lives in here. */
  .band{width:${W / 2}px;height:${BAND / 2}px;display:flex;align-items:center;justify-content:center}
  .stack{display:flex;flex-direction:column;align-items:center;text-align:center;width:660px}
  /* The logotype: one line, globe in place of the "o". */
  .logo{display:flex;align-items:center;justify-content:center;
    font-size:76px;line-height:1;font-weight:700;letter-spacing:-.02em;white-space:nowrap}
  .one{color:#ffa634}
  .alg{color:#005eaa}
  .logo img{width:69px;height:69px;display:block;margin:0 1px}
  hr{width:64px;height:3px;margin:26px 0 22px;border:0;background:#ffa634}
  p{margin:0;font-size:21px;line-height:1.45;font-weight:400;color:#35485c;max-width:540px}
  small{margin-top:18px;font-size:14px;font-weight:500;color:#5a6b7d;
    letter-spacing:.14em;text-transform:uppercase}
</style>
<div class="band">
  <div class="stack">
    <div class="logo"><span class="one">One</span><span class="alg">Alg</span><img
      src="data:image/png;base64,${logo}" alt=""><span class="alg">rithm</span></div>
    <hr>
    <p>Websites, SEO, Google Ads and CRM<br>for small business</p>
    <small>Malvern, Pennsylvania</small>
  </div>
</div>`

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: W / 2, height: H / 2, deviceScaleFactor: 2 })
await page.setContent(html)
await page.evaluate(() => document.fonts.ready)
await page.waitForSelector('.logo img')

/* ⛔ The check that was missing. Measure the real laid-out stack and prove it
   fits the 629px band, at full scale, before anything is written. */
const stackH = await page.$eval('.stack', (el) => el.getBoundingClientRect().height * 2)
if (stackH > BAND) {
  await browser.close()
  throw new Error(`stack is ${Math.round(stackH)}px tall; only the middle ${BAND}px is shown on the place card`)
}

const buf = await page.screenshot({ type: 'jpeg', quality: 92 })
writeFileSync(OUT, buf)
await browser.close()

/* Apple rejects anything under 1600x1040, and it rejected this file once
   already for exactly that. Read the JPEG SOF marker back off the bytes we just
   wrote rather than trusting the viewport maths. */
let i = 2
let w = 0
let h = 0
while (i < buf.length) {
  if (buf[i] !== 0xff) { i++; continue }
  const m = buf[i + 1]
  if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
    h = buf.readUInt16BE(i + 5)
    w = buf.readUInt16BE(i + 7)
    break
  }
  i += 2 + buf.readUInt16BE(i + 2)
}
const kb = buf.length / 1024
if (w !== W || h !== H) throw new Error(`expected ${W}x${H}, wrote ${w}x${h}`)
if (kb > 10 * 1024) throw new Error(`${kb.toFixed(0)}KB exceeds Apple's 10MB cap`)
console.log(`${OUT}  ${w}x${h}  ${kb.toFixed(0)}KB  stack ${Math.round(stackH)}/${BAND}px band  OK`)
