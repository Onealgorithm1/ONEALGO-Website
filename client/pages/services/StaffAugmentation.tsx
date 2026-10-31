import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import { SfPage, DeskCTA, type SfFaqItem } from "../../components/sf";
import { EnterpriseRow, EnterpriseTable, EnterpriseFaq, type EUnit } from "../../components/v2/enterprise-Units";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* Staff augmentation. Copy rewritten 2026-08-12; body rebuilt 2026-10-31 in the Salesforce-v2 look (sf kit). The hero
 * is unchanged.
 *
 * ⛔ NO NUMBERS WERE INVENTED: no time-to-candidate, bench size, tenure or fill rate; no price or rate.
 * ⛔ PROOF: "ongoing Salesforce development for a lending company since April 2026". The client is never named,
 *    no figures. Only Salesforce roles have delivery evidence, so the old Full-Stack / Mobile / Data / DevOps /
 *    Security / AI tiles are gone; other roles are "on request".
 * ⛔ E-VERIFY covers OUR OWN EMPLOYEES only (the account is "Verify Its Own Employees"); subcontractors are not
 *    covered, so nothing here says "everyone we place". No enrollment ID is printed.
 * ⛔ "We replace the person" and "not a rotating bench" are not claimed in the body (no bench evidence). The frozen
 *    hero panel still carries the bench line; flagged in the build report. */

const PATH = "/services/staff-augmentation";
const URL_ = "https://onealgorithm.com" + PATH;
const TITLE = "IT staff augmentation services | One Algorithm";
const DESCRIPTION = "Salesforce and IT staff augmentation: dedicated, fixed-scope or hourly. We tell you where each candidate is light.";

const L = (to: string, t: string) => <Link className="sf-link" to={to}>{t}</Link>;

const WHAT: EUnit[] = [
  {
    id: "h-what", title: "What staff augmentation is",
    lede: "Staff augmentation adds outside specialists to your team, working in your tools under your lead, for as long as the work lasts.",
    lead: "You keep control of the work; we carry the employment and the paperwork.",
    points: ["They join your standups and your ticket queue", "Your lead sets their priorities", "We handle employment and paperwork"],
    label: "the model in plain terms",
    deep: (<>
      <p className="sf-rule">Staff augmentation is a way to add skills without hiring. The person works inside your repository, your board and your review process, so there is no second team to manage on the side. It differs from outsourcing, where a vendor takes the work and the management of it.</p>
      <p>It is also different from {L("/services/it-consulting", "IT consulting")}: a consultant delivers a recommendation or a build; an augmented specialist delivers hours of skilled work under your direction.</p>
    </>),
  },
  {
    id: "h-beats", title: "When staff augmentation beats hiring",
    lede: "Hiring takes months and commits you for years; four situations make renting the skill the better call.",
    lead: "Often hiring is still right, and we will say so.",
    leadIn: "Yes, but:",
    points: ["You need the person now", "You need one skill, not one head", "The role may not outlast the project"],
    label: "the four cases",
    deep: (<>
      <p className="sf-rule">Recruiting a permanent engineer takes months you may not have: advertising, screening, notice periods. A Salesforce integration specialist for a few weeks is not a job you can advertise for, but it is something you can rent for exactly as long as the work lasts.</p>
      <p>If the work has an end date, the contract should too. You are not carrying a seat, a license and a laptop after the thing ships. And our people use your tools and process, so a fourth reason stands: your lead keeps one team, not two.</p>
    </>),
  },
];

const ROLES: EUnit[] = [
  {
    id: "h-roles", title: "Roles we place",
    lede: "Salesforce administrators, developers and architects first; other technical roles are available on request.",
    lead: "If what you need is not on this list, we will say so rather than send someone who read the documentation last week.",
    points: ["Salesforce administrator", "Salesforce developer", "Salesforce architect"],
    label: "how we handle other roles",
    deep: (<>
      <p className="sf-rule">Salesforce is where our delivery evidence is, so it is where we lead. Other technical roles are considered on request, case by case, and we state plainly whether we have the right person before you spend an hour interviewing.</p>
      <p>For the Salesforce side of the work, see {L("/services/salesforce", "Salesforce consulting services")} and {L("/services/salesforce-managed-services", "Salesforce managed services")}.</p>
    </>),
  },
  {
    id: "h-sf", title: "Salesforce staff augmentation",
    lede: "We provide ongoing Salesforce development for a lending company, and have done since April 2026.",
    lead: "That engagement is staff augmentation in practice: our developer, their org, their priorities.",
    leadIn: "What we do:",
    points: ["Development inside the client's org and process", "Ongoing since April 2026", "Client name kept private"],
    label: "what Salesforce augmentation looks like",
    deep: (<>
      <p className="sf-rule">The client is a lending company and stays unnamed; we publish no figures from the work. What we can describe is the shape: a developer embedded for the long term, working to the client's backlog, with one of us staying involved so the ramp-up is not their lead's second job.</p>
      <p>Salesforce administrators and architects follow the same model. Our {L("/services/salesforce", "Salesforce practice")} also holds Salesforce's AppExchange record of 16 people and 53 certifications.</p>
    </>),
  },
];

