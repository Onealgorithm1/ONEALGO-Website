import { TeamCertsLine } from "../../components/v2/shared-TeamCerts";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  SfPage, SFHero, SmartSection, SmartUnit, LedgerRule, GoDeeper, Readouts, EvidenceDialog, AppExchangeEvidence, ExtLink,
  FAQ, DeskCTA, StageRail, StageUnits, Verify, type SfFaqItem, type Stage, type Readout,
} from "../../components/sf";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PHONE, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema, createLocalBusinessSchema } from "../../components/StructuredData";
import { DataTable, TABLE_CSS } from "./aiShared";

/* /services/ai-automation, built 2026-11-15 on the v2 kit (Louis 2026-11-14: "our website does not talk about AI
 * automation whatsoever"). Demand: Google Keyword Planner, US, pulled 2026-11-14 (ai automation 9,900; ai consulting
 * 8,100; ai automation agency 4,400; ai agents for business 3,600; business process automation 2,900):
 * onealgo-icm-oa/areas/sales/runs/2026-11-14_2345_ai-automation-demand. Competitor read: same run, competitors.md.
 *
 * ⛔ PROOF, and only this proof. Every count is from OUR OWN database (hub Postgres), read 2026-11-15 ~12:05 am ET:
 *   social_comments: 5,302 status=replied (first reply 2026-10-13), 581 status=held, 3,927 skipped by a rule
 *     (7,789 more "skipped" rows are the client's own comments and are NOT counted as decisions);
 *   recordings: 103 rows since 2026-08-18, 24 hours of audio (sum duration_s); audio itself is not stored
 *     (onealgo-hub/docs/call-recording.md);
 *   social_posts: 174 posted, 15 rejected in the approval queue.
 * The retail client is NOT named (approval covers blogs + LinkedIn only: client-case-study-approval-2026-09-25).
 * To refresh: re-run the three counts, change the numbers AND READ together. Never estimate.
 * ⛔ NO price, timeline, percentage saved, client name, "partner" badge of OpenAI/Anthropic/Google, or outcome claim.
 *   The models named are the ones in comment_model_calls (Anthropic Claude, Google Gemini, OpenAI open-weight on
 *   Cloudflare Workers AI) and OpenAI Whisper for transcription.
 * ⛔ CREDENTIALS are individual course credentials (OpenAI Academy via Accredible, Zendesk via Skilljar; issued
 *   November 2026, onealgo-icm-oa/areas/sales/notes/*-takeaways-2026-11-10.md). The nine OpenAI credentials are the ones Accredible lists for the holder (email 2026-11-15); formerly five, whose
 *   notes record a passed assessment AND an issued credential are listed. Never "OpenAI certified company/partner". */

const PAGE_PATH = "/services/ai-automation";
const PAGE_URL = `https://onealgorithm.com${PAGE_PATH}`;
const PAGE_UPDATED = "2026-11-15";
const READ = "15 November 2026";
const TITLE = "AI Automation Agency & AI Consulting Services | One Algorithm";
const DESCRIPTION =
  "AI automation services and AI consulting from Malvern, PA: AI agents and workflow automation connected to the tools you already run. Call (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/media/og-ai-automation.jpg";
const OG_ALT = "AI automation services from One Algorithm: replies sent, comments held for a person, and calls transcribed by our own systems.";
const AGF = "/services/salesforce-agentforce";
const SF = "/services/salesforce";
const INT = "/services/salesforce-integration";
const APP = "/services/application-development";

/* OpenAI Academy credentials, each with its Accredible verify link (the holder's own share links, emailed by Accredible
   2026-11-15; opened in a signed-out browser the same day: each shows the credential and the holder). */
