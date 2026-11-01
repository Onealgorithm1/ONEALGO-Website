import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials, FAQ,
  DeskCTA, ServiceCards, HUB_SERVICE_CARDS, StageRail, StageUnits, SourcesDialog, Verify, PhotoCreditDialog,
  PhotoCreditsLine, type SfFaqItem, type Stage, type Readout, type SfSource, sfHeroAvifSrcset, SF_HERO_SIZES } from "../../components/sf";
import { HealthCheck } from "../../components/sf/illus";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_LISTING_ID, SF_PHONE, SF_PLATFORM_CERTS, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { SF_CITY_LINKS } from "../../data/salesforceShared";
import { SREENIVAS, SWAPNA } from "../../data/sfPeople";
import { SF_CITY_HEROES, sfCityFiles } from "../../data/sfCityHeroes";
import { SALESFORCE_CITIES } from "../../data/salesforceCities";
import { PLATES } from "../../data/plates/philadelphia";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, SF_HEALTH_CHECK_OFFER, createServiceSchema, createLocalBusinessSchema, createWebPageSchema,
} from "../../components/StructuredData";

/* /services/salesforce-consultant-philadelphia. Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf):
 * the approved prototype's rhythm (Louis 2026-10-23, "build the 23 pages this way") with the city-photo hero, one
 * staged scene (FIG. 1, the health-check list) and the rail; seo-completeness/structure-spec.md §7.3 for title,
 * meta, H1 and the twelve H2 strings (exact), §8-10 for the expert block, schema and links. Build notes:
 * onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/page-philadelphia.md.
 *
 * WHY THIS PAGE IS NOT THE CHESTER COUNTY OR PENNSYLVANIA PAGE (unchanged since 2026-09-01): the three are split
 * by BUYER, not by place name. Philadelphia (this page): already owns Salesforce, often has an in-house admin, the
 * org is not earning its keep; owns "what does a Salesforce consultant do", the admin question and the local
 * market data. Chester County: still choosing an edition. Pennsylvania: "is this partner real, how do I check?"
 * ⛔ No FAQ question repeats across the three (or the city pages).
 *
 * ⛔ WE ARE IN MALVERN, NOT PHILADELPHIA: every location line says Malvern, about 25 miles west of Center City.
 *    Visits (owner 2026-10-23 ~19:05): most work is remote; in-person sessions when the project calls for them,
 *    easiest across the Philadelphia region. Never promise visits as standard.
 * ⛔ PROOF, and only this: Salesforce's AppExchange record (16 / 53 / 38, tier "Select", read SF_VERIFIED_ON), the
 *    four delivered patterns with clients unnamed, Sreenivas (14 active) and Swapna (2) with their own badges. No
 *    client name, review, years figure, price, SLA or industry-to-delivery pairing beyond lending (spec D8).
 * ⛔ LINKS: in-site only in the body. Market sources live in the "Where these figures come from" pop-up as program
 *    pages (no LinkedIn query, no api.census.gov, no data endpoint); the one off-site control per record is inside
 *    its dialog. Houston is routed but not linked until its gate.
 * ⛔ HYDRATION: nothing here depends on the clock. The event line is dated ("listed … when read 21 October 2026"),
 *    so server and client markup match; refresh it with the city data. */

const PATH = "/services/salesforce-consultant-philadelphia";
const PAGE_URL = `https://onealgorithm.com${PATH}`;
const PAGE_UPDATED = "2026-11-01";
const TITLE = "Salesforce Consultant Philadelphia, PA | OneAlgorithm";
const DESCRIPTION =
  "Salesforce consultants for Philadelphia and Chester County companies, from a listed Consulting Partner in Malvern, PA. Free health check: (610) 890-9711.";
const PHOTO = SF_CITY_HEROES.philadelphia;
const FILES = sfCityFiles("philadelphia");
const OG_IMAGE = `https://onealgorithm.com${FILES.og}`;
const MAP = PLATES["philadelphia-region-map-malvern"];
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const MS = "/services/salesforce-managed-services";
const INT = "/services/salesforce-integration";
/* 2026-11-01 (SEO round 2): /services/salesforce-consultant-chester-county and /services/salesforce-consulting-partner-pennsylvania
 * 301 here (0 search demand, never crawled; this page already ranks #1 for "salesforce consultant chester county").
 * Chester County, Malvern and Pennsylvania are named where true: the office FAQ, the meta and the office unit. */
const HIRE = "/services/hire-salesforce-developers";

/* The fields this page reads from the generated city file. Assigning (not casting) makes tsc fail if the
   generator ever drops or renames one. */