const MODELS: EUnit[] = [
  {
    id: "m1", title: "Dedicated team", lede: "People assigned to you full time and to nobody else, run by you day to day.", label: "dedicated team",
    deep: <p className="sf-rule">Best when the work is ongoing and the domain takes a while to learn. They learn your domain and keep it, you set priorities week to week, and you have direct access with no account manager in between.</p>,
  },
  {
    id: "m2", title: "Fixed scope", lede: "A defined deliverable with a date on it, agreed in writing before we start.", label: "fixed scope",
    deep: <p className="sf-rule">This works when you can write down what finished means. You sign off milestones, and specialists join for the phase that needs them. Where you cannot define the work, hourly is honestly the cheaper option.</p>,
  },
  {
    id: "m3", title: "Hourly", lede: "For a code review, a second opinion or an outage nobody can explain, with no commitment past the hours used.", label: "hourly",
    deep: <p className="sf-rule">No retainer. Useful when you do not yet know the size of the problem, or want a second opinion on somebody else's estimate.</p>,
  },
];

const STEPS: EUnit[] = [
  { id: "p1", title: "What you actually need", lede: "Not the job description but the work: which system, which stack, who they report to.", label: "step one", deep: <p className="sf-rule">We also ask what will block them in week one, because access and environments are where most ramp-ups stall.</p> },
  { id: "p2", title: "Candidates, gaps stated", lede: "You interview them, and we tell you where each one is light before you find out in week three.", label: "step two", deep: <p className="sf-rule">This is the step that is usually won or lost. A candidate described honestly saves you a bad month.</p> },
  { id: "p3", title: "Onboarding", lede: "Access, accounts, environment and context, with one of us involved through the first weeks.", label: "step three", deep: <p className="sf-rule">The ramp-up should not become your lead's second job.</p> },
  { id: "p4", title: "While they are with you", lede: "We check in with you, not only with them, and raise problems early.", label: "step four", deep: <p className="sf-rule">If the fit is wrong we talk about it with you first and change it.</p> },
];

const COMPLIANCE: EUnit[] = [
  {
    id: "h-compliance", title: "Compliance and E-Verify for our employees",
    lede: "Our own employees have their work authorization confirmed through E-Verify, and we have been enrolled since 2024.",
    lead: "That covers our employees only, not subcontractors, who are their own employers' hires.",
    leadIn: "Yes, but:",
    points: ["E-Verify: our own employees only", "Woman- and minority-owned business certified", "Registered in the federal SAM system"],
    label: "what we do and do not claim",
    deep: (<>
      <p className="sf-rule">A client taking on contract staff carries real risk, so we state the limit: the E-Verify account is configured to verify our own employees. We do not say everyone we place is covered, because subcontractors are not.</p>
      <p>We hold WBE and MBE certifications and an active SAM registration. See our {L("/capabilities", "capabilities page")} for the company record.</p>
    </>),
  },
  {
    id: "h-cost", title: "What staff augmentation costs",
    lede: "Cost follows the role, the engagement model and how long you need the person.",
    lead: "We quote in writing once we know the work, and publish no rate card.",
    points: ["Role and seniority required", "Dedicated, fixed scope or hourly", "Length of the engagement"],
    label: "what to expect in a quote",
    deep: <p className="sf-rule">Tell us the system, the stack and the timeframe, and we will say whether we have the right person and how the engagement would be scoped. If hourly fits better than fixed scope, we say that too.</p>,
  },
];

const FAQS: SfFaqItem[] = [
  { q: "What is staff augmentation?", a: "Staff augmentation adds outside specialists to your team for as long as you need them. They work in your tools, follow your process and take direction from your lead, while the staffing firm handles employment and paperwork." },
  { q: "Is staff augmentation outsourcing?", a: "No. In outsourcing the vendor takes the work and manages it. In staff augmentation you keep the management and the priorities, and the specialist works as part of your team." },
  { q: "How fast can someone start?", a: "It depends on the role and on how quickly your access and environment are ready. We tell you honestly whether we have the right person before you spend time interviewing, and we do not quote a standard time to start." },
  { q: "Who manages the people you place?", a: "You do. Your lead sets their priorities and they work in your repository and ticket queue. One of us stays involved through the first weeks so the ramp-up does not become your lead's second job." },
  { q: "What engagement models do you offer?", a: "Three: a dedicated team assigned to you full time, a fixed scope with a date and milestones, and hourly work for reviews, second opinions and unexplained outages.", link: { to: "#m1", label: "The three models" } },
  { q: "How is staff augmentation different from managed services?", a: "Managed services means we run a function for you and are accountable for the outcome, such as Salesforce administration. Staff augmentation puts a person in your team under your direction.", link: { to: "/services/salesforce-managed-services", label: "Salesforce managed services" } },
  { q: "How is staff augmentation different from consulting?", a: "A consultant delivers a recommendation or a build and is accountable for it. An augmented specialist delivers skilled hours that you direct.", link: { to: "/services/it-consulting", label: "IT consulting" } },
  { q: "What is Salesforce staff augmentation?", a: "It is placing a Salesforce administrator, developer or architect inside your team. We provide ongoing Salesforce development for a lending company, and have since April 2026." },
  { q: "What is in a staff augmentation contract?", a: "The role, the engagement model, the term and how either side ends it, written before work starts. Our own employees are verified through E-Verify; the contract states who employs the person placed." },
];

export default function StaffAugmentation() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "staff augmentation, IT staff augmentation, Salesforce staff augmentation, IT staffing, dedicated developers",
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Staff Augmentation Services",
          "Salesforce and IT staff augmentation: specialists embedded in your team, working on your tools and reporting to your lead, as a dedicated team, a fixed scope or hourly work.",
          "Staff Augmentation",
          URL_,
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      <PageHero
        eyebrow="Staff Augmentation"
        title={
          <>
            Staff <span className="text-oa-orange">augmentation services</span>{" "}
            — our people, inside your team
          </>
        }
        lede="Senior practitioners who join your standups, work in your repo and your ticket queue, and take direction from your lead. We carry the employment and the paperwork. For a sprint, or for a year."
        panel={{
          title: "How it works",
          items: [
            "Your tools, your process, your lead setting priorities",
            "Senior practitioners, not a rotating bench",
            "Dedicated, fixed scope, or hourly",
            "We carry the employment and the paperwork",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <SfPage crumbs={[{ label: "Staff augmentation" }]}>
        <EnterpriseRow id="what" tone="surface" units={WHAT} />
        <EnterpriseRow id="roles" units={ROLES} />
        <EnterpriseRow id="models" tone="night" heading={{ id: "h-models", title: "Dedicated, fixed scope or hourly", lede: "The real difference is who carries the risk on scope, so pick the model that matches how well you can define the work." }} cols="sf-c4" units={MODELS} />
        <EnterpriseRow id="steps" tone="surface" heading={{ id: "h-steps", title: "How we place someone", lede: "Four steps, and the second one is where this is usually won or lost." }} cols="sf-c3" units={STEPS} />
        <EnterpriseTable
          id="compare"
          tone="paper"
          title="Staff augmentation vs outsourcing vs consulting"
          lede="The three differ in who manages the work and who is accountable for the result."
          caption="Staff augmentation compared with outsourcing and consulting"
          head={["Model", "Who manages the work", "You get"]}
          rows={[
            ["Staff augmentation", "You do", "A specialist inside your team"],
            ["Outsourcing", "The vendor does", "A function or project run for you"],
            ["Consulting", "Shared, with us accountable for the output", "A recommendation or a build"],
          ]}
        />
        <EnterpriseRow id="compliance" tone="surface" units={COMPLIANCE} />
        <DeskCTA
          heading="Tell us about the role you cannot fill"
          lede="The skill you need for three months, the seat open too long, or the deadline that needs two more pairs of hands."
          covers={["The system, the stack and who they report to", "How long you need the person", "Which engagement model fits", "Whether we have the right person"]}
          coversLabel="What to have ready"
          next={["Send the short form on the contact page, or call.", "A person at OneAlgorithm reads it and replies.", "We tell you whether we have the person."]}
          hcLink={false}
          form={{ topic: "staff-augmentation", topicLabel: "Staff augmentation", need: "staff-augmentation", heading: "Talk to an expert", prompt: "What is the role, and how long do you need it?", submitLabel: "Talk to an expert" }}
        />
        <EnterpriseFaq title="Staff augmentation questions" items={FAQS} />
      </SfPage>
    </Layout>
  );
}
