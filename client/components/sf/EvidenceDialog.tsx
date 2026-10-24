import * as React from "react";
import { ExtLink } from "./SfPage";
import {
  SF_APPEXCHANGE_URL, SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_LISTING_ID, SF_PARTNER_TIER, SF_PLATFORM_CERTS, SF_VERIFIED_LABEL,
} from "../../data/salesforceProof";
import type { SfPerson } from "../../data/sfPeople";

/*
 * Evidence pop-up (design-contract.md "Evidence pop-up pattern"; WAI-ARIA APG modal dialog):
 * native <dialog> opened with showModal() by any element carrying data-evidence="<id>" (see <Verify>);
 * aria-labelledby = the title; focus moves to the title (tabindex -1) on open and returns to the opener on
 * close; Esc closes natively; a visible Close button is in the tab order; the page behind is inert.
 * The wiring is in client/lib/sfMotion.ts (delegated click on the .sfv2 root), so the dialog has no state
 * and server/client markup match.
 *
 * Content rule: what the evidence is, the figures we read rendered as HTML (never a screenshot), the read
 * date, and the source address printed as text. The ONE off-site control on a Salesforce page lives here:
 * "Open on salesforce.com (new tab)", secondary, new tab, noopener, external mark. The primary action stays
 * on site (Close, or an in-site link).
 */

/** The control that opens an EvidenceDialog with the same `id`. Mono chip, >= 44px on touch. */
export function Verify({ id, children = "Verify", className = "" }: { id: string; children?: React.ReactNode; className?: string }) {
  return (
    <button type="button" className={`sf-verify ${className}`} data-evidence={id} aria-haspopup="dialog">
      {children}
    </button>
  );
}

export type EvidenceRow = { th: React.ReactNode; td: React.ReactNode };

/**
 *   <EvidenceDialog id="appexchange" title="Salesforce's AppExchange record of OneAlgorithm"
 *     intro="What the listing's stat box said when a person at OneAlgorithm read it."
 *     rows={[{ th: "Salesforce-certified people", td: 16 }, …]}
 *     external={{ href: SF_APPEXCHANGE_URL, label: "Open on salesforce.com" }} />
 * Open it with <Verify id="appexchange" />. One dialog per id per page.
 */
export function EvidenceDialog({ id, title, intro, rows, children, external, primary }: {
  id: string;
  title: string;
  intro?: React.ReactNode;
  rows?: EvidenceRow[];
  /** Extra body content (a source list, a note). */
  children?: React.ReactNode;
  /** The one off-site control, secondary. Omit to show the address as text only. */
  external?: { href: string; label?: string };
  /** In-site primary action instead of the plain Close (e.g. { href: "#start", label: "Book the free health check" }). */
  primary?: { href: string; label: string };
}) {
  const t = `ev-${id}-t`;
  return (
    <dialog className="sf-evidence" id={`ev-${id}`} aria-labelledby={t}>
      <div className="sf-ev-head">
        <h2 id={t} tabIndex={-1} data-ev-title="">{title}</h2>
        <button className="sf-ev-close" type="button" aria-label="Close" data-ev-close="">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div className="sf-ev-body">
        {intro && <p>{intro}</p>}
        {rows && rows.length > 0 && (
          <table>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}><th scope="row">{r.th}</th><td>{r.td}</td></tr>
              ))}
            </tbody>
          </table>
        )}
        {children}
        <div className="sf-ev-actions">
          {primary ? (
            <a className="sf-btn sf-btn-primary" href={primary.href} data-ev-close="">{primary.label}</a>
          ) : (
            <button type="button" className="sf-btn sf-btn-ghost" data-ev-close="">Close</button>
          )}
          {external && <ExtLink href={external.href} className="sf-btn sf-btn-ghost">{external.label ?? "Open on salesforce.com"}</ExtLink>}
        </div>
      </div>
    </dialog>
  );
}

