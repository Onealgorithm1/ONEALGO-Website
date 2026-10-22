import Layout from "../../components/Layout";
import { PartnerBadge } from "./SalesforceCity";
import SocialShare from "../../components/SocialShare";
import { Factory, Calculator, AlertTriangle, ArrowLeftRight } from "lucide-react";
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

/* Salesforce integration (SAP / ERP) — nationwide service page. Added
 * 2026-10-21 (sf-seo-wave-2026-10-22).
 *
 * DEMAND: "salesforce integration services" and "sap salesforce integration"
 * each ~500/mo US (areas/sales/runs/2026-10-21_sf-nationwide/demand/kp-findings.md).
 *
 * ⛔ PROOF: the invoiced work package "DOG Synch from SAP to SFDC"
 * (salesforce-delivery-evidence-2026-09-01.md). Client is NOT named, ever.
 * ⛔ MULESOFT: no certification, no AppExchange competency, no delivery
 * artefact (same note, "THE MULESOFT GAP"). This page does not claim a
 * MuleSoft practice and does not say "API-led connectivity".
 * ⛔ NetSuite / QuickBooks: we have NO delivery evidence for either. The FAQ
 * answers how Salesforce connects to them in general; it does not claim we
 * have built one.
 */

const CASES = [
  {
    icon: Factory,
    title: "SAP to Salesforce",
    body: "Sales sees customers and orders that live in SAP. We have built and invoiced an SAP-to-Salesforce sync. We decide which system owns each field, and how often it should move, before building.",
  },
  {
    icon: Calculator,
    title: "Finance and ERP systems",
    body: "Invoices, payment status and credit holds belong in the finance system, but reps need to see them. The usual answer is a read-mostly view in Salesforce, not a second copy anyone can edit.",
  },
  {
    icon: AlertTriangle,
    title: "The sync that broke quietly",
    body: "An integration that stopped months ago and told nobody. These are worth finding first, because every day it is down the two systems drift further apart.",
  },
  {
    icon: ArrowLeftRight,
    title: "Two-way, done carefully",
    body: "When both systems can edit the same record, someone has to decide who wins a conflict. We write that rule down with you before building, because the code only enforces a decision a person made.",
  },
];

const DECISIONS = [
  "Which system is the master for each object and each field",
  "Whether data is copied into Salesforce or viewed in place",
  "Real time, scheduled batches, or on demand",
  "What happens to a failed record, and who is told",
  "Which integration user runs it, with only the permissions it needs",
];

/* Questions are real autocomplete phrasings from
   areas/sales/runs/2026-10-21_sf-nationwide/gaps/questions.json:
   "can salesforce integrate with sap", "does salesforce integrate with
   netsuite", "can salesforce integrate with quickbooks",
   "is salesforce an integration platform". ⛔ Not repeated on sibling pages. */
const FAQS = [
  {
    q: "Can Salesforce integrate with SAP?",
    a: "Yes. Salesforce exposes standard APIs, and SAP systems can be connected to them through middleware, through scheduled file or API jobs, or by viewing SAP data from Salesforce without copying it, using Salesforce Connect. Which route fits depends on your SAP version, how fresh the data has to be, and whether Salesforce ever writes back. We have built an SAP-to-Salesforce sync and can talk through the trade-offs from that experience.",
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
    q: "Is Salesforce an integration platform?",
    a: "Salesforce itself is a CRM and application platform with strong APIs, Platform Events for publishing changes, and Salesforce Connect for external data. Salesforce also owns MuleSoft, which is a dedicated integration platform sold separately. Many integrations need nothing beyond the core platform; some justify middleware. That is a scoping decision, not a default.",
  },
];

const RELATED = [
  { title: "Salesforce consulting", to: "/services/salesforce", body: "How our Salesforce work runs, end to end." },
  { title: "Salesforce data migration", to: "/services/salesforce-data-migration", body: "For a one-time move rather than an ongoing sync." },
  { title: "Salesforce managed services", to: "/services/salesforce-managed-services", body: "Someone watching the integrations after go-live." },
  { title: "Marketing Cloud consulting", to: "/services/salesforce-marketing-cloud-consulting", body: "Connecting CRM data to email and journeys." },
  { title: "What Salesforce implementation costs", to: "/services/salesforce-implementation-cost", body: "Where integration sits in a budget." },
  { title: "Salesforce consultant, Philadelphia", to: "/services/salesforce-consultant-philadelphia", body: "For firms near our Malvern office." },
];

const link = "text-oa-blue underline underline-offset-4";

