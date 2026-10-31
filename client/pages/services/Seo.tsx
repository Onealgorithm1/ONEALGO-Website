import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, DeskCTA, FAQ, StageRail, Readouts,
  type SfFaqItem, type SfSource, type Station, type Readout,
} from "../../components/sf";
import { SeoStyles, SeoAuditPlate, SeoCards, PhantomChart, GooglePipeline, ProviderTable, SeoPullQuote } from "../../components/v2/seo-Plates";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/seo, v2 body (2026-10-31 site-wide rebuild). THE HERO IS KEPT EXACTLY (same PageHero, same text);
 * everything below it is the sf kit.
 *
 * Facts: only seo/facts.json, answers.md and the Phantom case study (/blog/seo-case-study-phantom-arcades/).
 * ⛔ No prices or ranges. ⛔ No ranking claim for OneAlgorithm itself (GSC: every click so far is brand).
 * ⛔ No revenue figure and never the Phantom show name. Phantom numbers refresh with the 2026-11-04 GSC pull.
 * ⛔ "5.0 from 6 Google reviews": recount live at go-live.
 * Held back (no source yet): the Lighthouse-100 claim (re-measure first), the FAQ-rich-result retirement date (not re-verified),
 * the AI-assistant session count (window unconfirmed), links to /services/seo-philadelphia and /services/ai-seo (pages not routed yet).
 */

const PAGE_PATH = "/services/seo";
const PAGE_URL = "https://onealgorithm.com/services/seo";
const TITLE = "SEO services for small businesses | One Algorithm";
const DESCRIPTION = "Audit first, then fixes, content and links you do not buy. Search Console reporting, no ranking guarantees. Malvern, PA.";
const OG_IMAGE = "https://onealgorithm.com/og-image.jpg";
const READ_ON = "31 October 2026";
const CASE = "/blog/seo-case-study-phantom-arcades/";

const SOURCES: SfSource[] = [
  { name: "Google Search Central, SEO Starter Guide", what: "Timing of changes (hours to several months); no guarantee a page is indexed; hiring a professional.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { name: "Google Search Central, Spam policies", what: "Link spam (buying or selling links for ranking), keyword stuffing, scaled content abuse.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/essentials/spam-policies" },
  { name: "Google Business Profile Help", what: "Local results rest on relevance, distance and prominence; no way to request or pay for a better local ranking.", read: `read ${READ_ON}`, page: "https://support.google.com/business/answer/7091" },
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "All sectors. Chester County, PA: 15,102 establishments, 12,796 (84.7%) with fewer than 20 employees. Philadelphia County, PA: 29,460 establishments, 24,751 (84.0%) with fewer than 20 employees.", read: `read ${READ_ON}`, page: "https://www.census.gov/programs-surveys/cbp.html" },
  { name: "Google Search Console, Phantom Arcades", what: "13 August to 19 October 2026 (68 days) against the same dates in 2025. Clicks 2,130 against 1,112 (+92%); non-brand clicks 314 against 95 (+231%); impressions 52,226 against 31,978 (+63%). The prior 68 days were flat, with clicks down 6%. Revenue is not claimed.", read: "as of 19 October 2026" },
  { name: "OneAlgorithm Consulting on Google", what: "5.0 from 6 Google reviews. Listing: computer consultant, Chester County, Malvern, PA.", read: `read ${READ_ON}` },
];

