// Generator for the 64 web-design PLACE pages (42 metros + 22 states: PA, NJ, DE from rev 3, 19 more at rev 4) on the one local template.
//   node scripts/wd-local-gen.mjs            -> client/data/wd-local/<slug>.ts (64), client/data/wd-local/places.ts (index),
//                                              public/og/places/web-design-<slug>.jpg (1200x630), build-wave12/routes-manifest.json
//   node scripts/wd-local-gen.mjs --no-og    -> data + manifest only
// Inputs (read-only, all in the 2026-10-24_webdev-seo run): page-map-webdev.json (national_ranking, rows, build_order),
// facts/economy/facts.json + facts-metros.json (Census CBP 2023/2018, ACS 2024/2019; every row has its query URL),
// demand/semrush-volumes.json (Semrush US exact), demand/suggest-places.json + suggest-base.json (autocomplete),
// client/data/wd-local/photos.ts (the photo agent's file). Copy rules: structure-spec.md §1-§3, §7-§8.1, §12.1;
// page-map-webdev.md §4 (D1-D9); owner rules 2026-10-24 (remote is the default sentence; nationwide by the same numbers).
// ⛔ Every number printed in copy is registered in the page's `trace` (value -> source); scripts/wd-local-check.mjs
//    fails any figure it cannot trace. Do not hand-edit the generated files: change this script and re-run it.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const REPO = "C:/Users/louis/oa-sf-redesign";
const RUN = "C:/Users/louis/onealgo-icm-oa/areas/sales/runs/2026-10-24_webdev-seo";
const OUT = `${REPO}/client/data/wd-local`;
const TODAY = "2026-10-24";
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const MAP = readJson(`${RUN}/page-map-webdev.json`);
const FACTS = [...readJson(`${RUN}/facts/economy/facts.json`), ...readJson(`${RUN}/facts/economy/facts-metros.json`), ...readJson(`${RUN}/facts/economy/facts-states.json`)]; // first match wins: rev-3 pages read the same rows as before
const SEM = readJson(`${RUN}/demand/semrush-volumes.json`);
const SUGGEST = readJson(`${RUN}/demand/suggest-places.json`);

