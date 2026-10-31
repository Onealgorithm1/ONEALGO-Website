import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, LedgerRule, GoDeeper, EvidenceDialog, SourcesDialog, Verify, DeskCTA, FAQ,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
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

const GOOGLE: SfSource[] = [
  { name: "Google Search Central, SEO Starter Guide", what: "Timing of changes (hours to several months); no guarantee a page is indexed; hiring a professional.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { name: "Google Search Central, Spam policies", what: "Link spam (buying or selling links for ranking), keyword stuffing, scaled content abuse.", read: `read ${READ_ON}`, page: "https://developers.google.com/search/docs/essentials/spam-policies" },
  { name: "Google Business Profile Help", what: "Local results rest on relevance, distance and prominence; no way to request or pay for a better local ranking.", read: `read ${READ_ON}`, page: "https://support.google.com/business/answer/7091" },
  { name: "Google Search Central, Search Essentials", what: "The technical requirements: Googlebot can reach the page, it returns a 200, it has indexable content.", read: "read 30 August 2026", page: "https://developers.google.com/search/docs/essentials" },
];

const CENSUS: SfSource[] = [
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "All sectors. Chester County, PA: 15,102 establishments, 12,796 (84.7%) with fewer than 20 employees. Philadelphia County, PA: 29,460 establishments, 24,751 (84.0%) with fewer than 20 employees.", read: `read ${READ_ON}`, page: "https://www.census.gov/programs-surveys/cbp.html" },
];

const FAQS: SfFaqItem[] = [
  { q: "How much does SEO cost?", a: "We scope it in writing after the audit, because the price follows what the audit finds: how many pages, how much is broken, and how competitive your searches are. We do not print a price list.", link: { to: "#start", label: "Ask for the audit" } },
  { q: "How long does SEO take?", a: "Google says some changes take effect in a few hours and others take several months. Technical fixes usually move first because they unblock something; new pages on a young site take a quarter or more." },
  { q: "Is SEO worth it for a small business?", a: "It is when people already search for what you sell and you can realistically beat the pages that rank. The audit checks both before we propose work, and we tell you when a keyword is not winnable." },
  { q: "What do SEO services include?", a: "Technical fixes, keyword and content work, links earned rather than bought, local search, Search Console and GA4 reporting, and visibility in AI assistants. Each is a section above.", link: { to: "#jobs", label: "See the six jobs" } },
  { q: "What is the difference between local SEO and SEO?", a: "Local SEO is the part tied to place: your Google Business Profile, reviews, service area and map results. SEO is everything on the site that decides whether Google can find and trust it.", link: { to: "/services/seo-chester-county", label: "Local SEO in Chester County" } },
  { q: "What is the difference between SEO and Google Ads?", a: "Ads buy a position now and stop when you stop paying. SEO builds slowly and keeps working. Most small businesses want both for a while.", link: { to: "/services/google-ads", label: "Google Ads management" } },
  { q: "Can I do SEO myself?", a: "Yes, much of it. The first items on an audit are usually things your own developer can do without us. Pay for help when the list is long or the site is hard to crawl." },
  { q: "How will I know it is working?", a: "Reporting comes from your own Search Console and GA4, accounts you own, so you can check every number we send. We look at non-brand clicks, because brand clicks only show people already knew you." },
  { q: "How do I choose an SEO company?", a: "Ask for read access to their reporting, ask how they get links, and walk away from any ranking guarantee. A provider who will not name the method is hiding it." },
  { q: "Do you guarantee a number-one ranking?", a: "No. Nobody can, and Google will not even guarantee that a page you submit gets indexed. What we can promise is the work: faults fixed, pages written, every number visible to you." },
  { q: "Do you do SEO outside Chester County?", a: "Yes. Our office is in Malvern, and most SEO work runs remotely anyway. Philadelphia, Delaware, Montgomery and Bucks counties and New Castle County, Delaware, are next door." },
];

