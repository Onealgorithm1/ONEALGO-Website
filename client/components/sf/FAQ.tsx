import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronIcon } from "./SfPage";
import { StructuredData, createFAQSchema } from "../StructuredData";

export type SfFaqItem = {
  q: string;
  /** Plain-text answer: rendered AND used verbatim for FAQPage schema. First sentence = the direct answer. */
  a: string;
  /** Optional in-site link under the answer (the owner page of the topic). */
  link?: { to: string; label: string };
  /** Optional extra rich content under the answer (kept out of the schema). */
  more?: React.ReactNode;
};

/**
 * FAQ as native disclosures: the question is an H3 inside <summary> (visible, in the outline), the answer is in the
 * HTML at load. Emits FAQPage schema from the same array (one source of truth). Questions come from the page's
 * question bank; one owner page per question across the 23 pages.
 *   <FAQ items={FAQS} />
 * Wrap in a SmartSection with the heading "… questions buyers ask" on the left (sf-c4) and the list on the right (sf-c7 sf-faq-col).
 */
export function FAQ({ items, className = "", schema = true }: { items: SfFaqItem[]; className?: string; schema?: boolean }) {
  return (
    <div className={`sf-faq ${className}`}>
      {schema && <StructuredData data={createFAQSchema(items)} />}
      {items.map((f) => (
        <details className="sf-deep" key={f.q} data-faq="">
          <summary>
            <h3 className="sf-faq-q" style={{ font: "inherit", color: "inherit", margin: 0 }}>{f.q}</h3>
            <ChevronIcon />
          </summary>
          <div className="sf-deep-body sf-measure">
            <p>{f.a}</p>
            {f.more}
            {f.link && (
              <div className="sf-links">
                {f.link.to.startsWith("#") ? (
                  <a className="sf-link" href={f.link.to}>{f.link.label}</a>
                ) : (
                  <Link className="sf-link" to={f.link.to}>{f.link.label}</Link>
                )}
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
