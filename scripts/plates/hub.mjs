// Plates for /services/salesforce (the hub). See the convention in scripts/plates.mjs.
// HUB-F1 (spec §3): four stations of an implementation. Every station line is
// VERBATIM from PILLARS in client/pages/services/Salesforce.tsx; left out on
// purpose: CloudHub, Hypercare, Agentforce, retainer and 24/7.
import { box, wire, text, column, TYPE } from './_lib.mjs'

const STATIONS = [
  { k: 's1', n: '01', title: 'Before you buy licenses', lines: ['A license count and a rough cost, before anyone signs', 'Which clouds and edition you need — and which you don’t'] },
  { k: 's2', n: '02', title: 'Configuration and build', lines: ['Sales Cloud and Service Cloud configuration', 'Flow automation for the manual steps'] },
  { k: 's3', n: '03', title: 'Data migration and integration', lines: ['Load, then reconcile record counts and totals', 'ERP-to-Salesforce syncs, SAP included, so both sides agree'] },
  { k: 's4', n: '04', title: 'After go-live', lines: ['Release-window testing before every Salesforce upgrade', 'Reports and dashboards changed as the questions change'] },
]
const BRANCH = 'Take any stage on its own'

const linesFor = (s, t) => [
  { t: s.n, size: t.tag, mono: true, fill: 'ink3' },
  { t: s.title, size: t.title, weight: 600, gap: t.tag / 2 },
  ...s.lines.map((l, i) => ({ t: l, size: t.label, fill: 'ink2', gap: i ? t.label / 2 : t.label * 0.75 })),
]

function desktop() {
  const t = TYPE.desktop
  const W = 1136, y = 40, w = 230, step = (W - 64 - w) / 3
  const draft = STATIONS.map((s, i) => box({ k: s.k, x: Math.round(32 + i * step), y, w, lines: linesFor(s, t) }))
  const h = Math.max(...draft.map((b) => b.need))
  const boxes = STATIONS.map((s, i) => box({ k: s.k, x: Math.round(32 + i * step), y, w, h, lines: linesFor(s, t) }))
  const wires = boxes.slice(1).map((b, i) => wire(b.node, [[boxes[i].x + w, y + 24], [b.x, y + 24]]))
  const s3 = boxes[2], bottom = y + h, bx = s3.x + w / 2
  return {
    w: W,
    h: bottom + 44 + 40,
    items: [...wires, wire('any', [[bx, bottom], [bx, bottom + 44], [bx + 28, bottom + 44]], { dashed: true }), ...boxes,
      text(BRANCH, bx + 40, bottom + 44 + 5.5, { size: t.label, fill: 'ink2' })],
  }
}

function mobile() {
  const t = TYPE.mobile
  const { boxes, bottom } = column(STATIONS.map((s) => ({ k: s.k, lines: linesFor(s, t), pad: 24 })), { x: 32, w: 520, y: 32, gap: 48 })
  const wires = boxes.slice(1).map((b, i) => wire(b.node, [[56, boxes[i].y + boxes[i].h], [56, b.y]]))
  const s3 = boxes[2], my = s3.y + s3.h / 2, end = bottom + 40
  return {
    w: 640,
    h: end + 52,
    items: [...wires, wire('any', [[552, my], [604, my], [604, end]], { dashed: true }), ...boxes,
      text(BRANCH, 604, end + 36, { size: t.label, fill: 'ink2', anchor: 'end' })],
  }
}

export default [
  {
    id: 'salesforce-implementation-stages',
    title: 'How a Salesforce implementation runs',
    alt: 'Diagram of a Salesforce implementation in four stages: before you buy licenses, configuration and build, data migration and integration, and after go-live. A branch shows that any single stage can be taken on its own.',
    tone: 'light',
    og: 'og-salesforce',
    legend: STATIONS.map((s) => ({ k: s.k, label: s.title })),
    desktop: desktop(),
    mobile: mobile(),
  },
]
