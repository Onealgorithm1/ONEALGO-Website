import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  DollarSign,
  Target,
  Zap,
  BarChart3,
  RefreshCw,
  Users,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CheckList,
  Split,
  PrimaryCTA,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
} from "../../components/StructuredData";

/* Google Ads management - 2026 refresh.
 *
 * Converted onto the shared primitives in components/site.tsx.
 *
 *  1. The closing "Paid Media Success Stories" section is DELETED. It promised
 *     campaign examples and then offered them "on request", which tells a buyer
 *     there are none to show. No replacement was invented - the share row it
 *     wrapped survives as a utility band. See REDESIGN-NOTES.md.
 *  2. The bouncing alert glyph above the H1, the orange hover borders and the
 *     card shadows are gone.
 *  3. Structure differs from /services/seo and /services/martech, which were
 *     clones of the same template: six capabilities run two-up on the surface
 *     ground so each gets room for its longer body, and the argument plus the
 *     audit offer close the page together on the dark ground.
 *
 * COPY REWRITE 2026-08-12. Body copy is no longer carried over unchanged. The
 * old version was interchangeable with any PPC agency's ("Performance-first
 * approach focused on reducing CPA and increasing ROAS"), and this is a page
 * read by people who have already been pitched that sentence several times.
 *
 * What replaces it names the actual failure modes - broad match with no
 * negative list, conversion tracking that double-counts, an untouched landing
 * page - because naming the problem is the only credential available here.
 * There is still no Google Partner status anywhere in this repository, and none
 * is claimed. The account-ownership line matches the commitment already made on
 * /services/website-development ("no accounts you are locked out of").
 */

const CAPABILITIES = [
  {
    icon: DollarSign,
    title: "Campaign Setup & Strategy",
    body: "Account and campaign structure: how many campaigns, which keywords sit together, where the budget splits. Get this wrong and no amount of bid tuning afterwards will rescue it.",
  },
  {
    icon: Target,
    title: "Audience Targeting & Remarketing",
    body: "Remarketing lists, customer match and audience segments — so you stop paying the same click price for somebody who has already bought from you.",
  },
  {
    icon: Zap,
    title: "Bid Management & Optimization",
    body: "Smart Bidding where there is enough conversion data to feed it, manual control where there isn't. We'll tell you which case your account is in before switching anything.",
  },
  {
    icon: BarChart3,
    title: "Creative & Landing Page Testing",
    body: "Ad copy and landing page tests run one variable at a time and left running long enough to mean something. A lot of what limits an account happens after the click, not in the auction.",
  },
  {
    icon: RefreshCw,
    title: "Measurement & Attribution",
    body: "Conversion tracking that fires once, offline imports that match your CRM, and an attribution model you have actually chosen rather than inherited from whoever set it up.",
  },
  {
    icon: Users,
    title: "Reporting & Optimization",
    body: "A weekly pass on the account, and a report that leads with cost per acquisition and spend. Impressions are in there somewhere, near the bottom.",
  },
];

const WHY_US = [
  "We start by cutting the spend that isn't converting, before adding anything.",
  "Tracking is set up and verified first — a confident report on bad data is worse than no report.",
  "One variable at a time, so a test result actually means something.",
  "You keep ownership of the Google Ads account. If you leave, the history goes with you.",
];

export default function GoogleAds() {
  useSEO({
    title: "Google Ads Management for Small Business | OneAlgorithm",
    description:
      "Google Ads management: account structure, keywords and negatives, bid strategy, landing page testing, and conversion tracking that counts once.",
    canonical: getCanonicalUrl("/services/google-ads"),
    keywords:
      "Google Ads management, PPC agency, paid search, search advertising, Google Ads optimization, paid media, remarketing, conversion tracking",
    ogTitle: "Google Ads Management for Small Business | OneAlgorithm",
    ogDescription:
      "Google Ads management: campaign structure, negatives, audience targeting, bid strategy, landing page testing, and conversion tracking that counts each conversion once.",
    ogUrl: getCanonicalUrl("/services/google-ads"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — Google Ads Management",
    twitterDescription:
      "Account structure, negatives, bid strategy, landing page testing and conversion tracking that counts each conversion once. You keep the account.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Google Ads Management",
          "Google Ads management and paid search: account and campaign structure, keyword and negative keyword management, remarketing and customer match audiences, bid strategy, ad and landing page testing, and conversion tracking and attribution.",
          "Marketing",
          "https://onealgorithm.com/services/google-ads",
        )}
      />

      <PageHero
        eyebrow="Google Ads"
        title={
          <>
            Google Ads management —{" "}
            <span className="text-oa-orange">paid search you can audit</span>
          </>
        }
        lede="We run Google Ads accounts: the structure, the keywords, the negative list, the bids and the tracking underneath. The same few problems account for most wasted spend — broad match with no negatives, conversion tracking that double-counts, and a landing page nobody has touched in a year."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written. There is no Google Partner claim anywhere on this site, so
        // the footer carries only the company-wide SBA line.
        panel={{
          title: "What we deliver",
          items: [
            "Campaign Setup & Strategy",
            "Audience Targeting & Remarketing",
            "Bid Management & Optimization",
            "Creative & Landing Page Testing",
            "Measurement & Attribution",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Request Google Ads Audit", to: "/contact" }}
        secondary={{ label: "Back to Marketing", to: "/services/marketing" }}
      />

      {/* Two-up rather than three-up: these bodies are the longest of the three
          marketing pages, and a 3-column grid ragged them badly. */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What we do"
          title="Google Ads capabilities"
          lede="Account structure, targeting, bidding, testing, and the tracking that tells you whether any of it worked. In that order — the last one first, if it isn't set up."
        />
        <CardGrid columns={2} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="night" grid>
        <Split
          left={
            <>
              <SectionHeading
                tone="dark"
                eyebrow="Why OneAlgorithm"
                title="Why OneAlgorithm for Google Ads?"
              />
              <div className="mt-8">
                <CheckList items={WHY_US} tone="dark" />
              </div>
              <p className="mt-6 max-w-xl leading-relaxed text-oa-nightInk2">
                Advertising around Philadelphia?{" "}
                <Link
                  className="text-oa-orange underline underline-offset-4"
                  to="/services/google-ads-philadelphia"
                >
                  Google Ads management in Philadelphia
                </Link>{" "}
                covers the geography, call-tracking and service-area problems
                specific to a local account.
              </p>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Get a Google Ads Audit
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                We look at account structure, wasted spend by search term,
                whether conversions are being counted once, and what your
                landing pages do with the click. You get a prioritized list, and
                you don&rsquo;t have to hire us to act on it.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Request Audit</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand secondary={{ label: "View all services", to: "/services" }} />
    </Layout>
  );
}
