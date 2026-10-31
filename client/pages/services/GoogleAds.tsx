import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, Verify, DeskCTA, FAQ, StageRail, StageUnits,
} from "../../components/sf";
import type { SfFaqItem, Stage } from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import {
  GaStyle, GaCards, GaTable, GaLedger, AuditPlate, CountOncePlate, AdRankPlate, ReportPlate, GaSources, GOOGLE_SOURCES,
} from "../../components/v2/google-ads-Plates";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
import { CaseCard } from "../../components/v2/shared-CaseCard";
import { SF_PHONE } from "../../data/salesforceShared";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";
import { ServiceCities } from "@/components/v2/svc-ServiceCities";

/* /services/google-ads, round 3 (2026-10-31): SEO spec A section 3 + seo-audit + maturity-plan applied on the sf kit.
 *
 * ⛔ THE HERO IS KEPT: same PageHero, panel and buttons. One text edit: "We run Google Ads accounts" -> "We set up and
 *    manage Google Ads accounts" (fact-check: the we-run claim is unsourced, there is no Google Ads client work).
 * ⛔ NO Google Partner / Premier claim, NO client result, ROAS, CPA, testimonial, count, award or fee. Method only.
 *    Every Google fact sits in ONE Sources pop-up (components/v2/google-ads-Plates.tsx, read 2026-10-31).
 * ⛔ CANNIBALISATION: "google ads management philadelphia" belongs to /services/google-ads-philadelphia. This page
 *    never uses Philadelphia in its title, H1 or headings; it links there once in the FAQ and once in the link row.
 * ⛔ No reporting cadence is stated (the "weekly pass" line was flagged unsourced); the schedule is "agreed in writing". */

const PATH = "/services/google-ads";
const URL_ = "https://onealgorithm.com/services/google-ads";
const TITLE = "Google Ads Management Services You Can Audit | OneAlgorithm";
const DESCRIPTION = "Google Ads management services: tracking counted once, negatives first, the account in your name. No guarantees. Request an audit: (610) 890-9711.";
const CONTACT = contactHref("Google Ads audit", PATH, "google-ads");

const AUDIT_AREAS = [
  { title: "Search terms and negatives", body: "We sort the search terms report by spend and outcome, then write the negative list from real searches so irrelevant clicks stop." },
  { title: "Conversion tracking counted once", body: "Google can track website, app, phone-call and offline conversions. We check each one fires once, so no lead is counted twice." },
  { title: "Geography and structure", body: "Targeting should match where you can serve, and campaigns should group keywords that share an intent." },
  { title: "Landing pages", body: <>A lot of what limits an account happens after the click, so we read the page behind each ad group. We can rebuild it too: see <Link className="sf-link" to="/services/website-development">website development</Link>.</> },
];

const PARTS = [
  { title: "Campaign setup and strategy", body: "How many campaigns, which keywords sit together, where the budget splits. Get this wrong and bid tuning will not rescue it." },
  { title: "Audience targeting and remarketing", body: "Remarketing lists and customer match, so you stop paying a full click price for someone who already bought." },
  { title: "Bid management", body: "Smart Bidding where there is enough conversion data, manual control where there is not. We say which before switching." },
  { title: "Creative and landing page testing", body: "Ad and page tests run one variable at a time, long enough to mean something. Much of the limit sits after the click." },
  { title: "Measurement and attribution", body: "Conversion tracking that fires once, offline imports that match your CRM, and an attribution model you chose." },
  { title: "Reporting", body: "A plain report: spend, leads counted once, what we changed and what is next. Impressions sit near the bottom." },
];

const STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Audit the account", sub: "search terms · geography · pages", line: "Where the budget goes, what the geography covers, what the page does with the click.", details: ["Search terms sorted by spend and outcome", "The landing page behind each ad group"] },
  { k: "s2", num: "02", title: "Fix the tracking", sub: "forms · calls · offline imports", line: "Each lead counted once. Nothing else is trusted until this is.", details: ["Phone calls included", "Offline imports that match your CRM"] },
  { k: "s3", num: "03", title: "Subtract", sub: "negatives before keywords", line: "Cut the spend that is not converting before adding a single keyword.", details: ["The negative list, written from real searches", "Geography trimmed to where you can serve"] },
  { k: "s4", num: "04", title: "Build and test", sub: "one variable at a time", line: "New structure, bids and ads, with a plain report you can check.", details: ["Tests run long enough to mean something", "A report that shows spend and leads counted once"] },
];

const FEES = [
  { title: "Flat fee", body: "Predictable, and not tied to how much you spend." },
  { title: "Percent of spend", body: "Scales with budget, so ask who benefits from raising it." },
  { title: "Hybrid", body: "A base fee plus a share, with the split in writing." },
];

const FAQS: SfFaqItem[] = [
  { q: "How much does Google Ads management cost?", a: "Fees come in three models: a flat fee, a percentage of ad spend, or a hybrid. Ad spend itself is paid to Google, separately from our fee. We set the scope after the audit and do not print a price list, because the size of the account and the state of its tracking decide the work." },
  { q: "How much should I spend on Google Ads each month?", a: "Start from what a customer is worth and how many leads you can handle, not from a round number. The audit checks whether your tracking counts leads once, so budget is judged on real conversions. We give no universal figure, because the auction depends on your competitors, location and keywords." },
  { q: "Is Google Ads worth it for a small business?", a: "It can be, when people search for what you sell and the landing page turns them into enquiries. Ads buy a position now, so they suit a launch or a slow quarter. We audit first: if tracking is broken or the account leaks spend, fixing that is worth more than raising the budget." },
  { q: "How long until I see results?", a: "Ads can start showing soon after launch, but the useful answer takes longer: enough clicks and conversions to judge. We fix tracking first, cut waste with the search terms report, then test one change at a time. We cannot promise a date for results, and nobody honestly can." },
  { q: "Can an agency guarantee ROI?", a: "No. Results depend on your market, offer, page and budget, and Google's auction is not ours to control. Be wary of any agency that guarantees a return. What we can promise is method: tracking that counts each lead once, negatives first, the account in your name and plain reporting." },
  { q: "Is Google Ads better than SEO?", a: "Neither is better; they do different jobs. Ads buy visibility now and stop when you stop paying. SEO builds slowly and keeps working once pages are trusted. Many small businesses use ads while their pages earn rankings. We run both, so we can say where your next dollar works harder.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "What is Quality Score, and does it matter?", a: "Quality Score is a 1-10 diagnostic at keyword level, built from expected click-through rate, ad relevance and landing page experience. Google's help page says it is not an input in the ad auction. Treat it as a hint about what to fix, not a number to chase." },
  { q: "Do you need a Google Partner agency?", a: "Google's Partner badge requires a 70% optimization score, $10,000 in ad spend over 90 days across managed accounts, and certified strategists. We do not claim the badge. Judge any agency, including us, on method and access: do you own the account, and can you see every number?" },
  { q: "Do I own my Google Ads account?", a: "Yes. The account is in your name, with you as owner, and we work inside it. If we part ways you keep the campaigns, history and conversion data. Be cautious of any agency that runs your ads from its own account and will not hand over access." },
  { q: "What is Google Ads management?", a: "It is the ongoing work of running a Google Ads account: structure, keywords and negatives, bids, ad copy, landing pages, conversion tracking and reporting, so spend goes to searches that produce enquiries. It is sometimes called PPC management. Management is separate from the ad spend, which goes to Google." },
  { q: "Why are Google Ads so expensive?", a: "Google ranks ads by Ad Rank, which weighs your bid, ad and landing page quality, auction competitiveness and the search context. Google's help says relevant keywords and ads can win a higher position at a lower price. Waste, such as broad match with no negatives or a weak page, raises your cost per lead." },
  { q: "Where do you run Google Ads accounts?", a: "We run accounts remotely from our Malvern, PA office. For Philadelphia businesses there is a dedicated page covering radius, call tracking and the waste we find locally. The method is the same everywhere: audit, tracking, subtract, then build. Request an audit and we will say which parts of your account matter first.", link: { to: "/services/google-ads-philadelphia", label: "Google Ads management in Philadelphia" } },
];

export default function GoogleAds() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "Google Ads management, Google Ads management services, Google Ads audit, PPC management, Google Ads consultant, conversion tracking",
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
    ogUrl: getCanonicalUrl(PATH),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: TITLE,
    twitterDescription: DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Google Ads Management",
          "Google Ads management and paid search: account and campaign structure, keyword and negative keyword management, remarketing and customer match audiences, bid strategy, ad and landing page testing, and conversion tracking and attribution. The advertising account stays in the client's name.",
          "Google Ads management",
          URL_,
          {
            providerId: "https://onealgorithm.com/#org",
            areaServed: { "@type": "Country", name: "United States" },
            offers: { "@type": "Offer", name: "Google Ads audit", url: "https://onealgorithm.com/contact?need=google-ads" },
            catalog: { name: "Google Ads management", urls: ["https://onealgorithm.com/services/google-ads-philadelphia"] },
          },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      <PageHero
        eyebrow="Google Ads"
        title={
          <>
            Google Ads management —{" "}
            <span className="text-oa-orange">paid search you can audit</span>
          </>
        }
        lede="We set up and manage Google Ads accounts: the structure, the keywords, the negative list, the bids and the tracking underneath. The same few problems account for most wasted spend — broad match with no negatives, conversion tracking that double-counts, and a landing page nobody has touched in a year."
        panel={{
          title: "What we deliver",
          items: [
            "Campaign Setup & Strategy",
            "Audience Targeting & Remarketing",
            "Bid Management & Optimization",
            "Creative & Landing Page Testing",
            "Measurement & Attribution",
          ],
        }}
        primary={{ label: "Request Google Ads Audit", to: CONTACT }}
        secondary={{ label: "Back to Marketing", to: "/services/marketing" }}
      />

      <SfPage crumbs={[{ label: "Google Ads" }]}>
        <GaStyle />

        {/* 1. Hand-off band: the audit as a sample report plate, with the four audit areas as H3s. */}
        <SmartSection id="audit" tone="surface" grid labelledBy="h-audit">
          <SmartUnit
            className="sf-c5"
            headingId="h-audit"
            title="What a Google Ads audit covers"
            lede="A Google Ads audit finds where spend leaks and what is not being counted, ranked by what to fix first."
            lead="An audit checks the four places wasted spend tends to hide, and shows which one is yours."
            points={[
              "Search terms and negatives: what to cut",
              "Conversion tracking counted once",
              "Geography, structure and landing pages",
            ]}
          />
          <div className="sf-c7"><AuditPlate fig={1} /></div>
          <div className="sf-c12"><GaLedger items={AUDIT_AREAS} /></div>
        </SmartSection>

        <OfferBand heading="Request a Google Ads account review" line="We read your account and tell you where the spend leaks. Call or send a note." label="Request a Google Ads audit" />

        {/* Proof band: honest proof only (reviews, team). No Google Ads client results exist, and none are claimed. */}
        <SmartSection id="proof" compact labelledBy="h-proof">
          <h2 className="sf-h4" id="h-proof">Who you would work with</h2>
          <div style={{ marginTop: 18 }}><ProofStrip variant="local" /></div>
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
        </SmartSection>

        {/* 2. Six parts: hover-lift cards. */}
        <SmartSection
          id="what"
          tone="surface"
          heading={{ title: "What Google Ads management includes", id: "h-what", lede: "Search campaigns, Performance Max and remarketing, set up in six parts, with tracking first if it is not already in place." }}
        >
          <div style={{ marginTop: 40 }}><GaCards items={PARTS} /></div>
        </SmartSection>

        {/* 3. Stage rail. */}
        <SmartSection
          id="process"
          heading={{ title: "How the work runs", id: "h-process", lede: "Audit, tracking, subtract, then build: four stages, each finished before the next one starts." }}
        >
          <div style={{ marginTop: 40 }}>
            <StageRail
              fig={2}
              stations={STAGES}
              title="The four stages of a Google Ads engagement"
              desc="A rail runs through four stations: audit the account, fix the tracking, subtract, build and test."
              stamp="How the work runs"
              caption="Four stages in the order they run. Tracking comes before any change to bids or keywords."
            />
            <StageUnits items={STAGES} />
          </div>
        </SmartSection>

        {/* 4. Tracking: plate left, text right. */}
        <SmartSection id="tracking" tone="surface" grid labelledBy="h-tracking">
          <div className="sf-c7">
            <CountOncePlate
              fig={3}
              inputs={["Form submitted", "Call tracker rings", "Thank-you page reloads"]}
              caption="One lead can trip three counters. Until each lead is counted once, every report and every bid is built on the wrong number."
            />
          </div>
          <SmartUnit
            className="sf-c5"
            headingId="h-tracking"
            title="Count each lead exactly once"
            lede="A form and a call tracker can both claim one lead, which inflates every report."
            lead="Nothing else in the account can be trusted until the count is right."
            points={[
              "Website, phone-call and offline conversions, as Google lists them",
              "A thank-you page that fires once",
              "Offline imports that match your CRM",
            ]}
          >
            <p style={{ marginTop: 14 }}>Measurement is a project of its own: see <Link className="sf-link" to="/services/martech">MarTech consulting</Link>.</p>
          </SmartUnit>
        </SmartSection>

        <OfferBand heading="Not sure what your account is doing?" line="Tell us what you spend it on; we say what we would check first." label="Request a Google Ads audit" />

        {/* 5. Comparison table. */}
        <SmartSection
          id="pmax"
          heading={{ title: "Search campaigns or Performance Max?", id: "h-pmax", lede: "Search campaigns answer what people type; Performance Max runs one goal-based campaign across Google's channels." }}
        >
          <div style={{ marginTop: 40 }}>
            <GaTable
              caption="Search campaigns compared with Performance Max"
              head={["Compared", "Search campaigns", "Performance Max"]}
              rows={[
                ["Control", "Direct control of keywords and negatives", "Conversion goals, creative assets and audience signals"],
                ["Reach", "Searches on Google", "YouTube, Display, Search, Discover, Gmail and Maps"],
                ["Needs", "The phrases your buyers use", "Real conversion data, plus text, images or video to assemble"],
                ["Visibility", "You see exactly what you paid for", "More reach, less visibility per channel"],
              ]}
            />
            <p className="sf-lead sf-measure" data-lead="" style={{ marginTop: 28 }}>
              <span className="sf-lead-in">Why it matters:</span> The right choice follows your conversion data and creative, not which format is newer. We say which fits before switching anything.
            </p>
          </div>
        </SmartSection>

        {/* 6. Ad Rank: night, text left, plate right. */}
        <SmartSection id="rank" tone="night" grid labelledBy="h-rank">
          <SmartUnit
            className="sf-c5"
            headingId="h-rank"
            title="What Google uses to rank ads"
            lede="Ad Rank decides whether and where an ad shows, and Google publishes the six factors behind it."
            leadIn="Yes, but:"
            lead="Quality Score is a diagnostic, and Google says it is not an input in the ad auction."
            points={[
              "We read Quality Score to find the weak ad or page, then fix that",
              "Relevant keywords and ads can win a higher position at a lower price",
              "The cheapest gain is often a tighter keyword list",
            ]}
          />
          <div className="sf-c7"><AdRankPlate fig={4} /></div>
        </SmartSection>

        {/* 7. Cost: three fee models. */}
        <SmartSection id="cost" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c5"
            headingId="h-cost"
            title="What Google Ads management costs"
            lede="Agencies charge a flat fee, a percentage of ad spend or a hybrid, and your ad budget is paid to Google separately."
            lead="We print no price here, because a number means little before we have seen your account."
          />
          <div className="sf-c7"><GaLedger items={FEES} /></div>
        </SmartSection>

        {/* 8. Keep the account: pull-quote band. */}
        <SmartSection id="keep" tone="surface" grid labelledBy="h-keep">
          <div className="sf-c7">
            <div className="ga-quote">
              <p className="ga-q">The account is in your name.</p>
              <p className="ga-s">If you stop working with us, the history, the conversion data and the learning stay with you.</p>
            </div>
          </div>
          <SmartUnit
            className="sf-c5"
            headingId="h-keep"
            title="You keep the account"
            lede="The Google Ads account is in your name, and you keep it if we part ways."
            lead="We work inside your account, and you can see every number."
          />
        </SmartSection>

        {/* 9. Monthly report: text left, sample plate right. */}
        <SmartSection id="report" grid labelledBy="h-report">
          <SmartUnit
            className="sf-c5"
            headingId="h-report"
            title="What your monthly report shows"
            lede="A plain report: spend, leads counted once, what we changed and what is next."
            lead="You get the schedule in writing, and no number you cannot check."
            points={[
              "Spend, and where it went",
              "Leads counted once, not clicks",
              "The next change we will test",
            ]}
          />
          <div className="sf-c7"><ReportPlate fig={5} /></div>
        </SmartSection>

        {/* 10. Proof: honest, no Google Ads results. */}
        <SmartSection
          id="case"
          tone="surface"
          heading={{ title: "What we can show you today", id: "h-case", lede: "We have no Google Ads client results to show, and we claim none. Our measured work is in search." }}
        >
          <div className="sf-grid" style={{ marginTop: 32 }}>
            <div className="sf-c5">
              <CaseCard title="Phantom Arcades" built="Local SEO, measured in Search Console" result="+92% clicks year over year; non-brand clicks +231%" to="/blog/seo-case-study-phantom-arcades" linkLabel="Read the case study" />
            </div>
          </div>
        </SmartSection>

        {/* FAQ. */}
        <ServiceCities svc="google-ads" title="Google Ads management by city" lede="Google Ads pages for the metros with the most search demand, each built from that metro's own Census and search data." />
        <SmartSection id="faq" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Google Ads questions, answered</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        {/* ONE consolidated Sources line + related links. */}
        <SmartSection id="sources" tone="surface" compact labelledBy="h-sources">
          <h2 className="sf-h4" id="h-sources">Sources and related work</h2>
          <p style={{ marginTop: 10 }}>Every Google fact on this page is listed with the date we read it. <Verify id="sources">Sources</Verify></p>
          <ul className="ga-rowlink">
            <li><Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads management in Philadelphia</Link></li>
            <li><Link className="sf-link" to="/services/seo">SEO services</Link></li>
            <li><Link className="sf-link" to="/services/marketing">marketing services</Link></li>
            <li><Link className="sf-link" to="/services/martech">MarTech consulting</Link></li>
            <li><Link className="sf-link" to="/services/website-development">website development</Link></li>
          </ul>
        </SmartSection>

        <DeskCTA
          form={{ topic: "google-ads", topicLabel: "Google Ads audit", heading: "Request a Google Ads audit", prompt: "What is your Google Ads account doing wrong?", submitLabel: "Request a Google Ads audit", need: "google-ads" }}
          heading="Start with a Google Ads audit"
          lede="You get a prioritized list of what to fix, and you do not have to hire us to act on it."
          coversLabel="What the audit covers"
          covers={[
            "Search terms by spend, and the negative list",
            "Conversion tracking: calls, forms, offline imports",
            "Geography and account structure",
            "Landing pages behind the click",
            "Bid strategy and the report",
          ]}
          next={[
            "Call, or send the form on the contact page.",
            "A person at OneAlgorithm reads it and replies.",
            "If it fits, the audit starts from your account, which stays in your name.",
          ]}
          hcLink={false}
        />

        <GaSources sources={GOOGLE_SOURCES} />
      </SfPage>
    </Layout>
  );
}
