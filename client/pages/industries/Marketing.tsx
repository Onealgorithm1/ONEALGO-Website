import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { PageHero } from "../../components/site";
import { StructuredData, createWebPageSchema } from "../../components/StructuredData";
import type { SfFaqItem } from "../../components/sf";
import { IndBody, CaseBand, CBP, type IndUnit } from "../../components/v2/industries-Body";

/* Marketing (industry signpost). Hero kept; body rebuilt on the sf kit 2026-10-31, round 3 (seo-spec-b 4.13).
 * HONESTY (resolved Q7, Q11, Q15): NO white-label claim, no ad-account results, no HubSpot. Proof allowed: Facebook/
 * Instagram management on accounts clients own; Gorband card; Phantom SEO case study; Marketing Cloud pattern (about
 * 18 months of recurring support, unnamed). "Access can be withdrawn" claim removed (fact-check: unsourced).
 * Does not compete for the brand query with home: non-brand title. Hero text unchanged. */

const PAGE_PATH = "/industries/marketing";
const TITLE = "Technology for marketing teams | OneAlgorithm";
const DESCRIPTION = "What a marketing team gets from us: social media on accounts you own, MarTech integration between campaign tools and CRM, and the analytics under it.";
const L = "sf-link";

const UNITS: IndUnit[] = [
  {
    id: "what", title: "Technology for marketing teams",
    lede: "Marketing is a function, so the work lives on three service pages that own the detail.",
    lead: "Marketing teams buy technology like everyone else, and the problems are the usual ones: channels, plumbing and proof.",
    points: ["Social media management services on your accounts", "MarTech consulting: campaign platform to CRM", "Marketing automation consulting, inside one platform"],
    deepLabel: "where each marketing job is described",
    deep: (<>
      <p className="sf-rule">This page is a short signpost. Each job links to the page that owns the detail, so nothing is said twice in two places.</p>
      <div className="sf-links">
        <Link className={L} to="/services/marketing">Social media management services</Link>
        <Link className={L} to="/services/martech">MarTech consulting</Link>
        <Link className={L} to="/services/seo">SEO services</Link>
      </div>
    </>),
  },
  {
    id: "social", title: "Channels managed by nobody in particular",
    lede: "We manage the Facebook Pages and Instagram business accounts our clients own.",
    lead: "Accounts stay in your name, so the channels belong to you, not to us.",
    points: ["Planning and publishing content", "Profiles kept current", "A report of what each channel delivered"],
    deepLabel: "how social media management works",
    deep: (<>
      <p className="sf-rule">We plan and publish content, keep profiles current and report what each channel delivered. Gorband is a client site we built. We publish no social media results.</p>
      <div className="sf-links"><Link className={L} to="/services/marketing">Social media management services</Link></div>
    </>),
  },
  {
    id: "martech", title: "Tools that do not talk to each other",
    lede: "Campaign platform, customer data, CRM and the store or service systems either side of them.",
    lead: "This is integration work wearing a marketing hat, and it is most of what marketing teams call us about.",
    points: ["Campaign platform connected to the CRM", "One customer record across tools", "Reports that join spend to revenue"],
    deepLabel: "what the MarTech work covers",
    deep: (<>
      <p className="sf-rule">We connect the campaign platform to the CRM and the systems around it, so a channel report and a revenue report sit side by side without someone exporting three spreadsheets first. Our Marketing Cloud pattern is about 18 months of recurring support for one client, unnamed.</p>
      <p><span className="sf-lead-in">What we do:</span> We agree which system owns each field, build the sync and report its failures.</p>
      <div className="sf-links"><Link className={L} to="/services/martech">MarTech consulting</Link></div>
    </>),
  },
  {
    id: "spend", title: "Nobody can tell what the spend did",
    lede: "Search visibility and analytics underneath it, so results can be read instead of argued about.",
    lead: "Our one measured example is Phantom Arcades, where Google clicks rose 92 percent year on year.",
    points: ["Non-brand clicks up 231% year on year", "Measured in Google Search Console", "No revenue claimed"],
    deepLabel: "the Phantom Arcades result",
    deep: (<>
      <p className="sf-rule">The figures are Google Search Console clicks for the Phantom Arcades site: clicks up 92 percent and non-brand clicks up 231 percent, 13 August to 19 October 2026 against the same 68 days a year earlier. We do not report revenue.</p>
      <div className="sf-links"><Link className={L} to="/blog/seo-case-study-phantom-arcades/">Phantom Arcades SEO case study</Link><Link className={L} to="/services/seo">SEO services</Link></div>
    </>),
  },
  {
    id: "limits", title: "Where our marketing work stops",
    lede: "We do not sell white-label web development to agencies.",
    lead: "We have no ad-account results to show and no HubSpot work, and we hold no client testimonials.",
    deepLabel: "what that means for you",
    deep: (<>
      <p className="sf-rule">We work under our own name with the clients we serve directly. Our paid media page explains a method and an audit, not client results. See our <Link className={L} to="/services/website-development">website development</Link> and the four people who would do the work on the <Link className={L} to="/about">about page</Link>.</p>
    </>),
  },
];

