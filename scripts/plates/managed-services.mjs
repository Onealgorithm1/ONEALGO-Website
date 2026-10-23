// Plates for /services/salesforce-managed-services. See the convention in scripts/plates.mjs.
//
// MS-F1 (spec §3, first plate): how a change moves. Every label is a claim the
// page already makes ("built in a sandbox, tested, deployed, written down: what
// changed and why"; "your admin keeps the day-to-day requests"; "a release
// check before each of Salesforce's three releases"). No SLA, no hours, no
// client, no product logo.
// MS-F3: Salesforce's release cycle. Months are Salesforce's own published
// pattern ("Spring in February, Summer in June, and Winter in October",
// salesforce.com/products/innovation/releases/, read 23 October 2026); the
// page caption cites it.
// MS-F2 and MS-F4 (demo-org specimens) are owner-gated (spec §7.1): no shots.
import { box, wire, text, shape, wrap, TYPE, round } from './_lib.mjs'

/* ----------------------------- MS-F1 ---------------------------------- */

const STEPS = [
  { k: 'req', n: '01', title: 'Request', sub: 'A change your admin hands over' },
  { k: 'build', n: '02', title: 'Built in a sandbox', sub: 'Not in production' },
  { k: 'test', n: '03', title: 'Tested', sub: 'Before anything moves' },
  { k: 'deploy', n: '04', title: 'Deployed', sub: 'To production' },
  { k: 'doc', n: '05', title: 'Written down', sub: 'What changed and why' },
]
const ADMIN = { title: 'Your admin', sub: 'Keeps the day-to-day user requests' }
const RELEASE = { tag: 'SPRING · SUMMER · WINTER', title: 'Salesforce releases', sub: 'Release check before each of Salesforce’s three releases' }

function changeDesktop() {
  const t = TYPE.desktop
  const W = 1136
  const items = []
  // Lane 1: your admin
  items.push(text('YOUR ADMIN', 32, 28, { size: t.tag, mono: true, fill: 'ink3' }))
  const admin = box({ k: 'admin', x: 32, y: 40, w: 280, lines: [
    { t: ADMIN.title, size: t.title, weight: 600 },
    { t: ADMIN.sub, size: t.label, fill: 'ink2', gap: 8 },
  ] })
  const sep1 = admin.y + admin.h + 30
  // Lane 2: OneAlgorithm
  const loopY = sep1 + 24
  const midTop = sep1 + 56
  const w = 184
  const gap = (W - 64 - w * STEPS.length) / (STEPS.length - 1)
  const lines = (s) => [
    { t: s.n, size: t.tag, mono: true, fill: 'ink3' },
    { t: s.title, size: t.title, weight: 600, gap: 6 },
    { t: s.sub, size: t.label, fill: 'ink2', gap: 10 },
  ]
  const x = (i) => Math.round(32 + i * (w + gap))
  const h = Math.max(...STEPS.map((s, i) => box({ x: x(i), y: midTop, w, lines: lines(s) }).need))
  const steps = STEPS.map((s, i) => box({ k: s.k, x: x(i), y: midTop, w, h, lines: lines(s) }))
  const midBottom = midTop + h
  const sep2 = midBottom + 30
  // Lane 3: Salesforce
  const rel = box({ k: 'release', x: 400, y: sep2 + 40, w: 336, lines: [
    { t: RELEASE.tag, size: t.tag, mono: true, fill: 'ink3' },
    { t: RELEASE.title, size: t.title, weight: 600, gap: 6 },
    { t: RELEASE.sub, size: t.label, fill: 'ink2', gap: 8 },
  ] })
  const reqX = steps[0].x + w / 2
  const loopInX = steps[0].x + w - 16
  const docX = steps[4].x + w / 2
  const testX = steps[2].x + w / 2
  const wy = midTop + 28
  items.push(
    shape({ d: `M32 ${sep1} L${W - 32} ${sep1} M32 ${sep2} L${W - 32} ${sep2}`, stroke: 'line', width: 1 }),
    text('ONEALGORITHM', 32, sep1 + 24 + 4, { size: t.tag, mono: true, fill: 'ink3' }),
    text('SALESFORCE', 32, sep2 + 24, { size: t.tag, mono: true, fill: 'ink3' }),
    // admin hands a change over
    wire('admin', [[reqX, admin.y + admin.h], [reqX, midTop]]),
    text('Hands over a change', reqX + 12, admin.y + admin.h + 22, { size: t.label, fill: 'ink2' }),
    // the four moves between steps, keyed to the step they arrive at
    ...steps.slice(1).map((b, i) => wire(b.node, [[steps[i].x + w, wy], [b.x, wy]])),
    // next request loop (dashed), above the lane
    wire('loop', [[docX, midTop], [docX, loopY], [loopInX, loopY], [loopInX, midTop]], { dashed: true }),
    text('Next request', (docX + loopInX) / 2, loopY - 8, { size: t.label, fill: 'ink2', anchor: 'middle' }),
    // release check feeds the test step (dashed)
    wire('release', [[testX, rel.y], [testX, midBottom]], { dashed: true }),
    admin, ...steps, rel,
  )
  return { w: W, h: rel.y + rel.h + 32, items }
}