type Figure = { value: number };
type PhlData = {
  name: string;
  jobsPulled: string;
  jobs: readonly { role: string; count: number }[];
  industries: readonly { code: string; label: string; establishments: number; employees: number }[];
  establishments: Figure;
  establishments2018: Figure;
  size100to499: Figure;
  size500plus: Figure;
  size500plus2018: Figure;
  population: Figure;
  population2019: Figure;
  sources: { cbp: string };
  msa: { name: string; code: string };
  wages: {
    period: string;
    pulled: string;
    page: string;
    analysts: { median: number; employment: number };
    developers: { median: number; employment: number };
  };
  community: { pulled: string; radiusKm: number; groups: readonly { name: string; city: string }[] };
  events: readonly { name: string; date: string }[];
};
const CITY: PhlData = SALESFORCE_CITIES.find((x) => x.slug === "philadelphia")!;

const n = (v: number) => v.toLocaleString("en-US");
const longDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const PULLED = longDate(CITY.jobsPulled); // "21 October 2026": LinkedIn, Census CBP/ACS and the event calendar
const WAGES_READ = longDate(CITY.wages.pulled); // "23 October 2026"
const roleCount = (r: string) => CITY.jobs.find((j) => j.role.endsWith(r))?.count ?? 0;
const METRO = CITY.msa.name.replace(/ Metro Area$/, ""); // "Philadelphia-Camden-Wilmington, PA-NJ-DE-MD"
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const listJoin = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/* LinkedIn role searches overlap, so their counts are shown side by side and never summed. */
const ROLES = [
  { key: "Consultant", does: "Designs how Salesforce should fit the business and leads the project." },
  { key: "Administrator", does: "Runs the org day to day: users, permissions, reports and small changes." },
  { key: "Architect", does: "Designs the data model, security and integrations across a large org." },
  { key: "Developer", does: "Builds what configuration cannot: Apex code, integrations and complex automation." },
].map((r) => ({ ...r, count: roleCount(r.key) })).sort((a, b) => b.count - a.count);
/** "247 consultant, 211 administrator, 185 architect and 132 developer", in the data's own order. */
const ROLES_LINE = listJoin(ROLES.map((r) => `${n(r.count)} ${r.key.toLowerCase()}`));

/* Where Salesforce work meets each of the metro's four largest employer groups. Sector context only; the one
   pairing with our delivered work is lending (spec D8). Keyed by NAICS code. */
/** Short names for the lede; a group the generator adds later falls back to its Census label. */
const SHORT: Record<string, string> = { "62": "health care", "54": "professional services", "52": "finance and insurance", "31-33": "manufacturing" };
const FIT: Record<string, string> = {
  "62": "Salesforce work here turns on access: who can see which records, enforced with permission sets and sharing rules.",
  "54": "Firms like these track clients, projects and proposals in Salesforce and need reports that agree across all three.",
  "52": "This is where we run ongoing Salesforce development for a lending company, every week since April 2026.",
  "31-33": "Manufacturers need Salesforce to agree with the ERP on accounts, orders and pricing.",
};

/* Every market figure names its source and read date here; nothing on the page links a data endpoint. */
const SOURCES: SfSource[] = [
  { name: "LinkedIn public job search", what: `Open roles for Salesforce consultant, administrator, architect and developer within 25 miles of ${CITY.name}, PA. The searches overlap, so the counts are never added together.`, read: `read ${PULLED}`, page: "https://www.linkedin.com/jobs/" },
  { name: "U.S. Census Bureau, County Business Patterns", what: `Business establishments by size and by industry in the ${METRO} metro (MSA ${CITY.msa.code}), 2023 and 2018.`, read: `read ${PULLED}`, page: CITY.sources.cbp },
  { name: "U.S. Census Bureau, American Community Survey", what: "Population of the same metro, 2024 and 2019.", read: `read ${PULLED}`, page: "https://www.census.gov/programs-surveys/acs" },
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics", what: `Computer systems analysts and software developers in the metro, ${CITY.wages.period}: employment and median salary. Salesforce roles have no federal job code of their own, so these are the closest official categories.`, read: `read ${WAGES_READ}`, page: CITY.wages.page },
  { name: "Trailblazer Community Groups", what: `Salesforce community groups within ${CITY.community.radiusKm} km of ${CITY.name} with an event listed since October 2025.`, read: `read ${longDate(CITY.community.pulled)}`, page: "https://trailblazercommunitygroups.com/" },
  { name: "Salesforce World Tour events", what: "The event calendar Salesforce publishes for its World Tour stops.", read: `read ${PULLED}`, page: "https://www.salesforce.com/events/world-tour/" },
];

const MARKET_READOUTS: Readout[] = [
  { value: CITY.establishments.value, label: "Business establishments in the metro, 2023", source: <>Census County Business Patterns · {n(CITY.establishments2018.value)} in 2018</> },
  { value: CITY.size500plus.value, label: "Establishments with 500 or more employees", source: <>Census CBP, 2023 · {n(CITY.size500plus2018.value)} in 2018</> },
  { value: CITY.wages.developers.employment, label: "Software developers employed in the metro", source: <>BLS, {CITY.wages.period} · median salary ${n(CITY.wages.developers.median)}</> },
];