const FAQS: SfFaqItem[] = [
  { q: "How much does SEO cost?", a: "We scope it in writing after the audit, because the price follows what the audit finds: how many pages, how much is broken, and how competitive your searches are. We do not print a price list.", link: { to: "#start", label: "Ask for the audit" } },
  { q: "How long does SEO take?", a: "Google says some changes take effect in a few hours and others take several months. Technical fixes usually move first; new pages on a young site take a quarter or more." },
  { q: "What do SEO services include?", a: "Technical fixes, keyword and content work, links earned rather than bought, local search, Search Console and GA4 reporting, and visibility in AI assistants.", link: { to: "#jobs", label: "See the six jobs" } },
  { q: "What is the difference between local SEO and SEO?", a: "Local SEO is the part tied to place: your Google Business Profile, reviews, service area and map results. SEO is everything on the site that decides whether Google can find and trust it.", link: { to: "/services/seo-chester-county", label: "Local SEO in Chester County" } },
  { q: "What is the difference between SEO and Google Ads?", a: "Ads buy a position now and stop when you stop paying. SEO builds slowly and keeps working.", link: { to: "/services/google-ads", label: "Google Ads management" } },
  { q: "Can I do SEO myself?", a: "Yes, much of it. The first items on an audit are usually things your own developer can do. Pay for help when the list is long or the site is hard to crawl." },
  { q: "How will I know it is working?", a: "Reporting comes from your own Search Console and GA4, so you can check every number. We look at non-brand clicks, because brand clicks only show people already knew you." },
  { q: "Do you guarantee a number-one ranking?", a: "No. Nobody can, and Google will not even guarantee that a page you submit gets indexed. We promise the work: faults fixed, pages written, every number visible to you." },
  { q: "Do you do SEO outside Chester County?", a: "Yes. Our office is in Malvern, and most SEO work runs remotely anyway. Philadelphia, Delaware, Montgomery and Bucks counties and New Castle County, Delaware, are next door." },
];

const JOBS = [
  { id: "technical", t: "Technical SEO", k: "Crawl, index, speed", lede: "Technical SEO makes sure Google can reach, read and index every page worth ranking.", lead: "Content on a site search engines struggle to crawl is wasted work, so this comes first.",
    deep: "Crawl and index coverage, redirect chains, canonical tags, sitemaps, duplicate titles and Core Web Vitals, and page speed on real visitors." },
  { id: "content", t: "Content and keywords", k: "Winnable first", lede: "We map what people search near what you sell, then check whether you can beat the pages that rank.", lead: "Sometimes the honest answer is no, and we say so instead of billing you to chase it.",
    deep: "One page per thing people search for, written plainly. Google states no minimum or maximum length exists, so we do not pad. Many near-identical pages is what the scaled content abuse policy targets." },
  { id: "links", t: "Links without buying them", k: "Earned only", lede: "We ask for links a person would plausibly click, from sites that have a reason to mention you.", lead: "Buying or selling links for ranking is link spam in Google's own policy.",
    deep: "No bought links, no private blog networks, nothing that risks a manual action. If a proposal promises a fixed number of links a month, ask where they come from." },
  { id: "local", t: "Local SEO", k: "Map results", lede: "For a local business the map results come from your Google Business Profile, so we set that up properly.", lead: "Google says there is no way to request or pay for a better local ranking.",
    deep: "The primary category, hours, services, photos, a service area instead of an address if you work at the customer's site, and reviews asked for and answered. Local results rank on relevance, distance and prominence." },
  { id: "reporting", t: "Analytics and reporting", k: "Your accounts", lede: "Search Console and GA4 are set up in accounts you own, so every number we send can be checked.", lead: "You see which queries bring people in, and what those people do once they arrive.",
    deep: "Page changes are tested against whether visitors do anything after they land. Brand and non-brand clicks are reported separately." },
  { id: "ai", t: "AI search visibility", k: "Be cited, not guessed", lede: "AI assistants answer from pages they can crawl and trust, so the same fundamentals apply, plus answer-first copy.", lead: "We track sessions from AI assistants in GA4 as their own line.",
    deep: "Crawl access, plain answer-first paragraphs, structured data that matches the page, and citations to primary sources. We cannot promise a citation from any assistant." },
];

const STATIONS: Station[] = [
  { k: "s1", num: "01", title: "Audit", sub: "crawl · rankings · profile" },
  { k: "s2", num: "02", title: "Fix", sub: "indexing · redirects · speed" },
  { k: "s3", num: "03", title: "Content", sub: "one page per search" },
  { k: "s4", num: "04", title: "Links", sub: "earned, never bought" },
  { k: "s5", num: "05", title: "Report", sub: "your own accounts" },
].map((s) => ({ ...s, short: s.title }));

