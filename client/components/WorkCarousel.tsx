import React, { useCallback, useEffect, useRef, useState } from "react";
import { WORK, type WorkItem } from "../data/work";

/**
 * Sites we built. Click one and it opens IN PLACE — Louis, 2026-08-25: "a
 * thumbnail that will take them to a preview of the website but will not make
 * them leave our website".
 *
 * LIVE SITE OR SCREENSHOT. Louis, 2026-08-25: "have it open up like a real
 * website instead of a thumbnail picture". An <iframe> of the live site does
 * that — navigable, animated, real — but only when the client site's headers
 * let onealgorithm.com frame it. A site that sends X-Frame-Options or a CSP
 * without us in frame-ancestors renders as a BLANK box, and there is no event
 * to catch: the refusal happens before our code runs. So `embed` in work.ts is
 * set per site from a curl of its headers, never assumed, and a site that is
 * not embeddable keeps the full-page screenshot. Both sites are ours to
 * configure; Inspect This Home's allowlist is on its review branch.
 *
 * The iframe is sandboxed to what a site needs to work (scripts, same-origin
 * cookies, forms, popups) minus top-navigation, so nothing inside it can move
 * the visitor off our page. A preview registers in the client's analytics as
 * a visit referred by onealgorithm.com — true, and filterable on their side.
 *
 * ponytail: native scroll-snap for the rail and a native <dialog> for the
 * preview — no carousel library, no focus-trap library. <dialog> gives Esc to
 * close, focus return, inert background and the top layer for free. The
 * upgrade path if this ever needs autoplay or infinite loop is a real library;
 * it does not need either today.
 */

function Preview({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    /* showModal(), not the `open` attribute — `open` renders a dialog inline
       with no top layer, no backdrop and no Esc. */
    if (!d.open) d.showModal();
    const onCancel = (e: Event) => { e.preventDefault(); onClose(); };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog ref={ref} className="wk-modal" aria-label={`Preview of ${item.name}`}>
      <div className="wk-modal-bar">
        <div className="min-w-0">
          <p className="wk-modal-name">{item.name}</p>
          <p className="wk-modal-sector">{item.sector}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* The visitor stays on our page by default; leaving is a deliberate
              second click, and it opens in a new tab so our page survives it. */}
          <a
            className="wk-visit"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="wk-visit-long">Open the live site</span>
            <span className="wk-visit-short">Open site</span>
          </a>
          <button type="button" className="wk-close" onClick={onClose} aria-label="Close preview">
            ✕
          </button>
        </div>
      </div>
      {item.embed ? (
        <div className="wk-frame-wrap" data-loading="Loading the live site…">
        <iframe
          className="wk-frame"
          src={item.url}
          title={`Live preview of the ${item.name} website`}
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          /* Everything the client site needs to WORK (scripts, its own
             cookies, forms, popups for booking flows) and nothing that lets
             it act on OUR page: no allow-top-navigation, so a link with
             target=_top inside the frame cannot carry the visitor off
             onealgorithm.com. Reviewer finding, 2026-08-25. */
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
        </div>
      ) : (
        <div className="wk-modal-scroll">
          {/* Full-page capture. Scrolls inside the modal, so the visitor can
              read the whole site without loading it. */}
          <img
            src={`/work/${item.slug}-full.webp?v=${item.shot}`}
            alt={`Full page of the ${item.name} website`}
            width={1280}
            loading="eager"
            decoding="async"
          />
        </div>
      )}
    </dialog>
  );
}

