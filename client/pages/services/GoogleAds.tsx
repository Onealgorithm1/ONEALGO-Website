import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SfButton, SmartSection, SmartUnit, LedgerRule, GoDeeper, Verify, DeskCTA, FAQ,
} from "../../components/sf";
import type { SfFaqItem } from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { GoogleHelpDialog } from "../../components/v2/google-ads-GoogleHelp";
import { SF_PHONE } from "../../data/salesforceShared";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { StructuredData, createServiceSchema, createWebPageSchema } from "../../components/StructuredData";

/* /services/google-ads, rebuilt 2026-10-31 on the sf kit (sitewide v2). Spec: onealgo-icm-oa/areas/sales/runs/
 * 2026-10-31_sitewide-seo/google-ads/google-ads.md + data-report.md section 3.2.
 *
 * ⛔ THE HERO IS KEPT: same PageHero, same text. Only its primary button now carries ?need=google-ads.
 * ⛔ NO Google Partner / Premier claim, NO client result, ROAS, CPA, testimonial, count, award or fee. We have no
 *    client Google Ads results (answers.md Q11), so the page sells method, tracking, account ownership and
 *    transparency. Every Google fact sits behind a pop-up (components/v2/google-ads-GoogleHelp.tsx, accessed 2026-10-31).
 * ⛔ CANNIBALISATION: "google ads management philadelphia" belongs to /services/google-ads-philadelphia. This page
 *    never uses Philadelphia in its title, H1 or headings; it only links there.
 */

const PATH = "/services/google-ads";
const URL_ = "https://onealgorithm.com/services/google-ads";
const TITLE = "Google Ads Management You Can Audit | One Algorithm";
const DESCRIPTION = "Conversion tracking counted once, negatives first, the account in your name. Audit offer. No guarantees.";
const CONTACT = contactHref("Google Ads audit", PATH, "google-ads");

const PARTS = [
  { title: "Campaign setup and strategy", body: "How many campaigns, which keywords sit together, where the budget splits. Get this wrong and bid tuning will not rescue it." },
  { title: "Audience targeting and remarketing", body: "Remarketing lists, customer match and audience segments, so you stop paying a full click price for someone who already bought." },
  { title: "Bid management", body: "Smart Bidding where there is enough conversion data, manual control where there is not. We tell you which before switching anything." },
  { title: "Creative and landing page testing", body: "Ad copy and landing page tests run one variable at a time, long enough to mean something. Much of the limit sits after the click." },
  { title: "Measurement and attribution", body: "Conversion tracking that fires once, offline imports that match your CRM, and an attribution model you chose rather than inherited." },
  { title: "Reporting", body: "A weekly pass on the account and a report that leads with cost per acquisition and spend. Impressions sit near the bottom." },
];

const STEPS = [
  { title: "Audit the account", body: "Where the budget goes by search term, what the geography covers, and what the landing page does with the click." },
  { title: "Fix the tracking", body: "Each lead counted once, phone calls included, and offline imports that match your CRM. Nothing else is trusted until this is." },
  { title: "Subtract", body: "Read the search terms, cut the spend that is not converting and build the negative list before adding a single keyword." },
  { title: "Build and test", body: "New structure, bids and ads, one variable at a time, with a weekly pass on the account and a report you can check." },
];