const OPENAI_CREDS: [string, string][] = [
  ["Applied AI Foundations", "https://oaiacademy.credential.net/0e359469-5d5f-4243-a6b3-3f7aa24d09cb?key=2f6d5ae7403b87ec1062217e636a8fc06fd4c21c2651bdfa3149e87d8b49e387"],
  ["Agents and Workflows", "https://oaiacademy.credential.net/1a894a8e-954a-428d-89ac-8f339c19c114?key=17bcab97cedda2ba099ce443911c5711f3f4c2fa3370cfa7b70e11e383232402"],
  ["Scope AI Solutions", "https://oaiacademy.credential.net/b6218ba6-5b14-4e32-8f38-10235ce7f2d4?key=24d1e3d495335cb72e7f59df7dc436f0eee2313ffd4901062ff49b06cef609e8"],
  ["Design and Build Agentic Systems", "https://oaiacademy.credential.net/f20ccc33-6aea-43c8-b0c0-449269960c52?key=305e8f05798c180485e290561cb0dbc985665a29960845f97dc4d2da679e3d90"],
  ["Build with Retrieval-Augmented Generation", "https://oaiacademy.credential.net/076ee2f2-a571-43e4-b9f6-1b340ffbf30f?key=f69f68bbec8766c8605422ebf3e1defd591c75fc5aa722e012ac9b5b992d9205"],
  ["Evaluate AI Applications", "https://oaiacademy.credential.net/b6ad9ee0-9906-4f75-8a12-735a0c155553?key=972ad921f9df13ca6dfa1b901d880babb398ad2fd5fe1deada8636e522ef58db"],
  ["Optimize AI Application Performance", "https://oaiacademy.credential.net/bccaf8c5-4e73-4dc5-9b9d-4ba48fbd64f0?key=0ebc5518599613101106a0e8753d916d753d29692c54bb6a600b2059ae447ac3"],
  ["Build With AI: OpenAI API Pathway Completion", "https://oaiacademy.credential.net/2746c029-e831-4707-a67d-70a6c7fb9e42?key=c426c63d12dd3771855700d082f0500b3c87374e874bb6f8f0d33b97af8db7db"],
  ["Get Started with Codex", "https://oaiacademy.credential.net/a87ed783-2395-468f-96f8-cd8a7e6c27b0?key=4a7e1a29c1df5c3888d39ca5b5efaef43908c377f61ad1456f2cff2776a77771"],
];

const REPLIES = 5302;
const HELD = 581;
const LEFT = 3927;
const CALLS = 103;
const POSTS = 174;
const REJECTED = 15;

const PROOF: Readout[] = [
  { value: REPLIES, label: "replies sent to customer comments", source: <>For a retail client, since 13 Oct 2026</> },
  { value: HELD, label: "comments held for a person", source: <>Same system, same dates</> },
  { value: CALLS, label: "calls and meetings transcribed", source: <>Since 18 Aug 2026 · our database, read {READ}</> },
];

/* What to automate: the task, the AI's part, the person's part. Rows 2 and 3 are systems we run (PROOF above). */
const TASKS: string[][] = [
  ["New enquiries", "Reads each one, sorts it, drafts the first reply and writes the details into your CRM", "Takes the conversation from the first real question"],
  ["Customer comments and questions", "Answers the common ones in your voice", "Handles complaints, damage and anything unusual"],
  ["Calls and meetings", "Turns the recording into text, a summary and next steps", "Checks the summary and does the follow-up"],
  ["Data between systems", "Moves orders, invoices and records on a schedule and logs what failed", "Reads the failure log and fixes the cause"],
];

const COST_DRIVERS: string[][] = [
  ["Systems to connect", "Each system adds build and testing", "Start with the two that hold the task"],
  ["Volume", "AI model providers bill by use, so volume sets the monthly running cost", "Use a small model for sorting, a stronger one for writing"],
  ["Judgment", "The more a wrong answer costs, the more rules and tests it needs", "Hand the risky cases to a person"],
  ["Care after launch", "Someone reads the log and adjusts the rules as the work changes", "Agree who that is before the build"],
];

