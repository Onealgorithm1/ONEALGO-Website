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

/** One line under a call to action: "Our team is certified in: Google Ads (…) · Google Analytics · …". Renders nothing
 *  on pages with no matching rows. Inherits the text colour of where it sits (works on the night band and on light). */
export function TeamCertsLine({ pathname, className = "" }: { pathname: string; className?: string }) {
  const rows = certsFor(pathname);
  if (!rows.length) return null;
  return (
    <p className={`team-certs ${className}`} style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, opacity: 0.85 }}>
      <strong>Our team is certified in:</strong>{" "}
      {rows.map((r) => (r.detail && r.platform !== "Google Analytics" ? `${r.platform} (${r.detail})` : r.platform)).join(" · ")}
    </p>
  );
}