const STEP_TEXT = [
  ["Audit", "A crawl, what you rank for now, Core Web Vitals and your Business Profile, then a prioritized list of fixes."],
  ["Fix", "Technical faults first: indexing, redirects, titles, speed. Two of the three reasons a page is missing from Google make content work pointless until they are sorted."],
  ["Content", "One plain page per thing people search for, checked against the keywords you can actually win."],
  ["Links", "Outreach for links worth clicking. Nothing bought, nothing from a network built to manipulate rankings."],
  ["Report", "Monthly numbers from your own Search Console and GA4, with non-brand clicks on their own line and next month's work named."],
];

const CHOOSE: [string, string, string][] = [
  ["How links are earned", "A named method, with the sources", "Links bought in bulk, or a network of sites they control"],
  ["Reporting", "Read access to your Search Console", "A dashboard you cannot export from"],
  ["Rankings", "No promise, because Google gives none", "A guaranteed first-page or number-one ranking"],
  ["Results", "Non-brand clicks, reported separately", "Brand clicks presented as growth"],
  ["Content", "Pages chosen from what people search", "A fixed number of new pages a month"],
];

const LOCAL_READOUTS: Readout[] = [
  { value: 15102, label: "Chester County business establishments", source: <>U.S. Census Bureau, County Business Patterns 2023</> },
  { value: 12796, label: "of them have fewer than 20 employees (84.7%)", source: <>Same source, all sectors</> },
  { value: 29460, label: "Philadelphia County establishments; 84.0% have fewer than 20 employees", source: <>Same source, all sectors</> },
];

