import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, SmartUnit, GoDeeper, Readouts, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseRow, EnterpriseTable, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, StepRail, EnterpriseSources } from "../../components/v2/enterprise-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* Operational transformation consulting. Added 2026-10-03; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit);
 * round 3 (SEO spec B 4.7): framework H2, "Operational vs digital" H2 + H3, BLS context folded into the cost section,
 * "Connecting operations data to Salesforce", OfferBand x2, ProofStrip, ten FAQs at 40-60 words.
 *
 * Louis, 2026-10-03: "Operational transformation consulting is what we do. This is actually my specialty. I am a
 * small business consultant and startup consultant."
 *
 * ⛔ No client results, percentages, time savings, case studies, logos or guarantees. No price or fee range anywhere:
 *    the third-party dollar ranges (hourly consulting range, COO salary range) are gone and BLS wages are not printed.
 * ⛔ No OT claims; no link to /services/operations-technology. The data-connection unit is method only, with one
 *    unnamed SAP-to-Salesforce sync as the only delivery pattern. LocalBusiness schema removed (spec 7).
 * ⛔ No "free one-week health check" here: that offer is Salesforce's only.
 * ⛔ The four steps are standard consulting framing, not a documented OneAlgorithm method (confirm with Louis).
 * ⛔ Facts: BLS only (management analysts), behind the one Sources pop-up (id "bls-ma"). */

const PATH = "/services/operational-transformation-consulting";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Operational transformation consulting | One Algorithm";
const DESCRIPTION = "Fix the process, then the systems: Salesforce, IT and MarTech built around how work runs. For small businesses and startups. Call (610) 890-9711.";
const READ = "read 31 October 2026";

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics: Occupational Employment and Wage Statistics", what: "Management analysts (13-1111), May 2025: 898,280 employed nationally; 15,460 in the Philadelphia-Camden-Wilmington area", read: READ, page: "https://www.bls.gov/oes/current/oes131111.htm" },
  { name: "U.S. Bureau of Labor Statistics: Occupational Outlook Handbook", what: "Management analysts: 1,077,100 jobs in 2025, projected +10% from 2025 to 2035, much faster than average (page modified 27 August 2026)", read: READ, page: "https://www.bls.gov/ooh/business-and-financial/management-analysts.htm" },
];

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const SIGNS = [
  "The work depends on one person, and nothing moves when they are away.",
  "The same information is typed into more than one place.",
  "Sales, operations and finance each have a different number for the same thing.",
  "Tools keep getting added and nobody owns how they fit together.",
  "More volume would mean more hiring, not more output.",
];

