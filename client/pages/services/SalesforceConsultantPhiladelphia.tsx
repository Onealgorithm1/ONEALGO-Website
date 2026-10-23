import { Link } from "react-router-dom";
import { ClipboardCheck, Plug, Users, Workflow } from "lucide-react";
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
  AnswerBand,
  DataTable,
  DeliveredLedger,
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
import { PLATES } from "../../data/plates/philadelphia";
import {
  SF_APPEXCHANGE_URL,
  SF_CERTIFICATIONS,
  SF_CERTIFIED_PEOPLE,
  SF_LISTING_ID,
  SF_PHONE,
  SF_PLATFORM_CERTS,
  SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";
import { SALESFORCE_CITIES } from "../../data/salesforceCities";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  SF_HEALTH_CHECK_OFFER,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce consultants for Philadelphia companies. Rebuilt 2026-10-23 on the
 * Salesforce plate system: design-spec.md §3 PHL and §5 PHL, plus the binding
 * wide-layout and voice addenda (onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/).
 *
 * WHY THIS PAGE IS NOT THE CHESTER COUNTY OR PENNSYLVANIA PAGE (unchanged since
 * 2026-09-01): the three are split by BUYER, not by place name, so they are not
 * doorway pages.
 *   - Philadelphia (this page): already owns Salesforce, often has an in-house
 *     admin, and the org is not earning its keep. Owns "what does a Salesforce
 *     consultant do", the admin question, the local market data.
 *   - Chester County: still choosing an edition; owns licence cost, meeting in
 *     person, moving off spreadsheets/QuickBase, support after set-up.
 *   - Pennsylvania: "is this partner real, and how would I check?"
 * ⛔ No FAQ question repeats across the three (or across the city pages). Check
 *    all of them before adding one.
 *
 * ⛔ WE ARE IN MALVERN, NOT PHILADELPHIA. Every location line says Malvern,
 *    about 25 miles west of Center City (the same figure as
 *    /services/web-design-philadelphia; ~23 miles straight-line from the
 *    LocalBusiness geo to City Hall, ~25 by road via US-202 and I-76).
 * ⛔ HONESTY: proof is only the allowed set — the AppExchange record
 *    (SF_* constants), the four unnamed delivery patterns (SF_DELIVERED), and
 *    Sreenivas Amirisetti's approved sentence + Trailblazer link. No client
 *    names, no reviews, no invented numbers. Sales Cloud / Service Cloud
 *    delivery is owner-gated (PHL-9), so those names are not claimed here.
 *    Market figures come from client/data/salesforceCities.ts (generated, never
 *    typed); LinkedIn role searches overlap, so their counts are never summed.
 * ⛔ VOICE: no deficit lines in visible copy. The old "We are not a Center City
 *    firm" / "No, and we would rather say so" framing is gone; the facts it
 *    carried (Malvern, 25 miles, in person when needed) are stated as facts.
 * ⛔ NO TOWN LISTS: one coverage sentence (PHL-13), never a block of places.
 */

const PATH = "/services/salesforce-consultant-philadelphia";
const PAGE_URL = `https://onealgorithm.com${PATH}`;
const PAGE_UPDATED = "2026-10-23";
const TITLE = "Salesforce Consultant Philadelphia, PA | OneAlgorithm";
const DESCRIPTION =
  "Salesforce consultants for Philadelphia companies, from a listed Consulting Partner in Malvern. Free one-week health check. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og-salesforce-philadelphia.jpg";
const IMAGE_1600 = "https://onealgorithm.com/media/salesforce/philadelphia-region-map-malvern-1600x900.jpg";
const TRAILBLAZER = "https://www.salesforce.com/trailblazer/samirisetti";
const MAP = PLATES["philadelphia-region-map-malvern"];

/* The fields this page reads from the generated city file. Assigning (not
   casting) makes tsc fail if the generator ever drops or renames one. */
type Figure = { value: number };
type PhlData = {
  name: string;
  jobsPulled: string;
  jobs: readonly { role: string; count: number; url: string }[];
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
  community: { pulled: string; radiusKm: number; groups: readonly { name: string; url: string }[] };
  events: readonly { name: string; date: string; url: string }[];
  salesforceOffice: string | null;
};
const CITY: PhlData = SALESFORCE_CITIES.find((x) => x.slug === "philadelphia")!;

const n = (v: number) => v.toLocaleString("en-US");
const longDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
const roleKey = (role: string) => role.replace(/^Salesforce /, "").toLowerCase(); // = scripts/plates/philadelphia.mjs
const roleCount = (r: string) => CITY.jobs.find((j) => j.role.endsWith(r))?.count ?? 0;
const ROLES = [...CITY.jobs].sort((a, b) => b.count - a.count);
const PULLED = longDate(CITY.jobsPulled);
const STAMP_DATE = new Date(`${CITY.jobsPulled}T12:00:00Z`)
  .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
  .toUpperCase(); // "21 OCT 2026"

/* ----------------------------- copy ---------------------------------- */

/* PHL-1: each card links to the page that fixes it (and turns on the card hover). */
const PROBLEMS = [
  {
    icon: Workflow,
    title: "An org that grew sideways",
    body: "Fields nobody fills, three ways to record the same thing, reports leadership stopped opening. The health check maps what is there and ranks what to fix first, so the org matches how you work again.",
    to: "/services/salesforce-health-check",
  },
  {
    icon: Users,
    title: "Working alongside your admin",
    body: "Your admin keeps the day-to-day. We take the work that needs a specialism they were never hired for, such as Flow automation, permission design and integrations, and the org stays theirs.",
    to: "/services/salesforce-managed-services",
  },
  {
    icon: Plug,
    title: "The integration that fails quietly",
    body: "A sync between Salesforce and the ERP, the finance system or the warehouse that broke months ago and told nobody. We agree which system owns each record, repair the sync and give failures a log a named person reads.",
    to: "/services/salesforce-integration",
  },
  {
    icon: ClipboardCheck,
    title: "A build somebody else left",
    body: "Inherited orgs are normal, and we do not editorialise about the last firm. You get a plain account of what is there, what is worth keeping and what is costing you, then you decide.",
    to: "/services/salesforce-health-check",
  },
];

/* Where Salesforce work meets each of Philadelphia's four largest employer
   groups. Only allowed facts: lending development, the SAP sync, or a plain
   statement of what the work involves. Keyed by NAICS code; a group the
   generator adds later without a line here simply shows its numbers. */
const FIT: Record<string, string> = {
  "62": "Salesforce work here turns on access: who can see which records, enforced with permission sets and sharing rules.",
  "54": "Firms like these track clients, projects and proposals in Salesforce and need reports that agree across all three.",
  "52": "This is where we run ongoing Salesforce development for a lending company, every week since April 2026.",
  "31-33": "Manufacturers need Salesforce to agree with the ERP on accounts, orders and pricing. We have built an SAP-to-Salesforce sync.",
};

/* Keys match the nodes and wire in PHL-F1 (scripts/plates/philadelphia.mjs). */
const OFFICE_ROWS = [
  { k: "office", tag: "Office", text: "Swedesford Road, Malvern, in Chester County" },
  { k: "route", tag: "To Center City", text: "About 25 miles by road" },
  { k: "center", tag: "In the city", text: "We come in when a decision is better made across a table" },
];

const STEPS = [
  {
    title: "A free one-week health check",
    body: "With a read-only user you create, we review licences against actual use, data quality, what is still done by hand, who can see what, and which integrations fail quietly.",
    to: "/services/salesforce-health-check",
  },
  {
    title: "A written list, ranked",
    body: "What to fix first, in writing, with the reason for each item. The list is yours whether or not we do the work.",
  },
  {
    title: "You choose; we build with your admin",
    body: "Each fix is scoped in writing before work starts, built alongside your team, and handed back to the people who run the org.",
  },
  {
    title: "Ongoing development, if you want it",
    body: "Weekly administration and development, with hours reported every week.",
    to: "/services/salesforce-managed-services",
  },
];

/* Not in FAQPage; none repeats a FAQ question below. Existing site wording. */
const OBJECTIONS = [
  SF_OBJECTIONS.pitch,
  {
    q: "We are not handing a consultant the keys to our org.",
    a: "You do not have to. The health check starts with a read-only user you create, and you decide what we work on once the list is in your hands.",
  },
  SF_OBJECTIONS.cost,
];

/* The AnswerBand question, moved up from the FAQ (spec §5 PHL-2) and kept in
   FAQPage. "What does a Salesforce consultant do?" is a live People Also Ask
   question (observed 2026-08-31 and again in the 2026-10-23 question bank). */
const ANSWER: SfFaq = {
  q: "What does a Salesforce consultant actually do?",
  a: "A Salesforce consultant works out how your business actually runs, including the workarounds nobody wrote down, then configures Salesforce around that process and hands over an org your own people can run. For a company that already owns Salesforce, the job is usually cleaner data, automation in place of manual steps, and systems that agree.",
};

const today = new Date().toISOString().slice(0, 10);
/* Generated from data so a past event drops out on its own (PHL-7c). Only
   events in Philadelphia itself; regional ones belong to other pages. */
const upcoming = CITY.events.filter((e) => e.date.slice(0, 10) >= today && e.name.includes(CITY.name));
const groupNames = CITY.community.groups.map((g) => g.name.replace(/^Salesforce /, ""));
const listJoin = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

const FAQS: SfFaq[] = [
  {
    q: "Who are the best Salesforce consultants in Philadelphia?",
    a: `The ones whose record you can check before you call. Look up the firm's AppExchange listing, where Salesforce publishes its certified people and certifications; ask what it has delivered that looks like your problem; and ask who will do the work. Ours: listing ${SF_LISTING_ID}, ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications on Salesforce's record, an SAP-to-Salesforce sync and QuickBase and Kissflow migrations delivered, and our Salesforce practice led by Sreenivas Amirisetti.`,
    link: { to: "/services/salesforce-consulting-partner-pennsylvania", label: "How to check any Salesforce partner" },
  },
  {
    q: "Which Salesforce certifications does your team hold?",
    a: `Salesforce's AppExchange record lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications, ${SF_PLATFORM_CERTS} of them on the Platform competency (read ${SF_VERIFIED_LABEL}). Sreenivas Amirisetti leads our Salesforce practice. He holds Salesforce certifications from Administrator to Application Architect and earned his first in 2014.`,
  },
  {
    q: "We already have a Salesforce admin. What would you add?",
    a: `Specialist depth, not a replacement. Your admin keeps the org running day to day. We take the Platform work that needs more time or a different skill: Flow that replaces manual steps, permission sets doing a profile's job, integrations that fail silently. ${SF_PLATFORM_CERTS} of our ${SF_CERTIFICATIONS} Salesforce certifications are on the Platform competency, and your admin keeps ownership of the org.`,
    link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" },
  },
  {
    q: "What Salesforce integrations have you built?",
    a: "An SAP-to-Salesforce sync, and migrations that moved QuickBase and Kissflow systems into Salesforce. On every integration we agree which system owns each record before anything is built, so both sides report the same numbers and a failed record lands in a log a named person reads.",
    link: { to: "/services/salesforce-integration", label: "Salesforce integration with SAP and ERP" },
  },
  {
    q: "Is your office in Philadelphia?",
    a: "Our office is on Swedesford Road in Malvern, about 25 miles west of Center City. Salesforce work happens inside your org, so most of it runs remotely from the first day; when a conversation is better across a table, we come into the city.",
  },
  {
    q: "Do you work with companies on the Main Line, in King of Prussia and in South Jersey?",
    a: "Yes. The Main Line and King of Prussia are a short drive from our Malvern office. For South Jersey companies the work runs the same way: inside the org, remotely, and in person when a meeting needs it.",
  },
  {
    q: "What does Salesforce talent cost in Philadelphia?",
    a: `Salesforce roles have no federal job code of their own, so the closest official figures are computer systems analysts, at a median salary of $${n(CITY.wages.analysts.median)}, and software developers, at $${n(CITY.wages.developers.median)}, in the Philadelphia metro (BLS, ${CITY.wages.period}; salary only, before benefits). A partner engagement is scoped and priced in writing before work starts instead.`,
    link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" },
  },
  {
    q: "Is there a Salesforce user community in Philadelphia?",
    a: `Yes. ${CITY.community.groups.length} Salesforce Trailblazer Community Groups within ${CITY.community.radiusKm} km of Philadelphia have held an event in the past year: ${listJoin(groupNames)}.${
      CITY.salesforceOffice ? ` Salesforce also lists an office at ${CITY.salesforceOffice}.` : ""
    }${upcoming.length ? ` Coming up: ${listJoin(upcoming.map((e) => `${e.name} (${longDate(e.date)})`))}.` : ""}`,
  },
];

const SOURCES = {
  checked: "October 2026",
  links: [
    { label: `AppExchange listing ${SF_LISTING_ID}`, href: SF_APPEXCHANGE_URL },
    { label: "Sreenivas Amirisetti on Trailblazer", href: TRAILBLAZER },
    { label: `BLS wages, Philadelphia metro, ${CITY.wages.period}`, href: CITY.wages.page },
    { label: "Trailblazer Community Groups", href: "https://trailblazercommunitygroups.com/" },
  ],
};

export default function SalesforceConsultantPhiladelphia() {
  useSEO({
    // Query first, brand last; 53 characters (page-map title).
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    ogTitle: "Salesforce Consultant Philadelphia — OneAlgorithm",
    ogDescription:
      "Salesforce consultants for Philadelphia companies, from a listed AppExchange Consulting Partner in Malvern, 25 miles west of Center City. Free one-week Salesforce health check.",
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: MAP.alt,
    twitterTitle: "Salesforce Consultant Philadelphia — OneAlgorithm",
    twitterDescription:
      "Salesforce consultants for Philadelphia companies, from a listed Consulting Partner in Malvern. Free one-week Salesforce health check.",
    twitterImage: OG_IMAGE,
  });

  return (
    <Layout>
      {/* PHL-11: provider is the Malvern LocalBusiness, areaServed the city,
          the free health check as an Offer. BreadcrumbList comes from PageHero
          (Home > Services > Salesforce > Philadelphia). */}
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting in Philadelphia, Pennsylvania",
          "Salesforce consulting for companies in Philadelphia from a listed AppExchange Consulting Partner in Malvern, Pennsylvania: Flow automation, permission and integration work, data migration, ongoing Salesforce development and Marketing Cloud support, starting with a free one-week Salesforce health check.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          {
            providerId: "https://onealgorithm.com/#localbusiness",
            areaServed: {
              "@type": "City",
              name: "Philadelphia",
              containedInPlace: { "@type": "State", name: "Pennsylvania" },
            },
            offers: SF_HEALTH_CHECK_OFFER,
            image: IMAGE_1600,
          },
        )}
      />
      <StructuredData
        data={createWebPageSchema("Salesforce consultants for Philadelphia companies", DESCRIPTION, PAGE_URL, {
          dateModified: PAGE_UPDATED,
          primaryImage: { url: IMAGE_1600, width: 1600, height: 900 },
        })}
      />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />
      <StructuredData data={createFAQSchema([ANSWER, ...FAQS])} />

      {/* 1. Hero (PHL-12: H1 carries "consultants"). The record card is the
          panel, so no CTAProof under the pair. Nothing here animates. */}
      <PageHero
        eyebrow="Philadelphia"
        title={
          <>
            Salesforce consultants for <span className="text-oa-orange">Philadelphia companies</span>
          </>
        }
        lede="Most people who call us already run Salesforce and want more from it. We find what is holding the org back, fix it alongside your team and keep it running, starting with a free one-week health check. Our office is in Malvern, about 25 miles west of Center City."
        panel={{ title: "Salesforce's record of us", items: [], slot: <SalesforceRecordCard /> }}
        primary={{ label: "Book a free health check", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        meta={[
          { label: "Office", value: "Malvern, PA" },
          { label: "Market data pulled", value: PULLED },
        ]}
        siblings={false}
      >
        <HcLink />
      </PageHero>

      {/* 2. The answer, 55 words, plus the registry line and the jump list. */}
      <AnswerBand
        question={ANSWER.q}
        answer={ANSWER.a}
        leads={[
          {
            label: "Why it matters",
            body: "An org that does not match how you work gets worked around: the real data moves to spreadsheets, reports stop being trusted and licences go unused.",
          },
          {
            label: "What we do",
            body: "We run a free one-week health check, then fix what it finds: Flow automation, permission sets, integrations and data, built alongside your admin.",
          },
          {
            label: "What it costs",
            body: (
              <>
                The health check is free. Fixes are scoped in writing first; the{" "}
                <Link className="oa-link" to="/services/salesforce-implementation-cost">
                  Salesforce implementation cost guide
                </Link>{" "}
                shows published market ranges.
              </>
            ),
          },
        ]}
        toc={[
          { id: "problems", label: "Problems we fix" },
          { id: "delivered", label: "Delivered work" },
          { id: "office", label: "Where we work" },
          { id: "data", label: "Philadelphia data" },
          { id: "process", label: "How it runs" },
          { id: "faq", label: "Questions" },
          { id: "start", label: "Book a health check" },
        ]}
      >
        <RecordLine />
      </AnswerBand>

      {/* 3. Engagement cards, each linked (PHL-1). Four across at lg. */}
      <Section tone="surface" bordered id="problems">
        <SectionHeading
          title="Four Salesforce problems we fix for Philadelphia companies"
          lede="Rarely a fresh install. Usually an org with five years of history in it and a team that needs it to work this quarter."
        />
        <CardGrid columns={4} className="mt-12">
          {PROBLEMS.map((p) => (
            <Card key={p.title} wire to={p.to} icon={p.icon} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 4. Delivered work (PHL-2), with the practice lead and a CTA beside it
          (wide layout: proof beside the CTA). The lead block is the approved
          wording from SF_PEOPLE via PeopleStrip, with its Person schema
          (PHL-4: no photo exists). */}
      <Section tone="paper" id="delivered">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <DeliveredLedger title="Salesforce work we have delivered" lead="lending" />
          </div>
          <aside className="border-t border-oa-hairlineStrong pt-6 lg:col-span-4 lg:mt-2 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="text-lg font-semibold text-oa-ink">Who leads the work</h3>
            <PeopleStrip providerId="https://onealgorithm.com/#localbusiness" />
            <p className="mt-4 max-w-[30em] leading-relaxed text-oa-ink2">
              You work directly with the certified people doing the work, from the first call to the last fix.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3">
              <PrimaryCTA href="#start" tone="light" cta="mid">
                Book a free health check
              </PrimaryCTA>
              <a href={SF_PHONE.href} data-cta="mid" className="oa-link inline-flex min-h-11 items-center font-mono text-sm">
                Call {SF_PHONE.display}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* 5. The one mid-page night band (PHL-6, PHL-13, PHL-4). PHL-F1 is the
          page's first <figure>: eager and static. Rows are wired to the map. */}
      <Section tone="night" grid clip id="office">
        <PlateScope>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                tone="dark"
                title="Our office is in Malvern, 25 miles west of Center City"
                lede="Salesforce work happens inside your org, so it runs remotely from the first day of the health check, with the people doing the work."
              />
              <p className="mt-6 max-w-[30em] leading-relaxed text-oa-nightInk2">
                We work with companies across Philadelphia, Montgomery, Delaware, Bucks and Chester counties,
                northern Delaware and South Jersey.
              </p>
              {/* Each row is wired to its mark on Fig. 1 (hover, focus or tap). */}
              <ul className="mt-8 border-b border-white/10">
                {OFFICE_ROWS.map((r) => (
                  <WiredRow key={r.k} k={r.k} as="li" className="cursor-default border-t border-white/10 px-2 py-4">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-oa-nightInk3">{r.tag}</span>
                    <span className="mt-1 block text-oa-nightInk">{r.text}</span>
                  </WiredRow>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <Plate
                spec={MAP}
                fig={1}
                first
                tone="night"
                stamp={["MAP · PHILADELPHIA REGION", "US CENSUS BOUNDARIES 2023, PUBLIC DOMAIN"]}
                caption="Our Malvern office sits in Chester County, about 25 miles by road west of Center City. County outlines: US Census Bureau cartographic boundaries, 2023."
              />
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* 6. Local market data (PHL-F2, PHL-F3 and the sourced fact table the
          gap audit asked to keep). Plates alternate sides. */}
      <Section tone="paper" clip id="data">
        <PlateScope>
          <SectionHeading
            title="Philadelphia's Salesforce market, in public numbers"
            lede="Figures from LinkedIn, the US Census Bureau and the Bureau of Labor Statistics, each linked to its source and dated."
          />

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <Plate
                spec={PLATES["philadelphia-salesforce-roles"]}
                fig={2}
                stamp={["CHART · LINKEDIN JOB SEARCH", `PULLED ${STAMP_DATE}`]}
                caption={`Open Salesforce roles within 25 miles of Philadelphia, ${PULLED}. The role searches overlap, so the counts are not added together.`}
              />
            </div>
            <div className="lg:col-span-5">
              <h3 className="text-h3 font-semibold text-oa-ink">Every employer here is hiring the same people</h3>
              <p className="mt-4 max-w-[30em] leading-relaxed text-oa-ink2">
                On {PULLED}, LinkedIn showed {n(roleCount("Consultant"))} Salesforce consultant openings within 25 miles of
                Philadelphia, {n(roleCount("Administrator"))} for administrators, {n(roleCount("Architect"))} for architects and{" "}
                {n(roleCount("Developer"))} for developers. For a migration, an integration or an org clean-up, a partner covers
                the project without a new hire, and the work starts with a free one-week health check instead of a recruiting cycle.
              </p>
              <ul className="mt-6 border-b border-oa-hairline">
                {ROLES.map((j) => (
                  <WiredRow key={j.role} k={roleKey(j.role)} as="li" className="flex items-baseline justify-between gap-4 border-t border-oa-hairline px-2 py-2.5">
                    <a className="oa-link inline-flex min-h-11 items-center text-sm" href={j.url} target="_blank" rel="noopener noreferrer">
                      {j.role} search ↗
                    </a>
                    <span className="font-mono text-sm tabular-nums text-oa-ink">{n(j.count)}</span>
                  </WiredRow>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-5">
              <h3 className="text-h3 font-semibold text-oa-ink">Where Salesforce fits Philadelphia's largest employers</h3>
              <p className="mt-4 max-w-[30em] leading-relaxed text-oa-ink2">
                The metro's four largest employer groups by employees, and the Salesforce work each one usually needs.
              </p>
              <ul className="mt-6 border-b border-oa-hairline">
                {CITY.industries.map((i) => (
                  <WiredRow key={i.code} k={`naics-${i.code}`} as="li" className="cursor-default border-t border-oa-hairline px-2 py-4">
                    <p className="font-semibold text-oa-ink">{i.label.charAt(0).toUpperCase() + i.label.slice(1)}</p>
                    <p className="mt-1 font-mono text-xs tabular-nums text-oa-ink3">
                      {n(i.employees)} employees · {n(i.establishments)} establishments
                    </p>
                    {FIT[i.code] && <p className="mt-2 max-w-[30em] text-sm leading-relaxed text-oa-ink2">{FIT[i.code]}</p>}
                  </WiredRow>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <Plate
                spec={PLATES["philadelphia-largest-employer-groups"]}
                fig={3}
                stamp={["CHART · CENSUS CBP 2023", `PULLED ${STAMP_DATE}`]}
                caption={`Largest employer groups in the ${CITY.msa.name.replace(/ Metro Area$/, "")} metro, by employees, 2023.`}
              />
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-h3 font-semibold text-oa-ink">Business and Salesforce data for the Philadelphia metro</h3>
            <div className="mt-6">
              <DataTable
                label="Business and Salesforce data for the Philadelphia metro"
                head={["Figure", "Value", "Source"]}
                rows={[
                  {
                    cells: [
                      "Business establishments, 2023",
                      <span className="font-mono tabular-nums">{n(CITY.establishments.value)} ({n(CITY.establishments2018.value)} in 2018)</span>,
                      <a className="oa-link" href={CITY.sources.cbp} target="_blank" rel="noopener noreferrer">US Census Bureau, County Business Patterns ↗</a>,
                    ],
                  },
                  {
                    cells: [
                      "Establishments with 500 or more employees, 2023",
                      <span className="font-mono tabular-nums">{n(CITY.size500plus.value)} ({n(CITY.size500plus2018.value)} in 2018)</span>,
                      <a className="oa-link" href={CITY.sources.cbp} target="_blank" rel="noopener noreferrer">Census CBP, sum of two size classes ↗</a>,
                    ],
                  },
                  {
                    cells: [
                      "Establishments with 100 to 499 employees, 2023",
                      <span className="font-mono tabular-nums">{n(CITY.size100to499.value)}</span>,
                      <a className="oa-link" href={CITY.sources.cbp} target="_blank" rel="noopener noreferrer">Census CBP, sum of two size classes ↗</a>,
                    ],
                  },
                  {
                    cells: [
                      "Population, 2024",
                      <span className="font-mono tabular-nums">{n(CITY.population.value)} ({n(CITY.population2019.value)} in 2019)</span>,
                      <a className="oa-link" href="https://www.census.gov/programs-surveys/acs" target="_blank" rel="noopener noreferrer">US Census Bureau, American Community Survey ↗</a>,
                    ],
                  },
                  {
                    cells: [
                      "Software developers employed, and their median salary",
                      <span className="font-mono tabular-nums">{n(CITY.wages.developers.employment)} · ${n(CITY.wages.developers.median)}</span>,
                      <a className="oa-link" href={CITY.wages.page} target="_blank" rel="noopener noreferrer">BLS wage statistics, {CITY.wages.period} ↗</a>,
                    ],
                  },
                  {
                    cells: [
                      "Computer systems analysts employed, and their median salary",
                      <span className="font-mono tabular-nums">{n(CITY.wages.analysts.employment)} · ${n(CITY.wages.analysts.median)}</span>,
                      <a className="oa-link" href={CITY.wages.page} target="_blank" rel="noopener noreferrer">BLS wage statistics, {CITY.wages.period} ↗</a>,
                    ],
                  },
                  {
                    cells: [
                      "Open Salesforce roles within 25 miles, by role search",
                      <span className="font-mono tabular-nums">
                        {ROLES.map((j) => `${j.role.replace(/^Salesforce /, "")} ${n(j.count)}`).join(" · ")}
                      </span>,
                      <span>LinkedIn public job search, {PULLED} (links above)</span>,
                    ],
                  },
                ]}
                source={`Metro: ${CITY.msa.name} (MSA ${CITY.msa.code}). Census and LinkedIn figures pulled ${PULLED}; BLS wages pulled ${longDate(CITY.wages.pulled)}. BLS has no Salesforce job code, so analysts and developers are the closest official categories.`}
              />
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* 7. How an engagement runs (PHL-10): rail, ending in the Desk CTA. */}
      <Section tone="surface" bordered clip id="process">
        <SectionHeading
          title="How an engagement runs"
          lede="Four steps from the first call to an org that works the way your team does."
        />
        <div className="mt-12">
          <ProcessSteps rail terminal={{ label: "Book a free health check" }} steps={STEPS} />
        </div>
      </Section>

      {/* 8. Objections, before the FAQ and the Desk. */}
      <Section tone="paper" id="objections">
        <Objections items={OBJECTIONS} />
      </Section>

      {/* 9. FAQ (PHL-7, PHL-8: certification counts read from the constants). */}
      <Section tone="surface" bordered id="faq">
        <SectionHeading title="What Philadelphia callers ask first" />
        <FAQList faqs={FAQS} sources={SOURCES} />
      </Section>

      {/* 10. Routes to every other Salesforce page, plus the buyer routing to
          Chester County and Pennsylvania (PHL-1). */}
      <Section tone="paper" id="services">
        <SectionHeading
          title="Salesforce services for Philadelphia companies"
          lede={
            <>
              Still choosing an edition?{" "}
              <Link className="oa-link" to="/services/salesforce-consultant-chester-county">
                Our Chester County page covers licences and what they cost
              </Link>
              . Checking whether a partner is genuine?{" "}
              <Link className="oa-link" to="/services/salesforce-consulting-partner-pennsylvania">
                Here is how to check a Salesforce partner
              </Link>
              .
            </>
          }
        />
        <RouteBoard groups={["services", "local", "cities"]} citiesLabel="Salesforce consulting in other cities" />
      </Section>

      {/* 11. The page's one form (PHL-3). */}
      <Desk
        heading="Start with a free one-week Salesforce health check"
        body="A fixed week inside your org with a read-only user: licences against actual use, data quality, what is still done by hand, who can see what, and which integrations fail quietly. You get a written list, ranked by what to fix first."
        form={{
          topic: "philadelphia",
          topicLabel: "Salesforce consulting · Philadelphia",
          heading: "Book a free health check",
          prompt: "What is your Salesforce doing wrong?",
          submitLabel: "Book a free health check",
        }}
      />
    </Layout>
  );
}
