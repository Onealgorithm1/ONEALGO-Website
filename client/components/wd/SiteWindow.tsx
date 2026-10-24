import * as React from "react";
import type { WorkItem } from "../../data/work";
import { siteHost } from "../WorkCarousel";
import { ExtIcon } from "../sf/SfPage";

/*
 * THE LIVE-SITE WINDOW (signature 2, design-contract-webdev.md §1.9, U1/U4/U5). A real client site framed like
 * a stage: radius 0, hairline, the 9px ticks, a mono stamp `LIVE SITE · host · OPENS HERE`. Rest image = our own
 * capture (scripts/work-second-screen.mjs: AVIF + WebP, 1280x800). Hover on a fine pointer at >= 1024: the tall
 * capture (screens 1+2) scrolls up one screen inside the frame; it is a CSS background set ONLY inside that media
 * query, so a phone never fetches it. Click Preview: the caller opens the existing in-page <dialog> (WorkCarousel's
 * `Preview`) with the live site in a sandboxed iframe (Atlas: the full-page capture). The domain stays a real,
 * crawlable link (the crawler-association reason in WorkCarousel.tsx). The review button opens an in-site
 * EvidenceDialog the page renders (`#ev-{reviewDialogId}`), never Google directly.
 *
 *   <SiteWindow item={WORK[0]} eager onPreview={(item, opener) => setOpen({ item, opener })} reviewDialogId="review-phantom" />
 *   <SiteWindow item={WORK[0]} screen="second" size="wide" sweep onPreview={…} />
 */
export function SiteWindow({ item, screen = "card", size = "grid", eager, sweep, onPreview, reviewDialogId, className = "", headingId }: {
  item: WorkItem;
  /** `card` = the first screen (U1); `second` = the screen below the fold (U4/U5), so one capture never appears twice. */
  screen?: "card" | "second";
  size?: "grid" | "wide" | "third";
  /** Windows 1-3 of U1 sit under the hero: eager. Everything else lazy. */
  eager?: boolean;
  /** Wire sweep on entry (CSS view() timeline). Never on a window that can be in the first viewport. */
  sweep?: boolean;
  onPreview: (item: WorkItem, opener: HTMLElement) => void;
  /** Id of the review EvidenceDialog on the page (without the `ev-` prefix). Shown only when the item has a review. */
  reviewDialogId?: string;
  className?: string;
  headingId?: string;
}) {
  const host = siteHost(item.url);
  const base = screen === "second" ? "screen2" : "card";
  const v = `?v=${item.shot}`;
  const src = (name: string, ext: string) => `/work/${item.slug}-${name}.${ext}${v}`;
  const hid = headingId ?? `win-${item.slug}${screen === "second" ? "-2" : ""}`;
  const tall = { ["--tall" as string]: `image-set(url("${src("tall", "avif")}") type("image/avif"), url("${src("tall", "webp")}") type("image/webp"))` } as React.CSSProperties;
  const vouch = item.review && `${item.review.author}’s review of us`;
  return (
    <figure className={`sf-stage wd-window wd-window-${size}${sweep ? " sf-sweep" : ""} ${className}`} aria-labelledby={hid} data-reveal="" data-tilt="" data-window={item.slug}>
      <div className="sf-stage-in">
        <div className="wd-shot wd-cut">
          <picture>
            <source type="image/avif" srcSet={src(base, "avif")} />
            <img src={src(base, "webp")} alt={`The ${item.name} website, built by OneAlgorithm`} width={1280} height={800} loading={eager ? "eager" : "lazy"} decoding="async" {...(eager ? { fetchpriority: "high" } : {})} />
          </picture>
          <span className="wd-tall" style={tall} aria-hidden="true" />
        </div>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="wd-window-body">
        <h3 className="sf-h3" id={hid}>{item.name}</h3>
        <p className="wd-sector sf-mono">{item.sector}</p>
        <p className="wd-note">{item.note}</p>
        <div className="wd-window-actions">
          <button type="button" className="sf-btn sf-btn-primary wd-preview" data-preview={item.slug} onClick={(e) => onPreview(item, e.currentTarget)}>Preview</button>
          {item.review && reviewDialogId && (
            <span className="wd-vouch">
              <button type="button" className="sf-verify wd-review" data-evidence={reviewDialogId} aria-haspopup="dialog">
                <span aria-hidden="true" className="wd-stars">★★★★★</span> {vouch}
              </button>
              {/* FTC 16 CFR 255.5: a material connection is disclosed beside the endorsement, in the line of sight. */}
              {item.review.disclosure && <span className="wd-vouch-note sf-mono">{item.review.disclosure}</span>}
            </span>
          )}
          <a className="sf-link wd-domain" href={item.url} target="_blank" rel="noopener">
            {host}<ExtIcon /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="stamp" aria-hidden="true">
        <span>Live site · {host}{screen === "second" ? " · second screen" : ""} · opens here</span>
        {!item.embed && <span>Screenshot · {item.shot}</span>}
      </div>
    </figure>
  );
}
