import Layout from "../../components/Layout";
import { SF_PROOF_LINE } from "../../data/salesforceProof";
import { PartnerBadge } from "./SalesforceCity";
import SocialShare from "../../components/SocialShare";
import { UserCog, Workflow, Database, KeyRound } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Prose,
  CTABand,
  Reveal,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";

/* Salesforce managed services — nationwide service page. Added 2026-10-21
 * (sf-seo-wave-2026-10-22).
 *
 * DEMAND: "salesforce managed services" ~500/mo US, highest bids of the set
 * ($19-60) (areas/sales/runs/2026-10-21_sf-nationwide/demand/kp-findings.md).
 *
 * ⛔ PROOF: deepak-fundmate-automation-2026-09-22.md — weekly Salesforce
 * development for "a lending company" since April 2026: flows, triggers,
 * permissions, custom metadata, bulk data jobs, creating reps, MFA resets,
 * field-access grants. ⛔ Never name the lender. Also the ~18-month recurring
 * "Marketing Cloud Support" POs in salesforce-delivery-evidence-2026-09-01.md
 * (client unnamed).
 * ⛔ No SLA, response time, ticket volume or price is stated: none is
 * published or evidenced. 24/7 availability is allowed by AGENTS.md but is
 * not repeated here because no managed-service SLA backs it.
 */

const SCOPE = [
  {
    icon: UserCog,
    title: "User and access admin",
    body: "New reps set up the day they start, MFA resets, field access granted when someone needs it and removed when they move on. Small jobs, but they stop work when they wait.",
  },
  {
    icon: Workflow,
    title: "Flows, triggers and fixes",
    body: "New automation as the business changes, and the fix when an existing flow hits a governor limit or a trigger misfires. Built in a sandbox, tested, then deployed.",
  },
  {
    icon: Database,
    title: "Data jobs on request",
    body: "Backfills, record moves, list pulls and suppression scrubs, run with the automation that would fire on them reviewed first.",
  },
  {
    icon: KeyRound,
    title: "Configuration that stays tidy",
    body: "Permission sets instead of one-off profile edits, custom metadata instead of hard-coded values, so the org is easier to change next month than it was this month.",
  },
];

const HOW = [
  "Named people who already know your org, not a ticket queue",
  "A written record of what changed and why",
  "Your own admin, if you have one, keeps the day-to-day and we take the rest",
];

/* Questions are real autocomplete phrasings from
   areas/sales/runs/2026-10-21_sf-nationwide/gaps/questions.json:
   "what is salesforce managed services", "is salesforce a managed service
   provider", "what services does salesforce provide". ⛔ Not repeated on
   sibling pages. */
const FAQS = [
  {
    q: "What is Salesforce managed services?",
    a: "An ongoing arrangement where an outside team looks after your Salesforce org: admin requests, new automation, fixes, data jobs and release checks, under one agreement instead of a new project each time. It suits companies whose Salesforce needs are steady but not big enough for a full in-house team.",
  },
  {
    q: "Is Salesforce a managed service provider?",
    a: "No. Salesforce provides the software as a cloud service and runs the infrastructure, upgrades and security of the platform itself. It does not configure your org or handle your users' requests day to day; that work falls to your own admins or to a consulting partner. Salesforce lists those partners on the AppExchange, where we are listed.",
  },
  {
    q: "What does a Salesforce managed services team actually do each week?",
    a: "A normal week mixes small and large: user setup and access, automation that needs building or fixing, configuration changes and data jobs. The mix changes every week, which is the point of having people who already know the org.",
  },
  {
    q: "What services does Salesforce provide?",
    a: "Salesforce sells cloud software, mainly Sales Cloud and Service Cloud for CRM, Marketing Cloud for messaging, and the Platform for building your own apps, along with hosting, security, upgrades and its own support plans for the product. What it does not usually do is the work inside your org: setting up users, building automation, cleaning data, connecting other systems. Partners and in-house admins do that part.",
  },
];

const RELATED = [
  { title: "Salesforce consulting", to: "/services/salesforce", body: "How our Salesforce work runs, end to end." },
  { title: "Salesforce data migration", to: "/services/salesforce-data-migration", body: "One-off moves into or between orgs." },
  { title: "Salesforce integration: SAP and ERP", to: "/services/salesforce-integration", body: "Keeping other systems in step with Salesforce." },
  { title: "Marketing Cloud consulting", to: "/services/salesforce-marketing-cloud-consulting", body: "Ongoing Marketing Cloud support." },
  { title: "What Salesforce implementation costs", to: "/services/salesforce-implementation-cost", body: "How ongoing support fits a budget." },
  { title: "Salesforce consultant, Philadelphia", to: "/services/salesforce-consultant-philadelphia", body: "For firms near our Malvern office." },
];

