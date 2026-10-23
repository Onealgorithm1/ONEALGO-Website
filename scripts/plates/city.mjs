// Plates for the city template /services/salesforce-consultant-<slug> (12 cities + Houston).
// See the convention in scripts/plates.mjs. Spec §3 "City template": four plates per city.
//
//   CITY-F1 salesforce-jobs-<slug>                    open LinkedIn listings by role (lead plate, og)
//   CITY-F2 <slug>-business-establishments-2018-2023  slope chart, Census CBP 2018 -> 2023
//   CITY-F3 <slug>-largest-industries                 employees by industry, Census CBP 2023
//   CITY-F4 salesforce-community-<slug>               Trailblazer groups within 50 km, the
//                                                     Salesforce office line, and us (remote)
//
// Every number is read from client/data/salesforceCities.ts (generated from sourced pulls);
// nothing is typed here. Philadelphia is in that file too but has its own page: its plates
// belong in scripts/plates/philadelphia.mjs, which can reuse the builders exported below:
//   import { jobsPlate, industriesPlate } from './city.mjs'
//   export default [jobsPlate(cityBySlug('philadelphia')), industriesPlate(cityBySlug('philadelphia'))]
// (spec §3 PHL-F2/F3 "from the city pipeline"). Never list a plate id in two spec files.
//
// The old scripts/salesforce-images.mjs, which also wrote salesforce-jobs-<slug>.svg,
// <slug>-largest-industries.svg (+ -m) and og-<slug>.jpg, is retired (deleted 2026-10-23,
// README.md). These ids are owned here alone; `node scripts/plates.mjs city --og` renders them.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { box, wire, text, shape, slope, TYPE } from './_lib.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const src = fs.readFileSync(path.join(root, 'client/data/salesforceCities.ts'), 'utf8')
export const CITIES = JSON.parse(src.slice(src.indexOf('= [') + 2, src.lastIndexOf('] as const') + 1))
export const cityBySlug = (slug) => CITIES.find((c) => c.slug === slug)
/** Slugs rendered by SalesforceCity.tsx. Philadelphia has its own page. */
export const TEMPLATE_SLUGS = CITIES.map((c) => c.slug).filter((s) => s !== 'philadelphia')

const n = (v) => Number(v).toLocaleString('en-US')
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const roleName = (r) => r.replace(/^Salesforce /, '')
/** Short industry label for a chart row (the page text keeps the full Census label). */
export const industryLabel = (l) =>
  cap(l)
    .replace('Professional, scientific and technical services', 'Professional, scientific and technical')
    .replace('Nonprofit, civic and professional organizations', 'Nonprofit and civic organizations')
/** Overlay / row key for an industry: "i62", "i31-33". */
export const industryKey = (code) => `i${code}`
export const ROLE_KEY = { Administrator: 'admin', Developer: 'dev', Consultant: 'consultant', Architect: 'architect' }

/**
 * Hairline bar rows: label above, a wire from zero to the value, a square node at
 * the end and the value in mono. Bars are wires so they draw and cross-highlight
 * like every other plate (spec §1.2); each row's `k` matches its HTML row.
 */
export function barRows({ x, y, w, rows, t, rowGap }) {
  const items = []
  const max = Math.max(...rows.map((r) => r.value))
  const valueW = Math.max(...rows.map((r) => n(r.value).length)) * t.label * 0.6 + t.label
  const plotW = w - valueW
  let cy = y
  for (const r of rows) {
    items.push(text(r.label, x, cy + t.label, { size: t.label, fill: 'ink2' }))
    const my = Math.round(cy + t.label + t.label * 0.9)
    const len = Math.max(t.tag, (r.value / max) * plotW)
    items.push(shape({ rect: [x, my - 0.5, plotW, 1], fill: 'line' }))
    items.push(shape({ rect: [x - 1, my - t.tag / 2, 2, t.tag], fill: 'node' }))
    items.push(wire(r.k, [[x, my], [x + len, my]]))
    items.push(shape({ rect: [x + len - t.tag / 3, my - t.tag / 3, (t.tag * 2) / 3, (t.tag * 2) / 3], fill: 'node' }))
    items.push(text(n(r.value), x + len + t.label * 0.75, my + t.label * 0.35, { size: t.label, mono: true, weight: 600 }))
    cy = my + rowGap
  }
  return { items, bottom: cy - rowGap + t.label }
}

