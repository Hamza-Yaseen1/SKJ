"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: "", email: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "A valid email is required.";
  }
  if (form.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const setField = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok || !data || (data as { ok?: boolean }).ok !== true) {
        const message =
          (data as { error?: string } | null)?.error ??
          "Your letter could not be sent right now. Please try again.";
        throw new Error(message);
      }

      setSent(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Your letter could not be sent right now. Please try again."
      );
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="border border-gold/40 bg-ivory p-8 md:p-10">
        <div aria-hidden="true" className="flex items-center gap-4">
          <span className="h-px w-8 bg-gold/50" />
          <span className="text-gold/60">✦</span>
          <span className="h-px w-8 bg-gold/50" />
        </div>
        <p className="eyebrow mt-7">Letter received</p>
        <p className="mt-4 font-serif text-2xl leading-snug text-ink md:text-3xl">
          Your letter is on its way.
        </p>
        <p className="mt-4 max-w-md text-sm leading-7 text-bark">
          The atelier reads every letter by hand and replies within one working
          day. Until then, the collection remains open.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      {submitError && (
        <div
          role="alert"
          className="mb-8 border border-error/40 bg-error/5 px-6 py-5"
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-error">
            Your letter has not been sent
          </p>
          <p className="mt-2 text-sm leading-6 text-bark">{submitError}</p>
        </div>
      )}

      <div className="space-y-8">
        <div className="space-y-3">
          <label
            htmlFor="contact-name"
            className="block text-[11px] uppercase tracking-[0.16em] text-bark"
          >
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ahmed Raza"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="input-luxe"
          />
          {errors.name && (
            <p className="text-[13px] leading-5 text-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label
            htmlFor="contact-email"
            className="block text-[11px] uppercase tracking-[0.16em] text-bark"
          >
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="input-luxe"
          />
          {errors.email && (
            <p className="text-[13px] leading-5 text-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label
            htmlFor="contact-message"
            className="block text-[11px] uppercase tracking-[0.16em] text-bark"
          >
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Ask about a composition, a commission, or simply say hello…"
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            className="input-luxe min-h-40 resize-y"
          />
          {errors.message && (
            <p className="text-[13px] leading-5 text-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-gold btn-block"
        >
          {submitting ? (
            <>
              <Loader2 size={15} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
              Sending your letter…
            </>
          ) : (
            <>
              Send the letter
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </>
          )}
        </button>

        <p className="text-center text-xs leading-6 text-stone">
          A human replies within one working day, always.
        </p>
      </div>
    </form>
  );
}