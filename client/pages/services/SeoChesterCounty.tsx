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
  Reveal,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import {
  StructuredData,
  createServiceSchema,
  createLocalBusinessSchema,
  createFAQSchema,
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

/* Added 2026-10-09 (GSC: pos 12-19 for "seo company chester county pa", "seo malvern",
   "seo chester springs"). ⛔ Each step restates a practice already on this page or on
   /services/seo (URL Inspection check, the audit card, Business Profile, reviews,
   reporting from the client's own accounts). No new promise, price or result. */
const STEPS = [
  {
    title: "Check what Google can see",
    body: "Before proposing anything we look in Search Console: has Google crawled the page, crawled it and chosen not to index it, or indexed it and ranked it too low to see? Those three have different fixes, and two of them make content work pointless until they are sorted.",
  },
  {
    title: "Audit the site and the profile",
    body: "A crawl of your site, what you rank for now, a look at your Business Profile, and a prioritized list of fixes. The first few are usually things you can do without us.",
  },
  {
    title: "Fix the Business Profile",
    body: "The primary category, your hours, services, photos and description, and a service area instead of an address if you work at the customer's site.",
  },
  {
    title: "Write one page per service",
    body: "A plain page for each thing people search for, and a place page only where you really serve that area and have something specific to say about it.",
  },
  {
    title: "Make your details match everywhere",
    body: "The same name, address and phone number on the site, the profile and the main directories.",
  },
  {
    title: "Set up reviews, then report",
    body: "A simple way to ask every customer for a review and reply to each one, and reporting from your own Search Console, so you can check the numbers without taking our word for them.",
  },
];

const COVERAGE = [
  "The whole of Chester County, West Chester included — we are inside it rather than driving in",
  "Delaware, Montgomery, Bucks and Philadelphia counties",
  "New Castle County, Delaware",
  "Anywhere in the US remotely, which is how most SEO work runs anyway",
];

/* FAQ added 2026-10-03; the Malvern question added 2026-10-06 from the "seo malvern" Search Console recommendation. ⛔ Every answer is built from sentences already on this page, so nothing new is claimed.
   Google stopped showing FAQ rich results on 7 May 2026 (see /services/seo), so this section earns its place for
   visitors and long-tail questions, not for a search feature. No question here is repeated on another page. */
const FAQS: { q: string; a: string; to?: string; label?: string }[] = [
  { q: "What does local SEO cover?", a: "Your Google Business Profile set up properly, the right primary category and service area, reviews asked for and answered, one clear page per service, and reporting from your own accounts." },
  { q: "Why does my Google Business Profile matter so much?", a: "For a local business the map results come from the profile, and its reviews and details are often worth more than anything on the website itself." },
  { q: "Should I show my address if customers do not come to me?", a: "No. A business that works at the customer's site should hide its address and set a service area instead. That is Google's rule for service-area businesses, and Google can suspend a profile that breaks its guidelines." },
  { q: "Is there an SEO company in Malvern, PA?", a: "Yes. Our office is on Swedesford Road in Malvern, and we do local SEO for Chester County businesses: the Google Business Profile, reviews, one clear page per service, and reporting from your own accounts." },
  { q: "Do you do SEO for businesses in Chester Springs?", a: "Yes. Chester Springs is a short drive from our Malvern office. For a business that works at the customer's property, the first fix is usually the Business Profile: a service area instead of a street address, and the right primary category." },
  { q: "How long does local SEO take, and what does it cost?", a: "Google says some changes register within hours and others take months, and suggests waiting a few weeks before judging any of it. Technical fixes usually move fastest. We do not publish a price, because it depends on what the audit finds; ask and we will tell you what we would do first." },
  { q: "Do you work outside Chester County?", a: "Yes: next door in the neighbouring counties, and anywhere in the US remotely, which is how most SEO work runs anyway. We are inside Chester County rather than driving in." },
];

export default function SeoChesterCounty() {
  useSEO({
    title: "SEO Company in Chester County, PA | Malvern | OneAlgorithm",
    description:
      "SEO services for Chester County, PA businesses, from a Malvern office. Google Business Profile, reviews and technical fixes. See what we fix first.",
    canonical: getCanonicalUrl("/services/seo-chester-county"),
    ogTitle: "SEO Company in Chester County, PA | Malvern | OneAlgorithm",
    ogDescription:
      "SEO services for Chester County, PA businesses, from a Malvern office. Google Business Profile, reviews and technical fixes. See what we fix first.",
    ogUrl: getCanonicalUrl("/services/seo-chester-county"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "SEO Company in Chester County, PA | Malvern | OneAlgorithm",
    twitterDescription:
      "SEO services for Chester County, PA businesses, from a Malvern office. Google Business Profile, reviews and technical fixes. See what we fix first.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData data={createFAQSchema(FAQS)} />
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

      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Step by step"
          title="What working with an SEO company in Chester County, PA looks like"
          lede="The order matters: there is no point writing new pages for a site Google cannot index, or chasing reviews on a profile in the wrong category."
        />
        <ol className="mt-12 space-y-8">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"
            >
              <h3 className="text-lg font-semibold text-oa-ink">
                <span className="mr-3 text-oa-orange">{i + 1}.</span>
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-oa-ink2 md:mt-0">{s.body}</p>
            </li>
          ))}
        </ol>
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

      <Section tone="paper" bordered>
        <SectionHeading eyebrow="Questions" title="What Chester County businesses ask about local SEO" />
        <div className="mt-12 space-y-10">
          {FAQS.map((f) => (
            <Reveal key={f.q}>
              <div className="border-t border-oa-hairlineStrong pt-7 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <div className="mt-3 md:mt-0">
                  <p className="leading-relaxed text-oa-ink2">{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
