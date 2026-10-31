import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SfButton, SmartSection, SmartUnit, GoDeeper, SourcesDialog, Verify, Readouts, StageRail, FAQ, DeskCTA,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
import { SF_LISTING_ID, SF_APPEXCHANGE_URL, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { VisualStyles, HoverCards } from "../../components/v2/marketing-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { CaseCard } from "../../components/v2/shared-CaseCard";
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
const TITLE = "Custom Software Development Company | OneAlgorithm";
const DESCRIPTION =
  "Portals, internal tools and web apps where the code and cloud accounts are in your name from day one. Built from Malvern, PA. Talk to us: (610) 890-9711.";
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
  { q: "How much does custom software development cost?", a: "Cost depends on scope, integrations, the number of users, compliance needs, hosting and support. A number quoted before discovery is a guess, so we scope the work first and put it in writing. We print no price list, and you keep the findings and the written quote whether or not you hire us.", link: { to: "#cost", label: "What drives the cost" } },
  { q: "How long does custom software development take?", a: "It depends on the size of the system: user roles, integrations and screens decide it. After a short discovery we give you a written plan with dates. You also see working software in a preview environment as it is built, so progress is visible every week instead of being revealed at launch.", link: { to: "#process", label: "How a project runs" } },
  { q: "Who owns the code and the cloud accounts?", a: "You do, from day one. The repository, cloud accounts, domain and database are created in your company's name with your billing, and any Apple or Google developer accounts a project needs belong in your name too. We work inside them as your team, so handover is a non-event.", link: { to: "#own", label: "What you own when we finish" } },
  { q: "Can you take over an app someone else built?", a: "Yes, after an audit. We check who controls the code and the accounts, where security stands and what launching would take. The findings decide whether to take it over, rebuild it or extend it, and you keep them whether or not you hire us. We do not assume any particular prototype tool.", link: { to: "#own", label: "Already have an app?" } },
  { q: "What is custom application development?", a: "Custom application development is software built for one organization's process rather than bought off the shelf. It covers internal tools, customer portals, web applications and apps on platforms such as Salesforce. The code is written for you and held by you, so the software can change when your business does." },
  { q: "What happens after launch?", a: "The application keeps running and keeps changing. We provide 24/7 support and a hypercare period after go-live, when fixes arrive fastest. A written runbook means your own team can also deploy, restore and respond without us, so you are never locked in to our availability." },
  { q: "Can you build a customer portal?", a: "Yes. A portal is mostly sign-in, roles and permissions done carefully: who sees which records, what each role can change and what gets logged. We build that foundation first, then the screens, and test that one customer can never open another customer's data. For a web build we have shipped, see the Phantom Arcades configurator.", link: { to: CONFIGURATOR, label: "3D product configurator case study" } },
  { q: "Do you build iOS and Android apps?", a: "Our shipped work is web: a 3D configurator, websites and web applications. A store app only makes sense when a phone feature is the point, and it needs Apple and Google developer accounts in your name. We tell you whether it fits before any work starts, and we make no native-app promise.", link: { to: "#web-or-mobile", label: "Web app or mobile app?" } },
  { q: "What do you need from us to start?", a: "Four things: the goal, who will use it, the systems it must connect to, and who owns the accounts today. A short note is enough to begin. We reply with the questions that decide scope, and discovery turns the answers into a written plan you can take to anyone." },
  { q: "Do you work with businesses outside Pennsylvania?", a: "Yes. We are based in Malvern, PA and work remotely with businesses across the United States. Web and Salesforce work is delivered inside accounts in your name, so location does not matter. We meet in person around Philadelphia and Chester County when it helps.", link: { to: "/services/staff-augmentation", label: "Add a developer to your team" } },
];

