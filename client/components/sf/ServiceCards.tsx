import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "./SfPage";

export type ServiceCard = {
  to: string;
  /** H3, the exact service name. */
  title: string;
  /** One line. */
  body: string;
  /** Scene detail image under /media/salesforce/scenes (hidden on phones, lazy, "Sample data" chip). */
  scene?: { src: string; width: number; height: number };
  kicker?: string;
  /** Link verb; default "Read more" is replaced per card ("Book the week", "Read the guide"). */
  cta?: string;
};

/**
 * The 4 + 3 service card grid: the first card spans two columns and is navy; each card opens on a legible detail of
 * its staged scene (scrolls one line on hover), tilts <= 3deg on fine pointers, draws its top hairline on hover/focus.
 *   <ServiceCards items={HUB_SERVICE_CARDS} />
 */
export function ServiceCards({ items, className = "" }: { items: ServiceCard[]; className?: string }) {
  return (
    <ul className={`sf-cards ${className}`}>
      {items.map((c) => (
        <li key={c.to}>
          <Link className="sf-card" to={c.to} data-tilt="">
            {c.scene && (
              <span className="sf-card-scene" aria-hidden="true">
                <img src={c.scene.src} alt="" width={c.scene.width} height={c.scene.height} loading="lazy" decoding="async" />
                <span className="sf-scene-chip">Sample data</span>
              </span>
            )}
            {c.kicker && <p className="sf-kicker">{c.kicker}</p>}
            <h3 className="sf-h3">{c.title}</h3>
            <p>{c.body}</p>
            <span className="sf-arrow">{c.cta ?? "Read more"} <ArrowIcon size={16} /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const SCENES = "/media/salesforce/scenes";
/** The hub's seven cards (structure-spec.md §4 row 2: exact names; MS names "development", staff augmentation names "customization"). */
export const HUB_SERVICE_CARDS: ServiceCard[] = [
  { to: "/services/salesforce-health-check", kicker: "Free · one week", title: "Free one-week Salesforce health check", body: "Licenses, data, automation, permissions and integrations, in a written list ranked by what to fix first.", scene: { src: `${SCENES}/health-check.webp`, width: 1320, height: 300 }, cta: "Book the week" },
  { to: "/services/salesforce-data-migration", title: "Salesforce data migration services", body: "QuickBase, Kissflow, another CRM or another org, reconciled before go-live.", scene: { src: `${SCENES}/data-migration.webp`, width: 680, height: 340 } },
  { to: "/services/salesforce-integration", title: "Salesforce integration services", body: "SAP and other ERPs: which system owns each record, agreed before anything is built.", scene: { src: `${SCENES}/integration.webp`, width: 680, height: 340 } },
  { to: "/services/salesforce-managed-services", title: "Salesforce managed services and development", body: "Weekly administration and development, with hours reported every week.", scene: { src: `${SCENES}/managed-services.webp`, width: 680, height: 340 } },
  { to: "/services/salesforce-marketing-cloud-consulting", title: "Salesforce Marketing Cloud consulting", body: "Support for Marketing Cloud accounts already running.", scene: { src: `${SCENES}/marketing-cloud.webp`, width: 680, height: 340 } },
  { to: "/services/staff-augmentation", title: "Salesforce staff augmentation", body: "Salesforce people for configuration and customization, added to your team for as long as you need them.", scene: { src: `${SCENES}/staff-augmentation.webp`, width: 680, height: 340 } },
  { to: "/services/salesforce-implementation-cost", title: "Salesforce implementation cost guide", body: "Published market ranges, named and dated, before licenses.", scene: { src: `${SCENES}/cost-guide.webp`, width: 680, height: 340 }, cta: "Read the guide" },
];
