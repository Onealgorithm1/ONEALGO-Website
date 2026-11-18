import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { SfPage, SmartSection, GoDeeper, Readouts, DeliveredLedger, PersonCredentials, DeskCTA, LeadForm, Verify, SfButton, type SfFaqItem } from "../../components/sf";
import { SF_PHONE } from "../../data/salesforceShared";
import { SREENIVAS, badgeSrc } from "../../data/sfPeople";
import { EnterpriseTable, EnterpriseFaq } from "../../components/v2/enterprise-Units";
import { EVStyles, BridgePlate, HoverCards, StepRail, Statement } from "../../components/v2/enterprise-Visuals";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { CaseCard } from "../../components/v2/shared-CaseCard";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/hire-salesforce-developers. Added 2026-11-01 (SEO round 2, plan action 7).
 * DEMAND (Semrush US, 2026-10-31, keywords/volumes-merged.json): "hire salesforce developer" 1,300 (KD 0), "hire salesforce
 * developers" 880, "hire a salesforce developer" 720, "salesforce developer for hire" 590, "salesforce staff augmentation"
 * 320 (KD 8) and its variants. SERP checked 2026-11-01 (web search, logged out): page one is agencies (BairesDev, Glorium,
 * Silverline, Techforce, Vention, Bacancy) plus talent marketplaces (Toptal, Braintrust), not job boards, so a service
 * page can compete.
 * /services/staff-augmentation keeps the general "IT staff augmentation" phrases; this page owns the Salesforce ones.
 * ⛔ FACTS: only what other pages already publish. AppExchange counts from salesforceProof.ts; people from sfPeople.ts
 *    (PersonCredentials); delivered work from SF_DELIVERED (DeliveredLedger); "ongoing Salesforce development for a
 *    lending company since April 2026", client never named, no figures; E-Verify covers our own employees only.
 *    NO rate, time-to-start, bench size, fill rate or years of experience. */