/* ---------- places: display name, state, Census geo, time zone, map position (only used to pick neighbours) ---------- */
// tz: ET / CT / MT / PT / AZ (Arizona keeps Mountain Standard Time all year). Coordinates: city centres, approximate.
const META = {
  "New York": { st: "NY", state: "New York", geo: "msa:35620", tz: "ET", ll: [40.71, -74.01] },
  "Los Angeles": { st: "CA", state: "California", geo: "msa:31080", tz: "PT", ll: [34.05, -118.24] },
  "Chicago": { st: "IL", state: "Illinois", geo: "msa:16980", tz: "CT", ll: [41.88, -87.63] },
  "Houston": { st: "TX", state: "Texas", geo: "msa:26420", tz: "CT", ll: [29.76, -95.37] },
  "Phoenix": { st: "AZ", state: "Arizona", geo: "msa:38060", tz: "AZ", ll: [33.45, -112.07] },
  "San Antonio": { st: "TX", state: "Texas", geo: "msa:41700", tz: "CT", ll: [29.42, -98.49] },
  "San Diego": { st: "CA", state: "California", geo: "msa:41740", tz: "PT", ll: [32.72, -117.16] },
  "Dallas": { st: "TX", state: "Texas", geo: "msa:19100", tz: "CT", ll: [32.78, -96.8], metroWord: "Dallas-Fort Worth" },
  "Austin": { st: "TX", state: "Texas", geo: "msa:12420", tz: "CT", ll: [30.27, -97.74] },
  "Jacksonville": { st: "FL", state: "Florida", geo: "msa:27260", tz: "ET", ll: [30.33, -81.66], drop: /\b(nc|ar)\b/ },
  "Columbus": { st: "OH", state: "Ohio", geo: "msa:18140", tz: "ET", ll: [39.96, -83.0], drop: /\b(ga|georgia|in|indiana|ms)\b/ },
  "Charlotte": { st: "NC", state: "North Carolina", geo: "msa:16740", tz: "ET", ll: [35.23, -80.84], drop: /charlotte's|charlottesville/ },
  "Indianapolis": { st: "IN", state: "Indiana", geo: "msa:26900", tz: "ET", ll: [39.77, -86.16] },
  "San Francisco": { st: "CA", state: "California", geo: "msa:41860", tz: "PT", ll: [37.77, -122.42], metroWord: "San Francisco-Oakland" },
  "Seattle": { st: "WA", state: "Washington", geo: "msa:42660", tz: "PT", ll: [47.61, -122.33] },
  "Denver": { st: "CO", state: "Colorado", geo: "msa:19740", tz: "MT", ll: [39.74, -104.99], drop: /\bnc\b/ },
  "Nashville": { st: "TN", state: "Tennessee", geo: "msa:34980", tz: "CT", ll: [36.16, -86.78] },
  "Washington, DC": { st: "DC", state: "District of Columbia", geo: "msa:47900", tz: "ET", ll: [38.91, -77.04], key: "washington dc", noSt: true },
  "Boston": { st: "MA", state: "Massachusetts", geo: "msa:14460", tz: "ET", ll: [42.36, -71.06] },
  "Las Vegas": { st: "NV", state: "Nevada", geo: "msa:29820", tz: "PT", ll: [36.17, -115.14], drop: /north las vegas/ },
  "Portland": { st: "OR", state: "Oregon", geo: "msa:38900", tz: "PT", ll: [45.52, -122.68], drop: /maine|\bme\b|\btn\b/ },
  "Detroit": { st: "MI", state: "Michigan", geo: "msa:19820", tz: "ET", ll: [42.33, -83.05] },
  "Louisville": { st: "KY", state: "Kentucky", geo: "msa:31140", tz: "ET", ll: [38.25, -85.76] },
  "Baltimore": { st: "MD", state: "Maryland", geo: "msa:12580", tz: "ET", ll: [39.29, -76.61] },
  "Milwaukee": { st: "WI", state: "Wisconsin", geo: "msa:33340", tz: "CT", ll: [43.04, -87.91] },
  "Atlanta": { st: "GA", state: "Georgia", geo: "msa:12060", tz: "ET", ll: [33.75, -84.39] },
  "Kansas City": { st: "MO", state: "Missouri", geo: "msa:28140", tz: "CT", ll: [39.1, -94.58] },
  "Miami": { st: "FL", state: "Florida", geo: "msa:33100", tz: "ET", ll: [25.76, -80.19] },
  "Raleigh": { st: "NC", state: "North Carolina", geo: "msa:39580", tz: "ET", ll: [35.78, -78.64] },
  "Minneapolis": { st: "MN", state: "Minnesota", geo: "msa:33460", tz: "CT", ll: [44.98, -93.27] },
  "Tampa": { st: "FL", state: "Florida", geo: "msa:45300", tz: "ET", ll: [27.95, -82.46] },
  "Orlando": { st: "FL", state: "Florida", geo: "msa:36740", tz: "ET", ll: [28.54, -81.38] },
  "Cleveland": { st: "OH", state: "Ohio", geo: "msa:17460", tz: "ET", ll: [41.5, -81.69], drop: /\btn\b/ },
  "Pittsburgh": { st: "PA", state: "Pennsylvania", geo: "msa:38300", tz: "ET", ll: [40.44, -79.99] },
  "Cincinnati": { st: "OH", state: "Ohio", geo: "msa:17140", tz: "ET", ll: [39.1, -84.51] },
  "St. Louis": { st: "MO", state: "Missouri", geo: "msa:41180", tz: "CT", ll: [38.63, -90.2], key: "st louis" },
  "Salt Lake City": { st: "UT", state: "Utah", geo: "msa:41620", tz: "MT", ll: [40.76, -111.89] },
  "Sacramento": { st: "CA", state: "California", geo: "msa:40900", tz: "PT", ll: [38.58, -121.49] },
  "Richmond": { st: "VA", state: "Virginia", geo: "msa:40060", tz: "ET", ll: [37.54, -77.44], drop: /richmond hill|indiana|\btx\b/ },
  "Omaha": { st: "NE", state: "Nebraska", geo: "msa:36540", tz: "CT", ll: [41.26, -95.94] },
  "Tulsa": { st: "OK", state: "Oklahoma", geo: "msa:46140", tz: "CT", ll: [36.15, -95.99] },
  "New Orleans": { st: "LA", state: "Louisiana", geo: "msa:35380", tz: "CT", ll: [29.95, -90.07] },
  "Pennsylvania": { st: "PA", state: "Pennsylvania", geo: "state:42", tz: "ET", ll: [40.9, -77.8], kind: "state" },
  "New Jersey": { st: "NJ", state: "New Jersey", geo: "state:34", tz: "ET", ll: [40.1, -74.5], kind: "state" },
  "Delaware": { st: "DE", state: "Delaware", geo: "state:10", tz: "ET", ll: [39.0, -75.5], kind: "state" },
  // rev 4 (2026-10-24): every state whose own Semrush exact sum clears 500/mo (demand/semrush-states.md). most: the state spans two time zones.
  "New York State": { st: "NY", state: "New York", geo: "state:36", tz: "ET", ll: [42.9, -75.5], kind: "state", key: "new york" },
  "Utah": { st: "UT", state: "Utah", geo: "state:49", tz: "MT", ll: [39.3, -111.7], kind: "state" },
  "Florida": { st: "FL", state: "Florida", geo: "state:12", tz: "ET", ll: [28.6, -82.4], kind: "state", most: true },
  "Texas": { st: "TX", state: "Texas", geo: "state:48", tz: "CT", ll: [31.0, -99.3], kind: "state", most: true },
  "Michigan": { st: "MI", state: "Michigan", geo: "state:26", tz: "ET", ll: [43.6, -84.7], kind: "state", most: true },
  "Ohio": { st: "OH", state: "Ohio", geo: "state:39", tz: "ET", ll: [40.4, -82.8], kind: "state" },
  "Maryland": { st: "MD", state: "Maryland", geo: "state:24", tz: "ET", ll: [39.0, -76.8], kind: "state" },
  "Indiana": { st: "IN", state: "Indiana", geo: "state:18", tz: "ET", ll: [39.9, -86.3], kind: "state", most: true },
  "Arizona": { st: "AZ", state: "Arizona", geo: "state:04", tz: "AZ", ll: [34.2, -111.7], kind: "state" },
  "California": { st: "CA", state: "California", geo: "state:06", tz: "PT", ll: [37.2, -119.5], kind: "state" },
  "Connecticut": { st: "CT", state: "Connecticut", geo: "state:09", tz: "ET", ll: [41.6, -72.7], kind: "state" },
  "Vermont": { st: "VT", state: "Vermont", geo: "state:50", tz: "ET", ll: [44.0, -72.7], kind: "state" },
  "Virginia": { st: "VA", state: "Virginia", geo: "state:51", tz: "ET", ll: [37.5, -78.8], kind: "state", drop: /virginia beach|west virginia/ },
  "Colorado": { st: "CO", state: "Colorado", geo: "state:08", tz: "MT", ll: [39.0, -105.5], kind: "state" },
  "Minnesota": { st: "MN", state: "Minnesota", geo: "state:27", tz: "CT", ll: [46.3, -94.3], kind: "state" },
  "Hawaii": { st: "HI", state: "Hawaii", geo: "state:15", tz: "HT", ll: [20.8, -156.3], kind: "state" },
  "North Carolina": { st: "NC", state: "North Carolina", geo: "state:37", tz: "ET", ll: [35.5, -79.4], kind: "state" },
  "South Carolina": { st: "SC", state: "South Carolina", geo: "state:45", tz: "ET", ll: [33.9, -80.9], kind: "state" },
  "Arkansas": { st: "AR", state: "Arkansas", geo: "state:05", tz: "CT", ll: [34.9, -92.4], kind: "state" },
};
const EXISTING = { Philadelphia: "/services/web-design-philadelphia", "Chester County": "/services/web-design-chester-county" };
const NAMES = MAP.build_order.filter((p) => !EXISTING[p]);
const N = NAMES.length;
if (N !== 64) throw new Error(`expected 64 places, got ${N}`);
// a metro's state page, when the state has one (rev 4: every state at or above the floor)
const STATE_PAGE = Object.fromEntries(NAMES.filter((n) => META[n].kind === "state").map((n) => [META[n].state, n]));
for (const n of NAMES) if (!META[n]) throw new Error(`no META for ${n}`);
const slugOf = (n) => n.toLowerCase().replace(/\./g, "").replace(/,/g, "").replace(/\s+/g, "-");
const keyOf = (n) => META[n].key ?? n.toLowerCase().replace(/\./g, "");

/* ---------- small helpers ---------- */
const fmt = (v) => Number(v).toLocaleString("en-US");
const r1 = (v) => Math.round(v * 10) / 10;
const pctChange = (a, b) => r1(((a - b) / b) * 100);
const signedPct = (v) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}%`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const hav = ([a, b], [c, d]) => { const R = 3958.8, t = Math.PI / 180; const x = Math.sin(((c - a) * t) / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const fmtDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const stripKey = (u) => u.replace(/[&?]key=[^&]*/g, "");

/* ---------- sectors (12 two-digit CBP sectors in the pull; 813 and the 5415/5414xx/5416xx/5418xx detail rows are not sectors) ---------- */
const SECTORS = {
  "23": { label: "construction", needs: "service-area pages, project photos and quote requests that land in the office inbox" },
  "31-33": { label: "manufacturing", needs: "spec sheets, distributor lookups and request-for-quote forms" },
  "42": { label: "wholesale trade", needs: "a catalogue, trade-account sign-up and order requests that reach the sales desk" },
  "44-45": { label: "retail trade", needs: "stock that matches the till and a phone checkout" },
  "51": { label: "information", needs: "pages that load fast under heavy content and sign-up flows that work" },
  "52": { label: "finance and insurance", needs: "secure forms, plain disclosures and a short path to a call" },
  "53": { label: "real estate, rental and leasing", needs: "listing pages, property search and viewing requests" },
  "54": { label: "professional, scientific and technical services", needs: "proof of expertise, case pages and a routed enquiry form" },
  "56": { label: "administrative and support services", needs: "clear service pages, quote requests and a careers page that fills roles" },
  "61": { label: "educational services", needs: "course pages, enrolment forms and a calendar people can trust" },
  "62": { label: "health care and social assistance", needs: "online booking, intake forms and an accessible path for every patient" },
  "72": { label: "accommodation and food services", needs: "hours, menus and bookings that read on a phone in a hurry" },
};
const SHORT = { "23": "Construction", "31-33": "Manufacturing", "42": "Wholesale", "44-45": "Retail", "51": "Information", "52": "Finance and insurance", "53": "Real estate", "54": "Professional services", "56": "Admin and support", "61": "Education", "62": "Health care", "72": "Hospitality and food" };
const CUE = { "23": "quote requests must reach the office", "31-33": "spec sheets and RFQ forms carry the site", "42": "catalogue and trade accounts lead", "44-45": "stock and checkout must agree", "51": "speed under heavy content matters", "52": "forms must be secure and plain", "53": "listings and viewing requests lead", "54": "expertise must be easy to check", "56": "service pages and careers carry it", "61": "courses and enrolment lead", "62": "booking and intake matter most", "72": "hours and menus must read fast" };
const SECTOR_FACT = Object.fromEntries(FACTS.filter((r) => r.geo_code === "state:42").map((r) => r.fact).filter((f) => /^Establishments, NAICS /.test(f)).map((f) => [f.match(/NAICS (\S+)/)[1], f.replace(/^Establishments, /, "")]));

/* ---------- facts ---------- */
function factsFor(name) {
  const geo = META[name].geo;
  const rows = FACTS.filter((r) => r.geo_code === geo);
  if (rows.length < 90) throw new Error(`${name}: only ${rows.length} Census rows for ${geo}`);
  const get = (fact, period) => {
    const r = rows.find((x) => x.fact === fact && x.period === period);
    if (!r) throw new Error(`${name}: missing ${fact} ${period}`);
    return r;
  };
  return { geo, rows, get, pulled: rows[0].pulled };
}

/* ---------- autocomplete phrasings for the place (Google + Bing, 4 seeds; demand/suggest-places.json) ---------- */
const VOCAB = new Set("web website websites design designer designers designing development developer developers company companies agency agencies firm firms services service studio best top custom professional small business ecommerce e-commerce e commerce seo and & in near the of for freelance freelancer hosting cost prices attorney law dental medical biotech roofing construction contractor plumber hvac automotive physician general providers site sites graphic branding".split(" "));
const STATE_TOKENS = new Set("al ak az ar ca co ct de fl ga hi id il in ia ks ky la me md ma mi mn ms mo mt ne nv nh nj nm ny nc nd oh ok or pa ri sc sd tn tx ut vt va wa wv wi wy dc texas florida california ohio georgia arizona colorado illinois mo pa bay".split(" "));
function phrasingsFor(name) {
  const key = keyOf(name);
  const entry = SUGGEST.find((e) => e.place.toLowerCase() === key || e.place.toLowerCase() === name.toLowerCase());
  if (!entry) return { all: [], clean: [] };
  const all = new Set();
  for (const s of Object.values(entry.seeds)) for (const eng of ["google", "bing"]) for (const p of s[eng] || []) if (p.toLowerCase().includes(key)) all.add(p.toLowerCase().trim());
  const drop = META[name].drop;
  const keyTokens = key.split(" ");
  const clean = [...all].filter((p) => !(drop && drop.test(p))).filter((p) => {
    const toks = p.replace(/[-]/g, " ").split(/\s+/).filter((t) => !keyTokens.includes(t) && !STATE_TOKENS.has(t));
    return toks.length > 0 && toks.every((t) => VOCAB.has(t));
  });
  return { all: [...all].filter((p) => !(drop && drop.test(p))), clean };
}
const SECTOR_HINTS = [
  { re: /attorney|law firm/, id: "law" }, { re: /biotech/, id: "biotech" }, { re: /dental|medical|physician/, id: "health" },
  { re: /roofing|construction|contractor|plumber|hvac/, id: "trades" }, { re: /automotive/, id: "auto" }, { re: /e-?commerce|e commerce|shopify/, id: "store" },
];

/* ---------- Semrush (US exact, pulled 2026-10-24) ---------- */
const kw = (p) => SEM.keywords[p];
function searchFor(name) {
  const row = MAP.rows.find((r) => r.place === name && r.proposed_route);
  const own = [];
  for (const k of row.evidence.semrush.per_key) for (const [phrase, v] of Object.entries(k.semrush_by_phrase)) own.push({ phrase, volume: v ?? 0, cpc: kw(phrase)?.cpc ?? null, kd: kw(phrase)?.kd ?? null });
  own.sort((a, b) => b.volume - a.volume);
  const folded = MAP.rows.filter((r) => r.fold_into === name).map((r) => ({ place: r.place, sum: r.evidence.semrush?.semrush_sum ?? 0, phrases: Object.entries(r.evidence.semrush?.per_key?.[0]?.semrush_by_phrase || {}).map(([phrase, v]) => ({ phrase, volume: v ?? 0, cpc: kw(phrase)?.cpc ?? null, kd: kw(phrase)?.kd ?? null })).sort((a, b) => b.volume - a.volume) })).sort((a, b) => b.sum - a.sum);
  const nr = MAP.national_ranking.find((x) => x[1] === name);
  return { own, ownSum: own.reduce((s, x) => s + x.volume, 0), folded, foldedSum: folded.reduce((s, x) => s + x.sum, 0), rank: nr[0], rankSum: nr[2], of: MAP.national_ranking.length, pulled: SEM.pulled };
}

/* ---------- time zones (office hours Mon-Fri 9-5 Eastern, shared.ts NAP) ---------- */
const TZ = {
  ET: { name: "Eastern", hours: null },
  CT: { name: "Central", hours: "8 a.m. to 4 p.m." },
  MT: { name: "Mountain", hours: "7 a.m. to 3 p.m." },
  PT: { name: "Pacific", hours: "6 a.m. to 2 p.m." },
  AZ: { name: "Mountain Standard", hours: "7 a.m. to 3 p.m. in winter and 6 a.m. to 2 p.m. in summer" },
  HT: { name: "Hawaii-Aleutian", hours: "from 4 a.m. in winter and 3 a.m. in summer" },
};

/* ---------- pre-pass: the measures every place is compared on (ranks among the N place pages) ---------- */
const QUICK = Object.fromEntries(NAMES.map((n) => {
  const F = factsFor(n); const v = (f, p) => F.get(f, p).value;
  const E23 = v("Total establishments (all industries)", "2023"), E18 = v("Total establishments (all industries)", "2018");
  const over = ["20-49", "50-99", "100-249", "250-499", "500-999", "1,000 or more"].reduce((a, k) => a + v(`Establishments with ${k} employees`, "2023"), 0);
  return [n, {
    estab: E23,
    per511: Math.round((v("Establishments, NAICS 541511 Custom computer programming services", "2023") / E23) * 100000) / 10,
    popChg: Math.round(((v("Total population", "2024") - v("Total population", "2019")) / v("Total population", "2019")) * 1000) / 10,
    estabChg: Math.round(((E23 - E18) / E18) * 1000) / 10,
    u20: Math.round(((E23 - over) / E23) * 1000) / 10,
  }];
}));
const rankOf = (n, key) => 1 + NAMES.filter((x) => QUICK[x][key] > QUICK[n][key]).length;
const median = (key) => { const a = NAMES.map((x) => QUICK[x][key]).sort((x, y) => x - y); return a[Math.floor((N - 1) / 2)]; };
const ordinal = (k) => k + (["th", "st", "nd", "rd"][((k % 100) - 20) % 10] || ["th", "st", "nd", "rd"][k % 100] || "th");

/* ================================== build one place ================================== */
function build(name, all) {
  const m = META[name];
  const slug = slugOf(name);
  const isState = m.kind === "state";
  const P = name; // display name
  const Ps = P.endsWith("s") ? `${P}'` : `${P}'s`;
  const area = isState ? "the state" : "the metro";
  const areaLong = isState ? P : `the ${m.metroWord ?? P} metro`;
  const F = factsFor(name);
  const trace = {};
  const T = (v, src) => { trace[String(v)] = src; return v; };
  const factRows = [];
  const cbp = (p) => `Census CBP ${p}`;
  /** Register a facts row; returns its index. */
  const addRow = (fact, period, label, source, extra = {}) => {
    const r = F.get(fact, period);
    factRows.push({ geo: F.geo, fact, period, value: r.value, label, source, query: [stripKey(r.url)], ...extra });
    return factRows.length - 1;
  };
  const val = (fact, period) => F.get(fact, period).value;
  const src = (fact, period) => `${F.get(fact, period).source}, ${fact.toLowerCase()}, ${period}`;
  const show = (fact, period) => { const v = val(fact, period); T(fmt(v), src(fact, period)); return fmt(v); };

  // core figures
  const E23 = val("Total establishments (all industries)", "2023"), E18 = val("Total establishments (all industries)", "2018");
  const EMP23 = val("Total paid employees (mid-March, all industries)", "2023");
  const POP24 = val("Total population", "2024"), POP19 = val("Total population", "2019");
  const big = ["Establishments with 20-49 employees", "Establishments with 50-99 employees", "Establishments with 100-249 employees", "Establishments with 250-499 employees", "Establishments with 500-999 employees", "Establishments with 1,000 or more employees"];
  const over20 = big.reduce((s, f) => s + val(f, "2023"), 0);
  const U20 = E23 - over20;
  const U20P = r1((U20 / E23) * 100);
  const N511 = val("Establishments, NAICS 541511 Custom computer programming services", "2023"), N511_18 = val("Establishments, NAICS 541511 Custom computer programming services", "2018");
  const N5415 = val("Establishments, NAICS 5415 Computer systems design and related services", "2023");
  const N430 = val("Establishments, NAICS 541430 Graphic design services", "2023");
  const N613 = val("Establishments, NAICS 541613 Marketing consulting services", "2023");
  const N810 = val("Establishments, NAICS 541810 Advertising agencies", "2023");
  const PER511 = r1((N511 / E23) * 10000), PER5415 = r1((N5415 / E23) * 10000);
  const ECHG = pctChange(E23, E18), PCHG = pctChange(POP24, POP19), C511 = pctChange(N511, N511_18);
  const EDIFF = E23 - E18;
  const S20_99 = val("Establishments with 20-99 employees", "2023"), S20_99_18 = val("Establishments with 20-99 employees", "2018");
  const S100 = val("Establishments with 100-499 employees", "2023"), S100_18 = val("Establishments with 100-499 employees", "2018");
  const S500 = val("Establishments with 500+ employees", "2023"), S500_18 = val("Establishments with 500+ employees", "2018");
  const EMP18 = val("Total paid employees (mid-March, all industries)", "2018");
  const S20_49 = val("Establishments with 20-49 employees", "2023"), S50_99 = val("Establishments with 50-99 employees", "2023");
  const AVG = r1(EMP23 / E23), EMPCHG = pctChange(EMP23, EMP18);
  T(fmt(EMP18), src("Total paid employees (mid-March, all industries)", "2018")); T(String(AVG), "derived: paid employees / establishments, 2023");
  T(String(Math.abs(EMPCHG)), "derived: change in paid employees 2018-2023, percent");
  T(fmt(S20_49), src("Establishments with 20-49 employees", "2023")); T(fmt(S50_99), src("Establishments with 50-99 employees", "2023"));
  const EMP511 = val("Paid employees, NAICS 541511 Custom computer programming services", "2023"), EMP5415 = val("Paid employees, NAICS 5415 Computer systems design and related services", "2023");
  const PPE = r1(POP24 / E23), AVG511 = r1(EMP511 / N511);
  T(fmt(EMP511), src("Paid employees, NAICS 541511 Custom computer programming services", "2023")); T(fmt(EMP5415), src("Paid employees, NAICS 5415 Computer systems design and related services", "2023"));
  T(String(PPE), "derived: population 2024 / establishments 2023"); T(String(AVG511), "derived: NAICS 541511 paid employees per establishment, 2023");

  // trace the derived figures (formula = source)
  const pullNote = `Census CBP (read ${fmtDate(F.pulled)})`;
  T(fmt(E23), src("Total establishments (all industries)", "2023")); T(fmt(E18), src("Total establishments (all industries)", "2018"));
  T(fmt(EMP23), src("Total paid employees (mid-March, all industries)", "2023"));
  T(fmt(POP24), "Census ACS 1-year 2024, total population"); T(fmt(POP19), "Census ACS 1-year 2019, total population");
  T(fmt(U20), `derived: total establishments 2023 minus the six size classes of 20+ employees (${pullNote})`);
  T(String(U20P), "derived: establishments under 20 employees / total establishments, 2023");
  T(fmt(N511), src("Establishments, NAICS 541511 Custom computer programming services", "2023"));
  T(fmt(N511_18), src("Establishments, NAICS 541511 Custom computer programming services", "2018"));
  T(fmt(N5415), src("Establishments, NAICS 5415 Computer systems design and related services", "2023"));
  T(fmt(N430), src("Establishments, NAICS 541430 Graphic design services", "2023"));
  T(fmt(N613), src("Establishments, NAICS 541613 Marketing consulting services", "2023"));
  T(fmt(N810), src("Establishments, NAICS 541810 Advertising agencies", "2023"));
  T(String(PER511), "derived: NAICS 541511 establishments per 10,000 establishments, 2023");
  T(String(PER5415), "derived: NAICS 5415 establishments per 10,000 establishments, 2023");
  T(String(Math.abs(ECHG)), "derived: change in total establishments 2018-2023, percent");
  T(String(Math.abs(PCHG)), "derived: change in population 2019-2024 (ACS 1-year), percent");
  T(String(Math.abs(C511)), "derived: change in NAICS 541511 establishments 2018-2023, percent");
  T(fmt(Math.abs(EDIFF)), "derived: total establishments 2023 minus 2018");
  for (const [v, f, p] of [[S20_99, "Establishments with 20-99 employees", "2023"], [S20_99_18, "Establishments with 20-99 employees", "2018"], [S100, "Establishments with 100-499 employees", "2023"], [S100_18, "Establishments with 100-499 employees", "2018"], [S500, "Establishments with 500+ employees", "2023"], [S500_18, "Establishments with 500+ employees", "2018"]]) T(fmt(v), src(f, p));

  // sectors ranked by employees (12 two-digit sectors pulled)
  const sectors = Object.entries(SECTORS).map(([code, s]) => {
    const fact = SECTOR_FACT[code];
    const emp = val(`Paid employees, ${fact}`, "2023"), est = val(`Establishments, ${fact}`, "2023"), est18 = val(`Establishments, ${fact}`, "2018");
    T(fmt(emp), src(`Paid employees, ${fact}`, "2023")); T(fmt(est), src(`Establishments, ${fact}`, "2023")); T(fmt(est18), src(`Establishments, ${fact}`, "2018"));
    const avg = r1(emp / est); T(String(avg), `derived: ${s.label} employees per establishment, 2023`);
    const chg = pctChange(est, est18); T(String(Math.abs(chg)), `derived: ${s.label} establishments change 2018-2023, percent`);
    return { code, fact, ...s, emp, est, est18, avg, chg, diff: est - est18 };
  }).sort((a, b) => b.emp - a.emp);
  for (const s of sectors) T(fmt(Math.abs(s.diff)), `derived: ${s.label} establishments 2023 minus 2018`);
  const top = sectors.slice(0, 4);
  const growth = [...sectors].sort((a, b) => b.chg - a.chg);
  const fastest = growth[0], slowest = growth[growth.length - 1];

  // fact rows for the readouts and the pop-up (every row = one facts.json row, with its query URL)
  const iE = addRow("Total establishments (all industries)", "2023", "Establishments, 2023", `${cbp(2023)} · ${signedPct(ECHG)} from ${fmt(E18)} in 2018`);
  addRow("Total establishments (all industries)", "2018", "Business establishments, 2018", cbp(2018));
  const iEmp = addRow("Total paid employees (mid-March, all industries)", "2023", "Paid employees, mid-March 2023", cbp(2023));
  const iPop = addRow("Total population", "2024", "Population, 2024", `Census ACS 1-year 2024 · ${signedPct(PCHG)} since 2019`);
  addRow("Total population", "2019", "Population, 2019", "Census ACS 1-year 2019");
  const i511 = addRow("Establishments, NAICS 541511 Custom computer programming services", "2023", "Programming firms (541511)", `${cbp(2023)} · ${signedPct(C511)} since 2018`);
  addRow("Establishments, NAICS 541511 Custom computer programming services", "2018", "NAICS 541511 establishments, 2018", cbp(2018));
  addRow("Establishments, NAICS 5415 Computer systems design and related services", "2023", "Computer systems design establishments (NAICS 5415)", cbp(2023));
  for (const f of big) addRow(f, "2023", f.replace("Establishments with ", "Establishments with ").replace(" employees", " employees, 2023"), cbp(2023));
  for (const s of top) { addRow(`Paid employees, ${s.fact}`, "2023", `${cap(s.label)}: paid employees`, cbp(2023)); addRow(`Establishments, ${s.fact}`, "2023", `${cap(s.label)}: establishments`, cbp(2023)); }
  // derived readouts point at the rows they are computed from
  const qOf = (i) => factRows[i].query[0];
  const sizeRows = factRows.map((r, i) => (big.includes(r.fact) ? i : -1)).filter((i) => i >= 0);
  const derived = (label, value, source, formula, from) => { factRows.push({ geo: F.geo, fact: `derived: ${formula}`, period: "2023", value, label, source, query: [...new Set(from.flatMap((i) => factRows[i].query))], derived: formula }); return factRows.length - 1; };
  const iU20 = derived("% under 20 staff", U20P, `${cbp(2023)} · ${fmt(U20)} of ${fmt(E23)}`, "total establishments minus the six size classes of 20+ employees, divided by the total", [iE, ...sizeRows]);
  const iPer511 = derived("541511 per 10,000", PER511, `${cbp(2023)} · ${fmt(N511)} of ${fmt(E23)}, a ceiling`, "NAICS 541511 establishments / total establishments x 10,000", [i511, iE]);
  const iPer5415 = derived("5415 per 10,000", PER5415, `${cbp(2023)} · ${fmt(N5415)} establishments`, "NAICS 5415 establishments / total establishments x 10,000", [factRows.findIndex((r) => r.fact.includes("NAICS 5415 ")), iE]);
  const iChg = derived("Change since 2018", EDIFF, `${cbp(2018)} and ${cbp(2023)} · ${fmt(E18)} to ${fmt(E23)}`, "total establishments 2023 minus 2018", [iE, 1]);

  /* ---------- search data ---------- */
  const S = searchFor(name);
  const ph = phrasingsFor(name);
  const topP = S.own[0];
  const wdPhrase = S.own.find((x) => x.phrase.startsWith("web design ") && !x.phrase.startsWith("web design company")) ?? topP;
  for (const x of [...S.own, ...S.folded.flatMap((f) => f.phrases)]) { T(fmt(x.volume), `Semrush US exact volume, "${x.phrase}", pulled ${S.pulled}`); if (x.cpc != null) T(x.cpc.toFixed(2), `Semrush CPC (USD), "${x.phrase}"`); }
  T(fmt(S.ownSum), "sum of the Semrush exact volumes in the table"); T(fmt(S.rankSum), "page-map-webdev.json national_ranking sum (state pages add folded places)");
  T(String(S.rank), "page-map-webdev.json national_ranking rank"); T(String(S.of), "page-map-webdev.json national_ranking length");
  for (const f of S.folded) T(fmt(f.sum), `Semrush exact sum for ${f.place} (page-map-webdev.json)`);
  T(fmt(S.foldedSum), "sum of the folded places' Semrush exact sums");
  const used = new Set(S.own.map((x) => x.phrase));
  const extraPhrasings = ph.clean.filter((p) => !used.has(p)).slice(0, 3);
  const sectorHits = SECTOR_HINTS.filter((h) => ph.all.some((p) => h.re.test(p))).map((h) => ({ ...h, from: ph.all.find((p) => h.re.test(p)) }));
  const hasWord = (re) => ph.all.find((p) => re.test(p));
  const shared = isState && NAMES.some((n) => n !== name && keyOf(n) === keyOf(name)); // same phrase strings as a metro page

  /* ---------- neighbours (3 nearest metros) and the state page ---------- */
  const metros = NAMES.filter((n) => META[n].kind !== "state" && n !== name);
  const near = (isState ? metros.filter((n) => META[n].st === m.st) : []).concat(metros.map((n) => ({ n, d: hav(m.ll, META[n].ll) })).sort((a, b) => a.d - b.d).map((x) => x.n)).filter((n, i, a) => a.indexOf(n) === i).slice(0, name === "Pennsylvania" ? 1 : 3);
  const statePage = !isState ? STATE_PAGE[m.state] ?? null : null;
  const tz = TZ[m.tz];
  const inPhilly = ["Pennsylvania", "New Jersey", "Delaware"].includes(name);
  const HUB = "/services/website-development";

  /* ---------- copy ---------- */
  const s1 = top[0], s2 = top[1], s3 = top[2], s4 = top[3];
  const sizeWord = (avg) => (avg < 10 ? "so the owner usually edits the site" : avg < 25 ? "so a site often feeds a shared inbox" : "so sites serve several teams with approvals");
  const tzLine = m.tz === "ET"
    ? `${m.most ? "Most of " : ""}${P} shares Eastern time with our office, so calls and reviews fall inside the same working day.`
    : m.tz === "AZ"
      ? `${P} keeps Mountain Standard Time all year, so our Eastern office day starts at 7 a.m. there in winter.`
      : m.tz === "HT"
        ? `${P} keeps Hawaii-Aleutian time all year, so our Eastern office day starts before dawn there; calls are booked for your morning.`
        : `${m.most ? "Most of " : ""}${P} runs on ${tz.name} time, so our 9-to-5 Eastern day is ${tz.hours} there.`;
  const hoursLead = m.tz === "ET"
    ? `the office answers (610) 890-9711 Monday to Friday, 9 to 5, the same day ${fmt(N511)} programming firms here keep.`
    : m.tz === "AZ"
      ? "the office answers (610) 890-9711 Monday to Friday: 7 a.m. to 3 p.m. Arizona time in winter, 6 a.m. to 2 p.m. in summer."
      : m.tz === "HT"
        ? "the office answers (610) 890-9711 Monday to Friday, from 4 a.m. Hawaii time in winter and 3 a.m. in summer."
      : `the office answers (610) 890-9711 Monday to Friday, ${tz.hours} local time, the day ${fmt(N511)} programming firms here keep.`;
  const rose = EDIFF >= 0 ? "rose" : "fell";

  const intro = {
    kind: "intro", id: "local",
    h2: `Website design for ${P}, delivered remotely`,
    lede: `We take on website work for ${P} businesses remotely from Malvern, PA, and every stage is reviewed in your own browser.`,
    leadIn: "Why it matters:",
    lead: `${fmt(E23)} business establishments operated in ${area} in 2023, and ${U20P}% of them employed fewer than 20 people.`,
    cards: [s1, s2, s3].map((s) => ({ h3: SHORT[s.code], line: `${fmt(s.emp)} paid employees across ${fmt(s.est)} establishments in 2023; a site here needs ${s.needs}.` })),
    deeper: {
      label: "how a remote build runs, stage by stage",
      paras: [
        `${cap(s1.label)} alone holds ${r1((s1.emp / EMP23) * 100)}% of the ${fmt(EMP23)} paid employees counted in ${area} in 2023.`,
        inPhilly
          ? ({ "Pennsylvania": "Most of a build runs remotely; in the state's south-east, around Philadelphia, in-person sessions are easiest when the project calls for them.", "New Jersey": "Most of a build runs remotely; South Jersey sits inside the Philadelphia region, where in-person sessions are easiest when the project calls for them.", "Delaware": "Most of a build runs remotely; New Castle County is one of the six counties in our Business Profile, so in-person sessions there are easiest when a project calls for them." })[name]
          : `${cap(s2.label)} adds ${r1((s2.emp / EMP23) * 100)}% and ${s3.label} ${r1((s3.emp / EMP23) * 100)}%, so three sectors hold ${r1(((s1.emp + s2.emp + s3.emp) / EMP23) * 100)}% of the payroll count.`,
        `The three cards above are the three largest of the ${sectors.length} sectors we read for ${area}, by paid employees: ${s1.label}, ${s2.label} and ${s3.label}.`,
        `${SHORT[s4.code]} is fourth, with ${fmt(s4.emp)} paid employees in ${fmt(s4.est)} establishments.`,
      ],
    },
  };

  const work = {
    kind: "work", id: "work",
    ...(name === "Pennsylvania" ? { first: ["starzi-bros"] } : {}),
    h2: "Websites we built",
    lede: name === "Pennsylvania"
      ? "Six live sites we built open here in a preview window, starting with Starzi Brothers, an excavation and concrete contractor in Chadds Ford."
      : "Six live sites we built open here in a preview window, the same way your build is reviewed before launch.",
    leadIn: "Why it matters:",
    lead: "A working site shows how a build loads, reads and takes an enquiry, which no mock-up can.",
    deeper: {
      label: "how the previews work",
      paras: [
        "Preview opens the live site inside a sandboxed frame on this page. Atlas Peptides blocks framing, so its preview is a dated screenshot instead.",
        name === "Pennsylvania"
          ? "Starzi Brothers moved off Squarespace to a site with a page for each service and the quote form that lands in the office inbox; it is the one Pennsylvania business among the six."
          : `None of the six is presented as a ${P} business; each one shows a job a site has to do, whatever the city.`,
        "Between them they cover a configurator that prices as you build, online scheduling, booking with reviews pulled in, a shared stock count, a quote form and a checkout.",
      ],
    },
  };

  const figures = {
    kind: "facts", id: "figures",
    h2: `${fmt(E23)} businesses, in public numbers`,
    lede: `${cap(area)} had ${fmt(E23)} business establishments in 2023, ${signedPct(ECHG)} since 2018, by County Business Patterns.`,
    leadIn: "By the numbers:",
    lead: `${fmt(POP24)} people lived in ${area} in 2024, ${signedPct(PCHG)} since 2019, and payrolls counted ${fmt(EMP23)} employees.`,
    readouts: [iE, iU20, i511, iPer511, iPer5415, iPop, iChg],
    deeper: {
      label: "what County Business Patterns counts",
      paras: [
        `Of the ${fmt(E23)} establishments, ${fmt(U20)} had fewer than 20 people and ${fmt(S20_99)} employed 20 to 99. Another ${fmt(S100)} employed 100 to 499, and ${fmt(S500)} employed 500 or more.`,
        `Within the 20-to-99 band, ${fmt(S20_49)} establishments had 20 to 49 people and ${fmt(S50_99)} had 50 to 99. The average establishment employed ${AVG} of the ${fmt(EMP23)} paid staff.`,
        `County Business Patterns counts employer establishments, locations with paid staff, so a sole owner with no employees is not in the ${fmt(E23)}; that is one establishment for every ${PPE} residents.`,
        `NAICS 541511, custom computer programming, includes custom web page design and all other custom software, so ${PER511} per 10,000 businesses is a ceiling on web-design firms in ${area}.`,
      ],
    },
  };

  const industries = {
    kind: "text", id: "industries",
    h2: `${SHORT[s1.code]} leads, with ${fmt(s1.emp)} employees`,
    lede: `${cap(s1.label)} employed ${fmt(s1.emp)} people in ${area} in 2023, the most of the ${sectors.length} sectors we read.`,
    leadIn: "Why it matters:",
    lead: `who a site talks to follows the sector mix, and ${s2.label} comes next at ${fmt(s2.emp)} employees.`,
    points: [s1, s2, s3].map((s) => `${SHORT[s.code]}: ${s.avg} employees per establishment; ${CUE[s.code]}.`),
    table: { caption: `${cap(areaLong)}: the four largest of ${sectors.length} sectors by paid employees, Census CBP 2023`, cols: ["Sector", "Paid employees, 2023", "Establishments, 2023"], rows: top.map((s) => [SHORT[s.code], fmt(s.emp), fmt(s.est)]) },
    deeper: {
      label: "who these pages are written for",
      paras: [
        `${fmt(s1.est)} ${s1.label} establishments in ${area} need ${s1.needs}. The ${fmt(s2.est)} in ${s2.label} need ${s2.needs}.`,
        `${cap(s3.label)} counts ${fmt(s3.est)} establishments that need ${s3.needs}, and ${s4.label}, fourth at ${fmt(s4.emp)} employees, needs ${s4.needs}.`,
        `${cap(sectors[4].label)} ranks fifth at ${fmt(sectors[4].emp)} employees, and the ${sectors.length} sectors we read cover ${fmt(sectors.reduce((a, x) => a + x.emp, 0))} of the ${fmt(EMP23)} paid employees in ${area}.`,
        `Together the four employ ${fmt(top.reduce((a, s) => a + s.emp, 0))} people, ${r1((top.reduce((a, s) => a + s.emp, 0) / EMP23) * 100)}% of the payroll count; the sector figures shape the scope, and the six sites above are our delivered work.`,
      ],
    },
  };

  const searchRows = [...S.own.map((x) => [x.phrase, fmt(x.volume), x.cpc != null ? `$${x.cpc.toFixed(2)}` : "no bid data"])];
  if (isState) for (const f of S.folded.slice(0, 3)) { const x = f.phrases[0]; if (x && x.volume > 0) searchRows.push([x.phrase, fmt(x.volume), x.cpc != null ? `$${x.cpc.toFixed(2)}` : "no bid data"]); }
  const search = {
    kind: "search", id: "search",
    h2: `What ${P} businesses search for`,
    lede: shared ? `Semrush counts “${topP.phrase}” at ${fmt(topP.volume)} US searches a month, one figure for the city and the rest of the state together.` : `The top phrasing, “${topP.phrase}”, draws ${fmt(topP.volume)} US searches a month by Semrush’s exact count.`,
    leadIn: "By the numbers:",
    lead: shared
      ? `the ${S.own.length} phrasings total ${fmt(S.ownSum)} a month, and our city page reads the same count, so neither page claims it alone.`
      : isState
      ? `the state’s own phrasings add up to ${fmt(S.ownSum)} a month, and ${fmt(S.rankSum)} with the ${S.folded.length} places folded into this page.`
      : `the ${S.own.length} phrasings add up to ${fmt(S.ownSum)} searches a month, ${fmt(topP.volume)} of them on the top one${S.folded.length ? `, and ${S.folded.map((f) => f.place).join(" and ")} adds ${fmt(S.foldedSum)} more` : ""}.`,
    points: extraPhrasings.length ? [`Autocomplete also completes “${extraPhrasings[0]}”, a phrasing people type.`] : undefined,
    table: { caption: `Monthly US searches and cost per click for ${P} web design phrasings, Semrush, ${fmtDate(TODAY)}`, cols: ["Phrase", "Searches a month", "Cost per click"], rows: searchRows },
    deeper: {
      label: "how we rank every place by the same numbers",
      paras: [
        `We rank every place in the country by the same measure, the sum of these phrasings, and this page sits ${S.rank} of the ${S.of} places we measured, at ${fmt(S.rankSum)} searches a month.`,
        ...(() => { const dv = S.own.find((x) => x.phrase.startsWith("website development")), de = S.own.find((x) => x.phrase.startsWith("web developer")); return dv && de ? [`The development phrasing draws ${fmt(dv.volume)} a month and the developer phrasing ${fmt(de.volume)}, phrasings that often signal a build beyond a brochure site.`] : []; })(),
        ...(() => { const c = S.own.find((x) => x.phrase.startsWith("web design company")); return c && c.volume > 0 && shared ? [`A buyer anywhere in ${P} types the same company-intent string, “${c.phrase}”, counted at ${fmt(c.volume)} searches a month for the whole state.`] : c && c.volume > 0 ? [`The company-intent phrasing draws ${fmt(c.volume)} searches a month${c.cpc != null ? ` at about $${c.cpc.toFixed(2)} a click` : ""}, the buyer already looking for a firm.`] : []; })(),
        shared && wdPhrase.cpc != null ? `Bids on “${wdPhrase.phrase}” ran about $${wdPhrase.cpc.toFixed(2)} a click, one price for the phrase wherever in the state the searcher sits.` : wdPhrase.cpc != null ? `Advertisers paid about $${wdPhrase.cpc.toFixed(2)} a click for “${wdPhrase.phrase}”, which is what a search costs to buy, not the price of a website.` : `Semrush recorded no advertiser bids for “${wdPhrase.phrase}”, so its cost per click is left blank rather than guessed.`,
        isState && S.folded.length > 3 ? `The other ${T(String(S.folded.length - 3), "count of folded places beyond the three in the table")} folded places add the rest of the ${fmt(S.foldedSum)}; none is big enough for a page of its own.` : shared && topP.kd != null ? `Its keyword difficulty, ${topP.kd} out of 100, is the same contest our city page enters, so this page leads with statewide facts.` : topP.kd != null ? `The top phrasing, at ${fmt(topP.volume)} searches, carries a Semrush keyword difficulty of ${topP.kd} out of 100.` : `Semrush gives no keyword difficulty for the top phrasing at ${fmt(topP.volume)} searches.`,
      ],
    },
    source: `Semrush US exact match · ${fmt(S.ownSum)} a month in all, top ${fmt(topP.volume)} · pulled ${fmtDate(TODAY)}`,
  };

  const competition = {
    kind: "text", id: "market",
    h2: `${fmt(N511)} custom programming firms ${isState ? "statewide" : "in the metro"}`,
    lede: `${fmt(N511)} custom computer programming establishments (NAICS 541511) operated in ${area} in 2023, ${signedPct(C511)} since 2018.`,
    leadIn: "Yes, but:",
    lead: `that code also covers all custom software, so ${PER511} per 10,000 businesses is a ceiling on web-design firms, not a count.`,
    points: [`Graphic design (NAICS 541430): ${fmt(N430)} establishments in 2023.`, `Marketing consulting (NAICS 541613): ${fmt(N613)} establishments in 2023.`, `Advertising agencies (NAICS 541810): ${fmt(N810)} establishments in 2023.`],
    links: [{ to: `${HUB}#choose`, label: "How to choose a web design company" }],
    deeper: {
      label: "how to compare the firms on your list",
      paras: [
        `With ${fmt(N511 + N430)} programming and graphic design establishments in ${area}, ask each firm for live sites you can open, who will own the code and domain, and a written scope.`,
        `The wider NAICS 5415 group, computer systems design and related services, counted ${fmt(N5415)} establishments, ${PER5415} per 10,000 businesses.`,
        `Marketing consulting (${fmt(N613)}) and advertising agencies (${fmt(N810)}) often sell websites too, so the full field in ${area} is wider than the programming count.`,
        `Custom programming establishments went from ${fmt(N511_18)} in 2018 to ${fmt(N511)} in 2023, while graphic design stood at ${fmt(N430)}, ${r1((N430 / E23) * 10000)} per 10,000 businesses.`,
        `Those ${fmt(N511)} programming firms employed ${fmt(EMP511)} people, about ${AVG511} each. The wider 5415 group employed ${fmt(EMP5415)}.`,
      ],
    },
  };
  T(fmt(N511 + N430), "derived: NAICS 541511 + 541430 establishments, 2023");
  T(String(r1((N430 / E23) * 10000)), "derived: NAICS 541430 establishments per 10,000, 2023");
  T(fmt(sectors.reduce((a, x) => a + x.emp, 0)), `derived: paid employees in the ${sectors.length} sectors read, 2023`);
  for (const x of [s1, s2, s3]) T(String(r1((x.emp / EMP23) * 100)), `derived: ${x.label} share of paid employees, 2023`);
  T(String(r1(((s1.emp + s2.emp + s3.emp) / EMP23) * 100)), "derived: top-3 sectors' share of paid employees, 2023");
  T(fmt(top.reduce((a, x) => a + x.emp, 0)), "derived: top-4 sectors' paid employees, 2023");
  T(String(r1((top.reduce((a, x) => a + x.emp, 0) / EMP23) * 100)), "derived: top-4 sectors' share of paid employees, 2023");
  if (topP.kd != null) T(String(topP.kd), `Semrush keyword difficulty, "${topP.phrase}"`);

  const growthSec = {
    kind: "text", id: "growth",
    h2: `From ${fmt(E18)} to ${fmt(E23)} businesses since 2018`,
    lede: `Establishments in ${area} ${rose} from ${fmt(E18)} in 2018 to ${fmt(E23)} in 2023, a change of ${signedPct(ECHG)}.`,
    leadIn: "The bottom line:",
    lead: `${fastest.label} grew the most of the ${sectors.length} sectors, ${signedPct(fastest.chg)} in establishments, while ${slowest.label} moved ${signedPct(slowest.chg)}.`,
    points: [`20 to 99 employees: ${fmt(S20_99_18)} establishments in 2018, ${fmt(S20_99)} in 2023.`, `100 to 499 employees: ${fmt(S100_18)} in 2018, ${fmt(S100)} in 2023.`, `500 or more employees: ${fmt(S500_18)} in 2018, ${fmt(S500)} in 2023.`],
    links: [{ to: "/services/small-business-website-design", label: "Small business website design" }, { to: "/services/website-redesign", label: "Website redesign" }],
    deeper: {
      label: "what the change means for a website",
      paras: [
        `${cap(fastest.label)} went from ${fmt(fastest.est18)} to ${fmt(fastest.est)} establishments between 2018 and 2023; ${slowest.label} went from ${fmt(slowest.est18)} to ${fmt(slowest.est)}.`,
        `${cap(growth[1].label)} came second, ${signedPct(growth[1].chg)}, and ${growth[2].label} third, ${signedPct(growth[2].chg)}.`,
        `That is ${EDIFF >= 0 ? "a net gain" : "a net loss"} of ${fmt(Math.abs(EDIFF))} establishments: each new one needs a first site, and each established one carries addresses and rankings a rebuild must keep.`,
        `Paid employees went from ${fmt(EMP18)} to ${fmt(EMP23)} over the same years, ${signedPct(EMPCHG)}. Population moved ${signedPct(PCHG)} from 2019 to 2024, to ${fmt(POP24)}.`,
      ],
    },
  };

  const rk = { estab: rankOf(name, "estab"), per511: rankOf(name, "per511"), popChg: rankOf(name, "popChg"), estabChg: rankOf(name, "estabChg"), u20: rankOf(name, "u20") };
  for (const [k, v] of Object.entries(rk)) T(String(v), `derived: rank of ${k} among the ${N} place pages`);
  T(String(N), "count of place pages (page-map-webdev.json build_order minus Philadelphia and Chester County)");
  const med = { per511: median("per511"), popChg: median("popChg"), estabChg: median("estabChg"), u20: median("u20") };
  for (const [k, v] of Object.entries(med)) T(String(Math.abs(v)), `derived: median ${k} of the ${N} place pages`);
  const compare = {
    kind: "text", id: "compare",
    h2: `Ranked ${ordinal(rk.estab)} of ${N} places by businesses`,
    lede: `${cap(area)} ranks ${ordinal(rk.estab)} of the ${N} places we build pages for by business establishments, and ${ordinal(rk.per511)} for programming firms per 10,000 businesses.`,
    leadIn: "By the numbers:",
    lead: `population growth since 2019 ranks ${ordinal(rk.popChg)} of ${N}, and the share of establishments under 20 staff ranks ${ordinal(rk.u20)}.`,
    table: { caption: `${cap(areaLong)} against the median of the ${N} place pages, Census CBP 2023 and ACS 2024`, cols: ["Measure", "Here", `Median of ${N}`], rows: [
      ["Programming per 10,000", String(PER511), String(med.per511)],
      ["Establishments since 2018", signedPct(ECHG), signedPct(med.estabChg)],
      ["Population since 2019", signedPct(PCHG), signedPct(med.popChg)],
      ["Under 20 staff", `${U20P}%`, `${med.u20}%`],
    ] },
    deeper: {
      label: "why every place is measured the same way",
      paras: [
        `Every place page uses the same Census tables, so these ranks compare like with like: ${fmt(E23)} establishments here against the ${N} places' own counts, ${ordinal(rk.estabChg)} for their change since 2018.`,
        `Programming firms run ${PER511} per 10,000 businesses here against a median of ${med.per511}. The under-20 share is ${U20P}% against ${med.u20}%.`,
        `The ${N} are the places whose web design searches clear 500 a month in Semrush's exact data, state pages counted with any places folded in; this one draws ${fmt(S.rankSum)}, ${ordinal(S.rank)} of the ${S.of} places we measured nationwide.`,
      ],
    },
  };

  const process = {
    kind: "process", id: "process",
    h2: `How a ${P} web project runs`,
    lede: "A project here runs in the same five stages as every build of ours, from agreeing what the site is for to launch.",
    leadIn: "What you get:",
    lead: "the scope, price and schedule in writing at stage two, before anything is designed or built.",
    deeper: {
      label: "what happens at each stage",
      paras: [
        `Stage one fixes who the site talks to; in ${area}, where ${s1.label} employs ${fmt(s1.emp)} people, that answer often sets the integrations.`,
        `Stage five hands the site over in your own accounts, a handover any of the ${fmt(N5415)} systems design establishments in ${area} could pick up from.`,
        `For the ${fmt(s2.est)} ${s2.label} establishments here, stage two usually lists ${s2.needs}.`,
      ],
    },
  };

  const office = {
    kind: "office", id: "office", plate: inPhilly,
    h2: `Working with us from ${P}`,
    lede: name === "Pennsylvania" ? `Our office is in Malvern, and projects across the state's ${fmt(E23)} establishments run remotely from there.` : tzLine,
    leadIn: "The bottom line:",
    lead: hoursLead,
    question: name === "Pennsylvania"
      ? { q: "Where is your office?", a: "At 625 Swedesford Rd, Unit B, Malvern, PA 19355. Most work runs remotely, and in-person sessions are easiest across the Philadelphia region when a project calls for them." }
      : { q: `Do you have an office in ${P}?`, a: `No. Our one office is in Malvern, PA, and projects here run remotely, with every stage reviewed in your own browser.` },
    ...(inPhilly ? { plateNote: "SIX COUNTIES IN OUR BUSINESS PROFILE" } : {}),
    deeper: {
      label: "calls, reviews and where the work happens",
      paras: [
        inPhilly
          ? `Calls and screen-shares cover most of a ${P} build; when a decision is easier in a room, such as a kickoff with several people, we plan the session into the schedule.`
          : "Calls and screen-shares cover the whole build, and you review the work in your own browser between them; no branch office or answering service sits in between.",
      ],
    },
  };

  /* ---------- FAQ (>= 6; every answer carries a fact of the place) ---------- */
  const faq = [];
  const add = (q, a, from, link) => faq.push({ q, a, from, ...(link ? { link } : {}) });
  add(`Can a ${P} business hire a remote web design team?`,
    `Yes. We take on website work for ${P} businesses remotely from Malvern, PA, and every stage is reviewed in your own browser. You deal directly with the people designing and coding the site, and calls are set in ${m.tz === "ET" ? "Eastern" : m.tz === "AZ" ? "Arizona" : m.tz === "HT" ? "Hawaii" : tz.name} hours, the clock ${area}'s ${fmt(E23)} establishments keep.`,
    "suggest-base: can web design be outsourced / do web designers work from home");
  add(`How much does web design cost in ${P}?`,
    `The scope sets the price, not the ZIP code: pages, integrations and what the site must do, for one of the ${fmt(U20)} small establishments here or a larger one. You get the price and schedule in writing first${wdPhrase.cpc != null ? `; advertisers paid about $${wdPhrase.cpc.toFixed(2)} a click for the main web design phrasing here (Semrush)` : `; Semrush recorded no advertiser bids for the main web design phrasing here`}.`,
    hasWord(/cost|price/) ? `suggest-places: ${hasWord(/cost|price/)}` : "query-clusters: how much does a website cost (largest question score)", { to: `${HUB}#cost`, label: "How much does a website cost?" });
  add("Should we hire a website designer or use a builder?",
    `Hire a designer when the site has to book, quote, sell or connect to a CRM; a builder fits a site a standard template can serve. In ${area}, ${U20P}% of establishments employ fewer than 20 people, so we say which route fits before quoting anything.`,
    "suggest-base: should i hire a website designer", { to: `${HUB}#builder-or-custom`, label: "Squarespace, Wix or WordPress versus custom" });
  if (shared) add("Does website design affect SEO?",
    `Yes. Titles, headings, page speed and schema go in during the build, and Search Console is connected at launch. A statewide site competes for “${wdPhrase.phrase}” (${fmt(wdPhrase.volume)} a month by Semrush’s count) with every firm in the city, so the page leans on what is true of the ${fmt(E23)} establishments across ${P}.`,
    hasWord(/seo/) ? `suggest-places: ${hasWord(/seo/)}` : "suggest-base: does website design affect seo", { to: "/services/seo", label: "SEO services" });
  else add("Does website design affect SEO?",
    `Yes. Titles, headings, page speed and schema go in while the site is built, and Search Console is connected at launch, so the ${fmt(S.ownSum)} monthly searches (top phrasing ${fmt(topP.volume)}) in the table above are targeted from day one. “${wdPhrase.phrase}” alone draws ${fmt(wdPhrase.volume)} a month, by Semrush’s count.`,
    hasWord(/seo/) ? `suggest-places: ${hasWord(/seo/)}` : "suggest-base: does website design affect seo", { to: "/services/seo", label: "SEO services" });
  const SECTOR_Q = {
    law: { q: `Do you design websites for law firms in ${P}?`, sec: "54", needs: "attorney profiles, practice-area pages and an intake form that reaches the right person" },
    biotech: { q: `Do you design websites for biotech companies in ${P}?`, sec: "54", needs: "science explained plainly, investor and careers pages, and forms routed to the right team" },
    health: { q: `Do you design websites for medical and dental practices in ${P}?`, sec: "62", needs: "online booking, intake forms and an accessible path for every patient" },
    trades: { q: `Do you design websites for contractors in ${P}?`, sec: "23", needs: "service-area pages, project photos and quote requests that land in the office inbox" },
    auto: { q: `Do you design websites for automotive businesses in ${P}?`, sec: "44-45", needs: "inventory or service pages, booking and directions that work on a phone" },
    store: { q: `Can you build an online store for a ${P} business?`, sec: "44-45", needs: "a catalogue, stock that agrees with the counter and a checkout that works on a phone" },
  };
  for (const h of sectorHits.slice(0, 2)) {
    const d = SECTOR_Q[h.id]; const s = sectors.find((x) => x.code === d.sec);
    add(d.q, `Yes. That kind of site is scoped like any build of ours: ${d.needs}, each part priced in writing before work starts. ${cap(area)} had ${fmt(s.est)} ${s.label} establishments in 2023, by County Business Patterns.`, `suggest-places: ${h.from}`);
  }
  const fl = hasWord(/freelanc/);
  if (fl) add(`Should a ${P} business hire a freelancer or a web design firm?`,
    `Either can work; what matters is live sites you can open, who owns the code and a written scope. ${cap(area)} had ${fmt(N511)} custom programming and ${fmt(N430)} graphic design establishments in 2023, and a firm keeps the work moving when one person is away.`,
    `suggest-places: ${fl}`, { to: `${HUB}#choose`, label: "How to choose a web design company" });
  const best = hasWord(/\b(best|top)\b/) || hasWord(/agenc|firm|compan/);
  if (best && faq.length < 8) add(`How do I choose a web design company in ${P}?`,
    `Open the live sites a firm has built, ask who owns the code, domain and hosting, and get the scope and price in writing. With ${fmt(N511 + N430)} programming and graphic design establishments in ${area}, and ${PER511} programming firms per 10,000 businesses, those three checks shorten the list quickly.`,
    `suggest-places: ${best}`, { to: `${HUB}#choose`, label: "How to choose a web design company" });
  const host = hasWord(/hosting/);
  if (host && faq.length < 8) add(`Do you host websites for ${P} businesses?`,
    `The site goes live on hosting in your name, with the domain in your account, and we stay on for support under the written proposal. Any of the ${fmt(N5415)} computer systems design establishments in ${area} can pick it up later, because nothing is locked to us.`,
    `suggest-places: ${host}`, { to: `${HUB}#ownership`, label: "What we build with, and what you keep" });
  const fill = [
    () => add(`Do you build websites for small businesses in ${P}?`,
      `Yes. ${fmt(U20)} of the ${fmt(E23)} establishments in ${area} had fewer than 20 employees in 2023, and every one of the six sites above is for an owner-led business. The scope starts with the one job the site must do, booked, quoted or sold.`,
      hasWord(/small business|business website/) ? `suggest-places: ${hasWord(/small business|business website/)}` : "query-clusters: small business website design", { to: "/services/small-business-website-design", label: "Small business website design" }),
    () => add("Is website design tax deductible?",
      `Your accountant decides how to book it, under federal and ${m.state} rules. Our proposals separate design, development, hosting and support, so each line can be booked on its own; ${fmt(E23)} establishments in ${area} face the same question, and we do not give tax advice.`,
      m.st === "TX" ? "suggest-base: is website design taxable in texas / is website design tax deductible" : "suggest-base: is website design tax deductible / should website design be capitalized"),
    () => add(`Will a redesign hurt my ${P} site's rankings?`,
      `Not when every old address is mapped to its new page and redirected before launch, so rankings and links carry over. For any of the ${fmt(E23)} establishments in ${area}, that map is the first thing a rebuild of ours produces.`,
      "suggest-base: does website redesign affect seo", { to: "/services/website-redesign", label: "Website redesign" }),
    () => add(`Do you build accessible websites in ${P}?`,
      `Yes. We build to WCAG 2.1 AA: keyboard paths, contrast, labels and headings checked before launch, with no overlay and no certificate claimed. It matters most for the ${fmt(sectors.find((x) => x.code === "62").est)} health care and social assistance establishments in ${area}, whose patients include people of every ability.`,
      "suggest-base: why is accessibility important in web design", { to: `${HUB}#accessibility`, label: "ADA compliance and accessible websites" }),
  ];
  // rotate the fill order by slug so siblings do not share one FAQ list
  const h = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let i = 0; faq.length < 7 && i < fill.length; i++) fill[(h + i) % fill.length]();

  const routes = {
    kind: "routes", id: "related",
    h2: isState ? `Web design pages near ${P}` : "Related web design pages",
    lede: "",
    items: [
      { to: `${HUB}#process`, title: "How a custom website build runs", tag: "Showcase" },
      { to: `${HUB}#ownership`, title: "What we build with, and what you keep", tag: "Showcase" },
      { to: "/services/small-business-website-design", title: "Small business website design", tag: "Service" },
      { to: "/services/website-cost", title: "How much a website costs", tag: "Service" },
      { to: "/services/website-redesign", title: "Website redesign", tag: "Service" },
      ...(statePage ? [{ to: `/services/web-design-${slugOf(statePage)}`, title: `${statePage} web design`, tag: "State" }] : []),
      ...(inPhilly ? [{ to: EXISTING.Philadelphia, title: "Philadelphia web design", tag: "Nearby" }] : []),
      ...(name === "Pennsylvania" ? [{ to: EXISTING["Chester County"], title: "Chester County web design", tag: "Nearby" }] : []),
      ...(name === "New Jersey" ? [{ to: "/services/web-design-delaware", title: "Delaware web design", tag: "State" }, { to: "/services/web-design-pennsylvania", title: "Pennsylvania web design", tag: "State" }] : []),
      ...(name === "Delaware" ? [{ to: "/services/web-design-new-jersey", title: "New Jersey web design", tag: "State" }, { to: "/services/web-design-pennsylvania", title: "Pennsylvania web design", tag: "State" }] : []),
      ...near.map((n) => ({ to: `/services/web-design-${slugOf(n)}`, title: `${n} web design`, tag: "Nearby metro" })),
    ],
  };

  const sections = [intro, work, figures, industries, search, competition, growthSec, compare, process, office, { kind: "faq", id: "faq", h2: isState ? "Web design questions from the state" : "Web design questions from the metro", schema: false, items: faq }, routes];

  /* ---------- head ---------- */
  const titles = [`Web Design ${P}${m.noSt || isState ? "" : `, ${m.st}`}: Custom Websites | OneAlgorithm`, `Web Design ${P}: Custom Websites | OneAlgorithm`, `Web Design ${P} | OneAlgorithm`];
  const title = titles.find((t) => t.length <= 60);
  const metas = [
    `Web design for ${P} businesses, built remotely from Malvern, PA: custom sites you own, with scope and price in writing first. (610) 890-9711.`,
    `Web design for ${P} businesses, built remotely: custom sites you own, scope and price in writing first. Call (610) 890-9711.`,
    `Custom web design for ${P} businesses, built remotely; scope and price in writing first. (610) 890-9711.`,
  ];
  const description = metas.find((d) => d.length <= 155);
  const areaServed = isState
    ? { "@type": "State", name: P, containedInPlace: { "@type": "Country", name: "United States" } }
    : { "@type": "City", name: P === "Washington, DC" ? "Washington" : P, containedInPlace: m.st === "DC" ? { "@type": "AdministrativeArea", name: "District of Columbia" } : { "@type": "State", name: m.state } };

  const geoName = isState ? `${P} (Census state FIPS ${F.geo.split(":")[1]})` : `${m.metroWord ?? P} metro area (Census CBSA code ${F.geo.split(":")[1]}${name === "Cleveland" ? "; 2023-2024 figures queried as 17410 under the 2023 delineation" : ""})`;

  return {
    slug, name, path: `/services/web-design-${slug}`, kind: isState ? "state" : "metro", photo: slug,
    ...(statePage ? { parent: { label: statePage, to: `/services/web-design-${slugOf(statePage)}` } } : {}),
    seo: { title, description, dateModified: TODAY, ogImage: `/og/places/web-design-${slug}.jpg` },
    hero: { kicker: "Web design and development", h1: `Web design for ${P} businesses`, lede: `We design and build custom websites for ${P} businesses remotely from Malvern, PA, with the scope, price and schedule in writing first.` },
    areaServed,
    facts: { rows: factRows, geoName, pulled: F.pulled },
    search: { rows: [...S.own, ...(isState ? S.folded.flatMap((f) => f.phrases.slice(0, 1)) : [])].map((x) => ({ phrase: x.phrase, volume: x.volume, cpc: x.cpc, kd: x.kd })), pulled: S.pulled, autocomplete: extraPhrasings, autocompleteRead: "24 October 2026", rank: S.rank, of: S.of },
    sections,
    desk: {
      h2: `Start your ${P} website project`,
      lede: `Tell us what the site has to do, and the scope, price and schedule come back in writing before anything is built.`,
      covers: ["What the site has to do: sell, book, explain or log people in", "Two or three sites you like, and why", "What you already have: domain, hosting, content, logins"],
      prompt: "What does the site have to do?",
    },
    trace,
    _meta: { near, statePage, top: top.map((s) => s.label), faqFrom: faq.map((f) => f.from) },
  };
}

