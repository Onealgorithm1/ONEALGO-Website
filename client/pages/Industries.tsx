import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { PageHero } from "../components/site";
import { Building2, Factory, ShoppingCart, Landmark, Megaphone } from "lucide-react";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createWebPageSchema } from "../components/StructuredData";
import { SmartSection, SmartUnit, type SfFaqItem } from "../components/sf";
import { IndBody, CaseBand, CBP, type IndUnit } from "../components/v2/industries-Body";

/* Industries hub. Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group), round 3 applied.
 * Signpost to FIVE pages, honest about scope: "We are not a sector specialist". WOSB/EDWOSB is NOT mentioned here
 * (the 2026-09-01 removal from commercial pages stands; it lives on /industries/government and /capabilities).
 * The cards are read off INDUSTRIES, which also feeds the hero panel, so they cannot disagree.
 * Hero text changes (fact-check / seo-spec-b 4.8): "six" -> "five" in the H1 and lede; the sixth panel item (website
 * development by industry, retired by 301) is gone. */

const INDUSTRIES = [
  { icon: Building2, title: "Construction", h3: "Construction software integration", body: "Connecting the field app, the estimating tool and the accounting package a firm already bought, so a job number means one thing in all three.", to: "/industries/construction" },
  { icon: Factory, title: "Manufacturing", h3: "Manufacturing ERP integration", body: "ERP, reporting and integration work behind the plant, with a plain account of what we have not done on the floor.", to: "/industries/manufacturing" },
  { icon: ShoppingCart, title: "Ecommerce", h3: "Ecommerce website development", body: "WooCommerce and custom store builds, and the joins between the store and stock, payments and the ledger.", to: "/industries/ecommerce" },
  { icon: Landmark, title: "Government", h3: "Government IT services", body: "Set-aside eligible and SAM registered, with identifiers and NAICS codes published for market research.", to: "/industries/government" },
  { icon: Megaphone, title: "Marketing", h3: "Technology for marketing teams", body: "Not an industry, and the page says so. A short signpost to the social media, MarTech and SEO service pages.", to: "/industries/marketing" },
];

const TITLE = "Industries we serve: IT and web by sector | OneAlgorithm";
const DESCRIPTION = "IT, integration and web work for construction, manufacturing, ecommerce and government firms, plus marketing teams. Malvern, PA. Call (610) 890-9711.";

