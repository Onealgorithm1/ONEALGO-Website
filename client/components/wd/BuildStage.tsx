import * as React from "react";

/* BuildStage (was client/components/SiteAssembly.tsx, which shipped on no route): signature 1 of
 * /services/website-development, design-contract-webdev.md §1.9 and U2.
 *
 * A radius-0 browser frame in which a website assembles: blueprint grid + dashed outlines, blocks rising, the
 * palette painting, type typing in, drawn imagery wiping on, the orange cursor pressing the finished button; a
 * mono build log stamps each step. Then it wipes and builds a DIFFERENT kind of business with a DIFFERENT
 * layout (restaurant: full-bleed image + menu strip; roofer: split with an estimate form; dentist: centred with
 * a booking bar), so the claim "coded for one business, not a template filled in" is shown three times.
 *
 * Three states, one DOM (server and client markup identical; the prerendered HTML is the finished first site):
 *   desktop >= 1024x700, no-preference   GSAP pins the row ([data-pin] ancestor) and scrubs all three builds
 *                                          (client/lib/sfMotion.ts initBuildScenes); `.js-scrub` strips the CSS
 *                                          keyframes so GSAP owns transform / opacity / clip-path / background-color.
 *   <= 1023                                the CSS keyframes in client/styles/wd.css play scene 1 ONCE when the
 *                                          runtime adds `.play` (IO at 70% of the viewport); ~4.6 s, under the 5 s
 *                                          WCAG 2.2.2 line, then the finished site holds. Scenes 2-3 are not shown.
 *   reduced motion / no JS                 the finished first site, log complete, nothing moves, no pin.
 *
 * `finished` renders only the frame of one scene, static (DemoSheet fans three of them). The timing of every
 * layer is its `--d` (seconds): the CSS keyframes read it as animation-delay and GSAP reads it as the position
 * on the scrubbed timeline, so the two paths share one clock.
 *
 * Honest by construction: the sites are labelled DEMO in the stamp, the imagery is drawn (inline SVG, no photo
 * pretending to be client work), no client is claimed, and the checks line asserts only what the demo has.
 *
 * impeccable-disable design-system-color: the three demo sites carry their OWN palettes on purpose (that is the point of the scene); the frame uses the sfv2 tokens
 * impeccable-disable design-system-radius: the dentist's pill chips are the demo's design, not ours */

type LayoutKind = "fullbleed" | "split" | "centered";

export type Scene = {
  id: string;
  kind: string;
  url: string;
  brand: string;
  nav: string[];
  headline: [string, string];
  sub: string;
  cta: string;
  strip: string[]; // secondary row: menu / form fields / services
  stat: [string, string];
  layout: LayoutKind;
  bg: string;
  surface: string;
  ink: string;
  ink2: string;
  accent: string;
  accentInk: string;
  radius: string;
  font: string;
};