const JOBS = [
  { id: "technical", t: "Technical SEO", k: "Crawl, index, speed", ledeText: "Technical SEO makes sure Google can reach, read and index every page worth ranking.", lead: "Content on a site search engines struggle to crawl is wasted work, so this comes first.",
    deep: "Crawl and index coverage, redirect chains, canonical tags, sitemaps, duplicate titles and Core Web Vitals. The thresholds are LCP under 2.5 seconds, INP under 200 milliseconds and CLS under 0.1, and Google grades real visitors, not one test on a laptop. A site with little traffic may have no field data at all, which means speed is not currently affecting its ranking, though it still affects whether anyone stays." },
  { id: "content", t: "Content and keywords", k: "Winnable first", ledeText: "We map what people search near what you sell, then check whether you can beat the pages that rank.", lead: "Sometimes the honest answer is no, and we say so instead of billing you to chase it.",
    deep: "One page per thing people search for, written plainly. Google states that no minimum or maximum length exists for ranking, so we do not pad. Publishing many near-identical pages for keyword variations is what Google's scaled content abuse policy targets; three pages that earn their place beat thirty that do not." },
  { id: "links", t: "Links without buying them", k: "Earned only", ledeText: "We ask for links a person would plausibly click, from sites that have a reason to mention you.", lead: "Buying or selling links for ranking is link spam in Google's own policy, and it catches up with a domain years later.",
    deep: "No bought links, no private blog networks, nothing that risks a manual action. If a proposal you are reading promises a fixed number of links a month, ask where they come from." },
  { id: "local", t: "Local SEO", k: "Map results", ledeText: "For a local business the map results come from your Google Business Profile, so we set that up properly.", lead: "Google says there is no way to request or pay for a better local ranking, so the profile has to be right.",
    deep: "The primary category, hours, services, photos, a service area instead of an address if you work at the customer's site, and reviews asked for and answered. Google ranks local results on relevance, distance and prominence. The full local method is on our Chester County page." },
  { id: "reporting", t: "Analytics and reporting", k: "Your accounts", ledeText: "Search Console and GA4 are set up in accounts you own, so every number we send can be checked.", lead: "You see which queries bring people in, and what those people do once they arrive.",
    deep: "Page changes are tested against whether visitors do anything after they land, not only whether they arrive. Brand and non-brand clicks are reported separately, because brand clicks only prove people already knew your name." },
  { id: "ai", t: "AI search visibility", k: "Be cited, not guessed", ledeText: "AI assistants answer from pages they can crawl and trust, so the same fundamentals apply, plus answer-first copy.", lead: "We track sessions from AI assistants in GA4 as their own line, so you can see whether they send anyone.",
    deep: "Crawl access, plain answer-first paragraphs, structured data that matches what is on the page, and citations to primary sources. We cannot promise a citation from any assistant, and we do not." },
];

