import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, LedgerRule, GoDeeper, SourcesDialog, Verify, AppExchangeEvidence, FAQ, DeskCTA,
  type SfFaqItem, type SfSource,
} from "../../components/sf";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/application-development. Rebuilt 2026-10-31 in the sf v2 kit (sitewide SEO run, group app-dev).
 * The hero (PageHero) is kept exactly as it was; everything below it is new.
 *
 * ⛔ CLAIM LIMITS (answers.md / resolved-questions.md Q18, app-dev.md):
 *  - No native app shipped by us: the old "native store builds from one codebase" line is GONE, and so is the
 *    release-pipeline line (held until Louis OKs it). Mobile is only discussed as a decision (Apple 4.2), never as delivery.
 *  - No prices or ranges: the cost section names drivers only. The only figures are the official platform fees
 *    (Apple, Google) and BLS counts, each behind an in-site sources dialog with publisher and date.
 *  - Proof allowed: Phantom 3D configurator (live case study), The Boards Professor as "a site we built" with no
 *    claims, One Hub (ours, no client named), Salesforce's AppExchange record. No Holy Moly, no IdeaForge, no counts,
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

const SOURCES_FEES: SfSource[] = [
  { name: "Apple Developer Program", what: "Annual membership: $99 per year. Publisher: Apple.", read: READ, page: "https://developer.apple.com/programs/" },
  { name: "Google Play Console, registration", what: "One-time registration fee: US$25. Publisher: Google.", read: READ, page: "https://support.google.com/googleplay/android-developer/answer/6112435" },
];
const SOURCES_APPLE: SfSource[] = [
  { name: "App Store Review Guidelines, 4.2 Minimum Functionality", what: "An app should include features and content that elevate it beyond a repackaged website. Publisher: Apple.", read: READ, page: "https://developer.apple.com/app-store/review/guidelines/" },
];
const SOURCES_BLS: SfSource[] = [
  { name: "U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics", what: "Software developers (SOC 15-1252), May 2025 estimates: 1,687,890 employed in the United States; 28,480 in the Philadelphia-Camden-Wilmington area (area code 37980).", read: READ, page: "https://www.bls.gov/oes/" },
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
    q: "Can you take over an app built in Lovable, Bubble or Bolt?",
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
    link: { to: "#portals", label: "Customer portals" },
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

const STACK: [string, string][] = [
  ["Front end", "React and TypeScript for interfaces that stay maintainable; three.js where a 3D view earns its place."],
  ["Back end", "Node and TypeScript services with a relational database such as PostgreSQL, behind authenticated routes."],
  ["Salesforce", "Lightning, Flow and Apex when the work belongs next to your CRM."],
  ["Hosting", "Cloud accounts in your name, chosen for your team's skills and budget rather than ours."],
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
        {/* 1 · what we build */}
        <SmartSection id="build" grid labelledBy="h-build">
          <SmartUnit className="sf-c7" headingId="h-build" title="Software we build for businesses"
            lede="Custom software for the work a spreadsheet, an inbox or an off-the-shelf product has stopped handling well."
            lead="The test for every application is whether the work gets easier once it ships, not whether it demos well."
            points={[
              "Internal tools and control panels for the people who run the company.",
              "Customer portals and web applications with accounts, payments and permissions.",
              "Salesforce and platform apps inside the org you already own.",
            ]}>
            <GoDeeper label="the three shapes of application">
              <h3 className="sf-h3">Internal tools and control panels</h3>
              <p className="sf-rule">What is happening across the company, who owes what, what needs a decision today. Usually this replaces a spreadsheet three people email around and nobody trusts.</p>
              <h3 className="sf-h3">Customer portals and web applications</h3>
              <p className="sf-rule">Portals, booking, marketplaces and ordering. Accounts, payments and permissions are the load-bearing parts, so they are built first rather than bolted on after the design is signed off.</p>
              <h3 className="sf-h3">Salesforce and platform apps</h3>
              <p className="sf-rule">Lightning applications, Flow automation and API integration inside an org you own. See our <Link className="sf-link" to="/services/salesforce">Salesforce consulting</Link> for the platform side.</p>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Already have an app?</h3>
            <p className="sf-measure">We review what exists and tell you where it stands. You keep the findings either way.</p>
            <GoDeeper label="what the review covers"><p className="sf-rule">Who controls the code and accounts, what the security exposure is, and what it would take to launch.</p></GoDeeper>
          </LedgerRule>
        </SmartSection>

        {/* 2 · work we have shipped */}
        <SmartSection id="work" tone="surface" labelledBy="h-work"
          heading={{ id: "h-work", kicker: "Proof", title: "Work we have shipped", lede: "Three things you can open, read about or check, described as what they are." }}>
          <div className="sf-grid" style={{ marginTop: 40 }}>
            <LedgerRule as="article" className="sf-c4">
              <h3 className="sf-h3">A 3D product configurator</h3>
              <p>For Phantom Arcades we built the eight-cabinet 3D configurator, the generated build archive and the room fit checker. The case study is live.</p>
              <div className="sf-links"><Link className="sf-link" to={CONFIGURATOR}>Read the configurator case study</Link></div>
            </LedgerRule>
            <LedgerRule as="article" className="sf-c4" delay={0.08}>
              <h3 className="sf-h3">The Boards Professor</h3>
              <p>A site we built for a tutoring company. It is a project card here and makes no claim about results.</p>
              <div className="sf-links"><Link className="sf-link" to="/services/website-development">Our website development work</Link></div>
            </LedgerRule>
            <LedgerRule as="article" className="sf-c4" delay={0.16}>
              <h3 className="sf-h3">One Hub, our own platform</h3>
              <p>A control plane for our own operations. We built it ourselves and run it.</p>
              <GoDeeper label="what it is"><p className="sf-rule">It pulls accounting, CRM, search and advertising into one place and surfaces what changed. It is not licensed or sold.</p></GoDeeper>
            </LedgerRule>
          </div>
          <p className="sf-mono" style={{ marginTop: 32 }}>
            On the platform side, Salesforce lists us as a Consulting Partner. <Verify id="appexchange">Salesforce's AppExchange record</Verify>
          </p>
        </SmartSection>

        {/* 3 · ownership (the spine) */}
        <SmartSection id="own" grid labelledBy="h-own">
          <SmartUnit className="sf-c6" headingId="h-own" title="What you own when we finish"
            lede="The code, the cloud accounts and the signing keys are created in your name on day one, not transferred at the end."
            lead="The costliest problem in custom software is rarely the code; it is finding out later that nobody at your company can log in."
            points={[
              "Your repository, your cloud accounts, your billing, from the first commit.",
              "Developer accounts for stores in your company's name, so you publish.",
              "Runbooks written down, so a deploy or a restore never needs us.",
            ]} measure={false}>
            <GoDeeper label="the five things you hold at handover">
              <ul className="sf-rule">{OWNERSHIP.map((o) => <li key={o}>{o}</li>)}</ul>
              <p>We are specific because we have audited projects where none of this was true, and repairing it costs far more than doing it right at the start.</p>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit className="sf-c6" delay={0.08} level={3} headingId="h-accounts" title="Store accounts are small and yours"
            lede="Apple's developer program and Google Play's console each cost a modest fee, and both belong in your company's name."
            lead="An account held by a contractor turns every future update into a negotiation with that contractor." measure={false}>
            <p className="sf-mono"><Verify id="fees">Official fees and their sources</Verify></p>
          </SmartUnit>
        </SmartSection>

        {/* 4 · process */}
        <SmartSection id="process" tone="surface" grid labelledBy="h-process">
          <SmartUnit className="sf-c5" headingId="h-process" title="How an application project runs"
            lede="Six steps from first conversation to handover, with working software in front of you well before launch."
            leadIn="What you get:" lead="A visible schedule: you review the real build in a preview, not a slide deck about it."
            points={[
              "A written scope after discovery that you can take to any developer.",
              "A preview you can click through while the build is still under way.",
              "A launch gate that needs your approval, and a way back.",
            ]} measure={false} />
          <ol className="sf-c7 sf-points" style={{ listStyle: "none", padding: 0, display: "grid", gap: 18 }}>
            {STEPS.map(([t, d], i) => (
              <li key={t}><span className="sf-mono">{String(i + 1).padStart(2, "0")}</span> <strong>{t}.</strong> {d}</li>
            ))}
          </ol>
        </SmartSection>

        {/* 5 · cost */}
        <SmartSection id="cost" grid labelledBy="h-cost">
          <SmartUnit className="sf-c5" headingId="h-cost" title="What application development costs"
            lede="Cost follows six drivers, and a good quote names every one of them before anyone writes code."
            lead="A number quoted before discovery is a guess, and the gap is paid for later in change requests."
            points={[
              "Scope, roles and integrations move cost more than screens do.",
              "Run costs such as hosting and support continue after launch.",
              "Compare quotes on what they assume, not on the headline.",
            ]} measure={false}>
            <div className="sf-links"><a className="sf-link" href="#start">Ask for a written quote</a></div>
          </SmartUnit>
          <div className="sf-c7">
            <dl className="sf-points" style={{ display: "grid", gap: 16 }}>
              {DRIVERS.map(([t, d]) => (
                <div key={t}><dt><strong>{t}</strong></dt><dd style={{ margin: 0 }}>{d}</dd></div>
              ))}
            </dl>
          </div>
        </SmartSection>

        {/* 6 · customer portals */}
        <SmartSection id="portals" tone="surface" grid labelledBy="h-portals">
          <SmartUnit className="sf-c7" headingId="h-portals" title="Customer portals, built carefully"
            lede="A customer portal is sign-in, roles and permissions first, and the screens are the easy part."
            lead="One customer seeing another customer's records is the failure that ends trust, so it is tested before anything else."
            points={[
              "Roles for customers, staff and administrators, each with its own limits.",
              "Every request checked against who is asking, not just who is signed in.",
              "Activity logged, so a question about who changed what has an answer.",
            ]}>
            <GoDeeper label="what a portal build covers">
              <p className="sf-rule">Sign-in and password recovery, role-based access to each record, file uploads, notifications, payments where needed, and the admin tools staff use to support customers. Each is built as part of the foundation, with the access rules tested before launch.</p>
              <p className="sf-rule">If your customers already live in Salesforce, a portal can read from it instead of copying data into a second system.</p>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Related work</h3>
            <p className="sf-measure">Portals often sit beside a public website. See our <Link className="sf-link" to="/services/website-development">website development</Link> and <Link className="sf-link" to="/services/it-consulting">IT consulting</Link>.</p>
          </LedgerRule>
        </SmartSection>

        {/* 7 · stack */}
        <SmartSection id="stack" grid labelledBy="h-stack">
          <SmartUnit className="sf-c5" headingId="h-stack" title="The stack we build on"
            lede="Common, well-supported tools that any competent developer can pick up, so you are never locked to us."
            lead="Boring, popular technology is what lets another team maintain your application without a rewrite."
            points={[
              "React, TypeScript and Node for most web applications.",
              "Salesforce Lightning, Flow and Apex for platform work.",
              "Hosting in accounts you control, chosen per project.",
            ]} measure={false} />
          <div className="sf-c7">
            <dl className="sf-points" style={{ display: "grid", gap: 16 }}>
              {STACK.map(([t, d]) => (
                <div key={t}><dt><strong>{t}</strong></dt><dd style={{ margin: 0 }}>{d}</dd></div>
              ))}
            </dl>
          </div>
        </SmartSection>

        {/* 8 · web or mobile */}
        <SmartSection id="web-or-mobile" tone="surface" grid labelledBy="h-web">
          <SmartUnit className="sf-c7" headingId="h-web" title="Web app or mobile app?"
            lede="Start on the web unless a phone feature, such as the camera or offline use, is the whole point."
            lead="A web application reaches every device from one build, with no store review between you and your users."
            points={[
              "Web first covers most business tools and portals.",
              "A store app needs more than a repackaged website.",
              "Decide it after discovery, when the real tasks are known.",
            ]}>
            <GoDeeper label="how Apple's rule shapes the decision">
              <p className="sf-rule">Apple's App Store Review Guidelines, section 4.2, say an app should include features and content that elevate it beyond a repackaged website. If the same thing works in a browser, a store app adds review time and two more accounts to maintain without adding value. <Verify id="apple">Apple's guideline and its source</Verify></p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 9 · Philadelphia & Chester County */}
        <SmartSection id="local" grid labelledBy="h-local">
          <SmartUnit className="sf-c7" headingId="h-local" title="In Philadelphia and Chester County"
            lede="We work from Malvern, PA, so a first conversation can be a coffee rather than a screen share."
            lead="Software work is mostly remote, and being in the region means a short drive when a project needs the room."
            points={[
              "Based at 625 Swedesford Rd, Unit B, Malvern, PA 19355.",
              "In person around Philadelphia and Chester County when it helps.",
              "Everything else runs remotely, inside your accounts.",
            ]}>
            <GoDeeper label="the local software market">
              <p className="sf-rule">The U.S. Bureau of Labor Statistics counted 28,480 software developers in the Philadelphia area in May 2025, out of 1,687,890 nationwide. Plenty of developers are nearby; the difference is whether the one you hire hands you the keys. <Verify id="bls">Where these figures come from</Verify></p>
              <div className="sf-links"><Link className="sf-link" to="/services/web-design-chester-county">Web design in Chester County</Link></div>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 10 · rescue */}
        <SmartSection id="rescue" tone="surface" grid labelledBy="h-rescue">
          <SmartUnit className="sf-c7" headingId="h-rescue" title="Already have an app or prototype?"
            lede="A prototype from Lovable, Bubble or Bolt, or an app another team built, can usually be reviewed in a few conversations."
            leadIn="What we do:" lead="We report who controls the code and accounts, where security stands, and what launch would take."
            points={[
              "Ownership check: repository, cloud accounts and keys.",
              "Security review of access control and secrets.",
              "A written plan to launch, whether or not you hire us.",
            ]}>
            <div className="sf-links"><a className="sf-link" href="#start">Ask for an app review</a></div>
          </SmartUnit>
        </SmartSection>

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

        <SmartSection id="faq" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Application development questions</h2>
            <p className="sf-lede" data-lede="">Straight answers on cost, ownership, timing and what happens after launch.</p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        <SourcesDialog id="fees" title="Official platform fees" sources={SOURCES_FEES} />
        <SourcesDialog id="apple" title="Apple's App Store guideline" sources={SOURCES_APPLE} />
        <SourcesDialog id="bls" sources={SOURCES_BLS} />
        <AppExchangeEvidence />
      </SfPage>
    </Layout>
  );
}
