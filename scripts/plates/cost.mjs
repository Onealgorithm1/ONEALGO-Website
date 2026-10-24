// Plates for /services/salesforce-implementation-cost. Convention: top of scripts/plates.mjs.
//
// COST-F1 (first plate): the four published guides' ranges, one panel per band,
//   each panel on its own linear $ axis. Rows are keyed by source, so the
//   page's four-source table cross-highlights every bar from that guide.
// COST-F2: Girikon's seven cost ranges by part of the work (keyed p1..p7, the
//   same keys as the page's phase table).
//
// ⛔ Every figure here is a PUBLISHED MARKET FIGURE, copied from the guide named
// on its row and re-read on 23 October 2026. None is a OneAlgorithm price. The
// same figures are in client/pages/services/SalesforceImplementationCost.tsx
// (SOURCES and PHASES). ponytail: they are typed twice because a page may not
// import a script and the generated .ts carries only geometry and alt. Ceiling:
// two places to edit when a guide changes. Upgrade path: emit the rows into the
// generated file from tsFile() if a third copy ever appears. The alt text is
// generated from these rows, so the image and its description cannot disagree.
//
// Self-check: every label must fit inside the plot. The builders below THROW at
// generation time if a range label would run past the right edge, so a changed
// figure can never ship as clipped text.
import { wire, text, shape, round, wrap } from './_lib.mjs'

export const SOURCES = [
  { k: 'cynoteck', name: 'Cynoteck', small: [10000, 50000], mid: [75000, 250000], ent: [150000, 500000, true] },
  { k: 'brainspate', name: 'BrainSpate', small: [15000, 50000], mid: [50000, 150000], ent: [150000, 500000, true] },
  { k: 'groviya', name: 'Groviya', small: [15000, 50000], mid: [50000, 250000], ent: [250000, 1000000, true] },
  { k: 'amchase', name: 'American Chase', small: [15000, 50000], mid: [50000, 150000], ent: [150000, 500000, true] },
]
const BANDS = [
  { key: 'small', title: 'Small business', max: 60000, ticks: [0, 20000, 40000, 60000], mticks: [0, 30000, 60000] },
  { key: 'mid', title: 'Mid-market', max: 300000, ticks: [0, 100000, 200000, 300000], mticks: [0, 150000, 300000] },
  { key: 'ent', title: 'Enterprise', max: 1250000, ticks: [0, 250000, 500000, 750000, 1000000, 1250000], mticks: [0, 500000, 1000000, 1250000] },
]
export const PHASES = [
  { k: 'p1', label: 'Discovery & Planning', lo: 5000, hi: 15000 },
  { k: 'p2', label: 'System Configuration & Setup', lo: 15000, hi: 50000 },
  { k: 'p3', label: 'Customization & Development', lo: 10000, hi: 60000, open: true },
  { k: 'p4', label: 'Data Migration', lo: 8000, hi: 30000 },
  { k: 'p5', label: 'Integrations', lo: 10000, hi: 40000 },
  { k: 'p6', label: 'User Training & Change Management', lo: 5000, hi: 20000 },
  { k: 'p7', label: 'Testing, Deployment & Support', lo: 10000, hi: 35000 },
]
const PHASE_AXIS = { max: 70000, ticks: [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000] }

const full = (v) => '$' + v.toLocaleString('en-US')
const short = (v) => (v >= 1e6 ? `$${v / 1e6}M` : `$${v / 1000}K`)
const words = (v) => '$' + v.toLocaleString('en-US')
const range = (lo, hi, open, f) => `${f(lo)}–${f(hi)}${open ? '+' : ''}`
// Same glyph-advance estimate as _lib.mjs (0.53em Plex, 0.6em mono).
const width = (s, size, mono) => s.length * size * (mono ? 0.6 : 0.53)

/** One range: a tinted bar body, the wire on top (overlay trace), square end
 *  caps, and a chevron instead of a cap when the range is open-ended. */
