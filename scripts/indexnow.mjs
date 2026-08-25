#!/usr/bin/env node
/*
 * indexnow.mjs — tell Bing (and Yandex, Naver, Seznam) a URL changed, from the
 * terminal, without opening Bing Webmaster Tools.
 *
 * Created 2026-08-24 because /services/salesforce was missing from Bing's index
 * entirely — Bing had it as "an alternate version of a canonical page", pointing
 * at the homepage — and the only way anyone knew to fix that was clicking
 * "Request indexing" in a browser. This is that button, scriptable.
 *
 *   node scripts/indexnow.mjs --verify
 *   node scripts/indexnow.mjs /services/salesforce
 *   node scripts/indexnow.mjs https://onealgorithm.com/services/salesforce /about
 *   node scripts/indexnow.mjs --all          (every URL in public/sitemap.xml)
 *   node scripts/indexnow.mjs --all --dry-run
 *
 * HOW IT WORKS. IndexNow has no account and no secret. You host a file at
 * https://<host>/<key>.txt whose contents are the key; that hosted file IS the
 * proof you control the domain. So the key is public by design — it is safe in
 * git, safe in a screenshot, safe here. Nothing to leak, nothing to rotate on a
 * schedule.
 *
 * ⚠️ THE ONE FOOTGUN: the key file must be live on the PRODUCTION domain before
 * any submission is accepted. Ours ships in public/, so it goes live with the
 * next production deploy — not before. Run --verify first; it checks exactly
 * that and refuses to submit if the file is not reachable.
 *
 * ponytail: no dependencies, no batching cleverness, no retry queue. Node's
 * built-in fetch and a single POST. IndexNow accepts up to 10,000 URLs per
 * request, which is ~380x more than this site has, so chunking is not a problem
 * we have. If the site ever exceeds that, chunk in slices of 10000.
 */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const HOST = "onealgorithm.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/* The key is whichever <32-hex>.txt sits in public/. Discovering it beats
   hard-coding it in two places and letting them drift. */
function findKey() {
  const files = readdirSync(PUBLIC).filter((f) => /^[0-9a-f]{8,128}\.txt$/i.test(f));
  if (files.length === 0) {
    throw new Error(
      "No IndexNow key file in public/. Create one:\n" +
        "  KEY=$(node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\")\n" +
        '  echo -n "$KEY" > "public/$KEY.txt"',
    );
  }
  if (files.length > 1) {
    throw new Error(`More than one key file in public/ (${files.join(", ")}). Delete the stale one.`);
  }
  const key = files[0].replace(/\.txt$/i, "");
  const contents = readFileSync(join(PUBLIC, files[0]), "utf8").trim();
  if (contents !== key) {
    throw new Error(
      `public/${files[0]} must contain exactly its own filename-key.\n` +
        `  expected: ${key}\n  found:    ${contents || "(empty)"}`,
    );
  }
  return key;
}

/** Accepts "/about", "about", or a full URL. Returns an absolute URL on HOST.
 *
 * ⚠️ Git Bash / MSYS on Windows rewrites a leading-slash argument into a Windows
 * path before Node ever sees it: `/services/salesforce` arrives as
 * `C:/Program Files/Git/services/salesforce`. That silently submits a garbage
 * URL and IndexNow still answers 200. Caught the hard way on 2026-08-24 by
 * actually reading what got submitted. Detect it and refuse. */
function absolute(u) {
  if (/^[A-Za-z]:[\\/]/.test(u) || /Program Files|\/Git\//.test(u)) {
    throw new Error(
      [
        `Argument was rewritten by the shell into a Windows path:`,
        `  ${u}`,
        `Git Bash converts leading-slash arguments. Use one of:`,
        `  node scripts/indexnow.mjs https://onealgorithm.com/services/salesforce`,
        `  MSYS_NO_PATHCONV=1 node scripts/indexnow.mjs /services/salesforce`,
        `  node scripts/indexnow.mjs services/salesforce   (no leading slash)`,
      ].join("\n"),
    );
  }
  if (/^https?:\/\//i.test(u)) {
    const parsed = new URL(u);
    if (parsed.host !== HOST) {
      throw new Error(`Refusing to submit ${u} — IndexNow only accepts URLs on ${HOST}.`);
    }
    return parsed.toString();
  }
  return new URL(u.startsWith("/") ? u : `/${u}`, `https://${HOST}`).toString();
}

function fromSitemap() {
  const xml = readFileSync(join(PUBLIC, "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) throw new Error("No <loc> entries found in public/sitemap.xml");
  return urls;
}

/* Verify the key file is actually reachable on the live host. Submitting before
   this is true just gets a 403 from IndexNow with no useful explanation. */
async function verify(key) {
  const url = `https://${HOST}/${key}.txt`;
  process.stdout.write(`  key file  ${url}\n`);
  try {
    const res = await fetch(url, { redirect: "follow" });
    const body = (await res.text()).trim();
    if (!res.ok) {
      console.log(`  ✗ HTTP ${res.status} — not live yet. Deploy public/${key}.txt to production first.`);
      return false;
    }
    if (body !== key) {
      console.log(`  ✗ served, but contents do not match the key (got "${body.slice(0, 40)}")`);
      return false;
    }
    console.log("  ✓ live and correct");
    return true;
  } catch (e) {
    console.log(`  ✗ could not fetch: ${e.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const rest = args.filter((a) => a !== "--dry-run");
  const key = findKey();

  if (rest.includes("--verify")) {
    const ok = await verify(key);
    process.exit(ok ? 0 : 1);
  }

  const urlList = rest.includes("--all")
    ? fromSitemap()
    : rest.filter((a) => !a.startsWith("--")).map(absolute);

  if (!urlList.length) {
    console.log("Nothing to submit. Pass URLs, or --all, or --verify.");
    process.exit(1);
  }

  console.log(`IndexNow · ${HOST} · ${urlList.length} URL(s)`);
  if (!(await verify(key))) {
    console.log("\nAborting — the key file must be live before Bing will accept a submission.");
    process.exit(1);
  }

  for (const u of urlList) console.log(`  → ${u}`);
  if (dryRun) {
    console.log("\n--dry-run: nothing submitted.");
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList }),
  });
  const text = await res.text();

  /* 200 = accepted. 202 = accepted, key validation pending. Both are fine.
     Anything else is worth reading out loud rather than swallowing. */
  if (res.status === 200 || res.status === 202) {
    console.log(`\n✓ ${res.status} — submitted. Bing decides when to recrawl; this is a hint, not a command.`);
  } else {
    console.log(`\n✗ ${res.status} ${text || "(no body)"}`);
    if (res.status === 403) console.log("  403 usually means the key file is not reachable on the live host.");
    if (res.status === 422) console.log("  422 usually means a URL is not on the declared host.");
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(`indexnow: ${e.message}`);
  process.exit(1);
});
