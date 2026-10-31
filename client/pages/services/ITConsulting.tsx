import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SmartSection, GoDeeper, Readouts, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseRow, EnterpriseTable, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, StepRail, Statement, EnterpriseSources } from "../../components/v2/enterprise-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* IT Consulting. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit), revised
 * (round 2) to seven sections: hand-off plate, hover cards, step rail, text row, table, readouts, proof, then FAQ,
 * one Sources line and the CTA last. The hero is unchanged.
 *
 * ⛔ Claims: no case studies, client names or outcome figures (none exist to publish). Experience is the prior
 *    employment of key personnel, never company past performance. "Zendesk partner" (agreement), never "certified".
 *    24/7 support and hypercare are real (Louis 2026-08-10). "Four of us" is allowed. No prices or ranges.
 * ⛔ Facts: BLS only, behind the one Sources pop-up (id "bls"). Links to construction, manufacturing and
 *    e-commerce are load-bearing for SEO; keep them. */

const PATH = "/services/it-consulting";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "IT consulting services | Philadelphia and Malvern, PA";
const DESCRIPTION = "IT consulting services for small organizations: security review, cloud sizing, tool selection and 24/7 support. Call (610) 890-9711.";
const READ = "read 31 October 2026";

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics: Occupational Employment and Wage Statistics", what: "Computer systems analysts (15-1211), May 2025: 519,530 employed nationally; 8,520 in the Philadelphia-Camden-Wilmington area", read: READ, page: "https://www.bls.gov/oes/current/oes151211.htm" },
  { name: "U.S. Bureau of Labor Statistics: Occupational Outlook Handbook", what: "Computer systems analysts: 544,400 jobs in 2025, projected +8% from 2025 to 2035 (page modified 27 August 2026)", read: READ, page: "https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm" },
];

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const DOES: EUnit[] = [
  {
    id: "h-does", title: "What an IT consultant does",
    lede: "An IT consultant reads what your systems actually report, ranks the risks and tells you what to fix first and what to leave alone.",
    lead: "Most of what we recommend reuses something you already own.",
    leadIn: "What we do:",
    points: ["Inventory servers, licenses and the spreadsheet holding a process together", "Name single points of failure in week one", "Say so when the fix is a setting"],
  },
];

