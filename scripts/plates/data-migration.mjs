// Plates for /services/salesforce-data-migration. See the convention in scripts/plates.mjs.
//
// DM-F1 sources, DM-F2 steps, DM-F3 external-ID upsert (design-spec.md §3).
// DM-F4 (Bulk Data Load Job specimen) is owner-gated: no demo-org capture
// exists (owner-decisions.md: the dev org holds real-looking names; Setup-only
// screenshots, none taken), so `shots` stays empty and the page renders none.
//
// Sizes differ from §3 on purpose: F1 and F3 sit BESIDE their text at xl
// (design-spec-addendum-wide-layout.md: "text beside its plate"), so they are
// drawn for a ~640-760px column instead of a 1136px full-width figure. F2 stays
// full width.
//
// ⛔ HONESTY. Only the QuickBase/Kissflow box says DELIVERED (allowed proof).
// The other sources carry the step that matters for them, never a delivery
// claim. The §3 chips "MAPPING ONLY" / "METHOD ONLY" were replaced because the
// voice addendum (Louis 2026-10-23) bans visible deficit wording; the honesty
// mechanism (one DELIVERED chip, nothing implied for the rest) is unchanged.
// F3 values are illustrative and say so on the plate.
import { box, wire, text, TYPE } from './_lib.mjs'

/* ------------------------------ DM-F1 ---------------------------------- */

const SOURCES = [
  { k: 'lowcode', chip: 'DELIVERED', chipFill: 'signal', title: 'No-code platforms', sub: 'QuickBase and Kissflow' },
  { k: 'crm', chip: 'FIELD MAP FIRST', title: 'Another CRM', sub: 'HubSpot, Zoho, Dynamics 365' },
  { k: 'sheets', chip: 'DEDUPE FIRST', title: 'Spreadsheets', sub: 'One sheet, several objects' },
  { k: 'org', chip: 'EXTERNAL IDS', title: 'Another Salesforce org', sub: 'After a merger, or a second business unit' },
]
const OBJECTS = ['Accounts', 'Contacts', 'Opportunities', 'Custom objects', 'Files']
const MAP = { title: 'Field map', sub: 'Objects, owners, picklist values and external IDs, agreed before any load' }
const REC = { title: 'Reconciled object by object', sub: 'Source count = Salesforce count, before go-live' }

const chipW = (s, size) => Math.ceil(s.length * size * 0.6 + 14)

/** A source node with its status chip drawn as its own radius-0 box on top. */
function source(s, x, y, w, t, pad, h) {
  const ch = Math.ceil(t.tag * 1.4 + 10)
  const node = box({
    k: s.k, x, y, w, h, pad,
    lines: [
      { t: s.title, size: t.title, weight: 600, gap: ch + 10 },
      { t: s.sub, size: t.label, fill: 'ink2', gap: t.label * 0.4 },
    ],
  })
  const chip = box({ x: x + pad, y: y + pad, w: chipW(s.chip, t.tag), pad: 5, lines: [{ t: s.chip, size: t.tag, mono: true, fill: s.chipFill ?? 'ink3', lead: 1.2 }] })
  return [node, chip]
}