const link = "text-oa-blue underline underline-offset-4";

export default function SalesforceManagedServices() {
  useSEO({
    title: "Salesforce Managed Services and Support | OneAlgorithm",
    description:
      "Ongoing Salesforce admin, development and data jobs from a listed Consulting Partner. Free one-week org review.",
    canonical: getCanonicalUrl("/services/salesforce-managed-services"),
    ogTitle: "Salesforce Managed Services — OneAlgorithm",
    ogDescription:
      "People who already know your org: user admin, flows and triggers, data jobs and tidy configuration, week after week.",
    ogUrl: getCanonicalUrl("/services/salesforce-managed-services"),
    ogImage: "https://onealgorithm.com/media/salesforce/og-salesforce-managed-services.jpg",
    ogImageSize: [1200, 630],
    twitterTitle: "Salesforce Managed Services — OneAlgorithm",
    twitterDescription:
      "Ongoing Salesforce admin, development and data jobs from a listed Consulting Partner. Free one-week org review.",
    twitterImage: "https://onealgorithm.com/media/salesforce/og-salesforce-managed-services.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Managed Services",
          "Ongoing Salesforce administration and development: user and access management, Flow and Apex trigger work, permission and custom metadata configuration, bulk data jobs and release checks, delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-managed-services",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Salesforce managed services"
        title={
          <>
            Salesforce managed services from{" "}
            <span className="text-oa-orange">people who know your org</span>
          </>
        }
        lede="Go-live is the start. After it come new reps, new rules, broken flows and data that needs moving. We handle that work every week, under one arrangement, without a new project each time."
        panel={{
          title: "Salesforce's record of us",
          items: [
            "16 Salesforce-certified people",
            SF_PROOF_LINE,
            "Listed AppExchange Consulting Partner",
            "Free one-week review of your org",
          ],
        }}
        primary={{ label: "Book a free health check", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="paper" compact>
        <PartnerBadge />
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What is covered"
          title="The work that keeps an org useful"
          lede="This is the list from an engagement we run now, not a brochure."
        />
        <CardGrid columns={2} className="mt-12">
          {SCOPE.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="How it runs" title="What you can expect from us" />
        <div className="mt-10">
          <CheckList items={HOW} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="What we do now" title="Managed services we are running today" />
        <Prose className="mt-8">
          <p>
            Since April 2026 we have done weekly Salesforce development for a
            lending company.
          </p>
          <p>
            Before that, we provided Marketing Cloud support to another client
            on a recurring basis for about eighteen months, alongside migration
            and build work on their core org. Ongoing support is not a new line
            for us; it is most of what long Salesforce relationships turn into.
          </p>
          <p>
            One thing an outside team should do for you is keep up with the
            platform. Salesforce ships three major releases a year, and each can
            change how existing automation behaves. Reading the release notes
            against your org, and testing in a sandbox before the release
            reaches production, is part of the job, not an extra.
          </p>
          <p>
            The test of a managed service is whether the org gets easier to
            change over time. Each request is a chance to replace a hard-coded
            value with custom metadata, fold a one-off profile edit into a
            permission set, or retire a flow that a newer one made redundant.
            Done steadily, that is the difference between an org that takes a
            day to change and one that takes a month.
          </p>
          <p>
            It also works alongside people you already have. If you employ an
            admin, they usually keep the requests from users and we take the
            development, the data jobs and the releases. If you have nobody, we
            cover all of it, and we write down what we change so you are never
            dependent on one person remembering why something was built.
          </p>
          <p>
            Most companies start with the free one-week review, which shows what
            is costing them now. For how ongoing support fits next to project
            work in a budget, see{" "}
            <a className={link} href="/services/salesforce-implementation-cost">what Salesforce implementation costs</a>.
            If there is a migration or{" "}
            <a className={link} href="/services/salesforce-integration">integration</a>{" "}
            to do first, we usually do that as a project and move to managed
            services after.
          </p>
        </Prose>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="What people ask about ongoing support" />
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="Related" title="Other Salesforce work" />
        <CardGrid columns={3} className="mt-12">
          {RELATED.map((r) => (
            <Card key={r.to} title={r.title} body={r.body} to={r.to} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        title="Tell us what keeps waiting in your Salesforce queue"
        body="Access requests, a flow nobody dares touch, a data job that never gets scheduled. Describe it and we will tell you how we would take it on."
        primary={{ label: "Book a free health check", to: "/contact?need=salesforce" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
