// Nationwide wave 1 (2026-10-31): SEO / Marketing / App Development / Google Ads place pages on the ONE local template
// (client/components/wd/LocalPage.tsx), same bar as the 64 web-design place pages (scripts/wd-local-gen.mjs).
//   node scripts/svc-local-gen.mjs data              -> build/data/<id>.json   (fact sheet per page: every number a writer may print)
//   node scripts/svc-local-gen.mjs build [--only ids] -> client/data/svc-local/<id>.ts + svc-places.ts (+ OG images unless --no-og)
//   node scripts/svc-local-gen.mjs check [--only ids] -> per-page gate (words, uniqueness, FAQ 40-60, Smart Brevity, trace, banned)
// Prose is written per page by the workflow writers into build/copy/<id>.json (schema: COPY_SHAPE below); this script owns the
// numbers, tables, schema, links and the fixed blocks. ⛔ Every figure in copy must appear in the page's fact sheet `allowed`.
import fs from "node:fs";
import { createRequire } from "node:module";

const REPO = "C:/Users/louis/oa-nationwide";
const NW = "C:/Users/louis/onealgo-icm-oa/areas/sales/runs/2026-10-31_sitewide-seo/nationwide";
const BUILD = `${NW}/build`;
const OUT = `${REPO}/client/data/svc-local`;
const TODAY = "2026-10-31";
const rj = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const CENSUS = rj(`${NW}/census-all.json`);
const PLACES = rj(`${NW}/places.json`);
const SEM = rj(`${NW}/../semrush/semrush-volumes.json`);
const SUG = rj(`${NW}/suggest.json`);
const args = process.argv.slice(2);
const mode = args[0];
const ONLY = (() => { const i = args.indexOf("--only"); return i >= 0 ? args[i + 1].split(",") : null; })();

/* ---------- scope (BUILD-NATIONWIDE-W1.md): 59 + 37 + 9 + 10 = 115 ---------- */
const SCOPE = {
  seo: "los angeles,chicago,houston,dallas,new york,boston,miami,atlanta,virginia,san diego,las vegas,tampa,denver,new jersey,utah,orlando,jacksonville,austin,seattle,raleigh,philadelphia,texas,birmingham,san antonio,charlotte,washington dc,california,florida,kansas city,san francisco,connecticut,nashville,st louis,portland,phoenix,indianapolis,colorado,hawaii,columbus,tucson,salt lake city,new orleans,richmond,tulsa,san jose,minneapolis,detroit,rochester,cleveland,boise,grand rapids,durham,baltimore,baton rouge,fort myers,albuquerque,colorado springs,spokane,charleston",
  marketing: "los angeles,houston,chicago,dallas,new york,miami,florida,denver,philadelphia,atlanta,phoenix,utah,boston,san diego,seattle,austin,new jersey,nashville,texas,las vegas,san francisco,tampa,orlando,cleveland,charlotte,detroit,san antonio,portland,pittsburgh,indianapolis,raleigh,kansas city,st louis,birmingham,jacksonville,connecticut,baltimore",
  "app-development": "new york,austin,chicago,dallas,houston,los angeles,texas,denver,boston",
  "google-ads": "houston,los angeles,new york,miami,chicago,atlanta,dallas,denver,austin,nashville",
};
const SVC = {
  seo: { key: "seo", label: "SEO", noun: "SEO", hub: "/services/seo", hubLabel: "SEO services", need: "seo", serviceType: "Search engine optimization", kicker: "SEO and search visibility", h1: (P) => `SEO services for ${P} businesses`, titles: (P, st) => [`SEO ${P}${st}: SEO Company | OneAlgorithm`, `SEO ${P}: SEO Company | OneAlgorithm`, `SEO ${P} | OneAlgorithm`], og: "SEO for", ogSub: "OneAlgorithm · SEO, delivered remotely", proof: true, census: "all" },
  marketing: { key: "marketing", label: "Marketing", noun: "digital marketing", hub: "/services/marketing", hubLabel: "Marketing services", need: "marketing", serviceType: "Digital marketing", kicker: "Digital marketing", h1: (P) => `Digital marketing for ${P} businesses`, titles: (P, st) => [`Digital Marketing Agency ${P}${st} | OneAlgorithm`, `Digital Marketing Agency ${P} | OneAlgorithm`, `Digital Marketing ${P} | OneAlgorithm`], og: "Digital marketing for", ogSub: "OneAlgorithm · marketing, delivered remotely", proof: true, census: "all" },
  "app-development": { key: "app-development", label: "App development", noun: "app development", hub: "/services/application-development", hubLabel: "Application development", need: "app-development", serviceType: "Custom software and application development", kicker: "Application development", h1: (P) => `App development for ${P} businesses`, titles: (P, st) => [`App Development ${P}${st}: Custom Software | OneAlgorithm`, `App Development ${P}: Custom Software | OneAlgorithm`, `App Development ${P} | OneAlgorithm`], og: "App development for", ogSub: "OneAlgorithm · custom software, built remotely", proof: false, census: "prof" },
  "google-ads": { key: "google-ads", label: "Google Ads", noun: "Google Ads management", hub: "/services/google-ads", hubLabel: "Google Ads management", need: "google-ads", serviceType: "Google Ads management", kicker: "Google Ads management", h1: (P) => `Google Ads management for ${P} businesses`, titles: (P, st) => [`Google Ads Agency ${P}${st} | OneAlgorithm`, `Google Ads Agency ${P} | OneAlgorithm`, `Google Ads ${P} | OneAlgorithm`], og: "Google Ads for", ogSub: "OneAlgorithm · Google Ads, managed remotely", proof: false, census: "all" },
};
// Semrush phrase stems per service (the ranking's phrasings plus the extras pulled for the top metros)
const STEMS = {
  seo: ["seo company", "seo services", "seo agency", "seo", "local seo", "seo expert", "seo consultant", "search engine optimization"],
  marketing: ["digital marketing agency", "marketing agency", "marketing agencies", "digital marketing", "marketing companies", "marketing firm", "social media marketing", "social media management", "advertising agency"],
  "app-development": ["mobile app development", "custom software development", "app development company", "app developers", "app development", "software development company", "app developer", "software development"],
  "google-ads": ["google ads agency", "google ads management", "ppc agency", "ppc management", "google ads", "ppc company", "google ads consultant", "ppc"],
};
const AC_SEEDS = { seo: ["seo company", "seo"], marketing: ["digital marketing agency", "social media management"], "app-development": ["app developers", "software development company"], "google-ads": ["google ads agency", "ppc management"] };

