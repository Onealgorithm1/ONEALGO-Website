import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, CaseBand, type IndUnit } from "../../components/v2/industries-Body";

/* Ecommerce. Hero kept; body rebuilt on the sf kit 2026-10-31, round 3 (seo-spec-b 4.11).
 * Named proof: Phantom Arcades (WooCommerce store + configurator; SEO case study; never the show name; no revenue)
 * and Atlas Peptides as "a client site we built" (no price, no claims). NOT claimed: Shopify (resolved Q8), white-label,
 * HubSpot, "WordPress" for Phantom (FC). Zendesk is "Zendesk partner", never "certified", and not as delivered.
 * Hero text change (fact-check): panel "Zendesk set up and connected to your CRM" -> "A help desk, such as Zendesk, that sees the order". */

const PAGE_PATH = "/industries/ecommerce";
const TITLE = "Ecommerce website development | One Algorithm";
const DESCRIPTION = "Ecommerce website development on WooCommerce and custom builds, joined to stock, payments and your accounting. Malvern, PA. Call (610) 890-9711.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "Ecommerce website development we do",
    lede: "We build WooCommerce and custom stores, and join them to the stock, payment and accounting systems behind them.",
    lead: "The store is rarely the broken part; what breaks is the joins to stock, payments and support.",
    points: ["Storefront builds on WooCommerce or custom", "Joins to stock, payments and the ledger", "Code, hosting and accounts in your name"],
    deepLabel: "what an ecommerce build covers",
    deep: (<>
      <p className="sf-rule">Stock that disagrees with the site, orders that reach the warehouse without the customer record, support agents who cannot see the order. That is the work: the store first, then the joins that keep one order looking like one order everywhere.</p>
      <p>A developer can also join your team for a peak season or a replatform. See <Link className={L} to="/services/application-development">custom software development</Link> and <Link className={L} to="/services/website-development">website development</Link>.</p>
    </>),
  },
  {
    id: "builds", title: "Stores we have built",
    lede: "Phantom Arcades runs on WooCommerce with a configurator; Atlas Peptides is a client site we built.",
    lead: "Both are client sites we built, and one has a measured result we can print.",
    points: ["Phantom Arcades: WooCommerce store and configurator", "Atlas Peptides: a client site we built", "Phantom Google clicks up 92% year on year"],
    deepLabel: "the Phantom Arcades and Atlas builds",
    deep: (<>
      <p className="sf-rule">For Phantom Arcades we built the WooCommerce store and its arcade configurator. In Google Search Console, clicks rose 92 percent year on year and non-brand clicks 231 percent. The result is clicks, not sales; we report no revenue.</p>
      <p>Atlas Peptides is a client site we built. We make no further claim about it here.</p>
      <div className="sf-links"><Link className={L} to="/blog/seo-case-study-phantom-arcades">Phantom Arcades SEO case study</Link><Link className={L} to="/blog/product-configurator-case-study-phantom-arcades">3D product configurator case study</Link></div>
    </>),
  },
  {
    id: "platform", title: "WooCommerce or a custom build?",
    lede: "WooCommerce suits most catalogues; a custom build suits unusual checkout or configuration rules.",
    lead: "We have built no Shopify store and hold no Shopify partnership, so we compare only what we build.",
    points: ["WooCommerce: faster, familiar, plugin-led", "Custom: when rules or options interact", "A replatform, when that is the honest answer"],
    deepLabel: "how we choose between them",
    deep: (<>
      <p className="sf-rule">The choice depends on the catalogue, the checkout rules and who will maintain the store. A product configurator with interacting options leans custom; a plain catalogue leans WooCommerce. If a hosted platform fits better, we will say so.</p>
      <div className="sf-links"><Link className={L} to="/services/website-development">Website development</Link></div>
    </>),
  },
  {
    id: "joins", title: "Joins to stock, payments and the ledger",
    lede: "The fix is deciding which system is the source of truth, then making the others read from it.",
    lead: "A mistake in ecommerce is visible to a customer within the hour.",
    points: ["Stock and inventory: one count everywhere", "Payments: the processor holds card data", "Accounting: orders reconciled to the ledger"],
    deepLabel: "how an order flows through your systems",
    deep: (<>
      <p className="sf-rule">We trace an order from checkout through payment, stock, fulfilment and the ledger, and mark where the record changes shape. Each break gets an owner and a rule for which system wins. PCI scope stays with your payment processor.</p>
      <p><span className="sf-lead-in">A help desk that sees the order:</span> we are a Zendesk partner (agreement signed 2026), so a help desk can be connected to the order. We claim no Zendesk delivery. See <Link className={L} to="/services/zendesk">Zendesk implementation</Link>.</p>
    </>),
  },
  {
    id: "cost", title: "What ecommerce website development costs",
    lede: "Cost follows five drivers, and we name no figure until we have seen your catalogue.",
    lead: "Scope is set in writing before any work starts.",
    points: ["Catalogue size and product options", "Integrations, payments and migration", "Content, support and maintenance"],
    deepLabel: "what moves the cost and the timeline",
    deep: (<>
      <p className="sf-rule">Catalogue size, integrations, payment rules, migration from another platform and support are what move both cost and timeline. We plan the schedule after discovery, because content often arrives slower than code.</p>
    </>),
  },
  {
    id: "limits", title: "Where our ecommerce experience stops",
    lede: "We have not built a Shopify store and hold no Shopify, BigCommerce or Adobe Commerce partnership.",
    lead: "We work on WooCommerce and custom builds, and on the systems around the store.",
    deepLabel: "platforms we do and do not work on",
    deep: (<>
      <p className="sf-rule">A page that implied a partnership would be easy to check. Sometimes a replatform is the right answer, and we will say so. The team that would build it is introduced on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you build Shopify stores?", a: "No. We have not built a Shopify store and are not a Shopify partner. We build on WooCommerce and custom code, and we integrate the systems around the store. If Shopify is the plan, we will tell you early that we are not the right team." },
  { q: "How long does an ecommerce website take?", a: "It depends on the catalogue, the integrations and the migration, and we set the plan only after discovery. Content usually arrives slower than code, so we agree dates for both in writing and report progress on the dates we agreed." },
  { q: "Can you connect the store to inventory and accounting?", a: "Yes, in principle. Integration is scoped per system, and stock, payments and the ledger are the usual three. We agree which system owns each record first, then build a sync that reports its own failures to a person. The sync is built to flag a failed order or stock update to a person, not drop it.", link: { to: "/services/application-development", label: "Custom software development" } },
  { q: "Can you build a product configurator?", a: "Yes. We built the Phantom Arcades 3D configurator, which turns a customer's choices into a clean order on WooCommerce. The effort depends on how many options interact, and we scope it in writing before work starts. The Phantom Arcades build is our reference example, and its blog case study shows how it works.", link: { to: "/blog/product-configurator-case-study-phantom-arcades", label: "3D product configurator case study" } },
  { q: "Will we own the store?", a: "Yes. The code, the hosting account and the payment accounts are in your name from day one, and we hand over documentation. If you leave us, nothing is held back, and another developer can pick the work up. That includes the domain, so you can move hosting or developers without asking us." },
  { q: "Do you do SEO for online stores?", a: "Yes, through our SEO service. Our measured example is Phantom Arcades, an online store where Google clicks rose 92 percent year on year. That result is clicks, not sales, and we make no revenue claim. Product and category page structure is usually the first thing we would look at.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "Can you migrate our store from another platform?", a: "It is a scoped project. We start with an inventory of the catalogue, customers and order history, then agree what moves and what is retired. We make no claim about past migrations, and we plan the redirects before launch. Order history and customer accounts are checked after the move, not assumed to have carried over.", link: { to: "/services/website-development", label: "Website development" } },
  { q: "How do payments work?", a: "Your payment processor holds the card data, and we connect the storefront to it. That keeps PCI scope with the processor. We set up checkout, refunds and reconciliation to the ledger, with the payment account in your name. Test orders run end to end before launch, so refunds and reconciliation are checked early." },
  { q: "Do you provide support after launch?", a: "Yes. Every build has a hypercare period right after go-live, followed by 24/7 technical support and maintenance. A person reads what you send, and the same team that built the store looks after it. Support starts at go-live, so there is no gap between the build and its upkeep." },
  { q: "What does an ecommerce build need from us?", a: "Your catalogue, brand assets, the accounting system, the payment provider and your shipping rules. If any of these are not ready, we say so in week one and plan around it, rather than discovering the gap at launch. A short checklist in the first week shows exactly which of these items are still missing." },
];

export default function ECommerce() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "ecommerce website development, ecommerce development company, woocommerce development, ecommerce web development, order and inventory integration, Malvern PA",
    ogTitle: TITLE,
    ogDescription: "The storefront is rarely the problem. We build WooCommerce and custom stores and work on the joins behind them.",
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
            "A help desk, such as Zendesk, that sees the order",
            "The site itself, built and maintained",
            "Campaign and analytics plumbing",
            "One agreed source of truth per record",
            "Senior developers added to your team",
          ],
          /* ⛔ WOSB/EDWOSB removed from commercial pages 2026-09-01 (Louis). */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
      <IndBody
        crumbs={[{ label: "Ecommerce" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        plate={{
          title: "Diagram: One source of truth per record",
          left: ["Store", "Stock and payments", "Ledger and help desk"], hub: ["What we do", "One source of truth per record"], right: ["Orders flow after checkout", "Payments reconciled", "Tickets that see the order"],
          caption: "A diagram of the work: the store and the systems behind it, joined by one source of truth per record.", stamp: "One source of truth per record",
        }}
        proof="seo"
        offer1={{ heading: "Which two numbers never match?", line: "Stock against the warehouse, or orders against the ledger. Tell us.", label: "Tell us which two numbers never match" }}
        offer2={{ heading: "Planning a store or a replatform?", line: "Tell us the catalogue and the systems; we say how we would approach it.", label: "Talk to a consultant" }}
        units={UNITS}
        after={{
          builds: (tone) => (
            <CaseBand id="work" tone={tone()} heading="Work we can show"
              lede="Two stores we built. One has a measured search result, and we print no revenue."
              cases={[
                { title: "An arcade manufacturer in Florida", built: "WooCommerce store and 3D product configurator.", result: "Google clicks +92%, non-brand +231% (Search Console)", to: "/blog/seo-case-study-phantom-arcades", linkLabel: "Read the SEO case study" },
                { title: "Atlas Peptides", built: "A client site we built. We make no further claim about it here." },
              ]} />
          ),
        }}
        facts={{
          heading: "Ecommerce by the numbers",
          lede: "Online sales reached 17.1 percent of US retail in the second quarter of 2026.",
          rows: [
            { label: "US retail ecommerce, Q2 2026 (seasonally adjusted)", value: "$340.2 billion" },
            { label: "Share of total retail sales", value: "17.1%" },
            { label: "Change from Q2 2025", value: "+12.2%" },
            { label: "Electronic shopping and mail-order houses (NAICS 4541), 2023", value: "54,707 establishments" },
          ],
          band: [
            { num: "$340.2", label: "billion: US retail ecommerce, Q2 2026 (seasonally adjusted)" },
            { num: "17.1%", label: "Share of total retail sales" },
            { num: "+12.2%", label: "Change from Q2 2025" },
            { num: "54,707", label: "Online-only retail establishments (NAICS 4541), 2023" },
          ],
          read: "U.S. Census Bureau, read 31 October 2026",
          note: "The 54,707 count covers only retailers classed as online-only; most online sales come from stores classed elsewhere. The Census page carries a 28 September 2026 revision notice; the Q3 release is due 19 November 2026.",
          sources: [
            { name: "U.S. Census Bureau, Quarterly Retail E-Commerce Sales, Q2 2026", what: "Seasonally adjusted $340.2 billion, 17.1 percent of retail ($1,986.5 billion), up 12.2 percent year on year; the page carries a 28 September 2026 revision notice", read: "read 31 October 2026", page: "https://www.census.gov/retail/ecommerce.html" },
            { name: "U.S. Census Bureau, County Business Patterns 2023", what: "NAICS 4541, electronic shopping and mail-order houses: 54,707 establishments", read: "read 31 October 2026", page: "https://www.census.gov/programs-surveys/cbp.html" },
            { name: "Google Search Console, Phantom Arcades property", what: "Google clicks 1,112 to 2,130 (+92%), non-brand 95 to 314 (+231%), 13 Aug to 19 Oct 2026 against the same 68 days in 2025; the client owns the property", read: "read 31 October 2026" },
          ],
        }}
        faqHeading="Ecommerce questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "Ecommerce", need: "website",
          heading: "Tell us which two numbers never match",
          lede: "Stock on the site against stock in the warehouse, or orders in the store against orders in the ledger.",
          covers: ["Your platform and its version", "The two numbers that disagree", "Payment and accounting systems in use", "Peak season dates"],
        }}
      />
    </Layout>
  );
}
