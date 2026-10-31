import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero } from "../components/site";
import { Building2, Factory, ShoppingCart, Landmark, Megaphone, Code } from "lucide-react";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createWebPageSchema } from "../components/StructuredData";
import { SmartSection, SmartUnit, GoDeeper, type SfFaqItem } from "../components/sf";
import { IndBody, type IndUnit } from "../components/v2/industries-Body";

/* Industries hub. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * Signpost to six pages, honest about scope: "We are not a sector specialist". WOSB/EDWOSB is NOT mentioned here
 * (the 2026-09-01 removal from commercial pages stands; it lives on /industries/government and /capabilities).
 * The six cards are read off INDUSTRIES, which also feeds the hero panel, so they cannot disagree. */

const INDUSTRIES = [
  { icon: Building2, title: "Construction", body: "Connecting the field app, the estimating tool and the accounting package a firm already bought, so a job number means one thing in all three.", to: "/industries/construction" },
  { icon: Factory, title: "Manufacturing", body: "ERP, reporting and integration work behind the plant, with a plain account of what we have not done on the floor.", to: "/industries/manufacturing" },
  { icon: ShoppingCart, title: "E-Commerce", body: "WooCommerce and custom store builds, and the joins between the store and stock, payments, the ledger and a help desk.", to: "/industries/ecommerce" },
  { icon: Landmark, title: "Government", body: "Set-aside eligible and SAM registered, with NAICS and PSC codes published for market research.", to: "/industries/government" },
  { icon: Megaphone, title: "Marketing", body: "Not an industry, and the page says so. A short signpost to the social media management and MarTech service pages.", to: "/industries/marketing" },
  { icon: Code, title: "Website development by industry", body: "What changes in a website build for construction, manufacturing, e-commerce and government work, on the service page.", to: "/services/website-development#industries" },
];

const TITLE = "Construction, Manufacturing & E-Commerce IT — OneAlgorithm";
const DESCRIPTION = "IT consulting for construction, manufacturing, e-commerce and government: ERP, systems integration and web work from a Malvern, PA team. See how it lands in yours.";

const UNITS: IndUnit[] = [
  {
    id: "sectors", title: "Four sectors, two functions",
    lede: "One small consultancy does the same integration, platform and web work in every sector.",
    lead: "Four pages describe sectors; marketing and website development are functions every business has.",
    points: ["Construction, manufacturing, e-commerce, government", "Marketing and website development are functions", "Each page says what we have not done"],
    deepLabel: "how the six pages are organised",
    deep: (<>
      <p className="sf-rule">We are not a sector specialist and these are not six practices. Each page says plainly how the work lands in that industry, and the two functions are kept short and point at the service pages that own the detail.</p>
      <div className="sf-links">
        <Link className="sf-link" to="/services">All services</Link>
        <Link className="sf-link" to="/services/website-development">Website development</Link>
      </div>
    </>),
  },
  {
    id: "limits", title: "Where our experience stops",
    lede: "We have no construction case study, no manufacturing plant project and no government award.",
    lead: "Our named proof is Phantom Arcades, where organic clicks rose 92 percent year on year.",
    points: ["E-commerce: Phantom Arcades and Atlas Peptides builds", "Government: eligibility, not past performance", "Everything else is stated as capability"],
    deepLabel: "what each page claims and does not claim",
    deep: (<>
      <p className="sf-rule">A page that implies work we have not done is easy to check and embarrassing to be caught at. So each industry page lists what we do and what we do not.</p>
      <p>Phantom Arcades is the one measured result we print, with its method on the case study.</p>
      <div className="sf-links"><Link className="sf-link" to="/blog/seo-case-study-phantom-arcades/">Phantom Arcades SEO case study</Link><Link className="sf-link" to="/about">About us</Link></div>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Are you a construction or manufacturing specialist?", a: "No. We are a small IT consultancy that does integration, Salesforce and web work, and the construction and manufacturing pages say where that lands and where it stops." },
  { q: "Which industries do you serve?", a: "Construction, manufacturing, e-commerce and government, plus marketing teams. Your sector may not be listed, and that usually does not matter because the systems are the same systems." },
  { q: "Do you have industry case studies?", a: "One measured result: Phantom Arcades, where organic clicks rose 92 percent year on year. We have no construction or manufacturing case study.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Phantom Arcades case study" } },
  { q: "Can you work with government agencies?", a: "We are set-aside eligible and registered in SAM. We have not been awarded a government contract.", link: { to: "/industries/government", label: "Government" } },
  { q: "Do you build e-commerce stores?", a: "Yes, on WooCommerce and custom builds. We do not build Shopify stores.", link: { to: "/industries/ecommerce", label: "E-commerce" } },
  { q: "Where are you based?", a: "Malvern, Pennsylvania. Most work is remote, with in-person sessions when a project calls for them.", link: { to: "/contact", label: "Contact us" } },
];

export default function Industries() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl("/industries"),
    keywords: "construction technology consulting, manufacturing systems integration, e-commerce integration, government contracting WOSB EDWOSB, IT consulting by industry, Malvern PA",
    ogTitle: "Industries — OneAlgorithm",
    ogDescription: "Construction, manufacturing, e-commerce and government — and a plain account of where our experience stops.",
    ogUrl: getCanonicalUrl("/industries"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Industries — OneAlgorithm",
    twitterDescription: "Construction, manufacturing, e-commerce and government — and a plain account of where our experience stops.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });
  return (
    <Layout>
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, "https://onealgorithm.com/industries", { dateModified: "2026-10-31" })} />
      <PageHero
        title={
          <>
            The same consultancy,{" "}
            <span className="text-oa-orange">in six different rooms</span>
          </>
        }
        lede="We are not a sector specialist and these are not six practices. It is one small IT consultancy doing the same integration, platform and web work, and each page below says plainly how that lands in that industry — and what we have not done there."
        // The panel is the same six verticals the grid below lists, read off the
        // one array so the two can never disagree. No new sectors or claims.
        panel={{
          title: "Where we work",
          items: INDUSTRIES.map((i) => i.title),
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />
      <IndBody
        crumbs={[{ label: "Industries" }]}
        base={[{ label: "Home", to: "/" }]}
        units={UNITS}
        faqHeading="Industry questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "Industries", need: "contact",
          heading: "Tell us what you are trying to fix",
          lede: "Bring the system slowing you down, or the role you cannot fill. We will say what it would take, including when it is not worth doing.",
          covers: ["Your industry and the systems involved", "The report built by hand today", "What a wrong number costs you", "Your timeline"],
        }}
      >
        <SmartSection id="pages" tone="paper" grid heading={{ id: "h-pages", title: "Pick the page closest to you", lede: "Each card links to the page that owns the detail." }}>
          {INDUSTRIES.map((x, i) => (
            <SmartUnit key={x.title} level={3} className="sf-c4" delay={(i % 3) * 0.08} measure={false} title={x.title} lede={x.body}>
              <p><Link className="sf-link" to={x.to}>Open {x.title.toLowerCase()}<span className="sr-only"> page</span></Link></p>
            </SmartUnit>
          ))}
        </SmartSection>
      </IndBody>
    </Layout>
  );
}