const PATH = "/services/hire-salesforce-developers";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "Hire Salesforce Developers | One Algorithm";
const DESCRIPTION = "Hire Salesforce developers, admins and architects who work inside your team, from a listed Salesforce Consulting Partner in Malvern, PA. (610) 890-9711.";
const OG_IMAGE = "https://onealgorithm.com/og-image.jpg";

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const FAQS: SfFaqItem[] = [
  { q: "How do I hire a Salesforce developer through you?", a: "Tell us the org, the work and who the developer would report to. We say whether we have the right person and what they have worked on, you interview them, and once you agree they join your team and work to your backlog under your lead." },
  { q: "Who manages the Salesforce developer day to day?", a: "You do. Your lead sets the priorities, and the developer works in your org, your sandboxes, your ticket queue and your standups. We stay in touch with you and with the developer, and raise problems early." },
  { q: "Which Salesforce roles can you place?", a: "Salesforce developers, administrators and architects. Salesforce is where our delivery record is, so it is where we lead. We tell you whether we have the right person before you spend time interviewing." },
  { q: "Are your Salesforce developers certified?", a: `Salesforce's AppExchange record lists ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications (read ${SF_VERIFIED_LABEL}). You can open the listing and check it yourself. Ask who will do your work and look them up on Trailblazer.` },
  { q: "What does it cost to hire a Salesforce developer this way?", a: "It follows the role, the seniority, how long you need the person and the hours. We quote in writing once we know the work, and we publish no rate card. For published market ranges on Salesforce projects, see our cost guide.", link: { to: "/services/salesforce-implementation-cost", label: "Salesforce implementation cost guide" } },
  { q: "Staff augmentation or managed services: which do I need?", a: "If you want a Salesforce person working to your own backlog under your lead, that is staff augmentation, and it is this page. If you want us to run the org week by week and be accountable for it, that is managed services.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
  { q: "Can the Salesforce developer work remotely with our team?", a: "Yes. Salesforce work happens inside your org, so it runs remotely from our Malvern, Pennsylvania office with teams across the United States. In-person sessions happen when the project calls for them, easiest around Philadelphia." },
  { q: "Who employs the Salesforce developer you place?", a: "We tell you in writing before work starts. Our E-Verify account covers our own employees only and does not cover subcontractors." },
];

export default function HireSalesforceDevelopers() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "hire Salesforce developer, hire Salesforce developers, Salesforce staff augmentation, Salesforce developer for hire, hire Salesforce admin",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
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
          "Salesforce Staff Augmentation",
          "Salesforce developers, administrators and architects from a listed Salesforce Consulting Partner, working inside the client's team, org and process under the client's lead.",
          "Salesforce staff augmentation",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-11-01" })} />

      <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Hire Salesforce developers" }]}>
        <EVStyles />
        <HireHero />

        <BridgePlate
          id="what"
          fig={1}
          tone="surface"
          heading={{ id: "h-what", title: "What Salesforce staff augmentation is", lede: "Salesforce staff augmentation adds a Salesforce developer, admin or architect to your team, working in your org under your lead, for as long as the work lasts." }}
          title="Where a Salesforce developer from us sits"
          desc="Four boxes joined by arrows: your lead sets priorities, your org and sandboxes stay as they are, our Salesforce developer works inside your team, and we say what each candidate has worked on."
          stamp="Inside your org"
          caption="You keep control of the backlog. We tell you what a candidate has worked on before you interview."
          nodes={[
            { num: "01", title: "Your lead", sub: "sets the priorities" },
            { num: "02", title: "Your org", sub: "sandboxes, backlog, standups" },
            { num: "03", title: "Our developer", sub: "works inside your team", hl: true },
            { num: "04", title: "Our side", sub: "candidates, gaps stated" },
          ]}
        >
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated November 1, 2026</p>
          <GoDeeper label="how the model works">
            <p className="sf-rule">You hire the skill without hiring the employee. The developer works in your sandboxes, your release process and your ticket queue, so there is no second team to manage on the side. If you want us to run the org and be accountable for it instead, that is {L("/services/salesforce-managed-services", "Salesforce managed services")}.</p>
            <p>For technical roles beyond Salesforce, see {L("/services/staff-augmentation", "IT staff augmentation services")}.</p>
          </GoDeeper>
        </BridgePlate>

        <OfferBand heading="Have a Salesforce seat to fill?" line="Tell us the org, the work and who they report to. We say whether we have the person." label="Talk to a consultant" />

        <SmartSection id="when" tone="paper" heading={{ id: "h-when", title: "When hiring a Salesforce developer this way beats a full-time hire", lede: "A full-time hire is slow and commits you for years, and in four situations adding the skill is the better call." }}>
          <HoverCards
            cols={4}
            items={[
              { glyph: "clock", kicker: "Release", title: "A Salesforce release is due", body: "Go-live is closer than a hiring cycle for a certified developer." },
              { glyph: "gear", kicker: "Depth", title: "Flow, Apex or an integration", body: "One piece of Platform work nobody on staff has built." },
              { glyph: "flag", kicker: "Migration", title: "A one-off data move", body: "QuickBase, Kissflow or another CRM, then back to normal." },
              { glyph: "team", kicker: "Admin", title: "Your admin is at the limit", body: "The org keeps its owner; the backlog gets more hands." },
            ]}
          />
          <p className="sf-lead sf-measure" style={{ marginTop: 28 }}><span className="sf-lead-in">Yes, but:</span> if the org needs a Salesforce person every week for years, hire one.</p>
        </SmartSection>

        <SmartSection id="record" tone="surface" heading={{ id: "h-record", title: "Salesforce's record of our team", lede: `Salesforce's AppExchange listing shows ${SF_CERTIFIED_PEOPLE} Salesforce-certified people at OneAlgorithm holding ${SF_CERTIFICATIONS} certifications.` }}>
          <Readouts />
          <h3 className="sf-h3" id="h-lead" style={{ marginTop: 40 }}>Who leads the Salesforce work</h3>
          <PersonCredentials />
        </SmartSection>

        <StepRail
          id="steps"
          tone="paper"
          heading={{ id: "h-steps", title: "How we place a Salesforce developer", lede: "Four steps, and the second one is where this is usually won or lost." }}
          fig={2}
          stations={[
            { k: "s1", num: "01", title: "The org", sub: "clouds, backlog, lead" },
            { k: "s2", num: "02", title: "Candidates", sub: "experience stated up front" },
            { k: "s3", num: "03", title: "Access", sub: "user, sandboxes, releases" },
            { k: "s4", num: "04", title: "Releases", sub: "check-ins with your lead" },
          ]}
          steps={[
            { k: "s1", num: "01", title: "The org and the work", line: "Which clouds, which automation and integrations, what is in the backlog, and who the developer reports to." },
            { k: "s2", num: "02", title: "Candidates, experience stated", line: "You interview them, and we say which parts of your org each one has worked on, so you know before the first sprint." },
            { k: "s3", num: "03", title: "Access and sandboxes", line: "A user, a permission set, sandbox access and your release process, agreed with your lead before day one." },
            { k: "s4", num: "04", title: "Every release after", line: "We check in with your lead, not only with the developer, and raise problems before a deployment." },
          ]}
          title="Four-step rail: the org, candidates, access, releases"
          desc="A rail with four stations: the org and the work, candidates with gaps stated, access and sandboxes, and check-ins at every release."
          stamp="How we place a Salesforce developer"
          caption="The gaps are stated before the interview."
        />

        <SmartSection id="delivered" tone="night" grid heading={{ id: "h-delivered", title: "Salesforce work we have delivered", lede: "We provide ongoing Salesforce development for a lending company, and have done since April 2026." }}>
          <div className="sf-c5">
            <CaseCard title="Salesforce development for a lending company" built="Ongoing since April 2026. Development inside the client's org and process. Client name kept private." />
          </div>
          <Statement className="sf-c7">Their backlog, their release calendar, our Salesforce developer.</Statement>
          <div className="sf-c12" style={{ marginTop: 28 }}>
            <DeliveredLedger />
          </div>
        </SmartSection>

        <EnterpriseTable
          id="compare"
          tone="surface"
          title="Staff augmentation vs managed services vs a project"
          lede="The three differ in who manages the work and who is accountable for the result."
          caption="Salesforce staff augmentation compared with managed services and a project"
          head={["Model", "Who manages the work", "You get"]}
          rows={[
            ["Staff augmentation", "You do", "A Salesforce person inside your team"],
            ["Managed services", "We do, week by week", "The org run for you, hours reported"],
            ["Project", "Shared, with us accountable for the output", "A scoped build or migration"],
          ]}
        />

        <OfferBand heading="Tell us about the Salesforce role" line="The skill you need for three months, or the seat open too long." label="Talk to a consultant" />

        <EnterpriseFaq title="Questions about hiring Salesforce developers" items={FAQS} />
        <DeskCTA
          heading="Tell us about the Salesforce role you cannot fill"
          lede="The Flow backlog, the integration nobody on staff has built, or the release that needs two more pairs of hands."
          covers={["The org, the clouds and who they report to", "How long you need the person", "The start window", "Whether we have the right person"]}
          coversLabel="What to have ready"
          next={["Send the short form, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you whether we have the person."]}
          hcLink={false}
          inline="Staff Augmentation"
          pick="Developer by the hour or month"
          form={{ topic: "hire-salesforce-developers", topicLabel: "Hire Salesforce developers", need: "staff-augmentation", heading: "Ask about a Salesforce developer", prompt: "What is the Salesforce role, and how long do you need it?", submitLabel: "Request a free call", formId: "hire-sf-end" }}
        />
      </SfPage>
    </Layout>
  );
}

