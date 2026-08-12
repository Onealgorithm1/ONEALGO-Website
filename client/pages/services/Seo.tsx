import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import SocialShare from "../../components/SocialShare";
import {
  Globe,
  TrendingUp,
  Link as LinkIcon,
  CheckCircle,
  BarChart3,
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

/* SEO services - 2026 refresh.
 *
 * Converted onto the shared primitives in components/site.tsx. Three things
 * went beyond the visual system:
 *
 *  1. The closing "Recent SEO Wins" section is DELETED. It was a heading whose
 *     only content was "case studies ... available on request", which reads to
 *     a buyer as "we have none". Nothing was invented to replace it - the share
 *     row it wrapped is kept as a plain utility band. See REDESIGN-NOTES.md.
 *  2. The bouncing exclamation-mark glyph in the hero is gone. It was a generic
 *     alert icon animating above the H1 of an SEO page.
 *  3. Section order runs capabilities -> case for us + the audit offer, so the
 *     page does not repeat the shape of the MarTech and Google Ads pages.
 *
 * COPY REWRITE 2026-08-12. Body copy is no longer carried over unchanged.
 *
 * THE CLAIM THAT WENT: "Proven track record increasing organic sessions and
 * conversions." First item in the WHY_US list, no traffic figure, client or
 * case study anywhere in this repository to support it, and it sat on the one
 * page where a reader is specifically judging whether we can be trusted with
 * search. It is replaced by the one piece of SEO evidence the firm does own -
 * the Lighthouse SEO score measured on /services/website-development, which a
 * reader can reproduce in DevTools in under a minute.
 *
 * The link-building card now states what we do NOT do (bought links, PBNs).
 * That is both true and the most useful thing an SEO buyer can be told, because
 * it is the practice most likely to cost them the domain later.
 */

const CAPABILITIES = [
  {
    icon: Globe,
    title: "Technical SEO Audits",
    body: "Crawl and index coverage, redirect chains, canonical tags, sitemaps, Core Web Vitals. The unglamorous half of SEO, and usually where the fastest wins are sitting.",
  },
  {
    icon: BarChart3,
    title: "Keyword & Content Strategy",
    body: "What people actually search for near what you sell, what already ranks for it, and whether you can realistically beat those pages. Sometimes the answer is no, and we say so.",
  },
  {
    icon: LinkIcon,
    title: "Link Building & Outreach",
    body: "Outreach for links a person would plausibly click. We don't buy links or use private blog networks — it breaks Google's guidelines and it is the kind of thing that catches up with a site years later.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & CRO",
    body: "Search Console and GA4 set up so you can see which queries bring people in, then page changes tested against whether those people do anything once they arrive.",
  },
  {
    icon: CheckCircle,
    title: "Local & Enterprise SEO",
    body: "Google Business Profile, citations and location pages for local search. Templates, internal linking and crawl budget for large sites, where the problem is scale rather than quality.",
  },
];

/* The first item here used to read "Proven track record increasing organic
   sessions and conversions." There is no traffic figure, client or case study
   in this repository, so it was a claim with nothing behind it and it is gone.
   What replaced it is the one piece of SEO evidence this firm does own: the
   measured Lighthouse scores published on the website development page. */
const WHY_US = [
  "Technical fixes first, so the content you pay for can actually rank.",
  "We tell you when a keyword isn't winnable rather than billing you to chase it.",
  "No bought links, no private blog networks, nothing that risks a manual action.",
  "Reporting comes out of your own Search Console and GA4 — you keep the accounts and can check every number we send.",
];

export default function Seo() {
  useSEO({
    title: "OneAlgorithm — SEO Services",
    description:
      "SEO services that start with the technical audit: crawl and index coverage, Core Web Vitals, duplicate URLs and titles — then keyword and content strategy, outreach, and reporting from your own Search Console.",
    canonical: getCanonicalUrl("/services/seo"),
    keywords:
      "SEO services, technical SEO, content SEO, link building, organic traffic, search engine optimization, local SEO",
    ogTitle: "OneAlgorithm — SEO Services",
    ogDescription:
      "Technical SEO first — crawl coverage, Core Web Vitals, duplicate URLs and titles — then keyword and content strategy, outreach, and reporting from your own Search Console.",
    ogUrl: getCanonicalUrl("/services/seo"),
    ogImage:
      "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "OneAlgorithm — SEO Services",
    twitterDescription:
      "Technical SEO first — crawl coverage, Core Web Vitals, duplicate URLs and titles — then keyword and content strategy, outreach, and reporting from your own Search Console.",
    twitterImage:
      "https://onealgorithm.com/og-image.jpg",
  });

  return (
    <Layout>
      <StructuredData
        data={createServiceSchema(
          "SEO Services",
          "SEO covering technical audits (crawl and index coverage, redirects, canonicals, sitemaps, Core Web Vitals), keyword and content strategy, outreach and link acquisition, Search Console and GA4 analytics, and local and large-site SEO.",
          "Marketing",
          "https://onealgorithm.com/services/seo",
        )}
      />

      <PageHero
        eyebrow="SEO Services"
        title={
          <>
            SEO services{" "}
            <span className="text-oa-orange">that start with what&rsquo;s broken</span>
          </>
        }
        lede="We fix the technical reasons a site doesn't rank — crawl errors, duplicate URLs, slow pages, missing or repeated titles — and then work on the content meant to bring people in. In that order, because content on a site search engines struggle to crawl is wasted work."
        // Panel items are the CAPABILITIES card titles from further down this
        // page, verbatim. No hero bullets existed here and nothing new was
        // written. No platform credential exists for SEO, so the footer carries
        // only the company-wide SBA line.
        panel={{
          title: "What we deliver",
          items: [
            "Technical SEO Audits",
            "Keyword & Content Strategy",
            "Link Building & Outreach",
            "Analytics & CRO",
            "Local & Enterprise SEO",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View Services", to: "/services" }}
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="What we do"
          title="SEO capabilities"
          lede="Technical fixes, then content, then links. The order matters more than any single item on this list."
        />
        <CardGrid columns={3} className="mt-12">
          {CAPABILITIES.map((c) => (
            <Card key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      {/* The case for us and the audit offer sit side by side, so the argument
          and the low-commitment next step are read together. */}
      <Section tone="paper" bordered>
        <Split
          left={
            <>
              <SectionHeading
                eyebrow="Why OneAlgorithm"
                title="Why OneAlgorithm for SEO?"
              />
              <div className="mt-8">
                <CheckList items={WHY_US} />
              </div>
              {/* The only SEO evidence this firm owns that a reader can verify
                  in thirty seconds. It is a measured number on a page in this
                  repository, not a claim about a client we cannot name. */}
              <p className="mt-8 max-w-[60ch] leading-relaxed text-oa-ink2">
                One thing you can check right now:{" "}
                <Link
                  to="/services/website-development"
                  className="font-medium text-oa-blue underline underline-offset-4"
                >
                  our website development page
                </Link>{" "}
                measures 100 on Lighthouse&rsquo;s SEO audit, and publishes the
                score that is worse alongside it. Run it yourself.
              </p>
            </>
          }
          right={
            <Card>
              <h3 className="text-h3 font-semibold text-oa-ink">
                Get an SEO Audit
              </h3>
              <p className="mt-4 text-oa-ink2 leading-relaxed">
                A crawl of your site, a Core Web Vitals check, what you rank for
                now, and a prioritized list of fixes. The first few are usually
                things your own developer can do without us.
              </p>
              <div className="mt-7">
                <PrimaryCTA to="/contact">Talk to an Expert</PrimaryCTA>
              </div>
            </Card>
          }
        />
      </Section>

      <Section tone="surface" compact bordered>
        <SocialShare />
      </Section>

      <CTABand secondary={{ label: "View all services", to: "/services" }} />
    </Layout>
  );
}
