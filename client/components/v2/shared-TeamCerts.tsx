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

/** "Certified team" badge row under the hero buttons (2026-11-14, Louis: "right in your face"). Badges are styled text,
 *  NOT vendor logos, on purpose: Google's brand rules forbid its logo to anyone outside a formal partner program and
 *  allow an accurate plain-text reference (about.google/brand-resource-center/guidance/partnerships, read 2026-11-14).
 *  ponytail: one inline-styled component; if a vendor partner badge is ever earned, swap that pill for its official snippet.
 *  Renders nothing on pages with no matching rows. */
export function TeamCertsLine({ pathname, className = "", tone }: { pathname: string; className?: string; tone?: "dark" | "light" }) {
  const rows = certsFor(pathname);
  if (!rows.length) return null;
  const dark = tone === "dark";
  const ink = dark ? "#fff" : "#0f172a";
  const pill: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999,
    border: `1px solid ${dark ? "rgba(255,255,255,.35)" : "rgba(15,23,42,.18)"}`,
    background: dark ? "rgba(255,255,255,.08)" : "#fff", color: ink, fontSize: 15, fontWeight: 600, lineHeight: 1.2,
  };
  return (
    <div className={`team-certs ${className}`} style={{ marginTop: tone ? 28 : 14 }}>
      <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.85)" : "#334155" }}>
        Certified team
      </p>
      <ul aria-label="Certifications held by our team" style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
        {rows.map((r) => (
          <li key={r.platform} style={pill} title={r.detail}>
            <svg aria-hidden="true" className="text-oa-orange shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 2.1 3.2-.3.9 3.1 2.8 1.6-1.2 3 1.2 3-2.8 1.6-.9 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.9-3.1L2.7 15.5l1.2-3-1.2-3 2.8-1.6.9-3.1 3.2.3z" /><path d="M8.5 12l2.3 2.3 4.7-4.7" /></svg>
            {r.platform} certified
          </li>
        ))}
      </ul>
    </div>
  );
}
