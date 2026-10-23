// Drawing helpers for per-page plate specs (scripts/plates/<page>.mjs).
// Read the convention at the top of scripts/plates.mjs first.
//
// Every helper returns plain draw items; the generator turns them into SVG.
// Coordinates are SVG user units in the variant's own box (desktop 1136 wide,
// phone "-m" 640 wide unless the spec says otherwise).

/** Type scale per variant (spec 2.18): desktop labels Plex 16-17u, mono tags
 *  12u; the -m file is shown ~0.55x on a phone, so 26-28u labels, 20u tags. */
export const TYPE = {
  desktop: { label: 16, title: 17, tag: 12, lead: 1.4 },
  mobile: { label: 26, title: 28, tag: 20, lead: 1.3 },
}

/* ponytail: width is estimated from an average glyph advance (0.53em Plex,
   0.6em mono) instead of measured. Ceiling: a line of wide capitals can run
   ~10% over and touch a node edge. Upgrade path: measure with the subset font
   (opentype.js or the browser) if a plate ever clips; plates-check does not
   catch it, so look at the -m file at 390px. */
const advance = (size, mono) => size * (mono ? 0.6 : 0.53)

/** Greedy word wrap to a pixel width. */
export function wrap(text, width, size, mono = false) {
  const max = Math.max(1, Math.floor(width / advance(size, mono)))
  const out = []
  let line = ''
  for (const word of String(text).split(/\s+/)) {
    if (!line) line = word
    else if ((line + ' ' + word).length <= max) line += ' ' + word
    else { out.push(line); line = word }
  }
  if (line) out.push(line)
  return out
}

/**
 * A radius-0 node with stacked, wrapped text. Returns one draw item whose `h`
 * is computed from the text unless `h` is given (use the max of a row's
 * heights to align a row). `k` makes it an overlay node (cross-highlight).
 *   box({ k: 's1', x: 32, y: 56, w: 230, lines: [
 *     { t: '01', size: 12, mono: true, fill: 'ink3' },
 *     { t: 'Before you buy licenses', size: 17, weight: 600, gap: 6 },
 *     { t: 'A license count and a rough cost, before anyone signs', size: 16, fill: 'ink2', gap: 10 } ] })
 */
export function box({ k, x, y, w, h, pad = 16, lines, fill = 'bg' }) {
  const texts = []
  let cy = y + pad
  for (const l of lines) {
    const size = l.size ?? 16
    cy += l.gap ?? 0
    for (const t of wrap(l.t, w - pad * 2, size, l.mono)) {
      cy += size
      texts.push({ text: t, x: x + pad, y: cy, size, weight: l.weight, mono: l.mono, fill: l.fill ?? 'ink' })
      cy += size * ((l.lead ?? 1.4) - 1)
    }
  }
  const need = Math.ceil(cy - y + pad)
  return { node: k ?? null, x, y, w, h: h ?? need, need, fill, texts }
}

/** A connector. `pts` is a polyline; `k` keys it to rows/legend (overlay trace).
 *  Wires sharing a `k` draw and highlight together. */
export function wire(k, pts, { dashed = false } = {}) {
  return { wire: k ?? null, d: 'M' + pts.map(([x, y]) => `${round(x)} ${round(y)}`).join(' L'), dashed }
}

/** Free text. `anchor`: start | middle | end. `fill`: ink | ink2 | ink3 | signal. */
export function text(t, x, y, { size = 16, weight, mono = false, fill = 'ink', anchor = 'start' } = {}) {
  return { text: t, x, y, size, weight, mono, fill, anchor }
}

/** A plain filled/stroked shape, for bars and map outlines (already-simplified
 *  path data committed in the spec file; nothing is fetched at build time). */
export function shape({ d, rect, fill = 'none', stroke = 'none', width = 1, opacity, k }) {
  return { shape: true, d, rect, fill, stroke, width, opacity, k: k ?? null }
}

export const round = (n) => Math.round(n * 10) / 10

/** Stack boxes vertically (phone layouts): returns boxes with y filled in and
 *  the total bottom. */