export const SCENES: Scene[] = [
  {
    id: "hearth", kind: "restaurant", url: "thehearthkitchen.demo", brand: "The Hearth",
    nav: ["Menu", "Reserve", "Events", "Visit"], headline: ["Wood-fired,", "since 1998."],
    sub: "Seasonal plates from a 900°F oven. Walk in, or reserve; the bar is first come.", cta: "Reserve a table",
    strip: ["Starters", "From the oven", "Dessert", "Wine"], stat: ["Open till 11", "Thu – Sat"], layout: "fullbleed",
    bg: "#1d1a16", surface: "#2a251f", ink: "#f6efe4", ink2: "#cdbfa8", accent: "#e0863a", accentInk: "#1d1a16", radius: "2px", font: "Georgia, 'Times New Roman', serif",
  },
  {
    id: "ridgeline", kind: "roofing contractor", url: "ridgelineroofing.demo", brand: "RIDGELINE",
    nav: ["Roofing", "Siding", "Storm repair", "About"], headline: ["A roof that", "outlasts the mortgage."],
    sub: "Licensed, insured, and on site within 48 hours after a storm.", cta: "Get my estimate",
    strip: ["Name", "Address", "Phone"], stat: ["48h", "storm response"], layout: "split",
    bg: "#f4f5f7", surface: "#ffffff", ink: "#141a22", ink2: "#4b5563", accent: "#d6321f", accentInk: "#ffffff", radius: "0px", font: "'IBM Plex Sans', system-ui, sans-serif",
  },
  {
    id: "brightwater", kind: "dental clinic", url: "brightwaterdental.demo", brand: "Brightwater",
    nav: ["Services", "New patients", "Insurance", "Team"], headline: ["Dentistry that", "doesn't feel like it."],
    sub: "Same-week appointments and clear pricing before you sit down.", cta: "Book online",
    strip: ["Cleaning", "Whitening", "Invisalign", "Emergency"], stat: ["Same week", "appointments"], layout: "centered",
    bg: "#ffffff", surface: "#eaf6f5", ink: "#0f2b30", ink2: "#4f6b70", accent: "#0f9d8f", accentInk: "#ffffff", radius: "14px", font: "'IBM Plex Sans', system-ui, sans-serif",
  },
];

/* Build steps: second (within the scene) and label. `step` is the layer the line describes; hovering the line
   highlights that layer (wd.css, :has()). The CSS keyframes and the GSAP timeline run on the same clock. */
export const STEPS: { t: number; step: string; label: string }[] = [
  { t: 0.0, step: "grid", label: "grid · 12 col" },
  { t: 0.7, step: "blocks", label: "blocks · nav, hero, sections" },
  { t: 1.5, step: "palette", label: "palette · 6 tokens" },
  { t: 2.2, step: "type", label: "type · headline, body, buttons" },
  { t: 3.05, step: "imagery", label: "imagery · drawn" },
  { t: 3.75, step: "checks", label: "checks · contrast · responsive" },
  { t: 4.3, step: "press", label: "press" },
];

/* Drawn "photographs": one small illustration per business, in that business's own colours. Not photos; not client work. */
function Art({ s }: { s: Scene }) {
  const common = { className: "bs-photo absolute inset-0 h-full w-full", preserveAspectRatio: "xMidYMid slice" as const, "aria-hidden": true };
  if (s.id === "hearth")
    return (
      <svg viewBox="0 0 200 140" {...common}>
        <defs>
          <radialGradient id="bs-ember" cx="50%" cy="60%" r="60%">
            <stop offset="0" stopColor="#ffb86b" /><stop offset=".45" stopColor="#c2561d" /><stop offset="1" stopColor="#2a130a" />
          </radialGradient>
        </defs>
        <rect width="200" height="140" fill="url(#bs-ember)" />
        <path d="M30 140 V80 A70 70 0 0 1 170 80 V140 Z" fill="#160b06" opacity=".85" />
        <path d="M46 140 V86 A54 54 0 0 1 154 86 V140 Z" fill="url(#bs-ember)" />
        <path d="M78 140 C70 118 88 112 84 96 C98 106 96 122 108 128 C112 112 104 104 112 92 C124 108 128 124 118 140 Z" fill="#ffcf7a" opacity=".9" />
        <path d="M92 140 C86 126 96 120 96 108 C104 116 104 128 110 132 C110 124 108 118 112 112 C118 122 118 132 114 140 Z" fill="#fff1c9" />
        <ellipse cx="160" cy="124" rx="30" ry="9" fill="#f6efe4" opacity=".9" />
        <ellipse cx="160" cy="121" rx="18" ry="6" fill="#c98a4b" />
      </svg>
    );
  if (s.id === "ridgeline")
    return (
      <svg viewBox="0 0 200 140" {...common}>
        <rect width="200" height="140" fill="#cfd6df" />
        <rect y="100" width="200" height="40" fill="#8f9aa8" />
        <rect x="52" y="70" width="96" height="46" fill="#f4f5f7" />
        <path d="M40 74 L100 28 L160 74 Z" fill="#2f3944" />
        <path d="M100 28 L160 74 H148 L100 38 Z" fill="#141a22" />
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M${52 + k * 12} 72 l48 -37`} stroke="#5b6675" strokeWidth="1.2" opacity=".6" />)}
        <rect x="64" y="84" width="16" height="14" fill="#7fb4e6" />
        <rect x="120" y="84" width="16" height="14" fill="#7fb4e6" />
        <rect x="92" y="88" width="16" height="28" fill={s.accent} />
        <path d="M150 116 L172 40 M158 116 L180 40" stroke="#141a22" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M${153 + k * 3.6} ${106 - k * 12} h8`} stroke="#141a22" strokeWidth="2" />)}
      </svg>
    );
  return (
    <svg viewBox="0 0 400 100" {...common}>
      <rect width="400" height="100" fill="#eaf6f5" />
      <path d="M0 70 C80 40 140 96 220 66 S340 40 400 62 V100 H0 Z" fill="#bfeee8" opacity=".7" />
      <circle cx="320" cy="34" r="22" fill="#bfeee8" />
      <path d="M70 18 C54 18 45 30 48 45 C50 57 55 64 57 79 C58 85 64 86 66 79 L70 63 L74 79 C76 86 82 85 83 79 C85 64 90 57 92 45 C95 30 86 18 70 18 Z" fill="#ffffff" stroke={s.accent} strokeWidth="2.5" />
      <path d="M58 34 C63 28 77 28 82 34" stroke={s.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M320 26 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill={s.accent} />
      <path d="M110 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 Z" fill={s.accent} opacity=".7" />
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={170 + k * 26} y="34" width="20" height="20" rx="4" fill={k === 2 ? s.accent : "#ffffff"} stroke={s.accent} strokeWidth="1.5" opacity={k === 2 ? 1 : 0.8} />)}
    </svg>
  );
}

