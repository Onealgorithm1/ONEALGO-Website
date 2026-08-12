import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";
import { Plug, Building2, BarChart3, Globe, Users } from "lucide-react";
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

/* Construction - copy rewritten 2026-08-12.
 *
 * WHAT WAS WRONG WITH THIS PAGE
 *
 * It claimed a construction practice this firm does not have. "Safety
 * Management: automated compliance tracking and safety protocol management keep
 * projects secure" and "Predictive maintenance scheduling" are product
 * descriptions for software we do not make and do not resell, written as though
 * we ship them. Nothing in this repository supports a single construction
 * engagement, and there is no construction case study to point at.
 *
 * THE TEST APPLIED
 *
 * An industry page is only worth having if it says something a general page
 * could not. Everything that survives here is either a service we genuinely
 * sell (integration, Salesforce, reporting, web, staff augmentation) or a
 * statement about how that service usually lands in a construction business.
 * The rest was deleted rather than softened.
 *
 * The page is now roughly half its old length, and it says outright that we do
 * not sell construction software and have published no case study. That is the
 * part a reader will believe.
 */

const WORK = [
  {
    icon: Plug,
    title: "Connecting systems that were bought separately",
    body: "A field app, an estimating tool and an accounting package, each chosen at a different time by a different person, is the normal starting point. We build and maintain the integrations between them, so a job number and a cost code mean the same thing in all three.",
  },
  {
    icon: Building2,
    title: "Salesforce for everything before the job starts",
    body: "Bid tracking, general contractor and owner relationships, and the follow-up after a proposal goes out. We are a listed Salesforce Consulting Partner, so this is the platform we know best and usually the first one we reach for.",
  },
  {
    icon: BarChart3,
    title: "Reporting that reads from more than one system",
    body: "Job costing that agrees with the ledger, and progress that agrees with the field. In most cases this turns out to be a data problem rather than a dashboard problem, and we would rather fix the data than put a chart on top of it.",
  },
  {
    icon: Globe,
    title: "Public sites, owner pages and subcontractor portals",
    body: "Built, launched and maintained. Our website work is measured rather than described — that page prints its own Lighthouse scores and asks you to check them.",
  },
  {
    icon: Users,
    title: "People added to your team",
    body: "A senior developer or integration engineer, on your tools and your timeline, for a sprint or for a year — for when the work is real but hiring for it is not.",
  },
];

export default function Construction() {
  useSEO({
    title: "Construction Technology & Systems Integration — OneAlgorithm",
    description:
      "Systems integration, Salesforce, job reporting and web work for construction firms. We connect the field, estimating and accounting systems you already own. Small IT consultancy in Malvern, PA.",
    canonical: getCanonicalUrl("/industries/construction"),
    keywords:
      "construction technology consulting, construction systems integration, Salesforce for construction, job cost reporting integration, construction software integration Pennsylvania",
    ogTitle: "Construction Technology & Systems Integration — OneAlgorithm",
    ogDescription:
      "We connect the field, estimating and accounting systems a construction firm already owns — and we say plainly what we do not do.",
    ogUrl: getCanonicalUrl("/industries/construction"),
  });

  return (
    <Layout>
      <PageHero
        title={
          <>
            Technology work for{" "}
            <span className="text-oa-orange">construction firms</span>
          </>
        }
        lede="We are an IT consultancy, not a construction software vendor. What we usually do for a construction business is connect the systems it already bought — the field app, the estimating tool, the accounting package — so the same job means the same thing in each of them."
        // Scope strip. Five items, each one a service this firm actually sells.
        panel={{
          title: "What that means in practice",
          items: [
            "Integrations between the systems you own",
            "Salesforce for bids and client relationships",
            "Job reporting that spans systems",
            "Sites and portals for owners and subcontractors",
            "Senior developers added to your team",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />

      <Section tone="paper">
        <SectionHeading
          title="Five things we get called about"
          lede="Each of these is a service on this site. What changes in construction is which system is on the other end of the wire."
        />
        <CardGrid columns={3} className="mt-12">
          {WORK.map((w) => (
            <Card key={w.title} icon={w.icon} title={w.title} body={w.body} />
          ))}
        </CardGrid>

        <p className="mt-10 max-w-[68ch] text-oa-ink2">
          The underlying services are described in full on{" "}
          <Link
            className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
            to="/services/salesforce"
          >
            Salesforce
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
            to="/services/staff-augmentation"
          >
            staff augmentation
          </Link>
          .
        </p>
      </Section>

      {/* The honest half of the page. It is here because a construction buyer
          has read the paragraph above on twenty other sites, and the only thing
          that distinguishes this one is what it admits. */}
      <Section tone="surface" bordered>
        <Split
          left={<SectionHeading title="What we are not" />}
          right={
            <Prose>
              <p>
                We do not sell construction software and we do not resell anyone
                else&rsquo;s. If what you need is a scheduling or project
                management product, buy it from a firm that sells it — they will
                support it better than we would.
              </p>
              <p>
                We have not published a construction case study and we are not
                going to imply one. One Algorithm is a small IT consultancy in
                Malvern, Pennsylvania, founded in 2020. The experience behind
                the work was earned by the team as employees at larger
                organizations, which is set out plainly on our{" "}
                <Link
                  className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
                  to="/about"
                >
                  about page
                </Link>
                .
              </p>
              <p>
                So the honest version of this page is short. We are useful to a
                construction business once it already owns its tools and they do
                not work together, or when it needs something built that nobody
                sells.
              </p>
            </Prose>
          }
        />
      </Section>

      <CTABand
        title="Tell us which two systems disagree"
        body="Bring the job that took someone three days to reconcile, or the report you rebuild by hand every month. We will tell you whether it is an integration, a data problem, or something not worth spending money on."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{ label: "All industries", to: "/industries" }}
      />
    </Layout>
  );
}
