// Place-only sections for the place pages (audit F-10/F-21, 2026-11-01): what is true of THIS place and no other.
//   rulesSection()   -> the city license + state filing / privacy / sales-tax / breach rules that touch a website,
//                       from client/data/local-rules.json (every line restates an official page; URL + quote kept there).
//   economySection() -> the 3 subsectors whose share of paid employees most exceeds the US share, Census CBP 2023
//                       (scripts/data/cbp-2023-subsectors.json, key-free queries; LQ formula in its `source`).
// Used by scripts/wd-local-gen.mjs. Every number printed is registered with T(value, source) so wd-local-check traces it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const RULES = JSON.parse(fs.readFileSync(path.join(HERE, "../client/data/local-rules.json"), "utf8"));
const CBP = JSON.parse(fs.readFileSync(path.join(HERE, "data/cbp-2023-subsectors.json"), "utf8"));
const READ = "read 1 November 2026";
const fmt = (v) => Number(v).toLocaleString("en-US");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const nums = (s) => s.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];

/* Short names + what a site for that industry leads with (our view, not a statistic). */
const SUB = {
  "211": ["oil and gas extraction", "Operators buy on safety records and certifications, so those belong where a buyer looks first."],
  "213": ["mining support services", "Contractors to the field sell on safety records, equipment lists and response areas."],
  "236": ["building construction", "Builders win work with project galleries, trade credentials and a quote path that reaches the estimator."],
  "237": ["heavy and civil construction", "Civil contractors are hired on past projects, bonding and prequalification, which a site can show in one place."],
  "238": ["specialty trade contractors", "Trades live on service-area pages, reviews and a call button that works from a phone on site."],
  "311": ["food manufacturing", "Food makers need spec sheets, certifications and a distributor or wholesale enquiry path."],
  "312": ["beverage and tobacco manufacturing", "Producers lean on brand pages, age gates where required and a trade enquiry route for distributors."],
  "313": ["textile mills", "Mills sell to buyers who want spec sheets, minimums and sample requests without a phone call."],
  "321": ["wood product manufacturing", "Wood products sell on species, grades and dealer lookups."],
  "322": ["paper manufacturing", "Paper and packaging buyers compare specs, certifications and lead times before they ask for a quote."],
  "323": ["printing", "Printers need an upload path for files, clear specs and a quote request that captures the job."],
  "324": ["petroleum and coal products", "Refiners and suppliers sell on product data sheets and safety documentation."],
  "325": ["chemical manufacturing", "Chemical buyers need safety data sheets, specifications and a gated technical enquiry."],
  "326": ["plastics and rubber products", "Molders and fabricators win RFQs with capability pages, tolerances and an upload for drawings."],
  "327": ["nonmetallic mineral products", "Glass, cement and stone suppliers sell on product specs and dealer or project lookups."],
  "331": ["primary metal manufacturing", "Mills and foundries sell on grades, certifications and capacity, which buyers check before they call."],
  "332": ["fabricated metal products", "Fabricators are found by capability: processes, tolerances, certifications and a drawing upload for quotes."],
  "333": ["machinery manufacturing", "Machinery buyers want spec sheets, manuals, parts lookups and a route to a dealer or service tech."],
  "334": ["computer and electronic manufacturing", "Electronics makers need datasheets, compliance documents and a technical sales enquiry that routes by product."],
  "335": ["electrical equipment and appliances", "Equipment and appliance makers need product finders, manuals and registration or warranty forms."],
  "336": ["transportation equipment manufacturing", "Suppliers to vehicle and aerospace makers sell on quality certifications and capability lists."],
  "337": ["furniture manufacturing", "Furniture makers need a catalogue with finishes, dealer lookups and trade-account sign-up."],
  "339": ["miscellaneous manufacturing", "Specialist makers, from medical devices to signs, need a product catalogue and a sales enquiry that routes by line."],
  "424": ["nondurable goods wholesale", "Wholesalers need a catalogue, trade-account applications and order requests that reach the sales desk."],
  "425": ["wholesale agents and brokers", "Brokers sell on the lines they represent, so a line card and territory map lead."],
  "453": ["miscellaneous store retail", "Specialty shops need hours, stock that matches the counter and a phone checkout."],
  "454": ["nonstore retail", "Online and catalogue sellers live on checkout speed, product search and order tracking."],
  "481": ["air transportation", "Suppliers to airlines and airports sell on certifications, approvals and lead times."],
  "483": ["water transportation", "Shipping and ferry operators need schedules, booking and cargo enquiries that work on a phone."],
  "485": ["transit and ground passenger transport", "Charter and shuttle firms need online booking, fleet pages and quotes for groups."],
  "487": ["scenic and sightseeing transport", "Tour operators live on booking, availability and reviews."],
  "488": ["transportation support services", "Logistics support firms sell on coverage, certifications and fast quote requests."],
  "492": ["couriers and messengers", "Delivery firms need tracking, service areas and an account sign-up for shippers."],
  "493": ["warehousing and storage", "3PLs and warehouses sell on square footage, systems integration and a request for a rate."],
  "511": ["publishing", "Publishers need subscription paths, fast article pages and an archive search engines can crawl."],
  "512": ["film and sound recording", "Studios and production firms sell on reels, credits and a booking or enquiry path."],
  "515": ["broadcasting", "Broadcasters need schedules, streaming links and an advertiser enquiry route."],
  "517": ["telecommunications", "Carriers and installers need coverage lookups, plan pages and a sign-up that works on a phone."],
  "518": ["data processing and hosting", "Data centre and hosting firms sell on compliance reports, uptime records and technical specs."],
  "519": ["other information services", "Online platforms and search businesses live on page speed and sign-up flows that work."],
  "521": ["central banking", "A Federal Reserve presence draws banks and regulators' suppliers, who sell on compliance first."],
  "522": ["banking and lending", "Lenders need secure applications, plain disclosures and a short path to a loan officer."],
  "523": ["securities and investments", "Advisers and funds need compliant disclosures, client portals and a short path to a call."],
  "524": ["insurance carriers and agencies", "Insurers and agents need quote forms, claims routes and licensing details where buyers expect them."],
  "541": ["professional, scientific and technical services", "Firms that sell expertise need case pages, credentials and an enquiry form that routes to the right person."],
  "561": ["administrative and support services", "Staffing and support firms need service pages, quote requests and a careers page that fills roles."],
  "611": ["educational services", "Schools and trainers need course pages, enrolment forms and a calendar people trust."],
  "624": ["social assistance", "Agencies need eligibility pages, accessible intake forms and clear contact routes."],
  "711": ["performing arts and spectator sports", "Venues and teams live on event calendars and ticketing that work on a phone."],
  "713": ["amusement, gambling and recreation", "Attractions need hours, booking and offers that read fast on a phone."],
  "721": ["accommodation", "Hotels need direct booking, rate calendars and photos that load fast."],
};

