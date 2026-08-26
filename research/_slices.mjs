/* Viewport-sized slices down a page, so a 16,000px mobile page can be READ
   instead of squinted at. node research/_slices.mjs <url> <label> [width] [n] */
import puppeteer from 'puppeteer'
import { mkdirSync } from 'node:fs'

const url = process.argv[2] || 'http://localhost:4178/capabilities'
const label = process.argv[3] || 'slice'
const width = Number(process.argv[4] || 390)
const wanted = Number(process.argv[5] || 6)
const out = 'research/shots'
mkdirSync(out, { recursive: true })

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width, height: 844, isMobile: width < 500 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 1200))

const pageH = await page.evaluate(() => document.documentElement.scrollHeight)
const step = Math.floor(pageH / wanted)
console.log(`page ${width}x${pageH}, ${wanted} slices of ${step}px`)

for (let i = 0; i < wanted; i++) {
  const y = i * step
  await page.evaluate((top) => window.scrollTo(0, top), y)
  await new Promise((r) => setTimeout(r, 500))
  await page.screenshot({ path: `${out}/${label}-${width}-${String(i).padStart(2, '0')}.png` })
}
await browser.close()
console.log(`wrote ${wanted} slices to ${out}/${label}-${width}-NN.png`)
