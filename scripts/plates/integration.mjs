// Plates for /services/salesforce-integration. See the convention in scripts/plates.mjs.
//
// INT-F1 (spec §3): a TYPICAL SAP-to-Salesforce pattern. ⛔ Not the objects,
// direction or schedule of the sync we delivered: owner decision #11 has not
// released those, so the stamp says NOT A CLIENT BUILD and the lanes follow the
// gap audit's general pattern (gap-audit-verified-gaps.md, INT-3).
// INT-F3: four routes, drawn with the moving parts each adds (1/2/2/3).
// INT-F2 (demo-org specimen) is skipped: no Salesforce screenshots (blocked).
//
// Lane keys = DataTable row keys on the page: bp, mat, price, order, inv, fail.
// Route keys = the route blocks beside F3: connect, events, bulk, mw.
import { box, wire, text, TYPE } from './_lib.mjs'

const LANES = [
  { k: 'bp', sap: 'Business Partner', sf: 'Account and Contact', how: 'SCHEDULED', short: 'SCHEDULED', dir: 'in' },
  { k: 'mat', sap: 'Material', sf: 'Product', how: 'SCHEDULED', short: 'SCHEDULED', dir: 'in' },
  { k: 'price', sap: 'Pricing conditions', sf: 'Price Book', how: 'SCHEDULED', short: 'SCHEDULED', dir: 'in' },
  { k: 'order', sap: 'Sales Order', sf: 'Won Opportunity or Quote', how: 'ON CHANGE · BOTH WAYS', short: 'BOTH WAYS', dir: 'both' },
  { k: 'inv', sap: 'Invoice and credit status', sf: 'Status on the Account', how: 'READ-ONLY · LIVE OR NIGHTLY', short: 'READ-ONLY', dir: 'in' },
]
const FAIL = { title: 'Failure log', line: 'Read by a named person' }

/** Chevron arrowhead at (x, y). `dir` -1 points left, +1 points right. */
const head = (k, x, y, dir, s) => wire(k, [[x - dir * s, y - s * 0.7], [x, y], [x - dir * s, y + s * 0.7]])

function flowDesktop() {
  const t = TYPE.desktop
  const W = 1136, top = 72, pitch = 76, bh = 56, bw = 272
  const L = 32, R = W - 32 - bw, M = 448, mw = 240
  const items = [
    text('SAP', L, 44, { size: t.tag, mono: true, fill: 'ink3' }),
    text('API JOBS OR MIDDLEWARE', M + mw / 2, 44, { size: t.tag, mono: true, fill: 'ink3', anchor: 'middle' }),
    text('SALESFORCE', R, 44, { size: t.tag, mono: true, fill: 'ink3' }),
  ]
  const boxes = []
  LANES.forEach((l, i) => {
    const y = top + i * pitch, cy = y + bh / 2
    boxes.push(box({ k: l.k, x: L, y, w: bw, h: bh, lines: [{ t: l.sap, size: t.title, weight: 600 }] }))
    boxes.push(box({ x: R, y, w: bw, h: bh, lines: [{ t: l.sf, size: t.title, weight: 600 }] }))
    items.push(wire(l.k, [[L + bw, cy], [M, cy]]), wire(l.k, [[M + mw, cy], [R, cy]]))
    items.push(head(l.k, R, cy, 1, 9))
    if (l.dir === 'both') items.push(head(l.k, L + bw, cy, -1, 9))
    items.push(text(l.how, M + mw / 2, cy + 4, { size: t.tag, mono: true, fill: 'ink2', anchor: 'middle' }))
  })
  const midH = (LANES.length - 1) * pitch + bh
  const fy = top + midH + 48
  const fail = box({ k: 'fail', x: M - 40, y: fy, w: mw + 80, lines: [
    { t: FAIL.title, size: t.title, weight: 600 },
    { t: FAIL.line, size: t.label, fill: 'ink2', gap: 4 },
  ] })
  items.push(wire('fail', [[M + mw / 2, top + midH], [M + mw / 2, fy]], { dashed: true }))
  return { w: W, h: fy + fail.h + 40, items: [...items, box({ x: M, y: top, w: mw, h: midH, lines: [] }), ...boxes, fail] }
}

