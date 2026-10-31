import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, ServiceCards, HUB_SERVICE_CARDS, StageRail, StageUnits, HUB_STAGES, type SfFaqItem,
} from "../../components/sf";
import { HubComposition, FlowMigration } from "../../components/sf/illus";
import {
  SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_LISTING_ID, SF_PAGES, SF_PHONE, SF_PLATFORM_CERTS, SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";
import { SF_CITY_LINKS } from "../../data/salesforceShared";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce, the Salesforce hub. Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf):
 * the approved prototype (redesign-v2/prototype/index.html, Louis 2026-10-23 "build the 23 pages this way")
 * for layout, motion and the three signatures; seo-completeness/structure-spec.md §4 for title, meta, H1, the
 * H2/H3 list and schema. Build notes: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/.
 *
 * SECTION ORDER follows the approved prototype's rhythm (hero → answer → night split → rail → … → desk → FAQ);
 * the spec's own §0 grades heading ORDER as not ranking-relevant, so its three new H2s (products, concerns, near
 * you) are slotted where the page reads best. Every H2 string is the spec's, exact.
 *
 * PROOF, and only this proof (structure-spec §8.1): Salesforce's AppExchange record (16 / 53 / 38, read
 * SF_VERIFIED_ON), the four delivered patterns with clients unnamed, Sreenivas (14 active certifications, badges)
 * and Swapna (2). ⛔ Never a client name, review, rating, award, tier, price, SLA or years figure. MuleSoft keeps
 * the 2026-09-01 wording. "Implementation Partner" sits in the <title> only (spec §4 + the approved prototype;
 * fix-round FV-15 had removed it: flagged in build-v2/foundation.md for the owner).
 *
 * LINKS: in-site only in the body; the one off-site control per record lives inside its evidence dialog
 * (new tab, noopener, external mark). Houston is routed but not linked until its gate (spec §11 D9). */

const PAGE_PATH = "/services/salesforce";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const TITLE = "Salesforce Consulting Services & Implementation Partner | OneAlgorithm";
const DESCRIPTION =
  "Salesforce consulting services and implementation from a listed Consulting Partner in Malvern, PA. Start with a free one-week health check: (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-hub-composition.jpg";
const OG_ALT =
  "Illustration with sample data: three cards on one desk, a ranked health-check list, an SAP to Salesforce order sync and a week of managed-services figures.";
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const MS = "/services/salesforce-managed-services";
const PA = "/services/salesforce-consulting-partner-pennsylvania";

/* FAQ: the hub's question bank (questions/questions-by-page.md). One owner page per question across the 23
   pages: none of these may appear on another Salesforce page. The array renders AND feeds FAQPage schema. */
const FAQS: SfFaqItem[] = [
  {
    q: "What are the steps in a Salesforce implementation?",
    a: "Four, usually in this order: work out what you need before you buy licenses, configure and build, migrate and integrate the data, then support the team after go-live. Each stage can be taken on its own, so a company with an admin already in place can bring us in for the migration alone.",
    link: { to: "#how", label: "How a Salesforce implementation runs" },
  },
  {
    q: "How do I choose the best Salesforce implementation partner?",
    a: `Check the record before you call. Open the partner's AppExchange listing and read what Salesforce publishes there: certified people, certifications and the competencies they sit under. Ask who will actually do your work and look those people up on their Trailblazer profiles. Then ask for a written scope before any price. Ours is listing ${SF_LISTING_ID}: ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications.`,
    link: { to: PA, label: "How to check any Salesforce partner" },
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
    link: { to: MS, label: "Salesforce managed services" },
  },
  {
    q: "What does a Salesforce implementation cost?",
    a: "It depends on the edition, the license count and how much of your data has to move. The ranges other firms publish, with their sources and typical timelines, are in our Salesforce implementation cost guide. Before you sign anything, we give you a license count and a rough cost, and tell you if a smaller edition does the job.",
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "Can I see examples of your Salesforce work?",
    a: "Yes. The delivered-work ledger on this page lists it: ongoing Salesforce development for a lending company since April 2026, an SAP-to-Salesforce sync, QuickBase and Kissflow migrations into Salesforce, and about 18 months of Marketing Cloud support. We describe the work and keep client names private. Then judge us on your own org: the free one-week health check ends with a written list you keep.",
    link: { to: "#record", label: "Salesforce work we have delivered" },
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. A small team gets the same people and the same free one-week health check. For a small company the first question is usually the edition: Starter Suite and Pro Suite exist for smaller teams, and we tell you whether one of them does the job before you buy more.",
    link: { to: "/services/salesforce-consultant-chester-county", label: "What Salesforce costs a small company" },
  },
  {
    q: "Is OneAlgorithm really a Salesforce partner?",
    a: `Yes. We are a listed Salesforce Consulting Partner on the AppExchange, listing ${SF_LISTING_ID}. Salesforce publishes the detail itself: ${SF_CERTIFIED_PEOPLE} certified people holding ${SF_CERTIFICATIONS} certifications. You can open the listing and check it before you call us.`,
    link: { to: "#record", label: "Check our record" },
  },
  {
    /* ⛔ 2026-09-01 wording, kept exactly (owner, 2026-10-23: "don't assume"). Add nothing. */
    q: "Do you work with MuleSoft?",
    a: "Yes, for the integration jobs that need it — MuleSoft is Salesforce's own integration platform, and we scope and build on CloudHub where a managed runtime, scheduling and retry handling are worth paying for. Plenty of integrations do not need it, and a REST job or a cheaper middleware will do. We will tell you which one you are looking at rather than route you to the more expensive answer.",
  },
];

