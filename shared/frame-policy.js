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
 * paths in a source are ignored, which can only make it say "allowed" for a path-restricted source. No site we
 * frame uses one.
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
  const xfo = (headers.get("x-frame-options") || "").split(",")[0].trim().toUpperCase();
  // SAMEORIGIN can never match: the client site and onealgorithm.com are different origins. Other values
  // (ALLOW-FROM, typos) are ignored by Chrome and Safari, so they do not block.
  if (xfo === "DENY" || xfo === "SAMEORIGIN") return { allowed: false, reason: `X-Frame-Options: ${xfo}` };
  return { allowed: true, reason: "no framing headers" };
}

function sourceMatches(src, parent) {
  const s = src.toLowerCase();
  if (s === "*") return true;
  if (s === "'none'" || s === "'self'") return false; // 'self' = the framed site's own origin, never ours
  const m = s.match(/^(?:([a-z][a-z0-9+.-]*):)?(?:\/\/)?([^/:]*)?(?::(\d+|\*))?/);
  if (!m) return false;
  const [, scheme, host = "", port] = m;
  if (scheme && !host) return scheme + ":" === parent.protocol || (scheme === "http" && parent.protocol === "https:");
  if (scheme && scheme + ":" !== parent.protocol && !(scheme === "http" && parent.protocol === "https:")) return false;
  if (!scheme && parent.protocol !== "https:" && parent.protocol !== "http:") return false;
  const hostOk = host.startsWith("*.") ? parent.hostname.endsWith(host.slice(1)) : parent.hostname === host;
  const portOk = !port || port === "*" || port === (parent.port || (parent.protocol === "https:" ? "443" : "80"));
  return hostOk && portOk;
}