/* ================================== write ================================== */
const pages = NAMES.map((n) => build(n));
const header = (p) => `/* GENERATED by scripts/wd-local-gen.mjs on ${TODAY}: /services/web-design-${p.slug}. Do not hand-edit; change the generator.
 * Sources: Census CBP 2023/2018 + ACS 1-year 2024/2019 (facts/economy/facts*.json, query URL per row, no key), Semrush US exact
 * (demand/semrush-volumes.json, pulled ${SEM.pulled}), Google/Bing autocomplete (demand/suggest-places.json, suggest-base.json),
 * page-map-webdev.json national_ranking. \`trace\` maps every figure in the copy to its source (checked by scripts/wd-local-check.mjs). */
import type { LocalPlace } from "./types";\n\n`;
for (const p of pages) {
  const { _meta, ...data } = p;
  fs.writeFileSync(`${OUT}/${p.slug}.ts`, `${header(p)}export const PLACE: LocalPlace = ${JSON.stringify(data, null, 1)};\n\nexport default PLACE;\n`);
}
// index for the route component and the check (slug -> path, title)
fs.writeFileSync(`${OUT}/places.ts`, `/* GENERATED by scripts/wd-local-gen.mjs: the ${pages.length} place pages (slug, path, name, kind). Data files: ./<slug>.ts. */
export type PlaceIndexRow = { slug: string; path: string; name: string; kind: "metro" | "state"; state: string };
export const PLACES: PlaceIndexRow[] = ${JSON.stringify(pages.map((p) => ({ slug: p.slug, path: p.path, name: p.name, kind: p.kind, state: META[p.name].state })), null, 1)};\n`);

