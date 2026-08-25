/**
 * Are the crawlers that produce AI citations actually allowed?
 *
 * WHY THIS EXISTS
 *
 * Each major assistant runs SEPARATE agents for model training and for
 * retrieval, and only the retrieval agents decide whether this company can be
 * named in an answer. The previous robots.txt allowed a long list of bots "for
 * maximum SEO visibility" and did not mention OAI-SearchBot, Claude-SearchBot,
 * Claude-User or Perplexity-User at all — it was permissive toward the crawlers
 * that take content and silent about the ones that give citations back.
 *
 * That is invisible in every other check. The file parses, the site builds, no
 * page looks wrong, and nothing reports that ChatGPT Search cannot quote you.
 * Hence this.
 *
 * It also verifies the file is not naming RETIRED agents (`anthropic-ai`,
 * `Claude-Web`), because a rule for an agent that no longer exists reads as
 * coverage while providing none.
 *
 *   node scripts/ai-crawler-check.mjs            # checks public/robots.txt
 *   node scripts/ai-crawler-check.mjs --live     # also checks what is SERVED
 *
 * ⚠️ `--live` is the one that matters. If it fails while the local check
 * passes, production is simply BEHIND this repo: the served file is whatever the
 * last production deploy shipped. Verified 2026-08-25 — the live file was the
 * 2026-08-06 version (nothing had been pushed to production since), not, as
 * this comment used to claim, Cloudflare's managed robots.txt. Cloudflare's
 * feature PREPENDS a block ending `# END Cloudflare Managed Content` and never
 * drops the origin file (developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/);
 * that marker is the tell if it is ever switched on. Also: the bare
 * onealgorithm-staging.pages.dev host is the staging project's PRODUCTION-branch
 * deploy, which nobody updates — check staging.onealgorithm-staging.pages.dev.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE = process.argv.includes("--live");
const ORIGIN = "https://onealgorithm.com";

/** Must be allowed, or this company cannot be cited by that assistant. */
const CITATION_AGENTS = [
  ["OAI-SearchBot", "ChatGPT Search — the crawler behind ChatGPT citations"],
  ["ChatGPT-User", "ChatGPT fetching a page because a user asked"],
  ["Claude-SearchBot", "Claude search indexing"],
  ["Claude-User", "Claude fetching a page because a user asked"],
  ["PerplexityBot", "Perplexity's search index"],
  ["Perplexity-User", "Perplexity user-initiated fetch"],
  ["Google-Extended", "permission token for AI Overviews grounding"],
];

/** Named in the file but retired by their vendors — coverage theatre. */
const RETIRED = ["anthropic-ai", "Claude-Web"];

let passed = 0;
const failures = [];
const check = (label, fn) => {
  try {
    fn();
    passed++;
    console.log(`  ok    ${label}`);
  } catch (error) {
    failures.push(label);
    console.log(`  FAIL  ${label}\n        ${error.message}`);
  }
};

/**
 * Minimal robots.txt parser: walks agent groups and records the first rule for
 * each. Enough to answer "is this agent allowed at /", which is the only
 * question here.
 */
function allowsRoot(text, agent) {
  const lines = text.split(/\r?\n/);
  let inGroup = false;
  let verdict = null;
  for (const raw of lines) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const [rawKey, ...rest] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") {
      // A new user-agent line after rules ends the previous group.
      if (inGroup && verdict !== null) break;
      inGroup = value.toLowerCase() === agent.toLowerCase();
      continue;
    }
    if (!inGroup) continue;
    if (key === "disallow") verdict = value === "" ? true : !value.startsWith("/");
    if (key === "allow" && verdict === null) verdict = true;
  }
  return verdict;
}

async function run(label, text) {
  console.log(`\n${label}\n`);

  for (const [agent, why] of CITATION_AGENTS) {
    check(`${agent} may crawl — ${why}`, () => {
      const verdict = allowsRoot(text, agent);
      if (verdict === null)
        throw new Error(
          `no rule for ${agent}; it falls through to User-agent: * — state it explicitly so a future edit cannot silently drop it`,
        );
      if (verdict === false) throw new Error(`${agent} is DISALLOWED`);
    });
  }

  check("no retired agent names are used", () => {
    const found = RETIRED.filter((a) =>
      new RegExp(`^\\s*user-agent:\\s*${a}\\s*$`, "im").test(text),
    );
    if (found.length)
      throw new Error(`${found.join(", ")} — retired by the vendor, so these rules do nothing`);
  });

  check("training crawlers are addressed deliberately, not by omission", () => {
    for (const a of ["GPTBot", "ClaudeBot"]) {
      if (allowsRoot(text, a) === null)
        throw new Error(`${a} has no explicit rule — decide and state it`);
    }
  });
}

const local = fs.readFileSync(path.join(__dirname, "..", "public", "robots.txt"), "utf8");
await run("public/robots.txt (what this repo ships)", local);

if (LIVE) {
  const res = await fetch(`${ORIGIN}/robots.txt`).catch(() => null);
  if (!res || !res.ok) {
    failures.push("fetch live robots.txt");
    console.log(`\n  FAIL  could not fetch ${ORIGIN}/robots.txt`);
  } else {
    const served = await res.text();
    if (served.trim() !== local.trim()) {
      console.log(
        `\n⚠️  THE SERVED FILE IS NOT THIS FILE. Either production has not been\n` +
          `    deployed since public/robots.txt last changed (git log -- public/robots.txt),\n` +
          `    or a "# END Cloudflare Managed Content" marker means Cloudflare's managed\n` +
          `    block was switched on. Everything below describes what the world sees.`,
      );
    }
    await run(`${ORIGIN}/robots.txt (what the world sees)`, served);
  }
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
