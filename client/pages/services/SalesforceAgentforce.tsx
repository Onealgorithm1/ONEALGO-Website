import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, DeliveredLedger, PersonCredentials,
  FAQ, DeskCTA, StageRail, StageUnits, SourcesDialog, Verify, type SfFaqItem, type Stage, type SfSource,
} from "../../components/sf";
import { HealthCheck } from "../../components/sf/illus";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PHONE, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData, createServiceSchema, createWebPageSchema, createLocalBusinessSchema, SF_HEALTH_CHECK_OFFER,
} from "../../components/StructuredData";
import { DataTable, TABLE_CSS } from "./aiShared";

/* /services/salesforce-agentforce, built 2026-11-15 on the v2 kit (Louis 2026-11-14: "our website does not talk about
 * AI automation whatsoever"; demand: Keyword Planner, onealgo-icm-oa/areas/sales/runs/2026-11-14_2345_ai-automation-demand).
 *
 * ⛔ PROOF: our Agentforce record is CERTIFICATIONS, not delivery (salesforce-delivery-evidence-2026-09-01: "credential
 * proof, not delivery proof. Keep that line."). No Agentforce client, rollout, timeline, result or price of ours is
 * claimed anywhere on this page. Use cases are "jobs we would look at first" (approach only).
 * ⛔ SALESFORCE'S FACTS: every price and product name is Salesforce's own, read on salesforce.com 14 November 2026 by a
 * person and listed in the SourcesDialog. They change often: re-read both pages before editing and move READ.
 * ⛔ SREENIVAS: the sentence naming his two Agentforce certifications is the hub's (Salesforce.tsx); the names are
 * Salesforce's official credential names. No other sentence about him.
 * The readiness claims (duplicates, permissions) restate the health-check page's own FAQ. */

const PAGE_PATH = "/services/salesforce-agentforce";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-11-15";
const READ = "14 November 2026";
const TITLE = "Salesforce Agentforce Consulting & Implementation | One Algorithm";
const DESCRIPTION =
  "Agentforce consulting from a Salesforce Consulting Partner in Malvern, PA. Start with a free one-week health check of your data. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/salesforce/og/og-agentforce.jpg";
const OG_ALT = "Salesforce Agentforce consulting from One Algorithm, a Salesforce Consulting Partner in Malvern, Pennsylvania.";
const HUB = "/services/salesforce";
const HC = "/services/salesforce-health-check";
const COST = "/services/salesforce-implementation-cost";
const MS = "/services/salesforce-managed-services";
const INT = "/services/salesforce-integration";
const AI = "/services/ai-automation";
const SOURCES_ID = "agf-sources";

const SOURCES: SfSource[] = [
  { name: "Salesforce: Agentforce pricing", what: "Flex Credits, Conversations, the per-user add-ons and licenses, and the free start through Salesforce Foundations", read: `read ${READ}`, page: "https://www.salesforce.com/agentforce/pricing/" },
  { name: "Salesforce: Agentforce", what: "Salesforce's description of Agentforce, the parts it names and the data an agent uses", read: `read ${READ}`, page: "https://www.salesforce.com/agentforce/" },
];

/* Salesforce's list prices, USD, read READ. Left column = Salesforce's own option names. */
const PRICES: string[][] = [
  ["Salesforce Foundations", "$0", "Salesforce's free way to start with Agentforce"],
  ["Flex Credits", "$500 per 100,000 credits", "A standard action uses 20 credits, a voice action 30"],
  ["Conversations", "$2 per conversation", "Cannot run in the same org as Flex Credits"],
  ["Agentforce add-ons", "$125 per user per month", "For Sales, Service and Field Service"],
  ["Agentforce Industries add-ons", "$150 per user per month", "For the Industries clouds"],
  ["Max edition", "From $550 per user per month", "Sales, Service and Industries editions"],
  ["Agentforce user license", "$5 per user per month", "Requires Flex Credits"],
];

const AGF_STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Free one-week health check", sub: "inside your org, read-only", line: "We start inside your org: the data, permissions and automation an agent would rely on, ranked by what to fix first.",
    details: ["A read-only user you create", "Data: duplicates and required fields filled with junk", "Permissions: who and what can see or change each object", "A written list ranked by what to fix first"] },
  { k: "s2", num: "02", title: "One job, written down", sub: "scope · handoff · measure", line: "We agree the one job, the data it may use, when it hands off to a person, and how you will judge it.",
    details: ["The one job the agent does first", "The records and knowledge it may read", "The point where it hands off to a person", "The measure you will judge it by"] },
  { k: "s3", num: "03", title: "Build and test in a sandbox", sub: "Agent Builder · real questions", line: "We build the agent in a sandbox and run it against real past questions before any customer meets it.",
    details: ["Built in Agent Builder, in a sandbox", "Its own permissions, only what the job needs", "Run against real questions from your history", "Wrong answers fixed before launch, not after"] },
  { k: "s4", num: "04", title: "Launch, then read the log", sub: "review · adjust · support", line: "After launch a named person reads what the agent did and adjusts it, and that can be us through managed services.",
    details: ["A named person reads what the agent did", "Instructions adjusted as questions change", "Credit use watched against your plan", "Weekly administration, through managed services"] },
];

