import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Mail, Link2, ShieldCheck, Wrench } from "lucide-react";
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

/* Salesforce Marketing Cloud consulting — nationwide service page. Added
 * 2026-10-21 (sf-seo-wave-2026-10-22).
 *
 * DEMAND: "salesforce marketing cloud consultant" ~500/mo US, bids $13-63
 * (areas/sales/runs/2026-10-21_sf-nationwide/demand/kp-findings.md).
 *
 * ⛔ PROOF: two recurring "Marketing Cloud Support" POs, invoiced ~18 months
 * Mar-2023 to Jul-2024 (salesforce-delivery-evidence-2026-09-01.md). Client
 * NOT named. Do not upgrade "support" into a claimed greenfield
 * implementation. Lender bulk-email work is core-org work, not
 * Marketing Cloud — keep it off this page (fact-check 2026-10-21 #17).
 * ⛔ No Marketing Cloud certification count is stated: the 52 figure is the
 * firm total from the AppExchange listing and is not broken out by cloud
 * here. Account Engagement (Pardot), Data Cloud, Personalization: no delivery
 * evidence, not claimed.
 */

const WORK = [
  {
    icon: Wrench,
    title: "Support for a running account",
    body: "We provided Marketing Cloud support month after month for about a year and a half.",
  },
  {
    icon: Link2,
    title: "The CRM connection",
    body: "Marketing Cloud is only as good as the Salesforce data it receives. We check what syncs, how often, and whether the fields marketing filters on are actually filled in.",
  },
  {
    icon: ShieldCheck,
    title: "Consent and suppression",
    body: "Unsubscribes and do-not-contact flags have to flow both ways between Salesforce and Marketing Cloud. A send to someone who opted out is the mistake that costs most.",
  },
  {
    icon: Mail,
    title: "Getting data out, too",
    body: "Large pulls of email and engagement data for reporting or another system, run in batches so nothing times out and nothing is counted twice.",
  },
];

const CHECKS = [
  "Which Salesforce objects and fields sync, and how often",
  "Whether opt-outs reach both systems",
  "Automations that run but send nothing",
  "Data extensions nobody can explain",
  "Who has access, and whether they still should",
];

/* Questions are real autocomplete phrasings from
   areas/sales/runs/2026-10-21_sf-nationwide/gaps/questions.json:
   "what does a salesforce marketing cloud consultant do",
   "what is salesforce marketing cloud", "is salesforce marketing cloud a crm".
   ⛔ Not repeated on sibling pages. */
const FAQS = [
  {
    q: "What does a Salesforce Marketing Cloud consultant do?",
    a: "Sets up and looks after the parts of Marketing Cloud a marketing team relies on: the connection to Salesforce CRM, data extensions and segments, email builds, journeys and automations, and the consent rules around all of it. On a running account, most of the job is support: changing what exists, fixing what broke, and keeping the data feeding it clean.",
  },
  {
    q: "What is Salesforce Marketing Cloud?",
    a: "Salesforce's set of marketing products for sending email, SMS and other messages, building multi-step customer journeys, and measuring the results. It is sold and run separately from the core Salesforce CRM, and the two are linked with Marketing Cloud Connect, which Salesforce documents in its help pages.",
  },
  {
    q: "Is Salesforce Marketing Cloud a CRM?",
    a: "No. The CRM is Sales Cloud or Service Cloud, where your accounts, contacts and opportunities live. Marketing Cloud is the messaging side. It uses CRM data to decide who gets what, which is why most Marketing Cloud problems turn out to be data problems in the CRM.",
  },
];

const RELATED = [
  { title: "Salesforce consulting", to: "/services/salesforce", body: "How our Salesforce work runs, end to end." },
  { title: "Salesforce data migration", to: "/services/salesforce-data-migration", body: "Cleaning and moving the data marketing depends on." },
  { title: "Salesforce integration: SAP and ERP", to: "/services/salesforce-integration", body: "Getting order and customer data into the CRM." },
  { title: "Salesforce managed services", to: "/services/salesforce-managed-services", body: "Ongoing admin and development for the core org." },
  { title: "What Salesforce implementation costs", to: "/services/salesforce-implementation-cost", body: "Where the money goes in a Salesforce project." },
  { title: "Salesforce consultant, Philadelphia", to: "/services/salesforce-consultant-philadelphia", body: "For firms near our Malvern office." },
];

const link = "text-oa-blue underline underline-offset-4";

