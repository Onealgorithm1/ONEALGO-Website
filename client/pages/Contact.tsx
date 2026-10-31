import React, { useState, useRef, useEffect } from "react";
import { loadTurnstile, submitLead, TURNSTILE_SITE_KEY } from "../lib/lead";
import Layout from "../components/Layout";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import { StructuredData, createContactPageSchema } from "../components/StructuredData";
import { SfPage, SfButton, SmartSection, LedgerRule, GoDeeper } from "../components/sf";
import { SF_PHONE } from "../data/salesforceShared";

// TypeScript declarations for Google Analytics tracking
declare global {
  interface Window {
    trackFormSubmission?: (formId?: string, extra?: Record<string, unknown>) => void;
    trackContactClick?: (method: string, placement?: string) => void;
  }
}

const EMAIL = "service@onealgorithm.com";
const SERVICES = [
  "Salesforce / CRM",
  "IT Consulting",
  "Website Development",
  "Zendesk Implementation / Support",
  "Marketing Services",
  "Staff Augmentation",
  "HR & Staffing Support",
  "Other",
];
const SERVICE_LABEL: Record<string, string> = { "IT Consulting": "IT Consulting & Strategy" };
const OFFICES = [
  { k: "USA · Head office", lines: ["625 Swedesford Rd, Unit B", "Malvern, PA 19355", "1 (610) 890-9711"] },
  { k: "India", lines: ["2nd Floor, Plot No. 536", "Madhapur, Hyderabad", "Telangana 500081, IN"] },
  { k: "UAE", lines: ["Building R118, Suite 201-A-42", "Al Suq Al Kabeer, Dubai"] },
  { k: "Canada", lines: ["120 Adelaide St W", "Toronto, ON M5H 1T1"] },
];
const NEXT = [
  "A person reads it, not a queue.",
  "You get a reply within one business day from someone who can talk about the work.",
  "If it fits, a short conversation about what you run and what is not working. No discovery fee, no obligation.",
];

const EMPTY = { firstName: "", lastName: "", email: "", phone: "", company: "", whatYouNeed: "", message: "" };

/**
 * /contact on the Salesforce v2 kit (owner 2026-10-23: the Salesforce pages link here instead of embedding a
 * form, so this page carries their look). Every function of the old page is kept: the fields, the honeypot,
 * Turnstile (loaded here, not in index.html, so 25 form-less pages do not pay for it), the shared lead path
 * (lib/lead.ts → /api/lead), the beforeunload guard, the GA4 generate_lead event, the ?need= prefill, the
 * click-to-load map, the four offices and the NAP. New: ?topic= and ?from= from the Salesforce desk CTA become
 * the Lead's "Topic:" / "Submitted on:" lines and the topic chip, and the phone field (optional) the old
 * Salesforce form had.
 */
