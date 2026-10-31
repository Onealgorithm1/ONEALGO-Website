import * as React from "react";
import { Plate, C, F } from "./marketing-Visuals";

/* Application development plates (revision round 2). Diagrams, not screenshots, and none is presented as client work. */
const D = (d: number) => ({ "--d": `${d}s` } as React.CSSProperties);

function Box({ x, y, w, h, title, sub, mine, d = 0 }: { x: number; y: number; w: number; h: number; title: string; sub: string; mine?: boolean; d?: number }) {
  return (
    <g className="node rise" style={D(d)}>
      <rect className="bx" x={x} y={y} width={w} height={h} fill={mine ? "#fff" : C.paper} stroke={mine ? C.navy : C.ink3} strokeWidth="1.5" strokeDasharray={mine ? undefined : "5 4"} />
      <text x={x + 16} y={y + h / 2 - 3} fontFamily={F.body} fontSize="16" fontWeight="600" fill={C.ink}>{title}</text>
      <text x={x + 16} y={y + h / 2 + 16} fontFamily={F.mono} fontSize="11" fill={mine ? C.navy : C.ink3}>{sub}</text>
      <g transform={`translate(${x + w - 34} ${y + h / 2 - 9})`}>
        {mine ? <path className="draw" d="M2 9 l5 5 l10 -11" fill="none" stroke={C.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> : <text fontFamily={F.display} fontSize="22" fontWeight="800" fill={C.ink3}>?</text>}
      </g>
    </g>
  );
}

/** Hero hand-off: who holds the keys when ownership is left to the end versus set up on day one. */
export function OwnershipPlate({ fig }: { fig: number }) {
  const rows: [string, string, string, string][] = [
    ["Source code", "a developer's personal repository", "your company's repository", "01"],
    ["Cloud accounts", "the contractor's billing and login", "your name, your billing", "02"],
    ["Store accounts", "whoever registered first", "your company, signing keys with you", "03"],
  ];
  const d = (
    <g fontFamily={F.body}>
      <g className="par-b" aria-hidden="true"><path d="M0 60 H1200 M0 150 H1200 M0 240 H1200 M0 330 H1200" stroke={C.hair} strokeDasharray="2 8" /></g>
      <text x="40" y="38" fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill={C.ink3}>WHEN OWNERSHIP IS LEFT TO THE END</text>
      {rows.map(([t, a], i) => <Box key={t} x={40} y={58 + i * 86} w={470} h={68} title={t} sub={a} d={i * 0.07} />)}
      <g className="par-f"><g className="rise" style={D(0.3)}><circle cx="600" cy="170" r="26" fill={C.navy} /><text x="600" y="176" textAnchor="middle" fontFamily={F.mono} fontSize="13" fill="#fff" letterSpacing=".06em">VS</text></g></g>
      <text x="690" y="38" fontFamily={F.mono} fontSize="12" letterSpacing=".1em" fill={C.amber}>HOW WE SET IT UP · DAY ONE</text>
      {rows.map(([t, , b], i) => <Box key={t} x={690} y={58 + i * 86} w={470} h={68} title={t} sub={b} mine d={0.35 + i * 0.07} />)}
      <g className="rise" style={D(0.7)}><rect x="690" y="318" width="470" height="30" fill={C.navy} /><text x="706" y="338" fontFamily={F.mono} fontSize="12" fill="#fff" letterSpacing=".04em">Runbook: how it deploys, how it is restored, what to do at 2am</text></g>
    </g>
  );
  const m = (
    <g fontFamily={F.body}>
      <text x="20" y="26" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill={C.ink3}>LEFT TO THE END</text>
      {rows.map(([t, a], i) => <Box key={t} x={20} y={40 + i * 74} w={360} h={62} title={t} sub={a.length > 30 ? a.slice(0, 29) + "…" : a} d={i * 0.07} />)}
      <text x="20" y="288" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill={C.amber}>HOW WE SET IT UP · DAY ONE</text>
      {rows.map(([t, , b], i) => <Box key={t} x={20} y={302 + i * 74} w={360} h={62} title={t} sub={b.length > 34 ? b.slice(0, 33) + "…" : b} mine d={0.3 + i * 0.07} />)}
      <g className="rise" style={D(0.6)}><rect x="20" y="526" width="360" height="30" fill={C.navy} /><text x="34" y="546" fontFamily={F.mono} fontSize="11" fill="#fff">Runbook: deploy, restore, 2am</text></g>
    </g>
  );
  return (
    <Plate fig={fig} title="Diagram: who holds the code, cloud accounts and store accounts, when ownership is left to the end versus set up on day one"
      desc="Two columns. On the left the source code, cloud accounts and store accounts sit with a contractor and each is marked with a question mark. On the right the same three sit in the client company's name, each ticked, with a written runbook underneath."
      stamp="Who holds the keys" caption="The five things you hold at handover are listed under Go deeper. Handover is a non-event when they were yours from the first commit." d={{ vb: [1200, 364], node: d }} m={{ vb: [400, 570], node: m }} />
  );
}

/** Proof band: the three parts of the Phantom configurator, drawn as a diagram (not a screenshot). */
export function ConfiguratorPlate({ fig }: { fig: number }) {
  const cab = (x: number, y: number, i: number, sel?: boolean) => (
    <g key={i} className="node rise" style={D(0.05 * i)}><rect className="bx" x={x} y={y} width="70" height="98" rx="4" fill={sel ? C.orange : "#fff"} stroke={sel ? C.amber : C.navy} strokeWidth="1.5" /><rect x={x + 11} y={y + 12} width="48" height="34" fill={sel ? C.amber : C.navy} opacity=".85" /><circle cx={x + 35} cy={y + 72} r="7" fill={sel ? C.amber : C.navy} /></g>
  );
  const d = (
    <g fontFamily={F.body}>
      <g className="par-b" aria-hidden="true"><path d="M0 40 H1200 M0 200 H1200 M0 250 H1200" stroke="#2a4a74" strokeDasharray="2 8" /></g>
      <text x="40" y="34" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill="#9fb3c8">EIGHT CABINETS · ONE SELECTED</text>
      <g className="par-f">{Array.from({ length: 8 }, (_, i) => cab(40 + i * 140, 60 + (i % 2) * 14, i, i === 5))}</g>
      <text x="40" y="232" fontSize="14" fill="#dce3ec">The 3D configurator: pick a cabinet, rotate it, compare.</text>
    </g>
  );
  const m = (
    <g fontFamily={F.body}>
      <text x="20" y="26" fontFamily={F.mono} fontSize="11" letterSpacing=".1em" fill="#9fb3c8">EIGHT CABINETS · ONE SELECTED</text>
      {Array.from({ length: 8 }, (_, i) => cab(20 + (i % 4) * 92, 44 + Math.floor(i / 4) * 116, i, i === 5))}
      <text x="20" y="290" fontSize="13" fill="#dce3ec">The 3D configurator: pick, rotate, compare.</text>
    </g>
  );
  return (
    <Plate fig={fig} title="Diagram: eight cabinet icons with one selected, as in the Phantom Arcades 3D configurator"
      desc="A row of eight cabinet icons with one highlighted."
      stamp="Phantom Arcades configurator, schematic" caption="A schematic, not a screenshot. The live case study shows the real thing." d={{ vb: [1200, 250], node: d }} m={{ vb: [400, 305], node: m }} />
  );
}

/** Web or mobile: a two-branch decision. */
export function DecisionPlate({ fig }: { fig: number }) {
  const d = (
    <g fontFamily={F.body}>
      <g className="par-b" aria-hidden="true"><path d="M0 60 H1200 M0 140 H1200 M0 220 H1200" stroke={C.hair} strokeDasharray="2 8" /></g>
      <g className="node rise" style={D(0)}><rect className="bx" x="40" y="86" width="330" height="96" fill="#fff" stroke={C.navy} strokeWidth="1.5" /><text x="58" y="120" fontSize="12" fontFamily={F.mono} fill={C.amber} letterSpacing=".08em">THE ONE QUESTION</text><text x="58" y="148" fontSize="17" fontWeight="600" fill={C.ink}>Is a phone feature the whole point?</text><text x="58" y="168" fontSize="13" fill={C.ink3}>The camera, offline use.</text></g>
      <g className="rise" style={D(0.25)}><path d="M370 110 H520 V62 H620" fill="none" stroke={C.navy} strokeWidth="2" /><path d="M370 158 H520 V206 H620" fill="none" stroke={C.navy} strokeWidth="2" /><text x="430" y="104" fontFamily={F.mono} fontSize="12" fill={C.navy}>No</text><text x="430" y="182" fontFamily={F.mono} fontSize="12" fill={C.navy}>Yes</text></g>
      <g className="par-f">
        <g className="node rise" style={D(0.4)}><rect className="bx" x="620" y="20" width="540" height="84" fill={C.navy} stroke={C.navy} /><text x="640" y="54" fontFamily={F.display} fontSize="20" fontWeight="800" fill="#fff">Web application</text><text x="640" y="80" fontSize="14" fill="#dce3ec">Every device from one build, no store review.</text></g>
        <g className="node rise" style={D(0.5)}><rect className="bx" x="620" y="164" width="540" height="84" fill="#fff" stroke={C.navy} strokeWidth="1.5" /><text x="640" y="198" fontFamily={F.display} fontSize="20" fontWeight="800" fill={C.ink}>Store app</text><text x="640" y="224" fontSize="14" fill={C.ink3}>Must do more than a repackaged website.</text></g>
      </g>
    </g>
  );
  const m = (
    <g fontFamily={F.body}>
      <g className="node rise" style={D(0)}><rect className="bx" x="20" y="16" width="360" height="92" fill="#fff" stroke={C.navy} strokeWidth="1.5" /><text x="36" y="44" fontSize="11" fontFamily={F.mono} fill={C.amber} letterSpacing=".08em">THE ONE QUESTION</text><text x="36" y="70" fontSize="16" fontWeight="600" fill={C.ink}>Is a phone feature the whole point?</text><text x="36" y="92" fontSize="13" fill={C.ink3}>The camera, offline use.</text></g>
      <g className="rise" style={D(0.25)}><path d="M110 108 V140 M290 108 V140" stroke={C.navy} strokeWidth="2" /><text x="120" y="130" fontFamily={F.mono} fontSize="12" fill={C.navy}>No</text><text x="300" y="130" fontFamily={F.mono} fontSize="12" fill={C.navy}>Yes</text></g>
      <g className="node rise" style={D(0.4)}><rect className="bx" x="20" y="148" width="176" height="120" fill={C.navy} stroke={C.navy} /><text x="34" y="180" fontFamily={F.display} fontSize="17" fontWeight="800" fill="#fff">Web application</text><text x="34" y="204" fontSize="12" fill="#dce3ec">Every device,</text><text x="34" y="222" fontSize="12" fill="#dce3ec">one build, no</text><text x="34" y="240" fontSize="12" fill="#dce3ec">store review.</text></g>
      <g className="node rise" style={D(0.5)}><rect className="bx" x="204" y="148" width="176" height="120" fill="#fff" stroke={C.navy} strokeWidth="1.5" /><text x="218" y="180" fontFamily={F.display} fontSize="17" fontWeight="800" fill={C.ink}>Store app</text><text x="218" y="204" fontSize="12" fill={C.ink3}>Must do more</text><text x="218" y="222" fontSize="12" fill={C.ink3}>than a repackaged</text><text x="218" y="240" fontSize="12" fill={C.ink3}>website.</text></g>
    </g>
  );
  return (
    <Plate fig={fig} title="Diagram: web application or store app, decided by one question about phone features"
      desc="If a phone feature such as the camera or offline use is not the whole point, build a web application that reaches every device from one build. If it is, build a store app that does more than a repackaged website."
      stamp="Web first" caption="Decide after discovery, when the real tasks are known." d={{ vb: [1200, 268], node: d }} m={{ vb: [400, 284], node: m }} />
  );
}
