/* Counts VISIBLE printings of each identifier, and proves whether the rail
   actually pins. node research/_dupes.mjs <url> [width] */
import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:4178/capabilities'
const width = Number(process.argv[3] || 390)

const VALUES = {
  UEI: 'W8DYK38MEKP3',
  CAGE: '14G18',
  'D-U-N-S': '118835343',
  'E-Verify': '2375403',
  'NAICS 541511': '541511',
}

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width, height: 900, isMobile: width < 500 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 1200))

const counts = await page.evaluate((values) => {
  const text = document.body.innerText // innerText excludes display:none
  const out = {}
  for (const [k, v] of Object.entries(values)) {
    out[k] = text.split(v).length - 1
  }
  return out
}, VALUES)

console.log(`visible printings @ ${width}px`)
for (const [k, n] of Object.entries(counts)) {
  console.log(`  ${String(n)} x  ${k}`)
}

// Tap targets under 44px.
const small = await page.evaluate(() => {
  const bad = []
  for (const el of document.querySelectorAll('a,button,[role="button"]')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    if (r.height < 44) {
      bad.push(`${Math.round(r.width)}x${Math.round(r.height)}  ${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 42)}`)
    }
  }
  return bad
})
console.log(`\ntap targets under 44px: ${small.length}`)
for (const s of small.slice(0, 14)) console.log(`  ${s}`)

// Does the rail pin?
if (width >= 1024) {
  const track = []
  for (const y of [0, 900, 1800, 2700]) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await new Promise((r) => setTimeout(r, 350))
    const top = await page.evaluate(() => {
      const a = document.querySelector('aside')
      return a ? Math.round(a.getBoundingClientRect().top) : null
    })
    track.push(`scrollY ${String(y).padEnd(5)} asideTop ${top}`)
  }
  console.log('\nsticky check (pins if asideTop stops falling):')
  for (const t of track) console.log('  ' + t)
}
await browser.close()
