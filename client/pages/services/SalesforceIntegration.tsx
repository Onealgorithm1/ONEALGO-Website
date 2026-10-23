import { Link } from "react-router-dom";
import { Factory, Calculator, AlertTriangle, ArrowLeftRight } from "lucide-react";
import Layout from "../../components/Layout";
import { PageHero, Section, SectionHeading, Card, CardGrid, ProcessSteps, Prose } from "../../components/site";
import {
  AnswerBand,
  CTAProof,
  DataTable,
  DeliveredLedger,
  Desk,
  DocNote,
  FAQList,
  HcLink,
  MidStrip,
  Objections,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  type SfFaq,
} from "../../components/salesforce";
import { RecordLine } from "../../components/SalesforceRecordCard";
import { SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { PLATES } from "../../data/plates/integration";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createWebPageSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";

/* Salesforce integration (SAP / ERP), rebuilt on the plate system 2026-10-23.
 * Spec: onealgo-icm-oa/areas/sales/runs/2026-10-23_sf-audit/design-spec.md §3 INT, §5 INT,
 * plus the wide-layout and voice addenda.
 *
 * ⛔ PROOF: the invoiced work package "DOG Synch from SAP to SFDC"
 * (salesforce-delivery-evidence-2026-09-01.md). Client is NOT named, ever, and
 * its SAP version, objects, direction and middleware are NOT released (owner
 * decision #11). So the diagram and the mapping table are a TYPICAL pattern,
 * stamped "NOT A CLIENT BUILD", and never tied to the delivered sync.
 * ⛔ MULESOFT (owner, 2026-10-23): keep the 2026-09-01 CloudHub sentence
 * verbatim, add no new MuleSoft claim. MuleSoft is otherwise named only as a
 * product Salesforce sells separately (market fact, not a capability claim).
 * ⛔ NetSuite / QuickBooks / HubSpot: no delivery evidence; FAQs answer how
 * the connection works in general.
 * ⛔ No reviews exist; nothing on this page says so (voice addendum rule 4),
 * and the AppExchange "no ratings" objection is deliberately not used.
 * INT-F2 (demo-org screenshot) is skipped: Salesforce screenshots are blocked.
 * "Five free Integration licences": read 2026-10-23 from Salesforce Help's
 * "Give Integration Users API Only Access" via its search-indexed text (the
 * Help app does not render to a fetcher). Re-read before changing it.
 */

const URL_ = "https://onealgorithm.com/services/salesforce-integration";
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const TRAILBLAZER = "https://www.salesforce.com/trailblazer/samirisetti";
const FLOW = PLATES["salesforce-sap-integration-data-flow"];
const ROUTES = PLATES["salesforce-integration-routes"];
const IMG_16x9 = `https://onealgorithm.com/media/salesforce/${FLOW.id}-1600x900.jpg`;
const OG = "https://onealgorithm.com/media/salesforce/og-salesforce-integration.jpg";

const TITLE = "Salesforce Integration Services: SAP & ERP | OneAlgorithm";
const DESCRIPTION =
  "Salesforce integration with SAP, ERP and finance systems. Start with a free one-week health check of your integrations. Call (610) 890-9711.";

const ARCH = "https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns.html";
const SRC = {
  patterns: { label: "Salesforce Architects: Integration Patterns", href: ARCH },
  user: {
    label: "Salesforce Help: Give Integration Users API Only Access",
    href: "https://help.salesforce.com/s/articleView?id=platform.integration_user.htm&type=5",
  },
  limits: {
    label: "Salesforce Developers: API Request Limits and Allocations",
    href: "https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-api.html",
  },
  connect: { label: "Salesforce Help: Salesforce Connect", href: "https://help.salesforce.com/s/articleView?id=sf.platform_connect_about.htm&type=5" },
  events: {
    label: "Salesforce Developers: Platform Events",
    href: "https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm",
  },
  bulk: {
    label: "Salesforce Developers: Bulk API",
    href: "https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm",
  },
  sapHub: { label: "SAP Business Accelerator Hub", href: "https://api.sap.com/" },
  b1: {
    label: "SAP Learning: Business One Service Layer",
    href: "https://learning.sap.com/courses/leveraging-the-sap-business-one-service-layer/introducing-service-layer-api-terms-and-documentation",
  },
  brainspate: { label: "BrainSpate: Salesforce implementation cost guide", href: "https://brainspate.com/blog/salesforce-implementation-cost-guide/" },
};

const ext = (href: string, label: string) => (
  <a className="oa-link" href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
);

const PROBLEMS = [
  {
    icon: Factory,
    title: "SAP to Salesforce",
    to: "#sap",
    body: "Sales cannot see the customers, prices and orders that live in SAP. We keep SAP and Salesforce in sync, with each field's owner and timing agreed before we build. We have built an SAP-to-Salesforce sync.",
  },
  {
    icon: Calculator,
    title: "Finance and ERP systems",
    to: "#routes",
    body: "Invoices, payment status and credit holds belong in the finance system, but reps need to see them. We give Salesforce a read-only view, not a second copy anyone can edit.",
  },
  {
    icon: AlertTriangle,
    title: "The sync that broke quietly",
    to: HC,
    body: "An integration that stopped months ago and told nobody. The free one-week health check finds it first, because every day it is down the two systems drift further apart.",
  },
  {
    icon: ArrowLeftRight,
    title: "Two-way, done carefully",
    to: "#decisions",
    body: "When both systems can edit the same record, someone has to decide who wins a conflict. We write that rule down with you before building, because code only enforces a decision a person made.",
  },
];

/* General guidance on SAP interfaces (gap INT-2 wording). Never tied to the
   delivered sync's version, which is not a released fact. */
const SAP_VERSIONS = [
  { name: "SAP ECC", body: "Usually reached through IDocs, BAPIs or RFC calls, normally through middleware." },
  { name: "SAP S/4HANA", body: "Mainly OData and REST APIs, in the cloud or on premise. IDocs and BAPIs are still available." },
  { name: "SAP Business One", body: "The Service Layer (REST and OData) or the older DI API. Third-party connectors exist." },
  {
    name: "Middleware",
    body: "SAP Integration Suite (Cloud Integration, formerly CPI) is SAP's; MuleSoft is Salesforce's, sold separately. Either earns its licence when many systems or heavy transformation are involved.",
  },
];

/* Row keys = lane keys in scripts/plates/integration.mjs (INT-3 typical pattern). */
const MAPPING = [
  { k: "bp", cells: ["Business Partner (customer)", "Account and Contact", "SAP", "SAP to Salesforce", "Scheduled"] },
  { k: "mat", cells: ["Material", "Product", "SAP", "SAP to Salesforce", "Scheduled"] },
  { k: "price", cells: ["Pricing conditions", "Price Book entries", "SAP", "SAP to Salesforce", "Scheduled"] },
  {
    k: "order",
    cells: ["Sales Order", "Won Opportunity or Quote", "SAP owns the order; Salesforce owns the deal", "Salesforce to SAP, status back", "On change"],
  },
  {
    k: "inv",
    cells: ["Invoice and credit status", "Status shown on the Account", "SAP", "Read-only in Salesforce", "Live with Salesforce Connect, or nightly"],
  },
  { k: "fail", cells: ["A record that fails to move", "Failure log entry", "The integration's named owner", "Written by the sync", "Read by a named person"] },
];

const DECISIONS = [
  { t: "Which system owns each object and each field", b: "Agreed field by field, so the two systems never overwrite each other." },
  { t: "Copy into Salesforce, or view in place", b: "Data Salesforce never edits can stay where it is and show through Salesforce Connect." },
  {
    t: "Real time, scheduled batches, or on demand",
    b: "A nightly batch is simple, cheap and easy to rerun. Real time earns its extra moving parts only when someone is waiting on the answer.",
  },
  { t: "What happens to a failed record, and who is told", b: "Every failure writes somewhere a person will see it. A silent failure is the expensive kind." },
  {
    t: "Which integration user runs it, with only the permissions it needs",
    b: "Its own API-only user with access to the objects and fields the job needs, so a leaked credential cannot read the whole org.",
  },
];

/* Salesforce's official pattern names (INT-9), each linked to its section of the
   Architects guide (anchors read 2026-10-23). Row keys = routes in Fig. 2. */
const PATTERNS: { k?: string; name: string; anchor: string; when: string; how: string; parts: string }[] = [
  {
    name: "Remote Process Invocation—Request and Reply",
    anchor: "remote-process-invocation--request-and-reply",
    when: "A user in Salesforce needs an answer from the other system before moving on, such as a credit check.",
    how: "A callout from Flow or Apex to the other system's API",
    parts: "The other system's API has to answer while the user waits",
  },
  {
    k: "events",
    name: "Remote Process Invocation—Fire and Forget",
    anchor: "remote-process-invocation--fire-and-forget",
    when: "Salesforce starts work elsewhere and does not wait, such as a won deal becoming an order.",
    how: "Platform Events or Change Data Capture",
    parts: "An event channel and a subscriber",
  },
  {
    k: "bulk",
    name: "Batch Data Synchronization",
    anchor: "batch-data-synchronization",
    when: "Large volumes on a schedule, such as customers, products and prices every night.",
    how: "The Bulk API, run by a scheduled job or by middleware such as MuleSoft or SAP Integration Suite",
    parts: "A scheduler and a bulk job",
  },
  {
    name: "Remote Call-In",
    anchor: "remote-call-in",
    when: "The other system creates or updates Salesforce records itself.",
    how: "Salesforce's REST, Composite or Bulk API 2.0, called by the other system",
    parts: "The caller's code and its integration user",
  },
  {
    k: "events",
    name: "UI Update Based on Data Changes",
    anchor: "ui-update-based-on-data-changes",
    when: "A Salesforce screen has to refresh when data changes, without a reload.",
    how: "Change Data Capture or Platform Events, read by a Lightning component",
    parts: "An event channel and a component",
  },
  {
    k: "connect",
    name: "Data Virtualization",
    anchor: "data-virtualization",
    when: "Salesforce shows data that stays in the other system, such as invoices.",
    how: "Salesforce Connect",
    parts: "An OData or custom adapter",
  },
];

const STEPS = [
  {
    title: "Free one-week health check",
    to: HC,
    body: "We start inside your org: what syncs today, what fails without telling anyone, and which integration users hold more access than the job needs.",
  },
  {
    title: "The five decisions, written down",
    body: "Ownership, copy or view, timing, failure handling and the integration user, agreed with you and recorded before anyone builds.",
  },
  {
    title: "Build as a least-access user",
    body: "Its own API-only integration user, sized against your org's API allocation and designed for the record that fails, because one always does.",
  },
  {
    title: "Go live with a failure log",
    to: "/services/salesforce-managed-services",
    body: "A named person reads the log, reruns what failed and notices when the other system changes a field. After go-live, that can be us, through managed services.",
  },
];

/* Not in FAQPage schema; none repeats a FAQ question below. "Do we need
   MuleSoft?" adds no capability claim: existing wording plus "we say so". */
const OBJECTIONS = [
  {
    q: "Do we need MuleSoft?",
    a: "Not by default. Many integrations run on Salesforce's own APIs and a scheduled job. Middleware earns its licence when many systems or heavy transformation are involved, and we tell you which side of that line you are on before you buy anything.",
  },
  SF_OBJECTIONS.pitch,
  SF_OBJECTIONS.cost,
  SF_OBJECTIONS.city,
];

/* Buyer questions: questions/questions-by-page.md (Integration). ⛔ Not
   repeated on sibling pages; the Dallas copy owns "How long does a
   Salesforce-to-ERP integration take?", so the cost question stays on cost. */
const FAQS: SfFaq[] = [
  {
    q: "Can Salesforce integrate with SAP?",
    a: "Yes. Salesforce exposes standard APIs, and SAP systems connect to them through middleware, through scheduled API jobs, or by viewing SAP data from Salesforce without copying it, using Salesforce Connect. Which route fits depends on your SAP version, how fresh the data has to be, and whether Salesforce ever writes back. We have built an SAP-to-Salesforce sync and bring that experience to the trade-offs.",
  },
  {
    q: "Does it matter whether we run SAP ECC, S/4HANA or Business One?",
    a: "Yes, because the interfaces differ. ECC is usually reached through IDocs, BAPIs or RFC calls, normally through middleware. S/4HANA mainly offers OData and REST APIs, in the cloud or on premise, and still supports IDocs and BAPIs. Business One has the Service Layer (REST and OData) and the older DI API. The version shapes the route; the ownership and failure rules stay the same.",
    link: { to: "#sap", label: "Which SAP you run changes the route" },
  },
  {
    q: "What data usually moves between SAP and Salesforce?",
    a: "In the usual pattern, customers (Business Partners), products (Materials) and prices move from SAP into Salesforce on a schedule. Won deals create sales orders in SAP, with order status sent back. Invoice and credit status stays in SAP and shows read-only in Salesforce. Your own list depends on what reps need to see and what finance needs to own.",
    link: { to: `#fig-${FLOW.id}`, label: "See the typical pattern (Fig. 1)" },
  },
  {
    q: "Can SAP and Salesforce sync in real time?",
    a: "Yes, but real time earns its extra moving parts only when a rep or a customer is waiting on the answer. A nightly batch is simple, cheap and easy to rerun, and for most finance data it is enough. Salesforce also caps how many API calls an org can make in a rolling 24 hours, so a sync that polls every minute can starve your other tools. We size the route against that allocation before choosing it.",
  },
  {
    q: "Is a Salesforce integration secure?",
    a: "It is when it runs as its own API-only integration user with access to only the objects and fields it needs, so a leaked credential cannot read the whole org. Every failure writes somewhere a person will see it, so a broken sync cannot hide.",
  },
  {
    q: "What is a Salesforce Integration user licence?",
    a: "A Salesforce licence for system-to-system access. The user works only through Salesforce's APIs, never the screens, and gets its object access from permission sets. Salesforce Help says Enterprise, Unlimited and Performance orgs include five of these licences. We run each integration as its own user.",
  },
  {
    q: "Can you fix an integration that already exists?",
    a: "Yes. Integrations are one of the five areas the free one-week health check covers: what syncs, what fails without telling anyone, and which integration users hold more access than the job needs. You get a written list ranked by what to fix first.",
    link: { to: HC, label: "What the free health check covers" },
  },
  {
    q: "Is Salesforce a CRM or an ERP?",
    a: "A CRM and application platform. Salesforce runs sales, service and marketing; finance, inventory and production usually stay in an ERP such as SAP. That split is why integration matters: customers and deals live in Salesforce, orders and invoices in the ERP, and each record needs one agreed owner.",
  },
  {
    q: "How much does a Salesforce integration cost?",
    a: "It depends on the number of objects, one-way or two-way, real time or batch, any middleware licence, and your SAP version. Published guides put a single integration at $5,000 to $75,000 or more (BrainSpate). The cost guide sets that next to the other parts of a Salesforce budget.",
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "What are the different types of Salesforce integration, and which tools do they use?",
    a: "Salesforce's architects name six patterns: Request and Reply, Fire and Forget, Batch Data Synchronization, Remote Call-In, UI Update Based on Data Changes and Data Virtualization. In practice they run on four routes: Salesforce's APIs (the Bulk API for volume), Platform Events and Change Data Capture, Salesforce Connect, and middleware. The best tool is the lightest one that holds up.",
    link: { to: "#routes", label: "The routes compared" },
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

const TOC = [
  { id: "problems", label: "Four problems" },
  { id: "sap", label: "SAP routes" },
  { id: "decisions", label: "Five decisions" },
  { id: "routes", label: "Integration routes" },
  { id: "process", label: "How it runs" },
  { id: "delivered", label: "Delivered work" },
  { id: "faq", label: "Questions" },
  { id: "start", label: "Start" },
];

const mono = "font-mono text-[11px] uppercase tracking-[0.14em]";

/** Hero panel: the two proofs that matter on THIS page, beside the CTA pair.
 *  The registry figures sit under the CTA pair (CTAProof), so they are not repeated here. */
function HeroRecord() {
  return (
    <dl className="space-y-6">
      <div>
        <dt className={`${mono} text-oa-nightInk3`}>Delivered · no client named</dt>
        <dd className="mt-1.5 text-lg font-semibold text-oa-nightInk">An SAP-to-Salesforce sync</dd>
      </div>
      <div className="border-t border-white/10 pt-5">
        <dt className={`${mono} text-oa-nightInk3`}>Who leads the work</dt>
        <dd>
          <PeopleStrip
            tone="night"
            className="mt-1.5 text-sm leading-relaxed text-oa-nightInk2"
            extra=" Integration Architect and Data Architect are among them."
          />
        </dd>
      </div>
    </dl>
  );
}

export default function SalesforceIntegration() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl("/services/salesforce-integration"),
    ogTitle: "Salesforce Integration Services: SAP & ERP",
    ogDescription:
      "We keep SAP, ERP and finance systems in sync with Salesforce, with ownership and failure rules agreed before anything is built. Free one-week health check.",
    ogUrl: getCanonicalUrl("/services/salesforce-integration"),
    ogImage: OG,
    ogImageSize: [1200, 630],
    ogImageAlt: FLOW.alt,
    twitterTitle: "Salesforce Integration Services: SAP & ERP",
    twitterDescription: DESCRIPTION,
    twitterImage: OG,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Integration with SAP and ERP Systems",
          "Integration of Salesforce with SAP, ERP and finance systems: record ownership agreed field by field, scheduled and event-driven syncs, viewing external data with Salesforce Connect, least-access integration users, and failure logs a named person reads. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce integration",
          URL_,
          { image: IMG_16x9 },
        )}
      />
      <StructuredData
        data={createWebPageSchema(TITLE, DESCRIPTION, URL_, {
          dateModified: "2026-10-23",
          primaryImage: { url: IMG_16x9, width: 1600, height: 900 },
        })}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        title={
          <>
            Salesforce integration services for <span className="text-oa-orange">SAP and your ERP</span>
          </>
        }
        lede="Your customers live in Salesforce and your orders live somewhere else. We connect the two so reps see the truth, and so a failed sync gets noticed the same day."
        panel={{ title: "Our record on integration", items: [], slot: <HeroRecord /> }}
        primary={{ label: "Tell us which two systems need to talk", href: "#start", cta: "hero" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711", cta: "hero" }}
        meta={[{ label: "Updated", value: "23 October 2026" }]}
        siblings={false}
      >
        <HcLink />
        <CTAProof tone="dark" className="mt-6" />
      </PageHero>

      <AnswerBand
        question="What are Salesforce integration services?"
        answer="Salesforce integration services connect Salesforce to the other systems a business runs, such as SAP and other ERPs, finance and e-commerce, using Salesforce's APIs, Platform Events, Salesforce Connect or middleware, so each record has one agreed owner and changes move on a schedule you choose."
        leads={[
          {
            label: "Why it matters",
            body: "Reps who cannot see orders, prices or invoice status in Salesforce ring finance, or work from a copy that is out of date.",
          },
          {
            label: "What we do",
            body: "We agree which system owns each record, build the lightest route that holds up, and give every failed record a log a named person reads.",
          },
          {
            label: "What it costs",
            body: (
              <>
                It turns on how many objects move, which direction, how often, and any middleware licence; the{" "}
                <Link className="oa-link" to={COST}>
                  cost guide
                </Link>{" "}
                cites published ranges. The{" "}
                <Link className="oa-link" to={HC}>
                  free one-week health check
                </Link>{" "}
                reviews the integrations you already run.
              </>
            ),
          },
        ]}
        toc={TOC}
      >
        <RecordLine />
      </AnswerBand>

      <Section tone="surface" bordered id="problems">
        <SectionHeading
          title="Four integration problems we solve"
          lede="The systems differ. The question underneath is always which one is telling the truth, and we settle it before anything is built."
        />
        <CardGrid columns={4} className="mt-12">
          {PROBLEMS.map((c) => (
            <Card key={c.title} wire to={c.to} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper" clip id="sap">
        <PlateScope>
          <SectionHeading
            title="Which SAP you run changes the route"
            lede="We keep SAP and Salesforce in sync. In the usual pattern, customers, products and prices move into Salesforce on a schedule, won deals become sales orders in SAP, and every failed record lands in a log a named person reads."
          />
          <div className="mt-12 grid gap-x-10 border-b border-oa-hairlineStrong sm:grid-cols-2 xl:grid-cols-4">
            {SAP_VERSIONS.map((v) => (
              <div key={v.name} className="border-t border-oa-hairlineStrong py-6">
                <h3 className="text-lg font-semibold text-oa-ink">{v.name}</h3>
                <p className="mt-2 text-oa-ink2">{v.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-8">
            <p className="text-lg font-semibold text-oa-ink">We have built an SAP-to-Salesforce sync.</p>
            <p className={`${mono} text-oa-ink3`}>Delivered · no client named</p>
          </div>
          <p className="mt-3 max-w-[68ch] text-oa-ink2">
            Tell us your SAP version and what reps need to see, and we will tell you which route we would look at first.
          </p>

          <div className="mt-14">
            <Plate
              spec={FLOW}
              fig={1}
              first
              stamp={["DIAGRAM · TYPICAL SAP-TO-SALESFORCE PATTERN, NOT A CLIENT BUILD", "ONEALGORITHM"]}
              caption="A typical SAP-to-Salesforce sync. Hover or tap a row in the table below to trace its lane."
            />
          </div>
          <h3 className="mt-14 text-h3 font-semibold text-oa-ink">What usually moves between SAP and Salesforce (typical pattern)</h3>
          <div className="mt-6">
            <DataTable
              label="What usually moves between SAP and Salesforce (typical pattern)"
              head={["SAP record", "Salesforce record", "Usual owner", "Direction", "Typical timing"]}
              rows={MAPPING}
              source="Typical pattern using SAP's and Salesforce's standard object names. Not the objects of a specific client build."
            />
          </div>
        </PlateScope>
      </Section>

      <Section tone="surface" bordered id="decisions">
        <SectionHeading
          title="Five decisions we make with you first"
          lede="Most failed integrations were built correctly against a decision nobody actually made. We write these five down with you before anyone builds."
        />
        <div className="mt-12 grid gap-x-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ol className="border-b border-oa-hairlineStrong">
            {DECISIONS.map((d, i) => (
              <li key={d.t} className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-t border-oa-hairlineStrong py-5">
                <span className="font-mono text-sm tabular-nums text-oa-orangeText">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-semibold text-oa-ink">{d.t}</h3>
                  <p className="mt-1.5 max-w-[68ch] text-oa-ink2">{d.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="lg:self-end">
            <DocNote
              said="Salesforce sells an Integration user licence for system-to-system access only: the user reaches the org through the APIs, cannot sign in to the screens, and gets its object access from permission sets. Enterprise, Unlimited and Performance orgs include five."
              title={SRC.user.label}
              url={SRC.user.href}
              readOn={SF_VERIFIED_LABEL}
              meaning="Each integration can run as its own least-access user, often without buying another licence, so a leaked credential cannot read the whole org."
            />
          </div>
        </div>
      </Section>

      <MidStrip
        line="Name the two systems, the direction the data should go, and what breaks today."
        label="Tell us which two systems need to talk"
      />

      <Section tone="paper" clip id="routes">
        <PlateScope>
          <SectionHeading
            title="The lightest route that holds up"
            lede="Salesforce gives you several ways to connect a system, and they are not interchangeable. We pick the one with the fewest moving parts that still meets the timing you need."
          />
          <div className="mt-10 grid gap-x-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <Prose>
              <p>
                {ext(SRC.connect.href, "Salesforce Connect")} shows external data inside Salesforce without copying it,
                which suits data that changes often and that Salesforce never edits.{" "}
                {ext(SRC.events.href, "Platform Events")} let Salesforce announce a change for another system to pick
                up. Large scheduled loads run on the {ext(SRC.bulk.href, "Bulk API")}. Where a managed runtime is worth
                paying for, we scope and build on CloudHub; where it is not, we say so and keep the moving parts down.
              </p>
              <p>
                Scheduling matters more than people expect. A nightly batch is simple, cheap and easy to rerun, and for
                most finance data it is enough. Real-time syncs earn their extra moving parts only when a rep or a
                customer is actually waiting on the answer.
              </p>
              <p>
                Moving off the old system rather than keeping it? That is a{" "}
                <Link className="oa-link" to="/services/salesforce-data-migration">
                  data migration
                </Link>
                , which is simpler.
              </p>
            </Prose>
            <div className="lg:self-end">
              <DocNote
                said="Salesforce counts API requests across the whole org over a rolling 24 hours. The allowance comes from your edition and licences, and requests over it are refused until usage falls back."
                title={SRC.limits.label}
                url={SRC.limits.href}
                readOn={SF_VERIFIED_LABEL}
                meaning="A sync that polls every minute can starve your other tools. We size the route against your org's allocation before choosing it."
              />
            </div>
          </div>

          <div className="mt-6">
            <Plate
              spec={ROUTES}
              fig={2}
              stamp={["DIAGRAM · FOUR WAYS TO CONNECT A SYSTEM TO SALESFORCE", "ONEALGORITHM"]}
              caption="Each route drawn with the moving parts it adds. Rows in the table below light up the route they use."
            />
          </div>
          <h3 className="mt-14 text-h3 font-semibold text-oa-ink">Salesforce's integration patterns, and the route each one uses</h3>
          <div className="mt-6">
            <DataTable
              label="Salesforce's integration patterns, and the route each one uses"
              head={["Pattern (Salesforce's name)", "When it fits", "Usual mechanism", "Moving parts"]}
              rows={PATTERNS.map((p) => ({
                k: p.k,
                cells: [ext(`${ARCH}#${p.anchor}`, p.name), p.when, p.how, p.parts],
              }))}
              source={<>Pattern names from {SRC.patterns.label}, read {SF_VERIFIED_LABEL}. Examples and moving parts are ours.</>}
            />
          </div>
        </PlateScope>
      </Section>

      <Section tone="surface" bordered clip id="process">
        <SectionHeading title="How an integration runs with us" lede="From a free look at your org to a sync someone owns." />
        <div className="mt-12">
          <ProcessSteps rail terminal={{ label: "Name your two systems" }} steps={STEPS} />
        </div>
      </Section>

      <Section tone="paper" id="delivered">
        <DeliveredLedger title="Salesforce work we have delivered (clients unnamed)" lead="sap" />
      </Section>

      <Section tone="surface" bordered id="objections">
        <Objections items={OBJECTIONS} />
      </Section>

      <Section tone="paper" id="faq">
        <SectionHeading title="Salesforce integration questions, answered" />
        <FAQList
          faqs={FAQS}
          sources={{
            checked: "October 2026",
            links: [SRC.patterns, SRC.user, SRC.limits, SRC.connect, SRC.sapHub, SRC.b1, SRC.brainspate],
          }}
        />
      </Section>

      <Section tone="surface" bordered id="related">
        <SectionHeading title="More Salesforce work we do" />
        <RouteBoard groups={["services", "cities"]} citiesLabel="Where we deliver this" />
      </Section>

      <Desk
        heading="Connect Salesforce to the system that holds your orders"
        body="Name the two systems, say which direction the data should go, and tell us what breaks today. We will tell you which route we would look at first."
        form={{
          topic: "integration",
          topicLabel: "Salesforce integration",
          heading: "Tell us which two systems need to talk",
          prompt: "Which two systems, which direction, and what breaks today?",
          submitLabel: "Tell us which two systems need to talk",
        }}
        next={["Call or send the form.", "A person at OneAlgorithm reads it and replies.", "We tell you which route we would look at first."]}
      />
    </Layout>
  );
}
