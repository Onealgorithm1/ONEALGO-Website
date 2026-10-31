import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, GoDeeper, Verify, DeskCTA, FAQ, StageRail,
} from "../../components/sf";
import type { SfFaqItem, Station } from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import {
  GaStyle, GaCards, GaTrio, AreaPlate, CountOncePlate, GaSources, PHILLY_SOURCES,
} from "../../components/v2/google-ads-Plates";
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
 *    is claimed. Google facts and the service area sit in ONE Sources pop-up (components/v2/google-ads-Plates.tsx).
 * Round 2: 5 sections + FAQ + sources line; area schematic, stage rail, count-once plate, hover cards; CTA last. */

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

const STATIONS: Station[] = [
  { k: "s1", num: "01", title: "Account audit", sub: "search terms · geography · page" },
  { k: "s2", num: "02", title: "Conversion tracking", sub: "calls and forms, counted once" },
  { k: "s3", num: "03", title: "Search terms and negatives", short: "Terms and negatives", sub: "cut before adding" },
  { k: "s4", num: "04", title: "Geography and structure", short: "Geography, structure", sub: "your real service area" },
  { k: "s5", num: "05", title: "Tests, bids and reporting", short: "Tests, bids, reports", sub: "weekly pass, one variable" },
];

const FAQS: SfFaqItem[] = [
  { q: "What do you check first in a Google Ads account?", a: "Geographic targeting against your real service area, the search terms report and negative keyword list, call and form conversion tracking, and the landing pages. We subtract before adding: cut the spend that is not converting, verify tracking, then look at bids, budgets and new keywords." },
  { q: "Why does a local Google Ads account waste money?", a: "In a local account the biggest leak is usually not the bidding. It is a service area nobody set deliberately, a missing negative keyword list, and phone calls that never get counted as conversions." },
  { q: "Do you manage Google Ads outside Philadelphia?", a: "Yes. From our Malvern office we manage Google Ads across the Philadelphia area: Philadelphia, Bucks, Chester, Delaware and Montgomery counties, and New Castle County, Delaware." },
  { q: "Do you have an office in Philadelphia?", a: "Our office is in Malvern, PA, a short drive from Center City. The work is done from there, and the Google Ads account lives in your name wherever your business is." },
  { q: "Should a Philadelphia business use ads or local SEO?", a: "Ads show while you pay for them and give quick, trackable data. Local SEO takes longer and keeps working without a per-click cost. Many Philadelphia businesses need both, and the first audit shows where ads are earning their keep." /* ponytail: add back when /services/seo-philadelphia ships: link to it */ },
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
        <GaStyle />

        {/* 1. Hand-off band: the service-area schematic. */}
        <SmartSection id="area" tone="surface" grid labelledBy="h-area">
          <div className="sf-c7"><AreaPlate fig={1} /></div>
          <SmartUnit
            className="sf-c5"
            headingId="h-area"
            title="Serving Philadelphia from Malvern"
            lede="We manage Google Ads in Philadelphia, Bucks, Chester, Delaware and Montgomery counties, and New Castle County, Delaware."
            lead="The geography is chosen on purpose from where you can profitably serve, not left at a default."
            points={[
              "Targeting matched to the area you actually serve",
              "Radius and state-line choices made deliberately",
              "Calls and forms counted once, so the area is judged fairly",
            ]}
          >
            <GoDeeper label="how we set the geography">
              <p>A ring around Center City is easy to set and easy to forget. We start from where your customers are and where you can show up, then check the search terms report to see where the clicks land.</p>
            </GoDeeper>
          </SmartUnit>
        </SmartSection>

        {/* 2. Leaks: hover-lift cards. */}
        <SmartSection
          id="leaks"
          heading={{ title: "Where a Philadelphia account leaks", id: "h-leaks", lede: "These are the failure modes we find most often, and each one is cheaper to fix than to out-bid." }}
        >
          <div style={{ marginTop: 40 }}><GaCards items={LOCAL_FAILURES} /></div>
        </SmartSection>

        {/* 3. Stage rail. */}
        <SmartSection
          id="includes"
          tone="surface"
          heading={{ title: "What management in Philadelphia includes", id: "h-includes", lede: "How our PPC management works on a Philadelphia-area account, with tracking first if it is not set up." }}
        >
          <div style={{ marginTop: 40 }}>
            <StageRail
              fig={2}
              stations={STATIONS}
              title="Five stages of Google Ads management for a Philadelphia-area account"
              desc="A rail runs through five stations: account audit, conversion tracking, search terms and negatives, geography and structure, tests, bids and reporting."
              stamp="What management includes"
              caption="Five stages in the order they run. Smart Bidding where there is enough conversion data, manual control where there is not."
            />
          </div>
        </SmartSection>

        {/* 4. Calls: text left, plate right. */}
        <SmartSection id="calls" grid labelledBy="h-calls">
          <SmartUnit
            className="sf-c5"
            headingId="h-calls"
            title="Count phone calls as conversions"
            lede="For many local businesses the lead is a phone call, and Google can count calls from ads, from your site number and from mobile taps."
            lead="Uncounted calls push the account to optimize toward the wrong thing while the numbers look fine."
            points={[
              "Calls from ads, from your site number and from mobile taps",
              "Form leads and calls kept from claiming the same lead twice",
              "Offline imports that match your CRM",
            ]}
          />
          <div className="sf-c7">
            <CountOncePlate
              fig={3}
              inputs={["Call from the ad", "Form submitted", "Call to the site number"]}
              caption="One lead can arrive through three doors. It should be one conversion, whichever door it used."
            />
          </div>
        </SmartSection>

        {/* 5. Subtract first: night band, three beats. */}
        <SmartSection id="subtract" tone="night" labelledBy="h-subtract">
          <h2 className="sf-h2" id="h-subtract">Spend less in the wrong places first</h2>
          <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">Cutting spend in the wrong places comes before adding a single new keyword.</p>
          <GaTrio
            items={[
              { label: "Week one", big: "Read", body: "The search terms report, the tracking, the geography and the pages." },
              { label: "Week two", big: "Cut", body: "The spend that is not converting, and a negative list built from it." },
              { label: "Then", big: "Build", body: "New keywords, ads and bids, one change at a time, so each result can be read." },
            ]}
          />
          <p style={{ marginTop: 28 }}><Link className="sf-link" to="/services/google-ads">How we run Google Ads accounts</Link></p>
        </SmartSection>

        {/* FAQ. */}
        <SmartSection id="faq" tone="surface" grid labelledBy="h-faq">
          <div className="sf-c4">
            <h2 className="sf-h2" id="h-faq">Philadelphia Google Ads questions</h2>
            <p style={{ marginTop: 12 }}>Not answered here? Call the office: <a className="sf-phone" href={SF_PHONE.href} data-cta="faq">{SF_PHONE.display}</a></p>
          </div>
          <div className="sf-c7 sf-faq-col"><FAQ items={FAQS} /></div>
        </SmartSection>

        {/* ONE consolidated Sources line + related links. */}
        <SmartSection id="sources" compact labelledBy="h-sources">
          <h2 className="sf-h4" id="h-sources">Sources and related work</h2>
          <p style={{ marginTop: 10 }}>The service areas and the Google facts on this page are listed with the date we read them. <Verify id="sources">Sources</Verify></p>
          <ul className="ga-rowlink">
            {/* ponytail: add back when /services/seo-philadelphia ships */}
            <li><Link className="sf-link" to="/services/web-design-philadelphia">Web design in Philadelphia</Link></li>
            <li><Link className="sf-link" to="/services/salesforce-consultant-philadelphia">Salesforce consultant in Philadelphia</Link></li>
            <li><Link className="sf-link" to="/services/google-ads">Google Ads management, all areas</Link></li>
          </ul>
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

        <GaSources sources={PHILLY_SOURCES} />
      </SfPage>
    </Layout>
  );
}
