import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SfButton, SmartSection, GoDeeper, SourcesDialog, Verify, Readouts, StageRail, FAQ, DeskCTA,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
import { SF_LISTING_ID, SF_APPEXCHANGE_URL, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { VisualStyles, HoverCards } from "../../components/v2/marketing-Visuals";
import { OwnershipPlate, ConfiguratorPlate, DecisionPlate } from "../../components/v2/app-dev-Plates";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/application-development. Rebuilt 2026-10-31 in the sf v2 kit (sitewide SEO run, group app-dev);
 * revision round 2 (critic.md): shorter, visual-led, story order sections -> proof -> FAQ -> one Sources line -> CTA last.
 * The hero (PageHero) is kept exactly as it was; everything below it is new.
 *
 * ⛔ CLAIM LIMITS (answers.md / resolved-questions.md Q18, app-dev.md):
 *  - No native app shipped by us: mobile is only discussed as a decision (Apple 4.2), never as delivery.
 *  - No prices or ranges: the cost section names drivers only. The only figures are the official platform fees
 *    (Apple, Google) and BLS counts, all behind the ONE sources dialog with publisher and date.
 *  - Proof allowed: Phantom 3D configurator (live case study), The Boards Professor as "a site we built" with no
 *    claims, Salesforce's AppExchange record. No Holy Moly, no IdeaForge, no counts,
 *    no ratings, no AggregateRating.
 *  - Body links are in-site only; off-site sources live inside SourcesDialog. */

const PATH = "/services/application-development";
const URL = `https://onealgorithm.com${PATH}`;
const TITLE = "Custom Software Development Company | One Algorithm";
const DESCRIPTION =
  "Portals, internal tools and web apps where the code and cloud accounts are in your name from day one. Built from Malvern, PA.";
const OG = "https://onealgorithm.com/og-image.jpg";
const READ = "read 31 October 2026";
const CONFIGURATOR = "/blog/product-configurator-case-study-phantom-arcades/";

/* ONE consolidated sources dialog for the page. */
const SOURCES: SfSource[] = [
  { name: "Apple Developer Program", what: "Annual membership: $99 per year. Publisher: Apple.", read: READ, page: "https://developer.apple.com/programs/" },
  { name: "Google Play Console, registration", what: "One-time registration fee: US$25. Publisher: Google.", read: READ, page: "https://support.google.com/googleplay/android-developer/answer/6112435" },
  { name: "App Store Review Guidelines, 4.2 Minimum Functionality", what: "An app should include features and content that elevate it beyond a repackaged website. Publisher: Apple.", read: READ, page: "https://developer.apple.com/app-store/review/guidelines/" },
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics", what: "Software developers (SOC 15-1252), May 2025 estimates: 1,687,890 employed in the United States; 28,480 in the Philadelphia-Camden-Wilmington area (area code 37980).", read: READ, page: "https://www.bls.gov/oes/" },
  { name: "Salesforce AppExchange, OneAlgorithm consulting partner listing", what: `Consulting Partner, Select tier. Salesforce's record, not ours; listing ${SF_LISTING_ID}.`, read: `read ${SF_VERIFIED_LABEL}`, page: SF_APPEXCHANGE_URL },
];

const FAQS: SfFaqItem[] = [
  {
    q: "What is custom application development?",
    a: "Custom application development is building software around how your business actually runs, instead of bending the business to fit a product. It covers internal tools, customer portals, web applications and apps on platforms like Salesforce, and the code is written for you rather than licensed.",
  },
  {
    q: "How much does custom software development cost?",
    a: "It depends on a short list of drivers: how many user roles there are, how many systems it connects to, how much data has to move in, what must be secure, and how much design the screens need. We scope those first and give you a written quote you can compare, rather than a number from a web form.",
    link: { to: "#cost", label: "What drives the cost" },
  },
  {
    q: "How long does application development take?",
    a: "It follows the same drivers as cost, and the honest answer comes after a short discovery, not before. What we commit to is the rhythm: you see working software in a preview environment as it is built, so the schedule is visible every week rather than revealed at the end.",
    link: { to: "#process", label: "How a project runs" },
  },
  {
    q: "Who owns the code and the cloud accounts?",
    a: "You do, from day one. The repository, the cloud accounts, the domain, the database and any App Store or Google Play developer accounts are created in your company's name with your billing. We work inside them as your team, so handover is a non-event.",
    link: { to: "#own", label: "What you own when we finish" },
  },
  {
    q: "Can you take over an app someone else built?",
    a: "Yes. We start with a review: who controls the code and the accounts, what the security exposure is, and what it would take to launch. A prototype often proves the idea well and needs its data model, sign-in and permissions rebuilt before real customers use it. You get the findings whether or not you hire us.",
  },
  {
    q: "Should we build custom software or buy off the shelf?",
    a: "Buy when an existing product already fits how you work; build when your process is the advantage or the fit is worth less than the workarounds it forces. Often the answer is both: a platform such as Salesforce for the core, with custom pieces around it.",
    link: { to: "/services/salesforce", label: "Salesforce consulting" },
  },
  {
    q: "What happens after launch?",
    a: "The application keeps running and keeps changing. We provide 24/7 support and a hypercare period after go-live, when fixes arrive fastest, and the written runbook means your own team can also deploy, restore and respond without us.",
  },
  {
    q: "Should it be a web app or a mobile app?",
    a: "Start with the web unless a phone feature is the point. A web application reaches every device with one build and no store review. Apple's guidelines expect an app to elevate itself beyond a repackaged website, so a store app should earn its place with something a browser cannot do.",
    link: { to: "#web-or-mobile", label: "Web app or mobile app" },
  },
  {
    q: "Can you build a customer portal?",
    a: "Yes. A portal is mostly sign-in, roles and permissions done carefully: who can see which records, what each role can change, and what gets logged. We build those as the foundation first and the screens on top, then test that one customer can never open another customer's data.",
    link: { to: "#build", label: "What we build" },
  },
];

const OWNERSHIP = [
  "The source code, in a repository your company owns, not a developer's personal account.",
  "The cloud accounts the app runs on, in your name, with your billing and your login.",
  "The signing keys and any store listings, so you can publish a new version without tracking down a contractor.",
  "A real production environment, not a trial or demo instance the app can never be promoted out of.",
  "Written-down operations: how it deploys, how it is restored, and what to do at 2am.",
];

const STEPS: [string, string][] = [
  ["Discovery", "We map the people who use it, the data it holds and the systems it touches. You get a written scope you can take to anyone."],
  ["Design", "Screens for the real tasks first, tested on paper or a clickable draft before any code is written."],
  ["Build in a preview", "Working software on a preview address from the first weeks, in your accounts, so you review the real thing."],
  ["Security review", "Access control on every record, secrets out of the codebase, dependencies checked and a restore actually tested."],
  ["Launch", "A planned release from a gate that needs your approval, with a way back if something is wrong."],
  ["Handover and support", "The runbook, the keys and the logins are already yours. We stay on for hypercare and 24/7 support."],
];

const DRIVERS: [string, string][] = [
  ["User roles", "Every extra role means another set of screens and permissions to build and test."],
  ["Integrations", "Each system it must read from or write to, whether accounting, CRM or payments, adds work and failure modes."],
  ["Data you bring in", "Moving years of spreadsheets or an old system's records takes mapping, cleaning and reconciling."],
  ["Security and compliance", "Payments, personal data and audit trails raise the testing and the documentation."],
  ["Design and polish", "A utilitarian back office and a branded customer experience are different amounts of work."],
  ["Run and change", "Support hours, hosting and the pace of later changes are a running cost, not a one-time one."],
];

export default function ApplicationDevelopment() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords:
      "custom software development company, application development, web application development, custom app development, customer portal development, software development company Philadelphia, Malvern PA",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: OG,
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: OG,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Application Development",
          "Custom application development covering internal tools and control panels, customer portals and web applications, and Salesforce platform applications, delivered with the source code, cloud accounts and signing keys held by the client from day one.",
          "Software Development",
          URL,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL, { dateModified: "2026-10-31" })} />

      {/* HERO: kept exactly as it was (component, text, panel). Only the primary button's target carries the topic. */}
      <PageHero
        eyebrow="Application Development"
        title={
          <>
            Software your company{" "}
            <span className="text-oa-orange">actually owns</span>
          </>
        }
        lede="We build the applications a business runs on — internal control panels, mobile apps, customer portals and Salesforce applications. The part most people find out about too late is ownership: whose repository it lives in, whose cloud account it runs on, and who holds the keys. We set that up in your name on day one."
        panel={{
          title: "What we build",
          items: [
            "Internal tools and control panels",
            "Mobile apps, iOS and Android",
            "Customer-facing web applications",
            "Salesforce and platform apps",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact?need=app-development" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      <SfPage crumbs={[{ label: "Application development" }]}>
        <VisualStyles />

        {/* 1 · HERO HAND-OFF: the ownership plate */}
        <SmartSection id="own" labelledBy="h-own"
          heading={{ id: "h-own", kicker: "Ownership", title: "What you own when we finish", lede: "The code, the cloud accounts and the signing keys are created in your name on day one, not transferred at the end." }}>
          <div style={{ marginTop: 40 }}><OwnershipPlate fig={1} /></div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> The costliest problem in custom software is rarely the code; it is finding out later that nobody at your company can log in.</p>
          <GoDeeper label="the five things you hold at handover">
            <ul className="sf-rule">{OWNERSHIP.map((o) => <li key={o}>{o}</li>)}</ul>
            <p>We are specific because we have audited projects where none of this was true, and repairing it costs far more than doing it right at the start. An account held by a contractor turns every future update into a negotiation with that contractor.</p>
          </GoDeeper>
        </SmartSection>

        {/* 2 · what we build: hover cards */}
        <SmartSection id="build" tone="surface" labelledBy="h-build"
          heading={{ id: "h-build", kicker: "What we build", title: "Software we build for businesses", lede: "Custom software for the work a spreadsheet, an inbox or an off-the-shelf product has stopped handling well." }}>
          <HoverCards numbered cols={4} items={[
            { title: "Internal tools", body: "Control panels showing what is happening across the company, who owes what and what needs a decision today. Usually this replaces a spreadsheet three people email around." },
            { title: "Customer portals", body: "Sign-in, roles and permissions first, screens second. We test that one customer can never open another customer's data before anything else." },
            { title: "Salesforce and platform apps", body: <>Lightning applications, Flow automation and API integration inside an org you own. <Link className="sf-link" to="/services/salesforce">Salesforce consulting</Link></> },
            { title: "Already have an app?", body: "A prototype or an app another team built. We report who controls the code, where security stands and what launch would take, whether or not you hire us." },
          ]} />
          <div className="sf-links" style={{ marginTop: 24 }}>
            <SfButton to="/contact?need=app-development" cta="app-review">Ask for an app review</SfButton>
          </div>
          <GoDeeper label="what a portal build covers">
            <p className="sf-rule">Sign-in and password recovery, role-based access to each record, file uploads, notifications, payments where needed, and the admin tools staff use to support customers. Each is built as part of the foundation, with the access rules tested before launch. If your customers already live in Salesforce, a portal can read from it instead of copying data into a second system.</p>
            <div className="sf-links"><Link className="sf-link" to="/services/website-development">Website development</Link><Link className="sf-link" to="/services/it-consulting">IT consulting</Link></div>
          </GoDeeper>
        </SmartSection>

        {/* 3 · proof band (night) */}
        <SmartSection id="work" tone="night" labelledBy="h-work"
          heading={{ id: "h-work", kicker: "Proof", title: "Work we have shipped", lede: "Things you can open, read about or check, described as what they are." }}>
          <div style={{ marginTop: 40 }}><ConfiguratorPlate fig={2} /></div>
          <div className="sf-grid" style={{ marginTop: 40 }}>
            <div className="sf-c6">
              <h3 className="sf-h3">A 3D product configurator</h3>
              <p>For Phantom Arcades we built the eight-cabinet 3D configurator. The case study is live.</p>
              <div className="sf-links"><Link className="sf-link" to={CONFIGURATOR}>Read the configurator case study</Link></div>
            </div>
            <div className="sf-c6">
              <h3 className="sf-h3">Also on the list</h3>
              <p><strong>The Boards Professor</strong>, a site we built for a tutoring company, makes no claim about results. On the platform side, Salesforce lists us as a Consulting Partner, per Salesforce's AppExchange record.</p>
              <div className="sf-links"><Link className="sf-link" to="/services/website-development">Our website development work</Link></div>
            </div>
          </div>
        </SmartSection>

        {/* 4 · process: the stage rail */}
        <SmartSection id="process" labelledBy="h-process"
          heading={{ id: "h-process", kicker: "Process", title: "How an application project runs", lede: "Six steps from first conversation to handover, with working software in front of you well before launch." }}>
          <div style={{ marginTop: 40 }}>
            <StageRail fig={3} stations={[
              { k: "s1", num: "01", title: "Discovery", sub: "people · data · systems" },
              { k: "s2", num: "02", title: "Design", sub: "real tasks first" },
              { k: "s3", num: "03", title: "Build in a preview", short: "Preview build", sub: "in your accounts" },
              { k: "s4", num: "04", title: "Security review", short: "Security", sub: "access · secrets" },
              { k: "s5", num: "05", title: "Launch", sub: "your approval" },
              { k: "s6", num: "06", title: "Handover and support", short: "Handover", sub: "24/7 · hypercare" },
            ]} title="Diagram of the six steps of an application project" desc="A rail runs through six stations: discovery, design, build in a preview, security review, launch, handover and support."
              stamp="How an application project runs" caption="You review the real build in a preview while it is under way, and launch needs your approval, with a way back." />
          </div>
          <GoDeeper label="the six steps in detail">
            <ol className="sf-rule" style={{ display: "grid", gap: 12, paddingLeft: 20 }}>
              {STEPS.map(([t, dd]) => <li key={t}><strong>{t}.</strong> {dd}</li>)}
            </ol>
          </GoDeeper>
        </SmartSection>

        {/* 5 · cost: comparison table */}
        <SmartSection id="cost" tone="surface" labelledBy="h-cost"
          heading={{ id: "h-cost", kicker: "Cost", title: "What application development costs", lede: "Cost follows six drivers, and a good quote names every one of them before anyone writes code." }}>
          <div className="mk-table-wrap" style={{ marginTop: 40 }}>
            <table className="mk-table">
              <thead><tr><th scope="col">Driver</th><th scope="col">What it changes</th></tr></thead>
              <tbody>{DRIVERS.map(([t, dd]) => <tr key={t}><td data-th="Driver">{t}</td><td data-th="What it changes">{dd}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> A number quoted before discovery is a guess, and the gap is paid for later in change requests.</p>
          <div className="sf-links" style={{ marginTop: 16 }}><SfButton to="/contact?need=app-development" cta="quote">Ask for a written quote</SfButton></div>
        </SmartSection>

        {/* 6 · web or mobile: decision plate */}
        <SmartSection id="web-or-mobile" labelledBy="h-web"
          heading={{ id: "h-web", kicker: "Platform", title: "Web app or mobile app?", lede: "Start on the web unless a phone feature, such as the camera or offline use, is the whole point." }}>
          <div style={{ marginTop: 40 }}><DecisionPlate fig={4} /></div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> A web application reaches every device from one build, with no store review between you and your users.</p>
          <GoDeeper label="how Apple's rule and our stack shape the decision">
            <p className="sf-rule">Apple's App Store Review Guidelines, section 4.2, say an app should include features and content that elevate it beyond a repackaged website. If the same thing works in a browser, a store app adds review time and two more accounts to maintain without adding value.</p>
            <p>We build on common, well-supported tools so another team can maintain the result: React and TypeScript for interfaces, Node and TypeScript services with a relational database such as PostgreSQL, and Salesforce Lightning, Flow and Apex when the work belongs next to your CRM. Hosting sits in cloud accounts in your name.</p>
          </GoDeeper>
        </SmartSection>

        {/* 7 · local: readout band */}
        <SmartSection id="local" tone="surface" labelledBy="h-local"
          heading={{ id: "h-local", kicker: "Local", title: "In Philadelphia and Chester County", lede: "We work from Malvern, PA, so a first conversation can be a coffee rather than a screen share." }}>
          <Readouts withEvidence={false} items={[
            { value: 28480, label: "software developers in the Philadelphia area, May 2025", source: "U.S. Bureau of Labor Statistics" },
            { value: 99, label: "dollars a year for an Apple developer account, held in your name", source: "Apple Developer Program" },
            { value: 25, label: "dollars, once, for a Google Play account, held in your name", source: "Google Play Console" },
          ]} />
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> Plenty of developers are nearby; the difference is whether the one you hire hands you the keys.</p>
          <GoDeeper label="where we are and the wider market">
            <p className="sf-rule">We are at 625 Swedesford Rd, Unit B, Malvern, PA 19355, in person around Philadelphia and Chester County when it helps, and everything else runs remotely inside your accounts. The same Bureau of Labor Statistics release counts 1,687,890 software developers across the United States.</p>
            <div className="sf-links"><Link className="sf-link" to="/services/web-design-chester-county">Web design in Chester County</Link></div>
          </GoDeeper>
        </SmartSection>

        <SmartSection id="faq" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Application development questions</h2>
            <p className="sf-lede" data-lede="">Straight answers on cost, ownership, timing and what happens after launch.</p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        <SmartSection id="sources" compact labelledBy="h-sources">
          <p className="sf-mono" id="h-sources">Every figure on this page names its publisher and read date. <Verify id="sources">Sources</Verify></p>
        </SmartSection>
        <SourcesDialog id="sources" title="Sources for this page" sources={SOURCES} />

        <DeskCTA
          form={{
            topic: "app-development",
            topicLabel: "Application development",
            heading: "Tell us what you are building",
            prompt: "What should the application do, and who will use it?",
            submitLabel: "Talk to an expert",
            need: "app-development",
          }}
          heading="Start with a conversation about your app"
          lede="Tell us what the application should do, and we reply with the questions that decide scope and who will own what."
          coversLabel="What to have ready"
          covers={[
            "Who will use it, and what they do today",
            "The systems or spreadsheets it replaces",
            "Any existing code, prototype or accounts",
          ]}
          next={[
            "Send the short form on the contact page.",
            "A person at One Algorithm reads it and replies.",
            "If it fits, discovery starts with a written scope.",
          ]}
          hcLink={false}
        />
      </SfPage>
    </Layout>
  );
}