export type SfSource = {
  /** Human-readable program or publisher, e.g. "U.S. Census Bureau, American Community Survey 5-year" */
  name: string;
  /** What was read, in words: "Table S2401, employment by occupation, Dallas city" */
  what?: React.ReactNode;
  /** Read date as shown: "read 21 October 2026" */
  read: string;
  /** The human-readable program/source PAGE (never an api.*, query or dataset URL). Shown as text and, if set, as the one off-site link. */
  page?: string;
};

/**
 * "Where these figures come from": the one pop-up per data family on city pages that replaces every raw
 * data link (the 180+ api.census.gov anchors are gone). Lists human-readable source pages with read dates.
 *   <SourcesDialog id="market" sources={[{ name: "U.S. Census Bureau, County Business Patterns", what: "Establishments, Dallas County, 2018-2023", read: "read 21 October 2026", page: "https://www.census.gov/programs-surveys/cbp.html" }]} />
 *   …<Verify id="market">Where these figures come from</Verify>
 */
export function SourcesDialog({ id, title = "Where these figures come from", intro, sources }: {
  id: string; title?: string; intro?: React.ReactNode; sources: SfSource[];
}) {
  return (
    <EvidenceDialog id={id} title={title} intro={intro ?? "Every figure on this page names its source and the date a person at OneAlgorithm read it. The source pages are listed here; nothing on the page links to a data endpoint."}>
      <ul className="sf-ev-sources">
        {sources.map((s, i) => (
          <li key={i}>
            <p className="sf-ev-name">{s.name}</p>
            {s.what && <p>{s.what}</p>}
            <span className="sf-mono">
              {s.read}
              {s.page && <> · {s.page.replace(/^https?:\/\//, "").replace(/\/$/, "")}</>}
            </span>
          </li>
        ))}
      </ul>
    </EvidenceDialog>
  );
}

/** The company record: Salesforce's AppExchange listing. Figures from data/salesforceProof.ts. */
export function AppExchangeEvidence() {
  return (
    <EvidenceDialog
      id="appexchange"
      title="Salesforce's AppExchange record of OneAlgorithm"
      intro="What the listing's stat box said when a person at OneAlgorithm read it. We quote the figures; we do not reproduce Salesforce's page."
      rows={[
        { th: "Partner type", td: "Consulting Partner" },
        { th: "Partner tier", td: SF_PARTNER_TIER },
        { th: "Salesforce-certified people", td: SF_CERTIFIED_PEOPLE },
        { th: "Certifications held", td: SF_CERTIFICATIONS },
        { th: "On the Platform competency", td: SF_PLATFORM_CERTS },
        { th: "Listing", td: SF_LISTING_ID },
        { th: "Read on", td: SF_VERIFIED_LABEL },
        { th: "Source", td: "appexchange.salesforce.com" },
      ]}
      external={{ href: SF_APPEXCHANGE_URL }}
    />
  );
}

/** A person's credentials: their public Trailblazer profile. No dates, no counts beyond the active total. */
export function TrailblazerEvidence({ person }: { person: SfPerson }) {
  const host = person.trailhead.replace(/^https?:\/\/(www\.)?/, "");
  return (
    <EvidenceDialog
      id={`trailblazer-${person.slug}`}
      title={`${person.name}'s Salesforce credentials`}
      intro={`${person.pronoun === "she" ? "Her" : "His"} public Trailblazer profile lists the certifications ${person.pronoun} holds. They are ${person.pronoun === "she" ? "her" : "his"} credentials, earned by ${person.pronoun === "she" ? "her" : "him"}; the company's figures are Salesforce's record of the whole team.`}
      rows={[
        { th: "Role", td: person.title },
        { th: "Active certifications", td: person.badges.length },
        ...(person.range ? [{ th: "Range held", td: person.range }] : []),
        { th: "Verified on", td: person.verifiedLabel },
        { th: "Source", td: host },
        { th: "Check any credential", td: "trailhead.salesforce.com/en/credentials/verification" },
      ]}
      external={{ href: person.trailhead }}
    >
      <ul className="sf-ev-sources" aria-label={`${person.name}'s active certifications`}>
        {person.badges.map((b) => (
          <li key={b.slug}><p className="sf-ev-name">{b.name}</p></li>
        ))}
      </ul>
    </EvidenceDialog>
  );
}
