import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronIcon } from "../sf/SfPage";
import { StructuredData, createFAQSchema } from "../StructuredData";
import type { WdFaqItem } from "../../data/wd-faq";

/*
 * FAQ as the WAI-ARIA APG accordion (design-contract-webdev.md §5, U16; structure-spec.md §1.5, gate 4): the question
 * is an H3 wrapping a <button aria-expanded aria-controls>, the answer a region in the prerendered HTML whether open
 * or closed (never <h3> inside <summary>, the pattern HDG-09 rejects). Closed in the HTML; at >= `openFrom` px the
 * mount effect opens every item, phones keep them collapsed (SS §3). The only motion is the chevron (200 ms); the
 * panel itself toggles instantly on every browser, so iOS and Chrome behave the same and keyboard users never wait.
 * The same array feeds FAQPage schema, verbatim (one source of truth).
 *
 *   <WdFaq items={WD_FAQ} />
 */
export function WdFaq({ items, schema = true, openFrom = 768, className = "" }: { items: WdFaqItem[]; schema?: boolean; openFrom?: number; className?: string }) {
  const [open, setOpen] = React.useState<boolean[]>(() => items.map(() => false));
  React.useEffect(() => {
    // Not during the prerender (scripts/prerender.mjs sets the flag): the static HTML stays collapsed with every answer
    // in it, so a phone never paints nine open panels and then folds them on hydration.
    if (window.__oaPrerender) return;
    if (window.matchMedia(`(min-width: ${openFrom}px)`).matches) setOpen(items.map(() => true));
  }, [items, openFrom]);
  const toggle = (i: number) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)));
  return (
    <div className={`sf-faq wd-faq ${className}`}>
      {schema && <StructuredData data={createFAQSchema(items)} />}
      {items.map((f, i) => {
        const bid = `${f.id}-q`, pid = `${f.id}-a`;
        return (
          <div className="wd-faq-item" key={f.id} id={f.id}>
            <h3 className="wd-faq-q">
              <button type="button" id={bid} aria-expanded={open[i]} aria-controls={pid} onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <ChevronIcon />
              </button>
            </h3>
            <div className="wd-faq-a sf-measure" id={pid} role="region" aria-labelledby={bid} hidden={!open[i]}>
              <p>{f.a}</p>
              {f.links && f.links.length > 0 && (
                <div className="sf-links">
                  {f.links.map((l) =>
                    l.to.startsWith("#") ? (
                      <a className="sf-link" href={l.to} key={l.to}>{l.label}</a>
                    ) : (
                      <Link className="sf-link" to={l.to} key={l.to}>{l.label}</Link>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
