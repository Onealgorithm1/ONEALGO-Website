import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, ServiceCards, HUB_SERVICE_CARDS, StageRail, StageUnits, SourcesDialog, Verify, AppExchangeEvidence,
  PhotoCreditDialog, PhotoCreditsLine, type SfFaqItem, type Readout, type Stage, type SfSource, sfHeroAvifSrcset, SF_HERO_SIZES } from "../../components/sf";
import { DataMigration } from "../../components/sf/illus";
import { PLATES } from "../../data/plates/chester-county";
import { SF_CITY_HEROES, sfCityFiles } from "../../data/sfCityHeroes";
import {
  SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PLATFORM_CERTS, SF_PHONE, SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema,
} from "../../components/StructuredData";

/* /services/salesforce-consultant-chester-county. Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf):
 * the approved prototype's rhythm and the hub as the worked example; seo-completeness/structure-spec.md §7.2 for
 * title, meta, H1 and the eleven H2s (exact strings), §9 for schema, §10 for links, images and NAP.
 * Build notes: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/page-chester-county.md.
 *
 * THIS PAGE'S DISTINCT JOB: the buyer who has NOT bought yet, or who has outgrown a spreadsheet and is being
 * quoted an edition they may not need. Philadelphia gets the already-own-it buyer; Pennsylvania gets the
 * what-is-a-partner buyer. ⛔ Do not let the three converge.
 *
 * PRICES. Every figure is SALESFORCE'S published list price, never ours (Louis 2026-09-01: "we can't be tied
 * down to pricing"). Re-read 23 October 2026 (Starter Suite $25, Pro Suite $100, Core $195, Advanced $395,
 * Max $550 a user a month; Sales Cloud and Service Cloud list the same five). ⛔ Never add our own rate or a
 * project range. The license table moved to the cost guide (spec §7.2 row 3); its per-edition terms live in the
 * edition unit's Go deeper. scripts/plates/chester-county.mjs still holds the same prices for the share chart:
 * change both together.
 *
 * VISUALS. Hero = the licensed Valley Forge photo (public domain, NPS; credit pop-up + credits line). One staged
 * scene (FIG. 1 data migration, sample data) beside "Off the spreadsheet, history intact". The industry chart and
 * the county map are the existing generated plates (real Census data), shown as static <picture>s in the kit's
 * stage frame. ⛔ No picture from any of our Salesforce orgs.
 *
 * LINKS. In-site only in the body. Every source (Salesforce price pages, Census programs, the user-group page)
 * sits in ONE SourcesDialog; the only off-site controls are inside dialogs (new tab, noopener, external mark).
 *
 * HERO CTA → #start (this page's own form), as on the hub (foundation decision 2), not the spec's §10.1 #31
 * health-check link: this buyer has no org to check yet, and the form is the license count. Flagged in the
 * page report for the integrate step. */

const PATH = "/services/salesforce-consultant-chester-county";
const PAGE_URL = `https://onealgorithm.com${PATH}`;
const PAGE_UPDATED = "2026-10-23";
const PRICES_READ = "23 October 2026";
const TITLE = "Salesforce Consultant Chester County, PA | One Algorithm";
const DESCRIPTION =
  "Salesforce consultant in Malvern, Chester County, in person when it helps: the right edition and license count before you sign. (610) 890-9711";
const PHOTO = SF_CITY_HEROES["chester-county"];
const FILES = sfCityFiles("chester-county");
const OG_IMAGE = `https://onealgorithm.com${FILES.og}`;
const HUB = "/services/salesforce";
const COST = "/services/salesforce-implementation-cost";
const HC = "/services/salesforce-health-check";
const DM = "/services/salesforce-data-migration";
const MS = "/services/salesforce-managed-services";
const PA = "/services/salesforce-consulting-partner-pennsylvania";
const PHL = "/services/salesforce-consultant-philadelphia";

/* Salesforce's Sales Cloud cards, read 23 October 2026. `terms` paraphrases them (no copied text); `check` is OUR
   side: what the license count looks at. US spelling. */
