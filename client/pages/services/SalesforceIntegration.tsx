import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, StageRail, StageUnits, SourcesDialog, Verify, type SfFaqItem, type Stage, type SfSource,
} from "../../components/sf";
import { SapSync } from "../../components/sf/illus";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PHONE, SF_PLATFORM_CERTS, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createWebPageSchema, createLocalBusinessSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";

/* /services/salesforce-integration, rebuilt 2026-10-23 on the redesign-v2 kit (client/components/sf), in the design
 * Louis approved ("Yes, build the 23 pages this way"). SEO: seo-completeness/structure-spec.md §5.4 (title, meta, H1,
 * the twelve H2 strings exact, H3s, schema); section ORDER follows the approved prototype's rhythm (hero → answer
 * units → night band → … → desk → FAQ), which spec §0 allows. Build notes: build-v2/page-integration.md.
 *
 * ⛔ PROOF: the invoiced SAP work is "an SAP-to-Salesforce sync", nothing more. Client never named; its SAP version,
 * objects, direction and middleware are NOT released (owner decision 11). The SAP figure (FIG. 1) is a staged scene
 * for the fictional Example Manufacturing Co., and the mapping table is the TYPICAL pattern, never the delivered build.
 * ⛔ MULESOFT: the 2026-09-01 CloudHub sentence stays verbatim ("Where a managed runtime is worth paying for, we scope
 * and build on CloudHub; where it is not, we say so and keep the moving parts down."). No new MuleSoft claim.
 * ⛔ NetSuite / QuickBooks / Oracle / Dynamics / HubSpot / Mailchimp / Marketo: approach only, no delivery claim.
 * ⛔ Integration user licenses: "Supported editions include a limited number" (fix round FV-01), never a count.
 * Partner tier "Select": owner decision 2026-10-23 ~19:05 (owner-decisions.md, answer 1).
 * LINKS: in-site only in the body. Every source is cited as text + read date and listed in the SourcesDialog
 * ("int-sources"); api.sap.com is named without a link (link policy). */

const PAGE_PATH = "/services/salesforce-integration";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-10-23";
const TITLE = "Salesforce Integration Services: SAP & ERP | OneAlgorithm";
const DESCRIPTION =
  "Salesforce integration services for SAP, ERP and finance systems. Start with a free one-week health check of your integrations. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-sap-sync.jpg";
const OG_ALT =
  "Illustration with sample data: an order sync between SAP and Salesforce, three objects each with a count, a time and a log.";
const HUB = "/services/salesforce";
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const MS = "/services/salesforce-managed-services";
const MC = "/services/salesforce-marketing-cloud-consulting";
const DM = "/services/salesforce-data-migration";
const SOURCES_ID = "int-sources";

/* Every source this page cites, with the date a person read it (the ef1a8f0 page: SF_VERIFIED_LABEL on the
   patterns, user-license and API-limit notes; "checked October 2026" on the FAQ sources). */
const SOURCES: SfSource[] = [
  { name: "Salesforce Architects: Integration Patterns", what: "The six pattern names and what each one is for", read: `read ${SF_VERIFIED_LABEL}`, page: "https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns.html" },
  { name: "Salesforce Help: Give Integration Users API Only Access", what: "The Integration user license: API-only, permission sets, a limited number with supported editions", read: `read ${SF_VERIFIED_LABEL}`, page: "https://help.salesforce.com/s/articleView?id=platform.integration_user.htm&type=5" },
  { name: "Salesforce Developers: API Request Limits and Allocations", what: "API requests counted across the org over a rolling 24 hours", read: `read ${SF_VERIFIED_LABEL}`, page: "https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-api.html" },
  { name: "Salesforce Help: Salesforce Connect", what: "External data shown inside Salesforce without copying it", read: "read October 2026", page: "https://help.salesforce.com/s/articleView?id=sf.platform_connect_about.htm&type=5" },
  { name: "Salesforce Developers: Platform Events", read: "read October 2026", page: "https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm" },
  { name: "Salesforce Developers: Bulk API", read: "read October 2026", page: "https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm" },
  { name: "SAP Business Accelerator Hub", what: "SAP's catalogue of ECC and S/4HANA interfaces (IDocs, BAPIs, OData and REST)", read: "read October 2026" },
  { name: "SAP Learning: Business One Service Layer", what: "The Service Layer (REST and OData) and the older DI API", read: "read October 2026", page: "https://learning.sap.com/courses/leveraging-the-sap-business-one-service-layer/introducing-service-layer-api-terms-and-documentation" },
  { name: "BrainSpate: Salesforce implementation cost guide", what: "$5,000 to $75,000 or more for a single integration", read: "read October 2026", page: "https://brainspate.com/blog/salesforce-implementation-cost-guide/" },
];

