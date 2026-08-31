import React from "react";
import Layout from "../components/Layout";
import {
  Building2,
  Factory,
  ShoppingCart,
  Landmark,
  Megaphone,
  Code,
} from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  CTABand,
} from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createWebPageSchema,
} from "../components/StructuredData";

/* Industries hub - 2026 refresh, copy rewritten 2026-08-12.
 *
 * Three structural changes were made in the refresh: one shared <Card> instead
 * of two card designs, GOVERNMENT added (the nav linked it, the hub did not),
 * and the Government card phrased strictly as eligibility because the firm has
 * NOT been awarded a government contract. The hero pill - "combined 40+ years of
 * sector experience | Avg. 30-40% efficiency improvements post-implementation" -
 * was dropped as two unsourced numbers in a proof-shaped box.
 *
 * THE COPY PASS, 2026-08-12
 *
 * "Deep understanding of your industry's operational challenges, compliance
 * requirements, and competitive pressures" was the hero lede, and the same
 * sentence again as the section lede. It asserts sector expertise this firm
 * cannot evidence - there is no case study, no named client engagement and no
 * sector practice anywhere in this repository - on the exact page where a
 * visitor is deciding whether we know their world.
 *
 * The replacement says what is true: one consultancy, the same services, and
 * six pages that each state plainly where that lands and where it stops. Two of
 * the six are not industries at all, and the page now admits that rather than
 * padding the grid to look like a sector practice.
 *
 * Card bodies are written to match the rewritten pages behind them. The
 * Government line is left VERBATIM because it is deliberately identical to the
 * homepage's; do not "improve" one copy of it.
 */

const INDUSTRIES = [
  {
    icon: Building2,
    title: "Construction",
    body: "Connecting the field app, the estimating tool and the accounting package a firm already bought, so a job number means one thing in all three.",
    to: "/industries/construction",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    body: "Operations technology on the plant floor — SCADA, industrial IoT, OT security — and the Oracle ERP work behind it.",
    to: "/industries/manufacturing",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    body: "The joins between the store and everything behind it: stock, payments, the ledger, and a help desk that can see the order.",
    to: "/industries/ecommerce",
  },
  {
    icon: Landmark,
    title: "Government",
    body: "Set-aside eligible and SAM registered, with NAICS and PSC codes published for market research.",
    to: "/industries/government",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    body: "Not an industry, and the page says so. A short signpost to the social media management and MarTech service pages.",
    to: "/industries/marketing",
  },
  {
    icon: Code,
    title: "Website Development",
    body: "Also not an industry. What genuinely changes between sectors in a web project, which is less than most agencies imply.",
    to: "/industries/website-development",
  },
];

export default function Industries() {
  useSEO({
    title:
      "Construction, Manufacturing & E-Commerce IT — OneAlgorithm",
    description:
      "IT consulting for construction, manufacturing and e-commerce — ERP, systems integration and web work from a Malvern, PA team. See how it lands in yours.",
    canonical: getCanonicalUrl("/industries"),
    keywords:
      "construction technology consulting, manufacturing systems integration, e-commerce integration, government contracting WOSB EDWOSB, IT consulting by industry, Malvern PA",
    ogTitle: "Industries — OneAlgorithm",
    ogDescription:
      "Construction, manufacturing, e-commerce and government — and a plain account of where our experience stops.",
    ogUrl: getCanonicalUrl("/industries"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "Industries — OneAlgorithm",
    twitterDescription:
      "Construction, manufacturing, e-commerce and government — and a plain account of where our experience stops.",
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });
  return (
    <Layout>
      <StructuredData
        data={createWebPageSchema(
          "Construction, Manufacturing & E-Commerce IT — OneAlgorithm",
          "Where our work lands: construction, manufacturing, e-commerce and government. Each page says plainly what we do and what we have not done.",
          "https://onealgorithm.com/industries",
        )}
      />

      <PageHero
        title={
          <>
            The same consultancy,{" "}
            <span className="text-oa-orange">in six different rooms</span>
          </>
        }
        lede="We are not a sector specialist and these are not six practices. It is one small IT consultancy doing the same integration, platform and web work, and each page below says plainly how that lands in that industry — and what we have not done there."
        // The panel is the same six verticals the grid below lists, read off the
        // one array so the two can never disagree. No new sectors or claims.
        panel={{
          title: "Where we work",
          items: INDUSTRIES.map((i) => i.title),
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />

      <Section tone="paper">
        <SectionHeading
          title="Six pages, and two of them are not industries"
          lede="Four sectors where the work has a shape worth describing, and two — marketing and website development — that are functions every business has. Those two are kept short and point at the service pages that own the detail."
        />

        <CardGrid columns={3} className="mt-12">
          {INDUSTRIES.map((industry) => (
            <Card
              key={industry.title}
              icon={industry.icon}
              title={industry.title}
              body={industry.body}
              to={industry.to}
            />
          ))}
        </CardGrid>

        <p className="mt-10 max-w-[68ch] text-oa-ink2">
          <strong className="font-semibold text-oa-ink">
            Your sector is not on this list.
          </strong>{" "}
          That is the normal case, and it usually does not matter. The systems
          are the same systems, and the question we would ask you first is the
          same one: which two of them disagree, and who fixes it by hand today?
        </p>
      </Section>

      <CTABand
        title="Tell us what you are trying to fix"
        body="Bring the system that is slowing you down, or the role you cannot fill. We will tell you what it would take to put it right — including when the answer is that it is not worth doing."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "View our services", to: "/services" }}
      />
    </Layout>
  );
}
