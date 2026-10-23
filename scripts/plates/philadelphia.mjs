// Plates for /services/salesforce-consultant-philadelphia. See the convention in scripts/plates.mjs.
//
// PHL-F1 (spec §3, first plate, night band): TIGER outlines of the five
//   south-eastern PA counties and New Castle County, DE, with Chester County
//   filled; the Malvern office (orange square), Center City (hollow square) and
//   the drive between them. Camden, Gloucester and Burlington (NJ) are drawn as
//   faint context outlines because the page's coverage sentence names South
//   Jersey; the alt says so.
// PHL-F2 / PHL-F3: the jobs and industries charts, rebuilt as plates from the
//   SAME generated city data the city pipeline uses (client/data/salesforceCities.ts,
//   read here, never typed), so they carry <desc> = alt and keyed rows that
//   cross-highlight the HTML rows beside them. Ids are page-specific on purpose:
//   the legacy salesforce-jobs-philadelphia.svg / philadelphia-largest-industries.svg
//   came from scripts/salesforce-images.mjs (retired 2026-10-23, README.md), and two
//   generators must never write the same file.
//
// Map source: US Census Bureau cartographic boundary file cb_2023_us_county_500k
// (public domain), filtered to the nine GEOIDs below and simplified ONE-OFF with
//   npx mapshaper@0.6.102 -i cb_2023_us_county_500k.shp
//     -filter "['42101','42091','42045','42017','42029','10003','34007','34015','34005'].indexOf(GEOID) > -1"
//     -simplify 12% keep-shapes -o format=geojson precision=0.001
// on 2026-10-23. The simplified lon/lat rings are committed below; nothing is
// fetched or installed at build time. Projection (Web Mercator) and fitting run
// here, so the desktop and -m files come from one set of coordinates.
// ponytail: 12% simplification (about 400 points for nine counties). Ceiling:
// coastlines read slightly angular above ~900px wide. Upgrade path: re-run the
// mapshaper line at 20% and paste the rings; the 40 KB map budget allows it.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { box, wire, text, shape, round, wrap, TYPE } from './_lib.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const citySrc = fs.readFileSync(path.join(root, 'client/data/salesforceCities.ts'), 'utf8')
const CITY = JSON.parse(citySrc.slice(citySrc.indexOf('= [') + 2, citySrc.lastIndexOf('] as const') + 1)).find((c) => c.slug === 'philadelphia')
if (!CITY) throw new Error('philadelphia missing from client/data/salesforceCities.ts')

const n = (v) => Number(v).toLocaleString('en-US')
const longDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/* ============================ PHL-F1: MAP =============================== */

// Office = the LocalBusiness geo in shared/companyProfile.ts (625 Swedesford Rd, Malvern).
// Center City = Philadelphia City Hall (spec 2.18).
const OFFICE = [-75.5771397, 40.0424458]
const CENTER = [-75.1635, 39.9526]

