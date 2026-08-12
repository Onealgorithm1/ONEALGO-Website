import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequest } from "./lead.js";

/* The whole point of this endpoint is that it REFUSES. A bot check that can be
   bypassed is worse than none, because it is believed. These tests exist to
   fail if the refusal is ever weakened -- including by accident, which is the
   likely way: someone debugging a rejected submission comments out the verify
   call, and nothing visible on the site changes. */

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const ENV = { TURNSTILE_SECRET_KEY: "test-secret", SALESFORCE_OID: "00Dtest" };

const post = (body) =>
  new Request("https://onealgorithm.com/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json", "CF-Connecting-IP": "203.0.113.7" },
    body: JSON.stringify(body),
  });

const GOOD = {
  firstName: "Dana",
  lastName: "Okonkwo",
  email: "dana@example.com",
  company: "Example Co",
  whatYouNeed: "Salesforce",
  message: "Our CRM and helpdesk disagree about who the customer is.",
  turnstileToken: "a-token",
};

/** Stubs fetch: siteverify answers `verified`, Salesforce answers `sfStatus`. */
const stubFetch = ({ verified = true, sfStatus = 200 } = {}) => {
  const calls = [];
  vi.stubGlobal("fetch", async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url) === SITEVERIFY)
      return new Response(JSON.stringify({ success: verified }), { status: 200 });
    return new Response("", { status: sfStatus });
  });
  return calls;
};

afterEach(() => vi.unstubAllGlobals());

describe("POST /api/lead", () => {
  it("forwards to Salesforce only after the token verifies", async () => {
    const calls = stubFetch();
    const res = await onRequest({ request: post(GOOD), env: ENV });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    // Order matters: verify first, forward second.
    expect(calls[0].url).toBe(SITEVERIFY);
    expect(calls[1].url).toContain("webto.salesforce.com");
    expect(calls[1].init.body).toContain("oid=00Dtest");
    expect(calls[1].init.body).toContain("dana%40example.com");
  });

  it("sends the visitor IP so a scraped token cannot be replayed elsewhere", async () => {
    const calls = stubFetch();
    await onRequest({ request: post(GOOD), env: ENV });
    expect(JSON.parse(calls[0].init.body).remoteip).toBe("203.0.113.7");
  });

  it("REFUSES and forwards nothing when the token fails verification", async () => {
    const calls = stubFetch({ verified: false });
    const res = await onRequest({ request: post(GOOD), env: ENV });

    expect(res.status).toBe(403);
    expect(calls.some((c) => c.url.includes("salesforce"))).toBe(false);
  });

  it("REFUSES when no token is supplied at all", async () => {
    const calls = stubFetch();
    const res = await onRequest({
      request: post({ ...GOOD, turnstileToken: "" }),
      env: ENV,
    });

    expect(res.status).toBe(400);
    // Not even a siteverify call: nothing left the edge.
    expect(calls).toHaveLength(0);
  });

  it("FAILS CLOSED when the secret is missing from the environment", async () => {
    const calls = stubFetch();
    const res = await onRequest({
      request: post(GOOD),
      env: { SALESFORCE_OID: "00Dtest" },
    });

    expect(res.status).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it("rejects a non-POST rather than falling through to the SPA", async () => {
    const res = await onRequest({
      request: new Request("https://onealgorithm.com/api/lead"),
      env: ENV,
    });
    expect(res.status).toBe(405);
    expect(res.headers.get("allow")).toBe("POST");
  });

  it("reports a Salesforce failure instead of thanking the visitor", async () => {
    stubFetch({ sfStatus: 500 });
    const res = await onRequest({ request: post(GOOD), env: ENV });

    expect(res.status).toBe(502);
    expect((await res.json()).error).toContain("service@onealgorithm.com");
  });

  it("keeps a single-box name instead of dropping it", async () => {
    const calls = stubFetch();
    await onRequest({
      request: post({ ...GOOD, firstName: "Cher", lastName: "" }),
      env: ENV,
    });
    const body = calls[1].init.body;
    // last_name is what Web-to-Lead requires, so the one value given goes there.
    expect(body).toContain("last_name=Cher");
    expect(body).not.toContain("first_name=");
  });

  it("validates before spending a siteverify call", async () => {
    const calls = stubFetch();
    const res = await onRequest({
      request: post({ ...GOOD, email: "not-an-email" }),
      env: ENV,
    });
    expect(res.status).toBe(400);
    expect(calls).toHaveLength(0);
  });
});