/* The page's own four steps (facts: the page at ef1a8f0). Titles are short enough for the 1200-unit rail drawing. */
const STAGES: Stage[] = [
  { k: "s1", num: "01", title: "A free week in your org", sub: "health check · read-only user", line: "With a read-only user you create, we review licenses against use, data quality, manual work, access and integrations.",
    details: ["Licenses against actual use", "Data quality: duplicates, orphans, fields nobody fills", "What is still done by hand", "Who can see and change what", "Which integrations fail quietly"] },
  { k: "s2", num: "02", title: "A written list, ranked", sub: "what to fix first, and why", line: "What to fix first, in writing, with the reason for each item; the list is yours whether or not we do the work.",
    details: ["Every finding ranked by what to fix first", "The reason for each item, written down", "Yours to keep, whoever does the work"] },
  { k: "s3", num: "03", title: "You choose; we build", sub: "scoped in writing · with your admin", line: "Each fix is scoped in writing before work starts, built alongside your team and handed back to the people who run the org.",
    details: ["A written scope before any work starts", "Built alongside your admin, not around them", "Handed back to the people who run the org"] },
  { k: "s4", num: "04", title: "Ongoing development", sub: "weekly admin · hours reported", line: "If you want it, weekly administration and development, with hours reported every week.",
    details: ["Weekly administration and development", "Hours reported every week", "Terms set in the written proposal after the health check"] },
];

/* Four engagements, each linked to the page that fixes it (spec §7.3 row 2: titles + one line; detail in Go deeper). */
const PROBLEMS: { title: string; line: string; more: string; deep: string; link: { to: string; label: string } }[] = [
  { title: "An org that grew sideways", line: "Fields nobody fills, three ways to record the same thing, and reports leadership stopped opening.",
    more: "The health check maps what is there and ranks what to fix first, so the org matches how you work again.", deep: "how the health check sorts a sideways org",
    link: { to: HC, label: "Free one-week Salesforce health check" } },
  { title: "Working alongside your admin", line: "Your admin keeps the day-to-day; we take the Flow, permission and integration work they were never hired for.",
    more: "Specialist work such as Flow automation, permission design and integrations comes to us, and the org stays theirs.", deep: "how we work alongside your admin",
    link: { to: MS, label: "Salesforce managed services and development" } },
  { title: "The integration that fails quietly", line: "A sync between Salesforce and the ERP, finance system or warehouse that broke months ago and told nobody.",
    more: "We agree which system owns each record, repair the sync and give failures a log a named person reads.", deep: "how we repair an integration that fails quietly",
    link: { to: INT, label: "Salesforce integration services" } },
  { title: "A build somebody else left", line: "Inherited orgs are normal; you get a plain account of what is there, what to keep and what it costs you.",
    more: "We describe the org, not the last firm: what is there, what is worth keeping and what is costing you, then you decide.", deep: "how we take over an inherited org",
    link: { to: HC, label: "Start with the free health check" } },
];

/* Objection questions (H3) with the answers in Go deeper. The page's own three (ef1a8f0); none repeats a FAQ. */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "We are not handing a consultant the keys to our org.", a: <>You do not have to. The health check starts with a read-only user you create, and you decide what we work on once the list is in your hands.</> },
  { q: "What does it cost after the free week?", a: <>Fixes are scoped in writing first, and the terms are set in the written proposal. <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link></> },
];

const PHL_GROUPS = CITY.community.groups.filter((g) => g.city.startsWith(`${CITY.name},`)).map((g) => g.name.replace(/^Salesforce /, "").replace(/, .*$/, "").replace(/ Group$/, ""));
const NEAR_TOWNS = [...new Set(CITY.community.groups.filter((g) => !g.city.startsWith(`${CITY.name},`)).map((g) => g.city.replace(/, [A-Z]{2}$/, "")))];
const CITY_EVENTS = CITY.events.filter((e) => e.name.includes(CITY.name));

