import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, SourcesDialog, DeskCTA, type SfFaqItem, type SfSource } from "../../components/sf";
import { EnterpriseRow, EnterpriseFacts, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* IT Consulting. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit). The hero is
 * unchanged.
 *
 * ⛔ Claims: no case studies, client names or outcome figures (none exist to publish). Experience is the prior
 *    employment of key personnel, never company past performance. "Zendesk partner" (agreement), never "certified".
 *    24/7 support and hypercare are real (Louis 2026-08-10). "Four of us" is allowed. No prices or ranges.
 * ⛔ Facts: BLS only, each behind the sources pop-up (id "bls"). Links to construction, manufacturing and
 *    e-commerce are load-bearing for SEO; keep them. */

const PATH = "/services/it-consulting";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "IT consulting services | Philadelphia and Malvern, PA";
const DESCRIPTION = "Security review, cloud sizing and tool selection for small organizations. Honest about what we can and cannot show.";
const READ = "read 31 October 2026";

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics: Occupational Employment and Wage Statistics", what: "Computer systems analysts (15-1211), May 2025: 519,530 employed nationally; 8,520 in the Philadelphia-Camden-Wilmington area", read: READ, page: "https://www.bls.gov/oes/current/oes151211.htm" },
  { name: "U.S. Bureau of Labor Statistics: Occupational Outlook Handbook", what: "Computer systems analysts: 544,400 jobs in 2025, projected +8% from 2025 to 2035 (page modified 27 August 2026)", read: READ, page: "https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm" },
];

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const COVERS: EUnit[] = [
  {
    id: "h-covers", title: "What IT consulting covers",
    lede: "Six jobs: technology planning, security review, modernization, cloud migration, performance and cost review, and tool selection.",
    lead: "Each one ends in a document or a change you can point at, not a conversation.",
    points: ["Technology planning with a budget on every step", "Ranked gaps from a security review", "A scored evaluation when you choose a tool"],
    label: "all six services",
    deep: (<>
      <p className="sf-rule">Technology planning writes down what you run, what each piece costs and what breaks, then orders the replacing or keeping of each one over two or three years. Modernization roadmaps are mostly sequencing: what moves first, what runs in parallel, and which data has to reconcile before you can switch.</p>
      <p>Performance and cost review finds where time and money go when a system is slow or a cloud bill keeps climbing: queries, indexes, oversized instances and licenses nobody uses.</p>
    </>),
  },
  {
    id: "h-does", title: "What an IT consultant does",
    lede: "An IT consultant reads what your systems actually report, ranks the risks and tells you what to fix first and what to leave alone.",
    lead: "Most of what we recommend reuses something you already own.",
    leadIn: "What we do:",
    points: ["Inventory servers, licenses and the spreadsheet holding a process together", "Name single points of failure in week one", "Say so when the fix is a setting"],
    label: "a day in the work",
    deep: (<>
      <p className="sf-rule">We sit with the people doing the work and read the system reports, not the process diagram. Often the fix is a configuration change or a license you already pay for, and we would rather say that than sell you a project.</p>
      <p>An IT consulting firm differs from a staffing firm: we deliver a recommendation or a build, where staff augmentation places a person under your lead. If you need hands in your team, see {L("/services/staff-augmentation", "IT staff augmentation")}.</p>
    </>),
  },
];

const PILLARS: EUnit[] = [
  {
    id: "h-security", title: "Security review", lede: "Accounts and access, backup and restore, patching and what your vendors can reach, ranked into a list of gaps.",
    lead: "A ranked list gets acted on; a scored report usually does not.", points: ["Who can reach what, including vendors", "Whether a restore has ever been tested", "Patching gaps ordered by exposure"],
    label: "what the review checks",
    deep: <p className="sf-rule">We check accounts and access first because most incidents start there, then backup and restore, patching, and third-party reach. You receive a short list ordered by what to fix first, with an owner on each item.</p>,
  },
  {
    id: "h-cloud", title: "Cloud sizing", lede: "Which workloads move to AWS or Azure, which stay put, and what the monthly bill looks like afterwards.",
    lead: "Sizing before anyone commits is cheaper than correcting a bill afterwards.", points: ["Workload by workload: move, stay or retire", "Instance sizes matched to real use", "A monthly run-cost estimate before you sign"],
    label: "how sizing works",
    deep: <p className="sf-rule">We measure what each system uses today, not what it was provisioned for, then size the target and show the monthly bill. Some workloads are cheaper left where they are, and we say which.</p>,
  },
  {
    id: "h-tools", title: "Tool selection", lede: "Requirements, a shortlist and demos scored against your actual workflows, so the decision still stands in a year.",
    lead: "Demos scored on your workflows beat demos scored on the vendor's.", points: ["Requirements written before any demo", "Scoring sheet your team fills in", "A recommendation you can defend"],
    label: "how an evaluation runs",
    deep: <p className="sf-rule">We write requirements with the people who use the tool, shortlist against them, and run each demo against your own workflows. The result is a recommendation with the scores behind it.</p>,
  },
];

