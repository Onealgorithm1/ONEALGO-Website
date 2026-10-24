import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronIcon } from "../sf/SfPage";

/*
 * FAQ as a WAI-ARIA APG accordion (structure-spec.md §1.5, HDG-09): <h3><button aria-expanded aria-controls> + a
 * region panel whose text is ALWAYS in the prerendered HTML. Server render = every panel open (crawlers, no-JS);
 * after mount, phones (< 768 px) collapse to the questions (the spec's "answers open >= 768, collapsed on phones").
 * The collapse happens below the fold, so it shifts nothing on screen. Opening is instant (no height animation:
 * ponytail, the 220 ms Chrome-only height tween is a nice-to-have; add `interpolate-size` CSS later if wanted).
 * ponytail: built for the local pages; the hub's planned WdFaq (DC §5) can replace it with the same props.
 *
 *   <LocalFaq items={[{ q, a, link? }]} idPrefix="faq" />
 */
export type LocalFaqEntry = { q: string; a: string; link?: { to: string; label: string } };

export function LocalFaq({ items, idPrefix = "faq", openFrom = 768 }: { items: LocalFaqEntry[]; idPrefix?: string; openFrom?: number }) {
  const [open, setOpen] = React.useState<boolean[]>(() => items.map(() => true));
  React.useEffect(() => {
    if (window.matchMedia(`(max-width: ${openFrom - 1}px)`).matches) setOpen(items.map(() => false));
  }, [items, openFrom]);
  return (
    <div className="sf-faq wd-faq">
      {items.map((f, i) => {
        const b = `${idPrefix}-q${i + 1}`, p = `${idPrefix}-a${i + 1}`;
        return (
          <div className="wd-faq-item" key={f.q}>
            <h3 className="wd-faq-q">
              <button type="button" id={b} aria-expanded={open[i]} aria-controls={p} onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}>
                <span>{f.q}</span>
                <ChevronIcon />
              </button>
            </h3>
            <div id={p} role="region" aria-labelledby={b} className="wd-faq-a sf-measure" hidden={!open[i]}>
              <p>{f.a}</p>
              {f.link && (
                <div className="sf-links">
                  <Link className="sf-link" to={f.link.to}>{f.link.label}</Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
