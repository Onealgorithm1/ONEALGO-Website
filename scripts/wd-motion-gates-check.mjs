/**
 * The runnable check for the website-development motion gates (design-contract-webdev.md §2 "reduced motion",
 * §3, §5). Static: reads the source, no browser, < 100 ms. Exits 1 on the first breach.
 *
 *     node scripts/wd-motion-gates-check.mjs
 *
 *   1. client/styles/wd.css: every declaration that MOVES something (an `animation` other than none, a
 *      `transition` that names transform / translate / opacity / clip-path / stroke-dashoffset / block-size,
 *      or an `animation-timeline`) sits inside `@media (prefers-reduced-motion: no-preference)`; every
 *      `animation-timeline` also sits inside `@supports`. Colour-only transitions may sit anywhere (sf.css does).
 *   2. client/lib/sfMotion.ts: the one pin. `pin: true` appears exactly once, inside initBuildScenes, and
 *      initBuildScenes is reached only through gsap.matchMedia().add(PIN_MQ, …) with PIN_MQ exactly
 *      "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)".
 *   3. client/components/wd/BuildStage.tsx: the full stage carries data-scene="build"; the finished frame does not.
 *   4. public/work: the 36 window images exist and sit under their budgets (the encoder asserted them when it
 *      wrote them; this re-reads the sizes so a hand-replaced file cannot slip past).
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const ROOT = join(import.meta.dirname, "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

/* 1. wd.css gates. Walk the file tracking the at-rule stack by brace depth. */
{
  const css = read("client/styles/wd.css").replace(/\/\*[\s\S]*?\*\//g, "");
  const stack = []; let i = 0, buf = "", line = 1;
  const MOVES = /transform|translate|opacity|clip-path|stroke-dashoffset|block-size/;
  const check = (decl, where) => {
    const gated = stack.some((s) => /prefers-reduced-motion:\s*no-preference/.test(s));
    const supported = stack.some((s) => s.startsWith("@supports"));
    for (const d of decl.split(";")) {
      const [prop, ...rest] = d.split(":"); const val = rest.join(":").trim(); const p = (prop || "").trim();
      if (!p || !val) continue;
      if (p === "animation" && !/^none\b/.test(val)) ok(gated, `wd.css line ${where}: "animation: ${val}" outside prefers-reduced-motion: no-preference`);
      if (p === "animation-timeline") { ok(gated, `wd.css line ${where}: animation-timeline outside no-preference`); ok(supported, `wd.css line ${where}: animation-timeline outside @supports`); }
      if (p === "transition" && MOVES.test(val)) ok(gated, `wd.css line ${where}: moving transition "${val}" outside no-preference`);
    }
  };
  for (; i < css.length; i++) {
    const ch = css[i]; if (ch === "\n") line++;
    if (ch === "{") { const sel = buf.trim(); stack.push(sel); buf = ""; continue; }
    if (ch === "}") { check(buf, line); buf = ""; stack.pop(); continue; }
    buf += ch;
  }
  ok(stack.length === 0, "wd.css: unbalanced braces");
  const bytes = statSync(join(ROOT, "client/styles/wd.css")).size;
  console.log(`  ok  wd.css gates (${bytes} B raw${bytes > 8192 ? ", over the 8 KB budget: trim before release" : ""})`);
}

/* 2. the one pin */
{
  const src = read("client/lib/sfMotion.ts");
  const PIN = '"(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)"';
  ok(src.includes(`export const PIN_MQ = ${PIN}`), "sfMotion.ts: PIN_MQ is not the contract's media query");
  ok((src.match(/pin:\s*true/g) || []).length === 1, "sfMotion.ts: expected exactly one `pin: true`");
  const fn = src.slice(src.indexOf("function initBuildScenes"), src.indexOf("export function initSfMotion"));
  ok(/pin:\s*true/.test(fn), "sfMotion.ts: the pin is not inside initBuildScenes");
  const calls = [...src.matchAll(/initBuildScenes\(/g)].length;
  ok(calls === 2, `sfMotion.ts: initBuildScenes referenced ${calls} times (definition + the one matchMedia call expected)`);
  ok(src.includes("gsap.matchMedia().add(PIN_MQ, () => initBuildScenes(root))"), "sfMotion.ts: initBuildScenes must be called only via gsap.matchMedia().add(PIN_MQ, …)");
  console.log("  ok  sfMotion.ts: one pin, inside PIN_MQ");
}

/* 3. the build stage hooks */
{
  const src = read("client/components/wd/BuildStage.tsx");
  ok(src.includes('data-scene="build"'), "BuildStage.tsx: the full stage lacks data-scene=\"build\"");
  const frame = src.slice(src.indexOf("function Frame("), src.lastIndexOf("/**", src.indexOf("export function BuildStage")));
  ok(!frame.includes("data-scene="), "BuildStage.tsx: the finished frame must not carry data-scene");
  ok(src.includes("if (finished) return <Frame"), "BuildStage.tsx: `finished` must return the bare frame");
  console.log("  ok  BuildStage.tsx: data-scene on the stage only");
}

/* 4. the window images */
{
  const slugs = [...read("client/data/work.ts").matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
  const budget = { card: 60_000, screen2: 45_000, tall: 90_000 };
  let n = 0;
  for (const s of slugs) for (const [crop, b] of Object.entries(budget)) for (const [ext, mul] of [["avif", 1], ["webp", 1.5]]) {
    const f = join(ROOT, "public", "work", `${s}-${crop}.${ext}`);
    ok(existsSync(f), `missing ${f}: run node scripts/work-second-screen.mjs`);
    const size = statSync(f).size;
    ok(size <= b * mul, `${s}-${crop}.${ext}: ${size} B > ${b * mul} B`);
    n++;
  }
  console.log(`  ok  public/work: ${n} window images within budget`);
}
console.log(`wd-motion-gates-check: ${checks} assertions passed`);