// prettier-ignore
const COUNTIES = [
  { geoid: "34005", name: "Burlington", st: "NJ", rings: [[-74.974,40.048,-75.012,40.021,-75.034,40.015,-75.053,40.005,-75.06,39.992,-75.035,39.996,-75.014,39.98,-75.015,39.947,-74.994,39.939,-74.984,39.927,-74.963,39.92,-74.95,39.898,-74.931,39.886,-74.903,39.791,-74.895,39.783,-74.876,39.781,-74.843,39.79,-74.819,39.788,-74.791,39.771,-74.772,39.75,-74.736,39.73,-74.676,39.692,-74.668,39.684,-74.658,39.657,-74.659,39.631,-74.612,39.623,-74.589,39.612,-74.576,39.598,-74.554,39.598,-74.529,39.57,-74.506,39.57,-74.492,39.556,-74.476,39.551,-74.453,39.557,-74.438,39.551,-74.417,39.557,-74.416,39.57,-74.401,39.572,-74.39,39.596,-74.39,39.773,-74.429,39.845,-74.506,39.991,-74.528,40.037,-74.553,40.079,-74.588,40.138,-74.623,40.143,-74.696,40.183,-74.708,40.182,-74.706,40.162,-74.722,40.15,-74.741,40.135,-74.759,40.134,-74.782,40.121,-74.816,40.128,-74.826,40.124,-74.838,40.101,-74.86,40.085,-74.909,40.07,-74.933,40.069]] },
  { geoid: "34007", name: "Camden", st: "NJ", rings: [[-75.06,39.992,-75.076,39.978,-75.102,39.972,-75.13,39.959,-75.136,39.947,-75.135,39.927,-75.128,39.912,-75.14,39.888,-75.127,39.881,-75.122,39.866,-75.094,39.852,-75.083,39.834,-75.089,39.82,-75.074,39.803,-75.087,39.78,-75.064,39.785,-75.051,39.78,-75.035,39.755,-75.022,39.746,-75.024,39.731,-75,39.72,-74.994,39.71,-74.972,39.702,-74.959,39.703,-74.937,39.695,-74.919,39.678,-74.91,39.663,-74.907,39.641,-74.892,39.619,-74.877,39.608,-74.736,39.73,-74.772,39.75,-74.791,39.771,-74.819,39.788,-74.843,39.79,-74.876,39.781,-74.895,39.783,-74.903,39.791,-74.931,39.886,-74.95,39.898,-74.963,39.92,-74.984,39.927,-74.994,39.939,-75.015,39.947,-75.014,39.98,-75.035,39.996]] },
  { geoid: "34015", name: "Gloucester", st: "NJ", rings: [[-75.405,39.796,-75.408,39.788,-75.397,39.769,-75.403,39.761,-75.377,39.745,-75.377,39.726,-75.327,39.696,-75.295,39.686,-75.287,39.68,-75.268,39.682,-75.251,39.677,-75.245,39.664,-75.233,39.661,-75.2,39.667,-75.062,39.569,-74.985,39.515,-74.877,39.608,-74.892,39.619,-74.907,39.641,-74.91,39.663,-74.919,39.678,-74.937,39.695,-74.959,39.703,-74.972,39.702,-74.994,39.71,-75,39.72,-75.024,39.731,-75.022,39.746,-75.035,39.755,-75.051,39.78,-75.064,39.785,-75.087,39.78,-75.074,39.803,-75.089,39.82,-75.083,39.834,-75.094,39.852,-75.122,39.866,-75.127,39.881,-75.14,39.888,-75.149,39.884,-75.189,39.881,-75.212,39.867,-75.235,39.857,-75.272,39.849,-75.33,39.849,-75.354,39.84,-75.391,39.815,-75.415,39.802]] },
  { geoid: "10003", name: "New Castle", st: "DE", rings: [[-75.789,39.722,-75.789,39.658,-75.781,39.55,-75.767,39.378,-75.76,39.297,-75.715,39.299,-75.685,39.297,-75.675,39.29,-75.654,39.291,-75.62,39.31,-75.607,39.308,-75.575,39.313,-75.569,39.329,-75.556,39.337,-75.557,39.349,-75.536,39.351,-75.512,39.366,-75.516,39.378,-75.539,39.417,-75.572,39.439,-75.589,39.461,-75.593,39.479,-75.588,39.496,-75.572,39.517,-75.563,39.562,-75.612,39.597,-75.615,39.616,-75.587,39.651,-75.562,39.657,-75.509,39.72,-75.49,39.755,-75.469,39.786,-75.423,39.807,-75.454,39.82,-75.499,39.833,-75.539,39.838,-75.58,39.839,-75.593,39.838,-75.595,39.837,-75.642,39.828,-75.663,39.821,-75.701,39.803,-75.727,39.784,-75.753,39.758,-75.774,39.722]] },
  { geoid: "42017", name: "Bucks", st: "PA", rings: [[-75.484,40.418,-75.284,40.298,-75.214,40.257,-75.13,40.206,-75.015,40.138,-74.998,40.128,-74.963,40.115,-74.956,40.095,-74.959,40.083,-74.981,40.066,-74.974,40.048,-74.933,40.069,-74.909,40.07,-74.86,40.085,-74.838,40.101,-74.826,40.124,-74.816,40.128,-74.782,40.121,-74.759,40.134,-74.741,40.135,-74.722,40.15,-74.734,40.175,-74.756,40.187,-74.772,40.215,-74.795,40.229,-74.842,40.251,-74.868,40.295,-74.887,40.31,-74.908,40.317,-74.943,40.342,-74.949,40.365,-74.964,40.395,-74.996,40.411,-75.025,40.403,-75.059,40.418,-75.071,40.455,-75.063,40.482,-75.065,40.526,-75.069,40.542,-75.1,40.568,-75.137,40.576,-75.158,40.565,-75.175,40.565,-75.194,40.576,-75.19,40.592,-75.197,40.609,-75.258,40.582,-75.334,40.537,-75.41,40.488]] },
  { geoid: "42091", name: "Montgomery", st: "PA", rings: [[-75.53,40.447,-75.586,40.378,-75.697,40.242,-75.686,40.237,-75.671,40.245,-75.651,40.242,-75.62,40.23,-75.597,40.237,-75.588,40.214,-75.573,40.195,-75.558,40.208,-75.541,40.176,-75.529,40.169,-75.527,40.15,-75.494,40.126,-75.462,40.125,-75.469,40.107,-75.456,40.088,-75.42,40.097,-75.393,40.061,-75.367,40.072,-75.361,40.066,-75.321,40.016,-75.311,40.02,-75.276,39.977,-75.206,40.012,-75.232,40.028,-75.264,40.054,-75.224,40.093,-75.188,40.073,-75.176,40.085,-75.109,40.046,-75.087,40.064,-75.097,40.069,-75.058,40.106,-75.015,40.138,-75.13,40.206,-75.214,40.257,-75.284,40.298,-75.484,40.418]] },
  { geoid: "42045", name: "Delaware", st: "PA", rings: [[-75.361,40.066,-75.415,40.042,-75.404,40.027,-75.454,39.994,-75.436,39.985,-75.524,39.944,-75.519,39.934,-75.543,39.927,-75.546,39.91,-75.573,39.896,-75.571,39.888,-75.598,39.874,-75.602,39.856,-75.592,39.853,-75.595,39.837,-75.593,39.838,-75.58,39.839,-75.539,39.838,-75.499,39.833,-75.454,39.82,-75.423,39.807,-75.415,39.802,-75.391,39.815,-75.354,39.84,-75.33,39.849,-75.272,39.849,-75.235,39.857,-75.212,39.867,-75.22,39.875,-75.263,39.877,-75.265,39.887,-75.247,39.914,-75.24,39.942,-75.252,39.952,-75.248,39.964,-75.265,39.965,-75.276,39.977,-75.311,40.02,-75.321,40.016]] },
  { geoid: "42101", name: "Philadelphia", st: "PA", rings: [[-75.276,39.977,-75.265,39.965,-75.248,39.964,-75.252,39.952,-75.24,39.942,-75.247,39.914,-75.265,39.887,-75.263,39.877,-75.22,39.875,-75.212,39.867,-75.189,39.881,-75.149,39.884,-75.14,39.888,-75.128,39.912,-75.135,39.927,-75.136,39.947,-75.13,39.959,-75.102,39.972,-75.076,39.978,-75.06,39.992,-75.053,40.005,-75.034,40.015,-75.012,40.021,-74.974,40.048,-74.981,40.066,-74.959,40.083,-74.956,40.095,-74.963,40.115,-74.998,40.128,-75.015,40.138,-75.058,40.106,-75.097,40.069,-75.087,40.064,-75.109,40.046,-75.176,40.085,-75.188,40.073,-75.224,40.093,-75.264,40.054,-75.232,40.028,-75.206,40.012]] },
  { geoid: "42029", name: "Chester", st: "PA", rings: [[-75.873,40.137,-75.943,40.109,-75.936,40.079,-75.936,40.037,-75.987,39.967,-75.995,39.952,-75.981,39.933,-75.997,39.922,-75.998,39.91,-75.987,39.892,-76.004,39.873,-76.007,39.854,-76.02,39.854,-76.023,39.831,-76.05,39.784,-76.058,39.78,-76.067,39.76,-76.082,39.761,-76.084,39.748,-76.102,39.74,-76.102,39.724,-76.134,39.727,-76.136,39.722,-75.999,39.722,-75.789,39.722,-75.774,39.722,-75.753,39.758,-75.727,39.784,-75.701,39.803,-75.663,39.821,-75.642,39.828,-75.595,39.837,-75.592,39.853,-75.602,39.856,-75.598,39.874,-75.571,39.888,-75.573,39.896,-75.546,39.91,-75.543,39.927,-75.519,39.934,-75.524,39.944,-75.436,39.985,-75.454,39.994,-75.404,40.027,-75.415,40.042,-75.361,40.066,-75.367,40.072,-75.393,40.061,-75.42,40.097,-75.456,40.088,-75.469,40.107,-75.462,40.125,-75.494,40.126,-75.527,40.15,-75.529,40.169,-75.541,40.176,-75.558,40.208,-75.573,40.195,-75.588,40.214,-75.597,40.237,-75.62,40.23,-75.651,40.242,-75.671,40.245,-75.686,40.237,-75.697,40.242,-75.743,40.217]] },
]
const CONTEXT = new Set(['NJ']) // drawn faint, not part of the named coverage area

