import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, type IndUnit } from "../../components/v2/industries-Body";

/* E-Commerce. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * Named proof: Phantom Arcades (WordPress + WooCommerce, configurator; SEO case study; never the show name; no revenue)
 * and Atlas Peptides as a delivered client site ("we built it": no price, no claims). NOT claimed: Shopify (no store
 * built, no partner status, resolved Q8), white-label, HubSpot. Zendesk is "Zendesk partner", never "certified".
 * Facts: Census Quarterly Retail E-Commerce Q2 2026 (industries/facts.json, ecom_share). */

const PAGE_PATH = "/industries/ecommerce";
const TITLE = "E-Commerce Development & Systems Integration — OneAlgorithm";
const DESCRIPTION = "WooCommerce and custom e-commerce builds, plus the integrations to stock, payments, the ledger and Zendesk. A Malvern, PA team; no Shopify claims.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "E-commerce development and integration",
    lede: "We build WooCommerce and custom stores, and we connect them to everything behind them.",
    lead: "The store is rarely the broken part; what breaks is the joins to stock, payments and support.",
    points: ["Storefront builds on WooCommerce or custom", "Joins to stock, payments and the ledger", "Zendesk connected to the order"],
    deepLabel: "the six jobs online retailers call us about",
    deep: (<>
      <p className="sf-rule">Stock that disagrees with the site, orders that reach the warehouse without the customer record, support agents who cannot see the order they are asked about. That is the work.</p>
      <p><span className="sf-lead-in">What we do:</span> We build the store, then build and maintain the integrations that keep one order looking like one order everywhere.</p>
      <p>Campaign platforms are wired to the CRM and the store so a channel report and a revenue report can sit side by side. A senior developer can also join your team for a peak season or a replatform.</p>
      <div className="sf-links">
        <Link className={L} to="/services/website-development">Website development</Link>
        <Link className={L} to="/services/martech">MarTech</Link>
      </div>
    </>),
  },
  {
    id: "builds", title: "Stores we have built",
    lede: "Phantom Arcades runs on WooCommerce with a configurator; Atlas Peptides is a site we built.",
    lead: "Both are client sites we built, and one has a measured result we can print.",
    points: ["Phantom Arcades: WordPress, WooCommerce, configurator", "Atlas Peptides: a client site we built", "Phantom organic clicks up 92% year on year"],
    deepLabel: "the Phantom Arcades and Atlas builds",
    deep: (<>
      <p className="sf-rule">For Phantom Arcades we built the WordPress and WooCommerce store and its arcade configurator. In Google Search Console, organic clicks rose 92 percent year on year and non-brand clicks 231 percent. We report no revenue.</p>
      <p>Atlas Peptides is a client site we built. We make no further claim about it here.</p>
      <div className="sf-links"><Link className={L} to="/blog/seo-case-study-phantom-arcades/">Phantom Arcades SEO case study</Link></div>
    </>),
  },
  {
    id: "joins", title: "Joins to stock, payments and the ledger",
    lede: "Usually the fix is deciding which system is the source of truth, then making the others read from it.",
    lead: "A mistake in e-commerce is visible to a customer within the hour.",
    points: ["One source of truth per record", "Orders and inventory flow after checkout", "Payment and accounting systems reconciled"],
    deepLabel: "how an order flows through your systems",
    deep: (<>
      <p className="sf-rule">We trace an order from checkout through payment, stock, fulfilment and the ledger, and mark where the record changes shape. Each break gets an owner and a rule for which system wins.</p>
      <p><span className="sf-lead-in">What you get:</span> An integration that reports its own failures, and a map your next developer can read.</p>
      <div className="sf-links"><Link className={L} to="/services/salesforce-integration">Integration services</Link></div>
    </>),
  },
  {
    id: "support", title: "Zendesk that can see the order",
    lede: "We are a Zendesk partner, and we set up ticket flows connected to your store and CRM.",
    lead: "An agent who can see the order answers in one reply instead of three.",
    points: ["Ticket lifecycles, SLAs and macros", "Routing and escalation paths", "A help centre customers can use"],
    deepLabel: "Zendesk for an online retailer",
    deep: (<>
      <p className="sf-rule">We configure triggers, escalation, macros and routing, and structure the help centre so customers self-serve. Connected to Salesforce or your CRM, the agent sees the order behind the ticket.</p>
      <div className="sf-links"><Link className={L} to="/services/zendesk">Zendesk services</Link></div>
    </>),
  },
  {
    id: "limits", title: "What we are not",
    lede: "We have not built a Shopify store and hold no Shopify partnership.",
    lead: "We work on WooCommerce and custom builds, and on the systems around the store.",
    deepLabel: "platforms we do and do not work on",
    deep: (<>
      <p className="sf-rule">We hold no Shopify, BigCommerce or Adobe Commerce partnership, and a page that implied one would be easy to check. Sometimes a replatform is the right answer, and we will say so.</p>
      <p>Meet the four of us on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you build Shopify stores?", a: "No. We have not built a Shopify store and are not a Shopify partner. We build WooCommerce and custom stores and integrate the systems around them." },
  { q: "WooCommerce or Shopify: which should we use?", a: "It depends on the catalogue, the checkout rules and who will maintain it. We build WooCommerce, so we can tell you what it does well, and we will say when a hosted platform fits better.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "How much does an e-commerce site cost?", a: "Four things set it: the number of products and options, the checkout and payment rules, the integrations and the content. It is scoped in writing before work starts." },
  { q: "How long does an e-commerce build take?", a: "It is set by the catalogue size, integrations and how fast content arrives. We agree the schedule after listing those." },
  { q: "Can you connect the store to inventory and accounting?", a: "Yes. We build and maintain the integrations between store, stock, payments and ledger, after agreeing which system owns each record.", link: { to: "/services/salesforce-integration", label: "Integration services" } },
  { q: "Can you build a product configurator?", a: "Yes. We built the Phantom Arcades configurator on WordPress and WooCommerce. The effort depends on how many options interact.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Phantom Arcades case study" } },
  { q: "Will we own the store?", a: "Yes. The site, the accounts and the code are yours, and we hand over documentation." },
  { q: "Do you do SEO for online stores?", a: "Yes, as a general service. Our measured example is Phantom Arcades, where organic clicks rose 92 percent year on year.", link: { to: "/services/seo", label: "SEO services" } },
];

export default function ECommerce() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "ecommerce website development, woocommerce development, e-commerce systems integration, ecommerce Zendesk implementation, order and inventory integration, Malvern PA",
    ogTitle: TITLE,
    ogDescription: "The storefront is rarely the problem. We build WooCommerce stores and work on the joins behind them.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
  });

  return (
    <Layout>
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, `https://onealgorithm.com${PAGE_PATH}`, { dateModified: "2026-10-31" })} />
      <PageHero
        title={
          <>
            E-commerce: the store is rarely{" "}
            <span className="text-oa-orange">the broken part</span>
          </>
        }
        lede="What breaks is the joins. Stock that disagrees with the site, orders that reach the warehouse without the customer record, support agents who cannot see the order they are being asked about. That is the work we do for online retailers."
        panel={{
          title: "What that means in practice",
          items: [
            "Integrations between store, stock and ledger",
            "Zendesk set up and connected to your CRM",
            "The site itself, built and maintained",
            "Campaign and analytics plumbing",
            "One agreed source of truth per record",
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
        crumbs={[{ label: "E-Commerce" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        units={UNITS}
        facts={{
          heading: "E-commerce by the numbers",
          lede: "Online sales reached 17.1 percent of US retail in the second quarter of 2026.",
          rows: [
            { label: "US retail e-commerce, Q2 2026 (seasonally adjusted)", value: "$340.2 billion" },
            { label: "Share of total retail sales", value: "17.1%" },
            { label: "Change from Q2 2025", value: "+12.2%" },
            { label: "Electronic shopping and mail-order houses (NAICS 4541), 2023", value: "54,707 establishments" },
          ],
          read: "U.S. Census Bureau, read 31 October 2026",
          note: "The 54,707 count covers only retailers classed as online-only; most online sales come from stores classed elsewhere.",
          sources: [
            { name: "U.S. Census Bureau, Quarterly Retail E-Commerce Sales, Q2 2026", what: "Seasonally adjusted $340.2 billion, 17.1 percent of retail ($1,986.5 billion), up 12.2 percent year on year; the page carries a 28 September 2026 revision notice", read: "read 31 October 2026", page: "https://www.census.gov/retail/ecommerce.html" },
            { name: "U.S. Census Bureau, County Business Patterns 2023", what: "NAICS 4541, electronic shopping and mail-order houses: 54,707 establishments", read: "read 31 October 2026", page: "https://www.census.gov/programs-surveys/cbp.html" },
          ],
        }}
        faqHeading="E-commerce questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "E-commerce", need: "website",
          heading: "Tell us which two numbers never match",
          lede: "Stock on the site against stock in the warehouse, or orders in the store against orders in the ledger.",
          covers: ["Your platform and its version", "The two numbers that disagree", "Payment and accounting systems in use", "Peak season dates"],
        }}
      />
    </Layout>
  );
}