const AI_STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Pick one task", sub: "volume · pattern · risk", line: "We look at what your team repeats and pick one task with enough volume and a low cost of error.",
    details: ["What your team does over and over", "How often it happens in a month", "What a wrong answer would cost", "One task chosen, the rest listed for later"] },
  { k: "s2", num: "02", title: "Write the rules and the handoff", short: "Rules and the handoff", sub: "limits · handoff · measure", line: "We write what the AI may do, what it must pass to a person, and how you will judge it.",
    details: ["What the AI may do on its own", "What it must hand to a person", "What it must never do", "The measure you will judge it by"] },
  { k: "s3", num: "03", title: "Build and test on real history", short: "Build and test", sub: "your systems · past cases", line: "We build it into the systems you already use and run it against past cases before it goes live.",
    details: ["Built into the tools your team already uses", "Its own login with only the access it needs", "Run against real past cases", "Wrong answers fixed before launch"] },
  { k: "s4", num: "04", title: "Run it with a log", sub: "log · review · adjust", line: "Every action is logged, and a named person reads the log and adjusts the rules.",
    details: ["Every action written to a log", "A named person reads it", "Rules adjusted as the work changes", "Model costs watched every month"] },
];

const FAQS: SfFaqItem[] = [
  {
    q: "What does an AI automation agency do?",
    a: "An AI automation agency finds the tasks in your business worth automating, builds the automation into the systems you already use, and keeps it working. The work is part consulting, deciding which tasks are worth it, and part engineering: connecting AI models to your CRM, inbox, phones and accounting so the task actually gets done.",
  },
  {
    q: "How much does AI automation cost?",
    a: "It depends on four things: how many systems have to connect, how much volume runs through it, how much judgment the task needs, and who looks after it once it is live. There are two costs, the build and the AI model's monthly usage fees. We quote the build in writing once we have seen the task.",
  },
  {
    q: "What business processes can be automated with AI?",
    a: "The best candidates repeat often, follow a pattern, and involve reading or writing text: answering new enquiries, replying to common customer questions, turning calls into notes, and moving data between systems. Tasks that happen a few times a month, or where a wrong answer is expensive, usually stay with a person.",
  },
  {
    q: "What is the difference between AI automation and business process automation?",
    a: "Business process automation follows fixed rules: when this happens, do that. AI automation adds a model for the steps that involve language or judgment, such as reading an email or writing a reply. Most projects need both, and plain rules are cheaper and easier to check, so we use AI only where rules cannot do the job.",
  },
  {
    q: "Will AI automation work with the software we already use?",
    a: "Usually, yes. If a system has an API or a connector, an automation can read from it and write to it. Our own systems connect to Salesforce, QuickBooks, Microsoft 365 and Teams, Google Search Console, Meta and LinkedIn. We check the systems the task touches before we quote.",
  },
  {
    q: "What happens when the AI gets something wrong?",
    a: `It will, so the system is built for it. Anything the AI is unsure about goes to a person, every action is logged, and a named person reads the log. In the reply system we run for a retail client, ${HELD.toLocaleString("en-US")} comments were held for a person (our database, read ${READ}).`,
  },
  {
    q: "Is our data safe with AI tools?",
    a: "Before anything is sent to an AI model we tell you which provider processes which data. Each automation gets its own login with only the access its job needs, and sensitive fields can be kept out of the model entirely. Our call transcription keeps the text and does not store the audio.",
  },
  {
    q: "Is AI automation worth it for a small business?",
    a: "It is when one task repeats often enough to matter. A small business rarely needs a large program; it needs one task done well, such as answering enquiries the same day. If the task is too small to pay back the build, we tell you.",
  },
  {
    q: "Do you only work with companies near Philadelphia?",
    a: "No. We work with companies across the US remotely from our office in Malvern, Pennsylvania, and meet in person around Philadelphia and Chester County.",
  },
];

