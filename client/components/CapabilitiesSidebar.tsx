import React from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "./site";
import { siteConfig } from "../lib/siteConfig";
import { getPostalAddress } from "../../shared/companyProfile";

/* Capability-statement rail - 2026 refresh.
 *
 * Everything here is a verifiable identifier, so it is set in mono type in a
 * real <dl>. Nothing is a decorative pill any more: the old rail wrapped every
 * card in a 2px #ffa634 border, which is 1.95:1 on white.
 *
 * Every value is read from shared/companyProfile.ts. Do not retype an
 * identifier into this file.
 *
 * The certifications, procurement and code tables this rail used to repeat now
 * live only in CapabilitiesMainContent, so the imports of complianceProfile and
 * procurementRegistrations — and the local CodeGrid — are gone with them.
 */

/** Label/value rows. Mono, because these are copy-pasted into a registry. */
function IdentifierRows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-4 space-y-3 font-mono text-sm">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-[11px] uppercase tracking-wider text-oa-ink3">
            {label}
          </dt>
          <dd className="mt-0.5 break-words text-oa-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function CapabilitiesSidebar() {
  return (
    <aside aria-labelledby="rail-heading" className="space-y-5">
      {/* The rail's cards are h3s. The dark panel deleted above carried the h2
          that stepped down to them, so removing it left <h1> followed by <h3>
          and axe flagged the broken outline. This heading restores the level
          without putting a redundant title back on the page, and names the
          landmark via aria-labelledby rather than a duplicate aria-label. */}
      <h2 id="rail-heading" className="sr-only">
        Company identifiers and registrations
      </h2>
      {/*
        THE RAIL IS A PINNED QUICK-FACTS CARD, NOT A SECOND COPY OF THE PAGE.

        It used to carry five cards — Key Identifiers, Certifications,
        Procurement, NAICS, PSC — every one of which the statement column
        already prints in full. Two costs, both measured:

          - On a phone the columns stack, so it was the same registry twice:
            2,701px, 17% of a 16,110px page.
          - On desktop it meant the UEI appeared SIX times on one page and the
            CAGE code four. The client's word for that was "clutter", and he
            was right.

        Certifications, Procurement, NAICS and PSC are long tables; they belong
        in the column a reader is actually reading, and they are deleted here
        rather than hidden. What survives is what a pinned reference is for:
        the four identifiers someone transcribes, and the contact details,
        which are the one thing the main column does not carry.

        Short enough to pin now, too. The rail was 2,649px against a 6,650px
        grid, so even with `position: sticky` repaired it could never have
        travelled far.

        Identifiers stay `lg:` only — on a phone the rail sits under the
        statement that has just listed them. Contact shows at every width.

        The dark "Empowering Federal Modernization…" panel is gone: it restated
        the hero 200px above it, and "Empowering" is on the house banlist.
      */}
      <div className="hidden lg:block">
        <Card title="Key Identifiers">
          <IdentifierRows
            rows={[
              ["CAGE", siteConfig.identifiers.cage],
              ["UEI", siteConfig.identifiers.uei],
              ["D-U-N-S", siteConfig.identifiers.duns],
              ["E-Verify Company ID", siteConfig.identifiers.everify],
            ]}
          />
        </Card>
      </div>

      {/* The phone number and the email address are the two things on this page
          somebody taps rather than reads, and as bare inline links they were
          18px tall — under half the 44px minimum, on the one card that exists
          to be used on a phone. `inline-flex min-h-[44px]` with a negative
          inline margin gives them a real target without moving the text. */}
      <Card title="Contact">
        <div className="mt-4 space-y-4 text-sm text-oa-ink2">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-oa-ink3">
              Address
            </p>
            {/* getPostalAddress() already emits the newline. The old code did
                getFullAddress(true).replace(" | ", "\n"), which replaced only
                the FIRST separator and rendered without whitespace-pre-line,
                so the address collapsed onto one line with a stray pipe. */}
            <p className="mt-1 whitespace-pre-line leading-relaxed">
              {getPostalAddress()}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-oa-ink3">
              Phone
            </p>
            <p>
              <a
                href={`tel:${siteConfig.contact.phonePrimary.replace(/[^\d+]/g, "")}`}
                className="-mx-1 inline-flex min-h-[44px] items-center px-1 text-oa-blue hover:underline"
              >
                {siteConfig.contact.phonePrimary}
              </a>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-oa-ink3">
              Email
            </p>
            <p className="break-all">
              <a
                href={`mailto:${siteConfig.contact.emailPrimary}`}
                className="-mx-1 inline-flex min-h-[44px] items-center px-1 text-oa-blue hover:underline"
              >
                {siteConfig.contact.emailPrimary}
              </a>
            </p>
          </div>
          <a
            href={siteConfig.sbaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="-mx-1 inline-flex min-h-[44px] items-center gap-1.5 px-1 text-sm font-medium text-oa-blue hover:underline"
          >
            View SBA Profile
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </Card>
    </aside>
  );
}
