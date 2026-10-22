// Offline contract check: node scripts/blog-subscription-check.mjs (Node 24).
import assert from "node:assert/strict";
import { submitBlogSubscription } from "../client/lib/lead.ts";
import { onRequest } from "../functions/api/lead.js";

const originalFetch = globalThis.fetch;
let forwarded;
let verified = 0;
let outcome = "success";
globalThis.fetch = async (url, options) => {
  if (url === "/api/lead") {
    return onRequest({
      request: new Request("http://localhost/api/lead", options),
      env: { TURNSTILE_SECRET_KEY: "offline-test", SALESFORCE_OID: "offline-test" },
    });
  }
  if (url === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
    verified++;
    assert.equal(JSON.parse(options.body).response, "offline-token");
    return Response.json({ success: outcome !== "expired" });
  }
  if (url === "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8") {
    forwarded = new URLSearchParams(options.body);
    return new Response(null, { status: outcome === "delivery-failure" ? 502 : 200 });
  }
  throw new Error(`Unexpected request blocked: ${url}`);
};

try {
  await assert.rejects(submitBlogSubscription("invalid", "post", "offline-token"), /email/);
  await assert.rejects(submitBlogSubscription("reader@example.com", "post", ""), /complete the check/);
  assert.equal(verified, 0, "invalid requests must fail before verification");
  await submitBlogSubscription(" reader@example.com ", "home-inspector-website-design", "offline-token");
  assert.equal(forwarded.get("email"), "reader@example.com");
  assert.equal(forwarded.get("last_name"), "reader@example.com");
  assert.equal(forwarded.get("lead_source"), "Web");
  assert.match(forwarded.get("description"), /Service: Blog subscription/);
  assert.match(forwarded.get("description"), /\/blog\/home-inspector-website-design/);
  forwarded = undefined;
  outcome = "expired";
  await assert.rejects(submitBlogSubscription("reader@example.com", "post", "offline-token"), /expired/);
  assert.equal(forwarded, undefined, "expired tokens must never forward a lead");
  outcome = "delivery-failure";
  await assert.rejects(submitBlogSubscription("reader@example.com", "post", "offline-token"), /could not deliver/);
  console.log("PASS: email-only payload, Salesforce subscription tag, validation, expired-token rejection, delivery failure (zero network calls).");
} finally {
  globalThis.fetch = originalFetch;
}
