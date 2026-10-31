import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseRow, EnterpriseFacts, EnterpriseTable, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createLocalBusinessSchema, createWebPageSchema } from "../../components/StructuredData";

/* Operational transformation consulting. Added 2026-10-03; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit).
 * The hero is unchanged.
 *
 * Louis, 2026-10-03: "Operational transformation consulting is what we do. This is actually my specialty. I am a
 * small business consultant and startup consultant."
 *
 * ⛔ No client results, percentages, time savings, case studies, logos or guarantees. No price or fee range: the
 *    third-party hourly and COO figures that used to sit in the cost FAQ are GONE (brief: no fee ranges anywhere).
 * ⛔ No OT claims. The old "plant-floor systems" card and the operations-technology FAQ are removed, and the page
 *    does not link to /services/operations-technology (its merge waits on Louis). The "plant data to ERP" unit is
 *    integration METHOD only: we do not program control systems and we claim no SCADA or OT delivery.
 * ⛔ The four steps are standard consulting framing, not a documented OneAlgorithm method (confirm with Louis).
 * ⛔ Facts: BLS only (management analysts), behind the sources pop-up (id "bls-ma"). */

const PATH = "/services/operational-transformation-consulting";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Operational transformation consulting for small business | One Algorithm";
const DESCRIPTION = "Fix the process, then the systems: Salesforce, IT and MarTech built around how work actually runs.";
const READ = "read 31 October 2026";

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics: Occupational Employment and Wage Statistics", what: "Management analysts (13-1111), May 2025: 898,280 employed nationally; 15,460 in the Philadelphia-Camden-Wilmington area", read: READ, page: "https://www.bls.gov/oes/current/oes131111.htm" },
  { name: "U.S. Bureau of Labor Statistics: Occupational Outlook Handbook", what: "Management analysts: 1,077,100 jobs in 2025, projected +10% from 2025 to 2035, much faster than average (page modified 27 August 2026)", read: READ, page: "https://www.bls.gov/ooh/business-and-financial/management-analysts.htm" },
];

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const WHAT: EUnit[] = [
  {
    id: "h-what", title: "What operational transformation is",
    lede: "Operational transformation changes how a business actually operates: how work moves, who owns each decision and which systems hold the data.",
    lead: "The tools come after the way of working is clear, not before.",
    points: ["How work moves between people", "Who owns each decision", "Which system holds which data"],
    label: "business process transformation, defined",
    deep: (<>
      <p className="sf-rule">Business process transformation is the same idea seen from the process side: redesigning the steps work takes, then changing the roles and systems to match. Tools added before the way of working is clear can end up automating the confusion.</p>
      <p>We work with small businesses and startups, where the process often lives in the founder's head. Growth shows you how the business really runs, and that is when this work starts.</p>
    </>),
  },
  {
    id: "h-signs", title: "Signs you need operational transformation",
    lede: "Most businesses that call us would not use the phrase; they describe one of five symptoms.",
    lead: "If two of these sound familiar, the process, not the software, is the problem.",
    points: ["Work depends on one person", "The same data is typed twice", "Sales, ops and finance disagree on numbers"],
    label: "all five signs",
    deep: (<ul className="sf-points" style={{ marginTop: 0 }}>
      <li>The work depends on one person, and nothing moves when they are away.</li>
      <li>The same information is typed into more than one place.</li>
      <li>Sales, operations and finance each have a different number for the same thing.</li>
      <li>Tools keep getting added and nobody owns how they fit together.</li>
      <li>More volume would mean more hiring, not more output.</li>
    </ul>),
  },
];

const STEPS: EUnit[] = [
  { id: "t1", title: "Diagnose", lede: "We map how work actually moves: who touches it, where it waits and which numbers get typed twice.", label: "step one", deep: <p className="sf-rule">Interviews with the people doing the work, plus what your systems report. The map you get is the one your team recognizes.</p> },
  { id: "t2", title: "Design", lede: "Agree who owns which decisions, which processes change and which measures will show it worked.", label: "step two", deep: <p className="sf-rule">Measures are chosen before the change, so you can tell later whether it held.</p> },
  { id: "t3", title: "Build and connect", lede: "Set up and connect the systems that carry the new way of working.", label: "step three", deep: <p className="sf-rule">We do this ourselves, through our Salesforce, integration and marketing technology work, so the design is not handed to strangers.</p> },
  { id: "t4", title: "Hand over", lede: "Your people run it; we check that it holds and train whoever needs it.", label: "step four", deep: <p className="sf-rule">The aim is a business that no longer needs us for this.</p> },
];