function f1Desktop() {
  const t = TYPE.desktop
  const W = 720, x0 = 24, inner = W - 48, gap = 16, pad = 14
  const sw = (inner - gap * 3) / 4
  const draft = SOURCES.map((s, i) => source(s, x0 + i * (sw + gap), 24, sw, t, pad))
  const sh = Math.max(...draft.map(([n]) => n.need))
  const src = SOURCES.map((s, i) => source(s, Math.round(x0 + i * (sw + gap)), 24, Math.round(sw), t, pad, sh))
  const srcBottom = 24 + sh

  const mapY = srcBottom + 44
  const map = box({ k: 'map', x: x0, y: mapY, w: inner, pad, lines: [{ t: MAP.title, size: t.title, weight: 600 }, { t: MAP.sub, size: t.label, fill: 'ink2', gap: t.label * 0.4 }] })
  const mapBottom = mapY + map.h

  const ow = (inner - gap * 4) / 5
  const objY = mapBottom + 44
  const objDraft = OBJECTS.map((o, i) => box({ x: x0 + i * (ow + gap), y: objY, w: ow, pad: 12, lines: [{ t: o, size: t.label, weight: 600 }] }))
  const oh = Math.max(...objDraft.map((b) => b.need))
  const objs = OBJECTS.map((o, i) => box({ x: Math.round(x0 + i * (ow + gap)), y: objY, w: Math.round(ow), h: oh, pad: 12, lines: [{ t: o, size: t.label, weight: 600 }] }))
  const objBottom = objY + oh

  const recY = objBottom + 44
  const rec = box({ k: 'rec', x: x0, y: recY, w: inner, pad, lines: [{ t: REC.title, size: t.title, weight: 600 }, { t: REC.sub, size: t.label, fill: 'ink2', gap: t.label * 0.4 }] })

  const cx = (b) => b.x + b.w / 2
  const wires = [
    ...src.map(([n]) => wire(n.node, [[cx(n), srcBottom], [cx(n), mapY]])),
    ...objs.map((o) => wire('load', [[cx(o), mapBottom], [cx(o), objY]])),
    ...objs.map((o) => wire('rec', [[cx(o), objBottom], [cx(o), recY]])),
  ]
  return { w: W, h: recY + rec.h + 24, items: [...wires, ...src.flat(), map, ...objs, rec] }
}

function f1Mobile() {
  const t = TYPE.mobile
  const W = 640, x = 72, w = 544, pad = 22, gap = 28, bus = 36
  const items = []
  const wires = []
  let y = 32
  const mids = []
  for (const s of SOURCES) {
    const [n, c] = source(s, x, y, w, t, pad)
    items.push(n, c)
    mids.push(y + n.h / 2)
    y += n.h + gap
  }
  const mapY = y + 24
  // One bus down the left: every source joins it, it runs into the field map.
  for (const [i, m] of mids.entries()) wires.push(wire(SOURCES[i].k, [[x, m], [bus, m], [bus, mapY + 40], [x, mapY + 40]]))
  const map = box({ k: 'map', x, y: mapY, w, pad, lines: [{ t: MAP.title, size: t.title, weight: 600 }, { t: MAP.sub, size: t.label, fill: 'ink2', gap: t.label * 0.4 }] })
  const objY = mapY + map.h + 56
  const objs = box({ x, y: objY, w, pad, lines: [{ t: 'INTO SALESFORCE', size: t.tag, mono: true, fill: 'ink3' }, { t: 'Accounts, contacts, opportunities, custom objects and files', size: t.label, weight: 600, gap: t.label * 0.4 }] })
  const recY = objY + objs.h + 56
  const rec = box({ k: 'rec', x, y: recY, w, pad, lines: [{ t: REC.title, size: t.title, weight: 600 }, { t: REC.sub, size: t.label, fill: 'ink2', gap: t.label * 0.4 }] })
  wires.push(wire('load', [[x + 40, mapY + map.h], [x + 40, objY]]))
  wires.push(wire('rec', [[x + 40, objY + objs.h], [x + 40, recY]]))
  return { w: W, h: recY + rec.h + 32, items: [...wires, ...items, map, objs, rec] }
}

/* ------------------------------ DM-F2 ---------------------------------- */

const STEPS = [
  { k: 's1', tag: '01', title: 'Inventory', sub: 'Every table, field and file, with row counts' },
  { k: 's2', tag: '02', title: 'Map', sub: 'Objects, owners and external IDs' },
  { k: 's3', tag: '03', title: 'Sandbox trial load', sub: 'A full run, sampled by the people who know the data' },
  { k: 'g1', tag: 'CHECK', title: 'Tally', sub: 'Source = Salesforce, object by object', check: true },
  { k: 's4', tag: '04', title: 'Production cutover', sub: 'A planned window, automation paused' },
  { k: 'g2', tag: 'CHECK', title: 'Tally again', sub: 'Counts reconciled after the load', check: true },
]
const READ_ONLY = 'Source set read-only, kept for checks'

const stepLines = (s, t) => [
  { t: s.tag, size: t.tag, mono: true, fill: s.check ? 'signal' : 'ink3' },
  { t: s.title, size: t.title, weight: 600, gap: t.tag / 2 },
  { t: s.sub, size: t.label, fill: 'ink2', gap: t.label * 0.6 },
]

