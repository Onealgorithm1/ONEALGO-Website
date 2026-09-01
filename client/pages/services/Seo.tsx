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

/* Google Search Essentials names exactly three technical requirements. Not a
   summary of a blog post about them — the requirements themselves. */
const REQUIREMENTS = [
  "Googlebot can reach the page: not blocked in robots.txt, not behind a login, and not carrying a noindex tag somebody left on after launch.",
  "The page returns a 200. Not a redirect chain, not a 404, and — the one that catches JavaScript apps — not a page that shows “not found” to a human while telling Google everything is fine.",
  "There is indexable content: real text in a format Google reads, that does not break the spam policies.",
];

const MYTHS = [
  "The keywords meta tag. Google has not used it since 2009 and lists it by name under things not to focus on.",
  "FAQ rich results. They stopped appearing in Google Search on 7 May 2026. Adding the markup today earns nothing.",
  "A magic word count. Google states there is no minimum or maximum length for ranking. Long is not a strategy.",
  "Keyword density. Repeating a phrase, or listing the towns you would like to rank in, is what Google’s spam policy calls keyword stuffing.",
  "Paying to appear. Organic results cost nothing — Google says so twice in its own documentation, presumably because people keep being told otherwise.",
  "Guaranteed number-one rankings. Nobody can promise one. Google will not even guarantee that a page you submit gets indexed.",
];

const QUESTIONS = [
  {
    q: "Why isn’t my site showing up on Google?",
    a: "Almost always one of three things, and they have completely different fixes: Google has never crawled the page, it crawled it and chose not to index it, or it is indexed and ranking too low to see. You can tell which in about a minute using URL Inspection in Search Console. We check that before proposing any work, because two of the three make content changes pointless until they are sorted.",
  },
  {
    q: "How long does SEO take?",
    a: "Google says some changes register within hours and others take months, and suggests waiting a few weeks before judging any of it. In our experience technical fixes move fastest because they unblock something. New pages on a site without much authority are a quarter-scale question, not a month-scale one. Anyone giving you a date is guessing.",
  },
  {
    q: "Do I have to pay Google to appear in the results?",
    a: "No. Appearing in organic search costs nothing, and Google states this outright in its own documentation. Google Ads is a separate paid product that puts you above the organic results — useful, but it does not improve your organic position and stopping it does not lower one.",
  },
  {
    q: "Should we add FAQ markup to get those dropdowns under our listing?",
    a: "Not any more. Google retired the FAQ rich result: it stopped appearing on 7 May 2026 and support is being pulled from the reporting and testing tools. The markup is harmless but it will not produce anything. If a proposal you are reading quotes for it, that is a reasonable signal about how current the rest of the proposal is.",
  },
  {
    q: "How many words should a page be?",
    a: "There is no target. Google is explicit that content length alone does not affect ranking. A 300-word page that answers the question directly will beat a 2,000-word one that circles it, and the long one costs more to write and more to maintain.",
  },
  {
    q: "Will publishing more pages get us more traffic?",
    a: "Only if each one answers something people actually search for. Publishing many near-identical pages to cover keyword variations is specifically what Google’s scaled content abuse policy targets, and “we used AI” is not a defence — the policy covers content however it was produced. Three pages that earn their place beat thirty that do not.",
  },
  {
    q: "Can you guarantee a number-one ranking?",
    a: "No, and you should treat anyone who does as a warning. Google does not guarantee that a page you submit will be indexed at all, let alone where it lands. What can be guaranteed is the work: the technical faults get fixed, the pages get written, and you can see every number in your own Search Console.",
  },
  {
    q: "Is my site fast enough?",
    a: "The thresholds are LCP under 2.5 seconds, INP under 200 milliseconds and CLS under 0.1. The part most people miss: Google grades on real visitors, not a test run on your laptop. A site with little traffic may have no field data at all, which means speed is not currently affecting its ranking — though it is still affecting whether anyone stays.",
  },
  {
    q: "What is the difference between SEO and Google Ads?",
    a: "Ads buy position now and stop the moment you stop paying. SEO builds slowly and keeps working. Most small businesses want both for a while: ads to make the phone ring this quarter, SEO so that in a year the phone rings without the meter running.",
  },
  {
    q: "Do the reviews on my own website help my ranking?",
    a: "Not in the way people hope. Google’s guidance is that review markup for your own business is not eligible for rich results — the aggregate rating property is intended for sites reviewing other businesses. What genuinely matters is reviews on your Google Business Profile, which is a different property and, for most local firms, worth more than anything on the website itself.",
  },
];