/* The four steps of an integration project (the ef1a8f0 process, stations for FIG. 2). Desktop labels are centred on
   the 1200-unit rail; keep each title under ~30 characters. */
const INT_STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Free one-week health check", sub: "inside your org, read-only", line: "We start inside your org: what syncs today, what fails without telling anyone, and which integration users hold more access than the job needs.",
    details: ["A read-only user you create", "Integrations: syncs that fail without telling anyone", "Integration users holding more access than the job needs", "A written list ranked by what to fix first"] },
  { k: "s2", num: "02", title: "The five decisions, written down", sub: "ownership · timing · failures", line: "Ownership, copy or view, timing, failure handling and the integration user, agreed with you and recorded before anyone builds.",
    details: ["Which system owns each object and each field", "Copy into Salesforce, or view in place", "Real time, scheduled batches, or on demand", "What happens to a failed record, and who is told", "Which integration user runs it, with only the permissions it needs"] },
  { k: "s3", num: "03", title: "Build for the record that fails", short: "Build for the failed record", sub: "API-only user · API allocation", line: "Its own API-only integration user, sized against your org's API allocation and designed for the record that fails, because one always does.",
    details: ["Its own API-only integration user", "Sized against your org's rolling 24-hour API allocation", "The lightest route that holds up", "A failure path for every record"] },
  { k: "s4", num: "04", title: "After go-live", sub: "log · reruns · support", line: "A named person reads the failure log and reruns what failed; after go-live, that can be us, through managed services.",
    details: ["A failure log a named person reads", "Reruns for every failed record", "Field changes on the other system noticed", "Weekly administration and development, through managed services"] },
];

/* The four routes (spec §5.4 row 4), with Salesforce's own pattern names (Architects guide, read SF_VERIFIED_LABEL).
   Examples and moving parts are ours, from the ef1a8f0 patterns table. */
const ROUTES: { route: string; when: string; adds: string; pattern: string }[] = [
  { route: "Real-time API calls", when: "A user needs an answer from the other system before moving on, such as a credit check; or the other system writes to Salesforce itself.", adds: "The other system's API has to answer while the user waits.", pattern: "Request and Reply · Remote Call-In" },
  { route: "Scheduled batch loads", when: "Large volumes on a schedule, such as customers, products and prices every night.", adds: "A scheduler and a Bulk API job.", pattern: "Batch Data Synchronization" },
  { route: "Platform events", when: "Salesforce starts work elsewhere and does not wait, such as a won deal becoming an order.", adds: "An event channel and a subscriber.", pattern: "Fire and Forget · UI Update Based on Data Changes" },
  { route: "Middleware", when: "Many systems, or heavy transformation between them.", adds: "A middleware license, and its runtime to run and watch.", pattern: "Batch Data Synchronization, run by MuleSoft or SAP Integration Suite" },
];

/* The typical SAP and Salesforce pattern (ef1a8f0 mapping table). Standard object names; not a client build. */
const MAPPING: string[][] = [
  ["Business Partner (customer)", "Account and Contact", "SAP", "SAP to Salesforce", "Scheduled"],
  ["Material", "Product", "SAP", "SAP to Salesforce", "Scheduled"],
  ["Pricing conditions", "Price Book entries", "SAP", "SAP to Salesforce", "Scheduled"],
  ["Sales Order", "Won Opportunity or Quote", "SAP owns the order; Salesforce owns the deal", "Salesforce to SAP, status back", "On change"],
  ["Invoice and credit status", "Status shown on the Account", "SAP", "Read-only in Salesforce", "Live with Salesforce Connect, or nightly"],
  ["A record that fails to move", "Failure log entry", "The integration's named owner", "Written by the sync", "Read by a named person"],
];
const MAPPING_HEAD = ["SAP record", "Salesforce record", "Usual owner", "Direction", "Typical timing"];

/* Page-local styles (requested for the kit in build-v2/requests-integration.md): the visible table (the kit has no
   visible-table class yet; stacks into labelled rows below 768px, explicit ARIA roles keep table semantics when display
   changes) and a wrap for the long source addresses in this page's SourcesDialog (they widened it past 390px). */
