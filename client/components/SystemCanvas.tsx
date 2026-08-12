import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SystemCanvas — the integration diagram.
 *
 * DIRECTION: signal tracing. Chosen over the patchbay and the before/after scrub
 * because it is the only one of the three that shows the *middle* of the job —
 * the integration layer and what happens inside it — rather than just the two
 * ends, and it needs no cursor, which is what makes it work identically on a
 * phone.
 *
 * WHAT IT SHOWS, AND WHY IT IS HONEST
 *
 * Seven platforms this company actually works across (the same list the footer
 * marquee and the FAQ already carry), a shared integration layer between them,
 * and records moving from one system to another through four named stages:
 * authenticate, map, validate, route. Packets are orange outbound and blue on
 * the return path, because integrations are not one-way and a diagram that
 * pretends otherwise is a lie told in pictures.
 *
 * Nothing on the canvas is a claim. No client names, no throughput, no latency,
 * no uptime. The only numbers are a sequence counter in the event log, which is
 * a label. The frame says ILLUSTRATIVE — NOT LIVE DATA, in the diagram itself,
 * because an instrument that does not say where its signal comes from is not an
 * instrument.
 *
 * WHY SVG + SMIL AND NOT A CANVAS LOOP
 *
 * The design KB has this measured on this company's own site: a full-screen
 * shader cost ~14 Lighthouse performance points. So no WebGL here, and no
 * requestAnimationFrame loop either — every packet, every trace and every latch
 * is a declarative <animate> the browser schedules itself. That buys three
 * things a JS loop does not:
 *
 *   - zero main-thread work per frame, so INP is untouched;
 *   - exact synchronisation, because every animation shares one 12s period and
 *     the stage-latch times are computed from arc length along the same path
 *     the packet travels (animateMotion is paced by distance, so position is
 *     linear in time and the arithmetic holds);
 *   - one-call pause. `svg.pauseAnimations()` freezes the whole instrument, so
 *     the IntersectionObserver, the tab-visibility handler and the HOLD button
 *     are all the same two lines.
 *
 * The event log reads `svg.getCurrentTime()` at 5Hz rather than keeping its own
 * clock, so it can never drift away from the packet it is describing — and when
 * the timeline is paused that clock stops, so the log stops with it for free.
 *
 * WCAG 2.2.2: the motion loops indefinitely, so it MUST be pausable. That is the
 * HOLD button, and it is a real <button> — keyboard operable with a visible
 * focus ring on the night ground, where the site's default dark-blue focus
 * outline would be invisible.
 *
 * Nothing else is interactive. Not an oversight: a hover-to-highlight would be
 * dead weight on the 60% of visitors holding a phone, and a focusable <g> inside
 * an aria-hidden <svg> is a keyboard trap with no accessible name. Inert to both
 * pointers and keyboard is the honest option, and the text alternative below the
 * canvas carries every fact the picture does.
 */

/* ------------------------------------------------------------------ content */

type SystemId =
  | "salesforce"
  | "zendesk"
  | "hubspot"
  | "api"
  | "oracle"
  | "m365"
  | "quickbooks";

/**
 * Platforms only. Every name here appears in TrustedPartnerships or the FAQ
 * copy on Index — if you add one, it has to be true first.
 */
const SYSTEMS: Record<SystemId, { label: string; kind: string }> = {
  salesforce: { label: "Salesforce", kind: "CRM" },
  zendesk: { label: "Zendesk", kind: "SUPPORT" },
  hubspot: { label: "HubSpot", kind: "MARKETING" },
  api: { label: "Custom API", kind: "HTTP / JSON" },
  oracle: { label: "Oracle ERP", kind: "ERP" },
  m365: { label: "Microsoft 365", kind: "PRODUCTIVITY" },
  quickbooks: { label: "QuickBooks", kind: "FINANCE" },
};

type Dir = "out" | "ret";
type RouteSpec = { from: SystemId; to: SystemId; event: string; dir: Dir };

