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

console.log(failures ? `\n${failures} failure(s).` : '\nAnalytics hostname guard is correct.');
process.exit(failures ? 1 : 0);