const d = (sec: number) => ({ ["--d" as string]: `${sec}s` }) as React.CSSProperties;

/** One scene: the page being built inside the frame. Every animated layer carries a bs-* class and its --d. */
function SceneView({ s, k }: { s: Scene; k: number }) {
  const hl = (i: 0 | 1) => <div className="bs-type bs-h" style={{ color: i ? s.accent : s.ink, ...d(2.25 + i * 0.2) }}>{s.headline[i]}</div>;
  const Cta = ({ delay = 2.95 }: { delay?: number }) => (
    <span className="bs-pop bs-cta inline-block whitespace-nowrap px-[4%] py-[2%] font-semibold" style={{ background: s.accent, color: s.accentInk, borderRadius: s.radius, ...d(delay) }}>{s.cta}</span>
  );
  const Cursor = ({ left, top }: { left: string; top: string }) => (
    <svg className="bs-cursor absolute drop-shadow" style={{ left, top }} viewBox="0 0 24 24" fill="#fff" stroke="#000" strokeWidth="1.5"><path d="M4 3l7 17 2.5-6.5L20 11z" /></svg>
  );
  const Nav = () => (
    <div className="bs-block flex items-center justify-between" style={d(0.7)}>
      <span className="bs-type bs-brand font-bold" style={{ color: s.ink, ...d(2.2) }}>{s.brand}</span>
      <div className="bs-nav gap-[3%]">
        {s.nav.map((n, i) => <span key={n} className="bs-type" style={{ color: s.ink2, ...d(2.3 + i * 0.08) }}>{n}</span>)}
      </div>
    </div>
  );
  return (
    <div className="bs-scene" data-scene-index={k} style={{ fontFamily: s.font }}>
      <div className="bs-grid absolute inset-0" />
      <div className="bs-paint absolute inset-0" data-bg={s.bg} style={{ ["--to" as string]: s.bg } as React.CSSProperties} />

      {s.layout === "fullbleed" && (
        <div className="relative flex h-full flex-col">
          <div className="bs-block relative flex-1 overflow-hidden" style={d(0.85)}>
            <Art s={s} />
            <div className="bs-photo absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(29,26,22,.92) 0%, rgba(29,26,22,.55) 55%, rgba(29,26,22,.1) 100%)" }} />
            <div className="relative flex h-full flex-col p-[4%]">
              <Nav />
              <div className="mt-auto max-w-[62%]">
                {hl(0)}{hl(1)}
                <p className="bs-type bs-sub mt-[2%]" style={{ color: s.ink2, ...d(2.7) }}>{s.sub}</p>
                <div className="relative mt-[3%] flex items-center gap-[3%]">
                  <Cta />
                  <span className="bs-pop bs-stat whitespace-nowrap" style={{ color: s.ink2, ...d(3.05) }}><b style={{ color: s.ink }}>{s.stat[0]}</b> {s.stat[1]}</span>
                  <Cursor left="12%" top="55%" />
                </div>
              </div>
            </div>
          </div>
          <div className="bs-block flex items-center justify-between px-[4%] py-[2%]" style={{ background: s.surface, ...d(1.15) }}>
            {s.strip.map((c, i) => <span key={c} className="bs-type bs-strip tracking-wide" style={{ color: i === 1 ? s.accent : s.ink, ...d(2.9 + i * 0.1) }}>{c}</span>)}
          </div>
        </div>
      )}

      {s.layout === "split" && (
        <div className="relative flex h-full flex-col p-[4%]">
          <Nav />
          <div className="mt-[3%] grid flex-1 grid-cols-12 gap-[3%]">
            <div className="col-span-7 flex flex-col justify-center">
              <div className="bs-block" style={d(0.85)}>{hl(0)}{hl(1)}</div>
              <p className="bs-type bs-sub mt-[3%] max-w-[92%]" style={{ color: s.ink2, ...d(2.7) }}>{s.sub}</p>
              <span className="bs-pop bs-stat mt-[3%]" style={{ color: s.ink2, ...d(3.05) }}><b style={{ color: s.ink }}>{s.stat[0]}</b> {s.stat[1]}</span>
              <div className="bs-block relative mt-[4%] h-[34%] overflow-hidden" style={{ ...d(1.25), borderRadius: s.radius }}><Art s={s} /></div>
            </div>
            <div className="bs-block relative col-span-5 flex flex-col justify-center gap-[6%] p-[4%]" style={{ background: s.surface, boxShadow: "0 1px 0 rgba(0,0,0,.06), 0 8px 24px -12px rgba(0,0,0,.25)", ...d(1.0) }}>
              <span className="bs-type bs-form-h font-bold" style={{ color: s.ink, ...d(2.6) }}>Free estimate</span>
              {s.strip.map((f, i) => (
                <div key={f} className="bs-block bs-field flex h-[13%] items-center px-[6%]" style={{ border: `1px solid ${s.ink2}55`, color: s.ink2, ...d(1.3 + i * 0.1) }}>
                  <span className="bs-type" style={d(2.75 + i * 0.1)}>{f}</span>
                </div>
              ))}
              <div className="relative"><Cta delay={3.0} /><Cursor left="20%" top="30%" /></div>
            </div>
          </div>
        </div>
      )}

      {s.layout === "centered" && (
        <div className="relative flex h-full flex-col p-[4%]">
          <Nav />
          <div className="mt-[4%] flex flex-col items-center text-center">
            <div className="bs-block" style={d(0.85)}>{hl(0)}{hl(1)}</div>
            <p className="bs-type bs-sub mt-[2%] max-w-[70%]" style={{ color: s.ink2, ...d(2.7) }}>{s.sub}</p>
            <div className="bs-block relative mt-[3%] flex w-[64%] items-center gap-[2%] p-[1%]" style={{ background: s.surface, borderRadius: s.radius, ...d(1.05) }}>
              <span className="bs-type bs-field flex-1 px-[4%] text-left" style={{ color: s.ink2, ...d(2.85) }}>Pick a day this week</span>
              <Cta delay={3.0} />
              <Cursor left="78%" top="30%" />
            </div>
            <div className="mt-[3%] flex gap-[2%]">
              {s.strip.map((c, i) => (
                <span key={c} className="bs-block bs-field whitespace-nowrap px-[3%] py-[1%]" style={{ border: `1px solid ${s.accent}66`, borderRadius: "999px", color: s.ink, ...d(1.2 + i * 0.08) }}>
                  <span className="bs-type" style={d(2.95 + i * 0.08)}>{c}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="bs-block relative mt-auto h-[26%] overflow-hidden" style={{ ...d(1.3), borderRadius: s.radius }}><Art s={s} /></div>
        </div>
      )}
    </div>
  );
}

/** The browser frame: chrome bar + the scenes stacked (16:10). `finished` = one static scene, no hooks. */
function Frame({ scenes, finished, tilt }: { scenes: Scene[]; finished?: boolean; tilt?: boolean }) {
  return (
    <div className={`bs-frame${finished ? " bs-finished" : ""}`} aria-hidden="true" {...(tilt ? { "data-tilt": "" } : {})}>
      <div className="bs-bar">
        <span className="bs-dot" style={{ background: "#ff5f57" }} /><span className="bs-dot" style={{ background: "#febc2e" }} /><span className="bs-dot" style={{ background: "#28c840" }} />
        <span className="bs-urls">
          {scenes.map((s, k) => <span key={s.id} className="bs-url bs-type" data-scene-index={k} style={d(0.1)}>https://{s.url}</span>)}
        </span>
        <span className="bs-check">contrast ✓ · responsive ✓</span>
      </div>
      <div className="bs-scenes">
        {scenes.map((s, k) => <SceneView key={s.id} s={s} k={k} />)}
      </div>
    </div>
  );
}

/**
 *   <BuildStage fig={1} />                                   the full stage: frame + build log + stamp + caption, data-scene="build"
 *   <BuildStage finished scene={1} />                        one finished frame (the roofer), static, no hooks: DemoSheet uses three
 * Place the full stage in the picture column of a row wrapped in `<div data-pin>` (unit + stage), so the desktop pin holds the text beside the scene.
 */
export function BuildStage({ fig = 1, finished, scene = 0, scenes = SCENES, className = "", stamp = "Build stage · Demo sites, not client work", caption = "Three demo businesses built from the same blank page: a restaurant, a roofer, a dentist. Scroll to build. Nothing here is a template recoloured." }: {
  fig?: number;
  /** Static final render of one scene (no keyframes, no data-scene), the frame only. */
  finished?: boolean;
  /** Which scene `finished` shows (0 restaurant · 1 roofer · 2 dentist). */
  scene?: number;
  scenes?: Scene[];
  className?: string;
  stamp?: string;
  caption?: React.ReactNode;
}) {
  if (finished) return <Frame scenes={[scenes[scene] ?? scenes[0]]} finished />;
  const id = `fig${fig}`;
  return (
    <figure className={`sf-stage wd-build ${className}`} aria-labelledby={`${id}-cap`} data-scene="build" data-reveal="">
      <div className="sf-stage-in">
        <Frame scenes={scenes} tilt />
        <div className="bs-logs" aria-live="off">
          {scenes.map((s, k) => (
            <ol key={s.id} className="bs-log" data-for={k}>
              {STEPS.map((st, i) => (
                <li key={st.step} style={d(st.t)} data-step={st.step}>
                  <span className="bs-log-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{st.label}{i === 0 && <span className="bs-log-kind"> · a {s.kind}</span>}</span>
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
      <span className="sf-tick" aria-hidden="true" style={{ display: "block" }} />
      <div className="stamp" aria-hidden="true"><span>FIG. {fig} · {stamp}</span><span>OneAlgorithm</span></div>
      <figcaption id={`${id}-cap`}>{caption}</figcaption>
    </figure>
  );
}
