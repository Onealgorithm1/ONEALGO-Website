import React from "react";
import Layout from "../components/Layout";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
} from "../components/StructuredData";
import { PageHero, Section, CTABand } from "../components/site";
import CapabilitiesSidebar from "../components/CapabilitiesSidebar";
import CapabilitiesMainContent from "../components/CapabilitiesMainContent";

/**
 * Date shown on the page. A capability statement with no date is assumed
 * stale by the person reading it, and every identifier below is checkable
 * against a live registry - so the date is doing real work.
 *
 * UPDATE THIS BY HAND whenever any code, identifier, registration or
 * certification on this page changes.
 */
const LAST_UPDATED = "August 26, 2026";

/* The hero's own identifier strip used to be declared here as HERO_IDENTIFIERS
   and rendered inside <PageHero>'s children. PageHero now draws that rail
   itself on every company page (about / capabilities / contact), reading the
   same values off shared/companyProfile and adding the live SBA link, so the
   local copy was deleted rather than rendered twice. D-U-N-S, which the local
   copy carried and the shared rail does not, still appears three times further
   down this page (CapabilitiesSidebar and CapabilitiesMainContent). */

export default function Capabilities() {
  useSEO({
    title: "Company Capabilities & Federal Contracting Profile | OneAlgorithm",
    description:
      "Cloud modernization, cybersecurity compliance, and systems integration. SBA-certified WOSB/EDWOSB, SAM registered and set-aside eligible. CAGE: 14G18 | UEI: W8DYK38MEKP3",
    canonical: getCanonicalUrl("/capabilities"),
    // "ISO 9001" was listed here alongside the real CAGE and UEI identifiers,
    // which reads as a held certification. Removed rather than left to be taken
    // on trust - an unbacked certification claim is a live risk on a federal
    // contracting page and the keywords tag buys nothing in return, since search
    // engines stopped using it well over a decade ago. Put it back only with a
    // certificate number.
    keywords:
      "OneAlgorithm capabilities, federal contracting, cloud modernization, DevSecOps, NIST 800-171, DFARS, cybersecurity compliance, CAGE 14G18, UEI W8DYK38MEKP3, NAICS 541511",
    ogTitle:
      "Company Capabilities & Federal Contracting Profile | OneAlgorithm",
    ogDescription:
      "Cloud modernization, cybersecurity compliance, and systems integration. SBA-certified WOSB/EDWOSB, SAM registered and set-aside eligible.",
    ogUrl: getCanonicalUrl("/capabilities"),
  });

  return (
    <Layout>
      <StructuredData data={createOrganizationSchema()} />

      <PageHero
        eyebrow="Capabilities statement"
        title={
          <>
            One Algorithm LLC —{" "}
            <span className="text-oa-orange">Capabilities Statement</span>
          </>
        }
        lede="Modernizing Federal Systems Securely and Intelligently"
        meta={[{ label: "Last updated", value: LAST_UPDATED }]}
      >
        <div className="mt-7 max-w-2xl space-y-4 leading-relaxed text-oa-nightInk2">
          {/*
            Reworded 2026-08-10. This previously read "...delivering secure,
            standards-aligned technology and compliance solutions to federal
            and commercial clients nationwide."

            The commercial half is true. The federal half was not: the
            company has not yet been awarded a government contract, which is
            also why `federalExperience` in shared/capabilities-data.ts is
            an empty array. Claiming federal clients on the one page written
            for contracting officers - who verify - is the worst possible
            place to overstate. It is now framed as certification and
            eligibility, which is both accurate and what a CO is actually
            checking at this stage.
          */}
          <p>
            Economically Disadvantaged Women-Owned Small Business (EDWOSB)
            and Minority Business Enterprise (MBE) certified, delivering
            secure, standards-aligned technology and compliance solutions to
            commercial clients nationwide — and registered, certified and
            eligible to do the same for government buyers.
          </p>
          <p>
            Mission: enable government and enterprise customers to modernize
            securely, efficiently, and accessibly—meeting all compliance and
            mission objectives.
          </p>
        </div>
      </PageHero>

      {/* `compact` on purpose: this section IS the page, so the standard
          py-20/md:py-28 was 80px of nothing before a contracting officer
          reached the first identifier.

          The columns are ORDERED, not just stacked. Below lg the rail drops
          under the statement — source order put the rail first, so a phone
          opened on the contact card and the credentials were 2,700px down.
          Everything in the rail except Contact is a desktop-only duplicate of
          the main column and is hidden there rather than repeated here. */}
      <Section tone="paper" compact allowSticky>
        <div className="grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <CapabilitiesSidebar />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <CapabilitiesMainContent />
          </div>
        </div>
      </Section>

      <CTABand
        title="Ready to discuss a requirement?"
        body="Send us the requirement or solicitation you are working on and we will tell you, plainly, what we can support and what we cannot."
        primary={{ label: "Talk to an Expert", to: "/contact" }}
      />
    </Layout>
  );
}
