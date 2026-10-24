import * as React from "react";

/*
 * FIG. 4 · three accessibility checks (design-contract-webdev.md U9). As the plate enters (`.in`): a focus ring
 * draws around a sample control (stroke-dashoffset, .9 s), a contrast pair prints its threshold label
 * (`4.5:1 · WCAG 2.1 AA`, clip-path in steps), and a heading tree H1 › H2 › H3 draws its connectors (.6 s,
 * staggered .1 s). The ring drawn here is the same 2 px ring the page shows on Tab; the unit's Go deeper says so.
 * Nothing in the plate is focusable. Reduced motion: final. Facts in the plate are also in the text.
 *
 *   <AccessibilityPlate />
 */
const F = { body: "IBM Plex Sans, Arial, sans-serif", mono: "JetBrains Mono, monospace", display: "Bricolage Grotesque, Arial, sans-serif" };

export function AccessibilityPlate({ fig = 4, id = `fig${fig}`, stamp = "Three checks · WCAG 2.1 AA · 4.5:1 text contrast", caption = "Keyboard focus you can see, text contrast at or above 4.5:1, and headings in order: three of the checks every build gets.", className = "" }: {
  fig?: number;
  id?: string;
  stamp?: string;
  caption?: React.ReactNode;
  className?: string;
}) {
  const dd = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;
  return (
    <figure className={`sf-stage sf-sweep wd-plate wd-a11y ${className}`} id={id} aria-labelledby={`${id}-cap`} data-reveal="">
      <div className="sf-stage-in">
        <svg viewBox="0 0 610 300" role="img" aria-labelledby={`${id}-t ${id}-d`} style={{ aspectRatio: "610/300" }}>
          <title id={`${id}-t`}>Three accessibility checks drawn as a plate</title>
          <desc id={`${id}-d`}>A sample button with a focus ring drawn around it; two text swatches labelled 4.5 to 1, WCAG 2.1 AA; and a heading tree H1, H2, H3 joined by lines.</desc>
          {/* 1 · focus ring around a sample control */}
          <g fontFamily={F.body}>
            <text x="40" y="40" fontFamily={F.mono} fontSize="10.5" fill="var(--ink3)" letterSpacing=".1em">01 · FOCUS VISIBLE</text>
            <rect x="40" y="58" width="150" height="44" rx="6" fill="var(--orange)" />
            <text x="115" y="85" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--ink)">Start a project</text>
            <rect className="draw" style={dd(0)} x="35" y="53" width="160" height="54" rx="8" fill="none" stroke="var(--navy)" strokeWidth="2" pathLength="1" />
            <text x="40" y="132" fontSize="12" fill="var(--ink3)">Press Tab: this ring is the page's own.</text>
          </g>
          {/* 2 · contrast pair */}
          <g fontFamily={F.body}>
            <text x="250" y="40" fontFamily={F.mono} fontSize="10.5" fill="var(--ink3)" letterSpacing=".1em">02 · TEXT CONTRAST</text>
            <rect x="250" y="58" width="150" height="44" fill="var(--paper)" stroke="var(--hair-s)" />
            <text x="262" y="86" fontSize="16" fontWeight="600" fill="var(--ink2)">Body text</text>
            <rect x="250" y="106" width="150" height="2" fill="var(--navy)" />
            <text className="type-in" style={dd(0.4)} x="250" y="132" fontFamily={F.mono} fontSize="12" fontWeight="600" fill="var(--ink)" letterSpacing=".04em">4.5:1 · WCAG 2.1 AA</text>
          </g>
          {/* 3 · heading tree */}
          <g fontFamily={F.body}>
            <text x="440" y="40" fontFamily={F.mono} fontSize="10.5" fill="var(--ink3)" letterSpacing=".1em">03 · STRUCTURE</text>
            <text x="440" y="76" fontFamily={F.display} fontSize="18" fontWeight="800" fill="var(--ink)">H1</text>
            <path className="draw" style={dd(0.2)} d="M448 82 V104 H468" fill="none" stroke="var(--navy)" strokeWidth="1.5" pathLength="1" />
            <text x="474" y="109" fontFamily={F.display} fontSize="15" fontWeight="700" fill="var(--ink)">H2</text>
            <path className="draw" style={dd(0.3)} d="M482 114 V136 H502" fill="none" stroke="var(--navy)" strokeWidth="1.5" pathLength="1" />
            <text x="508" y="141" fontFamily={F.display} fontSize="13" fontWeight="700" fill="var(--ink)">H3</text>
            <path className="draw" style={dd(0.4)} d="M448 82 V166 H468" fill="none" stroke="var(--navy)" strokeWidth="1.5" pathLength="1" />
            <text x="474" y="171" fontFamily={F.display} fontSize="15" fontWeight="700" fill="var(--ink)">H2</text>
          </g>
          {/* footer rule */}
          <path d="M40 210 H570" stroke="var(--hair-s)" strokeWidth="1" />
          <g fontFamily={F.body} fontSize="12" fill="var(--ink2)">
            <text x="40" y="236">Keyboard access · contrast · text alternatives · structure</text>
            <text x="40" y="258">Automated rules on every build, then a keyboard pass. No overlay.</text>
            <text x="570" y="258" textAnchor="end" fontFamily={F.mono} fontSize="10" fill="var(--ink3)" letterSpacing=".08em">WCAG 2.1 AA</text>
          </g>
        </svg>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}