export default function Contact() {
  useSEO({
    title: "Contact OneAlgorithm — Malvern, PA · (610) 890-9711",
    description:
      "Call 1 (610) 890-9711 or send the form — a person replies within one business day. Websites, SEO, Google Ads and CRM from Malvern, PA.",
    canonical: getCanonicalUrl("/contact"),
    ogTitle: "Contact OneAlgorithm — Malvern, PA · (610) 890-9711",
    ogDescription: "Call 1 (610) 890-9711 or send the form — a person replies within one business day.",
    ogUrl: getCanonicalUrl("/contact"),
    preloadFonts: ["/fonts/bricolage-grotesque-latin-700-800.woff2"],
  });
  const [formData, setFormData] = useState(EMPTY);
  // From the Salesforce desk CTA (client/components/sf/DeskCTA.tsx contactHref): the topic label and the route.
  const [topic, setTopic] = useState("");
  const [from, setFrom] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot: a hidden field real users never see. Bots fill it; we drop those.
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Nothing is requested from Google until a visitor asks for the map.
  const [mapLoaded, setMapLoaded] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");
  const widgetHost = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  };

  // ?need=salesforce (every Salesforce page's CTA) pre-picks the service so the visitor is not asked to describe
  // what they came for twice; ?topic= and ?from= say which page sent them. Read in an effect, not at render:
  // prerender.mjs serialises this page with no query string, so the static HTML stays the generic form.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("need") === "salesforce") {
      setFormData((prev) => (prev.whatYouNeed ? prev : { ...prev, whatYouNeed: "Salesforce / CRM" }));
    }
    if (q.get("need") === "website") {
      setFormData((prev) => (prev.whatYouNeed ? prev : { ...prev, whatYouNeed: "Website Development" }));
    }
    setTopic((q.get("topic") || "").slice(0, 60));
    const f = q.get("from") || "";
    setFrom(/^\/[^\s]*$/.test(f) ? f.slice(0, 200) : "");
  }, []);

  useEffect(() => {
    if (isSubmitted) return;
    let cancelled = false;
    const mount = () => {
      if (cancelled || !widgetHost.current || widgetId.current !== null) return;
      if (!window.turnstile) return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        // A token is good for about five minutes; clearing it on expiry gives the visitor the widget again
        // instead of a rejection they cannot act on.
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
        theme: "light",
      });
    };
    loadTurnstile().then(mount).catch((error) => {
      if (!cancelled) setSubmitError(error.message);
    });
    return () => {
      cancelled = true;
    };
  }, [isSubmitted]);

  useEffect(() => {
    if (isSubmitted) doneRef.current?.focus();
  }, [isSubmitted]);

  /* Warn before losing a part-filled form: arms once something is typed, disarms on submit. Covers refresh,
     tab close and off-site links; not in-app navigation (needs a router blocker this app does not have). */
  const hasContent = Object.values(formData).some((v) => v.trim() !== "");
  useEffect(() => {
    if (!hasContent || isSubmitted) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasContent, isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam honeypot: if this hidden field has a value, it's a bot. Silently drop.
    if (honeypotRef.current?.value) {
      setIsSubmitted(true);
      return;
    }

    // Move focus to whatever is wrong: the message alone leaves the visitor to hunt for it.
    const focusField = (id: string) => {
      const el = document.getElementById(id);
      if (el instanceof HTMLElement) {
        el.focus();
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!emailOk) {
      setSubmitError("Please enter a valid email address.");
      focusField("email");
      return;
    }
    if (!formData.whatYouNeed?.trim()) {
      setSubmitError("Please tell us what you need — pick the closest option.");
      focusField("whatYouNeed");
      return;
    }
    // Managed Turnstile normally settles in well under a second; this is reached mainly when the script is blocked.
    if (!turnstileToken) {
      setSubmitError(
        "The anti-spam check hasn't finished. Give it a second and press send again — or call 1 (610) 890-9711.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // One POST to our own edge function (lib/lead.ts, first-touch record included); it verifies the bot check
      // with a secret this page never sees and only then forwards to Salesforce.
      const res = await submitLead(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company,
          whatYouNeed: formData.whatYouNeed,
          message: formData.message,
          topic: topic || undefined,
          page: from || window.location.pathname,
          turnstileToken,
        },
        `We couldn't send that. Please call 1 (610) 890-9711 or email ${EMAIL}.`,
      );
      if (!res.ok) {
        setIsSubmitting(false);
        setSubmitError(res.error);
        // Turnstile tokens are single use; without this reset the next attempt sends a spent token.
        resetTurnstile();
        return;
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.trackFormSubmission?.("contact", {
        topic: topic || formData.whatYouNeed,
        source: from || undefined,
      });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError("An error occurred while submitting your message. Please try again or contact us directly.");
      console.error("Form submission error:", error);
    }
  };

  const field = (name: keyof typeof EMPTY, label: React.ReactNode, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={formData[name]} onChange={handleChange} disabled={isSubmitting} {...props} />
    </div>
  );
  const req = <b aria-hidden="true"> *</b>;

  return (
    <Layout>
      <StructuredData data={createContactPageSchema()} />
      <SfPage base={[{ label: "Home", to: "/" }]} crumbs={[{ label: "Contact" }]}>
        {/* HERO: the phone first (owner: "we want our phone ringing"), the form one jump below. */}
        <section className="sf-hero" aria-labelledby="h-contact">
          <div className="sf-wrap sf-grid">
            <div className="sf-c7">
              <p className="sf-kicker">Contact</p>
              <h1 className="sf-h1" id="h-contact">Talk to a person at OneAlgorithm</h1>
              <p className="sf-lede sf-measure" data-lede="">
                Call, or send the form; someone who can talk about the work replies within one business day.
              </p>
              <div className="sf-ctas">
                <SfButton href="#start" magnet cta="hero">Send the form</SfButton>
                <a className="sf-phone-xl" style={{ color: "var(--navy)" }} href={SF_PHONE.href} data-cta="hero-phone" onClick={() => window.trackContactClick?.("phone", "contact-hero")}>
                  {SF_PHONE.display}
                </a>
              </div>
              <p className="sf-mono" style={{ marginTop: 20 }}>
                OneAlgorithm · 625 Swedesford Rd, Unit B, Malvern, PA 19355 · Mon–Fri 9–5 ·{" "}
                <a className="sf-link" href={`mailto:${EMAIL}`} onClick={() => window.trackContactClick?.("email", "contact-hero")}>{EMAIL}</a>
              </p>
            </div>
            <LedgerRule as="aside" className="sf-c5" aria-labelledby="h-after">
              <h2 className="sf-h3" id="h-after">What happens after you send it</h2>
              <ol style={{ marginTop: 14, display: "grid", gap: 10 }}>
                {NEXT.map((s, i) => (
                  <li key={i} style={{ display: "flex", gap: 12 }}>
                    <span className="sf-mono" style={{ color: "var(--orange-text)", paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p style={{ marginTop: 16 }}>You own everything we build. No lock-in, no code held hostage.</p>
            </LedgerRule>
          </div>
        </section>

        {/* THE FORM (#start): the night band, same desk card the Salesforce pages use. */}
        <section className="sf-section sf-night" id="start" aria-labelledby="h-start">
          <div className="sf-wrap sf-grid">
            <div className="sf-c5 sf-desk-copy">
              <h2 className="sf-h2" id="h-start">Send the form</h2>
              <p className="sf-lede sf-measure" style={{ marginTop: 14 }}>
                Tell us what you are trying to fix. A person reads it and replies within one business day.
              </p>
              <p className="sf-kicker" style={{ marginTop: 32 }}>Good to include</p>
              <ul className="sf-covers">
                <li>What you run today and what is not working</li>
                <li>Roughly how many people it touches</li>
                <li>Anything you have already been quoted</li>
              </ul>
              <p style={{ marginTop: 32 }}>Prefer to talk it through?</p>
              <a className="sf-phone-xl" href={SF_PHONE.href} data-cta="desk" onClick={() => window.trackContactClick?.("phone", "contact-desk")}>{SF_PHONE.display}</a>
              <p className="sf-mono" style={{ marginTop: 16 }}>Mon–Fri 9–5 Eastern · {EMAIL}</p>
            </div>
            <div className="sf-c7">
              <div className="desk-card sf-desk-panel">
                {isSubmitted ? (
                  <div role="status">
                    <h3 ref={doneRef} tabIndex={-1} className="sf-h3" style={{ outline: "none" }}>Received.</h3>
                    <p style={{ marginTop: 12 }}>A person at OneAlgorithm reads it and replies within one business day.</p>
                    <p style={{ marginTop: 12 }}>
                      Urgent? Call <a className="sf-link" href={SF_PHONE.href}>{SF_PHONE.display}</a> or email{" "}
                      <a className="sf-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                    </p>
                    <SfButton
                      ghost
                      type="button"
                      className="sf-desk-btn"
                      onClick={() => { setIsSubmitted(false); setFormData(EMPTY); setSubmitError(null); }}
                    >
                      Send another message
                    </SfButton>
                  </div>
                ) : (
                  <>
                    <h3 className="sf-h3" id="start-title">Tell us what you need</h3>
                    {topic && <p className="sf-topic-chip">Topic · {topic}</p>}
                    <form onSubmit={handleSubmit} className="sf-form" aria-labelledby="start-title">
                      {/* Honeypot — hidden from users, catches bots. Do not remove. */}
                      <input
                        ref={honeypotRef}
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                      />
                      {submitError && (
                        <p className="sf-form-alert" role="alert" aria-live="polite">{submitError}</p>
                      )}
                      {/* Two name fields: Salesforce stores them separately and REQUIRES last name. */}
                      <div className="sf-form-row">
                        {field("firstName", "First name", { type: "text", autoComplete: "given-name" })}
                        {field("lastName", <>Last name{req}</>, { type: "text", required: true, autoComplete: "family-name" })}
                      </div>
                      <div className="sf-form-row">
                        {field("email", <>Work email{req}</>, { type: "email", required: true, autoComplete: "email", spellCheck: false, autoCapitalize: "off", placeholder: "you@company.com" })}
                        {field("phone", "Phone (optional; we call rather than email)", { type: "tel", autoComplete: "tel" })}
                      </div>
                      <div className="sf-form-row">
                        {field("company", <>Company{req}</>, { type: "text", required: true, autoComplete: "organization" })}
                        <div>
                          <label htmlFor="whatYouNeed">What do you need?{req}</label>
                          <select id="whatYouNeed" name="whatYouNeed" required value={formData.whatYouNeed} onChange={handleChange} disabled={isSubmitting}>
                            <option value="">Pick the closest option</option>
                            {SERVICES.map((s) => <option key={s} value={s}>{SERVICE_LABEL[s] || s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message">Tell us more (optional)</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} disabled={isSubmitting} placeholder="What you run, what is not working, what you have been quoted" />
                      </div>
                      {/* The bot check, visible: a check that runs silently on everyone is something a privacy policy has to disclose anyway. */}
                      <div>
                        <div ref={widgetHost} style={{ minHeight: 65 }} />
                        <p className="sf-form-note" style={{ marginTop: 8 }}>Protected by Cloudflare Turnstile; no traffic-light puzzles.</p>
                      </div>
                      <SfButton type="submit" cta="desk-form" disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send — we reply within 1 business day"}
                      </SfButton>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* OFFICES + MAP (surface): the NAP the schema points at, four offices as ledger columns, the map on request. */}
        <SmartSection tone="surface" grid labelledBy="h-offices">
          <div className="sf-c12">
            <h2 className="sf-h2" id="h-offices">Where we are</h2>
          </div>
          {OFFICES.map((o, i) => (
            <LedgerRule key={o.k} className="sf-c3" delay={i * 0.08}>
              <p className="sf-kicker">{o.k}</p>
              <p className="sf-offices" style={{ marginTop: 10 }}>
                {o.lines.map((l) => <span key={l}>{l}</span>)}
              </p>
            </LedgerRule>
          ))}
          <div className="sf-c12 sf-map">
            {mapLoaded ? (
              <iframe
                title="OneAlgorithm Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.4774062403612!2d-75.5771397!3d40.042445799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6f327d5340c9d%3A0x218ca530a72f1726!2sOneAlgorithm%20Consulting!5e0!3m2!1sen!2sus!4v1759511875621!5m2!1sen!2sus"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="sf-map-inner">
                {/* Nothing is requested from Google until the button is pressed: the embed sends every visitor's IP to Google. */}
                <p>The Google map loads when you ask for it, so your address is not sent to Google before you choose.</p>
                <SfButton ghost type="button" onClick={() => setMapLoaded(true)}>Load the map</SfButton>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=OneAlgorithm+Consulting+625+Swedesford+Rd+Malvern+PA+19355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-link"
                  style={{ display: "inline-flex", minHeight: 44, alignItems: "center" }}
                >
                  Or open it in Google Maps (new tab)
                </a>
              </div>
            )}
          </div>
        </SmartSection>

        {/* NOT SURE YET: permission to ask without a project, and the checkable facts. */}
        <SmartSection grid labelledBy="h-ask">
          <LedgerRule className="sf-c7">
            <h2 className="sf-h2" id="h-ask">Not sure yet? Ask anyway.</h2>
            <p className="sf-lede sf-measure" style={{ marginTop: 14 }}>
              You do not need a defined project or a budget; weighing whether something is worth doing is a useful, short conversation.
            </p>
            <p className="sf-measure" style={{ marginTop: 16 }}>
              We are based in Malvern, Pennsylvania: a Select Salesforce Consulting Partner whose AppExchange record lists 16 Salesforce-certified people, and registered on SAM.gov, both checkable without taking our word for it.
            </p>
          </LedgerRule>
          <LedgerRule className="sf-c5" delay={0.08}>
            <h3 className="sf-h3">What we take on</h3>
            <ul className="sf-points">
              <li>IT consulting and strategy; cloud and process work</li>
              <li>Websites, SEO and marketing technology</li>
              <li>Salesforce, Zendesk, staff augmentation</li>
            </ul>
            <GoDeeper label="what each service covers">
              <h4>IT consulting and strategic planning</h4>
              <p>Technology audits, digital transformation plans, cybersecurity assessments, cloud migration planning and process optimization.</p>
              <h4>Website development and design</h4>
              <p>Custom sites, responsive design, e-commerce, SEO, content management and performance work.</p>
              <h4>Staff augmentation</h4>
              <p>Developers, IT specialists, project managers and subject-matter experts for short or long engagements.</p>
              <h4>Marketing technology and automation</h4>
              <p>Campaign management, marketing automation, customer journeys, analytics, CRM integration and ROI tracking.</p>
            </GoDeeper>
          </LedgerRule>
        </SmartSection>
      </SfPage>
    </Layout>
  );
}
