import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, PatternTable, CBP, type IndUnit } from "../../components/v2/industries-Body";

/* Construction. Hero kept; body rebuilt on the sf kit 2026-10-31, round 3 (seo-spec-b 4.9).
 * HONESTY: integration and systems page. No construction client exists in our notes (Starzi Bros is a prospect), so
 * no delivery proof is claimed for the sector. Hero text changes (fact-check): panel items and the lede reworded as
 * approach, not delivery. */

const PAGE_PATH = "/industries/construction";
const TITLE = "Construction software integration | OneAlgorithm";
const DESCRIPTION = "How we connect estimating, field and accounting systems for construction firms, plus Salesforce for bids. Malvern, PA. Call (610) 890-9711.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "What construction software integration involves",
    lede: "Construction software integration makes the field app, the estimating tool and the accounting package agree on one job.",
    lead: "A job number and a cost code that mean different things in three systems cost someone days every month.",
    points: ["Integrations between the systems you own", "Implementation: configuration, data, training", "Job reporting that spans systems"],
    deepLabel: "what an implementation covers",
    deep: (<>
      <p className="sf-rule">Construction software implementation usually means configuration, data migration, integration, training and support. We scope it after a short review of the systems, and we start with the two that disagree.</p>
      <p>Reporting that reads from more than one system is a data problem before it is a dashboard problem, so the data is fixed first. When the work is real but hiring for it is not, a developer can join your team through <Link className={L} to="/services/staff-augmentation">IT staff augmentation</Link>.</p>
    </>),
  },
  {
    id: "systems", title: "Connecting estimating, field and accounting",
    lede: "The fix is deciding which system owns each record, then making the others read from it.",
    lead: "Tools bought at different times by different people rarely agree on a job, a vendor or a cost code.",
    points: ["One agreed source of truth per record", "Syncs that report their own failures", "Costs that agree with the ledger"],
    deepLabel: "how we would connect the three systems",
    deep: (<>
      <p className="sf-rule">We start by listing every place a job lives and who edits it. The sync direction for each field is agreed in writing before anything is built.</p>
      <p><span className="sf-lead-in">What you get:</span> A map of the records, the rules for which system wins, and an integration that tells a person when a sync fails instead of failing silently.</p>
      <p>We do not resell construction software, so the answer is never to swap your tools for ours.</p>
    </>),
  },
  {
    id: "bids", title: "Salesforce for bids and owner relationships",
    lede: "Salesforce can hold the bid pipeline, general contractor and owner contacts, and follow-up after a proposal goes out.",
    lead: "Most bids are lost in follow-up, not in the number, and a CRM is where follow-up lives.",
    points: ["Bid pipeline by owner, GC and stage", "Follow-up tasks after every proposal", "Reports your estimators will read"],
    deepLabel: "Salesforce for a contractor",
    deep: (<>
      <p className="sf-rule">We are a Select Salesforce Consulting Partner, so it is the platform we know best. A bid pipeline, a contact history for each owner and a win-rate report by project type are standard Salesforce configuration.</p>
      <div className="sf-links"><Link className={L} to="/services/salesforce">Salesforce consulting</Link></div>
    </>),
  },
  {
    id: "sites", title: "Sites and portals for owners and subcontractors",
    lede: "Website and portal work is a general service we offer, and it is measured by published scores.",
    lead: "We have no construction website to show, so we point you at the service page that prints its own numbers.",
    points: ["Public site, owner pages or subcontractor portal", "Lighthouse scores printed to check", "Built, launched and maintained"],
    deepLabel: "what we have and have not built",
    deep: (<>
      <p className="sf-rule">We have not built a site for a construction company, and this page claims no such work. A contractor site has to show licence, insurance and project photos clearly; tell us if that is the job and we will say whether we fit.</p>
      <div className="sf-links"><Link className={L} to="/services/website-development">Website development</Link><Link className={L} to="/services/application-development">Custom software development</Link></div>
    </>),
  },
  {
    id: "limits", title: "Where our construction experience stops",
    lede: "We are a small IT consultancy in Malvern, PA, not a construction software vendor.",
    lead: "We have published no construction case study; the nearest pattern is an unnamed SAP-to-Salesforce sync.",
    deepLabel: "what that means for you",
    deep: (<>
      <p className="sf-rule">We do not sell construction software, and we will not imply a construction client. We are useful once a business already owns its tools and they do not work together, or when it needs something nobody sells. Meet the four of us on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you build construction websites?", a: "We build websites and portals as a general service, but we have not built one for a construction company and do not claim to. If a contractor site is what you need, tell us what it must show and we will say honestly whether we fit.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "Can you connect our estimating, field and accounting software?", a: "Yes, in principle. Integration is scoped per pair of systems, and we start with the two that disagree. We agree in writing which system owns each record before anything is built, and we do not resell the tools themselves. We agree the scope in writing before any work starts.", link: { to: "/services/application-development", label: "Custom software development" } },
  { q: "What does construction software implementation involve?", a: "It usually covers configuration, data migration, integration, training and support. We scope it after a short review of the systems you already own, so the plan names the records, the owners and the order of work rather than promising a platform swap." },
  { q: "Do you sell construction software?", a: "No. We do not sell or resell construction software. We connect the tools you already run and build custom pieces when nothing on the market fits, which keeps our advice independent of any vendor and your data in your own accounts." },
  { q: "Can Salesforce track bids and general contractors?", a: "Yes. Bid pipelines, owner and general contractor histories and proposal follow-up are standard Salesforce configuration. We are a Select Salesforce Consulting Partner, and we would connect it to your estimating tool so bids are entered once. If it is not a fit, we say so on the first call.", link: { to: "/services/salesforce", label: "Salesforce consulting" } },
  { q: "What drives the cost of an integration?", a: "Four things: how many systems are involved, whether each has an API or only an export, how clean the data is, and how many records must be reconciled. We scope it in writing before work starts, and we give no figure until we have seen the systems." },
  { q: "How long does an integration take?", a: "It depends on both systems, and it is set only after discovery, once we have listed the systems and the fields that must sync. Name the two systems that disagree and we will tell you what we would check first and what could slow the work." },
  { q: "Who owns the integration afterwards?", a: "You do. The mapping, the documentation and the accounts are in your name from day one, and we hand them over. If you want us to keep running it, we can maintain it under our 24/7 support, but you are never locked in." },
  { q: "Can you add a developer to our team?", a: "Yes. A senior developer or integration engineer can work inside your team on your tools for a sprint or a year. We agree the role, the hours and the end date in writing first, and the same person stays on throughout.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
  { q: "Do you have construction clients?", a: "We have no published construction case study, and we will not imply one. The closest pattern we can describe is an unnamed SAP-to-Salesforce sync. What we offer is integration depth and candour about what we have and have not done in construction." },
];

export default function Construction() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "construction software integration, construction software implementation, construction business systems, Salesforce for construction bids, job cost reporting integration, Pennsylvania",
    ogTitle: TITLE,
    ogDescription: "How we connect the estimating, field and accounting systems a construction firm already owns, and where our experience stops.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
  });

  return (
    <Layout>
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, `https://onealgorithm.com${PAGE_PATH}`, { dateModified: "2026-10-31" })} />
      <PageHero
        title={
          <>
            Construction software implementation for{" "}
            <span className="text-oa-orange">construction firms</span>
          </>
        }
        lede="We are an IT consultancy, not a construction software vendor. What we offer a construction business is to connect the systems it already bought — the field app, the estimating tool, the accounting package — so the same job means the same thing in each of them."
        panel={{
          title: "What that means in practice",
          items: [
            "What we would connect: the systems you own",
            "Salesforce as a place to track bids",
            "Job reporting that spans systems",
            "Sites and portals, built as a general service",
            "Senior developers added to your team",
          ],
          /* ⛔ WOSB/EDWOSB removed from commercial pages 2026-09-01 (Louis). */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
      <IndBody
        crumbs={[{ label: "Construction" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        plate={{
          title: "Diagram: One agreed job record",
          left: ["Field app", "Estimating tool", "Accounting package"], hub: ["What we would connect", "One agreed job record"], right: ["One job number everywhere", "Cost codes that match", "Reports across systems"],
          caption: "A diagram of the approach: the systems a firm already owns, joined by an agreed record of the job.", stamp: "One agreed job record",
        }}
        proof="salesforce"
        offer1={{ heading: "Which two systems disagree?", line: "Tell us the pair and we say what we would check first.", label: "Tell us which two systems disagree" }}
        offer2={{ heading: "Bring the job that took three days to reconcile", line: "We tell you whether it is an integration, a data problem or not worth doing.", label: "Talk to a consultant" }}
        units={UNITS}
        after={{
          systems: (tone) => (
            <PatternTable id="patterns" tone={tone()} heading="Integration patterns for construction firms"
              lede="Where the usual system pairs break, and what connects them."
              head={["System pair", "What breaks", "What connects"]}
              rows={[
                ["Estimating to accounting", "Budget lines re-keyed; cost codes drift", "One cost-code list, synced from the system that owns it"],
                ["Field app to accounting", "Hours and quantities reach the ledger late", "A scheduled sync with a failure report"],
                ["Estimating to Salesforce", "Bids tracked in a spreadsheet", "Bid records created from the estimate"],
                ["Accounting to reporting", "Job reports built by hand each month", "One report read from the agreed sources"],
              ]} />
          ),
        }}
        facts={{
          heading: "Construction by the numbers",
          lede: "Census counted 814,557 construction establishments in 2023, most of them specialty trade contractors.",
          rows: [
            { label: "Construction establishments (NAICS 23)", value: "814,557" },
            { label: "Employees", value: "7,659,459" },
            { label: "Specialty trade contractors (NAICS 238)", value: "521,315 establishments" },
            { label: "Building construction (NAICS 236)", value: "254,630 establishments" },
            { label: "Heavy and civil engineering (NAICS 237)", value: "38,612 establishments" },
          ],
          read: "U.S. Census Bureau, County Business Patterns 2023, read 31 October 2026",
          sources: [{ name: "U.S. Census Bureau, County Business Patterns 2023", what: "Establishments and employees, NAICS 23, 236, 237 and 238, United States, released 26 June 2025", read: "read 31 October 2026", page: CBP }],
        }}
        faqHeading="Construction questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "Construction systems", need: "construction",
          heading: "Tell us which two systems disagree",
          lede: "Bring the job that took someone three days to reconcile, and we will tell you whether it is an integration, a data problem or not worth the money.",
          covers: ["The systems involved and who edits each", "The report someone rebuilds by hand", "Whether each system has an API or an export", "What a wrong number costs you"],
        }}
      />
    </Layout>
  );
}