// County tags, placed by hand at a clear spot inside each county (lon, lat).
const TAGS = [
  { t: 'CHESTER', at: [-75.9, 39.9] },
  { t: 'MONTGOMERY', at: [-75.36, 40.27] },
  { t: 'BUCKS', at: [-75.1, 40.36] },
  { t: 'DELAWARE', at: [-75.43, 39.885] },
  { t: 'PHILADELPHIA', at: [-75.04, 40.075] },
  { t: 'NEW CASTLE, DE', at: [-75.64, 39.69] },
  { t: 'NEW JERSEY', at: [-74.93, 39.71] },
]

const ROUTE_LABEL = 'about 25 miles by road'

const rad = (d) => (d * Math.PI) / 180
const merc = ([lon, lat]) => [rad(lon), Math.log(Math.tan(Math.PI / 4 + rad(lat) / 2))]
// The window every variant must show: Chester's west edge to the river opposite
// Bucks, northern Montgomery to just below Wilmington. Extra box area shows more
// context; Bucks runs off the top edge, which a map frame is allowed to do.
const VIEW = { w: -76.14, e: -74.8, s: 39.66, n: 40.46 }

function projector(W, H, pad) {
  const [x0, y0] = merc([VIEW.w, VIEW.s])
  const [x1, y1] = merc([VIEW.e, VIEW.n])
  const k = Math.min((W - 2 * pad) / (x1 - x0), (H - 2 * pad) / (y1 - y0))
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  return (ll) => {
    const [x, y] = merc(ll)
    return [round(W / 2 + (x - cx) * k), round(H / 2 - (y - cy) * k)]
  }
}

