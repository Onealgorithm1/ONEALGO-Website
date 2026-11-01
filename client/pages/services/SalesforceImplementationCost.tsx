import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, PersonCredentials, FAQ, DeskCTA, ServiceCards,
  HUB_SERVICE_CARDS, SourcesDialog, Verify, AppExchangeEvidence, type SfFaqItem, type SfSource,
} from "../../components/sf";
import { CostPhases } from "../../components/sf/illus";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PHONE, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema,
} from "../../components/StructuredData";

/* /services/salesforce-implementation-cost, the cost guide. Added 2026-10-03; rebuilt 2026-10-23 on the
 * redesign-v2 kit (client/components/sf) in the approved prototype's design (Louis 2026-10-23: "Yes, build the
 * 23 pages this way"). Title, meta, H1, the 16 H2s and their H3s: seo-completeness/structure-spec.md §6.1, strings
 * exact; section ORDER follows the prototype's rhythm (spec §0: heading order is not a ranking factor), so the
 * four-guide table sits right under the answer it backs. Build notes: build-v2/page-cost.md.
 *
 * ⛔ EVERY FIGURE ON THIS PAGE IS A PUBLISHED MARKET FIGURE, A SALESFORCE LIST PRICE OR A BLS STATISTIC, NAMED AND
 * DATED, AND NONE IS A ONEALGORITHM PRICE (owner decisions 5 and 7: no rates, terms set in the written proposal).
 * Every figure was on the page at ef1a8f0 (fact-checked, re-read 23 October 2026 by WebFetch + curl): the four
 * size-band guides; Salesforce's Sales Cloud page now lists Free Suite $0, Starter Suite $25, Pro Suite $100, Core
 * $195, Advanced $395, Max $550 (on 1 September it listed Enterprise $175 / Unlimited $350 / Agentforce 1 $550);
 * Premier Success is "included with Core, Advanced and Max"; sandboxes are listed per edition with no percentage.
 * (The Chester County Salesforce page that carried the 1 September prices was retired 2026-11-01.)
 * NOT added, because no dated Salesforce read exists in the verified notes: the Shield and Agentforce price lines
 * the spec asks for in "Salesforce costs beyond licenses" (requests-cost.md).
 *
 * ⛔ LINKS: in-site only in the body. Every source (eight guides, three Salesforce pages, BLS) is cited as name +
 * date in the text, and its human-readable page sits in the one SourcesDialog ("Where these figures come from").
 * The BLS oesprofile query links of ef1a8f0 are gone (the program page replaces them). Off-site = ExtLink inside a
 * dialog only (new tab, noopener, external mark).
 *
 * ⛔ FAQ: no question here is repeated on another Salesforce page (grep of every q: string, 2026-10-23). "What does a
 * Salesforce consultant charge per hour?" left the FAQ because it is now an H2 here (spec §3: no FAQ repeats an H2).
 *
 * Byline: "By Louis Rubino" (owner decision 2026-10-23 ~19:05, item 4) → Article.author is that Person.
 * Tier: "Select" Consulting Partner (owner decision 2026-10-23 ~19:05, item 1). US spelling throughout. */

const PAGE_PATH = "/services/salesforce-implementation-cost";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const TITLE = "Salesforce Implementation Cost & Consultant Rates (2026)";
const DESCRIPTION =
  "Salesforce implementation cost in 2026: published ranges by company size, list prices and consultant rates. Free health check: (610) 890-9711.";
const H1 = "What a Salesforce implementation costs";
const PUBLISHED = "2026-10-03";
/** The last real content edit (= the visible "Updated" date). */
const UPDATED = "2026-10-23";
const CHECKED = "23 October 2026";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-cost-phases.jpg";
const OG_ALT =
  "Illustration with sample data: an implementation estimate for a fictional 40-user Sales Cloud project, five phases on a working-day timeline that add up to 50 to 60 working days.";

const HUB = "/services/salesforce";
const HC = "/services/salesforce-health-check";
const DM = "/services/salesforce-data-migration";
const INT = "/services/salesforce-integration";
const MS = "/services/salesforce-managed-services";
const MC = "/services/salesforce-marketing-cloud-consulting";
const SA = "/services/hire-salesforce-developers"; // 2026-11-01: the Salesforce staff augmentation page
const PA = "/services/salesforce-consultant-philadelphia#record"; // 2026-11-01: the Pennsylvania partner page was 301d into Philadelphia; its #record section shows how to check a partner

const usd = (n: number) => "$" + n.toLocaleString("en-US");

/* The four size-band guides, as each publishes them (re-read 23 October 2026). */
const GUIDES = [
  { name: "Cynoteck", when: "Updated 11 Sep 2026", small: "$10,000–$50,000", mid: "$75,000–$250,000", ent: "$150,000–$500,000+", notes: "small 1 to 10 users, 4 to 8 weeks; mid-market 50 to 200 users, 4 to 6 months; enterprise 200+ users, 6 to 12+ months" },
  { name: "BrainSpate", when: "Updated 10 Sep 2026", small: "$15,000–$50,000", mid: "$50,000–$150,000", ent: "$150,000–$500,000+", notes: "" },
  { name: "Groviya", when: "Updated 23 Oct 2026", small: "$15,000–$50,000", mid: "$50,000–$250,000", ent: "$250,000–$1,000,000+", notes: "small is one cloud, standard processes, up to about 50 users; mid-market one or two clouds, 50 to 300 users, 3 to 6 months; enterprise several clouds or industry clouds, 6 to 18 months" },
  { name: "American Chase", when: "Updated 3 Aug 2026", small: "$15,000–$50,000", mid: "$50,000–$150,000", ent: "$150,000–$500,000+", notes: "small 5 to 50 users; mid-market 50 to 500 users; enterprise 500+ users" },
];

/* Girikon's seven ranges (published 21 January 2026, updated 25 June 2026). */
const PHASES: { name: string; lo: number; hi: number; open?: boolean }[] = [
  { name: "Discovery and planning", lo: 5000, hi: 15000 },
  { name: "System configuration and setup", lo: 15000, hi: 50000 },
  { name: "Customization and development", lo: 10000, hi: 60000, open: true },
  { name: "Data migration", lo: 8000, hi: 30000 },
  { name: "Integrations", lo: 10000, hi: 40000 },
  { name: "User training and change management", lo: 5000, hi: 20000 },
  { name: "Testing, deployment and support", lo: 10000, hi: 35000 },
];
/** "$15,000–$100,000+" from the numbers, so the bar and the text can never disagree. */
const rangeText = (r: { lo: number; hi: number; open?: boolean }) => `${usd(r.lo)}–${usd(r.hi)}${r.open ? "+" : ""}`;

/* Folio3's one-time implementation ranges, services only, excluding licenses (published 4 March 2026, updated
   30 July 2026). Effort notes are our paraphrase of Folio3's. */