const FAQS: SfFaqItem[] = [
  { q: "Do you offer white-label web development for agencies?", a: "No. We do not sell white-label web development, and we have no agency-partner program. We work under our own name with the clients we serve directly. If you are an agency with a specific integration need, send the detail and we will say honestly whether it fits." },
  { q: "Do you manage social media for businesses?", a: "Yes. We manage Facebook Pages and Instagram business accounts, always on accounts you own. Gorband is a client site we built. We publish no social media results, so we will not quote a number, but we will report what each channel delivered.", link: { to: "/services/marketing", label: "Social media management services" } },
  { q: "Can you connect our campaign platform to our CRM?", a: "Yes, in principle. Our pattern is Salesforce Marketing Cloud, with about 18 months of recurring support for one client we do not name. We agree which system owns each field, build the sync and report its failures. We do not work on HubSpot.", link: { to: "/services/martech", label: "MarTech consulting" } },
  { q: "Can you show marketing results?", a: "One: for Phantom Arcades, Google clicks rose 92 percent and non-brand clicks 231 percent year on year, from Search Console. It is one result, not a pattern, and we claim no revenue. We publish no other client marketing results. The Search Console figures are the source, and the case study on our blog shows the method.", link: { to: "/blog/seo-case-study-phantom-arcades/", label: "Phantom Arcades case study" } },
  { q: "Do you run paid search or social ads?", a: "We offer a method and an audit for Google Ads, explained on our paid media page. We have no ad-account results to show, so we make no claim about them. If you want a review of an account, we will say what we would check.", link: { to: "/services/google-ads", label: "Google Ads management" } },
  { q: "What drives the cost of a MarTech integration?", a: "The number of tools, whether each has an API, how much data moves, the rate limits and who owns each account. We scope it in writing before work starts, and we give no figure until we have seen the tools involved." },
  { q: "Who owns the accounts and the data?", a: "You do. Accounts stay in your name from the first day, and integrations are documented and handed over. We work inside your accounts as a partner, and nothing is held in ours that you would need to get back. Ad accounts, analytics properties and CRM records all remain yours if we part ways." },
  { q: "Do you do SEO for marketing teams?", a: "Yes. SEO is a general service, and our measured example is Phantom Arcades. We cover technical SEO, content structure and a measured result, and we report clicks, not revenue. It is described in full on the SEO page. The SEO page lists exactly what a review covers and what it does not.", link: { to: "/services/seo", label: "SEO services" } },
  { q: "What is the difference between a marketing automation consultant and a MarTech consultant?", a: "Marketing automation builds journeys and sends inside one platform. MarTech designs the stack around it: which tools you run, how they connect and which one owns each record. Most teams need the second before the first pays off. A short call is enough to tell which of the two your team needs first.", link: { to: "/services/martech", label: "MarTech consulting" } },
];

export default function Marketing() {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    canonical: getCanonicalUrl(PAGE_PATH),
    keywords: "technology for marketing teams, social media management services, MarTech integration, campaign platform CRM integration, marketing analytics consulting",
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
          /* ⛔ WOSB/EDWOSB removed from commercial pages 2026-09-01 (Louis). */
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
        proof="seo"
        offer1={{ heading: "What can your reporting not answer?", line: "Usually which spend produced which revenue. Tell us yours.", label: "Tell us what your reporting cannot answer" }}
        offer2={{ heading: "Talk to a marketing specialist", line: "Tell us the goal; we say what we would do first.", label: "Talk to a marketing specialist" }}
        units={UNITS}
        after={{
          spend: (tone) => (
            <CaseBand id="work" tone={tone()} heading="Marketing work we can show"
              lede="One measured search result and one site we built. No other client results are published."
              cases={[
                { title: "An arcade manufacturer in Florida", built: "Organic search for a store we built, measured in Google Search Console.", result: "Google clicks +92%, non-brand +231%", to: "/blog/seo-case-study-phantom-arcades/", linkLabel: "Read the SEO case study" },
                { title: "Gorband", built: "A client site we built, with social media managed on accounts the client owns." },
              ]} />
          ),
        }}
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
