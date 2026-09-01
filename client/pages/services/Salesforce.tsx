import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  PageHero,
  Section,
  SectionHeading,
  Reveal,
  CheckList,
  PrimaryCTA,
  SecondaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
} from "../../components/StructuredData";

/* Salesforce — rebuilt 2026-08-24. Fleet-reviewed, then checked against primary
 * sources, then three decisions from Louis. History and reasoning:
 *
 * 1. THE PAGE WAS APOLOGISING FOR PROOF IT ACTUALLY HAS.
 * It carried a card headed "No case studies to show you". Still true — no client
 * work is published and none is invented here. But nobody had read our own
 * AppExchange listing, where Salesforce publishes:
 *
 *     Certified People: 16      Certifications: 52
 *
 * verified 2026-08-24 at appexchange.salesforce.com/appxListingDetail
 * ?listingId=a0N3A00000EV7SwUAL (NOT appxConsultingListingDetail — that 404s).
 * Competencies there: Platform 38, Agentforce 6, Agentforce Marketing 3,
 * Agentforce Service 2, Agentforce Sales 1, Data 360 1, Energy & Utilities 1.
 * No ratings — nobody has reviewed us. That is third-party proof held in someone
 * else's system, and it leads the page.
 *
 * 2. THE PAGE IS SPLIT (Louis, 2026-08-24). There is no Sales Cloud or Service
 * Cloud competency on the listing at all — the mass is Platform — and the
 * listing positions on "secure workflow automation and CRM modernization for
 * government and regulated industries". But commercial Sales/Service Cloud work
 * is real revenue. So the page runs BOTH and lets the reader self-select, rather
 * than averaging the two into something addressed to nobody.
 *
 * 3. THE ORG REVIEW IS THE OFFER (Louis, 2026-08-24). With no published case
 * studies, the strongest available conversion is a diagnostic: the proof becomes
 * the buyer's own org instead of our past clients, and a small firm can actually
 * turn one around in a week where a large one has to route it through a bench.
 * PRICE: FREE. Louis decided 2026-08-24. It is free because that is the whole
 * mechanism — a free diagnostic converts on the buyer's own org and therefore
 * needs no case studies, which is exactly the hole this firm has. If anyone
 * later wants to charge for it, the offer stops doing the job it is here to do.
 *
 * WHAT IS DELIBERATELY NOT HERE
 * - No case study, no named client, no adoption or ROI figure. None exist.
 * - No government past performance. No contract has been awarded. Every
 *   government line is ELIGIBILITY and REGISTRATION only. Do not change this.
 * - No NIST 800-171 / SOC 2 / ISO 27001 / WCAG 2.1 claim. Our AppExchange
 *   listing asserts all four; Louis confirmed 2026-08-24 we hold NONE of them at
 *   present. The listing needs correcting; the website must not repeat it.
 * - No "Proven Track Record" card. Deleted in an earlier pass for having nothing
 *   behind it. It must not come back.
 *
 * SEO: title and description carry the location. A four-person firm cannot take
 * "salesforce implementation" off Accenture and Slalom, but it can win Malvern /
 * Chester County / Philadelphia and set-aside searches. The body said "Malvern"
 * zero times before this pass. The FAQ is real questions with real answers and
 * feeds FAQPage schema from the same array.
 */

const APPEXCHANGE_URL =
  "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000EV7SwUAL";
const SBA_VERIFY_URL =
  "https://search.certifications.sba.gov/profile/W8DYK38MEKP3/14G18?page=1";

/* Every figure is Salesforce's own, published on the listing above. Verified
   2026-08-24. If it changes there, change it here — do not round it, do not
   project it forward, and never add a number that is not on that page. */
/* Every one of these is a real certificate or registry entry with a number
   behind it, verified 2026-08-24. Anything that cannot be looked up by a
   stranger does not belong in this list. */
