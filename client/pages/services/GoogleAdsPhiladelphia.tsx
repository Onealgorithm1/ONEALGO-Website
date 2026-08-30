import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { MapPinned, Filter, Receipt, PhoneCall, LineChart, KeyRound } from "lucide-react";
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

/* Google Ads — Philadelphia. Added 2026-08-30. Third of three local pages.
 *
 * ⛔ NO GOOGLE PARTNER CLAIM. There is no Google Partner status anywhere in this
 * repository and none is asserted here — same rule as /services/google-ads.
 * ⛔ NO SPEND, CPA, ROAS OR CLIENT-COUNT FIGURES. We have no published local
 * campaign results, so none appear. The argument is the failure modes we can
 * name, which is the only credential available without inventing numbers.
 *
 * The angle that makes this page different from /services/google-ads rather than
 * a keyword-swapped clone: geography is the biggest source of wasted spend in a
 * local account, and it is specific to this market — a 25-mile radius from
 * Center City spends money in three states.
 *
 * See WebDesignChesterCounty.tsx for why these three pages exist.
 */

const LOCAL_FAILURES = [
  {
    icon: MapPinned,
    title: "A radius that spends in three states",
    body: "Set a 25-mile ring around Center City and you are paying for clicks in New Jersey and Delaware. Sometimes that is right. Usually nobody chose it — it was the default, and it has been running ever since.",
  },
  {
    icon: Filter,
    title: "Broad match with no negative list",
    body: "The single most common reason a small account leaks money. We start from the search terms report and cut what is not converting before adding anything new.",
  },
  {
    icon: Receipt,
    title: "Conversions counted more than once",
    body: "A thank-you page that fires on reload, a call tracker and a form both claiming the same lead. A confident report on bad data is worse than no report, so tracking gets verified first.",
  },
  {
    icon: PhoneCall,
    title: "Calls that nobody counts",
    body: "For most local businesses the conversion is a phone call, not a form. If calls are not tracked, the account is optimising toward the wrong thing and the numbers will look fine while the phone stays quiet.",
  },
  {
    icon: LineChart,
    title: "A landing page nobody has touched",
    body: "A lot of what limits an account happens after the click. We test the page as part of the account, one variable at a time, left running long enough to mean something.",
  },
  {
    icon: KeyRound,
    title: "An account you do not own",
    body: "You keep ownership of the Google Ads account. If you stop working with us, the history, the conversion data and the learning go with you.",
  },
];

const HOW_WE_START = [
  "Read the search terms report and cut the spend that is not converting.",
  "Verify conversion tracking counts each lead once, including phone calls.",
  "Check the geography actually matches where you can profitably serve.",
  "Then, and only then, look at bids, budgets and new keywords.",
];

export default function GoogleAdsPhiladelphia() {
  useSEO({
    title: "Google Ads Management Philadelphia — OneAlgorithm",
    description:
      "Google Ads management for Philadelphia-area businesses: geography that matches your service area, tracking that counts calls once, and an account you own.",
    canonical: getCanonicalUrl("/services/google-ads-philadelphia"),
    ogTitle: "Google Ads Management Philadelphia — OneAlgorithm",
    ogDescription:
      "Google Ads for Philadelphia-area businesses: the right radius, a real negative list, call tracking that counts once, and an account that stays yours.",
    ogUrl: getCanonicalUrl("/services/google-ads-philadelphia"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Google Ads Management Philadelphia — OneAlgorithm",
    twitterDescription:
      "Google Ads for Philadelphia-area businesses. The right radius, a real negative list, and an account that stays yours.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Google Ads Management in Philadelphia, Pennsylvania",
          "Google Ads and paid search management for businesses in Philadelphia and the surrounding counties: geographic targeting matched to the service area, negative keyword management, call and form conversion tracking, landing page testing, and client ownership of the advertising account.",
          "Marketing",
          "https://onealgorithm.com/services/google-ads-philadelphia",
        )}
      />

      <PageHero
        eyebrow="Google Ads · Philadelphia and the surrounding counties"
        title={
          <>
            Google Ads in Philadelphia —{" "}
            <span className="text-oa-orange">stop paying for the wrong map</span>
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
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Request a Google Ads audit", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What goes wrong locally"
          title="Where a local account usually leaks"
          lede="These are the failure modes we find most often. None of them is exotic, and all of them are cheaper to fix than to out-bid."
        />
        <CardGrid columns={2} className="mt-12">
          {LOCAL_FAILURES.map((c) => (
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
                eyebrow="How we start"
                title="Subtract before adding"
              />
              <div className="mt-8">
                <CheckList items={HOW_WE_START} tone="dark" />
              </div>
              <p className="mt-8 max-w-xl leading-relaxed text-oa-nightInk2">
                Most accounts we inherit can be improved by spending less in the
                wrong places before a single new keyword goes in. It is the
                least impressive-sounding first month and usually the one that
                changes the numbers most.
              </p>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Get an account audit
              </h3>
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                We look at where the budget is going by search term, whether the
                geography matches where you can actually serve, whether
                conversions are counted once, and what the landing page does
                with the click. You get a prioritised list, and you do not have
                to hire us to act on it.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Request audit</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="paper" compact bordered>
        <SocialShare />
      </Section>

      <CTABand
        secondary={{
          label: "Google Ads management",
          to: "/services/google-ads",
        }}
      />
    </Layout>
  );
}
