import { Link } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, ServiceCards, SfButton } from "@/components/sf";
import { SERVICE_GROUPS } from "./home-services";

/* Body of /services below its hero: every service, grouped, one line each. */
export function ServicesIndexBody() {
  return (
    <SfPage base={[{ label: "Home", to: "/" }]} crumbs={[{ label: "Services" }]}>
      {SERVICE_GROUPS.map((g, i) => (
        <SmartSection key={g.id} id={g.id} tone={i % 2 ? "surface" : "paper"} heading={{ title: g.title, id: `h-${g.id}`, lede: g.lede }}>
          <ServiceCards className="sf-mt" items={g.items.map((s) => ({ to: s.to, title: s.title, body: s.lede, cta: "Open" }))} />
        </SmartSection>
      ))}
      <SmartSection id="unsure" tone="paper" grid>
        <SmartUnit className="sf-c7" headingId="h-unsure" title="Not sure which one?" lede="Tell us what you are trying to fix and we will point you to the right service.">
          <p className="sf-measure" style={{ marginTop: 14 }}>
            Looking by sector instead? See <Link className="sf-link" to="/industries">our industries</Link>.
          </p>
          <div className="sf-ctas" style={{ marginTop: 20 }}>
            <SfButton to="/contact?need=services" magnet cta="hub">Talk to us</SfButton>
          </div>
        </SmartUnit>
      </SmartSection>
    </SfPage>
  );
}
