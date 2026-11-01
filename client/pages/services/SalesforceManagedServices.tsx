import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, PersonCredentials, FAQ, DeskCTA,
  StageRail, StageUnits, SourcesDialog, Verify, type SfFaqItem, type Stage, type SfSource,
} from "../../components/sf";
import { ManagedWeek } from "../../components/sf/illus";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PHONE } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce-managed-services. Rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf), in the
 * approved design (Louis 2026-10-23: "Yes, build the 23 pages this way"); seo-completeness/structure-spec.md §5.1 for
 * title, meta, H1 and the 13 H2 strings (exact). Build notes: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/
 * build-v2/page-managed-services.md. Section order follows the prototype's rhythm (spec §0: order is not a ranking
 * factor); two H2 units run abreast where the desktop is otherwise empty (wide-layout addendum).
 *
 * ⛔ FACTS: only what was on this page at ef1a8f0 or in the verified notes. No SLA, response time, price, retainer,
 * term or notice of ours (owner 2026-10-23 19:05, answer 5: "every project is different"; engagements are scoped
 * after the free health check and the terms are set in the written proposal). Competitor prices are their own
 * published figures, re-read 23 October 2026. The development list stays generic (fix round FV-12: no SOQL or
 * custom-metadata line that mirrors the lending job; decision 5 still open). The lending client is never named.
 * Security (spec row 9): the spec's "least-privilege / NDA on request / access removed at the end" are owner facts
 * not yet confirmed (gap-audit-verified-gaps.md), so the unit states only what is verified: the read-only user for
 * the free week, sandbox-first changes, the written change record, and Salesforce's own 180-day Setup Audit Trail.
 * Never SOC 2 / ISO / NIST / CMMC / FedRAMP. Never a years-of-experience figure.
 *
 * LINKS: in-site only in the body. Sources (Salesforce, BLS, the five firms) sit in SourcesDialog pop-ups; the only
 * off-site anchors are inside those dialogs and the two evidence dialogs (new tab, noopener, external mark). No
 * oesprofile / data URL anywhere (the BLS figures cite the OEWS program page). */

const PAGE_PATH = "/services/salesforce-managed-services";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const READ_ON = "23 October 2026";
const TITLE = "Salesforce Managed Services & Admin Support | OneAlgorithm";
const DESCRIPTION =
  "Salesforce managed services: weekly admin, development and release testing from a listed Consulting Partner. Free one-week health check: (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-managed-week.jpg";
const OG_ALT =
  "Illustration with sample data: one week of Salesforce managed services for a sample company, with tickets closed, fields added, flows updated, release checks passed and the hours used.";
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const INT = "/services/salesforce-integration";
const DM = "/services/salesforce-data-migration";
const MC = "/services/salesforce-marketing-cloud-consulting";
const PA = "/services/salesforce-consultant-philadelphia#record"; // 2026-11-01: the Pennsylvania partner page was 301d into Philadelphia; its #record section shows how to check a partner
const SA = "/services/hire-salesforce-developers"; // 2026-11-01: the Salesforce-only staff augmentation page

/* The engagement rail (FIG. 2): the four verified steps from the page at ef1a8f0 (free week → who handles what →
   build, test, deploy, write down → the org gets easier to change), with owner answer 5 (terms in the written
   proposal). The spec's "onboarding week" and "monthly rhythm" are not on record, so the rhythm stays weekly. */
const ENGAGEMENT: Stage[] = [
  { k: "s1", num: "01", title: "Free one-week health check", sub: "read-only user · ranked list",
    line: "A week inside your org on a read-only user you create, ending in a written list ranked by what to fix first.",
    details: ["Licenses, data, automation, permissions and integrations reviewed", "A written list ranked by what to fix first", "The list is yours; if the org is basically fine, we say so"] },
  { k: "s2", num: "02", title: "Scope and written proposal", sub: "who handles what · terms",
    line: "We agree who handles what, and the terms are set in a written proposal scoped from the health check.",
    details: ["Your admin keeps day-to-day user requests, or we cover all of it", "The ranked list becomes the first roadmap, in the order you agree", "Every fix scoped in writing before work starts"] },
  { k: "s3", num: "03", title: "The weekly rhythm", sub: "sandbox · test · deploy · record",
    line: "Each change is built in a sandbox, tested, deployed and written down, with hours reported every week.",
    details: ["New requests and the roadmap worked side by side", "A written record of every change: what changed and why", "Hours reported every week against the agreed list"] },
  { k: "s4", num: "04", title: "Technical debt paid down", sub: "easier to change, week by week",
    line: "Each request is a chance to replace a hard-coded value, fold a profile edit into a permission set, or retire a flow.",
    details: ["Technical debt paid down as part of the weekly work", "Settings an admin can change in place of hard-coded values", "Flows retired when a newer one made them redundant"] },
];