const jobsRows = (c) =>
  [...c.jobs].sort((a, b) => b.count - a.count).map((j) => ({ k: ROLE_KEY[roleName(j.role)], label: roleName(j.role), value: j.count }))

export function jobsAlt(c) {
  return `Bar chart of open Salesforce job listings within 25 miles of ${c.name} on ${c.jobsPulled}, one LinkedIn search per role: ${jobsRows(c)
    .map((r) => `${r.label} ${n(r.value)}`)
    .join(', ')}. Source: LinkedIn public job search.`
}

/** CITY-F1: the lead plate. `og` renders og-<slug>.jpg and the 1600x900 preferred image. */
export function jobsPlate(c, { og = true } = {}) {
  const rows = jobsRows(c)
  const draw = (t, W, pad, rowGap) => {
    const { items, bottom } = barRows({ x: pad, y: pad - 4, w: W - pad * 2, rows, t, rowGap })
    return { w: W, h: Math.round(bottom + pad), items }
  }
  return {
    id: `salesforce-jobs-${c.slug}`,
    title: `Open Salesforce job listings near ${c.name}`,
    alt: jobsAlt(c),
    tone: 'light',
    ...(og ? { og: `og-${c.slug}` } : {}),
    desktop: draw({ ...TYPE.desktop, label: 18, tag: 12 }, 720, 32, 40),
    mobile: draw(TYPE.mobile, 640, 32, 56),
  }
}

export function growthAlt(c) {
  return `Slope chart, ${c.name} metro: business establishments went from ${n(c.establishments2018.value)} in 2018 to ${n(c.establishments.value)} in 2023, and establishments with 500 or more employees went from ${n(c.size500plus2018.value)} to ${n(c.size500plus.value)}. Source: US Census Bureau, County Business Patterns.`
}

/**
 * Slope lanes. Like _lib's slope(), but the end values sit OUTSIDE the two year
 * axes and each lane's label sits above its own line, so nothing collides at the
 * -m type size (26u). Each series has its own vertical scale.
 */
function slopeLanes({ W, size, laneH, series }) {
  const valueW = Math.max(...series.flatMap((s) => [n(s.a).length, n(s.b).length])) * size * 0.6
  const x0 = Math.round(24 + valueW + size * 0.6)
  const x1 = Math.round(W - 24 - valueW - size * 0.6)
  const top = size * 2.2
  const items = [
    text('2018', x0, top - size * 0.6, { size, mono: true, fill: 'ink3', anchor: 'middle' }),
    text('2023', x1, top - size * 0.6, { size, mono: true, fill: 'ink3', anchor: 'middle' }),
    shape({ d: `M${x0} ${top} L${x0} ${top + laneH * series.length} M${x1} ${top} L${x1} ${top + laneH * series.length}`, stroke: 'line', width: 1 }),
  ]
  series.forEach((s, i) => {
    const laneTop = top + i * laneH
    const pct = ((s.b - s.a) / s.a) * 100
    items.push(text(`${s.label} · ${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`, (x0 + x1) / 2, laneTop + size * 1.4, { size: size - 2, mono: true, fill: 'ink2', anchor: 'middle' }))
    const y0 = laneTop + size * 2.6
    const span = laneH - size * 3.6
    const lo = Math.min(s.a, s.b)
    const hi = Math.max(s.a, s.b)
    const sy = (v) => Math.round(hi === lo ? y0 + span / 2 : y0 + span - ((v - lo) / (hi - lo)) * span)
    items.push(wire(s.k, [[x0, sy(s.a)], [x1, sy(s.b)]]))
    for (const [x, v, anchor] of [[x0, s.a, 'end'], [x1, s.b, 'start']]) {
      items.push(shape({ rect: [x - size / 4, sy(v) - size / 4, size / 2, size / 2], fill: 'node' }))
      items.push(text(n(v), x + (anchor === 'end' ? -size * 0.6 : size * 0.6), sy(v) + size * 0.35, { size, mono: true, weight: 600, anchor }))
    }
  })
  return { items, h: Math.round(top + laneH * series.length + size) }
}