/* ---------- places ---------- */
const ST = { AL: "Alabama", AZ: "Arizona", CA: "California", CO: "Colorado", CT: "Connecticut", DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", LA: "Louisiana", MA: "Massachusetts", MD: "Maryland", MI: "Michigan", MN: "Minnesota", MO: "Missouri", NC: "North Carolina", NJ: "New Jersey", NM: "New Mexico", NV: "Nevada", NY: "New York", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", SC: "South Carolina", TN: "Tennessee", TX: "Texas", UT: "Utah", VA: "Virginia", WA: "Washington" };
const ABBR = Object.fromEntries(Object.entries(ST).map(([a, n]) => [n, a]));
const TZ_OF = { AL: "CT", AZ: "AZ", CA: "PT", CO: "MT", CT: "ET", DC: "ET", FL: "ET", GA: "ET", HI: "HT", ID: "MT", IL: "CT", IN: "ET", LA: "CT", MA: "ET", MD: "ET", MI: "ET", MN: "CT", MO: "CT", NC: "ET", NJ: "ET", NM: "MT", NV: "PT", NY: "ET", OH: "ET", OK: "CT", OR: "PT", PA: "ET", SC: "ET", TN: "CT", TX: "CT", UT: "MT", VA: "ET", WA: "PT" };
const MOST = new Set(["florida", "texas"]); // states that span two time zones
// display name, slug (ambiguous names carry the state, gap check 2026-10-31), metro word, coordinates (city centres, approximate)
const PM = {
  "new york": ["New York", "new-york", [40.71, -74.01]], "los angeles": ["Los Angeles", "los-angeles", [34.05, -118.24]], chicago: ["Chicago", "chicago", [41.88, -87.63]],
  houston: ["Houston", "houston", [29.76, -95.37]], dallas: ["Dallas", "dallas", [32.78, -96.8], "Dallas-Fort Worth"], boston: ["Boston", "boston", [42.36, -71.06]],
  miami: ["Miami", "miami", [25.76, -80.19]], atlanta: ["Atlanta", "atlanta", [33.75, -84.39]], "san diego": ["San Diego", "san-diego", [32.72, -117.16]],
  "las vegas": ["Las Vegas", "las-vegas", [36.17, -115.14]], tampa: ["Tampa", "tampa", [27.95, -82.46]], denver: ["Denver", "denver", [39.74, -104.99]],
  orlando: ["Orlando", "orlando", [28.54, -81.38]], jacksonville: ["Jacksonville", "jacksonville", [30.33, -81.66]], austin: ["Austin", "austin", [30.27, -97.74]],
  seattle: ["Seattle", "seattle", [47.61, -122.33]], raleigh: ["Raleigh", "raleigh", [35.78, -78.64]], philadelphia: ["Philadelphia", "philadelphia", [39.95, -75.17]],
  birmingham: ["Birmingham", "birmingham-al", [33.52, -86.8]], "san antonio": ["San Antonio", "san-antonio", [29.42, -98.49]], charlotte: ["Charlotte", "charlotte", [35.23, -80.84]],
  "washington dc": ["Washington, DC", "washington-dc", [38.91, -77.04]], "kansas city": ["Kansas City", "kansas-city", [39.1, -94.58]], "san francisco": ["San Francisco", "san-francisco", [37.77, -122.42], "San Francisco-Oakland"],
  nashville: ["Nashville", "nashville", [36.16, -86.78]], "st louis": ["St. Louis", "st-louis", [38.63, -90.2]], portland: ["Portland", "portland-or", [45.52, -122.68]],
  phoenix: ["Phoenix", "phoenix", [33.45, -112.07]], indianapolis: ["Indianapolis", "indianapolis", [39.77, -86.16]], columbus: ["Columbus", "columbus-oh", [39.96, -83.0]],
  tucson: ["Tucson", "tucson", [32.22, -110.97]], "salt lake city": ["Salt Lake City", "salt-lake-city", [40.76, -111.89]], "new orleans": ["New Orleans", "new-orleans", [29.95, -90.07]],
  richmond: ["Richmond", "richmond-va", [37.54, -77.44]], tulsa: ["Tulsa", "tulsa", [36.15, -95.99]], "san jose": ["San Jose", "san-jose", [37.34, -121.89]],
  minneapolis: ["Minneapolis", "minneapolis", [44.98, -93.27]], detroit: ["Detroit", "detroit", [42.33, -83.05]], rochester: ["Rochester", "rochester-ny", [43.16, -77.61]],
  cleveland: ["Cleveland", "cleveland", [41.5, -81.69]], boise: ["Boise", "boise", [43.62, -116.2]], "grand rapids": ["Grand Rapids", "grand-rapids", [42.96, -85.67]],
  durham: ["Durham", "durham-nc", [35.99, -78.9]], baltimore: ["Baltimore", "baltimore", [39.29, -76.61]], "baton rouge": ["Baton Rouge", "baton-rouge", [30.45, -91.15]],
  "fort myers": ["Fort Myers", "fort-myers", [26.64, -81.87]], albuquerque: ["Albuquerque", "albuquerque", [35.08, -106.65]], "colorado springs": ["Colorado Springs", "colorado-springs", [38.83, -104.82]],
  spokane: ["Spokane", "spokane", [47.66, -117.43]], charleston: ["Charleston", "charleston-sc", [32.78, -79.93]], pittsburgh: ["Pittsburgh", "pittsburgh", [40.44, -79.99]],
  virginia: ["Virginia", "virginia", [37.5, -78.8]], "new jersey": ["New Jersey", "new-jersey", [40.1, -74.5]], utah: ["Utah", "utah", [39.3, -111.7]], texas: ["Texas", "texas", [31.0, -99.3]],
  california: ["California", "california", [37.2, -119.5]], florida: ["Florida", "florida", [28.6, -82.4]], connecticut: ["Connecticut", "connecticut", [41.6, -72.7]],
  colorado: ["Colorado", "colorado", [39.0, -105.5]], hawaii: ["Hawaii", "hawaii", [20.8, -156.3]],
};
// photo key into PLACE_PHOTOS (wd photos.ts) or PLACE_PHOTOS_NW (photos-nw.ts)
const WD_SLUGS = new Set(fs.readdirSync(`${REPO}/client/data/wd-local`).filter((f) => !/^(types|shared|photos|photos-nw|places)\.ts$/.test(f)).map((f) => f.replace(/\.ts$/, "")));
const WD_SLUG_OF = { portland: "portland", columbus: "columbus", richmond: "richmond" }; // web-design pages kept the bare slug
const wdPage = (key) => { const s = WD_SLUG_OF[key] ?? PM[key][1]; return key === "philadelphia" ? "/services/web-design-philadelphia" : WD_SLUGS.has(s) ? `/services/web-design-${s}` : null; };

function placeInfo(key) {
  const p = PLACES.find((x) => x.place === key && (key in { virginia: 1, "new jersey": 1, utah: 1, texas: 1, california: 1, florida: 1, connecticut: 1, colorado: 1, hawaii: 1 } ? x.kind === "state" : x.kind === "metro"));
  if (!p) throw new Error(`no place row for ${key}`);
  const [display, slug, ll, metroWord] = PM[key];
  const isState = p.kind === "state";
  const c = isState ? CENSUS.state[p.code] : CENSUS.msa[p.code];
  const st = isState ? ABBR[p.msa] : p.msa.match(/, ([A-Z]{2})/)[1];
  return { key, display, slug, ll, metroWord, kind: isState ? "state" : "metro", code: p.code, censusName: c.name, st, state: ST[st], tz: TZ_OF[st], most: MOST.has(key), c };
}