const EDITIONS = [
  { k: "starter", name: "Starter Suite", price: 25, terms: "billed monthly or annually; leads, accounts, contacts and opportunities, with email and calendar sync", check: "whether your process fits Starter as it comes, so you can stay month to month" },
  { k: "pro", name: "Pro Suite", price: 100, terms: "billed annually; adds customization, automation, quoting and forecasting; API access is $25 a user a month extra", check: "whether quoting and forecasting earn the step up, and whether anything you run needs API access" },
  { k: "core", name: "Core", price: 195, terms: "billed annually; API access and the Premier Success Plan included", check: "whether an ERP or SAP sync, which needs API access, makes Core the cheaper route" },
  { k: "advanced", name: "Advanced", price: 395, terms: "billed annually; adds stronger security, backup and archiving, and more data capacity", check: "whether your data volume, security or backup needs justify the step up" },
  { k: "max", name: "Max", price: 550, terms: "billed annually; adds Salesforce's full AI suite, Agentforce included, plus planning tools", check: "which AI features your team would use, before you pay for them" },
] as const;
const API_ADDON = 25;
const money = (v: number) => `$${v.toLocaleString("en-US")}`;
const priceOf = (k: (typeof EDITIONS)[number]["k"]) => EDITIONS.find((e) => e.k === k)!.price;

/* County data: the plate's generated legend ("<name> · <n> employees · <n> establishments"), so the chart, the
   readouts and the text share one source (Census CBP 2023, copied 2026-10-23). FIT clauses are the approved
   wording from ef1a8f0: true of OneAlgorithm, or a plain statement of what the work involves. */
const F_IND = PLATES["chester-county-largest-industries"];
const F_MAP = PLATES["chester-county-map-malvern"];
const IND = Object.fromEntries(
  (F_IND.legend ?? []).map((l) => {
    const [name, employees, establishments] = l.label.split(" · ");
    return [l.k, { name, employees, establishments, emp: Number(employees.replace(/\D/g, "")), est: Number(establishments.replace(/\D/g, "")) }];
  }),
);
const FIT: [string, string][] = [
  ["n62", "Salesforce work there turns on access: who can see which records, enforced with permission sets and sharing rules rather than a pile of profiles."],
  ["n52", "That is the sector where we run ongoing Salesforce development for a lending company, since April 2026."],
  ["n54", "Firms like these use Salesforce to track clients, projects and proposals, with reporting that agrees across all three."],
  ["n31", "Manufacturers need Salesforce to agree with the ERP on accounts, orders and pricing, and we have built an SAP-to-Salesforce sync."],
];
/* "Exton · about 3 miles" -> 3. Straight-line distances computed in the plate spec from Gazetteer coordinates. */
const mi = (k: string) => Number((F_MAP.legend ?? []).find((l) => l.k === k)?.label.match(/about (\d+) miles/)?.[1]);

const SOURCES: SfSource[] = [
  /* 2026-11-01 (audit F-22): this page's job is in-person delivery around Malvern; the two place facts below. */
  { name: "U.S. Census Bureau, Geocoder", what: "625 Swedesford Rd, Malvern, PA 19355: East Whiteland Township, Chester County", read: "read 1 November 2026", page: "https://geocoding.geo.census.gov/geocoder/" },
  { name: "Chester County Planning Commission, Economy Report", what: "Employment: jobs in 2024 and the largest employing industries", read: "read 1 November 2026", page: "https://www.chescoplanning.org/EconDev/EconomyReport/2-Employment.cfm" },
  { name: "Salesforce, Sales Cloud pricing", what: "List prices per user a month for Starter Suite, Pro Suite, Core, Advanced and Max, with billing terms and add-ons", read: `read ${PRICES_READ}`, page: "https://www.salesforce.com/sales/pricing/" },
  { name: "Salesforce, Service Cloud pricing", what: "The same five list prices for Service Cloud", read: `read ${PRICES_READ}`, page: "https://www.salesforce.com/service/pricing/" },
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Paid employees and establishments by industry group, Chester County, Pennsylvania", read: "read 23 October 2026", page: "https://www.census.gov/programs-surveys/cbp.html" },
  { name: "U.S. Census Bureau, cartographic boundary files, 2023", what: "The county boundaries on the map (public domain)", read: "read 23 October 2026", page: "https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html" },
  { name: "U.S. Census Bureau, Gazetteer files, 2023", what: "Place coordinates behind the straight-line distances from our office", read: "read 23 October 2026", page: "https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html" },
  { name: "Salesforce Trailblazer Community Groups", what: "Salesforce User Group, West Chester, and the Philadelphia and Wilmington groups", read: "read 23 October 2026", page: "https://trailblazercommunitygroups.com/salesforce-user-group-west-chester-united-states/" },
];