const CLOUDS: { name: string; lo: number; hi: number; open?: boolean; note: string }[] = [
  { name: "Sales Cloud", lo: 15000, hi: 100000, open: true, note: "process complexity, territories, forecasting and integrations" },
  { name: "Service Cloud", lo: 25000, hi: 150000, open: true, note: "omnichannel, knowledge base, telephony and case targets" },
  { name: "Field Service", lo: 40000, hi: 200000, open: true, note: "work orders, scheduling and the mobile app" },
  { name: "Experience Cloud (portals)", lo: 25000, hi: 150000, open: true, note: "branding, sign-in and single sign-on, self-service" },
  { name: "CPQ / Revenue Cloud", lo: 40000, hi: 150000, open: true, note: "product rules, pricing, approvals and quotes" },
  { name: "Marketing Cloud Engagement", lo: 25000, hi: 120000, open: true, note: "data model, journeys, channels and integrations" },
  { name: "Account Engagement (Pardot)", lo: 15000, hi: 60000, open: true, note: "scoring, grading, forms, B2B journeys and the CRM sync" },
  { name: "Commerce Cloud", lo: 75000, hi: 300000, open: true, note: "catalog, checkout, storefront, ERP and payment links" },
  { name: "CRM Analytics", lo: 15000, hi: 75000, open: true, note: "data pipelines, dashboards and row-level security" },
  { name: "Platform and custom apps", lo: 10000, hi: 60000, open: true, note: "custom objects, Flows, light integrations" },
];

/* Salesforce's Sales Cloud list prices, per user per month, read on salesforce.com/sales/pricing on CHECKED.
   Service Cloud lists the same figure for each edition. */
const EDITIONS = [
  { name: "Free Suite", price: 0, note: "Up to two users · no contract or credit card" },
  { name: "Starter Suite", price: 25, note: "Per user / month · billed monthly or annually" },
  { name: "Pro Suite", price: 100, note: "Per user / month · billed annually" },
  { name: "Core", price: 195, note: "Per user / month · billed annually · Premier Success and one Partial Copy sandbox included" },
  { name: "Advanced", price: 395, note: "Per user / month · billed annually · Premier Success, a Partial Copy and a Full sandbox included" },
  { name: "Max", price: 550, note: "Per user / month · billed annually · Premier Success, a Partial Copy and a Full sandbox included" },
];
const price = (name: string) => EDITIONS.find((e) => e.name === name)!.price;

/* Worked first year: licenses from EDITIONS times the published band. Every input is already on this page; the
   arithmetic is done here, never typed. */
const SMALL: [number, number] = [15000, 50000]; // three of four guides
const MID: [number, number] = [50000, 150000]; // BrainSpate, American Chase
const SCENARIOS = [
  { users: 5, edition: "Starter Suite", band: SMALL, bandName: "Small business" },
  { users: 10, edition: "Pro Suite", band: SMALL, bandName: "Small business" },
  { users: 50, edition: "Core", band: MID, bandName: "Mid-market" },
].map((s) => {
  const lic = s.users * price(s.edition) * 12;
  return { ...s, lic, lo: lic + s.band[0], hi: lic + s.band[1] };
});
const CORE50 = SCENARIOS[2];

/* BLS OEWS, May 2025 medians (salary only, benefits excluded). */
const BLS = { analysts: 105850, developers: 135980 };

/* "Where these figures come from": human-readable source pages only (link policy; no query tools, no data URLs). */
const SOURCES: SfSource[] = [
  { name: "Cynoteck, Salesforce implementation cost guide", what: "Size bands, timelines, partner and freelancer rates, storage and admin figures. Updated 11 September 2026.", read: `read ${CHECKED}`, page: "https://www.cynoteck.com/blog-post/salesforce-implementation-cost" },
  { name: "BrainSpate, Salesforce implementation cost guide", what: "Size bands and component prices: training, data migration, integrations, configuration and custom build. Updated 10 September 2026.", read: `read ${CHECKED}`, page: "https://brainspate.com/blog/salesforce-implementation-cost-guide/" },
  { name: "Groviya, Salesforce implementation cost guide", what: "Size bands with the clouds, users and timeline behind each. Published 16 September 2026, updated 23 October 2026.", read: `read ${CHECKED}`, page: "https://www.groviya.com/blog/salesforce-implementation-cost-guide" },
  { name: "American Chase, Salesforce implementation costs", what: "Size bands with user counts. Published 13 June 2025, updated 3 August 2026.", read: `read ${CHECKED}`, page: "https://americanchase.com/salesforce-implementation-costs/" },
  { name: "Girikon, Salesforce implementation cost", what: "Seven ranges by part of the work and the contingency formula. Published 21 January 2026, updated 25 June 2026.", read: `read ${CHECKED}`, page: "https://www.girikon.com/blog/salesforce-implementation-cost/" },
  { name: "Folio3, Salesforce implementation cost", what: "Ranges by cloud, budget shares by phase and the regulated-industry uplift. Published 4 March 2026, updated 30 July 2026.", read: `read ${CHECKED}`, page: "https://crm.folio3.com/blog/salesforce-implementation-cost/" },
  { name: "Cyntexa, Salesforce implementation cost", what: "Why projects overrun, and the pricing models. Updated 11 August 2026.", read: `read ${CHECKED}`, page: "https://cyntexa.com/blog/salesforce-implementation-cost/" },
  { name: "Ascendix, Salesforce implementation cost", what: "Hourly rates, do-it-yourself and in-house figures, the flat monthly fee. Updated 21 May 2025.", read: `read ${CHECKED}`, page: "https://ascendix.com/blog/salesforce-implementation-cost/" },
  { name: "Salesforce, Sales Cloud pricing", what: "Editions, list prices per user per month, Premier Success and sandboxes by edition.", read: `read ${CHECKED}`, page: "https://www.salesforce.com/sales/pricing/" },
  { name: "Salesforce, Free CRM (Free Suite)", what: "Up to two users, no contract or credit card, free while someone logs in at least once every 60 days.", read: `read ${CHECKED}`, page: "https://www.salesforce.com/crm/free-crm/" },
  { name: "Salesforce news, pricing update (17 June 2025)", what: "An average 6 percent list-price rise for Enterprise and Unlimited editions on 1 August 2025.", read: `read ${CHECKED}`, page: "https://www.salesforce.com/news/stories/pricing-update-2025/" },
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS)", what: "May 2025 national medians: computer systems analysts (15-1211) and software developers (15-1252). Salesforce roles have no occupation code of their own.", read: "checked October 2026", page: "https://www.bls.gov/oes/" },
];