/* ---------- helpers ---------- */
const fmt = (v) => Number(v).toLocaleString("en-US");
const r1 = (v) => Math.round(v * 10) / 10;
const ordinal = (k) => k + (["th", "st", "nd", "rd"][((k % 100) - 20) % 10] || ["th", "st", "nd", "rd"][k % 100] || "th");
const hav = ([a, b], [c, d]) => { const R = 3958.8, t = Math.PI / 180; const x = Math.sin(((c - a) * t) / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(((d - b) * t) / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const fmtDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const geoQ = (P) => (P.kind === "state" ? `for=state:${P.code}` : `for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:${P.code}`);
const CBPQ = (P, naics) => `https://api.census.gov/data/2023/cbp?get=NAME,ESTAB&NAICS2017=${naics}&EMPSZES=001&${geoQ(P)}`;
const ACSQ = (P) => `https://api.census.gov/data/2024/acs/acs1?get=NAME,B01003_001E&${geoQ(P)}`;
const NAICS = { all: ["00", "all industries"], prof54: ["54", "NAICS 54 Professional, scientific and technical services"], ads541810: ["541810", "NAICS 541810 Advertising agencies"], mkt541613: ["541613", "NAICS 541613 Marketing consulting services"], prog541511: ["541511", "NAICS 541511 Custom computer programming services"], sys541512: ["541512", "NAICS 541512 Computer systems design services"], cs5415: ["5415", "NAICS 5415 Computer systems design and related services"], info51: ["51", "NAICS 51 Information"], retail: ["44-45", "NAICS 44-45 Retail trade"], health: ["62", "NAICS 62 Health care and social assistance"], finance: ["52", "NAICS 52 Finance and insurance"], realestate: ["53", "NAICS 53 Real estate and rental and leasing"], construct: ["23", "NAICS 23 Construction"] };
const SECT = { retail: "retail trade", health: "health care and social assistance", construct: "construction", prof54: "professional, scientific and technical services", finance: "finance and insurance", realestate: "real estate", info51: "information" };
const SHORT = { retail: "Retail", health: "Health care", construct: "Construction", prof54: "Professional services", finance: "Finance and insurance", realestate: "Real estate", info51: "Information" };

/* ---------- pages ---------- */
const PAGES = Object.entries(SCOPE).flatMap(([svc, list]) => list.split(",").map((key) => {
  const P = placeInfo(key);
  return { id: `${svc}-${P.slug}`, svc, S: SVC[svc], P, path: `/services/${svc}-${P.slug}` };
}));
if (PAGES.length !== 115) throw new Error(`expected 115 pages, got ${PAGES.length}`);
const byId = Object.fromEntries(PAGES.map((p) => [p.id, p]));

function semRows(svc, key) {
  const rows = [];
  for (const stem of STEMS[svc]) { const k = SEM.keywords[`${stem} ${key}`]; if (k) rows.push({ phrase: `${stem} ${key}`, volume: k.volume ?? 0, cpc: k.cpc > 0 ? k.cpc : null, kd: k.kd ?? null }); }
  return rows.sort((a, b) => b.volume - a.volume);
}
function acFor(svc, key) {
  const out = new Set();
  const e = SUG[key] || {};
  for (const seed of Object.keys(e)) {
    if (!AC_SEEDS[svc].includes(seed) && !(svc === "seo" && /seo/.test(seed)) && !(svc === "marketing" && /marketing|social/.test(seed)) && !(svc === "app-development" && /app|software/.test(seed)) && !(svc === "google-ads" && /google ads|ppc/.test(seed))) continue;
    for (const eng of ["google", "bing"]) for (const s of e[seed][eng] || []) { const t = s.toLowerCase().trim(); if (t.includes(key.replace(" dc", ""))) out.add(t); }
  }
  return [...out];
}

function factsheet(pg) {
  const { P, S, svc } = pg;
  const c = P.c;
  const allowed = {}; // printed string -> source
  const A = (v, src) => { allowed[String(v)] = src; return v; };
  const rows = [];
  const add = (field, label) => {
    const [n, fact] = NAICS[field];
    if (c[field] == null) return -1;
    rows.push({ geo: P.kind === "state" ? `state:${P.code}` : `msa:${P.code}`, fact: field === "all" ? "Total establishments (all industries)" : `Establishments, ${fact}`, period: "2023", value: c[field], label, source: "Census CBP 2023", query: [CBPQ(P, n)] });
    A(fmt(c[field]), `Census CBP 2023, establishments, ${fact}`);
    return rows.length - 1;
  };
  const iAll = add("all", "Business establishments, 2023");
  rows.push({ geo: P.kind === "state" ? `state:${P.code}` : `msa:${P.code}`, fact: "Total population", period: "2024", value: c.pop, label: "Population, 2024", source: "Census ACS 1-year 2024", query: [ACSQ(P)] });
  const iPop = rows.length - 1; A(fmt(c.pop), "Census ACS 1-year 2024, total population (B01003)");
  const idx = {};
  for (const f of ["prof54", "ads541810", "mkt541613", "prog541511", "sys541512", "cs5415", "info51", "retail", "health", "finance", "realestate", "construct"]) idx[f] = add(f, { prof54: "Professional services establishments", ads541810: "Advertising agencies (541810)", mkt541613: "Marketing consulting firms (541613)", prog541511: "Custom programming firms (541511)", sys541512: "Systems design firms (541512)", cs5415: "Computer systems design (5415)", info51: "Information sector establishments", retail: "Retail establishments", health: "Health care establishments", finance: "Finance and insurance establishments", realestate: "Real estate establishments", construct: "Construction establishments" }[f]);
  const derived = (label, value, formula, from, src) => { rows.push({ geo: rows[0].geo, fact: `derived: ${formula}`, period: "2023", value, label, source: src, query: [...new Set(from.filter((i) => i >= 0).flatMap((i) => rows[i].query))], derived: formula }); A(String(value), `derived: ${formula}`); return rows.length - 1; };
  const comp = (c.ads541810 || 0) + (c.mkt541613 || 0);
  const per = (n) => r1((n / c.all) * 10000);
  const iComp = derived("Agencies + consultants per 10,000", per(comp), "advertising agencies (541810) plus marketing consulting (541613) per 10,000 establishments", [idx.ads541810, idx.mkt541613, iAll], `Census CBP 2023 · ${fmt(comp)} of ${fmt(c.all)}`);
  A(fmt(comp), "derived: NAICS 541810 + 541613 establishments, 2023");
  const iProg = derived("Programming firms per 10,000", per(c.prog541511 || 0), "custom programming establishments (541511) per 10,000 establishments", [idx.prog541511, iAll], `Census CBP 2023 · ${fmt(c.prog541511 || 0)} of ${fmt(c.all)}`);
  const profShare = r1((c.prof54 / c.all) * 100);
  const iProf = derived("% in professional services", profShare, "professional, scientific and technical establishments / all establishments", [idx.prof54, iAll], `Census CBP 2023 · ${fmt(c.prof54)} of ${fmt(c.all)}`);
  const ppe = r1(c.pop / c.all); A(String(ppe), "derived: population 2024 / establishments 2023");
  const iPpe = derived("Residents per establishment", ppe, "population 2024 / establishments 2023", [iPop, iAll], "Census ACS 2024 and CBP 2023");
  // sectors by establishment count, with shares
  const sectors = Object.keys(SECT).map((f) => ({ f, label: SECT[f], short: SHORT[f], est: c[f] ?? 0, share: r1(((c[f] ?? 0) / c.all) * 100) })).sort((a, b) => b.est - a.est);
  for (const s of sectors) A(String(s.share), `derived: ${s.label} share of establishments, 2023`);
  const top3 = sectors.slice(0, 3); A(String(r1(top3.reduce((a, s) => a + s.share, 0))), "derived: top-3 sectors' share of establishments, 2023");
  if (c.cs5415) A(String(per(c.cs5415)), "derived: NAICS 5415 per 10,000 establishments");
  if (c.ads541810) A(String(per(c.ads541810)), "derived: NAICS 541810 per 10,000"); if (c.mkt541613) A(String(per(c.mkt541613)), "derived: NAICS 541613 per 10,000");
  // ranks among the pages of the same service (like with like)
  const sib = PAGES.filter((x) => x.svc === svc);
  const rk = (fn) => 1 + sib.filter((x) => fn(x.P.c) > fn(c)).length;
  const ranks = { establishments: rk((z) => z.all), population: rk((z) => z.pop), competitorDensity: rk((z) => ((z.ads541810 || 0) + (z.mkt541613 || 0)) / z.all), programmingDensity: rk((z) => (z.prog541511 || 0) / z.all), profShare: rk((z) => z.prof54 / z.all), of: sib.length };
  for (const [k, v] of Object.entries(ranks)) { A(String(v), `derived: rank (${k}) among the ${sib.length} ${S.label} place pages`); A(ordinal(v), `derived: rank (${k}) among the ${sib.length} ${S.label} place pages`); }
  const medOf = (fn) => { const a = sib.map((x) => fn(x.P.c)).sort((x, y) => x - y); return a[Math.floor((a.length - 1) / 2)]; };
  const medians = { competitorDensity: r1(medOf((z) => (((z.ads541810 || 0) + (z.mkt541613 || 0)) / z.all) * 10000)), programmingDensity: r1(medOf((z) => ((z.prog541511 || 0) / z.all) * 10000)), profShare: r1(medOf((z) => (z.prof54 / z.all) * 100)) };
  for (const [k, v] of Object.entries(medians)) A(String(v), `derived: median ${k} of the ${sib.length} ${S.label} place pages`);
  // Semrush
  const sem = semRows(svc, P.key);
  if (!sem.length) throw new Error(`${pg.id}: no Semrush rows`);
  for (const x of sem) { A(fmt(x.volume), `Semrush US exact volume, "${x.phrase}", pulled 2026-10-31`); if (x.cpc != null) A(x.cpc.toFixed(2), `Semrush CPC (USD), "${x.phrase}"`); if (x.kd != null) A(String(x.kd), `Semrush keyword difficulty, "${x.phrase}"`); }
  const semSum = sem.reduce((a, x) => a + x.volume, 0); A(fmt(semSum), "sum of the Semrush exact volumes in the table");
  A(String(sem.length), "count of phrasings in the Semrush table");
  if (S.proof) for (const [v, src] of [["92", "Phantom Arcades GSC clicks +92%"], ["231", "Phantom Arcades GSC non-brand +231%"], ["1,112", "Phantom GSC clicks 2025 window"], ["2,130", "Phantom GSC clicks 2026 window"], ["95", "Phantom GSC non-brand 2025"], ["314", "Phantom GSC non-brand 2026"], ["68", "Phantom case window, days"], ["63", "Phantom GSC impressions +63%"], ["80", "Phantom redirects, 80+ old addresses"]]) A(v, `${src} (client/data/wd-proof.ts, Seo.tsx sources)`);
  // links
  const sameCity = PAGES.filter((x) => x.P.key === P.key && x.id !== pg.id).map((x) => ({ to: x.path, title: `${x.S.label} in ${P.display}`, tag: "Same place" }));
  const wd = wdPage(P.key); if (wd) sameCity.unshift({ to: wd, title: `Web design in ${P.display}`, tag: "Same place" });
  if (svc !== "google-ads" && P.key === "philadelphia") sameCity.push({ to: "/services/google-ads-philadelphia", title: "Google Ads in Philadelphia", tag: "Same place" });
  const statePg = P.kind === "metro" ? sib.find((x) => x.P.kind === "state" && x.P.st === P.st) : null;
  const children = P.kind === "state" ? sib.filter((x) => x.P.kind === "metro" && x.P.st === P.st) : [];
  const near = sib.filter((x) => x.P.kind === "metro" && x.id !== pg.id && !children.includes(x)).map((x) => ({ x, d: hav(P.ll, x.P.ll) })).sort((a, b) => a.d - b.d).slice(0, 3).map((o) => o.x);
  const ac = acFor(svc, P.key);
  const tz = { ET: "Eastern", CT: "Central", MT: "Mountain", PT: "Pacific", AZ: "Arizona (Mountain Standard, no daylight saving)", HT: "Hawaii-Aleutian" }[P.tz];
  return {
    id: pg.id, service: svc, serviceLabel: S.label, path: pg.path, place: P.display, kind: P.kind, state: P.state, st: P.st, timeZone: tz, mostOfState: P.most,
    metroName: P.kind === "metro" ? `the ${P.metroWord ?? P.display} metro` : P.display, censusArea: P.censusName,
    census: Object.fromEntries(Object.entries(c).filter(([k]) => k !== "name" && k !== "code").map(([k, v]) => [k, fmt(v)])),
    derived: { competitors: fmt(comp), competitorsPer10k: per(comp), programmingPer10k: per(c.prog541511 || 0), profSharePct: profShare, residentsPerEstablishment: ppe, sectorsByEstablishments: sectors.map((s) => ({ sector: s.label, establishments: fmt(s.est), sharePct: s.share })), ranksAmongSameServicePages: ranks, mediansOfSameServicePages: medians },
    semrush: { pulled: "2026-10-31", rows: sem.map((x) => ({ phrase: x.phrase, volume: fmt(x.volume), cpc: x.cpc != null ? x.cpc.toFixed(2) : "no bid data", kd: x.kd })), sum: fmt(semSum) },
    autocomplete: ac,
    questionBank: (SEM.questions[{ seo: "seo services", marketing: "digital marketing agency", "app-development": "app development", "google-ads": "google ads management" }[svc]] || []).map((q) => q.keyword),
    links: { hub: S.hub, sameCity, state: statePg ? { to: statePg.path, title: `${S.label} in ${statePg.P.display}` } : null, children: children.map((x) => ({ to: x.path, title: `${S.label} in ${x.P.display}` })), near: near.map((x) => ({ to: x.path, title: `${S.label} in ${x.P.display}` })) },
    proofAllowed: S.proof ? "ONLY these facts (Phantom Arcades, an arcade cabinet manufacturer in Valrico, Florida; may be named, case study /blog/seo-case-study-phantom-arcades): we designed and rebuilt their website for search (incl. a 3D cabinet configurator); mapped 80+ old addresses to new ones with redirects; Google Search Console, 13 August to 19 October 2026 (68 days) vs the same dates in 2025: clicks 1,112 to 2,130 (+92%), non-brand clicks 95 to 314 (+231%), impressions up 63%; the 68 days before were flat (clicks down 6%). Nothing else: no dealers/trade shows/link-building/content claims, no revenue, never the TV show name. Our own site: SEO run in-house for One Algorithm (no numbers)." : "NONE: no client results for this service. Method and process only. No apps-shipped claims, no ad-account results.",
    allowed, _rows: rows, _readouts: [iAll, iComp, idx.prog541511 >= 0 ? (svc === "app-development" ? idx.prog541511 : idx.mkt541613) : iProf, iProf, iProg, iPop, iPpe].filter((i, k, a) => i >= 0 && a.indexOf(i) === k),
  };
}

/* ================================== data ================================== */
if (mode === "data") {
  fs.mkdirSync(`${BUILD}/data`, { recursive: true }); fs.mkdirSync(`${BUILD}/copy`, { recursive: true });
  for (const pg of PAGES) { const f = factsheet(pg); const { _rows, _readouts, ...pub } = f; fs.writeFileSync(`${BUILD}/data/${pg.id}.json`, JSON.stringify(pub, null, 1)); }
  fs.writeFileSync(`${BUILD}/pages.json`, JSON.stringify(PAGES.map((p) => ({ id: p.id, svc: p.svc, place: p.P.display, key: p.P.key, kind: p.P.kind, st: p.P.st, path: p.path })), null, 1));
  console.log(`wrote ${PAGES.length} fact sheets to ${BUILD}/data`);
  process.exit(0);
}

/* ================================== assemble ================================== */
const TZL = { ET: null, CT: "8 a.m. to 4 p.m.", MT: "7 a.m. to 3 p.m.", PT: "6 a.m. to 2 p.m." };
function officeLines(P) {
  const most = P.most ? "Most of " : "";
  if (P.tz === "ET") return [`${most}${P.display} shares Eastern time with our office, so calls and reviews fall inside the same working day.`, "the office answers (610) 890-9711 Monday to Friday, 9 a.m. to 5 p.m. Eastern."];
  if (P.tz === "AZ") return [`${P.display} keeps Mountain Standard Time all year, so our Eastern office day starts at 7 a.m. there in winter.`, "the office answers (610) 890-9711 Monday to Friday: 7 a.m. to 3 p.m. Arizona time in winter, 6 a.m. to 2 p.m. in summer."];
  if (P.tz === "HT") return [`${P.display} keeps Hawaii-Aleutian time all year, so our Eastern office day starts before dawn there; calls are booked for your morning.`, "the office answers (610) 890-9711 Monday to Friday, from 4 a.m. Hawaii time in winter and 3 a.m. in summer."];
  const n = { CT: "Central", MT: "Mountain", PT: "Pacific" }[P.tz];
  return [`${most}${P.display} runs on ${n} time, so our 9-to-5 Eastern day is ${TZL[P.tz]} there.`, `the office answers (610) 890-9711 Monday to Friday, ${TZL[P.tz]} ${n} time.`];
}
const STAGES = {
  seo: [["01", "Audit what Google sees", "Crawl, Search Console and rankings read before anything changes."], ["02", "Plan pages from demand", "Pages and phrasings chosen from search volume and real autocomplete."], ["03", "Fix and build", "Technical fixes, titles, schema and new pages shipped in order."], ["04", "Earn authority", "Blog posts, email and links that give Google reasons to trust the site."], ["05", "Measure and repeat", "Clicks and positions read monthly from Search Console, then the next round."]],
  marketing: [["01", "Website and message first", "The offer and the site that carries it, made clear before any campaign."], ["02", "Search and content", "SEO, blog posts and email that build traffic without ad spend."], ["03", "Authority", "Reviews, links and mentions that make the business easy to trust."], ["04", "Automation", "Social posts, Business Profile updates and review requests on a schedule."], ["05", "Paid, once organic works", "Ads added after the organic channels convert, measured the same way."]],
  "app-development": [["01", "Agree what the app must do", "Users, the job, the data and what it connects to."], ["02", "Scope in writing", "Screens, integrations, schedule and price on paper first."], ["03", "Design in the browser", "Clickable screens reviewed on your own phone and desktop."], ["04", "Build and test", "Code, data, logins and automated tests in one pass."], ["05", "Launch and stay on", "Released in your accounts, with support after launch."]],
  "google-ads": [["01", "Tracking before spend", "Conversions, calls and forms measured before a dollar is spent."], ["02", "Search terms from data", "Keywords and match types chosen from real volumes and costs."], ["03", "Ads and landing pages", "Ad copy and the page it lands on written as one message."], ["04", "Budget and bids", "Spend set against the conversions that matter, reviewed weekly."], ["05", "Report and refine", "Search terms, costs and conversions reported in plain numbers."]],
};

const LEADINS = new Set(["Why it matters:", "What we do:", "What you get:", "By the numbers:", "Yes, but:", "The bottom line:"]);
function build(pg) {
  const F = factsheet(pg);
  const { P, S } = pg;
  const copyPath = `${BUILD}/copy/${pg.id}.json`;
  if (!fs.existsSync(copyPath)) return null;
  const C = rj(copyPath);
  const trace = { ...F.allowed };
  const [tzLine, hoursLead] = officeLines(P);
  const semTable = F.semrush.rows.map((x) => [x.phrase, x.volume, x.cpc === "no bid data" ? "no bid data" : `$${x.cpc}`]);
  const compRows = [["Advertising agencies (541810)", F.census.ads541810 ?? "not published", `${F.derived.competitorsPer10k} per 10,000 with 541613`], ["Marketing consulting (541613)", F.census.mkt541613 ?? "not published", "Census CBP 2023"], ["Custom programming (541511)", F.census.prog541511 ?? "not published", `${F.derived.programmingPer10k} per 10,000`]];
  const sectorRows = F.derived.sectorsByEstablishments.slice(0, 4).map((s) => [s.sector.charAt(0).toUpperCase() + s.sector.slice(1), s.establishments, `${s.sharePct}%`]);
  const u = (k) => ({ id: k, h2: C[k].h2, lede: C[k].lede, leadIn: LEADINS.has(C[k].leadIn) ? C[k].leadIn : "Why it matters:", lead: C[k].lead, ...(C[k].points?.length ? { points: C[k].points } : {}), ...(C[k].deeper ? { deeper: C[k].deeper } : {}) });
  const routeItems = [
    ...F.links.sameCity, ...(F.links.state ? [{ ...F.links.state, tag: "State" }] : []), ...F.links.children.map((x) => ({ ...x, tag: "City in this state" })),
    ...F.links.near.map((x) => ({ ...x, tag: "Nearby" })), { to: S.hub, title: S.hubLabel, tag: "Service" },
    ...(S.proof ? [{ to: "/blog/seo-case-study-phantom-arcades", title: "SEO case study: an arcade manufacturer", tag: "Case study" }] : []),
  ].filter((x, i, a) => a.findIndex((y) => y.to === x.to) === i);
  const sections = [
    { kind: "intro", ...u("intro"), cards: C.intro.cards },
    { kind: "facts", ...u("figures"), readouts: F._readouts },
    { kind: "text", ...u("industries"), table: { caption: `${P.display}: the four largest of ${F.derived.sectorsByEstablishments.length} sectors by establishments, Census CBP 2023`, cols: ["Sector", "Establishments, 2023", "Share"], rows: sectorRows } },
    { kind: "search", ...u("search"), table: { caption: `Monthly US searches and cost per click for ${P.display} ${S.noun} phrasings, Semrush, ${fmtDate(TODAY)}`, cols: ["Phrase", "Searches a month", "Cost per click"], rows: semTable }, source: `Semrush US exact match · ${F.semrush.sum} a month in all · pulled ${fmtDate(TODAY)}` },
    { kind: "text", ...u("market"), table: { caption: `Firms in the same codes as ${S.noun} providers, ${F.metroName}, Census CBP 2023`, cols: ["Census code", "Establishments, 2023", "Note"], rows: compRows }, links: [{ to: S.hub, label: S.hubLabel }] },
    { kind: "text", ...u("proof"), cards: C.proof.cards, ...(S.proof ? { links: [{ to: "/blog/seo-case-study-phantom-arcades", label: "Read the arcade manufacturer case study" }] } : {}) },
    { kind: "text", ...u("growth"), links: [{ to: "/services/seo", label: "SEO" }, { to: "/services/marketing", label: "Marketing services" }, { to: "/services/website-development", label: "Website development" }].filter((l) => l.to !== S.hub) },
    { kind: "text", ...u("process"), cards: STAGES[pg.svc].map(([num, h3, line]) => ({ h3: `${num} ${h3}`, line })) },
    { kind: "office", id: "office", plate: false, h2: C.office.h2, lede: tzLine, leadIn: "The bottom line:", lead: hoursLead, question: { q: `Do you have an office in ${P.display}?`, a: `No. Our one office is in Malvern, PA, and ${S.noun} work for ${P.display} runs remotely, with every stage reviewed in your own browser.` }, deeper: C.office.deeper },
    { kind: "faq", id: "faq", h2: C.faqH2, schema: true, items: C.faq.map((f) => ({ q: f.q, a: f.a, from: f.from, ...(f.link ? { link: f.link } : {}) })) },
    { kind: "routes", id: "related", h2: `More services in ${P.display}`.split(" ").length <= 8 ? `Related pages for ${P.display}` : "Related pages", lede: "", items: routeItems },
  ];
  const st = P.kind === "metro" && P.st !== "DC" ? `, ${P.st}` : "";
  const title = S.titles(P.display, st).find((t) => t.length <= 60) ?? S.titles(P.display, "")[2];
  const description = C.meta;
  const areaServed = P.kind === "state" ? { "@type": "State", name: P.display, containedInPlace: { "@type": "Country", name: "United States" } } : { "@type": "City", name: P.display === "Washington, DC" ? "Washington" : P.display, containedInPlace: P.st === "DC" ? { "@type": "AdministrativeArea", name: "District of Columbia" } : { "@type": "State", name: P.state } };
  return {
    slug: pg.id, name: P.display, path: pg.path, kind: P.kind, photo: P.slug,
    service: { key: S.key, label: S.label, hub: S.hub, hubLabel: S.hubLabel, need: S.need, serviceType: S.serviceType, ogAlt: `${S.og} ${P.display}` },
    ...(F.links.state ? { parent: { label: F.links.state.title.replace(`${S.label} in `, ""), to: F.links.state.to } } : {}),
    seo: { title, description, dateModified: TODAY, ogImage: `/og/places/${pg.id}.jpg` },
    hero: { kicker: S.kicker, h1: S.h1(P.display), lede: C.heroLede },
    areaServed,
    facts: { rows: F._rows, geoName: P.kind === "state" ? `${P.display} (Census state FIPS ${P.code})` : `${P.censusName.replace(/ Metro Area$/, "")} metro area (Census CBSA code ${P.code})`, pulled: TODAY },
    search: { rows: F.semrush.rows.map((x) => ({ phrase: x.phrase, volume: Number(x.volume.replace(/,/g, "")), cpc: x.cpc === "no bid data" ? null : Number(x.cpc), kd: x.kd })), pulled: fmtDate(TODAY), autocomplete: F.autocomplete.slice(0, 4), autocompleteRead: fmtDate(TODAY), rank: F.derived.ranksAmongSameServicePages.establishments, of: F.derived.ranksAmongSameServicePages.of },
    sections,
    desk: C.desk,
    trace,
  };
}

/* ---------- check (data level; the rendered gate is build:static + screenshots) ---------- */
const protect = (t) => t.replace(/\bSt\. /g, "St ").replace(/\b([ap])\.m\./g, "$1m").replace(/U\.S\./g, "US").replace(/(\d)\.(\d)/g, "$1·$2");
const sentSplit = (t) => protect(t).split(/(?<=[.!?])\s+(?=[A-Z0-9"“$])/).map((s) => s.trim()).filter(Boolean);
const norm = (s) => s.toLowerCase().replace(/[^\w\s·]/g, "").replace(/\s+/g, " ").trim();
const normNo = (s) => norm(s).replace(/[\d·,]+/g, "#");
const wc = (t) => (t || "").split(/\s+/).filter(Boolean).length;
function texts(d) {
  const out = [d.hero.h1, d.hero.lede];
  for (const s of d.sections) {
    out.push(s.h2); if (s.lede) out.push(s.lede); if (s.lead) out.push(`${s.leadIn ?? ""} ${s.lead}`); (s.points || []).forEach((x) => out.push(x));
    (s.cards || []).forEach((c) => out.push(c.h3, c.line)); (s.deeper?.paras || []).forEach((x) => out.push(x));
    if (s.table) s.table.rows.forEach((r) => out.push(r.join(" "))); if (s.question) out.push(s.question.q, s.question.a);
    if (s.items) s.items.forEach((i) => out.push(i.q ?? i.title, i.a ?? ""));
  }
  out.push(d.desk.h2, d.desk.lede, ...d.desk.covers);
  return out.filter(Boolean).map((t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));
}
const BANNED = /\baffordable\b|\bcheap(est)?\b|years of experience|combined experience|\bWOSB\b|woman-owned|minority-owned|\baward|\bguarantee|starting at|per hour|\/hr\b|\$(?!\d+\.\d\d\b)\d|\b\d+\s*(days?|weeks?|months?)\b(?! a month)|fastest|Google Partner|Premier Partner|certified|Price Is Right|hundreds of|\bour (local )?office in (?!Malvern)|based in (?!Malvern)|our .{0,20}clients? in |we have (worked|helped) .{0,40} in |Holy Moly|Ksquare|trade shows?|apps? we (shipped|launched)|App Store apps|#1|number one|top-ranked|rank you first/i;
const SB = { h2: 8, lede: 25, lead: 25, pts: 3, ptw: 15, deeper: 220 };
const ALLOW_NUM = new Set(["2023", "2024", "2025", "2026", "625", "19355", "610", "890", "9711", "10,000", "20", "9", "5", "4", "8", "3", "7", "6", "2", "1", "0", "01", "02", "03", "04", "05", "541810", "541613", "541511", "541512", "5415", "54", "51", "52", "53", "62", "23", "44", "45", "92", "231", "40", "60", "100", "B01003", "1·0", "2·1"]);

function check(ids) {
  const D = {};
  for (const pg of PAGES) { if (ids && !ids.includes(pg.id)) { const f = `${OUT}/${pg.id}.ts`; if (!fs.existsSync(f)) continue; } const d = build(pg); if (d) D[pg.id] = d; }
  // the web-design siblings for the same city count as siblings too
  const wdText = {};
  for (const f of fs.readdirSync(`${REPO}/client/data/wd-local`)) { if (/^(types|shared|photos|photos-nw|places)\.ts$/.test(f) || !f.endsWith(".ts")) continue; const s = fs.readFileSync(`${REPO}/client/data/wd-local/${f}`, "utf8"); const i = s.indexOf("= {"); if (i < 0) continue; try { wdText[`wd:${f.replace(".ts", "")}`] = texts(JSON.parse(s.slice(i + 2, s.lastIndexOf("};") + 1))); } catch (e) { if (process.env.DBG) console.log(f, e.message); } }
  const SENT = {}, SENTN = {};
  for (const [id, d] of Object.entries(D)) { const t = texts(d); SENT[id] = new Set(t.flatMap(sentSplit).map(norm).filter((s) => s.split(" ").length >= 4)); SENTN[id] = new Set([...SENT[id]].map(normNo)); }
  for (const [id, t] of Object.entries(wdText)) { SENT[id] = new Set(t.flatMap(sentSplit).map(norm).filter((s) => s.split(" ").length >= 4)); SENTN[id] = new Set([...SENT[id]].map(normNo)); }
  const report = [];
  for (const [id, d] of Object.entries(D)) {
    if (ids && !ids.includes(id)) continue;
    const fails = [];
    const C = rj(`${BUILD}/copy/${id}.json`);
    const all = texts(d); const words = all.reduce((a, t) => a + wc(t), 0);
    if (words < 1000) fails.push(`words ${words} < 1000`);
    // uniqueness: exact (the web-design bar) and with numbers masked (stricter: templated sentences that only swap figures count as shared)
    let worst = [1, null], worstN = [1, null];
    const mine = [...SENT[id]], mineN = [...SENTN[id]];
    for (const o of Object.keys(SENT)) { if (o === id) continue; const u1 = mine.filter((s) => !SENT[o].has(s)).length / mine.length; const u2 = mineN.filter((s) => !SENTN[o].has(s)).length / mineN.length; if (u1 < worst[0]) worst = [u1, o]; if (u2 < worstN[0]) worstN = [u2, o]; }
    if (worst[0] < 0.6) fails.push(`unique ${(worst[0] * 100).toFixed(1)}% vs ${worst[1]} < 60%`);
    if (worstN[0] < 0.6) fails.push(`unique (numbers masked) ${(worstN[0] * 100).toFixed(1)}% vs ${worstN[1]} < 60%`);
    // Smart Brevity
    for (const s of d.sections) {
      if (s.h2 && wc(s.h2) > SB.h2) fails.push(`${s.id}: H2 ${wc(s.h2)} words`);
      if (s.lede != null && s.kind !== "faq" && s.kind !== "routes") { if (sentSplit(s.lede).length !== 1) fails.push(`${s.id}: lede is ${sentSplit(s.lede).length} sentences`); if (wc(s.lede) > SB.lede) fails.push(`${s.id}: lede ${wc(s.lede)} words`); }
      if (s.lead && wc(s.lead) > SB.lead) fails.push(`${s.id}: lead ${wc(s.lead)} words`);
      if (s.points && (s.points.length > SB.pts || s.points.some((p) => wc(p) > SB.ptw))) fails.push(`${s.id}: points over limit`);
      if (s.deeper && s.deeper.paras.reduce((a, p) => a + wc(p), 0) > SB.deeper) fails.push(`${s.id}: Go deeper ${s.deeper.paras.reduce((a, p) => a + wc(p), 0)} words`);
    }
    if (wc(d.hero.h1) > 9) fails.push("H1 > 9 words");
    for (const k of ["intro", "figures", "industries", "search", "market", "proof", "growth", "process"]) if (!LEADINS.has(C[k]?.leadIn)) fails.push(`${k}: leadIn "${C[k]?.leadIn}" not one of ${[...LEADINS].join(" ")}`);
    // FAQ
    const faq = d.sections.find((s) => s.kind === "faq").items;
    if (faq.length < 6) fails.push(`FAQ ${faq.length} < 6`);
    for (const f of faq) { const n = wc(f.a); if (n < 40 || n > 60) fails.push(`FAQ answer ${n} words: "${f.q}"`); if (!f.from) fails.push(`FAQ without source: "${f.q}"`); }
    // head
    if (d.seo.title.length > 60) fails.push(`title ${d.seo.title.length} chars`);
    if (!d.seo.description || d.seo.description.length > 155 || !/\(610\) 890-9711/.test(d.seo.description) || !d.seo.description.includes(d.name.replace(", DC", ""))) fails.push(`meta: ${d.seo.description?.length} chars, needs place + (610) 890-9711, <= 155`);
    // banned + remote sentence
    const body = all.join(" \n ");
    const b = body.match(new RegExp(BANNED.source, "gi")); if (b) fails.push(`banned: ${[...new Set(b)].join(" | ")}`);
    if (!/remote/i.test(body)) fails.push("no remote-delivery sentence");
    if (!byId[id].S.proof && /92%|231%/.test(body)) fails.push("case-study numbers on a non-SEO/marketing page");
    // every figure traceable
    const prose = [C.heroLede, C.meta, ...["intro", "figures", "industries", "search", "market", "proof", "growth", "process"].flatMap((k) => [C[k].h2, C[k].lede, C[k].lead, ...(C[k].points || []), ...(C[k].deeper?.paras || []), ...(C[k].cards || []).flatMap((c) => [c.h3, c.line])]), ...(C.office.deeper?.paras || []), C.office.h2, ...C.faq.flatMap((f) => [f.q, f.a]), C.desk.h2, C.desk.lede, ...C.desk.covers].filter(Boolean).join(" ");
    const nums = (prose.replace(/\(610\) 890-9711/g, "").match(/\$?\d[\d,]*(\.\d+)?%?/g) || []).map((n) => n.replace(/^\$/, "").replace(/%$/, "").replace(/,$/, "").replace(/\.$/, ""));
    const pcts = (prose.match(/\d[\d,]*(\.\d+)?%/g) || []).map((n) => n.slice(0, -1)).filter((n) => !d.trace[n]);
    if (pcts.length) fails.push(`untraced percentages: ${[...new Set(pcts)].join(", ")}`);
    const untraced = [...new Set(nums.filter((n) => !d.trace[n] && !ALLOW_NUM.has(n) && !d.trace[n.replace(/\.0$/, "")] && !/^(1st|2nd|3rd)$/.test(n)))];
    const ord = (prose.match(/\b\d+(st|nd|rd|th)\b/g) || []).filter((o) => !d.trace[o]);
    if (untraced.length) fails.push(`untraced figures: ${untraced.join(", ")}`);
    if (ord.length) fails.push(`untraced ranks: ${[...new Set(ord)].join(", ")}`);
    // links
    const linkTargets = d.sections.find((s) => s.kind === "routes").items.map((x) => x.to);
    if (byId[id].P.kind === "state" && byId[id].svc && PAGES.some((x) => x.svc === byId[id].svc && x.P.kind === "metro" && x.P.st === byId[id].P.st) && !linkTargets.some((t) => PAGES.find((x) => x.path === t && x.P.st === byId[id].P.st && x.P.kind === "metro"))) fails.push("state page does not link down");
    report.push({ id, words, unique: +(worst[0] * 100).toFixed(1), uniqueMasked: +(worstN[0] * 100).toFixed(1), worst: worstN[1], faq: faq.length, readouts: d.sections.find((s) => s.kind === "facts").readouts.length, fails });
  }
  return report;
}

if (mode === "check") {
  const r = check(ONLY);
  for (const x of r) console.log(`${x.fails.length ? "✗" : "✓"} ${x.id.padEnd(34)} words ${x.words} unique ${x.unique}% masked ${x.uniqueMasked}% (vs ${x.worst}) faq ${x.faq} readouts ${x.readouts}${x.fails.length ? "\n    - " + x.fails.join("\n    - ") : ""}`);
  const pass = r.filter((x) => !x.fails.length).length;
  console.log(`\nsvc-local-check: ${pass}/${r.length} pass${r.length ? ` · min words ${Math.min(...r.map((x) => x.words))} · min unique ${Math.min(...r.map((x) => x.unique))}% · min masked ${Math.min(...r.map((x) => x.uniqueMasked))}%` : ""}`);
  fs.mkdirSync(BUILD, { recursive: true });
  if (!ONLY) fs.writeFileSync(`${BUILD}/check-report.json`, JSON.stringify(r, null, 1));
  process.exit(pass === r.length ? 0 : 1);
}

if (mode === "build") {
  fs.mkdirSync(OUT, { recursive: true });
  const built = [];
  for (const pg of PAGES) {
    if (ONLY && !ONLY.includes(pg.id)) continue;
    const d = build(pg); if (!d) continue;
    fs.writeFileSync(`${OUT}/${pg.id}.ts`, `/* GENERATED by scripts/svc-local-gen.mjs on ${TODAY}: ${pg.path}. Do not hand-edit; edit build/copy/${pg.id}.json and re-run.
 * Sources: Census CBP 2023 + ACS 1-year 2024 (nationwide/census-all.json, query per row, no key), Semrush US exact (semrush-volumes.json,
 * pulled 2026-10-31), Google/Bing autocomplete (nationwide/suggest.json). \`trace\` maps every figure in the copy to its source. */
import type { LocalPlace } from "../wd-local/types";\n\nexport const PLACE: LocalPlace = ${JSON.stringify(d, null, 1)};\n\nexport default PLACE;\n`);
    built.push(pg);
  }
  // index of every page whose file exists (App.tsx routes, prerender, sitemap, llms, hub "by city" sections)
  const have = PAGES.filter((p) => fs.existsSync(`${OUT}/${p.id}.ts`));
  fs.writeFileSync(`${OUT}/index.ts`, `/* GENERATED by scripts/svc-local-gen.mjs: the nationwide service place pages that exist. */
export type SvcPlaceRow = { id: string; svc: "seo" | "marketing" | "app-development" | "google-ads"; path: string; name: string; kind: "metro" | "state"; state: string; title: string };
export const SVC_PLACES: SvcPlaceRow[] = ${JSON.stringify(have.map((p) => ({ id: p.id, svc: p.svc, path: p.path, name: p.P.display, kind: p.P.kind, state: p.P.state, title: `${p.S.label} in ${p.P.display}` })), null, 1)};\n`);
  console.log(`built ${built.length} page files; index has ${have.length}`);
  // sitemap + llms.txt: one marked block each, rewritten from the index (idempotent)
  const NL = String.fromCharCode(10);
  const mark = (txt, start, end, body) => { const i = txt.indexOf(start), j = txt.indexOf(end); return i >= 0 && j > i ? txt.slice(0, i) + body + txt.slice(j + end.length) : null; };
  const smPath = `${REPO}/public/sitemap.xml`; let sm = fs.readFileSync(smPath, "utf8");
  const smBody = ["<!-- svc-local:start -->", ...have.map((p) => `  <url>${NL}    <loc>https://onealgorithm.com${p.path}</loc>${NL}    <lastmod>${TODAY}</lastmod>${NL}  </url>`), "  <!-- svc-local:end -->"].join(NL);
  sm = mark(sm, "<!-- svc-local:start -->", "<!-- svc-local:end -->", smBody) ?? sm.replace("</urlset>", `  ${smBody}${NL}</urlset>`);
  fs.writeFileSync(smPath, sm);
  const llPath = `${REPO}/public/llms.txt`; let ll = fs.readFileSync(llPath, "utf8");
  const sec = (svc, h) => { const r = have.filter((p) => p.svc === svc).sort((a, b) => (a.P.kind === b.P.kind ? a.P.display.localeCompare(b.P.display) : a.P.kind === "state" ? -1 : 1)); return r.length ? [`## ${h} (delivered remotely from Malvern, PA)`, ...r.map((p) => `- [${p.S.h1(p.P.display)}](https://onealgorithm.com${p.path})`), "", ""].join(NL) : ""; };
  const END = `<!-- svc-local:end -->${NL}`;
  const llBody = `<!-- svc-local:start -->${NL}${sec("seo", "SEO by state and metro")}${sec("marketing", "Digital marketing by state and metro")}${sec("app-development", "App development by state and metro")}${sec("google-ads", "Google Ads management by metro")}${END}`;
  ll = mark(ll, "<!-- svc-local:start -->", END, llBody) ?? ll.replace("## Local (Philadelphia metro)", `${llBody}${NL}## Local (Philadelphia metro)`);
  fs.writeFileSync(llPath, ll);
  if (!args.includes("--no-og")) {
    const sharp = createRequire(`${REPO}/package.json`)("sharp");
    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    fs.mkdirSync(`${REPO}/public/og/places`, { recursive: true });
    let bad = 0;
    for (const pg of built) {
      const out = `${REPO}/public/og/places/${pg.id}.jpg`;
      const photo = `${REPO}/public/places/${pg.P.slug}-og.jpg`;
      const band = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04182b" stop-opacity="0"/><stop offset="1" stop-color="#04182b" stop-opacity="0.92"/></linearGradient></defs><rect x="0" y="300" width="1200" height="330" fill="url(#g)"/><rect x="64" y="470" width="56" height="4" fill="#f26a21"/><text x="64" y="540" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="700" fill="#ffffff">${esc(`${pg.S.og} ${pg.P.display}`)}</text><text x="64" y="586" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#d7e3ef">${esc(pg.S.ogSub)}</text></svg>`);
      const base = fs.existsSync(photo) ? sharp(photo).resize(1200, 630, { fit: "cover" }) : sharp(Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#04182b"/><text x="64" y="140" font-family="Courier New, monospace" font-size="22" fill="#9fb4c8">${esc(`${fmt(pg.P.c.all)} business establishments · Census CBP 2023`)}</text></svg>`));
      await base.composite([{ input: band, left: 0, top: 0 }]).jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(out);
      const kb = Math.round(fs.statSync(out).size / 1024); if (kb >= 300) { bad++; console.log(`OG too big ${pg.id} ${kb} KB`); }
      if (!fs.existsSync(photo)) console.log(`OG without photo (plate): ${pg.id}`);
    }
    console.log(`og: ${built.length - bad}/${built.length} ok`);
  }
}