/* The hero (2026-11-17, Louis: "add salesforce logos ... needs to be more visually appealing to convert").
 * Google Ads traffic lands here, so the ask sits in the first screen: the short form docked on the right
 * (data-form "hire-sf-top", same props as the 11-16 enquiry section it replaces), the call as the second action.
 * The Salesforce logos are the OFFICIAL certification logos Sreenivas earned (files in public/media/salesforce/
 * badges, provenance in redesign-v2/badges/badges.md), shown as his, next to his name and his Trailblazer
 * evidence. Salesforce's Trademark & Copyright Usage Guidelines, "Certified Professionals": the holder may use
 * the credential designation and logo he earned. ⛔ No stand-alone Salesforce cloud logo and no partner badge
 * here: the partner badge files sit behind the Partner Community login and no permitting source is on record.
 * Styles live in this file (HERO_CSS) so the first screen never waits on a stylesheet. */
function HireHero() {
  const p = SREENIVAS;
  return (
    <section className="hsd-hero" aria-labelledby="h1">
      <style>{HERO_CSS}</style>
      <div className="sf-wrap hsd-grid">
        <div className="hsd-text">
          <p className="sf-kicker">Salesforce staff augmentation</p>
          <h1 className="sf-h1" id="h1">
            Hire Salesforce developers <span className="hsd-mark">inside your team</span>
          </h1>
          <p className="sf-lede sf-measure" data-lede="">Developers, admins and architects who work in your org and sandboxes and take direction from your lead.</p>
          <ul className="hsd-terms" aria-label="Terms">
            <li>Hourly or monthly contracts</li>
            <li>Team in the US and India</li>
            <li>Women-owned, SBA-certified EDWOSB</li>
          </ul>
          <div className="hsd-ctas">
            <SfButton href="#enquire" cta="hero" className="hsd-jump">Tell us about the role</SfButton>
            <SfButton ghost href={SF_PHONE.href} cta="hero" className="hsd-tel">Call {SF_PHONE.display}</SfButton>
          </div>
          <p className="sf-mono hsd-record">
            Salesforce's AppExchange listing: <b>{SF_CERTIFIED_PEOPLE}</b> certified people, <b>{SF_CERTIFICATIONS}</b> certifications{" "}
            <Verify id="appexchange" />
          </p>
        </div>

        <figure className="hsd-plate sf-stage" aria-labelledby="hsd-plate-cap">
          <ul className="hsd-badges" aria-label="Active Salesforce certifications held by the One Algorithm team">
            {p.badges.map((b) => (
              <li key={b.slug}>
                <img src={badgeSrc(b)} alt={b.name} title={b.name} width={160} height={157} decoding="async" {...({ fetchpriority: "low" } as object)} />
              </li>
            ))}
          </ul>
          <figcaption id="hsd-plate-cap">
            One Algorithm's <b>Salesforce-certified team</b> holds these certifications.{" "}
            <Verify id="appexchange">See our AppExchange listing</Verify>
          </figcaption>
          <p className="stamp"><span>Official Salesforce certification logos</span><span>Trailblazer record read {p.verifiedLabel}</span></p>
          <span className="sf-tick" aria-hidden="true" />
        </figure>

        <div className="hsd-desk" id="enquire">
          <div className="desk-card sf-desk-panel">
            <h2 className="sr-only" id="h-enquire">Ask about a Salesforce developer</h2>
            <LeadForm short idPrefix="top-" formId="hire-sf-top" heading="Ask about a Salesforce developer" headingId="h-enquire-form" topic="Hire Salesforce developers" need="Staff Augmentation" pick="Developer by the hour or month" submitLabel="Request a free call" />
            <p className="hsd-reply">A person at OneAlgorithm reads it and replies within one business day.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ponytail: page-only CSS as a string, the EVStyles pattern. Tokens are sf.css's (.sfv2). Radius 0 on the plate,
 * buttons keep sf.css's 6px. Nothing above the fold animates; the badge lift is hover-only and motion-gated. */
const HERO_CSS = `
/* impeccable-disable side-tab: the orange top rule is the Salesforce pages' form-card mark (desk-card), signature 2 of this hero */
/* impeccable-disable kicker-above-heading: the kicker is the paid search phrase "Salesforce staff augmentation", not decoration */
.sfv2 .hsd-hero { background: var(--paper); padding: 32px 0 80px; border-bottom: 1px solid var(--hair); }
.sfv2 .hsd-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: auto 1fr; column-gap: var(--gap); row-gap: 28px; align-items: start; }
.sfv2 .hsd-text { grid-column: 1 / 8; grid-row: 1; }
.sfv2 .hsd-plate { grid-column: 1 / 8; grid-row: 2; }
.sfv2 .hsd-desk { grid-column: 8 / 13; grid-row: 1 / 3; scroll-margin-top: 96px; }
@media (max-width: 1279px) { .sfv2 .hsd-text, .sfv2 .hsd-plate { grid-column: 1 / 7; } .sfv2 .hsd-desk { grid-column: 7 / 13; } }
@media (max-width: 1023px) {
  .sfv2 .hsd-hero { padding: 24px 0 56px; }
  .sfv2 .hsd-grid { grid-template-rows: none; row-gap: 28px; }
  .sfv2 .hsd-text, .sfv2 .hsd-plate, .sfv2 .hsd-desk { grid-column: 1 / -1; grid-row: auto; }
}
.sfv2 .hsd-hero .sf-h1 { margin-top: 16px; }
.sfv2 .hsd-mark { text-decoration: underline 0.14em var(--orange); text-underline-offset: 0.12em; text-decoration-skip-ink: none; }
.sfv2 .hsd-hero .sf-lede { margin-top: 20px; font-size: 20px; color: var(--ink2); }
@media (max-width: 639px) { .sfv2 .hsd-hero .sf-lede { font-size: 18px; } }
.sfv2 .hsd-terms { display: flex; flex-wrap: wrap; gap: 6px 24px; margin-top: 22px; }
.sfv2 .hsd-terms li { font: 500 16px/1.4 var(--body); color: var(--ink); padding-left: 16px; position: relative; }
.sfv2 .hsd-terms li::before { content: ""; position: absolute; left: 0; top: 0.5em; width: 7px; height: 7px; background: var(--orange); }
.sfv2 .hsd-ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 22px; }
@media (min-width: 1024px) { .sfv2 .hsd-jump { display: none; } }
@media (max-width: 767px) { .sfv2 .hsd-tel { display: none; } } /* the sticky call bar (md:hidden) carries Call on phones */
@media (max-width: 639px) {
  .sfv2 .hsd-terms { gap: 4px 16px; margin-top: 16px; }
  .sfv2 .hsd-terms li { font-size: 15px; }
  .sfv2 .hsd-ctas { margin-top: 18px; }
  .sfv2 .hsd-jump { width: 100%; justify-content: center; }
  .sfv2 .hsd-plate .stamp { display: none; }
}

.sfv2 .hsd-plate { background: var(--surface); }
.sfv2 .hsd-badges { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 14px 12px; padding: 24px 24px 8px; }
@media (max-width: 1279px) { .sfv2 .hsd-badges { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
@media (max-width: 1023px) { .sfv2 .hsd-badges { grid-template-columns: repeat(8, minmax(0, 1fr)); } }
@media (max-width: 639px) { .sfv2 .hsd-badges { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px 10px; padding: 16px 14px 4px; } }
.sfv2 .hsd-badges img { width: 100%; height: auto; }
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .sfv2 .hsd-badges img { transition: transform 0.18s var(--arrive); }
  .sfv2 .hsd-badges li:hover img { transform: translateY(-2px); }
}
.sfv2 .hsd-plate figcaption { padding: 12px 24px 16px; font-size: 16px; line-height: 1.5; color: var(--ink2); }
@media (max-width: 639px) { .sfv2 .hsd-plate figcaption { padding: 10px 12px 14px; } }
.sfv2 .hsd-plate figcaption b { color: var(--ink); font-weight: 600; }
.sfv2 .hsd-plate .sf-verify { margin-left: 4px; }

.sfv2 .hsd-desk .desk-card { border-top: 4px solid var(--orange); }
.sfv2 .hsd-desk .sf-h3 { font-size: 26px; }
.sfv2 .hsd-reply { margin-top: 16px; font-size: 15px; color: var(--n-ink2); }
.sfv2 .hsd-record { margin-top: 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }
.sfv2 .hsd-record b { color: var(--ink); font-weight: 700; }
/* phones: the same figures sit in "Salesforce's record of our team" below; here they pushed the logos under the call bar */
@media (max-width: 639px) { .sfv2 .hsd-record { display: none; } }
`;