/* Managed services vs the alternatives (MS-8, verbatim cells from ef1a8f0). Rendered as three side-by-side units
   with each model's full column in its Go deeper, so the comparison reads at 390 without a 4-column table. */
const COMPARE_TOPICS = ["User and access requests", "New automation and fixes", "Salesforce's three releases a year", "Where changes are recorded", "When someone leaves", "How the cost works"];
const COMPARE: Record<"inhouse" | "project" | "managed", string[]> = {
  inhouse: ["Your admin, as they arrive", "Your admin, when they have the skills and the time", "Your admin, alongside the daily queue", "Wherever your admin keeps notes", "What they knew leaves with them unless it was written down", "Salary and benefits, all year"],
  project: ["Outside most project scopes; they wait for your team", "A new statement of work for each change", "Covered only when bought as its own project", "The project's handover documents", "The project ends and the team moves on", "A quote per project"],
  managed: ["Your admin keeps them, or we take them as part of the week", "Built in a sandbox, tested and deployed as part of the plan", "Release notes read against your org and tested in a sandbox before production", "A written record of every change: what changed and why", "The change record stays with your org", "One agreement for the ongoing work, scoped in writing first"],
};
function CompareTable({ col, label }: { col: keyof typeof COMPARE; label: string }) {
  return (
    <table>
      <caption className="sr-only">{label}</caption>
      <tbody>
        {COMPARE_TOPICS.map((t, i) => (
          <tr key={t}><th scope="row">{t}</th><td>{COMPARE[col][i]}</td></tr>
        ))}
      </tbody>
    </table>
  );
}

/* MS-3: each firm's own published wording, re-read 2026-10-23 on their own page. A market table: no column is
   highlighted, no CTA row. The pages are listed in the "pricing" sources pop-up, never linked from the body. */
const FIRMS: [string, string][] = [
  ["Vantage Point", "Managed services from $5,850 a month; retainers from $2,000 a month; blocks of hours from $2,500"],
  ["KeyNode Solutions", "Price set by plan (minimum hours a month); nonprofits from $2,000 a month; 3-month trial; no onboarding fee"],
  ["Melonleaf", "Managed services starting at USD $30 an hour"],
  ["TechForce Services", "Plans of 30, 40 and 80 service delivery hours a month; prices on request"],
  ["ScienceSoft", "A monthly fee set by scope: clouds and editions, users and customizations; larger changes at a fixed price"],
];
const PRICING_SOURCES: SfSource[] = [
  { name: "Vantage Point", what: "Salesforce managed services pricing article, updated 10 October 2026", read: `re-read ${READ_ON}`, page: "https://vantagepoint.io/blog/sf/salesforce-managed-services-pricing" },
  { name: "KeyNode Solutions", what: "Salesforce managed services and support page", read: `re-read ${READ_ON}`, page: "https://www.keynodesolutions.com/services/salesforce-managed-services-and-support/" },
  { name: "Melonleaf", what: "Salesforce managed services (USA) page", read: `re-read ${READ_ON}`, page: "https://melonleaf.com/salesforce-managed-services-usa/" },
  { name: "TechForce Services", what: "Managed services page", read: `re-read ${READ_ON}`, page: "https://www.techforceservices.com/managed-services/" },
  { name: "ScienceSoft", what: "Salesforce managed services page", read: `re-read ${READ_ON}`, page: "https://www.scnsoft.com/salesforce/managed" },
];
/* Salesforce's own facts. The two Help articles are named as text only: their addresses are query URLs. */
const SALESFORCE_SOURCES: SfSource[] = [
  { name: "Salesforce, release cycle", what: "Three releases a year: Spring typically in February, Summer in June, Winter in October", read: `read ${READ_ON}`, page: "https://www.salesforce.com/products/innovation/releases/" },
  { name: "Salesforce Trust Status", what: "Each instance's preview and upgrade dates", read: `read ${READ_ON}`, page: "https://status.salesforce.com/" },
  { name: "Salesforce Help, article “Release Updates”", what: "Each release update has a date by which to complete its steps; a test run shows the effect before Salesforce enforces it (help.salesforce.com)", read: `read ${READ_ON}` },
  { name: "Salesforce Help, article “Monitor Setup Changes with Setup Audit Trail”", what: "Recent setup changes and who made them, kept for 180 days, then deleted (help.salesforce.com)", read: `read ${READ_ON}` },
];
/* BLS OEWS: the program page, never the oesprofile query tool (link policy). A salary proxy: there is no SOC code
   for Salesforce admins; medians, never set against a price of ours. */
