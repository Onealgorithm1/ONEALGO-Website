import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { PageHero } from "../../components/site";
import {
  SfPage, SmartSection, SmartUnit, Verify, DeskCTA, FAQ, StageRail, Readouts,
} from "../../components/sf";
import type { SfFaqItem, Station } from "../../components/sf";
import { contactHref } from "../../components/sf/DeskCTA";
import {
  GaStyle, GaCards, GaTrio, AreaPlate, CountOncePlate, GaSources, PHILLY_SOURCES,
} from "../../components/v2/google-ads-Plates";
import { OfferBand } from "../../components/v2/shared-OfferBand";
import { ProofStrip } from "../../components/v2/shared-ProofStrip";
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
 * ROUND 3 (2026-10-31): spec A section 4 applied. Hero text edit: "We run Google Ads accounts for businesses around
 * Philadelphia" -> "We set up and manage Google Ads accounts for businesses around Philadelphia" (fact-check: unsourced
 * we-do claim). No reporting cadence is stated (the "weekly" lines were flagged unsourced).
 *
 * 2026-11-01 (SEO round 2): title = exact "google ads management philadelphia" (GSC 209 impr, pos 14.2) + "PPC agency";
 *    H1 tail now says "a PPC agency". This is the ONE page for the Philadelphia phrases; /services/google-ads links here.
 * HERO: same PageHero, panel and lede. Only the H1 changed, to carry the target phrase (owner brief 2026-10-31);
 * the old H1 ran 11 words, so the tail was shortened to keep the H1 at 9.
 *
 * ⛔ NO Google Partner claim, NO client result, ROAS, CPA, testimonial, count or fee. Service area = the Google
 *    Business Profile service areas (read via the GBP API 2026-10-09). Office is in Malvern; no Philadelphia office
 *    is claimed. Google facts and the service area sit in ONE Sources pop-up (components/v2/google-ads-Plates.tsx).
 * Round 2: 5 sections + FAQ + sources line; area schematic, stage rail, count-once plate, hover cards; CTA last. */

