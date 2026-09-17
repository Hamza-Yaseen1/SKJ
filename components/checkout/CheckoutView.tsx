"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/products";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Pakistani mobile numbers, with or without +92 / 0 and separators. */
const PHONE_RE = /^(?:\+92|0092|0)?3\d{9}$/;

const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "");

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  postalCode: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const blank = (v: string) => v.trim().length === 0;

  if (blank(form.fullName) || form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (blank(form.email) || !EMAIL_RE.test(form.email.trim())) {
    errors.email = "A valid email is required.";
  }
  if (blank(form.phone) || !PHONE_RE.test(normalizePhone(form.phone))) {
    errors.phone = "Enter a valid Pakistani mobile number — e.g. +92 300 1234567.";
  }
  if (blank(form.street)) errors.street = "Full address is required.";
  if (blank(form.city)) errors.city = "City is required.";

  return errors;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-[0.16em] text-bark"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[13px] leading-5 text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SectionHeader({ index, label }: { index: string; label: string }) {
  return (
    <div aria-hidden="true" className="mb-8 flex items-center gap-4">
      <span className="font-serif text-xl italic leading-none text-gold">
        {index}
      </span>
      <span className="text-[11px] uppercase tracking-[0.16em] text-ink">
        {label}
      </span>
      <span className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

export default function CheckoutView() {
  const router = useRouter();
  const { items, entries, count, subtotal, hydrated, clear } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!hydrated) {
    return (
      <section className="bg-cream">
        <div className="container-luxe py-24 md:py-32">
          <div className="h-12 w-1/2 animate-pulse rounded bg-ink/10" />
          <div className="mt-16 h-96 animate-pulse rounded bg-sand" />
        </div>
      </section>
    );
  }

  if (items.length === 0 && !submitting) {
    return (
      <section className="flex min-h-[60svh] items-center bg-cream">
        <div className="container-luxe py-24 text-center md:py-32">
          <Reveal>
          <p className="eyebrow mb-6">Checkout</p>
          <h1 className="mx-auto max-w-2xl font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            Nothing to send <em className="italic text-gold">yet.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-8 text-bark">
            Your bag is empty — choose a composition first, then return to
            complete your order.
          </p>
          </Reveal>
          <Link href="/shop" className="btn btn-gold mt-10">
            Browse the collection
          </Link>
        </div>
      </section>
    );
  }

  const setField = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for a field the moment it is edited again.
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
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: form, items: entries }),
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok || !data || (data as { ok?: boolean }).ok !== true) {
        const message =
          (data as { error?: string } | null)?.error ??
          "Your order could not be placed right now. Please try again.";
        throw new Error(message);
      }

      const orderNumber = (data as { orderNumber?: string }).orderNumber;
      const emailPending = (data as { emailPending?: boolean }).emailPending === true;
      if (!orderNumber) throw new Error("No order number was returned.");

      clear();
      router.replace(
        `/order-confirmation?order=${encodeURIComponent(orderNumber)}&emailed=${emailPending ? 0 : 1}`
      );
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Your order could not be placed right now. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-cream">
      <div className="container-luxe py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <Reveal>
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-stone transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} strokeWidth={1.5} aria-hidden="true" />
            Back to bag
          </Link>
          <p className="eyebrow mb-4">Checkout</p>
          <h1 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
            Where shall we <em className="italic text-gold">send it?</em>
          </h1>
          </Reveal>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* ── Form ── */}
          <Reveal delay={0.08} className="min-w-0">
          <form onSubmit={handleSubmit} noValidate id="checkout-form" aria-busy={submitting}>
            {submitError && (
              <div
                role="alert"
                className="mb-12 border border-error/40 bg-error/5 px-6 py-5"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-error">
                  Your order has not gone through
                </p>
                <p className="mt-2 text-sm leading-6 text-bark">{submitError}</p>
                <p className="mt-1 text-xs leading-6 text-stone">
                  Nothing was charged and your bag is untouched — please try again.
                </p>
              </div>
            )}

            <div className="space-y-16">
              {/* Contact */}
              <fieldset disabled={submitting}>
                <legend className="sr-only">Contact details</legend>
                <SectionHeader index="01" label="Contact" />
                <div className="space-y-8">
                  <Field id="fullName" label="Full name" error={errors.fullName}>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Ahmed Raza"
                      value={form.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                      className="input-luxe"
                    />
                  </Field>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        className="input-luxe"
                      />
                    </Field>
                    <Field id="phone" label="Phone" error={errors.phone}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+92 300 1234567"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        className="input-luxe"
                      />
                    </Field>
                  </div>
                </div>
              </fieldset>

              {/* Shipping */}
              <fieldset disabled={submitting}>
                <legend className="sr-only">Shipping address</legend>
                <SectionHeader index="02" label="Shipping" />
                <div className="space-y-8">
                  <Field id="street" label="Full address" error={errors.street}>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      autoComplete="street-address"
                      placeholder="House 12, Street 4, DHA Phase 5"
                      value={form.street}
                      onChange={(e) => setField("street", e.target.value)}
                      aria-invalid={Boolean(errors.street)}
                      className="input-luxe"
                    />
                  </Field>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field id="city" label="City" error={errors.city}>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Karachi"
                        value={form.city}
                        onChange={(e) => setField("city", e.target.value)}
                        aria-invalid={Boolean(errors.city)}
                        className="input-luxe"
                      />
                    </Field>
                    <Field id="postalCode" label="Postal code (optional)" error={errors.postalCode}>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="74200"
                        value={form.postalCode}
                        onChange={(e) => setField("postalCode", e.target.value)}
                        aria-invalid={Boolean(errors.postalCode)}
                        className="input-luxe"
                      />
                    </Field>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Mobile order button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-gold btn-block mt-16 lg:hidden"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
                  Securing your order…
                </>
              ) : (
                <>Place order — {formatPrice(subtotal)}</>
              )}
            </button>
          </form>
          </Reveal>

          {/* ── Order summary ── */}
          <Reveal delay={0.16} className="h-fit lg:sticky lg:top-28">
          <aside>
            <div className="border border-ink/10 bg-ivory p-8 md:p-9">
              <p className="eyebrow mb-7">Your order</p>

              <ul className="space-y-5 border-b border-ink/10 pb-7">
                {items.map(({ product, size, quantity, lineTotal }) => (
                  <li key={`${product.slug}:${size.id}`} className="flex items-start gap-4">
                    <div className="relative aspect-4/5 w-14 shrink-0 overflow-hidden bg-sand">
                      <Image
                        src={product.image}
                        alt={`${product.name} flacon`}
                        fill
                        sizes="56px"
                        quality={70}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-baseline justify-between gap-3">
                      <div>
                        <p className="font-serif text-sm leading-snug text-ink">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-[11px] tracking-[0.16em] text-stone">
                          {size.label} · Qty {quantity}
                        </p>
                      </div>
                      <p className="shrink-0 font-sans text-sm text-ink">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-bark">Subtotal ({count} {count === 1 ? "piece" : "pieces"})</dt>
                  <dd className="text-ink">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-bark">Shipping</dt>
                  <dd className="font-serif italic text-gold">Complimentary</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-6">
                <span className="text-[11px] uppercase tracking-[0.16em] text-bark">Total</span>
                <span className="font-serif text-3xl text-ink">{formatPrice(subtotal)}</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={submitting}
                className="btn btn-gold btn-block mt-7"
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
                    Securing your order…
                  </>
                ) : (
                  <>Place order — {formatPrice(subtotal)}</>
                )}
              </button>

              <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-6 text-stone">
                <Lock size={12} strokeWidth={1.5} aria-hidden="true" />
                No payment is taken online — confirmation only.
              </p>
            </div>
          </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}