const COST_MSP: EUnit[] = [
  {
    id: "h-cost", title: "What IT consulting costs",
    lede: "Cost follows scope: how many systems, how much has to be inspected, and whether we advise or also build.",
    lead: "Every engagement is scoped in writing before work starts, and we publish no rate card.",
    points: ["Number of systems and sites in scope", "Advice only, or advice plus delivery", "How much documentation already exists"],
    label: "what moves the cost",
    deep: (<>
      <p className="sf-rule">A two-week assessment of one system and a two-year modernization are different jobs, so a number on a web page would mislead you. Tell us what is broken and what you run, and we will say what we would check first and how we would scope it.</p>
      <p>Every recommendation we write carries an order, an owner and a rough cost, so you can budget it.</p>
    </>),
  },
  {
    id: "h-msp", title: "IT consultant or managed service provider?",
    lede: "A consultant decides what to change and why; a managed service provider runs the day-to-day help desk and monitoring.",
    lead: "Many small organizations need the decision first and the operator second.",
    leadIn: "Yes, but:",
    points: ["Consultant: assessment, plan, build", "Managed provider: tickets, monitoring, patching", "We advise whichever you choose"],
    label: "how to choose",
    deep: <p className="sf-rule">If your problem is a decision, such as which platform, which order or which vendor, start with a consultant. If the problem is that nobody answers the phone when a laptop breaks, you need an operator. We will tell you which one you are looking at, even when it is not us.</p>,
  },
];

const LOCAL: EUnit[] = [
  {
    id: "h-local", title: "IT consulting in Philadelphia and Chester County",
    lede: "We work from Malvern, PA, mostly remote, with in-person sessions when the project calls for them.",
    lead: "The Philadelphia area employs thousands of systems analysts, so buyers have choices; we compete on a small team that stays on the work.",
    points: ["Office in Malvern, Chester County", "Remote by default, on site when needed", "The person who scopes it does it"],
    label: "working with us locally",
    deep: <p className="sf-rule">Malvern sits in Chester County, a short drive from Center City Philadelphia, King of Prussia and Wilmington. We have no separate Philadelphia office. Organizations further away work with us over video and shared screens, and we travel for workshops, cutovers and anything better done in the room.</p>,
  },
  {
    id: "h-support", title: "Support after go-live, 24/7",
    lede: "We stay after the build: hypercare first, then ongoing support, 24/7 across the time zones you operate in.",
    lead: "Most consulting stops at the document; ours keeps going until the change is working.",
    leadIn: "What we do:",
    points: ["Hypercare in the first weeks after cutover", "Ongoing support across your time zones", "The same four people, no handoff"],
    label: "what support covers",
    deep: <p className="sf-rule">Hypercare means close attention right after go-live, while real users find the cases nobody tested. It then settles into ongoing support. 24/7 coverage is part of that support, so a problem outside business hours reaches someone who knows your systems.</p>,
  },
];

const RUN: EUnit[] = [
  { id: "s1", title: "Assessment", lede: "We sit with the people doing the work and read what the systems report.", label: "assessment", deep: <p className="sf-rule">Interviews, an inventory, and the reports your systems already produce. What the process diagram says happens is secondary to what the logs show.</p> },
  { id: "s2", title: "Plan", lede: "A written sequence: what changes, in what order, who owns each piece, what it costs.", label: "plan", deep: <p className="sf-rule">You can hand the plan to another firm if you would rather. That is the test of whether it is specific enough.</p> },
  { id: "s3", title: "Delivery", lede: "We build it, or advise the team you already have while they build it.", label: "delivery", deep: <p className="sf-rule">Short cycles, so you can change your mind while that is still cheap.</p> },
  { id: "s4", title: "Support", lede: "Hypercare first, then ongoing support, 24/7 across your time zones.", label: "support", deep: <p className="sf-rule">The fourth step is the one most consulting skips. We stay for it.</p> },
];