const CREDENTIALS = [
  {
    name: "Salesforce Consulting Partner",
    detail: "AppExchange listing a0N3A00000EV7SwUAL",
    href: APPEXCHANGE_URL,
  },
  /* ⛔ NMSDC MBE, WBENC WBE and Virginia SWaM came off this list 2026-09-01.
     Louis: "on all our commercial pages, we don't need to state woman owned.
     It's not a selling point." All three are diversity certifications — SWaM
     is literally Small, Women-owned and Minority-owned — so all three go, and
     all three remain on /capabilities and /industries/government where a
     buyer is looking for exactly that. (Earlier the same day the SBA
     WOSB/EDWOSB and SAM.gov cards had already moved there.)

     WHAT REPLACED THEM, and why it is stronger here: Salesforce's own
     published COMPETENCY breakdown. It is third-party, it is specific to this
     page's subject, and a commercial buyer evaluating whether we can do the
     work cares about it far more than about who owns the company. The PAA
     harvest run the same day is blunt on this — the woman-owned angle appears
     in none of the real questions buyers ask about Salesforce consulting.

     ⛔ EVERY NUMBER BELOW IS SALESFORCE'S, read off listing a0N3A00000EV7SwUAL.
     Do not round them, do not sum the four Agentforce rows into one (that
     total is our arithmetic, not their published figure), and do not add a
     competency that shows "–" on the listing. Re-read the listing when it
     changes; a third-party aggregator was circulating "19 certified experts"
     on 2026-09-01 while the listing itself said 16. */
  { name: "Platform", detail: "38 certifications" },
  { name: "Agentforce", detail: "6 certifications" },
  { name: "Agentforce Marketing", detail: "3 certifications" },
  { name: "Agentforce Service", detail: "2 certifications" },
  { name: "Agentforce Sales", detail: "1 certification" },
  { name: "Data 360", detail: "1 certification" },
  { name: "Energy & Utilities", detail: "1 certification" },
  /* Zendesk and Microsoft AI Cloud Partner Program are both real and both stay
     on /about and /capabilities. They came off THIS page 2026-08-24: on a
     Salesforce page a Zendesk agreement and a Microsoft program membership are
     not evidence of Salesforce capability, and a reviewer read the eight-item
     strip as compensating for the absence of client proof. Six relevant beats
     eight padded. */
];

const REGISTRY = [
  { figure: "16", label: "Salesforce-certified people", short: "certified people" },
  { figure: "52", label: "Salesforce certifications held", short: "certifications" },
  { figure: "38", label: "of them on the Platform competency", short: "on Platform" },
];

/* What the one-week review actually looks at. Each line is work this team already
   describes doing elsewhere on the page — nothing here invents a tool, a script
   or a scoring system we do not have. */
const REVIEW_CHECKS = [
  "Licences and edition: what you are paying for against what is actually in use",
  "Data: duplicates, required fields nobody fills, and the reports people quietly do not trust",
  "Automation: which steps are still done by hand, and which of them Flow should be doing",
  "Permissions: who can see what, and where profiles are doing a permission set's job",
  "Integrations: what syncs, what fails silently, and whether anyone is told when it does",
];

const PILLARS = [
  {
    title: "Before you buy licenses",
    description:
      "How your sales and support teams work now, which edition you actually need, and whether Salesforce is the right answer at all. Sometimes it isn't, and that's a cheaper thing to find out at this stage.",
    details: [
      "What the current process is, including the workarounds",
      "Which clouds and edition you need — and which you don't",
      "A license count and a rough cost, before anyone signs",
      "How the data gets in, and what it has to stay in step with",
      "Who owns and administers the org after we leave",
    ],
  },
  {
    title: "Configuration and build",
    description:
      "Org setup, Sales Cloud and Service Cloud, and automation for the steps your team currently does by hand. Custom objects only where the standard model genuinely doesn't fit.",
    details: [
      "Org setup: profiles, permission sets, page layouts",
      "Sales Cloud and Service Cloud configuration",
      /* Marketing Cloud is INVOICE-BACKED — a recurring, named support work
         package across consecutive monthly invoices, verified 2026-09-01 in
         02_Finance. It had never appeared anywhere on this page, while the
         page led on two clouds that carry no AppExchange competency at all.
         ⛔ Support and build, which is what the record shows. Do not upgrade
         this to "campaign strategy" or anything audience-facing. */
      "Marketing Cloud build and ongoing support",
      "Custom objects and fields where standard ones don't fit",
      "Flow automation for the manual steps",
      "Apex only where clicks genuinely can't do the job",
      "Agentforce, where an agent genuinely beats a form",
    ],
  },
  {
    title: "Data migration and integration",
    description:
      "Getting the records out of the system you're leaving, cleaning them, loading them, and proving the totals still match. Then the API work that keeps Salesforce in step with everything else — the ERP most of all, because that is where the argument about which number is right usually starts.",
    /* ⛔ THE THREE MIGRATION/SYNC LINES BELOW ARE INVOICE-BACKED, and they are
       the only delivery evidence on this page that is not a certification
       count. Verified 2026-09-01 against the paid invoice registers in
       02_Finance (PO-level work packages: "DOG Synch from SAP to SFDC",
       "QuickBase Migration", "Kissflow Migration to SFDC"). They describe the
       PATTERN, never the client — the engagement carries no consent-to-name
       record, so ⛔ do not add the customer, the sector or the dates. */
    details: [
      "Extract and profile the legacy data before moving any of it",
      "Dedupe and map fields; agree in writing what gets dropped",
      "Load, then reconcile record counts and totals",
      "ERP-to-Salesforce syncs, SAP included, so both sides agree",
      "Moves off low-code systems like QuickBase and Kissflow",
      "REST and SOAP integrations, or middleware where that's cheaper",
      "MuleSoft CloudHub where the job needs a managed runtime",
      "Scheduled syncs, with an alert when one fails",
    ],
  },
  {
    title: "After go-live",
    description:
      "Hypercare for the first 30-90 days, while the people who have to use it every day find the things nobody thought of. Then managed services — ongoing Salesforce administration on a retainer, at whatever level you need.",
    details: [
      "Hypercare, typically 30-90 days",
      "Training for admins and for the people using it daily",
      "Reports and dashboards changed as the questions change",
      "Managed services: ongoing administration on a monthly retainer",
      "Release-window testing before every Salesforce upgrade",
      "24/7 technical support across the time zones you operate in",
    ],
  },
];