const TABLE_CSS = `
.sfv2 .sf-int-table{width:100%;border-collapse:collapse;font-size:16px;line-height:1.45;color:var(--ink2)}
.sfv2 .sf-int-table th,.sfv2 .sf-int-table td{text-align:left;vertical-align:top;padding:16px 16px 16px 0;border-top:1px solid var(--hair-s)}
.sfv2 .sf-int-table th:first-child{padding-left:8px}
.sfv2 .sf-int-table thead th{font:500 12px/1.4 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);border-top:0;padding-top:0;padding-bottom:10px}
.sfv2 .sf-int-table tbody th{font:700 19px/1.25 var(--display);letter-spacing:-.01em;color:var(--ink)}
.sfv2 .sf-int-table td.sf-int-pat{font:500 13px/1.5 var(--mono);letter-spacing:.02em;color:var(--ink3)}
.sfv2 .sf-int-table tbody tr:last-child th,.sfv2 .sf-int-table tbody tr:last-child td{border-bottom:1px solid var(--hair-s)}
.sfv2 .sf-int-table tbody tr{transition:background-color .15s}
@media (hover:hover){.sfv2 .sf-int-table tbody tr:hover{background:var(--tint)}}
.sfv2 .sf-int-sm{font-size:15px}
.sfv2 .sf-int-sm th:first-child{padding-left:0}
.sfv2 .sf-int-sm tbody th{font:600 15px/1.4 var(--body)}
.sfv2 .sf-int-sm th,.sfv2 .sf-int-sm td{padding:10px 12px 10px 0}
@media (max-width:767px){
.sfv2 .sf-int-table thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.sfv2 .sf-int-table,.sfv2 .sf-int-table tbody,.sfv2 .sf-int-table tr,.sfv2 .sf-int-table th,.sfv2 .sf-int-table td{display:block}
.sfv2 .sf-int-table tbody tr{border-top:1px solid var(--hair-s);padding:14px 0}
.sfv2 .sf-int-table tbody tr:last-child{border-bottom:1px solid var(--hair-s)}
.sfv2 .sf-int-table th,.sfv2 .sf-int-table td,.sfv2 .sf-int-table th:first-child,.sfv2 .sf-int-table tbody tr:last-child th,.sfv2 .sf-int-table tbody tr:last-child td{border:0;padding:4px 0}
.sfv2 .sf-int-table td[data-label]::before{content:attr(data-label);display:block;font:500 11px/1.4 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:2px}
}
.sfv2 #ev-int-sources .sf-ev-sources .sf-mono{overflow-wrap:anywhere}`;