const DIFF: EUnit[] = [
  {
    id: "h-cost", title: "What operational transformation costs",
    lede: "Cost follows the number of processes, teams and systems involved and how much has to be built.",
    lead: "Every business is different, so we publish no rate and scope the work in writing after a conversation.",
    points: ["Processes and teams in scope", "Systems to set up or connect", "How much your people can run themselves"],
    label: "what moves the cost",
    deep: <p className="sf-rule">A diagnosis of one process is a small piece of work; redesigning how a whole company runs is not. We would rather scope what you actually need than quote a number from a web page.</p>,
  },
  {
    id: "h-plant", title: "Plant data to ERP and Salesforce",
    lede: "When production numbers are typed twice, we connect the ERP and Salesforce so each figure is captured once.",
    lead: "This is integration work, not control-system work.",
    leadIn: "Yes, but:",
    points: ["Order, inventory and shipment data in one place", "Reports sales and finance both trust", "No control-system programming"],
    label: "what we do and do not do",
    deep: (<>
      <p className="sf-rule">Manufacturers and distributors often re-key order and inventory figures between the ERP, spreadsheets and the CRM. We map where each number starts, decide which system owns it, and connect them. See {L("/industries/manufacturing", "manufacturing")} and {L("/services/salesforce-integration", "Salesforce integration")}.</p>
      <p>We do not program control systems or safety systems.</p>
    </>),
  },
];

const ARMS: EUnit[] = [
  { id: "a1", title: "Sales and customer systems", lede: "Salesforce implementation and cleanup, so the customer record lives in one place.", label: "Salesforce", deep: <p className="sf-rule">{L("/services/salesforce", "Salesforce consulting services")} sets up the CRM around the process you have agreed.</p> },
  { id: "a2", title: "Systems that must agree", lede: "IT consulting and integration between the tools your business already runs on.", label: "IT consulting", deep: <p className="sf-rule">{L("/services/it-consulting", "IT consulting")} plans the order of change and keeps the estate coherent.</p> },
  { id: "a3", title: "Marketing operations", lede: "MarTech consulting and stack integration, so marketing data reaches the people who use it.", label: "MarTech", deep: <p className="sf-rule">{L("/services/martech", "MarTech consulting")} connects marketing tools to the CRM and reports.</p> },
  { id: "a4", title: "Customer support", lede: "Zendesk setup and Salesforce integration, so a ticket never sits unowned.", label: "Zendesk", deep: <p className="sf-rule">{L("/services/zendesk", "Zendesk setup")} fits support into the same process design.</p> },
];

