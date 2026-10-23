// Plates for /services/salesforce-marketing-cloud-consulting. Convention: top of scripts/plates.mjs.
// MC-F1 (spec §3): a TYPICAL Marketing Cloud Connect set-up, not a client account.
// ⛔ No Marketing Cloud screenshot anywhere on this page: we hold no account of our
// own and a client's may not be shown. Tool names only, no Salesforce logos.
// The opt-out lane is drawn heavier (an underlay shape) and two-way, because
// Salesforce Help ("Unsubscribes", Marketing Cloud Connect, read 2026-10-23) says
// ticking Email Opt Out by hand does not change Marketing Cloud's status and an
// unsubscribe made only in Marketing Cloud does not tick Email Opt Out.
import { box, wire, text, shape, column, TYPE } from './_lib.mjs'

const NODES = [
  { k: 'crm', tag: 'SALES OR SERVICE CLOUD', title: 'Your CRM records', line: 'Contacts, Leads and Campaign Members, with the Email Opt Out field' },
  { k: 'sync', tag: 'CONNECTOR', title: 'Marketing Cloud Connect', line: 'Syncs the objects and fields you choose, on a schedule' },
  { k: 'de', tag: 'CONTACT BUILDER', title: 'Synchronized data extensions', line: 'Your CRM data as Marketing Cloud sees it' },
  { k: 'journey', tag: 'JOURNEY BUILDER · AUTOMATION STUDIO', title: 'Audiences and timing', line: 'Who gets which message, and when' },
  { k: 'send', tag: 'SENDS', title: 'Email and SMS', line: 'Sent to the audience, minus anyone unsubscribed' },
]
// Wire key per hop: crm->connect and connect->extensions are both the sync.
const HOPS = ['sync', 'sync', 'journey', 'send']
const LANE = 'Unsubscribes and Email Opt Out, both ways'
const LANE_TAG = 'TESTED IN BOTH DIRECTIONS'

const linesFor = (n, t) => [
  { t: n.tag, size: t.tag, mono: true, fill: 'ink3' },
  { t: n.title, size: t.title, weight: 600, gap: t.tag / 2 },
  { t: n.line, size: t.label, fill: 'ink2', gap: t.label * 0.6 },
]
const chevron = (k, x, y, dir, s) => {
  const d = { right: [[x - s, y - s], [x, y], [x - s, y + s]], down: [[x - s, y - s], [x, y], [x + s, y - s]],
    up: [[x - s, y + s], [x, y], [x + s, y + s]], left: [[x + s, y - s], [x, y], [x + s, y + s]] }[dir]
  return wire(k, d)
}

function desktop() {
  const t = TYPE.desktop
  const W = 1136, y = 32, w = 184, gap = (W - 64 - w * 5) / 4
  const xs = NODES.map((_, i) => Math.round(32 + i * (w + gap)))
  const h = Math.max(...NODES.map((n, i) => box({ k: n.k, x: xs[i], y, w, pad: 14, lines: linesFor(n, t) }).need))
  const boxes = NODES.map((n, i) => box({ k: n.k, x: xs[i], y, w, h, pad: 14, lines: linesFor(n, t) }))
  const hy = y + 30
  const hops = HOPS.flatMap((k, i) => [wire(k, [[xs[i] + w, hy], [xs[i + 1], hy]]), chevron(k, xs[i + 1] - 1, hy, 'right', 6)])
  // Two-way opt-out lane under the row: CRM <-> Connect <-> sends.
  const B = y + h, laneY = B + 52
  const c = (i) => xs[i] + w / 2
  const lane = [[c(0), B], [c(0), laneY], [c(4), laneY], [c(4), B]]
  const laneD = 'M' + lane.map(([a, b]) => `${a} ${b}`).join(' L')
  return {
    w: W,
    h: laneY + 84,
    items: [
      shape({ d: laneD, stroke: 'wire', width: 4 }),
      shape({ d: `M${c(1)} ${B} L${c(1)} ${laneY}`, stroke: 'wire', width: 4 }),
      ...hops,
      wire('optout', lane),
      wire('optout', [[c(1), B], [c(1), laneY]]),
      chevron('optout', c(0), B + 1, 'up', 7),
      chevron('optout', c(4), B + 1, 'up', 7),
      ...boxes,
      text(LANE, c(0), laneY + 30, { size: t.label, fill: 'ink2' }),
      text(LANE_TAG, c(0), laneY + 52, { size: t.tag, mono: true, fill: 'signal' }),
    ],
  }
}

function mobile() {
  const t = TYPE.mobile
  const x = 32, w = 492, lx = 588
  const { boxes, bottom } = column(NODES.map((n) => ({ k: n.k, lines: linesFor(n, t), pad: 24 })), { x, w, y: 32, gap: 64 })
  const hops = boxes.slice(1).flatMap((b, i) => [
    wire(HOPS[i], [[60, boxes[i].y + boxes[i].h], [60, b.y]]),
    chevron(HOPS[i], 60, b.y - 1, 'down', 10),
  ])
  const my = (b) => b.y + 40
  const first = boxes[0], conn = boxes[1], last = boxes[4]
  const lane = [[x + w, my(first)], [lx, my(first)], [lx, my(last)], [x + w, my(last)]]
  const laneD = 'M' + lane.map(([a, b]) => `${a} ${b}`).join(' L')
  const ly = bottom + 56
  return {
    w: 640,
    h: ly + 84,
    items: [
      shape({ d: laneD, stroke: 'signal', width: 7 }),
      shape({ d: `M${x + w} ${my(conn)} L${lx} ${my(conn)}`, stroke: 'signal', width: 7 }),
      ...hops,
      wire('optout', lane),
      wire('optout', [[x + w, my(conn)], [lx, my(conn)]]),
      chevron('optout', x + w + 1, my(first), 'left', 10),
      chevron('optout', x + w + 1, my(last), 'left', 10),
      ...boxes,
      text(LANE, x, ly, { size: t.label, fill: 'ink2' }),
      text(LANE_TAG, x, ly + 44, { size: t.tag, mono: true, fill: 'signal' }),
    ],
  }
}

export default [
  {
    id: 'marketing-cloud-connect-data-flow',
    title: 'A typical Marketing Cloud Connect set-up',
    alt: 'Diagram of a typical Marketing Cloud Connect set-up: contacts, leads and campaign data sync from Salesforce into Marketing Cloud data extensions on a schedule and feed journeys and automations, while unsubscribes and opt-outs flow back so both systems agree on who must not be contacted.',
    tone: 'light',
    og: 'og-salesforce-marketing-cloud-consulting',
    desktop: desktop(),
    mobile: mobile(),
  },
]