function DataTable({ id, label, head, rows, small }: { id: string; label: string; head: string[]; rows: React.ReactNode[][]; small?: boolean }) {
  return (
    <table className={`sf-int-table${small ? " sf-int-sm" : ""}`} role="table" aria-label={label} id={id}>
      <thead role="rowgroup">
        <tr role="row">{head.map((h) => <th key={h} scope="col" role="columnheader">{h}</th>)}</tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((r, i) => (
          <tr key={i} role="row">
            <th scope="row" role="rowheader">{r[0]}</th>
            {r.slice(1).map((c, j) => (
              <td key={j} role="cell" data-label={head[j + 1]} className={small || j < head.length - 2 ? undefined : "sf-int-pat"}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* FAQ: the integration question bank (questions/questions-by-page.md, 13 questions; "Can Salesforce integrate with
   SAP?" stays EXACT). One owner page per question across the 23 pages. Moved into the body, so not repeated here:
   the SAP-versions question (→ "SAP: which SAP you run changes the route") and the marketing-automation question
   (→ the marketing automation H2). The array renders AND feeds FAQPage schema. */
const FAQS: SfFaqItem[] = [
  {
    q: "Can Salesforce integrate with SAP?",
    a: "Yes. Salesforce exposes standard APIs, and SAP systems connect to them through middleware, through scheduled API jobs, or by viewing SAP data from Salesforce without copying it, using Salesforce Connect. Which route fits depends on your SAP version, how fresh the data has to be, and whether Salesforce ever writes back. We have built an SAP-to-Salesforce sync and bring that experience to the trade-offs.",
  },
  {
    q: "What data usually moves between SAP and Salesforce?",
    a: "In the usual pattern, customers (Business Partners), products (Materials) and prices move from SAP into Salesforce on a schedule. Won deals create sales orders in SAP, with order status sent back. Invoice and credit status stays in SAP and shows read-only in Salesforce. Your own list depends on what reps need to see and what finance needs to own.",
    more: (
      <>
        <DataTable id="int-mapping" small label="What usually moves between SAP and Salesforce (typical pattern)" head={MAPPING_HEAD} rows={MAPPING} />
        <p className="sf-mono">Typical pattern using SAP's and Salesforce's standard object names. Not the objects of a specific client build.</p>
      </>
    ),
  },
  {
    q: "Can SAP and Salesforce sync in real time?",
    a: "Yes, but real time earns its extra moving parts only when a rep or a customer is waiting on the answer. A nightly batch is simple, cheap and easy to rerun, and for most finance data it is enough. Salesforce also caps how many API calls an org can make in a rolling 24 hours, so a sync that polls every minute can starve your other tools. We size the route against that allocation before choosing it.",
  },
  {
    q: "Is a Salesforce integration secure?",
    a: "It is when it runs as its own API-only integration user with access to only the objects and fields it needs, so a leaked credential cannot read the whole org. Every failure writes somewhere a person will see it, so a broken sync cannot hide.",
    link: { to: "#practices", label: "Salesforce integration best practices" },
  },
  {
    q: "What is a Salesforce Integration user license?",
    a: "A Salesforce license for system-to-system access. The user works only through Salesforce's APIs, never the screens, and gets its object access from permission sets. Salesforce includes a limited number of these licenses with supported editions; Setup > Company Information shows how many your org has. We run each integration as its own user.",
  },
  {
    q: "Can you fix an integration that already exists?",
    a: "Yes. Integrations are one of the five areas the free one-week health check covers: what syncs, what fails without telling anyone, and which integration users hold more access than the job needs. You get a written list ranked by what to fix first.",
    link: { to: HC, label: "Free one-week Salesforce health check" },
  },
  {
    q: "Is Salesforce a CRM or an ERP?",
    a: "A CRM and application platform. Salesforce runs sales, service and marketing; finance, inventory and production usually stay in an ERP such as SAP. That split is why integration matters: customers and deals live in Salesforce, orders and invoices in the ERP, and each record needs one agreed owner.",
  },
  {
    q: "How much does a Salesforce integration cost?",
    a: "It depends on the number of objects, one-way or two-way, real time or batch, any middleware license, and your SAP version. Published guides put a single integration at $5,000 to $75,000 or more (BrainSpate). The cost guide sets that next to the other parts of a Salesforce budget.",
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "What are the different types of Salesforce integration, and which tools do they use?",
    a: "Salesforce's architects name six patterns: Request and Reply, Fire and Forget, Batch Data Synchronization, Remote Call-In, UI Update Based on Data Changes and Data Virtualization. In practice they run on Salesforce's APIs (the Bulk API for volume), Platform Events and Change Data Capture, Salesforce Connect, and middleware. The best tool is the lightest one that holds up.",
    link: { to: "#patterns", label: "The routes compared" },
  },
  {
    q: "Does Salesforce integrate with NetSuite?",
    a: "It can. NetSuite and Salesforce both offer APIs, and there are connectors on the AppExchange as well as general integration platforms that link the two. The work that decides whether it succeeds is the same as for any ERP: agreeing which system owns customers, orders and invoices, and what happens when they disagree.",
  },
  {
    q: "Can Salesforce integrate with QuickBooks?",
    a: "Yes, usually through an AppExchange connector rather than custom code, since the common need is simple: let sales see invoice and payment status without logging into accounting. Check what a connector syncs, which direction, and how often before you buy it; most problems we hear about come from assuming a connector does something it does not.",
  },
  {
    q: "Does Salesforce integrate with HubSpot?",
    a: "Yes. HubSpot offers a Salesforce integration of its own, so most teams start there rather than building one. The work is deciding which system owns each field, which records sync at all, and what happens to duplicates, before you switch it on. Those are the same decisions we make for any integration.",
  },
  {
    q: "Is Salesforce an integration platform?",
    a: "Salesforce itself is a CRM and application platform with strong APIs, Platform Events for publishing changes, and Salesforce Connect for external data. Salesforce also owns MuleSoft, which is a dedicated integration platform sold separately. Many integrations need nothing beyond the core platform; some justify middleware. That is a scoping decision, not a default.",
  },
];

/* Objection questions (H3) with the answers in Go deeper. None repeats a FAQ question. The travel line follows the
   owner's 2026-10-23 wording (answer 3): most work is remote; in person when the project calls for it. */
const CONCERNS: { q: string; a: React.ReactNode }[] = [
  { q: "Will we get senior people, or whoever is free?", a: <>The person who scopes your org stays on it through delivery, and you deal with the people doing the work directly: no hand-off after the sales call. Sreenivas Amirisetti leads the practice; his credentials are listed under <a className="sf-link" href="#record">our record</a>.</> },
  { q: "Will the free week turn into a sales pitch?", a: <>The list is yours. If the org is basically fine, we say so.</> },
  { q: "What does it cost after the free week?", a: <>Fixes are scoped in writing first. <Link className="sf-link" to={COST}>What Salesforce work costs</Link></> },
  {
    q: "You are not in our city.",
    a: (
      <>
        We work from Malvern, PA, and most of the work happens inside your org, remotely; in-person sessions happen when the project calls for them, easiest across the Philadelphia region.
        <span className="sf-links" style={{ marginTop: 8 }}>
          <Link className="sf-link" to="/services/salesforce-consultant-philadelphia">Salesforce consultants for Philadelphia companies</Link>
          <Link className="sf-link" to="/services/salesforce-consultant-dallas">Salesforce consultants in Dallas</Link>
        </span>
      </>
    ),
  },
];

const SourcesChip = () => <Verify id={SOURCES_ID}>Sources</Verify>;

export default function SalesforceIntegration() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Salesforce Integration Services: SAP & ERP",
    ogDescription:
      "We keep SAP, ERP and finance systems in sync with Salesforce, with ownership and failure rules agreed before anything is built. Free one-week health check.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "Salesforce Integration Services: SAP & ERP",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Integration with SAP and ERP Systems",
          "Integration of Salesforce with SAP, ERP, finance and marketing automation systems: record ownership agreed field by field, scheduled and event-driven syncs, viewing external data with Salesforce Connect, least-access integration users, and failure logs a named person reads. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce integration",
          PAGE_URL,
          { image: OG_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: HUB }, { label: "Integration" }]}>
        {/* 1 HERO. H1 = the LCP; FIG. 1 (the SAP ↔ Salesforce order sync, sample data) is dealt by CSS 250ms after first paint. */}
        <SFHero
          kicker={<>Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce integration services for SAP and your ERP"
          lede="We connect Salesforce to SAP, other ERPs and finance systems for US companies, starting with a free one-week health check of what syncs today."
          proof
          figure={<SapSync fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 THE ANSWER UNITS, two abreast: what the service is (spec row 1) and the two ways data moves (row 5). */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What are Salesforce integration services?"
            lede="Salesforce integration services connect Salesforce to your ERP, finance and marketing systems so each record has one owner and moves on a known schedule."
            lead="Reps who cannot see orders, prices or invoice status in Salesforce ring finance, or work from a copy that is out of date."
            points={[
              "Which system owns each record, agreed field by field before anyone builds",
              "The lightest route that holds up: API, batch, events or middleware",
              "A failure log for every failed record, read by a named person",
            ]}
          >
            <GoDeeper label="the full definition, what we do and what it costs">
              <p className="sf-rule">
                Salesforce integration services connect Salesforce to the other systems a business runs, such as SAP and other ERPs, finance and e-commerce, using Salesforce's APIs, Platform Events, Salesforce Connect or middleware, so each record has one agreed owner and changes move on a schedule you choose.
              </p>
              <p><span className="sf-lead-in">What we do:</span> We agree which system owns each record, build the lightest route that holds up, and give every failed record a log a named person reads.</p>
              <p><span className="sf-lead-in">What it costs:</span> It turns on how many objects move, which direction, how often, and any middleware license. The cost guide cites published ranges; the free one-week health check reviews the integrations you already run.</p>
              <div className="sf-links">
                <Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link>
                <Link className="sf-link" to={HUB}>Salesforce consulting services</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            delay={0.08}
            headingId="h-data"
            id="data"
            title="Salesforce data integration, ETL and Salesforce Connect"
            lede="Data integration either copies records into Salesforce on a schedule or shows them in place through Salesforce Connect."
            lead="Invoices, payment status and credit holds belong in the finance system, but reps need to see them."
            points={[
              "Scheduled loads on the Bulk API for customers, products and prices",
              "Salesforce Connect for data that changes often and Salesforce never edits",
            ]}
          >
            <GoDeeper label="copy into Salesforce or view in place">
              <h3>Copy into Salesforce, or view in place</h3>
              <p className="sf-rule">
                Data Salesforce never edits can stay where it is and show through Salesforce Connect, which displays external data inside Salesforce without copying it: reps get a read-only view, not a second copy anyone can edit. Large scheduled loads run on the Bulk API; a nightly batch is simple, cheap and easy to rerun.
              </p>
              <p>Moving off the old system rather than keeping it? That is a data migration, which is simpler.</p>
              <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
                Salesforce Help and Salesforce Developers, read October 2026 · <SourcesChip />
              </p>
              <div className="sf-links"><Link className="sf-link" to={DM}>Salesforce data migration services</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 3 NIGHT BAND: ERP and accounting (spec row 2), three H3 units abreast. SAP detail stays the general guidance (OD 11). */}
        <SmartSection
          id="erp"
          tone="night"
          grid
          heading={{
            id: "h-erp",
            title: "Salesforce ERP and accounting integration",
            lede: "We have built an SAP-to-Salesforce sync, and we connect other ERP and accounting systems the same way.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c4"
            kicker="ECC · S/4HANA · Business One"
            title="SAP: which SAP you run changes the route"
            lede="ECC, S/4HANA and Business One expose different interfaces; the ownership and failure rules stay the same."
            leadIn="What we do:"
            lead="Tell us your SAP version and what reps need to see, and we tell you which route we would look at first."
          >
            <GoDeeper label="the SAP interfaces and the usual pattern">
              <p className="sf-rule">In the usual pattern, customers, products and prices move into Salesforce on a schedule, won deals become sales orders in SAP with status sent back, and every failed record lands in a log a named person reads.</p>
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li><b>SAP ECC:</b> usually reached through IDocs, BAPIs or RFC calls, normally through middleware.</li>
                <li><b>SAP S/4HANA:</b> mainly OData and REST APIs, in the cloud or on premise; IDocs and BAPIs are still available.</li>
                <li><b>SAP Business One:</b> the Service Layer (REST and OData) or the older DI API; third-party connectors exist.</li>
                <li><b>Middleware:</b> SAP Integration Suite (Cloud Integration, formerly CPI) is SAP's; MuleSoft is Salesforce's, sold separately.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            kicker="Accounting and ERP"
            title="NetSuite and QuickBooks"
            lede="Both connect through APIs or AppExchange connectors; check what a connector syncs, which direction and how often before you buy."
            leadIn="Yes, but:"
            lead="Most problems we hear about come from assuming a connector does something it does not."
          />
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.16}
            kicker="Oracle ERP · Microsoft"
            title="Oracle and Dynamics 365"
            lede="Oracle ERP and Microsoft Dynamics 365 get the same approach: agree which system owns customers, orders and invoices, then pick the lightest route."
            leadIn="The bottom line:"
            lead="The system shapes the route; ownership, timing and failure handling stay the same."
          />
        </SmartSection>

        {/* 4 MARKETING AUTOMATION (spec row 3, the page's largest query cluster): three H3 units abreast. Approach only. */}
        <SmartSection
          id="marketing"
          grid
          heading={{
            id: "h-marketing",
            title: "Salesforce marketing automation integration: HubSpot, Mailchimp",
            lede: "HubSpot, Mailchimp and Marketo connect to Salesforce through their own connectors or the APIs; the work is deciding which system owns each field.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" title="HubSpot" lede="HubSpot's own Salesforce integration is the usual start; the work is the field rules you set before switching it on."
            points={["Which system owns each field", "Which records sync at all", "What happens to duplicates"]} />
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="Mailchimp and Marketo" lede="Both connect through their own Salesforce connector or the APIs, under the same rules as any integration."
            points={["Which direction each field moves", "How often it syncs", "Who reads the failures"]} />
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Marketing Cloud" lede="Marketing Cloud links to Salesforce through Marketing Cloud Connect, Salesforce's own connector."
            leadIn="What we do:" lead="We support Marketing Cloud accounts that are already running, the Connect sync included.">
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={MC}>Salesforce Marketing Cloud consulting</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 5 HOW IT RUNS: FIG. 2 (the scroll-drawn rail, no ledger) + four stage units wired to their stations. Spec row 7. */}
        <SmartSection
          id="how"
          tone="surface"
          heading={{
            id: "h-how",
            title: "How a Salesforce integration project runs",
            lede: "An integration project runs in four steps, from a free look at your org to a sync someone owns.",
          }}
        >
          <StageRail
            fig={2}
            stations={INT_STAGES}
            className="sf-rail-top"
            title="Staged diagram of a four-step Salesforce integration project"
            desc="A rail runs through four stations: the free one-week health check, the five decisions written down, the build designed for the record that fails, and after go-live."
            stamp="How an integration project runs"
            caption="The four steps in the order they run, from a free look at your org to a sync someone owns."
          />
          <StageUnits items={INT_STAGES} />
        </SmartSection>

        {/* 6 PATTERNS: the routes table (visible: the table is the answer) + the middleware H3. Spec row 4. */}
        <SmartSection
          id="patterns"
          grid
          heading={{
            id: "h-patterns",
            title: "Salesforce integration patterns: API, batch, events, middleware",
            lede: "There are four routes: real-time API calls, scheduled batch loads, platform events and middleware, and the lightest one that holds up wins.",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: TABLE_CSS }} />
          <LedgerRule className="sf-c8">
            <p className="sf-kicker" id="int-routes-label">The four routes compared</p>
            <div style={{ marginTop: 16 }}>
              <DataTable
                id="int-routes"
                label="The four routes compared: when each fits, what it adds, and Salesforce's pattern name"
                head={["Route", "When it fits", "What it adds", "Salesforce's pattern"]}
                rows={ROUTES.map((r) => [r.route, r.when, r.adds, r.pattern])}
              />
            </div>
            <p className="sf-mono" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Pattern names: Salesforce Architects, read {SF_VERIFIED_LABEL}. Examples are ours · <SourcesChip />
            </p>
            <GoDeeper label="when each route fails, and the sixth pattern">
              <p className="sf-rule">Real time earns its extra moving parts only when a rep or a customer is waiting on the answer. A nightly batch is simple, cheap and easy to rerun, and for most finance data it is enough.</p>
              <p>Salesforce counts API requests across the whole org over a rolling 24 hours, and the allowance comes from your edition and licenses. It lets an org run somewhat over its allocation, then a hard cap blocks further calls; regular overage is not something to rely on. A sync that polls every minute can starve your other tools, so we size the route against your org's allocation before choosing it.</p>
              <p>The sixth pattern, Data Virtualization, shows data that stays in the other system, such as invoices, through Salesforce Connect and an OData or custom adapter.</p>
            </GoDeeper>
          </LedgerRule>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            kicker="Tools and platforms"
            title="Middleware and MuleSoft"
            lede="Many integrations run on Salesforce's own APIs and a scheduled job; middleware earns its license when many systems or heavy transformation are involved."
            leadIn="What we do:"
            lead="We tell you which side of that line you are on before you buy anything."
          >
            <GoDeeper label="MuleSoft, CloudHub and SAP Integration Suite">
              <p className="sf-rule">Where a managed runtime is worth paying for, we scope and build on CloudHub; where it is not, we say so and keep the moving parts down.</p>
              <p>MuleSoft is Salesforce's integration platform, sold separately; SAP Integration Suite (Cloud Integration, formerly CPI) is SAP's. Either earns its license when many systems or heavy transformation are involved.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 7 BEST PRACTICES: three H3 units (spec row 6); the ef1a8f0 "five decisions" content sits in Go deeper. */}
        <SmartSection
          id="practices"
          tone="surface"
          grid
          heading={{
            id: "h-practices",
            title: "Salesforce integration best practices",
            lede: "Most failed integrations were built correctly against a decision nobody made, so we write five decisions down with you first.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" title="Decide which system owns each record" lede="Agreed field by field, so the two systems never overwrite each other.">
            <GoDeeper label="two-way records, conflicts and timing">
              <p className="sf-rule">When both systems can edit the same record, someone has to decide who wins a conflict. We write that rule down with you before building, because code only enforces a decision a person made.</p>
              <p>Timing is part of the same decision: real time, scheduled batches, or on demand. Real time earns its extra moving parts only when someone is waiting on the answer.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.08} title="Build as a least-access integration user" lede="Its own API-only user, with access to only the objects and fields the job needs, so a leaked credential cannot read the whole org.">
            <GoDeeper label="the Salesforce Integration user license">
              <p className="sf-rule">Salesforce sells an Integration user license for system-to-system access only: the user reaches the org through the APIs, cannot sign in to the screens, and gets its object access from permission sets. Supported editions include a limited number of these licenses; Setup &gt; Company Information shows how many your org has.</p>
              <p>Each integration can run as its own least-access user, often without buying another license.</p>
              <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
                Salesforce Help, read {SF_VERIFIED_LABEL} · <SourcesChip />
              </p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c4" delay={0.16} title="Go live with a failure log" lede="Every failure writes somewhere a person will see it; a silent failure is the expensive kind.">
            <GoDeeper label="who reads the log and what they do">
              <p className="sf-rule">A named person reads the log, reruns what failed and notices when the other system changes a field. The build is designed for the record that fails, because one always does.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 8 AFTER GO-LIVE (spec row 8, links MS) beside the quiet-failure unit (links HC). 7/5. */}
        <SmartSection id="after" grid labelledBy="h-after">
          <SmartUnit
            className="sf-c7"
            headingId="h-after"
            title="Supporting a Salesforce integration after go-live"
            lede="After go-live, someone has to read the failure log, rerun what failed and notice when the other system changes a field; that can be us."
            lead="The other system changes a field, a record fails, and someone has to notice the same day."
            points={["Weekly administration and development, with hours reported every week", "Failed records rerun by a named person"]}
          >
            <GoDeeper label="managed services after go-live">
              <p className="sf-rule">After go-live, the person who reads the log can be us, through managed services: weekly administration and development, with hours reported every week.</p>
              <div className="sf-links"><Link className="sf-link" to={MS}>Salesforce managed services</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c5"
            delay={0.08}
            kicker="Already integrated"
            title="The sync that broke quietly"
            lede="The free one-week health check finds an integration that stopped months ago and told nobody."
            leadIn="The bottom line:"
            lead="Every day it is down, the two systems drift further apart."
          >
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={HC}>Free one-week Salesforce health check</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 9 THE PEOPLE AND THE RECORD (spec row 9): readouts, delivered work (the SAP sync is a row), who leads the work. */}
        <SmartSection
          id="record"
          tone="surface"
          heading={{
            id: "h-record",
            title: "Salesforce integration consultants who do the work",
            lede: <>Salesforce's AppExchange record lists OneAlgorithm as a Select Consulting Partner with {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications, {SF_PLATFORM_CERTS} of them Platform, read {SF_VERIFIED_LABEL}.</>,
          }}
        >
          <Readouts />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <SmartUnit
              level={3}
              className="sf-c7"
              title="Salesforce work we have delivered"
              lede="We have delivered Salesforce development, an SAP sync, QuickBase and Kissflow migrations and Marketing Cloud support."
            >
              <DeliveredLedger />
            </SmartUnit>
            <LedgerRule as="aside" className="sf-c5 sf-lead-block" delay={0.08} aria-labelledby="h-lead">
              <h3 className="sf-h3" id="h-lead">Who leads your Salesforce work</h3>
              <PersonCredentials />
            </LedgerRule>
          </div>
        </SmartSection>

        {/* 10 CONCERNS: objection questions as H3, answers in Go deeper (spec row 11). */}
        <SmartSection
          id="concerns"
          grid
          heading={{
            id: "h-concerns",
            title: "Concerns before a Salesforce integration project",
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

        {/* 11 DESK: the one form (spec row 10). */}
        <DeskCTA
          lede="Name the two systems, the direction the data should go and what breaks today, and we tell you which route we would look at first."
          form={{
            topic: "integration",
            topicLabel: "Salesforce integration",
            heading: "Book a free health check",
            prompt: "Which two systems, which direction, and what breaks today?",
            submitLabel: "Book a free health check",
          }}
        />

        {/* 12 FAQ: questions visible, answers in the HTML behind native disclosures (spec row 12). */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Salesforce integration questions</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
            <p className="sf-mono" style={{ marginTop: 16 }}>Answers cite Salesforce, SAP and BrainSpate, read October 2026.</p>
            <p style={{ marginTop: 8 }}><Verify id={SOURCES_ID}>Where these facts come from</Verify></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
          <SourcesDialog
            id={SOURCES_ID}
            title="Where these facts come from"
            intro="Salesforce and SAP facts on this page name their source and when a person at OneAlgorithm read it. The source pages are listed here; nothing in the page body links off-site."
            sources={SOURCES}
          />
        </SmartSection>
      </SfPage>
    </Layout>
  );
}