const CONNECT: EUnit[] = [
  {
    id: "h-connect", title: "Connecting operations data to Salesforce",
    lede: "When the same figures are typed into two systems, we map where each one starts, decide which system owns it and connect the two.",
    lead: "This is integration work, not control-system work.",
    leadIn: "Yes, but:",
    points: ["Order, inventory and shipment data in one place", "Reports sales and finance both trust", "No control-system programming"],
    label: "what we do and do not do",
    deep: <p className="sf-rule">The one delivery pattern we describe is an unnamed SAP-to-Salesforce sync. Manufacturers and distributors often re-key order and inventory figures between the ERP, spreadsheets and the CRM; that is the problem it addresses. See {L("/industries/manufacturing", "manufacturing")} and {L("/services/salesforce-integration", "Salesforce integration")}. We do not program control systems or safety systems.</p>,
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What is business transformation?", a: "Business transformation is a fundamental change in how a business operates, covering its processes, roles, decisions and the systems that carry them. Operational transformation is the part focused on how the work runs day to day. It changes the way of working, not only the tools." },
  { q: "What is process transformation?", a: "Process transformation redesigns the steps work follows through a business, then changes roles and systems to match. It starts by mapping how the work really moves, not how a diagram says it does. Tools come after the steps are clear, so they carry a better process instead of automating a confused one." },
  { q: "What are the benefits of operational transformation?", a: "Typical benefits are fewer re-keyed numbers, clearer ownership of decisions and the ability to take on more volume without matching headcount. We make no promise of a percentage. We agree two or three measures at the start so you can judge the result yourself.", link: { to: "#h-steps", label: "Our framework" } },
  { q: "What are the challenges of operational transformation?", a: "The hard parts are agreeing who owns which decisions, getting people to change habits, and not buying tools before the way of working is clear. Tool sprawl and data that disagrees across teams make it harder. That is why our four steps put design before build." },
  { q: "How long does an engagement take?", a: "It depends on how much has to change, so we do not quote weeks from a web page. We diagnose first. A plan with dates follows, and it says what changes, in what order and who owns each piece. You can stop after the diagnosis if the plan is enough." },
  { q: "Do we have to buy new software?", a: "Often not. The first step is finding out whether the tools you already pay for are used, and used the way they were set up. We start with what you already run, and we recommend new software only when the way of working needs something the current tools cannot do." },
  { q: "What does an operational transformation consultant do?", a: "An operational transformation consultant maps how the work moves, finds where it breaks, designs the fix with named owners and measures, then builds the systems side or hands the plan to your team. The aim is a business that no longer needs the consultant for this." },
  { q: "Is operational transformation only for large companies?", a: "No. This page is aimed at small businesses and startups, where the process often lives in the founder's head. The Bureau of Labor Statistics shows management analysis is a large and growing field, but you do not need a large company to benefit from a clear owner and one set of numbers.", link: { to: "#h-cost", label: "The field in numbers" } },
  { q: "How do you measure whether it worked?", a: "We agree two or three operational measures at the start, such as how often a figure is typed twice or how long work waits for one person. We review them at hand-over. We publish no client results, so the measures are the ones you choose for your own business." },
  { q: "Where do you work?", a: "Our office is in Malvern, PA, in Chester County. We work remotely with businesses across the United States and meet in person by arrangement. The person who scopes your work stays on it through delivery.", link: { to: "/services/it-consulting", label: "IT consulting services" } },
];

export default function OperationalTransformationConsulting() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Operational Transformation Consulting",
          "Operational transformation consulting for small businesses and startups: diagnosing how work actually moves, redesigning roles and decision rights, and setting up and connecting the systems that carry the new way of working, delivered by a small firm in Malvern, Pennsylvania.",
          "Operational transformation consulting",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

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
            "Salesforce, integration and marketing systems in house",
            "Malvern, Pennsylvania",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <SfPage crumbs={[{ label: "Operational transformation" }]}>
        <EVStyles />
        <BridgePlate
          id="what"
          fig={1}
          tone="surface"
          heading={{ id: "h-what", title: "What is operational transformation consulting?", lede: "Operational transformation consulting changes how a business actually operates: how work moves, who owns each decision and which systems hold the data." }}
          title="Process first, then systems"
          desc="Three boxes joined by arrows: how work moves between people, who owns each decision, and which system holds which data."
          stamp="Process first, then systems"
          caption="The tools come after the way of working is clear, not before."
          nodes={[
            { num: "01", title: "How work moves", sub: "who touches it, where it waits" },
            { num: "02", title: "Who decides", sub: "one owner per decision" },
            { num: "03", title: "Where data lives", sub: "typed once, read everywhere", hl: true },
          ]}
        >
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
          <GoDeeper label="business process transformation, defined">
            <p className="sf-rule">Business process transformation is the same idea seen from the process side: redesigning the steps work takes, then changing the roles and systems to match. Tools added before the way of working is clear can end up automating the confusion.</p>
            <p>We work with small businesses and startups, where the process often lives in the founder's head. Growth shows you how the business really runs, and that is when this work starts.</p>
          </GoDeeper>
        </BridgePlate>

        <OfferBand heading="Where does the work get stuck?" line="Describe it in a few lines. We tell you what we would look at first." label="Talk to a consultant" />

        <SmartSection id="proof" compact labelledBy="proof-l">
          <h2 className="sf-h3" id="proof-l">Who you would work with</h2>
          <div style={{ marginTop: 20 }}><ProofStrip variant="local" /></div>
        </SmartSection>

        <SmartSection id="signs" labelledBy="h-signs">
          <div className="sf-grid" style={{ rowGap: 0 }}>
            <div className="sf-c7">
              <h2 className="sf-h2" id="h-signs">Signs you need operational transformation</h2>
              <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">Most businesses that call us would not use the phrase; they describe one of five symptoms.</p>
            </div>
          </div>
          <div className="sf-ledger">
            {SIGNS.map((s, i) => (
              <div className="sf-lrow" key={s}>
                <h3 className="sf-h4">{s}</h3>
                <span className="sf-mono">Sign {i + 1} of 5</span>
              </div>
            ))}
          </div>
          <p className="sf-lead sf-measure" style={{ marginTop: 24 }}><span className="sf-lead-in">Why it matters:</span> If two of these sound familiar, the process, not the software, is the problem.</p>
        </SmartSection>

        <StepRail
          id="steps"
          tone="surface"
          heading={{ id: "h-steps", title: "Operational transformation framework: four steps", lede: "The order matters: tools added before the way of working is clear can automate the confusion." }}
          fig={2}
          stations={[
            { k: "s1", num: "01", title: "Diagnose", sub: "how work really moves" },
            { k: "s2", num: "02", title: "Design", sub: "owners and measures" },
            { k: "s3", num: "03", title: "Build and connect", sub: "the systems that carry it" },
            { k: "s4", num: "04", title: "Hand over", sub: "your people run it" },
          ]}
          steps={[
            { k: "s1", num: "01", title: "Diagnose", line: "We map how work actually moves: who touches it, where it waits and which numbers get typed twice." },
            { k: "s2", num: "02", title: "Design", line: "Agree who owns which decisions, which processes change and which measures will show it worked." },
            { k: "s3", num: "03", title: "Build and connect", line: "Set up and connect the systems that carry the new way of working, through our own Salesforce, integration and MarTech work." },
            { k: "s4", num: "04", title: "Hand over", line: "Your people run it; we check that it holds and train whoever needs it." },
          ]}
          title="Four-step rail: diagnose, design, build and connect, hand over"
          desc="A rail with four stations: diagnose, design, build and connect, hand over."
          stamp="Our four steps"
          caption="The aim is a business that no longer needs us for this."
        />

        <EnterpriseTable
          id="compare"
          tone="paper"
          title="Operational vs digital transformation"
          lede="The three overlap, but each has a different center of gravity."
          caption="Operational, management and digital transformation compared"
          head={["Approach", "Centers on", "Output"]}
          rows={[
            ["Operational transformation", "How the work runs and who owns decisions", "A new way of working, with the systems that carry it"],
            ["Management consulting", "Direction, strategy and advice", "Recommendations"],
            ["Digital transformation", "Technology and tooling", "New or replaced systems"],
          ]}
        />

        <SmartSection id="bpc" tone="paper" grid labelledBy="h-bpc">
          <SmartUnit
            className="sf-c8"
            level={3}
            headingId="h-bpc"
            title="Operations and business process consulting"
            lede="Operations consulting, business process consulting and operational excellence all ask the same question: where does the work wait, and who owns the fix?"
            lead="We answer it with a map of the work before any tool is chosen."
            measure
          />
        </SmartSection>

        <SmartSection id="systems" tone="night" heading={{ id: "h-systems", title: "Where the systems get built", lede: "Operational transformation changes how the business runs; these are the places in the firm where the systems side gets built." }}>
          <HoverCards
            cols={4}
            items={[
              { glyph: "link", kicker: "Sales and customer", title: "Salesforce", body: "Implementation and cleanup, so the customer record lives in one place.", to: "/services/salesforce", cta: "Salesforce consulting" },
              { glyph: "gear", kicker: "Systems that agree", title: "IT consulting", body: "Integration between the tools your business already runs on, in a sensible order.", to: "/services/it-consulting", cta: "IT consulting services" },
              { glyph: "bars", kicker: "Marketing operations", title: "MarTech", body: "Stack integration, so marketing data reaches the people who use it.", to: "/services/martech", cta: "MarTech consulting" },
              { glyph: "ticket", kicker: "Customer support", title: "Zendesk", body: "Implementation and Salesforce integration, so a ticket never sits unowned.", to: "/services/zendesk", cta: "Zendesk implementation" },
            ]}
          />
        </SmartSection>

        <SmartSection id="cost" tone="paper" heading={{ id: "h-cost", title: "What operational transformation costs", lede: "Cost follows the number of processes, teams and systems involved and how much has to be built." }}>
          <p className="sf-lead sf-measure"><span className="sf-lead-in">Why it matters:</span> Every business is different, so we publish no rate and scope the work in writing after a conversation.</p>
          <ul className="sf-points" style={{ marginTop: 16 }}>
            <li>Processes and teams in scope</li>
            <li>Systems to set up or connect</li>
            <li>How much your people can run themselves</li>
          </ul>
          <p className="sf-lede sf-measure" style={{ marginTop: 32 }} data-lede="">Advising on how businesses run is a large and growing occupation; these are the Bureau of Labor Statistics' figures, not claims about us.</p>
          <Readouts
            withEvidence={false}
            items={[
              { value: 15460, label: "management analysts in the Philadelphia area, May 2025", source: <>Bureau of Labor Statistics</> },
              { value: 898280, label: "management analysts across the United States, May 2025", source: <>Bureau of Labor Statistics</> },
              { value: 10, label: "percent projected US growth, 2025 to 2035, much faster than average", source: <>Bureau of Labor Statistics</> },
            ]}
          />
        </SmartSection>

        <OfferBand heading="Ready to look at how work runs?" line="A short call to see whether we fit." label="Talk to a consultant" />

        <EnterpriseRow id="connect" tone="surface" units={CONNECT} />

        <EnterpriseFaq title="Operational transformation questions" items={FAQS} />
        <EnterpriseSources id="bls-ma" text="Bureau of Labor Statistics, read October 31, 2026." />
        <SourcesDialog id="bls-ma" title="Where these figures come from" intro="Every figure on this page is from the U.S. Bureau of Labor Statistics, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
        <DeskCTA
          heading="Tell us where the work gets stuck"
          lede="Describe what depends on one person, or which numbers do not agree, and we will say what we would look at first."
          covers={["Where work waits or gets typed twice", "Who owns which decision", "Which systems have to agree", "What we would look at first"]}
          coversLabel="What the first conversation covers"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would look at first."]}
          hcLink={false}
          form={{ topic: "operational-transformation", topicLabel: "Operational transformation", need: "operational-transformation", heading: "Talk to an expert", prompt: "Where does the work get stuck?", submitLabel: "Talk to an expert" }}
        />
      </SfPage>
    </Layout>
  );
}
