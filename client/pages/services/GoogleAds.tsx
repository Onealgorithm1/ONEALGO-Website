import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, Verify, DeskCTA, FAQ, StageRail, StageUnits,
} from "../../components/sf";
import type { SfFaqItem, Stage } from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import {
  GaStyle, GaCards, GaTable, GaLedger, AuditPlate, CountOncePlate, AdRankPlate, GaSources, GOOGLE_SOURCES,
} from "../../components/v2/google-ads-Plates";
import { SF_PHONE } from "../../data/salesforceShared";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/google-ads, rebuilt 2026-10-31 on the sf kit (sitewide v2), revision round 2. Spec: onealgo-icm-oa/areas/
 * sales/runs/2026-10-31_sitewide-seo/google-ads/google-ads.md + data-report.md section 3.2.
 *
 * ⛔ THE HERO IS KEPT: same PageHero, same text. Only its primary button carries ?need=google-ads.
 * ⛔ NO Google Partner / Premier claim, NO client result, ROAS, CPA, testimonial, count, award or fee. We have no
 *    client Google Ads results (answers.md Q11), so the page sells method, tracking, account ownership and
 *    transparency. Every Google fact is listed in ONE Sources pop-up (components/v2/google-ads-Plates.tsx, read 2026-10-31).
 * ⛔ CANNIBALISATION: "google ads management philadelphia" belongs to /services/google-ads-philadelphia. This page
 *    never uses Philadelphia in its title, H1 or headings; it only links there.
 * Round 2: 7 sections + FAQ + sources line, 4 plates (sample report, rail, count-once, Ad Rank), a hover-lift card grid
 * and a comparison table; CTA last. */

const PATH = "/services/google-ads";
const URL_ = "https://onealgorithm.com/services/google-ads";
const TITLE = "Google Ads Management You Can Audit | One Algorithm";
const DESCRIPTION = "Conversion tracking counted once, negatives first, the account in your name. Audit offer. No guarantees.";
const CONTACT = contactHref("Google Ads audit", PATH, "google-ads");

const PARTS = [
  { title: "Campaign setup and strategy", body: "How many campaigns, which keywords sit together, where the budget splits. Get this wrong and bid tuning will not rescue it." },
  { title: "Audience targeting and remarketing", body: "Remarketing lists and customer match, so you stop paying a full click price for someone who already bought." },
  { title: "Bid management", body: "Smart Bidding where there is enough conversion data, manual control where there is not. We say which before switching." },
  { title: "Creative and landing page testing", body: "Ad and page tests run one variable at a time, long enough to mean something. Much of the limit sits after the click." },
  { title: "Measurement and attribution", body: "Conversion tracking that fires once, offline imports that match your CRM, and an attribution model you chose." },
  { title: "Reporting", body: "A weekly pass on the account and a report that leads with cost per acquisition and spend. Impressions sit near the bottom." },
];

const STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Audit the account", sub: "search terms · geography · pages", line: "Where the budget goes, what the geography covers, what the page does with the click.", details: ["Search terms sorted by spend and outcome", "The landing page behind each ad group"] },
  { k: "s2", num: "02", title: "Fix the tracking", sub: "forms · calls · offline imports", line: "Each lead counted once. Nothing else is trusted until this is.", details: ["Phone calls included", "Offline imports that match your CRM"] },
  { k: "s3", num: "03", title: "Subtract", sub: "negatives before keywords", line: "Cut the spend that is not converting before adding a single keyword.", details: ["The negative list, written from real searches", "Geography trimmed to where you can serve"] },
  { k: "s4", num: "04", title: "Build and test", sub: "one variable at a time", line: "New structure, bids and ads, with a weekly pass and a report you can check.", details: ["Tests run long enough to mean something", "A report that leads with cost per acquisition"] },
];

const FEES = [
  { title: "Flat fee", body: "Predictable, and not tied to how much you spend." },
  { title: "Percent of spend", body: "Scales with budget, so ask who benefits from raising it." },
  { title: "Hybrid", body: "A base fee plus a share, with the split in writing." },
];