const ringPath = (p, ring) => {
  const pts = []
  for (let i = 0; i < ring.length; i += 2) pts.push(p([ring[i], ring[i + 1]]))
  return 'M' + pts.map(([x, y]) => `${x} ${y}`).join('L') + 'Z'
}

/** A square marker drawn above the wires (nodes render after wires). Not keyed. */
const marker = ([x, y], s, fill) => ({ node: null, x: round(x - s / 2), y: round(y - s / 2), w: s, h: s, need: 0, fill, texts: [] })

function mapVariant(variant) {
  const mobile = variant === 'mobile'
  const t = TYPE[variant]
  const W = mobile ? 640 : 560
  const H = mobile ? 600 : 480
  const p = projector(W, H, mobile ? 16 : 12)
  const items = []
  for (const c of COUNTIES) {
    const faint = CONTEXT.has(c.st)
    const d = c.rings.map((r) => ringPath(p, r)).join('')
    // Chester (ours) is tinted and outlined in the signal colour; the rest are hairlines.
    const ours = c.geoid === '42029'
    items.push(shape({ d, fill: ours ? 'rgba(255,166,52,.12)' : 'none', stroke: ours ? 'signal' : 'ink3', width: faint ? 1 : mobile ? 2 : 1.25, opacity: faint ? 0.45 : ours ? 1 : 0.9 }))
  }
  // A text "halo": a ground-coloured rect under a label so outlines never run
  // through the letters. Shapes draw in order, so it covers the counties only.
  const halo = (x, y, w, size) => items.push(shape({ rect: [round(x - 3), round(y - size * 0.95), round(w + 6), round(size * 1.3)], fill: 'bg' }))
  for (const g of TAGS) {
    const [x, y] = p(g.at)
    const w = g.t.length * t.tag * 0.6
    if (g.t !== 'CHESTER') halo(x - w / 2, y, w, t.tag) // Chester's tag sits on the tint, clear of lines
    items.push(text(g.t, x, y, { size: t.tag, mono: true, fill: g.t === 'CHESTER' ? 'ink2' : 'ink3', anchor: 'middle' }))
  }
  const o = p(OFFICE)
  const c = p(CENTER)
  const m = mobile ? 22 : 14
  // The drive, as a dashed wire between the two squares. Its label sits above
  // the line's left half, where the line is lowest relative to the text.
  items.push(wire('route', [[o[0] + m / 2, o[1]], [c[0] - m / 2, c[1]]], { dashed: true }))
  // Phone: two lines, so the label stays clear of the PHILADELPHIA tag.
  const rs = mobile ? t.tag + 2 : t.label - 2
  const rx = round(o[0] + m / 2 + 6)
  const routeLines = mobile ? ['about 25 miles', 'by road'] : [ROUTE_LABEL]
  routeLines.forEach((line, i) => {
    const ry = round(o[1] - (mobile ? 18 : 12) - (routeLines.length - 1 - i) * rs * 1.25)
    halo(rx, ry, line.length * rs * 0.53, rs)
    items.push(text(line, rx, ry, { size: rs, fill: 'ink2' }))
  })
  // Label boxes sit in the empty corners of the frame (Berks/Lancaster top-left,
  // Camden/Gloucester bottom-right) so no county outline hides under them, and
  // join their squares with orthogonal leaders, like the diagram plates.
  const pad = mobile ? 14 : 10
  const edge = mobile ? 16 : 20
  const office = box({
    k: 'office', x: edge, y: edge, w: mobile ? 236 : 172, pad, fill: 'bg',
    lines: [
      { t: 'OneAlgorithm', size: t.title, weight: 600 },
      { t: '625 SWEDESFORD RD', size: t.tag, mono: true, fill: 'ink3', gap: mobile ? 8 : 6 },
      { t: 'MALVERN, PA', size: t.tag, mono: true, fill: 'ink3', gap: mobile ? 2 : 1 },
    ],
  })
  const oy = round(office.y + office.h / 2)
  items.push(wire(null, [[o[0], o[1] - m / 2], [o[0], oy], [office.x + office.w, oy]]))
  const cw = mobile ? 196 : 128
  const centerLines = [{ t: 'Center City', size: t.title, weight: 600 }]
  const ch = box({ x: 0, y: 0, w: cw, pad, lines: centerLines }).need
  const center = box({ k: 'center', x: W - edge - cw, y: round(c[1] + m / 2 + (mobile ? 34 : 26)), w: cw, h: ch, pad, fill: 'bg', lines: centerLines })
  const cy = round(center.y + ch / 2)
  items.push(wire(null, [[c[0], c[1] + m / 2], [c[0], cy], [center.x, cy]]))
  items.push(office, center, marker(o, m, 'signal'), marker(c, m, 'bg'))
  return { w: W, h: H, items }
}