function changeMobile() {
  const t = TYPE.mobile
  const W = 640, bx = 40, bw = 520, pad = 22, gap = 44
  const items = []
  let y = 40
  items.push(text('YOUR ADMIN', bx, y, { size: t.tag, mono: true, fill: 'ink3' }))
  y += 16
  const mk = (k, title, sub, top) => box({ k, x: bx, y: top, w: bw, pad, lines: [
    { t: title, size: t.title, weight: 600 },
    { t: sub, size: t.label, fill: 'ink2', gap: 8 },
  ] })
  const admin = mk('admin', ADMIN.title, ADMIN.sub, y)
  y = admin.y + admin.h + 28
  const sep1 = y
  items.push(text('ONEALGORITHM', bx, sep1 + 34, { size: t.tag, mono: true, fill: 'ink3' }))
  y = sep1 + 56
  const steps = []
  for (const s of STEPS) {
    const b = mk(s.k, `${s.n}  ${s.title}`, s.sub, y)
    steps.push(b)
    y = b.y + b.h + gap
  }
  const midBottom = y - gap
  const sep2 = midBottom + 28
  items.push(text('SALESFORCE', bx, sep2 + 34, { size: t.tag, mono: true, fill: 'ink3' }))
  const rel = box({ k: 'release', x: bx, y: sep2 + 56, w: bw, pad, lines: [
    { t: RELEASE.tag, size: t.tag, mono: true, fill: 'ink3' },
    { t: RELEASE.title, size: t.title, weight: 600, gap: 8 },
    { t: RELEASE.sub, size: t.label, fill: 'ink2', gap: 8 },
  ] })
  // connectors run down the middle so they never cross the lane tags on the left
  const vx = bx + bw / 2
  const mid = (b) => b.y + b.h / 2
  const [req, , test, , doc] = steps
  items.push(
    shape({ d: `M${bx} ${sep1} L${W - bx} ${sep1} M${bx} ${sep2} L${W - bx} ${sep2}`, stroke: 'line', width: 1 }),
    wire('admin', [[vx, admin.y + admin.h], [vx, req.y]]),
    ...steps.slice(1).map((b, i) => wire(b.node, [[vx, steps[i].y + steps[i].h], [vx, b.y]])),
    // loop on the right, release on the left: they never cross
    wire('loop', [[bx + bw, mid(doc)], [W - 16, mid(doc)], [W - 16, mid(req)], [bx + bw, mid(req)]], { dashed: true }),
    text('next request', W - 26, req.y - 12, { size: t.tag, mono: true, fill: 'ink3', anchor: 'end' }),
    wire('release', [[bx, mid(rel)], [16, mid(rel)], [16, mid(test)], [bx, mid(test)]], { dashed: true }),
    admin, ...steps, rel,
  )
  return { w: W, h: rel.y + rel.h + 32, items }
}

/* ----------------------------- MS-F3 ---------------------------------- */

const SEASONS = [
  { k: 'spring', name: 'Spring', month: 'TYPICALLY FEBRUARY', deg: -90 },
  { k: 'summer', name: 'Summer', month: 'TYPICALLY JUNE', deg: 30 },
  { k: 'winter', name: 'Winter', month: 'TYPICALLY OCTOBER', deg: 150 },
]
const EACH = ['Release notes read against your org', 'Tested in a sandbox preview', 'Reaches production']

const rad = (d) => (d * Math.PI) / 180
/** Polyline arc, clockwise from a to b degrees, ending in a chevron. */
function arc(k, cx, cy, r, a, b, head) {
  const pts = []
  for (let d = a; d < b; d += 4) pts.push([cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))])
  const end = [cx + r * Math.cos(rad(b)), cy + r * Math.sin(rad(b))]
  pts.push(end)
  const tan = rad(b + 90) // clockwise tangent at the end
  const back = (o) => [end[0] - head * Math.cos(tan + o), end[1] - head * Math.sin(tan + o)]
  return [wire(k, pts), wire(k, [back(rad(32)), end, back(rad(-32))])]
}

