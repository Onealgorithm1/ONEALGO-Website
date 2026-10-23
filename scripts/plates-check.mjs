// The one runnable check for the Salesforce plate system (spec 2.18). Exits 1
// on any failure. Wired into `prebuild`, so `npm run build` runs it first.
//
//   node scripts/plates-check.mjs
//
// What it guards, and why each one matters:
//  - every generated plate is up to date with its scripts/plates/<page>.mjs
//    spec (nobody hand-edits a generated SVG or .ts and drifts from the other)
//  - every PLATES id has both files; every legend key exists in the overlay
//  - each SVG <desc> equals the alt (the honesty of the image IS its alt)
//  - no <image>, no external href (a plate cannot smuggle in a screenshot)
//  - SVG <= 30 KB (maps <= 40 KB), embedded fonts <= 12 KB
//  - every share JPEG is the declared size and weight
//  - every SHOTS file exists at every listed width
//  - every /services/salesforce* route in prerender.mjs is listed in llms.txt
//  - plate data is never imported by a shared module (main-chunk budget)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { render, tsFile } from './plates.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const media = path.join(root, 'public/media/salesforce')
const dataDir = path.join(root, 'client/data/plates')
const specDir = path.join(root, 'scripts/plates')
const fails = []
const fail = (m) => fails.push(m)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const unesc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const norm = (s) => s.replace(/\r\n/g, '\n')

// 1. Generated files match their specs.
const pages = fs.readdirSync(specDir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).map((f) => f.slice(0, -4))
for (const page of pages) {
  const mod = await import(pathToFileURL(path.join(specDir, `${page}.mjs`)).href)
  const plates = mod.default ?? []
  const ts = path.join(dataDir, `${page}.ts`)
  if (!fs.existsSync(ts) || norm(fs.readFileSync(ts, 'utf8')) !== tsFile(page, plates, mod.shots ?? []))
    fail(`client/data/plates/${page}.ts is stale: run node scripts/plates.mjs ${page}`)
  for (const p of plates)
    for (const [v, f] of [['desktop', `${p.id}.svg`], ['mobile', `${p.id}-m.svg`]]) {
      const file = path.join(media, f)
      if (fs.existsSync(file) && norm(fs.readFileSync(file, 'utf8')) !== render(p, v)) fail(`${f} is stale: run node scripts/plates.mjs ${page}`)
    }
}

