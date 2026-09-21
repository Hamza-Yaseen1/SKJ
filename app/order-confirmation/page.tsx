import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Your SKJ order has been received. A confirmation letter is on its way to your inbox.",
  robots: { index: false },
};

const ORDER_RE = /^SKJ-[A-Z0-9]{6}$/;

interface PageProps {
  searchParams: Promise<{ order?: string | string[]; emailed?: string | string[] }>;
}

const NEXT_STEPS = [
  {
    title: "Order received",
    copy: "Your composition is reserved — the atelier has been quietly notified.",
  },
  {
    title: "Composed & filled",
    copy: "Hand-filled and sealed within three working days.",
  },
  {
    title: "Confirmation letter",
    copy: "An email with your details, tracking and the tasting card follows.",
  },
];

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
  const { order, emailed } = await searchParams;
  const orderNumber =
    typeof order === "string" && ORDER_RE.test(order) ? order : "SKJ-••••••";
  const confirmationWasEmailed = !(typeof emailed === "string" && emailed === "0");

  return (
    <section className="flex min-h-[80svh] items-center bg-ink">
      <div className="container-luxe py-24 text-center md:py-32">
        <Reveal>
          <div aria-hidden="true" className="mx-auto flex items-center gap-5">
          <span className="h-px w-12 bg-gold/40" />
          <span className="text-gold/60">✦</span>
          <span className="h-px w-12 bg-gold/40" />
        </div>
        <p className="eyebrow eyebrow-on-dark mt-9">Order confirmed</p>
        <h1 className="mx-auto max-w-3xl font-serif text-5xl leading-[1.02] text-cream md:text-7xl">
          Thank you.
          <br />
          <em className="italic text-gold-light">It will be remembered.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-lg text-base leading-8 text-cream/65">
          Your order has been accepted and is resting with the atelier.{" "}
          {confirmationWasEmailed
            ? "A confirmation letter is already making its way to your inbox."
            : "The atelier will follow up with your confirmation letter by email."}
        </p>
        </Reveal>

        {/* Order number */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 inline-flex flex-col items-center gap-3 border border-gold/40 px-10 py-8 md:px-14">
          <span className="text-[10px] uppercase tracking-[0.16em] text-cream/45">
            Order number
          </span>
          <span className="font-serif text-2xl tracking-[0.24em] text-gold-light md:text-3xl">
            {orderNumber}
          </span>
        </div>
        </Reveal>

        {/* What happens next — an editorial table, not cards */}
        <Reveal delay={0.16}>
        <div className="mx-auto mt-16 max-w-2xl text-left md:mt-20">
          <div className="mb-2 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
            <p className="text-[11px] uppercase tracking-[0.16em] text-cream/45">
              What happens next
            </p>
          </div>
          <ol>
            {NEXT_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-5 border-t border-white/10 py-9 md:grid-cols-[4rem_1fr]"
              >
                <span className="font-serif text-3xl italic leading-none text-gold-light/70">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="font-serif text-xl leading-snug text-cream">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-7 text-cream/55">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-4 border-t border-white/10 pt-8">
            <span aria-hidden="true" className="h-px w-8 bg-gold/40" />
            <p className="font-serif text-base italic text-cream/60">
              From the atelier to your door — with the tasting card, always.
            </p>
          </div>
        </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/all-perfumes" className="btn btn-gold">
            Continue shopping
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link href="/" className="text-link text-link-light text-cream">
            <Gem size={13} strokeWidth={1.5} aria-hidden="true" />
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}