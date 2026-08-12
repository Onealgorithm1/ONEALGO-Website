import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  Prose,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";

/* Marketing (industry) - copy rewritten and page cut down 2026-08-12.
 *
 * MARKETING IS NOT AN INDUSTRY, AND THIS PAGE WAS A DUPLICATE
 *
 * It carried the same six feature cards and the same four "Why Choose Our
 * Marketing Solutions?" claims as /services/marketing, word for word - which
 * REDESIGN-NOTES already flagged as unresolved: "the industry and service
 * versions of Website Development and Marketing still share word-for-word body
 * copy. Someone needs to decide which page owns them."
 *
 * Decided: the SERVICE pages own them. /services/marketing describes the social
 * media management work (and is compliance copy Meta reviews), /services/martech
 * describes the platform work. Two pages competing for one query helps nobody,
 * least of all a site that currently ranks for almost nothing unbranded.
 *
 * So this page is now a short signpost that says what a marketing team gets and
 * sends them to the page that owns the detail. Roughly 70% of the old copy is
 * gone; none of it was lost, because every sentence still exists on the service
 * pages it was copied from.
 *
 * RECOMMENDATION IN THE HANDOVER: retire this route and 301 it to
 * /services/marketing. It cannot be deleted from here without touching
 * components/site.tsx and Layout.tsx, which are out of scope for this pass.
 */

const CALLS = [
  {
    title: "Our channels are managed by nobody in particular",
    body: "We manage the Facebook Pages and Instagram business accounts our clients own: planning and publishing content, keeping profiles current, and reporting what each channel delivered. Accounts stay yours and access can be withdrawn at any time.",
    to: "/services/marketing",
    label: "Marketing and social media",
  },
  {
    title: "The tools do not talk to each other",
    body: "Campaign platform, customer data, CRM and the e-commerce or service systems either side of them. This is integration work wearing a marketing hat, and it is most of what a marketing team actually calls us about.",
    to: "/services/martech",
    label: "MarTech",
  },
  {
    title: "Nobody can tell what the spend did",
    body: "Search visibility and paid media, and the analytics underneath both, so a channel report and a revenue report can be read side by side instead of argued about.",
    to: "/services/seo",
    label: "SEO",
  },
];

export default function Marketing() {
  useSEO({
    title: "Technology for Marketing Teams — OneAlgorithm",
    description:
      "What a marketing team gets from us: social media management on accounts you own, MarTech integration between campaign tools and CRM, and the analytics underneath. The detail lives on our service pages.",
    canonical: getCanonicalUrl("/industries/marketing"),
    keywords:
      "marketing technology consulting, martech integration, social media management services, campaign platform CRM integration, marketing analytics consulting",
    ogTitle: "Technology for Marketing Teams — OneAlgorithm",
    ogDescription:
      "Marketing is a function, not an industry. Here is what a marketing team gets, and where the detail lives.",
    ogUrl: getCanonicalUrl("/industries/marketing"),
  });

  return (
    <Layout>
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
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Marketing services", to: "/services/marketing" }}
      />

      <Section tone="paper">
        <SectionHeading
          title="Three reasons a marketing team calls us"
          lede="Each card links to the page that owns the detail, so nothing here is said twice in two places."
        />
        <CardGrid columns={3} className="mt-12">
          {CALLS.map((c) => (
            <Card key={c.title} title={c.title} body={c.body} to={c.to} />
          ))}
        </CardGrid>

        <Prose className="mt-10">
          <p>
            We have published no marketing case studies and hold no client
            testimonials, so there are none to show you. What we can show you is{" "}
            <Link
              className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
              to="/services/website-development"
            >
              this site&rsquo;s own measured scores
            </Link>
            , and the four people who would do the work, on our{" "}
            <Link
              className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
              to="/about"
            >
              about page
            </Link>
            .
          </p>
        </Prose>
      </Section>

      <CTABand
        title="Tell us what your reporting cannot answer"
        body="The question your marketing stack should be able to answer and cannot — usually it is which spend produced which revenue. We will tell you whether that is a tooling problem or a plumbing one."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "Marketing services", to: "/services/marketing" }}
      />
    </Layout>
  );
}
