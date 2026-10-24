import * as React from "react";

/*
 * FIG. 5 · what runs where after launch (design-contract-webdev.md U10). Four nodes REPO · DNS · HOST · DOCS, each
 * labelled YOUR ACCOUNT, joined by connectors that draw left to right once as the plate enters (`.in` from the
 * runtime, stroke-dashoffset transitions in wd.css); a bottom row HTTPS · HEADERS stamps in after the last line.
 * Hovering or focusing a unit row with data-hl-for="fig5" data-hl-key="repo|dns|host|docs" highlights that node
 * (the runtime sets data-hl on this figure). Every fact in the plate is also in the unit's text.
 *
 *   <HandoverPlate />
 *   <h3 data-hl-for="fig5" data-hl-key="host">Hosting and domain in your name</h3>   (on the unit side)
 */
const NODES = [
  { k: "repo", label: "REPO", sub: "source code" },
  { k: "dns", label: "DNS", sub: "domain" },
  { k: "host", label: "HOST", sub: "deployment" },
  { k: "docs", label: "DOCS", sub: "README, scripts" },
];
const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace" };

export function HandoverPlate({ fig = 5, id = `fig${fig}`, stamp = "What runs where after launch · your accounts", caption = "Repository, domain, hosting and documentation sit in accounts you hold; HTTPS and security headers are set at launch.", className = "", rows = ["HTTPS", "HEADERS"] }: {
  fig?: number;
  id?: string;
  stamp?: string;
  caption?: React.ReactNode;
  className?: string;
  /** The bottom stamp row. "BACKUPS" joins only after Louis confirms backups are standard (structure-spec §4.2 #10). */
  rows?: string[];
}) {
  const X = [50, 190, 330, 470], W = 90, Y = 70, H = 64;
  return (
    <figure className={`sf-stage sf-sweep wd-plate wd-handover ${className}`} id={id} aria-labelledby={`${id}-cap`} data-reveal="">
      <div className="sf-stage-in">
        <svg viewBox="0 0 610 250" role="img" aria-labelledby={`${id}-t ${id}-d`} style={{ aspectRatio: "610/250" }}>
          <title id={`${id}-t`}>Wiring diagram of a handed-over website</title>
          <desc id={`${id}-d`}>Four boxes in a row, repository, DNS, hosting and documentation, each marked your account and joined by a line; under them a row reading HTTPS and headers.</desc>
          {NODES.slice(0, -1).map((n, i) => (
            <path key={n.k} className="draw" style={{ ["--d" as string]: `${i * 0.12}s` } as React.CSSProperties} d={`M${X[i] + W} ${Y + H / 2} H${X[i + 1]}`} fill="none" stroke="var(--orange)" strokeWidth="2" pathLength="1" />
          ))}
          {NODES.map((n, i) => (
            <g key={n.k} className={`hp-node n-${n.k}`} fontFamily={F.body}>
              <rect x={X[i]} y={Y} width={W} height={H} fill="var(--surface)" stroke="var(--navy)" strokeWidth="1.5" />
              <text x={X[i] + W / 2} y={Y + 26} textAnchor="middle" fontFamily={F.mono} fontSize="13" fontWeight="600" fill="var(--ink)" letterSpacing=".08em">{n.label}</text>
              <text x={X[i] + W / 2} y={Y + 44} textAnchor="middle" fontSize="11" fill="var(--ink3)">{n.sub}</text>
              <text x={X[i] + W / 2} y={Y + H + 18} textAnchor="middle" fontFamily={F.mono} fontSize="9.5" fill="var(--orange-text)" letterSpacing=".12em">YOUR ACCOUNT</text>
            </g>
          ))}
          <g className="stamp-in" style={{ ["--d" as string]: "0.5s" } as React.CSSProperties} fontFamily={F.mono}>
            <path d="M50 190 H560" stroke="var(--hair-s)" strokeWidth="1" />
            {rows.map((r, i) => (
              <g key={r} transform={`translate(${50 + i * 110} 206)`}>
                <rect width="96" height="26" fill="var(--tint)" stroke="var(--navy)" strokeWidth="1" />
                <text x="48" y="17" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--navy)" letterSpacing=".1em">{r}</text>
              </g>
            ))}
            <text x="560" y="223" textAnchor="end" fontSize="10" fill="var(--ink3)" letterSpacing=".08em">SET AT LAUNCH</text>
          </g>
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}