/* Objection questions (H3) with the answers in Go deeper. ⛔ None repeats a FAQ question; the "no reviews"
   objection stays off (voice rule: never announce an absence). */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will we get senior people, or whoever is free?", a: <>The person who scopes your org stays on it through delivery, and you deal with the people doing the work directly: no hand-off after the sales call. Sreenivas Amirisetti leads the practice; his credentials are listed under <a className="sf-link" href="#record">our record</a>.</> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "What does it cost after the free week?", a: <>Fixes are scoped in writing first. <Link className="sf-link" to={COST}>What Salesforce work costs</Link></> },
  { q: "You are not in our city.", a: <>Malvern, PA; the work happens inside your org, remotely; in person when a meeting needs it. <Link className="sf-link" to="/services/salesforce-consultant-philadelphia">Salesforce consultants for Philadelphia companies</Link></> },
];

const CITY_NAV = SF_CITY_LINKS.filter((c) => !c.to.endsWith("-houston"));

export default function Salesforce() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Salesforce consulting services and implementation | OneAlgorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "Salesforce consulting services and implementation | OneAlgorithm",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
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
            image: OG_IMAGE,
            offers: SF_HEALTH_CHECK_OFFER,
            catalog: { name: "Salesforce consulting services", urls: SF_PAGES.services.map((s) => `https://onealgorithm.com${s.to}`) },
          },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce" }]}>
        {/* 1 HERO. H1 = the LCP; FIG. 1 (the layered desk) is dealt by CSS 250ms after first paint. 6/6 split. */}
        <SFHero
          kicker={<>Select Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce consulting and implementation services"
          lede="We set up, fix and support Salesforce for US companies, starting with a free one-week health check of the org you already own."
          primary={{ href: "#start", label: "Book the free health check" }}
          proof
          figure={<HubComposition fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 ANSWER UNIT + FIG. 2 beside it (the 7/5 spread). Spec §4 row 1. */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What are Salesforce implementation services?"
            lede="Salesforce implementation services set Salesforce up for how a business runs: edition and licenses, configuration, data migration, integration and support after go-live."
            lead="The expensive mistakes happen before anything is configured: the wrong edition, seats nobody uses, old data loaded unreconciled."
            points={[
              "Choose the edition and license count before anyone signs",
              "Configure Sales Cloud and Service Cloud around how your team works",
              "Migrate and reconcile the data, then connect the ERP",
            ]}
          >
            <GoDeeper label="the four stages, what we do and what it costs">
              <p className="sf-rule">
                Salesforce implementation services take a company from deciding to buy Salesforce to running on it every day: choosing the edition and license count, configuring Sales Cloud and Service Cloud, automating manual steps with Flow, migrating and reconciling data, connecting other systems such as an ERP, and supporting the team after go-live.
              </p>
              <p><span className="sf-lead-in">What we do:</span> All four stages, or any one on its own, with the person who scopes your org staying on it through delivery.</p>
              <p><span className="sf-lead-in">What it costs:</span> The first week is free. Build work is scoped in writing before you sign; the market's published ranges are in our cost guide.</p>
              <p><span className="sf-lead-in">Editions:</span> Starter Suite, Pro Suite, Core, Advanced and Max (Salesforce's current names, read {SF_VERIFIED_LABEL}). We tell you which one does the job before you buy.</p>
              <div className="sf-links">
                <Link className="sf-link" to={HC}>Start with the free health check</Link>
                <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <FlowMigration fig={2} className="sf-c5" />
        </SmartSection>

        {/* 3 THE SPLIT: two buyers, two H3 units, one night band. Spec §4 row 7. */}
        <SmartSection
          id="which"
          tone="night"
          grid
          heading={{
            id: "h-which",
            title: "What Salesforce consulting changes for your team",
            lede: "Salesforce consulting turns an org your team works around into one it runs on, or stops you buying licenses you will not use.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c6"
            kicker="Already on Salesforce"
            title="Your team works around Salesforce"
            lede="People still do by hand what the platform was bought to automate."
            lead={<>Our Platform work is the Flow, permissions and integration work that takes those steps off your team.</>}
            points={["The weekly manual steps, handed to Flow", "Pipeline, cases and queues set up around your process", "Integrations that fail quietly, found and alerted on"]}
            measure={false}
          >
            <GoDeeper label="how we configure an org around the team">
              <p className="sf-rule">Sales and Service Cloud get configured around how your people actually work, not the reverse. The reports your leadership will open get built from the questions they ask, and every integration gets an alert for the day it stops.</p>
              <div className="sf-links">
                <Link className="sf-link" to={HC}>What the free week covers</Link>
                <Link className="sf-link" to={MS}>Weekly administration and development</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c6"
            delay={0.08}
            kicker="Not bought yet"
            title="You are being sold Salesforce"
            lede="The wrong edition and seats for people who never log in get bought here."
            lead="We tell you if a smaller edition does the job, and if Salesforce is the wrong answer altogether."
            points={["Your process as it runs now, workarounds included", "Which clouds and edition you need, and which you don't", "A license count and a rough cost before anyone signs"]}
            measure={false}
          >
            <GoDeeper label="how the edition decision is made before the license order">
              <p className="sf-rule">Clouds bought together because they were quoted together are the most common line on a first invoice. Starter Suite and Pro Suite exist for smaller teams; Core, Advanced and Max for the rest. The edition decision is made with you before the license order, and that is a cheaper thing to find out now than in month four.</p>
              <div className="sf-links"><Link className="sf-link" to={COST}>What Salesforce costs, edition by edition</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 4 HOW IT RUNS: FIG. 3 (scroll choreography) + four stage units wired to their stations. Spec §4 row 5. */}
        <SmartSection
          id="how"
          heading={{
            id: "h-how",
            title: "How a Salesforce implementation runs",
            lede: "A Salesforce implementation runs in four stages, and you can hire us for any one of them.",
          }}
        >
          <StageRail
            fig={3}
            stations={HUB_STAGES}
            ledger
            className="sf-rail-top"
            title="Staged diagram of a four-stage Salesforce implementation with a reconciliation ledger"
            desc="A rail runs through four stations: scope, build, migrate and integrate, after go-live. Under station three, sample records move from a legacy system into Salesforce and the totals match."
            stamp="How an implementation runs"
            caption="The four stages in the order they usually run, and the one test that matters at stage 03: the record counts and totals on both sides agree before anyone goes live. Sample figures."
          />
          <StageUnits items={HUB_STAGES} />
        </SmartSection>

        {/* 5 PRODUCTS. Spec §4 row 6: three H3s + one line; rows and the editions note in Go deeper. */}
        <SmartSection
          id="products"
          tone="surface"
          grid
          heading={{
            id: "h-products",
            title: "Salesforce products we work with",
            lede: "We work in Sales Cloud, Service Cloud, the Salesforce Platform (Flow and Apex) and Marketing Cloud.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" title="Sales Cloud and Service Cloud consulting" lede="Sales Cloud runs the work of winning business; Service Cloud runs support after the sale." measure={false}>
            <GoDeeper label="what we configure in Sales Cloud and Service Cloud">
              <p className="sf-rule">Sales Cloud runs leads, opportunities and pipeline. Service Cloud runs cases, queues and escalation. We configure both around how your team actually works. Sreenivas Amirisetti holds the Agentforce Sales Consultant and Agentforce Service Consultant certifications, formerly Sales Cloud and Service Cloud Consultant.</p>
              <div className="sf-links"><Link className="sf-link" to={HC}>Check the org you have, free</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="Flow, Apex and platform development" lede="The manual steps your team repeats every week, handed to Flow; Apex where clicks can't do the job." measure={false}>
            <GoDeeper label="the platform work: Flow, Apex, permissions, integrations">
              <p className="sf-rule">Permissions rebuilt so the right people see the right records, and integrations that tell someone when they fail. Salesforce's AppExchange record lists {SF_CERTIFICATIONS} certifications (read {SF_VERIFIED_LABEL}).</p>
              <div className="sf-links"><Link className="sf-link" to={MS}>Weekly Salesforce development</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Marketing Cloud" lede="Marketing Cloud support for accounts already running." measure={false}>
            <GoDeeper label="Marketing Cloud support">
              <p className="sf-rule">About 18 months of Marketing Cloud support delivered. Journeys, consent synced from Salesforce, and the data extensions behind them, kept running by people who also know the CRM side.</p>
              <div className="sf-links"><Link className="sf-link" to="/services/salesforce-marketing-cloud-consulting">Marketing Cloud consulting</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 6 SEVEN WAYS TO START: 4 + 3 cards, the first spans two. Spec §4 row 2. */}
        <SmartSection
          id="services"
          heading={{
            id: "h-services",
            title: "Salesforce consulting services we deliver",
            lede: "We deliver seven Salesforce services, from a free one-week health check to people working inside your team.",
          }}
        >
          <ServiceCards items={HUB_SERVICE_CARDS} />
          <nav aria-label="Related services" style={{ marginTop: 32 }}>
            <p className="sf-kicker">Related services</p>
            <ul className="sf-links" style={{ marginTop: 8 }}>
              <li><Link className="sf-link" to="/services/website-development">Custom website design and development</Link></li>
            </ul>
          </nav>
        </SmartSection>

        {/* 7 THE RECORD: readouts (count up once, below the fold), who leads the work, delivered work. Spec §4 rows 3-4. */}
        <SmartSection
          id="record"
          tone="surface"
          heading={{
            id: "h-record",
            title: "A Salesforce consulting partner you can check",
            lede: <>Salesforce's AppExchange record lists OneAlgorithm as a Select Consulting Partner with {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications, read {SF_VERIFIED_LABEL}.</>,
          }}
        >
          <Readouts />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead" style={{ gridColumn: "8 / 13", gridRow: 1 } as React.CSSProperties}>
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
            <SmartUnit
              className="sf-c7"
              headingId="h-delivered"
              title="Salesforce work we have delivered"
              lede="We have delivered Salesforce development, an SAP sync, QuickBase and Kissflow migrations and Marketing Cloud support; client names stay private."
              style={{ gridColumn: "1 / 8", gridRow: 1 } as React.CSSProperties}
            >
              <DeliveredLedger />
              <p className="sf-mono" style={{ marginTop: 10 }}>Industries: lending (current engagement)</p>
              <GoDeeper label="the competency rows and how to check any partner">
                <p className="sf-rule">Salesforce's listing breaks the {SF_CERTIFICATIONS} certifications down by competency, including 7 on Agentforce (read {SF_VERIFIED_LABEL}). Open any partner's listing and read the same box before you hire them; ask who will do your work and look them up on Trailblazer.</p>
                <div className="sf-links"><Link className="sf-link" to={PA}>How to check any Salesforce partner</Link></div>
              </GoDeeper>
            </SmartUnit>
          </div>
        </SmartSection>

        {/* 8 CONCERNS: objection questions as H3, answers in Go deeper. Spec §4 row 8. */}
        <SmartSection
          id="concerns"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before hiring a Salesforce partner",
            lede: "Four questions buyers raise before the first call, each with the direct answer.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <LedgerRule as="article" key={c.q} className="sf-c6" delay={i % 2 ? 0.08 : 0}>
              <h3 className="sf-h3">{c.q}</h3>
              <GoDeeper label={c.q} title="The answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 9 DESK: the one form. Spec §4 row 9. */}
        <DeskCTA form={{ topic: "hub", topicLabel: "Salesforce implementation", heading: "Book a free health check", prompt: "What is your Salesforce doing wrong?", submitLabel: "Book a free health check" }} />

        {/* 10 FAQ: questions visible, answers in the HTML behind native disclosures. Spec §4 row 10. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce consulting questions buyers ask</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        {/* 11 NEAR YOU: three local cards + the city nav. Spec §4 row 11. Houston waits for its gate. */}
        <SmartSection
          id="near"
          compact
          heading={{
            id: "h-near",
            title: "Salesforce consultants by city and region",
            lede: "We take on Salesforce work across the US remotely from Malvern, PA, and meet in person around Philadelphia.",
          }}
        >
          <ServiceCards items={SF_PAGES.local.map((l) => ({ to: l.to, title: l.title, body: l.body }))} className="sf-cards-local" />
          <nav aria-label="Salesforce consultants by city" style={{ marginTop: 32 }}>
            <p className="sf-kicker">By city</p>
            <ul className="sf-links" style={{ marginTop: 8 }}>
              {CITY_NAV.map((c) => (
                <li key={c.to}><Link className="sf-link" to={c.to}>Salesforce consultants in {c.label}</Link></li>
              ))}
            </ul>
          </nav>
        </SmartSection>
      </SfPage>
    </Layout>
  );
}
