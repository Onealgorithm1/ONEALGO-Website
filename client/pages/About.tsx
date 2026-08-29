import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { siteConfig } from "../../shared/companyProfile";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
  createWebPageSchema,
} from "../components/StructuredData";
import TeamSection from "../components/TeamSection";
import {
  PageHero,
  Section,
  SectionHeading,
  Split,
  Prose,
  Card,
  CTABand,
  CredentialRail,
  type Credential,
} from "../components/site";

/* About - 2026 refresh, restructured 2026-08-12.
 *
 * WHY THIS PAGE IS DIFFERENT FROM THE REST OF THE SITE
 *
 * This firm has no client logos, no testimonials and no awarded contracts. On
 * a page where a buyer decides whether these are people worth calling, that
 * leaves exactly one kind of proof: four named people with public profiles
 * anyone can open, and four registrations anyone can look up in a public
 * directory. Everything else on the page was assertion.
 *
 * So the order changed. The team runs directly under the hero instead of below
 * a mission statement, and the closing section is a list of things a sceptical
 * reader can go and verify, with the links to do it.
 *
 * COPY REMOVED (all of it unverifiable or empty):
 *  - "We transform struggling businesses into thriving enterprises" - the hero
 *    lede, and the same sentence again in four separate SEO/OG fields.
 *  - "Our mission is to help organizations modernize, automate, and grow ...
 *    create lasting business value" - a paragraph that would be true of any
 *    IT firm and therefore said nothing about this one.
 *  - "Think Bigger. Build Smarter. Move Faster." / "Start Your Transformation".
 *
 * HONESTY GUARDS (these are the easy ones to get wrong here):
 *  - The organisations on /capabilities are PRIOR EMPLOYMENT of the team, not
 *    clients. The page now says that in plain words rather than leaving the
 *    ambiguity to work in our favour.
 *  - No government contract has been awarded. The credentials section says
 *    outright that a registration is not an award.
 *
 * DETECTOR FIXES made here (baseline for /about was 9 findings, the worst on
 * the site):
 *  - all-caps-body: the uppercase font-mono row labels in the facts panel are
 *    now sentence case.
 *  - cramped-padding: the facts list was a `gap-px` grid whose outer <dl>
 *    carried the border and background with zero padding, so its rows sat
 *    flush against a visible boundary. It is now a divided list where each row
 *    owns its own padding.
 *  - low-contrast: the hero `panel` renders white text on a translucent
 *    backdrop-blur surface over a gradient, measured at 2.3:1 in the worst
 *    pixels. The panel is a shared primitive this page must not edit, so the
 *    page stops using it - the same four registry facts now appear as real
 *    text on an opaque ground further down, where they are legible and where
 *    the credential links sit beside them.
 *
 * Facts are read from shared/companyProfile.ts so the page and the
 * Organization schema cannot drift apart.
 */

const { address, areaServed, foundingDate, identifiers, sbaUrl } = siteConfig;

const FACTS: [string, string][] = [
  ["Founded", foundingDate],
  [
    "Headquarters",
    `${address.street}, ${address.streetUnit}, ${address.city}, ${address.region} ${address.postalCode}`,
  ],
  ["Ownership", "Woman- and minority-owned small business"],
  ["Areas served", areaServed.join(" · ")],
  ["Support", "24/7, across every time zone we serve"],
];

/* Every URL here is the one already carried in the site footer, where each was
   fetched and confirmed to list this company. The Virginia SWaM directory is a
   single-page app with no per-record permalink, so it links to the directory
   rather than implying a deep link that does not exist. */
/* Restructured 2026-08-28 from [href, label] tuples to the shared Credential
   shape, so this page and the homepage render certifications through the same
   CredentialRail and cannot drift apart on what we claim.

   ⛔ `reference: null` renders "Verify" rather than a number, and that is
   deliberate: Virginia's directory is searched by name and issues no public
   certificate number we hold. Inventing one to make the row look complete
   would destroy the only thing this element is for. */
const CREDENTIALS: Credential[] = [
  {
    credential: "COSTARS supplier",
    short: "PA DGS",
    authority: "Pennsylvania Department of General Services",
    reference: "4400033848",
    href: "https://www.pa.gov/agencies/dgs/programs-and-services/costars/supplier-information",
  },
  {
    credential: "SWaM certified",
    short: "Virginia SBSD",
    authority: "Virginia Department of Small Business and Supplier Diversity",
    reference: null,
    href: "https://directory.sbsd.virginia.gov/#/directory",
  },
];

const SEO_DESCRIPTION =
  "One Algorithm is a woman- and minority-owned small business in Malvern, Pennsylvania, founded in 2020. Meet the four people who run it — leadership, delivery, compliance and partnerships — and check the certifications yourself.";

