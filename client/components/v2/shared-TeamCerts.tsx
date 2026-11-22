import * as React from "react";

/* "Our team is certified in" (2026-11-14, Louis: show the certifications on the pages that need them, as the company's,
 * not as one person's). These are INDIVIDUAL certifications held by people on the team (Google Skillshop 13 of 13,
 * Microsoft Advertising Search + Retail, Semrush Academy; passed 2026-11-10/11, each on the holder's LinkedIn), so the
 * wording is always "our team", never "One Algorithm is certified". Microsoft Display & Video passed later (Credly 11-19).
 * One table drives every page: the Google Ads, SEO and marketing pages (main and city) and the About page. */
/* verify: the ISSUER's own page for one of the row's credentials (Louis 2026-11-22: "I want it from the company",
 * never LinkedIn). Each opened 2026-11-22 and showed "Louis Rubino" + the credential. Rows without one wait for a
 * working issuer link (Credly badges need their public URL after Louis signs in to Credly). */
export type CertRow = { platform: string; detail: string; training?: true; verify?: string };  // training: badges/courses, not certifications

/* 2026-11-22 (Louis: "the certifications that I have on my LinkedIn on the website ... not under my name ... on the pages
 * that are needed"): rows re-checked against linkedin.com/in/louiscrubino/details/certifications (147 entries, read live
 * 2026-11-22); every row below is a certificate with a verification link there, except Microsoft Advertising (passed
 * 2026-11-11, Credly badges issued 2026-11-19, proof on file). Google Ads "Creative" removed: it is not on LinkedIn.
 * Course completions without a certificate (Google Cloud gen AI, AWS/Cisco/PMI training badges) are not listed. */
export const TEAM_CERTS: Record<"salesforce" | "googleAds" | "analytics" | "gmp" | "microsoft" | "semrush" | "linkedin" | "openai" | "anthropic" | "zendesk" | "intuit" | "pmi" | "aws" | "cisco" | "federal", CertRow> = {
  salesforce: { platform: "Salesforce", detail: "16 certified people, 55 certifications" },
  googleAds: { platform: "Google Ads", detail: "Search, Display, Video, Measurement, Apps, Shopping ads, Conversion Optimization", verify: "https://skillshop.credential.net/be992524-b9b9-46d0-8c35-73d30588c89e" },
  analytics: { platform: "Google Analytics", detail: "Google Analytics certification", verify: "https://skillshop.credential.net/805bcd33-981f-48b8-8206-61fa6199b71e" },
  gmp: { platform: "Google Marketing Platform", detail: "Campaign Manager 360, Search Ads 360, Display & Video 360", verify: "https://skillshop.credential.net/f39e862e-aacf-4160-8724-32f791b3ef67" },
  // 2026-11-22 from Louis's email (Credly, 11-19): Certified Expert plus the three exams it rests on.
  microsoft: { platform: "Microsoft Advertising", detail: "Certified Expert: Search, Retail, Display & Video" },
  semrush: { platform: "Semrush", detail: "Semrush Academy: SEO, local SEO, keyword research, content", verify: "https://static.semrush.com/academy/certificates/de64f1914e/louis-rubino_25.pdf" },
  linkedin: { platform: "LinkedIn Marketing", detail: "Advertising, Content and Creative Design, Measurement, Strategy" },
  openai: { platform: "OpenAI Academy", detail: "Agents and workflows, retrieval-augmented generation, evaluating and optimizing AI apps, Codex", verify: "https://oaiacademy.credential.net/f20ccc33-6aea-43c8-b0c0-449269960c52?key=305e8f05798c180485e290561cb0dbc985665a29960845f97dc4d2da679e3d90" },
  anthropic: { platform: "Anthropic Academy", detail: "Claude Code, Model Context Protocol, agent skills, subagents", verify: "https://verify.skilljar.com/c/6t9g3fierth3" },
  zendesk: { platform: "Zendesk", detail: "AI agents, Zendesk AI, Support, Messaging, Talk, Knowledge", verify: "https://verify.skilljar.com/c/tqfteebj5g8y" },
  // 2026-11-22 (Louis: "put them on whatever page will help ... spread out accordingly"): the rest of the LinkedIn list
  // that carries an issuer record. Training badges are named as badges, never as certifications.
  intuit: { platform: "Intuit QuickBooks", detail: "QuickBooks Online ProAdvisor, Intuit Enterprise Suite, QuickBooks Workforce" },
  pmi: { platform: "Project Management Institute", detail: "Agile and predictive project management, AI for project managers", training: true, verify: "https://www.credly.com/badges/b3d17e3f-4718-43e4-9a87-5af915ff00bb" },
  aws: { platform: "Amazon Web Services", detail: "12 knowledge badges: cloud essentials, compute, serverless, containers (ECS), storage, networking, migration, security", training: true },  // 12 Credly badges, email 2026-11-11
  cisco: { platform: "Cisco", detail: "Python Essentials, Networking Basics, Introduction to Cybersecurity, Data Science", training: true },
  federal: { platform: "Federal training", detail: "SBA federal contracting, Section 508 ICT buying (GSA), DCSA information security", training: true },
};