const PATH = "/services/google-ads-philadelphia";
const URL_ = "https://onealgorithm.com/services/google-ads-philadelphia";
const TITLE = "Google Ads Management Philadelphia | PPC Agency | OneAlgorithm";
const DESCRIPTION = "PPC agency for Philadelphia, from our Malvern office: the right radius, calls counted once, negatives first. Request a Google Ads audit: (610) 890-9711.";
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
  { q: "What do you check first in a Google Ads account?", a: "Search terms and negatives first, then whether conversions are counted once, then geography and structure, then landing pages. Those four areas explain most wasted spend in a local account. You get the findings ranked by what to fix first, and the account stays in your name." },
  { q: "Why does a local Google Ads account waste money?", a: "The usual causes are a radius that spends across state lines, broad match with no negative list, conversions counted twice, phone calls nobody counts, a neglected landing page and an account the owner cannot see. Each one is cheaper to fix than to out-bid, which is why the audit comes first." },
  { q: "Do you manage Google Ads outside Philadelphia?", a: "Yes. We manage Google Ads in Philadelphia, Bucks, Chester, Delaware and Montgomery counties, and New Castle County, Delaware, and the method carries to businesses elsewhere. Our main Google Ads page explains the method in full; this page covers the Philadelphia specifics such as radius, state lines and call tracking.", link: { to: "/services/google-ads", label: "Google Ads management" } },
  { q: "Do you have an office in Philadelphia?", a: "No. Our office is in Malvern, PA, and we serve Philadelphia businesses from there. We have no Philadelphia client results to show, and we do not claim any. Call (610) 890-9711 to request a Google Ads audit." },
  { q: "Should a Philadelphia business use ads or local SEO?", a: "Ads give visibility now and stop when spend stops; local SEO builds slowly through your Business Profile, reviews and service pages. A business with an urgent gap often starts with ads and builds SEO alongside. We audit both sides and tell you which to start with.", link: { to: "/services/seo-chester-county", label: "SEO company in Chester County" } /* ponytail: add the Philadelphia SEO link when /services/seo-philadelphia is approved */ },
  { q: "How often do you work on the account and report?", a: "We agree the schedule in writing before the work starts, and report in plain numbers: spend, calls and forms counted once, and what we changed. You can see everything, because the account is yours. If something is leaking, we do not wait for the next report to fix it." },
  { q: "Do I have to hire you after the audit?", a: "No. The audit is the offer. You get the findings ranked by what to fix first, and your own team or developer can act on them. If you want us to run the account afterwards, we scope that in writing, and the account stays in your name either way." },
  { q: "How are calls counted in a local account?", a: "Google Ads can count phone calls as conversions: calls from ads, calls to a number on your site and taps on a mobile number. We set each call type up once so a single call is not counted twice, then judge the account against real enquiries rather than raw clicks.", link: { to: "/services/google-ads", label: "Google Ads management services" } },
  { q: "How much does Google Ads management cost in Philadelphia?", a: "Fees depend on the account, not the city: a flat fee, a percentage of ad spend or a hybrid, set in writing after the audit. Ad spend is paid to Google. We print no price list. The three models are explained on our Google Ads management page." },
  { q: "What does a PPC agency do?", a: "A PPC agency runs your pay-per-click advertising: it builds campaigns, chooses keywords and negatives, manages bids, writes ads, checks landing pages and reports results. We do that for Google Ads, with tracking audited first and the account in your name. Ours is a four-person team in Malvern, so you talk to the people doing the work." },
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
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, URL_, { dateModified: "2026-11-01" })} />

      {/* Hero kept (panel and lede unchanged); the H1 now carries the target phrase. */}
      <PageHero
        eyebrow="Google Ads · Philadelphia and the surrounding counties"
        title={
          <>
            Google Ads management in Philadelphia —{" "}
            <span className="text-oa-orange">a PPC agency on the right map</span>
          </>
        }
        lede="We set up and manage Google Ads accounts for businesses around Philadelphia from an office in Malvern. In a local account the biggest leak is usually not the bidding — it is a service area nobody set deliberately, a missing negative list, and phone calls that never get counted as conversions."
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

        {/* 1. Hand-off band: the service-area schematic, with the Malvern office as an H3. */}
        <SmartSection id="area" tone="surface" grid labelledBy="h-area">
          <div className="sf-c7"><AreaPlate fig={1} /></div>
          <SmartUnit
            className="sf-c5"
            headingId="h-area"
            title="A PPC agency for Philadelphia, from Malvern"
            lede="We manage Google Ads in Philadelphia, Bucks, Chester, Delaware and Montgomery counties, and New Castle County, Delaware, from our Malvern office."
            lead="We have no Philadelphia office. The geography is chosen from where you can profitably serve, not left at a default."
            points={[
              "Targeting matched to the area you actually serve",
              "Radius and state-line choices made deliberately",
              "Calls and forms counted once, so the area is judged fairly",
            ]}
          />
          <div className="sf-c12" style={{ marginTop: 8 }}>
            <h3 className="sf-h4">Our Malvern office</h3>
            <p style={{ marginTop: 8 }}>Malvern, PA. <a className="sf-phone" href={SF_PHONE.href} data-cta="office">{SF_PHONE.display}</a></p>
          </div>
        </SmartSection>

        <OfferBand heading="Request a Google Ads audit" line="We read your account and tell you where the spend leaks. Call or send a note." label="Request a Google Ads audit" />

        <SmartSection id="proof" compact labelledBy="h-proof">
          <h2 className="sf-h4" id="h-proof">Who you would work with</h2>
          <div style={{ marginTop: 18 }}><ProofStrip variant="local" /></div>
          <p className="sf-mono" style={{ marginTop: 16 }}>Updated October 31, 2026</p>
        </SmartSection>

        {/* 2. Leaks: hover-lift cards. */}
        <SmartSection
          id="leaks"
          heading={{ title: "Where a Philadelphia account leaks", id: "h-leaks", lede: "These are the failure modes to check for first, and each one is cheaper to fix than to out-bid." }}
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

        <OfferBand heading="Not sure where your spend goes?" line="Tell us the area you serve; we say what we would check first." label="Request a Google Ads audit" />

        {/* 5. Subtract first: night band, three beats. */}
        <SmartSection id="subtract" tone="night" labelledBy="h-subtract">
          <h2 className="sf-h2" id="h-subtract">Spend less in the wrong places first</h2>
          <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">Cutting spend in the wrong places comes before adding a single new keyword.</p>
          <GaTrio
            items={[
              { label: "First", big: "Read", body: "The search terms report, the tracking, the geography and the pages." },
              { label: "Second", big: "Cut", body: "The spend that is not converting, and a negative list built from it." },
              { label: "Then", big: "Build", body: "New keywords, ads and bids, one change at a time, so each result can be read." },
            ]}
          />
          <p style={{ marginTop: 28 }}><Link className="sf-link" to="/services/google-ads">Google Ads management services</Link></p>
        </SmartSection>

        {/* 6. Local market in numbers (Census County Business Patterns 2023, in the Sources pop-up). */}
        <SmartSection
          id="market"
          heading={{ title: "Philadelphia's small businesses in numbers", id: "h-market", lede: "Most Philadelphia employers are small, which is the account size this method is built for." }}
        >
          <div style={{ marginTop: 40 }}>
            <Readouts
              withEvidence={false}
              items={[
                { value: 29460, label: "employer establishments in Philadelphia County", source: <>U.S. Census Bureau, County Business Patterns 2023 · <Verify id="sources">Sources</Verify></> },
                { value: 84, label: "percent of them have fewer than 20 employees (84.0%)", source: <>U.S. Census Bureau, County Business Patterns 2023 · <Verify id="sources">Sources</Verify></> },
              ]}
            />
          </div>
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
          <p style={{ marginTop: 10 }}>The service areas, the Census figures and the Google facts on this page are listed with the date we read them. <Verify id="sources">Sources</Verify></p>
          <ul className="ga-rowlink">
            <li><Link className="sf-link" to="/services/google-ads">Google Ads management</Link></li>
            <li><Link className="sf-link" to="/services/seo-chester-county">SEO company in Chester County</Link></li>
            {/* ponytail: add back when /services/seo-philadelphia ships */}
            <li><Link className="sf-link" to="/services/web-design-philadelphia">web design in Philadelphia</Link></li>
            <li><Link className="sf-link" to="/services/salesforce-consultant-philadelphia">Salesforce consultants in Philadelphia</Link></li>
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
