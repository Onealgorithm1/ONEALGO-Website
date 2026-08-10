import React from "react";
import Layout from "../components/Layout";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createOrganizationSchema,
} from "../components/StructuredData";
import { siteConfig } from "../lib/siteConfig";
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
const LAST_UPDATED = "August 10, 2026";

/** Identifiers a contracting officer copy-pastes. Sourced, never retyped. */
const HERO_IDENTIFIERS: [string, string][] = [
  ["UEI", siteConfig.identifiers.uei],
  ["CAGE", siteConfig.identifiers.cage],
  ["D-U-N-S", siteConfig.identifiers.duns],
  ["Primary NAICS", siteConfig.codes.naics[0]],
  ["SAM.gov", "Active"],
];

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

        {/* Identifier strip, same treatment as the homepage: mono type on a
            hairline, not decorative pills. These get copy-pasted. */}
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/12 pt-6 font-mono text-sm">
          {HERO_IDENTIFIERS.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[11px] uppercase tracking-wider text-oa-nightInk3">
                {label}
              </dt>
              <dd className="mt-1 text-oa-nightInk2">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 font-mono text-eyebrow uppercase text-oa-nightInk3">
          Last updated {LAST_UPDATED}
        </p>
      </PageHero>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
          <div>
            <div className="lg:sticky lg:top-24">
              <CapabilitiesSidebar />
            </div>
          </div>
          <div>
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
