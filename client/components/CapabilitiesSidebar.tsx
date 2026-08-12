import React from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "./site";
import { siteConfig } from "../lib/siteConfig";
import { getPostalAddress } from "../../shared/companyProfile";
import {
  registrations,
  procurementRegistrations,
} from "../../shared/capabilities-data";

/* Capability-statement rail - 2026 refresh.
 *
 * Everything here is a verifiable identifier, so it is set in mono type in a
 * real <dl>. Nothing is a decorative pill any more: the old rail wrapped every
 * card in a 2px #ffa634 border, which is 1.95:1 on white.
 *
 * Every value is read from shared/companyProfile.ts or
 * shared/capabilities-data.ts. Do not retype an identifier into this file.
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

/** Hairline grid of codes. Same treatment as the homepage identifier grid.
 *
 *  The `gap-px` over a hairline ground IS the border -- every cell is already
 *  separated by a real 1px rule. Wrapping that in a second rounded border put a
 *  bounded card inside the Card that already holds it, which is exactly the
 *  nesting the design system exists to prevent. Dividers, not containers. */
function CodeGrid({ codes }: { codes: string[] }) {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-px bg-oa-hairline">
      {codes.map((code) => (
        <li
          key={code}
          className="bg-oa-surface px-2 py-2 text-center font-mono text-xs text-oa-ink"
        >
          {code}
        </li>
      ))}
    </ul>
  );
}

export default function CapabilitiesSidebar() {
  const federal: [string, string][] = [
    ["SAM.gov UEI", procurementRegistrations.federal.sam_gov],
    ["FedConnect", procurementRegistrations.federal.fedConnect],
    ["GSA eBuy", procurementRegistrations.federal.gsa_ebuy],
  ];
  const stateAndLocal: [string, string][] =
    procurementRegistrations.stateAndLocal.map((item) => [
      item.label,
      item.value,
    ]);

  return (
    <aside aria-label="Company identifiers and registrations" className="space-y-5">
      <div className="rounded-xl bg-oa-night p-6">
        <h2 className="text-lg font-semibold text-oa-nightInk">
          One Algorithm LLC
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-oa-nightInk2">
          Empowering Federal Modernization through intelligent, Secure, and
          Accessible Solutions
        </p>
      </div>

      <Card title="Key Identifiers">
        <IdentifierRows
          rows={[
            ["CAGE", siteConfig.identifiers.cage],
            ["UEI", siteConfig.identifiers.uei],
            ["D-U-N-S", siteConfig.identifiers.duns],
          ]}
        />
      </Card>

      <Card title="Registrations">
        <IdentifierRows
          rows={[
            ["EDWOSB", registrations.edwosb],
            ["WBENC WBE", registrations.wbenc.wbe],
            ["WBENC WOSB", registrations.wbenc.wosb],
            ["SDB & SB", registrations.sdb_sb],
            ["NMSDC MBE", registrations.nmsdc_mbe],
            ["VA SWaM", registrations.va_swam],
          ]}
        />
      </Card>

      <Card title="Procurement">
        {federal.length > 0 && (
          <div className="mt-4">
            <h4 className="text-eyebrow font-mono uppercase text-oa-ink3">
              Federal
            </h4>
            <IdentifierRows rows={federal} />
          </div>
        )}
        {stateAndLocal.length > 0 && (
          <div className="mt-7">
            <h4 className="text-eyebrow font-mono uppercase text-oa-ink3">
              State &amp; local
            </h4>
            <IdentifierRows rows={stateAndLocal} />
          </div>
        )}
      </Card>

      {siteConfig.codes.naics.length > 0 && (
        <Card title="NAICS Codes">
          <p className="mt-3 font-mono text-sm text-oa-ink2">
            Primary: {siteConfig.codes.naics[0]}
          </p>
          <CodeGrid codes={siteConfig.codes.naics} />
        </Card>
      )}

      {siteConfig.codes.psc.length > 0 && (
        <Card title="PSC Codes">
          <CodeGrid codes={siteConfig.codes.psc} />
        </Card>
      )}

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
            <p className="mt-1">
              <a
                href={`tel:${siteConfig.contact.phonePrimary.replace(/[^\d+]/g, "")}`}
                className="text-oa-blue hover:underline"
              >
                {siteConfig.contact.phonePrimary}
              </a>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-oa-ink3">
              Email
            </p>
            <p className="mt-1 break-all">
              <a
                href={`mailto:${siteConfig.contact.emailPrimary}`}
                className="text-oa-blue hover:underline"
              >
                {siteConfig.contact.emailPrimary}
              </a>
            </p>
          </div>
          <a
            href={siteConfig.sbaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-oa-blue hover:underline"
          >
            View SBA Profile
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </Card>
    </aside>
  );
}