/** Record types, not client work. Generic on purpose. */
const ROUTES: RouteSpec[] = [
  { from: "salesforce", to: "oracle", event: "account.updated", dir: "out" },
  { from: "zendesk", to: "m365", event: "ticket.escalated", dir: "out" },
  { from: "hubspot", to: "oracle", event: "deal.won", dir: "out" },
  { from: "api", to: "quickbooks", event: "invoice.created", dir: "out" },
  { from: "zendesk", to: "quickbooks", event: "refund.requested", dir: "out" },
  { from: "oracle", to: "salesforce", event: "order.shipped", dir: "ret" },
];

/** The four things every integration has to do. Named, not asserted — nothing
 *  here is a capability claim, it is what the middle of the diagram contains. */
const STAGES: Array<{ label: string; notes: [string, string] }> = [
  { label: "AUTH", notes: ["OAUTH ·", "TOKEN REFRESH"] },
  { label: "MAP", notes: ["FIELD +", "SCHEMA MAP"] },
  { label: "VALIDATE", notes: ["SCHEMA +", "RULE CHECKS"] },
  { label: "ROUTE", notes: ["RETRY ·", "DEAD LETTER"] },
];

/* ------------------------------------------------------------------- timing */

/** One cycle. Every animation in the SVG uses this, which is what keeps them
 *  in lockstep forever without a single line of JS. */
const PERIOD = 12;
/** Fraction of the cycle a packet spends in flight. */
const TRAVEL = 0.23;
const STAGGER = 0.128;
const startOf = (i: number) => 0.02 + i * STAGGER;
const endOf = (i: number) => startOf(i) + TRAVEL;

/** Where each packet is parked in the reduced-motion still. Chosen to sit
 *  outside the integration plate, which is opaque and would swallow them. */
const STILL_AT = [0.14, 0.85, 0.18, 0.88, 0.1, 0.7];

/* ---------------------------------------------------------------- geometry */

export type Pt = [number, number];

/**
 * Cuts every corner at 45°, which is what turns a flowchart into a board
 * layout. Exported for the spec — the clamp to half the shorter leg is the part
 * that breaks silently if a route ever gets a short segment.
 */
export function chamfer(pts: Pt[], r: number): Pt[] {
  if (pts.length < 3) return pts.slice();
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const [cx, cy] = pts[i + 1];
    const d1 = Math.hypot(ax - bx, ay - by);
    const d2 = Math.hypot(cx - bx, cy - by);
    if (d1 === 0 || d2 === 0) continue;
    const k1 = Math.min(r, d1 / 2) / d1;
    const k2 = Math.min(r, d2 / 2) / d2;
    out.push([bx + (ax - bx) * k1, by + (ay - by) * k1]);
    out.push([bx + (cx - bx) * k2, by + (cy - by) * k2]);
  }
  out.push(pts[pts.length - 1]);
  return out;
}

export const toPath = (pts: Pt[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");

function segments(pts: Pt[]) {
  let total = 0;
  const lens: number[] = [];
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lens.push(l);
    total += l;
  }
  return { lens, total };
}

/**
 * Distance-fraction of `target` along the polyline, or -1 if it is not on it.
 *
 * This is the whole trick behind the stage latches: <animateMotion> without
 * keySplines is paced by distance, so the fraction returned here IS the time at
 * which the packet arrives, and a stage can be told to light up then.
 */
export function fractionAt(pts: Pt[], target: Pt, tolerance = 0.75): number {
  const { lens, total } = segments(pts);
  if (total === 0) return -1;
  let cum = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i - 1];
    const dx = pts[i][0] - x1;
    const dy = pts[i][1] - y1;
    const len = lens[i - 1];
    if (len > 0) {
      const t = ((target[0] - x1) * dx + (target[1] - y1) * dy) / (len * len);
      if (t >= -0.0001 && t <= 1.0001) {
        const px = x1 + dx * t;
        const py = y1 + dy * t;
        if (Math.hypot(target[0] - px, target[1] - py) <= tolerance) {
          return (cum + t * len) / total;
        }
      }
    }
    cum += len;
  }
  return -1;
}

export function pointAt(pts: Pt[], f: number): Pt {
  const { lens, total } = segments(pts);
  const want = Math.max(0, Math.min(1, f)) * total;
  let cum = 0;
  for (let i = 1; i < pts.length; i++) {
    const len = lens[i - 1];
    if (cum + len >= want && len > 0) {
      const t = (want - cum) / len;
      return [
        pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t,
        pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t,
      ];
    }
    cum += len;
  }
  return pts[pts.length - 1];
}