export default function Seo() {
  useSEO({
    title: "SEO Services for Small Business — Philadelphia | OneAlgorithm",
    description:
      "SEO services starting with the technical audit: crawl and index coverage, Core Web Vitals, duplicate titles, then content, outreach and reporting.",
    canonical: getCanonicalUrl("/services/seo"),
    keywords:
      "SEO services, technical SEO, content SEO, link building, organic traffic, search engine optimization, local SEO",
    ogTitle: "SEO Services for Small Business — Philadelphia | OneAlgorithm",
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
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
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

      {/* ============================================ WHAT GOOGLE ASKS FOR ===
          Written 2026-08-30 after reading Google Search Essentials and the
          reference docs under it, and running the checks described here against
          our own site and a client's. Everything stated as Google's position is
          from their published documentation; everything stated as ours is
          something we measured. No client names, no traffic figures, no case
          studies — there still aren't any in this repository. */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="The actual specification"
          title="What Google actually requires"
          lede="Most of what gets sold as SEO is opinion. Google publishes the rules, and the hard requirements are shorter than anyone expects — three of them."
        />
        <div className="mt-12">
          <CheckList items={REQUIREMENTS} />
        </div>
        <p className="mt-8 max-w-2xl text-oa-ink2 leading-relaxed">
          Meeting all three does not mean a page gets indexed — Google says so
          plainly. It means the page is <em>eligible</em>. Everything after that
          is whether the content deserves the slot, which is why we start with
          the technical layer and stop talking about it quickly.
        </p>
      </Section>

      <Section tone="night" grid>
        <SectionHeading
          tone="dark"
          eyebrow="Not worth your money"
          title="Things that do not move the needle"
          lede="Each of these is still being sold in 2026. Each is contradicted by Google's own documentation."
        />
        <div className="mt-10">
          <CheckList items={MYTHS} tone="dark" />
        </div>
        <p className="mt-8 max-w-2xl leading-relaxed text-oa-nightInk2">
          We removed the keywords meta tag from all 26 pages of this site the day
          we confirmed it, and we found a list of town names on one of our own
          pages that met Google&rsquo;s definition of keyword stuffing. We took
          it out. It is easier to notice this on someone else&rsquo;s site than
          your own.
        </p>
      </Section>

      {/* ⛔ NO FAQPage STRUCTURED DATA ON THIS SECTION, DELIBERATELY.
          Google retired the FAQ rich result: it stopped appearing in Search on
          2026-05-07 and support is being removed from the reporting and testing
          tools. Marking these up would earn nothing. They are here because they
          are the questions we get asked, not to chase a snippet that no longer
          exists — which is rather the point of the section above. */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Questions"
          title="What people ask us about SEO"
          lede="The ones that come up on nearly every first call, answered the way we would answer them on the phone."
        />
        <div className="mt-12 space-y-4">
          {QUESTIONS.map((f) => (
            <details className="spec faq" key={f.q}>
              <summary>
                <h3 className="text-lg font-semibold text-oa-ink">{f.q}</h3>
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <p className="faq-a text-oa-ink2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="surface" compact bordered>
        <SocialShare />
      </Section>

      <CTABand secondary={{ label: "View all services", to: "/services" }} />
    </Layout>
  );
}
