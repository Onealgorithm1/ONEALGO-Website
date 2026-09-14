import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import { MapPin, Tag, Home, Star, ListChecks, ShieldCheck } from "lucide-react";
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
  createLocalBusinessSchema,
} from "../../components/StructuredData";

/* SEO — Chester County. Added 2026-09-14.
 *
 * WHY THIS PAGE EXISTS. Semrush (US database, 2026-09-14): "seo chester county"
 * 140/mo at keyword difficulty 7, "seo chester county pa" 40 at 9, "seo west
 * chester pa" 70 at 13 — and the site had no page for any of them. The three
 * 2026-08-30 local pages were built as a TEST because Bing returned no data for
 * local terms (see WebDesignChesterCounty.tsx); this is the first one added with
 * measured demand behind it.
 *
 * ⛔ NOT A PLACE-NAME SWAP OF /services/seo. Google's scaled content abuse policy
 * targets near-identical pages per keyword variant, and /services/seo says so to
 * its own readers. This page is about the part of SEO that is actually local —
 * the Business Profile, reviews, the map results, service areas — and links to
 * /services/seo for the technical half instead of repeating it.
 *
 * ⛔ NO INVENTED LOCAL PROOF, same rule as the web design page: no client names,
 * rankings, traffic figures or testimonials, because none are published with
 * permission. Every claim is either the firm's stated method (already on
 * /services/seo) or Google's own documentation.
 *
 * ⛔ One place mention per idea. The web design page was cut from 24 town
 * mentions to a handful for keyword stuffing; do not add a town list here.
 */

/* Cards reviewed 2026-09-14 by a fresh-context critic. Removed as duplicates of
   /services/seo: "why you are not showing up" (its FAQ), "numbers you can check"
   (its WHY_US) and a no-guarantee paragraph (its MYTHS). What is left is only the
   local half, and each practice is one Google documents for Business Profiles. */
const WHAT_WE_DO = [
  {
    icon: MapPin,
    title: "Your Google Business Profile, set up properly",
    body: "Hours, services, photos and a description that says what you do. For a local business the map results come from the profile, and its reviews and details are often worth more than anything on the website itself.",
  },
  {
    icon: Tag,
    title: "The right primary category",
    body: "Google's guidance is to choose as few categories as possible, describing the core business rather than every service. Google uses it to match you to searches, so it is the first thing we check.",
  },
  {
    icon: Home,
    title: "If customers do not come to you",
    body: "A business that works at the customer's site should hide its address and set a service area instead. That is Google's rule for service-area businesses, and Google can suspend a profile that breaks its guidelines.",
  },
  {
    icon: Star,
    title: "Reviews where they count",
    body: "A simple way to ask every customer for a review on your Business Profile, and a short, specific reply to each one. Google does not show star ratings in search for review markup a business adds to its own site.",
  },
  {
    icon: ListChecks,
    title: "Pages for what you actually sell",
    body: "One page per service people search for, written plainly. A place page only where you really serve that area and have something specific to say about it — never a block of place names in the footer.",
  },
  {
    icon: ShieldCheck,
    title: "Consistent details everywhere",
    body: "The same business name, address and phone number on your site, your Business Profile and the main directories, so nobody finds an old number or a wrong address.",
  },
];

const COVERAGE = [
  "The whole of Chester County, West Chester included — we are inside it rather than driving in",
  "Delaware, Montgomery, Bucks and Philadelphia counties",
  "New Castle County, Delaware",
  "Anywhere in the US remotely, which is how most SEO work runs anyway",
];

export default function SeoChesterCounty() {
  useSEO({
    title: "SEO Chester County PA — Local SEO in Malvern | OneAlgorithm",
    description:
      "Local SEO for Chester County businesses from an office in Malvern: Google Business Profile, reviews, service pages and the technical fixes that come first.",
    canonical: getCanonicalUrl("/services/seo-chester-county"),
    ogTitle: "SEO Chester County PA — Local SEO in Malvern | OneAlgorithm",
    ogDescription:
      "Local SEO for Chester County businesses: your Google Business Profile, reviews and service pages, with reporting from your own Search Console.",
    ogUrl: getCanonicalUrl("/services/seo-chester-county"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "SEO Chester County PA — OneAlgorithm",
    twitterDescription:
      "Local SEO for Chester County businesses from an office in Malvern. No bought links, and every number comes from your own accounts.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "Local SEO in Chester County, Pennsylvania",
          "Local search engine optimization for businesses in Chester County, Pennsylvania, from an office in Malvern: Google Business Profile setup, review requests, service pages, consistent business details and technical fixes, reported from the client's own Search Console.",
          "Search Engine Optimization",
          "https://onealgorithm.com/services/seo-chester-county",
        )}
      />
      <StructuredData data={createLocalBusinessSchema()} />

      <PageHero
        eyebrow="Chester County · Malvern, PA"
        title={
          <>
            SEO in Chester County —{" "}
            <span className="text-oa-orange">found by the people nearby</span>
          </>
        }
        lede="SEO for Chester County businesses, from our office on Swedesford Road in Malvern. For a local business, being found on Google means the map results as well as the ordinary listings, and the map results come from your Business Profile. We work on both: the profile, your reviews, and pages that say plainly what you do."
        panel={{
          title: "What local SEO covers",
          items: [
            "Google Business Profile set up properly",
            "The right primary category and service area",
            "Reviews asked for, and answered",
            "One clear page per service",
            "Reporting from your own accounts",
          ],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Call (610) 890-9711", href: "tel:+16108909711" }}
      />

      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="What we do"
          title="The local half of SEO"
          lede="The technical work — crawl errors, slow pages, duplicate titles — is the same anywhere, and it is covered on our main SEO page. This is the part that depends on being local."
        />
        <CardGrid columns={2} className="mt-12">
          {WHAT_WE_DO.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
        <p className="mt-10 max-w-2xl leading-relaxed text-oa-ink2">
          The technical audit, content strategy and what we will not do (bought
          links, private blog networks) are on{" "}
          <Link
            to="/services/seo"
            className="font-medium text-oa-blue underline underline-offset-4"
          >
            our SEO services page
          </Link>
          . Need the site itself first? See{" "}
          <Link
            to="/services/web-design-chester-county"
            className="font-medium text-oa-blue underline underline-offset-4"
          >
            web design in Chester County
          </Link>
          .
        </p>
      </Section>

      <Section tone="night" grid>
        <Split
          left={
            <>
              <SectionHeading
                tone="dark"
                eyebrow="Where we work"
                title="Across Chester County and next door"
              />
              <div className="mt-8">
                <CheckList items={COVERAGE} tone="dark" />
              </div>
            </>
          }
          right={
            <Card tone="dark">
              <h3 className="text-h3 font-semibold text-oa-nightInk">
                Get an SEO audit
              </h3>
              {/* Same offer and wording as the audit card on /services/seo, plus
                  the Business Profile, which /services/seo lists under Local SEO.
                  No price and no "free": neither page has ever stated one. */}
              <p className="mt-4 leading-relaxed text-oa-nightInk2">
                A crawl of your site, what you rank for now, a look at your
                Business Profile, and a prioritized list of fixes. The first few
                are usually things you can do without us.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Talk to an Expert</PrimaryCTA>
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
          label: "SEO services",
          to: "/services/seo",
        }}
      />
    </Layout>
  );
}
