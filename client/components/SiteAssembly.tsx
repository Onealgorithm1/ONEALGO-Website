import React, { useEffect, useRef, useState } from "react";

/* SiteAssembly — the signature hero for /services/website-development.
 *
 * A browser frame in which a website builds itself in front of the visitor:
 * blueprint grid + dashed outlines → blocks → palette → type → imagery →
 * a cursor presses the button — narrated by a mono build log. It then wipes
 * and builds a DIFFERENT kind of business with a DIFFERENT layout (restaurant:
 * full-bleed image + menu strip; roofer: split with an estimate form; dentist:
 * centred with a booking bar), so a prospect sees their sort of site get made
 * and sees that it is not one template recoloured. Pure CSS keyframes on
 * staggered delays (client/global.css, "SiteAssembly"); no library.
 *
 * Honest by construction: the sites are labelled demos, the imagery is drawn
 * (inline SVG, no photos pretending to be client work), no client is claimed,
 * and the "checks" chip only asserts what the demo literally has. Respects
 * prefers-reduced-motion (finished site, no loop) and stops cycling offscreen.
 */

type Layout = "fullbleed" | "split" | "centered";

type Scene = {
  id: string;
  kind: string;
  url: string;
  brand: string;
  nav: string[];
  headline: [string, string];
  sub: string;
  cta: string;
  strip: string[]; // secondary row — menu / form fields / services
  stat: [string, string];
  layout: Layout;
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
    id: "hearth",
    kind: "restaurant",
    url: "thehearthkitchen.demo",
    brand: "The Hearth",
    nav: ["Menu", "Reserve", "Events", "Visit"],
    headline: ["Wood-fired,", "since 1998."],
    sub: "Seasonal plates from a 900°F oven. Walk in, or reserve — the bar is first come.",
    cta: "Reserve a table",
    strip: ["Starters", "From the oven", "Dessert", "Wine"],
    stat: ["Open till 11", "Thu – Sat"],
    layout: "fullbleed",
    bg: "#1d1a16",
    surface: "#2a251f",
    ink: "#f6efe4",
    ink2: "#cdbfa8",
    accent: "#e0863a",
    accentInk: "#1d1a16",
    radius: "2px",
    font: "Georgia, 'Times New Roman', serif",
  },
  {
    id: "ridgeline",
    kind: "roofing contractor",
    url: "ridgelineroofing.demo",
    brand: "RIDGELINE",
    nav: ["Roofing", "Siding", "Storm repair", "About"],
    headline: ["A roof that", "outlasts the mortgage."],
    sub: "Licensed, insured, and on site within 48 hours after a storm.",
    cta: "Get my estimate",
    strip: ["Name", "Address", "Phone"],
    stat: ["48h", "storm response"],
    layout: "split",
    bg: "#f4f5f7",
    surface: "#ffffff",
    ink: "#141a22",
    ink2: "#4b5563",
    accent: "#d6321f",
    accentInk: "#ffffff",
    radius: "0px",
    font: "'IBM Plex Sans', system-ui, sans-serif",
  },
  {
    id: "brightwater",
    kind: "dental clinic",
    url: "brightwaterdental.demo",
    brand: "Brightwater",
    nav: ["Services", "New patients", "Insurance", "Team"],
    headline: ["Dentistry that", "doesn't feel like it."],
    sub: "Same-week appointments and clear pricing before you sit down.",
    cta: "Book online",
    strip: ["Cleaning", "Whitening", "Invisalign", "Emergency"],
    stat: ["Same week", "appointments"],
    layout: "centered",
    bg: "#ffffff",
    surface: "#eaf6f5",
    ink: "#0f2b30",
    ink2: "#4f6b70",
    accent: "#0f9d8f",
    accentInk: "#ffffff",
    radius: "14px",
    font: "'IBM Plex Sans', system-ui, sans-serif",
  },
];

/* Build steps and the second (within the scene) each appears. The CSS
   keyframes use the same clock. */
const STEPS: [number, string][] = [
  [0.0, "new site — layout grid"],
  [0.7, "structure — nav, hero, sections"],
  [1.5, "palette — brand colours applied"],
  [2.2, "type — headline, body, buttons"],
  [3.0, "imagery + motion"],
  [3.7, "checks — contrast, responsive ✓"],
];

const SCENE_MS = 7200; // 4.2s build, ~2.2s hold, 0.8s wipe

/* Drawn "photographs" — one small illustration per business, in that
   business's own colours. Not photos; not client work. */
