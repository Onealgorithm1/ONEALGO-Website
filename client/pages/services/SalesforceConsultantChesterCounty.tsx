import React from "react";
import { Link } from "react-router-dom";
import { DatabaseZap, Layers, LifeBuoy, ShieldQuestion } from "lucide-react";
import Layout from "../../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  ProcessSteps,
  PrimaryCTA,
} from "../../components/site";
import {
  CTAProof,
  DataTable,
  DeliveredLedger,
  Desk,
  FAQList,
  HcLink,
  Objections,
  PartnerBadge,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  WiredRow,
  type SfFaq,
} from "../../components/salesforce";
import { RecordLine } from "../../components/SalesforceRecordCard";
import { PLATES } from "../../data/plates/chester-county";
import {
  SF_APPEXCHANGE_URL,
  SF_CERTIFICATIONS,
  SF_CERTIFIED_PEOPLE,
  SF_LISTING_ID,
  SF_PHONE,
} from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce consultant — Chester County. Rebuilt 2026-10-23 on the Salesforce
 * plate system (design-spec.md §3 CHE-F1..F3, §5 CHE, plus the wide-layout and
 * voice addenda). Originally added 2026-09-01; read the header of
 * SalesforceConsultantPhiladelphia.tsx for the doorway-page and no-town-list
 * rules that cover all three local pages.
 *
 * THIS PAGE'S DISTINCT JOB: the buyer who has NOT bought yet, or who has
 * outgrown a spreadsheet and is being quoted an edition they may not need.
 * Philadelphia gets the already-own-it buyer; Pennsylvania gets the
 * what-is-a-partner buyer. ⛔ Do not let the three converge.
 *
 * ⭐ WHY THE PRICE TABLE IS ON THIS PAGE. "How much does Salesforce cost for a
 * small company?" is a live People-Also-Ask question, and the gap audit's KEEP
 * list names the dated list-price table as this page's best answer-engine
 * asset (CHE-14: keep it here, link the cost guide for setup costs). Louis,
 * 2026-09-01: "we can't be tied down to pricing." So EVERY FIGURE IS
 * SALESFORCE'S OWN PUBLISHED LIST PRICE, never ours, and the licence half of
 * the cost is knowable arithmetic: seats times edition.
 * ⛔ NEVER add our own hourly rate or a project range to this page.
 *
 * ⛔ PRICES RE-READ 2026-10-23 and they had CHANGED. Salesforce now sells
 * Starter Suite $25, Pro Suite $100, Core $195, Advanced $395 and Max $550 a
 * user a month (Sales Cloud and Service Cloud list the same five), replacing
 * the Enterprise $175 / Unlimited $350 / Agentforce 1 $550 ladder we read on
 * 1 September 2026. The Premier Success Plan is now included from Core up (the
 * old "30% of net licence fees" line is gone from Salesforce's pages), and
 * "Web Services API" is a $25 add-on on Pro Suite. The cost guide still showed
 * the September ladder when this was written; the two pages must say the same
 * thing. Read with curl and a browser user agent (WebFetch gets 403); the
 * price cards are in the server-rendered HTML. Re-read before changing a
 * figure, and change it in BOTH places: EDITIONS below and
 * scripts/plates/chester-county.mjs (the dev check under EDITIONS fails loudly
 * if they drift).
 *
 * VOICE (addendum): "free" is NOT attached to the licence count, because the
 * owner has not confirmed it is free (CHE-12). The free one-week health check
 * IS free and is named as such. The full street number stays off the body copy
 * until the owner answers spec §7.5 (footer is "town only" since 2026-10-09);
 * "Swedesford Road in Malvern" is the wording already published.
 */

const PATH = "/services/salesforce-consultant-chester-county";
const PAGE_URL = `https://onealgorithm.com${PATH}`;
const PAGE_UPDATED = "2026-10-23";
const PRICES_CHECKED = "23 October 2026";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og-chester-county.jpg";
const IMAGE_1600 = "https://onealgorithm.com/media/salesforce/salesforce-edition-cost-10-users-1600x900.jpg";
const COST = "/services/salesforce-implementation-cost";
const HC = "/services/salesforce-health-check";
const DM = "/services/salesforce-data-migration";
const MS = "/services/salesforce-managed-services";

const DESCRIPTION =
  "Salesforce consultant in Malvern, Chester County: the right edition and a licence count before you sign, or a free one-week health check. (610) 890-9711";

const F1 = PLATES["salesforce-edition-cost-10-users"];
const F2 = PLATES["chester-county-largest-industries"];
const F3 = PLATES["chester-county-map-malvern"];

/* Read off salesforce.com/sales/pricing/ and /service/pricing/ on 23 October
   2026 (see the header). `terms` paraphrases Salesforce's Sales Cloud cards
   (no copied text); `check` is OUR side: what the licence count looks at. */
const EDITIONS = [
  {
    k: "starter",
    name: "Starter Suite",
    price: 25,
    terms: "Billed monthly or annually. Leads, accounts, contacts and opportunities, with email and calendar sync.",
    check: "Whether your process fits Starter as it comes, so you can stay month to month.",
  },
  {
    k: "pro",
    name: "Pro Suite",
    price: 100,
    api: 25,
    terms: "Billed annually. Adds customisation, automation, quoting and forecasting. API access is $25 a user a month extra.",
    check: "Whether quoting and forecasting earn the step up, and whether anything you run needs API access.",
  },
  {
    k: "core",
    name: "Core",
    price: 195,
    terms: "Billed annually. API access and the Premier Success Plan included.",
    check: "Whether an ERP or SAP sync, which needs API access, makes Core the cheaper route.",
  },
  {
    k: "advanced",
    name: "Advanced",
    price: 395,
    terms: "Billed annually. Adds stronger security, backup and archiving, and more data capacity.",
    check: "Whether your data volume, security or backup needs justify the step up.",
  },
  {
    k: "max",
    name: "Max",
    price: 550,
    terms: "Billed annually. Adds Salesforce's full AI suite, Agentforce included, plus planning tools.",
    check: "Which AI features your team would use, before you pay for them.",
  },
] as const;

const money = (v: number) => `$${v.toLocaleString("en-US")}`;
const priceOf = (k: (typeof EDITIONS)[number]["k"]) => EDITIONS.find((e) => e.k === k)!.price;

/* ponytail: the chart and this table hold the same five prices in two files
   (the plate spec is .mjs and cannot import TSX). Ceiling: two places to edit.
   This check makes drift loud in dev instead of silent in production. */
if (import.meta.env.DEV) {
  for (const e of EDITIONS)
    if (!F1.alt.includes(`${e.name} ${money(e.price * 10)}`) || !F1.alt.includes(PRICES_CHECKED))
      console.error(`Chester County: EDITIONS disagrees with scripts/plates/chester-county.mjs on ${e.name}. Fix one, then run node scripts/plates.mjs chester-county.`);
}

/* Industry rows come from the plate's own generated labels
   ("<name> · <n> employees · <n> establishments"), so the HTML and the chart
   share one source. FIT clauses are the city template's approved wording
   (SalesforceCity.tsx INDUSTRY_FIT): true of OneAlgorithm, or a plain
   statement of what the work involves; no industry client is claimed. */
const FIT: Record<string, string> = {
  n62: "Salesforce work there turns on access: who can see which records, enforced with permission sets and sharing rules rather than a pile of profiles.",
  n52: "That is the sector where we run ongoing Salesforce development for a lending company, since April 2026.",
  n54: "Firms like these use Salesforce to track clients, projects and proposals, with reporting that agrees across all three.",
  n31: "Manufacturers need Salesforce to agree with the ERP on accounts, orders and pricing, and we have built an SAP-to-Salesforce sync.",
};
const INDUSTRY_ROWS = (F2.legend ?? [])
  .filter((l) => l.k === "all" || FIT[l.k])
  .map((l) => {
    const [name, employees, establishments] = l.label.split(" · ");
    return { k: l.k, name, employees, establishments };
  });

/** "39,721 employees": the number as a registry readout, the word as prose. */
function Figure({ text }: { text: string }) {
  const [num, ...rest] = text.split(" ");
  return (
    <>
      <span className="font-mono text-[0.9375em] tabular-nums text-oa-ink">{num}</span> {rest.join(" ")}
    </>
  );
}

/* "Exton · about 3 miles" -> 3. Straight-line distances computed in the plate spec. */
const TOWNS = (F3.legend ?? []).map((l) => ({ k: l.k, label: l.label, mi: Number(l.label.match(/about (\d+) miles/)?.[1]) }));
const mi = (k: string) => TOWNS.find((t) => t.k === k)?.mi;

const DECISIONS = [
  {
    icon: ShieldQuestion,
    title: "Whether Salesforce is the right tool",
    body: "If a spreadsheet and a shared inbox still do the job, we tell you before you spend anything on licences. If Salesforce fits, you know exactly why.",
    to: "/services/salesforce",
  },
  {
    icon: Layers,
    title: "Which edition, and which you don't need",
    body: "The expensive mistake is a tier bought for one feature, or seats for people who never log in. We size both before anything is configured.",
    to: COST,
  },
  {
    icon: DatabaseZap,
    title: "Off the spreadsheet, history intact",
    body: "We have migrated QuickBase and Kissflow systems into Salesforce. Records are cleaned, loaded and reconciled against the source before go-live.",
    to: DM,
  },
  {
    icon: LifeBuoy,
    title: "Who runs Salesforce after go-live",
    body: "Your own admin takes it over, or we run weekly administration and development, with hours reported every week.",
    to: MS,
  },
];

const STEPS = [
  { title: "We map how your team works today", body: "Who sells, who serves customers, and which spreadsheets and inboxes hold that work now." },
  { title: "We settle the edition and the seats", body: "Matched to that process, with the monthly cost of each step up shown side by side." },
  { title: "You get a licence count and a rough cost", body: "In writing, before anyone signs with Salesforce. You decide with the numbers in front of you." },
  { title: "We configure, migrate and hand over", body: "Then your own admin runs it, or we run weekly administration and development.", to: MS },
];

const OBJECTIONS = [
  {
    q: "Will you push us to the biggest edition?",
    a: "We size the edition to the process you run today and show the cost of each step up in writing. You choose, with the arithmetic in front of you.",
  },
  {
    q: "Do we get senior people, or a junior team?",
    a: `You work directly with the certified people who do the work, from the first call. Salesforce's record of us lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications.`,
    checked: { label: `AppExchange listing ${SF_LISTING_ID}`, href: SF_APPEXCHANGE_URL },
  },
  {
    q: "What does setup cost once we pick an edition?",
    a: (
      <>
        We scope it in writing before work starts. Published market ranges, named and dated, are in our{" "}
        <Link className="oa-link" to={COST}>
          Salesforce implementation cost guide
        </Link>
        .
      </>
    ),
  },
];

const priceList = EDITIONS.map((e, i) => `${e.name} at ${money(e.price)}${i === 0 ? " a user a month" : ""}`)
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1");

/* ⛔ No question here may repeat on another Salesforce page (questions-by-page.md).
   "Who looks after Salesforce once it is set up?" is deliberately NOT an FAQ:
   the hub and managed services own it; this page answers it in the decision
   cards and step 4 and links there. */
const FAQS: SfFaq[] = [
  {
    q: "How much does Salesforce cost for a small company?",
    a: `The licence half is arithmetic: seats multiplied by the edition price. Salesforce lists ${priceList}, read on salesforce.com on ${PRICES_CHECKED}. Ten people on Starter Suite is ${money(priceOf("starter") * 10)} a month; ten on Pro Suite is ${money(priceOf("pro") * 10)}. Setup is the part that varies, with how much data moves and how many systems Salesforce talks to, so we put a licence count and a rough cost in writing before you sign.`,
    link: { to: COST, label: "Setup and implementation costs: the cost guide" },
  },
  {
    q: "Is Salesforce worth it for a small business?",
    a: "When several people share customers, deals or cases, yes: one record per customer, with the history and reporting everyone works from. When one person tracks a short list, a spreadsheet often still wins. Salesforce's Sales Cloud page now lists a Free Suite at $0 next to Starter Suite, so a small team can start small and move up an edition when the work demands it. We tell you which side of that line you are on before you buy.",
  },
  {
    q: "Should we stay on Salesforce or move to something cheaper?",
    a: "Start by finding out what you pay for and do not use. Our free one-week Salesforce health check covers licences, data, automation, permissions and integrations and ends in a written list ranked by what to fix first, unused seats and a smaller edition included. Often the cheaper answer is the Salesforce you already have, sized correctly; when another tool fits better, the list says so.",
    link: { to: HC, label: "What the free health check covers" },
  },
  {
    q: "Do I need Sales Cloud or Service Cloud?",
    a: "Sales Cloud runs the work of winning business: leads, opportunities and pipeline. Service Cloud runs the work after the sale: cases, queues and escalation. Salesforce lists the same five prices for both, Starter Suite to Max, so the choice turns on the work, not the bill. Plenty of companies need both, and plenty need less than they were sold. We settle that first, because it sets the licence bill every month.",
  },
  {
    q: "What are the costs people do not budget for?",
    a: `Three come up most. API access: Pro Suite needs it as a ${money(25)}-a-user add-on before Salesforce can sync with an ERP or another system, while Core and above include it. Support: Premier support is an add-on on Pro Suite, and the Premier Success Plan is included from Core up. Then extra storage, more sandboxes for testing, and licences for the systems you connect. All of it is on Salesforce's price pages, read ${PRICES_CHECKED}; little of it makes the first budget.`,
  },
  {
    q: "How do we move off spreadsheets without losing our history?",
    a: "We export every sheet, clean and de-duplicate the records, map each column to a Salesforce field, and load into a sandbox first. Record counts and totals are reconciled against the source before the production load, and the spreadsheet stays read-only until you are confident nothing is missing. We have moved QuickBase and Kissflow systems into Salesforce the same way.",
    link: { to: DM, label: "How a Salesforce data migration runs" },
  },
  {
    q: "Can we meet in person near Exton, Downingtown or West Chester?",
    a: `Yes. Our office is on Swedesford Road in Malvern, about ${mi("ex")} miles from Exton, ${mi("wc")} from West Chester and ${mi("dt")} from Downingtown in a straight line. Most of a Salesforce engagement runs remotely because the work happens inside your org, and the first conversation works well across a table.`,
  },
];

const SOURCES = {
  checked: "October 2026",
  links: [
    { label: "Salesforce Sales Cloud pricing", href: "https://www.salesforce.com/sales/pricing/" },
    { label: "Salesforce Service Cloud pricing", href: "https://www.salesforce.com/service/pricing/" },
    { label: "US Census Bureau, County Business Patterns 2023", href: "https://www.census.gov/data/datasets/2023/econ/cbp/2023-cbp.html" },
    { label: "US Census Bureau, cartographic boundary files", href: "https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html" },
    { label: "US Census Bureau, Gazetteer files", href: "https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html" },
  ],
};

/** Seats in, list-price bill out. Starts at 10 so the prerendered HTML matches the chart. */
function LicenceCalculator() {
  const [raw, setRaw] = React.useState("10");
  const seats = Math.min(Math.max(Math.floor(Number(raw)) || 0, 0), 100000);
  const rows = [
    ...EDITIONS.map((e) => ({ k: e.k, name: e.name, per: e.price })),
    { k: "pro-api", name: "Pro Suite with API access", per: priceOf("pro") + 25 },
  ].sort((a, b) => a.per - b.per);
  const first = rows[0];
  const last = rows[rows.length - 1];
  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
      <div>
        <label htmlFor="che-seats" className="block text-sm font-medium text-oa-nightInk">
          People who would log in
        </label>
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
          className="mt-1.5 h-12 w-40 rounded-none border border-white/40 border-b-2 border-b-oa-nightInk bg-white/5 px-3 font-mono text-lg tabular-nums text-oa-nightInk focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-oa-orange"
        />
        <p id="che-seats-sum" aria-live="polite" className="mt-5 max-w-[40ch] text-oa-nightInk2">
          {seats > 0
            ? `${seats.toLocaleString("en-US")} ${seats === 1 ? "person" : "people"}: from ${money(first.per * seats)} a month on ${first.name} to ${money(last.per * seats)} on ${last.name}, licences only.`
            : "Enter how many people would log in."}
        </p>
        <p className="mt-4 font-mono text-xs text-oa-nightInk3">
          Salesforce list prices, read {PRICES_CHECKED}. Subject to change by Salesforce; discounts and setup not included.
        </p>
      </div>
      <div role="region" aria-label="Licence bill by edition" tabIndex={0} className="-mx-4 overflow-x-auto px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-oa-orange sm:mx-0 sm:px-0">
        <table className="w-full min-w-[20rem] border-collapse text-left">
          <caption className="sr-only">Salesforce list-price licence bill for the number of people entered, by edition</caption>
          <thead>
            <tr className="border-b border-white/20">
              {["Edition", "Per user", "A month", "A year"].map((h) => (
                <th key={h} scope="col" className="py-3 pr-3 font-mono text-[11px] uppercase tracking-[0.12em] text-oa-nightInk3 sm:pr-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-b border-white/10">
                <th scope="row" className="py-3.5 pr-3 font-semibold text-oa-nightInk sm:pr-4">
                  {r.name}
                </th>
                <td className="py-3.5 pr-3 font-mono tabular-nums text-oa-nightInk2 sm:pr-4">{money(r.per)}</td>
                <td className="py-3.5 pr-3 font-mono text-base tabular-nums text-oa-orange sm:pr-4 sm:text-lg">{money(r.per * seats)}</td>
                <td className="py-3.5 font-mono tabular-nums text-oa-nightInk">{money(r.per * seats * 12)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SalesforceConsultantChesterCounty() {
  useSEO({
    title: "Salesforce Consultant Chester County, PA | OneAlgorithm",
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    ogTitle: "Salesforce Consultant Chester County, PA — OneAlgorithm",
    ogDescription:
      "The right Salesforce edition and a licence count before you sign, from a listed Salesforce Consulting Partner in Malvern, inside Chester County.",
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: F1.alt,
    twitterTitle: "Salesforce Consultant Chester County, PA",
    twitterDescription:
      "Edition advice and a licence count before you sign, from a Salesforce Consulting Partner in Malvern, PA. Free one-week health check.",
    twitterImage: OG_IMAGE,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting in Chester County, Pennsylvania",
          "Salesforce consulting for businesses in Chester County, Pennsylvania, from an office in Malvern: edition and licence advice before purchase, a licence count and rough cost in writing, Sales Cloud and Service Cloud configuration, migration off spreadsheets and older systems, ongoing administration, and a free one-week Salesforce health check for existing orgs.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          {
            providerId: "https://onealgorithm.com/#localbusiness",
            areaServed: { "@type": "AdministrativeArea", name: "Chester County, Pennsylvania" },
            image: IMAGE_1600,
          },
        )}
      />
      <StructuredData
        data={createWebPageSchema("The Salesforce consultant Chester County businesses can meet in Malvern", DESCRIPTION, PAGE_URL, {
          dateModified: PAGE_UPDATED,
          primaryImage: { url: IMAGE_1600, width: 1600, height: 900 },
        })}
      />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Chester County"
        title={
          <>
            {/* SEO-06: the exact phrase "Salesforce consultant Chester County" (OPSC). */}
            The Salesforce consultant <span className="text-oa-orange">Chester County</span> businesses can meet in Malvern
          </>
        }
        lede="Being quoted Salesforce and unsure which edition you need? We count the seats, match the edition to how your team works, and put the licence cost in writing before you sign. Our office is on Swedesford Road in Malvern, inside the county."
        panel={{
          title: "Before you sign anything",
          items: [
            "How your team works today, mapped",
            "The edition you need, and the ones you don't",
            "A licence count and a rough cost, in writing",
            "Who runs Salesforce after go-live",
          ],
        }}
        primary={{ label: "Get a licence count", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        meta={[
          { label: "Office", value: "Malvern, Chester County, PA" },
          { label: "Salesforce prices read", value: PRICES_CHECKED },
        ]}
        siblings={false}
      >
        <HcLink />
        <CTAProof className="mt-6" />
      </PageHero>

      {/* CHE-1: partner proof directly under the hero. */}
      <Section tone="paper" compact id="record">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          <div>
            <RecordLine
              extra={
                <Link className="oa-link" to="/services/salesforce-consulting-partner-pennsylvania">
                  How to check a Salesforce partner
                </Link>
              }
            />
            <p className="mt-3 text-sm text-oa-ink2">
              Office on Swedesford Road, Malvern: inside Chester County, not driving into it.
            </p>
          </div>
          <PartnerBadge />
        </div>
      </Section>

      <Section tone="surface" id="decisions">
        <SectionHeading
          title="The decisions that cost money come before the build"
          lede="Edition, seat count, and whether Salesforce is the right tool at all. We settle all three before anything is configured, then link you to the work that follows."
        />
        <CardGrid columns={4} className="mt-12">
          {DECISIONS.map((c) => (
            <Card key={c.title} wire icon={c.icon} title={c.title} body={c.body} to={c.to} />
          ))}
        </CardGrid>
      </Section>

      <Section clip tone="paper" id="editions">
        <PlateScope>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14">
            <SectionHeading
              title="Which Salesforce edition does a Chester County business need?"
              lede={`Most small teams start on Starter Suite at ${money(priceOf("starter"))} a user a month or Pro Suite at ${money(priceOf("pro"))}. Core, at ${money(priceOf("core"))}, is the first edition with API access included, which an ERP or SAP sync needs.`}
            />
            <p className="max-w-[30em] text-oa-ink2">
              Ten people on Starter Suite is {money(priceOf("starter") * 10)} a month. The same ten on Core is{" "}
              {money(priceOf("core") * 10)}. That gap is why the edition is settled before anything is configured, and
              why the licence count comes first.
            </p>
          </div>
          <div className="mt-12">
            <Plate
              spec={F1}
              fig={1}
              first
              stamp={["CHART · SALESFORCE LIST PRICES, 10 USERS", `READ ${PRICES_CHECKED.toUpperCase()}`]}
              caption={
                <>
                  Salesforce&apos;s list price for ten users a month, by edition, licences only. Pro Suite&apos;s dashed run is the
                  price with API access added.
                </>
              }
            />
          </div>
          <div className="mt-14">
            <DataTable
              label={`Salesforce editions, list price per user a month, read ${PRICES_CHECKED}, and what a licence count checks`}
              head={["Edition", "Per user a month", "Billing and what it adds (Sales Cloud)", "What we check first"]}
              rows={EDITIONS.map((e) => ({
                k: e.k,
                cells: [e.name, <span className="font-mono text-base tabular-nums text-oa-ink">{money(e.price)}</span>, e.terms, e.check],
              }))}
              own={3}
              nextStep={{ label: "Get a licence count" }}
              source={
                <>
                  Salesforce list prices from salesforce.com/sales/pricing and /service/pricing, read {PRICES_CHECKED}. Both list
                  the same five prices; Salesforce marks them subject to change.
                </>
              }
            />
          </div>
          <p className="mt-8">
            <Link className="oa-link font-medium" to={COST}>
              Setup and implementation costs, sandboxes and support plans: the full Salesforce cost guide →
            </Link>
          </p>
        </PlateScope>
      </Section>

      <Section tone="night" grid id="calculator">
        <SectionHeading
          tone="dark"
          title="Work out your own licence bill"
          lede="Enter the number of people who would actually log in. Seats times the edition price is the half of the cost you can know today."
        />
        <LicenceCalculator />
      </Section>

      {/* CHE-7: county data, CHE-F2. Text left, plate right (xl). */}
      <Section clip tone="surface" id="county">
        <PlateScope>
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
            <div>
              <SectionHeading
                title="Chester County businesses, by the numbers"
                lede="US Census Bureau, County Business Patterns 2023. These are the companies around our office, and the Salesforce work each group usually needs."
              />
              <div className="mt-8 max-w-[34em] border-b border-oa-hairlineStrong">
                {INDUSTRY_ROWS.map((r) => (
                  <WiredRow key={r.k} k={r.k} className="border-t border-oa-hairlineStrong px-2 py-4 text-oa-ink2">
                    <p>
                      <strong className="font-semibold text-oa-ink">{r.name}.</strong> <Figure text={r.employees} /> at{" "}
                      <Figure text={r.establishments} />.{FIT[r.k] && <> {FIT[r.k]}</>}
                    </p>
                  </WiredRow>
                ))}
              </div>
            </div>
            <div className="xl:pt-2">
              <Plate
                spec={F2}
                fig={2}
                stamp={["CHART · CENSUS COUNTY BUSINESS PATTERNS 2023", "CHESTER COUNTY, PA"]}
                caption="Paid employees by industry group in Chester County, 2023, the eight largest groups."
              />
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* CHE-4, CHE-10: delivered work, with the lead and a CTA beside it. */}
      <Section tone="paper" id="delivered">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-14">
          <div>
            <DeliveredLedger title="Salesforce work we have delivered" lead="lending" />
          </div>
          <aside className="border-t-2 border-oa-blue bg-oa-surface p-6 sm:p-8 lg:self-start" aria-labelledby="che-lead">
            <h3 id="che-lead" className="text-h3 font-semibold text-oa-ink">
              Who leads the work
            </h3>
            <PeopleStrip providerId="https://onealgorithm.com/#localbusiness" className="mt-4 text-oa-ink2" />
            <div className="mt-6 flex flex-col gap-3">
              <PrimaryCTA href="#start" tone="light" cta="mid">
                Get a licence count
              </PrimaryCTA>
              <a href={SF_PHONE.href} data-cta="mid" className="oa-link inline-flex min-h-11 items-center font-mono text-sm">
                Call {SF_PHONE.display}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* CHE-6: what happens after the call, from the hero panel's own steps. */}
      <Section clip tone="surface" id="process">
        <SectionHeading
          title="From first call to a Salesforce your team runs"
          lede="Four steps. The first three happen before you sign anything with Salesforce."
        />
        <div className="mt-12">
          <ProcessSteps rail terminal={{ label: "Get a licence count" }} steps={STEPS} />
        </div>
      </Section>

      {/* CHE-11, CHE-13: in person. Plate left, text right (xl). The named lead sits beside the ledger above. */}
      <Section clip tone="paper" id="in-person">
        <PlateScope>
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
            <div className="max-w-[560px] xl:order-1">
              <Plate
                spec={F3}
                fig={3}
                stamp={["MAP · CHESTER COUNTY, PA", "US CENSUS 2023"]}
                caption="Chester County and its neighbours, with our Malvern office and the straight-line distance to three nearby towns. County boundaries: US Census Bureau, 2023 (public domain)."
              />
            </div>
            <div className="xl:order-2">
              <SectionHeading
                title="Close enough to sit down with"
                lede="Our office is on Swedesford Road in Malvern, inside Chester County. The work runs inside your Salesforce org, remotely, and the first conversation can happen across a table."
              />
              <ul className="mt-8 max-w-[34em] border-b border-oa-hairlineStrong">
                {TOWNS.map((t) => (
                  <WiredRow key={t.k} k={t.k} as="li" className="border-t border-oa-hairlineStrong px-2 py-3.5 font-mono text-sm text-oa-ink">
                    {t.label} from our office
                  </WiredRow>
                ))}
              </ul>
              <p className="mt-3 font-mono text-xs text-oa-ink3">Straight-line distance, from Census Gazetteer coordinates.</p>
              <p className="mt-8 max-w-[34em] text-oa-ink2">
                We also work across Delaware, Montgomery and Bucks counties, New Castle County in Delaware, and{" "}
                <Link className="oa-link" to="/services/salesforce-consultant-philadelphia">
                  Philadelphia
                </Link>
                , and with companies anywhere in the United States, remotely.
              </p>
              {/* CHE-16, partly: where the local Salesforce community meets, from
                  free-data/trailblazer-groups (trailblazercommunitygroups.com, read
                  2026-10-23; distances measured from the Malvern office). Names and
                  links only: ⛔ never claim membership, sponsorship or attendance,
                  and no event dates (they go stale). */}
              <p className="mt-4 max-w-[34em] text-oa-ink2">
                Chester County&apos;s own Salesforce user group meets in West Chester:{" "}
                <a
                  className="oa-link"
                  href="https://trailblazercommunitygroups.com/salesforce-user-group-west-chester-united-states/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Salesforce User Group, West Chester ↗
                </a>
                . Philadelphia&apos;s admin, developer, architect, marketer and nonprofit groups and the Wilmington user group
                meet within about 20 miles of our office.
              </p>
            </div>
          </div>
        </PlateScope>
      </Section>

      <Section tone="surface" id="objections">
        <Objections items={OBJECTIONS} />
      </Section>

      <Section tone="paper" id="faq">
        <SectionHeading title="Questions Chester County buyers ask before they sign" />
        <FAQList faqs={FAQS} sources={SOURCES} />
      </Section>

      <Section tone="surface" id="services">
        <SectionHeading
          title="Salesforce services from our Malvern office"
          lede="Already own Salesforce? Start with the free one-week health check. Everything else is scoped in writing first."
        />
        <RouteBoard groups={["services", "local"]} first="hc" />
      </Section>

      <Desk
        heading="Get a licence count before you sign"
        body="Tell us how many people would log in and what you have been quoted. You get an edition recommendation and a rough cost in writing, and if a smaller edition does the job, we say so."
        form={{
          topic: "che",
          topicLabel: "Salesforce consulting · Chester County",
          heading: "Get a licence count",
          prompt: "How many people would use Salesforce, and what have you been quoted?",
          submitLabel: "Get a licence count",
        }}
        next={[
          "Call or send the form.",
          "A person at OneAlgorithm reads it and replies.",
          "You get a licence count and a rough cost before anyone signs.",
        ]}
      />
    </Layout>
  );
}
