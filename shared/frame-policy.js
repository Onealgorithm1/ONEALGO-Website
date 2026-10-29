/**
 * May `parentOrigin` (e.g. "https://onealgorithm.com") show this response in an <iframe>?
 * Reads the two headers browsers enforce: CSP `frame-ancestors` and, only when no CSP sets frame-ancestors,
 * X-Frame-Options (CSP Level 2 §7.7.1: frame-ancestors obsoletes XFO). Report-only CSP is not enforced, so it is
 * not read. A browser refusing a frame fires no error event, so this is the only way to know before showing a blank.
 *
 *   frameAllowed(res.headers, "https://onealgorithm.com") -> { allowed: false, reason: "frame-ancestors 'self'" }
 *
 * Used by functions/api/frame-check.js (live, per preview) and scripts/preview-gate.mjs (build-time drift check).
 * ponytail: host-source matching covers what real sites send (scheme, host, *.wildcard, port, '*', 'self', 'none');
 * `https://*` and `:80`-style edge cases answer "blocked", the safe direction (dated capture, never a blank).
 */
export function frameAllowed(headers, parentOrigin) {
  const parent = new URL(parentOrigin);
  // fetch() joins repeated headers with ", "; each CSP policy is enforced on its own, so ANY blocking one blocks.
  const csp = (headers.get("content-security-policy") || "").split(","); // a comma never occurs inside a CSP policy
  const fa = csp.map((p) => p.split(";").map((d) => d.trim()).find((d) => /^frame-ancestors(\s|$)/i.test(d))).filter(Boolean);
  if (fa.length) {
    for (const d of fa) {
      const sources = d.split(/\s+/).slice(1);
      if (!sources.some((s) => sourceMatches(s, parent))) return { allowed: false, reason: d };
    }
    return { allowed: true, reason: fa.join(" | ") };
  }
  // HTML spec "check a navigation response's adherence to X-Frame-Options": several distinct values that include
  // deny/sameorigin/allowall block; one value blocks if deny or sameorigin (SAMEORIGIN can never be us: different
  // origins). Anything else (ALLOW-FROM, typos) is ignored by browsers.
  const xfo = new Set((headers.get("x-frame-options") || "").split(",").map((v) => v.trim().toLowerCase()).filter(Boolean));
  const strict = ["deny", "sameorigin", "allowall"].some((v) => xfo.has(v));
  if ((xfo.size > 1 && strict) || xfo.has("deny") || (xfo.size === 1 && xfo.has("sameorigin")))
    return { allowed: false, reason: `X-Frame-Options: ${[...xfo].join(", ").toUpperCase()}` };
  return { allowed: true, reason: "no framing headers" };
}

function sourceMatches(src, parent) {
  const s = src.toLowerCase();
  if (s === "*") return true;
  if (s === "'none'" || s === "'self'") return false; // 'self' = the framed site's own origin, never ours
  const m = s.match(/^(?:([a-z][a-z0-9+.-]*):)?(?:\/\/)?([^/:]*)?(?::(\d+|\*))?(\/.*)?$/);
  if (!m) return false;
  const [, scheme, host = "", port, p] = m;
  if (p && p !== "/") return false; // the parent is matched with path "/", so any narrower path blocks
  if (scheme && !host) return scheme + ":" === parent.protocol || (scheme === "http" && parent.protocol === "https:");
  if (scheme && scheme + ":" !== parent.protocol && !(scheme === "http" && parent.protocol === "https:")) return false;
  if (!scheme && parent.protocol !== "https:" && parent.protocol !== "http:") return false;
  const hostOk = host.startsWith("*.") ? parent.hostname.endsWith(host.slice(1)) : parent.hostname === host;
  const portOk = !port || port === "*" || port === (parent.port || (parent.protocol === "https:" ? "443" : "80"));
  return hostOk && portOk;
}
