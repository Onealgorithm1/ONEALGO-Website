import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SfButton, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, DeskCTA, FAQ,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { MarketingLedger } from "../../components/v2/marketing-Ledger";
import { VisualStyles, HoverCards, StatBand, BarPlate, AccessPlate } from "../../components/v2/marketing-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";
import { ServiceCities } from "@/components/v2/svc-ServiceCities";

/* Marketing & Social Media - site-wide v2 rebuild 2026-10-31 (sf kit body, hero kept).
 *
 * HERO KEPT: PageHero is unchanged (same component, same text, same panel). Only its button now carries ?need=marketing.
 * COMPLIANCE COPY: the Social Media Management capability cards, the three "How it works" steps and the two
 *   "How we use platform data" paragraphs are Meta Access Verification copy, carried word for word, and the
 *   #social-media-management anchor is kept. Only new framing (short ledes, headings) sits around them.
 * "No case studies to show you" stays. No prices, no client marketing results, no HubSpot claim.
 * Facts: BLS OEWS (wages) and Census County Business Patterns 2023, each behind an in-site sources pop-up.
 * "Digital marketing for small business" and social-media-management wording are folded in here, not on new pages
 * (data-report: the social media management page and the agency head terms were rejected). */

const PAGE_PATH = "/services/marketing";
const MARTECH = "/services/martech";
const CONTACT = contactHref("Marketing", PAGE_PATH, "marketing");

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics", what: "Annual 2025 estimates: market research analysts and marketing specialists (SOC 13-1161) national mean $89,490, median $78,760; marketing managers (SOC 11-2021) national mean $177,770, median $166,790. Salary only, no benefits or overhead.", read: "read 31 October 2026", page: "https://www.bls.gov/oes/" },
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Employer establishments with under 20 employees: Chester County, PA 84.7%; Philadelphia County, PA 84.0%; Pennsylvania 83.8%. Employer establishments only; sole proprietors are not counted.", read: "read 31 October 2026", page: "https://www.census.gov/programs-surveys/cbp.html" },
];

const FEATURES = [
  { title: "Campaign Management", body: "Campaign calendars, builds and launches for the channels you ask us to run, planned far enough ahead that nothing ships the morning it is due." },
  { title: "AI-Driven Insights", body: "A plain-language read of what your numbers show and what to try next month. A person decides what actually goes out." },
  { title: "Customer Journeys", body: "The sequence someone sees from first click to enquiry, written down and built in your CRM rather than held in one person's head." },
  { title: "ROI Tracking", body: "Spend, leads and cost per lead in one place, tied back to the CRM record — so the numbers hold up when somebody disputes them." },
  { title: "Lead Nurturing", body: "Automated follow-up that stops the moment someone replies. Most nurture sequences fail on exactly that detail." },
  { title: "Marketing Automation", body: <>The repetitive work — list uploads, tagging, assignment, the weekly report — handed to the tool instead of to a person on Friday afternoon. <Link className="sf-link" to={MARTECH}>MarTech consulting</Link></> },
];

/* Compliance wording, verbatim. */
const SOCIAL_CAPABILITIES = [
  { title: "Facebook & Instagram", body: "Day-to-day management of the Facebook Pages and Instagram business accounts our clients connect to us, kept consistent with their brand." },
  { title: "Content Planning & Publishing", body: "Campaign calendars, scheduled posts and coordinated launches across every channel a client asks us to run." },
  { title: "Performance Reporting", body: "Follower growth, reach and engagement collected from each connected account and reported back in plain language — not screenshots of dashboards." },
  { title: "Access & Governance", body: "Clients keep ownership of their own accounts and grant us access as a partner. They can withdraw it at any time." },
];

