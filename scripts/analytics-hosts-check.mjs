/**
 * Verifies that Google Analytics only fires on the production hostnames.
 *
 *     node scripts/analytics-hosts-check.mjs
 *
 * Why this exists: the measurement id G-RC48CMQ05T is hardcoded in index.html and
 * ships to every deployment of this site. Cloudflare gives each preview build its
 * own *.pages.dev hostname, so without a guard those builds report into the
 * production property. In the 28 days to 2026-08-02 that was 5 sessions from
 * onealgorithm-staging.pages.dev and 1 from a Builder.io preview, against 39
 * real ones - eleven percent of the property was not real traffic.
 *
 * Analytics pollution is invisible: nothing errors, no test fails, the numbers
 * are simply wrong and every decision taken from them is wrong too. This check
 * is the only thing standing between a refactor of that snippet and silently
 * corrupt data.
 *
 * Deliberately plain node, matching scripts/prerender.mjs, so it runs on a bare
 * clone with no install.
 */

import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

/** Hostnames that MUST report. */
const MUST_REPORT = ['onealgorithm.com', 'www.onealgorithm.com'];

/**
 * Hostnames that MUST NOT report. The first two are not hypothetical - both
 * appear in the live GA4 property and are the reason this guard was tightened.
 */
const MUST_NOT_REPORT = [
    'onealgorithm-staging.pages.dev',
    '1dc89f2b.onealgo-builderio.pages.dev',
    'onealgo-website.pages.dev',
    'some-future-preview.pages.dev',
    'localhost',
    '127.0.0.1',
    'blog.onealgorithm.com'
];

let failures = 0;
const fail = (msg) => {
    console.error(`FAIL  ${msg}`);
    failures++;
};
const pass = (msg) => console.log(`  ok  ${msg}`);

// --- the allowlist must exist at all -----------------------------------------

const listMatch = html.match(/const\s+ANALYTICS_HOSTS\s*=\s*\[([^\]]*)\]/);

if (!listMatch) {
    fail('ANALYTICS_HOSTS allowlist not found in index.html. If the analytics ' +
         'snippet was rewritten, this check must be rewritten with it - do not delete it.');
    process.exit(1);
}

const hosts = [...listMatch[1].matchAll(/["']([^"']+)["']/g)].map(m => m[1]);
pass(`allowlist found: ${hosts.join(', ')}`);

// --- the guard must actually wrap the gtag config call ------------------------

// A correct allowlist that nothing consults would pass a naive check while
// reporting from everywhere, so verify the call site too.
const guarded = /ANALYTICS_HOSTS\.includes\(\s*location\.hostname\s*\)\s*\)\s*\{[^}]*gtag\(\s*["']config["']/s.test(html);

if (guarded) {
    pass('gtag("config") is inside the hostname guard');
} else {
    fail('gtag("config") is NOT guarded by ANALYTICS_HOSTS.includes(location.hostname). ' +
         'The allowlist is present but nothing consults it, so every deployment reports.');
}

// --- behaviour ----------------------------------------------------------------

for (const host of MUST_REPORT) {
    if (hosts.includes(host)) {
        pass(`reports from ${host}`);
    } else {
        fail(`${host} is production traffic and must report, but is not in the allowlist`);
    }
}

for (const host of MUST_NOT_REPORT) {
    if (!hosts.includes(host)) {
        pass(`silent on ${host}`);
    } else {
        fail(`${host} must NOT report into the production property`);
    }
}

// --- one measurement id, and it is the expected one ---------------------------

const ids = [...new Set([...html.matchAll(/G-[A-Z0-9]{6,12}/g)].map(m => m[0]))];

if (ids.length === 1 && ids[0] === 'G-RC48CMQ05T') {
    pass(`single measurement id ${ids[0]}`);
} else {
    fail(`expected exactly one measurement id G-RC48CMQ05T, found: ${ids.join(', ') || 'none'}`);
}

// --- Microsoft Clarity rides the SAME allowlist -------------------------------

// Clarity is a second analytics tag on the same page with the same failure mode:
// if it runs on staging and previews, the heatmaps and recordings are a mix of
// real visitors and our own deploys, and nothing errors to say so. It reuses
// ANALYTICS_HOSTS rather than declaring its own list, so this only has to prove
// the reuse is real.

const CLARITY_ID = 'y7nmhim5ql';

const clarityIds = [...new Set(
    [...html.matchAll(/["']clarity["'][^)]*?["']([a-z0-9]{8,12})["']/g)].map(m => m[1])
)];

if (clarityIds.length === 1 && clarityIds[0] === CLARITY_ID) {
    pass(`single Clarity project id ${clarityIds[0]}`);
} else {
    fail(`expected exactly one Clarity project id ${CLARITY_ID}, found: ${clarityIds.join(', ') || 'none'}`);
}

// Same shape as the gtag assertion above: an allowlist nothing consults is worse
// than no allowlist, because it reads as protection.
const clarityGuarded =
    /ANALYTICS_HOSTS\.includes\(\s*location\.hostname\s*\)\s*\)\s*\{[\s\S]{0,1400}?clarity\.ms\/tag/.test(html);

if (clarityGuarded) {
    pass('Clarity injection is inside the hostname guard');
} else {
    fail('The Clarity tag is NOT behind ANALYTICS_HOSTS.includes(location.hostname). ' +
         'Staging and preview deploys would record into the production project.');
}

// Deliberately injected on `load` and not parsed in the head: mobile TBT on this
// site is already over budget with GA4 alone. A plain <script src> for clarity.ms
// means someone pasted Microsoft's stock snippet back in and undid that.
if (/<script[^>]+clarity\.ms/.test(html)) {
    fail('Clarity is loaded as a <script src> in the markup. It must be injected ' +
         'on `load` instead - see the comment above the snippet in index.html.');
} else if (/addEventListener\(\s*["']load["'][\s\S]{0,800}?clarity\.ms\/tag/.test(html)) {
    pass('Clarity is injected on `load`, not parsed in the head');
} else {
    fail('Clarity is not injected on `load`. It was moved without the reason being ' +
         'revisited - mobile TBT is already over the 200ms budget with GA4 alone.');
}

// --- the static 404 page carries the same guard --------------------------------

// public/404.html is hand-written and self-contained; it got analytics on
// 2026-08-25 so broken inbound links become visible. It must use the SAME
// allowlist, or preview 404s pollute the property from a page nobody audits.
const html404 = readFileSync(join(root, 'public', '404.html'), 'utf8');
const list404 = html404.match(/HOSTS\s*=\s*\[([^\]]*)\]/);
const hosts404 = list404 ? [...list404[1].matchAll(/["']([^"']+)["']/g)].map(m => m[1]) : [];

if (hosts404.length && hosts404.every(h => MUST_REPORT.includes(h)) && MUST_REPORT.every(h => hosts404.includes(h))) {
    pass('404.html uses the same production allowlist');
} else {
    fail(`404.html allowlist is ${hosts404.length ? hosts404.join(', ') : 'missing'} — must equal ${MUST_REPORT.join(', ')}`);
}
if (/HOSTS\.indexOf\(location\.hostname\)\s*!==\s*-1\)\s*\{[\s\S]{0,600}gtag\(\s*["']config["']/.test(html404)) {
    pass('404.html gtag("config") is inside its hostname guard');
} else {
    fail('404.html sends gtag("config") outside the hostname guard');
}

console.log(failures ? `\n${failures} failure(s).` : '\nAnalytics hostname guards are correct (GA4 + Clarity + 404).');
process.exit(failures ? 1 : 0);
