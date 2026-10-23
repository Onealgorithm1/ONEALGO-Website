import { Link } from "react-router-dom";
import { CalendarClock, Cable, DatabaseZap, Mail, UserCog, Workflow } from "lucide-react";
import Layout from "../../components/Layout";
import {
  Card,
  CardGrid,
  CheckList,
  PageHero,
  ProcessSteps,
  Prose,
  Section,
  SectionHeading,
} from "../../components/site";
import {
  DataTable,
  DeliveredLedger,
  Desk,
  DocNote,
  FAQList,
  HcLink,
  JumpList,
  MidStrip,
  Objections,
  PeopleStrip,
  Plate,
  PlateScope,
  RouteBoard,
  SF_OBJECTIONS,
  type SfFaq,
} from "../../components/salesforce";
import { SalesforceRecordCard } from "../../components/SalesforceRecordCard";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PHONE } from "../../data/salesforceProof";
import { PLATES } from "../../data/plates/managed-services";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  SF_HEALTH_CHECK_OFFER,
  StructuredData,
  createFAQSchema,
  createLocalBusinessSchema,
  createServiceSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* Salesforce managed services. Rebuilt 2026-10-23 on the Salesforce plate
 * system (design-spec.md §3 MS and §5 MS, wide-layout and voice addenda).
 *
 * DEMAND: "salesforce managed services" 1,300/mo US, KD 15; cluster 4,870
 * plus "salesforce development services" 1,600 (page-map.json, plan.pages[3]).
 *
 * ⛔ PROOF, all from the allowed list: the AppExchange record (SF_* figures),
 * the four delivered patterns (SF_DELIVERED, clients unnamed), "hours reported
 * every week" (the lending engagement's weekly hours report, workspace note
 * deepak-fundmate-automation-2026-09-22.md; the hub already states it), and
 * Sreenivas Amirisetti's lead line with his Trailblazer link. ⛔ Never name the
 * lender. The development scope (Flow, Apex triggers, SOQL, custom metadata,
 * permission sets, data jobs) is stated as what we do, NOT attributed to the
 * lending client: whether the page may say so is owner question #5.
 *
 * ⛔ No SLA, response time, price, term, notice period or onboarding fee of
 * ours is stated: none is set (owner decision #9). Competitor prices are their
 * own published figures, each re-read on their page on 2026-10-23 (curl).
 * 24/7 is allowed by AGENTS.md but is not repeated: no managed-service SLA
 * backs it.
 *
 * ⛔ Gated sections render nothing until the owner supplies facts: "How an
 * engagement is set up" (billing basis, term, notice; MS-6), "How we handle
 * access to your org" (MS-15), the demo-org specimens MS-F2 (Setup Audit
 * Trail) and MS-F4 (Release Updates) (spec §7.1). Each specimen's place is
 * taken by a DocNote: our paraphrase of Salesforce Help plus the link, read
 * 2026-10-23 in a headless browser (help.salesforce.com renders client-side).
 *
 * Voice (addendum 2026-10-23): no deficit lines in visible copy. Honesty is
 * kept by claiming nothing we cannot show: no reviews, no tiers, no SLA.
 */

const PAGE_URL = "https://onealgorithm.com/services/salesforce-managed-services";
const READ_ON = "23 October 2026";
const IMG_1600 = "https://onealgorithm.com/media/salesforce/salesforce-managed-services-change-process-1600x900.jpg";
const OG = "https://onealgorithm.com/media/salesforce/og-salesforce-managed-services.jpg";
const FLOW = PLATES["salesforce-managed-services-change-process"];
const CYCLE = PLATES["salesforce-release-cycle-spring-summer-winter"];

const SRC = {
  releases: "https://www.salesforce.com/products/innovation/releases/",
  trust: "https://status.salesforce.com/",
  releaseUpdates: "https://help.salesforce.com/s/articleView?id=sf.release_updates.htm&type=5",
  auditTrail: "https://help.salesforce.com/s/articleView?id=sf.admin_monitorsetup.htm&type=5",
  blsAnalysts: "https://www.bls.gov/oes/2025/may/oes151211.htm",
  blsDevelopers: "https://www.bls.gov/oes/2025/may/oes151252.htm",
  trailblazer: "https://www.salesforce.com/trailblazer/samirisetti",
  vantage: "https://vantagepoint.io/blog/sf/salesforce-managed-services-pricing",
  keynode: "https://www.keynodesolutions.com/services/salesforce-managed-services-and-support/",
  melonleaf: "https://melonleaf.com/salesforce-managed-services-usa/",
  techforce: "https://www.techforceservices.com/managed-services/",
  sciencesoft: "https://www.scnsoft.com/salesforce/managed",
};