const FORWHO: EUnit[] = [
  {
    id: "h-for", title: "Who this is for",
    lede: "Small businesses and startups that have outgrown the way they started out.",
    lead: "The person who scopes your work stays on it through delivery; four of us run the firm.",
    points: ["Businesses that outgrew how they started", "Startups whose processes depend on the founder", "Teams adding tools faster than they can manage"],
    label: "working with a small firm",
    deep: <p className="sf-rule">You deal with the people who do the work. Their names and profiles are on our {L("/about", "about page")}, and we are based in Malvern, Pennsylvania, WBE and MBE certified.</p>,
  },
  {
    id: "h-notfor", title: "Who it is not for",
    lede: "This is not the right start for a one-off website, an ad campaign or a single tool setup.",
    lead: "Starting on the right page saves you a conversation.",
    points: ["A website or ad campaign: start on website development", "One tool and nothing else: start on Salesforce, Zendesk or IT consulting"],
    label: "better places to start",
    deep: <p className="sf-rule">Try {L("/services/website-development", "website development")}, {L("/services/google-ads", "Google Ads")}, {L("/services/salesforce", "Salesforce")}, {L("/services/zendesk", "Zendesk")} or {L("/services/it-consulting", "IT consulting")} depending on the job.</p>,
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What is business transformation?", a: "Business transformation is a fundamental change in how a business operates, covering its processes, roles, decisions and the systems that carry them. Operational transformation is the part focused on how the work runs day to day." },
  { q: "What is process transformation?", a: "Process transformation redesigns the steps that work takes through a business, then changes roles and systems to match. It starts by mapping how the work really moves, not how a diagram says it does." },
  { q: "What are the benefits of operational transformation?", a: "A business that no longer depends on one person, enters data once, and reads the same numbers in sales, operations and finance. We make no promise of a specific percentage; measures are agreed before the change so you can judge for yourself." },
  { q: "What are the challenges of operational transformation?", a: "The hard parts are agreeing who owns which decisions, getting people to change habits, and not buying tools before the way of working is clear. That is why our four steps put design before build." },
  { q: "What is an operational transformation framework?", a: "Ours has four stages in this order: diagnose how work moves, design owners and measures, build and connect the systems, and hand over to your people.", link: { to: "#h-steps", label: "Our four steps" } },
  { q: "How long does an engagement take?", a: "It depends on how much has to change. We give you an estimate after a first conversation, not a number from a web page." },
  { q: "How much does operational transformation consulting cost?", a: "Every business is different, so we do not publish a rate. We scope the work in writing after a conversation, and cost follows processes, teams and systems in scope.", link: { to: "#h-cost", label: "What moves the cost" } },
  { q: "How is it different from management or digital transformation consulting?", a: "Management consulting is mostly direction and advice. Digital transformation centers on technology. Operational transformation makes a new way of working real, and we build the systems side ourselves.", link: { to: "#compare", label: "The three compared" } },
  { q: "Do we have to buy new software?", a: "Not necessarily. Often the first step is finding out whether the tools you already pay for are being used. For Salesforce, that is how the free one-week health check starts.", link: { to: "/services/salesforce-health-check", label: "Salesforce health check" } },
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
          "Business Consulting",
          URL_,
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
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
            "Salesforce, ERP, integration and marketing systems in house",
            "Malvern, Pennsylvania. WBE and MBE certified",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        siblings={false}
      />

      <SfPage crumbs={[{ label: "Operational transformation" }]}>
        <EnterpriseRow id="what" tone="surface" units={WHAT} />
        <EnterpriseRow id="steps" tone="night" heading={{ id: "h-steps", title: "Our four steps, in this order", lede: "The order matters: tools added before the way of working is clear can automate the confusion." }} cols="sf-c3" units={STEPS} />
        <EnterpriseTable
          id="compare"
          tone="paper"
          title="Operational vs management vs digital transformation"
          lede="The three overlap, but each has a different center of gravity."
          caption="Operational, management and digital transformation compared"
          head={["Approach", "Centers on", "Output"]}
          rows={[
            ["Operational transformation", "How the work runs and who owns decisions", "A new way of working, with the systems that carry it"],
            ["Management consulting", "Direction, strategy and advice", "Recommendations"],
            ["Digital transformation", "Technology and tooling", "New or replaced systems"],
          ]}
        />
        <EnterpriseRow id="cost" tone="surface" units={DIFF} />
        <EnterpriseRow id="systems" heading={{ id: "h-systems", title: "Where the systems get built", lede: "Operational transformation changes how the business runs; these are the places in the firm where the systems side gets built." }} cols="sf-c3" units={ARMS} />
        <EnterpriseFacts
          id="ma-facts"
          tone="night"
          title="Management analysts in numbers"
          lede="Advising on how businesses run is a large and growing occupation; the figures are the Bureau of Labor Statistics', not claims about us."
          items={[
            { n: "15,460", t: "management analysts in the Philadelphia area, May 2025" },
            { n: "898,280", t: "management analysts across the United States, May 2025" },
            { n: "+10%", t: "projected US growth, 2025 to 2035, much faster than average" },
          ]}
          sourceLine="Bureau of Labor Statistics, read 31 October 2026"
          verifyId="bls-ma"
        />
        <EnterpriseRow id="who" units={FORWHO} />
        <DeskCTA
          heading="Tell us where the work gets stuck"
          lede="Describe what depends on one person, or which numbers do not agree, and we will say what we would look at first."
          covers={["Where work waits or gets typed twice", "Who owns which decision", "Which systems have to agree", "What we would look at first"]}
          coversLabel="What the first conversation covers"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would look at first."]}
          hcLink={false}
          form={{ topic: "operational-transformation", topicLabel: "Operational transformation", need: "operational-transformation", heading: "Talk to an expert", prompt: "Where does the work get stuck?", submitLabel: "Talk to an expert" }}
        />
        <EnterpriseFaq title="Operational transformation questions" items={FAQS} />
        <SourcesDialog id="bls-ma" title="Where these figures come from" intro="Every figure on this page is from the U.S. Bureau of Labor Statistics, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
      </SfPage>
    </Layout>
  );
}