const MARKET: Readout[] = [
  { value: IND.all.emp, label: "Paid employees in Chester County", source: <>All industries, 2023</> },
  { value: IND.all.est, label: "Business establishments", source: <>All industries, 2023</> },
  { value: IND.n62.emp, label: "In health care, the largest industry group", source: <>{IND.n62.establishments}, 2023</> },
];

/* The four steps (facts: the ef1a8f0 page). Desktop rail labels sit under nodes 290-360 units apart, so the
   titles stay under ~28 characters; `short` is not needed. */
const STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Map how your team works", sub: "people · spreadsheets · inboxes", line: "Who sells, who serves customers, and which spreadsheets and inboxes hold that work now.",
    details: ["Who sells, and who serves customers after the sale", "Which spreadsheets and shared inboxes hold that work today", "If a spreadsheet and a shared inbox still do the job, we say so"] },
  { k: "s2", num: "02", title: "Settle the edition and seats", sub: "edition · seats · step-up cost", line: "Matched to that process, with the monthly cost of each step up shown side by side.",
    details: ["Seats only for the people who would log in", "Sales Cloud, Service Cloud or both, decided by the work", "Whether an ERP or SAP sync makes Core the cheaper route"] },
  { k: "s3", num: "03", title: "License count and rough cost", sub: "in writing · before you sign", line: "In writing, before anyone signs with Salesforce, so you decide with the numbers in front of you.",
    details: ["The edition recommendation, with the cost of each step up", "A rough setup cost; the market's published ranges are in the cost guide", "If a smaller edition does the job, we say so"] },
  { k: "s4", num: "04", title: "Configure and hand over", sub: "configure · migrate · hand over", line: "We configure and migrate, then your own admin runs it, or we run weekly administration and development.",
    details: ["Records cleaned, loaded and reconciled against the source before go-live", "Your own admin takes it over, or we run weekly administration and development", "Hours reported every week"] },
];

/* The four decisions (H3 units, spec §7.2 row 2 titles exact). Each Go deeper links the page that owns the topic. */
const DECISIONS: { title: string; lede: string; deep: React.ReactNode; label: string }[] = [
  {
    title: "Whether Salesforce is the right tool",
    lede: "If a spreadsheet and a shared inbox still do the job, we tell you before you spend anything on licenses.",
    label: "when Salesforce is the right tool",
    deep: <>
      <p className="sf-rule">If Salesforce fits, you know exactly why. It pays off when several people share customers, deals or cases; when one person tracks a short list, a spreadsheet often still wins.</p>
      <div className="sf-links"><Link className="sf-link" to={HUB}>Salesforce consulting services</Link></div>
    </>,
  },
  {
    title: "Which edition, and which you do not need",
    lede: "The expensive mistake is a tier bought for one feature, or seats for people who never log in.",
    label: "sizing the edition and the seats",
    deep: <>
      <p className="sf-rule">We size both before anything is configured, with the monthly cost of each step up shown side by side. Ten people on Starter Suite is {money(priceOf("starter") * 10)} a month; the same ten on Core is {money(priceOf("core") * 10)}.</p>
      <div className="sf-links"><Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link></div>
    </>,
  },
  {
    title: "Off the spreadsheet, history intact",
    lede: "We have migrated QuickBase and Kissflow systems into Salesforce, reconciled against the source before go-live.",
    label: "how records move without losing history",
    deep: <>
      <p className="sf-rule">Records are cleaned, de-duplicated, mapped field by field and loaded into a sandbox first. Record counts and totals are reconciled against the source before the production load, and the spreadsheet stays read-only until you are confident nothing is missing.</p>
      <div className="sf-links"><Link className="sf-link" to={DM}>Salesforce data migration services</Link></div>
    </>,
  },
  {
    title: "Who runs Salesforce after go-live",
    lede: "Your own admin takes it over, or we run weekly administration and development, with hours reported every week.",
    label: "who runs Salesforce after go-live",
    deep: <>
      <p className="sf-rule">The handover is planned before the build starts, so nobody is left owning an org they did not expect to run.</p>
      <div className="sf-links"><Link className="sf-link" to={MS}>Salesforce managed services</Link></div>
    </>,
  },
];

/* Objection questions (H3), answers in Go deeper. ⛔ Never call an individual certified on the strength of the
   company count (spec §8.1, gate 16): the 16 / 53 figures are Salesforce's record of the whole team. */
