import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, LedgerRule, GoDeeper, EvidenceDialog, SourcesDialog, Verify, DeskCTA, FAQ,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
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
const TITLE = "SEO Company in Chester County, PA | Malvern | OneAlgorithm";
const DESCRIPTION = "SEO services for Chester County, PA businesses, from a Malvern office. Google Business Profile, reviews and technical fixes. See what we fix first.";
const OG_IMAGE = "https://onealgorithm.com/og-image.jpg";
const READ_ON = "31 October 2026";
const CASE = "/blog/seo-case-study-phantom-arcades/";

const LOCAL_JOBS = [
  { id: "profile", k: "Map results", t: "Your Business Profile, set up properly", lede: "For a local business the map results come from the profile, so we set it up before anything else.", lead: "Its reviews and details are often worth more than anything on the website itself.", deep: "Hours, services, photos and a description that says what you do. Google ranks local results on relevance, distance and prominence, and says there is no way to request or pay for a better local ranking. That is why the profile has to be right rather than boosted." },
  { id: "category", k: "First check", t: "The right primary category", lede: "Google uses your primary category to match you to searches, so it is the first thing we check.", lead: "Google's guidance is as few categories as possible, describing the core business.", deep: "Choose the category that names the core business, not every service you offer. Extra categories dilute the match instead of widening it." },
  { id: "service-area", k: "Service-area businesses", t: "If customers do not come to you", lede: "A business that works at the customer's site should hide its address and set a service area.", lead: "That is Google's rule for service-area businesses, and a profile that breaks it can be suspended.", deep: "If your van, crew or consultant goes to the customer, show where you serve rather than a street address. If customers visit you, show the address." },
  { id: "reviews", k: "Reviews", t: "Reviews where they count", lede: "We set up a simple way to ask every customer for a Google review, and a short, specific reply to each.", lead: "Google does not show star ratings in search for review markup a business adds to its own site.", deep: "Reviews on your Business Profile are a different property from reviews on your own pages, and for most local firms they are worth more. Ask at the moment the customer is happiest, and reply by name to what they said." },
  { id: "pages", k: "Pages", t: "Pages for what you actually sell", lede: "One plain page per service people search for, and a place page only where you really serve that area.", lead: "Never a block of place names in the footer; Google calls that keyword stuffing.", deep: "A place page earns its slot only when it has something specific to say about that area. Near-identical pages for each town are what Google's scaled content abuse policy targets." },
  { id: "details", k: "Consistency", t: "Consistent details everywhere", lede: "The same name, address and phone number on your site, your profile and the main directories.", lead: "Nobody should find an old number or a wrong address for your business.", deep: "We check the site, the Business Profile and the main directories against one written version of your name, address and phone number, and correct the ones that drift." },
];

const STEPS = [
  { t: "Check what Google can see", d: "Before proposing anything we look in Search Console: has Google crawled the page, crawled it and chosen not to index it, or indexed it and ranked it too low to see? Those three have different fixes, and two of them make content work pointless until they are sorted." },
  { t: "Audit the site and the profile", d: "A crawl of your site, what you rank for now, a look at your Business Profile, and a prioritized list of fixes. The first few are usually things you can do without us." },
  { t: "Fix the Business Profile", d: "The primary category, your hours, services, photos and description, and a service area instead of an address if you work at the customer's site." },
  { t: "Write one page per service", d: "A plain page for each thing people search for, and a place page only where you really serve that area and have something specific to say about it." },
  { t: "Make your details match everywhere", d: "The same name, address and phone number on the site, the profile and the main directories." },
  { t: "Set up reviews, then report", d: "A simple way to ask every customer for a review and reply to each one, and reporting from your own Search Console, so you can check the numbers without taking our word for them." },
];

