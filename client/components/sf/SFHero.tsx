import * as React from "react";
import { SfButton } from "./SfPage";
import { Verify } from "./EvidenceDialog";
import { SF_PHONE } from "../../data/salesforceShared";
import { SF_CERTIFICATIONS, SF_CERTIFIED_PEOPLE, SF_PLATFORM_CERTS, SF_VERIFIED_LABEL } from "../../data/salesforceProof";
import { sfCityFiles, type SfCityHero } from "../../data/sfCityHeroes";
import { SF_PEOPLE_V2, badgeSrc, type SfBadge } from "../../data/sfPeople";

/** Scrolling strip of the official certification logos our people hold (Louis 2026-10-24: near the top, keeps
 *  scrolling). Credentials stay attributed to the PEOPLE in the label; no dates. Reduced motion: static row. */
function CertMarquee() {
  const seen = new Set<string>();
  const badges: SfBadge[] = [];
  for (const p of SF_PEOPLE_V2) for (const b of p.badges) if (!seen.has(b.slug)) { seen.add(b.slug); badges.push(b); }
  const row = (hidden: boolean) => (
    <ul className="sf-marquee-row" aria-hidden={hidden || undefined}>
      {badges.map((b) => <li key={b.slug}><img src={badgeSrc(b)} alt={hidden ? "" : b.name} width={80} height={78} loading="lazy" decoding="async" /></li>)}
    </ul>
  );
  return (
    <section className="sf-marquee" aria-label="Salesforce certifications held by Sreenivas Amirisetti and Swapna Amirisetti">
      <div className="sf-marquee-track">{row(false)}{row(true)}</div>
    </section>
  );
}

/**
 * The hero: text-led. The H1 is the LCP element and never animates; nothing above the fold moves until 250ms
 * after first paint, and then only scene parts. Budget at 390: H1 (<= 9 words), one-sentence lede, ONE primary
 * button, the phone as a text link, <= 60 words.
 *
 * Variant A, staged scene (service pages, hub): pass `figure` (one of the illus components with `hero`), 6/6 by
 * default (the layered desk needs ~650px); `split="7/5"` for the narrower scenes.
 *   <SFHero kicker={<>Salesforce Consulting Partner<span className="sf-kicker-loc"> · Malvern, PA</span></>}
 *     title="Salesforce consulting and implementation services" lede="…one sentence…"
 *     figure={<HubComposition fig={1} hero className="sf-hero-fig" />} proof />
 *
 * Variant B, city photo (city pages): pass `photo` (from SF_CITY_HEROES[slug]); the photo is the LCP: eager,
 * fetchpriority high, AVIF + WebP, width/height, focal point as object-position, never animated. The credit chip
 * ("Photo: King of Hearts · CC BY-SA 3.0") opens the credits dialog `ev-photo-credit` (render <PhotoCreditDialog>).
 *   <SFHero title="Salesforce consultants in Dallas" lede="…" photo={SF_CITY_HEROES.dallas} />
 */
export function SFHero({ kicker, title, lede, primary = { href: "#start", label: "Book the free health check" }, phone = true, proof = false, figure, photo, split = "6/6", id = "h1" }: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  lede: React.ReactNode;
  primary?: { href?: string; to?: string; label: string };
  /** Phone as a text link beside the button (never a second button on phones). */
  phone?: boolean;
  /** The hero proof line: 16 / 53 / 38 in display numerals + Verify (the AppExchange dialog must be on the page). */
  proof?: boolean;
  figure?: React.ReactNode;
  photo?: SfCityHero;
  split?: "6/6" | "7/5";
  id?: string;
}) {
  const files = photo ? sfCityFiles(photo.slug) : null;
  const cls = ["sf-hero", split === "7/5" ? "sf-hero-75" : "", photo ? "sf-hero-photo" : "", !figure && !photo ? "sf-hero-wide" : ""].filter(Boolean).join(" ");
  return (
    <>
    <section className={cls} aria-labelledby={id}>
      <div className="sf-wrap sf-grid">
        <div className="sf-hero-text">
          <img className="sf-hero-logo" src="/media/salesforce/salesforce-logo.svg" alt="Salesforce" width={92} height={64} decoding="async" />
          {kicker && <p className="sf-kicker">{kicker}</p>}
          <h1 className="sf-h1" id={id}>{title}</h1>
          <p className="sf-lede sf-measure" data-lede="">{lede}</p>
          <div className="sf-ctas">
            <SfButton href={primary.href} to={primary.to} magnet cta="hero">{primary.label}</SfButton>
            {phone && <a className="sf-phone" href={SF_PHONE.href} data-cta="hero">Call {SF_PHONE.display}</a>}
          </div>
        </div>
        {figure}
        {photo && files && (
          <figure className="sf-hero-fig sf-stage sf-photo" style={{ "--fx": `${photo.focal.x}%`, "--fy": `${photo.focal.y}%` } as React.CSSProperties}>
            <picture>
              <source type="image/avif" srcSet={sfHeroAvifSrcset(files)} sizes="(min-width: 1024px) 50vw, 100vw" />
              <source type="image/webp" srcSet={`${files.webp800} 800w, ${files.webp1600} 1600w, ${files.webp2400} 2400w`} sizes="(min-width: 1024px) 50vw, 100vw" />
              <img src={files.webp1600} alt={photo.alt} width={photo.width} height={photo.height} loading="eager" decoding="async" {...({ fetchpriority: "high" } as any)} />
            </picture>
            <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
          </figure>
        )}
        {proof && (
          <p className="sf-proof sf-mono sf-hero-proof">
            Salesforce's AppExchange record of us: <b>{SF_CERTIFIED_PEOPLE}</b> certified people · <b>{SF_CERTIFICATIONS}</b> certifications · <b>{SF_PLATFORM_CERTS}</b> Platform · read {SF_VERIFIED_LABEL}{" "}
            <Verify id="appexchange" />
          </p>
        )}
      </div>
    </section>
    <CertMarquee />
    </>
  );
}

/** Preload hints for a city hero photo: pass to useSEO({ preloadImage }) via sfCityFiles(slug).avif1600. */
export { sfCityFiles };

/** The city hero's AVIF candidates; also the preload's imagesrcset so the preload and the <picture> pick the same file
 *  (800w added at integrate: a phone fetched the 1600w file, 114 KB on Philadelphia, as its LCP image). */
export const SF_HERO_SIZES = "(min-width: 1024px) 50vw, 100vw";
export function sfHeroAvifSrcset(files: { avif800: string; avif1600: string; avif2400: string }) {
  return `${files.avif800} 800w, ${files.avif1600} 1600w, ${files.avif2400} 2400w`;
}
