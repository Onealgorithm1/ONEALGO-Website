import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { Plug, LifeBuoy, Globe, LineChart, Package, Users } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeading,
  Card,
  CardGrid,
  Prose,
  Split,
  CTABand,
} from "../../components/site";

/* E-Commerce - copy rewritten 2026-08-12.
 *
 * WHAT WAS WRONG WITH THIS PAGE
 *
 * "Secure, seamless payment processing with multiple gateway integrations",
 * "Personalized shopping experiences that drive conversion and customer
 * loyalty", "Increase Sales: optimized checkout processes ... boost conversion
 * rates". Six product features and four outcome claims, none of which any file
 * in this repository supports, and every one of which could sit on any agency
 * site on earth.
 *
 * WHAT REPLACES IT
 *
 * The joins, which is the part this firm is actually equipped for: integration
 * work, Zendesk (a real service page with real configuration detail), the site
 * itself, and the marketing plumbing. The storefront platform is deliberately
 * NOT claimed - there is no Shopify, BigCommerce or Adobe partnership anywhere
 * in this repo, so the page says so instead of implying one.
 */

const WORK = [
  {
    icon: Plug,
    title: "The joins between the store and everything behind it",
    body: "Storefront, inventory, payment gateway, accounting, help desk and CRM were bought at different times and rarely agree. We build and maintain the integrations that keep one order looking like one order in all of them.",
  },
  {
    icon: LifeBuoy,
    title: "Zendesk, configured for how support actually runs",
    body: "Ticket lifecycles, SLAs, triggers and escalation paths, macros and routing, and a help centre structured so customers self-serve. Connected to Salesforce or your CRM so an agent can see the order they are being asked about.",
  },
  {
    icon: Globe,
    title: "The site itself",
    body: "Built, launched and maintained to a standard we publish: WCAG AA contrast enforced at build time and zero measured layout shift. Our development page prints its own scores and asks you to check them in DevTools.",
  },
  {
    icon: LineChart,
    title: "Marketing plumbing that reconciles",
    body: "Campaign platform wired to CRM and to the store, so a channel report and a revenue report can be put side by side without someone exporting three spreadsheets first.",
  },
  {
    icon: Package,
    title: "Order and inventory flow",
    body: "Where an order goes after checkout, what updates stock, and which system is allowed to be wrong. Usually the fix is deciding which one is the source of truth, then making the others read from it.",
  },
  {
    icon: Users,
    title: "People added to your team",
    body: "A senior developer or integration engineer inside your team for a peak season, a replatform or a backlog you are never going to reach.",
  },
];

export default function ECommerce() {
  useSEO({
    title: "E-Commerce Systems Integration & Support — OneAlgorithm",
    description:
      "E-commerce integration: storefront, inventory, payments, accounting and Zendesk connected so one order looks the same in every system.",
    canonical: getCanonicalUrl("/industries/ecommerce"),
    keywords:
      "e-commerce systems integration, ecommerce Zendesk implementation, order and inventory integration, ecommerce CRM integration, e-commerce web development Malvern PA",
    ogTitle: "E-Commerce Systems Integration & Support — OneAlgorithm",
    ogDescription:
      "The storefront is rarely the problem. We work on the joins between it and everything behind it.",
    ogUrl: getCanonicalUrl("/industries/ecommerce"),
  });

  return (
    <Layout>
      <PageHero
        title={
          <>
            E-commerce: the store is rarely{" "}
            <span className="text-oa-orange">the broken part</span>
          </>
        }
        lede="What breaks is the joins. Stock that disagrees with the site, orders that reach the warehouse without the customer record, support agents who cannot see the order they are being asked about. That is the work we do for online retailers."
        panel={{
          title: "What that means in practice",
          items: [
            "Integrations between store, stock and ledger",
            "Zendesk set up and connected to your CRM",
            "The site itself, built and maintained",
            "Campaign and analytics plumbing",
            "One agreed source of truth per record",
            "Senior developers added to your team",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />

      <Section tone="paper">
        <SectionHeading
          title="Six things we get called about"
          lede="Each is a service on this site. What changes in e-commerce is the volume and the fact that a mistake is visible to a customer within the hour."
        />
        <CardGrid columns={3} className="mt-12">
          {WORK.map((w) => (
            <Card key={w.title} icon={w.icon} title={w.title} body={w.body} />
          ))}
        </CardGrid>

        <p className="mt-10 max-w-[68ch] text-oa-ink2">
          The services themselves are described on{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/services/zendesk"
          >
            Zendesk
          </Link>
          ,{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/services/website-development"
          >
            website development
          </Link>{" "}
          and{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/services/martech"
          >
            MarTech
          </Link>
          .
        </p>
      </Section>

      <Section tone="surface" bordered>
        <Split
          left={<SectionHeading title="What we are not" />}
          right={
            <Prose>
              <p>
                We are not a storefront agency. We hold no Shopify, BigCommerce
                or Adobe Commerce partnership, and a page that implied one would
                be easy to check and embarrassing to be caught at. We work on
                the systems around the store and on custom builds.
              </p>
              <p>
                We connect what you already own — Oracle, Salesforce, Zendesk,
                HubSpot, QuickBooks and custom APIs — rather than assuming a
                replacement is required. Sometimes a replacement is required,
                and we will say so.
              </p>
              <p>
                No e-commerce case study has been published, so there is none to
                link. One Algorithm is a small IT consultancy in Malvern,
                Pennsylvania, founded in 2020; the people and their track record
                are on our{" "}
                <Link
                  className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
                  to="/about"
                >
                  about page
                </Link>
                .
              </p>
            </Prose>
          }
        />
      </Section>

      <CTABand
        title="Tell us which two numbers never match"
        body="Stock on the site against stock in the warehouse, or orders in the store against orders in the ledger. Bring one of those and we will tell you where the record is being lost."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
    </Layout>
  );
}