const FAQS: SfFaqItem[] = [
  { q: "How much does Google Ads management cost?", a: "It depends on the fee model and the scope. Agencies charge a flat fee, a percentage of ad spend or a hybrid, and your ad budget is paid to Google separately. Ask every agency which model it uses and what it includes, and ask us the same." },
  { q: "How much should I spend on Google Ads each month?", a: "Set the budget from what a customer is worth to you and how many conversions the account needs to learn from, not from a round number. Smart Bidding needs conversion data, so a very small budget limits it. An audit shows where current spend goes before you add any." },
  { q: "Is Google Ads worth it for a small business?", a: "It can be, when someone searching is ready to buy and the page behind the click converts. It is not worth running with broken tracking, because you cannot tell what works. We do not publish client results here; we show the method and the tracking, and the audit lets you judge the work before you commit." },
  { q: "How long until I see results?", a: "Clicks and calls can start as soon as campaigns run, but a reliable read needs enough conversions to compare. Smart Bidding needs data to learn from, and tests run one variable at a time take time. We report weekly so you see movement as it happens." },
  { q: "Can an agency guarantee ROI?", a: "No. Google's auction, your competitors, your offer and your landing page all affect the result, and no agency controls them. Be wary of anyone who promises a return. What we commit to is method: verified tracking, honest reporting and an account you own." },
  { q: "Should I run Search campaigns or Performance Max?", a: "It depends on your conversion data and creative. Performance Max is one goal-based campaign across YouTube, Display, Search, Discover, Gmail and Maps, and it needs conversion goals, creative assets and audience signals. Search keeps you in direct control of keywords and negatives. We say which fits your account before changing anything." },
  { q: "Is Google Ads better than SEO?", a: "They do different jobs. Ads show while you pay for them and give fast, trackable data; SEO builds a position that keeps working without a per-click cost, over months. Many businesses need both.", link: { to: "/services/seo", label: "How our SEO work runs" } },
  { q: "What is Quality Score, and does it matter?", a: "It is a 1 to 10 diagnostic at keyword level, built from expected click-through rate, ad relevance and landing page experience. Google says it is not an input in the ad auction, so we use it to find weak ads and pages, not as a target." },
  { q: "Do I own my Google Ads account?", a: "Yes. The account is in your name. If you stop working with us, the history, the conversion data and the learning stay with you." },
  { q: "What does a Google Ads audit include?", a: "Search terms by spend and the negative list, conversion tracking for calls, forms and offline imports, geography and structure, and the landing pages. You get a prioritized list, and you do not have to hire us to act on it." },
  { q: "Can you work alongside our in-house team?", a: "Yes. We can audit the account and advise your team, or run it. Either way the account stays in your name, so the choice is reversible." },
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
        {/* What we do: the six parts. */}
        <SmartSection
          id="what"
          tone="surface"
          grid
          heading={{
            title: "What we do",
            id: "h-what",
            lede: "Six parts of a Google Ads account, in the order we work on them, with tracking first if it is not set up.",
          }}
        >
          {PARTS.map((c, i) => (
            <LedgerRule key={c.title} as="article" className="sf-c4" delay={(i % 3) * 0.06}>
              <h3 className="sf-h3">{c.title}</h3>
              <p style={{ marginTop: 10 }}>{c.body}</p>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* The audit. */}
        <SmartSection id="audit" grid labelledBy="h-audit">
          <SmartUnit
            className="sf-c7"
            headingId="h-audit"
            title="What a Google Ads audit covers"
            lede="An audit reads the account the way Google counts it: search terms, conversions, geography and the page behind the click."
            lead="Most wasted spend hides in four places, and an audit shows which one is yours before anything is changed."
            points={[
              "Search terms and negatives: where the budget goes and what to cut",
              "Conversion tracking counted once: calls, forms and offline imports",
              "Geography, account structure and landing pages",
            ]}
          >
            <GoDeeper label="the four audit areas">
              <h3 className="sf-h4">Search terms and negatives</h3>
              <p>We read what people actually typed before clicking, sort it by spend and outcome, and write the negative list from it. Broad match with no negatives is the most common leak in a small account.</p>
              <h3 className="sf-h4">Conversion tracking counted once</h3>
              <p>A thank-you page that fires on reload, or a call tracker and a form both claiming one lead, inflates every report. We check each conversion fires once and that calls, forms and offline imports are all counted.</p>
              <h3 className="sf-h4">Geography and structure</h3>
              <p>Targeting should match where you can serve, and campaigns should group keywords so the budget splits where you mean it to.</p>
              <h3 className="sf-h4">Landing pages</h3>
              <p>A lot of what limits an account happens after the click. We look at what the page does with the visit.</p>
              <div className="sf-links"><Verify id="conversion-tracking">What Google can count as a conversion</Verify></div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Get the audit</h3>
            <p style={{ marginTop: 10 }}>You get a prioritized list of what to fix, and you do not have to hire us to act on it.</p>
            <p style={{ marginTop: 18 }}><SfButton to={CONTACT} cta="audit">Request a Google Ads audit</SfButton></p>
            <p style={{ marginTop: 18 }}>Prefer to talk it through? <a className="sf-phone" href={SF_PHONE.href} data-cta="audit">{SF_PHONE.display}</a></p>
          </LedgerRule>
        </SmartSection>

        {/* How the work runs. */}
        <SmartSection
          id="process"
          tone="surface"
          grid
          heading={{
            title: "How the work runs",
            id: "h-process",
            lede: "Audit, tracking, subtract, then build: four stages, each finished before the next one starts.",
          }}
        >
          {STEPS.map((st, i) => (
            <LedgerRule key={st.title} as="article" className="sf-c3" delay={i * 0.06}>
              <p className="sf-mono">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="sf-h3" style={{ marginTop: 6 }}>{st.title}</h3>
              <p style={{ marginTop: 10 }}>{st.body}</p>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* Search or Performance Max. */}
        <SmartSection id="pmax" grid labelledBy="h-pmax">
          <SmartUnit
            className="sf-c7"
            headingId="h-pmax"
            title="Search campaigns or Performance Max?"
            lede="Search campaigns answer what people type; Performance Max runs one goal-based campaign across Google's channels."
            lead="The right choice follows your conversion data and creative, not which format is newer."
            points={[
              "Search puts you in direct control of keywords and negatives",
              "Performance Max needs conversion goals, creative assets and audience signals",
              "We say which fits your account before switching anything",
            ]}
          >
            <GoDeeper label="when each one fits">
              <p>Search is the usual starting point when you know the phrases buyers use and want to see exactly what you paid for. Performance Max becomes useful when the account already records real conversions and you have text, images or video for it to assemble.</p>
              <p>Google describes Performance Max as one campaign reaching YouTube, Display, Search, Discover, Gmail and Maps. More reach means less visibility per channel, so tracking has to be right before it runs.</p>
              <div className="sf-links"><Verify id="pmax">What Google says Performance Max is</Verify></div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">What Performance Max asks for</h3>
            <ul className="sf-covers" style={{ marginTop: 12 }}>
              <li>Conversion goals</li>
              <li>Creative assets: text, images, video</li>
              <li>Audience signals</li>
              <li>A daily budget</li>
              <li>Brand-safety settings</li>
            </ul>
            <p className="sf-mono" style={{ marginTop: 12 }}>Source: Google Ads Help · read 31 October 2026</p>
          </LedgerRule>
        </SmartSection>

        {/* Ad Rank. */}
        <SmartSection id="rank" tone="night" grid labelledBy="h-rank">
          <SmartUnit
            className="sf-c7"
            headingId="h-rank"
            title="What Google uses to rank ads"
            lede="Ad Rank decides whether and where an ad shows, and Google publishes the six factors behind it."
            leadIn="Yes, but:"
            lead="Quality Score is a diagnostic, and Google says it is not an input in the ad auction."
            points={[
              "Your bid, ad and landing page quality, and Ad Rank thresholds",
              "Auction competitiveness, search context, and the expected impact of ad assets",
              "Google: relevant keywords and ads can win a higher position at a lower price",
            ]}
          >
            <GoDeeper label="Quality Score and the auction">
              <p>Quality Score runs from 1 to 10 at keyword level and rolls up expected click-through rate, ad relevance and landing page experience. We read it to find the weak ad or page, then fix that, rather than chasing the number.</p>
              <p>Because relevance can win a better position at a lower price, the cheapest improvement is often a tighter keyword list and a better match between the ad and the page.</p>
              <div className="sf-links">
                <Verify id="ad-rank">Ad Rank</Verify>
                <Verify id="quality-score">Quality Score</Verify>
                <Verify id="auction">The auction</Verify>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">The six Ad Rank factors</h3>
            <ol style={{ marginTop: 12, display: "grid", gap: 8 }}>
              {["Your bid", "Quality of your ads and landing page", "Ad Rank thresholds", "Competitiveness of the auction", "Context of the search", "Expected impact of assets and formats"].map((f, i) => (
                <li key={f} style={{ display: "flex", gap: 12 }}>
                  <span className="sf-mono" style={{ color: "var(--orange)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ol>
            <p className="sf-mono" style={{ marginTop: 14 }}>Source: Google Ads Help · read 31 October 2026</p>
          </LedgerRule>
        </SmartSection>

        {/* Cost. */}
        <SmartSection id="cost" tone="surface" grid labelledBy="h-cost">
          <SmartUnit
            className="sf-c7"
            headingId="h-cost"
            title="What Google Ads management costs"
            lede="Agencies charge a flat fee, a percentage of ad spend or a hybrid, and your ad budget is paid to Google separately."
            lead="The model decides who gains when spend rises, so ask which one you are signing before anything else."
            points={[
              "Flat fee: predictable, and not tied to how much you spend",
              "Percent of spend: scales with budget, so ask who benefits from raising it",
              "Hybrid: a base fee plus a share, with the split in writing",
            ]}
          >
            <GoDeeper label="questions to ask any agency">
              <p>We print no price here, and we would not trust a page that prints one without knowing your account. Whatever the model, get these answers in writing from any agency you consider, including us.</p>
              <ul className="sf-rule">
                <li>Which fee model, and exactly what it includes.</li>
                <li>How long the minimum term runs and how you leave.</li>
                <li>Who owns the Google Ads account.</li>
                <li>What the report leads with, and whether tracking is verified first.</li>
              </ul>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* Partner. */}
        <SmartSection id="partner" grid labelledBy="h-partner">
          <SmartUnit
            className="sf-c7"
            headingId="h-partner"
            title="Do you need a Google Partner agency?"
            lede="Google awards the Partner badge to agencies that meet its thresholds for spend, optimization score and certification."
            leadIn="The bottom line:"
            lead="OneAlgorithm does not hold Partner status and does not claim it, so check any agency against Google's own records."
            points={[
              "Partner: optimization score and 90-day ad spend thresholds across managed accounts",
              "Partner: certified strategists among the people who run the accounts",
              "Premier Partner: top 3% of participating companies in a country, set annually",
            ]}
          >
            <div className="sf-links"><Verify id="partner">What Google requires of a Partner</Verify></div>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">What a Partner badge does not tell you</h3>
            <p style={{ marginTop: 10 }}>It shows the agency crossed Google's thresholds, not how your account will be run. Ask for method, tracking and ownership.</p>
          </LedgerRule>
        </SmartSection>

        {/* You keep the account + related. */}
        <SmartSection id="own" tone="surface" grid labelledBy="h-own">
          <SmartUnit
            className="sf-c7"
            headingId="h-own"
            title="You keep the account"
            lede="The Google Ads account is in your name, so the history, the conversion data and the learning stay with you."
            lead="If you stop working with us, nothing about the account changes hands."
            points={[
              "We cut spend that is not converting before adding anything",
              "Tracking is set up and verified before any report is trusted",
              "One variable at a time, so a test result means something",
            ]}
          />
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Related work</h3>
            <ul className="sf-links" style={{ marginTop: 12, display: "grid", gap: 10 }}>
              <li><Link className="sf-link" to="/services/google-ads-philadelphia">Google Ads management in Philadelphia</Link></li>
              <li><Link className="sf-link" to="/services/seo">SEO services</Link></li>
              <li><Link className="sf-link" to="/services/website-development">Website development</Link></li>
              <li><Link className="sf-link" to="/services/martech">Marketing technology</Link></li>
            </ul>
          </LedgerRule>
        </SmartSection>

        {/* FAQ. */}
        <SmartSection id="faq" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Google Ads questions, answered</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
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

        <GoogleHelpDialog id="conversion-tracking" />
        <GoogleHelpDialog id="pmax" />
        <GoogleHelpDialog id="ad-rank" />
        <GoogleHelpDialog id="quality-score" />
        <GoogleHelpDialog id="auction" />
        <GoogleHelpDialog id="partner" />
      </SfPage>
    </Layout>
  );
}
