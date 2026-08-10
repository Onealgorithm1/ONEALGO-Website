/**
 * Contrast self-check for the OneAlgorithm palette.
 *
 * The brand colours are fixed: blue #005eaa and orange #ffa634. Orange is the
 * trap - at 1.95:1 on white it fails every WCAG threshold including the 3:1
 * floor for non-text UI, so it can never be text, an icon or a border on a
 * light background, and it can never carry a white label. Every derived token
 * below exists to keep the brand visible while staying legible.
 *
 * Run: node scripts/contrast-check.mjs
 * Exits non-zero if any pairing regresses, so a bad palette edit fails loudly.
 */

/** WCAG 2.1 relative luminance. */
function luminance(hex) {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** WCAG 2.1 contrast ratio, order-independent. */
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const T = {
  paper: "#f7f8fa",
  surface: "#ffffff",
  hairline: "#e3e8ef",
  ink: "#0d1b2a",
  ink2: "#35485c",
  ink3: "#5a6b7d",
  blue: "#005eaa", // BRAND - do not change
  blue600: "#004a86",
  blue700: "#003a6b",
  blueTint: "#eaf2f9",
  orange: "#ffa634", // BRAND - do not change
  orangeText: "#9a4f00",
  night: "#04182b",
  night2: "#072338",
  nightInk: "#ffffff",
  nightInk2: "#dbe4ee",
  nightInk3: "#9fb3c8",
  nightBlue: "#7fb4e6",
};

// [label, foreground, background, minimum ratio]
// 4.5 = AA body text, 3.0 = AA large text (>=24px) and non-text UI.
const CASES = [
  ["ink on paper", T.ink, T.paper, 4.5],
  ["ink on surface", T.ink, T.surface, 4.5],
  ["body ink-2 on paper", T.ink2, T.paper, 4.5],
  ["muted ink-3 on paper", T.ink3, T.paper, 4.5],
  ["muted ink-3 on surface", T.ink3, T.surface, 4.5],
  ["blue link on paper", T.blue, T.paper, 4.5],
  ["blue link on surface", T.blue, T.surface, 4.5],
  ["blue-600 hover on surface", T.blue600, T.surface, 4.5],
  ["ink on blue-tint callout", T.ink, T.blueTint, 4.5],
  ["white label on blue button", T.surface, T.blue, 4.5],
  ["INK label on orange button", T.ink, T.orange, 4.5],
  ["orange-text as text on paper", T.orangeText, T.paper, 4.5],
  ["orange-text as text on surface", T.orangeText, T.surface, 4.5],
  ["white heading on night", T.nightInk, T.night, 4.5],
  ["body on night", T.nightInk2, T.night, 4.5],
  ["muted on night", T.nightInk3, T.night, 4.5],
  ["muted on night-2 card", T.nightInk3, T.night2, 4.5],
  ["blue link on night", T.nightBlue, T.night, 4.5],
  ["BRAND orange accent on night", T.orange, T.night, 4.5],
  ["BRAND orange accent on night-2", T.orange, T.night2, 4.5],
];

// Pairings that must NEVER ship. Guards against a well-meaning edit
// reintroducing the exact failure this palette was built to remove.
const FORBIDDEN = [
  ["white label on orange button", T.surface, T.orange],
  ["brand orange as text on white", T.orange, T.surface],
  ["brand orange as text on paper", T.orange, T.paper],
];

let failed = 0;

console.log("PAIRINGS THAT MUST PASS\n");
for (const [label, fg, bg, min] of CASES) {
  const ratio = contrast(fg, bg);
  const ok = ratio >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${ratio.toFixed(2).padStart(6)}:1  (min ${min})  ${label}`,
  );
}

console.log("\nPAIRINGS THAT MUST NOT BE USED (documented failures)\n");
for (const [label, fg, bg] of FORBIDDEN) {
  const ratio = contrast(fg, bg);
  // These are expected to fail; a PASS here means a token drifted and the
  // guard is no longer meaningful, which is also worth knowing about.
  const stillFails = ratio < 4.5;
  if (!stillFails) failed++;
  console.log(
    `${stillFails ? "ok" : "??"}    ${ratio.toFixed(2).padStart(6)}:1  ${label}`,
  );
}

// Anchors: the formula itself must be right, or every number above is noise.
const anchors = [
  ["black on white", contrast("#000000", "#ffffff"), 21],
  ["white on white", contrast("#ffffff", "#ffffff"), 1],
];
for (const [label, actual, expected] of anchors) {
  if (Math.abs(actual - expected) > 0.01) {
    console.error(`\nformula check failed: ${label} = ${actual}, expected ${expected}`);
    failed++;
  }
}

console.log(
  failed === 0
    ? "\nAll palette pairings meet their target."
    : `\n${failed} pairing(s) off target.`,
);
process.exit(failed === 0 ? 0 : 1);