/** Which rows a page shows, by path (2026-11-22: web design pages show Analytics + Semrush). Salesforce pages show none (Salesforce badges sit with the named
 *  people on those pages already). `/services/marketing` is matched as a prefix so Salesforce Marketing Cloud is not. */
export function certsFor(pathname: string): CertRow[] {
  const p = pathname.replace(/\/$/, "");
  const c = TEAM_CERTS;
  if (p.startsWith("/services/google-ads")) return [c.googleAds, c.gmp, c.analytics, c.microsoft];
  if (p.startsWith("/services/seo")) return [c.semrush, c.analytics];
  if (p.startsWith("/services/marketing")) return [c.googleAds, c.gmp, c.analytics, c.microsoft, c.semrush, c.linkedin];
  // websites: every web design page (city pages too) and the website service pages; the main website page's hero is frozen
  if (p.startsWith("/services/web-design-") || ["/services/website-redesign", "/services/small-business-website-design", "/services/website-cost"].includes(p)) return [c.analytics, c.semrush];
  const BY_PATH: Record<string, CertRow[]> = {
    "/services/martech": [c.gmp, c.analytics, c.linkedin, c.zendesk],
    "/services/ai-automation": [c.openai, c.anthropic, c.intuit],
    "/services/application-development": [c.openai, c.anthropic, c.aws],
    "/services/it-consulting": [c.aws, c.cisco, c.pmi],
    "/services/operational-transformation-consulting": [c.pmi, c.openai],
    "/services/staff-augmentation": [c.pmi, c.cisco],
    "/services/zendesk": [c.zendesk],
    "/industries/ecommerce": [c.googleAds, c.microsoft, c.analytics],
    "/industries/marketing": [c.googleAds, c.semrush, c.linkedin],
    "/industries/government": [c.federal, c.pmi],
    "/capabilities": [c.federal, c.pmi, c.aws, c.cisco],
  };
  if (BY_PATH[p]) return BY_PATH[p];
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
        {rows.some((r) => r.training) ? "Team credentials" : "Certified team"}
      </p>
      <ul aria-label="Certifications held by our team" style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
        {rows.map((r) => {
          const l = LOGOS[r.platform];
          const title = `${r.platform}${r.training ? "" : " certified"}: ${r.detail}${r.verify ? " (opens the issuer's verification page)" : ""}`;
          const inner = (
            <>
              {l ? (
                <>
                  <img src={l.src} alt={r.training ? r.platform : `${r.platform} certified`} width={l.w} height={l.h} loading="eager" decoding="async"
                    style={{ height: l.h > l.w ? 44 : l.w / l.h > 5 ? 20 : 36, width: "auto" }} />
                  {l.name && <span aria-hidden="true">{l.name}</span>}
                </>
              ) : (
                <span>{r.platform}</span>
              )}
              <span className="sr-only">: {r.detail}</span>
            </>
          );
          return (
            <li key={r.platform} style={r.verify ? { display: "flex" } : tile} title={title}>
              {r.verify ? (
                <a href={r.verify} target="_blank" rel="noopener" style={{ ...tile, textDecoration: "none" }}>
                  {inner}
                  <span className="sr-only"> (verify, opens in a new tab)</span>
                </a>
              ) : inner}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
