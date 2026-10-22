// Generates the Salesforce page images from client/data/salesforceCities.ts (sourced data only):
//   public/media/salesforce/salesforce-jobs-<slug>.svg            open roles by role, LinkedIn 2026-10-21
//   public/media/salesforce/<slug>-largest-industries.svg          top employer groups, Census CBP 2023
//   public/media/salesforce/og-<slug>.jpg                          1200x630 share card (JPEG, no alpha)
// Run: node scripts/salesforce-images.mjs   (re-run whenever the city data is regenerated)
import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const src = fs.readFileSync(path.join(root, 'client/data/salesforceCities.ts'), 'utf8')
const CITIES = JSON.parse(src.slice(src.indexOf('= [') + 2, src.lastIndexOf('] as const') + 1))
const out = path.join(root, 'public/media/salesforce')
fs.mkdirSync(out, { recursive: true })

// DESIGN.md tokens
const T = { night: '#04182b', ink: '#0d1b2a', ink2: '#35485c', ink3: '#5a6b7d', blue: '#005eaa', orange: '#ffa634', paper: '#ffffff', hairline: '#e3e9f0', nightInk2: '#dbe4ee' }
const n = (v) => Number(v).toLocaleString('en-US')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const where = (c) => (c.slug === 'washington-dc' ? 'Washington, DC' : `${c.name}, ${c.state}`)

/** Horizontal bar chart as a self-contained SVG (text is real text, so it is indexable and sharp). */
function bars({ title, rows, source }) {
  const W = 800, left = 300, barMax = 400, rowH = 56, top = 92
  const H = top + rows.length * rowH + 64
  const max = Math.max(...rows.map((r) => r.value))
  const body = rows.map((r, i) => {
    const y = top + i * rowH, w = Math.max(4, Math.round((r.value / max) * barMax))
    return `<text x="${left - 16}" y="${y + 26}" text-anchor="end" font-size="17" fill="${T.ink2}">${esc(r.label)}</text>
  <rect x="${left}" y="${y + 8}" width="${w}" height="28" rx="2" fill="${i === 0 ? T.blue : '#4f86b8'}"/>
  <text x="${left + w + 10}" y="${y + 28}" font-size="17" font-weight="600" fill="${T.ink}">${n(r.value)}</text>`
  }).join('\n  ')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" font-family="IBM Plex Sans, Segoe UI, Helvetica, Arial, sans-serif">
  <title>${esc(title)}</title>
  <rect width="${W}" height="${H}" fill="${T.paper}"/>
  <text x="32" y="48" font-size="22" font-weight="600" fill="${T.ink}">${esc(title)}</text>
  <line x1="32" y1="68" x2="${W - 32}" y2="68" stroke="${T.hairline}"/>
  ${body}
  <text x="32" y="${H - 24}" font-size="14" fill="${T.ink3}">${esc(source)}</text>
</svg>
`
}

const made = []
for (const c of CITIES) {
  const jobs = c.jobs.map((j) => ({ label: j.role, value: j.count })).sort((a, b) => b.value - a.value)
  fs.writeFileSync(path.join(out, `salesforce-jobs-${c.slug}.svg`), bars({ title: `Open Salesforce roles within 25 miles of ${c.name}`, rows: jobs, source: `Source: LinkedIn public job search, ${c.jobsPulled}. OneAlgorithm.` }))
  const ind = c.industries.map((i) => ({ label: cap(i.label).replace('Professional, scientific and technical services', 'Professional services').replace('Nonprofit, civic and professional organizations', 'Nonprofit & civic orgs'), value: i.employees }))
  fs.writeFileSync(path.join(out, `${c.slug}-largest-industries.svg`), bars({ title: `Largest employer groups, ${c.name} metro (employees)`, rows: ind, source: 'Source: US Census Bureau, County Business Patterns 2023. OneAlgorithm.' }))
  made.push(c.slug)
}

// Share cards: 1200x630 JPEG, rendered from HTML so the brand font and the real partner badge are used.
const badge = 'data:image/png;base64,' + fs.readFileSync(path.join(root, 'public/salesforce-partner-badge.png')).toString('base64')
const cards = [
  ...CITIES.map((c) => ({ file: `og-${c.slug}.jpg`, eyebrow: where(c), title: `Salesforce consultant for ${where(c)} companies` })),
  { file: 'og-salesforce-data-migration.jpg', eyebrow: 'Salesforce services', title: 'Salesforce data migration' },
  { file: 'og-salesforce-integration.jpg', eyebrow: 'Salesforce services', title: 'Salesforce integration with SAP and ERP' },
  { file: 'og-salesforce-managed-services.jpg', eyebrow: 'Salesforce services', title: 'Salesforce managed services' },
  { file: 'og-salesforce-marketing-cloud-consulting.jpg', eyebrow: 'Salesforce services', title: 'Salesforce Marketing Cloud consulting' },
]
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630 })
for (const k of cards) {
  await page.setContent(`<!doctype html><html><head><style>
    body{margin:0;width:1200px;height:630px;background:${T.night};color:#fff;font-family:'IBM Plex Sans','Segoe UI',Helvetica,Arial,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box}
    .eyebrow{font:500 22px 'JetBrains Mono',Consolas,monospace;letter-spacing:.12em;text-transform:uppercase;color:${T.orange}}
    h1{font-size:64px;line-height:1.08;font-weight:600;margin:20px 0 0;max-width:960px}
    .foot{display:flex;align-items:center;justify-content:space-between;color:${T.nightInk2};font-size:24px}
    .foot b{color:#fff} img{height:96px}
  </style></head><body>
    <div><div class="eyebrow">${esc(k.eyebrow)}</div><h1>${esc(k.title)}</h1></div>
    <div class="foot"><div><b>OneAlgorithm</b> · Listed AppExchange Consulting Partner · Malvern, PA</div><img src="${badge}" alt=""></div>
  </body></html>`)
  await page.screenshot({ path: path.join(out, k.file), type: 'jpeg', quality: 85 })
}
await browser.close()
console.log(`charts: ${made.length * 2} svg · share cards: ${cards.length} jpg → public/media/salesforce/`)
