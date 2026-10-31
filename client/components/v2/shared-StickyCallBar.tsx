import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { offerFor } from "./shared-offers";

/* Mobile-only (<768px) bottom bar: phone + the page offer. Fixed, ; the footer reserves its space with padding-bottom (nothing renders below the footer). Slides away (transform only) while the footer is in view.
 * Phone taps are counted by the delegated tel: listener in index.html (cta_placement = data-cta="sticky").
 * Layout decides where it mounts (not /contact, not Salesforce pages, which have their own bar). Props: none. */
function track(label: string) {
  try {
    (window as any).gtag?.("event", "select_content", { content_type: "sticky_offer", item_id: label, cta_placement: "sticky" });
  } catch { /* analytics must never break a click */ }
}

export function StickyCallBar() {
  const { pathname } = useLocation();
  const offer = offerFor(pathname);
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    const f = document.querySelector("footer");
    if (!f) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting));
    io.observe(f);
    return () => io.disconnect();
  }, [pathname]);
  const inert = (hidden ? { inert: "" } : {}) as React.HTMLAttributes<HTMLElement>;
  return (
    <div className="md:hidden">
      <nav
        aria-label="Call or contact us"
        aria-hidden={hidden}
        {...inert}
        className={`fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-white/10 bg-oa-night/95 px-4 pt-3 backdrop-blur transition-transform duration-200 motion-reduce:transition-none ${hidden ? "translate-y-full" : "translate-y-0"}`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a href="tel:+16108909711" data-cta="sticky" aria-label="Call (610) 890-9711" className="flex min-h-12 flex-1 items-center justify-center rounded-lg border border-white/25 text-sm font-semibold text-oa-nightInk">
          Call (610) 890-9711
        </a>
        <Link to={offer.href} data-cta="sticky" onClick={() => track(offer.label)} className="flex min-h-12 flex-1 items-center justify-center rounded-lg bg-oa-orange px-2 text-center text-sm font-semibold leading-tight text-oa-ink">
          {offer.label}
        </Link>
      </nav>
    </div>
  );
}
