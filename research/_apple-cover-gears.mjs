/* Apple Business Connect gears cover photo -- 1600x1040 exactly.
 *
 * Apple's upload minimum is 1600x1040 (1.538:1), but the real place-card
 * `.cover-preview` measured 244x96 (2.542:1) on 2026-08-26. Apple therefore
 * shows only the upload's central 1600x629 band on the place card; roughly
 * 205px at the top and bottom is visible only in Wallet.
 *
 * The 1200x500 source is first shown at 1600x667, then cropped by 19px at the
 * top and bottom to make the sharp 1600x629 place-card band. A heavily blurred
 * cover-sized copy continues the artwork through the otherwise-unused outer
 * bands without a hard letterbox. Puppeteer's 2x device scale performs the
 * modest 1.333x sharp-image upscale without adding an image dependency.
 *
 *   node research/_apple-cover-gears.mjs
 */
import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'node:fs'

const SRC = 'C:\\Users\\User\\OneDrive - One Algorithm LLC\\One Algorithm LLC – Corporate Records\\10_Strategy_and_Planning\\01_Marketing\\Brand_Assets\\Pictures\\hero-img-3.jpg'
const OUT = 'public/work/apple-cover-gears-1600x1040.jpg'
const W = 1600
const H = 1040
const source = readFileSync(SRC).toString('base64')

const html = `<style>
  html,body{margin:0;width:${W / 2}px;height:${H / 2}px;overflow:hidden;background:#04182b}
  body{position:relative}
  .fill{position:absolute;inset:-32px;width:calc(100% + 64px);height:calc(100% + 64px);
    object-fit:cover;filter:blur(28px)}
  .band{position:absolute;left:0;top:102.5px;width:800px;height:314.5px;overflow:hidden}
  .band img{display:block;width:800px;height:auto;transform:translateY(-9.5px)}
</style>
<img class="fill" src="data:image/jpeg;base64,${source}" alt="">
<div class="band"><img src="data:image/jpeg;base64,${source}" alt=""></div>`

const browser = await puppeteer.launch({ headless: 'new', protocolTimeout: 120_000 })
const page = await browser.newPage()
page.setDefaultTimeout(120_000)
await page.setViewport({ width: W / 2, height: H / 2, deviceScaleFactor: 2 })
await page.setContent(html)
await page.evaluate(() => Promise.all([...document.images].map((image) => image.decode())))
const buf = await page.screenshot({ type: 'jpeg', quality: 90 })
writeFileSync(OUT, buf)
await browser.close()

/* Apple rejected a previous cover for being under-size. Read the JPEG SOF
   marker from the written bytes instead of trusting the viewport calculation. */
let i = 2
let w = 0
let h = 0
while (i < buf.length) {
  if (buf[i] !== 0xff) { i++; continue }
  const marker = buf[i + 1]
  if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
    h = buf.readUInt16BE(i + 5)
    w = buf.readUInt16BE(i + 7)
    break
  }
  i += 2 + buf.readUInt16BE(i + 2)
}
const kb = buf.length / 1024
if (w !== W || h !== H) throw new Error(`expected ${W}x${H}, wrote ${w}x${h}`)
if (kb >= 10 * 1024) throw new Error(`${kb.toFixed(0)}KB exceeds Apple's 10MB cap`)
console.log(`${OUT}  ${w}x${h}  ${kb.toFixed(0)}KB  blurred continuation fill  OK`)