const UNITS: IndUnit[] = [
  {
    id: "sectors", title: "Four sectors, one function",
    lede: "One small consultancy does the same integration, platform and web work in every sector.",
    lead: "Four pages describe sectors; marketing is a function every business has, so its page points to the service pages.",
    points: ["Construction, manufacturing, ecommerce, government", "Marketing is a function, not a sector", "Each page says what we have not done"],
    deepLabel: "how the five pages are organised",
    deep: (<>
      <p className="sf-rule">We are not a sector specialist and these are not five practices. Each page says plainly how the work lands in that industry, and the marketing page is kept short and points at the service pages that own the detail.</p>
      <p>Looking for a service rather than a sector? Start with <Link className="sf-link" to="/services">our services</Link>, or go straight to <Link className="sf-link" to="/services/website-development">website development</Link>.</p>
    </>),
  },
  {
    id: "limits", title: "Where our experience stops",
    lede: "We have no construction case study, no manufacturing plant project and no government award.",
    lead: "Our named proof is Phantom Arcades, where organic clicks rose 92 percent year on year.",
    points: ["Ecommerce: Phantom Arcades and Atlas Peptides builds", "Government: eligibility, not past performance", "Everything else is stated as capability"],
    deepLabel: "what each page claims and does not claim",
    deep: (<>
      <p className="sf-rule">A page that implies work we have not done is easy to check and embarrassing to be caught at. So each industry page lists what we do and what we do not.</p>
      <p>Phantom Arcades is the one measured result we print, with its method on the case study.</p>
      <div className="sf-links"><Link className="sf-link" to="/blog/seo-case-study-phantom-arcades">Phantom Arcades SEO case study</Link><Link className="sf-link" to="/about">About us</Link></div>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Which industries do you serve?", a: "We have five industry pages: construction, manufacturing, ecommerce and government, plus one for marketing teams. The same four-person team does the integration, platform and web work in each. If your sector is not listed, the systems are usually the same, so start from the problem on our services page.", link: { to: "/services", label: "All services" } },
  { q: "Are you a construction or manufacturing specialist?", a: "No. We are a small IT consultancy that connects systems, builds websites and implements Salesforce. The construction and manufacturing pages say where that work lands and, just as plainly, what we have not done there. Tell us the two systems that disagree and we will say whether we fit." },
  { q: "Do you have industry case studies?", a: "One measured result: for Phantom Arcades, an ecommerce store we built, Google clicks rose 92 percent and non-brand clicks 231 percent year on year, read from Search Console. We have no construction or manufacturing case study, and we say so rather than imply one.", link: { to: "/blog/seo-case-study-phantom-arcades", label: "Phantom Arcades case study" } },
  { q: "Can you work with government agencies?", a: "We are registered in SAM.gov and certified by the SBA, which makes us eligible for set-aside work. We have not been awarded a government contract and hold no security clearance. The government page lists every identifier a contracting officer can check.", link: { to: "/industries/government", label: "Government IT services" } },
  { q: "Do you build ecommerce stores?", a: "Yes, on WooCommerce and custom builds, joined to stock, payments and your accounting system. We have not built a Shopify store and hold no Shopify partnership, so if Shopify is the plan we will tell you early that we are not the right team.", link: { to: "/industries/ecommerce", label: "Ecommerce website development" } },
  { q: "Where are you based?", a: "We are based in Malvern, Pennsylvania, and you can reach us on (610) 890-9711. Most work is remote across the United States, with in-person sessions when a project calls for them. The office address and hours are on the contact page.", link: { to: "/contact", label: "Contact us" } },
  { q: "What if my industry is not listed?", a: "The same services still apply. Integration, Salesforce, websites and SEO do not change much from one sector to the next; what changes is the system on the other end. Start from the problem on our services page, or send us a note and we will say which service fits.", link: { to: "/services", label: "Services" } },
  { q: "Can you add a developer or analyst to our team during a project?", a: "Yes. Developers, integration engineers and analysts can work inside your team for a sprint or a year, on your tools. We scope the role and the length in writing first, and the same people stay on from start to finish.", link: { to: "/services/staff-augmentation", label: "IT staff augmentation" } },
  { q: "Do you sell white-label web development to agencies?", a: "No. We work under our own name with the clients we serve directly, and we do not sell white-label web development. If you are an agency that needs a partner for a specific integration, send us the details and we will say plainly whether it fits.", link: { to: "/services/website-development", label: "Website development" } },
];

export default function Industries() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl("/industries"),
    keywords: "industries we serve, construction software integration, manufacturing ERP integration, ecommerce website development, government IT services, technology for marketing teams, Malvern PA",
    ogTitle: TITLE,
    ogDescription: "Construction, manufacturing, ecommerce and government, plus marketing teams, and a plain account of where our experience stops.",
    ogUrl: getCanonicalUrl("/industries"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: "Construction, manufacturing, ecommerce and government, plus marketing teams, and a plain account of where our experience stops.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });
  return (
    <Layout>
      {/* Hub = CollectionPage + ItemList of the 5 children (seo-spec-b 4.8). dateModified matches the visible "Updated" line. */}
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, "https://onealgorithm.com/industries", { dateModified: "2026-10-31" })} />
      <StructuredData data={{
        "@context": "https://schema.org", "@type": "CollectionPage", name: TITLE, url: "https://onealgorithm.com/industries", dateModified: "2026-10-31",
        mainEntity: { "@type": "ItemList", itemListElement: INDUSTRIES.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.h3, url: `https://onealgorithm.com${x.to}` })) },
      }} />
      <PageHero
        title={
          <>
            The same consultancy,{" "}
            <span className="text-oa-orange">in five different rooms</span>
          </>
        }
        lede="We are not a sector specialist and these are not five practices. It is one small IT consultancy doing the same integration, platform and web work, and each page below says plainly how that lands in that industry — and what we have not done there."
        // The panel is the same five verticals the grid below lists, read off the
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
        plate={{
          title: "Diagram: Same work, five rooms",
          left: ["Construction", "Manufacturing", "Ecommerce and government"], hub: ["One consultancy", "Same work, five rooms"], right: ["Integration", "Platform work", "Web work"],
          caption: "A diagram of the hub: the sectors on the left, the same kind of work on the right.", stamp: "Same work, five rooms",
        }}
        proof="all"
        offer1={{ heading: "Not sure which page is yours?", line: "Tell us the systems you run and the problem; we say which service fits.", label: "Talk to a consultant" }}
        offer2={{ heading: "Bring the system that is slowing you down", line: "A short call to see whether we fit, including when we do not.", label: "Talk to a consultant" }}
        units={UNITS}
        childrenFirst
        after={{
          sectors: (tone) => (
            <CaseBand id="work" tone={tone()} heading="Work we can show by sector"
              lede="Construction and government have no client work to show, and we say so. These are sites we built."
              cases={[
                { title: "An arcade manufacturer in Florida", built: "WooCommerce store and 3D product configurator, with a measured search result.", result: "Google clicks +92% year on year (Search Console)", to: "/blog/seo-case-study-phantom-arcades", linkLabel: "Read the SEO case study" },
                { title: "Atlas Peptides", built: "A client site we built. We make no further claim about it here." },
                { title: "The Boards Professor", built: "A site we built for a tutoring business. No results claimed." },
                { title: "Gorband", built: "A client site we built, with social media managed on the accounts the client owns." },
              ]} />
          ),
        }}
        facts={{
          heading: "Our sectors by the numbers",
          lede: "The US counts 814,557 construction and 284,452 manufacturing establishments, and ecommerce is 17.1 percent of retail.",
          rows: [
            { label: "Construction establishments (NAICS 23), 2023", value: "814,557" },
            { label: "Manufacturing establishments (NAICS 31-33), 2023", value: "284,452" },
            { label: "US retail ecommerce share, Q2 2026", value: "17.1%" },
            { label: "Small business share of prime awards, FY2025", value: "27.58%" },
          ],
          band: [
            { num: "814,557", label: "Construction establishments (NAICS 23), 2023" },
            { num: "284,452", label: "Manufacturing establishments (NAICS 31-33), 2023" },
            { num: "17.1%", label: "Ecommerce share of US retail, Q2 2026" },
            { num: "27.58%", label: "Small business share of federal prime awards, FY2025" },
          ],
          read: "U.S. Census Bureau and CRS quoting SBA, read 31 October 2026",
          sources: [
            { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Establishments, NAICS 23 construction (814,557) and NAICS 31-33 manufacturing (284,452), United States, released 26 June 2025", read: "read 31 October 2026", page: CBP },
            { name: "U.S. Census Bureau, Quarterly Retail E-Commerce Sales, Q2 2026", what: "Seasonally adjusted $340.2 billion, 17.1 percent of retail, up 12.2 percent year on year; the page carries a 28 September 2026 revision notice", read: "read 31 October 2026", page: "https://www.census.gov/retail/ecommerce.html" },
            { name: "Congressional Research Service, In Focus IN12018 (30 June 2026), quoting the SBA FY2025 scorecard", what: "Small businesses won 27.58 percent of federal prime awards in fiscal 2025. The SBA scorecard page itself was not opened; the figure is as quoted by CRS.", read: "read 31 October 2026", page: "https://www.everycrsreport.com/files/2026-06-30_IN12018_6f51fa7436a86cc7af2612ae5a6aeea0ce180c18.html" },
            { name: "Google Search Console, Phantom Arcades property", what: "Google clicks 1,112 to 2,130 (+92%) over 13 Aug to 19 Oct 2026 against the same 68 days in 2025; the client owns the property", read: "read 31 October 2026" },
          ],
        }}
        faqHeading="Industry questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "Industries", need: "contact",
          heading: "Tell us what you are trying to fix",
          lede: "Bring the system slowing you down, or the role you cannot fill. We will say what it would take, including when it is not worth doing.",
          covers: ["Your industry and the systems involved", "The report built by hand today", "What a wrong number costs you", "Your timeline"],
        }}
      >
        <SmartSection id="pages" tone="paper" grid heading={{ id: "h-pages", title: "Industries we serve", lede: "Each card links to the page that owns the detail." }}>
          {INDUSTRIES.map((x, i) => (
            <SmartUnit key={x.title} level={3} className="sf-c4" delay={(i % 3) * 0.08} measure={false} title={x.h3} lede={x.body}>
              <p><Link className="sf-link" to={x.to}>{x.h3}<span className="sr-only"> page</span></Link></p>
            </SmartUnit>
          ))}
        </SmartSection>
      </IndBody>
    </Layout>
  );
}
