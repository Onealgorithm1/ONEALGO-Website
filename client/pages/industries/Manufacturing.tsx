import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, CBP, type IndUnit } from "../../components/v2/industries-Body";

/* Manufacturing. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * HONESTY (resolved Q1, 2026-10-31): we have NO delivered OT / SCADA project, contract or credential. So the body
 * claims no plant-floor delivery: it describes the ERP and integration work behind a plant, says plainly where
 * our experience stops, and does not chase "manufacturing marketing agency" or "industrial SEO". The only build
 * named is Phantom Arcades (nameable, 2026-09-25; never the show name), as a configurator example, not a plant.
 * Facts: Census CBP 2023 NAICS 31-33 (industries/facts.json, cbp_manufacturing). */

const PAGE_PATH = "/industries/manufacturing";
const TITLE = "Manufacturing ERP & Systems Integration — OneAlgorithm";
const DESCRIPTION = "ERP, data and systems integration for manufacturers, from a small IT consultancy in Malvern, PA. We say plainly what we have not done on the plant floor.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "What we do for manufacturers",
    lede: "We connect the ERP, the reporting and the business systems behind a plant.",
    lead: "Usually the data already exists; it stops at the machine, the spreadsheet or the ledger.",
    points: ["ERP and back-office integration", "Production reporting from real sources", "Engineers added to your team"],
    deepLabel: "the work manufacturers call us about",
    deep: (<>
      <p className="sf-rule">Each of these is a service on this site. What changes in a plant is what sits on the other end: a historian, an ERP module, a line that cannot be stopped for a migration.</p>
      <p><span className="sf-lead-in">What we do:</span> We get data out of the systems that hold it and into a place a person reads weekly, before anything is called a dashboard.</p>
      <p>Integration and platform people can also work inside your team, on your tools, for a sprint or for a year, including through a go-live while your own staff still have a plant to run.</p>
      <div className="sf-links">
        <Link className={L} to="/services/salesforce-integration">Salesforce integration with ERP</Link>
        <Link className={L} to="/services/staff-augmentation">Staff augmentation</Link>
      </div>
    </>),
  },
  {
    id: "data", title: "Getting data off the equipment",
    lede: "The work is getting what a plant already emits into something a person looks at.",
    lead: "Most plants record far more than anyone reads, and the gap is plumbing, not analytics.",
    points: ["Name the source: sensor, historian or ERP", "Agree one place the number is read", "Report from it weekly before building more"],
    deepLabel: "how we scope data work in a plant",
    deep: (<>
      <p className="sf-rule">Before a model can say a bearing is going, something has to have recorded that bearing long enough to know what normal looks like. Often that record does not exist yet, and we would rather say so than sell a pilot.</p>
      <p><span className="sf-lead-in">What you get:</span> A list of the data that exists today, where it stops, and the cheapest way to extend it.</p>
      <div className="sf-links"><Link className={L} to="/services/operational-transformation-consulting">Operational transformation</Link></div>
    </>),
  },
  {
    id: "catalogue", title: "Product sites with a configurator",
    lede: "We built the Phantom Arcades arcade configurator on WordPress and WooCommerce.",
    lead: "It is a product-configuration build we can show you, not a plant we have run.",
    points: ["A configurator that builds the order", "WooCommerce checkout behind it", "Search visibility measured on the case study"],
    deepLabel: "the Phantom Arcades build",
    deep: (<>
      <p className="sf-rule">Phantom Arcades is a client of ours, and its site is a WordPress and WooCommerce build with a configurator for arcade cabinets. Organic clicks rose 92 percent year on year and non-brand clicks 231 percent, read from Google Search Console.</p>
      <p>A manufacturer with a configurable product has the same problem: the choices have to become a clean order. We make no claim that this is manufacturing-plant work.</p>
      <div className="sf-links"><Link className={L} to="/blog/seo-case-study-phantom-arcades/">Phantom Arcades SEO case study</Link></div>
    </>),
  },
  {
    id: "limits", title: "Where our experience stops",
    lede: "We have not delivered a plant-floor or SCADA project, and we hold no OT security credential.",
    lead: "A plant manager should hear that from us, not discover it in a statement of work.",
    deepLabel: "what we are and are not",
    deep: (<>
      <p className="sf-rule">We are not an MES or a quality-management product, and we do not resell one. We work on the equipment-adjacent data, the business systems and the integrations between them. We have published no manufacturing case study and will not imply one.</p>
      <p>The useful conversation is a specific one: which line, which system, and what happens today when the two disagree. Meet the four of us on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you do SCADA or OT security work?", a: "No. We have not delivered a plant-floor, SCADA or OT security project and hold no OT credential. We work on ERP, data and business-system integration, and we will tell you if a job belongs with an OT specialist." },
  { q: "Can you integrate our ERP with other systems?", a: "Yes. We build and maintain integrations between an ERP and the CRM, reporting or support tools around it, after agreeing which system owns each record.", link: { to: "/services/salesforce-integration", label: "Integration services" } },
  { q: "Do you build manufacturing websites?", a: "We build websites as a general service and have built a product configurator for Phantom Arcades. We have not built a site for a manufacturing plant and make no such claim.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "Do you offer manufacturing marketing or industrial SEO?", a: "Not as a specialty. Industrial marketing agencies own those searches. We offer SEO as a general service and can show one measured case study.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "Can you build a product configurator?", a: "Yes. Phantom Arcades runs on a WordPress and WooCommerce build with a configurator we made. The scope depends on how many options interact.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Phantom Arcades case study" } },
  { q: "What drives the cost of an ERP integration?", a: "The number of systems, whether each has an API, the data quality and the volume to reconcile. It is scoped in writing before work starts." },
  { q: "How long does an integration take?", a: "It is set once we have listed the systems and the fields that must sync. Tell us the two systems that disagree and we will say what we would check first." },
  { q: "Can you add engineers during a go-live?", a: "Yes. Integration and platform people can work inside your team for the go-live or longer, so your own staff can keep the plant running.", link: { to: "/services/staff-augmentation", label: "Staff augmentation" } },
];