/* FIG. 1: the run log of the reply system (PROOF above). Real counts, dated; the client is not named. */
function RunLog() {
  const rows: [string, number, string][] = [
    ["Replies sent", REPLIES, "answered by the AI"],
    ["Held for a person", HELD, "damage reports and anything the rules flag"],
    ["Left without a reply, by rule", LEFT, "stickers, emoji-only, repeat commenters"],
  ];
  return (
    <figure className="sf-hero-fig sf-stage" aria-labelledby="ai-runlog-cap">
      <div style={{ padding: "18px 20px 6px" }}>
        <p className="sf-kicker">Run log · customer comments · a retail client</p>
        <ul style={{ marginTop: 10, listStyle: "none", padding: 0 }}>
          {rows.map(([label, n, note]) => (
            <li key={label} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "0 16px", padding: "14px 0", borderTop: "1px solid var(--hair-s)" }}>
              <span>
                <b style={{ display: "block", fontFamily: "var(--display)", fontWeight: 700, fontSize: 19, lineHeight: 1.25, color: "var(--ink)" }}>{label}</b>
                <span className="sf-mono" style={{ display: "block" }}>{note}</span>
              </span>
              <b style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 40, lineHeight: 1, letterSpacing: "-.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{n.toLocaleString("en-US")}</b>
            </li>
          ))}
        </ul>
      </div>
      <div className="stamp"><span>Fig. 1 · Our own system</span><span>13 Oct to 15 Nov 2026</span></div>
      <figcaption id="ai-runlog-cap">What one of our AI systems did, and what it left to a person. Counts from our own database, read {READ}.</figcaption>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
    </figure>
  );
}

