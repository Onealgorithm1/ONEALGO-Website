import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Mail, Phone, MapPin, Loader2, CheckCircle, Clock } from "lucide-react";
import { PageHero, Section, SectionHeading } from "../components/site";
import { useSEO, getCanonicalUrl } from "../hooks/use-seo";
import {
  StructuredData,
  createContactPageSchema,
} from "../components/StructuredData";

// TypeScript declarations for Google Analytics tracking
declare global {
  interface Window {
    trackFormSubmission?: () => void;
    trackContactClick?: (method: string) => void;
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

/* Cloudflare Turnstile. The site key is PUBLIC by design -- it is in the markup
   of every page that shows the widget -- so it lives here rather than in an env
   var that would only add a way for the build to be wrong. The SECRET half is
   in the Pages environment and is only ever read by functions/api/lead.js.

   Turnstile rather than reCAPTCHA: this site is already on Cloudflare, so it
   adds no new vendor and no new company receiving visitor data. It also does
   not exist to profile people, which is a materially easier thing to describe
   truthfully in a privacy policy. */
const TURNSTILE_SITE_KEY = "0x4AAAAAAEOYL_vp6l13AYq-";

/**
 * Resolves once `window.turnstile` is genuinely callable.
 *
 * ⚠️ The script's own `load` event is NOT that moment. Turnstile attaches its
 * API a tick later, so rendering from a `load` listener throws "Cannot read
 * properties of undefined" intermittently — and when it does, the form shows
 * no widget at all and every submit is refused by the server. That failure was
 * caught in a browser, not by any type or unit check. `onload=` is the
 * documented signal, so it is the one used.
 *
 * Module-scoped so a remount reuses the in-flight load rather than appending a
 * second copy of the script.
 */
let turnstileLoading: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window !== "undefined" && window.turnstile) return Promise.resolve();
  if (turnstileLoading) return turnstileLoading;

  turnstileLoading = new Promise((resolve) => {
    (window as unknown as { onloadTurnstileCallback?: () => void })
      .onloadTurnstileCallback = () => resolve();
    const s = document.createElement("script");
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  });
  return turnstileLoading;
}