const manifest = {
  generated: new Date().toISOString(), generator: "scripts/wd-local-gen.mjs", component: "client/components/wd/LocalRoute.tsx (default export; prop slug)",
  note: "App.tsx: const WebDesignPlace = lazy(() => import('./components/wd/LocalRoute')); <Route path={path} element={<WebDesignPlace slug={slug} />} />. Add each path to scripts/prerender.mjs ROUTES and public/sitemap.xml.",
  routes: pages.map((p) => ({ slug: p.slug, path: p.path, component: "client/components/wd/LocalRoute.tsx", element: `<WebDesignPlace slug="${p.slug}" />`, data: `client/data/wd-local/${p.slug}.ts`, kind: p.kind, title: p.seo.title, meta: p.seo.description, h1: p.hero.h1, lastmod: TODAY, og: p.seo.ogImage, photo: `/places/${p.slug}-2400.avif`, near: p._meta.near, parent: p.parent?.to ?? null })),
};
fs.mkdirSync(`${RUN}/build-wave12`, { recursive: true });
fs.writeFileSync(`${RUN}/build-wave12/routes-manifest.json`, JSON.stringify(manifest, null, 1));
console.log(`wrote ${pages.length} place files, places.ts, routes-manifest.json`);

/* ---------- OG images: photo (photo agent's 1200x630 crop) + a navy band with the page's words; else a plate ---------- */
if (!process.argv.includes("--no-og")) {
  const sharp = createRequire(`${REPO}/package.json`)("sharp");
  const ogDir = `${REPO}/public/og/places`;
  fs.mkdirSync(ogDir, { recursive: true });
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let bad = 0;
  for (const p of pages) {
    const out = `${ogDir}/web-design-${p.slug}.jpg`;
    const photo = `${REPO}/public/places/${p.slug}-og.jpg`;
    const band = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04182b" stop-opacity="0"/><stop offset="1" stop-color="#04182b" stop-opacity="0.92"/></linearGradient></defs>
      <rect x="0" y="300" width="1200" height="330" fill="url(#g)"/>
      <rect x="64" y="470" width="56" height="4" fill="#f26a21"/>
      <text x="64" y="540" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#ffffff">${esc(`Web design for ${p.name}`)}</text>
      <text x="64" y="586" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#d7e3ef">${esc("OneAlgorithm · custom websites, built remotely")}</text>
    </svg>`);
    let base;
    if (fs.existsSync(photo)) base = sharp(photo).resize(1200, 630, { fit: "cover" });
    else {
      const e = p.facts.rows[0];
      base = sharp(Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#04182b"/>
        <g stroke="#1d3a57" stroke-width="1">${Array.from({ length: 12 }, (_, i) => `<path d="M${100 * i} 0V630"/>`).join("")}${Array.from({ length: 7 }, (_, i) => `<path d="M0 ${100 * i}H1200"/>`).join("")}</g>
        <text x="64" y="140" font-family="Courier New, monospace" font-size="22" fill="#9fb4c8">${esc(`${fmt(e.value)} business establishments · Census CBP 2023`)}</text></svg>`));
    }
    await base.composite([{ input: band, left: 0, top: 0 }]).jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(out);
    const md = await sharp(out).metadata(); const kb = Math.round(fs.statSync(out).size / 1024);
    if (md.width !== 1200 || md.height !== 630 || kb >= 300) { bad++; console.log(`OG FAIL ${p.slug} ${md.width}x${md.height} ${kb} KB`); }
  }
  console.log(`og: ${pages.length - bad}/${pages.length} ok`);
  if (bad) process.exit(1);
}
