import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero, ProcessSteps, Prose, Section, SectionHeading } from "../../components/site";
import {
  AnswerBand,
  DataTable,
  Desk,
  FAQList,
  HcLink,
  Objections,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  WiredRow,
  type SfFaq,
} from "../../components/salesforce";
import { RecordLine, SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  SF_HEALTH_CHECK_OFFER,
  StructuredData,
  createFAQSchema,
  createLocalBusinessSchema,
  createServiceSchema,
  createWebPageSchema,
} from "../../components/StructuredData";
import { SALESFORCE_CITIES } from "../../data/salesforceCities";
import { CITY_COPY } from "../../data/salesforceCityCopy";
import { PLATES } from "../../data/plates/city";
import {
  SF_APPEXCHANGE_URL,
  SF_CERTIFICATIONS,
  SF_CERTIFIED_PEOPLE,
  SF_LISTING_ID,
  SF_PAGES,
  SF_PHONE,
  SF_PLATFORM_CERTS,
} from "../../data/salesforceProof";

/* One template for the Salesforce city pages: /services/salesforce-consultant-<slug>, the 12
 * wave-2 cities plus Houston (2026-10-23). Build spec: onealgo-icm-oa/areas/sales/runs/
 * 2026-10-23_sf-audit/design-spec.md §3 "City template" and §5 "City template", plus the
 * wide-layout and voice addenda.
 * WHY ONE TEMPLATE IS NOT A DOORWAY PAGE: the body is the city's own data (Census, BLS,
 * LinkedIn, USAspending and Trailblazer community figures generated from source into
 * client/data/salesforceCities.ts, drawn as four plates by scripts/plates/city.mjs) plus a
 * hand-written angle and FAQs unique to that city (salesforceCityCopy.ts).
 * ⛔ We are in Malvern, PA. Never imply an office or clients in the city.
 * ⛔ Proof is the allowed list only (salesforceProof.ts). The page never says what we lack
 *    (voice addendum); e.g. there is no review block because there are no reviews to show.
 * Gap IDs closed (gap-audit-verified-gaps.md, Dallas = template): CITY-1 record card + RecordLine
 * + certification FAQ; CITY-3 one offer name; CITY-4 Desk form + phone; CITY-5 service cards
 * with delivered facts + rail; CITY-6 budget/timeline FAQ; CITY-7 hire/contract/partner;
 * CITY-9 four captioned plates; CITY-11 schema; CITY-12 all four industries; CITY-13 body
 * links; CITY-14 office answer; CITY-15 after-go-live + migration FAQs. */

type City = (typeof SALESFORCE_CITIES)[number];

