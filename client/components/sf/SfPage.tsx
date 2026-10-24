import * as React from "react";
import { Link } from "react-router-dom";
import "../../styles/sf.css";
import { initSfMotion } from "../../lib/sfMotion";
import { StructuredData, createBreadcrumbSchema } from "../StructuredData";

/**
 * Root of every Salesforce page body (inside <Layout>). Renders the `.sfv2` scope that client/styles/sf.css
 * hangs off, the breadcrumb (visible + BreadcrumbList schema), and starts the motion runtime after hydration.
 *
 *   <Layout>
 *     <SfPage crumbs={[{ label: "Salesforce", to: "/services/salesforce" }, { label: "Data migration" }]}>
 *       <SFHero … /> <SmartSection … /> … <DeskCTA … /> <FAQ … />
 *     </SfPage>
 *   </Layout>
 *
 * `crumbs` are the trail AFTER Home > Services (both are added). The last crumb is the current page.
 * Nothing renders below <SfPage>'s children: the site footer is Layout's.
 */
export function SfPage({ crumbs, children, className = "", base = [{ label: "Home", to: "/" }, { label: "Services", to: "/services" }] }: {
  crumbs: { label: string; to?: string }[]; children: React.ReactNode; className?: string;
  /** The trail BEFORE `crumbs`; Home > Services by default. /contact passes `[{ label: "Home", to: "/" }]`. */
  base?: { label: string; to: string }[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    return initSfMotion(ref.current);
  }, []);
  const trail = [...base, ...crumbs];
  return (
    <div ref={ref} className={`sfv2 ${className}`}>
      <StructuredData data={createBreadcrumbSchema(trail)} />
      <nav className="sf-crumbs" aria-label="Breadcrumb">
        <div className="sf-wrap">
          <ol className="sf-mono">
            {trail.map((c, i) =>
              i < trail.length - 1 && c.to ? (
                <li key={c.label}><Link to={c.to}>{c.label}</Link></li>
              ) : (
                <li key={c.label} aria-current="page">{c.label}</li>
              ),
            )}
          </ol>
        </div>
      </nav>
      {children}
    </div>
  );
}

/** Arrow glyph used by primary buttons and card links. */
export const ArrowIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);
/** Chevron for Go deeper / FAQ summaries. */
export const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);
/** External-link mark, placed after the text of any link that opens a new tab (link policy). */
export const ExtIcon = () => (
  <svg className="sf-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>
);

/**
 * The only way a Salesforce page links off-site: new tab, noopener, visible external mark, "(new tab)" in the
 * accessible name. Never for a primary CTA. Never to an api.* or data URL (scripts/sf-link-policy-check.mjs fails the build).
 *   <ExtLink href="https://appexchange.salesforce.com/…">Open on salesforce.com</ExtLink>
 */
export function ExtLink({ href, children, className = "sf-link" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ExtIcon />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Primary button. In-site only (`#start`, `/services/…`, `tel:`). `magnet` opts the button into the GSAP
 * magnetic hover (<= 2 per page: the hero and the form). `cta` is the GA4 placement (data-cta).
 *   <SfButton href="#start" magnet cta="hero">Book the free health check</SfButton>
 */
export function SfButton({ href, to, children, magnet, cta, ghost, className = "", type, onClick, disabled }: {
  href?: string; to?: string; children: React.ReactNode; magnet?: boolean; cta?: string; ghost?: boolean; className?: string; type?: "submit" | "button";
  /** Button variant only (the contact form's submit, "Load the map", "Send another message"). */
  onClick?: () => void; disabled?: boolean;
}) {
  const cls = `sf-btn ${ghost ? "sf-btn-ghost" : "sf-btn-primary"} ${className}`;
  const inner = <>{children}{!ghost && <ArrowIcon />}</>;
  const magnetAttr = magnet ? { "data-magnet": "" } : {};
  if (to) return <Link to={to} className={cls} data-cta={cta} data-primary={ghost ? undefined : ""} {...magnetAttr}>{inner}</Link>;
  if (href) return <a href={href} className={cls} data-cta={cta} data-primary={ghost ? undefined : ""} {...magnetAttr}>{inner}</a>;
  return <button type={type || "button"} className={cls} data-cta={cta} onClick={onClick} disabled={disabled} aria-busy={disabled || undefined} {...magnetAttr}>{inner}</button>;
}