// 2. Per-plate rules, read from the generated .ts the pages actually import.
const json = (src, name) => {
  const m = src.match(new RegExp(`export const ${name} = ([\\s\\S]*?) satisfies`))
  return m ? JSON.parse(m[1]) : {}
}
let plateCount = 0
for (const f of fs.readdirSync(dataDir).filter((f) => f.endsWith('.ts') && f !== 'types.ts')) {
  const src = fs.readFileSync(path.join(dataDir, f), 'utf8')
  for (const p of Object.values(json(src, 'PLATES'))) {
    plateCount++
    const keys = new Set([...p.traces.map((t) => t.k), ...p.nodes.map((n) => n.k)])
    for (const l of p.legend ?? []) if (!keys.has(l.k)) fail(`${p.id}: legend key "${l.k}" matches no trace or node`)
    for (const file of [`${p.id}.svg`, `${p.id}-m.svg`]) {
      const fp = path.join(media, file)
      if (!fs.existsSync(fp)) { fail(`${file} missing`); continue }
      const svg = fs.readFileSync(fp, 'utf8')
      const desc = svg.match(/<desc>([\s\S]*?)<\/desc>/)
      if (!desc || unesc(desc[1]) !== p.alt) fail(`${file}: <desc> does not equal the plate's alt`)
      if (!/<title>[^<]+<\/title>/.test(svg)) fail(`${file}: no <title>`)
      if (/<image\b/i.test(svg)) fail(`${file}: contains <image>`)
      if (/href\s*=\s*["']https?:/i.test(svg)) fail(`${file}: contains an external href`)
      const kb = Buffer.byteLength(svg) / 1024
      const cap = /map/.test(p.id) ? 40 : 30
      if (kb > cap) fail(`${file}: ${kb.toFixed(1)} KB > ${cap} KB`)
      const fontKb = [...svg.matchAll(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/g)].reduce((n, m) => n + (m[1].length * 3) / 4, 0) / 1024
      if (fontKb > 12) fail(`${file}: ${fontKb.toFixed(1)} KB of embedded font > 12 KB`)
    }
  }
  // 3. Screenshots.
  for (const s of Object.values(json(src, 'SHOTS')))
    for (const w of s.widths)
      for (const ext of ['avif', 'webp'])
        if (!fs.existsSync(path.join(media, `${s.id}-${w}.${ext}`))) fail(`${s.id}-${w}.${ext} missing (SHOTS in ${f})`)
}

// 4. Share images.
for (const f of fs.readdirSync(media).filter((f) => f.endsWith('.jpg'))) {
  const [w, h, kb] = /-1600x900\.jpg$/.test(f) ? [1600, 900, 400] : f.startsWith('og-') ? [1200, 630, 300] : []
  if (!w) continue
  const meta = await sharp(path.join(media, f)).metadata()
  const size = fs.statSync(path.join(media, f)).size / 1024
  if (meta.width !== w || meta.height !== h) fail(`${f}: ${meta.width}x${meta.height}, expected ${w}x${h}`)
  if (meta.hasAlpha) fail(`${f}: has alpha`)
  if (size > kb) fail(`${f}: ${size.toFixed(0)} KB > ${kb} KB`)
}

// 5. llms.txt lists every Salesforce route. ponytail: the route list is read
// from prerender.mjs (plain node) rather than SF_PAGES (TypeScript); they are
// the same 22 URLs, and a route missing from prerender already 404s.
const prerender = fs.readFileSync(path.join(root, 'scripts/prerender.mjs'), 'utf8')
const routes = [...new Set([...prerender.matchAll(/"(\/services\/salesforce[a-z-]*)"/g)].map((m) => m[1]))]
const llms = fs.readFileSync(path.join(root, 'public/llms.txt'), 'utf8')
for (const r of routes) if (!llms.includes(`https://onealgorithm.com${r}\n`) && !llms.includes(`https://onealgorithm.com${r}\r\n`)) fail(`public/llms.txt does not list ${r}`)
if (routes.length < 22) fail(`expected 22 Salesforce routes in prerender.mjs, found ${routes.length}`)

// 6. Plate data stays out of the shared chunk.
for (const f of ['client/components/site.tsx', 'client/components/Layout.tsx', 'client/components/salesforce.tsx']) {
  const src = fs.readFileSync(path.join(root, f), 'utf8')
  // Import lines only: the components' usage comments name page imports on purpose.
  if (/^import[^\n]*from\s*["'][^"']*data\/plates\/(?!types["'])/m.test(src)) fail(`${f} imports generated plate data; import it from the page instead`)
}

// 7. The named lead's certification claim does not go stale silently (fix round FV-05).
const proof = fs.readFileSync(path.join(root, 'client/data/salesforceProof.ts'), 'utf8')
const recheck = proof.match(/SF_PEOPLE_RECHECK_BY = "(\d{4}-\d{2}-\d{2})"/)?.[1]
const today = new Date().toISOString().slice(0, 10)
if (!recheck) fail('client/data/salesforceProof.ts: SF_PEOPLE_RECHECK_BY not found')
else if (today >= recheck)
  fail(`SF_PEOPLE_RECHECK_BY ${recheck} has passed: re-read https://www.salesforce.com/trailblazer/samirisetti; if the certifications are still active, set the next maintenance due date, otherwise fix SF_PEOPLE's sentence`)

if (fails.length) {
  console.error(`plates-check: ${fails.length} failure(s)\n  ` + fails.join('\n  '))
  process.exit(1)
}
console.log(`plates-check: ok (${plateCount} plate(s), ${routes.length} Salesforce routes in llms.txt)`)
