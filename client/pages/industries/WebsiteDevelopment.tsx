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
  Split,
  CTABand,
} from "../../components/site";
import { useSEO, getCanonicalUrl } from "../../hooks/use-seo";

/* Website development (industry) - copy rewritten and page cut down 2026-08-12.
 *
 * THE DUPLICATE PROBLEM, RESOLVED THE OTHER WAY
 *
 * This page carried Modern Design / Responsive Development / Performance
 * Optimized / SEO Ready / Secure & Reliable / Custom Solutions - the exact six
 * commodity features that were deleted from /services/website-development on
 * 2026-08-12 for being table stakes ("in 2026 that is a restaurant advertising
 * food"). They survived here only because nobody looked at this file the same
 * day. They are gone now.
 *
 * WHY THE PAGE IS KEPT RATHER THAN GUTTED TO A REDIRECT
 *
 * There is exactly one thing an industry-flavoured web page can say that the
 * service page cannot: what changes between sectors. The build is the same
 * build; what differs is what the site has to connect to and which standard it
 * is measured against. That is four short paragraphs, it is true, and it links
 * to the four industry pages - which is also the only internal-linking job this
 * page was ever going to do well.
 *
 * Everything else defers to /services/website-development, which is the best
 * page on this site and prints its own Lighthouse scores.
 */

const BY_SECTOR = [
  {
    title: "Construction",
    body: "The site is usually the smallest part. What takes the time is the owner-facing project pages and the subcontractor portal behind the login, and whether either can read from the systems that hold the job data.",
    to: "/industries/construction",
  },
  {
    title: "Manufacturing",
    body: "Product and specification catalogues that have to stay in step with the system of record, rather than being retyped into a CMS twice a year and quietly going stale.",
    to: "/industries/manufacturing",
  },
  {
    title: "E-commerce",
    body: "The store is a platform decision made before we arrive. The build work is the surrounding pages, the joins to stock and support, and keeping the whole thing fast enough that the checkout is not the slow part.",
    to: "/industries/ecommerce",
  },
  {
    title: "Government and public sector",
    body: "Section 508 and WCAG conformance stop being a preference and become the acceptance criteria. We already run WCAG AA contrast as a build gate on our own site, so this is the sector where our habits cost a buyer nothing extra.",
    to: "/industries/government",
  },
];

export default function WebsiteDevelopment() {
  useSEO({
    title: "Website Development by Sector — OneAlgorithm",
    description:
      "The build is the same in every sector. What changes is what the site connects to, and which accessibility standard it is measured against.",
    canonical: getCanonicalUrl("/industries/website-development"),
    keywords:
      "website development by industry, accessible website development, WCAG AA website build, subcontractor portal development, public sector website accessibility",
    ogTitle: "Website Development by Sector — OneAlgorithm",
    ogDescription:
      "What actually changes between sectors in a website project — and what does not.",
    ogUrl: getCanonicalUrl("/industries/website-development"),
  });

  return (
    <Layout>
      <PageHero
        title={
          <>
            Website development:{" "}
            <span className="text-oa-orange">what changes between sectors</span>
          </>
        }
        lede="Mostly, nothing. The same standards apply whoever you are, and they are set out on our website development service page, with the scores measured on it. What genuinely differs is what the site has to connect to, and who is allowed to reject it."
        panel={{
          title: "Constant in every sector",
          items: [
            "WCAG AA contrast enforced at build time",
            "Content readable without JavaScript",
            "Zero measured layout shift",
            "You own the code, assets and accounts",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{
          label: "Development services",
          to: "/services/website-development",
        }}
      />

      <Section tone="paper">
        <SectionHeading
          title="What actually differs"
          lede="Four sectors we work in, and the part of a web project that changes shape in each."
        />
        <CardGrid columns={2} className="mt-12">
          {BY_SECTOR.map((s) => (
            <Card key={s.title} title={s.title} body={s.body} to={s.to} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="surface" bordered>
        <Split
          left={<SectionHeading title="The rest of it is on one page" />}
          right={
            <Prose>
              <p>
                Our{" "}
                <Link
                  className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
                  to="/services/website-development"
                >
                  website development page
                </Link>{" "}
                is the argument, and it is deliberately unusual: it publishes
                the Lighthouse scores measured on itself, including the one that
                is worse, and asks you to open DevTools and check. That is a
                better use of your time than a second page describing
                responsiveness.
              </p>
              <p>
                Two things it also says, which belong here as well. We have no
                published client work on this site yet — one client site is on a
                preview the client has not signed off, and we will not publish
                someone else&rsquo;s site as a portfolio piece before they say
                we can. And you own everything: the code, the assets and the
                accounts, with no page builder you cannot leave.
              </p>
            </Prose>
          }
        />
      </Section>

      <CTABand
        title="Bring us something that has to work"
        body="A rebuild, a site that fails an accessibility audit, or a build nobody can maintain. Tell us what is actually wrong with it and we will tell you what we would do."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
        secondary={{
          label: "Development services",
          to: "/services/website-development",
        }}
      />
    </Layout>
  );
}