/* One owner page per question: "Is our Salesforce org ready for Agentforce?" belongs to the health-check page. */
const FAQS: SfFaqItem[] = [
  {
    q: "What is Agentforce in Salesforce?",
    a: "Agentforce is Salesforce's platform for AI agents. An agent answers questions and takes actions inside your Salesforce org, working from your records and within the limits you set. You build one in Agent Builder from instructions and actions, test it, and then switch it on for customers or for your own team.",
  },
  {
    q: "How much does Agentforce cost?",
    a: `On ${READ} salesforce.com listed three ways to pay: Flex Credits at $500 per 100,000 credits, where a standard action uses 20 credits; Conversations at $2 each; or per-user add-ons from $125 per user per month. Salesforce Foundations is listed at $0 to start. Salesforce changes these, so read its pricing page before you budget.`,
    link: { to: COST, label: "Salesforce implementation cost guide" },
  },
  {
    q: "What is a Flex Credit?",
    a: `A Flex Credit is Salesforce's unit for paying per action. On ${READ} Salesforce listed $500 per 100,000 credits and 20 credits for a standard action, which works out to 10 cents an action. Unused credits do not roll over into the next subscription term, so buy against measured use, not a guess.`,
  },
  {
    q: "Do we need Data 360 to use Agentforce?",
    a: "Salesforce says an agent works from your Salesforce CRM data and can also use outside data through Data 360, and its pricing examples list Data 360 credits as a separate cost. If the first job only needs records already in Salesforce, we tell you before you buy anything else.",
  },
  {
    q: "Can Agentforce replace our chatbot?",
    a: "It can take over the questions a scripted chatbot answers, and it works from your records instead of a fixed script. Whether to replace the bot or run both depends on what your current bot does today. We look at that before recommending either.",
  },
  {
    q: "How long does an Agentforce implementation take?",
    a: "It depends on the state of your data and how many jobs the agent takes on. The free health check takes one week. After it, you get a written list ranked by what to fix first, and we plan the first job from that.",
    link: { to: HC, label: "What the free health check covers" },
  },
  {
    q: "Can a small business use Agentforce?",
    a: "Yes. Salesforce lists a free start through Salesforce Foundations and usage-based pricing, so a small team can begin with one job and pay for what it uses. The work that decides whether it pays off is the same at any size: clean records, tight permissions and one clear job.",
  },
  {
    q: "Do you need an Agentforce consultant, or can we set it up ourselves?",
    a: "Your admin can build a first agent in Agent Builder. A consultant earns the fee where the data needs cleaning, where permissions are loose, or where the agent has to reach systems outside Salesforce. If you do not need us, the health check will show that too.",
  },
];

const SourcesChip = () => <Verify id={SOURCES_ID}>Where these figures come from</Verify>;