const TOC = [
  { id: "delivered", label: "Work we have run" },
  { id: "scope", label: "What we look after" },
  { id: "how", label: "How it runs" },
  { id: "releases", label: "Release checks" },
  { id: "vs-in-house", label: "Vs an in-house admin" },
  { id: "pricing", label: "What firms charge" },
  { id: "faq", label: "Questions" },
];

/* Evidenced items only (MS-5): Platform work from the lending engagement,
 * Marketing Cloud support, the SAP sync, the QuickBase/Kissflow moves, plus
 * release readiness. Cards with a real destination get `to`. */
const SCOPE = [
  {
    icon: UserCog,
    title: "Users and access",
    body: "New reps set up the day they start, MFA resets, and field access granted when someone needs it and removed when they move on. Small jobs that stop work when they wait.",
  },
  {
    icon: Workflow,
    title: "Flow and Apex triggers",
    body: "New automation as the business changes, and the fix when a flow hits a governor limit or a trigger misfires. Built in a sandbox, tested, then deployed.",
  },
  {
    icon: DatabaseZap,
    title: "Data jobs on request",
    body: "Backfills, record moves, list pulls and suppression scrubs, with the automation they would fire reviewed first. Bigger moves, like QuickBase or Kissflow into Salesforce, run as a migration.",
    to: "/services/salesforce-data-migration",
  },
  {
    icon: Cable,
    title: "Integrations kept in step",
    body: "We keep Salesforce in sync with the systems around it, SAP included, and check the sync whenever either side changes.",
    to: "/services/salesforce-integration",
  },
  {
    icon: Mail,
    title: "Marketing Cloud support",
    body: "Support for Marketing Cloud accounts already running, backed by about 18 months of Marketing Cloud support delivered.",
    to: "/services/salesforce-marketing-cloud-consulting",
  },
  {
    icon: CalendarClock,
    title: "Release readiness",
    body: "Salesforce ships three releases a year. We read each one's notes and release updates against your org and test in a sandbox before it reaches production.",
  },
];

const DEV = [
  "Flow automation built, fixed and retired when a newer flow replaces it",
  "Apex triggers, including the fix when one hits a governor limit",
  "SOQL behind reports, scheduled jobs and integrations",
  "Custom metadata in place of hard-coded values",
  "Permission sets in place of one-off profile edits",
  "Bulk data jobs, with the automation they would fire reviewed first",
];

const STEPS = [
  {
    title: "Free one-week health check",
    body: "We review licences, data, automation, permissions and integrations, and hand you a written list ranked by what to fix first.",
    to: "/services/salesforce-health-check",
  },
  {
    title: "Agree who handles what",
    body: "Your admin keeps the day-to-day user requests and we take development, data jobs and releases. With no admin, we cover all of it.",
  },
  {
    title: "Build, test, deploy, write down",
    body: "Each change is built in a sandbox, tested, deployed and written down: what changed and why. Hours are reported every week.",
  },
  {
    title: "Release checks",
    body: "Before each of Salesforce's three releases, we read the notes against your org and test in a sandbox before production.",
  },
];

/* MS-8: who does what under each model. No salary or price inside the table;
 * the BLS readout above it carries the only figures, labelled as a proxy. */