function Art({ s }: { s: Scene }) {
  const common = {
    className: "sa-photo absolute inset-0 h-full w-full",
    preserveAspectRatio: "xMidYMid slice" as const,
    "aria-hidden": true,
  };
  if (s.id === "hearth")
    return (
      <svg viewBox="0 0 200 140" {...common}>
        <defs>
          <radialGradient id="sa-ember" cx="50%" cy="60%" r="60%">
            <stop offset="0" stopColor="#ffb86b" />
            <stop offset=".45" stopColor="#c2561d" />
            <stop offset="1" stopColor="#2a130a" />
          </radialGradient>
        </defs>
        <rect width="200" height="140" fill="url(#sa-ember)" />
        <path d="M30 140 V80 A70 70 0 0 1 170 80 V140 Z" fill="#160b06" opacity=".85" />
        <path d="M46 140 V86 A54 54 0 0 1 154 86 V140 Z" fill="url(#sa-ember)" />
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
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M${52 + k * 12} 72 l48 -37`} stroke="#5b6675" strokeWidth="1.2" opacity=".6" />
        ))}
        <rect x="64" y="84" width="16" height="14" fill="#7fb4e6" />
        <rect x="120" y="84" width="16" height="14" fill="#7fb4e6" />
        <rect x="92" y="88" width="16" height="28" fill={s.accent} />
        <path d="M150 116 L172 40 M158 116 L180 40" stroke="#141a22" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <path key={k} d={`M${153 + k * 3.6} ${106 - k * 12} h8`} stroke="#141a22" strokeWidth="2" />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 400 100" {...common}>
      <rect width="400" height="100" fill="#eaf6f5" />
      <path d="M0 70 C80 40 140 96 220 66 S340 40 400 62 V100 H0 Z" fill="#bfeee8" opacity=".7" />
      <circle cx="320" cy="34" r="22" fill="#bfeee8" />
      {/* tooth */}
      <path
        d="M70 18 C54 18 45 30 48 45 C50 57 55 64 57 79 C58 85 64 86 66 79 L70 63 L74 79 C76 86 82 85 83 79 C85 64 90 57 92 45 C95 30 86 18 70 18 Z"
        fill="#ffffff"
        stroke={s.accent}
        strokeWidth="2.5"
      />
      <path d="M58 34 C63 28 77 28 82 34" stroke={s.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* sparkles */}
      <path d="M320 26 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill={s.accent} />
      <path d="M110 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 Z" fill={s.accent} opacity=".7" />
      {/* calendar strip */}
      {[0, 1, 2, 3, 4].map((k) => (
        <rect key={k} x={170 + k * 26} y="34" width="20" height="20" rx="4" fill={k === 2 ? s.accent : "#ffffff"} stroke={s.accent} strokeWidth="1.5" opacity={k === 2 ? 1 : 0.8} />
      ))}
    </svg>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

const REST = "perspective(1400px) rotateY(-9deg) rotateX(4deg)";

export default function SiteAssembly({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(host);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduced || !visible) return;
    const out = window.setTimeout(() => setLeaving(true), SCENE_MS - 800);
    const next = window.setTimeout(() => {
      setLeaving(false);
      setI((n) => (n + 1) % SCENES.length);
    }, SCENE_MS);
    return () => {
      window.clearTimeout(out);
      window.clearTimeout(next);
    };
  }, [i, reduced, visible]);

  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
  };
  const onLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = REST;
  };

  const s = SCENES[i];
  const d = (sec: number) => ({ ["--d" as string]: `${sec}s` }) as React.CSSProperties;
  const HL = "sa-type font-bold leading-[1.05] text-[clamp(13px,2.5vw,26px)]";
  const hl = (k: 0 | 1) => (
    <div className={HL} style={{ color: k ? s.accent : s.ink, ...d(2.25 + k * 0.2) }}>
      {s.headline[k]}
    </div>
  );
  const Cta = ({ delay = 2.95 }: { delay?: number }) => (
    <span
      className="sa-pop inline-block whitespace-nowrap px-[4%] py-[2%] text-[clamp(7px,1.05vw,11px)] font-semibold"
      style={{ background: s.accent, color: s.accentInk, borderRadius: s.radius, ...d(delay) }}
    >
      {s.cta}
    </span>
  );
  const Cursor = ({ left, top }: { left: string; top: string }) => (
    <svg className="sa-cursor absolute h-4 w-4 drop-shadow" style={{ left, top }} viewBox="0 0 24 24" fill="#fff" stroke="#000" strokeWidth="1.5">
      <path d="M4 3l7 17 2.5-6.5L20 11z" />
    </svg>
  );
  const Nav = () => (
    <div className="sa-block flex items-center justify-between" style={d(0.7)}>
      <span className="sa-type text-[clamp(11px,1.6vw,15px)] font-bold" style={{ color: s.ink, ...d(2.2) }}>
        {s.brand}
      </span>
      <div className="hidden gap-4 sm:flex">
        {s.nav.map((n, k) => (
          <span key={n} className="sa-type text-[clamp(8px,1.1vw,11px)]" style={{ color: s.ink2, ...d(2.3 + k * 0.08) }}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div ref={hostRef} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={frameRef}
        className="sa-frame relative overflow-hidden rounded-xl border border-white/10 bg-oa-night2 shadow-[-30px_40px_90px_-30px_rgba(0,0,0,.85)]"
        style={{ transform: REST }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-oa-night3 px-3 py-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28c840]" />
          <span key={s.url} className="sa-type ml-3 rounded-md bg-black/30 px-3 py-1 font-mono text-[11px] text-oa-nightInk3" style={d(0.1)}>
            https://{s.url}
          </span>
          <span
            key={`chk-${s.id}`}
            className="sa-check ml-auto hidden whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] text-emerald-300 ring-1 ring-emerald-400/40 sm:inline"
          >
            contrast ✓ · responsive ✓
          </span>
        </div>

        <div
          key={s.id}
          className={`sa-scene relative aspect-[16/11] sm:aspect-[16/10] ${leaving ? "is-leaving" : ""}`}
          style={{ ["--to" as string]: s.bg, fontFamily: s.font } as React.CSSProperties}
        >
          <div
            className="sa-grid absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(127,180,230,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(127,180,230,.22) 1px, transparent 1px)",
              backgroundSize: "8.333% 12.5%",
            }}
          />
          <div className="sa-paint absolute inset-0" />

          {/* ---------- LAYOUT 1: full-bleed image, copy over it, menu strip ---------- */}
          {s.layout === "fullbleed" && (
            <div className="relative flex h-full flex-col">
              <div className="sa-block relative flex-1 overflow-hidden" style={d(0.85)}>
                <Art s={s} />
                <div
                  className="sa-photo absolute inset-0"
                  style={{ background: "linear-gradient(90deg, rgba(29,26,22,.92) 0%, rgba(29,26,22,.55) 55%, rgba(29,26,22,.1) 100%)" }}
                />
                <div className="relative flex h-full flex-col p-[4%]">
                  <Nav />
                  <div className="mt-auto max-w-[62%]">
                    {hl(0)}
                    {hl(1)}
                    <p className="sa-type mt-[2%] text-[clamp(7px,1.05vw,11px)] leading-snug" style={{ color: s.ink2, ...d(2.7) }}>
                      {s.sub}
                    </p>
                    <div className="relative mt-[3%] flex items-center gap-[3%]">
                      <Cta />
                      <span className="sa-pop whitespace-nowrap text-[clamp(7px,1vw,10px)]" style={{ color: s.ink2, ...d(3.05) }}>
                        <b style={{ color: s.ink }}>{s.stat[0]}</b> {s.stat[1]}
                      </span>
                      <Cursor left="12%" top="55%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sa-block flex items-center justify-between px-[4%] py-[2%]" style={{ background: s.surface, ...d(1.15) }}>
                {s.strip.map((c, k) => (
                  <span key={c} className="sa-type text-[clamp(7px,1vw,10px)] tracking-wide" style={{ color: k === 1 ? s.accent : s.ink, ...d(2.9 + k * 0.1) }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ---------- LAYOUT 2: split — copy left, estimate form right, image band ---------- */}
          {s.layout === "split" && (
            <div className="relative flex h-full flex-col p-[4%]">
              <Nav />
              <div className="mt-[3%] grid flex-1 grid-cols-12 gap-[3%]">
                <div className="col-span-7 flex flex-col justify-center">
                  <div className="sa-block" style={d(0.85)}>
                    {hl(0)}
                    {hl(1)}
                  </div>
                  <p className="sa-type mt-[3%] max-w-[92%] text-[clamp(7px,1.05vw,11px)] leading-snug" style={{ color: s.ink2, ...d(2.7) }}>
                    {s.sub}
                  </p>
                  <span className="sa-pop mt-[3%] text-[clamp(7px,1vw,10px)]" style={{ color: s.ink2, ...d(3.05) }}>
                    <b style={{ color: s.ink }}>{s.stat[0]}</b> {s.stat[1]}
                  </span>
                  <div className="sa-block relative mt-[4%] h-[34%] overflow-hidden" style={{ ...d(1.25), borderRadius: s.radius }}>
                    <Art s={s} />
                  </div>
                </div>
                <div
                  className="sa-block relative col-span-5 flex flex-col justify-center gap-[6%] p-[4%]"
                  style={{ background: s.surface, boxShadow: "0 1px 0 rgba(0,0,0,.06), 0 8px 24px -12px rgba(0,0,0,.25)", ...d(1.0) }}
                >
                  <span className="sa-type text-[clamp(8px,1.2vw,12px)] font-bold" style={{ color: s.ink, ...d(2.6) }}>
                    Free estimate
                  </span>
                  {s.strip.map((f, k) => (
                    <div
                      key={f}
                      className="sa-block flex h-[13%] items-center px-[6%] text-[clamp(6px,.9vw,9px)]"
                      style={{ border: `1px solid ${s.ink2}55`, color: s.ink2, ...d(1.3 + k * 0.1) }}
                    >
                      <span className="sa-type" style={d(2.75 + k * 0.1)}>
                        {f}
                      </span>
                    </div>
                  ))}
                  <div className="relative">
                    <Cta delay={3.0} />
                    <Cursor left="20%" top="30%" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------- LAYOUT 3: centred copy, booking bar, service chips, art below ---------- */}
          {s.layout === "centered" && (
            <div className="relative flex h-full flex-col p-[4%]">
              <Nav />
              <div className="mt-[4%] flex flex-col items-center text-center">
                <div className="sa-block" style={d(0.85)}>
                  {hl(0)}
                  {hl(1)}
                </div>
                <p className="sa-type mt-[2%] max-w-[70%] text-[clamp(7px,1.05vw,11px)] leading-snug" style={{ color: s.ink2, ...d(2.7) }}>
                  {s.sub}
                </p>
                <div className="sa-block relative mt-[3%] flex w-[64%] items-center gap-[2%] p-[1%]" style={{ background: s.surface, borderRadius: s.radius, ...d(1.05) }}>
                  <span className="sa-type flex-1 px-[4%] text-left text-[clamp(6px,.9vw,9px)]" style={{ color: s.ink2, ...d(2.85) }}>
                    Pick a day this week
                  </span>
                  <Cta delay={3.0} />
                  <Cursor left="78%" top="30%" />
                </div>
                <div className="mt-[3%] flex gap-[2%]">
                  {s.strip.map((c, k) => (
                    <span
                      key={c}
                      className="sa-block whitespace-nowrap px-[3%] py-[1%] text-[clamp(6px,.9vw,9px)]"
                      style={{ border: `1px solid ${s.accent}66`, borderRadius: "999px", color: s.ink, ...d(1.2 + k * 0.08) }}
                    >
                      <span className="sa-type" style={d(2.95 + k * 0.08)}>
                        {c}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="sa-block relative mt-auto h-[26%] overflow-hidden" style={{ ...d(1.3), borderRadius: s.radius }}>
                <Art s={s} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Build log: full list ≥sm; on phones a single rolling line. */}
      <ol key={`log-${s.id}`} className="sa-log mt-4 hidden space-y-1 font-mono text-[11px] leading-5 text-oa-nightInk3 sm:block" aria-live="off">
        {STEPS.map(([t, label], k) => (
          <li key={label} style={d(t)} className="flex gap-3">
            <span className="text-oa-orange">{String(k + 1).padStart(2, "0")}</span>
            <span>
              {label}
              {k === 0 && <span className="text-oa-nightInk2"> — a {s.kind}</span>}
            </span>
          </li>
        ))}
      </ol>
      <div key={`roll-${s.id}`} className="sa-roll relative mt-3 h-5 font-mono text-[11px] leading-5 text-oa-nightInk3 sm:hidden" aria-hidden="true">
        {STEPS.map(([t, label], k) => (
          <span key={label} style={d(t)} className={`absolute inset-x-0 flex gap-3 ${k === STEPS.length - 1 ? "is-last" : ""}`}>
            <span className="text-oa-orange">{String(k + 1).padStart(2, "0")}</span>
            <span className="truncate">
              {label}
              {k === 0 && <> — a {s.kind}</>}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] text-oa-nightInk3">Demo sites, drawn and built live in your browser. Not client work.</p>
    </div>
  );
}
