// Plates for /services/salesforce-health-check. See the convention in scripts/plates.mjs.
//
// HC-F1 (first plate, night): the retirement timeline for the "Why now" band.
//   Dates are the ones the page already cites (Salesforce Help 001096524 for
//   Workflow Rules / Process Builder; Salesforce's Optimizer retirement notice
//   on the Trailblazer Community), checked 2026-10-23. Desktop places each
//   marker on a proportional Oct 2025 - Oct 2026 axis; release markers sit at
//   the month the release reached production (Winter '26: Oct 2025; Summer
//   '26: Jun 2026, per salesforce.com/releases "Summer in June, Winter in
//   October"). The phone file drops the month ticks and keeps the order, so
//   no position there implies a date; each box carries its own date tag.
// HC-F2 (light): the five areas the week covers feed one written list.
//   ⛔ The five bars carry an area tag only: no finding, figure or severity is
//   invented. Equal bar widths on purpose (a width would read as a measurement).
import { box, wire, text, shape, column, round, TYPE } from './_lib.mjs'

/* ------------------------------ HC-F1 ---------------------------------- */

const EVENTS = [
  { k: 'opt1', t: 0.03, tag: "WINTER '26 RELEASE", title: 'Optimizer retired for Hyperforce orgs' },
  { k: 'wr', t: 91 / 365, tag: '31 DEC 2025', title: 'Workflow Rules and Process Builder: end of support' },
  { k: 'opt2', t: 255 / 365, tag: "SUMMER '26 RELEASE", title: 'Optimizer retired for all other orgs' },
]
const TICKS = [
  { t: 0, l: 'OCT 2025' },
  { t: 92 / 365, l: 'JAN 2026' },
  { t: 182 / 365, l: 'APR 2026' },
  { t: 273 / 365, l: 'JUL 2026' },
  { t: 1, l: 'OCT 2026' },
]
const evLines = (e, t) => [
  { t: e.tag, size: t.tag, mono: true, fill: 'ink3' },
  { t: e.title, size: t.title, weight: 600, gap: t.tag / 2 },
]

function timelineDesktop() {
  const t = TYPE.desktop
  const W = 1136, x0 = 48, x1 = 1088, w = 300, top = 32
  const cols = [48, 418, 760]
  const draft = EVENTS.map((e, i) => box({ x: cols[i], y: top, w, lines: evLines(e, t) }))
  const h = Math.max(...draft.map((b) => b.need))
  const boxes = EVENTS.map((e, i) => box({ k: e.k, x: cols[i], y: top, w, h, lines: evLines(e, t) }))
  const bottom = top + h, bend = bottom + 22, axisY = bottom + 48
  const ax = (v) => round(x0 + v * (x1 - x0))
  const items = [wire('axis', [[x0, axisY], [x1, axisY]])]
  EVENTS.forEach((e, i) => {
    const mx = ax(e.t), b = boxes[i]
    const inside = mx >= b.x + 12 && mx <= b.x + b.w - 12
    const sx = inside ? mx : b.x + 24
    items.push(wire(e.k, inside ? [[mx, bottom], [mx, axisY]] : [[sx, bottom], [sx, bend], [mx, bend], [mx, axisY]]))
    items.push(shape({ rect: [mx - 4, axisY - 4, 8, 8], fill: 'node' }))
  })
  for (const k of TICKS) {
    const x = ax(k.t)
    items.push(shape({ rect: [x - 0.5, axisY + 6, 1, 8], fill: 'ink3' }))
    items.push(text(k.l, x, axisY + 32, { size: t.tag, mono: true, fill: 'ink3', anchor: k.t === 0 ? 'start' : k.t === 1 ? 'end' : 'middle' }))
  }
  return { w: W, h: axisY + 52, items: [...items, ...boxes] }
}

function timelineMobile() {
  const t = TYPE.mobile
  const ax = 48
  const { boxes, bottom } = column(EVENTS.map((e) => ({ k: e.k, lines: evLines(e, t), pad: 24 })), { x: 96, w: 512, y: 32, gap: 40 })
  const marks = boxes.map((b) => b.y + 24 + t.tag / 2)
  const items = [wire('axis', [[ax, marks[0]], [ax, marks[marks.length - 1]]])]
  boxes.forEach((b, i) => {
    items.push(wire(b.node, [[ax, marks[i]], [b.x, marks[i]]]))
    items.push(shape({ rect: [ax - 7, marks[i] - 7, 14, 14], fill: 'node' }))
  })
  return { w: 640, h: bottom + 32, items: [...items, ...boxes] }
}

/* ------------------------------ HC-F2 ---------------------------------- */

const AREAS = [
  { k: 'lic', t: 'Licenses and edition' },
  { k: 'data', t: 'Data' },
  { k: 'auto', t: 'Automation' },
  { k: 'perm', t: 'Permissions' },
  { k: 'int', t: 'Integrations' },
]
const LIST_TITLE = 'A written list, ranked by what to fix first'
// Area tags only (see the ⛔ at the top). One row per area: the old sixth row repeated DATA under a
// "five areas" caption and read as an error (fix round M5).
const BARS = ['AUTOMATION', 'DATA', 'PERMISSIONS', 'LICENSES', 'INTEGRATIONS']