const STEPS = [
  { t: "Audit", c: "sf-c4", d: "A crawl, what you rank for now, Core Web Vitals and your Business Profile. You get a prioritized list of fixes, and the first few are usually things your own developer can do." },
  { t: "Fix", c: "sf-c4", d: "Technical faults first: indexing, redirects, titles, speed. Two of the three reasons a page is missing from Google make content work pointless until they are sorted." },
  { t: "Content", c: "sf-c4", d: "One plain page per thing people search for, written for the visitor and checked against the keywords you can actually win." },
  { t: "Links", c: "sf-c6", d: "Outreach for links worth clicking. Nothing bought, nothing from a network built to manipulate rankings." },
  { t: "Report", c: "sf-c6", d: "Monthly numbers from your own Search Console and GA4, with non-brand clicks on their own line and next month's work named." },
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
        {/* 1 DEFINITION (answers "what are seo services") */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What SEO services include"
            lede="SEO services make a website easy for search engines to find, read and trust, so the right people reach it without paid ads."
            lead="Most of the work is fixing what blocks Google, not writing more pages."
          >
            <GoDeeper label="what an SEO engagement covers">
              <p className="sf-rule">
                An engagement runs in a fixed order: technical fixes, then content, then links, with reporting throughout. The order matters more than any single item, because content on a site Google cannot crawl is wasted work. Google itself says you might consider hiring a professional, and that some changes take effect in a few hours while others take several months. <Verify id="google">Where these statements come from</Verify>
              </p>
              <div className="sf-links">
                <a className="sf-link" href="#jobs">The six jobs in an engagement</a>
                <a className="sf-link" href="#process">How an engagement runs</a>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="div" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">What you get</p>
            <ul className="sf-points">
              <li>A written audit with fixes ranked by what to do first</li>
              <li>Reporting from accounts you own, not a dashboard we hold</li>
              <li>No ranking guarantees, no bought links</li>
            </ul>
          </LedgerRule>
        </SmartSection>

        {/* 2 SIX JOBS (six H3 units) */}
        <SmartSection
          id="jobs"
          tone="paper"
          grid
          heading={{
            id: "h-jobs",
            title: "Six jobs inside one SEO engagement",
            lede: "Each job is separate on the invoice and in the report, so you can see what moved which number.",
          }}
        >
          {JOBS.map((j, i) => (
            <SmartUnit
              key={j.id}
              level={3}
              className="sf-c4"
              headingId={`job-${j.id}`}
              kicker={j.k}
              delay={(i % 3) * 0.08}
              measure={false}
              title={j.t}
              lede={j.ledeText}
              lead={j.lead}
            >
              <GoDeeper label={j.t.toLowerCase()}>
                <p className="sf-rule">{j.deep}</p>
                {j.id === "local" && (
                  <div className="sf-links"><Link className="sf-link" to="/services/seo-chester-county">SEO in Chester County</Link></div>
                )}
              </GoDeeper>
            </SmartUnit>
          ))}
        </SmartSection>

        {/* 3 PHANTOM RESULT */}
        <SmartSection id="result" tone="night" grid labelledBy="h-result">
          <SmartUnit
            className="sf-c7"
            headingId="h-result"
            leadIn="By the numbers:"
            title="A real result: Phantom Arcades"
            lede="After we rebuilt Phantom Arcades for search, its Google clicks rose 92% over the same 68 days a year earlier."
            lead="Non-brand clicks, from people who did not already know the name, rose 231%."
            points={[
              "Google clicks: 1,112 to 2,130 (+92%)",
              "Non-brand clicks: 95 to 314 (+231%)",
              "Impressions: 31,978 to 52,226 (+63%)",
            ]}
          >
            <p className="sf-mono" style={{ marginTop: 14 }}>
              Aug 13 to Oct 19, 2026 against the same dates in 2025 · Google Search Console · <Verify id="phantom">How this was measured</Verify>
            </p>
            <GoDeeper label="what we changed and what we are not claiming">
              <p className="sf-rule">
                We rebuilt the site as static pages, set up more than 80 redirects from the old URLs, gave every game system its own page, wrote product titles and added product structured data. The 68 days before the window were flat, with clicks down 6%, so the lift is not a trend that was already running.
              </p>
              <p>We do not quote revenue here, because we are not claiming one. This is one client, and it is the only SEO result we publish.</p>
              <div className="sf-links">
                <Link className="sf-link" to={CASE}>Read the Phantom Arcades SEO case study</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">What changed</p>
            <ul className="sf-points">
              <li>One page per game system, with its own title</li>
              <li>More than 80 redirects from the old URLs</li>
              <li>Product structured data on every product</li>
            </ul>
          </LedgerRule>
        </SmartSection>

        {/* 4 PROCESS (five H3 units) */}
        <SmartSection
          id="process"
          tone="surface"
          grid
          heading={{
            id: "h-process",
            title: "How an SEO engagement runs",
            lede: "Five steps in a fixed order, because each one unblocks the next.",
          }}
        >
          {STEPS.map((s, i) => (
            <LedgerRule as="article" key={s.t} className={s.c} delay={(i % 3) * 0.08}>
              <p className="sf-kicker">Step {i + 1}</p>
              <h3 className="sf-h3">{s.t}</h3>
              <p>{s.d}</p>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* 5 WHY US */}
        <SmartSection id="why" tone="paper" grid labelledBy="h-why">
          <SmartUnit
            className="sf-c7"
            headingId="h-why"
            leadIn="What we do:"
            title="Why OneAlgorithm for SEO"
            lede="We are four people in Malvern who start with what is broken and report from accounts you own."
            lead="You deal with the people doing the work, and they will tell you when a keyword is not worth chasing."
            points={[
              "Technical fixes first, so paid content can rank",
              "No bought links, no private blog networks",
              "24/7 support and hypercare after launch",
            ]}
          >
            <GoDeeper label="how to check us">
              <p className="sf-rule">
                Our Google Business Profile shows 5.0 from 6 Google reviews, read on {READ_ON}. <Verify id="reviews">Where this comes from</Verify> We make no ranking claim for our own site: our Search Console clicks are almost all brand so far, and we would rather say that than imply otherwise. The Phantom Arcades case study above is the result we can show.
              </p>
              <div className="sf-links">
                <Link className="sf-link" to={CASE}>Phantom Arcades case study</Link>
                <Link className="sf-link" to="/services/website-development">Website development</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">Nearby</p>
            <h3 className="sf-h3" id="h-nearby">Based in Malvern, PA</h3>
            <p>Our office is on Swedesford Road, inside Chester County.</p>
            <div className="sf-links">
              <Link className="sf-link" to="/services/seo-chester-county">SEO company in Chester County</Link>
              <Link className="sf-link" to="/services/web-design-chester-county">Web design in Chester County</Link>
            </div>
          </LedgerRule>
        </SmartSection>

        {/* 6 WHAT GOOGLE REQUIRES + MYTHS */}
        <SmartSection id="google" tone="night" grid labelledBy="h-google">
          <SmartUnit
            className="sf-c6"
            headingId="h-google"
            measure={false}
            title="What Google actually requires"
            lede="Google publishes the rules, and the hard technical requirements are three: reachable, returns a 200, has indexable content."
            lead="Meeting all three makes a page eligible, not indexed; Google says plainly it guarantees neither."
            points={[
              "Googlebot can reach the page, with no stray noindex",
              "The page returns a 200, not a redirect chain or fake 404",
              "Real, indexable text that respects the spam policies",
            ]}
          >
            <GoDeeper label="why we check this first">
              <p className="sf-rule">There are three reasons a page is missing from Google: never crawled, crawled but not indexed, or indexed and ranking too low to see. URL Inspection in Search Console tells you which in about a minute, and each has a different fix. <Verify id="google">Sources</Verify></p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c6"
            headingId="h-myths"
            delay={0.08}
            measure={false}
            leadIn="Yes, but:"
            title="Things that do not move the needle"
            lede="Google's spam policies name buying links, keyword stuffing and mass-produced pages as the shortcuts to avoid."
            lead="Each is still sold today, and each can cost a site its standing."
            points={[
              "Bought links and private blog networks",
              "Repeating a keyword or listing towns to rank in",
              "Promises of a guaranteed number-one ranking",
            ]}
          >
            <GoDeeper label="the shortcuts, one by one">
              <p className="sf-rule">Link spam is creating links primarily to manipulate rankings; buying or selling links for ranking is Google's own example. Keyword stuffing is filling a page with keywords or numbers to manipulate rankings. Scaled content abuse is many pages generated primarily to manipulate rankings, however they were produced. <Verify id="google">Sources</Verify></p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 7 COST + 8 CHOOSE */}
        <SmartSection id="cost" tone="surface" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c6"
            headingId="h-cost"
            measure={false}
            title="What SEO costs"
            lede="We set the scope in writing after the audit, because what an audit finds decides the work."
            lead="A price quoted before anyone has looked at the site is a guess, and you end up paying for it."
            points={[
              "How many pages and how much is broken",
              "How competitive your searches are",
              "How much ongoing content and reporting you want",
            ]}
          >
            <GoDeeper label="what drives the scope">
              <p className="sf-rule">A small site with a few clear faults needs a short fix list, much of which your own developer can do. A large site with duplicate URLs, a rebuild or a long list of pages to write needs sustained work. Competitive searches take longer than easy ones. The audit separates these and tells you which you have.</p>
              <div className="sf-links"><a className="sf-link" href="#start">Ask for the audit</a></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c6"
            headingId="h-choose"
            delay={0.08}
            measure={false}
            title="How to choose an SEO provider"
            lede="Pick the provider who shows you their method, gives you access to the numbers and refuses to guarantee rankings."
            lead="Google's guidance is that nobody can guarantee a placement, so a promise is a red flag."
            points={[
              "Ask how links are earned, and for the sources",
              "Ask for read access to Search Console reporting",
              "Walk away from any guaranteed ranking",
            ]}
          >
            <GoDeeper label="the red flags">
              <ul className="sf-points" style={{ marginTop: 0 }}>
                <li>A guaranteed first-page or number-one ranking.</li>
                <li>Links bought in bulk, or a network of sites they control.</li>
                <li>Reports that live in a dashboard you cannot export from.</li>
                <li>Brand clicks presented as growth.</li>
                <li>A fixed number of new pages a month regardless of what people search.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 9 LOCAL */}
        <SmartSection id="local" tone="paper" grid labelledBy="h-local">
          <SmartUnit
            className="sf-c7"
            headingId="h-local"
            title="SEO in Chester County and Philadelphia"
            lede="Most local businesses are small, and small businesses win on the map results and a clear page per service."
            lead="Chester County has 15,102 business establishments and 84.7% of them have fewer than 20 employees."
            points={[
              "Chester County: 15,102 establishments, 84.7% under 20 employees",
              "Philadelphia: 29,460 establishments, 84.0% under 20 employees",
            ]}
          >
            <p className="sf-mono" style={{ marginTop: 14 }}>
              U.S. Census Bureau, County Business Patterns 2023 · <Verify id="census">Where these figures come from</Verify>
            </p>
            <GoDeeper label="where we work">
              <p className="sf-rule">Our office is in Malvern, and the Google Business Profile lists our service area as Bucks, Chester, Delaware, Montgomery and Philadelphia counties in Pennsylvania and New Castle County in Delaware. We serve Philadelphia businesses from Malvern; we have no Philadelphia client result to show, and we do not claim one.</p>
              <div className="sf-links">
                <Link className="sf-link" to="/services/seo-chester-county">SEO company in Chester County</Link>
                <Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads in Philadelphia</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <p className="sf-kicker">Related services</p>
            <ul className="sf-points">
              <li><Link className="sf-link" to="/services/seo-chester-county">Local SEO, Chester County</Link></li>
              <li><Link className="sf-link" to="/services/google-ads">Google Ads management</Link></li>
              <li><Link className="sf-link" to="/services/website-development">Website development</Link></li>
            </ul>
          </LedgerRule>
        </SmartSection>

        {/* 10 DESK */}
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

        {/* 11 FAQ */}
        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">SEO services questions</h2>
            <p style={{ marginTop: 12 }}>Not here? <Link className="sf-link" to="/contact?need=seo">Ask us on the contact page</Link>.</p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SourcesDialog id="google" title="Where these statements come from" intro={`Each statement about Google is from Google's own documentation, read by a person at OneAlgorithm. The pages are listed here.`} sources={GOOGLE} />
        <SourcesDialog id="census" sources={CENSUS} />
        <EvidenceDialog
          id="phantom"
          title="How the Phantom Arcades numbers were measured"
          intro="Google Search Console for the Phantom Arcades site, compared over equal windows. Figures are as of 19 October 2026 and are refreshed with the next pull."
          rows={[
            { th: "Window", td: "13 August to 19 October 2026 (68 days) against the same dates in 2025" },
            { th: "Clicks", td: "2,130 against 1,112 (+92%)" },
            { th: "Non-brand clicks", td: "314 against 95 (+231%)" },
            { th: "Impressions", td: "52,226 against 31,978 (+63%)" },
            { th: "Control", td: "The prior 68 days were flat, with clicks down 6%" },
            { th: "Not claimed", td: "Revenue. We do not quote it." },
          ]}
          primary={{ href: CASE, label: "Read the case study" }}
        />
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
