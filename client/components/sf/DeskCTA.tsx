import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { SfButton } from "./SfPage";
import { SF_PHONE } from "../../data/salesforceShared";

const HC = "/services/salesforce-health-check";
const DEFAULT_COVERS = [
  "Licenses: seats paid for and never used",
  "Data: duplicates, orphans, fields nobody fills",
  "Automation: the manual steps Flow should own",
  "Permissions: who can see and change what",
  "Integrations: syncs that fail without telling anyone",
];
const DEFAULT_NEXT = [
  "Call, or send the form on the contact page.",
  "A person at OneAlgorithm reads it and replies.",
  "If it fits, the free one-week health check starts with a read-only user you create.",
];

/** The page's CTA block: topic + labels (the same shape every page passed to the old embedded form). */
export type DeskForm = {
  /** Topic key; kept for callers, the contact page receives `topicLabel`. */
  topic: string;
  topicLabel: string;
  heading: string;
  prompt: string;
  submitLabel: string;
  formId?: string;
  /** The service the contact page preselects (`?need=`). Defaults to "salesforce"; the website pages pass "website". */
  need?: string;
};

/**
 * Where the contact page gets its prefill from (client/pages/Contact.tsx reads these in an effect):
 *   need=salesforce  → "Salesforce / CRM" preselected (need=website → "Website Development", once Contact.tsx has that branch)
 *   topic=<label>    → shown as the Topic chip and sent as the Lead's "Topic:" line
 *   from=<route>     → sent as the Lead's "Submitted on:" line and the GA4 `source`
 */
export function contactHref(topicLabel: string, from: string, need = "salesforce") {
  return `/contact#need=${encodeURIComponent(need)}&topic=${encodeURIComponent(topicLabel)}&from=${encodeURIComponent(from)}`;
}

/**
 * The page's ONE CTA band, id="start": the night band every primary CTA points at. Left: H2, lede, what the week
 * covers, the one body link to the health-check page, the phone in display numerals, the NAP line (the schema's
 * ProfessionalService node is allowed because the address, phone and hours are visible here). Right: the CTA
 * panel. Owner 2026-10-23: no form on the Salesforce pages; the button takes the visitor to /contact with the
 * topic and the route in the query string, and the contact page preselects Salesforce.
 *
 *   <DeskCTA form={{ topic: "hub", topicLabel: "Salesforce implementation", heading: "Book a free health check",
 *                    prompt: "What is your Salesforce doing wrong?", submitLabel: "Book a free health check" }} />
 * `heading` defaults to the hub's; a service page passes its own 8-word H2 and lede.
 */
export function DeskCTA({ form, heading = "Start with a free one-week Salesforce health check", headingId = "h-start", lede = "We spend a week in your org, free, and you keep the written list ranked by what to fix first.", covers = DEFAULT_COVERS, coversLabel = "What the week covers", next = DEFAULT_NEXT, hcLink = true }: {
  form: DeskForm;
  heading?: string;
  headingId?: string;
  lede?: React.ReactNode;
  covers?: string[];
  /** Kicker over the covers list; the website pages pass "What to have ready". */
  coversLabel?: string;
  next?: string[];
  /** The one body link to the health-check page ("What the free health check covers"); off on the HC page itself. */
  hcLink?: boolean;
}) {
  const { pathname } = useLocation();
  return (
    <section className="sf-section sf-night" id="start" aria-labelledby={headingId}>
      <div className="sf-wrap sf-grid">
        <div className="sf-c6 sf-desk-copy">
          <h2 className="sf-h2" id={headingId}>{heading}</h2>
          <p className="sf-lede sf-measure" style={{ marginTop: 14 }} data-lede="">{lede}</p>
          <p className="sf-kicker" style={{ marginTop: 32 }}>{coversLabel}</p>
          <ul className="sf-covers">
            {covers.map((c) => <li key={c}>{c}</li>)}
          </ul>
          {hcLink && (
            <p style={{ marginTop: 20 }}>
              Salesforce optimization is part of the week.{" "}
              <Link className="sf-link" to={HC}>What the free health check covers</Link>
            </p>
          )}
          <h3 className="sf-h4" style={{ marginTop: 32 }}>What happens next</h3>
          <ol style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {next.map((s, i) => (
              <li key={i} style={{ display: "flex", gap: 12 }}>
                <span className="sf-mono" style={{ color: "var(--orange)", paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="sf-c6">
          <div className="desk-card sf-desk-panel">
            <h3 className="sf-h3" id="start-title">{form.heading}</h3>
            <p className="sf-topic-chip">Topic · {form.topicLabel}</p>
            <p style={{ marginTop: 18 }}>{form.prompt} Tell us on the contact page; the topic is already filled in.</p>
            <SfButton to={contactHref(form.topicLabel, pathname, form.need)} magnet cta="desk" className="sf-desk-btn">{form.submitLabel}</SfButton>
            <p style={{ marginTop: 28 }}>Prefer to talk it through?</p>
            <a className="sf-phone-xl" href={SF_PHONE.href} data-cta="desk">{SF_PHONE.display}</a>
            <p className="sf-mono" style={{ marginTop: 16 }}>
              OneAlgorithm · 625 Swedesford Rd, Unit B, Malvern, PA 19355 · Mon–Fri 9–5
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
