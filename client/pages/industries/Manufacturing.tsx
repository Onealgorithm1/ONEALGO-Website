import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, CaseBand, CBP, type IndUnit } from "../../components/v2/industries-Body";

/* Manufacturing. Hero kept; body rebuilt on the sf kit 2026-10-31, round 3 (seo-spec-b 4.10).
 * HONESTY (resolved Q1): NO delivered OT / SCADA project. Hero text changes (fact-check BANNED/UNSOURCED):
 *  - H1 "the plant floor and the systems behind it" -> "Manufacturing ERP integration and the systems behind it"
 *  - panel "Maintenance systems, scoped honestly" removed (replaced by the ERP-to-Salesforce item)
 *  - lede "it just stops at the machine" -> "it just stops at the spreadsheet or the ledger"
 * Phantom is WooCommerce (never "WordPress", FC). Facts: Census CBP 2023 NAICS 31-33. */

const PAGE_PATH = "/industries/manufacturing";
const TITLE = "Manufacturing ERP integration | OneAlgorithm";
const DESCRIPTION = "ERP, data and systems integration for manufacturers, plus product sites with configurators. A small IT consultancy in Malvern, PA. (610) 890-9711.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "What manufacturing ERP integration involves",
    lede: "Manufacturing ERP integration connects the ERP to the other systems so each figure is entered once.",
    lead: "Orders, stock and counts are often re-keyed between the ERP, a spreadsheet and the storefront.",
    points: ["ERP and back-office integration", "Production reporting from real sources", "Engineers added to your team"],
    deepLabel: "the work manufacturers call us about",
    deep: (<>
      <p className="sf-rule">We do not replace your ERP. We connect it to the CRM, the storefront and the reporting around it, after agreeing which system owns each record.</p>
      <p>Integration and platform people can also work inside your team for a go-live, so your own staff keep the plant running. See <Link className={L} to="/services/staff-augmentation">IT staff augmentation</Link>.</p>
    </>),
  },
  {
    id: "data", title: "Where manufacturing data gets stuck",
    lede: "Data stops in spreadsheets, re-keyed orders and counts typed into the ERP by hand.",
    lead: "Most firms record more than anyone reads, and the gap is plumbing, not analytics.",
    points: ["Name the source: ERP, spreadsheet or storefront", "Agree one place the number is read", "Report from it weekly before building more"],
    deepLabel: "how we scope data work",
    deep: (<>
      <p className="sf-rule">Before anything is called a dashboard, something has to record the number reliably. Often that record does not exist yet, and we would rather say so than sell a pilot.</p>
      <p><span className="sf-lead-in">What you get:</span> A list of the data that exists today, where it stops, and the cheapest way to extend it.</p>
      <div className="sf-links"><Link className={L} to="/services/operational-transformation-consulting">Operational transformation consulting</Link></div>
    </>),
  },
  {
    id: "salesforce", title: "Connecting ERP to Salesforce and your storefront",
    lede: "Orders, customers and stock should read the same in the ERP, in Salesforce and on the storefront.",
    lead: "We have built an unnamed SAP-to-Salesforce sync, and the Phantom Arcades order flow runs from store to back office.",
    points: ["One customer record across ERP and CRM", "Orders flow from the storefront after checkout", "Syncs that report their own failures"],
    deepLabel: "the two patterns we can describe",
    deep: (<>
      <p className="sf-rule">The sync client is unnamed, so we describe the pattern only: which system owns each field, what happens when a record changes in both, and how a failure is reported. The Phantom Arcades flow takes a configured order from the WooCommerce store into the back office.</p>
      <p>We make no plant claim for either. See <Link className={L} to="/services/application-development">custom software development</Link>.</p>
    </>),
  },
  {
    id: "catalogue", title: "Product sites with a configurator",
    lede: "We built the Phantom Arcades arcade configurator on WooCommerce, with a 3D view of the product.",
    lead: "It is a product-configuration build we can show you, not a plant we have run.",
    points: ["A configurator that builds the order", "WooCommerce checkout behind it", "Search visibility measured on the case study"],
    deepLabel: "the Phantom Arcades build",
    deep: (<>
      <p className="sf-rule">Phantom Arcades is a client of ours. Organic clicks rose 92 percent year on year and non-brand clicks 231 percent, read from Google Search Console. We report no revenue.</p>
      <p>A manufacturer with a configurable product has the same problem: the choices have to become a clean order.</p>
      <div className="sf-links"><Link className={L} to="/blog/product-configurator-case-study-phantom-arcades">3D product configurator case study</Link><Link className={L} to="/blog/seo-case-study-phantom-arcades">Phantom Arcades SEO case study</Link></div>
    </>),
  },
  {
    id: "limits", title: "Where our manufacturing experience stops",
    lede: "We have not delivered a plant-floor, SCADA or OT security project.",
    lead: "A plant manager should hear that from us, not discover it in a statement of work.",
    deepLabel: "what we are and are not",
    deep: (<>
      <p className="sf-rule">We are not an MES or a quality-management product, and we do not resell one. We have published no manufacturing case study and will not imply one. The useful conversation is a specific one: which system, and what happens today when two of them disagree. Who you would work with is on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What is ERP integration?", a: "ERP integration connects the ERP to the other systems around it, such as the CRM, the storefront and reporting, so that each figure is entered once and read the same everywhere. We agree which system owns each record, then build and monitor the sync." },
  { q: "Can you integrate our ERP with other systems?", a: "Yes, in principle. Integration is scoped per pair of systems, and we start with the two that disagree. We check whether each has an API or only an export, agree which system wins for each field, and report sync failures to a person.", link: { to: "/services/application-development", label: "Custom software development" } },
  { q: "Do you replace our ERP?", a: "No. We connect what you run and do not resell ERP software. If a replatform is genuinely the right answer, we will say so plainly, but the usual job is making the ERP, the CRM and the storefront agree rather than swapping any of them out." },
  { q: "Do you do SCADA or OT security work?", a: "No. We have not delivered a plant-floor, SCADA or OT security project, and we hold no OT credential. If that is what you need, we will say so on the first call and tell you it belongs with an OT specialist." },
  { q: "Do you build manufacturing websites?", a: "We build websites and product sites with configurators, such as the Phantom Arcades build. We have not built a site for a manufacturing company and make no such claim. Tell us what the site must show and we will say whether we fit.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "Do you offer manufacturing marketing or industrial SEO?", a: "Not as a specialty, and specialist agencies own those searches. We offer SEO as a general service and can show one measured result, Phantom Arcades, where Google clicks rose 92 percent year on year. We have no manufacturing marketing proof.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "Can you build a product configurator?", a: "Yes. We built the Phantom Arcades 3D configurator, which turns a customer's choices into a clean order on WooCommerce. The effort depends on how many options interact, and we scope it in writing before work starts. The Phantom Arcades build is our reference example, and its blog case study shows how it works.", link: { to: "/blog/product-configurator-case-study-phantom-arcades", label: "3D product configurator case study" } },
  { q: "What drives the cost of an ERP integration?", a: "The number of systems, whether each has an API, the data quality, the volume to reconcile and how often the rules change. You get a written scope before any work begins, and a number only after we have seen the systems on both sides involved." },
  { q: "How long does an integration take?", a: "It depends on the systems and the data, and we set a plan only after discovery. Tell us the two systems that disagree and we will say what we would check first, what could slow the work, and how we would report progress." },
  { q: "Can you add engineers during a go-live?", a: "Yes. Integration and platform engineers can work inside your team for the go-live or longer, so your own staff can keep the plant running. We agree the role, hours and end date in writing first. Your own staff keep the plant running while ours handle the integration work.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
];

export default function Manufacturing() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "manufacturing ERP integration, ERP integration services, manufacturing systems integration, product configurator, manufacturing technology consulting Pennsylvania",
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
            Manufacturing ERP integration{" "}
            <span className="text-oa-orange">
              and the systems behind it
            </span>
          </>
        }
        lede="For manufacturers we do the integration work behind the business: getting order, inventory and production data into the systems that run it. Usually the data already exists; it just stops at the spreadsheet or the ledger."
        panel={{
          title: "What that means in practice",
          items: [
            "Production reporting from real sources",
            "ERP connected to Salesforce and your storefront",
            "Engineers added to your team",
          ],
          /* ⛔ WOSB/EDWOSB removed from commercial pages 2026-09-01 (Louis). */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
      <IndBody
        crumbs={[{ label: "Manufacturing" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        plate={{
          title: "Diagram: One place the number is read",
          left: ["ERP and back office", "Spreadsheets and counts", "Reporting tools"], hub: ["What we do", "One place the number is read"], right: ["Integration between systems", "Production reports from real sources", "Engineers on your team"],
          caption: "A diagram of the work: the systems behind a plant, joined at one agreed place for each number.", stamp: "One place the number is read",
        }}
        proof="seo"
        offer1={{ heading: "Where does the data stop?", line: "At the spreadsheet, the ledger or the storefront. Tell us where.", label: "Tell us where the data stops" }}
        offer2={{ heading: "Bring one report someone builds by hand", line: "We tell you what would feed it and whether it is worth connecting.", label: "Talk to a consultant" }}
        units={UNITS}
        after={{
          catalogue: (tone) => (
            <CaseBand id="work" tone={tone()} heading="A build we can show"
              lede="One product-configuration build, with the result we are allowed to print."
              cases={[
                { title: "Arcade configurator", built: "A 3D product configurator on WooCommerce that turns choices into an order.", to: "/blog/product-configurator-case-study-phantom-arcades", linkLabel: "Read the configurator case study" },
                { title: "Arcade manufacturer, Florida: search", built: "Organic search, measured in Google Search Console.", result: "Google clicks +92%, non-brand +231% (Search Console)", to: "/blog/seo-case-study-phantom-arcades", linkLabel: "Read the SEO case study" },
              ]} />
          ),
        }}
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
          lede: "At the spreadsheet, at the storefront or at the ledger. Bring one process and the report someone builds by hand about it.",
          covers: ["The process and the system in question", "The report built by hand today", "Which ERP and which modules", "Whether the systems have APIs"],
        }}
      />
    </Layout>
  );
}
