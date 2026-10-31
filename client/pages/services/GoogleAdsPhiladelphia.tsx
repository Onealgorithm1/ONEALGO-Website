import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, LedgerRule, GoDeeper, Verify, EvidenceDialog, DeskCTA, FAQ,
} from "../../components/sf";
import type { SfFaqItem } from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import { GoogleHelpDialog } from "../../components/v2/google-ads-GoogleHelp";
import { SF_PHONE } from "../../data/salesforceShared";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createWebPageSchema,
} from "../../components/StructuredData";

/* /services/google-ads-philadelphia, rebuilt 2026-10-31 on the sf kit (sitewide v2). Spec: onealgo-icm-oa/areas/sales/
 * runs/2026-10-31_sitewide-seo/google-ads/google-ads.md + data-report.md section 3.2.
 *
 * TARGET: "google ads management philadelphia" (GSC 253 impressions, position 17.7), with "ppc management" and
 * "ppc agency philadelphia" in the meta and body. The main page /services/google-ads never uses the city in its
 * title, H1 or headings, so the two do not compete.
 *
 * HERO: same PageHero, panel and lede. Only the H1 changed, to carry the target phrase (owner brief 2026-10-31);
 * the old H1 ran 11 words, so the tail was shortened to keep the H1 at 9.
 *
 * ⛔ NO Google Partner claim, NO client result, ROAS, CPA, testimonial, count or fee. Service area = the Google
 *    Business Profile service areas (read via the GBP API 2026-10-09). Office is in Malvern; no Philadelphia office
 *    is claimed. Google facts sit behind pop-ups (components/v2/google-ads-GoogleHelp.tsx, accessed 2026-10-31). */

const PATH = "/services/google-ads-philadelphia";
const URL_ = "https://onealgorithm.com/services/google-ads-philadelphia";
const TITLE = "Google Ads Management in Philadelphia, PA | One Algorithm";
const DESCRIPTION = "Google Ads management in Philadelphia from our Malvern office: the right radius, call tracking that counts once, negatives first, weekly reporting. PPC management, no guarantees.";
const CONTACT = contactHref("Google Ads audit, Philadelphia", PATH, "google-ads");

const LOCAL_FAILURES = [
  { title: "A radius that spends in three states", body: "A 25-mile ring around Center City pays for clicks in New Jersey and Delaware. Sometimes that is right. Usually nobody chose it." },
  { title: "Broad match with no negative list", body: "The most common reason a small account leaks money. We start from the search terms report and cut what is not converting." },
  { title: "Conversions counted more than once", body: "A thank-you page that fires on reload, or a call tracker and a form both claiming one lead. Tracking gets verified first." },
  { title: "Calls that nobody counts", body: "For most local businesses the conversion is a phone call. If calls go uncounted, the account optimizes toward the wrong thing." },
  { title: "A landing page nobody has touched", body: "A lot of what limits an account happens after the click. We test the page as part of the account, one variable at a time." },
  { title: "An account you do not own", body: "You keep ownership of the Google Ads account. If you leave, the history, conversion data and learning go with you." },
];

const STEPS = [
  { title: "Account audit", body: "Where the budget goes by search term, whether the geography matches where you can serve, and what the landing page does." },
  { title: "Conversion tracking", body: "Set up and verified first: each lead counted once, phone calls included, offline imports that match your CRM." },
  { title: "Search terms and negatives", body: "We cut the spend that is not converting and build the negative keyword list before adding anything new." },
  { title: "Geography and structure", body: "Targeting matched to your real service area, and campaigns grouped so the budget splits where you mean it to." },
  { title: "Landing pages", body: "Ad copy and landing page tests run one variable at a time and left running long enough to mean something." },
  { title: "Bidding", body: "Smart Bidding where there is enough conversion data, manual control where there is not. We tell you which first." },
  { title: "Reporting cadence", body: "A weekly pass on the account, and a report that leads with cost per acquisition and spend." },
];

const FAQS: SfFaqItem[] = [
  { q: "What do you check first in a Google Ads account?", a: "Geographic targeting against your real service area, the search terms report and the negative keyword list, call and form conversion tracking, and the landing pages. We subtract before adding: cut the spend that is not converting, verify tracking, then look at bids, budgets and new keywords." },
  { q: "Why does a local Google Ads account waste money?", a: "In a local account the biggest leak is usually not the bidding. It is a service area nobody set deliberately, a missing negative keyword list, and phone calls that never get counted as conversions." },
  { q: "Do you manage Google Ads outside Philadelphia?", a: "Yes. From our Malvern office we manage Google Ads for businesses across the Philadelphia area: Philadelphia, Bucks, Chester, Delaware and Montgomery counties, and New Castle County, Delaware." },
  { q: "Do you have an office in Philadelphia?", a: "Our office is in Malvern, PA, a short drive from Center City. The work is done from there, and the Google Ads account lives in your name wherever your business is." },
  { q: "Should a Philadelphia business use ads or local SEO?", a: "Ads show while you pay for them and give quick, trackable data. Local SEO takes longer and keeps working without a per-click cost. Many Philadelphia businesses need both, and the first audit shows where ads are earning their keep.", link: { to: "/services/seo-philadelphia", label: "SEO for Philadelphia businesses" } },
  { q: "How often do you work on the account and report?", a: "There is a weekly pass on the account, and the report leads with cost per acquisition and spend. Impressions are in there somewhere, near the bottom." },
  { q: "Do I have to hire you after the audit?", a: "No. You get a prioritized list of what to fix, including where the budget goes by search term, whether the geography matches where you serve, and whether conversions count once. You can act on it yourself or with us." },
  { q: "How are calls counted in a local account?", a: "Google can count calls from ads, calls to the number on your site and taps on a mobile number as conversions. We set that up and check it first, so the account optimizes toward real leads.", link: { to: "/services/google-ads", label: "How we run Google Ads accounts" } },
];

