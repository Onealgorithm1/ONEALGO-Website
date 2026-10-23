// Plates for /services/salesforce-consulting-partner-pennsylvania. See the convention in scripts/plates.mjs.
// PA-F1 (spec §3): one wire through four checkpoints, keyed c1-c4 to the HOW_TO_CHECK
// blocks on the page. It does not draw Salesforce's UI and carries none of our own values.
//
// ⛔ Facts re-checked 2026-10-23 before drawing (they changed since the 2026-09-01 page):
// - Partner Finder: salesforce.com/partners/find-a-consulting-partner links
//   "AppExchange Partner Finder" at appexchange.salesforce.com/consulting.
// - Tiers: Salesforce's FY27 consulting partner program (brochure, and Salesforce Ben
//   2026-03-03 "Salesforce massively overhauls partner program") has two tiers, Select
//   and Summit, replacing Base / Ridge / Crest / Summit. The old page's "Provisional" tier
//   and "only Summit shows a badge" could NOT be confirmed for 2026, so neither is drawn.
// - Competencies: Accredited or Expert, measured by certifications, completed projects and
//   CSAT. Salesforce publishes no thresholds we could confirm, so none are drawn.
import { box, wire, column, TYPE } from './_lib.mjs'

const CHECKS = [
  { k: 'c1', n: 'CHECK 01', title: 'Find the firm in Partner Finder', lines: ['AppExchange Partner Finder, the Consultants section of AppExchange', 'Search the firm’s name and open its listing'] },
  { k: 'c2', n: 'CHECK 02', title: 'Read the tier', lines: ['Select or Summit, the two tiers in Salesforce’s current partner program', 'Base, Ridge and Crest are retired names'] },
  { k: 'c3', n: 'CHECK 03', title: 'Read the competency row', lines: ['The row for the product you are buying', 'Accredited or Expert, earned with certifications, projects and customer satisfaction'] },
  { k: 'c4', n: 'CHECK 04', title: 'Count people, certifications, ratings', lines: ['Salesforce certifies people, not companies', 'Ask who on the listing will work on your org'] },
]

const linesFor = (c, t) => [
  { t: c.n, size: t.tag, mono: true, fill: 'ink3' },
  { t: c.title, size: t.title, weight: 600, gap: t.tag / 2 },
  ...c.lines.map((l, i) => ({ t: l, size: t.label, fill: 'ink2', gap: i ? t.label / 2 : t.label * 0.75 })),
]

function desktop() {
  const t = TYPE.desktop
  const W = 1136, y = 40, w = 244, step = (W - 64 - w) / 3
  const at = (i) => Math.round(32 + i * step)
  const h = Math.max(...CHECKS.map((c, i) => box({ k: c.k, x: at(i), y, w, lines: linesFor(c, t) }).need))
  const boxes = CHECKS.map((c, i) => box({ k: c.k, x: at(i), y, w, h, lines: linesFor(c, t) }))
  // The spine: each wire runs into the checkpoint it is keyed to.
  const wires = boxes.slice(1).map((b, i) => wire(b.node, [[boxes[i].x + w, y + 24], [b.x, y + 24]]))
  return { w: W, h: y + h + 40, items: [...wires, ...boxes] }
}

function mobile() {
  const t = TYPE.mobile
  const { boxes, bottom } = column(CHECKS.map((c) => ({ k: c.k, lines: linesFor(c, t), pad: 24 })), { x: 32, w: 576, y: 32, gap: 48 })
  const wires = boxes.slice(1).map((b, i) => wire(b.node, [[56, boxes[i].y + boxes[i].h], [56, b.y]]))
  return { w: 640, h: bottom + 32, items: [...wires, ...boxes] }
}

export default [
  {
    id: 'how-to-check-a-salesforce-partner',
    title: 'How to check any Salesforce partner',
    alt: 'Diagram of four checks for any Salesforce partner: find the firm in AppExchange Partner Finder, read its tier, read the competency row for the product you are buying, and count its certified people, certifications and customer ratings.',
    tone: 'light',
    og: 'og-salesforce-partner-pennsylvania',
    desktop: desktop(),
    mobile: mobile(),
  },
]