/**
 * Merges every latch time for one element into a single <animate>. One element,
 * one animation, whatever the number of routes crossing it — which is why the
 * whole scene is ~30 animation elements instead of a few hundred.
 *
 * keyTimes must be non-decreasing or the animation is dropped silently by the
 * browser, so anything out of order is discarded rather than emitted.
 */
export function latchTrack(
  times: number[],
  base: number,
  peak: number,
  decay = 0.055,
): { values: string; keyTimes: string } {
  const stops: Array<[number, number]> = [[0, base]];
  for (const t of [...times].sort((a, b) => a - b)) {
    stops.push([t - 0.004, base], [t, peak], [t + decay, base]);
  }
  stops.push([1, base]);

  const values: number[] = [];
  const keyTimes: number[] = [];
  let last = -1;
  for (const [t, v] of stops) {
    const k = Math.min(1, Math.max(0, t));
    if (k <= last) continue;
    keyTimes.push(k);
    values.push(v);
    last = k;
  }
  if (keyTimes[keyTimes.length - 1] !== 1) {
    keyTimes.push(1);
    values.push(base);
  }
  return {
    values: values.map((v) => v.toFixed(3)).join(";"),
    keyTimes: keyTimes.map((k) => k.toFixed(4)).join(";"),
  };
}

/* ------------------------------------------------------------------- scenes */

type Box = {
  id: SystemId;
  x: number;
  y: number;
  w: number;
  h: number;
  port: Pt;
  led: { x: number; y: number; w: number; h: number };
  textX: number;
};

type Cell = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Pre-placed, because the wide scene stacks them under the stage name and
   *  the narrow one sets them beside it. */
  notes: Array<{ x: number; y: number; text: string }>;
  center: Pt;
  bar: { x: number; y: number; w: number; h: number };
};

type Scene = {
  w: number;
  h: number;
  axis: "x" | "y";
  boxes: Box[];
  /** One lane per route. Every integration is its own channel, not a shared
   *  wire — which is both truer and the reason this reads as a board rather
   *  than a flowchart. */
  lanes: number[];
  plate: { x: number; y: number; w: number; h: number };
  plateLabel: Pt;
  cells: Cell[];
  points: Record<number, Pt[]>;
  font: { label: number; kind: number; cell: number; chrome: number };
  headerAt: Pt;
  legendY: number;
  ticks: string | null;
  chamfer: number;
  notesAnchor: "middle" | "start";
};

