import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { SalesforceRecordCard, RecordLine } from "../../components/SalesforceRecordCard";
import { PageHero, Section, SectionHeading, Reveal, CheckList, PrimaryCTA } from "../../components/site";
import {
  AnswerBand,
  DeliveredLedger,
  Desk,
  FAQList,
  HcLink,
  Objections,
  PeopleStrip,
  PhoneBand,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  WiredRow,
  type SfFaq,
} from "../../components/salesforce";
import {
  SF_APPEXCHANGE_URL,
  SF_CERTIFICATIONS,
  SF_CERTIFIED_PEOPLE,
  SF_LISTING_ID,
  SF_PAGES,
  SF_PHONE,
  SF_PLATFORM_CERTS,
  SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";
import { PLATES } from "../../data/plates/hub";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
  createWebPageSchema,
  SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce, the Salesforce hub. Rebuilt 2026-10-23 on the plate
 * system (design-spec.md §3 HUB, §5 HUB, plus the wide-layout and voice
 * addenda). Earlier history (2026-08-24 rebuild, 2026-09-01 decisions) is in
 * git; the decisions that still bind are kept here.
 *
 * SEARCH (page-map.json, priority 1): title and H1 now lead with "Salesforce
 * consulting services" (2,900/mo, KD 24) and carry "implementation partner"
 * (2,400/mo, KD 22); "implementation services" stays in the lede, the
 * AnswerBand and the schema. The meta description keeps the free one-week
 * health check and the phone number.
 *
 * PROOF, and only this proof (allowed-proof list, 2026-10-23):
 * - Salesforce's AppExchange record: 16 certified people, 53 certifications,
 *   38 Platform (data/salesforceProof.ts, read date SF_VERIFIED_ON).
 * - Four delivered patterns, clients unnamed (SF_DELIVERED, via DeliveredLedger).
 * - The named lead sentence for Sreenivas Amirisetti + his Trailblazer link.
 *   His certifications were verified on that profile 2026-10-23. ⛔ Never state
 *   a certification COUNT for him, never name a prior employer, no photo.
 *   Person schema comes from PeopleStrip (SF_PEOPLE), rendered in that block.
 *
 * DELIBERATELY NOT HERE (code comments only; the voice addendum bars
 * announcing absences in visible copy):
 * - No case study, named client, review, rating, ROI figure, tier or award.
 *   ⛔ Never add AggregateRating/Review markup (a fabricated 4.8 was removed
 *   from this site once).
 * - The competency breakdown rows (Agentforce 7, Agentforce Marketing 3,
 *   Agentforce Service 2, Agentforce Sales 1, Data 360 1, Energy & Utilities 1)
 *   came off 2026-10-23: Salesforce's figures, but not on the allowed-proof
 *   list (spec §7.3, owner to confirm). Restore only on the owner's yes.
 * - "Agentforce, where an agent genuinely beats a form" came off stage 02 for
 *   the same reason: no delivered Agentforce work on record (page-map-final-plan).
 * - Stage 04 lost "Hypercare, typically 30-90 days" and "monthly retainer":
 *   both need the owner's yes (spec §7.8). The managed-services line now uses
 *   that page's own approved one-liner. 24/7 stays: AGENTS.md says it is real.
 * - UAT / go-live cutover lines (gap HUB-6) wait for the delivery lead (§7.8).
 * - No ownership status (WBENC/NMSDC/WOSB) and no government block on this
 *   commercial page (Louis 2026-09-01 and 2026-08-25). They live on
 *   /capabilities and /industries/government.
 * - MuleSoft: the 2026-09-01 wording stays exactly as written (stage 03 line
 *   and the FAQ answer). Add no certification, competency, headcount or years.
 * - FAQs owned by sibling pages are not repeated here (one page per question):
 *   "How long does a Salesforce implementation take?" and consultant hourly
 *   rates (cost guide), "Do I need Sales Cloud or Service Cloud?" (Chester
 *   County), "We already have an admin…" (Philadelphia), location (PA page).
 */

const PAGE_PATH = "/services/salesforce";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
/* FV-15: "Implementation Partner" is not a Salesforce designation, so it stays out of the
   title (house trademark rule); the phrase lives in the body H2 instead. */
const TITLE = "Salesforce Consulting & Implementation Services | OneAlgorithm";
const DESCRIPTION =
  "Salesforce consulting and implementation from a listed Consulting Partner in Malvern, PA. Start with a free one-week health check: (610) 890-9711.";
const LEAD_TRAILBLAZER = "https://www.salesforce.com/trailblazer/samirisetti";
const COST = "/services/salesforce-implementation-cost";
const HC = "/services/salesforce-health-check";

const PLATE = PLATES["salesforce-implementation-stages"];
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og-salesforce.jpg";
const PRIMARY_IMAGE = {
  url: "https://onealgorithm.com/media/salesforce/salesforce-implementation-stages-1600x900.jpg",
  width: 1600,
  height: 900,
};

/* The four stages. Keys s1-s4 wire each block to its station on FIG. 1.
   ⛔ Plate lines are VERBATIM from these lists (scripts/plates/hub.mjs):
   change a line here and it must change there too, then re-run
   `node scripts/plates.mjs hub --og`. The two invoice-backed migration/sync
   lines describe the PATTERN, never the client, sector or dates. */
const PILLARS = [
  {
    k: "s1",
    title: "Before you buy licenses",
    description:
      "How your sales and support teams work now, which edition you actually need, and whether Salesforce is the right answer at all. Sometimes it isn't, and that is a cheaper thing to find out at this stage.",
    details: [
      "What the current process is, including the workarounds",
      "Which clouds and edition you need — and which you don't",
      "A license count and a rough cost, before anyone signs",
      "How the data gets in, and what it has to stay in step with",
      "Who owns and administers the org after we leave",
    ],
  },
  {
    k: "s2",
    title: "Configuration and build",
    description:
      "Org setup, Sales Cloud and Service Cloud, and automation for the steps your team does by hand today. Custom objects where the standard model doesn't fit.",
    details: [
      "Org setup: profiles, permission sets, page layouts",
      "Sales Cloud and Service Cloud configuration",
      "Marketing Cloud support for accounts already running",
      "Custom objects and fields where standard ones don't fit",
      "Flow automation for the manual steps",
      "Apex where clicks can't do the job",
    ],
  },
  {
    k: "s3",
    title: "Data migration and integration",
    description:
      "Records out of your old system, cleaned, loaded and reconciled until the totals match. Then the API work that keeps Salesforce in step with everything else, the ERP most of all, where the argument over which number is right usually starts.",
    details: [
      "Extract and profile the legacy data before moving any of it",
      "Dedupe and map fields; agree in writing what gets dropped",
      "Load, then reconcile record counts and totals",
      "ERP-to-Salesforce syncs, SAP included, so both sides agree",
      "Moves off low-code systems like QuickBase and Kissflow",
      "REST and SOAP integrations, or middleware where that's cheaper",
      "MuleSoft CloudHub where the job needs a managed runtime",
      "Scheduled syncs, with an alert when one fails",
    ],
  },
  {
    k: "s4",
    title: "After go-live",
    description:
      "We stay on while the people who use it every day find the things nobody thought of. Then managed services keep the org earning its keep: weekly administration and development, with hours reported every week.",
    details: [
      "User training for admins and for the people using it daily, so adoption does not stall",
      "Reports and dashboards changed as the questions change",
      "Release-window testing before every Salesforce upgrade",
      "Managed services: weekly administration and development, with hours reported every week",
      "24/7 technical support across the time zones you operate in",
    ],
  },
] as const;

/* Products: name | what we do | the record behind it. Each proof line is on
   the allowed list. ⛔ No MuleSoft row and no Agentforce claim here (spec §5
   HUB 8); Sales/Service Cloud rests on capability + the company record (FV-04),
   not on a delivery claim (owner decision 7 is still open). */
const PRODUCTS: { name: string; body: string; proof: React.ReactNode; to: string; label: string }[] = [
  {
    name: "Sales Cloud and Service Cloud",
    body: "Sales Cloud runs the work of winning business: leads, opportunities and pipeline. Service Cloud runs support after the sale: cases, queues and escalation. We configure both around how your team actually works.",
    proof: (
      <>
        {SF_CERTIFIED_PEOPLE} Salesforce-certified people, {SF_CERTIFICATIONS} certifications · Salesforce's AppExchange
        record, read {SF_VERIFIED_LABEL}
      </>
    ),
    to: HC,
    label: "Check the org you have, free",
  },
  {
    name: "Platform: Flow and Apex",
    body: "The manual steps your team repeats every week, handed to Flow. Apex where clicks can't do the job. Permissions rebuilt so the right people see the right records, and integrations that tell someone when they fail.",
    proof: (
      <>
        {SF_PLATFORM_CERTS} of our {SF_CERTIFICATIONS} certifications are on the Platform competency · Salesforce's
        AppExchange record, read {SF_VERIFIED_LABEL}
      </>
    ),
    to: "/services/salesforce-managed-services",
    label: "Weekly Salesforce development",
  },
  {
    name: "Marketing Cloud",
    body: "Marketing Cloud support for accounts already running.",
    proof: <>About 18 months of Marketing Cloud support · delivered</>,
    to: "/services/salesforce-marketing-cloud-consulting",
    label: "Marketing Cloud consulting",
  },
];

/* Real questions, answered truthfully. This array is the ONLY source: it
   renders on the page and generates FAQPage schema. Ordered by buyer signal
   (questions/questions-by-page.md, Hub). ⛔ No question here may appear on
   another Salesforce page. */
const FAQS: SfFaq[] = [
  {
    q: "What are the steps in a Salesforce implementation?",
    a: "Four, usually in this order: work out what you need before you buy licenses, configure and build, migrate and integrate the data, then support the team after go-live. Each stage can be taken on its own, so a company with an admin already in place can bring us in for the migration alone.",
    link: { to: `#fig-${PLATE.id}`, label: "See Figure 1: how an implementation runs" },
  },
  {
    q: "How do I choose the best Salesforce implementation partner?",
    a: `Check the record before you call. Open the partner's AppExchange listing and read what Salesforce publishes there: certified people, certifications and the competencies they sit under. Ask who will actually do your work and look those people up on their Trailblazer profiles. Then ask for a written scope before any price. Ours is listing ${SF_LISTING_ID}: ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications.`,
    link: { to: "/services/salesforce-consulting-partner-pennsylvania", label: "How to check any Salesforce partner" },
  },
  {
    q: "What do Salesforce consulting services include?",
    a: "Advice and hands-on work across the life of a Salesforce org: deciding what to buy, configuring it, automating with Flow, migrating data, connecting other systems, and running it afterwards. Ours are the free one-week health check, implementation, data migration, integration with SAP and other ERPs, managed services, Marketing Cloud support and staff augmentation.",
    link: { to: HC, label: "Start with the free health check" },
  },
  {
    q: "Why do Salesforce implementations fail, and how do we avoid it?",
    a: "The usual causes are adoption and data, not configuration: the org is set up around a template instead of how the team works, old data arrives unreconciled so nobody trusts the reports, and nobody owns the org after go-live. We start from your current process, workarounds included; we reconcile record counts and totals before go-live; and we agree who owns the org before the build starts.",
  },
  {
    q: "Salesforce or HubSpot: which should we choose?",
    a: "Choose on fit. HubSpot is often the quicker start for a team with a straightforward pipeline and marketing-led sales. Salesforce earns its cost when you need custom data models, detailed access rules, multi-step approvals or a sync with an ERP such as SAP. We tell you which side of that line you are on before you buy, including when the answer is not Salesforce.",
    link: { to: COST, label: "What Salesforce costs, edition by edition" },
  },
  {
    q: "Should we implement Salesforce ourselves or hire a partner?",
    a: "Do it in-house if someone on your team has implemented Salesforce before and has the time. Bring in a partner when the build has to land alongside everyone's day job, or when it involves data migration, an ERP integration or automation nobody on staff has built. Many companies do both: we build, your admin owns the org after go-live, and the handover is planned before the build starts.",
  },
  {
    q: "What happens after go-live, and who supports Salesforce then?",
    a: "We stay on while your team learns it: training for admins and everyday users, reports and dashboards changed as the questions change, and testing before every Salesforce release. After that, managed services keep the org running: weekly administration and development, with hours reported every week.",
    link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" },
  },
  {
    q: "What does a Salesforce implementation cost?",
    a: "It depends on the edition, the license count and how much of your data has to move. The ranges other firms publish, with their sources and typical timelines, are in our Salesforce implementation cost guide. Before you sign anything, we give you a license count and a rough cost, and tell you if a smaller edition does the job.",
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "Can I see examples of your Salesforce work?",
    a: "Yes. The delivered-work section on this page lists it: ongoing Salesforce development for a lending company since April 2026, an SAP-to-Salesforce sync, QuickBase and Kissflow migrations into Salesforce, and about 18 months of Marketing Cloud support. We describe the work and keep client names private. Then judge us on your own org: the free one-week health check ends with a written list you keep.",
    link: { to: "#delivered", label: "Salesforce work we have delivered" },
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. A small team gets the same people and the same free one-week health check. For a small company the first question is usually the edition: Starter Suite and Pro Suite exist for smaller teams, and we tell you whether one of them does the job before you buy more.",
    link: { to: "/services/salesforce-consultant-chester-county", label: "What Salesforce costs a small company" },
  },
  {
    q: "Is OneAlgorithm really a Salesforce partner?",
    a: `Yes. We are a listed Salesforce Consulting Partner on the AppExchange, listing ${SF_LISTING_ID}. Salesforce publishes the detail itself: ${SF_CERTIFIED_PEOPLE} certified people holding ${SF_CERTIFICATIONS} certifications, ${SF_PLATFORM_CERTS} of them on the Platform competency. You can open the listing and check it before you call us.`,
  },
  {
    /* ⛔ 2026-09-01 wording, kept exactly (owner, 2026-10-23: "don't assume").
       The record: a signed CloudHub 2.0 SOW (June 2025); no MuleSoft
       certification, competency or delivery artefact. Add nothing. */
    q: "Do you work with MuleSoft?",
    a: "Yes, for the integration jobs that need it — MuleSoft is Salesforce's own integration platform, and we scope and build on CloudHub where a managed runtime, scheduling and retry handling are worth paying for. Plenty of integrations do not need it, and a REST job or a cheaper middleware will do. We will tell you which one you are looking at rather than route you to the more expensive answer.",
  },
];

const JUMP = [
  { id: "check", label: "Check our record" },
  { id: "start", label: "Free health check" },
  { id: "services", label: "Services" },
  { id: "delivered", label: "Delivered work" },
  { id: "work", label: "How it runs" },
  { id: "products", label: "Products" },
  { id: "faq", label: "Questions" },
];

export default function Salesforce() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Salesforce consulting and implementation services | OneAlgorithm",
    ogDescription: `${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications on Salesforce's AppExchange record. Start with a free one-week Salesforce health check.`,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: PLATE.alt,
    twitterTitle: "Salesforce consulting and implementation services | OneAlgorithm",
    twitterDescription: `${SF_CERTIFIED_PEOPLE} Salesforce-certified people, ${SF_CERTIFICATIONS} certifications on the AppExchange. Start with a free one-week Salesforce health check.`,
    twitterImage: OG_IMAGE,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting and Implementation Services",
          "Salesforce consulting and implementation from a listed AppExchange Consulting Partner in Malvern, Pennsylvania, working with companies across the United States: Sales Cloud and Service Cloud configuration, Flow automation, data migration and reconciliation, SAP and ERP integration, support after go-live, and a free one-week health check of an existing org.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          {
            image: PRIMARY_IMAGE.url,
            offers: SF_HEALTH_CHECK_OFFER,
            catalog: {
              name: "Salesforce consulting services",
              urls: SF_PAGES.services.map((s) => `https://onealgorithm.com${s.to}`),
            },
          },
        )}
      />
      <StructuredData
        data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, {
          dateModified: PAGE_UPDATED,
          primaryImage: PRIMARY_IMAGE,
        })}
      />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />
      <StructuredData data={createFAQSchema(FAQS)} />

      {/* 1 HERO. Text-led: the H1 and lede are the LCP element; the only image
          is the record card's cloud mark. Nothing here animates. */}
      <PageHero
        title={
          <>
            <span className="text-oa-orange">Salesforce</span> consulting and implementation services
          </>
        }
        lede="We configure Sales Cloud and Service Cloud around how your team works, automate the manual steps behind them, move your old data in clean, and stay on while your team learns it."
        panel={{
          title: "Salesforce's record of us",
          items: [],
          slot: <SalesforceRecordCard />,
          footer: ["Salesforce Consulting Partner"],
        }}
        primary={{ label: "Book a free health check", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        siblings={false}
      >
        <HcLink />
      </PageHero>

      {/* 2 ANSWER BAND. 51-word self-contained answer for answer engines. */}
      <AnswerBand
        question="What are Salesforce implementation services?"
        answer="Salesforce implementation services take a company from deciding to buy Salesforce to running on it every day: choosing the edition and license count, configuring Sales Cloud and Service Cloud, automating manual steps with Flow, migrating and reconciling data, connecting other systems such as an ERP, and supporting the team after go-live."
        leads={[
          {
            label: "Why it matters",
            body: "The expensive mistakes happen before anything is configured: the wrong edition, seats for people who will never log in, and old data loaded without being reconciled.",
          },
          {
            label: "What we do",
            body: (
              <>
                All four stages, or any one on its own, with the person who scopes your org staying on it through delivery.{" "}
                <a className="oa-link" href="#work">
                  How an implementation runs
                </a>
              </>
            ),
          },
          {
            label: "What it costs",
            body: (
              <>
                The first week is free: a{" "}
                <Link className="oa-link" to={HC}>
                  Salesforce health check
                </Link>{" "}
                of the org you have. Build work is scoped in writing before you sign, and the market's published ranges are in
                our{" "}
                <Link className="oa-link" to={COST}>
                  implementation cost guide
                </Link>
                .
              </>
            ),
          },
        ]}
        toc={JUMP}
      />

      {/* 3 CHECK BEFORE YOU CALL. Two checkable records side by side: the
          company's (AppExchange) and the lead's (Trailblazer). The trademark
          line moved to the footer's legal row (Layout.tsx, spec 2.16). */}
      <Section tone="surface" id="check">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <SectionHeading
              title="A Salesforce implementation partner you can check before you call"
              lede="Every figure here is Salesforce's own, read from our AppExchange listing. Open it and check it yourself."
            />
            {/* The flat "X is a Y in Z" sentence answer engines lift. ⛔ Keep it
                one sentence; no ownership status (Louis, 2026-09-01). */}
            <p className="mt-6 max-w-[34em] text-lg font-semibold text-oa-ink">
              OneAlgorithm is a listed Salesforce Consulting Partner working with companies across the United States, from
              Malvern, Pennsylvania.
            </p>
            <div className="mt-8">
              <RecordLine />
            </div>
          </div>
          <aside
            aria-labelledby="lead-title"
            className="border-t border-oa-hairlineStrong pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-1"
          >
            <h3 id="lead-title" className="text-h3 font-semibold text-oa-ink">
              Who leads the work
            </h3>
            {/* Approved wording, verbatim (2026-10-23). ⛔ No count, no prior
                employer, no photo. */}
            <PeopleStrip className="mt-4 max-w-[30em] text-lede text-oa-ink2" />
          </aside>
        </div>
      </Section>

      {/* 4 DESK: the page's one form (#start), mid-page where the offer is
          described. The page closes on the PhoneBand instead. */}
      <Desk
        heading="Start with a free one-week Salesforce health check"
        body="You already own Salesforce and suspect it isn't earning its keep. We spend a week in your org, free, on licenses, data, automation, permissions and integrations. You get a written list ranked by what to fix first, and it's yours: act on it with us, with your own admin, or with nobody."
        form={{
          topic: "hub",
          topicLabel: "Salesforce implementation",
          heading: "Book a free health check",
          prompt: "What is your Salesforce doing wrong?",
          submitLabel: "Book a free health check",
        }}
      />

      {/* 5 SERVICES. The seven child pages, health check first. */}
      <Section tone="paper" id="services">
        <SectionHeading
          title="Salesforce consulting services we deliver"
          lede="Seven ways to start, from a free week inside your org to Salesforce people working as part of your team."
        />
        <RouteBoard groups={["services"]} />
      </Section>

      {/* 6 DELIVERED. The four approved patterns, clients unnamed. */}
      <Section tone="surface" id="delivered">
        <DeliveredLedger title="Salesforce work we have delivered" />
      </Section>

      {/* 7 THE WORK. FIG. 1 is the page's first <figure>: eager and static.
          Each stage block below is wired to its station (s1-s4). */}
      <Section tone="paper" clip id="work">
        <SectionHeading
          title="What the work actually is"
          lede="Four stages, usually in this order. Already have an admin? Take stage 03, the data work, on its own."
        />
        <PlateScope>
          <div className="mt-12">
            <Plate
              spec={PLATE}
              fig={1}
              first
              stamp={["DIAGRAM · HOW AN IMPLEMENTATION RUNS", "ONEALGORITHM"]}
              caption="The four stages of a Salesforce implementation, in the order they usually run. The branch under stage 03: any one of them can be taken on its own. Each stage is set out in full below."
            />
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
            {PILLARS.map((p, i) => (
              <WiredRow key={p.k} k={p.k} as="li" className="border-t border-oa-hairlineStrong px-4 pb-8 pt-6">
                {/* aria-hidden: the <ol> already gives the order. */}
                <span aria-hidden="true" className="font-mono text-sm text-oa-orangeText">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-oa-ink">{p.title}</h3>
                <p className="mt-3 text-oa-ink2">{p.description}</p>
                <div className="mt-6">
                  <CheckList items={[...p.details]} />
                </div>
              </WiredRow>
            ))}
          </ol>
        </PlateScope>
      </Section>

      {/* 8 PRODUCTS. Registry rows: product | the work | the record behind it. */}
      <Section tone="surface" id="products">
        <SectionHeading
          title="Salesforce products we work with"
          lede="What we do in each, and the record behind it."
        />
        <ul className="mt-10 border-b border-oa-hairlineStrong">
          {PRODUCTS.map((p) => (
            <li
              key={p.name}
              className="grid grid-cols-1 gap-3 border-t border-oa-hairlineStrong py-7 lg:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,4fr)] lg:gap-10"
            >
              <h3 className="text-xl font-semibold text-oa-ink">{p.name}</h3>
              <p className="max-w-[31em] text-oa-ink2">{p.body}</p>
              <div>
                <p className="font-mono text-xs leading-5 text-oa-ink3">{p.proof}</p>
                <Link className="oa-link mt-2 inline-flex min-h-11 items-center text-sm" to={p.to}>
                  {p.label} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[34em] text-oa-ink2">
          <strong className="font-semibold text-oa-ink">Editions:</strong> Starter Suite, Pro Suite, Core, Advanced and
          Max (Salesforce&apos;s current names, read 23 October 2026). We tell you which one does the job before you buy; list prices per user are in the{" "}
          <Link className="oa-link" to={COST}>
            Salesforce implementation cost guide
          </Link>
          .
        </p>
      </Section>

      {/* 9 THE SPLIT (Louis, 2026-08-24): two buyers, one block each. The one
          mid-page night band. ⛔ Never re-add a government block here. */}
      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          title="Two ways people arrive at this page"
          lede="Some already own Salesforce and it isn't earning its keep. Others haven't bought yet and want to know what they need. Different problems, different first moves: take whichever half is yours."
        />
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="border-t border-white/20 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">Already on Salesforce</p>
            <h3 className="mt-4 text-h3 font-semibold text-oa-nightInk">
              You run a sales or support team and Salesforce is not pulling its weight
            </h3>
            <p className="mt-4 max-w-[31em] leading-relaxed text-oa-nightInk2">
              That usually means people still doing by hand what the platform was bought to automate. Automation is the deep
              end of our bench:{" "}
              <strong className="font-semibold text-oa-nightInk">
                {SF_PLATFORM_CERTS} of our {SF_CERTIFICATIONS} certifications are on the Platform competency
              </strong>
              , the Flow, permissions and integration work that takes those steps off your team. Sales and Service Cloud get
              configured around how your people actually work, not the reverse.
            </p>
            <div className="mt-7">
              <CheckList
                tone="dark"
                items={[
                  "The manual steps your team repeats every week, handed to Flow",
                  "Pipeline, cases and queues set up around your process",
                  "The reports your leadership will actually open",
                  "Integrations that fail quietly, found and alerted on",
                ]}
              />
            </div>
          </Reveal>
          <Reveal className="border-t border-white/20 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">Not bought yet</p>
            <h3 className="mt-4 text-h3 font-semibold text-oa-nightInk">
              You are being sold Salesforce and want to know what you actually need
            </h3>
            <p className="mt-4 max-w-[31em] leading-relaxed text-oa-nightInk2">
              The expensive mistakes get made here, before anything is configured: the wrong edition, seats for people who will
              never log in, and clouds bought together because they were quoted together.{" "}
              <strong className="font-semibold text-oa-nightInk">
                We tell you if a smaller edition does the job, and we tell you if Salesforce is the wrong answer altogether.
              </strong>{" "}
              That is a cheaper thing to find out now than in month four.
            </p>
            <div className="mt-7">
              <CheckList
                tone="dark"
                items={[
                  "What your process actually is now, workarounds included",
                  "Which clouds and edition you need — and which you don't",
                  "A license count and a rough cost, before anyone signs",
                  "Who owns and administers the org after we leave",
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Section>


      {/* 11 OBJECTIONS. Not in FAQPage; none repeats a FAQ question. The
          "no reviews" objection is left off on purpose (voice addendum rule 4). */}
      <Section tone="surface" id="objections">
        {/* Objections beside the next step (wide-layout addendum: proof and
            answers beside the CTA), which also keeps each answer to a
            readable measure on the 1440 frame. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <Objections
              items={[
                {
                  q: "Will we get senior people, or whoever is free?",
                  a: "The person who scopes your org stays on it through delivery, and you deal with the people doing the work directly: no hand-off after the sales call. Sreenivas Amirisetti leads the practice.",
                  checked: { label: "his Trailblazer profile", href: LEAD_TRAILBLAZER },
                },
                SF_OBJECTIONS.pitch,
                SF_OBJECTIONS.cost,
                SF_OBJECTIONS.city,
              ]}
            />
          </div>
          <aside
            aria-labelledby="own-org-title"
            className="self-end border-t border-oa-hairlineStrong pt-8 lg:border-l lg:border-t-0 lg:pb-6 lg:pl-12 lg:pt-0"
          >
            <h3 id="own-org-title" className="text-h3 font-semibold text-oa-ink">
              Judge us on your own org
            </h3>
            <p className="mt-4 max-w-[46ch] text-oa-ink2">
              The free one-week health check ends with a written list ranked by what to fix first. It's yours either way.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <PrimaryCTA href="#start" tone="light" cta="mid">
                Book a free health check
              </PrimaryCTA>
              <a
                href={SF_PHONE.href}
                data-cta="mid"
                className="oa-link inline-flex min-h-11 items-center font-mono text-sm"
              >
                Call {SF_PHONE.display}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      {/* 12 FAQ. Heading left, questions right, so answers keep a ~60-70
          character measure on the wide frame. */}
      <Section tone="paper" clip id="faq">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          {/* Sticky at lg (Section clip = overflow:clip, so sticky pins) so
              the long right column never leaves an empty left one. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            title="Questions buyers ask before the first call"
            lede={
              <>
                Not here? Call the office and ask:{" "}
                <a className="oa-link whitespace-nowrap font-mono" href={SF_PHONE.href} data-cta="faq">
                  {SF_PHONE.display}
                </a>
              </>
            }
          />
          </div>
          <div className="lg:-mt-10">
            <FAQList
              faqs={FAQS}
              sources={{
                checked: "October 2026",
                links: [
                  { label: `Salesforce AppExchange listing ${SF_LISTING_ID}`, href: SF_APPEXCHANGE_URL },
                  { label: "Sreenivas Amirisetti on Trailblazer", href: LEAD_TRAILBLAZER },
                ],
              }}
            />
          </div>
        </div>
      </Section>

      {/* 13 LOCAL + CITIES. Hub-to-spoke links: the page with the most
          standing links down to the pages that need to rank. ⛔ Links, not a
          town list (keyword-stuffing policy). */}
      <Section tone="surface" compact id="local">
        <SectionHeading
          title="Salesforce consulting near you"
          lede="Three pages for the questions that change with where you are, and a page per city with that market's own business, hiring and Salesforce community data."
        />
        <RouteBoard groups={["local", "cities"]} />
      </Section>

      {/* 14 PHONE BAND (hub and HC only: their Desk is mid-page). */}
      <PhoneBand />
    </Layout>
  );
}