function flowMobile() {
  const t = TYPE.mobile
  const W = 640, L = 24, bw = 232, R = W - 24 - bw, S = L + bw + 40, sw = R - 40 - S
  const items = [
    text('SAP', L, 48, { size: t.tag, mono: true, fill: 'ink3' }),
    text('SALESFORCE', W - 24, 48, { size: t.tag, mono: true, fill: 'ink3', anchor: 'end' }),
    text('THROUGH API JOBS OR MIDDLEWARE', W / 2, 88, { size: t.tag, mono: true, fill: 'ink3', anchor: 'middle' }),
  ]
  const top = 116, gap = 28, pad = 20
  const boxes = []
  let y = top
  for (const l of LANES) {
    const left = [{ t: l.sap, size: t.label, weight: 600 }]
    const right = [{ t: l.sf, size: t.label, weight: 600 }, { t: l.short, size: t.tag, mono: true, fill: 'ink3', gap: 8 }]
    const h = Math.max(box({ x: L, y, w: bw, pad, lines: left }).need, box({ x: R, y, w: bw, pad, lines: right }).need)
    boxes.push(box({ k: l.k, x: L, y, w: bw, h, pad, lines: left }), box({ x: R, y, w: bw, h, pad, lines: right }))
    const cy = y + h / 2
    items.push(wire(l.k, [[L + bw, cy], [S, cy]]), wire(l.k, [[S + sw, cy], [R, cy]]), head(l.k, R, cy, 1, 12))
    if (l.dir === 'both') items.push(head(l.k, L + bw, cy, -1, 12))
    y += h + gap
  }
  const spineB = y - gap
  const fy = spineB + 56
  const fail = box({ k: 'fail', x: 120, y: fy, w: 400, pad: 24, lines: [
    { t: FAIL.title, size: t.title, weight: 600 },
    { t: FAIL.line, size: t.label, fill: 'ink2', gap: 6 },
  ] })
  items.push(wire('fail', [[S + sw / 2, spineB], [S + sw / 2, fy]], { dashed: true }))
  return { w: W, h: fy + fail.h + 40, items: [...items, box({ x: S, y: top, w: sw, h: spineB - top, lines: [] }), ...boxes, fail] }
}

const ROUTES = [
  { k: 'connect', title: 'Salesforce Connect', line: "Shows the other system's data inside Salesforce without copying it.", parts: ['ADAPTER'], adds: 'ADDS: AN ODATA OR CUSTOM ADAPTER' },
  { k: 'events', title: 'Platform Events and Change Data Capture', line: 'Salesforce announces a change; the other system picks it up.', parts: ['EVENT CHANNEL', 'SUBSCRIBER'], adds: 'ADDS: AN EVENT CHANNEL, A SUBSCRIBER' },
  { k: 'bulk', title: 'Bulk API', line: 'Large loads on a schedule: simple, cheap and easy to rerun.', parts: ['SCHEDULER', 'BULK JOB'], adds: 'ADDS: A SCHEDULER, A BULK JOB' },
  { k: 'mw', title: 'Middleware such as MuleSoft or SAP Integration Suite', line: 'A separately licensed runtime for many systems or heavy transformation.', parts: ['RUNTIME', 'MAPPINGS', 'LICENCE'], adds: 'ADDS: A RUNTIME, MAPPINGS, A LICENCE' },
]