/** Wide: lanes run left to right, sources left, targets right, layer between. */
function wideScene(): Scene {
  const boxOf = (id: SystemId, x: number, cy: number, side: "l" | "r"): Box => {
    const w = 190;
    const h = 46;
    return {
      id,
      x,
      y: cy - h / 2,
      w,
      h,
      port: [side === "l" ? x + w : x, cy],
      led: { x: side === "l" ? x + w - 9 : x + 6, y: cy - 10, w: 3, h: 20 },
      textX: x + 16,
    };
  };

  const lanes = [0, 1, 2, 3, 4, 5].map((i) => 272.5 + (i - 2.5) * 13);
  // Oracle sits on lane 2 so its heaviest inbound route is one straight run.
  const ORACLE_Y = lanes[2];

  // Evenly spread, so the two middle systems straddle the lane bundle instead
  // of leaving a hole in the left half of the panel.
  const boxes: Box[] = [
    boxOf("salesforce", 40, 100, "l"),
    boxOf("zendesk", 40, 215, "l"),
    boxOf("hubspot", 40, 330, "l"),
    boxOf("api", 40, 445, "l"),
    boxOf("m365", 890, 140, "r"),
    boxOf("oracle", 890, ORACLE_Y, "r"),
    boxOf("quickbooks", 890, 405, "r"),
  ];

  const plate = { x: 400, y: 213, w: 340, h: 120 };
  const cells: Cell[] = STAGES.map((stage, i) => {
    const x = 408 + i * 83;
    const y = 227;
    return {
      x,
      y,
      w: 75,
      h: 96,
      label: stage.label,
      notes: stage.notes.map((text, n) => ({ x: x + 37.5, y: y + 50 + n * 12, text })),
      center: [x + 37.5, 272.5],
      bar: { x: x + 8, y: y + 80, w: 59, h: 4 },
    };
  });

  // Lanes are ordered by destination height and the turn-offs cascade from the
  // bottom lane up, so wires meet at junctions instead of crossing on the right.
  const points: Record<number, Pt[]> = {
    // Salesforce -> Oracle, lane 1
    0: [[230, 100], [300, 100], [300, lanes[1]], [804, lanes[1]], [804, ORACLE_Y], [890, ORACLE_Y]],
    // Zendesk -> Microsoft 365, lane 0
    1: [[230, 215], [284, 215], [284, lanes[0]], [820, lanes[0]], [820, 140], [890, 140]],
    // HubSpot -> Oracle, lane 2 - straight through, no jog at either end
    2: [[230, 330], [316, 330], [316, lanes[2]], [890, lanes[2]]],
    // Custom API -> QuickBooks, lane 3
    3: [[230, 445], [332, 445], [332, lanes[3]], [772, lanes[3]], [772, 405], [890, 405]],
    // Zendesk -> QuickBooks, lane 4
    4: [[230, 215], [268, 215], [268, lanes[4]], [756, lanes[4]], [756, 405], [890, 405]],
    // Oracle -> Salesforce, the return path, lane 5, right to left
    5: [[890, ORACLE_Y], [856, ORACLE_Y], [856, lanes[5]], [252, lanes[5]], [252, 100], [230, 100]],
  };

  let ticks = "";
  for (let x = 40; x <= 1080; x += 20) {
    ticks += `M${x} 58 L${x} ${x % 100 === 40 ? 68 : 63} `;
  }

  return {
    w: 1120,
    h: 520,
    axis: "x",
    boxes,
    lanes,
    plate,
    plateLabel: [570, 203],
    cells,
    points,
    font: { label: 16, kind: 10.5, cell: 11, chrome: 12 },
    headerAt: [40, 44],
    legendY: 486,
    ticks,
    chamfer: 16,
    notesAnchor: "middle",
  };
}

/** Narrow: the same topology stood on end. The ribbon runs down the left and
 *  every label gets the full width of the panel, so nothing is set in 6px type. */
function narrowScene(): Scene {
  const boxOf = (id: SystemId, cy: number): Box => {
    const x = 168;
    const w = 226;
    const h = 36;
    return {
      id,
      x,
      y: cy - h / 2,
      w,
      h,
      port: [x, cy],
      led: { x: x + 5, y: cy - 9, w: 2.5, h: 18 },
      textX: x + 15,
    };
  };

  const boxes: Box[] = [
    boxOf("salesforce", 90),
    boxOf("zendesk", 142),
    boxOf("hubspot", 194),
    boxOf("api", 246),
    boxOf("oracle", 505),
    boxOf("m365", 565),
    boxOf("quickbooks", 625),
  ];

  const lanes = [0, 1, 2, 3, 4, 5].map((i) => 92 + (i - 2.5) * 7);

  // Full width, with the stage detail set beside each cell rather than under
  // it. Stacking it would mean 7px type, and 7px type is texture, not a label.
  const plate = { x: 44, y: 288, w: 352, h: 164 };
  const cells: Cell[] = STAGES.map((stage, i) => {
    const y = 296 + i * 39;
    return {
      x: 52,
      y,
      w: 80,
      h: 31,
      label: stage.label,
      notes: [{ x: 148, y: y + 20, text: stage.notes.join(" ") }],
      center: [92, y + 15.5],
      bar: { x: 60, y: y + 22, w: 64, h: 2.5 },
    };
  });

  const at = (id: SystemId) => boxes.find((b) => b.id === id)!.port[1];
  const points: Record<number, Pt[]> = {};
  ROUTES.forEach((r, i) => {
    points[i] = [
      [168, at(r.from)],
      [lanes[i], at(r.from)],
      [lanes[i], at(r.to)],
      [168, at(r.to)],
    ];
  });

  return {
    w: 420,
    h: 720,
    axis: "y",
    boxes,
    lanes,
    plate,
    plateLabel: [96, 280],
    cells,
    points,
    font: { label: 13.5, kind: 9.5, cell: 11, chrome: 10 },
    headerAt: [24, 38],
    legendY: 692,
    ticks: null,
    chamfer: 10,
    notesAnchor: "start",
  };
}