const FAQS: SfFaqItem[] = [
  { q: "How much does Google Ads management cost?", a: "It depends on the fee model and the scope. Agencies charge a flat fee, a percentage of ad spend or a hybrid, and your ad budget is paid to Google separately. Ask every agency, us included, which model, what it covers, how long the minimum term runs and who owns the account." },
  { q: "How much should I spend on Google Ads each month?", a: "Set it from what a customer is worth to you and how many conversions the account needs to learn from, not from a round number. Smart Bidding needs conversion data, so a very small budget limits it." },
  { q: "Can an agency guarantee ROI?", a: "No. Google's auction, your competitors, your offer and your landing page all affect the result, and no agency controls them. What we commit to is method: verified tracking, honest reporting and an account you own." },
  { q: "How long until I see results?", a: "Clicks and calls can start as soon as campaigns run, but a reliable read needs enough conversions to compare. We report weekly so you see movement as it happens." },
  { q: "Is Google Ads better than SEO?", a: "They do different jobs. Ads show while you pay for them and give fast, trackable data; SEO builds a position that keeps working without a per-click cost. Many businesses need both.", link: { to: "/services/seo", label: "How our SEO work runs" } },
  { q: "What is Quality Score, and does it matter?", a: "It is a 1 to 10 diagnostic at keyword level, built from expected click-through rate, ad relevance and landing page experience. Google says it is not an input in the ad auction, so we use it to find weak ads and pages, not as a target." },
  { q: "Do you need a Google Partner agency?", a: "The badge shows an agency crossed Google's thresholds for optimization score, ad spend and certification, not how your account will be run. OneAlgorithm does not hold Partner status and does not claim it. Ask any agency for method, tracking and ownership." },
  { q: "Do I own my Google Ads account?", a: "Yes. The account is in your name, so if you stop working with us the history, the conversion data and the learning stay with you." },
  { q: "What does a Google Ads audit include?", a: "Search terms by spend and the negative list, conversion tracking for calls, forms and offline imports, geography and structure, and the landing pages. You get a prioritized list, and you do not have to hire us to act on it." },
  { q: "Do you run Google Ads for businesses near Philadelphia?", a: "Yes, from our Malvern, PA office. Local accounts have their own problems: the radius, service area and call tracking.", link: { to: "/services/google-ads-philadelphia", label: "Google Ads management in Philadelphia" } },
];

export default function GoogleAds() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "Google Ads management, Google Ads audit, PPC management, paid search, Google Ads consultant, conversion tracking",
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
          "Marketing",
          URL_,
          { providerId: "https://onealgorithm.com/#org", areaServed: { "@type": "Country", name: "United States" } },
        )}
      />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      {/* The hero is kept as it was (same component, text and panel). */}
      <PageHero
        eyebrow="Google Ads"
        title={
          <>
            Google Ads management —{" "}
            <span className="text-oa-orange">paid search you can audit</span>
          </>
        }
        lede="We run Google Ads accounts: the structure, the keywords, the negative list, the bids and the tracking underneath. The same few problems account for most wasted spend — broad match with no negatives, conversion tracking that double-counts, and a landing page nobody has touched in a year."
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

        {/* 1. Hand-off band: the audit as a sample report plate. */}
        <SmartSection id="audit" tone="surface" grid labelledBy="h-audit">
          <SmartUnit
            className="sf-c5"
            headingId="h-audit"
            title="What a Google Ads audit covers"
            lede="An audit reads the account the way Google counts it: search terms, conversions, geography and the page behind the click."
            lead="An audit checks the four places wasted spend tends to hide, and shows which one is yours."
            points={[
              "Search terms and negatives: where the budget goes and what to cut",
              "Conversion tracking counted once: calls, forms and offline imports",
              "Geography, account structure and landing pages",
            ]}
          >
            <GoDeeper label="the four audit areas">
              <ul className="sf-rule">
                <li>Search terms: broad match with no negatives is the most common leak in a small account.</li>
                <li>Tracking: a thank-you page that fires on reload inflates every report.</li>
                <li>Geography: targeting should match where you can serve.</li>
                <li>Landing pages: a lot of what limits an account happens after the click.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
          <div className="sf-c7"><AuditPlate fig={1} /></div>
        </SmartSection>

        {/* 2. Six parts: hover-lift cards. */}
        <SmartSection
          id="what"
          heading={{ title: "What we do", id: "h-what", lede: "Six parts of a Google Ads account, in the order we work on them, with tracking first if it is not set up." }}
        >
          <div style={{ marginTop: 40 }}><GaCards items={PARTS} /></div>
        </SmartSection>

        {/* 3. Stage rail. */}
        <SmartSection
          id="process"
          tone="surface"
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
        <SmartSection id="tracking" grid labelledBy="h-tracking">
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
          />
        </SmartSection>

        {/* 5. Comparison table. */}
        <SmartSection
          id="pmax"
          tone="surface"
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

        {/* 7. Cost and ownership: pull-quote band plus fee-model ledger. */}
        <SmartSection id="cost" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c12"
            headingId="h-cost"
            title="What Google Ads management costs"
            lede="Agencies charge a flat fee, a percentage of ad spend or a hybrid, and your ad budget is paid to Google separately."
            lead="We print no price here, because a number means little before we have seen your account."
          />
          <div className="sf-c5">
            <div className="ga-quote">
              <p className="ga-q">The account is in your name.</p>
              <p className="ga-s">If you stop working with us, the history, the conversion data and the learning stay with you.</p>
            </div>
          </div>
          <div className="sf-c7"><GaLedger items={FEES} /></div>
        </SmartSection>

        {/* FAQ. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Google Ads questions, answered</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        {/* ONE consolidated Sources line + related links. */}
        <SmartSection id="sources" compact labelledBy="h-sources">
          <h2 className="sf-h4" id="h-sources">Sources and related work</h2>
          <p style={{ marginTop: 10 }}>Every Google fact on this page is listed with the date we read it. <Verify id="sources">Sources</Verify></p>
          <ul className="ga-rowlink">
            <li><Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads management in Philadelphia</Link></li>
            <li><Link className="sf-link" to="/services/seo">SEO services</Link></li>
            <li><Link className="sf-link" to="/services/website-development">Website development</Link></li>
            <li><Link className="sf-link" to="/services/martech">Marketing technology</Link></li>
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
            "Bid strategy and the weekly report",
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
