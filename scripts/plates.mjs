// Salesforce plate generator (spec 2.18, 2026-10-23).
//
// ─── THE PER-PAGE CONVENTION ────────────────────────────────────────────────
// One spec file per Salesforce page, so page work can run in parallel without
// two people editing one shared file:
//
//   scripts/plates/<page>.mjs       YOU EDIT: the page's plates (and shots)
//   client/data/plates/<page>.ts    GENERATED: imported by that page only
//   public/media/salesforce/<id>.svg and <id>-m.svg   GENERATED
//
// <page> is a short slug: hub, health-check, cost, data-migration, integration,
// managed-services, marketing-cloud, city, philadelphia, chester-county,
// pennsylvania. Files starting with "_" (like _lib.mjs) are helpers, not pages.
// ⛔ Never import a client/data/plates/*.ts file from site.tsx, Layout.tsx or
// salesforce.tsx: plate data must stay in the page's own chunk.
//
// A spec file default-exports an array of plates:
//
//   import { box, wire, text, TYPE } from './_lib.mjs'
//   export default [{
//     id: 'salesforce-implementation-stages',      // file name + figure anchor (#fig-<id>)
//     alt: 'Diagram of …',                          // = <img alt> = SVG <desc>; describe what it SHOWS
//     tone: 'light',                                // or 'night' (matches the Section it sits in)
//     legend: [{ k: 's1', label: 'Before you buy licenses' }],   // optional, lg only
//     og: 'og-salesforce',                          // optional: the page's lead plate; --og renders
//                                                   //   og-salesforce.jpg + <id>-1600x900.jpg
//     desktop: { w: 1136, h: 520, items: [box(…), wire('s2', [[x, y], …]), text(…)] },
//     mobile:  { w: 640,  h: 1280, items: […] },    // the "-m" file, shown below 1024px
//   }]
//   export const shots = []   // optional demo-org screenshots (owner-gated, spec §7.1)
//
// Items: box() = radius-0 node (give it `k` to make it cross-highlightable),
// wire(k, pts) = connector (same `k` as the rows/legend it belongs to),
// text(), shape() for bars/map outlines, plus rangeBars() and slope() builders.
// The overlay traces and nodes in the generated .ts come from the SAME desktop
// wire/box items the SVG draws, so the drawing and the hover geometry can
// never drift apart.
//
// SVG rules enforced here and by scripts/plates-check.mjs: real <text>, <title>,
// <desc> = alt, no <image>, no external href; node rects radius 0 with a 1px
// #5a6b7d stroke; base wires #7d8da0 at 1.5u with square caps in the desktop
// file; the -m file draws wires in the signal colour (no overlay on phones).
//
// ponytail: no embedded font subset yet. The spec's `subset-font`
// devDependency needs owner sign-off (§7.11), so text renders in the system
// stack named in font-family (the spec's stated fallback, as on the live city
// charts). Ceiling: ≤12 KB of fonts per file once it is added; plates-check
// already enforces that budget.
//
// Run:  node scripts/plates.mjs            all pages
//       node scripts/plates.mjs hub         one page
//       node scripts/plates.mjs --og        also render share images (Puppeteer)
// Then: node scripts/plates-check.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const specDir = path.join(root, 'scripts/plates')
const mediaDir = path.join(root, 'public/media/salesforce')
const dataDir = path.join(root, 'client/data/plates')