const SHOW: EUnit[] = [
  {
    id: "h-show", title: "What we can and cannot show",
    lede: "We have not published client names, testimonials or outcome figures, and we will not invent any.",
    lead: "What we offer instead is four named people you can question about work you care about.",
    leadIn: "The bottom line:",
    points: ["No case studies on this site", "Experience listed as prior employment", "Partner status you can look up"],
    label: "experience and partner status",
    deep: (<>
      <p className="sf-rule">Between us the team has worked in healthcare, finance, {L("/industries/manufacturing", "manufacturing")}, {L("/industries/construction", "construction")} and {L("/industries/ecommerce", "e-commerce")}. That experience was earned inside those organizations, as employees, before this firm existed, and we say so rather than letting it read as company past performance.</p>
      <p>We are a listed Salesforce Consulting Partner and a Zendesk partner. Both are somebody else's record, not ours; {L("/about", "the links to check them")} are on our about page. Which framework you get, ITIL, COBIT or agile, depends on who has to sign the work off. Regulated clients usually want the governance; a five-person product team almost never does.</p>
    </>),
  },
  {
    id: "h-related", title: "Related services",
    lede: "IT consulting often leads into one of four neighboring services, each with its own page.",
    lead: "Start where the problem is, then follow the thread.",
    points: ["Customer support platform: Zendesk partner", "People for your team: staff augmentation", "Process before systems: operational transformation"],
    label: "where to go next",
    deep: (<p className="sf-rule">{L("/services/zendesk", "Zendesk setup and Salesforce integration")} for support teams. {L("/services/staff-augmentation", "IT staff augmentation")} when you need a person, not a plan. {L("/services/operational-transformation-consulting", "Operational transformation consulting")} when the process is the problem. {L("/services/martech", "MarTech consulting")} for the marketing stack. Or see {L("/services", "all services")}.</p>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What does an IT consultant do?", a: "An IT consultant inventories the systems you run, finds the risks and waste, and tells you what to fix first. At OneAlgorithm that means a written plan with an order, an owner and a rough cost for each step, and we can build it or advise your team while they do." },
  { q: "What is IT consulting?", a: "IT consulting is outside advice, and sometimes delivery, on how a business plans, secures, buys and runs its technology. It covers technology planning, security review, cloud migration, performance and cost review, and choosing tools." },
  { q: "How much does IT consulting cost?", a: "It depends on scope: how many systems, how much must be inspected, and whether we advise or also build. We scope the work in writing before it starts and do not publish a rate card.", link: { to: "#h-cost", label: "What moves the cost" } },
  { q: "What is the difference between an IT consultant and a managed service provider?", a: "A consultant decides what should change and why. A managed service provider runs day-to-day help desk, monitoring and patching. Many organizations need the decision first and the operator second." },
  { q: "How is IT consulting different from IT staff augmentation?", a: "Consulting delivers a recommendation or a build that we are accountable for. Staff augmentation places a person inside your team, under your lead, for a sprint or a year.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
  { q: "Do you offer 24/7 support?", a: "Yes. After go-live we provide hypercare first, then ongoing support, 24/7 across the time zones you operate in." },
  { q: "Do you work with small businesses?", a: "Yes. We are a small firm of four people, and small and mid-sized organizations are who the work is built for. The person who scopes it stays on it through delivery." },
  { q: "Where do you work?", a: "We are based in Malvern, Pennsylvania, in Chester County, and serve Philadelphia and the surrounding area. Most work is remote, with in-person sessions when the project calls for them." },
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
          "IT Consulting",
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
        <EnterpriseRow id="covers" tone="surface" units={COVERS} />
        <EnterpriseRow id="pillars" tone="night" heading={{ id: "h-pillars", title: "Security review, cloud sizing, tool selection", lede: "The three requests we hear most, each with a defined output." }} cols="sf-c4" units={PILLARS} />
        <EnterpriseRow id="cost" units={COST_MSP} />
        <EnterpriseFacts
          id="local-facts"
          tone="surface"
          title="The Philadelphia market in numbers"
          lede="Systems analysts are a large, growing occupation, which is why we compete on a small team that stays on the work."
          items={[
            { n: "8,520", t: "computer systems analysts in the Philadelphia area, May 2025" },
            { n: "519,530", t: "computer systems analysts across the United States, May 2025" },
            { n: "+8%", t: "projected US growth for the occupation, 2025 to 2035" },
          ]}
          sourceLine="Bureau of Labor Statistics, read 31 October 2026"
          verifyId="bls"
        />
        <EnterpriseRow id="local" units={LOCAL} />
        <EnterpriseRow id="run" tone="surface" heading={{ id: "h-run", title: "How an engagement runs", lede: "The same four steps whether the job is two weeks or two years." }} cols="sf-c3" units={RUN} />
        <EnterpriseRow id="show" units={SHOW} />
        <DeskCTA
          heading="Tell us what is actually broken"
          lede="The system everyone complains about, the roadmap nobody believes, or a renewal you are not sure to sign."
          covers={["The systems you run and who owns them", "Where the risk and the waste are", "What we would check first", "Whether you need us at all"]}
          coversLabel="What the first conversation covers"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would do first."]}
          hcLink={false}
          form={{ topic: "it-consulting", topicLabel: "IT consulting", need: "it-consulting", heading: "Talk to an expert", prompt: "What is broken, and what do you run?", submitLabel: "Talk to an expert" }}
        />
        <EnterpriseFaq title="IT consulting questions" items={FAQS} />
        <SourcesDialog id="bls" title="Where these figures come from" intro="Every figure on this page is from the U.S. Bureau of Labor Statistics, read by a person at OneAlgorithm on 31 October 2026." sources={SOURCES} />
      </SfPage>
    </Layout>
  );
}