export default function Manufacturing() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "manufacturing ERP integration, manufacturing systems integration, production reporting, product configurator, manufacturing technology consulting Pennsylvania",
    ogTitle: TITLE,
    ogDescription: "ERP and integration work behind the plant, and a plain account of what we have not done on the floor.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
  });

  return (
    <Layout>
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, `https://onealgorithm.com${PAGE_PATH}`, { dateModified: "2026-10-31" })} />
      <PageHero
        title={
          <>
            Manufacturing:{" "}
            <span className="text-oa-orange">
              the plant floor and the systems behind it
            </span>
          </>
        }
        lede="For manufacturers we do the integration work behind the plant: getting order, inventory and production data into the systems that run the business. Usually the data already exists; it just stops at the machine."
        panel={{
          title: "What that means in practice",
          items: [
            "SCADA and industrial IoT integration",
            "OT-to-IT network and security work",
            "Production reporting from real sources",
            "Maintenance systems, scoped honestly",
            "Engineers added to your team",
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
        crumbs={[{ label: "Manufacturing" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        units={UNITS}
        facts={{
          heading: "Manufacturing by the numbers",
          lede: "Census counted 284,452 manufacturing establishments in 2023, employing 12.3 million people.",
          rows: [
            { label: "Manufacturing establishments (NAICS 31-33)", value: "284,452" },
            { label: "Employees", value: "12,335,234" },
          ],
          read: "U.S. Census Bureau, County Business Patterns 2023, read 31 October 2026",
          sources: [{ name: "U.S. Census Bureau, County Business Patterns 2023", what: "Establishments and employees, NAICS sector 31-33, United States, released 26 June 2025", read: "read 31 October 2026", page: CBP }],
        }}
        faqHeading="Manufacturing questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "Manufacturing systems", need: "manufacturing",
          heading: "Tell us where the data stops",
          lede: "At the machine, at the historian or at the ledger. Bring one line and the report someone builds by hand about it.",
          covers: ["The line and the system in question", "The report built by hand today", "Which ERP and which modules", "Whether the systems have APIs"],
        }}
      />
    </Layout>
  );
}