export default function GoogleAdsPhiladelphia() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PATH),
    keywords: "Google Ads management Philadelphia, PPC management Philadelphia, PPC agency Philadelphia, Google Ads agency Philadelphia, Google Ads audit",
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
          "Google Ads Management in Philadelphia, Pennsylvania",
          "Google Ads and paid search management for businesses in Philadelphia and the surrounding counties: geographic targeting matched to the service area, negative keyword management, call and form conversion tracking, landing page testing, and client ownership of the advertising account.",
          "Marketing",
          URL_,
          { providerId: "https://onealgorithm.com/#localbusiness" },
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-10-31" })} />

      {/* Hero kept (panel and lede unchanged); the H1 now carries the target phrase. */}
      <PageHero
        eyebrow="Google Ads · Philadelphia and the surrounding counties"
        title={
          <>
            Google Ads management in Philadelphia,{" "}
            <span className="text-oa-orange">on the right map</span>
          </>
        }
        lede="We run Google Ads accounts for businesses around Philadelphia from an office in Malvern. In a local account the biggest leak is usually not the bidding — it is a service area nobody set deliberately, a missing negative list, and phone calls that never get counted as conversions."
        panel={{
          title: "What we look at first",
          items: [
            "Geographic targeting against your real service area",
            "Search terms report and the negative keyword list",
            "Call and form conversion tracking",
            "Landing pages, tested one variable at a time",
            "Account ownership, kept with you",
          ],
        }}
        primary={{ label: "Request a Google Ads audit", to: CONTACT }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <SfPage crumbs={[{ label: "Google Ads", to: "/services/google-ads" }, { label: "Philadelphia" }]}>
        {/* Where a local account leaks. */}
        <SmartSection
          id="leaks"
          tone="surface"
          grid
          heading={{
            title: "Where a Philadelphia account leaks",
            id: "h-leaks",
            lede: "These are the failure modes we find most often, and each one is cheaper to fix than to out-bid.",
          }}
        >
          {LOCAL_FAILURES.map((c, i) => (
            <LedgerRule key={c.title} as="article" className="sf-c4" delay={(i % 3) * 0.06}>
              <h3 className="sf-h3">{c.title}</h3>
              <p style={{ marginTop: 10 }}>{c.body}</p>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* Service area. */}
        <SmartSection id="area" grid labelledBy="h-area">
          <SmartUnit
            className="sf-c7"
            headingId="h-area"
            title="Serving Philadelphia from Malvern"
            lede="We manage Google Ads for businesses in Philadelphia, Bucks, Chester, Delaware and Montgomery counties, and New Castle County, Delaware."
            lead="The geography is chosen on purpose from where you can profitably serve, not left at a default."
            points={[
              "Targeting matched to the area you actually serve",
              "Radius and state-line choices made deliberately",
              "Calls and forms counted once, so the area is judged fairly",
            ]}
          >
            <GoDeeper label="how we set the geography">
              <p>A ring around Center City is easy to set and easy to forget. It crosses into New Jersey and Delaware, and into suburbs you may not serve. We start from where your customers are and where you can show up, then check the search terms report to see where the clicks land.</p>
              <p>If you serve several counties, we look at whether they belong in one campaign or several, so the budget follows the places that produce leads.</p>
              <div className="sf-links"><Verify id="service-area">Where the service area comes from</Verify></div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Our service area</h3>
            <ul className="sf-covers" style={{ marginTop: 12 }}>
              <li>Philadelphia County, PA</li>
              <li>Bucks, Chester, Delaware and Montgomery counties, PA</li>
              <li>New Castle County, DE</li>
            </ul>
            <p className="sf-mono" style={{ marginTop: 12 }}>OneAlgorithm · 625 Swedesford Rd, Unit B, Malvern, PA 19355</p>
          </LedgerRule>
        </SmartSection>

        {/* What management includes. */}
        <SmartSection
          id="includes"
          tone="surface"
          grid
          heading={{
            title: "What management in Philadelphia includes",
            id: "h-includes",
            lede: "How we work on an account in Philadelphia or the surrounding counties, with tracking first if it is not set up.",
          }}
        >
          {STEPS.map((st, i) => (
            <LedgerRule key={st.title} as="article" className="sf-c3" delay={(i % 4) * 0.06}>
              <p className="sf-mono">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="sf-h3" style={{ marginTop: 6 }}>{st.title}</h3>
              <p style={{ marginTop: 10 }}>{st.body}</p>
            </LedgerRule>
          ))}
        </SmartSection>

        {/* Calls. */}
        <SmartSection id="calls" grid labelledBy="h-calls">
          <SmartUnit
            className="sf-c7"
            headingId="h-calls"
            title="Count phone calls as conversions"
            lede="For many local businesses the lead is a phone call, and Google can count calls from ads, from your site number and from mobile taps."
            lead="Uncounted calls push the account to optimize toward the wrong thing while the numbers look fine."
            points={[
              "Calls from ads, from your site number and from mobile taps",
              "Form leads and calls kept from claiming the same lead twice",
              "Offline imports that match your CRM",
            ]}
          >
            <div className="sf-links"><Verify id="conversion-tracking">What Google can count as a conversion</Verify></div>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Subtract before adding</h3>
            <ol style={{ marginTop: 12, display: "grid", gap: 8 }}>
              {[
                "Read the search terms report and cut the spend that is not converting.",
                "Verify conversion tracking counts each lead once, including phone calls.",
                "Check the geography matches where you can profitably serve.",
                "Then look at bids, budgets and new keywords.",
              ].map((t, i) => (
                <li key={t} style={{ display: "flex", gap: 12 }}>
                  <span className="sf-mono" style={{ color: "var(--orange)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </LedgerRule>
        </SmartSection>

        {/* Subtract. */}
        <SmartSection id="subtract" tone="night" grid labelledBy="h-subtract">
          <SmartUnit
            className="sf-c7"
            headingId="h-subtract"
            title="Spend less in the wrong places first"
            lede="Most accounts we inherit improve by spending less in the wrong places before a single new keyword goes in."
            leadIn="The bottom line:"
            lead="It is the least impressive-sounding first month, and usually the one that changes the numbers most."
          >
            <GoDeeper label="what the first month looks like">
              <p>Week one is reading, not building: the search terms report, the tracking, the geography and the pages. Week two is cutting. New keywords, new ads and bid changes come after that, one change at a time, so each result can be read.</p>
              <div className="sf-links">
                <Link className="sf-link" to="/services/google-ads">How we run Google Ads accounts</Link>
              </div>
            </GoDeeper>
          </SmartUnit>
          <LedgerRule as="aside" className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">Get an account audit</h3>
            <p style={{ marginTop: 10 }}>You get a prioritized list, and you do not have to hire us to act on it.</p>
            <p style={{ marginTop: 14 }}>Call <a className="sf-phone" href={SF_PHONE.href} data-cta="audit">{SF_PHONE.display}</a> or use the request below.</p>
          </LedgerRule>
        </SmartSection>

        {/* Related Philadelphia pages. */}
        <SmartSection id="related" compact grid labelledBy="h-related">
          <SmartUnit
            className="sf-c12"
            headingId="h-related"
            title="More for Philadelphia businesses"
            lede="Ads work best next to a site and a search presence that convert the visit."
          >
            <ul className="sf-links" style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: "12px 28px" }}>
              <li><Link className="sf-link" to="/services/seo-philadelphia">SEO for Philadelphia businesses</Link></li>
              <li><Link className="sf-link" to="/services/web-design-philadelphia">Web design in Philadelphia</Link></li>
              <li><Link className="sf-link" to="/services/salesforce-consultant-philadelphia">Salesforce consultant in Philadelphia</Link></li>
              <li><Link className="sf-link" to="/services/google-ads">Google Ads management, all areas</Link></li>
            </ul>
          </SmartUnit>
        </SmartSection>

        {/* FAQ. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Philadelphia Google Ads questions</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        <DeskCTA
          form={{ topic: "google-ads-philadelphia", topicLabel: "Google Ads audit, Philadelphia", heading: "Request a Google Ads audit", prompt: "What is your Philadelphia-area account doing wrong?", submitLabel: "Request a Google Ads audit", need: "google-ads" }}
          heading="Start with a Google Ads audit"
          lede="You get a prioritized list of what to fix, and you do not have to hire us to act on it."
          coversLabel="What the audit covers"
          covers={[
            "Search terms by spend, and the negative list",
            "Geography against your real service area",
            "Call and form conversion tracking",
            "Landing pages behind the click",
          ]}
          next={[
            "Call, or send the form on the contact page.",
            "A person at OneAlgorithm reads it and replies.",
            "If it fits, the audit starts from your account, which stays in your name.",
          ]}
          hcLink={false}
        />

        <GoogleHelpDialog id="conversion-tracking" />
        <EvidenceDialog
          id="service-area"
          title="Where our service area comes from"
          intro="The areas listed on this page are the service areas on OneAlgorithm's Google Business Profile."
          rows={[
            { th: "Areas", td: "Philadelphia, Bucks, Chester, Delaware and Montgomery counties, PA; New Castle County, DE" },
            { th: "Source", td: "OneAlgorithm's Google Business Profile, read through Google's Business Profile API" },
            { th: "Read", td: "9 October 2026" },
          ]}
        />
      </SfPage>
    </Layout>
  );
}