export default function WorkCarousel() {
  const [open, setOpen] = useState<WorkItem | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const rail = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const r = rail.current;
    if (!r) return;
    const card = r.querySelector("li");
    const by = card ? card.getBoundingClientRect().width + 20 : r.clientWidth * 0.8;
    r.scrollBy({ left: by * dir, behavior: "smooth" });
  };

  return (
    <section className="wk" aria-labelledby="wk-h">
      <div className="wk-head">
        <div>
          <h2 id="wk-h" className="wk-title">Websites we built</h2>
          <p className="wk-lede">
            Open any of them here — the site loads inside this page, and you
            can click around it.
          </p>
        </div>
        {/* Arrows are a convenience on top of a rail that already scrolls by
            drag, wheel, trackpad and keyboard. Hidden from assistive tech for
            that reason: they add no capability, only comfort. */}
        <div className="wk-arrows" aria-hidden="true">
          <button type="button" onClick={() => nudge(-1)} tabIndex={-1}>‹</button>
          <button type="button" onClick={() => nudge(1)} tabIndex={-1}>›</button>
        </div>
      </div>

      <ul ref={rail} className="wk-rail">
        {WORK.map((w) => {
          /* ⛔ ONE string, used as both the visible label and the start of the
             accessible name. WCAG 2.5.3 "Label in Name" requires the accessible
             name to CONTAIN the visible text, and Lighthouse caught the first
             version failing it — partly because the visible text used a curly
             apostrophe and the aria-label a straight one, which reads as a
             match to a human and as a mismatch to a machine. Deriving both from
             this constant makes that class of bug impossible. */
          const vouchLabel = w.review && `${w.review.author}’s review of us`;
          return (
          <li key={w.slug} className="wk-card">
            {/* ⛔ The review link CANNOT go inside .wk-btn. That is a <button>,
                and an <a> inside a <button> is invalid HTML — the axe rule
                "nested-interactive" fails it and assistive tech reads the pair
                as one confused control. So it is a sibling, lifted into the
                card's bottom-right corner over the button's own padding, which
                puts it beside "Preview" without nesting anything. */}
            {w.review && (
              <span className="wk-vouch">
                {/* FTC 16 CFR 255.5: a family, financial or employment tie
                    between reviewer and business is a material connection and
                    belongs beside the endorsement, at readable size. */}
                {w.review.disclosure && (
                  <span className="wk-vouch-note">{w.review.disclosure}</span>
                )}
                <a
                  className="wk-stars"
                  href={w.review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${vouchLabel} — five stars on Google, opens in a new tab`}
                >
                  <span aria-hidden="true" className="wk-stars-glyph">★★★★★</span>
                  <span className="wk-stars-label">{vouchLabel}</span>
                </a>
              </span>
            )}
            <button type="button" className="wk-btn" onClick={() => setOpen(w)}>
              <span className="wk-shot">
                <picture>
                  {/* Phones see the site's own phone layout, not a desktop
                      capture shrunk to 340px.

                      ⛔ `?v={shot}` IS LOad-BEARING, do not tidy it away. These
                      filenames never change, and Cloudflare's zone Browser
                      Cache TTL stamps `max-age=14400` on them regardless of what
                      we send — so a re-captured card keeps showing the OLD
                      picture on any device that has seen it, for four hours,
                      while the edge happily serves the new one. Louis, after a
                      deploy on 2026-09-01: "I don't see any changes". The JS and
                      CSS are content-hashed and update fine; images are not.
                      ponytail: the version is the capture DATE, so two captures
                      on the SAME day still collide. Good enough — re-capturing
                      twice in one day is the rare case, and the alternative is
                      hashing every file. */}
                  <source media="(max-width: 639px)" srcSet={`/work/${w.slug}-phone.webp?v=${w.shot}`} width={780} height={1300} />
                <img
                  src={`/work/${w.slug}-card.webp?v=${w.shot}`}
                  alt={`The ${w.name} website`}
                  width={1280}
                  height={800}
                  /* Eager, not lazy: these sit directly under the hero and a
                     lazy image on a busy main thread showed as a blank navy
                     box for two seconds — Louis read it as "not rendering". */
                  loading="eager"
                  decoding="async"
                />
                </picture>
              </span>
              <span className="wk-meta">
                <span className="wk-name">{w.name}</span>
                <span className="wk-sector">{w.sector}</span>
                <span className="wk-note">{w.note}</span>
                <span className="wk-open">Preview</span>
              </span>
            </button>
          </li>
          );
        })}
      </ul>

      {open && <Preview item={open} onClose={close} />}
    </section>
  );
}