/* Compliance wording, verbatim. */
const HOW_IT_WORKS = [
  { num: "01", title: "You grant access", body: "You add One Algorithm as a partner on your own business account. Your Pages and profiles stay yours throughout." },
  { num: "02", title: "We manage and measure", body: "We publish and maintain your content, and collect the audience and engagement figures each platform reports." },
  { num: "03", title: "You see the results", body: "One report covering every channel, so you can tell what is working without logging into five different tools." },
];

const BENEFITS = [
  { title: "You own the accounts", body: "Your Pages, your ad accounts, your CRM. We work inside them as a partner, and you can withdraw that access whenever you like — including the day we stop working together." },
  { title: "Reporting in plain numbers", body: "Reach, leads and spend in one place, in language you can repeat to someone else without opening the tool. Not a screenshot of a dashboard." },
  { title: "The routine work runs itself", body: "Scheduling, list handling and the recurring report are automated. Your team's time goes to the parts that need a judgment call." },
  { title: "No case studies to show you", body: "We have not published client marketing results, and we are not going to invent any. Ask us what we would run in your first ninety days and judge the answer instead." },
];

const FAQS: SfFaqItem[] = [
  { q: "How much does social media management cost?", a: "Social media management is priced by scope: the accounts, channels and content you need decide the work. We scope it in writing and print no price list. For comparison, the U.S. Bureau of Labor Statistics puts an average in-house marketing specialist salary at $89,490 and a marketing manager at $177,770, salary only.", link: { to: "#cost", label: "What it costs, and why it varies" } },
  { q: "Is social media management worth it?", a: "It is when your customers use Facebook or Instagram and nobody on your team has time to plan, publish and report. We measure in plain numbers and promise no growth figure. We show no case study on this page, because we would rather say so than invent one." },
  { q: "Do I keep ownership of my accounts?", a: "Yes. Your Facebook and Instagram business accounts stay in your name. You grant us access through Meta's business tools, we manage and measure, and you can remove that access whenever you choose. We never need your personal password, and you can see everything we do." },
  { q: "Do you need my passwords?", a: "No. You add us to your business assets with the access level you choose, so we never hold your login. That keeps the accounts yours and lets you see exactly what we can do. We walk you through the steps when you start." },
  { q: "Do you manage both Facebook and Instagram?", a: "Yes. We manage Facebook and Instagram business accounts together, with one content plan, one publishing schedule and one report. Other channels are scoped separately, and we say so before we agree the work, so you are never billed for a channel nobody discussed." },
  { q: "Are paid ads included in management?", a: "Not unless agreed. Management covers planning, publishing and reporting. Paid ads are scoped separately, and the ad budget is paid to the platform, not to us. If you want ads, we set the goal and the tracking first, so spend is judged on enquiries, not on clicks.", link: { to: "/services/google-ads", label: "Google Ads management" } },
  { q: "How do you report on results?", a: "In plain numbers you can check: what was published, who it reached and what they did next. We name what changed and what we will do next month. We do not report vanity figures as results, and growth that comes from people who already knew you is labelled as brand." },
  { q: "What does a digital marketing agency do for a small business?", a: "It plans and runs the channels that bring in customers: search, ads, social, email and the tracking that ties them together. We cover social media management on this page, with SEO, Google Ads and MarTech on their own pages, and we tell you which channel to start with.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "How do I choose a digital marketing agency?", a: "Ask who does the work, whether you own every account and how results are reported. Walk away from guaranteed rankings or follower counts, agencies that hold your logins, and reports that show only brand-name growth. We are four people in Malvern, so you talk to the people doing the work." },
];

const TITLE = "Social Media Management Services | OneAlgorithm";
const DESCRIPTION = "Social media management services for small business: Facebook and Instagram accounts you own and plain-number reports. Book a call: (610) 890-9711.";

export default function Marketing() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "social media management services, social media management, digital marketing for small business, Facebook Page management, Instagram management, marketing services, campaign management, marketing analytics",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Marketing & Social Media Management Services",
          "Social media management for client-owned Facebook Pages and Instagram business accounts: content planning, publishing and performance reporting, alongside campaign management and customer journey work.",
          "Social media management",
          "https://onealgorithm.com/services/marketing",
          { areaServed: { "@type": "Country", name: "United States" } },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, "https://onealgorithm.com/services/marketing", { dateModified: "2026-10-31" })} />

      {/* HERO KEPT: same component, same text, same panel. */}
      <PageHero
        eyebrow="Marketing & Social Media"
        title={
          <>
            <span className="text-oa-orange">Social media management services</span>{" "}
            &amp; marketing
          </>
        }
        lede="We manage social media accounts for our clients and build campaigns that adapt to customer behavior — with AI-driven insights, automated lead nurturing, and reporting that shows what their marketing is actually doing."
        panel={{
          title: "What we deliver",
          items: ["Campaign Management", "AI-Driven Insights", "Customer Journeys", "Lead Nurturing", "ROI Tracking"],
        }}
        primary={{ label: "Talk to an Expert", to: CONTACT }}
      />

      <SfPage crumbs={[{ label: "Marketing" }]}>
        <VisualStyles />

        {/* 1 · HERO HAND-OFF: the access plate, then the compliance capability rows (verbatim) */}
        <SmartSection id="social-media-management" labelledBy="h-social" className="scroll-mt-24"
          heading={{ id: "h-social", kicker: "Facebook and Instagram", title: "Social media management services", lede: "We run the Facebook Pages and Instagram business accounts you own, and report on what each one delivers." }}>
          <div style={{ marginTop: 40 }}><AccessPlate fig={1} /></div>
          <MarketingLedger items={SOCIAL_CAPABILITIES} label="Social media management capabilities" />
          <GoDeeper label="what social media management covers">
            <p className="sf-rule">We manage the Facebook Pages and Instagram business accounts our clients own: planning and publishing content, keeping profiles current, and reporting on what each channel is delivering. Nothing is published to your account without your approval.</p>
          </GoDeeper>
        </SmartSection>

        <OfferBand />

        <SmartSection id="proof-strip" tone="surface" compact labelledBy="h-proof-strip">
          <h2 className="sf-h3" id="h-proof-strip" style={{ marginBottom: 20 }}>Who you are hiring</h2>
          <ProofStrip variant="local" />
        </SmartSection>

        {/* 1b · NEW: what a month contains / what is not included */}
        <SmartSection id="includes" grid labelledBy="h-includes">
          <SmartUnit className="sf-c7" headingId="h-includes" title="What social media management includes"
            lede="A month of management contains a content plan, scheduled posts and one report."
            lead="You know what you are paying for before the month starts, and what stays out of scope."
            points={["A campaign calendar and the posts scheduled on it", "Upkeep of your Facebook and Instagram profiles", "One plain-number report across every channel"]}>
            <h3 className="sf-h3" style={{ marginTop: 24 }}>What a month contains</h3>
            <p>Content planning and publishing, then performance reporting: the two jobs behind every month, with your approval before anything goes live.</p>
          </SmartUnit>
          <div className="sf-c5">
            <div style={{ padding: 24, background: "var(--surface)", border: "1px solid var(--hair-s)" }}>
              <h3 className="sf-h3" style={{ margin: 0 }}>What is not included</h3>
              <p>Paid ads, unless we agree them in writing. The ad budget is paid to the platform, not to us. Search engine work is a separate service.</p>
              <Link className="sf-link" to="/services/google-ads">Google Ads management</Link>
            </div>
          </div>
        </SmartSection>

        {/* 2 · what we run: hover cards */}
        <SmartSection id="what" tone="surface" labelledBy="h-what"
          heading={{ id: "h-what", kicker: "Campaigns", title: "What we run beyond the posting", lede: "Six kinds of work, and all of it happens inside platforms you already own." }}>
          <HoverCards cols={3} items={FEATURES} />
        </SmartSection>

        {/* 3 · how it works (verbatim steps) */}
        <SmartSection id="how" labelledBy="h-how"
          heading={{ id: "h-how", kicker: "Process", title: "How it works", lede: "Three steps: you grant access, we manage and measure, and you see the results." }}>
          <HoverCards cols={3} numbered items={HOW_IT_WORKS.map((h) => ({ title: h.title, body: h.body }))} />
        </SmartSection>

        {/* 4 · platform data (verbatim paragraphs, night band) */}
        <SmartSection id="platform-data" tone="night" grid labelledBy="h-data">
          <SmartUnit className="sf-c12" headingId="h-data" title="How we use platform data"
            lede="We read only what your connected accounts show, and use it for one purpose: running and reporting on your marketing."
            lead="Your data is never sold, never mixed with another client's, and our access ends when the engagement does.">
            <GoDeeper label="the full data statement">
              <p className="sf-rule">To deliver this service we read information from the accounts our clients connect to us: Page and profile details, follower counts, post performance and engagement figures. We use it for one purpose — running and reporting on that client&rsquo;s own marketing.</p>
              <p>We do not sell it, we do not combine one client&rsquo;s data with another&rsquo;s, and our access ends when the engagement ends. Nothing is published to a client&rsquo;s account without their approval.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 4b · NEW: where SEO, ads and MarTech fit */}
        <SmartSection id="fit" labelledBy="h-fit"
          heading={{ id: "h-fit", kicker: "Other channels", title: "Where SEO, ads and MarTech fit", lede: "Social is one channel. Search, ads and the tools behind them have their own pages." }}>
          <div className="mk-table-wrap" style={{ marginTop: 40 }}>
            <table className="mk-table">
              <thead><tr><th scope="col">The job</th><th scope="col">Where it lives</th></tr></thead>
              <tbody>
                <tr><td data-th="The job">Be found when people search</td><td data-th="Where it lives"><Link className="sf-link" to="/services/seo">SEO services</Link></td></tr>
                <tr><td data-th="The job">Pay for clicks, and track them</td><td data-th="Where it lives"><Link className="sf-link" to="/services/google-ads">Google Ads management</Link></td></tr>
                <tr><td data-th="The job">Connect the tools behind it all</td><td data-th="Where it lives"><Link className="sf-link" to={MARTECH}>MarTech consulting</Link></td></tr>
                <tr><td data-th="The job">Send people somewhere that converts</td><td data-th="Where it lives"><Link className="sf-link" to="/services/website-development">Website development</Link></td></tr>
              </tbody>
            </table>
          </div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> We tell you which channel to start with, so you do not pay for five at once.</p>
        </SmartSection>

        {/* 5 · who this suits: stat band */}
        <SmartSection id="suits" labelledBy="h-suits"
          heading={{ id: "h-suits", kicker: "Who it is for", title: "Small business marketing services: who this suits", lede: "Digital marketing for small business suits teams that do not have a person for every channel." }}>
          <StatBand items={[
            { num: "84.7%", label: "of Chester County employer businesses have under 20 employees", src: "U.S. Census Bureau, 2023" },
            { num: "84.0%", label: "of Philadelphia County employer businesses have under 20 employees", src: "U.S. Census Bureau, 2023" },
            { num: "83.8%", label: "of Pennsylvania employer businesses have under 20 employees", src: "U.S. Census Bureau, 2023" },
          ]} />
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> Most employer businesses around us are small, and small teams feel a missed content calendar first.</p>
          <GoDeeper label="how small teams use this service">
            <p className="sf-rule">If your marketing is one person doing everything, or nobody doing it on Friday afternoon, the useful question is what to hand off. Start with the repetitive work: scheduling, list handling and the recurring report.</p>
            <p>We are four people in Malvern, Pennsylvania, so you talk to the people doing the work. We offer 24/7 support and hypercare after launch.</p>
          </GoDeeper>
        </SmartSection>

        {/* 6 · what it costs: wage chart (method, no prices) */}
        <SmartSection id="cost" tone="surface" labelledBy="h-cost"
          heading={{ id: "h-cost", kicker: "Cost", title: "What it costs, and why it varies", lede: "Social media management is priced by scope, so the figure follows the accounts, channels and content you need." }}>
          <div style={{ marginTop: 40 }}>
            <BarPlate fig={2} title="Bar chart: 2025 U.S. salary for an in-house marketing specialist and marketing manager, average and median"
              desc="Marketing specialist average 89,490 dollars and median 78,760 dollars; marketing manager average 177,770 dollars and median 166,790 dollars."
              stamp="In-house hire, salary only" caption="U.S. Bureau of Labor Statistics, 2025 annual. Wages only, before benefits, tools and management time. A yardstick, not a quote."
              rows={[
                { label: "Marketing specialist, average", value: 89490, text: "$89,490" },
                { label: "Marketing specialist, median", value: 78760, text: "$78,760" },
                { label: "Marketing manager, average", value: 177770, text: "$177,770", accent: true },
                { label: "Marketing manager, median", value: 166790, text: "$166,790", accent: true },
              ]} />
          </div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> An in-house hire is the honest comparison, and the wage data is public.</p>
          <GoDeeper label="what sets the price">
            <p className="sf-rule">Three things move it: the number of accounts and channels we run, how much content is planned and published, and how much reporting and approval you want. We do not publish prices, and we scope your work in a conversation first.</p>
          </GoDeeper>
        </SmartSection>

        <OfferBand heading="Not sure what to hand off?" line="Tell us the goal; we say what we would run first." label="Talk to a marketing specialist" />

        {/* 7 · what this is, and what it isn't (verbatim) */}
        <SmartSection id="why" labelledBy="h-why"
          heading={{ id: "h-why", kicker: "Straight talk", title: "What this is, and what it isn't", lede: "Four plain statements about how we work, including the case studies we do not have." }}>
          <HoverCards cols={2} items={BENEFITS} />
          <div className="sf-links" style={{ marginTop: 32 }}>
            <Link className="sf-link" to="/services/salesforce-marketing-cloud-consulting">Salesforce Marketing Cloud consulting</Link>
            <Link className="sf-link" to="/industries/marketing">Marketing industry page</Link>
          </div>
          <div style={{ marginTop: 24 }}><SfButton to={CONTACT} cta="related">Tell us what your marketing should do</SfButton></div>
        </SmartSection>

        <ServiceCities svc="marketing" title="Digital marketing by city and state" lede="Marketing pages for the places with the most search demand, each built from that place's own Census and search data." />
        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Social media management questions</h2>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SmartSection id="sources" compact labelledBy="h-sources">
          <p className="sf-mono" id="h-sources">Updated <time dateTime="2026-10-31">October 31, 2026</time>. Every figure on this page names its publisher and read date. <Verify id="mkt-sources">Sources</Verify></p>
        </SmartSection>
        <SourcesDialog id="mkt-sources" title="Sources for this page" intro="Every figure on this page names its publisher and the date a person at OneAlgorithm read it. The source pages are listed here." sources={SOURCES} />

        <DeskCTA
          form={{ topic: "marketing", topicLabel: "Marketing", need: "marketing", heading: "Tell us what your marketing is for", prompt: "More enquiries, a channel that has gone quiet, or a calendar nobody has time to fill?", submitLabel: "Talk to an expert" }}
          heading="Tell us what your marketing should do"
          lede="Tell us which job it is, and we will tell you what we would run first."
          coversLabel="What to have ready"
          covers={["The Facebook Pages and Instagram accounts you want managed", "The CRM or email tool leads should land in", "The one result that would make this worth it"]}
          next={["Send the short note on the contact page.", "A person at OneAlgorithm reads it and replies.", "We agree the scope before any work starts."]}
          hcLink={false}
        />
      </SfPage>
    </Layout>
  );
}