const n = (v: number | null | undefined) => (v == null ? "—" : Number(v).toLocaleString("en-US"));
const ord = (k: number) => k + (["th", "st", "nd", "rd"][((k % 100) - 20) % 10] || ["th", "st", "nd", "rd"][k % 100] || "th");
const pct = (a?: number | null, b?: number | null) => (a && b ? Math.round(((a - b) / b) * 1000) / 10 : null);
const signed = (v: number) => `${v >= 0 ? "+" : ""}${v}%`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "2026-10-21" -> "21 October 2026" (the site's registry date style, as SF_VERIFIED_LABEL). */
const fmtDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
/** "2027-07-15/16" -> "15–16 July 2027". */
const fmtEvent = (d: string) => {
  const [base, end] = d.split("/");
  const out = fmtDate(base);
  return end ? out.replace(/^\d+/, (day) => `${day}–${Number(end)}`) : out;
};
const today = () => new Date().toISOString().slice(0, 10);
const where = (c: City) => (c.slug === "washington-dc" ? "Washington, DC" : `${c.name}, ${c.state}`);
/** For possessives: "DC's", "Dallas's". */
const short = (c: City) => (c.slug === "washington-dc" ? "DC" : c.name);
const roleCount = (c: City, r: string) => c.jobs.find((j) => j.role.endsWith(r))?.count;
const jobsTotal = (c: City) => c.jobs.reduce((s, j) => s + j.count, 0);
const msaName = (c: City) => c.msa.name.replace(/ Metro Area$/, " metro area");
const industryKey = (code: string) => `i${code}`;
const roleName = (r: string) => r.replace(/^Salesforce /, "");
/** The four role searches, most listings first: the order Fig. 1 draws them in (L6). */
const jobsByCount = (c: City) => [...c.jobs].sort((a, b) => b.count - a.count);
/** "202 listings for Salesforce consultants, 172 for administrators, … and 100 for developers". */
const roleCounts = (c: City) => {
  const rows = jobsByCount(c).map((j, i) => `${n(j.count)} ${i === 0 ? "listings for Salesforce " : "for "}${roleName(j.role).toLowerCase()}s`);
  return `${rows.slice(0, -1).join(", ")} and ${rows[rows.length - 1]}`;
};
/** Upcoming community events only: they go stale, so past ones are dropped at render time. */
const upcomingEvents = (c: City) =>
  (c.events as readonly { name: string; date: string; url: string }[]).filter((e) => e.date.slice(0, 10) >= today());

/** Renders [text](/path) inside copy strings as router links (salesforceCityCopy.ts). */
function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    out.push(text.slice(last, m.index));
    out.push(
      <Link key={m.index} className="oa-link" to={m[2]}>
        {m[1]}
      </Link>,
    );
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const STATE: Record<string, string> = { NY: "New York State", DC: "the District of Columbia", TX: "Texas", CO: "Colorado", GA: "Georgia", MA: "Massachusetts", WA: "Washington State", CA: "California", FL: "Florida", IL: "Illinois", PA: "Pennsylvania" };

/** The state-level federal line appears on ONE city page per state (the largest without a
 *  city figure), so Dallas/Austin/Houston and San Francisco/Los Angeles do not share it. */
function federalStateFor(c: City) {
  const owner = SALESFORCE_CITIES.filter((x) => x.state === c.state && !x.federal).sort(
    (a, b) => (b.establishments?.value ?? 0) - (a.establishments?.value ?? 0),
  )[0];
  return !c.federal && owner?.slug === c.slug ? c.federalState : null;
}

function federalSentence(c: City) {
  const f = federalStateFor(c);
  if (!f) return null;
  return (
    <>
      Across {STATE[f.place] ?? f.place}, federal agencies recorded {n(f.awards)} contract award{f.awards === 1 ? "" : "s"} mentioning Salesforce in {f.period}
      {f.usd ? <>, worth ${n(f.usd)} in obligations</> : null}
      {f.agencies ? (
        <>
          ; the largest buyers were{" "}
          {String(f.agencies)
            .split(";")
            .slice(0, 2)
            .map((a) => a.split(":")[0].trim())
            .join(" and ")}
        </>
      ) : null}
      .
    </>
  );
}

/* Where our proven work meets each industry. Every clause is either true of OneAlgorithm on
   the allowed-proof list (lending development, SAP sync, QuickBase/Kissflow migrations) or a
   plain statement of what the work involves; no industry client claims. Lower-case clause
   fragments (the row capitalises them). 2026-10-23: "we run bulk data jobs as routine work"
   (not on the allowed list) became a statement of method. */
const INDUSTRY_FIT: Record<string, string> = {
  "62": "Salesforce work there usually turns on access, who can see which records, enforced with permission sets and sharing rules rather than a pile of profiles",
  "52": "that is where we run ongoing Salesforce development for a lending company, every week since April 2026",
  "54": "firms like these tend to use Salesforce to track clients, projects and proposals, and need reporting that agrees across all three",
  "31-33": "manufacturers usually need Salesforce to agree with an ERP on accounts, orders and pricing, which is integration work we deliver",
  "42": "distribution runs on volume, so bulk loads and de-duplication decide whether reports can be trusted; we load in tested batches with duplicate rules switched on",
  "813": "associations and nonprofits often move member and donor data off older databases, and we have migrated QuickBase and Kissflow systems into Salesforce",
  "51": "these businesses usually need Salesforce connected to billing and product systems, which is integration work we deliver",
  "53": "firms here typically use Salesforce to keep properties, contacts and deals in one place",
};

/* ---------------------------------------------------------------------------
   THE TEMPLATE (plate system).
--------------------------------------------------------------------------- */

/** The free health check's four steps: titles and FIRST sentences verbatim from
 *  SalesforceHealthCheck.tsx STEPS. ponytail: one sentence each keeps 13 city pages under the
 *  duplicate-sentence budget (README); the full steps live on the health check page. */
const HC_STEPS = [
  { title: "Tell us the symptom", body: "Reports nobody trusts, a renewal you are unsure about, automation nobody dares touch." },
  { title: "A week in your org", body: "You create a user that can read your setup and records.", to: "/services/salesforce-health-check" },
  { title: "A written, ranked list", body: "What we found and why it matters, ordered by what to fix first." },
  { title: "You decide what happens next", body: "Act on it with us, with your own admin, or not at all." },
];

/** General role definitions (not claims about us). Order is fixed; counts come from data. */
const ROLES = [
  { key: "Administrator", does: "Runs the org day to day: users, permissions, reports and small changes." },
  { key: "Developer", does: "Builds what configuration cannot: Apex code, integrations and complex automation." },
  { key: "Consultant", does: "Designs how Salesforce should fit the business and leads the project." },
  { key: "Architect", does: "Designs the data model, security and integrations across a large org." },
] as const;

/* The named lead's approved sentence and verify link come from SF_PEOPLE via PeopleStrip. */
const LEAD = { verify: "https://www.salesforce.com/trailblazer/samirisetti" };

/** One allowed-fact sentence per service card (CITY-5). hc/sa/cost keep the hub's lines. */
const SERVICE_BODIES = {
  dm: "We have migrated QuickBase and Kissflow systems into Salesforce, reconciled before go-live.",
  int: "We have built an SAP-to-Salesforce sync. Which system owns each record is agreed before anything is built.",
  ms: "Ongoing Salesforce development for a lending company since April 2026, with hours reported every week.",
  mc: "About 18 months of Marketing Cloud support, for accounts already running.",
};

/** `schema: false` = shown on the page but left out of FAQPage: these answers are the same on
 *  all 13 city pages (SEO-08), so only the city-specific Q&As go into each page's schema. */
type CityFaqRow = SfFaq & { schema?: false };

function buildFaqs(c: City): CityFaqRow[] {
  const copy = CITY_COPY[c.slug];
  const total = jobsTotal(c);
  const g = c.community.groups;
  const office = c.salesforceOffice
    ? `Salesforce lists an office at ${c.salesforceOffice}.`
    : `Salesforce lists no office in ${c.name}${c.nearestOffice ? `; the nearest is at ${c.nearestOffice}` : ""}.`;
  const upcoming = upcomingEvents(c);
  return [
    {
      q: `How do I find a good Salesforce consultant in ${c.name}?`,
      a: `Start with Salesforce's own directory: the Consultants section of AppExchange lists every Salesforce partner with its certified people and certifications, and filters by location and product. Shortlist the firms whose record fits your project, check who would do the work on their Trailblazer profiles, then ask each for a written scope before you compare prices; ours is AppExchange listing ${SF_LISTING_ID}.`,
      link: { to: "/services/salesforce-consulting-partner-pennsylvania", label: "How to check a Salesforce partner" },
      schema: false,
    },
    ...copy.faqs,
    {
      q: `Can you move a ${c.name} company off an older database into Salesforce?`,
      a: "Yes. We have migrated QuickBase and Kissflow systems into Salesforce with record counts and totals reconciled before go-live, and the free one-week Salesforce health check shows the state of your data first, so the plan starts from facts.",
      link: { to: "/services/salesforce-data-migration", label: "Salesforce data migration" },
      schema: false,
    },
    {
      q: `What should a ${c.name} company budget for Salesforce consulting, and how long does it take?`,
      a: `Published guides put a small-business project at $15,000 to $50,000 and a mid-market one at $50,000 to $150,000 (BrainSpate, American Chase); Cynoteck puts a small project at 4 to 8 weeks and Groviya a mid-sized rollout at 3 to 6 months. Those are other firms' published ranges, not our quote: for a ${c.name} company we scope and price the work in writing after the free one-week Salesforce health check. For comparison, one in-house software developer in the ${msaName(c)} earns a median $${n(c.wages.developers.median)} a year in salary alone (BLS, ${c.wages.period}).`,
      link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" },
    },
    {
      q: `After go-live, who looks after Salesforce for a ${short(c)} team?`,
      a: "We can: our managed services run weekly administration and development with hours reported every week, which is how we have run Salesforce development for a lending company since April 2026, and if your own admin takes over instead, the handover is written down.",
      link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" },
      schema: false,
    },
    {
      q: `Is a Pennsylvania Salesforce partner certified to work in a ${c.name} company's org?`,
      a: `Yes. Salesforce certifies people, not offices, so the certification travels with the person, and OneAlgorithm is a Salesforce Consulting Partner listed on AppExchange (listing ${SF_LISTING_ID}), and Salesforce's record lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people holding ${SF_CERTIFICATIONS} certifications, ${SF_PLATFORM_CERTS} of them Platform.`,
      schema: false,
    },
    {
      q: `How much demand is there for Salesforce skills in ${c.name}?`,
      a: `On ${fmtDate(c.jobsPulled)}, LinkedIn searches within 25 miles of ${c.name} showed ${roleCounts(c)}, ${n(total)} across the four searches. That ranked ${c.name} ${ord(c.jobsRank.rank)} of the ${c.jobsRank.of} metro areas we checked, and when that many employers compete for the same people, a partner covers a defined project without a new hire.`,
    },
    {
      q: `Is there a Salesforce user community in ${c.name}?`,
      a: g.length
        ? `Yes. ${g.length} Salesforce Trailblazer Community Group${g.length === 1 ? " with recent events meets" : "s with recent events meet"} within 50 km of central ${c.name}: ${g.map((x) => `${x.name} (${x.km} km)`).join(", ")}. ${office}${upcoming.length ? ` Upcoming regional events include ${upcoming.map((e) => `${e.name} (${fmtEvent(e.date)})`).join(" and ")}.` : ""}`
        : `The nearest active Trailblazer Community Groups are more than 50 km from central ${c.name}. ${office}${upcoming.length ? ` Upcoming regional events include ${upcoming.map((e) => `${e.name} (${fmtEvent(e.date)})`).join(" and ")}.` : ""}`,
      link: { to: `#fig-salesforce-community-${c.slug}`, label: "See the community diagram" },
    },
  ];
}

export default function SalesforceCity({ slug }: { slug: string }) {
  const c = SALESFORCE_CITIES.find((x) => x.slug === slug)!;
  const copy = CITY_COPY[slug];
  const path = c.path;
  const url = `https://onealgorithm.com${path}`;
  const total = jobsTotal(c);
  const faqs = buildFaqs(c);
  const jobs = PLATES[`salesforce-jobs-${slug}` as keyof typeof PLATES];
  const growth = PLATES[`${slug}-business-establishments-2018-2023` as keyof typeof PLATES];
  const inds = PLATES[`${slug}-largest-industries` as keyof typeof PLATES];
  const community = PLATES[`salesforce-community-${slug}` as keyof typeof PLATES];
  const estChange = pct(c.establishments.value, c.establishments2018.value);
  const bigChange = pct(c.size500plus.value, c.size500plus2018.value);
  const popChange = pct(c.population.value, c.population2019.value);
  const fed = federalSentence(c);
  const shareImage = `https://onealgorithm.com/media/salesforce/og-${slug}.jpg`;
  const leadImage = `https://onealgorithm.com/media/salesforce/salesforce-jobs-${slug}-1600x900.jpg`;
  const upcoming = upcomingEvents(c);
  const siblings = copy.related
    .map((s) => SF_PAGES.cities.find((x) => x.to === `/services/salesforce-consultant-${s}`))
    .filter((x): x is (typeof SF_PAGES.cities)[number] => Boolean(x));
  const wage = c.wages;
  const byCount = jobsByCount(c);
  const topRole = byCount[0];
  const lowRole = byCount[byCount.length - 1];

  // 45, not 50: Houston's planned title (page-map-final-plan.md §3) is 48 characters.
  if (import.meta.env.DEV && (copy.title.length < 45 || copy.title.length > 60 || copy.description.length > 155))
    console.warn(`[SalesforceCity:${slug}] title ${copy.title.length} chars (45-60), description ${copy.description.length} (<=155)`);

  useSEO({
    title: copy.title,
    description: copy.description,
    canonical: getCanonicalUrl(path),
    ogTitle: `Salesforce consultants for ${where(c)} companies | OneAlgorithm`,
    ogDescription: copy.description,
    ogUrl: getCanonicalUrl(path),
    ogImage: shareImage,
    ogImageSize: [1200, 630],
    ogImageAlt: jobs.alt,
    twitterTitle: `Salesforce consultants for ${where(c)} companies | OneAlgorithm`,
    twitterDescription: copy.description,
    twitterImage: shareImage,
  });

  const localBusiness: Record<string, unknown> = { ...createLocalBusinessSchema("ProfessionalService") };
  // CITY-11: the Malvern entity stays the provider, but its PA/DE county service area is not
  // this page's area. areaServed for the page is on the Service node below.
  delete localBusiness.areaServed;

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          `Salesforce consulting in ${where(c)}`,
          `Salesforce consulting for companies in ${where(c)}: data migration, SAP and ERP integration, managed services and Marketing Cloud support, delivered remotely from Malvern, Pennsylvania by a listed AppExchange Consulting Partner.`,
          "Salesforce consulting",
          url,
          {
            providerId: "https://onealgorithm.com/#localbusiness",
            areaServed: { "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: c.msa.name } },
            image: leadImage,
            offers: SF_HEALTH_CHECK_OFFER,
          },
        )}
      />
      <StructuredData data={localBusiness} />
      <StructuredData data={createFAQSchema(faqs.filter((f) => f.schema !== false))} />
      <StructuredData
        data={createWebPageSchema(copy.title, copy.description, url, {
          dateModified: "2026-10-23",
          primaryImage: { url: leadImage, width: 1600, height: 900 },
        })}
      />

      <PageHero
        title={
          <>
            {copy.h1.lead}
            <span className="text-oa-orange">{copy.h1.place}</span>
            {copy.h1.tail}
          </>
        }
        lede={`${copy.intro ?? `Salesforce consulting for ${c.name} companies, from our office in Malvern, Pennsylvania:`} data migration, SAP and ERP integration, weekly administration and development, and Marketing Cloud support, run inside your Salesforce org and in person when a meeting needs it.`}
        panel={{ title: "Salesforce's record of us", items: [], slot: <SalesforceRecordCard /> }}
        primary={{ label: "Book a free health check", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        meta={[
          { label: "Data pulled", value: fmtDate(c.jobsPulled) },
          { label: "Community read", value: fmtDate(c.community.pulled) },
        ]}
        siblings={false}
      >
        <HcLink />
      </PageHero>

      {/* 2. AnswerBand: the office question, answered by how the work runs (CITY-14). */}
      <AnswerBand
        question={`Do you provide Salesforce consulting in ${c.name}?`}
        answer={`Yes. OneAlgorithm is a listed Salesforce Consulting Partner in Malvern, Pennsylvania, and we take on ${c.name} Salesforce work remotely: migrations, ERP and SAP integration, weekly administration and development, and Marketing Cloud support. The work happens inside your org over video and screen-share, and we travel to ${c.name} when a meeting needs people in the room.`}
        leads={[
          {
            label: "Why it matters",
            body: `${c.name} employers posted ${n(total)} Salesforce job listings across four LinkedIn role searches on ${fmtDate(c.jobsPulled)}; a partner delivers a defined piece of work without joining that hiring race.`,
          },
          { label: "What we do", body: "We scope the work in writing, deliver it with certified people and hand over an org your own team can run." },
          {
            label: "What it costs",
            body: (
              <>
                It starts with a{" "}
                <Link className="oa-link" to="/services/salesforce-health-check">
                  free one-week Salesforce health check
                </Link>
                ; fixes are scoped and priced in writing, and published market ranges are in our{" "}
                <Link className="oa-link" to="/services/salesforce-implementation-cost">
                  cost guide
                </Link>
                .
              </>
            ),
          },
        ]}
        toc={[
          { id: "data", label: `The ${short(c)} data` },
          { id: "hire", label: "Hire or partner" },
          { id: "industries", label: "Industries" },
          { id: "figures", label: "Sourced figures" },
          { id: "community", label: "Community" },
          { id: "services", label: "Services" },
          { id: "process", label: "How it starts" },
          { id: "faq", label: "Questions" },
          { id: "start", label: "Book" },
        ]}
      >
        <RecordLine
          extra={
            <a className="oa-link -my-2.5 inline-flex min-h-11 items-center" href={SF_PHONE.href} data-cta="answer">
              Call {SF_PHONE.display}
            </a>
          }
        />
      </AnswerBand>

      {/* 3. Reading the data (CITY-9): F1 is the page's first figure (eager, static). */}
      <Section clip tone="surface" bordered id="data">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-14">
          <div className="xl:col-span-5">
            <SectionHeading title={`Reading the ${short(c)} data`} />
            <Prose className="mt-6 text-lg">
              <p>
                On {fmtDate(c.jobsPulled)}, LinkedIn searches within 25 miles of {c.name} returned {roleCounts(c)}: {n(total)} across the four searches, {ord(c.jobsRank.rank)} of the {c.jobsRank.of} metro areas we checked.
              </p>
              <p>A listing can match more than one search, so read the {n(total)} as demand rather than a head count.</p>
            </Prose>
          </div>
          <div className="xl:col-span-7">
            <Plate
              spec={jobs}
              fig={1}
              first
              stamp={["CHART · LINKEDIN PUBLIC JOB SEARCH", fmtDate(c.jobsPulled)]}
              caption={<>Open Salesforce listings within 25 miles of {c.name} on {fmtDate(c.jobsPulled)}, one LinkedIn search per role: {roleName(topRole.role).toLowerCase()} listings lead with {n(topRole.count)}.</>}
            />
          </div>
        </div>

        <PlateScope>
          <div className="mt-16 grid grid-cols-1 gap-10 xl:mt-20 xl:grid-cols-12 xl:gap-14">
            <div className="xl:col-span-7 xl:row-start-1">
              <Plate
                spec={growth}
                fig={2}
                stamp={["CHART · CENSUS COUNTY BUSINESS PATTERNS", "2018 → 2023"]}
                caption={<>Business establishments in the {msaName(c)}: {n(c.establishments2018.value)} in 2018 and {n(c.establishments.value)} in 2023, with {n(c.size500plus2018.value)} and then {n(c.size500plus.value)} employing 500 or more people; each line has its own scale.</>}
              />
            </div>
            <div className="xl:col-span-5 xl:col-start-8 xl:row-start-1">
              <Prose className="text-lg">
                <p>
                  The {msaName(c)} had {n(c.establishments.value)} business establishments in 2023
                  {estChange != null && <>, {estChange >= 0 ? "up" : "down"} {Math.abs(estChange)}% from 2018</>}; {n(c.size500plus.value)} of them employed 500 or more people and another {n(c.size100to499.value)} employed 100 to 499.
                  {popChange != null && <> Population changed {signed(popChange)} between 2019 and 2024.</>} {fed}
                </p>
              </Prose>
              <dl className="mt-8 border-b border-oa-hairlineStrong">
                <WiredRow k="all" className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-t border-oa-hairlineStrong px-2 py-4">
                  <dt className="font-semibold text-oa-ink">Business establishments</dt>
                  <dd className="text-right font-mono tabular-nums text-oa-ink">
                    {n(c.establishments2018.value)} → {n(c.establishments.value)}
                  </dd>
                  <dd className="col-span-2 font-mono text-xs text-oa-ink3">
                    {estChange != null && signed(estChange)} · Census CBP 2018, 2023 ·{" "}
                    <a className="oa-link" href={c.establishments.api} {...ext}>
                      query ↗
                    </a>
                  </dd>
                </WiredRow>
                <WiredRow k="big" className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-t border-oa-hairlineStrong px-2 py-4">
                  <dt className="font-semibold text-oa-ink">With 500 or more employees</dt>
                  <dd className="text-right font-mono tabular-nums text-oa-ink">
                    {n(c.size500plus2018.value)} → {n(c.size500plus.value)}
                  </dd>
                  <dd className="col-span-2 font-mono text-xs text-oa-ink3">
                    {bigChange != null && signed(bigChange)} · Census CBP 2018, 2023, two size classes summed
                  </dd>
                </WiredRow>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-t border-oa-hairlineStrong px-2 py-4">
                  <dt className="font-semibold text-oa-ink">Population</dt>
                  <dd className="text-right font-mono tabular-nums text-oa-ink">
                    {n(c.population2019.value)} → {n(c.population.value)}
                  </dd>
                  <dd className="col-span-2 font-mono text-xs text-oa-ink3">
                    Census ACS 2019, 2024 ·{" "}
                    <a className="oa-link" href={c.population.api} {...ext}>
                      query ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* 4. Hire, contract or partner (CITY-7). City data only. */}
      <Section tone="paper" id="hire">
        <SectionHeading
          title={`Hire, contract or bring in a partner? What ${short(c)}'s ${n(total)} Salesforce job listings mean`}
          lede={`${roleName(topRole.role)} listings lead in ${c.name} with ${n(topRole.count)}; ${roleName(lowRole.role).toLowerCase()} listings are the fewest at ${n(lowRole.count)}.`}
        />
        <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {[...ROLES].sort((a, b) => (roleCount(c, b.key) ?? 0) - (roleCount(c, a.key) ?? 0)).map((r) => {
            const j = c.jobs.find((x) => x.role.endsWith(r.key));
            return (
              <div key={r.key} className="border-t border-oa-hairlineStrong pt-5">
                <dt className="text-lg font-semibold text-oa-ink">Salesforce {r.key.toLowerCase()}</dt>
                <dd className="mt-3 font-mono text-4xl leading-none tabular-nums text-oa-ink">{n(j?.count)}</dd>
                <dd className="mt-1.5 font-mono text-xs text-oa-ink3">
                  listings within 25 miles ·{" "}
                  {j && (
                    <a className="oa-link -my-2.5 inline-flex min-h-11 items-center" href={j.url} {...ext}>
                      LinkedIn search ↗
                    </a>
                  )}
                </dd>
                <dd className="mt-3 text-oa-ink2">
                  {r.does.replace(/.$/, "")}; {j ? Math.round((j.count / total) * 100) : 0}% of the {c.name} searches.
                </dd>
              </div>
            );
          })}
        </dl>

        <h3 className="mt-16 text-h3 font-semibold text-oa-ink">Three ways to get the work done</h3>
        <div className="mt-6">
          <DataTable
            label="Hire, contract or partner"
            head={["", "The market you are in", "What it costs to start", "What you have at the end"]}
            rows={[
              {
                cells: [
                  "Full-time hire",
                  `${n(total)} listings within 25 miles of ${c.name} compete for the same people.`,
                  <>
                    Salary alone: BLS medians in the {msaName(c)} are ${n(wage.analysts.median)} for computer systems analysts and ${n(wage.developers.median)} for software developers, before benefits.
                  </>,
                  "A person on staff who knows your org, for as long as they stay.",
                ],
              },
              {
                cells: [
                  "Contractor",
                  `The same ${n(total)} listings, on shorter terms.`,
                  "A day or hourly rate set by each contractor.",
                  "Hours of work against a brief you write and manage.",
                ],
              },
              {
                cells: [
                  "Salesforce partner",
                  `A team that is already certified and staffed, outside the ${n(total)}-listing race.`,
                  <>
                    A written scope and price before work starts, after a{" "}
                    <Link className="oa-link" to="/services/salesforce-health-check">
                      free one-week Salesforce health check
                    </Link>
                    .
                  </>,
                  "The finished work and a written handover your own people can run.",
                ],
              },
            ]}
            source={
              <>
                Sources: LinkedIn public job search, {fmtDate(c.jobsPulled)}; BLS Occupational Employment and Wage Statistics, {wage.period} (
                <a className="oa-link" href={wage.page} {...ext}>
                  {c.msa.name} ↗
                </a>
                ), read {fmtDate(wage.pulled)}; Salesforce roles have no federal job code of their own, so the closest occupations stand in.
              </>
            }
          />
        </div>
        <p className="mt-10 max-w-[34em] text-lg text-oa-ink2">
          Before you sign with any partner, read its public AppExchange record:{" "}
          <Link className="oa-link" to="/services/salesforce-consulting-partner-pennsylvania">
            how to check a Salesforce partner
          </Link>{" "}
          walks through it, and ours is{" "}
          <a className="oa-link" href={SF_APPEXCHANGE_URL} {...ext}>
            listing {SF_LISTING_ID} ↗
          </a>
          .
        </p>
      </Section>

      {/* 5. Industries (CITY-12): all four groups, rows wired to FIG. 3. */}
      <Section clip tone="surface" bordered id="industries">
        <PlateScope>
          {/* DOM order = phone order (heading, chart, rows); xl puts the chart beside both. */}
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-x-14 xl:gap-y-0">
            <div className="xl:col-span-6 xl:row-start-1">
              <SectionHeading
                title={`Where Salesforce fits ${short(c)}'s largest industries`}
                lede={`The four largest employer groups in the ${msaName(c)} together employ ${n(c.industries.reduce((t, i) => t + (i.employees ?? 0), 0))} people, and each one needs different Salesforce work.`}
              />
            </div>
            <div className="xl:sticky xl:top-24 xl:col-span-6 xl:col-start-7 xl:row-span-2 xl:row-start-1 xl:self-start xl:pt-2">
              <Plate
                spec={inds}
                fig={3}
                stamp={["CHART · CENSUS COUNTY BUSINESS PATTERNS 2023", `MSA ${c.msa.code}`]}
                caption={<>Employees in the four largest of the eight employer groups we pulled for the {msaName(c)}; {c.industries[0].label} leads with {n(c.industries[0].employees)}.</>}
              />
            </div>
            <div className="xl:col-span-6 xl:row-start-2">
              <ul className="border-b border-oa-hairlineStrong xl:mt-10">
                {c.industries.map((i) => (
                  <WiredRow key={i.code} k={industryKey(i.code)} as="li" className="border-t border-oa-hairlineStrong px-2 py-5">
                    <p className="text-lg font-semibold text-oa-ink">{cap(i.label)}</p>
                    <p className="mt-1 font-mono text-sm tabular-nums text-oa-ink2">
                      {n(i.employees)} employees · {n(i.establishments)} establishments
                    </p>
                    {INDUSTRY_FIT[i.code] && <p className="mt-2 max-w-[34em] text-oa-ink2">{cap(INDUSTRY_FIT[i.code])}.</p>}
                  </WiredRow>
                ))}
              </ul>
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* 6. Sourced figures: every value links to its public source. */}
      <Section tone="paper" id="figures">
        <SectionHeading
          title={`Business and Salesforce figures for ${c.name}`}
          lede={`Every figure links to its public source and covers the ${msaName(c)} (Census MSA ${c.msa.code}) unless stated.`}
        />
        <div className="mt-10">
          <DataTable
            label="Sourced figures"
            head={["Figure", "Value", "Source"]}
            rows={[
              { cells: ["Business establishments, 2023", <span className="font-mono tabular-nums">{n(c.establishments.value)}</span>, <a className="oa-link" href={c.establishments.api} {...ext}>Census County Business Patterns 2023 ↗</a>] },
              { cells: ["Establishments with 500 or more employees", <span className="font-mono tabular-nums">{n(c.size500plus.value)}</span>, "Census CBP 2023, two size classes summed"] },
              { cells: ["Establishments with 100 to 499 employees", <span className="font-mono tabular-nums">{n(c.size100to499.value)}</span>, "Census CBP 2023, two size classes summed"] },
              ...c.industries.map((i) => ({
                cells: [
                  `Employees in ${i.label}`,
                  <span className="font-mono tabular-nums">
                    {n(i.employees)} <span className="text-oa-ink3">· {n(i.establishments)} establishments</span>
                  </span>,
                  <a className="oa-link" href={i.api} {...ext}>Census CBP 2023 ↗</a>,
                ],
              })),
              {
                cells: [
                  "Software developers employed",
                  <span className="font-mono tabular-nums">
                    {n(wage.developers.employment)} <span className="text-oa-ink3">· median ${n(wage.developers.median)}</span>
                  </span>,
                  <a className="oa-link" href={wage.developers.series} {...ext}>BLS OEWS {wage.period} ↗</a>,
                ],
              },
              {
                cells: [
                  "Computer systems analysts employed",
                  <span className="font-mono tabular-nums">
                    {n(wage.analysts.employment)} <span className="text-oa-ink3">· median ${n(wage.analysts.median)}</span>
                  </span>,
                  <a className="oa-link" href={wage.analysts.series} {...ext}>BLS OEWS {wage.period} ↗</a>,
                ],
              },
              {
                cells: [
                  "Salesforce job listings within 25 miles",
                  <span className="font-mono tabular-nums">
                    {n(total)} <span className="text-oa-ink3">· four role searches</span>
                  </span>,
                  <span>
                    LinkedIn, {fmtDate(c.jobsPulled)}:{" "}
                    {byCount.map((j, i) => (
                      <span key={j.role}>
                        {i > 0 && " · "}
                        <a className="oa-link inline-flex min-h-11 items-center" href={j.url} {...ext}>
                          {roleName(j.role)}
                        </a>
                      </span>
                    ))}
                  </span>,
                ],
              },
              /* FV-16: a handful of tiny awards (New York: 1 award, $500) reads as a data error;
                 the row shows only from 3 awards up (DC, Atlanta, San Francisco, Denver). */
              ...(c.federal && c.federal.awards >= 3
                ? [
                    {
                      cells: [
                        `Federal contract awards mentioning Salesforce, ${c.federal.place === "Washington DC" ? "Washington, DC" : `city of ${c.federal.place}`}`,
                        <span className="font-mono tabular-nums">
                          {n(c.federal.awards)}
                          {c.federal.usd ? <span className="text-oa-ink3"> · ${n(c.federal.usd)}</span> : null}
                        </span>,
                        <a className="oa-link" href={c.sources.usaspending} {...ext}>USAspending.gov, {c.federal.period} ↗</a>,
                      ],
                    },
                  ]
                : []),
            ]}
            source={<>Census and BLS figures for MSA {c.msa.code} pulled {fmtDate(c.jobsPulled)}; BLS occupation figures re-read {fmtDate(wage.pulled)}.</>}
          />
        </div>
      </Section>

      {/* 7. The city angle beside the community plate (CITY-9). */}
      <Section clip tone="surface" bordered id="community">
        <PlateScope>
          {/* DOM order = phone order (heading and angle, diagram, the list); xl puts the diagram beside both. */}
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-x-14 xl:gap-y-0">
            <div className="xl:col-span-7 xl:row-start-1">
              <SectionHeading title={copy.angleTitle} />
              <Prose className="mt-6 text-lg">
                {copy.angle.map((p) => (
                  <p key={p.slice(0, 32)}>
                    <Rich text={p} />
                  </p>
                ))}
              </Prose>
            </div>
            <div className="xl:sticky xl:top-24 xl:col-span-5 xl:col-start-8 xl:row-span-2 xl:row-start-1 xl:self-start">
              <Plate
                spec={community}
                fig={4}
                stamp={["DIAGRAM · TRAILBLAZER GROUPS WITHIN 50 KM", `READ ${fmtDate(c.community.pulled)}`]}
                caption={<>{c.community.groups.length} Trailblazer Community Group{c.community.groups.length === 1 ? "" : "s"} within 50 km of central {c.name} with an event in the past year, nearest first.</>}
              />
            </div>
            <div className="xl:col-span-7 xl:row-start-2">
              <h3 className="text-lg xl:mt-12 font-semibold text-oa-ink">Where {short(c)}'s Salesforce community meets</h3>
              <ul className="mt-4 max-w-[34em] border-b border-oa-hairlineStrong">
                {c.community.groups.map((g, i) => (
                  <WiredRow key={g.url} k={`g${i + 1}`} as="li" className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-t border-oa-hairline px-2 py-3">
                    <a className="oa-link" href={g.url} {...ext}>
                      {g.name} ↗
                    </a>
                    <span className="font-mono text-sm tabular-nums text-oa-ink3">{g.km} km</span>
                  </WiredRow>
                ))}
                <WiredRow k="office" as="li" className="border-t border-oa-hairline px-2 py-3 text-oa-ink2">
                  {c.salesforceOffice ? <>Salesforce office: {c.salesforceOffice}</> : <>Salesforce lists no office in {c.name}{c.nearestOffice ? <>; the nearest is at {c.nearestOffice}</> : null}.</>}
                </WiredRow>
                <WiredRow k="oa" as="li" className="border-t border-oa-hairline px-2 py-3 text-oa-ink2">
                  OneAlgorithm, Malvern, PA: the work runs remotely, inside your org, and we come in person when a meeting needs it.
                </WiredRow>
              </ul>
              {upcoming.length > 0 && (
                <p className="mt-4 max-w-[34em] text-oa-ink2">
                  Upcoming regional events:{" "}
                  {upcoming.map((e, i) => (
                    <span key={e.url}>
                      {i > 0 && " · "}
                      <a className="oa-link" href={e.url} {...ext}>
                        {e.name} ↗
                      </a>{" "}
                      <span className="font-mono text-sm text-oa-ink3">{fmtEvent(e.date)}</span>
                    </span>
                  ))}
                </p>
              )}
              <p className="mt-4 font-mono text-xs text-oa-ink3">
                Source:{" "}
                <a className="oa-link" href={c.sources.trailblazer} {...ext}>
                  trailblazercommunitygroups.com ↗
                </a>
                , read {fmtDate(c.community.pulled)}; distances from the city centre; office from{" "}
                <a className="oa-link" href="https://www.salesforce.com/company/locations/" {...ext}>
                  Salesforce office locations ↗
                </a>
                .
              </p>
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* 8. Services, each card with one allowed-fact sentence (CITY-5, CITY-3). */}
      <Section tone="paper" id="services">
        <SectionHeading
          title={`Salesforce services for ${c.name} companies`}
        />
        <RouteBoard groups={["services"]} bodies={SERVICE_BODIES} />
      </Section>

      {/* 9. Rail: the health check, ending in the Desk CTA (CITY-5). */}
      <Section clip tone="surface" bordered id="process">
        <SectionHeading title="How the free health check runs" />
        <div className="mt-12">
          <ProcessSteps rail terminal={{ label: "Book a free health check" }} steps={HC_STEPS} />
        </div>
      </Section>

      {/* 10. Objections: before the FAQ and the Desk. Not in FAQPage. */}
      <Section tone="paper" id="objections">
        <Objections
          items={[
            SF_OBJECTIONS.pitch,
            SF_OBJECTIONS.cost,
            {
              q: "Who actually does the work?",
              a: (
                <PeopleStrip
                  providerId="https://onealgorithm.com/#localbusiness"
                  className="max-w-[34em]"
                  lead="The certified people you talk to, with no hand-off to a bench you never meet. "
                />
              ),
            },
          ]}
        />
      </Section>

      {/* 11. FAQ (CITY-6, CITY-15, CITY-1). The same array feeds FAQPage. */}
      <Section tone="surface" bordered id="faq">
        <SectionHeading title={`What ${c.name} buyers ask first`} />
        <FAQList
          faqs={faqs}
          sources={{
            checked: "October 2026",
            links: [
              { label: `AppExchange listing ${SF_LISTING_ID}`, href: SF_APPEXCHANGE_URL },
              { label: "Sreenivas Amirisetti on Trailblazer", href: LEAD.verify },
              { label: "BrainSpate cost guide", href: "https://brainspate.com/blog/salesforce-implementation-cost-guide/" },
              { label: "American Chase cost guide", href: "https://americanchase.com/salesforce-implementation-costs/" },
              { label: "Cynoteck cost guide", href: "https://www.cynoteck.com/blog-post/salesforce-implementation-cost" },
              { label: "Groviya cost guide", href: "https://www.groviya.com/blog/salesforce-implementation-cost-guide" },
              { label: "LinkedIn job search", href: c.sources.linkedin },
              { label: "Trailblazer Community Groups", href: c.sources.trailblazer },
            ],
          }}
        />
      </Section>

      {/* 12. Cities list (CITY-13). Sibling links render only once the route exists in SF_PAGES. */}
      <Section tone="paper" compact id="cities">
        {siblings.length > 0 && (
          <p className="max-w-[34em] text-lg text-oa-ink2">
            Nearest to {c.name} on our Salesforce pages:{" "}
            {siblings.map((s, i) => (
              <span key={s.to}>
                {i > 0 && (i === siblings.length - 1 ? " and " : ", ")}
                <Link className="oa-link" to={s.to}>
                  Salesforce consultants in {s.label}
                </Link>
              </span>
            ))}
            . Closer to our office:{" "}
            <Link className="oa-link" to="/services/salesforce-consultant-philadelphia">
              Philadelphia
            </Link>{" "}
            and{" "}
            <Link className="oa-link" to="/services/salesforce-consultant-chester-county">
              Chester County
            </Link>
            .
          </p>
        )}
        <RouteBoard groups={["cities"]} />
      </Section>

      {/* 13. Desk (CITY-4). */}
      <Desk
        heading="Start with a free one-week Salesforce health check"
        body={`An org nobody trusts, a migration that stalled or an integration that fails quietly: describe it, and we will tell you what we would look at first in your ${c.name} org.`}
        form={{
          topic: slug,
          topicLabel: `Salesforce consulting · ${c.name}`,
          heading: "Book a free health check",
          prompt: "What is your Salesforce doing wrong?",
          submitLabel: "Book a free health check",
        }}
      />
    </Layout>
  );
}