export default function SalesforceAgentforce() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "Salesforce Agentforce Consulting & Implementation",
    ogDescription:
      "Agentforce consulting from a Salesforce Consulting Partner, starting with a free one-week check of the data and permissions an agent would use.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "Salesforce Agentforce Consulting & Implementation",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Agentforce Consulting and Implementation",
          "Consulting for Salesforce Agentforce: a free one-week health check of the data and permissions an agent would use, one job scoped in writing, the agent built and tested in a sandbox, and review after launch. Delivered by a listed AppExchange Consulting Partner based in Malvern, Pennsylvania.",
          "Salesforce Agentforce consulting",
          PAGE_URL,
          { image: OG_IMAGE, offers: SF_HEALTH_CHECK_OFFER },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "Salesforce", to: HUB }, { label: "Agentforce" }]}>
        {/* 1 HERO. H1 = the LCP. FIG. 1 is the health-check report (sample data): the page's offer is the readiness check. */}
        <SFHero
          kicker={<>Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="Salesforce Agentforce consulting that starts with your data"
          lede="We get US companies ready for Salesforce Agentforce, starting with a free one-week check of the records and permissions an agent would work from."
          proof
          figure={<HealthCheck fig={1} hero className="sf-hero-fig" />}
        />

        {/* 2 THE ANSWER UNITS: what it is, and what a consultant does. */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What is Salesforce Agentforce?"
            lede="Agentforce is Salesforce's platform for AI agents that answer questions and take actions inside your Salesforce org."
            lead="An agent works from your records and acts with the access you give it, so both have to be right first."
            points={[
              "Built in Agent Builder from instructions and actions",
              "Works from your Salesforce records, and outside data through Data 360",
              "Acts within the guardrails you set",
            ]}
          >
            <GoDeeper label="Salesforce's own description and the parts it names">
              <p className="sf-rule">
                Salesforce describes Agentforce as “a proactive, autonomous AI application that answers questions, takes actions, and improves productivity.” Its product page names the parts: Agent Builder, Agent Script, the Atlas Reasoning Engine, Agentforce Voice, Observability and support for the Model Context Protocol.
              </p>
              <p>Agents are built from Flows, prompts, Apex and MuleSoft APIs, the same tools your Salesforce already runs on.</p>
              <p className="sf-mono" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
                Salesforce, read {READ} · <SourcesChip />
              </p>
              <div className="sf-links"><Link className="sf-link" to={HUB}>Salesforce consulting services</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            delay={0.08}
            headingId="h-consultant"
            id="consultant"
            title="What an Agentforce consultant does"
            lede="An Agentforce consultant picks the job, prepares the data, builds the agent and tests it before customers meet it."
            leadIn="What we do:"
            lead="We start with one job an agent can finish, and a written rule for when it hands off to a person."
          />
        </SmartSection>

        {/* 3 NIGHT BAND: readiness, three H3 units. Restates the health-check page's own Agentforce answer. */}
        <SmartSection
          id="ready"
          tone="night"
          grid
          heading={{
            id: "h-ready",
            title: "Is your Salesforce org ready for Agentforce?",
            lede: "An agent repeats whatever your records say, so readiness comes down to data, permissions and one clear job.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c4"
            kicker="Data"
            title="Duplicates and junk fields"
            lede="Duplicate records and junk in required fields carry straight into what an agent says and does."
            leadIn="What we do:"
            lead="The health check's Data area lists them, ranked by what to fix first."
          />
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            kicker="Permissions"
            title="What the agent can touch"
            lede="An agent acts with the access you give it, so loose permissions become the agent's permissions."
            lead="We review who and what can see or change each object before an agent is switched on."
          />
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.16}
            kicker="The job"
            title="One job with a clear finish"
            lede="Agents do best on one bounded job, such as answering order-status questions or drafting a case summary."
            leadIn="Yes, but:"
            lead="A job nobody can describe in writing is not ready for an agent."
          >
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={HC}>What the free health check covers</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 4 COST: Salesforce's own list prices (visible table: the table is the answer) + what our work adds. */}
        <SmartSection
          id="cost"
          grid
          heading={{
            id: "h-cost",
            title: "What Salesforce Agentforce costs today",
            lede: "Salesforce lists three ways to pay for Agentforce: Flex Credits per action, a flat price per conversation, or per-user add-ons.",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: TABLE_CSS }} />
          <LedgerRule className="sf-c8">
            <p className="sf-kicker" id="agf-prices-label">Salesforce's list prices, US dollars</p>
            <div style={{ marginTop: 16 }}>
              <DataTable
                id="agf-prices"
                label={`Salesforce's Agentforce list prices in US dollars, read ${READ}`}
                head={["Option", "Salesforce's price", "What to know"]}
                rows={PRICES}
              />
            </div>
            <p className="sf-mono" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
              Salesforce's list prices, read {READ}. They change · <SourcesChip />
            </p>
            <GoDeeper label="what 20 credits means, and what the prices leave out">
              <p className="sf-rule">At $500 per 100,000 credits and 20 credits an action, a standard action costs 10 cents. An agent that takes four actions to close a request costs 40 cents for that request.</p>
              <p>Salesforce says unused Flex Credits do not roll over into the next subscription term, and that Flex Credits and Conversations cannot run in the same org. Its pricing examples leave out other usage costs such as Data 360 credits.</p>
              <p>Measure a month of real use on a small plan before you commit to a large one.</p>
            </GoDeeper>
          </LedgerRule>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            kicker="Setup"
            title="What our work adds to that"
            lede="Setup is separate from Salesforce's prices and depends on your data and how many jobs the agent takes on."
            leadIn="What you get:"
            lead="The free health check shows what needs fixing before you buy a single credit."
          >
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={COST}>Salesforce implementation cost guide</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 5 HOW IT RUNS: FIG. 2, the rail + four stage units. */}
        <SmartSection
          id="how"
          tone="surface"
          heading={{
            id: "h-how",
            title: "How an Agentforce implementation runs",
            lede: "An Agentforce implementation runs in four steps, from a free look at your org to an agent someone watches.",
          }}
        >
          <StageRail
            fig={2}
            stations={AGF_STAGES}
            className="sf-rail-top"
            title="Staged diagram of a four-step Agentforce implementation"
            desc="A rail runs through four stations: the free one-week health check, one job written down, the build and test in a sandbox, and the launch with a log a person reads."
            stamp="How an Agentforce implementation runs"
            caption="The four steps in the order they run, from a free look at your org to an agent someone watches."
          />
          <StageUnits items={AGF_STAGES} />
        </SmartSection>

        {/* 6 USE CASES: approach only, no delivery claim. */}
        <SmartSection
          id="uses"
          grid
          heading={{
            id: "h-uses",
            title: "Agentforce use cases for sales and service",
            lede: "These are the sales and service jobs we would look at first.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c6"
            kicker="Service Cloud"
            title="Service: answers and case summaries"
            lede="A service agent answers common questions from your knowledge and records, and passes the rest to a person with a summary."
            points={["Order, booking and account status questions", "A summary on every case it hands off", "Out-of-hours cover for the questions that repeat"]}
          />
          <SmartUnit
            level={3}
            className="sf-c6"
            delay={0.08}
            kicker="Sales Cloud"
            title="Sales: follow-up and record upkeep"
            lede="A sales agent follows up on new leads and keeps records current, so reps spend their time on conversations."
            points={["A first reply to every new lead", "Meeting notes written back to the record", "Stale opportunities flagged to their owner"]}
          >
            <p className="sf-mono" style={{ marginTop: 12 }}>These are jobs we would scope with you.</p>
          </SmartUnit>
        </SmartSection>

        {/* 7 GUARDRAILS: the rule we run our own AI systems by, with the count from our own database. */}
        <SmartSection id="guardrails" tone="surface" grid labelledBy="h-guardrails">
          <SmartUnit
            className="sf-c7"
            headingId="h-guardrails"
            title="Guardrails, testing and human handoff"
            lede="Every agent gets written limits, a test set from real history, and a point where a person takes over."
            leadIn="What you get:"
            lead="The limits and the handoff rule in writing before the build starts."
            points={[
              "Its own permissions, only what the job needs",
              "Tested on real past questions before launch",
              "A person reads what it did after launch",
            ]}
          >
            <GoDeeper label="how the same rule runs our own AI systems">
              <p className="sf-rule">We run AI systems of our own every day, under the same rule. In the reply system we run for a retail client, 581 customer comments have been held for a person since 13 October 2026 (our own database, read 15 November 2026).</p>
              <div className="sf-links"><Link className="sf-link" to={AI}>AI automation services</Link><Link className="sf-link" to={MS}>Salesforce managed services</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c5"
            delay={0.08}
            kicker="Beyond Salesforce"
            title="When the agent needs other systems"
            lede="An agent that quotes stock, prices or invoices needs that data in reach, which is integration work."
            leadIn="What we do:"
            lead="We have built an SAP-to-Salesforce sync and connect other systems the same way."
          >
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={INT}>Salesforce integration services</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 8 THE RECORD: the AppExchange figures, who leads the work, and what our Agentforce record is today. */}
        <SmartSection
          id="record"
          heading={{
            id: "h-record",
            title: "An Agentforce consultant you can check",
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
              level={3}
              className="sf-c7"
              headingId="h-agf-record"
              title="Our Agentforce record today"
              lede="Sreenivas Amirisetti holds the Agentforce Sales Consultant and Agentforce Service Consultant certifications."
              leadIn="Why it matters:"
              lead="The delivered Salesforce work below is the data and automation an agent runs on."
              style={{ gridColumn: "1 / 8", gridRow: 1 } as React.CSSProperties}
            >
              <DeliveredLedger />
              <GoDeeper label="the competency rows and how to check any partner">
                <p className="sf-rule">Salesforce's listing breaks the {SF_CERTIFICATIONS} certifications down by competency, including 7 on Agentforce (read {SF_VERIFIED_LABEL}). Open any partner's listing and read the same box before you hire them; ask who will do your work and look them up on Trailblazer.</p>
                <div className="sf-links"><Link className="sf-link" to="/services/salesforce-consulting-partner-pennsylvania">How to check any Salesforce partner</Link></div>
              </GoDeeper>
            </SmartUnit>
          </div>
        </SmartSection>

        {/* 9 DESK: the one CTA band. */}
        <DeskCTA form={{ topic: "agentforce", topicLabel: "Agentforce", heading: "Book a free health check", prompt: "Which job would you give an agent first?", submitLabel: "Book a free health check" }} />

        {/* 10 FAQ */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Agentforce questions buyers ask</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SourcesDialog id={SOURCES_ID} sources={SOURCES} intro="Every Salesforce price and product fact on this page is Salesforce's own, read on its site on the date shown. Salesforce changes them; read its page before you budget." />
      </SfPage>
    </Layout>
  );
}