function bar(k, x1, x2, y, { body = 8, cap = 6, chevron = 7 } = {}) {
  const items = [shape({ rect: [round(x1), round(y - body / 2), round(x2 - x1), body], fill: 'signal', opacity: 0.14 })]
  items.push(wire(k, [[x1, y], [x2, y]]))
  return { items, cap: (x) => shape({ rect: [round(x - cap / 2), round(y - cap / 2), cap, cap], fill: 'node' }), chev: (x) => wire(k, [[x - chevron, y - chevron], [x, y], [x - chevron, y + chevron]]) }
}

function axis({ x, w, y, top, max, ticks, size, f }) {
  const sx = (v) => x + (v / max) * w
  const items = [shape({ d: `M${round(x)} ${round(y)} L${round(x + w)} ${round(y)}`, stroke: 'line', width: 1 })]
  for (const t of ticks) {
    items.push(shape({ d: `M${round(sx(t))} ${round(top)} L${round(sx(t))} ${round(y)}`, stroke: 'line', width: 1 }))
    const anchor = t === 0 ? 'start' : t === max ? 'end' : 'middle'
    items.push(text(f(t), round(sx(t)), round(y + size + 6), { size, mono: true, fill: 'ink3', anchor }))
  }
  return items
}

/** Desktop COST-F1: label column on the left, value to the right of each bar. */
function rangesDesktop() {
  const W = 1136, x = 32, labelW = 150, right = W - 32
  const plotX = x + labelW, plotW = right - plotX
  const rowH = 32, size = 16, val = 14
  const items = [text('MARKET RANGES BEFORE LICENSES · FOUR PUBLISHED GUIDES · NOT ONEALGORITHM PRICES', x, 36, { size: 12, mono: true, fill: 'ink3' })]
  let cy = 64
  for (const b of BANDS) {
    items.push(text(b.title, x, cy + 17, { size: 17, weight: 600 }))
    cy += 17 + 14
    const top = cy
    const sx = (v) => plotX + (v / b.max) * plotW
    for (const s of SOURCES) {
      const [lo, hi, open] = s[b.key]
      const my = cy + rowH / 2
      const label = range(lo, hi, open, full)
      if (sx(hi) + 14 + width(label, val, true) > right) throw new Error(`cost F1: "${label}" overflows the ${b.title} panel; raise its max`)
      items.push(text(s.name, plotX - 16, round(my + size * 0.35), { size, fill: 'ink2', anchor: 'end' }))
      const r = bar(s.k, sx(lo), sx(hi), my)
      items.push(...r.items, r.cap(sx(lo)), open ? r.chev(sx(hi)) : r.cap(sx(hi)))
      items.push(text(label, round(sx(hi) + 14), round(my + val * 0.35), { size: val, mono: true, fill: 'ink2' }))
      cy += rowH
    }
    items.push(...axis({ x: plotX, w: plotW, y: cy + 4, top, max: b.max, ticks: b.ticks, size: 12, f: (v) => (v ? short(v) : '$0') }))
    cy += 4 + 12 + 6 + 30
  }
  return { w: W, h: Math.ceil(cy - 8), items }
}

/** Stacked rows (phone files, and the narrow desktop COST-F2): label left and
 *  value right on one line, the bar full width underneath. */
function stacked({ W, rows, max, ticks, head, t, f, titleSize }) {
  const x = 32, right = W - 32, plotW = right - x
  const items = []
  let cy = 24
  for (const line of head) {
    cy += t.tag
    items.push(text(line, x, cy, { size: t.tag, mono: true, fill: 'ink3' }))
    cy += t.tag * 0.5
  }
  cy += t.tag
  const groups = rows[0]?.group ? rows : [{ rows }]
  for (const g of groups) {
    if (g.group) {
      cy += titleSize
      items.push(text(g.group, x, cy, { size: titleSize, weight: 600 }))
      cy += titleSize * 0.6
    }
    const gx = g.max ?? max
    const gsx = (v) => x + (v / gx) * plotW
    for (const r of g.rows) {
      const value = range(r.lo, r.hi, r.open, f)
      // A long label wraps under itself; the value stays on the first line.
      const lines = wrap(r.label, plotW - 24 - width(value, t.value, true), t.label)
      if (lines.some((l) => width(l, t.label) + 24 + width(value, t.value, true) > plotW)) throw new Error(`cost plate: "${r.label}" + "${value}" do not fit at ${W}u`)
      lines.forEach((l, i) => {
        cy += i ? t.label * 1.25 : t.label
        items.push(text(l, x, round(cy), { size: t.label, fill: 'ink2' }))
        if (!i) items.push(text(value, right, round(cy), { size: t.value, mono: true, fill: 'ink', anchor: 'end' }))
      })
      cy += t.barGap
      const b = bar(r.k, gsx(r.lo), gsx(r.hi), cy, t.bar)
      items.push(...b.items, b.cap(gsx(r.lo)), r.open ? b.chev(gsx(r.hi)) : b.cap(gsx(r.hi)))
      cy += t.rowGap
    }
    const ay = cy - t.rowGap / 2 + 4
    items.push(...axis({ x, w: plotW, y: ay, top: ay - t.tick / 2, max: gx, ticks: g.ticks ?? ticks, size: t.tick, f: (v) => (v ? short(v) : '$0') }))
    cy += t.tick + 32
  }
  return { w: W, h: Math.ceil(cy), items }
}

