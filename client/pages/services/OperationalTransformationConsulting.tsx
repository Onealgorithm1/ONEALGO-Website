import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { Users, Workflow, Plug, ClipboardCheck, Compass, Layers } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  ProcessSteps,
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

/* Operational transformation consulting. Added 2026-10-03.
 *
 * WHY THIS PAGE EXISTS. Search Console: the query "operational transformation
 * consulting" had 29 impressions at position 85 and the site had no page that
 * matched it; the nearest, /services/operations-technology, is about plant-floor
 * equipment (SCADA, sensors), a different thing that happens to share a word.
 * Louis, 2026-10-03: "Operational transformation consulting is what we do. This
 * is actually my specialty. I am a small business consultant and startup
 * consultant." That statement is the only source for who this is for.
 *
 * PATTERN COPIED (structure only, read live 2026-10-03): the pages that rank
 * and convert in this space name the audience in the first screen, show a short
 * staged method, say how they differ from the neighbouring service, and answer
 * cost without inventing a rate.
 *
 * ⛔ WHAT THIS PAGE DOES NOT SAY, ON PURPOSE. No client results, percentages,
 * time savings, case studies, logos or guarantees: none exist that we can
 * publish. No rate: Louis said every business is different. The only price on
 * the page is one published market band, named and labelled "not our quote".
 *
 * ⛔ TO CONFIRM WITH LOUIS: the four stages in STEPS are STANDARD consulting
 * framing, written from the About page and the Salesforce pages, not from a
 * documented OneAlgorithm method. If he works differently, change STEPS.
 *
 * ⛔ Everything about the firm is taken from /about: four named people, the
 * scoper stays on the work through delivery, Salesforce / ERP / integration /
 * marketing operations in house, Malvern, WBE and MBE certified.
 */

const SIGNS = [
  "The work depends on one person, and nothing moves when they are away",
  "The same information is typed into more than one place",
  "Sales, operations and finance each have a different number for the same thing",
  "Tools keep getting added and nobody owns how they fit together",
  "More volume would mean more hiring, not more output",
];

const STEPS = [
  {
    title: "Diagnose",
    body: "We map how work actually moves: who touches it, where it waits and which numbers get typed twice.",
  },
  {
    title: "Design",
    body: "Agree who owns which decisions, which processes change and which measures will show it worked.",
  },
  {
    title: "Build and connect",
    body: "Set up and connect the systems that carry the new way of working, through our Salesforce, integration and marketing technology teams.",
  },
  {
    title: "Hand over",
    body: "Your people run it. We check that it holds and train whoever needs it.",
  },
];

const ARMS = [
  {
    icon: Users,
    title: "Sales and customer systems",
    body: "Salesforce implementation and cleanup, so the customer record lives in one place.",
    to: "/services/salesforce",
  },
  {
    icon: Plug,
    title: "Systems that have to agree",
    body: "IT consulting and integration between the tools your business already runs on.",
    to: "/services/it-consulting",
  },
  {
    icon: Layers,
    title: "Marketing operations",
    body: "MarTech consulting and stack integration, so marketing data reaches the people who use it.",
    to: "/services/martech",
  },
  {
    icon: Workflow,
    title: "Plant-floor systems",
    body: "A different thing from this service: controllers, SCADA and sensors for manufacturers. Our operations technology page covers it.",
    to: "/services/operations-technology",
  },
];

const FOR_WHO = [
  "Small businesses that have outgrown the way they started out",
  "Startups whose processes depend on the founder",
  "Teams adding tools faster than anyone can manage them",
];

const NOT_FOR = [
  "A one-off website or ad campaign. Start on our websites or Google Ads pages",
  "Setting up one tool and nothing else. The Salesforce, Zendesk or IT consulting pages are the better start",
];