export default function About() {
  useSEO({
    title: "About OneAlgorithm — the people who run it",
    description: SEO_DESCRIPTION,
    canonical: getCanonicalUrl("/about"),
    keywords:
      "OneAlgorithm team, OneAlgorithm leadership, woman-owned IT consultancy, EDWOSB, Malvern Pennsylvania IT consulting, Salesforce Consulting Partner",
    ogTitle: "About OneAlgorithm — the people who run it",
    ogDescription: SEO_DESCRIPTION,
    ogUrl: getCanonicalUrl("/about"),
    ogImage: "https://onealgorithm.com/og-image.jpg",
    twitterTitle: "About OneAlgorithm — the people who run it",
    twitterDescription: SEO_DESCRIPTION,
    twitterImage: "https://onealgorithm.com/og-image.jpg",
  });
  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />
      <StructuredData
        data={createWebPageSchema(
          "About OneAlgorithm — the people who run it",
          SEO_DESCRIPTION,
          "https://onealgorithm.com/about",
        )}
      />

      {/* No `panel` - see the low-contrast note in the header comment. */}
      <PageHero
        title={
          <>
            The people behind{" "}
            <span className="text-oa-orange">One Algorithm</span>
          </>
        }
        lede="Four people run this firm. Between them they spent their careers building and running enterprise systems — Salesforce, ERP, integration, federal compliance — inside large organizations, as employees, before starting One Algorithm in 2020. Their names, roles and public profiles are below."
        primary={{ label: "Talk to an expert", to: "/contact" }}
        secondary={{ label: "See what we do", to: "/services" }}
      />

      {/* The team leads the page. It is the only proof here a stranger can
          independently confirm. */}
      <TeamSection />

      {/* ================= THE FIRM, AND HOW TO CHECK IT ================= */}
      <Section tone="paper">
        <Split
          left={
            <>
              <SectionHeading title="What the firm actually is" />
              <Prose className="mt-6">
                <p>
                  One Algorithm is a small IT consultancy in Malvern,
                  Pennsylvania, founded in 2020 and owned by the people who work
                  in it. The work is cloud modernization, Salesforce and ERP
                  implementation, and systems integration. We build to NIST and
                  DFARS requirements where a contract calls for them, but we are
                  not a dedicated cybersecurity provider and do not take
                  standalone security engagements.
                </p>
                <p>
                  The experience behind that work was earned as employees. The
                  organizations listed on our{" "}
                  <Link
                    className="font-medium text-oa-blue underline underline-offset-2 hover:text-oa-blue700"
                    to="/capabilities"
                  >
                    capabilities page
                  </Link>{" "}
                  are places members of this team have worked, before this firm
                  existed. They are prior employment, not clients of One
                  Algorithm, and we do not present them as clients.
                </p>
              </Prose>

              <dl className="mt-10 divide-y divide-oa-hairline border-y border-oa-hairline">
                {FACTS.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <dt className="text-sm text-oa-ink3">{label}</dt>
                    <dd className="leading-snug text-oa-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </>
          }
          right={
            <Card title="Don't take our word for any of it">
              <p className="mt-2.5 text-sm leading-relaxed text-oa-ink2">
                Each of these is a public record in someone else's directory.
                Open them.
              </p>

              {/* WBENC / NMSDC / Salesforce are NOT repeated here -- they now
                  ride in the hero rail at the top of this page. What is left is
                  the pair that rail cannot carry: COSTARS and SWaM are searched
                  by name and issue no public number, so they have nothing to
                  print in a reference cell and belong in a list of links. */}
              <CredentialRail items={CREDENTIALS} className="mt-6" />

              <dl className="mt-6 grid gap-3 border-t border-oa-hairline pt-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-oa-ink3">UEI</dt>
                  <dd className="font-mono text-sm text-oa-ink">
                    {identifiers.uei}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-oa-ink3">CAGE</dt>
                  <dd className="font-mono text-sm text-oa-ink">
                    {identifiers.cage}
                  </dd>
                </div>
              </dl>

              {/* Stated plainly on purpose. A set-aside certification is
                  routinely read as evidence of past federal work; this firm has
                  not been awarded a government contract, and the page should
                  not let that misreading stand. */}
              <p className="mt-6 border-t border-oa-hairline pt-5 text-sm leading-relaxed text-oa-ink2">
                These are certifications and registrations — they make the firm
                eligible to bid on set-aside work. They are not contract awards,
                and we don't claim any.
              </p>
            </Card>
          }
        />
      </Section>

      <CTABand
        title="Talk to the people on this page"
        body="Tell us what is slowing you down. Whoever picks it up is one of the four people above — the same people who would scope the work and build it."
        primary={{ label: "Talk to an expert", to: "/contact" }}
        secondary={{ label: "View capabilities", to: "/capabilities" }}
      />
    </Layout>
  );
}