const PHONE = { tag: 20, label: 26, value: 24, tick: 18, barGap: 22, rowGap: 34, bar: { body: 12, cap: 10, chevron: 10 } }
const NARROW = { tag: 12, label: 16, value: 15, tick: 12, barGap: 14, rowGap: 24, bar: { body: 8, cap: 6, chevron: 7 } }

const rangesMobile = () =>
  stacked({
    W: 640,
    head: ['MARKET RANGES BEFORE LICENSES', 'NOT ONEALGORITHM PRICES'],
    rows: BANDS.map((b) => ({
      group: b.title, max: b.max, ticks: b.mticks,
      rows: SOURCES.map((s) => ({ k: s.k, label: s.name, lo: s[b.key][0], hi: s[b.key][1], open: s[b.key][2] })),
    })),
    t: PHONE, f: short, titleSize: 28,
  })

const phaseRows = PHASES.map((p) => ({ k: p.k, label: p.label, lo: p.lo, hi: p.hi, open: p.open }))
const phasesDesktop = () =>
  stacked({ W: 720, rows: phaseRows, max: PHASE_AXIS.max, ticks: PHASE_AXIS.ticks, head: ["GIRIKON'S PUBLISHED RANGES BY PART OF THE WORK · NOT ONEALGORITHM PRICES"], t: NARROW, f: full, titleSize: 17 })
const phasesMobile = () =>
  stacked({ W: 640, rows: phaseRows, max: PHASE_AXIS.max, ticks: [0, 35000, 70000], head: ["GIRIKON'S PUBLISHED RANGES", 'NOT ONEALGORITHM PRICES'], t: PHONE, f: short, titleSize: 28 })

const spell = (lo, hi, open) => `${words(lo)} to ${words(hi)}${open ? ' or more' : ''}`
const bandAlt = (b) => {
  const groups = new Map()
  for (const s of SOURCES) {
    const key = spell(...s[b.key])
    groups.set(key, [...(groups.get(key) ?? []), s.name])
  }
  const and = (a) => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a.at(-1)}` : a[0])
  return `${b.title}: ${[...groups].map(([r, n]) => `${r} (${and(n)})`).join(', ')}.`
}

export default [
  {
    id: 'salesforce-implementation-cost-ranges',
    title: 'Published Salesforce implementation cost ranges, by company size',
    alt: `Range chart of published Salesforce implementation costs before licenses, from four guides checked 23 October 2026. ${BANDS.map(bandAlt).join(' ')} These are market figures, not OneAlgorithm prices.`,
    tone: 'light',
    og: 'og-salesforce-implementation-cost',
    desktop: rangesDesktop(),
    mobile: rangesMobile(),
  },
  {
    id: 'salesforce-implementation-cost-by-phase',
    title: "Salesforce implementation cost by part of the work, from Girikon's guide",
    alt: `Range chart of Salesforce implementation cost by part of the work, from Girikon's guide (published 21 January 2026, updated 25 June 2026): ${PHASES.map((p) => `${p.label.replace(/&/g, 'and').toLowerCase()} ${spell(p.lo, p.hi, p.open)}`).join('; ')}. Not a OneAlgorithm price.`,
    tone: 'light',
    desktop: phasesDesktop(),
    mobile: phasesMobile(),
  },
]