export default function SalesforceMarketingCloud() {
  useSEO({
    title: "Salesforce Marketing Cloud Consulting | OneAlgorithm",
    description:
      "Marketing Cloud support and CRM connection work from a listed Salesforce Consulting Partner. Free one-week review.",
    canonical: getCanonicalUrl("/services/salesforce-marketing-cloud-consulting"),
    ogTitle: "Salesforce Marketing Cloud Consulting — OneAlgorithm",
    ogDescription:
      "Support for a running Marketing Cloud account: sends, journeys, the Salesforce connection and the consent rules around them.",
    ogUrl: getCanonicalUrl("/services/salesforce-marketing-cloud-consulting"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Marketing Cloud Consulting — OneAlgorithm",
    twitterDescription:
      "Marketing Cloud support and CRM connection work from a listed Salesforce Consulting Partner. Free one-week review.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Marketing Cloud Consulting",
          "Salesforce Marketing Cloud consulting and ongoing support: email and journey changes, automation fixes, Marketing Cloud Connect configuration, consent and suppression handling, and bulk data extraction. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce-marketing-cloud-consulting",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Marketing Cloud consulting"
        title={
          <>
            Salesforce Marketing Cloud consulting for{" "}
            <span className="text-oa-orange">accounts already running</span>
          </>
        }
        lede="Most Marketing Cloud trouble is not in the email. It is in the data arriving from Salesforce and the consent rules around it. We support both sides, because we work on both."
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

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What the work usually is"
          title="Four things Marketing Cloud teams ask us for"
          lede="Rarely a fresh account. Usually one that works, mostly, and that nobody fully understands any more."
        />
        <CardGrid columns={2} className="mt-12">
          {WORK.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Where we look first"
          title="Five checks on any Marketing Cloud account"
        />
        <div className="mt-10">
          <CheckList items={CHECKS} />
        </div>
      </Section>

      <Section tone="surface" bordered>
        <SectionHeading eyebrow="What we have done" title="Eighteen months of Marketing Cloud support" />
        <Prose className="mt-8">
          <p>
            From 2023 into 2024 we provided Marketing Cloud support to one client
            on a recurring basis, invoiced month by month for about a year and a
            half, alongside migration and build work on the same client's core
            Salesforce org. Working on both meant we could trace a problem to
            Marketing Cloud or to the CRM data behind it.
          </p>
          <p>
            Support also means saying when something should be switched off.
            Journeys outlive the campaigns they were built for, and old
            automations keep running against data extensions nobody refreshes.
            Part of every review is a plain list of what is still running, what
            it sends, and whether anyone would miss it if it stopped. Fewer
            moving parts make every later change cheaper and safer.
          </p>
          <p>
            On a running account, the requests are rarely dramatic. A new
            welcome series, a change to who counts as an active customer, an
            automation that ran overnight and sent nothing, a data extension
            somebody built for one campaign that three journeys now depend on.
            Each one is small. Left alone, they pile into an account nobody
            wants to touch, which is how teams end up paying for features they
            have stopped using.
          </p>
          <p>
            Consent deserves its own sentence. An opt-out recorded in
            Salesforce has to stop Marketing Cloud sends, and an unsubscribe in
            Marketing Cloud has to show in Salesforce so sales does not email
            the same person by hand. We test that path in both directions
            before changing anything else, because it is the one mistake a
            customer will remember.
          </p>
          <p>
            The link between the two clouds is{" "}
            <a className={link} href="https://help.salesforce.com/s/articleView?id=sf.mc_co_marketing_cloud_connect.htm&type=5" target="_blank" rel="noopener noreferrer">Marketing Cloud Connect</a>,
            and Salesforce's own{" "}
            <a className={link} href="https://www.salesforce.com/marketing/" target="_blank" rel="noopener noreferrer">Marketing Cloud overview</a>{" "}
            describes the product range. If your CRM data needs fixing before
            marketing can trust it, start with a{" "}
            <a className={link} href="/services/salesforce-data-migration">data cleanup or migration</a>;
            if you want the core org looked after too, see{" "}
            <a className={link} href="/services/salesforce-managed-services">managed services</a>.
          </p>
        </Prose>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Questions" title="What people ask about Marketing Cloud" />
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
        title="Tell us what your Marketing Cloud is getting wrong"
        body="Wrong audience, a journey that stopped, opt-outs you do not trust. Describe the symptom and we will tell you where we would look first."
        primary={{ label: "Get a free org review", to: "/contact?need=salesforce" }}
        secondary={{ label: "How the work runs", to: "/services/salesforce" }}
      />
    </Layout>
  );
}