/** The document: frame, wrapped title, numbered bars. Shapes, not a box(),
 *  because node rects are drawn after shapes and would paint over the bars. */
function listDoc({ x, y, w, pad, size, tag, barH, step, cols }) {
  const lineH = size * 1.4
  const max = Math.floor((w - pad * 2) / (size * 0.53))
  const lines = []
  let line = ''
  for (const word of LIST_TITLE.split(' ')) {
    if (!line) line = word
    else if ((line + ' ' + word).length <= max) line += ' ' + word
    else { lines.push(line); line = word }
  }
  lines.push(line)
  const titleItems = lines.map((l, i) => text(l, x + pad, round(y + pad + size + i * lineH), { size, weight: 600 }))
  const barsTop = y + pad + lines.length * lineH + pad * 0.75
  const gutter = pad * 0.75
  const colW = (w - pad * 2 - (cols - 1) * gutter) / cols
  const rows = Math.ceil(BARS.length / cols)
  const barItems = []
  BARS.forEach((b, i) => {
    const c = i % cols, r = Math.floor(i / cols)
    const bx = x + pad + c * (colW + gutter), by = barsTop + r * step
    const ty = round(by + barH / 2 + tag * 0.35)
    barItems.push(shape({ rect: [round(bx), round(by), round(colW), barH], fill: 'line' }))
    barItems.push(text(String(i + 1), round(bx + tag * 0.9), ty, { size: tag, mono: true, weight: 600 }))
    barItems.push(text(b, round(bx + tag * 2.6), ty, { size: tag, mono: true, fill: 'ink2' }))
  })
  const h = round(barsTop - y + (rows - 1) * step + barH + pad)
  return { items: [shape({ rect: [x, y, w, h], fill: 'bg', stroke: 'node', width: 1 }), ...barItems, ...titleItems], h }
}

function areasDesktop() {
  const t = TYPE.desktop
  const docTop = 24
  const doc = listDoc({ x: 320, y: docTop, w: 236, pad: 16, size: t.title, tag: t.tag, barH: 44, step: 56, cols: 1 })
  const docBottom = docTop + doc.h, mid = round((docTop + docBottom) / 2)
  const span = docBottom - docTop - 80
  const lines = (a) => [{ t: a.t, size: t.title, weight: 600 }]
  const boxes = AREAS.map((a, i) => {
    const h = box({ x: 24, y: 0, w: 216, lines: lines(a) }).h
    const c = docTop + 40 + (i * span) / (AREAS.length - 1)
    return box({ k: a.k, x: 24, y: round(c - h / 2), w: 216, h, lines: lines(a) })
  })
  // Elbows that never cross: wires above the middle turn further out the
  // higher they start; below the middle, mirrored. The middle runs straight.
  const elbowX = [296, 280, null, 280, 296]
  const wires = boxes.map((b, i) => {
    const by = round(b.y + b.h / 2), ey = mid + (i - 2) * 28
    return elbowX[i] === null
      ? wire(b.node, [[b.x + b.w, by], [320, by]])
      : wire(b.node, [[b.x + b.w, by], [elbowX[i], by], [elbowX[i], ey], [320, ey]])
  })
  return { w: 580, h: docBottom + 24, items: [...doc.items, ...wires, ...boxes] }
}

function areasMobile() {
  const t = TYPE.mobile
  const { boxes, bottom } = column(AREAS.map((a) => ({ k: a.k, lines: [{ t: a.t, size: t.title, weight: 600 }], pad: 20 })), { x: 112, w: 496, y: 32, gap: 20 })
  const docY = bottom + 56
  const doc = listDoc({ x: 32, y: docY, w: 576, pad: 24, size: t.title, tag: t.tag, barH: 60, step: 76, cols: 2 })
  // A bus down the left edge: the top box takes the outermost lane, so no
  // horizontal run ever crosses another wire's vertical.
  const wires = boxes.map((b, i) => {
    const lx = 44 + i * 14, by = round(b.y + b.h / 2)
    return wire(b.node, [[b.x, by], [lx, by], [lx, docY]])
  })
  return { w: 640, h: docY + doc.h + 32, items: [...doc.items, ...wires, ...boxes] }
}

export default [
  {
    id: 'salesforce-workflow-rules-optimizer-retirement-timeline',
    title: 'Salesforce retirements: Workflow Rules, Process Builder and Optimizer',
    alt: "Timeline: Salesforce ended support for Workflow Rules and Process Builder on December 31, 2025, and retired Optimizer for Hyperforce orgs in the Winter '26 release and for all other orgs in Summer '26.",
    tone: 'night',
    desktop: timelineDesktop(),
    mobile: timelineMobile(),
  },
  {
    id: 'salesforce-health-check-five-areas',
    title: 'What the free Salesforce health check covers',
    alt: 'Diagram: the five areas the free health check covers (licenses and edition, data, automation, permissions and integrations) feed one written list, ranked by what to fix first.',
    tone: 'light',
    og: 'og-salesforce-health-check',
    desktop: areasDesktop(),
    mobile: areasMobile(),
  },
]
