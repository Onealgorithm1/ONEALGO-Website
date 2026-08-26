/* Full-page screenshots at the three widths the gates care about.
   node research/_shots.mjs <url> <label>   */
import puppeteer from 'puppeteer'
import { mkdirSync } from 'node:fs'

const url = process.argv[2] || 'http://localhost:4178/capabilities'
const label = process.argv[3] || 'shot'
const out = 'research/shots'
mkdirSync(out, { recursive: true })

const WIDTHS = [
  { w: 390, h: 844, name: 'mobile', mobile: true },
  { w: 768, h: 1024, name: 'tablet', mobile: false },
  { w: 1440, h: 900, name: 'desktop', mobile: false },
]

const browser = await puppeteer.launch({ headless: 'new' })
for (const { w, h, name, mobile } of WIDTHS) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, isMobile: mobile, deviceScaleFactor: 1 })
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1200))

  // Horizontal overflow is a gate, so measure it while we are here.
  const metrics = await page.evaluate(() => {
    const de = document.documentElement
    const overflowing = [...document.querySelectorAll('*')]
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 5)
      .map((el) => `${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)}`)
    return {
      scrollW: de.scrollWidth,
      innerW: window.innerWidth,
      pageH: de.scrollHeight,
      overflowing,
    }
  })
  console.log(
    `${name.padEnd(8)} ${metrics.innerW}px  page height ${metrics.pageH}px  ` +
      `overflow ${metrics.scrollW > metrics.innerW + 1 ? 'YES → ' + metrics.overflowing.join(' | ') : 'no'}`,
  )

  await page.screenshot({ path: `${out}/${label}-${name}.png`, fullPage: true })
  await page.close()
}
await browser.close()
console.log(`\nwrote ${out}/${label}-{mobile,tablet,desktop}.png`)