function releaseDesktop() {
  const t = TYPE.desktop
  const W = 560, cx = 280, cy = 292, r = 196, bw = 176
  const items = []
  const nodes = SEASONS.map((s) => {
    const px = cx + r * Math.cos(rad(s.deg)), py = cy + r * Math.sin(rad(s.deg))
    const lines = [{ t: s.name, size: t.title, weight: 600 }, { t: s.month, size: t.tag, mono: true, fill: 'ink3', gap: 6 }]
    const h = box({ x: 0, y: 0, w: bw, pad: 14, lines }).need
    return box({ k: s.k, x: round(px - bw / 2), y: round(py - h / 2), w: bw, pad: 14, lines })
  })
  // arcs stop clear of the boxes; each arc is keyed to the release it arrives at
  items.push(...arc('summer', cx, cy, r, -90 + 32, 30 - 20, 10), ...arc('winter', cx, cy, r, 30 + 20, 150 - 20, 10), ...arc('spring', cx, cy, r, 150 + 20, 270 - 32, 10))
  // centre: what happens at each release
  let y = cy - 106
  items.push(text('EACH RELEASE', cx, y, { size: t.tag, mono: true, fill: 'ink3', anchor: 'middle' }))
  y += 8
  EACH.forEach((s, i) => {
    y += 12
    wrap(`${i + 1}. ${s}`, 190, t.label).forEach((l) => {
      y += t.label + 4
      items.push(text(l, cx, y, { size: t.label, fill: 'ink2', anchor: 'middle' }))
    })
  })
  items.push(...nodes)
  return { w: W, h: 516, items }
}

function releaseMobile() {
  const t = TYPE.mobile
  const W = 640, bx = 40, bw = 520, pad = 22
  const items = []
  let y = 40
  items.push(text('EACH RELEASE', bx, y, { size: t.tag, mono: true, fill: 'ink3' }))
  y += 6
  EACH.forEach((s, i) => {
    y += 14
    wrap(`${i + 1}. ${s}`, W - bx * 2, t.label).forEach((l) => {
      y += t.label + 6
      items.push(text(l, bx, y, { size: t.label, fill: 'ink2' }))
    })
  })
  y += 44
  const boxes = []
  for (const s of SEASONS) {
    const b = box({ k: s.k, x: bx, y, w: bw - 40, pad, lines: [
      { t: s.name, size: t.title, weight: 600 },
      { t: s.month, size: t.tag, mono: true, fill: 'ink3', gap: 8 },
    ] })
    boxes.push(b)
    y = b.y + b.h + 48
  }
  const vx = bx + 28
  const mid = (b) => b.y + b.h / 2
  const right = bx + bw - 40
  items.push(
    wire('summer', [[vx, boxes[0].y + boxes[0].h], [vx, boxes[1].y]]),
    wire('winter', [[vx, boxes[1].y + boxes[1].h], [vx, boxes[2].y]]),
    // back round to Spring: the cycle repeats every year
    wire('spring', [[right, mid(boxes[2])], [W - 40, mid(boxes[2])], [W - 40, mid(boxes[0])], [right, mid(boxes[0])]]),
    wire('spring', [[right + 12, mid(boxes[0]) - 10], [right, mid(boxes[0])], [right + 12, mid(boxes[0]) + 10]]),
    ...boxes,
  )
  return { w: W, h: y - 48 + 32, items }
}

export default [
  {
    id: 'salesforce-managed-services-change-process',
    title: 'How a change moves under Salesforce managed services',
    alt: 'Diagram of how a change is handled under Salesforce managed services: your admin keeps day-to-day user requests, and each change we take is built in a sandbox, tested, deployed and written down with what changed and why, with a release check before each of Salesforce’s three yearly releases.',
    tone: 'light',
    og: 'og-salesforce-managed-services',
    legend: [
      { k: 'admin', label: 'Your admin hands over a change' },
      { k: 'build', label: 'Built in a sandbox' },
      { k: 'test', label: 'Tested' },
      { k: 'deploy', label: 'Deployed' },
      { k: 'doc', label: 'Written down: what changed and why' },
      { k: 'release', label: 'Release check, three times a year' },
    ],
    desktop: changeDesktop(),
    mobile: changeMobile(),
  },
  {
    id: 'salesforce-release-cycle-spring-summer-winter',
    title: 'Salesforce’s three releases a year',
    alt: 'Diagram of Salesforce’s three releases a year, Spring, Summer and Winter, typically in February, June and October, each read against your org and tested in a sandbox before it reaches production.',
    tone: 'light',
    legend: SEASONS.map((s) => ({ k: s.k, label: `${s.name} release` })),
    desktop: releaseDesktop(),
    mobile: releaseMobile(),
  },
]
