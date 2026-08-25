import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- CSS STRING ---
export const SHOWCASE_CSS = `
  @keyframes aurora-drift-1 {
    0% { transform: translate(0%, 0%) rotate(0deg); }
    25% { transform: translate(10%, 5%) rotate(2deg); }
    50% { transform: translate(-5%, -3%) rotate(-1deg); }
    75% { transform: translate(-8%, 8%) rotate(1deg); }
    100% { transform: translate(0%, 0%) rotate(0deg); }
  }
  @keyframes aurora-drift-2 {
    0% { transform: translate(0%, 0%) rotate(0deg); }
    33% { transform: translate(-7%, -8%) rotate(-2deg); }
    66% { transform: translate(6%, 4%) rotate(1deg); }
    100% { transform: translate(0%, 0%) rotate(0deg); }
  }
  @keyframes aurora-drift-3 {
    0% { transform: translate(0%, 0%) rotate(0deg); }
    50% { transform: translate(-4%, 10%) rotate(-3deg); }
    100% { transform: translate(0%, 0%) rotate(0deg); }
  }
  @keyframes gradient-sweep {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes shine-sweep {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes rotate-angle {
    to { --angle: 360deg; }
  }
  .perspective-container {
    perspective: 900px;
  }
`;

// --- Hero Options ---
export const HERO_OPTIONS = [
  { id: "aether", label: "Aether", note: "Live WebGL light ribbons" },
  { id: "woven", label: "3D light", note: "Cursor-reactive sculpture" },
  { id: "starfield", label: "Warp", note: "Depth, trails, parallax" },
  { id: "ribbons", label: "Ribbons", note: "Waves that follow you" },
  { id: "lattice", label: "Lattice", note: "Connected network field" },
  { id: "aurora", label: "Aurora", note: "Soft brand light" },
  { id: "gears", label: "Film", note: "Our brand footage" },
];

// --- 1. Aurora Background ---
export const AuroraBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  const prefersReduced = useReducedMotion();
  const isReduced = prefersReduced ?? false;

  // Big soft ribbons: ellipses, brighter than a "glow", so the aurora reads
  // as a subject rather than a tint. Blur is on the layer, not the page.
  const orbitClasses = "absolute -inset-[20%] blur-[70px] mix-blend-screen";
  const orbit1Style = { background: "radial-gradient(ellipse 55% 40% at 30% 30%, rgba(0,94,170,0.95) 0%, rgba(0,94,170,0) 70%)" };
  const orbit2Style = { background: "radial-gradient(ellipse 45% 35% at 72% 70%, rgba(255,166,52,0.55) 0%, rgba(255,166,52,0) 70%)" };
  const orbit3Style = { background: "radial-gradient(ellipse 60% 30% at 55% 45%, rgba(20,150,160,0.75) 0%, rgba(20,150,160,0) 70%)" };
  const anim1 = !isReduced ? { animation: "aurora-drift-1 24s infinite alternate ease-in-out", willChange: "transform" } as React.CSSProperties : {};
  const anim2 = !isReduced ? { animation: "aurora-drift-2 28s infinite alternate ease-in-out", willChange: "transform" } as React.CSSProperties : {};
  const anim3 = !isReduced ? { animation: "aurora-drift-3 20s infinite alternate ease-in-out", willChange: "transform" } as React.CSSProperties : {};

  return (
    <div className={`absolute inset-0 overflow-hidden bg-oa-night ${className}`} aria-hidden="true">
      <div className={orbitClasses} style={{ ...orbit1Style, ...anim1 }} />
      <div className={orbitClasses} style={{ ...orbit2Style, ...anim2 }} />
      <div className={orbitClasses} style={{ ...orbit3Style, ...anim3 }} />
    </div>
  );
};