/** CITY-F2: each series on its own scale, so the slope reads as direction and size of change. */
export function growthPlate(c) {
  const series = [
    { k: 'all', label: 'All establishments', a: c.establishments2018.value, b: c.establishments.value },
    { k: 'big', label: '500+ employees', a: c.size500plus2018.value, b: c.size500plus.value },
  ]
  const draw = (W, size, laneH) => {
    const { items, h } = slopeLanes({ W, size, laneH, series })
    return { w: W, h, items }
  }
  return {
    id: `${c.slug}-business-establishments-2018-2023`,
    title: `${c.name} metro business establishments, 2018 and 2023`,
    alt: growthAlt(c),
    tone: 'light',
    desktop: draw(720, 17, 150),
    mobile: draw(640, 26, 250),
  }
}

export function industriesAlt(c) {
  return `Bar chart of the largest employer groups in the ${c.name} metro by employees: ${c.industries
    .map((i) => `${i.label} ${n(i.employees)}`)
    .join(', ')}. Source: US Census Bureau, County Business Patterns 2023.`
}

/** CITY-F3: all four groups (finance always shows when it is in the city's top four). */
export function industriesPlate(c) {
  const rows = c.industries.map((i) => ({ k: industryKey(i.code), label: industryLabel(i.label), value: i.employees }))
  const draw = (t, W, pad, rowGap) => {
    const { items, bottom } = barRows({ x: pad, y: pad - 4, w: W - pad * 2, rows, t, rowGap })
    return { w: W, h: Math.round(bottom + pad), items }
  }
  return {
    id: `${c.slug}-largest-industries`,
    title: `Largest employer groups, ${c.name} metro`,
    alt: industriesAlt(c),
    tone: 'light',
    desktop: draw({ ...TYPE.desktop, label: 18, tag: 12 }, 720, 32, 40),
    mobile: draw(TYPE.mobile, 640, 32, 56),
  }
}

/** The office line, shared by the plate, its alt and the page. */
export function officeLine(c) {
  if (c.salesforceOffice) return `Salesforce office: ${c.salesforceOffice.split(';')[0].trim()}`
  return c.nearestOffice ? `No Salesforce office in ${c.name}; nearest: ${c.nearestOffice}` : `No Salesforce office listed in ${c.name}`
}

export function communityAlt(c) {
  const g = c.community.groups
  const groups = g.length
    ? `${g.length} Trailblazer Community Group${g.length === 1 ? '' : 's'} within 50 km (${g.map((x) => x.name).join('; ')})`
    : 'no Trailblazer Community Group within 50 km'
  return `Diagram of the Salesforce community around ${c.name}: ${groups}. ${officeLine(c)}. OneAlgorithm is in Malvern, Pennsylvania, and runs the work remotely, inside your Salesforce org.`
}

/** CITY-F4. Group nodes hang off one bus from the metro node, nearest first; each group's
 *  wire is keyed g1..gN so the HTML list can light it. The OneAlgorithm node sits off the
 *  grid on a dashed wire. No events: they go stale (the page lists them as HTML). */
