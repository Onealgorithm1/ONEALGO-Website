import * as React from "react";
import { ChevronIcon } from "./SfPage";

/**
 * "Go deeper": a native <details>/<summary> disclosure. The body is in the HTML at load (Google indexes
 * accordion content that is in the HTML and never loads content that needs a click), closed by default,
 * animated with ::details-content where supported (220ms), instant when opened by keyboard or under reduced
 * motion. May hold H3s, one list, one table or one link row; <= 220 words.
 *
 * The summary's accessible name is "Go deeper: <label>": a page with eight identical "Go deeper" buttons is
 * unusable by screen reader, so `label` names the topic (visually small).
 *
 *   <GoDeeper label="the four stages and what they cost">
 *     <p className="sf-rule">…the long answer…</p>
 *     <p><span className="sf-lead-in">What we do:</span> …</p>
 *     <div className="sf-links"><Link className="sf-link" to="/services/salesforce-health-check">Start with the free health check</Link></div>
 *   </GoDeeper>
 */
export function GoDeeper({ label, children, className = "", summaryClassName = "", title = "Go deeper" }: {
  /** The topic, completing "Go deeper: …". Required for a unique accessible name. */
  label: string;
  children: React.ReactNode;
  className?: string;
  summaryClassName?: string;
  /** The visible verb. "Go deeper" everywhere except where the design says otherwise. */
  title?: string;
}) {
  return (
    <details className={`sf-deep ${className}`} data-deep="">
      <summary className={summaryClassName}>
        <span>
          {title}
          <span className="sr-only">: {label}</span>
        </span>
        <ChevronIcon />
      </summary>
      <div className="sf-deep-body sf-measure">{children}</div>
    </details>
  );
}