/** CBP geo used by the place page itself ("msa:38900", "state:41"); Cleveland's 2023 rows sit under 17410. */
export function economySection({ geo, area, Ps, T, aOf }) {
  const g = CBP.geos[geo] ?? (geo === "msa:17460" ? CBP.geos["msa:17410"] : null);
  if (!g || g.top.length < 2) return null;
  const top = g.top.map((s) => ({ ...s, short: SUB[s.code]?.[0] ?? s.label.toLowerCase(), impl: SUB[s.code]?.[1] ?? "" }));
  for (const s of top) {
    T(fmt(s.emp), `Census CBP 2023, NAICS ${s.code} paid employees (${g.query})`);
    T(fmt(s.estab), `Census CBP 2023, NAICS ${s.code} establishments (${g.query})`);
    T(String(s.lq), `derived: NAICS ${s.code} share of paid employees / US share, Census CBP 2023 (${CBP.us_query})`);
  }
  T("1,000", "local-context.mjs listing floor (paid employees)"); T("1.0", "location quotient of an area with the national mix");
  const t1 = top[0];
  return {
    kind: "text", id: "economy",
    h2: "Industries heavier here than nationally",
    lede: `${cap(t1.short)} employs ${t1.lq} times its national share of paid staff in ${area}, the widest margin of any subsector we read.`,
    leadIn: "Why it matters:",
    lead: t1.impl || `A site for ${aOf(t1.short)} ${t1.short} business is read by buyers who know the trade.`,
    cards: top.map((s) => ({ h3: cap(s.short), line: `${fmt(s.emp)} paid employees in ${fmt(s.estab)} establishments, ${s.lq} times the US share. ${s.impl}`.trim() })),
    deeper: {
      label: "how the concentration figure is worked out",
      paras: [
        `Each figure divides the subsector's share of paid employees in ${area} by its share of paid employees nationally, both from County Business Patterns for 2023; 1.0 would mean the same mix as the country.`,
      ],
    },
    sources: [
      { name: "U.S. Census Bureau, County Business Patterns 2023", what: `Paid employees and establishments by 3-digit NAICS subsector, ${area}. Listed: subsectors with at least 1,000 paid employees and half a percent of the area's payroll count; farming, holding companies, postal service, civic and religious groups left out`, read: READ, page: g.query },
      { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Paid employees by 3-digit NAICS subsector, United States (the denominator)", read: READ, page: CBP.us_query },
    ],
  };
}

/** state = full state name ("District of Columbia" for DC); city = the city key in local-rules.json or null. */
/* Place-name density (wd-local-check: <= 1.5% of <main> words): after the first mention, a card says "the state". */
const lighten = (line, state, all = false) => {
  let seen = all;
  return line.replace(new RegExp(`\b${state}(?:'s)?(?= (?:residents|consumers|customers|entity|LLC|business)|'s)`, "g"), (m) => {
    if (!seen) { seen = true; return m; }
    return m.endsWith("'s") ? "the state's" : "";
  }).replace(/\s{2,}/g, " ");
};

/** sib = this metro's index among the same state's metro pages: metros in one state each take a DIFFERENT state rule, so
 *  sibling pages (Tampa, Orlando, Miami, Jacksonville) do not repeat one another; the state page carries them all. */
export function rulesSection({ P, state, city, isState, T, sib = 0 }) {
  const S = RULES.states[state];
  const Cy = city ? RULES.cities[city] : null;
  if (!S) return null;
  const st = ["privacy", "tax", "filing", "breach"].filter((k) => S[k]).map((k) => ({ ...S[k], srcs: S.sources, key: S[k].src }));
  let cards, rest = [];
  if (isState) {
    // A state page that shares its name with a metro page (New York) leaves out the rule that metro shows.
    const own = S.statePageSkip ? st.filter((c) => c !== st.find((x) => x.key === S[S.statePageSkip]?.src)) : st;
    if (own.length < 2) return null;
    cards = own.slice(0, 3); rest = own.slice(3);
  } else {
    // Metros take state rules from the END of the list, one each with a city license, rotating across siblings.
    if (!st.length || (!Cy && st.length < 2)) return null;
    const at = (i) => st[st.length - 1 - (i % st.length)];
    cards = Cy ? [{ ...Cy.license, srcs: Cy.sources, key: Cy.license.src }, at(sib)] : [at(sib), at(sib + 1)];
  }
  const ledeTxt = Cy ? Cy.lede : (isState && S.stateLede) || S.lead;
  const leadTxt = Cy ? S.lead : "";
  // A figure in the lede or lead must come from a rule the section shows: pull that rule into Go deeper if needed.
  for (const n of nums(`${ledeTxt} ${leadTxt}`)) {
    const k = n.replace(/,$/, "");
    if (![...cards, ...rest].some((c) => c.line.includes(k))) { const c = st.find((x) => x.line.includes(k)); if (c) rest.push(c); }
  }
  const used = [...cards, ...rest];
  for (const c of used) for (const n of nums(`${c.h3} ${c.line}`)) T(n.replace(/,$/, ""), `${c.srcs[c.key].name}: ${c.srcs[c.key].page}`);
  for (const n of nums(`${ledeTxt} ${leadTxt}`)) { const k = n.replace(/,$/, ""), c = used.find((x) => x.line.includes(k)); if (c) T(k, `${c.srcs[c.key].name}: ${c.srcs[c.key].page}`); }
  const sources = [...new Map(used.map((c) => [c.srcs[c.key].page, c.srcs[c.key]])).values()].map(({ name, what, page }) => ({ name, what, read: READ, page }));
  const whereFrom = `The official pages behind these: ${cards.map((c) => `“${c.srcs[c.key].what}”`).join(" and ")}, listed with their addresses under Sources.`;
  return {
    kind: "text", id: "rules",
    h2: "Licenses, filings and data rules",
    lede: ledeTxt,
    leadIn: "Why it matters:",
    lead: Cy ? S.lead : isState ? `Each rule here is quoted from the ${state === "District of Columbia" ? "District" : "state"} office that publishes it, and the sources list names every page.` : "Two of the state's rules are shown here, each quoted from the office that publishes it; the sources list names every page.",
    cards: cards.map((c) => ({ h3: c.h3, line: lighten(c.line, state, isState) })),
    deeper: {
      label: "the other rules and where they come from",
      paras: [
        ...rest.map((c) => `${c.h3}: ${lighten(c.line, state, isState)}`),
        ...(Cy?.more ? [Cy.more] : []),
        whereFrom,
      ],
    },
    sources,
  };
}
