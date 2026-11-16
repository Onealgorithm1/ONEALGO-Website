import * as React from "react";
import { loadTurnstile, submitLead, TURNSTILE_SITE_KEY } from "../../lib/lead";
import { SfButton } from "./SfPage";
import { SF_PHONE } from "../../data/salesforceShared";

declare global {
  interface Window {
    trackFormSubmission?: (formId?: string, extra?: Record<string, unknown>) => void;
    __oaPrerender?: boolean;
  }
}

const EMAIL = "service@onealgorithm.com";
export const SERVICES = [
  "Salesforce / CRM",
  "IT Consulting",
  "Website Development",
  "Zendesk Implementation / Support",
  "Marketing Services",
  "Staff Augmentation",
  "HR & Staffing Support",
  "Industry project",
  "Other",
  "SEO",
  "Google Ads",
  "Application Development",
  "AI Automation",
  "MarTech",
  "Operational Transformation",
];
const SERVICE_LABEL: Record<string, string> = { "IT Consulting": "IT Consulting & Strategy" };

const EMPTY = { name: "", firstName: "", lastName: "", email: "", phone: "", company: "", whatYouNeed: "", message: "" };
type Field = keyof typeof EMPTY;

/**
 * THE contact form: one component, one lead path (lib/lead.ts submitLead → functions/api/lead.js → Turnstile →
 * Salesforce Web-to-Lead). Moved out of Contact.tsx 2026-11-16 so an ad landing page can carry the same form.
 *
 *   full  (/contact): first + last name, work email, phone, company, the service dropdown, "tell us more".
 *   short (landing pages): four visible fields: name, work email, company, what you need. `need` is sent as
 *         the service; the one name box is split at the last space (Web-to-Lead requires a last name).
 *
 * Kept from the contact page: the honeypot, Turnstile (loaded here, so form-less pages do not pay for it; not
 * at all during prerender, so the static HTML carries no "check could not load" alert), the beforeunload
 * guard, the GA4 generate_lead event (index.html also fires the Google Ads conversion from it), and the
 * gclid/UTM cookie, which submitLead adds to every post.
 */
