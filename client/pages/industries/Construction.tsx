import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, CBP, type IndUnit } from "../../components/v2/industries-Body";

/* Construction. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * HONESTY: this stays an integration and systems page. No construction client exists in our notes (Starzi Bros is a
 * prospect with a preview site, not a delivered client), so no web-design or delivery proof is claimed for the sector.
 * Facts: Census County Business Patterns 2023 (industries/facts.json, cbp_construction), in the sources pop-up. */

const PAGE_PATH = "/industries/construction";
const TITLE = "Construction Software Implementation & Integration — OneAlgorithm";
const DESCRIPTION = "Systems integration, Salesforce, job reporting and web work for construction firms. We connect the field, estimating and accounting systems you own.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "What we do for construction firms",
    lede: "We connect the field app, the estimating tool and the accounting package a firm already owns.",
    lead: "A job number and a cost code that mean different things in three systems cost someone days every month.",
    points: ["Integrations between the systems you own", "Salesforce for bids and relationships", "Job reporting that spans systems"],
    deepLabel: "the five jobs construction firms call us about",
    deep: (<>
      <p className="sf-rule">Each of these is a service on this site. What changes in construction is which system is on the other end of the wire.</p>
      <p><span className="sf-lead-in">What we do:</span> We build and maintain the integrations so one job reads the same in the field, in estimating and in the ledger.</p>
      <p>Reporting that reads from more than one system is usually a data problem before it is a dashboard problem, so we fix the data first. When the work is real but hiring for it is not, we add a senior developer or integration engineer to your team for a sprint or a year.</p>
      <div className="sf-links">
        <Link className={L} to="/services/salesforce-integration">Salesforce integration services</Link>
        <Link className={L} to="/services/staff-augmentation">Staff augmentation</Link>
      </div>
    </>),
  },
  {
    id: "systems", title: "Connecting estimating, field and accounting",
    lede: "The fix is deciding which system owns each record, then making the others read from it.",
    lead: "Tools bought at different times by different people rarely agree on a job, a vendor or a cost code.",
    points: ["One agreed source of truth per record", "Syncs that report their own failures", "Costs that agree with the ledger"],
    deepLabel: "how we connect the three systems",
    deep: (<>
      <p className="sf-rule">We start by listing every place a job lives and who edits it. The sync direction for each field is agreed in writing before anything is built.</p>
      <p><span className="sf-lead-in">What you get:</span> A map of the records, the rules for which system wins, and an integration that tells a person when a sync fails instead of failing silently.</p>
      <p>Where the other end is a custom or older system, we build against its API or its export. We do not resell construction software, so the answer is never to swap your tools for ours.</p>
    </>),
  },
  {
    id: "bids", title: "Salesforce for bids and owner relationships",
    lede: "Bid tracking, general contractor and owner contacts, and follow-up after a proposal goes out.",
    lead: "Most bids are lost in follow-up, not in the number, and a CRM is where follow-up lives.",
    points: ["Bid pipeline by owner, GC and stage", "Follow-up tasks after every proposal", "Reports your estimators will actually read"],
    deepLabel: "Salesforce for a contractor",
    deep: (<>
      <p className="sf-rule">We are a Select Salesforce Consulting Partner, so this is the platform we know best and usually the first one we reach for. A bid pipeline, a contact history for each general contractor or owner, and a report on win rate by project type are standard Salesforce configuration.</p>
      <p><span className="sf-lead-in">What we do:</span> We set it up around how your estimators already work and connect it to the estimating tool.</p>
      <div className="sf-links"><Link className={L} to="/services/salesforce">Salesforce consulting services</Link></div>
    </>),
  },
  {
    id: "sites", title: "Sites and portals for owners and subcontractors",
    lede: "Website and portal work is a general service we offer, measured by published scores.",
    lead: "We have no construction website to show, so we point you at the service page that prints its own numbers.",
    points: ["Public site, owner pages or subcontractor portal", "Lighthouse scores printed for you to check", "Built, launched and maintained"],
    deepLabel: "what we have and have not built",
    deep: (<>
      <p className="sf-rule">We have not built a site for a construction company, and this page claims no such work. Our website development page prints its own Lighthouse scores and asks you to check them in DevTools.</p>
      <p>A contractor site has to show licence, insurance and project photos clearly. If that is what you need, tell us and we will say whether we fit.</p>
      <div className="sf-links"><Link className={L} to="/services/website-development">Website development</Link></div>
    </>),
  },
  {
    id: "limits", title: "What we are not",
    lede: "We are a small IT consultancy in Malvern, PA, not a construction software vendor.",
    lead: "If you need scheduling or project management software, buy it from a firm that sells it.",
    deepLabel: "where our experience stops",
    deep: (<>
      <p className="sf-rule">We do not sell construction software and we do not resell anyone else&rsquo;s. We have published no construction case study and will not imply one.</p>
      <p>We are useful once a business already owns its tools and they do not work together, or when it needs something built that nobody sells. Meet the four of us on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you build construction websites?", a: "We build websites as a general service, but we have not built one for a construction company and do not claim to. If a contractor site is what you need, tell us what it must show and we will say whether we fit.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "Can you connect our estimating, field and accounting software?", a: "Yes. We build and maintain integrations between systems you already own, after agreeing in writing which system owns each record. We do not resell the tools themselves.", link: { to: "/services/salesforce-integration", label: "Integration services" } },
  { q: "Do you sell construction software?", a: "No. We do not sell or resell construction software. We work on the systems around the tools you already run, and on custom builds when nothing on the market fits." },
  { q: "Can Salesforce track bids and general contractors?", a: "Yes. Bid pipelines, owner and general contractor histories and proposal follow-up are standard Salesforce configuration, and we are a Select Salesforce Consulting Partner.", link: { to: "/services/salesforce", label: "Salesforce consulting" } },
  { q: "What drives the cost of an integration?", a: "Four things: how many systems are involved, whether each has an API or only an export, how clean the data is, and how many records must be reconciled. We scope it in writing before work starts." },
  { q: "How long does an integration take?", a: "It is set once we have listed the systems and the fields that must sync. Name the two systems that disagree and we will tell you what we would check first." },
  { q: "Who owns the integration afterwards?", a: "You do. The mapping and documentation are handed over, and we can keep maintaining it under 24/7 support if you want us to." },
  { q: "Can you add a developer to our team?", a: "Yes. A senior developer or integration engineer can work inside your team on your tools for a sprint or a year.", link: { to: "/services/staff-augmentation", label: "Staff augmentation" } },
];

export default function Construction() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "construction technology consulting, construction systems integration, Salesforce for construction, job cost reporting integration, construction software integration Pennsylvania",
    ogTitle: TITLE,
    ogDescription: "We connect the field, estimating and accounting systems a construction firm already owns — and we say plainly what we do not do.",
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
        lede="We are an IT consultancy, not a construction software vendor. What we usually do for a construction business is connect the systems it already bought — the field app, the estimating tool, the accounting package — so the same job means the same thing in each of them."
        // Scope strip. Five items, each one a service this firm actually sells.
        panel={{
          title: "What that means in practice",
          items: [
            "Integrations between the systems you own",
            "Salesforce for bids and client relationships",
            "Job reporting that spans systems",
            "Sites and portals for owners and subcontractors",
            "Senior developers added to your team",
          ],
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
      <IndBody
        crumbs={[{ label: "Construction" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        plate={{
          title: "Diagram: One agreed job record",
          left: ["Field app", "Estimating tool", "Accounting package"], hub: ["What we do", "One agreed job record"], right: ["One job number everywhere", "Cost codes that match", "Reports across systems"],
          caption: "A diagram of the work: the systems a firm already owns, joined by an agreed record of the job.", stamp: "One agreed job record",
        }}
        units={UNITS}
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