export default function Contact() {
  useSEO({
    title: "OneAlgorithm — Contact Us",
    description:
      "Contact OneAlgorithm for IT consulting, web development, and automation solutions.",
    canonical: getCanonicalUrl("/contact"),
    ogTitle: "OneAlgorithm — Contact Us",
    ogDescription:
      "Get in touch with OneAlgorithm for technology consulting and services.",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    whatYouNeed: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot: a hidden field real users never see. Bots fill it; we drop those.
  const honeypotRef = useRef<HTMLInputElement>(null);

  /* Turnstile.
     The script is fetched here rather than in index.html so that 25 pages which
     have no form do not pay for it. `render=explicit` stops it hunting the DOM
     for widgets on its own, which does not survive React re-rendering the form
     underneath it. */
  const [turnstileToken, setTurnstileToken] = useState("");
  const widgetHost = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  };

  useEffect(() => {
    if (isSubmitted) return;
    let cancelled = false;

    const mount = () => {
      if (cancelled || !widgetHost.current || widgetId.current !== null) return;
      if (!window.turnstile) return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        // A token is good for about five minutes. Someone who opens the form,
        // takes a phone call and comes back would otherwise submit a spent
        // token; clearing it here means they get the widget again instead of a
        // rejection they cannot act on.
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
        theme: "light",
      });
    };

    loadTurnstile().then(mount);

    return () => {
      cancelled = true;
    };
  }, [isSubmitted]);

  /**
   * Warn before losing a part-filled form.
   *
   * A visitor who has typed their details into a lead form and then refreshes,
   * closes the tab or follows an external link loses the lot, and a lead that
   * evaporates this way is invisible — no request is made, so nothing in
   * analytics ever shows it happened.
   *
   * Deliberately narrow. The prompt only arms once something has actually been
   * typed and disarms the moment the form submits, because a browser
   * "Leave site?" dialog on an empty form is an obstruction rather than a
   * safeguard.
   *
   * ⚠️ KNOWN LIMIT: `beforeunload` covers refresh, tab close and following a
   * link off-site. It does NOT fire on in-app navigation — clicking "About" in
   * the header still discards the form silently. Closing that needs a React
   * Router blocker, which this app's router setup does not currently support.
   */
  const hasContent = Object.values(formData).some((v) => v.trim() !== "");
  useEffect(() => {
    if (!hasContent || isSubmitted) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Browsers ignore custom text now and show their own wording; assigning
      // returnValue is still what arms the dialog.
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasContent, isSubmitted]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSelectChange = (name: string, value: string) => {
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

    // Move focus to whatever is wrong. Setting an error message alone leaves
    // the visitor to hunt for it: the message renders near the submit button
    // while the offending field may be well above the fold, and a screen-reader
    // user gets no indication at all of which field to fix. Focusing it scrolls
    // it into view and announces it in one step.
    const focusField = (id: string) => {
      const el = document.getElementById(id);
      if (el instanceof HTMLElement) {
        el.focus();
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };

    // Basic email validation before we hand off to Salesforce.
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!emailOk) {
      setSubmitError("Please enter a valid email address.");
      focusField("email");
      return;
    }

    // The service dropdown is a Radix `Select` marked `required`, which renders
    // its native <select> VISUALLY HIDDEN. When the browser tries to report
    // validity on a hidden control it cannot focus it, so Chrome blocks the
    // submit and logs "An invalid form control with name='' is not focusable"
    // to the console -- and shows the visitor nothing at all.
    //
    // The failure a visitor experiences is a button that does nothing. No error,
    // no scroll, no highlighted field. On the one page where the business
    // captures leads, that is a silent, total conversion loss for anyone who
    // skips the dropdown, and it would never show up in analytics because no
    // request is ever made.
    //
    // Validating it here, the same way the email is validated, replaces the
    // dead button with a visible message.
    if (!formData.whatYouNeed?.trim()) {
      setSubmitError("Please tell us what you need — pick the closest option.");
      focusField("whatYouNeed");
      return;
    }

    // Managed Turnstile normally settles in well under a second, so this is
    // reached mainly when the script has been blocked. Say what to do about it
    // rather than leaving a button that appears to do nothing.
    if (!turnstileToken) {
      setSubmitError(
        "The anti-spam check hasn't finished. Give it a second and press send again — or call 1 (610) 890-9711.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // One POST to our own edge function, which verifies the bot check with
      // a secret this page never sees and only then forwards to Salesforce.
      //
      // The previous version built a hidden <form>, aimed it at
      // webto.salesforce.com and watched a hidden iframe for a load event to
      // guess whether it worked. That guess is gone: the endpoint answers with
      // a status and a message, so "sent" now means sent.
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          whatYouNeed: formData.whatYouNeed,
          message: formData.message,
          turnstileToken,
        }),
      });

      const payload = await res.json().catch(() => ({}) as { error?: string });

      if (!res.ok) {
        setIsSubmitting(false);
        setSubmitError(
          payload.error ??
            "We couldn't send that. Please call 1 (610) 890-9711 or email service@onealgorithm.com.",
        );
        // Turnstile tokens are single use. Without this reset the next attempt
        // sends a spent token and fails again, which reads as the form being
        // broken rather than as one bad submit.
        resetTurnstile();
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (typeof window.trackFormSubmission === "function") {
        window.trackFormSubmission();
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        "An error occurred while submitting your message. Please try again or contact us directly.",
      );
      console.error("Form submission error:", error);
    }
  };

  return (
    <Layout>
      <StructuredData data={createContactPageSchema()} />
      {/* Hero.
          This was the one page that lost the brand: a near-white gradient wash
          on the single page where a buyer commits, against the dark ground used
          everywhere else. It now matches the rest of the site.

          The old orange "Business" was #ffa634 on near-white - 1.95:1, the
          least readable text on the page. On this dark ground it is 9.19:1. */}
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's talk about growing your{" "}
            <span className="text-oa-orange">business</span>
          </>
        }
        lede="Tell us what you are trying to fix. Fill out the form and we'll get back to you within 24 hours — or call and speak to someone now."
        // Every line here is already on this page: the "What happens next"
        // steps shown after submitting, the lede's 24-hour commitment, the
        // phone number in Contact Information, and the four office cards.
        panel={{
          title: "After you get in touch",
          items: [
            "You'll receive a confirmation email shortly.",
            "Our team will review your requirements.",
            "We'll get back to you within 24 hours.",
            "Or call 1 (610) 890-9711 and speak to someone now.",
            "Offices in the USA, India, the UAE and Canada.",
          ],
          footer: ["SBA Certified WOSB / EDWOSB"],
        }}
      />

      {/* Contact Form and Info Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-oa-ink mb-2 sm:mb-4">
                    Get Expert Consultation
                  </h2>
                  <p className="text-oa-ink2 mb-6 sm:mb-8">
                    We'll respond within 24 hours with a personalized recommendation.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Honeypot — hidden from users, catches bots. Do not remove. */}
                    <input
                      ref={honeypotRef}
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                      }}
                    />

                    {submitError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert" aria-live="polite">
                        <p className="text-red-800 text-sm">{submitError}</p>
                      </div>
                    )}

                    {/*
                      Two fields, not one.
                      Salesforce stores first and last name separately and
                      REQUIRES last name, so a single box meant guessing where
                      to split - and "Bob" produced an empty last name that
                      Salesforce rejected without telling the visitor. Asking
                      for the two parts removes the guess entirely.
                    */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-oa-ink2">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-oa-ink2">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-oa-ink2">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      {/* autoComplete + spellCheck added 2026-08-12. The two
                          most valuable fields to autofill had neither, which
                          meant a visitor on a phone typed their email by hand
                          at the exact moment they were deciding whether to
                          bother. spellCheck matters too: browsers underline an
                          email address in red, which reads as "you got this
                          wrong" on a field the visitor entered correctly. */}
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        spellCheck={false}
                        autoCapitalize="off"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-oa-ink2">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatYouNeed" className="text-oa-ink2">
                        What do you need? <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.whatYouNeed}
                        onValueChange={(value) =>
                          handleSelectChange("whatYouNeed", value)
                        }
                        required
                      >
                        {/* id matches the Label's htmlFor above. Without it the
                            label pointed at nothing, leaving this required field
                            unnamed to screen readers and un-clickable by label. */}
                        <SelectTrigger
                          id="whatYouNeed"
                          className="mt-1"
                          disabled={isSubmitting}
                        >
                          <SelectValue placeholder="Select your service needs" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Oracle ERP Implementation">
                            Oracle ERP Implementation
                          </SelectItem>
                          <SelectItem value="IT Consulting">
                            IT Consulting & Strategy
                          </SelectItem>
                          <SelectItem value="Website Development">
                            Website Development
                          </SelectItem>
                          <SelectItem value="Operations Technology">
                            Operations Technology
                          </SelectItem>
                          <SelectItem value="Zendesk Implementation / Support">
                            Zendesk Implementation / Support
                          </SelectItem>
                          <SelectItem value="Marketing Services">
                            Marketing Services
                          </SelectItem>
                          <SelectItem value="Staff Augmentation">
                            Staff Augmentation
                          </SelectItem>
                          <SelectItem value="Other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-oa-ink2">
                        Tell us more (optional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Describe your project, challenges, or goals..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-1 min-h-[100px]"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* The bot check. In managed mode this usually resolves on
                        its own in under a second and the visitor does nothing;
                        it only asks for an interaction when the traffic looks
                        automated. It is not hidden, because a check that runs
                        silently on everyone is something a privacy policy has
                        to disclose anyway -- better to show it. */}
                    <div>
                      <div ref={widgetHost} className="min-h-[65px]" />
                      <p className="mt-2 text-xs text-oa-ink3">
                        Protected by Cloudflare Turnstile, so the form stays
                        open without asking you to identify traffic lights.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-onealgo-blue-950 hover:bg-onealgo-blue-900 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        /* Was "Schedule a Consultation", which nothing on this
                           page does -- submitting queues a reply, it does not
                           book a time. A button that names an action it does
                           not perform is the fastest way to lose the trust the
                           rest of the page just earned. Say what happens. */
                        "Send — we reply within 1 business day"
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                /* Thank You Card */
                <div className="text-center space-y-6 animate-in fade-in-50 duration-700">
                  {/* Success Icon */}
                  <div className="relative mb-8">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    {/* Animated rings */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-green-400 opacity-20 animate-ping"></div>
                  </div>

                  {/* Thank You Message */}
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-oa-ink mb-4">
                      Thank You!
                    </h2>
                    <p className="text-xl text-oa-ink2 mb-2 font-medium">
                      Your message has been sent successfully
                    </p>
                    <p className="text-lg text-oa-ink2 mb-8 leading-relaxed">
                      We've received your inquiry and our team will get back to
                      you within 24 hours.
                    </p>
                  </div>

                  {/* What Happens Next */}
                  <div className="bg-gradient-to-r from-onealgo-blue-950 to-onealgo-blue-900 rounded-xl p-6 text-white text-left">
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      What happens next?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-oa-blue">
                          <span className="text-white font-bold text-xs">
                            1
                          </span>
                        </div>
                        <p className="text-sm">
                          You'll receive a confirmation email shortly
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-oa-blue">
                          <span className="text-white font-bold text-xs">
                            2
                          </span>
                        </div>
                        <p className="text-sm">
                          Our team will review your requirements
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-oa-blue">
                          <span className="text-white font-bold text-xs">
                            3
                          </span>
                        </div>
                        <p className="text-sm">
                          We'll contact you within 24 hours with next steps
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact for Urgent Matters */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      <Clock className="w-4 h-4 text-oa-blue" />
                      <span className="text-sm font-medium text-oa-ink">
                        Need immediate assistance?
                      </span>
                    </div>
                    <p className="text-sm text-oa-ink2 mb-3">
                      For urgent matters, contact us directly:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                      <a
                        href="tel:16108909711"
                        onClick={() => window.trackContactClick?.("phone")}
                        className="inline-flex items-center justify-center gap-1.5 font-medium text-oa-blue hover:text-oa-blue600"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        1 (610) 890-9711
                      </a>
                      <span className="hidden text-oa-ink3 sm:inline">|</span>
                      <a
                        href="mailto:service@onealgorithm.com"
                        onClick={() => window.trackContactClick?.("email")}
                        className="inline-flex items-center justify-center gap-1.5 font-medium text-oa-blue hover:text-oa-blue600"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        service@onealgorithm.com
                      </a>
                    </div>
                  </div>

                  {/* Send Another Message Button */}
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        company: "",
                        whatYouNeed: "",
                        message: "",
                      });
                      setSubmitError(null);
                    }}
                    variant="outline"
                    size="lg"
                    className="border-oa-hairlineStrong text-oa-ink hover:bg-oa-blueTint hover:text-oa-ink"
                  >
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-oa-ink mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-oa-blue" />
                  <div>
                    <h3 className="font-semibold text-oa-ink">Email</h3>
                    <a
                      href="mailto:service@onealgorithm.com"
                        onClick={() => window.trackContactClick?.("email")}
                      className="text-oa-blue hover:text-oa-blue600"
                    >
                      service@onealgorithm.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-oa-blue" />
                  <div>
                    <h3 className="font-semibold text-oa-ink">Phone</h3>
                    <a
                      href="tel:16108909711"
                        onClick={() => window.trackContactClick?.("phone")}
                      className="text-oa-blue hover:text-oa-blue600"
                    >
                      1 (610) 890-9711
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mb-8">
                <div className="w-full rounded overflow-hidden shadow-sm">
                  <iframe
                    title="OneAlgorithm Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.4774062403612!2d-75.5771397!3d40.042445799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6f327d5340c9d%3A0x218ca530a72f1726!2sOneAlgorithm%20Consulting!5e0!3m2!1sen!2sus!4v1759511875621!5m2!1sen!2sus"
                    className="w-full h-64 sm:h-96 border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Global Offices - full width row under the contact form and map */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-oa-ink mb-6">
            Our Global Offices
          </h3>
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="h-full border border-oa-hairline p-4 transition-colors hover:border-oa-blue/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-oa-ink text-lg">
                    <span className="text-xl">🇺🇸</span>
                    USA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-oa-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-oa-ink2 text-sm">
                        625 Swedesford Rd
                        <br />
                        Malvern, PA 19355
                        <br />
                        1 (610) 890-9711
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border border-oa-hairline p-4 transition-colors hover:border-oa-blue/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-oa-ink text-lg">
                    <span className="text-xl">🇮🇳</span>
                    India
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-oa-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-oa-ink2 text-sm">
                        2nd Floor, Plot No. 536
                        <br />
                        Madhapur, Hyderabad
                        <br />
                        Telangana 500081, IN
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border border-oa-hairline p-4 transition-colors hover:border-oa-blue/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-oa-ink text-lg">
                    <span className="text-xl">🇦🇪</span>
                    UAE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-oa-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-oa-ink2 text-sm">
                        Building R118, Suite 201-A-42
                        <br />
                        Al Suq Al Kabeer, Dubai
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border border-oa-hairline p-4 transition-colors hover:border-oa-blue/40">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-oa-ink text-lg">
                    <span className="text-xl">🇨🇦</span>
                    Canada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-oa-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-oa-ink2 text-sm">
                        120 Adelaide St W<br />
                        Toronto, ON M5H 1T1
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {/*
                Rewritten 2026-08-12. What was here was ~1,100 words of keyword
                prose containing three claims the business cannot evidence:
                "a leading technology consultancy", "helped hundreds of
                businesses", and "reduce operational costs by up to 40%".

                It sat BELOW the form, so it could never have helped anyone
                convert -- it existed to be crawled. Ten months of Search
                Console says that did not work either: 267 organic clicks, ~97%
                of them people typing the company name. Padding a page for a
                search engine has not been a winning strategy for years, and the
                two invented figures were a real liability on the one page where
                a buyer commits.

                Replaced with the thing that actually converts next to a form:
                what happens after you press send. Uncertainty is the reason
                people abandon a contact form, and every line below is something
                the business controls and can honour.
              */}
              <h2 className="text-3xl font-bold text-oa-ink mb-6">
                What happens after you send this
              </h2>
              <div className="space-y-4 text-oa-ink2">
                <p>
                  A person reads it — not a queue. You get a reply within one
                  business day, and it comes from someone who can talk about the
                  work rather than book you a call to arrange a call.
                </p>
                <p>
                  If it looks like a fit, the next step is a short conversation
                  about what you already run and what is not working. No
                  discovery fee, and no obligation to go further. The people who
                  scope the work are the people who would do it.
                </p>
                <p>
                  You own everything we build. No vendor lock-in, no code held
                  hostage, no proprietary platform you cannot leave. If you would
                  rather check us out first, every one of our credentials below
                  is independently verifiable — SAM.gov, the SBA registry, and
                  the Salesforce AppExchange.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-oa-ink mb-6">
                Our Comprehensive Technology Services
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-oa-ink mb-2">
                    IT Consulting & Strategic Planning
                  </h4>
                  <p className="text-oa-ink2 text-sm">
                    Technology audits, digital transformation strategies,
                    cybersecurity assessments, cloud migration planning, and
                    business process optimization to align IT infrastructure
                    with business goals.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-oa-ink mb-2">
                    Website Development & Design
                  </h4>
                  <p className="text-oa-ink2 text-sm">
                    Custom website development, responsive design, e-commerce
                    platforms, SEO optimization, content management systems, and
                    performance optimization for enhanced user experience.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-oa-ink mb-2">
                    Operations Technology Solutions
                  </h4>
                  <p className="text-oa-ink2 text-sm">
                    Industrial automation, SCADA systems, IoT integration,
                    process optimization, equipment monitoring, predictive
                    maintenance, and operational efficiency improvements.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-oa-ink mb-2">
                    Staff Augmentation & Talent Solutions
                  </h4>
                  <p className="text-oa-ink2 text-sm">
                    Skilled developers, IT specialists, project managers,
                    technical consultants, and subject matter experts to scale
                    your team with the right talent for short-term or long-term
                    projects.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-oa-ink mb-2">
                    Marketing Technology & Automation
                  </h4>
                  <p className="text-oa-ink2 text-sm">
                    Campaign management, marketing automation, customer journey
                    optimization, data analytics, CRM integration, and ROI
                    tracking to maximize marketing effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
            {/*
              Rewritten 2026-08-12. "Join hundreds of successful businesses that
              have partnered with OneAlgorithm" is not evidenced -- this site
              cannot name one client -- and "transform / accelerate growth" is
              filler that could sit on any consultancy's page.

              Replaced with the two things a hesitant visitor at the bottom of a
              contact page actually needs: permission to make contact without
              committing, and a reason to believe. Both are verifiable.
            */}
            <h3 className="text-2xl font-bold text-oa-ink mb-4 text-center">
              Not sure yet? Ask anyway.
            </h3>
            <p className="text-oa-ink2 text-center mb-6 max-w-3xl mx-auto">
              You do not need a defined project or a budget to get in touch. If
              you are weighing whether something is worth doing at all, that is
              a useful conversation and a short one. We are a woman-owned firm
              in Malvern, Pennsylvania — SBA-certified WOSB/EDWOSB, a Salesforce
              Consulting Partner, and registered on SAM.gov, all of which you can
              check without taking our word for it.
            </p>
            <div className="text-center">
              <p className="text-sm text-oa-ink2">
                Contact us today for a free consultation and discover how
                OneAlgorithm's proven technology solutions can drive your
                business forward. We serve clients across the United States,
                Canada, India, and the UAE with 24/7 support and expert
                guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
