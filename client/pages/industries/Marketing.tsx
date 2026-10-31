import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, CBP, type IndUnit } from "../../components/v2/industries-Body";

/* Marketing (industry signpost). Hero kept; body rebuilt on the sf kit 2026-10-31 (sitewide-seo run, industries group).
 * HONESTY (resolved Q7): NO white-label claim and no agency-partner offer: nothing in our notes shows we sell or have
 * done white-label web development. Proof allowed: Facebook/Instagram management on accounts clients own; the Gorband
 * card; Phantom Arcades SEO case study. No marketing client counts, ratings or testimonials.
 * Facts: Census CBP 2023, NAICS 541810 and 541613 (industries/facts.json, cbp_web_it). */

const PAGE_PATH = "/industries/marketing";
const TITLE = "MarTech & Technology for Marketing Teams | OneAlgorithm";
const DESCRIPTION = "What a marketing team gets from us: social media on accounts you own, MarTech integration between campaign tools and CRM, and the analytics under it.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "What a marketing team gets",
    lede: "Marketing is a function, so the work lives on three service pages.",
    lead: "Marketing teams buy technology like everyone else, and the problems are the usual ones: channels, plumbing and proof.",
    points: ["Facebook and Instagram managed on your accounts", "Campaign platform wired to your CRM", "Analytics that reconcile channel and revenue"],
    deepLabel: "where each marketing job is described",
    deep: (<>
      <p className="sf-rule">This page is a short signpost. Each job below links to the page that owns the detail, so nothing is said twice in two places.</p>
      <div className="sf-links">
        <Link className={L} to="/services/marketing">Marketing and social media</Link>
        <Link className={L} to="/services/martech">MarTech</Link>
        <Link className={L} to="/services/seo">SEO</Link>
      </div>
    </>),
  },
  {
    id: "social", title: "Channels managed by nobody in particular",
    lede: "We manage the Facebook Pages and Instagram business accounts our clients own.",
    lead: "Accounts stay yours and access can be withdrawn at any time.",
    points: ["Planning and publishing content", "Profiles kept current", "A report of what each channel delivered"],
    deepLabel: "how social media management works",
    deep: (<>
      <p className="sf-rule">We plan and publish content, keep profiles current and report what each channel delivered. Gorband is a client site we built, and it appears on our work page.</p>
      <div className="sf-links"><Link className={L} to="/services/marketing">Marketing and social media</Link></div>
    </>),
  },
  {
    id: "martech", title: "Tools that do not talk to each other",
    lede: "Campaign platform, customer data, CRM and the store or service systems either side of them.",
    lead: "This is integration work wearing a marketing hat, and it is most of what marketing teams call us about.",
    points: ["Campaign platform connected to the CRM", "One customer record across tools", "Reports that join spend to revenue"],
    deepLabel: "what the MarTech work covers",
    deep: (<>
      <p className="sf-rule">We connect the campaign platform to the CRM and to the systems around it, so a channel report and a revenue report can be put side by side without someone exporting three spreadsheets first.</p>
      <p><span className="sf-lead-in">What we do:</span> We agree which system owns each field, build the sync and report its failures.</p>
      <div className="sf-links"><Link className={L} to="/services/martech">MarTech services</Link></div>
    </>),
  },
  {
    id: "spend", title: "Nobody can tell what the spend did",
    lede: "Search visibility and analytics underneath it, so results can be read instead of argued about.",
    lead: "Our measured example is Phantom Arcades, where organic clicks rose 92 percent year on year.",
    points: ["Non-brand clicks up 231% year on year", "Measured in Google Search Console", "No revenue claimed"],
    deepLabel: "the Phantom Arcades result",
    deep: (<>
      <p className="sf-rule">The figures are Google Search Console clicks for the Phantom Arcades site: organic clicks up 92 percent and non-brand clicks up 231 percent year on year. We do not report revenue.</p>
      <div className="sf-links"><Link className={L} to="/blog/seo-case-study-phantom-arcades/">Phantom Arcades SEO case study</Link></div>
    </>),
  },
  {
    id: "limits", title: "What we do not offer",
    lede: "We do not sell white-label web development to agencies.",
    lead: "We have published no marketing case studies beyond the one above and hold no client testimonials.",
    deepLabel: "where our experience stops",
    deep: (<>
      <p className="sf-rule">We work under our own name with the clients we serve directly. We can show you our <Link className={L} to="/services/website-development">website development</Link> and the four people who would do the work on our <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you offer white-label web development for agencies?", a: "No. We do not sell white-label work. We work under our own name with the clients we serve directly." },
  { q: "Do you manage social media for businesses?", a: "Yes. We manage Facebook Pages and Instagram business accounts that our clients own, with access that can be withdrawn at any time.", link: { to: "/services/marketing", label: "Marketing and social media" } },
  { q: "Can you connect our campaign platform to our CRM?", a: "Yes. We connect campaign platforms to CRMs and the systems around them, after agreeing which system owns each field.", link: { to: "/services/martech", label: "MarTech" } },
  { q: "Can you show marketing results?", a: "One measured example: Phantom Arcades organic clicks rose 92 percent year on year and non-brand clicks 231 percent, from Google Search Console.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Phantom Arcades case study" } },
  { q: "Do you run paid search or social ads?", a: "Our paid media page explains the method. We make no claim about results from client ad accounts.", link: { to: "/services/google-ads", label: "Google Ads" } },
  { q: "What drives the cost of a MarTech integration?", a: "The number of tools, whether each has an API, the data quality and the volume to reconcile. It is scoped in writing before work starts." },
  { q: "Who owns the accounts and the data?", a: "You do. Accounts stay in your name and the integrations are documented and handed over." },
  { q: "Do you do SEO for marketing teams?", a: "Yes, as a general service, covered on the SEO page.", link: { to: "/services/seo", label: "SEO services" } },
];