export function LeadForm({ short, idPrefix = "", formId, cta, heading, headingId, topic, from, need = "", submitLabel, placeholder }: {
  short?: boolean;
  /** Prefix for every id, so two forms can share a page. /contact passes none (its ids are linked to). */
  idPrefix?: string;
  /** GA4 form_id. */
  formId: string;
  /** GA4 placement name for the submit button; defaults to formId. /contact keeps its old "desk-form". */
  cta?: string;
  heading: string;
  headingId: string;
  /** Shown as the topic chip and sent as the Lead's "Topic:" line. */
  topic?: string;
  /** Route sent as "Submitted on:"; defaults to the current path. */
  from?: string;
  /** Full: preselects the dropdown. Short: the service sent with every lead. */
  need?: string;
  submitLabel: string;
  placeholder?: string;
}) {
  const [formData, setFormData] = React.useState({ ...EMPTY, whatYouNeed: need });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const honeypotRef = React.useRef<HTMLInputElement>(null);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const widgetHost = React.useRef<HTMLDivElement>(null);
  const widgetId = React.useRef<string | null>(null);
  const doneRef = React.useRef<HTMLHeadingElement>(null);
  const id = (k: string) => idPrefix + k;

  // The contact page learns `need` from its URL after mount; take it unless the visitor already picked one.
  React.useEffect(() => {
    if (need) setFormData((prev) => (prev.whatYouNeed ? prev : { ...prev, whatYouNeed: need }));
  }, [need]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  };

  React.useEffect(() => {
    if (isSubmitted || window.__oaPrerender) return;
    let cancelled = false;
    const mount = () => {
      if (cancelled || !widgetHost.current || widgetId.current !== null || !window.turnstile) return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        // A token is good for about five minutes; clearing it on expiry gives the visitor the widget again.
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
      // The success view unmounts the host; a fresh form needs a fresh widget.
      widgetId.current = null;
    };
  }, [isSubmitted]);

  React.useEffect(() => {
    if (isSubmitted) doneRef.current?.focus();
  }, [isSubmitted]);

  /* Warn before losing a part-filled form: arms once something is typed, disarms on submit. */
  const hasContent = (Object.keys(EMPTY) as Field[]).some((k) => k !== "whatYouNeed" && formData[k].trim() !== "");
  React.useEffect(() => {
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
    const focusField = (k: string) => {
      const el = document.getElementById(id(k));
      if (el instanceof HTMLElement) {
        el.focus();
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setSubmitError("Please enter a valid email address.");
      focusField("email");
      return;
    }
    if (!formData.whatYouNeed?.trim()) {
      setSubmitError("Please tell us what you need. Pick the closest option.");
      focusField("whatYouNeed");
      return;
    }
    // Managed Turnstile normally settles in well under a second; this is reached mainly when the script is blocked.
    if (!turnstileToken) {
      setSubmitError(`The anti-spam check hasn't finished. Give it a second and press send again, or call ${SF_PHONE.display}.`);
      return;
    }
    // Short form: one name box. Everything before the last space is the first name.
    const name = formData.name.trim().replace(/\s+/g, " ");
    const cut = name.lastIndexOf(" ");
    const [firstName, lastName] = short ? (cut > 0 ? [name.slice(0, cut), name.slice(cut + 1)] : ["", name]) : [formData.firstName, formData.lastName];

    setIsSubmitting(true);
    try {
      const res = await submitLead(
        {
          firstName,
          lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company,
          whatYouNeed: formData.whatYouNeed,
          message: formData.message,
          topic: topic || undefined,
          page: from || window.location.pathname,
          turnstileToken,
        },
        `We couldn't send that. Please call ${SF_PHONE.display} or email ${EMAIL}.`,
      );
      setIsSubmitting(false);
      if (!res.ok) {
        setSubmitError(res.error);
        // Turnstile tokens are single use; without this reset the next attempt sends a spent token.
        resetTurnstile();
        return;
      }
      setIsSubmitted(true);
      window.trackFormSubmission?.(formId, { topic: topic || formData.whatYouNeed, source: from || undefined });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError("An error occurred while submitting your message. Please try again or contact us directly.");
      console.error("Form submission error:", error);
    }
  };

  const field = (name: Field, label: React.ReactNode, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={id(name)}>{label}</label>
      <input id={id(name)} name={name} value={formData[name]} onChange={handleChange} disabled={isSubmitting} {...props} />
    </div>
  );
  const req = <b aria-hidden="true"> *</b>;
  const emailField = field("email", <>Work email{req}</>, { type: "email", required: true, autoComplete: "email", spellCheck: false, autoCapitalize: "off", placeholder: "you@company.com" });
  const companyField = field("company", <>Company{req}</>, { type: "text", required: true, autoComplete: "organization" });

  if (isSubmitted)
    return (
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
          onClick={() => { setIsSubmitted(false); setFormData({ ...EMPTY, whatYouNeed: need }); setSubmitError(null); }}
        >
          Send another message
        </SfButton>
      </div>
    );

  return (
    <>
      <h3 className="sf-h3" id={headingId}>{heading}</h3>
      {topic && <p className="sf-topic-chip">Topic · {topic}</p>}
      <form onSubmit={handleSubmit} className="sf-form" aria-labelledby={headingId} data-form={formId}>
        {/* Honeypot: hidden from users, catches bots. Do not remove. */}
        <input
          ref={honeypotRef}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
        />
        {submitError && <p className="sf-form-alert" role="alert" aria-live="polite">{submitError}</p>}
        {short ? (
          <>
            <div className="sf-form-row">
              {field("name", <>Name{req}</>, { type: "text", required: true, autoComplete: "name" })}
              {emailField}
            </div>
            {companyField}
            <div>
              <label htmlFor={id("message")}>What do you need?</label>
              <textarea id={id("message")} name="message" value={formData.message} onChange={handleChange} disabled={isSubmitting} placeholder={placeholder} />
            </div>
          </>
        ) : (
          <>
            {/* Two name fields: Salesforce stores them separately and REQUIRES last name. */}
            <div className="sf-form-row">
              {field("firstName", "First name", { type: "text", autoComplete: "given-name" })}
              {field("lastName", <>Last name{req}</>, { type: "text", required: true, autoComplete: "family-name" })}
            </div>
            <div className="sf-form-row">
              {emailField}
              {field("phone", "Phone (optional; we call rather than email)", { type: "tel", autoComplete: "tel" })}
            </div>
            <div className="sf-form-row">
              {companyField}
              <div>
                <label htmlFor={id("whatYouNeed")}>What do you need?{req}</label>
                <select id={id("whatYouNeed")} name="whatYouNeed" required value={formData.whatYouNeed} onChange={handleChange} disabled={isSubmitting}>
                  <option value="">Pick the closest option</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{SERVICE_LABEL[s] || s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor={id("message")}>Tell us more (optional)</label>
              <textarea id={id("message")} name="message" value={formData.message} onChange={handleChange} disabled={isSubmitting} placeholder={placeholder} />
            </div>
          </>
        )}
        {/* The bot check, visible: a check that runs silently on everyone is something a privacy policy has to disclose anyway. */}
        <div>
          <div ref={widgetHost} style={{ minHeight: 65 }} />
          <p className="sf-form-note" style={{ marginTop: 8 }}>Protected by Cloudflare Turnstile; no traffic-light puzzles.</p>
        </div>
        <SfButton type="submit" cta={cta ?? formId} disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : submitLabel}
        </SfButton>
      </form>
    </>
  );
}