export function column(specs, { x, w, y = 32, gap = 48 }) {
  const out = []
  let cy = y
  for (const s of specs) {
    const b = box({ ...s, x, y: cy, w })
    out.push(b)
    cy += b.h + gap
  }
  return { boxes: out, bottom: cy - gap }
}

/**
 * Range chart rows (COST-F1): one panel per band, each with its OWN linear
 * axis, one bar per source. Values come from the page's sourced data only.
 *   rangeBars({ x: 32, y: 40, w: 1072, labelW: 220, panels: [
 *     { title: 'Small business', max: 60000, rows: [{ k: 'cynoteck', label: 'Cynoteck', lo: 10000, hi: 50000 }] }] })
 * `open: true` on a row = an open-ended range ("or more"): it ends in a chevron.
 * Returns { items, bottom }.
 */
export function rangeBars({ x, y, w, labelW, panels, size = 16, rowH = 34, money = (v) => '$' + v.toLocaleString('en-US') }) {
  const items = []
  let cy = y
  const plotX = x + labelW
  const plotW = w - labelW - 8
  for (const p of panels) {
    items.push(text(p.title, x, cy + size, { size: size + 1, weight: 600 }))
    cy += size + 14
    const sx = (v) => plotX + (v / p.max) * plotW
    for (const r of p.rows) {
      const my = cy + rowH / 2
      items.push(text(r.label, plotX - 12, my + size * 0.35, { size, fill: 'ink2', anchor: 'end' }))
      items.push(wire(r.k, [[sx(r.lo), my], [sx(r.hi), my]]))
      items.push(shape({ rect: [sx(r.lo) - 3, my - 3, 6, 6], fill: 'node' }))
      if (r.open) items.push(wire(r.k, [[sx(r.hi) - 7, my - 7], [sx(r.hi), my], [sx(r.hi) - 7, my + 7]]))
      else items.push(shape({ rect: [sx(r.hi) - 3, my - 3, 6, 6], fill: 'node' }))
      const label = `${money(r.lo)} to ${money(r.hi)}${r.open ? ' or more' : ''}`
      items.push(text(label, Math.min(sx(r.hi) + 12, x + w), my + size * 0.35, { size: size - 2, mono: true, fill: 'ink3', anchor: sx(r.hi) + 12 > x + w - 200 ? 'end' : 'start' }))
      cy += rowH
    }
    cy += 22
  }
  return { items, bottom: cy }
}

/**
 * Slope chart (CITY-F2): one line per series from a 2018 value to a 2023 value,
 * values labelled at both ends, % change in mono. Each series has its own
 * vertical scale (they differ by orders of magnitude), so lines read as
 * direction and size of change, not as comparable heights.
 *   slope({ x: 40, y: 60, w: 560, h: 260, from: '2018', to: '2023',
 *     series: [{ k: 'all', label: 'All establishments', a: 562802, b: 580000 }] })
 */
export function slope({ x, y, w, h, from, to, series, size = 16 }) {
  const items = [
    text(from, x, y - 12, { size, mono: true, fill: 'ink3' }),
    text(to, x + w, y - 12, { size, mono: true, fill: 'ink3', anchor: 'end' }),
    shape({ d: `M${x} ${y} L${x} ${y + h} M${x + w} ${y} L${x + w} ${y + h}`, stroke: 'line', width: 1 }),
  ]
  const lane = h / series.length
  series.forEach((s, i) => {
    const top = y + i * lane + 18
    const span = lane - 36
    const lo = Math.min(s.a, s.b)
    const hi = Math.max(s.a, s.b)
    const sy = (v) => (hi === lo ? top + span / 2 : top + span - ((v - lo) / (hi - lo)) * span)
    const pct = ((s.b - s.a) / s.a) * 100
    items.push(wire(s.k, [[x, sy(s.a)], [x + w, sy(s.b)]]))
    items.push(text(s.a.toLocaleString('en-US'), x + 10, sy(s.a) - 8, { size, mono: true }))
    items.push(text(s.b.toLocaleString('en-US'), x + w - 10, sy(s.b) - 8, { size, mono: true, anchor: 'end' }))
    items.push(text(`${s.label} · ${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`, x + w / 2, top + span + 14, { size: size - 2, mono: true, fill: 'ink3', anchor: 'middle' }))
  })
  return { items, bottom: y + h }
}
