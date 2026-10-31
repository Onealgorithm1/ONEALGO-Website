import * as React from "react";
import { SmartSection } from "@/components/sf";
import { GhostNum } from "./industries-Visuals";

/* The three-step growth path (Louis 2026-10-31, oa-growth-strategy-and-page-rules): results without ad spend first.
   Used on the home page and /services; the dental card on /industries describes the same path. Approach copy only: no results claimed. */
const STEPS = [
  { t: "The website and the message", p: "A site that says plainly what you do, for whom and what to do next. Everything else rests on it." },
  { t: "Traction without ad spend", p: "SEO, blog posts, email campaigns and site authority, so people find you and keep coming back." },
  { t: "Automation", p: "Social posts, Google Business Profile posts, and review requests and replies, run on a schedule." },
];

export function GrowthPath({ id = "growth", tone = "night" }: { id?: string; tone?: "paper" | "surface" | "night" }) {
  return (
    <SmartSection id={id} tone={tone} className="ind-sec" heading={{ id: `h-${id}`, kicker: "Our approach", title: "Results before ad spend", lede: "Three steps, in this order. Ads come after organic traction." }}>
      <GhostNum slow>03</GhostNum>
      <ol className="ind-row3" style={{ listStyle: "none", padding: 0, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {STEPS.map((s, i) => (
          <li key={s.t} className="ind-lift" data-tilt="">
            <span className="ind-n">{`Step ${i + 1}`}</span>
            <h3 className="sf-h3" style={{ marginTop: 10 }}>{s.t}</h3>
            <p style={{ fontWeight: 400, fontSize: 16 }}>{s.p}</p>
          </li>
        ))}
      </ol>
    </SmartSection>
  );
}