/* Today's FAQ (fact-checked at ef1a8f0), US spelling. One owner page per question across the 23 pages. */
const FAQS: SfFaqItem[] = [
  {
    q: "Why do published Salesforce implementation costs vary so much?",
    a: "Because the guides are pricing different projects. Groviya's small-business band assumes one cloud, standard processes and up to about 50 users. Its mid-market band assumes one or two clouds, several custom processes and 50 to 300 users. Change the clouds, the data or the integrations and the number moves with them, which is why a range from one firm rarely fits your case.",
  },
  {
    q: "Why is Salesforce implementation so expensive?",
    a: "Because licenses are only half of the bill. Salesforce charges per user, and the setup work on top scales with the number of clouds, the data that has to move and the systems Salesforce has to talk to. BrainSpate's guide puts data migration at $5,000 to $50,000 or more and integrations at $5,000 to $75,000 or more, before a single license.",
  },
  {
    q: "How long does a Salesforce implementation take?",
    a: "The guides give different timelines because they price different projects. Cynoteck puts a small project at 4 to 8 weeks. Groviya puts a mid-sized rollout at 3 to 6 months and an enterprise program at 6 to 18 months. Your own timeline comes out of the written scope, which is why we scope before we quote.",
  },
  {
    q: "Is the implementation fee on top of the Salesforce license?",
    a: "Yes. Salesforce bills licenses per user, and the implementation fee goes to whoever does the work. BrainSpate's guide says implementation often runs two to three times the annual license fees, and Cynoteck suggests budgeting 40 to 80 percent above license cost for a realistic first-year total. Both are rules of thumb from firms that sell implementation.",
  },
  {
    q: "Can I get Salesforce for free?",
    a: `Yes, for up to two users. Salesforce's Free Suite needs no contract or credit card and stays free as long as someone logs in at least once every 60 days (salesforce.com, read ${CHECKED}). From the third user you move to a paid suite, starting with Starter Suite at $25 per user per month.`,
  },
  {
    q: "What is the Premier Success Plan, and does it cost extra?",
    a: `It is Salesforce's paid tier of guidance and faster support. As listed on salesforce.com on ${CHECKED}, Premier is included with the Core, Advanced and Max editions and available for purchase on Pro Suite. The Standard plan comes with every license, and the Signature plan is priced by your Salesforce account executive. Check which plan your edition already includes before you budget for it.`,
  },
  {
    q: "How much do Salesforce sandboxes cost?",
    a: `Salesforce's pricing page, read ${CHECKED}, lists what each edition includes rather than a sandbox price: a Developer sandbox from Pro Suite up, one Partial Copy sandbox with Core, Advanced and Max, and a Full sandbox with Advanced and Max. Developer Pro sandboxes, and a Full sandbox on Core, are available for purchase and quoted by Salesforce.`,
  },
  {
    q: "How do we get a fixed price for our Salesforce project?",
    a: "Scope it in writing first. A fixed price is only as firm as the scope behind it, so we write the scope, then price it, then do the work and hand it over. If you already run Salesforce, the free one-week health check gives you a license count and a rough cost before you sign anything.",
    link: { to: HC, label: "Free one-week Salesforce health check" },
  },
  {
    q: "Where can I check whether my current licenses are being used?",
    a: "In Setup, open Company Information. Its user license list shows each license type with the total you pay for, how many are assigned and how many remain. Compare the assigned seats with the people who actually log in. Seats nobody uses are worth checking first, and checking costs nothing.",
    link: { to: "#beyond-licenses", label: "Salesforce costs beyond licenses" },
  },
];

/* Objection questions (H3) with the answers in Go deeper. ⛔ None repeats a FAQ question. */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will the price grow once the work starts?", a: <>Every piece of work is scoped in writing before it starts: a written scope, then the work, then a handover. A late request becomes its own scoped piece of work, not a surprise line on this one.</> },
  { q: "How do we know you are a real Salesforce partner?", a: <>Check Salesforce's record rather than our word: the AppExchange lists OneAlgorithm as a Select Consulting Partner with {SF_CERTIFIED_PEOPLE} Salesforce-certified people and {SF_CERTIFICATIONS} certifications, read {SF_VERIFIED_LABEL}. <Verify id="appexchange">Check the record</Verify></> },
  { q: "Will you sell us more Salesforce than we need?", a: <>We give you a license count and a rough cost before you sign, and tell you when a smaller edition does the job. <a className="sf-link" href="#licenses">Salesforce pricing per user per month</a></> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so. <Link className="sf-link" to={HC}>Free one-week Salesforce health check</Link></> },
];

/** A visible comparison table (the spec keeps the cost tables visible: the table IS the answer). Page-local until
 *  the kit has one (requests-cost.md): kit tokens via the Tailwind `sf` mirrors, rows tint on hover and the range bar
 *  turns orange (colour only, no motion). `ranges` draws each row's range on one scale under its figure (aria-hidden:
 *  the figure is the text); hatched = open-ended ("or more"). `stack` turns each row into a labelled block below
 *  640px, so a 4-column table never scrolls sideways on a phone. */
