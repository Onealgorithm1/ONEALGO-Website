/* Apple Business Connect cover photo — 1600x1040 exactly (Apple's minimum).
 *
 * Why this is drawn rather than photographed: DESIGN.md's rule for the site is
 * that no stock photography or AI imagery may stand in for OneAlgorithm's own
 * work, because none exists with consent. The one wide "hero" in Brand_Assets
 * is byte-identical to a file named after a third-party ERP blog post, so its
 * licence is unknown and Apple's upload asks you to affirm you hold the rights.
 * Everything below is the company's own mark, palette and words.
 *
 * Composition is centred on purpose, against the usual advice. Apple asks for
 * 1600x1040 (1.538:1) but does NOT display that shape: measured on the real
 * place card on 2026-08-26, `.cover-preview` is 244x96 -- **2.542:1**. Apple
 * takes the tall upload and crops a wide band out of its middle, so a centred
 * composition sized to the full frame gets its top and bottom shorn off (the
 * first attempt lost the globe and the city line).
 *
 * ponytail: the composition below is still sized to the full 1600x1040 frame,
 * NOT to that 2.542:1 band -- ceiling: anything outside the middle 1600x629 is
 * shown only in Wallet, never on the place card. Upgrade path when this file is
 * next used: lay the stack out inside a 629px-tall centred box and assert its
 * measured height fits, rather than trusting the full-frame maths.
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

const b64 = (p) => readFileSync(p).toString('base64')
const font = b64('public/fonts/ibm-plex-sans-latin-wght-normal.woff2')
const logo = b64('public/globe-logo.png')

const html = `<style>
  @font-face{font-family:"IBM Plex Sans";
    src:url(data:font/woff2;base64,${font}) format("woff2-variations");
    font-weight:400 700;font-style:normal}
  html,body{margin:0;width:${W / 2}px;height:${H / 2}px;background:#04182b;
    font-family:"IBM Plex Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  /* A single soft lift behind the mark so the globe does not float on flat
     navy. Radial, not a gradient sweep -- the banlist exists for a reason. */
  body{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
  body::before{content:"";position:absolute;inset:0;
    background:radial-gradient(58% 62% at 50% 38%,rgba(255,166,52,.13) 0%,rgba(4,24,43,0) 70%)}
  .stack{position:relative;display:flex;flex-direction:column;align-items:center;
    text-align:center;width:640px}           /* the 1280px safe box, halved */
  img{width:150px;height:150px;display:block}
  h1{margin:22px 0 0;font-size:46px;line-height:1;font-weight:600;color:#fff;
    letter-spacing:-.015em}
  hr{width:64px;height:3px;margin:20px 0;border:0;background:#ffa634}
  p{margin:0;font-size:20px;line-height:1.45;font-weight:400;color:#dbe4ee;max-width:520px}
  small{margin-top:16px;font-size:14px;font-weight:500;color:#9fb3c8;
    letter-spacing:.14em;text-transform:uppercase}
</style>
<div class="stack">
  <img src="data:image/png;base64,${logo}" alt="">
  <h1>OneAlgorithm</h1>
  <hr>
  <p>Websites, SEO, Google Ads and CRM<br>for small business</p>
  <small>Malvern, Pennsylvania</small>
</div>`

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: W / 2, height: H / 2, deviceScaleFactor: 2 })
await page.setContent(html)
await page.evaluate(() => document.fonts.ready)
await page.waitForSelector('img')
const buf = await page.screenshot({ type: 'jpeg', quality: 92 })
writeFileSync(OUT, buf)
await browser.close()

/* The check: Apple rejects anything under 1600x1040, and it rejected this file
   once already for exactly that. Read the JPEG SOF marker back off the bytes we
   just wrote rather than trusting the viewport maths. */
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
console.log(`${OUT}  ${w}x${h}  ${kb.toFixed(0)}KB  OK`)