export function communityPlate(c) {
  const groups = c.community.groups
  // `compact` (desktop): one line per group, distance right-aligned in mono.
  // The -m file stacks the distance above the name, because 26u names wrap.
  const draw = (t, W, pad, nodeGap, compact) => {
    const items = []
    const busX = pad + t.label * 1.5
    const nodeX = busX + t.label * 2.5
    const nodeW = W - nodeX - pad
    const city = box({ x: pad, y: pad, w: Math.min(W - pad * 2, t.label * 16), pad: t.label * 0.75,
      lines: [{ t: 'METRO CENTRE · 0 KM', size: t.tag, mono: true, fill: 'ink3' }, { t: c.name, size: t.title, weight: 600, gap: t.tag / 2 }] })
    let cy = city.y + city.h + nodeGap
    const kmW = t.tag * 0.6 * 6 + t.label
    const rows = groups.map((g, i) => {
      const lines = compact
        ? [{ t: g.name, size: t.label }]
        : [{ t: `${g.km} KM · ${g.city.toUpperCase()}`, size: t.tag, mono: true, fill: 'ink3' }, { t: g.name, size: t.label, gap: t.tag / 3 }]
      const b = box({ k: `g${i + 1}`, x: nodeX, y: cy, w: compact ? nodeW - kmW : nodeW, pad: t.label * 0.6, lines })
      if (compact) {
        b.w = nodeW
        items.push(text(`${g.km} KM`, nodeX + nodeW - t.label * 0.6, b.y + b.h / 2 + t.tag * 0.35, { size: t.tag, mono: true, fill: 'ink3', anchor: 'end' }))
      }
      cy += b.h + nodeGap / 2
      return b
    })
    const office = box({ k: 'office', x: nodeX, y: cy + nodeGap / 2, w: nodeW, pad: t.label * 0.6,
      lines: [{ t: 'SALESFORCE OFFICE', size: t.tag, mono: true, fill: 'ink3' }, { t: officeLine(c).replace(/^Salesforce office: /, ''), size: t.label, gap: t.tag / 3 }] })
    cy = office.y + office.h
    const dashTop = cy + nodeGap
    const remote = 'remote, in person when a meeting needs it'
    const oaY = dashTop + t.label * 3.2
    const oa = box({ k: 'oa', x: pad, y: oaY, w: W - pad * 2, pad: t.label * 0.75,
      lines: [{ t: 'ONEALGORITHM · MALVERN, PA (REMOTE)', size: t.tag, mono: true, fill: 'ink3' }, { t: 'Runs the work remotely, inside your Salesforce org', size: t.label, gap: t.tag / 3 }] })
    // Wires first (they render under the nodes anyway; order = draw order of overlay groups).
    const top = city.y + city.h
    rows.forEach((b) => items.push(wire(b.node, [[busX, top], [busX, b.y + b.h / 2], [b.x, b.y + b.h / 2]])))
    items.push(wire('office', [[busX, top], [busX, office.y + office.h / 2], [office.x, office.y + office.h / 2]]))
    items.push(wire('oa', [[busX, office.y + office.h / 2], [busX, oa.y]], { dashed: true }))
    items.push(text(remote, busX + t.label, dashTop + t.label * 1.2, { size: t.tag + 1, mono: true, fill: 'ink3' }))
    items.push(city, ...rows, office, oa)
    return { w: W, h: Math.round(oa.y + oa.h + pad), items }
  }
  return {
    id: `salesforce-community-${c.slug}`,
    title: `The Salesforce community around ${c.name}`,
    alt: communityAlt(c),
    tone: 'light',
    desktop: draw({ ...TYPE.desktop, label: 17, tag: 13, title: 19 }, 560, 24, 20, true),
    mobile: draw(TYPE.mobile, 640, 24, 28),
  }
}

export const cityPlates = (c) => [jobsPlate(c), growthPlate(c), industriesPlate(c), communityPlate(c)]

export default TEMPLATE_SLUGS.flatMap((s) => cityPlates(cityBySlug(s)))