/* FAQ: the Philadelphia question bank minus #1, which is now the first H2 (HDG-08). Verbatim FAQPage schema. */
const FAQS: SfFaqItem[] = [
  {
    q: "Who are the best Salesforce consultants in Philadelphia?",
    a: `The ones whose record you can check before you call. Open the firm's AppExchange listing, where Salesforce publishes its certified people and certifications; ask what it has delivered that looks like your problem; and ask who will do the work. Ours is listing ${SF_LISTING_ID}: ${SF_CERTIFIED_PEOPLE} certified people and ${SF_CERTIFICATIONS} certifications on Salesforce's record, and Sreenivas Amirisetti leads our Salesforce practice.`,
    link: { to: "#record", label: "How to check a Salesforce partner" },
  },
  {
    q: "Which Salesforce certifications does your team hold?",
    a: `Salesforce's AppExchange record lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications (read ${SF_VERIFIED_LABEL}). ${SREENIVAS.statement} ${SWAPNA.statement}`,
    link: { to: "#record", label: "Who leads your Salesforce work" },
  },
  {
    q: "We already have a Salesforce admin. What would you add?",
    a: `Specialist depth, not a replacement. Your admin keeps the org running day to day. We take the Platform work that needs more time or a different skill: Flow that replaces manual steps, permission sets doing a profile's job, integrations that fail silently. Salesforce lists ${SF_CERTIFICATIONS} certifications for us, and your admin keeps ownership of the org.`,
    link: { to: MS, label: "Salesforce managed services and development" },
  },
  {
    q: "What Salesforce integrations have you built?",
    a: "An SAP-to-Salesforce sync, and migrations that moved QuickBase and Kissflow systems into Salesforce. On every integration we agree which system owns each record before anything is built, so both sides report the same numbers and a failed record lands in a log a named person reads.",
    link: { to: INT, label: "Salesforce integration services" },
  },
  {
    q: "Is your office in Philadelphia?",
    a: "Our office is at 625 Swedesford Rd, Unit B, Malvern, PA 19355, about 25 miles west of Center City. Salesforce work happens inside your org, so most of it runs remotely from the first day; in-person sessions happen when the project calls for them, and the Philadelphia region is where they are easiest.",
  },
  {
    q: "Do you work with Chester County and other Pennsylvania companies?",
    a: "Yes. Our office is in Malvern, in Chester County, so Chester County companies are the shortest drive of all. We take on Salesforce work across Pennsylvania and the rest of the US remotely, inside your org, with in-person sessions when the project calls for them.",
  },
  {
    q: "Do you work with companies on the Main Line, in King of Prussia and in South Jersey?",
    a: "Yes. The Main Line and King of Prussia are a short drive from our Malvern office. For South Jersey companies the work runs the same way: inside the org, remotely, with in-person sessions when the project calls for them.",
  },
  {
    q: "What does Salesforce talent cost in Philadelphia?",
    a: `Salesforce roles have no federal job code of their own, so the closest official figures are computer systems analysts, at a median salary of $${n(CITY.wages.analysts.median)}, and software developers, at $${n(CITY.wages.developers.median)}, in the Philadelphia metro (BLS, ${CITY.wages.period}; salary only, before benefits). A partner engagement is scoped and priced in writing before work starts instead.`,
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "Is there a Salesforce user community in Philadelphia?",
    a: `Yes. ${CITY.community.groups.length} Salesforce Trailblazer Community Groups within ${CITY.community.radiusKm} km of ${CITY.name} have listed an event since October 2025: the ${listJoin(PHL_GROUPS)} groups in the city, and groups in ${listJoin(NEAR_TOWNS)}.${
      CITY_EVENTS.length ? ` When we read Salesforce's calendar on ${PULLED}, it listed ${listJoin(CITY_EVENTS.map((e) => `${e.name} for ${longDate(e.date)}`))}.` : ""
    }`,
  },
];

const CITY_NAV = SF_CITY_LINKS.filter((c) => !c.to.endsWith("-houston"));

export default function SalesforceConsultantPhiladelphia() {
  useSEO({
    // Query first, brand last; 53 characters (structure-spec §7.3: keep).
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    ogTitle: "Salesforce consultants for Philadelphia companies | OneAlgorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: PHOTO.alt,
    twitterTitle: "Salesforce consultants for Philadelphia companies | OneAlgorithm",
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
      {/* Spec §9 (Cities + PHL): Service with areaServed City (containedInPlace the metro), provider #org, the free
          health check as an Offer; WebPage with primaryImageOfPage = og:image; the Malvern ProfessionalService.
          BreadcrumbList (SfPage), Person (PersonCredentials) and FAQPage (FAQ) are emitted by the kit. */}
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting in Philadelphia, Pennsylvania",
          "Salesforce consulting for companies in Philadelphia from a listed AppExchange Consulting Partner in Malvern, Pennsylvania: Flow automation, permission and integration work, data migration, ongoing Salesforce development and Marketing Cloud support, starting with a free one-week Salesforce health check.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          {
            areaServed: { "@type": "City", name: CITY.name, containedInPlace: { "@type": "Place", name: CITY.msa.name } },
            offers: SF_HEALTH_CHECK_OFFER,
            image: OG_IMAGE,
          },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      {/* className: page-local stopgap for kit gaps filed in build-v2/requests-philadelphia.md (the hero <picture> does
          not fill the 4:3 photo frame on phones; below 1024px the photo sits flush under the buttons). Remove once
          sf.css carries the fix. */}
      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Philadelphia" }]} className="[&_.sf-photo_picture]:block [&_.sf-photo_picture]:h-full max-lg:[&_.sf-hero-photo_.sf-photo]:!mt-8">
        {/* 1 HERO: the licensed Center City photograph is the LCP (eager, preloaded, never animated); the credit chip
            opens #ev-photo-credit. Hero button → #start (city pages keep the action on the page, spec §10.1). */}
        <SFHero
          kicker={<>Select Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce consultants for Philadelphia companies"
          lede="We fix, extend and run Salesforce for Philadelphia companies from our Malvern office, starting with a free one-week health check of your org."
          primary={{ href: "#start", label: "Book a free health check" }}
          proof
          photo={PHOTO}
        />

        {/* 2 ANSWER UNIT + FIG. 1 (the staged health-check list) beside it, 7/5. Spec §7.3 row 1. */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What does a Salesforce consultant actually do?"
            lede="A Salesforce consultant works out how your business really runs, then configures Salesforce to match and trains your team on it."
            leadIn="What we do:"
            lead="For a company that already owns Salesforce, we clean the data, hand manual steps to Flow and make your systems agree."
            points={[
              "Map how your team really works, workarounds included",
              "Configure Salesforce to match, with Flow for the steps done by hand",
              "Hand over an org your own people can run",
            ]}
          >
            <GoDeeper label="the full answer, why it matters and what it costs">
              <p className="sf-rule">
                A Salesforce consultant works out how your business actually runs, including the workarounds nobody wrote down, then configures Salesforce around that process and hands over an org your own people can run. For a company that already owns Salesforce, the job is usually cleaner data, automation in place of manual steps, and systems that agree.
              </p>
              <p><span className="sf-lead-in">Why it matters:</span> An org that does not match how you work gets worked around: the real data moves to spreadsheets, reports stop being trusted and licenses go unused.</p>
              <p><span className="sf-lead-in">What it costs:</span> The health check is free. Fixes are scoped in writing first; the cost guide shows the market's published ranges.</p>
              <p><span className="sf-lead-in">After the work:</span> Training for admins and everyday users, then weekly administration and development if you want it.</p>
              <div className="sf-links">
                <Link className="sf-link" to={HC}>Free one-week Salesforce health check</Link>
                <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <HealthCheck fig={1} className="sf-c5" />
        </SmartSection>

        {/* 3 THE NIGHT BAND: four engagements as H3 units, each linked to the page that fixes it. Spec §7.3 row 2. */}
        <SmartSection
          id="problems"
          tone="night"
          grid
          heading={{
            id: "h-problems",
            kicker: "Already on Salesforce",
            title: "Four Salesforce problems we fix for Philadelphia companies",
            lede: "Rarely a fresh install: usually an org with years of history in it and a team that needs it working this quarter.",
          }}
        >
          {PROBLEMS.map((p, i) => (
            <SmartUnit key={p.title} level={3} className="sf-c3" delay={(i % 4) * 0.08} title={p.title} lede={p.line} measure={false}>
              <GoDeeper label={p.deep}>
                <p className="sf-rule">{p.more}</p>
                <div className="sf-links"><Link className="sf-link" to={p.link.to}>{p.link.label}</Link></div>
              </GoDeeper>
            </SmartUnit>
          ))}
        </SmartSection>

        {/* 4 HOW IT RUNS: FIG. 2 (the scrubbed rail) + the four steps wired to their stations. Spec §7.3 row 8. */}
        <SmartSection
          id="how"
          heading={{
            id: "h-how",
            title: "How a Philadelphia Salesforce engagement runs",
            lede: "A Philadelphia engagement runs in four steps, from a free week in your org to ongoing development if you want it.",
          }}
        >
          <StageRail
            fig={2}
            stations={STAGES}
            className="sf-rail-top"
            title="Staged diagram of a four-step Salesforce engagement for a Philadelphia company"
            desc="A rail runs through four stations: a free week in your org, a written list ranked by what to fix first, the fixes you choose built with your admin, and ongoing development."
            stamp="How a Philadelphia engagement runs"
            caption="The four steps in the order they run: one free week with read-only access, a written list ranked by what to fix first, the fixes you choose, and ongoing development if you want it."
          />
          <StageUnits items={STAGES} />
        </SmartSection>

        {/* 5 HIRE, CONTRACT OR PARTNER: the answer unit + the three-way table with Philadelphia job data. Spec §7.3 row 3. */}
        <SmartSection id="hire" tone="surface" grid labelledBy="h-hire">
          <SmartUnit
            className="sf-c5"
            headingId="h-hire"
            title="Hire, contract or partner in Philadelphia?"
            lede={`LinkedIn showed ${n(roleCount("Consultant"))} Salesforce consultant openings within 25 miles of ${CITY.name} on ${PULLED}; you can hire, contract or bring in a partner.`}
            lead="Every employer here is hiring the same people, so a partner covers a migration, an integration or a clean-up without a recruiting cycle."
            measure={false}
          >
            <GoDeeper label="salaries behind the table, and people for your team">
              <p className="sf-rule">
                Salesforce roles have no federal job code of their own. The closest official categories in the metro are computer systems analysts ({n(CITY.wages.analysts.employment)} employed, median ${n(CITY.wages.analysts.median)}) and software developers ({n(CITY.wages.developers.employment)} employed, median ${n(CITY.wages.developers.median)}), BLS, {CITY.wages.period}, salary only.
              </p>
              <p>Need people inside your team rather than a project? Staff augmentation adds Salesforce people for as long as you need them.</p>
              <div className="sf-links">
                <Link className="sf-link" to={HIRE}>Salesforce staff augmentation</Link>
                <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule className="sf-c7" delay={0.08} aria-labelledby="h-ways">
            <h3 className="sf-h3" id="h-ways">Three ways to get the work done</h3>
            <table className="mt-5 w-full border-collapse text-left text-[16px] leading-[1.5]" role="table">
              <caption className="sr-only">Hire, contract or partner for Salesforce work in Philadelphia: the market, what it costs to start and what you have at the end</caption>
              <thead className="max-md:sr-only">
                <tr role="row">
                  <th role="columnheader" scope="col" className="w-[19%] py-3 pr-4 align-bottom"><span className="sr-only">Way</span></th>
                  {["The market you are in", "What it costs to start", "What you have at the end"].map((h) => (
                    <th key={h} role="columnheader" scope="col" className="sf-mono py-3 pr-4 align-bottom font-medium uppercase !tracking-[0.08em] !text-[12px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { way: "Full-time hire", cells: [
                    `${ROLES_LINE} openings compete for the same people.`,
                    `Salary alone: BLS medians of $${n(CITY.wages.analysts.median)} for systems analysts and $${n(CITY.wages.developers.median)} for developers, before benefits.`,
                    "A person on staff who knows your org, for as long as they stay.",
                  ] },
                  { way: "Contractor", cells: [
                    "The same openings, on shorter terms.",
                    "A day or hourly rate set by each contractor.",
                    "Hours of work against a brief you write and manage.",
                  ] },
                  { way: "Salesforce partner", own: true, cells: [
                    "A Consulting Partner team already staffed, outside the hiring race.",
                    "A written scope and price before work starts, after a free one-week health check.",
                    "The finished work and a written handover your own people can run.",
                  ] },
                ].map((r) => (
                  <tr key={r.way} role="row" className={`block border-t border-sf-hairlineStrong py-4 md:table-row md:py-0${r.own ? " bg-sf-tint px-3 md:px-0" : ""}`}>
                    <th role="rowheader" scope="row" className={`block pb-2 font-semibold text-sf-ink md:table-cell md:py-4 md:pr-4 md:align-top${r.own ? " md:pl-3" : ""}`}>{r.way}</th>
                    {r.cells.map((c, i) => (
                      <td key={i} role="cell" className="block pb-2 text-sf-ink2 md:table-cell md:py-4 md:pr-4 md:align-top">
                        <span className="sf-mono block md:hidden" aria-hidden="true">{["The market you are in", "What it costs to start", "What you have at the end"][i]}</span>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sf-mono" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              LinkedIn, read {PULLED}; BLS, {CITY.wages.period}, read {WAGES_READ} · <Verify id="market">Where these figures come from</Verify>
            </p>
          </LedgerRule>
        </SmartSection>

        {/* 6 MARKET: three readouts (count up once below the fold) + three H3 units; every source in one pop-up. Spec §7.3 row 7. */}
        <SmartSection
          id="market"
          heading={{
            id: "h-market",
            title: "Philadelphia's Salesforce market in public numbers",
            lede: "Figures from LinkedIn, the US Census Bureau and the Bureau of Labor Statistics, each named with its source and the date we read it.",
          }}
        >
          <Readouts items={MARKET_READOUTS} withEvidence={false} />
          <p className="sf-mono" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
            {METRO} metro (MSA {CITY.msa.code}) · Census and LinkedIn read {PULLED}; BLS read {WAGES_READ} · <Verify id="market">Where these figures come from</Verify>
          </p>
          <div className="sf-grid" style={{ marginTop: 48 }}>
            <SmartUnit
              level={3}
              className="sf-c4"
              title="Every employer here is hiring the same people"
              lede={`LinkedIn showed ${ROLES_LINE} openings within 25 miles on ${PULLED}.`}
              measure={false}
            >
              <GoDeeper label="the four role searches and what each role does">
                <table>
                  <thead><tr><th scope="col">Role</th><th scope="col">Openings</th><th scope="col">What the role does</th></tr></thead>
                  <tbody>
                    {ROLES.map((r) => (
                      <tr key={r.key}><th scope="row">Salesforce {r.key.toLowerCase()}</th><td className="sf-mono">{n(r.count)}</td><td>{r.does}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p>The role searches overlap, so the counts are not added together. For a migration, an integration or an org clean-up, a partner covers the project without a new hire.</p>
              </GoDeeper>
            </SmartUnit>
            <SmartUnit
              level={3}
              className="sf-c4"
              delay={0.08}
              title="Where Salesforce fits Philadelphia's largest employers"
              lede={`By employees, the metro's ${CITY.industries.length === 4 ? "four" : CITY.industries.length} largest employer groups are ${CITY.industries.map((i, k, a) => `${k === a.length - 1 ? "and " : ""}${SHORT[i.code] ?? i.label}`).join(", ")}.`}
              measure={false}
            >
              <GoDeeper label="the four employer groups and the Salesforce work each needs">
                <ul className="sf-points" style={{ marginTop: 0 }}>
                  {CITY.industries.map((i) => (
                    <li key={i.code}>
                      <b>{cap(i.label)}</b>, {n(i.employees)} employees in {n(i.establishments)} establishments. {FIT[i.code] ?? ""}
                    </li>
                  ))}
                </ul>
              </GoDeeper>
            </SmartUnit>
            <SmartUnit
              level={3}
              className="sf-c4"
              delay={0.16}
              title="Business and Salesforce data for the Philadelphia metro"
              lede={`The metro spans Pennsylvania, New Jersey, Delaware and Maryland and counted ${n(CITY.population.value)} residents in 2024.`}
              measure={false}
            >
              <GoDeeper label="the full figures table, with sources">
                <table>
                  <tbody>
                    <tr><th scope="row">Business establishments, 2023</th><td>{n(CITY.establishments.value)} ({n(CITY.establishments2018.value)} in 2018) · Census CBP</td></tr>
                    <tr><th scope="row">With 500 or more employees</th><td>{n(CITY.size500plus.value)} ({n(CITY.size500plus2018.value)} in 2018) · Census CBP</td></tr>
                    <tr><th scope="row">With 100 to 499 employees</th><td>{n(CITY.size100to499.value)} · Census CBP</td></tr>
                    <tr><th scope="row">Population, 2024</th><td>{n(CITY.population.value)} ({n(CITY.population2019.value)} in 2019) · Census ACS</td></tr>
                    <tr><th scope="row">Software developers</th><td>{n(CITY.wages.developers.employment)} employed · median ${n(CITY.wages.developers.median)} · BLS</td></tr>
                    <tr><th scope="row">Computer systems analysts</th><td>{n(CITY.wages.analysts.employment)} employed · median ${n(CITY.wages.analysts.median)} · BLS</td></tr>
                  </tbody>
                </table>
                <p>Size classes are the sum of two Census bands. BLS has no Salesforce job code, so analysts and developers are the closest official categories.</p>
              </GoDeeper>
            </SmartUnit>
          </div>
          <SourcesDialog id="market" sources={SOURCES} />
        </SmartSection>

        {/* 7 THE RECORD: delivered work (H2 + four H3 rows), who leads the work (H3, badges), Salesforce's record (readouts
            + the AppExchange dialog the hero's Verify opens). Spec §7.3 row 4. */}
        <SmartSection id="record" tone="surface" grid labelledBy="h-delivered">
          <div className="sf-c7">
          <SmartUnit
            headingId="h-delivered"
            title="Salesforce work we have delivered"
            lede="We have delivered Salesforce development, an SAP sync, QuickBase and Kissflow migrations and Marketing Cloud support; client names stay private."
          >
            <DeliveredLedger />
            <p className="sf-mono" style={{ marginTop: 10 }}>Industries: lending (current engagement)</p>
            <GoDeeper label="the competency rows and how to check any partner">
              <p className="sf-rule">Salesforce's listing breaks the {SF_CERTIFICATIONS} certifications down by competency, including 7 on Agentforce (read {SF_VERIFIED_LABEL}). Open any partner's listing and read the same box before you hire them; ask who will do your work and look them up on Trailblazer.</p>
            </GoDeeper>
          </SmartUnit>
            <p className="sf-kicker" style={{ marginTop: 56 }}>Salesforce's AppExchange record of us</p>
            <Readouts />
          </div>
          {/* lg-only side rule (Tailwind) instead of .sf-lead-block, whose phone rule zeroes the unit's padding-top
              and lands the H3 on the ledger rule (filed in requests-philadelphia.md). */}
          <LedgerRule as="aside" className="sf-c5 lg:border-l lg:border-sf-hairlineStrong lg:pl-7" delay={0.08} aria-labelledby="h-lead">
            <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
            <PersonCredentials />
            <p style={{ marginTop: 20 }}>You work directly with the people doing the work, from the first call to the last fix.</p>
          </LedgerRule>
        </SmartSection>

        {/* 8 WHERE WE WORK: the office unit, the map (FIG. 3) and the New Jersey unit, one night band. Spec §7.3 rows 5-6. */}
        <SmartSection id="office" tone="night" grid labelledBy="h-office">
          <SmartUnit
            className="lg:[grid-column:1/6]"
            headingId="h-office"
            title="Our Malvern office, 25 miles from Center City"
            lede="Our office is at 625 Swedesford Rd, Unit B, Malvern, PA 19355, in Chester County, about 25 miles by road west of Center City."
            leadIn="The bottom line:"
            lead="Most Salesforce work runs remotely inside your org; in-person sessions happen when the project calls for them, easiest across the Philadelphia region."
            measure={false}
            points={[
              "Work starts inside your org on day one of the health check",
              "Philadelphia, Montgomery, Delaware, Bucks and Chester counties, northern Delaware and South Jersey",
            ]}
          >
            <GoDeeper label="how the work runs from Malvern">
              <p className="sf-rule">Salesforce work happens inside your org, so it runs remotely from the first day of the health check, with the people doing the work. In-person sessions happen when the project calls for them, and the Philadelphia region is where they are easiest.</p>
            </GoDeeper>
          </SmartUnit>
          <figure className="sf-stage lg:[grid-column:6/13] lg:[grid-row:1/3] lg:self-start" aria-labelledby="fig3-cap">
            <div className="sf-stage-in">
              <picture>
                <source media="(max-width: 639px)" srcSet={MAP.mSrc} width={MAP.mw} height={MAP.mh} />
                <img src={MAP.src} alt={MAP.alt} width={MAP.w} height={MAP.h} loading="lazy" decoding="async" style={{ width: "100%", height: "auto" }} />
              </picture>
            </div>
            <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
            <div className="stamp" aria-hidden="true"><span>FIG. 3 · Map · Philadelphia region · US Census boundaries 2023, public domain</span><span>OneAlgorithm</span></div>
            <figcaption id="fig3-cap" style={{ color: "var(--n-ink3)", padding: "10px 12px 12px" }}>
              Our Malvern office sits in Chester County, about 25 miles by road west of Center City. County outlines: US Census Bureau cartographic boundaries, 2023.
            </figcaption>
          </figure>
          <SmartUnit
            className="lg:[grid-column:1/6]"
            headingId="h-nj"
            title="Salesforce consultants for New Jersey companies"
            lede="We take on Salesforce work for South Jersey and New Jersey companies from Malvern, about 25 miles from Center City."
            leadIn="What we do:"
            lead="We run the work the same way across the river: inside your org, remotely, with in-person sessions when the project calls for them."
            measure={false}
          >
            <GoDeeper label="the Main Line, King of Prussia and South Jersey">
              <p className="sf-rule">Closer in, the Main Line and King of Prussia are a short drive from our Malvern office. On the map, Camden, Gloucester and Burlington counties sit across the river from Center City.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 9 SERVICES: the seven service cards + the buyer routing (Chester County, Pennsylvania) and the city nav. Spec §7.3 row 11. */}
        <SmartSection
          id="services"
          heading={{
            id: "h-services",
            title: "Salesforce services for Philadelphia companies",
            lede: "Seven Salesforce services, from a free one-week health check to people working inside your team.",
          }}
        >
          <ServiceCards items={HUB_SERVICE_CARDS} />
          <nav aria-label="More Salesforce pages" style={{ marginTop: 40 }}>
            <p className="sf-kicker">Still deciding</p>
            <ul className="sf-links" style={{ marginTop: 8 }}>
              <li><Link className="sf-link" to="/services/salesforce">Salesforce consulting services</Link></li>
              <li><Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link></li>
              <li><Link className="sf-link" to={HIRE}>Hire Salesforce developers for your team</Link></li>
              <li><Link className="sf-link" to="/services/web-design-philadelphia">Web design for Philadelphia companies</Link></li>
            </ul>
            <p className="sf-kicker" style={{ marginTop: 24 }}>Salesforce consulting in other cities</p>
            <ul className="sf-links" style={{ marginTop: 8 }}>
              {CITY_NAV.map((c) => (
                <li key={c.to}><Link className="sf-link" to={c.to}>Salesforce consultants in {c.label}</Link></li>
              ))}
            </ul>
          </nav>
        </SmartSection>

        {/* 10 CONCERNS: objection questions as H3, answers in Go deeper. Spec §7.3 row 9. */}
        <SmartSection
          id="concerns"
          tone="surface"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before hiring a Philadelphia Salesforce consultant",
            lede: "Three questions Philadelphia buyers raise before the first call, each with the direct answer.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <LedgerRule as="article" key={c.q} className="sf-c4" delay={i * 0.08}>
              <h3 className="sf-h3">{c.q}</h3>
              <GoDeeper label={c.q} title="The answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 11 DESK: the one form (#start). Spec §7.3 row 12, H2 exact (the kit's default). */}
        <DeskCTA form={{ topic: "philadelphia", topicLabel: "Salesforce consulting · Philadelphia", heading: "Book a free health check", prompt: "What is your Salesforce doing wrong?", submitLabel: "Book a free health check" }} />

        {/* 12 FAQ: questions visible, answers in the HTML behind native disclosures. Spec §7.3 row 10. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce consulting in Philadelphia: questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>
        <PhotoCreditsLine photo={PHOTO} />
      </SfPage>
    </Layout>
  );
}