export default function Marketing() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "marketing technology consulting, martech integration, social media management services, campaign platform CRM integration, marketing analytics consulting",
    ogTitle: TITLE,
    ogDescription: "Marketing is a function, not an industry. Here is what a marketing team gets, and where the detail lives.",
    ogUrl: getCanonicalUrl(PAGE_PATH),
  });

  return (
    <Layout>
      <StructuredData data={createWebPageSchema(TITLE, DESCRIPTION, `https://onealgorithm.com${PAGE_PATH}`, { dateModified: "2026-10-31" })} />
      <PageHero
        title={
          <>
            Marketing is a function,{" "}
            <span className="text-oa-orange">not an industry</span>
          </>
        }
        lede="This page exists because marketing teams buy technology like everyone else. The work itself is described in full on two service pages, and those are the ones to read — this is a short account of what a marketing team gets and where to go next."
        panel={{
          title: "What a marketing team gets",
          items: [
            "Facebook Pages and Instagram accounts managed",
            "Campaign platform wired to your CRM",
            "Analytics that reconcile channel and revenue",
            "SEO and paid media, when you want them run",
          ],
          /* ⛔ "SBA Certified WOSB / EDWOSB" removed 2026-09-01. Louis:
             "on all our commercial pages, we don't need to state woman owned.
             It's not a selling point." It sat in this panel on 19 commercial
             pages at once. It stays on /capabilities and
             /industries/government, where a buyer is actively looking for it. */
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Marketing services", to: "/services/marketing" }}
      />
      <IndBody
        crumbs={[{ label: "Marketing" }]}
        base={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }]}
        plate={{
          title: "Diagram: Spend joined to results",
          left: ["Social accounts", "Campaign platform", "CRM and analytics"], hub: ["What we do", "Spend joined to results"], right: ["Channels managed on your accounts", "One customer record", "Reports that join spend to revenue"],
          caption: "A diagram of the work: the channels and tools a marketing team runs, joined so results can be read.", stamp: "Spend joined to results",
        }}
        units={UNITS}
        facts={{
          heading: "Marketing firms by the numbers",
          lede: "Census counted 15,512 advertising agencies and 52,258 marketing consulting firms in 2023.",
          rows: [
            { label: "Advertising agencies (NAICS 541810): establishments", value: "15,512" },
            { label: "Advertising agencies: employees", value: "200,465" },
            { label: "Marketing consulting (NAICS 541613): establishments", value: "52,258" },
          ],
          read: "U.S. Census Bureau, County Business Patterns 2023, read 31 October 2026",
          sources: [{ name: "U.S. Census Bureau, County Business Patterns 2023", what: "NAICS 541810 advertising agencies and 541613 marketing consulting services, United States, released 26 June 2025", read: "read 31 October 2026", page: CBP }],
        }}
        faqHeading="Marketing questions buyers ask"
        faqs={FAQS}
        desk={{
          topicLabel: "Marketing technology", need: "marketing",
          heading: "Tell us what your reporting cannot answer",
          lede: "The question your marketing stack should answer and cannot: usually which spend produced which revenue.",
          covers: ["The tools you run today", "The report you cannot build", "Who owns each account", "The channels that matter most"],
        }}
      />
    </Layout>
  );
}
