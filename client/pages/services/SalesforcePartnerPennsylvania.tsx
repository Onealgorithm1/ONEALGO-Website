import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, ServiceCards, HUB_SERVICE_CARDS, StageRail, StageUnits, EvidenceDialog, SourcesDialog, Verify,
  PhotoCreditDialog, PhotoCreditsLine, type SfFaqItem, type Stage, type SfSource, sfHeroAvifSrcset, SF_HERO_SIZES } from "../../components/sf";
import {
  SF_APPEXCHANGE_URL, SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_LISTING_ID, SF_PAGES, SF_PHONE, SF_PLATFORM_CERTS,
  SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";
import { SF_CITY_HEROES, sfCityFiles } from "../../data/sfCityHeroes";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce-consulting-partner-pennsylvania. Rebuilt 2026-10-23 on the redesign-v2 kit
 * (client/components/sf), in the approved prototype's design (Louis 2026-10-23, "build the 23 pages this way"),
 * with title, meta, H1, the H2/H3 list and schema from seo-completeness/structure-spec.md §7.1. Build notes:
 * onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/build-v2/page-pennsylvania.md.
 *
 * THIS PAGE'S JOB: the buyer asking "what is a Salesforce Consulting Partner, and how do I check one?" It owns the
 * how-to-check topic site-wide, the partner tiers, and Professional Services vs a partner. Cost lives on the cost
 * guide, the consultant role on Philadelphia, editions on Chester County.
 *
 * SECTION ORDER (spec §0: heading order is not a ranking factor; every H2 string is the spec's, exact):
 * hero (Pennsylvania photo) → definition + tiers abreast → Professional Services or a partner (night split) →
 * how to check (FIG. 1 rail + four checks) → what you find when you check us (readouts, who leads, delivered) →
 * services → across Pennsylvania → concerns → desk → FAQ → photo credit.
 *
 * ⛔ FACTS: only what was on this page at ef1a8f0, the allowed proof (spec §8.1) and owner-decisions.md.
 * - Tier: Louis 2026-10-23 ~19:05 "say Select" (Salesforce's listing shows Select, read 2026-10-23). The tier
 *   names Provisional / Select / Summit and "points-based tiering retired 2 March 2026" are spec §7.1 row 3
 *   (verified in seo-completeness/verify.md). No tier thresholds: the overview that holds them is marked
 *   confidential (partner-program-credentials-2026-10-23.md), so it is named in the sources pop-up, never quoted
 *   or linked. Never the FY26 tier names.
 * - Never announce an absence (voice addendum): no line about what the listing lacks. Clients never named.
 * - Travel: Louis 2026-10-23 ~19:05 answer 3 wording (most work remote; in person when the project calls for it,
 *   easiest around Philadelphia; on-site visits planned into larger projects elsewhere).
 *
 * LINKS: in-site only in the body. Every source sits in the "Sources" pop-up; the one off-site control per record
 * is inside its dialog (new tab, noopener, external mark). The AppExchange dialog is page-local only because the
 * shared AppExchangeEvidence has no tier row yet (build-v2/requests-pennsylvania.md); when it does, drop the local
 * dialog and use <Readouts /> with its default evidence. */

const PAGE_PATH = "/services/salesforce-consulting-partner-pennsylvania";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const TITLE = "Salesforce Consulting Partner in Pennsylvania | OneAlgorithm";
const DESCRIPTION =
  "Salesforce Consulting Partner in Pennsylvania, listed on AppExchange, office in Malvern. Check any partner, then book a free health check: (610) 890-9711.";
const PHOTO = SF_CITY_HEROES.pennsylvania;
const PHOTO_FILES = sfCityFiles("pennsylvania");
const OG_IMAGE = `https://onealgorithm.com${PHOTO_FILES.og}`;
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const PHL = "/services/salesforce-consultant-philadelphia";
const CHE = "/services/salesforce-consultant-chester-county";
/** Owner decision 2026-10-23 ~19:05 (answer 1): the tier Salesforce's listing shows, read SF_VERIFIED_ON. */
const SF_TIER = "Select";

/* Sources for the partner program and the comparison (pages only; never a data file or query). */
const SOURCES: SfSource[] = [
  {
    name: "Salesforce News: the FY27 Salesforce Partner Program",
    what: "Points-based tiers retired and 28 Competencies introduced, announced 2 March 2026",
    read: "read 23 October 2026",
    page: "https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/",
  },
  {
    name: "Salesforce: FY27 Consulting Partner Program overview (April 2026)",
    what: "The Provisional, Select and Summit tiers; Competencies rated on certifications, completed projects and customer satisfaction (paraphrased, not quoted)",
    read: "read 23 October 2026",
  },
  {
    name: "Salesforce Ben: the 2026 partner program",
    what: "Independent report on the new program, 3 March 2026",
    read: "read October 2026",
    page: "https://www.salesforceben.com/salesforce-massively-overhauls-partner-program/",
  },
  {
    name: "Salesforce: Find a Consulting Partner",
    what: "Names AppExchange Partner Finder as Salesforce's register of consulting partners",
    read: "read 23 October 2026",
    page: "https://www.salesforce.com/partners/find-a-consulting-partner/",
  },
  {
    name: "Salesforce: Professional Services",
    what: "Salesforce's own expert services, and its note that most customers use both (paraphrased)",
    read: "read 23 October 2026",
    page: "https://www.salesforce.com/services/professional-services/",
  },
  {
    name: "AppExchange Partner Finder",
    what: "The Consultants section of AppExchange: one listing per firm",
    read: "read October 2026",
    page: "https://appexchange.salesforce.com/consulting",
  },
  {
    name: "Trailhead: Verify Credentials",
    what: "Salesforce's public check of a person's certifications",
    read: "read 23 October 2026",
    page: "https://trailhead.salesforce.com/credentials/verification",
  },
];

/* FIG. 1: the four checks, in the order a buyer runs them (spec §7.1 row 2). Station titles are the H3s; the
   desktop drawing centres each title on its station, so s1 and s4 stay under ~26 characters. */
const CHECKS: Stage[] = [
  {
    k: "s1", num: "01", title: "Find the firm's listing", sub: "AppExchange Partner Finder",
    line: "Search the firm's name in AppExchange Partner Finder, Salesforce's own register of consulting partners, and open its listing.",
    details: [
      "Partner Finder is the Consultants section of AppExchange",
      "A firm that calls itself a Salesforce partner belongs there",
      "The listing shows the firm's partner tier at the top",
      `Ours: listing ${SF_LISTING_ID}, ${SF_TIER} tier`,
    ],
  },
  {
    k: "s2", num: "02", title: "Count certified people and certifications", short: "Count people and certifications", sub: "Salesforce's counts, not the firm's",
    line: "Salesforce certifies people, not companies; the listing shows how many certified people the firm employs and how many certifications they hold.",
    details: [
      "Salesforce keeps those counts, not the firm",
      "Compare firms on the same two figures",
      `Ours: ${SF_CERTIFIED_PEOPLE} certified people holding ${SF_CERTIFICATIONS} certifications, read ${SF_VERIFIED_LABEL}`,
    ],
  },
  {
    k: "s3", num: "03", title: "Read the competency row", sub: "for the product you are buying",
    line: "Read the competency row for the product you are buying, for example Platform or Marketing Cloud, rather than the firm's overall total.",
    details: [
      "Salesforce groups certifications into competencies",
      "Each competency is rated on certifications, completed projects and customer satisfaction",
      `Ours: ${SF_CERTIFICATIONS} certifications, 7 of them on Agentforce`,
    ],
  },
  {
    k: "s4", num: "04", title: "Check who will do the work", sub: "public Trailblazer profiles",
    line: "Ask who on that list will work on your org, then look them up on their Trailblazer profiles.",
    details: [
      "A Trailblazer profile shows which certifications are active today",
      "Salesforce's Verify Credentials page checks any certification by name",
      "Ours: Sreenivas Amirisetti (14 active) and Swapna Amirisetti (2 active)",
    ],
  },
];

/* The seven services: the hub's cards (exact service names, scene details), with this page's delivered-work
   one-liners (the ef1a8f0 wording) on the four cards that carry a delivered pattern. */
const PA_BODIES: Record<string, string> = {
  "/services/salesforce-data-migration": "We have migrated QuickBase and Kissflow systems into Salesforce; yours is reconciled before go-live.",
  "/services/salesforce-integration": "We keep SAP and Salesforce in sync, with the owner of each record agreed before anything is built.",
  "/services/salesforce-managed-services": "Weekly administration and development with hours reported every week, ongoing for a lending company since April 2026.",
  "/services/salesforce-marketing-cloud-consulting": "Support for Marketing Cloud accounts already running, backed by about 18 months of Marketing Cloud support.",
};
const PA_CARDS = HUB_SERVICE_CARDS.map((c) => (PA_BODIES[c.to] ? { ...c, body: PA_BODIES[c.to] } : c));

/* Pennsylvania pages beside the "across Pennsylvania" unit (spec §7.1 row 8: link PHL and CHE; ILK-02: one body link to the hub). */
const PA_ROUTES = [
  { to: PHL, title: "Salesforce consultants for Philadelphia companies", tag: "Philadelphia" },
  { to: CHE, title: "Salesforce consultant for Chester County businesses", tag: "Malvern · Chester County" },
  { to: "/services/salesforce", title: "Salesforce consulting services", tag: "All seven services" },
];

/* Objection questions (H3), answers in Go deeper. None repeats a FAQ question. */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will we get a junior team after the sale?", a: <>You work directly with the certified people doing the work, with no hand-off after the sale. Sreenivas Amirisetti leads our Salesforce practice; his credentials are listed under <a className="sf-link" href="#record">our record</a>.</> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "What does it cost after the free week?", a: <>Fixes are scoped in writing first. <Link className="sf-link" to={COST}>What Salesforce work costs</Link></> },
  { q: "You are not in our part of Pennsylvania.", a: <>Most of the work runs remotely inside your org, and on-site visits are planned into larger projects. <a className="sf-link" href="#pennsylvania">Salesforce consultants across Pennsylvania</a></> },
];

/* FAQ: this page's question bank (questions-by-page.md, PA). One owner page per question across the 23 pages.
   Dropped from the ef1a8f0 list because each is now an H2 here (spec §3, HDG-08): "What is a Salesforce Consulting
   Partner?" and "What is the difference between Salesforce Professional Services and a Consulting Partner?". */
const FAQS: SfFaqItem[] = [
  {
    q: "Who are the top Salesforce partners in Pennsylvania?",
    a: "Salesforce does not publish a ranking of partners by state. AppExchange Partner Finder lists every consulting partner on the same record: its tier, certified people, certifications by competency and, where shown, competency badges and customer ratings. Build your shortlist on those figures. 'Top 10' lists on directory sites are compiled by the directory, not by Salesforce.",
    link: { to: "#check", label: "How to check a Salesforce partner before hiring" },
  },
  {
    q: "What is the difference between a Salesforce consultant and an implementation partner?",
    a: "A consultant is a person; a partner is a firm. 'Implementation partner' is the everyday name for the firm you hire to set Salesforce up, and Salesforce lists those firms as Consulting Partners. Many Salesforce consultants work inside partner firms, and others work freelance.",
  },
  {
    q: "Partner or freelancer: does it matter?",
    a: "A good freelancer can do excellent work. A listed partner adds a public record and cover: several certified people who can pick the work up if one is unavailable. Ask any firm two things: who specifically will work on your org, and what happens if that person is out. Ask us both, too.",
    link: { to: PHL, label: "What a Salesforce consultant actually does" },
  },
  {
    q: "What should I ask a Salesforce partner before hiring?",
    a: "Four questions sort most firms. Who will do the work, and which certifications do they hold? Which competency on the listing matches what you are buying? How will they prove your data arrived intact after a migration? Who looks after Salesforce once it is live? A strong partner answers all four before you sign.",
  },
  {
    q: "Does it matter whether a partner's people are certified?",
    a: "Yes. Salesforce certifies people, not companies, so a partner's certifications are only as useful as the people who will work on your org. The listing counts certified people and certifications by competency; ask who will do your work, then check their active certifications on Trailblazer. Ours are listed under Who leads your Salesforce work.",
    link: { to: "#record", label: "Who leads your Salesforce work" },
  },
  {
    q: "Do we have to be in Pennsylvania to work with you?",
    a: "No. Our office is in Malvern, Chester County, and we work with companies across the United States. Most of the work runs remotely inside your org; in-person sessions happen when the project calls for them, easiest across the Philadelphia region, and on larger projects elsewhere, on-site visits such as kickoff, go-live or training are planned into the project.",
  },
];

export default function SalesforcePartnerPennsylvania() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: PHOTO.alt,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadImage: PHOTO_FILES.avif1600,
    preloadImageSrcset: sfHeroAvifSrcset(PHOTO_FILES),
    preloadImageSizes: SF_HERO_SIZES,
    preloadImageType: "image/avif",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Consulting Partner Services in Pennsylvania",
          "A Select Salesforce Consulting Partner listed on AppExchange, based in Malvern, Pennsylvania, working with companies across Pennsylvania: Sales Cloud and Service Cloud configuration, Flow automation, data migration, integration, ongoing support, and a free one-week Salesforce health check.",
          "CRM & Salesforce Implementation",
          PAGE_URL,
          {
            areaServed: { "@type": "State", name: "Pennsylvania" },
            image: OG_IMAGE,
            offers: SF_HEALTH_CHECK_OFFER,
            catalog: { name: "Salesforce consulting services", urls: SF_PAGES.services.map((s) => `https://onealgorithm.com${s.to}`) },
          },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Pennsylvania" }]}>
        {/* 1 HERO, photo variant: the Pennsylvania photo is the LCP (eager, preloaded, never animated); the proof
            line sets 16 / 53 / 38 in display numerals with Verify. */}
        <SFHero
          kicker={<>{SF_TIER} Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="A Salesforce Consulting Partner in Pennsylvania, based in Malvern"
          lede="We configure, migrate, integrate and support Salesforce for Pennsylvania companies from Malvern, starting with a free one-week health check of your org."
          proof
          photo={PHOTO}
        />

        {/* 2 THE BASICS: two H2 units abreast at 1024+ (wide-layout addendum). Spec §7.1 rows 1 and 3. */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c6"
            headingId="h-what"
            title="What is a Salesforce Consulting Partner?"
            lede="A Salesforce Consulting Partner is an independent firm Salesforce lists in AppExchange Partner Finder, its public register of consultants."
            lead="Salesforce, not the firm, publishes the record, so a partner's claims about people and certifications are checkable before you hire."
            points={[
              "One public listing per firm, kept by Salesforce",
              "Certified people and certifications, counted by competency",
              "Salesforce certifies people, not companies",
            ]}
          >
            <GoDeeper label="what a listing proves, and what we do">
              <p className="sf-rule">
                Anyone can call themselves a Salesforce consultant. A listing ties the claim to figures Salesforce publishes: how many certified people work at the firm and how many certifications they hold, by competency. That lets you compare firms on the same record.
              </p>
              <p><span className="sf-lead-in">What we do:</span> We are a listed Salesforce Consulting Partner in Pennsylvania, based in Malvern, configuring, migrating, integrating and supporting Salesforce for companies across the state and the United States.</p>
              <p><span className="sf-lead-in">What it costs:</span> The first step is free: a one-week Salesforce health check of your org, with a written list ranked by what to fix first.</p>
              <div className="sf-links">
                <Link className="sf-link" to={HC}>Start with the free health check</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c6"
            delay={0.08}
            headingId="h-tiers"
            title="Salesforce partner tiers: Provisional, Select and Summit"
            lede="Since March 2026, Salesforce ranks consulting partners Provisional, Select or Summit, and rates their Competencies on certifications, completed projects and customer satisfaction."
            lead={<>The tier is set by Salesforce, not the firm; OneAlgorithm's AppExchange listing shows {SF_TIER}, read {SF_VERIFIED_LABEL}.</>}
            points={[
              "Provisional: new partners, onboarding and winning their first projects",
              "Select: partners with a track record of customer success",
              "Summit: the top tier, weighed on Competencies, partner-sourced business and strategic value",
            ]}
          >
            <p className="sf-mono" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Salesforce's AppExchange record ·{" "}
              <Verify id="appexchange">Verify the tier</Verify>
              <Verify id="sources">Sources</Verify>
            </p>
            <GoDeeper label="Competencies, and how tiers changed in 2026">
              <p className="sf-rule">
                On 2 March 2026 Salesforce retired its points-based partner tiers and replaced 170 Navigator distinctions with 28 Competencies. Each Competency is rated Accredited or Expert on the same three measures: certifications held, projects completed and customer satisfaction (CSAT) scores.
              </p>
              <p>On a listing, the tier sits at the top and the competency rows show where a firm's certifications sit, for example Platform or Agentforce. Read the row for the product you are buying.</p>
              <div className="sf-links"><a className="sf-link" href="#check">How to check a Salesforce partner before hiring</a></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 3 THE SPLIT: Salesforce's own team or an independent firm, one night band. Spec §7.1 row 7 (the comparison
            is visible: two H3 units carry the four rows of the ef1a8f0 table, paraphrased from Salesforce). */}
        <SmartSection
          id="compare"
          tone="night"
          grid
          heading={{
            id: "h-compare",
            title: "Salesforce Professional Services or a Consulting Partner?",
            lede: "Salesforce sells its own expert services and also lists independent partners; they suit different projects, and Salesforce says most customers use both.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c6"
            kicker="Salesforce's own team"
            title="Salesforce Professional Services"
            lede="Salesforce's own experts, working closely with its product teams, on complex, high-impact projects from first setup to large transformations."
            points={[
              "Reached through the contact form on Salesforce's Professional Services page",
              "What you can check first: the customer stories Salesforce publishes",
            ]}
            measure={false}
          />
          <SmartUnit
            level={3}
            className="sf-c6"
            delay={0.08}
            kicker="Independent firm"
            title="A Salesforce Consulting Partner"
            lede="An independent firm's certified people, positioned by Salesforce for delivery across industries, with more flexibility and specialist expertise."
            points={[
              "Found in AppExchange Partner Finder, one public listing per firm",
              "What you can check first: certified people and certifications by competency",
            ]}
            measure={false}
          >
            <GoDeeper label="what a partner's listing shows">
              <p className="sf-rule">The firm's listing shows its tier, its certified people, its certifications by competency and, where shown, competency badges and customer ratings. Salesforce publishes those figures, so you can compare firms line by line.</p>
            </GoDeeper>
          </SmartUnit>
          <p className="sf-mono sf-c12" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
            Paraphrased from Salesforce's Find a Consulting Partner and Professional Services pages, read 23 October 2026 ·{" "}
            <Verify id="sources">Sources</Verify>
          </p>
        </SmartSection>

        {/* 4 HOW TO CHECK: the answer unit, FIG. 1 (the rail, scroll-drawn) and the four checks wired to their stations.
            Spec §7.1 row 2; this page owns the topic site-wide. */}
        <SmartSection id="check" grid labelledBy="h-check">
          <SmartUnit
            className="sf-c7"
            headingId="h-check"
            title="How to check a Salesforce partner before hiring"
            lede="Four checks, all on Salesforce's own register: find the firm, count its certified people, read the competency row, and ask who will do the work."
            lead="Run them on any firm you are considering, us included; every figure is Salesforce's, so firms compare on the same record."
          />
          <StageRail
            fig={1}
            stations={CHECKS}
            className="sf-c12"
            title="Diagram of the four checks a buyer runs on any Salesforce partner"
            desc="A rail runs through four stations in order: find the firm's listing in AppExchange Partner Finder, count its certified people and certifications, read the competency row for the product being bought, and check who will do the work on their Trailblazer profiles."
            stamp="Checking a partner"
            caption="The four checks in the order a buyer runs them, all on Salesforce's own records. Run them on any firm, us included."
          />
          <StageUnits items={CHECKS} className="sf-c12" />
        </SmartSection>

        {/* 5 THE RECORD: readouts (count up once, below the fold), who leads the work (H3 of this H2, so first in the DOM and
            on the left: no inline grid placement, which would defeat the phone stacking rule), delivered work. Spec §7.1 rows 4 and 6. */}
        <SmartSection
          id="record"
          tone="surface"
          heading={{
            id: "h-record",
            title: "What you will find when you check OneAlgorithm",
            lede: <>Salesforce's AppExchange record lists OneAlgorithm as a {SF_TIER} Consulting Partner with {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications, read {SF_VERIFIED_LABEL}.</>,
          }}
        >
          <Readouts withEvidence={false} />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <LedgerRule as="aside" className="sf-c5" aria-labelledby="h-lead">
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
            <SmartUnit
              className="sf-c7"
              delay={0.08}
              headingId="h-delivered"
              title="Salesforce work we have delivered"
              lede="We have delivered Salesforce development, an SAP sync, QuickBase and Kissflow migrations and Marketing Cloud support; client names stay private."
            >
              <DeliveredLedger />
              <p className="sf-mono" style={{ marginTop: 10 }}>Industries: lending (current engagement)</p>
              <GoDeeper label="our listing, line by line">
                <p className="sf-rule">Listed as a {SF_TIER} Consulting Partner in AppExchange Partner Finder, listing {SF_LISTING_ID}, with the office in Malvern, Chester County, Pennsylvania. Salesforce counts our people and certifications against its competencies: {SF_CERTIFICATIONS} certifications, including 7 Agentforce and 1 Data 360 (read {SF_VERIFIED_LABEL}).</p>
                <p>Open the listing and compare it line by line; the Verify buttons above show what we read and when.</p>
              </GoDeeper>
            </SmartUnit>
          </div>
        </SmartSection>

        {/* 6 SERVICES: the seven cards, 4 + 3, the first spanning two. Spec §7.1 row 5. */}
        <SmartSection
          id="services"
          heading={{
            id: "h-services",
            title: "Salesforce consulting services for Pennsylvania companies",
            lede: "We configure Sales Cloud and Service Cloud, automate manual steps with Flow, and deliver the seven services below, starting with a free health check.",
          }}
        >
          <ServiceCards items={PA_CARDS} />
        </SmartSection>

        {/* 7 ACROSS PENNSYLVANIA: the second phrasing of the primary, places in sentences, PHL / CHE / hub beside it. Spec §7.1 row 8. */}
        <SmartSection id="pennsylvania" tone="surface" grid labelledBy="h-pennsylvania">
          <SmartUnit
            className="sf-c7"
            headingId="h-pennsylvania"
            title="Salesforce consultants across Pennsylvania"
            lede="From Malvern we take on Salesforce work across Pennsylvania, from Philadelphia and the Lehigh Valley to Harrisburg and Pittsburgh."
            leadIn="The bottom line:"
            lead="Most of the work runs remotely inside your org, with in-person sessions when the project calls for them, easiest across the Philadelphia region."
          >
            <GoDeeper label="visits and the Malvern office">
              <p className="sf-rule">Salesforce work happens inside your org, so distance changes little. For larger projects elsewhere in Pennsylvania, on-site visits such as kickoff, go-live or training are planned into the project.</p>
              <p>Our office: 625 Swedesford Rd, Unit B, Malvern, PA 19355, in Chester County.</p>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08} aria-labelledby="h-pa-pages">
            <p className="sf-kicker" id="h-pa-pages">Pennsylvania pages</p>
            <nav aria-labelledby="h-pa-pages" className="sf-ledger" style={{ marginTop: 16 }}>
              {PA_ROUTES.map((r) => (
                <Link key={r.to} className="sf-lrow" to={r.to}>
                  <span className="sf-h4">{r.title}</span>
                  <span className="sf-mono">{r.tag}</span>
                </Link>
              ))}
            </nav>
          </LedgerRule>
        </SmartSection>

        {/* 8 CONCERNS: objection questions as H3, answers in Go deeper. Spec §7.1 row 10. */}
        <SmartSection
          id="concerns"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before choosing a Pennsylvania Salesforce partner",
            lede: "Four questions Pennsylvania buyers raise before the first call, each with the direct answer.",
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

        {/* 9 DESK: the one form. Spec §7.1 row 9 (H2 = DeskCTA's default, exact; H3s "Get a free health check" and "What happens next"). */}
        <DeskCTA form={{ topic: "pa", topicLabel: "Salesforce Consulting Partner · Pennsylvania", heading: "Get a free health check", prompt: "What is your Salesforce doing wrong?", submitLabel: "Get a free health check" }} />

        {/* 10 FAQ: questions visible, answers in the HTML behind native disclosures. Spec §7.1 row 11. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Questions about Salesforce partners in Pennsylvania</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        {/* Evidence pop-ups (one per id). AppExchange: the shared rows plus the tier (owner, 2026-10-23). */}
        <EvidenceDialog
          id="appexchange"
          title="Salesforce's AppExchange record of OneAlgorithm"
          intro="What the listing said when a person at OneAlgorithm read it. We quote the figures; we do not reproduce Salesforce's page."
          rows={[
            { th: "Partner type", td: "Consulting Partner" },
            { th: "Partner tier", td: SF_TIER },
            { th: "Salesforce-certified people", td: SF_CERTIFIED_PEOPLE },
            { th: "Certifications held", td: SF_CERTIFICATIONS },
            { th: "Listing", td: SF_LISTING_ID },
            { th: "Read on", td: SF_VERIFIED_LABEL },
            { th: "Source", td: "appexchange.salesforce.com" },
            { th: "Check any partner", td: "appexchange.salesforce.com/consulting" },
          ]}
          external={{ href: SF_APPEXCHANGE_URL }}
        />
        <SourcesDialog id="sources" title="Where these facts come from" sources={SOURCES} intro="Every statement about Salesforce's partner program on this page comes from these pages, read by a person at OneAlgorithm on the date shown. Nothing on the page links to them directly." />
        <PhotoCreditsLine photo={PHOTO} />
      </SfPage>
    </Layout>
  );
}