const SOURCES: SfSource[] = [
  { name: "Google Business Profile Help", what: "Local results rest on relevance, distance and prominence; there is no way to request or pay for a better local ranking.", read: `read ${READ_ON}`, page: "https://support.google.com/business/answer/7091" },
  { name: "Google Search Central, SEO Starter Guide", what: "Some changes take effect in a few hours, others several months.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { name: "Google Search Central, Spam policies", what: "Keyword stuffing and scaled content abuse defined.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/essentials/spam-policies" },
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Chester County, PA, all sectors: 15,102 establishments; 12,796 (84.7%) with fewer than 20 employees. Professional, scientific and technical services: 2,464 establishments.", read: `read ${READ_ON}`, page: "https://www.census.gov/programs-surveys/cbp.html" },
];

const FAQS: SfFaqItem[] = [
  { q: "What does local SEO cover?", a: "Your Google Business Profile set up properly, the right primary category and service area, reviews asked for and answered, one clear page per service, and reporting from your own accounts." },
  { q: "Why does my Google Business Profile matter so much?", a: "For a local business the map results come from the profile, and its reviews and details are often worth more than anything on the website itself." },
  { q: "Should I show my address if customers do not come to me?", a: "No. A business that works at the customer's site should hide its address and set a service area instead. That is Google's rule for service-area businesses, and Google can suspend a profile that breaks its guidelines." },
  { q: "Is there an SEO company in Malvern, PA?", a: "Yes. Our office is on Swedesford Road in Malvern, and we do local SEO for Chester County businesses: the Google Business Profile, reviews, one clear page per service, and reporting from your own accounts." },
  { q: "Do you do SEO for businesses in Chester Springs?", a: "Yes. Chester Springs is a short drive from our Malvern office. For a business that works at the customer's property, the first fix is usually the Business Profile: a service area instead of a street address, and the right primary category." },
  { q: "How long does local SEO take, and what does it cost?", a: "Google says some changes register within hours and others take months, and suggests waiting a few weeks before judging any of it. Technical fixes usually move fastest. We do not publish a price, because it depends on what the audit finds; ask and we will tell you what we would do first." },
  { q: "Do you work outside Chester County?", a: "Yes: next door in the neighboring counties, and anywhere in the US remotely, which is how most SEO work runs anyway. We are inside Chester County rather than driving in." },
  { q: "Can you guarantee a spot in the Google map results?", a: "No. Google says there is no way to request or pay for a better local ranking, so anyone promising one is guessing. What we can do is make the profile accurate, complete and reviewed, and show you the numbers.", link: { to: "/services/seo", label: "How we work on SEO" } },
  { q: "Do I need a Business Profile if I already have a website?", a: "Yes, if you want to appear in the map results. They are separate properties: the website is read for the ordinary listings, and the profile feeds the map." },
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
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL)} />
      <StructuredData data={createLocalBusinessSchema()} />

      {/* HERO KEPT EXACTLY AS BEFORE (H1 and phrases are what ranks). */}
      <PageHero
        eyebrow="Chester County · Malvern, PA"
        title={
          <>
            SEO in Chester County —{" "}
            <span className="text-oa-orange">found by the people nearby</span>
          </>
        }
        lede="SEO for Chester County businesses, from our office on Swedesford Road in Malvern. For a local business, being found on Google means the map results as well as the ordinary listings, and the map results come from your Business Profile. We work on both: the profile, your reviews, and pages that say plainly what you do."
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
        primary={{ label: "Talk to an Expert", to: "/contact?need=seo" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <SfPage crumbs={[{ label: "SEO services", to: "/services/seo" }, { label: "Chester County" }]}>
        {/* 1 DEFINITION */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="An SEO company in Chester County, PA"
            lede="We are an SEO company in Malvern that helps Chester County businesses get found on Google's map results and ordinary listings."
            lead="Being inside the county means we know the area and can be at your door, not driving in."
          >
            <GoDeeper label="what local SEO means here">
              <p className="sf-rule">
                Local SEO is the part of SEO that depends on being local: the Business Profile, reviews, service area and a clear page for each thing you sell. The technical work (crawl errors, slow pages, duplicate titles) is the same anywhere, and it is covered on our main SEO page. This page is the local half.
              </p>
              <div className="sf-links">
                <Link className="sf-link" to="/services/seo">SEO services</Link>
                <Link className="sf-link" to="/services/web-design-chester-county">Web design in Chester County</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="div" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">What local SEO covers</p>
            <ul className="sf-points">
              <li>Business Profile, primary category and service area</li>
              <li>Reviews asked for and answered</li>
              <li>One clear page per service, and reporting from your accounts</li>
            </ul>
          </LedgerRule>
        </SmartSection>

        {/* 2 THE LOCAL HALF: six H3 units */}
        <SmartSection
          id="local-half"
          tone="paper"
          grid
          heading={{
            id: "h-local-half",
            title: "The local half of SEO",
            lede: "Six jobs depend on being local, and each is a practice Google documents for Business Profiles.",
          }}
        >
          {LOCAL_JOBS.map((j, i) => (
            <SmartUnit
              key={j.id}
              level={3}
              className="sf-c4"
              headingId={`lj-${j.id}`}
              kicker={j.k}
              delay={(i % 3) * 0.08}
              measure={false}
              title={j.t}
              lede={j.lede}
              lead={j.lead}
            >
              <GoDeeper label={j.t.toLowerCase()}>
                <p className="sf-rule">{j.deep} {i === 0 && <Verify id="sources">Where this comes from</Verify>}</p>
              </GoDeeper>
            </SmartUnit>
          ))}
        </SmartSection>

        {/* 3 STEPS */}
        <SmartSection
          id="steps"
          tone="surface"
          grid
          heading={{
            id: "h-steps",
            title: "Working with an SEO company in Chester County",
            lede: "The order matters: no new pages for a site Google cannot index, and no review drive on a profile in the wrong category.",
          }}
        >
          {STEPS.map((s, i) => (
            <LedgerRule as="article" key={s.t} className="sf-c4" delay={(i % 3) * 0.08}>
              <p className="sf-kicker">Step {i + 1}</p>
              <h3 className="sf-h3">{s.t}</h3>
              <GoDeeper label="what this step involves"><p className="sf-rule">{s.d}</p></GoDeeper>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 4 LOCAL MARKET (Census) */}
        <SmartSection id="market" tone="paper" grid labelledBy="h-market">
          <SmartUnit
            className="sf-c7"
            headingId="h-market"
            leadIn="By the numbers:"
            title="Chester County's small businesses"
            lede="Chester County has 15,102 business establishments, and 84.7% of them employ fewer than 20 people."
            lead="Small businesses compete on the map results and a clear page per service, which is exactly what local SEO works on."
          >
            <p className="sf-mono" style={{ marginTop: 14 }}>
              U.S. Census Bureau, County Business Patterns 2023 · <Verify id="sources">Where these figures come from</Verify>
            </p>
            <GoDeeper label="what the number means for you">
              <p className="sf-rule">Most firms in the county are small, so the competition for a local search is often another small firm with a profile and a few reviews. A complete, accurate profile and a plain page per service is enough to compete. Google also says some changes take effect in a few hours and others take months, so judge the work after weeks, not days.</p>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">A result we can show</p>
            <h3 className="sf-h3" id="h-result">Phantom Arcades</h3>
            <p>Google clicks up 92% and non-brand clicks up 231% year over year after a rebuild for search.</p>
            <GoDeeper label="the scope of this result"><p className="sf-rule">It is a national result, not a Chester County one.</p></GoDeeper>
            <div className="sf-links"><Link className="sf-link" to={CASE}>Read the SEO case study</Link></div>
          </LedgerRule>
        </SmartSection>

        {/* 5 WHERE WE WORK */}
        <SmartSection id="where" tone="night" grid labelledBy="h-where">
          <SmartUnit
            className="sf-c7"
            headingId="h-where"
            leadIn="What we do:"
            title="Across Chester County and next door"
            lede="We work across Chester County, in the neighboring counties and remotely anywhere in the US."
            lead="West Chester and the rest of the county are close to our office on Swedesford Road."
            points={[
              "Chester County, in person or remote",
              "Delaware, Montgomery, Bucks and Philadelphia counties",
              "New Castle County, Delaware, and anywhere in the US remotely",
            ]}
          >
            <p className="sf-mono" style={{ marginTop: 14 }}>
              Google Business Profile: 5.0 from 6 Google reviews · <Verify id="reviews">Where this comes from</Verify>
            </p>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">Our office</p>
            <h3 className="sf-h3" id="h-office">Malvern, Pennsylvania</h3>
            <p>625 Swedesford Rd, Unit B, Malvern, PA 19355. Mon–Fri 9–5.</p>
            <div className="sf-links">
              <Link className="sf-link" to="/services/seo">SEO services</Link>
              <Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads in Philadelphia</Link>
            </div>
          </LedgerRule>
        </SmartSection>

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

        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Chester County local SEO questions</h2>
            <p style={{ marginTop: 12 }}>Not here? <Link className="sf-link" to="/contact?need=seo">Ask us on the contact page</Link>.</p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SourcesDialog id="sources" sources={SOURCES} />
        <EvidenceDialog
          id="reviews"
          title="Our Google reviews"
          intro={`The OneAlgorithm Consulting listing on Google, read on ${READ_ON}.`}
          rows={[
            { th: "Rating", td: "5.0" },
            { th: "Reviews", td: "6 Google reviews" },
            { th: "Listing", td: "Computer consultant, Chester County, Malvern, PA" },
          ]}
        />
      </SfPage>
    </Layout>
  );
}