export default function AiAutomation() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    ogTitle: "AI Automation Agency & AI Consulting Services",
    ogDescription: "AI agents and workflow automation connected to the systems you already run, with a person in charge. From One Algorithm in Malvern, PA.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
    ogImage: OG_IMAGE,
    ogImageSize: [1200, 630],
    ogImageAlt: OG_ALT,
    twitterTitle: "AI Automation Agency & AI Consulting Services",
    twitterDescription: DESCRIPTION,
    twitterImage: OG_IMAGE,
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "AI Automation and AI Consulting Services",
          "AI consulting, AI agents and workflow automation for US businesses: one task chosen and scoped in writing, built into the systems the business already runs, tested on real history, and run with a log a named person reads. Delivered by One Algorithm, a Salesforce Consulting Partner based in Malvern, Pennsylvania.",
          "AI automation",
          PAGE_URL,
          { image: OG_IMAGE },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, PAGE_URL, { dateModified: PAGE_UPDATED, primaryImage: { url: OG_IMAGE, width: 1200, height: 630 } })} />
      <StructuredData data={createLocalBusinessSchema("ProfessionalService")} />

      <SfPage crumbs={[{ label: "AI automation" }]}>
        {/* 1 HERO. H1 = the LCP. FIG. 1 = the run log of our own reply system (real counts, dated). */}
        <SFHero
          salesforce={false}
          kicker={<>AI automation agency<span className="sf-kicker-loc"> · Malvern, PA</span></>}
          title="AI automation services that keep a person in charge"
          lede="We build AI agents and workflow automation for US businesses, connected to the systems you already run, with a person reviewing what the AI does."
          primary={{ href: "#start", label: "Tell us the task" }}
          figure={<RunLog />}
          after={<TeamCertsLine pathname="/services/ai-automation" />}
        />

        {/* 2 THE ANSWER UNITS: what it is, what an agency does. */}
        <SmartSection id="what" tone="surface" grid labelledBy="h-what">
          <SmartUnit
            className="sf-c7"
            headingId="h-what"
            title="What is AI automation?"
            lede="AI automation uses AI models for the reading, writing and deciding steps that ordinary software rules cannot handle."
            lead="Rules handle the fixed steps. AI handles messy text and speech."
            points={[
              "AI agents that read a request and take the next step",
              "Workflow automation that moves data between your systems",
              "A person reviewing anything the AI is unsure about",
            ]}
          >
            <GoDeeper label="AI automation and business process automation compared">
              <p className="sf-rule">Business process automation follows fixed rules: when an order is paid, send the receipt. AI automation adds a model for the steps that involve language or judgment, such as reading an email, sorting a request or writing a reply.</p>
              <p>Most projects need both. We use rules wherever they can do the job, because they are cheaper to run and easier to check.</p>
              <div className="sf-links">
                <Link className="sf-link" to={SF}>Salesforce consulting and Flow automation</Link>
                <Link className="sf-link" to={APP}>Application development</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <SmartUnit
            className="sf-c5"
            delay={0.08}
            headingId="h-agency"
            id="agency"
            title="What an AI automation agency does"
            lede="An AI automation agency finds the tasks worth automating, builds the automation into your systems, and keeps it working."
            leadIn="What we do:"
            lead="We also tell you which tasks to leave alone, because some are cheaper done by a person."
          />
        </SmartSection>

        {/* 3 NIGHT BAND: the systems we run, with counts from our own database. */}
        <SmartSection
          id="proof"
          tone="night"
          heading={{
            id: "h-proof",
            title: "AI systems we run every day",
            lede: <>Three systems we built and run ourselves, with counts read from our own database on {READ}.</>,
          }}
        >
          <Readouts items={PROOF} withEvidence={false} />
          <div className="sf-grid" style={{ marginTop: 56 }}>
            <SmartUnit
              level={3}
              className="sf-c4"
              kicker="Customer comments"
              title="Replies for a retail client"
              lede="An AI reply system answers customer comments on a retail client's social posts."
              leadIn="By the numbers:"
              lead={<>It skipped {LEFT.toLocaleString("en-US")} by rule: stickers, emoji-only comments and repeat commenters.</>}
            />
            <SmartUnit
              level={3}
              className="sf-c4"
              delay={0.08}
              kicker="Calls and meetings"
              title="Calls turned into searchable text"
              lede={<>Since 18 August 2026 our system has transcribed {CALLS} recorded calls and meetings, about 24 hours of audio.</>}
              lead="The team searches what was said. The audio is not stored."
            />
            <SmartUnit
              level={3}
              className="sf-c4"
              delay={0.16}
              kicker="Publishing"
              title="Posts that wait for approval"
              lede="Every social post waits in a queue for approval before it goes out."
              leadIn="By the numbers:"
              lead={<>{POSTS} published, {REJECTED} rejected.</>}
            />
          </div>
        </SmartSection>

        {/* 4 SERVICES: AI consulting + the three build services. */}
        <SmartSection
          id="services"
          grid
          heading={{
            id: "h-services",
            title: "AI consulting and automation services",
            lede: "We offer four services, from finding the right task to looking after the automation once it is live.",
          }}
        >
          <SmartUnit level={3} className="sf-c6" kicker="Start here" title="AI consulting"
            lede="We review how the work is done today and name the tasks worth automating, in writing."
            points={["Which tasks repeat often enough to matter", "Which ones a wrong answer makes too risky", "What each would need from your systems"]} />
          <SmartUnit level={3} className="sf-c6" delay={0.08} kicker="Build" title="AI agents for business"
            lede="We build agents that read a request, look up your records and take the next step."
            points={["Replies to enquiries and customer questions", "Summaries of calls, cases and meetings", "A handoff to a person, with the context"]}>
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={AGF}>Salesforce Agentforce consulting</Link></div>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c6" kicker="Build" title="Workflow automation"
            lede="We connect your systems so data moves on a schedule, with a log of what failed."
            points={["CRM, accounting, inbox and phones", "One owner for every record", "Failures logged, not lost"]}>
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={INT}>Salesforce integration services</Link></div>
          </SmartUnit>
          <SmartUnit level={3} className="sf-c6" delay={0.08} kicker="Run" title="Care after launch"
            lede="We watch the log, fix what breaks and adjust the rules as your work changes."
            points={["A named person reads the log", "Rules adjusted as questions change", "Model costs watched every month"]} />
        </SmartSection>

        {/* 5 WHAT TO AUTOMATE: the table is the answer (task / the AI's part / the person's part). */}
        <SmartSection
          id="automate"
          tone="surface"
          grid
          heading={{
            id: "h-automate",
            title: "Business process automation: what to automate first",
            lede: "Good first tasks repeat often, follow a pattern, and involve reading or writing text.",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: TABLE_CSS }} />
          <LedgerRule className="sf-c12">
            <p className="sf-kicker" id="ai-tasks-label">Four tasks, and who does what</p>
            <div style={{ marginTop: 16 }}>
              <DataTable
                id="ai-tasks"
                label="Four tasks to automate first: what the AI does and what a person still does"
                head={["Task", "What the AI does", "What a person still does"]}
                rows={TASKS}
              />
            </div>
            <p className="sf-mono" style={{ marginTop: 12 }}>The second and third rows are systems we run today; their counts are in the section above.</p>
          </LedgerRule>
        </SmartSection>

        {/* 6 AGENTS: where they fit and where they do not. */}
        <SmartSection
          id="agents"
          grid
          heading={{
            id: "h-agents",
            title: "AI agents for business: where they fit",
            lede: "An AI agent reads a request, decides the next step and acts, within limits you set.",
          }}
        >
          <SmartUnit level={3} className="sf-c6" title="Where an agent earns its keep"
            lede="Agents pay off on frequent, similar requests whose answers already sit in your records."
            points={["A high volume of similar requests", "The answer lives in records you already keep", "A wrong answer is cheap to catch and fix"]} />
          <SmartUnit level={3} className="sf-c6" delay={0.08} title="Where we would not use one"
            lede="Some work should stay with a person, or with plain software rules."
            points={["Money, safety or legal decisions without review", "Tasks done a few times a month", "Work nobody can describe in writing"]} />
        </SmartSection>

        {/* 7 HOW IT RUNS: FIG. 2, the rail + four stage units. */}
        <SmartSection
          id="how"
          tone="surface"
          heading={{
            id: "h-how",
            title: "How an AI automation project runs",
            lede: "A project runs in four steps, from picking one task to a system someone watches.",
          }}
        >
          <StageRail
            fig={2}
            stations={AI_STAGES}
            className="sf-rail-top"
            title="Staged diagram of a four-step AI automation project"
            desc="A rail runs through four stations: pick one task, write the rules and the handoff, build and test on real history, and run it with a log a person reads."
            stamp="How an AI automation project runs"
            caption="The four steps in the order they run, from one chosen task to a system someone watches."
          />
          <StageUnits items={AI_STAGES} />
        </SmartSection>

        {/* 8 COST: the four drivers (no figure of ours is published). */}
        <SmartSection
          id="cost"
          grid
          heading={{
            id: "h-cost",
            title: "What AI automation costs",
            lede: "Cost comes from four things: the systems to connect, the volume, the judgment the task needs, and care after launch.",
          }}
        >
          <LedgerRule className="sf-c8">
            <p className="sf-kicker" id="ai-cost-label">The four cost drivers</p>
            <div style={{ marginTop: 16 }}>
              <DataTable
                id="ai-cost"
                label="The four things that drive the cost of AI automation, and how to keep each down"
                head={["Driver", "Why it costs", "How to keep it down"]}
                rows={COST_DRIVERS}
              />
            </div>
          </LedgerRule>
          <SmartUnit
            level={3}
            className="sf-c4"
            delay={0.08}
            kicker="Two costs"
            title="The build and the running cost"
            lede="You pay for the build once, and for the AI model's usage every month."
            leadIn="What you get:"
            lead="A written quote for the build once we have seen the task."
          />
        </SmartSection>

        {/* 9 NIGHT BAND: tools, security, oversight. */}
        <SmartSection
          id="tools"
          tone="night"
          grid
          heading={{
            id: "h-tools",
            title: "AI tools, security and human oversight",
            lede: "We use models from Anthropic, Google and OpenAI, and connect them to the business systems you already run.",
          }}
        >
          <SmartUnit level={3} className="sf-c4" kicker="Models" title="The right model for each step"
            lede="We pick the model per step: a small, fast one for sorting and a stronger one for writing."
            lead="Most steps do not need the most expensive model, and using it everywhere wastes money." />
          <SmartUnit level={3} className="sf-c4" delay={0.08} kicker="Your systems" title="Connected to what you run"
            lede="Our own systems connect to Salesforce, QuickBooks, Microsoft 365 and Teams, Google Search Console, Meta and LinkedIn."
            leadIn="What we do:"
            lead="We check the systems your task touches before we quote." />
          <SmartUnit level={3} className="sf-c4" delay={0.16} kicker="Security" title="Least access, and a log"
            lede="Each automation gets its own login with only the access its job needs, and every action is logged."
            leadIn="What you get:"
            lead="A list of which provider processes which data, before anything is sent to a model." />
        </SmartSection>

        {/* 10 WHO: the company record + the individual AI course credentials. */}
        <SmartSection
          id="who"
          tone="surface"
          grid
          heading={{
            id: "h-who",
            title: "Who does the work",
            lede: "The work is done by One Algorithm's own team in Malvern, Pennsylvania, a Salesforce Consulting Partner founded in 2020.",
          }}
        >
          <SmartUnit
            level={3}
            className="sf-c7"
            kicker="Training"
            title="AI credentials held on our team"
            lede="One member of our team holds nine OpenAI Academy credentials, and our Salesforce lead holds Salesforce's two Agentforce consultant certifications."
            lead="These are individual course credentials, held by the people who earned them."
          >
            <p className="sf-mono" style={{ marginTop: 12 }}><Verify id="ai-training">See the full list</Verify></p>
          </SmartUnit>
          <SmartUnit
            level={3}
            className="sf-c5"
            delay={0.08}
            kicker="Company record"
            title="A Salesforce Consulting Partner"
            lede={<>Salesforce's AppExchange record lists {SF_CERTIFIED_PEOPLE} certified people and {SF_CERTIFICATIONS} certifications, read {SF_VERIFIED_LABEL}.</>}
            leadIn="What you get:"
            lead="A record you can open and read on Salesforce's own site."
          >
            <p className="sf-mono" style={{ marginTop: 12 }}><Verify id="appexchange" /></p>
            <div className="sf-links" style={{ marginTop: 12 }}><Link className="sf-link" to={SF}>Salesforce consulting services</Link></div>
          </SmartUnit>
        </SmartSection>

        {/* 11 DESK: the one CTA band. */}
        <DeskCTA
          heading="Tell us the task you want automated"
          lede="Describe the task in a sentence or two and we tell you whether it is worth automating."
          coversLabel="What to have ready"
          covers={["The task, and roughly how often it happens", "The systems it touches", "What a wrong answer would cost"]}
          next={["Call, or send the form on the contact page.", "A person at OneAlgorithm reads it and replies.", "If it fits, we scope one task and quote it in writing."]}
          hcLink={false}
          form={{ topic: "ai", topicLabel: "AI automation", heading: "Tell us the task", prompt: "Which task eats the most of your team's week?", submitLabel: "Tell us the task", need: "ai-automation" }}
        />

        {/* 12 FAQ */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq" className="sf-faq-section">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">AI automation questions buyers ask</h2>
            <p style={{ marginTop: 12 }}>Not here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col">
            <FAQ items={FAQS} />
          </div>
        </SmartSection>

        <AppExchangeEvidence />
        <EvidenceDialog
          id="ai-training"
          title="AI credentials held on our team"
          intro="Individual course credentials held by people at OneAlgorithm. Each OpenAI Academy credential opens on OpenAI's credential service."
          rows={[
            { th: "OpenAI Academy (issued November 2026)", td: <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>{OPENAI_CREDS.map(([name, href]) => <li key={name}><ExtLink href={href}>{name}</ExtLink></li>)}</ul> },
            { th: "Salesforce", td: "Agentforce Sales Consultant · Agentforce Service Consultant (held by Sreenivas Amirisetti)" },
            { th: "Zendesk", td: "AI Agents, Level 1 (issued November 2026)" },
          ]}
          primary={{ href: "#start", label: "Tell us the task" }}
        />
      </SfPage>
    </Layout>
  );
}