/* Real questions, answered truthfully. This array is the ONLY source — it renders
   on the page and generates the FAQPage schema. If an answer cannot be made true,
   the question does not go in. See the note above createFAQSchema. */
const FAQS = [
  {
    q: "Is OneAlgorithm really a Salesforce partner?",
    a: "Yes. We are a listed Salesforce Consulting Partner on the AppExchange, listing a0N3A00000EV7SwUAL. Salesforce publishes the detail itself: 16 certified people holding 52 certifications, 38 of them on the Platform competency. You can open the listing and check it before you call us.",
  },
  {
    q: "What is the one-week org review?",
    a: "A free, fixed, one-week look at the Salesforce org you already have: licenses against actual use, data quality, what is still being done by hand, who can see what, and which integrations fail quietly. You get a written, ranked list of what we found and what we would fix first, and there is no obligation attached. You can act on it with us, with your own admin, or with nobody.",
  },
  {
    q: "Can I see case studies or client references?",
    a: "We have not published Salesforce case studies, and we will not invent any. What you can check instead is Salesforce's own registry entry for us — 16 certified people, 52 certifications, the competency breakdown — and our SBA certification record. Then take the free one-week review and judge the work on your own org rather than on a story about someone else's.",
  },
  {
    q: "Where are you located, and do you work outside Pennsylvania?",
    a: "Our office is at 625 Swedesford Road, Unit B, Malvern, Pennsylvania. We work with clients across the United States, and support across the time zones our clients operate in.",
  },
  {
    q: "What does a Salesforce implementation cost?",
    a: "It depends on the edition, the license count and how much of your data has to move, so we will not quote a figure on a web page. What we will do before you sign anything is give you a license count and a rough cost, and tell you if a smaller edition does the job.",
  },
  {
    q: "Do I need Sales Cloud or Service Cloud?",
    a: "Sales Cloud tracks the work of winning business — leads, opportunities and pipeline. Service Cloud tracks the work of supporting customers after they buy — cases, queues and escalation. Plenty of companies need both, and some need far less than they were sold. That is the first thing we look at.",
  },
  {
    /* ⛔ READ BEFORE EDITING THIS ANSWER. Louis, 2026-09-01: "We also do
       MuleSoft." What the record actually supports, checked across SharePoint
       and the invoice registers on 2026-09-01: a SIGNED CloudHub 2.0
       integration SOW (both signatures, June 2025), and separately a paid
       history of SAP-to-Salesforce and low-code migration work. What does NOT
       exist: any MuleSoft certification held by anyone here, a MuleSoft
       competency on the AppExchange listing, or a single delivery artefact
       from that SOW. One person on a 66-strong bench list names MuleSoft.
       So the answer below says we do the work and does NOT say we are a
       MuleSoft practice. ⛔ Never add a MuleSoft certification, a competency,
       a headcount or a years figure here — none of them can be evidenced, and
       the integration claim stands perfectly well without them. */
    q: "Do you work with MuleSoft?",
    a: "Yes, for the integration jobs that need it — MuleSoft is Salesforce's own integration platform, and we scope and build on CloudHub where a managed runtime, scheduling and retry handling are worth paying for. Plenty of integrations do not need it, and a REST job or a cheaper middleware will do. We will tell you which one you are looking at rather than route you to the more expensive answer.",
  },
  {
    q: "We already have an admin. Can you do just the data migration?",
    a: "Yes. The four stages of the work are separable. If you only need the records moved off your current system, cleaned, loaded and reconciled against the totals, take that stage on its own.",
  },
];

