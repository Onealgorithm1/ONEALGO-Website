/* Where does the height actually go? node research/_measure.mjs <url> [width] */
import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:4178/capabilities'
const width = Number(process.argv[3] || 390)

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width, height: 844, isMobile: width < 500 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 1200))

const report = await page.evaluate(() => {
  const total = document.documentElement.scrollHeight
  const rows = []
  const sidebar = document.querySelector('aside[aria-label="Company identifiers and registrations"]')
  if (sidebar) rows.push(['SIDEBAR (aside)', Math.round(sidebar.getBoundingClientRect().height)])

  // Every top-level <section> in main, labelled by its first heading.
  const main = document.querySelector('main') || document.body
  for (const s of main.querySelectorAll('section')) {
    if (s.closest('aside')) continue
    const h = s.querySelector('h2,h3')
    const label = (h?.textContent || s.className.slice(0, 40) || 'section').trim().slice(0, 44)
    const px = Math.round(s.getBoundingClientRect().height)
    if (px > 40) rows.push([label, px])
  }
  return { total, rows }
})

console.log(`total ${report.total}px @ ${width}px\n`)
for (const [label, px] of report.rows.sort((a, b) => b[1] - a[1])) {
  const pct = ((px / report.total) * 100).toFixed(1).padStart(5)
  console.log(`${String(px).padStart(6)}px ${pct}%  ${label}`)
}
await browser.close()
