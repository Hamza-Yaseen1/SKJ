"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Decorative "SKJ letters" signup. Day 1 wireframe — on submit it
 * simply confirms locally; wire to an API / email provider later.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim().length > 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="flex items-center gap-3 border-t border-gold/40 pt-5 text-sm tracking-wide text-gold-light">
        <span className="text-gold" aria-hidden="true">
          ✦
        </span>
        Welcome to the circle — your first letter will arrive in the coming
        days.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="min-h-[52px] flex-1 border border-cream/25 bg-transparent px-5 text-sm text-cream placeholder:text-cream/35 focus:border-gold focus:outline-none"
      />
      <button type="submit" className="btn btn-gold min-w-max">
        Join the circle
        <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  );
}