import { Link } from "react-router-dom";
import { SmartSection } from "@/components/sf";
import { SVC_PLACES, type SvcPlaceRow } from "../../data/svc-local/index";

/** "<Service> by city" on a service hub: every nationwide place page for that service (states first), from svc-local/index.ts. */
export function ServiceCities({ svc, title, lede }: { svc: SvcPlaceRow["svc"]; title: string; lede: string }) {
  const rows = SVC_PLACES.filter((r) => r.svc === svc).sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === "state" ? -1 : 1));
  if (!rows.length) return null;
  return (
    <SmartSection id="by-city" tone="surface" heading={{ id: "h-by-city", title, lede }}>
      <div className="sf-ledger">
        {rows.map((r) => (
          <Link key={r.path} className="sf-lrow" to={r.path}>
            <h3 className="sf-h4">{r.name}</h3>
            <span className="sf-mono">{r.kind === "state" ? "State" : r.state}</span>
          </Link>
        ))}
      </div>
    </SmartSection>
  );
}