function f2Desktop() {
  const t = TYPE.desktop
  const W = 1136, y = 32, n = STEPS.length, w = 150
  const step = (W - 64 - w) / (n - 1)
  const draft = STEPS.map((s, i) => box({ k: s.k, x: 32 + i * step, y, w, lines: stepLines(s, t) }))
  const h = Math.max(...draft.map((b) => b.need))
  const boxes = STEPS.map((s, i) => box({ k: s.k, x: Math.round(32 + i * step), y, w, h, lines: stepLines(s, t) }))
  const wires = boxes.slice(1).map((b, i) => wire(b.node, [[boxes[i].x + w, y + 22], [b.x, y + 22]]))
  const last = boxes[n - 1], bottom = y + h, bx = last.x + w / 2
  return {
    w: W,
    h: bottom + 44 + 36,
    items: [...wires, wire('ro', [[bx, bottom], [bx, bottom + 44], [bx - 28, bottom + 44]], { dashed: true }), ...boxes,
      text(READ_ONLY, bx - 40, bottom + 44 + 5.5, { size: t.label, fill: 'ink2', anchor: 'end' })],
  }
}

function f2Mobile() {
  const t = TYPE.mobile
  const x = 32, w = 520, gap = 44
  const boxes = []
  let y = 32
  for (const s of STEPS) {
    const b = box({ k: s.k, x, y, w, pad: 22, lines: stepLines(s, t) })
    boxes.push(b)
    y += b.h + gap
  }
  const wires = boxes.slice(1).map((b, i) => wire(b.node, [[56, boxes[i].y + boxes[i].h], [56, b.y]]))
  const last = boxes[boxes.length - 1], my = last.y + last.h / 2, end = last.y + last.h + 40
  return {
    w: 640,
    h: end + 52,
    items: [...wires, wire('ro', [[x + w, my], [604, my], [604, end]], { dashed: true }), ...boxes,
      text(READ_ONLY, 604, end + 36, { size: t.label, fill: 'ink2', anchor: 'end' })],
  }
}

/* ------------------------------ DM-F3 ---------------------------------- */

const OLD_A = { tag: 'OLD SYSTEM', title: 'Customer QB-1042', sub: 'Customer table' }
const OLD_B = { tag: 'OLD SYSTEM', title: 'Contact row', sub: 'customer = QB-1042' }
const NEW_A = { tag: 'SALESFORCE ACCOUNT', title: 'Legacy_ID__c = QB-1042', mono: true }
const NEW_B = { tag: 'SALESFORCE CONTACT', title: 'Parent found through Legacy_ID__c' }
const RERUN = { tag: 'RERUN THE LOAD', title: 'Upsert on Legacy_ID__c', sub: 'Updates the existing record, never creates a duplicate' }

const recLines = (r, t) => [
  { t: r.tag, size: t.tag, mono: true, fill: 'ink3' },
  { t: r.title, size: r.mono ? t.label : t.title, weight: r.mono ? undefined : 600, mono: !!r.mono, gap: t.tag / 2 },
  ...(r.sub ? [{ t: r.sub, size: t.label, fill: 'ink2', gap: t.label * 0.4 }] : []),
]

function f3Desktop() {
  const t = TYPE.desktop
  const W = 560, lx = 24, rx = 316, w = 220, top = 52
  const pair = (a, b, y, k) => {
    const h = Math.max(box({ x: lx, y, w, lines: recLines(a, t) }).need, box({ x: rx, y, w, lines: recLines(b, t) }).need)
    return [box({ x: lx, y, w, h, lines: recLines(a, t) }), box({ k, x: rx, y, w, h, lines: recLines(b, t) }), h]
  }
  const [a1, b1, h1] = pair(OLD_A, NEW_A, top, 'ext')
  const y2 = top + h1 + 56
  const [a2, b2, h2] = pair(OLD_B, NEW_B, y2, 'child')
  const y3 = y2 + h2 + 48
  const c = box({ k: 'rerun', x: lx, y: y3, w: rx + w - lx, lines: recLines(RERUN, t) })
  const m1 = top + h1 / 2, m2 = y2 + h2 / 2, mc = y3 + c.h / 2
  return {
    w: W,
    h: y3 + c.h + 28,
    items: [
      text('ILLUSTRATIVE VALUES', W - 24, 30, { size: t.tag, mono: true, fill: 'ink3', anchor: 'end' }),
      wire('ext', [[lx + w, m1], [rx, m1]]),
      wire('child', [[lx + w, m2], [rx, m2]]),
      wire('child', [[rx + w / 2, top + h1], [rx + w / 2, y2]]),
      wire('rerun', [[rx + w, mc], [W - 12, mc], [W - 12, m1], [rx + w, m1]], { dashed: true }),
      text('parent link', rx + w / 2 + 10, top + h1 + 32, { size: t.tag + 1, mono: true, fill: 'ink3' }),
      a1, b1, a2, b2, c,
    ],
  }
}

