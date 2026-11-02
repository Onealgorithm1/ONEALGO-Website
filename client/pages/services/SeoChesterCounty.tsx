import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, DeskCTA, FAQ, StageRail,
  type SfFaqItem, type SfSource, type Station,
} from "../../components/sf";
import { SeoStyles, SeoCards, ProfilePlate, CountyBars, SeoPullQuote } from "../../components/v2/seo-Plates";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { CaseCard } from "../../components/v2/shared-CaseCard";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* SEO — Chester County. Added 2026-09-14; v2 body 2026-10-31.
 *
 * OUR BEST GSC PAGE: positions 7-12 on "seo company chester county", "chester county seo" (6.0), "affordable seo company
 * chester springs pa" (9.0) and similar. The TITLE, H1 and the winning phrases are KEPT; this rebuild strengthens them.
 * ⛔ Not a place-name swap of /services/seo (Google's scaled content abuse policy). This is the local half.
 * ⛔ One mention per idea; no town list (the web design page was cut from 24 town mentions for keyword stuffing).
 * ⛔ No local client proof, rankings, traffic or testimonials beyond the allowed: "5.0 from 6 Google reviews" (recount at go-live),
 *    and the Phantom case study linked as a general SEO result (not a Chester County one).
 * ⛔ No prices. Census figures: facts.json c-cbp-1, read 2026-10-31.
 */

const PAGE_PATH = "/services/seo-chester-county";
const PAGE_URL = "https://onealgorithm.com/services/seo-chester-county";
const TITLE = "SEO Company in Chester County, PA | SEO Services, Malvern";
const DESCRIPTION = "SEO company in Chester County, PA. Local SEO services from our Malvern office for Chester, Montgomery and Delaware County businesses. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/og-image.jpg";
const READ_ON = "31 October 2026";
const CASE = "/blog/seo-case-study-phantom-arcades";

const SOURCES: SfSource[] = [
  { name: "Google Business Profile Help", what: "Local results rest on relevance, distance and prominence; there is no way to request or pay for a better local ranking.", read: `read ${READ_ON}`, page: "https://support.google.com/business/answer/7091" },
  { name: "Google Search Central, SEO Starter Guide", what: "Some changes take effect in a few hours, others several months.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { name: "Google Search Central, Spam policies", what: "Keyword stuffing and scaled content abuse defined.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/essentials/spam-policies" },
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Chester County, PA, all sectors: 15,102 establishments; 12,796 (84.7%) with fewer than 20 employees. Professional, scientific and technical services: 2,464 establishments.", read: `read ${READ_ON}`, page: "https://www.census.gov/programs-surveys/cbp.html" },
  { name: "Google Search Console, Phantom Arcades", what: "Google clicks up 92% and non-brand clicks up 231% over the same 68 days a year earlier (13 August to 19 October 2026). A national result, not a Chester County one.", read: "as of 19 October 2026" },
  { name: "OneAlgorithm Consulting on Google", what: "5.0 from 6 Google reviews. Listing: computer consultant, Chester County, Malvern, PA.", read: `read ${READ_ON}` },
];

const FAQS: SfFaqItem[] = [
  { q: "What does local SEO cover?", a: "Local SEO covers your Google Business Profile, the primary category, hours, services and photos, a service area if you work at the customer's site, reviews asked for and answered, and a clear page for each service. Google ranks local results on relevance, distance and prominence, so each part works on one of those." },
  { q: "Is there an SEO company in Malvern, PA?", a: "Yes. Our office is on Swedesford Road in Malvern, inside Chester County. We take on Chester County businesses and serve neighboring counties from the same office. Call (610) 890-9711 to book an SEO audit, and see our Google Business Profile for the address and hours." },
  { q: "Do you do SEO for businesses in Chester Springs?", a: "Yes. We cover Chester Springs, Landenberg and the rest of Chester County from our Malvern office. The work starts with the same audit: your Business Profile, your service pages and what is stopping Google from showing you to people nearby. Nothing is promised in advance." },
  { q: "How long does local SEO take?", a: "Google says some changes might take effect in a few hours and others could take several months. A corrected Business Profile can move first; reviews and service pages build over a quarter or more. We report from your own Search Console, so you can see which change moved which number." },
  { q: "How much does local SEO cost?", a: "We scope local SEO in writing after the audit, because the work depends on your Business Profile, your service pages and how many competing businesses sit near you. We do not print a price list. The full explanation of what drives the cost is on our SEO services page.", link: { to: "/services/seo", label: "SEO services for small business" } },
  { q: "Is local SEO worth it for a small business?", a: "It is when people nearby search for what you sell. Google's local results use relevance, distance and prominence, so a complete Business Profile, honest reviews and a clear page per service put a small business in front of those searchers. No one can promise a map position; we show you what moved." },
  { q: "Should I show my address if customers do not come to me?", a: "Not if you work at the customer's site. Set a service area on your Business Profile instead of showing a street address, and keep the same business details everywhere they appear. We check which setting suits your business before changing anything on the profile." },
  { q: "Do I need a Business Profile if I already have a website?", a: "Yes, for map results. The local results come from your Business Profile, and Google says they rest on relevance, distance and prominence. Your website still matters, because it supplies the page for each service you want to be found for. The two work together." },
  { q: "Can you guarantee a spot in the Google map results?", a: "No. Google says there is no way to request or pay for a better local ranking, so anyone selling a guaranteed map position is guessing. We can set up the profile properly, collect and answer reviews and build clear service pages, then show you what moved.", link: { to: "/services/seo", label: "How we work on SEO" } },
  { q: "Do you do SEO in Montgomery County and Delaware County?", a: "Yes. Both border Chester County, and our Business Profile lists Bucks, Chester, Delaware and Montgomery counties, Philadelphia, and New Castle County, Delaware as the service area. Our office is in Malvern and most SEO work runs remotely. For the national method, see our SEO services page." },
];

const LOCAL_CARDS = [
  { id: "profile", k: "Map results", t: "Your Business Profile, set up properly", lede: "For a local business the map results come from the profile, so we set it up before anything else.", lead: "Its reviews and details are often worth more than anything on the website itself.", deep: "Hours, services, photos and a description that says what you do. Google ranks local results on relevance, distance and prominence, and says there is no way to request or pay for a better local ranking." },
  { id: "category", k: "First check", t: "The right primary category", lede: "Google uses your primary category to match you to searches, so it is the first thing we check.", lead: "Choosing it well is the first job on the profile.", deep: "Choose the category that names the core business, not every service you offer." },
  { id: "service-area", k: "Service-area businesses", t: "If customers do not come to you", lede: "A business that works at the customer's site should hide its address and set a service area.", lead: "We check which setting suits your business before changing anything.", deep: "If your van, crew or consultant goes to the customer, show where you serve rather than a street address. If customers visit you, show the address." },
  { id: "reviews", k: "Reviews", t: "Reviews where they count", lede: "We set up a simple way to ask every customer for a Google review, and a short, specific reply to each.", lead: "Honest reviews, answered by name, are what we set up.", deep: "Ask at the moment the customer is happiest, and reply by name to what they said." },
  { id: "pages", k: "Pages", t: "Pages for what you actually sell", lede: "One plain page per service people search for, and a place page only where you really serve that area.", lead: "Never a block of place names in the footer.", deep: "A place page earns its slot only when it has something specific to say about that area. Near-identical pages for each town are what Google's scaled content abuse policy targets." },
  { id: "details", k: "Consistency", t: "Consistent details everywhere", lede: "The same name, address and phone number on your site, your profile and the main directories.", lead: "Nobody should find an old number or a wrong address for your business.", deep: "We check the site, the Business Profile and the main directories against one written version of your name, address and phone number, and correct the ones that drift." },
];

const STATIONS: Station[] = [
  { k: "s1", num: "01", title: "Check what Google sees", short: "Check", sub: "crawled · indexed · ranked" },
  { k: "s2", num: "02", title: "Audit site and profile", short: "Audit", sub: "crawl · rankings · profile" },
  { k: "s3", num: "03", title: "Fix the Business Profile", short: "Profile", sub: "category · hours · area" },
  { k: "s4", num: "04", title: "One page per service", short: "Pages", sub: "plain, specific" },
  { k: "s5", num: "05", title: "Details match everywhere", short: "Details", sub: "name · address · phone" },
  { k: "s6", num: "06", title: "Reviews, then report", short: "Report", sub: "your own accounts" },
];

const STEP_TEXT = [
  ["Check what Google can see", "Before proposing anything we look in Search Console: has Google crawled the page, crawled it and chosen not to index it, or indexed it and ranked it too low to see? Content work waits until Google can crawl and index the page."],
  ["Audit the site and the profile", "A crawl of your site, what you rank for now, a look at your Business Profile, and a prioritized list of fixes. The first few are usually things you can do without us."],
  ["Fix the Business Profile", "The primary category, your hours, services, photos and description, and a service area instead of an address if you work at the customer's site."],
  ["Write one page per service", "A plain page for each thing people search for, and a place page only where you really serve that area and have something specific to say about it."],
  ["Make your details match everywhere", "The same name, address and phone number on the site, the profile and the main directories."],
  ["Set up reviews, then report", "A simple way to ask every customer for a review and reply to each one, and reporting from your own Search Console, so you can check the numbers without taking our word for them."],
];

export default function SeoChesterCounty() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Local SEO in Chester County, Pennsylvania",
          "Local search engine optimization for businesses in Chester County, Pennsylvania, from an office in Malvern: Google Business Profile setup, review requests, service pages, consistent business details and technical fixes, reported from the client's own Search Console.",
          "Search Engine Optimization",
          PAGE_URL,
          { areaServed: ["Chester County, PA", "Bucks County, PA", "Delaware County, PA", "Montgomery County, PA", "Philadelphia, PA", "New Castle County, DE"].map((n) => ({ "@type": "AdministrativeArea", name: n })) },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: "2026-11-01" })} />
      <StructuredData data={createLocalBusinessSchema()} />

      {/* HERO: 2026-11-01 (SEO round 2) the H1 keeps "SEO company in Chester County" and adds ", PA" + "SEO services";
          the lede names Montgomery and Delaware County (GBP service area). GSC Oct: 33 queries at positions 4-20. */}
      <PageHero
        eyebrow="Chester County · Malvern, PA"
        title={
          <>
            SEO company in Chester County, PA —{" "}
            <span className="text-oa-orange">SEO services from Malvern</span>
          </>
        }
        lede="SEO services for businesses in Chester County and neighboring Montgomery and Delaware County, from our office on Swedesford Road in Malvern. For a local business, being found on Google means the map results as well as the ordinary listings, and the map results come from your Business Profile. We work on both: the profile, your reviews, and pages that say plainly what you do."
        panel={{
          title: "What local SEO covers",
          items: [
            "Google Business Profile set up properly",
            "The right primary category and service area",
            "Reviews asked for, and answered",
            "One clear page per service",
            "Reporting from your own accounts",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact#need=seo" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <SfPage crumbs={[{ label: "SEO services", to: "/services/seo" }, { label: "Chester County" }]}>
        <SeoStyles />

        {/* 1 HAND-OFF: Business Profile plate */}
        <SmartSection
          id="what"
          tone="surface"
          heading={{
            id: "h-what",
            title: "An SEO company in Chester County, PA",
            lede: "We are an SEO company in Malvern that helps Chester County businesses get found on Google's map results and ordinary listings.",
          }}
        >
          <ProfilePlate />
          <div style={{ marginTop: 28 }}><ProofStrip variant="local" /></div>
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
          <p className="sf-lead sf-measure" style={{ marginTop: 28 }}><span className="sf-lead-in">Why it matters:</span> Being inside the county means we know the area and can be at your door, not driving in.</p>
          <GoDeeper label="what local SEO means here">
            <p className="sf-rule">
              Local SEO is the part of SEO that depends on being local: the Business Profile, reviews, service area and a clear page for each thing you sell. The technical work (crawl errors, slow pages, duplicate titles) is the same anywhere, and it is covered on our main SEO page.
            </p>
            <div className="sf-links">
              <Link className="sf-link" to="/services/seo">SEO services for small business</Link>
              <Link className="sf-link" to="/services/web-design-chester-county">web design in Chester County</Link>
            </div>
          </GoDeeper>
        </SmartSection>

        <OfferBand heading="Want your Business Profile checked?" line="Tell us your business and where you serve." label="Book an SEO audit" />

        {/* 2 THE LOCAL HALF: lift cards */}
        <SmartSection
          id="local-half"
          tone="paper"
          heading={{
            id: "h-local-half",
            title: "The local half of SEO",
            lede: "Six jobs depend on being local, and each is a practice Google documents for Business Profiles.",
          }}
        >
          <SeoCards items={LOCAL_CARDS.map((c) => ({ ...c, id: c.id === "profile" ? "local" : c.id === "category" ? "technical" : c.id === "service-area" ? "links" : c.id === "reviews" ? "reporting" : c.id === "pages" ? "content" : "ai" }))} cardId="lj" />
          <GoDeeper label="the detail behind each job">
            <dl className="sf-rule">
              {LOCAL_CARDS.map((c) => (
                <div key={c.id} style={{ marginTop: 12 }}>
                  <dt style={{ fontWeight: 600 }}>{c.t}</dt>
                  <dd style={{ margin: 0 }}>{c.deep}</dd>
                </div>
              ))}
            </dl>
          </GoDeeper>
        </SmartSection>

        {/* 3 STEPS: rail */}
        <SmartSection
          id="steps"
          tone="surface"
          heading={{
            id: "h-steps",
            title: "Working with an SEO company in Chester County",
            lede: "The order matters: no new pages for a site Google cannot index, and no review drive on a profile in the wrong category.",
          }}
        >
          <div style={{ marginTop: 36 }}>
            <StageRail
              fig={2}
              sample={false}
              stations={STATIONS}
              title="Diagram of six local SEO steps in order"
              desc="A rail runs through six stations: check what Google sees, audit, fix the profile, one page per service, matching details, reviews and reporting."
              stamp="Local SEO, in order"
              caption="The first few audit items are usually things you can do without us."
            />
          </div>
          <GoDeeper label="what happens in each step">
            <ol className="sf-rule">{STEP_TEXT.map(([t, d]) => <li key={t} style={{ marginTop: 8 }}><strong>{t}.</strong> {d}</li>)}</ol>
          </GoDeeper>
          <h3 className="sf-h3" id="h-measured" style={{ marginTop: 32 }}>What we have measured: Phantom Arcades</h3>
          <p className="sf-measure" style={{ marginBottom: 16 }}>On a client site we rebuilt for search, Google clicks rose 92% and non-brand clicks 231% over the same 68 days a year earlier.</p>
          <div style={{ maxWidth: 420 }}><CaseCard title="Phantom Arcades" built="A rebuild for search, on a client site" result="Clicks +92%, non-brand +231% (Search Console)" to={CASE} linkLabel="Phantom Arcades SEO case study" /></div>
        </SmartSection>

        <OfferBand heading="Ready for the audit?" line="A person at OneAlgorithm reads it and replies." label="Book an SEO audit" />

        {/* 4 MARKET: chart + proof */}
        <SmartSection id="market" tone="paper" grid labelledBy="h-market">
          <SmartUnit
            className="sf-c5"
            headingId="h-market"
            leadIn="By the numbers:"
            title="Chester County's small businesses"
            lede="Chester County has 15,102 business establishments, and 84.7% of them employ fewer than 20 people."
            lead="Small businesses compete on the map results and a clear page per service, which is exactly what local SEO works on."
          >
            <GoDeeper label="what the number means for you">
              <p className="sf-rule">Most firms in the county are small, so the competition for a local search is often another small firm with a profile and a few reviews. A complete, accurate profile and a plain page per service is enough to compete. Google says some changes take effect in a few hours and others take several months.</p>
            </GoDeeper>
          </SmartUnit>
          <CountyBars />
        </SmartSection>

        {/* 5 PROOF + WHERE: pull band */}
        <SmartSection id="where" tone="night" grid labelledBy="h-where">
          <div style={{ gridColumn: "1 / -1" }}>
            <h2 className="sf-h2" id="h-where">Across Chester County and next door</h2>
            <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">We work across Chester County, in neighboring Montgomery and Delaware County, and remotely anywhere in the US.</p>
          </div>
          <SeoPullQuote
            statement="Chester County in person, next door and remote."
            chips={["Bucks County", "Delaware County", "Montgomery County", "Philadelphia", "New Castle County, Delaware"]}
          />
          <div style={{ gridColumn: "1 / -1", marginTop: 28 }} className="sf-links">
            <Link className="sf-link" to="/services/seo">SEO services for small business</Link>
            <Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads management in Philadelphia</Link>
            <Link className="sf-link" to="/services/web-design-chester-county">web design in Chester County</Link>
          </div>
        </SmartSection>

        {/* OFFICE */}
        <SmartSection
          id="office"
          tone="surface"
          heading={{ id: "h-office", title: "Our Malvern office", lede: "Our office is on Swedesford Road in Malvern, inside Chester County." }}
        >
          <address className="sf-measure" style={{ fontStyle: "normal" }}>
            <p><strong>OneAlgorithm</strong><br />Malvern, PA<br /><a href="tel:+16108909711">(610) 890-9711</a></p>
            <p><a className="sf-link" href="tel:+16108909711" style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}>(610) 890-9711</a></p>
          </address>
          <p className="sf-mono">5.0 from 6 Google reviews, read {READ_ON}.</p>
        </SmartSection>

        {/* FAQ */}
        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Chester County local SEO questions</h2>
            <p style={{ marginTop: 12 }}>Not here? <Link className="sf-link" to="/contact#need=seo">Ask us on the contact page</Link>.</p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        {/* ONE SOURCES LINE */}
        <section className="sf-section sf-section-compact" aria-label="Sources">
          <div className="sf-wrap">
            <p className="sf-mono">Every figure and statement on this page: <Verify id="sources">Sources</Verify></p>
          </div>
        </section>
        <SourcesDialog id="sources" title="Sources for this page" sources={SOURCES} />

        {/* CTA LAST */}
        <DeskCTA
          hcLink={false}
          heading="Get an SEO audit in Chester County"
          lede="Tell us your business and where you serve, and we tell you what we would fix first."
          coversLabel="What the audit covers"
          covers={[
            "A crawl of your site and what Google can see",
            "What you rank for now",
            "A look at your Business Profile",
            "A prioritized list of fixes, the first few doable without us",
          ]}
          next={["Call, or send the contact page.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would fix first."]}
          form={{
            topic: "seo-chester-county",
            topicLabel: "SEO in Chester County",
            heading: "Get an SEO audit",
            prompt: "Your business and where you serve.",
            submitLabel: "Get an SEO audit",
            need: "seo",
          }}
        />
      </SfPage>
    </Layout>
  );
}