export default function Seo() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "SEO services, SEO company, small business SEO, technical SEO, local SEO, SEO audit, Malvern PA",
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
          "SEO Services",
          "SEO for small businesses from an office in Malvern, Pennsylvania: technical audits (crawl and index coverage, redirects, canonicals, sitemaps, Core Web Vitals), keyword and content strategy, links earned rather than bought, local search and Google Business Profile, Search Console and GA4 reporting, and visibility in AI assistants. No ranking guarantees.",
          "Search Engine Optimization",
          PAGE_URL,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL)} />

      {/* HERO KEPT EXACTLY AS BEFORE. */}
      <PageHero
        eyebrow="SEO Services"
        title={
          <>
            SEO services{" "}
            <span className="text-oa-orange">that start with what&rsquo;s broken</span>
          </>
        }
        lede="We fix the technical reasons a site doesn't rank — crawl errors, duplicate URLs, slow pages, missing or repeated titles — and then work on the content meant to bring people in. In that order, because content on a site search engines struggle to crawl is wasted work."
        panel={{
          title: "What we deliver",
          items: [
            "Technical SEO Audits",
            "Keyword & Content Strategy",
            "Link Building & Outreach",
            "Analytics & CRO",
            "Local & Enterprise SEO",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact?need=seo" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      <SfPage crumbs={[{ label: "SEO services" }]}>
        <SeoStyles />

        {/* 1 HAND-OFF: visual band (sample audit plate) */}
        <SmartSection
          id="what"
          tone="surface"
          heading={{
            id: "h-what",
            title: "What SEO services include",
            lede: "SEO services make a website easy for search engines to find, read and trust, so the right people reach it without paid ads.",
          }}
        >
          <SeoAuditPlate />
          <p className="sf-lead sf-measure" style={{ marginTop: 28 }}><span className="sf-lead-in">Why it matters:</span> Most of the work is fixing what blocks Google, not writing more pages. No ranking guarantees, no bought links.</p>
          <GoDeeper label="what an SEO engagement covers">
            <p className="sf-rule">
              An engagement runs in a fixed order: technical fixes, then content, then links, with reporting throughout. Google itself says you might consider hiring a professional, and that some changes take effect in a few hours while others take several months.
            </p>
          </GoDeeper>
        </SmartSection>

        {/* 2 SIX JOBS: lift cards */}
        <SmartSection
          id="jobs"
          tone="paper"
          heading={{
            id: "h-jobs",
            title: "Six jobs inside one SEO engagement",
            lede: "Each job is separate on the invoice and in the report, so you can see what moved which number.",
          }}
        >
          <SeoCards items={JOBS} cardId="job" />
          <GoDeeper label="the detail behind each job">
            <dl className="sf-rule">
              {JOBS.map((j) => (
                <div key={j.id} style={{ marginTop: 12 }}>
                  <dt style={{ fontWeight: 600 }}>{j.t}</dt>
                  <dd style={{ margin: 0 }}>{j.deep}{j.id === "local" && <> <Link className="sf-link" to="/services/seo-chester-county">SEO in Chester County</Link></>}</dd>
                </div>
              ))}
            </dl>
          </GoDeeper>
        </SmartSection>

        {/* 3 PHANTOM RESULT: split text + real chart */}
        <SmartSection id="result" tone="night" grid labelledBy="h-result">
          <SmartUnit
            className="sf-c5"
            headingId="h-result"
            leadIn="By the numbers:"
            title="A real result: Phantom Arcades"
            lede="After we rebuilt Phantom Arcades for search, its Google clicks rose 92% over the same 68 days a year earlier."
            lead="Non-brand clicks, from people who did not already know the name, rose 231%."
            points={[
              "One page per game system, with its own title",
              "More than 80 redirects from the old URLs",
              "Product structured data on every product",
            ]}
          >
            <GoDeeper label="what we changed and what we are not claiming">
              <p className="sf-rule">We gave every game system its own page and wrote product titles. The 68 days before the window were flat, with clicks down 6%, so the lift is not a trend that was already running.</p>
              <p>We do not quote revenue. This is one client, and it is the only SEO result we publish.</p>
              <div className="sf-links"><Link className="sf-link" to={CASE}>Read the Phantom Arcades SEO case study</Link></div>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c7"><PhantomChart /></div>
        </SmartSection>

        {/* 4 PROCESS: stage rail */}
        <SmartSection
          id="process"
          tone="surface"
          heading={{
            id: "h-process",
            title: "How an SEO engagement runs",
            lede: "Five steps in a fixed order, because each one unblocks the next.",
          }}
        >
          <div style={{ marginTop: 36 }}>
            <StageRail
              fig={2}
              sample={false}
              stations={STATIONS}
              title="Diagram of a five-step SEO engagement: audit, fix, content, links, report"
              desc="A rail runs through five stations in a fixed order: audit, fix, content, links and report."
              stamp="How an engagement runs"
              caption="The first few audit items are usually things your own developer can do."
            />
          </div>
          <GoDeeper label="what happens in each step">
            <ol className="sf-rule">{STEP_TEXT.map(([t, d]) => <li key={t} style={{ marginTop: 8 }}><strong>{t}.</strong> {d}</li>)}</ol>
          </GoDeeper>
        </SmartSection>

        {/* 5 GOOGLE REQUIRES: split plate */}
        <SmartSection id="google" tone="paper" grid labelledBy="h-google">
          <SmartUnit
            className="sf-c5"
            headingId="h-google"
            title="What Google actually requires"
            lede="Google publishes the rules, and the first is that a page must be crawled and indexed before it can rank."
            lead="Google says plainly it does not guarantee that a page you submit gets indexed."
          >
            <GoDeeper label="the shortcuts that do not move the needle">
              <p className="sf-rule">Google's spam policies name buying links, keyword stuffing and mass-produced pages as shortcuts to avoid. Link spam is creating links primarily to manipulate rankings. Keyword stuffing is filling a page with keywords or numbers. Scaled content abuse is many pages generated primarily to manipulate rankings. Repeating a keyword, listing towns to rank in, and promises of a guaranteed number-one ranking are all still sold, and each can cost a site its standing.</p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c7"><GooglePipeline /></div>
        </SmartSection>

        {/* 6 COST: pull-quote band */}
        <SmartSection id="cost" tone="night" grid labelledBy="h-cost">
          <div style={{ gridColumn: "1 / -1" }}>
            <h2 className="sf-h2" id="h-cost">What SEO costs</h2>
            <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">We set the scope in writing after the audit, because what an audit finds decides the work.</p>
          </div>
          <SeoPullQuote
            statement="A price quoted before anyone has looked at the site is a guess."
            chips={["How many pages and how much is broken", "How competitive your searches are", "How much ongoing content and reporting you want"]}
          />
        </SmartSection>

        {/* 7 CHOOSE: comparison table */}
        <SmartSection
          id="choose"
          tone="surface"
          heading={{
            id: "h-choose",
            title: "How to choose an SEO provider",
            lede: "Pick the provider who shows you their method, gives you access to the numbers and refuses to guarantee rankings.",
          }}
        >
          <ProviderTable rows={CHOOSE} />
        </SmartSection>

        {/* 8 WHY US + LOCAL: readouts band */}
        <SmartSection
          id="local"
          tone="paper"
          heading={{
            id: "h-local",
            title: "SEO in Chester County and Philadelphia",
            lede: "Most local businesses are small, and small businesses win on the map results and a clear page per service.",
          }}
        >
          <Readouts items={LOCAL_READOUTS} withEvidence={false} />
          <div className="seo-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))" }}>
            <article className="seo-lift" data-reveal="">
              <p className="sf-kicker">Why OneAlgorithm</p>
              <h3 className="sf-h3" id="h-why">Four people, starting with what is broken</h3>
              <p>We are four people in Malvern who report from accounts you own. They will tell you when a keyword is not worth chasing. 24/7 support and hypercare after launch.</p>
              <p className="sf-mono">5.0 from 6 Google reviews, read {READ_ON}. We make no ranking claim for our own site: our Search Console clicks are almost all brand so far.</p>
            </article>
            <article className="seo-lift" data-reveal="">
              <p className="sf-kicker">Nearby</p>
              <h3 className="sf-h3" id="h-nearby">Based in Malvern, PA</h3>
              <p>Our office is on Swedesford Road, inside Chester County. We serve Philadelphia businesses from Malvern; we have no Philadelphia client result to show, and we do not claim one.</p>
              <div className="sf-links">
                <Link className="sf-link" to="/services/seo-chester-county">SEO company in Chester County</Link>
                <Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads in Philadelphia</Link>
                <Link className="sf-link" to="/services/website-development">Website development</Link>
              </div>
            </article>
          </div>
        </SmartSection>

        {/* FAQ */}
        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">SEO services questions</h2>
            <p style={{ marginTop: 12 }}>Not here? <Link className="sf-link" to="/contact?need=seo">Ask us on the contact page</Link>.</p>
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
        <SourcesDialog id="sources" title="Sources for this page" intro="Each statement about Google is from Google's own documentation, read by a person at OneAlgorithm. The Phantom Arcades figures are from its own Search Console." sources={SOURCES} />

        {/* CTA LAST */}
        <DeskCTA
          hcLink={false}
          heading="Get an SEO audit of your site"
          lede="Send your site address and the searches you want to be found for, and we tell you what we would check first."
          coversLabel="What the audit covers"
          covers={[
            "Crawl and index coverage: what Google can see",
            "Core Web Vitals on real pages",
            "What you rank for now, brand and non-brand",
            "Your Business Profile, if you serve a local area",
            "A prioritized list of fixes",
          ]}
          next={["Call, or send the contact page.", "A person at OneAlgorithm reads it and replies.", "We tell you what we would fix first."]}
          form={{
            topic: "seo",
            topicLabel: "SEO audit",
            heading: "Get an SEO audit",
            prompt: "Your site address and the searches you want to be found for.",
            submitLabel: "Get an SEO audit",
            need: "seo",
          }}
        />
      </SfPage>
    </Layout>
  );
}