function f3Mobile() {
  const t = TYPE.mobile
  const x = 32, w = 520, gap = 48
  const order = [[OLD_A], [NEW_A, 'ext'], [OLD_B], [NEW_B, 'child'], [RERUN, 'rerun']]
  const boxes = []
  let y = 72
  for (const [r, k] of order) {
    const b = box({ k, x, y, w, pad: 22, lines: recLines(r, t) })
    boxes.push(b)
    y += b.h + gap
  }
  const [a1, b1, a2, b2, c] = boxes
  const link = (p, q, k) => wire(k, [[56, p.y + p.h], [56, q.y]])
  return {
    w: 640,
    h: c.y + c.h + 32,
    items: [
      text('ILLUSTRATIVE VALUES', 608, 44, { size: t.tag, mono: true, fill: 'ink3', anchor: 'end' }),
      link(a1, b1, 'ext'), link(a2, b2, 'child'),
      wire('child', [[x + w, b1.y + b1.h / 2], [604, b1.y + b1.h / 2], [604, b2.y + b2.h / 2], [x + w, b2.y + b2.h / 2]]),
      wire('rerun', [[x, c.y + c.h / 2], [16, c.y + c.h / 2], [16, b1.y + 24], [x, b1.y + 24]], { dashed: true }),
      a1, b1, a2, b2, c,
    ],
  }
}

export default [
  {
    id: 'salesforce-data-migration-sources',
    title: 'Where Salesforce data migrations come from',
    alt: 'Diagram of systems moved into Salesforce: QuickBase and Kissflow, marked as migrations OneAlgorithm has delivered; another CRM such as HubSpot, Zoho or Dynamics 365, marked field map first; spreadsheets, marked dedupe first; and another Salesforce org, marked external IDs. All of them run through one field map into Salesforce accounts, contacts, opportunities, custom objects and files, and are reconciled object by object before go-live.',
    tone: 'light',
    og: 'og-salesforce-data-migration',
    desktop: f1Desktop(),
    mobile: f1Mobile(),
  },
  {
    id: 'salesforce-data-migration-steps',
    title: 'The order of a Salesforce data migration',
    alt: 'Diagram of a Salesforce data migration: records are inventoried, mapped to Salesforce objects with external IDs, loaded into a sandbox and reconciled count by count, then loaded into production and reconciled again, with the source kept read-only.',
    tone: 'light',
    legend: [
      { k: 's1', label: '01 Inventory' },
      { k: 's2', label: '02 Map' },
      { k: 's3', label: '03 Sandbox trial load' },
      { k: 'g1', label: 'Tally after the trial' },
      { k: 's4', label: '04 Production cutover' },
      { k: 'g2', label: 'Tally after cutover' },
    ],
    desktop: f2Desktop(),
    mobile: f2Mobile(),
  },
  {
    id: 'salesforce-external-id-upsert-relationships',
    title: 'Keeping relationships with external IDs and upsert',
    alt: 'Diagram: a parent record is loaded with its old system ID in an external ID field, child records find their parent through that field, and rerunning the load with upsert updates existing records instead of creating duplicates. Values are illustrative.',
    tone: 'light',
    desktop: f3Desktop(),
    mobile: f3Mobile(),
  },
]

// DM-F4 specimen is owner-gated (see header). Nothing to list until real,
// redacted demo-org files exist at /media/salesforce/<id>-<w>.{avif,webp}.
export const shots = []