const CONCERNS: { q: string; lede: string; a: React.ReactNode }[] = [
  {
    q: "Will you push us to the biggest edition?",
    lede: "No: we size the edition to the process you run today and show the cost of each step up in writing.",
    a: <>You choose, with the arithmetic in front of you. If a smaller edition does the job, the license count says so.</>,
  },
  {
    q: "Do we get senior people, or a junior team?",
    lede: "You deal directly with the people who do the work, from the first call.",
    a: <>Sreenivas Amirisetti leads our Salesforce practice; his active certifications are listed under <a className="sf-link" href="#delivered">who leads your Salesforce work</a>. Salesforce's AppExchange record lists {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications across the team. <Verify id="appexchange" /></>,
  },
  {
    q: "What does setup cost once we pick an edition?",
    lede: "We scope it in writing before work starts, so the number is on paper before you commit.",
    a: <>Published market ranges, named and dated, are in our <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>.</>,
  },
];

/* FAQ: this page's question bank (questions-by-page.md; QC rows for CHE). ⛔ None may repeat on another Salesforce
   page or repeat an H2 here; "Which Salesforce edition do we need?" is H2 #1, so it is not an FAQ. Plain text:
   the same array renders AND feeds FAQPage schema. */
const FAQS: SfFaqItem[] = [
  {
    q: "How much does Salesforce cost for a small company?",
    a: `The license half is seats times the edition price: from ${money(priceOf("starter"))} a user a month on Starter Suite to ${money(priceOf("max"))} on Max (Salesforce's list prices, read ${PRICES_READ}). Ten people on Starter Suite is ${money(priceOf("starter") * 10)} a month; ten on Pro Suite is ${money(priceOf("pro") * 10)}. Setup varies with how much data moves and how many systems Salesforce talks to, so we put a license count and a rough cost in writing before you sign.`,
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "Is Salesforce worth it for a small business?",
    a: "Yes, when several people share customers, deals or cases: one record per customer, with the history and reporting everyone works from. When one person tracks a short list, a spreadsheet often still wins. Salesforce's Sales Cloud page lists a Free Suite at $0 next to Starter Suite, so a small team can start small and move up an edition when the work demands it.",
  },
  {
    q: "Should we stay on Salesforce or move to something cheaper?",
    a: "Start by finding out what you pay for and do not use. Our free one-week Salesforce health check covers licenses, data, automation, permissions and integrations and ends in a written list ranked by what to fix first, unused seats and a smaller edition included. Often the cheaper answer is the Salesforce you already have, sized correctly; when another tool fits better, the list says so.",
    link: { to: HC, label: "Free one-week Salesforce health check" },
  },
  {
    q: "Do I need Sales Cloud or Service Cloud?",
    a: "It depends on the work. Sales Cloud runs winning business: leads, opportunities and pipeline. Service Cloud runs the work after the sale: cases, queues and escalation. Salesforce lists the same five prices for both, Starter Suite to Max, so the choice turns on the work, not the bill. Plenty of companies need both, and plenty need less than they were sold.",
  },
  {
    q: "What Salesforce costs do people not budget for?",
    a: `Three come up most. API access: Pro Suite needs it as a ${money(API_ADDON)}-a-user add-on before Salesforce can sync with an ERP or another system, while Core and above include it. Support: Premier support is an add-on on Pro Suite, and the Premier Success Plan is included from Core up. Then extra storage, more sandboxes for testing, and licenses for the systems you connect, all on Salesforce's price pages, read ${PRICES_READ}.`,
  },
  {
    q: "How do we move off spreadsheets without losing our history?",
    a: "Export, clean, map, then reconcile. We export every sheet, de-duplicate the records, map each column to a Salesforce field and load into a sandbox first. Record counts and totals are reconciled against the source before the production load, and the spreadsheet stays read-only until you are confident nothing is missing. We have moved QuickBase and Kissflow systems into Salesforce the same way.",
    link: { to: DM, label: "Salesforce data migration services" },
  },
  {
    /* Owner 2026-10-23 ~19:05 (travel/visits): most work is remote; in-person sessions when the project calls
       for them, easiest across the Philadelphia region. ⛔ Never a standing visit promise. */
    q: "Can we meet in person near Exton, Downingtown or West Chester?",
    a: `Yes, when the project calls for it. Our office is at 625 Swedesford Rd, Unit B, Malvern, PA 19355, about ${mi("ex")} miles from Exton, ${mi("wc")} from West Chester and ${mi("dt")} from Downingtown in a straight line. Most of a Salesforce engagement runs remotely because the work happens inside your org; in-person sessions are easiest across the Philadelphia region.`,
  },
];