const COST_CHOOSE: EUnit[] = [
  {
    id: "h-cost", title: "What IT consulting costs",
    lede: "Cost follows scope: how many systems, how much has to be inspected, and whether we advise or also build.",
    lead: "Every engagement is scoped in writing before work starts, and we publish no rate card.",
    points: ["Number of systems and sites in scope", "Advice only, or advice plus delivery", "How much documentation already exists"],
  },
  {
    id: "h-choose", title: "How to choose an IT consulting firm",
    lede: "Choose the firm that puts scope in writing, names who does the work and hands you the keys to your own accounts.",
    lead: "Ask each firm the same four questions and compare the answers.",
    leadIn: "Yes, but:",
    points: ["Is the scope in writing?", "Who does the work, by name?", "Who owns the accounts and the documentation?"],
    label: "the fourth question, and what to expect from us",
    deep: <p className="sf-rule">The fourth question is what happens at 2 a.m. when something breaks. Ask who answers, how fast they say they will, and whether that is written down. We answer with 24/7 support and hypercare after go-live. We name no competitor here; the same questions work on any firm, including us.</p>,
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What is IT consulting?", a: "IT consulting is outside advice, and sometimes hands-on delivery, on how an organization plans, secures, buys and runs its technology. It covers security review, cloud sizing, tool selection and roadmaps. The goal is a written plan with an owner and an order, so you know what to fix first.", link: { to: "/services", label: "Services" } },
  { q: "How is IT consulting different from IT staff augmentation?", a: "Consulting delivers a plan or a build that we are accountable for. IT staff augmentation places a person inside your team, under your lead, for a sprint or a year. Choose consulting when the problem is a decision, and staff augmentation when you know the work and need more hands.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
  { q: "Do you offer 24/7 support?", a: "Yes. After go-live we provide hypercare first, while real users find the cases nobody tested, then ongoing 24/7 support for what we delivered. We support the systems we built or advised on; we are not a managed service provider running your help desk every day." },
  { q: "Do you work with small businesses?", a: "Yes. We are four people, and small organizations are who the engagements are sized for. The person who scopes the work stays on it through delivery, so you are not handed to a different team after the first conversation. Tell us the problem and we will say whether we fit.", link: { to: "/contact?need=enterprise", label: "Talk to a consultant" } },
  { q: "Where do you work?", a: "Our office is in Malvern, PA, in Chester County. We meet clients in Philadelphia and Chester County in person by arrangement, and we work remotely with organizations across the United States, using video and shared screens for most sessions." },
  { q: "When should a small company hire an IT consultant?", a: "Hire one when nobody owns security, the cloud bill is unclear, or several tools overlap and nobody can say which one wins. Those are decisions, not tickets. A consultant inventories what you run, ranks the risks, and tells you what to fix first and what to leave alone." },
  { q: "Is technology consulting the same as IT consulting?", a: "Technology consulting is the broader term and also covers software, marketing systems and business process. IT consulting is the narrower part about infrastructure, security, cloud and tools. This page covers the IT side; the services page lists the rest of what we do.", link: { to: "/services", label: "All services" } },
  { q: "Can you manage our systems day to day?", a: "No. We are not a managed service provider, and we say so plainly. We decide what should change, build it or advise your team while they do, and support what we deliver around the clock. If you need a vendor to patch servers and answer tickets, we can help you choose one." },
  { q: "What do you need from us to start?", a: "Three things: a list of the accounts and access we may need, the tools you run today, and the problem in one paragraph. You do not need a finished brief. We read what the systems report, interview the people doing the work, and come back with a written plan." },
  { q: "Do you work with Salesforce and Zendesk?", a: "Yes. We are a Select Salesforce Consulting Partner, and we signed a Zendesk partner agreement in 2026. Both are other companies' records, not ours to certify. See our Salesforce consulting pages and our Zendesk implementation page for how we work with each.", link: { to: "/services/zendesk", label: "Zendesk implementation" } },
];

export default function ITConsulting() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "IT consulting, IT consulting services, IT consulting Philadelphia, technology planning, security review, cloud migration, tool selection",
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
          "IT Consulting Services",
          "IT consulting covering technology planning, security review, modernization roadmaps, cloud migration sizing, performance and cost review, and tool and vendor selection, from a small firm in Malvern, Pennsylvania serving Philadelphia and Chester County.",
          "IT consulting",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      <PageHero
        eyebrow="IT Consulting"
        title={
          <>
            IT <span className="text-oa-orange">consulting</span> for the
            systems you already run
          </>
        }
        lede="We inventory what you actually run — servers, licences, the spreadsheet holding a process together — then tell you what to fix first, what to leave alone, and roughly what each will cost. Most of what we recommend reuses something you already own."
        panel={{
          title: "What we're usually asked for",
          items: [
            "Technology planning",
            "Security review",
            "Cloud migration planning",
            "Performance and cost review",
            "Tool and vendor selection",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <SfPage crumbs={[{ label: "IT consulting" }]}>
        <EVStyles />
        <BridgePlate
          id="covers"
          fig={1}
          heading={{ id: "h-covers", title: "What IT consulting services cover", lede: "IT consulting services give a company without an IT department advice on security, cloud and tools, plus the build when you want it." }}
          title="From what you run to what to fix first"
          desc="Four boxes joined by arrows: inventory what you run, rank the risks, plan the order with an owner and a rough cost, then fix it or advise your team."
          stamp="How an assessment runs"
          caption="Each step ends in a document or a change you can point at, not a conversation."
          nodes={[
            { num: "01", title: "Inventory", sub: "servers, licenses, spreadsheets" },
            { num: "02", title: "Rank the risks", sub: "gaps ordered by exposure" },
            { num: "03", title: "Plan the order", sub: "an owner and cost on each" },
            { num: "04", title: "Fix or advise", sub: "we build, or coach your team", hl: true },
          ]}
        >
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
          <GoDeeper label="the six services in plain terms">
            <p className="sf-rule">Technology planning writes down what you run, what each piece costs and what breaks, then orders the replacing or keeping of each one over two or three years. Modernization roadmaps are mostly sequencing: what moves first, what runs in parallel, and which data has to reconcile before you can switch.</p>
            <p>Performance and cost review finds where time and money go when a system is slow or a cloud bill keeps climbing: queries, indexes, oversized instances and licenses nobody uses.</p>
          </GoDeeper>
        </BridgePlate>

        <SmartSection id="pillars" tone="night" labelledBy="h-covers">
          <HoverCards
            items={[
              { glyph: "shield", kicker: "Output: a ranked list", title: "Security review", body: "Accounts and access, backup and restore, patching and what your vendors can reach, ranked into a list of gaps." },
              { glyph: "cloud", kicker: "Output: a run-cost estimate", title: "Cloud sizing", body: "Which workloads move to AWS or Azure, which stay put, and what the monthly bill looks like afterwards." },
              { glyph: "list", kicker: "Output: a scored recommendation", title: "Tool selection", body: "Requirements, a shortlist and demos scored against your actual workflows, so the decision still stands in a year." },
            ]}
          />
        </SmartSection>

        <SmartSection id="proof" compact labelledBy="proof-l">
          <h2 className="sf-h3" id="proof-l">Who you would work with</h2>
          <div style={{ marginTop: 20 }}><ProofStrip variant="local" /></div>
        </SmartSection>

        <OfferBand heading="Not sure what is broken?" line="Describe it in a few lines. We tell you what we would check first." label="Talk to a consultant" />

        <EnterpriseRow id="does" units={DOES} />

        <StepRail
          id="run"
          tone="surface"
          heading={{ id: "h-run", title: "How an IT consulting engagement runs", lede: "The same four steps whether the job is two weeks or two years." }}
          fig={2}
          stations={[
            { k: "s1", num: "01", title: "Assessment", sub: "interviews · inventory · logs" },
            { k: "s2", num: "02", title: "Plan", sub: "order · owner · cost" },
            { k: "s3", num: "03", title: "Delivery", sub: "short cycles" },
            { k: "s4", num: "04", title: "Support", sub: "hypercare · 24/7" },
          ]}
          steps={[
            { k: "s1", num: "01", title: "Assessment", line: "We sit with the people doing the work and read what the systems report." },
            { k: "s2", num: "02", title: "Plan", line: "A written sequence: what changes, in what order, who owns each piece, what it costs." },
            { k: "s3", num: "03", title: "Delivery", line: "We build it, or advise the team you already have while they build it." },
            { k: "s4", num: "04", title: "Support", line: "Hypercare first, then ongoing support, 24/7." },
          ]}
          title="Four-step rail: assessment, plan, delivery, support"
          desc="A rail with four stations: assessment, plan, delivery and support."
          stamp="How an engagement runs"
          caption="The fourth step is the one most consulting skips. We stay for it."
        />

        <EnterpriseTable
          id="msp"
          tone="paper"
          title="IT consultant or managed service provider?"
          lede="A consultant decides what to change and why; a managed provider runs the day-to-day."
          caption="IT consultant compared with a managed service provider"
          head={["Compared", "IT consultant", "Managed service provider"]}
          rows={[
            ["What it does", "Assessment, plan, build", "Tickets, monitoring, patching"],
            ["Start here when", "The problem is a decision: which platform, order or vendor", "Nobody answers when a laptop breaks"],
            ["Our role", "This is what we do", "We advise whichever you choose"],
          ]}
        />

        <EnterpriseRow id="cost" tone="surface" units={COST_CHOOSE} />

        <OfferBand heading="Ready for a plain answer?" line="Send the problem in one paragraph. A person at OneAlgorithm replies." label="Talk to a consultant" />

        <SmartSection id="local" tone="paper" heading={{ id: "h-local", title: "IT consulting in Philadelphia and Chester County", lede: "We work from Malvern, PA, mostly remote, with in-person sessions when the project calls for them." }}>
          <Readouts
            withEvidence={false}
            items={[
              { value: 8520, label: "computer systems analysts in the Philadelphia area, May 2025", source: <>Bureau of Labor Statistics</> },
              { value: 519530, label: "computer systems analysts across the United States, May 2025", source: <>Bureau of Labor Statistics</> },
              { value: 8, label: "percent projected US growth for the occupation, 2025 to 2035", source: <>Bureau of Labor Statistics</> },
            ]}
          />
          <p className="sf-lead sf-measure" style={{ marginTop: 28 }}><span className="sf-lead-in">Why it matters:</span> Buyers here have choices, so we compete on a small team that stays on the work.</p>
          <GoDeeper label="working with us locally, and support after go-live">
            <p className="sf-rule">Malvern sits in Chester County, a short drive from Center City Philadelphia, King of Prussia and Wilmington. We have no separate Philadelphia office. Organizations further away work with us over video and shared screens, and we travel for workshops, cutovers and anything better done in the room.</p>
            <p>After go-live we stay: hypercare first, while real users find the cases nobody tested, then ongoing support, 24/7.</p>
          </GoDeeper>
        </SmartSection>

        <SmartSection id="show" tone="surface" grid heading={{ id: "h-show", title: "What we can and cannot show", lede: "We have not published client names, testimonials or outcome figures, and we will not invent any." }}>
          <Statement>Four named people you can question about work you care about.</Statement>
          <ul className="sf-points sf-c5">
            <li>No case studies on this site</li>
            <li>Experience listed as prior employment</li>
            <li>Partner status you can look up</li>
          </ul>
          <div className="sf-c12">
            <GoDeeper label="experience, partner status and related services">
              <p className="sf-rule">Between us the team has worked in healthcare, finance, {L("/industries/manufacturing", "manufacturing")}, {L("/industries/construction", "construction")} and {L("/industries/ecommerce", "e-commerce")}. That experience was earned inside those organizations, as employees, before this firm existed, and we say so rather than letting it read as company past performance.</p>
              <p>We are a Select Salesforce Consulting Partner and a Zendesk partner. Both are somebody else's record, not ours; {L("/about", "the links to check them")} are on our about page.</p>
              <p className="sf-links">{L("/services/zendesk", "Zendesk implementation")} {L("/services/staff-augmentation", "IT staff augmentation")} {L("/services/operational-transformation-consulting", "operational transformation consulting")} {L("/services/martech", "MarTech consulting")} {L("/services/salesforce", "Salesforce consulting")} {L("/services", "Services")}</p>
            </GoDeeper>
          </div>
        </SmartSection>

        <EnterpriseFaq title="IT consulting questions" items={FAQS} />
        <EnterpriseSources id="bls" text="Bureau of Labor Statistics, read October 31, 2026." />
        <SourcesDialog id="bls" title="Where these figures come from" intro="Every figure on this page is from the U.S. Bureau of Labor Statistics, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
        <DeskCTA
          heading="Tell us what is actually broken"
          lede="The system everyone complains about, the roadmap nobody believes, or a renewal you are not sure to sign."
          covers={["The systems you run and who owns them", "Where the risk and the waste are", "What we would check first", "Whether you need us at all"]}
          coversLabel="What the first conversation covers"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would do first."]}
          hcLink={false}
          form={{ topic: "it-consulting", topicLabel: "IT consulting", need: "it-consulting", heading: "Talk to an expert", prompt: "What is broken, and what do you run?", submitLabel: "Talk to an expert" }}
        />
      </SfPage>
    </Layout>
  );
}
