import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig, pageHref } from "@/site-config";
interface Turnstile {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT || "";
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const privacyApproved = import.meta.env.VITE_PRIVACY_APPROVED === "true";
const configured = Boolean(endpoint && siteKey && privacyApproved);
export function EnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "accepted" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const error = useRef<HTMLParagraphElement>(null);
  const submission = useRef({ fingerprint: "", id: "" });
  useEffect(() => {
    if (!configured) return;
    let disposed = false;
    let script = document.querySelector<HTMLScriptElement>(
      "script[data-letvest-turnstile]",
    );
    const render = () => {
      if (!disposed && widget.current && window.turnstile && !widgetId.current)
        widgetId.current = window.turnstile.render(widget.current, {
          sitekey: siteKey,
          action: "landlord-enquiry",
          size: "flexible",
          callback: (value: string) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => {
            setToken("");
            setMessage(
              "The security check could not load. Try again or email our team.",
            );
            setStatus("error");
          },
        });
    };
    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.dataset.letvestTurnstile = "true";
      document.head.appendChild(script);
    }
    const loadError = () => {
      setStatus("error");
      setMessage("The security check is unavailable. Please email our team.");
    };
    script.addEventListener("load", render);
    script.addEventListener("error", loadError);
    render();
    return () => {
      disposed = true;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", loadError);
      if (widgetId.current) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = undefined;
      }
    };
  }, []);
  useEffect(() => {
    if (status === "error") error.current?.focus();
  }, [status, message]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!configured) {
      setStatus("error");
      setMessage(
        "Online submission is not available yet. Please email info@jmletvest.com. Nothing has been sent.",
      );
      return;
    }
    if (!token) {
      setStatus("error");
      setMessage("Please complete the security check before sending.");
      return;
    }
    const data = new FormData(form);
    const fingerprint = JSON.stringify(Object.fromEntries(data.entries()));
    if (submission.current.fingerprint !== fingerprint)
      submission.current = { fingerprint, id: crypto.randomUUID() };
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries([
            ...data.entries(),
            ["turnstileToken", token],
            ["requestId", submission.current.id],
          ]),
        ),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (
        !response.ok ||
        result.status !== "accepted" ||
        typeof result.id !== "string"
      )
        throw new Error("not-accepted");
      setStatus("accepted");
      setMessage(
        "Your enquiry has been accepted for email delivery. This is not confirmation that it has reached the inbox.",
      );
      form.reset();
      submission.current = { fingerprint: "", id: "" };
    } catch {
      setStatus("error");
      setMessage(
        "We could not confirm your enquiry was accepted. Please try again or email info@jmletvest.com.",
      );
    } finally {
      setToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }
  if (!configured)
    return (
      <div className="contact-enquiry-options">
        <article>
          <span className="eyebrow">For landlords & property owners</span>
          <h3>Let’s talk about your property.</h3>
          <p>
            Send us the town or postcode, property type, number of bedrooms and
            when it will be available. Let us know whether you’re considering
            Rent to Rent, managed letting or would like help deciding.
          </p>
          <a
            className="btn btn-gold"
            href="mailto:info@jmletvest.com?subject=Property%20enquiry"
          >
            Enquire about your property →
          </a>
        </article>
        <article>
          <span className="eyebrow">For tenants</span>
          <h3>Looking for your next home?</h3>
          <p>
            Tell us your preferred area, monthly budget, number of bedrooms and
            ideal move-in date. We can discuss suitable availability and the
            next steps.
          </p>
          <a
            className="btn btn-outline-navy"
            href="mailto:info@jmletvest.com?subject=Looking%20for%20a%20home"
          >
            Register your requirements →
          </a>
        </article>
        <p className="contact-email-help">
          These buttons open your email app. You can also email us directly at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Property appraisal enquiry"
      aria-busy={status === "sending"}
    >
      <h3 className="display">Tell us about your property</h3>
      {!configured && (
        <p className="form-availability">
          Online enquiries are not available yet. Email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> to
          request an appraisal. This form does not send information while
          unavailable.
        </p>
      )}
      <div className="form-grid">
        <div className="field full">
          <label htmlFor="enquiry-name">Your name</label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
          />
        </div>
        <div className="field full">
          <label htmlFor="enquiry-email">Email address</label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </div>
        <div className="field full">
          <label htmlFor="enquiry-location">Property town or postcode</label>
          <input
            id="enquiry-location"
            name="location"
            required
            maxLength={120}
          />
        </div>
        <div className="field full">
          <label htmlFor="enquiry-service">Service you are considering</label>
          <select id="enquiry-service" name="service" required defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option>Guaranteed Rent</option>
            <option>Fully Managed Letting</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="enquiry-message">
            Property details and questions
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            required
            minLength={10}
            maxLength={4000}
            aria-describedby="message-help"
          />
          <small id="message-help">
            Include the property type and your priorities. Please do not include
            identity documents or financial account details.
          </small>
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="enquiry-company">Leave this empty</label>
        <input
          id="enquiry-company"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="privacy-acknowledgement">
        <input name="privacy" type="checkbox" value="accepted" required />I have
        read the <a href={pageHref("privacy")}>privacy notice</a> about handling
        this enquiry.
      </label>
      {configured && <div ref={widget} className="security-widget" />}
      <button
        type="submit"
        className="btn btn-gold btn-block"
        disabled={!configured || status === "sending"}
      >
        {status === "sending" ? "Sending enquiry…" : "Send Appraisal Enquiry"}
      </button>
      {status === "error" ? (
        <p ref={error} tabIndex={-1} role="alert" className="form-error">
          {message}
        </p>
      ) : (
        <p className="form-note" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </form>
  );
}