const BLS_SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS)", what: "May 2025, United States, median annual wage: 15-1211 Computer Systems Analysts $105,850; 15-1252 Software Developers $135,980. BLS counts Salesforce admins and developers inside these occupations.", read: `read ${READ_ON}`, page: "https://www.bls.gov/oes/" },
];

/* FAQ: managed-services rows of questions/questions-by-page.md, the eight of ef1a8f0's nine that are not now an H2
   ("How much do Salesforce managed services cost?" became H2 8, HDG-08). One owner page per question across the 23
   pages: none appears on a sibling page. Response times (Q9) stay off (owner answer 5). The array feeds FAQPage. */
const FAQS: SfFaqItem[] = [
  {
    q: "What should a Salesforce managed services agreement include?",
    a: "Response and resolution times for each severity level, a named lead who knows your org, who handles user requests, sandbox testing before each of Salesforce's three releases, a written record of every change, and how documentation and access come back to you if the agreement ends.",
  },
  {
    q: "Do I still need an in-house Salesforce admin?",
    a: "Not necessarily. If you employ an admin, they keep the requests from users and we take the development, the data jobs and the releases. If you have nobody, we cover all of it and write down every change, so you never depend on one person remembering why something was built.",
    link: { to: "#compare", label: "Managed services or an in-house admin" },
  },
  {
    q: "How do we get started with Salesforce managed services?",
    a: "With the free one-week health check. You create a read-only user, we review licenses, data, automation, permissions and integrations, and you get a written list ranked by what to fix first. From that list we agree who handles what, and the terms are set in a written proposal.",
    link: { to: HC, label: "Free one-week Salesforce health check" },
  },
  {
    q: "How do I choose a Salesforce managed services provider?",
    a: `Check the firm's AppExchange listing for its Salesforce certifications, ask who will work in your org and look up their Trailblazer profile, and ask how changes are tested and recorded. Then compare agreements on what they put in writing, not on hourly rate alone. Our listing shows ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications.`,
    link: { to: PA, label: "How to check a Salesforce partner" },
  },
  {
    q: "Can a managed services plan include Salesforce development?",
    a: "Yes. Ours does: Flow, Apex, validation rules, permission sets and data jobs, each built in a sandbox, tested, deployed and written down alongside the admin work. If you would rather have a Salesforce developer inside your own team, that is staff augmentation.",
    link: { to: SA, label: "Salesforce staff augmentation" },
  },
  {
    q: "What does a Salesforce managed services team do each week?",
    a: "A normal week mixes small and large: user setup and access, automation that needs building or fixing, configuration changes and data jobs, plus a release check three times a year. The mix changes every week, which is the point of having people who already know the org.",
  },
  {
    q: "Is Salesforce a managed service provider?",
    a: "No. Salesforce provides the software as a cloud service and runs the infrastructure, upgrades and security of the platform itself. It does not configure your org or handle your users' requests day to day; that work falls to your own admins or to a consulting partner. Salesforce lists those partners on the AppExchange, where we are listed.",
  },
  {
    q: "What services does Salesforce itself provide?",
    a: "Salesforce sells cloud software, mainly Sales Cloud and Service Cloud for CRM, Marketing Cloud for messaging, and the Platform for building your own apps, along with hosting, security, upgrades and its own support plans for the product. The work inside your org, setting up users, building automation, cleaning data and connecting other systems, is done by partners and in-house admins.",
  },
];