const PALETTE = {
  light: { bg: '#ffffff', ink: '#0d1b2a', ink2: '#35485c', ink3: '#5a6b7d', node: '#5a6b7d', line: '#e3e8ef', wire: '#7d8da0', signal: '#005eaa' },
  night: { bg: '#04182b', ink: '#ffffff', ink2: '#dbe4ee', ink3: '#9fb3c8', node: '#9fb3c8', line: '#22364a', wire: '#7d8da0', signal: '#ffa634' },
}
const SANS = 'IBM Plex Sans, Segoe UI, Helvetica, Arial, sans-serif'
const MONO = 'JetBrains Mono, Consolas, Menlo, monospace'
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** One SVG. `mobile` = the -m file: wires in the signal colour, thicker. */
export function render(plate, variant, { tone = plate.tone ?? 'light', signalWires = variant === 'mobile' } = {}) {
  const v = plate[variant]
  const c = PALETTE[tone]
  const col = (t) => c[t] ?? t
  const wireW = variant === 'mobile' ? 3 : 1.5
  const dash = variant === 'mobile' ? '10 8' : '6 5'
  const out = []
  const items = v.items
  for (const it of items.filter((i) => i.shape)) {
    const common = `fill="${col(it.fill)}" stroke="${col(it.stroke)}" stroke-width="${it.width}"${it.opacity != null ? ` opacity="${it.opacity}"` : ''}`
    out.push(it.rect ? `<rect x="${it.rect[0]}" y="${it.rect[1]}" width="${it.rect[2]}" height="${it.rect[3]}" ${common}/>` : `<path d="${it.d}" ${common}/>`)
  }
  for (const it of items.filter((i) => 'wire' in i)) {
    out.push(`<path d="${it.d}" fill="none" stroke="${signalWires ? c.signal : c.wire}" stroke-width="${wireW}" stroke-linecap="square"${it.dashed ? ` stroke-dasharray="${dash}"` : ''}/>`)
  }
  for (const it of items.filter((i) => 'node' in i)) {
    out.push(`<rect x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" fill="${col(it.fill)}" stroke="${c.node}" stroke-width="1"/>`)
  }
  const texts = [...items.filter((i) => 'text' in i && !('node' in i)), ...items.filter((i) => 'node' in i).flatMap((n) => n.texts)]
  for (const t of texts) {
    out.push(`<text x="${t.x}" y="${t.y}" font-size="${t.size}"${t.weight ? ` font-weight="${t.weight}"` : ''}${t.mono ? ` font-family="${MONO}"` : ''}${t.anchor && t.anchor !== 'start' ? ` text-anchor="${t.anchor}"` : ''} fill="${col(t.fill)}">${esc(t.text)}</text>`)
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${v.w} ${v.h}" width="${v.w}" height="${v.h}" role="img" font-family="${SANS}">
<title>${esc(plate.title ?? plate.id.replace(/-/g, ' '))}</title>
<desc>${esc(plate.alt)}</desc>
<rect width="${v.w}" height="${v.h}" fill="${c.bg}"/>
${out.join('\n')}
</svg>
`
}

/** Overlay geometry for the page: from the desktop items the SVG draws. */
export function overlay(plate) {
  const items = plate.desktop.items
  const order = []
  const traces = []
  for (const it of items) {
    if (!('wire' in it) || !it.wire) continue
    if (!order.includes(it.wire)) order.push(it.wire)
    // Spec 4.1: at most 7 draw groups, i <= 6; later groups share the last range.
    traces.push({ k: it.wire, d: it.d, i: Math.min(order.indexOf(it.wire), 6) })
  }
  const nodes = items.filter((i) => 'node' in i && i.node).map((n) => ({ k: n.node, x: n.x, y: n.y, w: n.w, h: n.h }))
  return { traces, nodes }
}

export function validate(page, plate) {
  const where = `${page}/${plate.id}`
  const fail = (m) => { throw new Error(`${where}: ${m}`) }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(plate.id ?? '')) fail('id must be a lowercase slug')
  if (!plate.alt || plate.alt.length < 40) fail('alt must describe what the image shows (40+ chars)')
  for (const v of ['desktop', 'mobile']) {
    const s = plate[v]
    if (!s || !(s.w > 0) || !(s.h > 0) || !Array.isArray(s.items)) fail(`${v} needs w, h and items`)
    for (const n of s.items.filter((i) => 'node' in i)) if (n.need > n.h) fail(`${v} node "${n.node ?? n.texts[0]?.text}" text needs ${n.need}u but box is ${n.h}u`)
  }
  const { traces, nodes } = overlay(plate)
  const keys = new Set([...traces.map((t) => t.k), ...nodes.map((n) => n.k)])
  if (keys.size > 12) fail(`overlay has ${keys.size} groups; the paint budget is 12 (spec §8)`)
  if (new Set(nodes.map((n) => n.k)).size !== nodes.length) fail('two nodes share a key')
  for (const l of plate.legend ?? []) if (!keys.has(l.k)) fail(`legend key "${l.k}" matches no wire or node`)
}

export function tsFile(page, plates, shots) {
  const PLATES = Object.fromEntries(
    plates.map((p) => {
      const { traces, nodes } = overlay(p)
      return [p.id, {
        id: p.id, alt: p.alt,
        src: `/media/salesforce/${p.id}.svg`, w: p.desktop.w, h: p.desktop.h,
        mSrc: `/media/salesforce/${p.id}-m.svg`, mw: p.mobile.w, mh: p.mobile.h,
        traces, nodes, ...(p.legend ? { legend: p.legend } : {}),
      }]
    }),
  )
  const SHOTS = Object.fromEntries(shots.map((s) => [s.id, s]))
  return `/* GENERATED by scripts/plates.mjs from scripts/plates/${page}.mjs. Do not edit:
 * change the spec file and re-run \`node scripts/plates.mjs ${page}\`.
 * Imported by this page ONLY (never by site.tsx / salesforce.tsx). */
import type { PlateSpec, ShotSpec } from "./types";

export const PLATES = ${JSON.stringify(PLATES, null, 2)} satisfies Record<string, PlateSpec>;

export const SHOTS = ${JSON.stringify(SHOTS, null, 2)} satisfies Record<string, ShotSpec>;
`
}

async function renderOg(jobs) {
  if (!jobs.length) return
  const { default: puppeteer } = await import('puppeteer')
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  for (const { plate, file, w, h, q } of jobs) {
    // Night tone, wires in orange, labels light; fit inside a 48px margin.
    // No title text, no logo, no badge (spec 2.18).
    const svg = Buffer.from(render(plate, 'desktop', { tone: 'night', signalWires: true })).toString('base64')
    await page.setViewport({ width: w, height: h })
    await page.setContent(`<!doctype html><html><body style="margin:0;width:${w}px;height:${h}px;background:#04182b;display:grid;place-items:center">
      <img src="data:image/svg+xml;base64,${svg}" style="max-width:${w - 96}px;max-height:${h - 96}px;width:auto;height:auto"></body></html>`)
    await page.screenshot({ path: path.join(mediaDir, file), type: 'jpeg', quality: q })
  }
  await browser.close()
}

async function main() {
  const args = process.argv.slice(2)
  const og = args.includes('--og')
  const only = args.filter((a) => !a.startsWith('--'))
  const pages = fs.readdirSync(specDir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).map((f) => f.slice(0, -4))
  const todo = only.length ? only : pages
  for (const p of only) if (!pages.includes(p)) throw new Error(`no spec file scripts/plates/${p}.mjs`)
  fs.mkdirSync(mediaDir, { recursive: true })
  fs.mkdirSync(dataDir, { recursive: true })
  const ids = new Map()
  const jobs = []
  for (const page of todo) {
    const mod = await import(pathToFileURL(path.join(specDir, `${page}.mjs`)).href)
    const plates = mod.default ?? []
    const shots = mod.shots ?? []
    for (const plate of plates) {
      validate(page, plate)
      if (ids.has(plate.id)) throw new Error(`plate id ${plate.id} is used by ${ids.get(plate.id)} and ${page}`)
      ids.set(plate.id, page)
      fs.writeFileSync(path.join(mediaDir, `${plate.id}.svg`), render(plate, 'desktop'))
      fs.writeFileSync(path.join(mediaDir, `${plate.id}-m.svg`), render(plate, 'mobile'))
      if (og && plate.og) {
        jobs.push({ plate, file: `${plate.og}.jpg`, w: 1200, h: 630, q: 85 })
        jobs.push({ plate, file: `${plate.id}-1600x900.jpg`, w: 1600, h: 900, q: 82 })
      }
    }
    fs.writeFileSync(path.join(dataDir, `${page}.ts`), tsFile(page, plates, shots))
    console.log(`${page}: ${plates.length} plate(s), ${shots.length} shot(s)`)
  }
  await renderOg(jobs)
  if (jobs.length) console.log(`share images: ${jobs.length} jpg`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e.message)
    process.exit(1)
  })
}
