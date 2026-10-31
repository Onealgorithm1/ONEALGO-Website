import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SfButton, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, DeskCTA, FAQ,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { MarketingLedger } from "../../components/v2/marketing-Ledger";
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
        {/* 1 · what we run */}
        <SmartSection id="what" grid labelledBy="h-what">
          <SmartUnit className="sf-c12" headingId="h-what" title="What we run beyond the posting"
            lede="Six jobs run for every client, and all of them happen inside platforms you already own."
            lead="Marketing that lives in your own accounts stays yours, whoever runs it."
            points={["Campaign calendars planned ahead, not the morning they are due", "Follow-up that stops the moment someone replies", "Spend and leads tied back to the CRM record"]}>
            <GoDeeper label="the six things we run">
              <MarketingLedger items={FEATURES} />
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 1b · two of the six, as units of their own */}
        <SmartSection id="nurture" tone="surface" grid labelledBy="h-nurture">
          <SmartUnit className="sf-c6" headingId="h-nurture" title="Lead nurturing that stops on reply"
            lede="Automated follow-up should stop the moment someone replies, and most sequences fail on exactly that detail."
            lead="A prospect who answers should hear from a person, not the next automated email."
            points={["Sequences built in your CRM, not held in one head", "Journeys written down from first click to enquiry"]}>
            <GoDeeper label="how lead nurturing and journeys work">
              <p className="sf-rule">We write the sequence someone sees from first click to enquiry, then build it in your CRM. The follow-up is automated, and the stop condition is part of the design: a reply ends the sequence.</p>
              <div className="sf-links"><Link className="sf-link" to={MARTECH}>Marketing automation consulting</Link></div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit className="sf-c6" headingId="h-roi" title="Reporting you can repeat" delay={0.08}
            lede="Spend, leads and cost per lead sit in one place, tied back to the CRM record."
            lead="Numbers that hold up when somebody disputes them are the only numbers worth reporting."
            points={["Reach, leads and spend in plain language", "AI suggests variants; a person decides what goes out"]}>
            <GoDeeper label="how ROI tracking and AI-driven insights work">
              <p className="sf-rule">We use AI on the analysis side: clustering what an audience responds to and drafting variants worth testing. It suggests; a person decides what actually goes out.</p>
              <p>Every lead is tied to its CRM record, so the cost per lead you see is the one your own system can confirm.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 2 · Social Media Management (compliance copy, anchor kept) */}
        <SmartSection id="social-media-management" tone="surface" grid labelledBy="h-social" className="scroll-mt-24">
          <SmartUnit className="sf-c12" headingId="h-social" title="Social Media Management"
            kicker="Facebook and Instagram"
            lede="We run the Facebook Pages and Instagram business accounts you own, and report on what each one delivers."
            lead="Social media management only works when the accounts stay yours and the reporting stays honest."
            points={["Day-to-day management of Pages and business accounts", "Campaign calendars, scheduled posts and coordinated launches", "Access you grant as a partner, and can withdraw"]}>
            <MarketingLedger items={SOCIAL_CAPABILITIES} label="Social media management capabilities" />
            <GoDeeper label="what social media management covers">
              <p className="sf-rule">We manage the Facebook Pages and Instagram business accounts our clients own — planning and publishing content, keeping profiles current, and reporting on what each channel is delivering.</p>
              <p>Small businesses rarely have a person for every channel, which is why this suits digital marketing for small business in particular: one team plans, publishes and reports, and the accounts remain yours.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 3 · what it includes (NEW) */}
        <SmartSection id="includes" grid labelledBy="h-includes">
          <SmartUnit className="sf-c7" headingId="h-includes" title="What social media management includes"
            lede="A month of management is planning, publishing, profile upkeep and one report, all inside your accounts."
            lead="Knowing what is in the month, and what is not, is how you compare any provider."
            points={["Planning and publishing across the channels you ask us to run", "Profiles kept current and consistent with your brand", "One plain-language report covering every channel"]}>
            <GoDeeper label="what a month contains and what is not included">
              <h3>What a month contains</h3>
              <p className="sf-rule">A campaign calendar, the scheduled posts and launches on it, upkeep of the profiles, and the figures each platform reports for the month, collected into one report you can read without logging into five tools.</p>
              <h3>What is not included</h3>
              <p>Paid advertising is not part of management unless we agree it in writing, and nothing is ever published to your account without your approval. Search engine work is a separate service.</p>
              <div className="sf-links">
                <Link className="sf-link" to="/services/seo">SEO services</Link>
                <Link className="sf-link" to="/services/google-ads">Google Ads management</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 4 · how it works (verbatim steps) */}
        <SmartSection id="how" tone="surface" grid labelledBy="h-how">
          <SmartUnit className="sf-c12" headingId="h-how" title="How it works"
            lede="Three steps: you grant access, we manage and measure, and you see the results."
            lead="Every step happens inside accounts you own, so you can step away whenever you like.">
            <MarketingLedger items={HOW_IT_WORKS} label="How it works" />
          </SmartUnit>
        </SmartSection>

        {/* 5 · platform data (verbatim paragraphs) */}
        <SmartSection id="platform-data" grid labelledBy="h-data">
          <SmartUnit className="sf-c12" headingId="h-data" title="How we use platform data"
            lede="We read only what your connected accounts show, and use it for one purpose: running and reporting on your marketing."
            lead="Your data is never sold, never mixed with another client's, and our access ends when the engagement does.">
            <GoDeeper label="the full data statement">
              <p className="sf-rule">To deliver this service we read information from the accounts our clients connect to us: Page and profile details, follower counts, post performance and engagement figures. We use it for one purpose — running and reporting on that client&rsquo;s own marketing.</p>
              <p>We do not sell it, we do not combine one client&rsquo;s data with another&rsquo;s, and our access ends when the engagement ends. Nothing is published to a client&rsquo;s account without their approval.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 6 · what it costs (method, no prices) */}
        <SmartSection id="cost" tone="surface" grid labelledBy="h-cost">
          <SmartUnit className="sf-c7" headingId="h-cost" title="What it costs, and why it varies"
            lede="Social media management is priced by scope, so the figure follows the accounts, channels and content you need."
            lead="An in-house hire is the honest comparison, and the wage data below is public."
            points={["Number of accounts and channels we run", "How much content is planned and published", "How much reporting and approval you want"]}>
            <p className="sf-mono">U.S. Bureau of Labor Statistics, 2025 annual · <Verify id="mkt-sources">Where these figures come from</Verify></p>
            <GoDeeper label="what an in-house marketing hire costs for comparison">
              <p className="sf-rule">Nationally, a marketing specialist (market research analysts and marketing specialists) averages $89,490 a year in salary, with a median of $78,760. A marketing manager averages $177,770, with a median of $166,790.</p>
              <p>Those are wages only, before benefits, tools, and the management time a hire needs. They are a yardstick, not a quote: we do not publish prices, and we scope your work in a conversation first.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 7 · who this suits */}
        <SmartSection id="suits" grid labelledBy="h-suits">
          <SmartUnit className="sf-c7" headingId="h-suits" title="Who this suits"
            lede="Digital marketing for small business suits teams that do not have a person for every channel."
            lead="Most employer businesses around us are small, and small teams feel a missed content calendar first."
            points={["84.7% of Chester County employer businesses have under 20 employees", "84.0% in Philadelphia County, 83.8% across Pennsylvania"]}>
            <p className="sf-mono">U.S. Census Bureau, County Business Patterns 2023 · <Verify id="mkt-sources">Where these figures come from</Verify></p>
            <GoDeeper label="how small teams use this service">
              <p className="sf-rule">If your marketing is one person doing everything, or nobody doing it on Friday afternoon, the useful question is what to hand off. Start with the repetitive work: scheduling, list handling and the recurring report.</p>
              <p>We are four people in Malvern, Pennsylvania, so you talk to the people doing the work. We offer 24/7 support and hypercare after launch.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 8 · why us (verbatim, incl. "No case studies") */}
        <SmartSection id="why" tone="surface" grid labelledBy="h-why">
          <SmartUnit className="sf-c12" headingId="h-why" title="What this is, and what it isn't"
            lede="Four plain statements about how we work, including the case studies we do not have.">
            <MarketingLedger items={BENEFITS} label="Why OneAlgorithm" />
          </SmartUnit>
        </SmartSection>

        {/* 9 · related */}
        <SmartSection id="related" grid labelledBy="h-related">
          <SmartUnit className="sf-c12" headingId="h-related" title="Related services"
            lede="Marketing automation, search and websites live on their own pages."
            lead="Pick the page that matches the job you need done.">
            <div className="sf-links">
              <Link className="sf-link" to={MARTECH}>Marketing automation consulting and MarTech</Link>
              <Link className="sf-link" to="/services/seo">SEO services</Link>
              <Link className="sf-link" to="/services/website-development">Website development</Link>
              <Link className="sf-link" to="/services/salesforce-marketing-cloud-consulting">Salesforce Marketing Cloud consulting</Link>
              <Link className="sf-link" to={SEO_CASE}>Phantom Arcades SEO case study</Link>
            </div>
            <div style={{ marginTop: 24 }}><SfButton to={CONTACT} cta="related">Tell us what your marketing should do</SfButton></div>
          </SmartUnit>
        </SmartSection>

        <DeskCTA
          form={{ topic: "marketing", topicLabel: "Marketing", need: "marketing", heading: "Tell us what your marketing is for", prompt: "More enquiries, a channel that has gone quiet, or a calendar nobody has time to fill?", submitLabel: "Talk to an expert" }}
          heading="Tell us what your marketing should do"
          lede="Tell us which job it is, and we will tell you what we would run first."
          coversLabel="What to have ready"
          covers={["The Facebook Pages and Instagram accounts you want managed", "The CRM or email tool leads should land in", "The one result that would make this worth it"]}
          next={["Send the short note on the contact page.", "A person at OneAlgorithm reads it and replies.", "We agree the scope before any work starts."]}
          hcLink={false}
        />

        <SmartSection id="faq" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Social media management questions</h2>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <SourcesDialog id="mkt-sources" intro="Every figure on this page names its publisher and the date a person at OneAlgorithm read it. The source pages are listed here." sources={SOURCES} />
      </SfPage>
    </Layout>
  );
}