/* Objection questions (H3), answers in Go deeper. ⛔ None repeats a FAQ question or announces an absence. The city
   answer is the owner's 2026-10-23 19:05 travel wording (answer 3). */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Our last outside team never learned our org.", a: <>That is why the work starts with a free week inside your org, and why every change is written down: what changed and why. What we learn stays in the record, not in one person's head.</> },
  { q: "Will we be locked in?", a: <>The terms are set in a written proposal before work starts. The written record of every change stays with your org, so whoever looks after it next starts from that record.</> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "You are not in our city.", a: <>Most of the work happens remotely, inside your org. In-person sessions happen when the project calls for them, easiest across the Philadelphia region from our Malvern office; for larger projects elsewhere, on-site visits such as kickoff or training are planned into the project.</> },
];

/* Delivered work (spec row 10, §8.1): the approved patterns only, clients never named. The two managed-services
   rows lead; the SAP sync and the QuickBase/Kissflow moves link to the pages that own them. The lending scope stays
   generic (decision 5): no list of what was built. */
const DELIVERED: { title: string; tag: string; line?: string; link?: { to: string; label: string } }[] = [
  { title: "Salesforce development for a lending company", tag: "Ongoing since April 2026", line: "Development work every week, with the hours reported every week." },
  { title: "About 18 months of Marketing Cloud support", tag: "Support", line: "Support for a Marketing Cloud account already running.", link: { to: MC, label: "Salesforce Marketing Cloud consulting" } },
  { title: "An SAP-to-Salesforce sync", tag: "Delivered", link: { to: INT, label: "Salesforce integration services" } },
  { title: "QuickBase and Kissflow systems migrated into Salesforce", tag: "Delivered", link: { to: DM, label: "Salesforce data migration services" } },
];

/* Related services (spec §10.1: MS links hub, HC, MC, COST, INT, staff augmentation). */
const RELATED = [
  { to: "/services/salesforce", label: "Salesforce consulting services" },
  { to: HC, label: "Free one-week Salesforce health check" },
  { to: DM, label: "Salesforce data migration services" },
  { to: INT, label: "Salesforce integration services" },
  { to: MC, label: "Salesforce Marketing Cloud consulting" },
  { to: SA, label: "Salesforce staff augmentation" },
  { to: COST, label: "Salesforce implementation cost guide" },
];

