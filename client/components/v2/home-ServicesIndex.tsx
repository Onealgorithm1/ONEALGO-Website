import { Link } from "react-router-dom";
import { SfPage, SmartSection, SmartUnit, ServiceCards, SfButton, StageRail, ArrowIcon } from "@/components/sf";
import { SERVICE_GROUPS } from "./home-services";
import { IndStyles, GhostNum, SystemsPlate, PROCESS_STATIONS } from "./industries-Visuals";

/* Body of /services below its hero: every service, grouped, one line each. Round 2: a plate bridges the hero,
   then each group takes a different layout (cards, ledger rows, night tiles, cards, reversed ledger), a rail, the CTA last. */

type G = (typeof SERVICE_GROUPS)[number];
const LAYOUT = ["cards", "ledger", "tiles", "cards", "ledger-r"] as const;

function Ledger({ g, cls }: { g: G; cls: string }) {
  return (
    <div className={`sf-ledger ${cls}`}>
      {g.items.map((s) => (
        <Link key={s.to} className="sf-lrow" to={s.to}>
          <h3 className="sf-h4">{s.title}</h3>
          <span>{s.lede}</span>
        </Link>
      ))}
    </div>
  );
}

export function ServicesIndexBody() {
  return (
    <SfPage base={[{ label: "Home", to: "/" }]} crumbs={[{ label: "Services" }]}>
      <IndStyles />
      <SmartSection id="plate" tone="paper" compact>
        <SystemsPlate fig={1} stamp="One team, start to finish" title="Diagram: from what you run today to a supported result"
          left={["Websites and search", "Apps and portals", "Salesforce and CRM"]} hub={["One team", "Start to run-state"]}
          right={["Built", "Run", "Supported 24/7"]}
          caption="A diagram of how the services fit: the work you need on the left, one team in the middle, a supported result on the right." />
      </SmartSection>

      {SERVICE_GROUPS.map((g, i) => {
        const l = LAYOUT[i % LAYOUT.length];
        const hid = `h-${g.id}`;
        if (l === "cards") {
          return (
            <SmartSection key={g.id} id={g.id} tone={i % 2 ? "surface" : "paper"} heading={{ title: g.title, id: hid, lede: g.lede }}>
              <ServiceCards className="sf-mt" items={g.items.map((s) => ({ to: s.to, title: s.title, body: s.lede, cta: "Open" }))} />
            </SmartSection>
          );
        }
        if (l === "tiles") {
          return (
            <SmartSection key={g.id} id={g.id} tone="night" className="ind-sec" heading={{ title: g.title, id: hid, lede: g.lede }}>
              <GhostNum slow>{String(i + 1).padStart(2, "0")}</GhostNum>
              <ul className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
                {g.items.map((s, j) => (
                  <li key={s.to} style={{ display: "flex" }}>
                    <Link to={s.to} className="ind-lift" data-tilt="" style={{ display: "block", width: "100%", textDecoration: "none" }}>
                      <span className="ind-n">{String(j + 1).padStart(2, "0")}</span>
                      <h3 className="sf-h3" style={{ marginTop: 10 }}>{s.title}</h3>
                      <p style={{ fontWeight: 400, fontSize: 16 }}>{s.lede}</p>
                      <span style={{ marginTop: 14, display: "inline-flex", gap: 8, alignItems: "center", color: "var(--orange)", fontWeight: 600 }}>Open <ArrowIcon size={16} /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </SmartSection>
          );
        }
        const rev = l === "ledger-r";
        return (
          <SmartSection key={g.id} id={g.id} tone={i % 2 ? "surface" : "paper"} className="ind-sec" labelledBy={hid}>
            <GhostNum slow={rev}>{String(i + 1).padStart(2, "0")}</GhostNum>
            <div className="sf-grid" style={{ alignItems: "start" }}>
              {rev && <Ledger g={g} cls="sf-c8" />}
              <SmartUnit className="sf-c4" headingId={hid} title={g.title} lede={g.lede} measure={false} />
              {!rev && <Ledger g={g} cls="sf-c8" />}
            </div>
          </SmartSection>
        );
      })}

      <SmartSection id="process" tone="paper" heading={{ title: "How a project runs", id: "h-process", lede: "Four steps, and the same people in each one." }}>
        <StageRail className="sf-mt" fig={2} stations={PROCESS_STATIONS} sample={false}
          title="Four stages: discover, design, deliver, support"
          desc="A rail runs through four stations: discover where the work breaks, design a plan agreed in writing, deliver in short cycles, then support it with hypercare and 24/7 support."
          stamp="How a project runs"
          caption="We find where the work breaks before anyone proposes a system, then stay on after go-live." />
      </SmartSection>

      <SmartSection id="unsure" tone="night" grid>
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