// --- 2. Kinetic Headline ---
export const KineticHeadline: React.FC<{ lines: string[]; className?: string }> = ({ lines, className = "" }) => {
  const prefersReduced = useReducedMotion();
  const isReduced = prefersReduced ?? false;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {lines.map((line, lineIdx) => {
        const isLastLine = lineIdx === lines.length - 1;
        return (
          <div key={lineIdx} className="overflow-hidden">
            {isReduced ? (
              <p className="text-oa-nightInk">{line}</p>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="flex flex-wrap gap-x-2">
                {line.split(" ").map((word, wordIdx) => (
                  <motion.span key={wordIdx} variants={wordVariants} className={`inline-block ${isLastLine ? "bg-gradient-to-r from-oa-orange via-white to-oa-orange bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradient-sweep_6s_ease-in-out_infinite]" : "text-oa-nightInk"}`}>
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- 3. Hero Switcher ---
interface HeroSwitcherOption {
  id: string;
  label: string;
}

export const HeroSwitcher: React.FC<{
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string; note?: string }[];
}> = ({ value, onChange, options }) => {
  const railRef = useRef<HTMLDivElement>(null);

  // Roving-tabindex radiogroup: arrows move AND select, matching the pattern
  // screen-reader users expect from a segmented control.
  const move = (dir: 1 | -1, from: number) => {
    const next = (from + dir + options.length) % options.length;
    onChange(options[next].id);
    const el = railRef.current?.querySelectorAll<HTMLButtonElement>("[role=radio]")[next];
    el?.focus();
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div
      ref={railRef}
      role="radiogroup"
      aria-label="Choose a hero treatment"
      className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
    >
      {options.map((o, i) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(o.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(1, i); }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(-1, i); }
            }}
            className={`group relative w-[168px] shrink-0 snap-start rounded-lg border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active
                ? "border-oa-orange/70 bg-white/10"
                : "border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.07]"
            }`}
          >
            <span className={`block text-sm font-semibold ${active ? "text-white" : "text-oa-nightInk2"}`}>
              {o.label}
            </span>
            {o.note && (
              <span className="mt-1 block text-[11px] leading-snug text-oa-nightInk3">{o.note}</span>
            )}
            {active && (
              <motion.span
                layoutId="hero-ground-underline"
                className="absolute inset-x-4 bottom-0 h-px bg-oa-orange"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

// --- 4. Magnetic Button ---
interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
  tone: "orange" | "ghost";
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, href, tone }) => {
  const prefersReduced = useReducedMotion();
  const isReduced = prefersReduced ?? false;
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => setIsTouch(true);
    window.addEventListener("touchstart", checkTouch, { once: true });
    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  const disabled = isReduced || isTouch;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = Math.min(6, Math.max(-6, e.clientX - centerX));
    const moveY = Math.min(6, Math.max(-6, e.clientY - centerY));
    x.set(moveX);
    y.set(moveY);
  }, [disabled, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const baseClasses = "relative px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const toneClasses = tone === "orange" ? "bg-oa-orange text-oa-ink hover:brightness-110" : "border border-white/40 text-white hover:bg-white/10";

  const motionProps = disabled ? {} : { style: { x: springX, y: springY } };

  const content = (
    <motion.span className="relative z-10" {...motionProps}>
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={baseClasses + " " + toneClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={baseClasses + " " + toneClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  );
};

// --- 5. Shine Button ---
export const ShineButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-sm bg-oa-blue text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white group">
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full group-hover:animate-[shine-sweep_700ms_ease-in-out] pointer-events-none">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      </span>
    </button>
  );
};

// --- 6. Gradient Border Button ---
export const GradientBorderButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReduced = useReducedMotion();
  // 1px conic ring: the gradient paints the padding box, an inner span covers
  // the content box with the section's own navy, so only a hairline shows.
  const ring: React.CSSProperties = {
    background: "conic-gradient(from var(--angle, 0deg), #ffa634, #005eaa 45%, #0b1f33 60%, #ffa634)",
    animation: prefersReduced ? undefined : "rotate-angle 5s linear infinite",
  };
  return (
    <button className="relative rounded-lg p-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" style={ring}>
      <span className="block rounded-[7px] bg-oa-night px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b1f33]">
        {children}
      </span>
    </button>
  );
};

// --- 7. Glass Button ---
export const GlassButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="px-6 py-3 rounded-lg font-semibold text-sm bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
      {children}
    </button>
  );
};

// --- 8. Icon Shift Button ---
export const IconShiftButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-oa-ink text-white font-semibold text-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oa-blue transition-all">
      <span className="tracking-wide group-hover:tracking-tight transition-all duration-300">{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
};

// --- 9. Tilt Card ---
export const TiltCard: React.FC<{ title: string; body: string; icon?: React.ReactNode; index?: string; className?: string }> = ({ title, body, icon, index, className = "" }) => {
  const prefersReduced = useReducedMotion();
  const isReduced = prefersReduced ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => setIsTouch(true);
    window.addEventListener("touchstart", checkTouch, { once: true });
    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  const disabled = isReduced || isTouch;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const percentX = relX / rect.width;
    const percentY = relY / rect.height;
    setMx(percentX * 100);
    setMy(percentY * 100);
    rotateX.set((0.5 - percentY) * 16);
    rotateY.set((percentX - 0.5) * 16);
  }, [disabled, rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setMx(50);
    setMy(50);
  }, [rotateX, rotateY]);

  const cardStyle = disabled ? {} : {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
  };

  return (
    <div
      ref={ref}
      className={`relative perspective-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={cardStyle}
        className="relative flex min-h-[240px] flex-col justify-start overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
      >
        {/* Specular highlight */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.4) 0%, transparent 60%)` }}
        />
        {(icon || index) && (
          <div className="z-10 mb-5 flex items-center justify-between">
            {icon && <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-oa-orange/15 text-oa-orange ring-1 ring-oa-orange/30">{icon}</span>}
            {index && <span className="font-mono text-xs tracking-widest text-oa-nightInk3">{index}</span>}
          </div>
        )}
        <h3 className="z-10 text-xl font-semibold">{title}</h3>
        <p className="z-10 mt-2.5 text-oa-nightInk2 leading-relaxed">{body}</p>
      </motion.div>
    </div>
  );
};