const FAQS = [
  {
    q: "What is operational transformation consulting?",
    a: "It is changing how a business actually operates, not only the software it runs on: how work moves between people, who owns each decision and which systems hold the data. The tools come after the way of working is clear, not before.",
  },
  {
    q: "How is it different from management consulting?",
    a: "Management consulting is usually about direction and advice. Operational transformation is the work of making a new way of working real: agreeing roles and decision rights, then setting up and connecting the systems that carry them. We can do that systems work ourselves, because Salesforce, ERP, integration and marketing technology are what the firm builds.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. Small businesses and startups are who this service is for.",
  },
  {
    q: "How long does an engagement take?",
    a: "It depends on how much has to change. We give you an estimate after a first conversation, not a number from a web page.",
  },
  {
    q: "What does operational transformation consulting cost?",
    a: "Every business is different, so we do not publish a rate. For context, one published guide, ScaleUpExec's operational efficiency guide, puts traditional consultants at $125 to $600 an hour and a full-time chief operating officer at $200,000 to $400,000 or more a year. That is the market, not our quote. We scope the work after a conversation.",
  },
  {
    q: "Is this the same as your operations technology service?",
    a: "No. Operations technology is the plant-floor side: controllers, SCADA and sensors. Operational transformation is about how the business runs, including who does what and which systems carry the work.",
  },
  {
    q: "Do we have to buy new software?",
    a: "Not necessarily. Often the first step is finding out whether the tools you already pay for are being used. That is how our free Salesforce org review starts: licences against actual use.",
  },
  {
    q: "Who actually does the work?",
    a: "The person who scopes your work stays on it through delivery. Four people run the firm, and their names and profiles are on our about page.",
  },
];

export default function OperationalTransformationConsulting() {
  useSEO({
    /* Query-first, brand last. 63 characters is too long, so: 58. */
    title: "Operational Transformation Consulting | OneAlgorithm",
    description:
      "Operational transformation consulting for small businesses and startups: fix how the work runs, then connect the systems that carry it. Malvern, Pennsylvania.",
    canonical: getCanonicalUrl("/services/operational-transformation-consulting"),
    ogTitle: "Operational Transformation Consulting — OneAlgorithm",
    ogDescription:
      "Operational transformation consulting for small businesses and startups, from a small firm in Malvern, Pennsylvania.",
    ogUrl: getCanonicalUrl("/services/operational-transformation-consulting"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Operational Transformation Consulting — OneAlgorithm",
    twitterDescription:
      "Operational transformation consulting for small businesses and startups. Fix how the work runs, then connect the systems.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Operational Transformation Consulting",
          "Operational transformation consulting for small businesses and startups: diagnosing how work actually moves, redesigning roles and decision rights, and setting up and connecting the systems that carry the new way of working, delivered by a small firm in Malvern, Pennsylvania.",
          "Business Consulting",
          "https://onealgorithm.com/services/operational-transformation-consulting",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        eyebrow="Operational transformation"
        title={
          <>
            Operational transformation consulting for{" "}
            <span className="text-oa-orange">small businesses and startups</span>
          </>
        }
        lede="Growth shows you how a business really runs: work that depends on one person, tools that do not agree, and decisions nobody owns. We help you fix how the work runs, then connect the systems that carry it."
        panel={{
          title: "Who you work with",
          items: [
            "Built for small businesses and startups",
            "The person who scopes your work stays on it through delivery",
            "Salesforce, ERP, integration and marketing systems in house",
            "Malvern, Pennsylvania. WBE and MBE certified",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <Section tone="surface" bordered>
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Signs it is time"
                title="What it looks like from the inside"
                lede="Most businesses that call us would not use the phrase operational transformation. They describe one of these."
              />
            </>
          }
          right={<CheckList items={SIGNS} />}
        />
      </Section>

      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="How an engagement runs"
          title="Four stages, in this order"
          lede="The order matters. Tools added before the way of working is clear can end up automating the confusion."
        />
        <div className="mt-12">
          <ProcessSteps steps={STEPS} />
        </div>
      </Section>

      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          eyebrow="Where the work lands"
          title="The teams that deliver it"
          lede="Operational transformation changes how the business runs. These are the places in the firm where the systems side gets built."
        />
        <CardGrid columns={2} className="mt-12">
          {ARMS.map((a) => (
            <Card key={a.title} tone="dark" icon={a.icon} title={a.title} body={a.body} to={a.to} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="paper">
        <CardGrid columns={2}>
          <Card icon={Compass} title="Who this is for">
            <div className="mt-4">
              <CheckList items={FOR_WHO} />
            </div>
          </Card>
          <Card icon={ClipboardCheck} title="Who it is not for">
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-oa-ink2">
              {NOT_FOR.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Card>
        </CardGrid>
        <Reveal>
          <p className="mt-10 max-w-3xl leading-relaxed text-oa-ink2">
            <strong className="font-semibold text-oa-ink">What it costs.</strong>{" "}
            Every business is different, so we do not publish a rate. We scope the
            work after a conversation. There is more context in the questions
            below.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper" bordered>
        <SectionHeading eyebrow="Questions" title="What people ask first" />
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

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        title="Tell us where the work gets stuck"
        body="Describe what depends on one person, or which numbers do not agree. We will tell you what we would look at first."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "See all services", to: "/services" }}
      />
    </Layout>
  );
}