/* ===================== PHL-F2 / F3: BAR PLATES ========================= */

/**
 * Horizontal bars with a radius-0 label box per row. The box is the keyed node,
 * so hovering the matching HTML row outlines it (desktop overlay). Desktop:
 * label box left, bar right. Phone (-m): label box above its bar.
 */
function barsVariant(variant, rows, { labelW }) {
  const mobile = variant === 'mobile'
  const t = TYPE[variant]
  const W = 640
  const X = 24
  const max = Math.max(...rows.map((r) => r.value))
  const items = []
  if (!mobile) {
    const pad = 12
    const draft = rows.map((r) => box({ k: r.k, x: X, y: 0, w: labelW, pad, lines: [{ t: r.label, size: t.label, fill: 'ink' }] }))
    const rowH = Math.max(...draft.map((b) => b.need))
    const gap = 14
    const barX = X + labelW + 16
    const valW = 96
    const barMax = W - barX - valW - 16
    let y = 24
    for (const r of rows) {
      const b = box({ k: r.k, x: X, y, w: labelW, h: rowH, pad, lines: [{ t: r.label, size: t.label, fill: 'ink' }] })
      // Centre the label vertically when a neighbour's label needed more lines.
      const dy = round((rowH - b.need) / 2)
      for (const tx of b.texts) tx.y = round(tx.y + dy)
      const bw = Math.max(4, round((r.value / max) * barMax))
      const by = round(y + rowH / 2 - 11)
      items.push(shape({ rect: [barX, by, bw, 22], fill: 'signal' }), b)
      items.push(text(n(r.value), barX + bw + 10, round(by + 16.5), { size: t.label, mono: true, fill: 'ink' }))
      y += rowH + gap
    }
    return { w: W, h: round(y - gap + 24), items }
  }
  // Phone: no overlay below 1024px, so plain labels above full-width bars.
  const barH = 30
  const valW = 150
  const barMax = W - 2 * X - valW
  let y = 24
  for (const r of rows) {
    const lines = wrap(r.label, W - 2 * X, t.label)
    lines.forEach((l, i) => items.push(text(l, X, round(y + t.label + i * t.label * t.lead), { size: t.label, fill: 'ink2' })))
    const bw = Math.max(6, round((r.value / max) * barMax))
    const by = round(y + t.label + (lines.length - 1) * t.label * t.lead + 14)
    items.push(shape({ rect: [X, by, bw, barH], fill: 'signal' }))
    items.push(text(n(r.value), X + bw + 14, round(by + barH / 2 + t.label * 0.36), { size: t.label, mono: true, fill: 'ink' }))
    y = by + barH + 34
  }
  return { w: W, h: round(y - 34 + 24), items }
}