/* -------------------------------------------------------------------- paint */

const NIGHT = "#04182b";
const PANEL = "#072338";
const INK = "#dbe4ee";
const INK3 = "#9fb3c8";
const BLUE = "#7fb4e6";
const ORANGE = "#ffa634";

function useWide() {
  const [wide, setWide] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia("(min-width: 768px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

type LogRow = { seq: number; from: string; to: string; event: string; dir: Dir };

export default function SystemCanvas({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const wide = useWide();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [held, setHeld] = useState(false);
  const [log, setLog] = useState<LogRow[]>([]);

  const scene = useMemo(() => (wide ? wideScene() : narrowScene()), [wide]);

  /** Everything derived from geometry: the drawn path, and the exact cycle
   *  fraction at which each packet reaches each stage and each endpoint. */
  const wires = useMemo(() => {
    return ROUTES.map((route, i) => {
      const pts = chamfer(scene.points[i], scene.chamfer);
      return {
        route,
        pts,
        d: toPath(pts),
        t0: startOf(i),
        t1: endOf(i),
        crossings: scene.cells.map((c) => fractionAt(pts, c.center)),
        still: pointAt(pts, STILL_AT[i % STILL_AT.length]),
      };
    });
  }, [scene, wide]);

  const cellTimes = useMemo(
    () =>
      scene.cells.map((_, ci) => {
        const out: number[] = [];
        wires.forEach((w) => {
          const f = w.crossings[ci];
          if (f >= 0) out.push(w.t0 + f * TRAVEL);
        });
        return out;
      }),
    [scene, wires],
  );

  const ledTimes = useMemo(() => {
    const map: Record<string, number[]> = {};
    wires.forEach((w) => {
      (map[w.route.from] ||= []).push(w.t0);
      (map[w.route.to] ||= []).push(w.t1);
    });
    return map;
  }, [wires]);

  /* --- pause: off-screen, hidden tab, or the operator pressed HOLD --------- */

  const heldRef = useRef(false);
  const gate = useRef({ onScreen: false, visible: true });
  const sync = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== "function") return;
    if (heldRef.current || !gate.current.onScreen || !gate.current.visible) {
      svg.pauseAnimations();
    } else {
      svg.unpauseAnimations();
    }
  }, []);

  useEffect(() => {
    heldRef.current = held;
    sync();
  }, [held, sync]);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg) return;
    gate.current.onScreen = false;
    sync();

    const io = new IntersectionObserver(
      (entries) => {
        gate.current.onScreen = entries.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: "120px" },
    );
    io.observe(svg);

    const onVis = () => {
      gate.current.visible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced, sync, wide]);

  /* --- the readout, clocked off the SVG timeline so it cannot drift -------- */

  const seq = useRef(0);
  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    if (!svg || typeof svg.getCurrentTime !== "function") return;
    let lastKey = "";
    const id = window.setInterval(() => {
      const t = svg.getCurrentTime();
      if (!Number.isFinite(t)) return;
      const cycle = Math.floor(t / PERIOD);
      const within = (t % PERIOD) / PERIOD;
      let idx = -1;
      for (let i = 0; i < ROUTES.length; i++) if (endOf(i) <= within) idx = i;
      if (idx < 0) return;
      const key = `${cycle}:${idx}`;
      if (key === lastKey) return;
      lastKey = key;
      const r = ROUTES[idx];
      seq.current += 1;
      setLog((prev) =>
        [
          {
            seq: seq.current,
            from: SYSTEMS[r.from].label,
            to: SYSTEMS[r.to].label,
            event: r.event,
            dir: r.dir,
          },
          ...prev,
        ].slice(0, 3),
      );
    }, 200);
    return () => window.clearInterval(id);
  }, [reduced, wide]);

  /* Under reduced motion the log is a still frame of the same three events, so
     the readout is populated and legible rather than an empty box. */
  const rows: (LogRow | null)[] = reduced
    ? [0, 1, 2].map((i) => ({
        seq: 3 - i,
        from: SYSTEMS[ROUTES[i].from].label,
        to: SYSTEMS[ROUTES[i].to].label,
        event: ROUTES[i].event,
        dir: ROUTES[i].dir,
      }))
    : [log[0] ?? null, log[1] ?? null, log[2] ?? null];

  const dur = `${PERIOD}s`;
  const chrome = scene.font.chrome;

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-lg bg-oa-night ring-1 ring-white/10">
        <svg
          ref={svgRef}
          /* The hook scripts/system-canvas-check.mjs finds it by. */
          data-system-canvas=""
          viewBox={`0 0 ${scene.w} ${scene.h}`}
          preserveAspectRatio="xMidYMid meet"
          /* The box is reserved by CSS, not by the viewBox, so swapping scenes
             at the md breakpoint cannot shift the page. */
          className="block aspect-[7/12] w-full font-mono md:aspect-[28/13]"
          aria-hidden="true"
          focusable="false"
        >
          <rect x={0} y={0} width={scene.w} height={scene.h} fill={NIGHT} />

          {/* instrument frame */}
          <rect
            x={wide ? 16 : 12}
            y={wide ? 16 : 12}
            width={scene.w - (wide ? 32 : 24)}
            height={scene.h - (wide ? 32 : 24)}
            rx={4}
            fill="none"
            stroke={INK3}
            strokeOpacity={0.18}
          />
          {[
            [wide ? 16 : 12, wide ? 16 : 12, 1, 1],
            [scene.w - (wide ? 16 : 12), wide ? 16 : 12, -1, 1],
            [wide ? 16 : 12, scene.h - (wide ? 16 : 12), 1, -1],
            [scene.w - (wide ? 16 : 12), scene.h - (wide ? 16 : 12), -1, -1],
          ].map(([x, y, sx, sy], i) => (
            <path
              key={`c${i}`}
              d={`M${x + sx * 18} ${y} L${x} ${y} L${x} ${y + sy * 18}`}
              fill="none"
              stroke={BLUE}
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
          ))}
          {scene.ticks && (
            <path d={scene.ticks} stroke={INK3} strokeOpacity={0.18} strokeWidth={1} />
          )}

          <text
            x={scene.headerAt[0]}
            y={scene.headerAt[1]}
            fontSize={chrome}
            letterSpacing={2.2}
            fill={INK3}
          >
            SYSTEM INTEGRATION · SIGNAL PATH
          </text>

          {/* every route dimmed, then the live trace on top of it */}
          {wires.map((w, i) => (
            <path
              key={`b${i}`}
              d={w.d}
              fill="none"
              stroke={BLUE}
              strokeOpacity={0.3}
              strokeWidth={1.6}
            />
          ))}

          {wires.map((w, i) => {
            const colour = w.route.dir === "ret" ? BLUE : ORANGE;
            return (
              <path
                key={`e${i}`}
                d={w.d}
                fill="none"
                stroke={colour}
                strokeWidth={2.2}
                pathLength={1}
                strokeDasharray="0.3 2"
                strokeDashoffset={reduced ? 0.3 - STILL_AT[i % STILL_AT.length] : 0.3}
              >
                {!reduced && (
                  <animate
                    attributeName="stroke-dashoffset"
                    dur={dur}
                    repeatCount="indefinite"
                    calcMode="linear"
                    values="0.3;0.3;-0.7;-1.3;-1.3"
                    keyTimes={`0;${w.t0.toFixed(4)};${w.t1.toFixed(4)};${Math.min(
                      0.999,
                      w.t1 + 0.06,
                    ).toFixed(4)};1`}
                  />
                )}
              </path>
            );
          })}

          {/* packets */}
          {wires.map((w, i) => {
            const colour = w.route.dir === "ret" ? BLUE : ORANGE;
            return (
              <g
                key={`p${i}`}
                opacity={reduced ? 1 : 0}
                transform={reduced ? `translate(${w.still[0]} ${w.still[1]})` : undefined}
              >
                <rect
                  x={-7}
                  y={-4.5}
                  width={14}
                  height={9}
                  rx={1.5}
                  fill={colour}
                  stroke={NIGHT}
                  strokeWidth={1}
                />
                {!reduced && (
                  <>
                    <animateMotion
                      dur={dur}
                      repeatCount="indefinite"
                      path={w.d}
                      rotate="auto"
                      calcMode="linear"
                      keyPoints="0;0;1;1"
                      keyTimes={`0;${w.t0.toFixed(4)};${w.t1.toFixed(4)};1`}
                    />
                    <animate
                      attributeName="opacity"
                      dur={dur}
                      repeatCount="indefinite"
                      calcMode="linear"
                      values="0;0;1;1;0;0"
                      keyTimes={`0;${(w.t0 - 0.004).toFixed(4)};${w.t0.toFixed(
                        4,
                      )};${w.t1.toFixed(4)};${(w.t1 + 0.004).toFixed(4)};1`}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* the integration layer sits ON TOP: packets go into it and the stage
              latches, not the packet, tell you where they are inside */}
          <rect
            x={scene.plate.x}
            y={scene.plate.y}
            width={scene.plate.w}
            height={scene.plate.h}
            rx={3}
            fill={NIGHT}
            stroke={INK3}
            strokeOpacity={0.4}
          />
          {/* connector pins where each lane enters and leaves the layer */}
          {scene.lanes.flatMap((lane, i) =>
            (scene.axis === "x"
              ? [scene.plate.x - 3, scene.plate.x + scene.plate.w - 3]
              : [scene.plate.y - 3, scene.plate.y + scene.plate.h - 3]
            ).map((edge, j) => (
              <rect
                key={`pin${i}-${j}`}
                x={scene.axis === "x" ? edge : lane - 1.5}
                y={scene.axis === "x" ? lane - 1.5 : edge}
                width={scene.axis === "x" ? 6 : 3}
                height={scene.axis === "x" ? 3 : 6}
                fill={INK3}
                opacity={0.65}
              />
            )),
          )}
          <text
            x={scene.plateLabel[0]}
            y={scene.plateLabel[1]}
            fontSize={chrome - 1}
            letterSpacing={1.8}
            textAnchor="middle"
            fill={INK3}
          >
            INTEGRATION LAYER
          </text>
          {scene.cells.map((c, i) => {
            const track = latchTrack(cellTimes[i], 0.24, 1);
            return (
              <g key={`cell${i}`}>
                <rect
                  x={c.x}
                  y={c.y}
                  width={c.w}
                  height={c.h}
                  rx={2}
                  fill={PANEL}
                  stroke={BLUE}
                  strokeOpacity={0.28}
                />
                <text
                  x={c.x + c.w / 2}
                  y={c.y + (wide ? 26 : 21)}
                  fontSize={scene.font.cell}
                  textAnchor="middle"
                  fill={INK}
                >
                  {c.label}
                </text>
                {c.notes.map((note, n) => (
                  <text
                    key={n}
                    x={note.x}
                    y={note.y}
                    fontSize={wide ? 9 : 10}
                    textAnchor={scene.notesAnchor}
                    fill={INK3}
                  >
                    {note.text}
                  </text>
                ))}
                <rect
                  x={c.bar.x}
                  y={c.bar.y}
                  width={c.bar.w}
                  height={c.bar.h}
                  fill={ORANGE}
                  opacity={reduced ? 0.6 : 0.24}
                >
                  {!reduced && (
                    <animate
                      attributeName="opacity"
                      dur={dur}
                      repeatCount="indefinite"
                      calcMode="linear"
                      values={track.values}
                      keyTimes={track.keyTimes}
                    />
                  )}
                </rect>
              </g>
            );
          })}

          {/* systems */}
          {scene.boxes.map((b) => {
            const sys = SYSTEMS[b.id];
            const track = latchTrack(ledTimes[b.id] ?? [], 0.22, 1);
            return (
              <g key={b.id}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx={3}
                  fill={PANEL}
                  stroke={INK3}
                  strokeOpacity={0.3}
                />
                <rect
                  x={b.led.x}
                  y={b.led.y}
                  width={b.led.w}
                  height={b.led.h}
                  fill={ORANGE}
                  opacity={reduced ? 0.6 : 0.22}
                >
                  {!reduced && (
                    <animate
                      attributeName="opacity"
                      dur={dur}
                      repeatCount="indefinite"
                      calcMode="linear"
                      values={track.values}
                      keyTimes={track.keyTimes}
                    />
                  )}
                </rect>
                <text
                  x={b.textX}
                  y={b.port[1] - (wide ? 3 : 3)}
                  fontSize={scene.font.label}
                  fill={INK}
                >
                  {sys.label}
                </text>
                <text
                  x={b.textX}
                  y={b.port[1] + (wide ? 14 : 12)}
                  fontSize={scene.font.kind}
                  letterSpacing={1.2}
                  fill={INK3}
                >
                  {sys.kind}
                </text>
              </g>
            );
          })}

          {/* legend + provenance */}
          <g fontSize={wide ? 10.5 : 9} fill={INK3}>
            <rect x={wide ? 40 : 24} y={scene.legendY - 8} width={9} height={9} fill={ORANGE} />
            <text x={wide ? 56 : 38} y={scene.legendY}>
              OUTBOUND
            </text>
            <rect x={wide ? 160 : 110} y={scene.legendY - 8} width={9} height={9} fill={BLUE} />
            <text x={wide ? 176 : 124} y={scene.legendY}>
              RETURN / ACK
            </text>
            <text x={scene.w - (wide ? 40 : 24)} y={scene.legendY} textAnchor="end">
              ILLUSTRATIVE — NOT LIVE DATA
            </text>
          </g>
        </svg>

        {!reduced && (
          <button
            type="button"
            onClick={() => setHeld((h) => !h)}
            aria-pressed={held}
            aria-label={held ? "Resume the diagram animation" : "Pause the diagram animation"}
            className="absolute right-3 top-3 flex min-h-[40px] items-center rounded border border-white/15 bg-oa-night2/80 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-oa-nightInk2 transition-colors hover:border-oa-orange/60 hover:text-oa-nightInk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oa-orange"
          >
            {held ? "Run" : "Hold"}
          </button>
        )}

        <div className="flex items-start gap-3 border-t border-white/10 px-4 py-3">
          <span className="mt-[3px] shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-oa-nightInk3">
            Log
          </span>
          <ol className="h-[60px] min-w-0 flex-1 font-mono text-[11px] leading-5">
            {rows.map((row, i) =>
              row ? (
                <li key={i} className="flex gap-2 overflow-hidden whitespace-nowrap">
                  <span className="shrink-0 text-oa-nightInk3">
                    {String(row.seq).padStart(4, "0")}
                  </span>
                  <span className="shrink-0 text-oa-nightInk">
                    {row.from} <span aria-hidden="true">&#8594;</span> {row.to}
                  </span>
                  <span className="truncate text-oa-nightInk3">{row.event}</span>
                  <span
                    className={`ml-auto shrink-0 ${
                      row.dir === "ret" ? "text-oa-nightBlue" : "text-oa-orange"
                    }`}
                  >
                    {row.dir === "ret" ? "ACK" : "OK"}
                  </span>
                </li>
              ) : (
                <li key={i} className="text-oa-nightInk3/30">
                  ····
                </li>
              ),
            )}
          </ol>
        </div>
      </div>

      {/* The text alternative. Everything the picture says, in order. */}
      <p className="sr-only">
        Diagram: seven platforms OneAlgorithm works across, connected through a shared
        integration layer with four stages — authenticate, map fields, validate, and route.
        The traffic shown is illustrative, not live data.
      </p>
      <ul className="sr-only">
        {ROUTES.map((r, i) => (
          <li key={i}>
            {SYSTEMS[r.from].label} ({SYSTEMS[r.from].kind}) sends {r.event} to{" "}
            {SYSTEMS[r.to].label} ({SYSTEMS[r.to].kind})
            {r.dir === "ret" ? ", on the return path" : ""}.
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Exported for the spec — the honesty guard checks nothing else appears. */
export const CANVAS_SYSTEMS = SYSTEMS;
export const CANVAS_ROUTES = ROUTES;
export const CANVAS_TIMING = { PERIOD, TRAVEL, startOf, endOf };
