import * as React from "react";

/* "Our team is certified in" (2026-11-14, Louis: show the certifications on the pages that need them, as the company's,
 * not as one person's). These are INDIVIDUAL certifications held by people on the team (Google Skillshop 13 of 13,
 * Microsoft Advertising Search + Retail, Semrush Academy; passed 2026-11-10/11, each on the holder's LinkedIn), so the
 * wording is always "our team", never "One Algorithm is certified". Microsoft Display & Video failed: not listed.
 * One table drives every page: the Google Ads, SEO and marketing pages (main and city) and the About page. */
export type CertRow = { platform: string; detail: string };

export const TEAM_CERTS: Record<"salesforce" | "googleAds" | "analytics" | "gmp" | "microsoft" | "semrush", CertRow> = {
  salesforce: { platform: "Salesforce", detail: "16 certified people, 53 certifications" },
  googleAds: { platform: "Google Ads", detail: "Search, Display, Video, Measurement, Apps, Creative, Shopping" },
  analytics: { platform: "Google Analytics", detail: "Google Analytics certification" },
  gmp: { platform: "Google Marketing Platform", detail: "Campaign Manager 360, Search Ads 360, Display & Video 360" },
  microsoft: { platform: "Microsoft Advertising", detail: "Search, Retail" },
  semrush: { platform: "Semrush", detail: "Semrush Academy: SEO, local SEO, keyword research, content" },
};

/** Which rows a page shows, by path. Web design and Salesforce pages show none (Salesforce badges sit with the named
 *  people on those pages already). `/services/marketing` is matched as a prefix so Salesforce Marketing Cloud is not. */
export function certsFor(pathname: string): CertRow[] {
  const p = pathname.replace(/\/$/, "");
  const c = TEAM_CERTS;
  if (p.startsWith("/services/google-ads")) return [c.googleAds, c.analytics, c.microsoft];
  if (p.startsWith("/services/seo")) return [c.semrush, c.analytics];
  if (p.startsWith("/services/marketing")) return [c.googleAds, c.gmp, c.analytics, c.semrush];
  return [];
}

/* Vendor logo files in public/certs (official marks via Wikimedia Commons, 2026-11-14). `name` is shown beside
 * marks that carry no wordmark of their own. Rows without a logo (Google Marketing Platform) render as a text tile. */
const LOGOS: Record<string, { src: string; w: number; h: number; name?: string }> = {
  "Google Ads": { src: "/certs/google-ads.svg", w: 251, h: 313 },
  "Google Analytics": { src: "/certs/google-analytics.png", w: 279, h: 96 },
  "Microsoft Advertising": { src: "/certs/microsoft-advertising.png", w: 96, h: 96, name: "Microsoft Advertising" },
  Semrush: { src: "/certs/semrush.svg", w: 195, h: 26 },
};

/** "Certified team" logo row under the hero buttons (2026-11-14, Louis: logos "right in your face"). White tiles so
 *  each vendor's colours read on the dark hero and on light pages alike. Renders nothing on pages with no rows. */
export function TeamCertsLine({ pathname, className = "", tone }: { pathname: string; className?: string; tone?: "dark" | "light" }) {
  const rows = certsFor(pathname);
  if (!rows.length) return null;
  const dark = tone === "dark";
  const tile: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 64, padding: "10px 16px",
    borderRadius: 12, background: "#fff", border: "1px solid rgba(15,23,42,.12)",
    boxShadow: dark ? "0 1px 2px rgba(0,0,0,.25)" : "none", color: "#0f172a", fontSize: 14, fontWeight: 600, lineHeight: 1.15,
  };
  return (
    <div className={`team-certs ${className}`} style={{ marginTop: tone ? 28 : 14 }}>
      <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.85)" : "#334155" }}>
        Certified team
      </p>
      <ul aria-label="Certifications held by our team" style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
        {rows.map((r) => {
          const l = LOGOS[r.platform];
          return (
            <li key={r.platform} style={tile} title={`${r.platform} certified: ${r.detail}`}>
              {l ? (
                <>
                  <img src={l.src} alt={`${r.platform} certified`} width={l.w} height={l.h} loading="eager" decoding="async"
                    style={{ height: l.h > l.w ? 44 : l.w / l.h > 5 ? 20 : 36, width: "auto" }} />
                  {l.name && <span aria-hidden="true">{l.name}</span>}
                </>
              ) : (
                <span>{r.platform}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