/** Row keys shared with the page: role → "consultant", NAICS "31-33" → "naics-31-33". */
const roleKey = (role) => role.replace(/^Salesforce /, '').toLowerCase()
const ROLES = [...CITY.jobs].sort((a, b) => b.count - a.count).map((j) => ({ k: roleKey(j.role), label: j.role.replace(/^Salesforce /, ''), value: j.count }))
const INDUSTRIES = CITY.industries.map((i) => ({ k: `naics-${i.code}`, label: cap(i.label), value: i.employees }))

export default [
  {
    id: 'philadelphia-region-map-malvern',
    title: "Philadelphia region: OneAlgorithm's Malvern office and Center City",
    alt: "Map of Philadelphia, Montgomery, Delaware, Bucks and Chester counties and New Castle County, Delaware, with Camden, Gloucester and Burlington counties in New Jersey outlined across the river, marking OneAlgorithm's office in Malvern, Chester County, about 25 miles by road west of Center City Philadelphia.",
    tone: 'night',
    og: 'og-salesforce-philadelphia',
    desktop: mapVariant('desktop'),
    mobile: mapVariant('mobile'),
  },
  {
    id: 'philadelphia-salesforce-roles',
    title: `Open Salesforce roles within 25 miles of Philadelphia, ${longDate(CITY.jobsPulled)}`,
    alt: `Bar chart of open Salesforce roles within 25 miles of Philadelphia on ${longDate(CITY.jobsPulled)}: ${ROLES.map((r) => `${r.label} ${n(r.value)}`).join(', ')}. Source: LinkedIn public job search, one search per role title; the searches overlap, so the counts are not added together.`,
    tone: 'light',
    desktop: barsVariant('desktop', ROLES, { labelW: 190 }),
    mobile: barsVariant('mobile', ROLES, {}),
  },
  {
    id: 'philadelphia-largest-employer-groups',
    title: 'Largest employer groups, Philadelphia metro, by employees (Census CBP 2023)',
    alt: `Bar chart of the largest employer groups in the Philadelphia metro by employees: ${CITY.industries.map((i) => `${i.label} ${n(i.employees)}`).join('; ')}. Source: US Census Bureau, County Business Patterns 2023.`,
    tone: 'light',
    desktop: barsVariant('desktop', INDUSTRIES, { labelW: 250 }),
    mobile: barsVariant('mobile', INDUSTRIES, {}),
  },
]