function routesDesktop() {
  const t = TYPE.desktop
  const W = 1136, L = 32, bw = 440, sfX = 520, ew = 140, oX = W - 32 - ew, nh = 48, gap = 24
  const items = [
    text('ROUTE', L, 40, { size: t.tag, mono: true, fill: 'ink3' }),
    text('WHAT SITS BETWEEN SALESFORCE AND THE OTHER SYSTEM', sfX, 40, { size: t.tag, mono: true, fill: 'ink3' }),
  ]
  const nodes = []
  let y = 60
  for (const r of ROUTES) {
    const lines = [{ t: r.title, size: t.title, weight: 600 }, { t: r.line, size: t.label, fill: 'ink2', gap: 6 }]
    const b = box({ k: r.k, x: L, y, w: bw, lines })
    const cy = y + b.h / 2
    nodes.push(b,
      box({ x: sfX, y: cy - nh / 2, w: ew, h: nh, pad: 12, lines: [{ t: "Salesforce", size: t.label }] }),
      box({ x: oX, y: cy - nh / 2, w: ew, h: nh, pad: 12, lines: [{ t: "Other system", size: t.label }] }))
    items.push(wire(r.k, [[sfX + ew, cy], [oX, cy]]))
    const span = oX - (sfX + ew), step = span / (r.parts.length + 1)
    r.parts.forEach((p, i) => {
      const x = sfX + ew + step * (i + 1)
      nodes.push(box({ x: x - 7, y: cy - 7, w: 14, h: 14, pad: 0, lines: [], fill: 'node' }))
      items.push(text(p, x, cy + 30, { size: t.tag, mono: true, fill: 'ink3', anchor: 'middle' }))
    })
    y += b.h + gap
  }
  return { w: W, h: y - gap + 32, items: [...items, ...nodes] }
}

function routesMobile() {
  const t = TYPE.mobile
  const W = 640, L = 32, w = W - 64, ew = 210, nh = 68
  const items = []
  const nodes = []
  let y = 32
  for (const r of ROUTES) {
    const b = box({ k: r.k, x: L, y, w, pad: 20, lines: [{ t: r.title, size: t.label, weight: 600 }, { t: r.adds, size: t.tag, mono: true, fill: 'ink3', gap: 8 }] })
    const cy = y + b.h + 24 + nh / 2
    nodes.push(b,
      box({ x: L, y: cy - nh / 2, w: ew, h: nh, pad: 14, lines: [{ t: "Salesforce", size: t.label }] }),
      box({ x: W - L - ew, y: cy - nh / 2, w: ew, h: nh, pad: 14, lines: [{ t: "Other system", size: t.label }] }))
    const a = L + ew, z = W - L - ew, step = (z - a) / (r.parts.length + 1)
    items.push(wire(r.k, [[b.x + 40, y + b.h], [b.x + 40, cy - nh / 2]]), wire(r.k, [[a, cy], [z, cy]]))
    r.parts.forEach((_, i) => nodes.push(box({ x: a + step * (i + 1) - 9, y: cy - 9, w: 18, h: 18, pad: 0, lines: [], fill: 'node' })))
    y = cy + nh / 2 + 48
  }
  return { w: W, h: y - 48 + 32, items: [...items, ...nodes] }
}

export default [
  {
    id: 'salesforce-sap-integration-data-flow',
    title: 'A typical SAP-to-Salesforce sync',
    alt: 'Diagram: a typical SAP-to-Salesforce sync, with customer, product and price records moving from SAP into Salesforce on a schedule, sales orders created in SAP from won deals with status sent back, invoice status shown read-only, and failed records written to a log a named person reviews.',
    tone: 'light',
    og: 'og-salesforce-integration',
    desktop: flowDesktop(),
    mobile: flowMobile(),
  },
  {
    id: 'salesforce-integration-routes',
    title: 'Four ways to connect a system to Salesforce',
    alt: 'Diagram of four ways to connect a system to Salesforce: Salesforce Connect shows external data without copying it, Platform Events and Change Data Capture announce changes for another system to pick up, the Bulk API runs large scheduled loads, and middleware such as MuleSoft or SAP Integration Suite adds a separately licensed runtime. Each route is drawn with the moving parts it adds.',
    tone: 'light',
    desktop: routesDesktop(),
    mobile: routesMobile(),
  },
]