const COMPARE = [
  {
    cells: [
      "User and access requests",
      "Your admin, as they arrive",
      "Outside most project scopes; they wait for your team",
      "Your admin keeps them, or we take them as part of the week",
    ],
  },
  {
    cells: [
      "New automation and fixes",
      "Your admin, when they have the skills and the time",
      "A new statement of work for each change",
      "Built in a sandbox, tested and deployed as part of the plan",
    ],
  },
  {
    cells: [
      "Salesforce's three releases a year",
      "Your admin, alongside the daily queue",
      "Covered only when bought as its own project",
      "Release notes read against your org and tested in a sandbox before production",
    ],
  },
  {
    cells: [
      "Where changes are recorded",
      "Wherever your admin keeps notes",
      "The project's handover documents",
      "A written record of every change: what changed and why",
    ],
  },
  {
    cells: [
      "When someone leaves",
      "What they knew leaves with them unless it was written down",
      "The project ends and the team moves on",
      "The change record stays with your org",
    ],
  },
  {
    cells: [
      "How the cost works",
      "Salary and benefits, all year",
      "A quote per project",
      "One agreement for the ongoing work, scoped in writing first",
    ],
  },
];

const IN_WRITING = [
  "Response and resolution times for each severity level",
  "A named lead who knows your org, not a ticket queue",
  "Who handles user requests: your admin or the provider",
  "Sandbox testing before each of Salesforce's three releases",
  "A written record of every change: what changed and why",
  "How documentation and access come back to you if the agreement ends",
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/* MS-3: each firm's own published wording, re-read 2026-10-23. A market table:
 * no column is highlighted and there is no CTA row (spec 2.7). */
const FIRMS = [
  {
    cells: [
      "Vantage Point",
      "Managed services from $5,850 a month; retainers from $2,000 a month; blocks of hours from $2,500",
      <a key="s" className="oa-link" href={SRC.vantage} {...ext}>Pricing article, updated 10 Oct 2026 ↗</a>,
    ],
  },
  {
    cells: [
      "KeyNode Solutions",
      "Price set by plan (minimum hours a month); nonprofits from $2,000 a month; 3-month trial; no onboarding fee",
      <a key="s" className="oa-link" href={SRC.keynode} {...ext}>Managed services page ↗</a>,
    ],
  },
  {
    cells: [
      "Melonleaf",
      "Managed services starting at USD $30 an hour",
      <a key="s" className="oa-link" href={SRC.melonleaf} {...ext}>Managed services page ↗</a>,
    ],
  },
  {
    cells: [
      "TechForce Services",
      "Plans of 30, 40 and 80 service delivery hours a month; prices on request",
      <a key="s" className="oa-link" href={SRC.techforce} {...ext}>Managed services page ↗</a>,
    ],
  },
  {
    cells: [
      "ScienceSoft",
      "A monthly fee set by scope: clouds and editions, users and customisations; larger changes priced separately at a fixed price",
      <a key="s" className="oa-link" href={SRC.sciencesoft} {...ext}>Managed services page ↗</a>,
    ],
  },
];

/* Questions from questions-by-page.md (managed services rows 2-8) and the
 * verified gaps MS-3, MS-7, MS-8, MS-9. Q5/Q6 kept from the live page: no
 * competitor answers them. Response times (Q9) and security (Q12) need owner
 * decision #9 and stay off. ⛔ Not repeated on sibling pages. */
const FAQS: SfFaq[] = [
  {
    q: "How much do Salesforce managed services cost?",
    a: "Firms price by scope and hours: the clouds and editions you run, your users, how much customisation, and how many hours of work a month. Published examples re-read on 23 October 2026 include $30 an hour (Melonleaf) and managed services from $5,850 a month (Vantage Point). We set our fee from a written scope of your org, and the free one-week health check is where that scope starts.",
    link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" },
  },
  {
    q: "What should a Salesforce managed services agreement include?",
    a: "Response and resolution times for each severity level, a named lead who knows your org, who handles user requests, sandbox testing before each of Salesforce's three releases, a written record of every change, and how documentation and access come back to you if the agreement ends.",
  },
  {
    q: "Do I still need an in-house Salesforce admin?",
    a: "Not necessarily. If you employ an admin, they keep the requests from users and we take the development, the data jobs and the releases. If you have nobody, we cover all of it and write down every change, so you never depend on one person remembering why something was built.",
  },
  {
    q: "How do we get started with Salesforce managed services?",
    a: "With the free one-week health check. You create a read-only user, we review licences, data, automation, permissions and integrations, and you get a written list ranked by what to fix first. From that list we agree who handles what and start the weekly work.",
    link: { to: "/services/salesforce-health-check", label: "What the free health check covers" },
  },
  {
    q: "How do I choose a Salesforce managed services provider?",
    a: `Check the firm's AppExchange listing for its Salesforce certifications, ask who will work in your org and look up their Trailblazer profile, and ask how changes are tested and recorded. Then compare agreements on the points above, not on hourly rate alone. Our listing shows ${SF_CERTIFIED_PEOPLE} Salesforce-certified people and ${SF_CERTIFICATIONS} certifications.`,
    link: { to: "/services/salesforce-consulting-partner-pennsylvania", label: "How to check a Salesforce partner" },
  },
  {
    q: "Can a managed services plan include Salesforce development?",
    a: "Yes. Ours does: Flow, Apex triggers, SOQL, custom metadata, permission sets and data jobs, each built in a sandbox, tested, deployed and written down alongside the admin work. If you would rather have a Salesforce developer inside your own team, that is staff augmentation.",
    link: { to: "/services/staff-augmentation", label: "Salesforce staff augmentation" },
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

const SOURCES = {
  checked: "October 2026",
  links: [
    { label: "Salesforce: release cycle", href: SRC.releases },
    { label: "Salesforce Help: Release Updates", href: SRC.releaseUpdates },
    { label: "Salesforce Help: Setup Audit Trail", href: SRC.auditTrail },
    { label: "BLS: computer systems analysts, May 2025", href: SRC.blsAnalysts },
    { label: "BLS: software developers, May 2025", href: SRC.blsDevelopers },
    { label: "Vantage Point pricing", href: SRC.vantage },
    { label: "KeyNode Solutions", href: SRC.keynode },
    { label: "Melonleaf", href: SRC.melonleaf },
    { label: "TechForce Services", href: SRC.techforce },
    { label: "ScienceSoft", href: SRC.sciencesoft },
  ],
};

/* Not the shared SF_OBJECTIONS.reviews: its answer announces a lack, which
 * the voice addendum removes from visible copy. None repeats a FAQ question. */
const OBJECTIONS = [
  {
    q: "Our last outside team never learned our org.",
    a: "That is why the work starts with a free week inside your org, and why every change is written down: what changed and why. What we learn stays in the record, not in one person's head.",
  },
  SF_OBJECTIONS.pitch,
  SF_OBJECTIONS.city,
];

/** A registry readout: figure in mono tabular numerals, label, source. */
function Readout({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 mt-1.5 text-sm text-oa-ink2">{label}</dt>
      <dd className="order-1 font-mono text-3xl leading-none tabular-nums text-oa-ink">{figure}</dd>
    </div>
  );
}

export default function SalesforceManagedServices() {
  useSEO({
    title: "Salesforce Managed Services & Admin Support | OneAlgorithm",
    description:
      "Weekly Salesforce admin, development and release testing from a listed Consulting Partner. Free one-week Salesforce health check: (610) 890-9711.",
    canonical: getCanonicalUrl("/services/salesforce-managed-services"),
    ogTitle: "Salesforce Managed Services | OneAlgorithm",
    ogDescription:
      "Admin requests, Flow and Apex work, data jobs and release checks, with every change written down. Start with a free one-week Salesforce health check.",
    ogUrl: getCanonicalUrl("/services/salesforce-managed-services"),
    ogImage: OG,
    ogImageSize: [1200, 630],
    ogImageAlt: FLOW.alt,
    twitterTitle: "Salesforce Managed Services | OneAlgorithm",
    twitterDescription:
      "Weekly Salesforce admin, development and release testing. Free one-week Salesforce health check: (610) 890-9711.",
    twitterImage: OG,
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Managed Services",
          "Ongoing Salesforce administration and development: user and access management, Flow and Apex trigger work, permission sets and custom metadata, data jobs, integrations kept in sync and release checks before each of Salesforce's three releases a year, from a listed AppExchange Consulting Partner in Malvern, Pennsylvania.",
          "Salesforce managed services",
          PAGE_URL,
          { image: IMG_1600, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData
        data={createWebPageSchema(
          "Salesforce Managed Services & Admin Support",
          "Weekly Salesforce administration, development and release testing, with every change written down, starting with a free one-week Salesforce health check.",
          PAGE_URL,
          { dateModified: "2026-10-23", primaryImage: { url: IMG_1600, width: 1600, height: 900 } },
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      {/* 1. HERO: the lede's first sentence defines the term (MS-16). */}
      <PageHero
        eyebrow="Salesforce managed services"
        title={
          <>
            Salesforce managed services from{" "}
            <span className="text-oa-orange">people who know your org</span>
          </>
        }
        lede="Salesforce managed services means an outside team looks after your org every week: admin requests, new automation, fixes, data jobs and release checks, under one agreement instead of a new project each time. We run that week for you, with every change written down and hours reported every week."
        panel={{ title: "Salesforce's record of us", items: [], slot: <SalesforceRecordCard /> }}
        primary={{ label: "Book a free health check", href: "#start", cta: "hero" }}
        secondary={{ label: `Call ${SF_PHONE.display}`, href: SF_PHONE.href, cta: "hero" }}
        siblings={false}
      >
        <HcLink />
      </PageHero>

      {/* 2. JUMP LIST. No plate in the first section after the hero (spec §3). */}
      <Section tone="paper" compact id="contents">
        <JumpList items={TOC} />
      </Section>

      {/* 3. DELIVERED (MS-2). The lending row is this page's own. */}
      <Section tone="surface" id="delivered">
        <DeliveredLedger title="Salesforce work we have run" lead="lending" />
      </Section>

      {/* 4. WHAT WE LOOK AFTER (MS-5, MS-10, MS-17). */}
      <Section tone="paper" id="scope">
        <SectionHeading
          title="What we look after"
          lede="The work that keeps a live org useful, from the rep who cannot log in to the release that changes how a flow behaves."
        />
        <CardGrid columns={3} className="mt-12">
          {SCOPE.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} to={c.to} wire={Boolean(c.to)} />
          ))}
        </CardGrid>
      </Section>

      {/* 5. DEVELOPMENT (page-map: replaces the killed development page). */}
      <Section tone="surface" id="development">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading title="Salesforce development services in a support plan" />
            <Prose className="mt-6">
              <p>
                Development does not stop at go-live. A new process needs a flow, a new rule needs a trigger,
                and a report needs a field that does not exist yet.
              </p>
              <p>
                We build that work inside the same plan as the admin queue, each change built in a sandbox,
                tested, deployed and written down. One team holds both the requests and the code, so a new
                trigger arrives with the permissions and the change record that go with it.
              </p>
              <p>
                Want a Salesforce developer inside your own team instead?{" "}
                <Link className="oa-link" to="/services/staff-augmentation">
                  Salesforce staff augmentation
                </Link>{" "}
                adds one for as long as you need.
              </p>
            </Prose>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <h3 className="text-lg font-semibold text-oa-ink">What development in the plan covers</h3>
            <div className="mt-5 border-t border-oa-hairlineStrong pt-5">
              <CheckList items={DEV} />
            </div>
          </div>
        </div>
      </Section>

      {/* 6. HOW AN ENGAGEMENT RUNS (MS-4, MS-9). MS-F1 is the page's first
          plate: eager, static. The rail is the page's one rail. */}
      <Section tone="paper" clip id="how">
        <PlateScope>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
            <SectionHeading className="lg:col-span-7" title="How an engagement runs, week to week" />
            <p className="max-w-[60ch] text-oa-ink2 lg:col-span-5">
              It starts with a free week inside your org and settles into a weekly rhythm: requests in,
              changes built and tested in a sandbox, everything written down, hours reported every week.
            </p>
          </div>
          <div className="mt-12">
            <Plate
              spec={FLOW}
              fig={1}
              first
              legend
              stamp={["DIAGRAM · HOW A CHANGE MOVES", "ONEALGORITHM"]}
              caption="How a change moves under our managed services. Your admin keeps the day-to-day requests; every change we take is built in a sandbox, tested, deployed and written down."
            />
          </div>
        </PlateScope>
        <div className="mt-16">
          <ProcessSteps rail terminal={{ label: "Free health check" }} steps={STEPS} />
        </div>
      </Section>

      {/* 7. MID STRIP. */}
      <MidStrip
        line="The free week starts with a read-only user you create and ends with a written list ranked by what to fix first."
        label="Book a free health check"
      />

      {/* 8. WHAT CHANGES (MS-16, MS-13 in part). MS-F2 (Setup Audit Trail
          specimen) is owner-gated; the DocNote carries the point meanwhile. */}
      <Section tone="surface" id="what-changes">
        <SectionHeading title="What changes when a Salesforce managed services provider looks after your org" />
        <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <div className="max-w-[62ch]">
            <h3 className="text-xl font-semibold text-oa-ink">The org gets easier to change</h3>
            <p className="mt-3 text-oa-ink2">
              Each request is a chance to replace a hard-coded value with custom metadata, fold a one-off
              profile edit into a permission set, or retire a flow that a newer one made redundant. Done every
              week, that is the difference between an org that takes a day to change and one that takes a month.
            </p>
          </div>
          <div className="max-w-[62ch]">
            <h3 className="text-xl font-semibold text-oa-ink">Works with the admin you have</h3>
            <p className="mt-3 text-oa-ink2">
              If you employ an admin, they keep the requests from users and we take the development, the data
              jobs and the releases. If you have nobody, we cover all of it.
            </p>
          </div>
          <div className="max-w-[62ch]">
            <h3 className="text-xl font-semibold text-oa-ink">Every change is written down</h3>
            <p className="mt-3 text-oa-ink2">
              What changed and why, recorded as we go, so nobody has to remember why something was built. When
              your admin changes, the record stays with your org.
            </p>
            <DocNote
              said="Setup Audit Trail lists the recent setup changes in your org and who made them. Salesforce keeps that history for 180 days, then deletes it."
              title="Salesforce Help: Monitor Setup Changes with Setup Audit Trail"
              url={SRC.auditTrail}
              readOn={READ_ON}
              meaning="Salesforce's own log shows what changed for six months. Our written record adds why, and it is yours to keep."
            />
          </div>
          {/* The named lead, approved wording from SF_PEOPLE, with the Person schema. */}
          <div className="max-w-[62ch]">
            <h3 className="text-xl font-semibold text-oa-ink">Named people, not a ticket queue</h3>
            <PeopleStrip className="mt-3 text-oa-ink2" lead="You work directly with the people doing the work. " />
          </div>
        </div>
      </Section>

      {/* 9. BEFORE EACH RELEASE (MS-10). MS-F3 beside the text, plate right.
          MS-F4 (Release Updates specimen) is owner-gated; DocNote instead. */}
      <Section tone="paper" clip id="releases">
        <PlateScope>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading title="Before each Salesforce release" />
              <Prose className="mt-6">
                <p>
                  Salesforce ships three releases a year, Spring, Summer and Winter, and each one can change how
                  automation that works today behaves tomorrow.
                </p>
                <p>
                  Before each release we read the release notes and the release updates against your org, test
                  in a sandbox during Salesforce's preview, and fix what would break before the release reaches
                  production. Your users get the new features without losing the processes they rely on.
                </p>
              </Prose>
              <DocNote
                said="Each release update in Setup has a date by which to complete its steps. Until then you can switch on a test run and see the effect in your org before Salesforce enforces the update in a named release."
                title="Salesforce Help: Release Updates"
                url={SRC.releaseUpdates}
                readOn={READ_ON}
                meaning="Release updates are the changes most likely to break working automation. We run them in a sandbox first, so you see the effect before Salesforce switches them on for you."
              />
            </div>
            <div className="lg:col-span-5">
              <Plate
                spec={CYCLE}
                fig={2}
                legend
                stamp={["DIAGRAM · SALESFORCE RELEASE CYCLE", "ONEALGORITHM"]}
                caption={
                  <>
                    Months follow Salesforce's published pattern: Spring typically in February, Summer in June,
                    Winter in October (
                    <a className="oa-link" href={SRC.releases} {...ext}>
                      salesforce.com
                    </a>
                    , read {READ_ON}). Your instance's preview and upgrade dates are on{" "}
                    <a className="oa-link" href={SRC.trust} {...ext}>
                      Salesforce Trust Status
                    </a>
                    .
                  </>
                }
              />
            </div>
          </div>
        </PlateScope>
      </Section>

      {/* 10. VS IN-HOUSE (MS-8). BLS readout = free-data/bls-oews, a salary
          proxy (no SOC code for Salesforce admins), medians, never set against
          a price of ours. */}
      <Section tone="surface" id="vs-in-house">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              title="Managed services vs an in-house Salesforce admin"
              lede="An in-house admin, a project-by-project consultant and a managed service each answer a different need. Here is who does what under each."
            />
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-oa-ink">What an in-house hire costs in salary alone</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 border-t border-oa-hairlineStrong pt-4">
              <Readout figure="$105,850" label="median, computer systems analysts" />
              <Readout figure="$135,980" label="median, software developers" />
            </dl>
            <p className="mt-4 font-mono text-xs leading-5 text-oa-ink3">
              BLS OEWS May 2025, United States, before benefits · read {READ_ON} · BLS counts Salesforce admins and
              developers inside these occupations ·{" "}
              <a className="oa-link" href={SRC.blsAnalysts} {...ext}>
                15-1211 ↗
              </a>{" "}
              <a className="oa-link" href={SRC.blsDevelopers} {...ext}>
                15-1252 ↗
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12">
          <DataTable
            label="Managed services compared with an in-house admin and a project-by-project consultant"
            ground="surface"
            head={["", "In-house admin", "Project-by-project consultant", "Managed services"]}
            rows={COMPARE}
            source="Who does what under each model. The only figures in this section are the BLS salary medians above."
          />
        </div>
      </Section>

      {/* 11. WHAT TO GET IN WRITING (MS-7). Our own response times wait on
          owner decision #9. */}
      <Section tone="paper" id="in-writing">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              title="What to get in writing from any managed services provider"
              lede="Whoever you hire, put these in the agreement before work starts. They are the questions that separate a team that knows your org from a ticket queue."
            />
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <div className="border-t border-oa-hairlineStrong pt-6">
              <CheckList items={IN_WRITING} />
            </div>
          </div>
        </div>
      </Section>

      {/* 12. WHAT OTHER FIRMS PUBLISH (MS-3). */}
      <Section tone="surface" id="pricing">
        <SectionHeading
          title="What other firms publish about price"
          lede="Salesforce managed services are priced by scope and hours. Five firms that publish something about their price, each re-read on their own page on 23 October 2026."
        />
        <div className="mt-10">
          <DataTable
            label="Published Salesforce managed services pricing from five firms"
            ground="surface"
            head={["Firm", "What they publish", "Source"]}
            rows={FIRMS}
            source={`Each firm's own wording, re-read ${READ_ON}. Prices change; check the source before you compare.`}
          />
        </div>
        <p className="mt-10 max-w-[68ch] text-lede text-oa-ink">
          Across these firms, price follows the same things: the clouds and editions you run, your users, how much
          customisation, and how many hours of work a month. We set our fee the same way, from your org: the free
          one-week health check ends with a written list ranked by what to fix first, and every fix is scoped in
          writing before work starts.
        </p>
      </Section>


      {/* 14. OBJECTIONS. */}
      <Section tone="paper" id="objections">
        <Objections items={OBJECTIONS} />
      </Section>

      {/* 15. FAQ (MS-3, MS-7, MS-8, MS-9). Same array as the FAQPage schema. */}
      <Section tone="surface" id="faq">
        <SectionHeading title="Questions about Salesforce managed services" />
        <FAQList faqs={FAQS} sources={SOURCES} />
      </Section>

      {/* 16. ROUTES (MS-14): adds the PA partner page. */}
      <Section tone="paper" id="related">
        <SectionHeading title="Other Salesforce work" />
        <RouteBoard groups={["services", "local"]} />
      </Section>

      {/* 17. DESK (MS-12): the page's one form. */}
      <Desk
        heading="Tell us what is waiting in your Salesforce queue"
        body="Access requests, a flow nobody dares touch, a data job that never gets scheduled. Describe it and we will tell you how we would take it on."
        form={{
          topic: "managed-services",
          topicLabel: "Salesforce managed services",
          heading: "Book a free health check",
          prompt: "What is waiting in your queue?",
          submitLabel: "Book a free health check",
        }}
      />
    </Layout>
  );
}