const OWNERSHIP = [
  "The source code, in a repository your company owns, not a developer's personal account.",
  "The cloud accounts the app runs on, in your name, with your billing and your login.",
  "The domain and the database, so a new developer can pick the work up without tracking down a contractor.",
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
          "Custom software development",
          URL,
          { areaServed: { "@type": "Country", name: "United States" } },
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
        lede="We build the applications a business runs on — internal control panels, web apps, customer portals and Salesforce applications. The part most people find out about too late is ownership: whose repository it lives in, whose cloud account it runs on, and who holds the keys. We set that up in your name on day one."
        panel={{
          title: "What we build",
          items: [
            "Internal tools and control panels",
            "Web apps, portals and internal tools",
            "Customer-facing web applications",
            "Salesforce and platform apps",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact?need=app-development" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      <SfPage crumbs={[{ label: "Application development" }]}>
        <VisualStyles />

        {/* 1 · HERO HAND-OFF: definition (answer block) over the ownership plate */}
        <SmartSection id="what-is" labelledBy="h-what-is"
          heading={{ id: "h-what-is", kicker: "The short answer", title: "What a custom software development company does", lede: "It builds portals, internal tools and web apps around how one business works, instead of selling you a licence." }}>
          <div style={{ marginTop: 40 }}><OwnershipPlate fig={1} /></div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> The code, the cloud accounts and the keys are in your company&rsquo;s name from day one, so the software stays yours.</p>
          <GoDeeper label="what custom software means, and when it pays">
            <p className="sf-rule">A software development company writes software for one organization&rsquo;s process. Custom software development is the work of turning a spreadsheet, an inbox or an off-the-shelf workaround into an application built for the way your people actually work.</p>
            <p>It is the right call when the process is your advantage, when a product forces workarounds, or when you need a portal, a control panel or a web app that nothing on the shelf provides.</p>
          </GoDeeper>
        </SmartSection>

        <OfferBand />

        <SmartSection id="proof-strip" tone="surface" compact labelledBy="h-proof-strip">
          <h2 className="sf-h3" id="h-proof-strip" style={{ marginBottom: 20 }}>Who you are hiring</h2>
          <ProofStrip variant="salesforce" />
        </SmartSection>

        {/* 2 · what we build: hover cards */}
        <SmartSection id="build" labelledBy="h-build"
          heading={{ id: "h-build", kicker: "What we build", title: "Custom software we build for businesses", lede: "Software for the work a spreadsheet, an inbox or an off-the-shelf product has stopped handling well." }}>
          <HoverCards numbered cols={3} items={[
            { title: "Internal tools and control panels", body: "Screens showing what is happening across the company, who owes what and what needs a decision today. Usually this replaces a spreadsheet three people email around." },
            { title: "Customer portals and web applications", body: "Sign-in, roles and permissions first, screens second. We test that one customer can never open another customer's data before anything else." },
            { title: "Salesforce and platform apps", body: <>Lightning applications, Flow automation and API integration inside an org you own. <Link className="sf-link" to="/services/salesforce">Salesforce consulting</Link></> },
          ]} />
          <GoDeeper label="what a portal build covers">
            <p className="sf-rule">Sign-in and password recovery, role-based access to each record, file uploads, notifications, payments where needed, and the admin tools staff use to support customers. Each is built as part of the foundation, with the access rules tested before launch. If your customers already live in Salesforce, a portal can read from it instead of copying data into a second system.</p>
            <div className="sf-links"><Link className="sf-link" to="/services/website-development">Website development</Link><Link className="sf-link" to="/industries/ecommerce">Ecommerce website development</Link></div>
          </GoDeeper>
        </SmartSection>

        {/* 3 · proof band (night) */}
        <SmartSection id="work" tone="night" labelledBy="h-work"
          heading={{ id: "h-work", kicker: "Proof", title: "Work we have shipped", lede: "Things you can open or read about, described as what they are." }}>
          <div style={{ marginTop: 40 }}><ConfiguratorPlate fig={2} /></div>
          <div className="sf-grid" style={{ marginTop: 40 }}>
            <div className="sf-c6"><CaseCard title="A 3D product configurator" built="For Phantom Arcades we built the eight-cabinet 3D configurator in three.js." to={CONFIGURATOR} linkLabel="Read the configurator case study" /></div>
            <div className="sf-c6"><CaseCard title="The Boards Professor" built="A site we built for a tutoring company." to="/services/website-development" linkLabel="Our website development work" /></div>
          </div>
        </SmartSection>

        {/* 4 · ownership: split text + take-over card */}
        <SmartSection id="own" grid labelledBy="h-own">
          <SmartUnit className="sf-c7" headingId="h-own" title="What you own when we finish"
            lede="The code, the cloud accounts and the domain are created in your name on day one, not transferred at the end."
            lead="The costliest problem in custom software is rarely the code; it is finding out later that nobody at your company can log in."
            points={["Source code in a repository your company owns", "Cloud accounts in your name, with your billing", "A written runbook: deploy, restore, what to do at 2am"]}>
            <GoDeeper label="the five things you hold at handover">
              <ul className="sf-rule">{OWNERSHIP.map((o) => <li key={o}>{o}</li>)}</ul>
              <p>We are specific because we have audited projects where none of this was true, and repairing it costs far more than doing it right at the start.</p>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c5">
            <div style={{ padding: 24, background: "var(--surface)", border: "1px solid var(--hair-s)" }}>
              <h3 className="sf-h3" style={{ margin: 0 }}>Already have an app or a prototype?</h3>
              <p>We start with an audit: who controls the repository, the cloud and the keys, where security stands and what launch would take. You get the findings whether or not you hire us.</p>
              <SfButton to="/contact?need=app" cta="app-review">Ask for an app review</SfButton>
            </div>
          </div>
        </SmartSection>

        {/* 5 · process: the stage rail */}
        <SmartSection id="process" tone="surface" labelledBy="h-process"
          heading={{ id: "h-process", kicker: "Process", title: "How a custom software project runs", lede: "Six steps from first conversation to handover, with working software in front of you well before launch." }}>
          <div style={{ marginTop: 40 }}>
            <StageRail fig={3} stations={[
              { k: "s1", num: "01", title: "Discovery", sub: "people · data · systems" },
              { k: "s2", num: "02", title: "Design", sub: "real tasks first" },
              { k: "s3", num: "03", title: "Build in a preview", short: "Preview build", sub: "in your accounts" },
              { k: "s4", num: "04", title: "Security review", short: "Security", sub: "access · secrets" },
              { k: "s5", num: "05", title: "Launch", sub: "your approval" },
              { k: "s6", num: "06", title: "Handover and support", short: "Handover", sub: "24/7 · hypercare" },
            ]} title="Diagram of the six steps of a custom software project" desc="A rail runs through six stations: discovery, design, build in a preview, security review, launch, handover and support."
              stamp="How a custom software project runs" caption="You review the real build in a preview while it is under way, and launch needs your approval, with a way back." />
          </div>
          <GoDeeper label="the six steps in detail">
            <ol className="sf-rule" style={{ display: "grid", gap: 12, paddingLeft: 20 }}>
              {STEPS.map(([t, dd]) => <li key={t}><strong>{t}.</strong> {dd}</li>)}
            </ol>
          </GoDeeper>
        </SmartSection>

        {/* 6 · cost: comparison tables (no prices) */}
        <SmartSection id="cost" labelledBy="h-cost"
          heading={{ id: "h-cost", kicker: "Cost", title: "What custom software development costs", lede: "Cost follows six drivers, and a good quote names every one of them before anyone writes code." }}>
          <div className="mk-table-wrap" style={{ marginTop: 40 }}>
            <table className="mk-table">
              <thead><tr><th scope="col">Driver</th><th scope="col">What it changes</th></tr></thead>
              <tbody>{DRIVERS.map(([t, dd]) => <tr key={t}><td data-th="Driver">{t}</td><td data-th="What it changes">{dd}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> A number quoted before discovery is a guess, and the gap is paid for later in change requests.</p>
          <GoDeeper label="custom software or off-the-shelf?">
            <div className="mk-table-wrap">
              <table className="mk-table">
                <thead><tr><th scope="col">Your situation</th><th scope="col">Usually</th><th scope="col">Why</th></tr></thead>
                <tbody>
                  <tr><td data-th="Your situation">A product already fits how you work</td><td data-th="Usually">Buy</td><td data-th="Why">Nothing to build or maintain.</td></tr>
                  <tr><td data-th="Your situation">Your process is the advantage</td><td data-th="Usually">Build</td><td data-th="Why">Software shaped to it, held by you.</td></tr>
                  <tr><td data-th="Your situation">A platform covers the core</td><td data-th="Usually">Extend</td><td data-th="Why">Salesforce for the core, custom pieces around it.</td></tr>
                </tbody>
              </table>
            </div>
          </GoDeeper>
        </SmartSection>

        <OfferBand heading="Want a written quote?" line="Tell us what it must do; we reply with the questions that decide scope." label="Ask for a written quote" />

        {/* 7 · web or mobile: decision plate */}
        <SmartSection id="web-or-mobile" labelledBy="h-web"
          heading={{ id: "h-web", kicker: "Platform", title: "Web app or mobile app?", lede: "Start on the web unless a phone feature, such as the camera or offline use, is the whole point." }}>
          <div style={{ marginTop: 40 }}><DecisionPlate fig={4} /></div>
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> A web application reaches every device from one build, with no store review between you and your users.</p>
          <GoDeeper label="how Apple's rule shapes the decision">
            <p className="sf-rule">Apple&rsquo;s App Store Review Guidelines, section 4.2, say an app should include features and content that elevate it beyond a repackaged website. If the same thing works in a browser, a store app adds review time and two more accounts to maintain without adding value. Our shipped work is web, and if a store app is the goal, the Apple and Google developer accounts belong in your name.</p>
            <p>We build on common, well-supported tools so another team can maintain the result: React and TypeScript for interfaces, Node and TypeScript services with a relational database such as PostgreSQL, and Salesforce Lightning, Flow and Apex when the work belongs next to your CRM.</p>
          </GoDeeper>
        </SmartSection>

        {/* 8 · local: readout band */}
        <SmartSection id="local" tone="surface" labelledBy="h-local"
          heading={{ id: "h-local", kicker: "Local", title: "Custom software in Philadelphia and Chester County", lede: "We work from Malvern, PA, so a first conversation can be a coffee rather than a screen share." }}>
          <Readouts withEvidence={false} items={[
            { value: 28480, label: "software developers in the Philadelphia area, May 2025", source: "U.S. Bureau of Labor Statistics" },
            { value: 99, label: "dollars a year for an Apple developer account, held in your name", source: "Apple Developer Program" },
            { value: 25, label: "dollars, once, for a Google Play account, held in your name", source: "Google Play Console" },
          ]} />
          <p className="sf-measure" style={{ marginTop: 32 }}><span className="sf-lead-in">Why it matters:</span> Plenty of developers are nearby; the difference is whether the one you hire hands you the keys.</p>
          <div className="sf-links" style={{ marginTop: 16 }}>
            <Link className="sf-link" to="/services">Services</Link>
            <Link className="sf-link" to="/services/it-consulting">IT consulting services</Link>
            <Link className="sf-link" to="/services/staff-augmentation">Add a developer to your team</Link>
          </div>
          <GoDeeper label="where we are and the wider market">
            <p className="sf-rule">We are in Malvern, PA, in person around Philadelphia and Chester County when it helps, and everything else runs remotely inside your accounts. The same Bureau of Labor Statistics release counts 1,687,890 software developers across the United States.</p>
          </GoDeeper>
        </SmartSection>

        <SmartSection id="faq" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Custom software questions</h2>
            <p className="sf-lede" data-lede="">Straight answers on cost, ownership, timing and what happens after launch.</p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        <SmartSection id="sources" compact labelledBy="h-sources">
          <p className="sf-mono" id="h-sources">Updated <time dateTime="2026-10-31">October 31, 2026</time>. Every figure on this page names its publisher and read date. <Verify id="sources">Sources</Verify></p>
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
