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
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema } from "../../components/StructuredData";

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
const SEO_CASE = "/blog/seo-case-study-phantom-arcades/";
const CONTACT = contactHref("Marketing", PAGE_PATH, "marketing");

const SOURCES: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics", what: "Annual 2025 estimates: market research analysts and marketing specialists (SOC 13-1161) national mean $89,490, median $78,760; marketing managers (SOC 11-2021) national mean $177,770, median $166,790. Salary only, no benefits or overhead.", read: "read 31 October 2026", page: "https://www.bls.gov/oes/" },
  { name: "U.S. Census Bureau, County Business Patterns 2023", what: "Employer establishments with under 20 employees: Chester County, PA 84.7%; Philadelphia County, PA 84.0%; Pennsylvania 83.8%. Employer establishments only; sole proprietors are not counted.", read: "read 31 October 2026", page: "https://www.census.gov/programs-surveys/cbp.html" },
];

const FEATURES = [
  { title: "Campaign Management", body: "Campaign calendars, builds and launches across email, social and paid — planned far enough ahead that nothing ships the morning it is due." },
  { title: "AI-Driven Insights", body: "We use AI on the analysis side: clustering what an audience responds to, drafting variants worth testing. It suggests; a person decides what actually goes out." },
  { title: "Customer Journeys", body: "The sequence someone sees from first click to enquiry, written down and built in your CRM rather than held in one person's head." },
  { title: "ROI Tracking", body: "Spend, leads and cost per lead in one place, tied back to the CRM record — so the numbers hold up when somebody disputes them." },
  { title: "Lead Nurturing", body: "Automated follow-up that stops the moment someone replies. Most nurture sequences fail on exactly that detail." },
  { title: "Marketing Automation", body: <>The repetitive work — list uploads, tagging, assignment, the weekly report — handed to the tool instead of to a person on Friday afternoon. <Link className="sf-link" to={MARTECH}>Marketing automation consulting</Link></> },
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
  { q: "What does social media management include?", a: "It covers planning and publishing content, keeping profiles current, and reporting on what each channel delivers. We work inside the Facebook Pages and Instagram business accounts you own, with nothing published without your approval." },
  { q: "How much does social media management cost?", a: "The price follows the scope: how many accounts and channels, how much content is planned and published, and how much reporting you want. We scope it with you after a short conversation, so the figure matches the work instead of a package." },
  { q: "Is social media management worth it?", a: "It is worth it when a content calendar keeps going unfilled or the reporting is something nobody trusts. We have not published client marketing results, so ask what we would run in your first ninety days and judge the answer." },
  { q: "Do I keep ownership of my accounts?", a: "Yes. Your Pages, profiles and ad accounts stay yours throughout. You add One Algorithm as a partner on your own business account and can withdraw that access at any time, including the day we stop working together." },
  { q: "Do you need my passwords?", a: "No. You grant access as a partner on your own business account, so you never hand over a login. Our access ends when the engagement ends." },
  { q: "Do you manage both Facebook and Instagram?", a: "Yes. We manage Facebook Pages and Instagram business accounts that our clients connect to us, kept consistent with their brand, alongside any other channel a client asks us to run." },
  { q: "Are paid ads included in management?", a: "Paid ads are a separate piece of work unless we agree otherwise in writing. Campaign management across email, social and paid is something we plan with you, and the ad accounts stay yours." },
  { q: "How do you report on results?", a: "One report covers every channel: follower growth, reach and engagement collected from each connected account, plus leads and spend tied back to your CRM where one exists. It is written in plain language, not as dashboard screenshots." },
];

const TITLE = "Social Media Management Services | OneAlgorithm";
const DESCRIPTION = "Social media management and marketing services for small business: Facebook and Instagram business accounts you own, campaigns, lead follow-up and plain-number reporting.";

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
          "Social media management for client-owned Facebook Pages and Instagram business accounts — content planning, publishing and performance reporting — alongside campaign management, AI-driven insights and customer journey optimization.",
          "Marketing",
          "https://onealgorithm.com/services/marketing",
        )}
      />

      {/* HERO KEPT: same component, same text, same panel. */}
      <PageHero
        eyebrow="Marketing & Social Media"
        title={
          <>
            Marketing services &amp;{" "}
            <span className="text-oa-orange">social media management</span>
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
          heading={{ id: "h-social", kicker: "Facebook and Instagram", title: "Social Media Management", lede: "We run the Facebook Pages and Instagram business accounts you own, and report on what each one delivers." }}>
          <div style={{ marginTop: 40 }}><AccessPlate fig={1} /></div>
          <MarketingLedger items={SOCIAL_CAPABILITIES} label="Social media management capabilities" />
          <GoDeeper label="what social media management covers and includes">
            <p className="sf-rule">We manage the Facebook Pages and Instagram business accounts our clients own — planning and publishing content, keeping profiles current, and reporting on what each channel is delivering.</p>
            <p>A month contains a campaign calendar, the scheduled posts and launches on it, upkeep of the profiles, and one report you can read without logging into five tools. Paid advertising is not part of management unless we agree it in writing, nothing is published to your account without your approval, and search engine work is a separate service.</p>
            <div className="sf-links">
              <Link className="sf-link" to="/services/seo">SEO services</Link>
              <Link className="sf-link" to="/services/google-ads">Google Ads management</Link>
            </div>
          </GoDeeper>
        </SmartSection>

        {/* 2 · what we run: hover cards */}
        <SmartSection id="what" tone="surface" labelledBy="h-what"
          heading={{ id: "h-what", kicker: "Campaigns", title: "What we run beyond the posting", lede: "Six jobs, and all of them happen inside platforms you already own." }}>
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

        {/* 5 · who this suits: stat band */}
        <SmartSection id="suits" labelledBy="h-suits"
          heading={{ id: "h-suits", kicker: "Who it is for", title: "Who this suits", lede: "Digital marketing for small business suits teams that do not have a person for every channel." }}>
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

        {/* 7 · what this is, and what it isn't (verbatim) */}
        <SmartSection id="why" labelledBy="h-why"
          heading={{ id: "h-why", kicker: "Straight talk", title: "What this is, and what it isn't", lede: "Four plain statements about how we work, including the case studies we do not have." }}>
          <HoverCards cols={2} items={BENEFITS} />
          <div className="sf-links" style={{ marginTop: 32 }}>
            <Link className="sf-link" to={MARTECH}>Marketing automation consulting and MarTech</Link>
            <Link className="sf-link" to="/services/website-development">Website development</Link>
            <Link className="sf-link" to="/services/salesforce-marketing-cloud-consulting">Salesforce Marketing Cloud consulting</Link>
            <Link className="sf-link" to={SEO_CASE}>Phantom Arcades SEO case study</Link>
          </div>
          <div style={{ marginTop: 24 }}><SfButton to={CONTACT} cta="related">Tell us what your marketing should do</SfButton></div>
        </SmartSection>

        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Social media management questions</h2>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SmartSection id="sources" compact labelledBy="h-sources">
          <p className="sf-mono" id="h-sources">Every figure on this page names its publisher and read date. <Verify id="mkt-sources">Sources</Verify></p>
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