export default function SalesforceIntegration() {
  useSEO({
    title: "Salesforce Integration Services: SAP & ERP | OneAlgorithm",
    description:
      "Salesforce integration with SAP, ERP and finance systems, from a listed Consulting Partner that has built an SAP sync.",
    canonical: getCanonicalUrl("/services/salesforce-integration"),
    ogTitle: "Salesforce Integration: SAP & ERP — OneAlgorithm",
    ogDescription:
      "Connecting Salesforce to SAP, ERP and finance systems, with ownership and failure rules agreed before anything is built.",
    ogUrl: getCanonicalUrl("/services/salesforce-integration"),
    ogImage: "https://onealgorithm.com/media/salesforce/og-salesforce-integration.jpg",
    ogImageSize: [1200, 630],
    twitterTitle: "Salesforce Integration: SAP & ERP — OneAlgorithm",
    twitterDescription:
      "Salesforce integration with SAP, ERP and finance systems, from a listed Consulting Partner that has built an SAP sync.",
    twitterImage: "https://onealgorithm.com/media/salesforce/og-salesforce-integration.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Integration with SAP and ERP Systems",
          "Integration of Salesforce with SAP, ERP and finance systems: system-of-record design, scheduled and event-driven syncs, viewing external data with Salesforce Connect, integration user permissions and failure handling. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-integration",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Salesforce integration"
        title={
          <>
            Salesforce integration with{" "}
            <span className="text-oa-orange">SAP and your ERP</span>
          </>
        }
        lede="Your customers live in Salesforce and your orders live somewhere else. We connect the two so reps see the truth, and so a failed sync gets noticed the same day."
        panel={{
          title: "Salesforce's record of us",
          items: [
            "16 Salesforce-certified people",
            "52 certifications, 38 on Platform",
            "Listed AppExchange Consulting Partner",
            "Free one-week review of your org",
          ],
        }}
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="paper" compact>
        <PartnerBadge />
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What the work usually is"
          title="Four integration problems we see most"
          lede="The systems differ. The question underneath is always which one is telling the truth."
        />
        <CardGrid columns={2} className="mt-12">
          {CASES.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Before any code"
          title="Five decisions we make with you first"
          lede="Most failed integrations were built correctly against a decision nobody actually made."
        />
        <div className="mt-10">
          <CheckList items={DECISIONS} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="How we build it" title="The lightest route that holds up" />
        <Prose className="mt-8">
          <p>
            Our own record includes an invoiced sync from SAP into Salesforce.
            On every integration we decide ownership field by field, and
            design for the record that fails, because one always does.
          </p>
          <p>
            Salesforce gives you several ways to connect a system, and they are
            not interchangeable.{" "}
            <a className={link} href="https://help.salesforce.com/s/articleView?id=sf.platform_connect_about.htm&type=5" target="_blank" rel="noopener noreferrer">Salesforce Connect</a>{" "}
            shows external data inside Salesforce without copying it, which
            suits data that changes often and that Salesforce never edits.{" "}
            <a className={link} href="https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm" target="_blank" rel="noopener noreferrer">Platform Events</a>{" "}
            let Salesforce announce a change for another system to pick up.
            Large scheduled loads run on the{" "}
            <a className={link} href="https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_intro.htm" target="_blank" rel="noopener noreferrer">Bulk API</a>.
            Where a managed runtime is worth paying for, we scope and build on
            CloudHub; where it is not, we say so and keep the moving parts down.
          </p>
          <p>
            Every integration runs as its own integration user with only the
            object and field access it needs, so a leaked credential cannot read
            the whole org, and every failure writes somewhere a person will see
            it. A silent failure is the expensive kind.
          </p>
          <p>
            Scheduling matters more than people expect. A nightly batch is
            simple, cheap and easy to rerun, and for most finance data it is
            enough. Real-time syncs earn their extra moving parts only when a
            rep or a customer is actually waiting on the answer. Salesforce
            also limits how many API calls an org can make in a day, so a sync
            that polls every minute can starve other tools; we size the
            approach against those limits before choosing it.
          </p>
          <p>
            Once it is live, an integration needs an owner. Someone has to read
            the failure log, rerun what failed, and notice when the other
            system changes a field. If you have nobody for that, it is part of
            our{" "}
            <a className={link} href="/services/salesforce-managed-services">managed services</a>.
          </p>
          <p>
            If you are moving off the old system rather than keeping it, that is
            a{" "}
            <a className={link} href="/services/salesforce-data-migration">data migration</a>,
            which is simpler. For how integration work affects a project
            budget, see{" "}
            <a className={link} href="/services/salesforce-implementation-cost">what Salesforce implementation costs</a>.
          </p>
        </Prose>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="What people ask about connecting systems" />
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
        title="Tell us which two systems need to talk"
        body="Name them, say which direction the data should go, and tell us what breaks today. We will tell you which route we would look at first."
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