export default function SalesforceManagedServices() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Salesforce Managed Services | OneAlgorithm",
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "Salesforce Managed Services | OneAlgorithm",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Managed Services",
          "Ongoing Salesforce administration and development: user and access management, Flow and Apex work, validation rules and permission sets, data jobs, integrations kept in sync and release checks before each of Salesforce's three releases a year, from a listed AppExchange Consulting Partner in Malvern, Pennsylvania, starting with a free one-week health check.",
          "Salesforce managed services",
          PAGE_URL,
          { image: OG_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Managed services" }]}>
        {/* 1 HERO. H1 = the LCP (spec §5.1, 9 words). FIG. 1 = managed-week, dealt by CSS 250ms after first paint. */}
        <SFHero
          kicker={<>Select Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce managed services from people who know your org"
          lede="We run the weekly Salesforce work for US companies, from admin requests and Flow fixes to release checks, starting with a free one-week health check."
          primary={{ href: "#start", label: "Book the free health check" }}
          proof
          figure={<ManagedWeek fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 WHAT IT IS + SIGNS, abreast (spec rows 1 and 4). */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What are Salesforce managed services?"
            lede="Salesforce managed services means an outside team looks after your org every week under one agreement: admin requests, automation, fixes, data jobs and release checks."
            leadIn="What we do:"
            lead="We run that week for you, with every change written down and hours reported every week."
            points={[
              "One agreement instead of a new project for every change",
              "Your admin keeps user requests, or we cover all of it",
              "Development, data jobs and release checks in the same plan",
            ]}
          >
            <GoDeeper label="why the work continues after go-live">
              <p className="sf-rule">
                Development does not stop at go-live. A new process needs a flow, a new rule needs a trigger, and a report needs a field that does not exist yet. Under managed services that work arrives in one weekly queue, worked by people who already know the org, instead of a new project each time.
              </p>
              <p><span className="sf-lead-in">What you get:</span> A written record of every change, what changed and why, and hours reported every week against the list you agreed.</p>
              <div className="sf-links">
                <Link className="sf-link" to="/services/salesforce">Salesforce consulting services</Link>
                <a className="sf-link" href="#how">How a managed services engagement runs</a>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            delay={0.08}
            headingId="h-signs"
            title="Signs you need a Salesforce managed services partner"
            lede="You need a partner when fixes wait weeks, nobody can trace who changed what, or each Salesforce release breaks something."
            points={[
              "Every change needs its own statement of work",
              "Your team still does by hand what Flow should do",
              "Knowledge of the org lives in one person's head",
            ]}
            measure={false}
          >
            <GoDeeper label="two more signs, and how to find out which apply">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li>An integration fails quietly and nobody hears about it</li>
                <li>Your admin spends the week on user requests, with no time left for automation</li>
              </ul>
              <p>The free one-week health check shows which of these apply to your org, in a written list ranked by what to fix first.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 3 ADMIN AND SUPPORT WE COVER (spec row 2): six H3 units, three abreast at 1280+. */}
        <SmartSection
          id="scope"
          grid
          heading={{
            id: "h-scope",
            title: "Salesforce admin and support we cover",
            lede: "We take the admin and support work your team does not have time for, and write down every change.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" title="Admin requests and user changes" lede="New reps set up the day they start, MFA resets done, and field access granted or removed as roles change." measure={false}>
            <GoDeeper label="admin requests and who keeps them">
              <p className="sf-rule">Small jobs that stop work when they wait. Your admin can keep them, or we take them as part of the week.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="Flow automation and fixes" lede="New automation as the business changes, and the fix when a flow hits a governor limit or a trigger misfires." measure={false}>
            <GoDeeper label="how automation changes are made">
              <p className="sf-rule">Built in a sandbox, tested, then deployed. Each request is also a chance to retire a flow that a newer one made redundant.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Data jobs and imports" lede="Backfills, record moves, list pulls and suppression scrubs, with the automation they would fire reviewed first." measure={false}>
            <GoDeeper label="data jobs and when they become a migration">
              <p className="sf-rule">Bigger moves, like QuickBase or Kissflow into Salesforce, run as a migration, reconciled before go-live.</p>
              <div className="sf-links"><Link className="sf-link" to={DM}>Salesforce data migration services</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" title="License management" lede="Users set up when people join and deactivated when they leave, so licenses follow the team." measure={false}>
            <GoDeeper label="licenses and seats">
              <p className="sf-rule">The free health check starts by listing seats paid for and never used. After that, the user list is kept in step with the team as part of the weekly admin work.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="Release checks" lede="Each of Salesforce's three releases a year, read against your org and tested in a sandbox first." measure={false}>
            <div className="sf-links" style={{ marginTop: 12 }}><a className="sf-link" href="#releases">Salesforce release management</a></div>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Integrations kept in step" lede="Salesforce kept in sync with the systems around it, SAP included, and checked whenever either side changes." measure={false}>
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={INT}>Salesforce integration services</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 4 THE WORK, night band: development (spec row 3) and releases (spec row 6) abreast. */}
        <SmartSection id="work" tone="night" grid labelledBy="h-dev">
          <SmartUnit
            id="development"
            className="sf-c6"
            headingId="h-dev"
            title="Salesforce development services in a support plan"
            lede="Development is part of the plan: Flow, Apex triggers, validation rules, permissions and data jobs, each built in a sandbox first."
            leadIn="What we do:"
            lead="One team holds both the requests and the code, so a new trigger arrives with its permissions and change record."
            points={[
              "Flow built, fixed, and retired when a newer one replaces it",
              "Apex where Flow cannot do the job",
              "Permission sets in place of one-off profile edits",
            ]}
          >
            <GoDeeper label="what development in the plan covers">
              <p className="sf-rule">Bulk data jobs run with the automation they would fire reviewed first. Every change is built in a sandbox, tested, deployed and written down: what changed and why.</p>
              <p>Want a Salesforce developer inside your own team instead? <Link className="sf-link" to={SA}>Salesforce staff augmentation</Link> adds one for as long as you need.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            id="releases"
            className="sf-c6"
            delay={0.08}
            headingId="h-releases"
            title="Salesforce release management, three times a year"
            lede="Salesforce ships three releases a year, and we read each one against your org and test it in a sandbox first."
            lead="Each release can change how automation that works today behaves tomorrow, so your users get new features without losing the processes they rely on."
            points={[
              "Release notes and release updates read against your org",
              "Tested in a sandbox during Salesforce's preview window",
              "Fixed before the release reaches production",
            ]}
          >
            <GoDeeper label="the release calendar and release updates">
              <p className="sf-rule">Salesforce's published pattern: Spring typically in February, Summer in June, Winter in October (salesforce.com, read {READ_ON}). Your instance's preview and upgrade dates are on Salesforce Trust Status.</p>
              <p>Each release update in Setup has a date by which to complete its steps. Until then you can switch on a test run and see the effect in your org before Salesforce enforces it in a named release (Salesforce Help, read {READ_ON}).</p>
              <p><span className="sf-lead-in">What we do:</span> Release updates are the changes most likely to break working automation, so we run them in a sandbox first and you see the effect before Salesforce switches them on.</p>
              <p><Verify id="salesforce-sources">Where these facts come from</Verify></p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 5 HOW AN ENGAGEMENT RUNS (spec row 5): FIG. 2 rail (GSAP-scrubbed, drawn without JS) + four wired units. */}
        <SmartSection
          id="how"
          heading={{
            id: "h-how",
            title: "How a managed services engagement runs",
            lede: "A managed services engagement starts with the free one-week health check, then a written proposal, then a weekly rhythm of work.",
          }}
        >
          <StageRail
            fig={2}
            stations={ENGAGEMENT}
            className="sf-rail-top"
            title="Staged diagram of a Salesforce managed services engagement in four stages"
            desc="A rail runs through four stations: the free one-week health check, scope and written proposal, the weekly rhythm of sandbox, test, deploy and record, and an org that gets easier to change."
            stamp="How an engagement runs"
            caption="The order a managed services engagement runs in: the free week, a written proposal, then the weekly rhythm that makes the org easier to change. Each station opens below."
          />
          <StageUnits items={ENGAGEMENT} />
        </SmartSection>

        {/* 6 VS IN-HOUSE (spec row 7, MS-8): three models abreast, each column of the comparison in its Go deeper. */}
        <SmartSection
          id="compare"
          tone="surface"
          grid
          heading={{
            id: "h-compare",
            title: <>Managed services or an <span style={{ whiteSpace: "nowrap" }}>in-house</span> Salesforce admin?</>,
            lede: "A managed service gives you admin, development and release-testing skills under one agreement; an in-house admin knows the business best.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c4"
            kicker="On your payroll"
            title="An in-house Salesforce admin"
            lede="Knows the business best, and covers what one person's skills and week allow."
            points={["User requests handled as they arrive", "Releases tested alongside the daily queue", "What they knew leaves with them unless written down"]}
            measure={false}
          >
            <GoDeeper label="the in-house column, and what the salary alone costs">
              <CompareTable col="inhouse" label="What an in-house Salesforce admin covers" />
              <p className="sf-rule">In salary alone, before benefits: median pay of $105,850 a year for computer systems analysts and $135,980 for software developers (BLS OEWS, May 2025, United States, read {READ_ON}). BLS counts Salesforce admins and developers inside these occupations.</p>
              <p><Verify id="bls-sources">Where these figures come from</Verify></p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            kicker="Per project"
            title="A project-by-project consultant"
            lede="Brings the skills a defined project needs, then the team moves on."
            points={["User requests sit outside most project scopes", "A new statement of work for each change", "Releases covered only when bought as a project"]}
            measure={false}
          >
            <GoDeeper label="the project-by-project column">
              <CompareTable col="project" label="What a project-by-project consultant covers" />
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.16}
            kicker="One agreement"
            title="A managed services team"
            lede="Admin, development and release testing from people who keep learning your org."
            points={["Changes built in a sandbox, tested and deployed in the plan", "A written record of every change: what changed and why", "The change record stays with your org when people leave"]}
            measure={false}
          >
            <GoDeeper label="the managed services column">
              <CompareTable col="managed" label="What a managed services team covers" />
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 7 COST (spec row 8, owner answer 5: how the price is set, no figure of ours) + SECURITY (spec row 9). */}
        <SmartSection id="cost" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c7"
            headingId="h-cost"
            title="How much do Salesforce managed services cost?"
            lede="Salesforce managed services are priced by scope and hours: the clouds you run, your users, how much customization and the hours each month."
            leadIn="What we do:"
            lead="We scope every engagement after the free health check, and the terms are set in the written proposal."
          >
            <GoDeeper label="what other firms publish about price">
              <h3>What other firms publish about price</h3>
              <p className="sf-rule">Five firms that publish something about their price, each re-read on their own page on {READ_ON}. Prices change; check the source before you compare.</p>
              <table>
                <caption className="sr-only">Published Salesforce managed services pricing from five firms</caption>
                <thead><tr><th scope="col">Firm</th><th scope="col">What they publish</th></tr></thead>
                <tbody>
                  {FIRMS.map(([f, w]) => <tr key={f}><th scope="row">{f}</th><td>{w}</td></tr>)}
                </tbody>
              </table>
              <div className="sf-links">
                <Verify id="pricing-sources">Where these prices come from</Verify>
                <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            delay={0.08}
            headingId="h-secure"
            title="How we keep your Salesforce org secure"
            lede="Your org stays under your control: the free week runs on a read-only user you create, and every change is tested in a sandbox first."
            lead="Salesforce's Setup Audit Trail shows who changed what for 180 days; our written record adds why, and it stays yours."
            measure={false}
          >
            <GoDeeper label="the audit trail and the change record">
              <p className="sf-rule">Setup Audit Trail lists the recent setup changes in your org and who made them. Salesforce keeps that history for 180 days, then deletes it (Salesforce Help, read {READ_ON}).</p>
              <p><span className="sf-lead-in">What you get:</span> Every change we make written down as we go, what changed and why, so the reason outlives the audit trail.</p>
              <p>Whoever you hire, put in the agreement how documentation and access come back to you if it ends.</p>
              <p><Verify id="salesforce-sources">Where these facts come from</Verify></p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 8 DELIVERED + WHO LEADS (spec row 10, §8): readouts, the two managed-services rows, the people. */}
        <SmartSection
          id="delivered"
          tone="surface"
          heading={{
            id: "h-delivered",
            title: "Salesforce managed services work we have delivered",
            lede: "We have run ongoing Salesforce development for a lending company since April 2026, and about 18 months of Marketing Cloud support.",
          }}
        >
          <Readouts />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <div className="sf-c7" style={{ display: "grid", gap: 32, alignContent: "start" }}>
              {DELIVERED.map((d, i) => (
                <LedgerRule as="article" key={d.title} delay={i * 0.06}>
                  <h3 className="sf-h3">{d.title}</h3>
                  <p className="sf-mono" style={{ marginTop: 8 }}>{d.tag}</p>
                  {d.line && <p style={{ marginTop: 8 }}>{d.line}</p>}
                  {d.link && <div className="sf-links" style={{ marginTop: 4 }}><Link className="sf-link" to={d.link.to}>{d.link.label}</Link></div>}
                </LedgerRule>
              ))}
            </div>
            <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead">
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
          </div>
        </SmartSection>

        {/* 9 DESK (spec row 11): the one form, #start. Default H2 is the spec's exact string. */}
        <DeskCTA form={{ topic: "managed-services", topicLabel: "Salesforce managed services", heading: "Book a free health check", prompt: "What is waiting in your queue?", submitLabel: "Book a free health check" }} />

        {/* 10 CONCERNS (spec row 12): objection questions as H3, answers in Go deeper. Four abreast at 1280+. */}
        <SmartSection
          id="concerns"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before outsourcing Salesforce support",
            lede: "Four questions buyers raise before handing their org to an outside team, each with the direct answer.",
          }}
        >
          {CONCERNS.map((c, i) => (
            <LedgerRule as="article" key={c.q} className="sf-c3" delay={(i % 4) * 0.08}>
              <h3 className="sf-h3">{c.q}</h3>
              <GoDeeper label={c.q} title="The answer">
                <p className="sf-rule">{c.a}</p>
              </GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 11 FAQ (spec row 13) + the related-services nav. The FAQ array renders AND feeds FAQPage. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce managed services questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
            <nav aria-label="Other Salesforce services" style={{ marginTop: 40 }}>
              <p className="sf-kicker">Other Salesforce services</p>
              <ul className="sf-links" style={{ marginTop: 8 }}>
                {RELATED.map((r) => (
                  <li key={r.to}><Link className="sf-link" to={r.to}>{r.label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </SmartSection>

        {/* Pop-ups: sources only (the AppExchange and Trailblazer evidence dialogs come with Readouts / PersonCredentials). */}
        <SourcesDialog id="salesforce-sources" title="Where these Salesforce facts come from" sources={SALESFORCE_SOURCES} />
        <SourcesDialog id="bls-sources" sources={BLS_SOURCES} />
        <SourcesDialog id="pricing-sources" title="Where these prices come from" intro="Each firm's own wording, re-read on its own page. We quote what they publish; prices change, so check the source before you compare." sources={PRICING_SOURCES} />
      </SfPage>
    </Layout>
  );
}