type Range = { lo: number; hi: number; open?: boolean };
function CostTable({ label, head, rows, source, className = "", ranges, scale = 1, stack = false }: {
  label: string;
  head: string[];
  rows: React.ReactNode[][];
  source?: React.ReactNode;
  className?: string;
  ranges?: Range[];
  scale?: number;
  stack?: boolean;
}) {
  return (
    <div className={className}>
      <div role="region" aria-label={label} tabIndex={0} className="overflow-x-auto">
        <table className={`w-full border-collapse text-left text-[16px] leading-snug ${stack ? "max-[639px]:block" : ""}`}>
          <caption className="sr-only">{label}</caption>
          <thead className={stack ? "max-[639px]:sr-only" : ""}>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col" className="border-b-2 border-sf-navy pb-2 pr-4 align-bottom font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-sf-ink3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={stack ? "max-[639px]:block max-[639px]:border-t-2 max-[639px]:border-sf-navy" : ""}>
            {rows.map((r, i) => (
              <tr key={i} className={`group border-b border-sf-hairline transition-colors duration-150 hover:bg-sf-tint ${stack ? "max-[639px]:grid max-[639px]:grid-cols-3 max-[639px]:gap-x-3 max-[639px]:py-3" : ""}`}>
                {r.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className={`py-3 pl-1 pr-4 align-top font-semibold text-sf-ink ${stack ? "max-[639px]:col-span-3 max-[639px]:p-0 max-[639px]:pb-2" : ""}`}>{c}</th>
                  ) : (
                    <td
                      key={j}
                      data-label={head[j]}
                      className={`whitespace-nowrap py-3 pr-4 align-top font-mono text-[15px] tabular-nums text-sf-ink max-[639px]:whitespace-normal ${stack ? "max-[639px]:p-0 max-[639px]:text-[14px] max-[639px]:before:mb-1 max-[639px]:before:block max-[639px]:before:font-mono max-[639px]:before:text-[11px] max-[639px]:before:uppercase max-[639px]:before:tracking-[0.06em] max-[639px]:before:text-sf-ink3 max-[639px]:before:content-[attr(data-label)]" : ""}`}
                    >
                      {c}
                      {ranges && j === r.length - 1 && <RangeBar r={ranges[i]} scale={scale} />}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && <p className="sf-mono sf-src" style={{ marginTop: 12, maxWidth: "90ch" }}>{source}</p>}
    </div>
  );
}

/** One range on the table's shared scale: navy from the low to the high figure, a hatched tail when open-ended. */
function RangeBar({ r, scale }: { r: Range; scale: number }) {
  const pct = (n: number) => (Math.min(scale, n) / scale) * 100;
  const tail = r.open ? Math.min(scale, r.hi + scale * 0.08) : r.hi;
  return (
    <span aria-hidden="true" className="relative mt-2 block h-2 w-full max-w-[320px]" style={{ background: "#e8f0f8" }}>
      <span className="absolute inset-y-0 bg-sf-navy transition-colors duration-150 group-hover:bg-sf-orange" style={{ left: `${pct(r.lo)}%`, width: `${pct(r.hi) - pct(r.lo)}%` }} />
      {r.open && (
        <span className="absolute inset-y-0" style={{ left: `${pct(r.hi)}%`, width: `${pct(tail) - pct(r.hi)}%`, background: "repeating-linear-gradient(135deg, #00366b 0 2px, transparent 2px 5px)", opacity: 0.6 }} />
      )}
    </span>
  );
}

/** The one source control, repeated where a figure needs it; all open the same dialog. */
const Sources = () => <Verify id="sources">Where these figures come from</Verify>;

export default function SalesforceImplementationCost() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce implementation",
          "Salesforce implementation and cost scoping from a listed Salesforce Consulting Partner in Malvern, Pennsylvania: a license count and a rough cost before anyone signs, then configuration, data migration and integration.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          { image: OG_IMAGE },
        )}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: H1,
          description: DESCRIPTION,
          mainEntityOfPage: PAGE_URL,
          url: PAGE_URL,
          datePublished: PUBLISHED,
          dateModified: UPDATED,
          author: {
            "@type": "Person",
            "@id": "https://onealgorithm.com/#person-louis-rubino",
            name: "Louis Rubino",
            url: "https://onealgorithm.com/about",
            sameAs: "https://www.linkedin.com/in/louiscrubino/",
            worksFor: { "@id": "https://onealgorithm.com/#org" },
          },
          publisher: { "@id": "https://onealgorithm.com/#org" },
          image: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
        }}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: HUB }, { label: "Cost guide" }]}>
        {/* 1 HERO. H1 = the LCP; FIG. 1 (cost-phases, sample data) is dealt by CSS 250ms after first paint, counters off.
            Byline and dates in the kicker (spec §6.1 #10; owner item 4). */}
        <SFHero
          kicker={
            <>
              Cost guide · By Louis Rubino
              <br />
              <span style={{ whiteSpace: "nowrap" }}>Published <time dateTime={PUBLISHED}>3 October 2026</time></span> ·{" "}
              <span style={{ whiteSpace: "nowrap" }}>Updated <time dateTime={UPDATED}>23 October 2026</time></span>
            </>
          }
          title={H1}
          lede="Published guides put small-business Salesforce implementation at $15,000 to $50,000, mid-market up to $250,000; our free one-week health check estimates yours."
          proof
          figure={<CostPhases fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 THE ANSWER (spec #1): answer block + the three published bands as readouts beside it (7/5). */}
        <SmartSection id="answer" tone="surface" grid labelledBy="h-answer">
          <SmartUnit
            className="sf-c7"
            headingId="h-answer"
            title="How much does Salesforce implementation cost?"
            lede="Four published guides put a small-business Salesforce implementation at $15,000–$50,000 (one starts at $10,000) and mid-market at $50,000–$150,000 or up to $250,000, before licenses."
            leadIn="By the numbers:"
            lead="Enterprise runs $150,000 to $500,000 or more in three guides, and to $1,000,000 or more in Groviya's multi-cloud band."
            points={[
              "Salesforce licenses are billed on top, per user, per month",
              "Timelines: 4 to 8 weeks for a small project, 6 to 18 months enterprise",
              "A quote outside these bands needs a reason",
            ]}
          >
            <GoDeeper label="how to read the bands, and how we get your number">
              <p className="sf-rule">
                Implementation firms publish these ranges on their own sites. They differ at the edges because each guide prices a different project: more clouds, more data or more integrations move the number. With four guides side by side, you can see where any proposal sits.
              </p>
              <p><span className="sf-lead-in">What we do:</span> We scope the work in writing and give you a license count and a rough cost before anyone signs.</p>
              <p><span className="sf-lead-in">What it costs:</span> The free one-week Salesforce health check costs nothing. A real figure starts with your org, not a guide.</p>
              <div className="sf-links">
                <a className="sf-link" href="#guides">Four published Salesforce cost guides compared</a>
                <a className="sf-link" href="#start">Get a Salesforce cost figure for your org</a>
              </div>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c5">
            <p className="sf-kicker">The published bands, before licenses</p>
            <div className="sf-readouts" style={{ gridTemplateColumns: "minmax(0, 1fr)", marginTop: 16, rowGap: 28 }}>
              {[
                { v: "$15,000–$50,000", l: "Small business", s: "Three of four guides · Cynoteck starts at $10,000" },
                { v: "$50,000–$150,000", l: "Mid-market", s: "BrainSpate, American Chase · to $250,000 in Cynoteck and Groviya" },
                { v: "$150,000–$500,000+", l: "Enterprise", s: "Three of four guides · Groviya runs to $1,000,000+" },
              ].map((b) => (
                <div className="sf-readout" key={b.l}>
                  <span className="sf-readout-num" style={{ fontSize: "clamp(30px, 2.9vw, 46px)" }}>{b.v}</span>
                  <p className="sf-readout-lab">{b.l}</p>
                  <p className="sf-readout-src sf-mono">{b.s}</p>
                </div>
              ))}
            </div>
            <p className="sf-mono" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Market figures, read {CHECKED} · not OneAlgorithm prices <Sources />
            </p>
          </div>
        </SmartSection>

        {/* 3 FOUR GUIDES COMPARED (spec #9), right under the answer it backs: the table is visible; each guide's
            assumptions sit in Go deeper. */}
        <SmartSection id="guides" grid labelledBy="h-guides">
          <SmartUnit
            className="sf-c4"
            headingId="h-guides"
            title="Four published Salesforce cost guides compared"
            lede="Implementation firms publish these ranges on their own sites, and each prices a different project, so they differ at the edges."
            measure={false}
          >
            <SmartUnit
              level={3}
              as="div"
              title="Where the guides agree"
              lede="All four top the small-business band at $50,000, and three start it at $15,000."
              measure={false}
              style={{ marginTop: 28 }}
            >
              <GoDeeper label="where the guides agree, and each guide's assumptions">
                <p className="sf-rule">For mid-market, two say $50,000 to $150,000 and two stretch to $250,000. Three put enterprise at $150,000 to $500,000 or more; Groviya's multi-cloud band runs to $1,000,000 or more.</p>
                <ul className="sf-points" style={{ marginTop: 0 }}>
                  {GUIDES.filter((g) => g.notes).map((g) => (
                    <li key={g.name}><b className="sf-lead-in">{g.name}:</b> {g.notes}.</li>
                  ))}
                </ul>
              </GoDeeper>
            </SmartUnit>
          </SmartUnit>
          <CostTable
            className="sf-c8"
            label={`Published Salesforce implementation cost ranges by company size, four guides, read ${CHECKED}`}
            head={["Guide", "Small business", "Mid-market", "Enterprise"]}
            stack
            rows={GUIDES.map((g) => [
              <>{g.name}<span className="mt-1 block font-mono text-[12px] font-normal text-sf-ink3">{g.when}</span></>,
              g.small,
              g.mid,
              g.ent,
            ])}
            source={<>Ranges as each guide publishes them, before Salesforce licenses, re-read {CHECKED}. Market figures, not OneAlgorithm prices. <Sources /></>}
          />
        </SmartSection>

        {/* 4 SMALL BUSINESSES (spec #2): the small band first, then the free tier with its source and read date. */}
        <SmartSection id="small-business" tone="surface" grid labelledBy="h-small">
          <SmartUnit
            className="sf-c7"
            headingId="h-small"
            title="Salesforce implementation cost for small businesses"
            lede="Small-business Salesforce implementation runs $15,000 to $50,000 in three of four published guides, and Cynoteck starts its band at $10,000."
            leadIn="Yes, but:"
            lead={`Salesforce's Free Suite covers up to two users with no contract or credit card (salesforce.com, read ${CHECKED}).`}
            points={[
              "Free Suite stays free while someone logs in every 60 days",
              "From the third user: Starter Suite at $25 per user per month",
              `Ten users on Pro Suite: ${usd(SCENARIOS[1].lic)} a year in licenses`,
            ]}
          >
            <GoDeeper label="a small company's first year, worked">
              <p className="sf-rule">
                Two people can start on Salesforce for nothing. When a third person needs access, you are pricing Starter Suite or Pro Suite, plus the setup work in the guides above.
              </p>
              <p>
                Five users on Starter Suite pay {usd(SCENARIOS[0].lic)} a year in licenses ({SCENARIOS[0].users} × {usd(price("Starter Suite"))} × 12), so year one comes to {usd(SCENARIOS[0].lo)} to {usd(SCENARIOS[0].hi)} with the published small-business band. Ten users on Pro Suite pay {usd(SCENARIOS[1].lic)}, for {usd(SCENARIOS[1].lo)} to {usd(SCENARIOS[1].hi)}. Both are before storage, AppExchange apps and anything Salesforce lists as available for purchase.
              </p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c5">
          <SmartUnit
            level={3}
            delay={0.08}
            kicker="Before you buy"
            title="Which edition a small team needs"
            lede="Starter Suite and Pro Suite exist for smaller teams, and we tell you whether one of them does the job before you buy more."
            measure={false}
          >
            <GoDeeper label="choosing an edition for a small company">
              <p className="sf-rule">For a small company the first question is usually the edition, then the license count. We give you both before you sign, with a rough cost for the setup work.</p>
              <div className="sf-links">
                <a className="sf-link" href="#licenses">Salesforce pricing per user per month</a>
              </div>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-readout" style={{ marginTop: 36 }}>
            <span className="sf-readout-num" style={{ fontSize: "clamp(30px, 2.9vw, 46px)" }}>{usd(SCENARIOS[0].lo)}–{usd(SCENARIOS[0].hi)}</span>
            <p className="sf-readout-lab">Year one, five users on Starter Suite</p>
            <p className="sf-readout-src sf-mono">{usd(SCENARIOS[0].lic)} in licenses + the small-business band · before add-ons</p>
          </div>
          </div>
        </SmartSection>

        {/* 5 WHAT MOVES THE NUMBER (spec #3): the night band, six factor units (H3 + one line; detail in Go deeper). */}
        <SmartSection
          id="movers"
          tone="night"
          grid
          heading={{
            id: "h-movers",
            title: "What moves your Salesforce implementation cost",
            lede: "Six things move the number: users, clouds, data volume, integrations, custom build and who runs it after go-live.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" title="Users, roles and training" lede="More people means more roles, more permission sets and more training; BrainSpate prices training alone at $2,000 to $10,000." measure={false}>
            <GoDeeper label="how users, roles and training add cost">
              <p className="sf-rule">Roles and permission sets decide who sees and changes what. Each new team adds both, and the training that goes with them. BrainSpate's figure is for training on its own, before any build.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="How many clouds and products" lede="One sales process is a different job from sales, service and marketing together, and Groviya sets its bands by exactly this." measure={false}>
            <GoDeeper label="how the number of clouds sets the band">
              <p className="sf-rule">Groviya's small-business band assumes one cloud, standard processes and up to about 50 users; its mid-market band, one or two clouds and 50 to 300 users; its enterprise band, several clouds or industry clouds over 6 to 18 months.</p>
              <div className="sf-links"><a className="sf-link" href="#clouds">Salesforce implementation cost by cloud</a></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="How much data moves, and how clean" lede="Moving a lot of messy records costs more than moving a little clean data; BrainSpate puts data migration at $5,000 to $50,000 or more." measure={false}>
            <GoDeeper label="data volume, data quality and what we do about both">
              <p className="sf-rule">Data surprises are the classic mid-project overrun: duplicates, orphans and fields nobody fills all have to be dealt with before the load.</p>
              <p><span className="sf-lead-in">What we do:</span> We migrate QuickBase and Kissflow systems into Salesforce, reconciled before go-live.</p>
              <div className="sf-links"><Link className="sf-link" to={DM}>Salesforce data migration</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" title="What Salesforce has to talk to" lede="Each connection to an ERP, finance system or website is its own job; BrainSpate puts integrations at $5,000 to $75,000 or more." measure={false}>
            <GoDeeper label="integrations, and the SAP sync we have built">
              <p className="sf-rule">Every system Salesforce exchanges records with needs its own mapping, its own error handling and an owner for each record.</p>
              <p><span className="sf-lead-in">What we do:</span> We have built an SAP-to-Salesforce sync, with the owner of every record agreed before the build.</p>
              <div className="sf-links"><Link className="sf-link" to={INT}>Salesforce integration</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="Configuration or custom build" lede="BrainSpate prices basic configuration at $10,000 to $25,000, and custom apps, Apex code and automation at $50,000 to $150,000 or more." measure={false}>
            <GoDeeper label="configuration against custom build">
              <p className="sf-rule">Basic configuration means fields, workflows, reports and dashboards. Standard features cost less to build and to keep running than custom code, so configure before you custom-build.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Who runs it after go-live" lede="Salesforce needs someone to keep it in step with the business; Cynoteck puts a dedicated admin at $70,000 to $120,000 or more a year." measure={false}>
            <GoDeeper label="running Salesforce after go-live">
              <p className="sf-rule">The cost after go-live is people: an admin on staff, or weekly administration and development bought as a service, with hours reported every week.</p>
              <p><span className="sf-lead-in">What we do:</span> We run weekly Salesforce development for a lending company, ongoing since April 2026.</p>
              <div className="sf-links"><Link className="sf-link" to={MS}>Salesforce managed services</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 6 BY PHASE (spec #4): Girikon's seven ranges, visible table; Folio3's shares in Go deeper. 5/7. */}
        <SmartSection id="phases" grid labelledBy="h-phases">
          <SmartUnit
            className="sf-c5"
            headingId="h-phases"
            title="Salesforce implementation cost by phase"
            lede="Girikon's guide prices seven parts of a Salesforce implementation separately, from $5,000 for discovery to $60,000 or more for custom development."
            leadIn="Yes, but:"
            lead="Folio3 splits a typical budget by share instead, with build and configuration taking 40 to 60 percent."
            measure={false}
          >
            <GoDeeper label="Folio3's budget shares by phase">
              <p className="sf-rule">
                Folio3 (published 4 March 2026, updated 30 July 2026) splits a typical budget this way: discovery and design 10 to 15 percent, build and configuration 40 to 60, integrations and data 15 to 30, testing, user acceptance and training 10 to 20, and go-live and hypercare 5 to 10. BrainSpate's component figures differ again, because each guide prices a different project.
              </p>
            </GoDeeper>
          </SmartUnit>
          <CostTable
            className="sf-c7"
            label="Salesforce implementation cost by part of the work, Girikon"
            head={["Part of the work", "Girikon's range"]}
            rows={PHASES.map((p) => [p.name, rangeText(p)])}
            ranges={PHASES}
            scale={70000}
            source={<>Girikon, published 21 January 2026, updated 25 June 2026; read {CHECKED}. Bars on one $0–$70,000 scale; hatched = "or more". Not a OneAlgorithm price. <Sources /></>}
          />
        </SmartSection>

        {/* 7 BY CLOUD (spec #5): Folio3's ten ranges, visible; the effort notes in Go deeper. The spread flips (table left
            from 1024px; text first on phones). */}
        <SmartSection id="clouds" tone="surface" grid labelledBy="h-clouds">
          <SmartUnit
            className="sf-c5 lg:![grid-column:8/13] lg:[grid-row:1]"
            headingId="h-clouds"
            title="Salesforce implementation cost by cloud"
            lede="Folio3's guide puts one-time implementation services at $15,000 to $100,000 or more for Sales Cloud and up to $300,000 or more for Commerce Cloud."
            lead="Each cloud is its own build, so two clouds cost more than one; deciding which you need comes first."
            measure={false}
          >
            <GoDeeper label="what drives the effort, cloud by cloud">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                {CLOUDS.map((c) => (
                  <li key={c.name}><b className="sf-lead-in">{c.name}:</b> {c.note}.</li>
                ))}
              </ul>
              <p><span className="sf-lead-in">What we do:</span> We have delivered about 18 months of Marketing Cloud support. <Link className="sf-link" to={MC}>Salesforce Marketing Cloud consulting</Link></p>
            </GoDeeper>
          </SmartUnit>
          <CostTable
            className="sf-c7 lg:![grid-column:1/8] lg:[grid-row:1]"
            label="Salesforce implementation cost by cloud or product, Folio3, services only, excluding licenses"
            head={["Cloud or product", "Implementation services"]}
            rows={CLOUDS.map((c) => [c.name, rangeText(c)])}
            ranges={CLOUDS}
            scale={330000}
            source={<>Folio3, published 4 March 2026, updated 30 July 2026; read {CHECKED}. Services only, excluding licenses. Bars on one $0–$330,000 scale; every range is "or more". Not OneAlgorithm prices. <Sources /></>}
          />
        </SmartSection>

        {/* 8 PER USER PER MONTH (spec #6): Salesforce's list prices as registry readouts (count once below the fold, the
            final value is in the HTML), then the worked first year (H3) and the edition-name change. */}
        <SmartSection
          id="licenses"
          grid
          heading={{
            id: "h-licenses",
            title: "Salesforce pricing per user per month",
            lede: `Salesforce lists Sales Cloud at $0 to $550 per user per month, from Free Suite to Max, read on salesforce.com on ${CHECKED}.`,
          }}
        >
          <div className="sf-c12">
            <div className="sf-readouts max-[639px]:!grid-cols-2" style={{ marginTop: 0 }}>
              {EDITIONS.map((e) => (
                <div className="sf-readout" key={e.name}>
                  <span className="sf-readout-num">$<span data-count={e.price}>{e.price.toLocaleString("en-US")}</span></span>
                  <p className="sf-readout-lab">{e.name}</p>
                  <p className="sf-readout-src sf-mono">{e.note}</p>
                </div>
              ))}
            </div>
            <p className="sf-mono" style={{ marginTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Salesforce's Sales Cloud list prices, read on salesforce.com/sales/pricing on {CHECKED} · Service Cloud lists the same figure for each edition <Sources />
            </p>
          </div>
          <SmartUnit
            level={3}
            className="sf-c7"
            title="A worked first-year total"
            lede={`Licenses plus the published implementation band: ${CORE50.users} users on Core come to ${usd(CORE50.lo)} to ${usd(CORE50.hi)} in year one, before add-ons.`}
          >
            <GoDeeper label="three worked first years, licenses plus the published band">
              <div role="region" aria-label="Three worked first-year Salesforce totals" tabIndex={0} style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr><th scope="col">Example org</th><th scope="col">Licenses, year one</th><th scope="col">Year one, before add-ons</th></tr>
                  </thead>
                  <tbody>
                    {SCENARIOS.map((s) => (
                      <tr key={s.edition}>
                        <th scope="row">{s.users} users on {s.edition}<span className="sf-mono" style={{ display: "block", fontWeight: 400 }}>{s.bandName} band {usd(s.band[0])} to {usd(s.band[1])}</span></th>
                        <td>{usd(s.lic)}<span className="sf-mono" style={{ display: "block" }}>{s.users} × {usd(price(s.edition))} × 12</span></td>
                        <td>{usd(s.lo)} to {usd(s.hi)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sf-rule">Small business: three of four guides (Cynoteck starts at $10,000). Mid-market: BrainSpate and American Chase. Before storage, AppExchange apps and anything Salesforce lists as available for purchase.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c5"
            delay={0.08}
            title="Older quotes may name other editions"
            lede="On 1 September salesforce.com listed Enterprise ($175), Unlimited ($350) and Agentforce 1 ($550); on 23 October it listed Core, Advanced and Max."
            lead="A quote or renewal written before the change may name editions the pricing page no longer shows."
            measure={false}
          >
            <GoDeeper label="reading an older quote against today's editions">
              <p className="sf-rule">Read the edition names and prices in your order form, and ask which edition on today's pricing page each line corresponds to. Premier Success and the sandboxes each edition includes are listed with the edition, so check them before you budget separately.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 9 BEYOND LICENSES (spec #7) + H3 "Check what you already pay for". */}
        <SmartSection id="beyond-licenses" tone="surface" grid labelledBy="h-beyond">
          <SmartUnit
            className="sf-c7"
            headingId="h-beyond"
            title="Salesforce costs beyond licenses"
            lede="Beyond licenses, a Salesforce bill can carry a support plan, sandboxes, extra storage, AppExchange apps and someone to run the org."
            leadIn="Yes, but:"
            lead="Core, Advanced and Max now include Premier Success and a Partial Copy sandbox, so check your edition before you budget."
            points={[
              "Storage above your allowance: about $125 a month per 500 MB (Cynoteck)",
              "AppExchange apps that carry their own subscription",
              "A dedicated admin: $70,000 to $120,000 or more a year (Cynoteck)",
            ]}
          >
            <GoDeeper label="support plans, sandboxes and list-price changes">
              <p className="sf-rule"><span className="sf-lead-in">Premier Success Plan:</span> included with Core, Advanced and Max, and available for purchase on Pro Suite. Standard Success comes with every license; Signature is priced by your Salesforce account executive.</p>
              <p><span className="sf-lead-in">Sandboxes:</span> Pro Suite and up include a Developer sandbox. Core, Advanced and Max include one Partial Copy sandbox. A Full sandbox is included in Advanced and Max and available for purchase on Core.</p>
              <p><span className="sf-lead-in">List prices change:</span> Salesforce raised list prices for the Enterprise and Unlimited editions of Sales Cloud, Service Cloud, Field Service and some Industries Clouds by an average of 6 percent on 1 August 2025, and left Foundations, Starter and Pro unchanged (Salesforce news, 17 June 2025). Budget the renewal as well as the first year, and read the price terms in your order form before you sign.</p>
              <p className="sf-mono">Salesforce figures read on salesforce.com on {CHECKED}. Storage and admin: Cynoteck, updated 11 September 2026.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c5"
            delay={0.08}
            title="Check what you already pay for"
            lede="In Setup, Company Information lists each user license type with the total you pay for, how many are assigned and how many remain."
            leadIn="What we do:"
            lead="The free one-week health check sets your licenses against the people who actually log in."
            measure={false}
          >
            <GoDeeper label="finding the seats nobody uses">
              <p className="sf-rule">Set the assigned seats against the people who actually log in: seats nobody uses are the first saving, and checking costs nothing.</p>
              <div className="sf-links"><Link className="sf-link" to={HC}>Free one-week Salesforce health check</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 10 RATES (spec #8): the sourced market range first, the who-does-the-work table visible, three H3s below. */}
        <SmartSection id="rates" grid labelledBy="h-rates">
          <SmartUnit
            className="sf-c5"
            headingId="h-rates"
            title="What Salesforce consultants charge per hour"
            lede="Published rates run $90 to $300 an hour for a consulting firm and $25 to $250 for freelancers, in Ascendix's guide."
            leadIn="By the numbers:"
            lead="Cynoteck puts certified Salesforce partners at $100 to $300 an hour and freelancers at $50 to $150."
            measure={false}
          >
            <GoDeeper label="where the in-house salary figures come from">
              <p className="sf-rule">
                The in-house range is Ascendix's. The BLS medians beside it are for May 2025: computer systems analysts {usd(BLS.analysts)} and software developers {usd(BLS.developers)}, salary only. Salesforce roles have no occupation code of their own, so BLS counts them inside these two, and the medians exclude benefits.
              </p>
            </GoDeeper>
          </SmartUnit>
          <CostTable
            className="sf-c7"
            label="Published cost of a Salesforce implementation by who does the work"
            head={["Who does the work", "Published cost"]}
            rows={[
              [<>Do it yourself<span className="mt-1 block text-[14px] font-normal text-sf-ink3">Your own staff, learning the platform as they go</span></>, "$5,000+"],
              [<>Freelancer or contractor<span className="mt-1 block text-[14px] font-normal text-sf-ink3">One person for a defined task</span></>, <>$25–$250 an hour<span className="mt-1 block text-[13px] text-sf-ink3">Cynoteck: $50–$150</span></>],
              [<>In-house hire<span className="mt-1 block text-[14px] font-normal text-sf-ink3">A dedicated person who learns your business, plus recruiting and training</span></>, <>$80,000–$170,000 a year<span className="mt-1 block text-[13px] text-sf-ink3">BLS medians: {usd(BLS.analysts)} and {usd(BLS.developers)}</span></>],
              [<>Consulting partner<span className="mt-1 block text-[14px] font-normal text-sf-ink3">A team that covers configuration, data and integration, end to end</span></>, <>$90–$300 an hour<span className="mt-1 block text-[13px] text-sf-ink3">Cynoteck, certified Salesforce partners: $100–$300</span></>],
            ]}
            source={<>Ascendix (updated 21 May 2025), main figures; Cynoteck (updated 11 September 2026); BLS Occupational Employment and Wage Statistics, May 2025, occupations 15-1211 and 15-1252. Market figures, not OneAlgorithm rates. <Sources /></>}
          />
          <SmartUnit level={3} className="sf-c4" title="How Salesforce projects are priced" lede="Three models are common: fixed price for a well-scoped build, time and materials for open work, and a flat monthly fee for maintenance." measure={false}>
            <GoDeeper label="fixed price, time and materials, flat monthly fee">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li><b className="sf-lead-in">Fixed price:</b> you agree a scope and a total up front. Cyntexa's guide calls it the right model for a well-scoped build.</li>
                <li><b className="sf-lead-in">Time and materials:</b> you pay an hourly or daily rate for whatever the project needs. Cyntexa sees it as a fit for ongoing support.</li>
                <li><b className="sf-lead-in">Flat monthly fee:</b> a set number of hours a month, common for maintenance work. Ascendix notes it can bring a lower hourly rate than a fixed project.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="How we price" lede="A written scope first, then the work, then a handover: every piece of work is scoped in writing before it starts." measure={false}>
            <GoDeeper label="how OneAlgorithm prices project and ongoing work">
              <p className="sf-rule"><span className="sf-lead-in">Project work:</span> scoped in writing before anything starts, with the terms set in the written proposal.</p>
              <p><span className="sf-lead-in">Ongoing work:</span> weekly administration and development, with hours reported every week.</p>
              <p><span className="sf-lead-in">Where to start:</span> the free one-week health check, with a license count and a rough cost before anyone signs.</p>
              <div className="sf-links"><Link className="sf-link" to={MS}>Salesforce managed services</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Salesforce staff augmentation cost" lede="Salesforce staff augmentation adds Salesforce people to your team for as long as you need them; the hourly rates above are the market's benchmark." measure={false}>
            <GoDeeper label="what staff augmentation costs, and how it is set">
              <p className="sf-rule">Each engagement is scoped in writing before it starts, and the terms are set in the written proposal. For comparison, Ascendix puts freelancers at $25 to $250 an hour and consulting firms at $90 to $300.</p>
              <div className="sf-links"><Link className="sf-link" to={SA}>Salesforce staff augmentation</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 11 THREE UNITS ABREAST at 1280+ (spec #10, #11, #12): judging a quote, overruns, regulated industries. */}
        <SmartSection id="quote" tone="surface" grid labelledBy="h-quote">
          <SmartUnit
            className="sf-c4"
            headingId="h-quote"
            title="How to judge a Salesforce implementation quote"
            lede="Compare written scopes, not hourly rates: a quote should name the deliverables, the data volume, the integrations and who supports it after go-live."
            lead="A fixed price is only as firm as the scope behind it."
            points={["Deliverables named, not just hours", "The data volume and every system to connect", "Who supports the org after go-live, and how"]}
            measure={false}
          >
            <GoDeeper label="what else to check in a quote">
              <p className="sf-rule">A quote outside the published bands needs a reason: more clouds, more data, more integrations or more custom build. Ask who will do the work and check the partner's record on the AppExchange before you sign. And carry a contingency line: Girikon's guide adds 10 to 20 percent of core and hidden costs.</p>
              <div className="sf-links"><Link className="sf-link" to={PA}>How to check any Salesforce partner</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c4"
            delay={0.08}
            headingId="h-budget"
            title="Why Salesforce projects go over budget"
            lede="Salesforce projects go over budget through scope creep, weak discovery, data-quality surprises and late decisions, the causes Cyntexa's guide names."
            leadIn="What we do:"
            lead="We map, clean and load the data, then reconcile record counts and totals before go-live."
            points={["Phase the rollout, so late requests land in the next phase", "Configure before you custom-build", "Clean the data before it moves"]}
            measure={false}
          >
            <GoDeeper label="what pushes a project past its band, and how to keep the cost down">
              <h3>What pushes a project past its band</h3>
              <p className="sf-rule">More than one cloud, several systems to connect, years of unclean data to move, custom processes Salesforce does not do natively, and a large number of users and roles.</p>
              <h3>How to keep the cost down</h3>
              <p>Launch the process that pays back first and scope each phase on its own, so a late request lands in the next phase instead of on this bill. Standard features cost less to build and to keep running than custom code. Count the seats you actually use. Carry a contingency line: Girikon's formula is 10–20% × (core costs + hidden costs); worked, 15% × ($120,000 + $40,000) = $24,000.</p>
              <div className="sf-links"><Link className="sf-link" to={DM}>Salesforce data migration</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c4"
            delay={0.16}
            headingId="h-regulated"
            title="Salesforce costs in regulated industries"
            lede="Folio3's guide adds 10 to 30 percent for HIPAA or PCI compliance, audits and validation in regulated industries."
            leadIn="What we do:"
            lead="Lending is where we work every week: ongoing Salesforce development for a lending company since April 2026."
            measure={false}
          >
            <GoDeeper label="the regulated-industry uplift and our lending work">
              <p className="sf-rule">The uplift is Folio3's (published 4 March 2026, updated 30 July 2026, read {CHECKED}): compliance work, audits and validation on top of the build. Our lending work runs as weekly administration and development, with hours reported every week.</p>
              <div className="sf-links"><Link className="sf-link" to={MS}>How that work runs</Link></div>
            </GoDeeper>
            <div className="sf-readout" style={{ marginTop: 28 }}>
              <span className="sf-readout-num" style={{ fontSize: "clamp(30px, 2.9vw, 46px)" }}>+10–30%</span>
              <p className="sf-readout-lab">Compliance, audits and validation</p>
              <p className="sf-readout-src sf-mono">Folio3's regulated-industry uplift · read {CHECKED}</p>
            </div>
          </SmartUnit>
        </SmartSection>

        {/* 12 CONCERNS (spec #13) beside who leads the work (E-E-A-T, spec §8.2). */}
        <SmartSection
          id="concerns"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before asking for a Salesforce quote",
            lede: "Four questions buyers raise before they ask for a Salesforce quote, each with the direct answer.",
          }}
        >
          <div className="sf-c7" style={{ display: "grid", gap: 28, alignContent: "start" }}>
            {CONCERNS.map((c, i) => (
              <LedgerRule as="article" key={c.q} delay={i * 0.06}>
                <h3 className="sf-h3">{c.q}</h3>
                <GoDeeper label={c.q} title="The answer">
                  <p className="sf-rule">{c.a}</p>
                </GoDeeper>
              </LedgerRule>
            ))}
          </div>
          <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead">
            <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
            <PersonCredentials />
          </LedgerRule>
          <AppExchangeEvidence />
        </SmartSection>

        {/* 13 DESK (spec #14): the one form, #start. */}
        <DeskCTA
          heading="Get a Salesforce cost figure for your org"
          lede="You get a license count and a rough cost before you sign anything, for the org you run or the one you are choosing."
          form={{
            topic: "cost",
            topicLabel: "Salesforce implementation cost",
            heading: "Book a free health check",
            prompt: "How many users, and which clouds?",
            submitLabel: "Book a free health check",
          }}
        />

        {/* 14 FAQ (spec #15): questions visible, answers in the HTML behind native disclosures. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce cost questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        {/* 15 RELATED (spec #16): six service cards + the hub and Chester County links. Last thing in the body. */}
        <SmartSection
          id="related"
          compact
          heading={{
            id: "h-related",
            title: "Related Salesforce services",
            lede: "Every service below starts from the same free one-week health check.",
          }}
        >
          <ServiceCards
            items={[
              ...HUB_SERVICE_CARDS.filter((c) => c.to !== PAGE_PATH),
              { to: HUB, kicker: "All services", title: "Salesforce consulting services", body: "Every Salesforce service in one place, and how an implementation runs from scope to support.", cta: "See all services" },
            ]}
          />
          <p style={{ marginTop: 28 }}>
            Buying for a small company near Malvern?{" "}
            <Link className="sf-link" to="/services/salesforce-consultant-philadelphia">Salesforce consultants for Philadelphia and Chester County</Link>
          </p>
          <SourcesDialog id="sources" sources={SOURCES} />
        </SmartSection>
      </SfPage>
    </Layout>
  );
}