/** Seats in, list-price bill out. Starts at 10 so the prerendered HTML is a useful answer on its own. */
function LicenseCalculator() {
  const [raw, setRaw] = React.useState("10");
  const seats = Math.min(Math.max(Math.floor(Number(raw)) || 0, 0), 100000);
  const rows = [
    ...EDITIONS.map((e) => ({ k: e.k, name: e.name, per: e.price })),
    { k: "pro-api", name: "Pro Suite with API access", per: priceOf("pro") + API_ADDON },
  ].sort((a, b) => a.per - b.per);
  const first = rows[0];
  const last = rows[rows.length - 1];
  return (
    <div className="sf-stage" style={{ marginTop: 28 }}>
      <div className="sf-stage-in" style={{ padding: "24px clamp(16px, 2.4vw, 32px) 20px" }}>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <label htmlFor="che-seats" className="block font-semibold text-sf-ink">People who would log in</label>
            <input
              id="che-seats"
              type="number"
              inputMode="numeric"
              min={1}
              max={100000}
              step={1}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              aria-describedby="che-seats-sum"
              className="mt-2 h-12 w-40 rounded-none border border-sf-hairlineStrong border-b-2 border-b-sf-navy bg-sf-paper px-3 font-mono text-lg tabular-nums text-sf-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sf-navy"
            />
          </div>
          <p id="che-seats-sum" aria-live="polite" className="max-w-[34ch] pb-1 text-sf-ink2">
            {seats > 0
              ? `${seats.toLocaleString("en-US")} ${seats === 1 ? "person" : "people"}: ${money(first.per * seats)} a month on ${first.name} to ${money(last.per * seats)} on ${last.name}.`
              : "Enter how many people would log in."}
          </p>
        </div>
        <div role="region" aria-label="License bill by edition" tabIndex={0} className="mt-6 overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-sf-navy">
          <table className="w-full min-w-[19rem] border-collapse text-left">
            <caption className="sr-only">Salesforce list-price license bill for the number of people entered, by edition</caption>
            <thead>
              <tr className="border-b border-sf-hairlineStrong">
                {["Edition", "Per user", "A month", "A year"].map((h) => (
                  /* ponytail: the yearly column (month x 12) drops below 640px so four money columns never touch on a phone */
                  <th key={h} scope="col" className={`py-2.5 pr-3 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-sf-ink3${h === "A year" ? " hidden sm:table-cell" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.k} className="border-b border-sf-hairline transition-colors hover:bg-sf-tint">
                  <th scope="row" className="py-3 pr-3 font-semibold text-sf-ink">{r.name}</th>
                  <td className="py-3 pr-3 font-mono tabular-nums text-sf-ink2">{money(r.per)}</td>
                  <td className="py-3 pr-3 font-display text-xl font-extrabold tabular-nums text-sf-navy">{money(r.per * seats)}</td>
                  <td className="hidden py-3 font-mono tabular-nums text-sf-ink sm:table-cell">{money(r.per * seats * 12)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sf-mono" style={{ marginTop: 14 }}>
          Salesforce list prices, read {PRICES_READ}; licenses only, before setup and discounts.
        </p>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
    </div>
  );
}

/** A generated data plate (real Census data, not a staged scene) in the kit's stage frame: phone drawing below 640px. */
function PlateFigure({ fig, id, plate, alt, stamp, caption, className = "" }: {
  fig: number; id: string; plate: (typeof PLATES)[keyof typeof PLATES]; alt: string; stamp: string; caption: React.ReactNode; className?: string;
}) {
  return (
    <figure className={`sf-stage ${className}`} aria-labelledby={`${id}-cap`}>
      <div className="sf-stage-in">
        <picture>
          {plate.mSrc && <source media="(max-width: 639px)" srcSet={plate.mSrc} width={plate.mw} height={plate.mh} />}
          <img src={plate.src} width={plate.w} height={plate.h} alt={alt} loading="lazy" decoding="async" style={{ width: "100%", height: "auto" }} />
        </picture>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}

export default function SalesforceConsultantChesterCounty() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    ogTitle: "Salesforce consultant for Chester County businesses | One Algorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: PHOTO.alt,
    twitterTitle: "Salesforce consultant for Chester County businesses | One Algorithm",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadImage: FILES.avif1600,
    preloadImageSrcset: sfHeroAvifSrcset(FILES),
    preloadImageSizes: SF_HERO_SIZES,
    preloadImageType: "image/avif",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting in Chester County, Pennsylvania",
          "Salesforce consulting for businesses in Chester County, Pennsylvania, from an office in Malvern: edition and license advice before purchase, a license count and rough cost in writing, Sales Cloud and Service Cloud configuration, migration off spreadsheets and older systems, ongoing administration, and a free one-week Salesforce health check for existing orgs.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          {
            providerId: "https://onealgorithm.com/#localbusiness",
            areaServed: { "@type": "AdministrativeArea", name: "Chester County, PA" },
            image: OG_IMAGE,
          },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: HUB }, { label: "Chester County" }]}>
        {/* 1 HERO: the Valley Forge photo is the LCP (eager, preloaded, never animated); H1 + one-sentence lede + one button. */}
        <SFHero
          kicker={<>Chester County, PA<span className="sf-kicker-loc"> · Office in Malvern</span></>}
          title="Salesforce consultant for Chester County businesses"
          lede="Salesforce consulting for Chester County businesses from our Malvern office: the right edition and license count before you sign, or a free one-week health check."
          primary={{ href: "#start", label: "Get a license count" }}
          proof
          photo={PHOTO}
        />
        <AppExchangeEvidence />
        <SourcesDialog id="sources" sources={SOURCES} />

        {/* 2 THE ANSWER + ITS INSTRUMENT: spec §7.2 rows 1 and 3 side by side (5/7). */}
        <SmartSection id="edition" tone="surface" grid labelledBy="h-edition">
          <SmartUnit
            className="sf-c5"
            headingId="h-edition"
            title="Which Salesforce edition fits a Chester County business?"
            lede={`Most small teams start on Starter Suite at ${money(priceOf("starter"))} or Pro Suite at ${money(priceOf("pro"))} a user a month (Salesforce's prices, read ${PRICES_READ}).`}
            lead={`Core, at ${money(priceOf("core"))}, is the first edition with API access included, which an ERP or SAP sync needs.`}
            points={[
              `Ten people: ${money(priceOf("starter") * 10)} a month on Starter Suite, ${money(priceOf("core") * 10)} on Core`,
              `Pro Suite adds API access for ${money(API_ADDON)} a user a month`,
              "Sales Cloud and Service Cloud list the same five prices",
            ]}
            measure={false}
          >
            <GoDeeper label="the five editions, their billing and what we check first">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                {EDITIONS.map((e) => (
                  <li key={e.k}>
                    <b className="sf-lead-in">{e.name}, {money(e.price)}:</b> {e.terms}. We check {e.check}.
                  </li>
                ))}
              </ul>
              <p className="sf-mono">Sales Cloud terms; Salesforce marks the prices subject to change. <Verify id="sources">Sources</Verify></p>
              <div className="sf-links"><Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c7"
            headingId="h-bill"
            delay={0.08}
            title="Estimate your Salesforce license bill"
            lede="Enter how many people would log in; seats times the edition price is the half of the cost you can know today."
            measure={false}
          >
            <LicenseCalculator />
          </SmartUnit>
        </SmartSection>

        {/* 3 DECISIONS: four H3 units (2 x 2) + FIG. 1, the one staged scene, beside "Off the spreadsheet". Spec row 2. */}
        <SmartSection
          id="decisions"
          grid
          heading={{
            id: "h-decisions",
            title: "Salesforce decisions to settle before you sign",
            lede: "Edition, seat count and whether Salesforce is the right tool at all: we settle all three before anything is configured.",
          }}
        >
          {/* 2 x 2 from 640px (the kit grid stacks everything at <= 1023, which left four full-width units at 768) */}
          <div className="sf-c7 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            {DECISIONS.map((d, i) => (
              <SmartUnit key={d.title} level={3} delay={i % 2 ? 0.08 : 0} title={d.title} lede={d.lede} measure={false}>
                <GoDeeper label={d.label}>{d.deep}</GoDeeper>
              </SmartUnit>
            ))}
          </div>
          <DataMigration fig={1} className="sf-c5" />
        </SmartSection>

        {/* 4 COUNTY DATA: chart + readouts, the per-industry notes in Go deeper, every source in the one pop-up. Spec row 4. */}
        <SmartSection id="industries" tone="surface" grid labelledBy="h-industries">
          <SmartUnit
            className="sf-c5"
            headingId="h-industries"
            title="Chester County industries and where Salesforce fits"
            lede="Health care, finance and insurance, retail and professional services are Chester County's four largest industry groups by paid employees (Census Bureau, 2023)."
            lead="The Salesforce work differs by sector: access rules in health care, client and project tracking in professional services, an ERP sync in manufacturing."
            measure={false}
          >
            <GoDeeper label="each industry group and the Salesforce work it needs">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                {FIT.map(([k, fit]) => (
                  <li key={k}>
                    <b className="sf-lead-in">{IND[k].name}:</b> {IND[k].employees} at {IND[k].establishments}. {fit}
                  </li>
                ))}
              </ul>
              <p className="sf-mono">U.S. Census Bureau, County Business Patterns 2023, read 23 October 2026.</p>
            </GoDeeper>
          </SmartUnit>
          <PlateFigure
            className="sf-c7"
            fig={2}
            id="fig2"
            plate={F_IND}
            alt={F_IND.alt}
            stamp="Chart · Census County Business Patterns 2023"
            caption="Paid employees by industry group in Chester County, 2023: the eight largest groups."
          />
          <div className="sf-c12">
            <Readouts items={MARKET} withEvidence={false} />
            <p className="sf-mono" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px" }}>
              U.S. Census Bureau, County Business Patterns 2023, read 23 October 2026 <Verify id="sources">Where these figures come from</Verify>
            </p>
          </div>
        </SmartSection>

        {/* 5 HOW IT RUNS: FIG. 3, the scrubbed rail, + four stage units wired to their stations. Spec row 6. */}
        <SmartSection
          id="how"
          heading={{
            id: "h-how",
            title: "How a Chester County Salesforce engagement runs",
            lede: "Four steps, and the first three happen before you sign anything with Salesforce.",
          }}
        >
          <StageRail
            fig={3}
            stations={STAGES}
            className="sf-rail-top"
            title="Staged diagram of a four-step Salesforce engagement for a Chester County business"
            desc="A rail runs through four stations: map how the team works, settle the edition and seats, a license count and rough cost in writing, then configure and hand over."
            stamp="How an engagement runs"
            caption="The four steps in the order they run. The first three happen before anyone signs with Salesforce."
          />
          <StageUnits items={STAGES} />
        </SmartSection>

        {/* 6 DELIVERED + WHO LEADS: the four rows (H3) and the people block (H3), badges as the person's own. Spec row 5. */}
        <SmartSection id="delivered" tone="surface" grid labelledBy="h-delivered">
          <SmartUnit
            className="sf-c7"
            headingId="h-delivered"
            title="Salesforce work we have delivered"
            lede="Our delivered work spans ongoing Salesforce development, an SAP sync, QuickBase and Kissflow migrations and Marketing Cloud support."
          >
            <DeliveredLedger />
            <p className="sf-mono" style={{ marginTop: 10 }}>Industries: lending (current engagement)</p>
            <GoDeeper label="Salesforce's record of us and how to check any partner">
              <p className="sf-rule">Salesforce's AppExchange record lists {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications (read {SF_VERIFIED_LABEL}). Open any partner's listing and read the same box before you hire them; ask who will do your work and look them up on Trailblazer.</p>
              <div className="sf-links"><Link className="sf-link" to={PA}>How to check a Salesforce partner</Link></div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead" style={{ paddingTop: 20 }}>
            <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
            <PersonCredentials />
          </LedgerRule>
        </SmartSection>

        {/* 7 CONCERNS: objection questions as H3, answers in Go deeper (night). Spec row 8. */}
        <SmartSection
          id="concerns"
          tone="night"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before hiring a Salesforce consultant",
            lede: "Three questions Chester County buyers raise before the first call, each answered directly.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <SmartUnit key={c.q} level={3} className="sf-c4" delay={i * 0.08} title={c.q} lede={c.lede} measure={false}>
              <GoDeeper label={c.q} title="The full answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </SmartUnit>
          ))}
        </SmartSection>

        {/* 8 MALVERN: the address, phone and hours visible (NAP, spec §10.3) + FIG. 4, the county map. Spec row 7. */}
        <SmartSection id="malvern" grid labelledBy="h-malvern">
          <SmartUnit
            className="sf-c7"
            headingId="h-malvern"
            title="A Salesforce consultant in Malvern, PA"
            lede="Our office is at 625 Swedesford Rd, Unit B, Malvern, PA 19355, in East Whiteland Township, Chester County."
            lead="Working in person is easiest here: kickoffs, workshops and go-live days at your office or ours, a short drive across the county."
            points={[
              <>Call <a className="sf-link" href={SF_PHONE.href} data-cta="local">{SF_PHONE.display}</a>, Monday to Friday, 9 to 5</>,
              `Exton about ${mi("ex")} miles away, West Chester ${mi("wc")}, Downingtown ${mi("dt")}, in a straight line`,
            ]}
          >
            <GoDeeper label="the region we cover and the local Salesforce user groups">
              <p className="sf-rule">
                We also work across Delaware, Montgomery and Bucks counties, New Castle County in Delaware, and Philadelphia, and with companies anywhere in the United States, remotely.
              </p>
              <p>
                The Chester County Planning Commission counted 251,200 jobs in the county in 2024, with health care, professional services, finance, retail and education employing the most people; those are the teams we sit down with.
              </p>
              <p>
                Chester County's own Salesforce user group meets in West Chester. Philadelphia's admin, developer, architect, marketer and nonprofit groups and the Wilmington user group meet within about 20 miles of our office.
              </p>
              <p className="sf-mono">Distances from Census Gazetteer coordinates; group listings read 23 October 2026. <Verify id="sources">Sources</Verify></p>
              <div className="sf-links"><Link className="sf-link" to={PHL}>Salesforce consultants for Philadelphia companies</Link></div>
            </GoDeeper>
          </SmartUnit>
          <PlateFigure
            className="sf-c5"
            fig={4}
            id="fig4"
            plate={F_MAP}
            alt={`Map of Chester County, Pennsylvania, and its neighboring counties (Lancaster, Berks, Montgomery and Delaware in Pennsylvania, New Castle in Delaware and Cecil in Maryland), marking OneAlgorithm's office in Malvern and the straight-line distance from it to Exton (about ${mi("ex")} miles), West Chester (about ${mi("wc")} miles) and Downingtown (about ${mi("dt")} miles).`}
            stamp="Map · Chester County, PA · US Census 2023"
            caption="Chester County and its neighbors, with our Malvern office and the straight-line distance to three nearby towns. County boundaries: US Census Bureau, 2023 (public domain)."
          />
        </SmartSection>

        {/* 9 DESK: the one form (#start). Spec row 11: H2 + "Get a license count" (the form's H3) + "What happens next". */}
        <DeskCTA
          heading="Get a Salesforce license count before you sign"
          lede="Tell us how many people would log in and what you were quoted, or book the free one-week health check if you already run Salesforce."
          next={[
            "Call or send the form.",
            "A person at OneAlgorithm reads it and replies.",
            "You get a license count and a rough cost before anyone signs; if a smaller edition does the job, we say so.",
          ]}
          form={{
            topic: "che",
            topicLabel: "Salesforce consulting · Chester County",
            heading: "Get a license count",
            prompt: "How many people would use Salesforce, and what have you been quoted?",
            submitLabel: "Get a license count",
          }}
        />

        {/* 10 FAQ: questions visible, answers in the HTML behind native disclosures. Spec row 9. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Questions Chester County buyers ask before signing</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        {/* 11 ROUTE BOARD: the seven services + the two sibling local pages. Spec row 10. */}
        <SmartSection
          id="services"
          compact
          heading={{
            id: "h-services",
            title: "Salesforce services from our Malvern office",
            lede: "If you already run Salesforce, start with the free one-week health check; everything else is scoped in writing first.",
          }}
        >
          <ServiceCards items={HUB_SERVICE_CARDS} />
          <nav aria-label="Salesforce near Chester County" style={{ marginTop: 32 }}>
            <p className="sf-kicker">Nearby</p>
            <ul className="sf-links" style={{ marginTop: 8 }}>
              <li><Link className="sf-link" to={PHL}>Salesforce consultants for Philadelphia companies</Link></li>
              <li><Link className="sf-link" to={PA}>Salesforce Consulting Partner in Pennsylvania</Link></li>
              <li><Link className="sf-link" to={HUB}>All Salesforce consulting services</Link></li>
              <li><Link className="sf-link" to="/services/web-design-chester-county">Website design for Chester County businesses</Link></li>
            </ul>
          </nav>
        </SmartSection>

        <PhotoCreditsLine photo={PHOTO} />
      </SfPage>
    </Layout>
  );
}