export default function Salesforce() {
  useSEO({
    /* Brand last. 62 characters.
       ⛔ Was "Salesforce Consulting Partner | OneAlgorithm" — a bare head term
       against Salesforce's own directory, Accenture and Slalom, offering the
       searcher no reason to click. Bing has NEVER served this URL for anything
       (measured 2026-09-01: every impression the domain holds is branded), so
       there is no ranking here to protect by leaving it alone. The free org
       review is the one thing on this page no large partner will match, so it
       goes in the title where it can win the click. */
    title: "Salesforce Consulting Partner | Free Org Review | OneAlgorithm",
    // 155 characters. The previous one was 203 and lost its last third to SERP
    // truncation.
    description:
      "Listed Salesforce Consulting Partner: 16 certified people, 52 certifications. Sales and Service Cloud, data migration, and a free org review.",
    canonical: getCanonicalUrl("/services/salesforce"),
    ogTitle: "Salesforce Consulting Partner — OneAlgorithm",
    ogDescription:
      "16 Salesforce-certified people and 52 certifications, published by Salesforce. Commercial and government CRM work, and a free one-week review of the org you already have.",
    ogUrl: getCanonicalUrl("/services/salesforce"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Salesforce Consulting Partner — OneAlgorithm",
    twitterDescription:
      "16 Salesforce-certified people, 52 certifications, published on the AppExchange. Commercial and government CRM work, and a free one-week org review.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Salesforce Implementation & Consulting Services",
          "Salesforce implementation and consulting from a listed AppExchange Consulting Partner working with companies across the United States: Sales Cloud and Service Cloud configuration, Flow automation, data migration and reconciliation, API integrations, Hypercare after go-live, and a free one-week review of an existing org.",
          "CRM & Salesforce Implementation",
          "https://onealgorithm.com/services/salesforce",
        )}
      />
      {/* The service page carried no locality signal at all. This helper already
          existed and holds the full NAP and geo. */}
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createFAQSchema(FAQS)} />

      <PageHero
        title={
          <>
            <span className="text-oa-orange">Salesforce</span> implementation
            and consulting
          </>
        }
        lede="We configure Sales Cloud and Service Cloud, automate the workflow behind them, move the data off whatever you're on now, and stay on afterwards while people learn it. For commercial teams anywhere in the United States."
        /* The hero's right column is the VERIFICATION CARD, not a bullet list.
           Reasoning: this page's whole argument is that our proof is a record in
           someone else's registry rather than an adjective in ours — so show the
           record. Every figure is Salesforce's own and already appears further
           down the page, which satisfies the panel's own content rule. It is
           also type and rules, not a photograph: no LCP cost, and it cannot be
           mistaken for the stock imagery the panel exists to avoid. */
        panel={{
          title: "Salesforce's record of us",
          items: [],
          slot: (
            <div>
              {/* Louis, 2026-09-01: "I don't like that Logo I like the Cloud."
                  So the cloud leads the card. This is Salesforce's CORPORATE
                  mark used REFERENTIALLY — it labels Salesforce's own registry
                  record, which is what the card contains, and it links to that
                  record. That is the permitted use.
                  ⛔ It is NOT a partnership credential and must never stand in
                  for one: the "Salesforce Partner" badge lower down is the only
                  mark that says we are a partner. ⛔ Never pair this with the
                  OneAlgorithm logo as a lockup, never recolour or crop it, and
                  never let it become the page's own hero graphic.
                  ⛔ Use the repo SVG, not the 4000x2250 JPG from the Salesforce
                  media pack — same official mark, but the JPG has a baked WHITE
                  ground that would sit as a white box on this night panel, and
                  it is vector here for a fraction of the bytes. */}
              <img
                src="/media/platforms/salesforce.svg"
                alt="Salesforce"
                width={273}
                height={191}
                className="mb-7 h-auto w-[124px]"
              />
              <dl className="grid grid-cols-3 gap-x-4">
                {REGISTRY.map((r) => (
                  <div key={r.label} className="flex flex-col">
                    <dt className="order-2 mt-1.5 text-xs leading-tight text-oa-nightInk3">
                      {r.short}
                    </dt>
                    <dd className="order-1 font-mono text-3xl leading-none text-oa-orange">
                      {r.figure}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-oa-nightInk3">
                  AppExchange listing
                </p>
                <p className="mt-1.5 font-mono text-sm text-oa-nightInk">
                  a0N3A00000EV7SwUAL
                </p>
              </div>
              <a
                className="mt-3 inline-flex items-center gap-2 py-2 text-sm font-medium text-oa-nightBlue underline underline-offset-4 hover:text-oa-nightInk"
                href={APPEXCHANGE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify on AppExchange
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ),
          /* ⛔ "WBENC and NMSDC certified" came off this line 2026-09-01 — see
             the note on the section heading below. The certificates are still
             on the page, once, in the credentials list. */
          footer: ["Salesforce Consulting Partner"],
        }}
        primary={{ label: "Get a free org review", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
        /* Ten links to unrelated services used to sit here, above every piece of
           proof on the page. Kept on the other service pages, off on this one. */
        siblings={false}
      />

      {/* CREDENTIALS STRIP. This slot — directly under the hero — is where every
          partner site in the category puts its proof, and it is the highest-value
          real estate on the page. It briefly held a band headed "What we cannot
          show you". That was a mistake: leading with the absence draws the eye to
          the one thing we lack, in the exact position competitors use to establish
          they are real. The no-case-studies fact is true and stays on the page —
          it lives in the FAQ, where it answers a question somebody actually asked,
          instead of being announced. Corrected 2026-08-24 on Louis's call.
          ⛔ Nothing goes in this list that a stranger cannot look up. */}
      <Section tone="night" grid bordered compact>
        <SectionHeading
          tone="dark"
          /* ⛔ OWNERSHIP STATUS IS OFF THIS PAGE ON PURPOSE. Louis, 2026-09-01:
             "We don't need to plaster it anywhere but the government pages. On
             all our commercial pages, we don't need to state woman owned. It's
             not a selling point."

             The count backed him: this COMMERCIAL page carried SIX mentions of
             woman-owned / WBENC / NMSDC — MORE than /industries/government (6)
             and twice /capabilities (3). It was the heaviest page on the site
             for a status that helps least here. Now zero in rendered copy.

             I argued once for keeping the two certificates on the grounds that
             large commercial supplier-diversity programmes search for them.
             Louis overruled it, and the same day's PAA harvest supports him:
             the woman-owned angle appears in NONE of the questions buyers
             actually ask about Salesforce consulting. Recording the trade so
             nobody re-litigates it from scratch — the certifications are live
             on /capabilities and /industries/government, so a supplier-
             diversity team can still find them.

             ⛔ Do not re-add ownership status here — not this H2, not the hero
             panel, not the opening sentence, not the credentials list. */
          title="A Salesforce partner you can check before you call"
          lede="Salesforce publishes what our people are certified in, competency by competency. Every figure below is theirs, not ours, and you can open the listing and read it yourself."
        />
        {/* One flat, self-contained sentence that answers the query in the shape an
            answer engine can lift: "X is a Y in Z, with N." AI answers quote a
            direct claim near a matching heading; the rest of this page is written
            as argument, which reads well and extracts badly. Added 2026-08-24
            after the crawler block was lifted and citation became possible. */}
        {/* Paragraph and badge are ONE object on wide screens. Apart, the badge
            floated alone in the middle of the band with the whole right-hand
            half of the section empty beside the text — two faults with one
            cause. Together, the mark sits next to the sentence it backs, which
            is the only place a trust mark does any work. */}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_auto] lg:gap-16">
        <Reveal>
          <p className="max-w-3xl text-lede text-oa-nightInk2 leading-relaxed">
            {/* ⛔ ONE SENTENCE. KEEP IT ONE SENTENCE. Louis, 2026-09-01, on the
                paragraph that used to run on from here: "It's descriptions like
                this. I don't like it. It's OK to leave the certifications up,
                but we don't need large bodies of text."

                What was cut and why nothing was lost: the 16/52 figures are
                already in the hero card, and the 38-on-Platform figure is now
                its own card in the competency list directly below. The prose
                was restating both, plus a supplier-diversity clause that had
                no business on a commercial page.

                What survives is the flat, self-contained claim an answer
                engine can lift — "X is a Y in Z" — which is the one job this
                line does that no other element on the page does. ⛔ Do not
                append explanation to it, and do not re-add ownership status. */}
            <strong className="font-semibold text-oa-nightInk">
              One Algorithm is a Salesforce Consulting Partner working with
              companies across the United States.
            </strong>
          </p>
        </Reveal>
        {/* Louis, 2026-09-01, looking at it on his phone: "I don't like this
            logo I'd rather you just use the Cloud and put the text partner
            after it."

            WHY THE ISSUED BADGE CAME OFF. The FY27 Partner Program pack
            (`~/Downloads/Partner Program Badges.zip`) was re-checked today and
            ⛔ THERE IS NO DARK OR REVERSED VARIANT OF ANY BADGE IN IT — all 70
            assets carry the same pale-blue gradient plate, and inverting or
            recolouring one is prohibited outright. On this night section that
            plate reads as a washed-out sticker, which is exactly what Louis
            saw. There was no version of "keep the badge" that looked right.

            WHAT REPLACED IT, and why this is the safer of the two options: the
            product mark used referentially, plus a FACTUAL TEXT STATEMENT in
            our own typography, linked to the registry entry that proves it.
            That is a page saying a true thing — not a re-drawn credential.
            ⛔ Do NOT turn this back into a badge lookalike: no pale plate
            behind it, no lockup with the OneAlgorithm logo, and never the
            words Summit, Expert or Accredited — those are tiers and
            competencies we do not hold (every competency row on our listing
            reads "–"). The link is load-bearing: it is what makes the claim
            checkable rather than decorative. */}
        <Reveal className="lg:justify-self-end">
          <a
            href={APPEXCHANGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-6 transition-colors hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oa-orange"
          >
            {/* alt="" — the visible text beside it already names the thing, so
                a screen reader announcing "Salesforce" first is duplication. */}
            <img
              src="/media/platforms/salesforce.svg"
              alt=""
              width={273}
              height={191}
              loading="lazy"
              decoding="async"
              className="h-auto w-[76px] shrink-0"
            />
            <span>
              <span className="block text-2xl font-semibold leading-none text-oa-nightInk">
                Partner
              </span>
              <span className="mt-2.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-oa-nightInk3 underline decoration-white/25 underline-offset-4 transition-colors group-hover:text-oa-nightInk2 group-hover:decoration-oa-orange">
                Verify on AppExchange
              </span>
            </span>
          </a>
        </Reveal>
        </div>
        <ul className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {/* ⛔ The <li> must be the DIRECT child of the <ul>. Reveal renders a
              div, so wrapping the li in it put a div between the two and axe
              failed both `list` and `listitem` (4 nodes) — the same fault that
              took the FAQ off a <dl>, noted further down this file. Reveal goes
              INSIDE the li. */}
          {CREDENTIALS.map((c) => (
            <li key={c.name} className="border-t border-white/20 pt-5">
              <Reveal>
                <p className="text-sm font-semibold text-oa-nightInk">
                  {c.href ? (
                    <a
                      className="underline decoration-white/30 underline-offset-4 hover:decoration-oa-orange"
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </p>
                <p className="mt-2 font-mono text-xs leading-relaxed text-oa-nightInk3">
                  {c.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        {/* Required by Salesforce's Trademark & Copyright Usage Guidelines:
            "[insert Salesforce trademark] is a trademark of Salesforce, Inc."
            Named here because the page uses Salesforce, Agentforce, Sales Cloud
            and Service Cloud as marks. */}
        <p className="mt-12 text-xs leading-relaxed text-oa-nightInk3">
          Salesforce, Agentforce, Sales Cloud and Service Cloud are trademarks of
          Salesforce, Inc. One Algorithm LLC is an independent consulting partner
          and is not affiliated with or endorsed by Salesforce beyond its listed
          partnership.
        </p>
      </Section>

      {/* THE OFFER. With nothing published, the honest conversion is a diagnostic
          on the buyer's own org rather than a story about someone else's. Note
          the price is deliberately unstated — see the TKTK at the top. */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <SectionHeading
              title="Start with a free one-week Salesforce health check"
              lede="Most people arriving here already own Salesforce and suspect their CRM is not earning what they pay for it. Rather than ask you to take our word for anything, we will spend a week in your org, at no cost, and tell you what is actually wrong with it."
            />
            <div className="mt-9">
              <Reveal>
                <p className="text-oa-ink2 leading-relaxed">
                  At the end you get a written, ranked list of what we found
                  and what we would fix first. It is free and it is yours — act
                  on it with us, with your own admin, or with nobody at all. If
                  the answer is that your org is basically fine, we will say
                  that too, and you will not hear from us again unless you ask.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryCTA to="/contact">
                    Get a free org review
                  </PrimaryCTA>
                  <SecondaryCTA href="tel:+16108909711">
                    Call (610) 890-9711
                  </SecondaryCTA>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal className="border-t border-oa-hairlineStrong pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-oa-ink3">
              What the week looks at
            </h3>
            <div className="mt-6">
              <CheckList items={REVIEW_CHECKS} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The four pillars are a SEQUENCE — the lede says so. They were a 2x2 grid
          of identical boxed cards, which is the one layout that hides a sequence.
          Numbered spine: hairline rule, mono stage number, deliverables in their
          own column. */}
      <Section tone="surface" bordered>
        <SectionHeading
          title="What the work actually is"
          lede="Four stages, usually in this order. If you already have an admin and only need stage 03, take that one on its own."
        />
        {/* ⛔ ONE STAIRCASE, NOT FOUR SLABS. Each stage used to carry its own
            full-width `border-t`, which gave the four of them the identical
            silhouette every other band on this page already has — heading
            left, checklist right, rule on top — and the section read as
            repetition rather than as the sequence the lede promises. The rule
            is now a single CONTINUOUS vertical spine with the stage numbers
            sitting on it, so the eye follows 01 → 04 as one process. The
            horizontal rule survives below `md`, where the spine is off and the
            stages would otherwise run together. Structure encoding real
            information: these genuinely ARE ordered, which is why a numbered
            spine is honest here and would not be on the FAQ. */}
        <ol className="mt-14 space-y-14 md:space-y-16 md:border-l md:border-oa-hairlineStrong md:pl-12 lg:pl-16">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="relative">
              <Reveal>
                <div className="grid gap-8 border-t border-oa-hairlineStrong pt-8 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-14 md:border-t-0 md:pt-0">
                  <div>
                    <div className="flex items-baseline gap-4">
                      {/* On md+ the number leaves the text flow and sits ON the
                          spine. `aria-hidden` because the <ol> already conveys
                          the order to a screen reader — reading "01" aloud
                          before every heading is noise. */}
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm text-oa-orangeText md:absolute md:left-0 md:top-1 md:-translate-x-[calc(100%+1.5rem)] lg:-translate-x-[calc(100%+2rem)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-h3 font-semibold text-oa-ink">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-xl text-oa-ink2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="md:pt-1">
                    <CheckList items={p.details} />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* THE SPLIT (Louis, 2026-08-24). Two buyers arrive here wanting different
          things and reassured by different evidence. Averaging them produces a
          page addressed to nobody, so they get one block each and choose.
          ⛔ The right-hand block is ELIGIBILITY AND REGISTRATION ONLY. No federal
          contract has been awarded. Never write past performance here. */}
      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          title="Two ways people arrive at this page"
          lede="Some people already own Salesforce and it is not earning its keep. Others have not bought it yet and want to know what they actually need. Those are different problems with different first moves. Take whichever half is yours."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="border-t border-white/20 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">
              Commercial
            </p>
            <h3 className="mt-4 text-h3 font-semibold text-oa-nightInk">
              You run a sales or support team and Salesforce is not pulling its
              weight
            </h3>
            <p className="mt-4 text-oa-nightInk2 leading-relaxed">
              Usually that means people are still doing by hand the things the
              platform was bought to do. Automation is the deep end of our bench
              — <strong className="font-semibold text-oa-nightInk">38 of our 52
              certifications are on the Platform competency</strong>, which is
              the Flow, permissions and integration work that takes those steps
              off your team. Sales Cloud and Service Cloud get configured around
              how your people actually work, not the other way round.
            </p>
            <div className="mt-7">
              <CheckList
                tone="dark"
                items={[
                  "The manual steps your team repeats every week, handed to Flow",
                  "Pipeline, cases and queues set up around your process",
                  "The reports your leadership will actually open",
                  "Integrations that fail quietly, found and alerted on",
                ]}
              />
            </div>
            {/* Was "there is no bench to be handed down to". That cannot be true
                at the same time as 16 certified people across the US and India,
                and a buyer who reads both notices. The defensible claim is
                continuity of the person who scoped it, not the absence of a team. */}
            <p className="mt-7 text-sm text-oa-nightInk3 leading-relaxed">
              You deal with the people who do the work. The practice director who
              scopes your org stays on it through delivery — you are not
              introduced to one person and handed to another after the sales call.
            </p>
          </Reveal>

          {/* ⛔ A "Government and regulated" block stood here — set-aside,
              SAM.gov, UEI, CAGE, "answer to an auditor" — on a COMMERCIAL
              service page. Removed 2026-08-25 (Louis: federal is a small
              section and a bonus). Its content, including the statement that
              the firm holds no federal Salesforce contract, is on
              /industries/government and /capabilities.

              ⛔ Its removal left this `lg:grid-cols-2` holding ONE child, so
              half the section was empty dark space on every screen ≥1024px
              while the heading promised "two ways". Refilled 2026-09-01 with
              the OTHER commercial arrival — the pre-purchase buyer — which is
              a door the page already opens twice (stage 01 of the work, and
              the "Do I need Sales Cloud or Service Cloud?" FAQ) and had no
              entry point of its own. ⛔ No new claim is made here: every line
              restates work described elsewhere on this page. Do not add a
              client, a number or a timeframe to it. */}
          <Reveal className="border-t border-white/20 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-oa-nightInk3">
              Not bought yet
            </p>
            <h3 className="mt-4 text-h3 font-semibold text-oa-nightInk">
              You are being sold Salesforce and cannot tell what you actually
              need
            </h3>
            <p className="mt-4 text-oa-nightInk2 leading-relaxed">
              The expensive mistakes get made here, before anything is
              configured — the wrong edition, seats for people who will never
              log in, and clouds bought together because they were quoted
              together.{" "}
              <strong className="font-semibold text-oa-nightInk">
                We will tell you if a smaller edition does the job, and we will
                tell you if Salesforce is the wrong answer altogether.
              </strong>{" "}
              That is a cheaper thing to find out now than in month four.
            </p>
            <div className="mt-7">
              <CheckList
                tone="dark"
                items={[
                  "What your process actually is now, workarounds included",
                  "Which clouds and edition you need — and which you don't",
                  "A license count and a rough cost, before anyone signs",
                  "Who owns and administers the org after we leave",
                ]}
              />
            </div>
            <p className="mt-7 text-sm text-oa-nightInk3 leading-relaxed">
              Nothing here commits you to buying it from us, or to buying it at
              all. If the honest answer is that your spreadsheet is still doing
              the job, that is the answer you will get.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Real questions with real answers, feeding FAQPage schema off the same
          array. Also where the geographic and set-aside language earns its place
          for AI assistants, which quote question-and-answer blocks. */}
      <Section tone="paper">
        <SectionHeading
          title="Questions we get asked before the first call"
          lede="If an answer is not here, it is because we could not make it true for every engagement. Ask us and we will tell you what it depends on."
        />
        {/* Not a <dl>. Wrapping each pair in Reveal put two divs between the list
            and its dt/dd, which axe flags as dlitem/definition-list. Real h3s are
            better anyway — the questions join the heading outline, and the
            FAQPage schema carries the pairing regardless. */}
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <p className="mt-3 text-oa-ink2 leading-relaxed md:mt-0">
                  {f.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ⭐ THE LOCAL TRIO, linked from the hub page 2026-09-01. This is the
          authority direction that matters: PageRank decays with every click of
          distance, so the page with the most standing links down to the three
          that need to rank. Each link's anchor text carries its target phrase,
          because the anchor teaches Google more than the destination does.
          ⛔ This is three links with a sentence each, NOT a town list — a block
          of place names is the shape Google's keyword-stuffing policy names by
          name, and one was already removed from WebDesignChesterCounty.tsx for
          measuring 3.57% place density. Do not turn this into one. */}
      <Section tone="surface" bordered compact>
        <SectionHeading
          eyebrow="Near you"
          title="Working locally"
          lede="Three pages for the questions that change depending on where you are and what you have already bought."
        />
        <ul className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-3">
          {[
            {
              to: "/services/salesforce-consultant-philadelphia",
              label: "Salesforce consultant in Philadelphia",
              body: "You already own it and it is not earning its keep.",
            },
            {
              to: "/services/salesforce-consultant-chester-county",
              label: "Salesforce consultant in Chester County",
              body: "Still choosing, and unsure which edition you need.",
            },
            {
              to: "/services/salesforce-consulting-partner-pennsylvania",
              label: "Salesforce Consulting Partner in Pennsylvania",
              body: "How to check any partner's record before you hire.",
            },
          ].map((l) => (
            <li key={l.to} className="border-t border-oa-hairlineStrong pt-5">
              <Link
                to={l.to}
                className="text-sm font-semibold text-oa-ink underline decoration-oa-hairlineStrong underline-offset-4 hover:decoration-oa-orange"
              >
                {l.label}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-oa-ink3">
                {l.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        title="Tell us what your Salesforce is doing wrong"
        body="An org nobody trusts the data in, a migration that stalled, or a renewal you're not sure you should sign. Describe the symptom and we'll tell you what we'd look at first — or call (610) 890-9711 and ask."
        primary={{ label: "Get a free org review", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <Section tone="paper" compact>
        <SocialShare className="justify-center" />
      </Section>
    </Layout>
  );
}
