import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the SKJ atelier — for guidance, press, private commissions, or simply to begin a conversation.",
};

const METHODS = [
  {
    label: "Write to us",
    value: "atelier@skjpurepresence.com",
    detail: "Replies within one working day",
    href: "mailto:atelier@skjpurepresence.com",
  },
  {
    label: "A perfumer's opinion",
    value: "Tell me where to begin",
    detail: "Three considered suggestions, always",
    href: "mailto:atelier@skjpurepresence.com?subject=Tell%20me%20where%20to%20begin",
  },
  {
    label: "The atelier",
    value: "Rue des Parfumeurs 12, Grasse",
    detail: "Open by appointment, Thursday–Saturday",
    href: "https://maps.google.com/?q=Rue+des+Parfumeurs+12,+06130+Grasse,+France",
  },
];

export default function Contact() {
  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-cream">
        <div className="container-luxe pt-20 pb-14 text-center md:pt-28 md:pb-20">
          <div aria-hidden="true" className="mx-auto flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow mt-9">Contact</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
            Begin a
            <em className="italic text-gold"> conversation.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-bark">
            Guidance, press, private commissions or simply a hello — every
            letter is read by a human who can smell the difference.
          </p>
        </div>
      </section>

      {/* ── Ways to reach the atelier ── */}
      <section className="bg-ivory">
        <div className="container-luxe py-16 md:py-24">
          <div className="mb-12 flex items-center gap-6">
            <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
              Three ways to reach us
            </p>
          </div>

          <ol className="border-t border-ink/10">
            {METHODS.map((method, i) => (
              <li key={method.label} className="border-b border-ink/10">
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group grid gap-4 py-9 md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-lg italic text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
                      {method.label}
                    </p>
                    <p className="mt-2 font-serif text-2xl italic leading-snug text-ink transition-colors group-hover:text-gold md:text-3xl">
                      {method.value}
                    </p>
                    <p className="mt-2 text-sm text-bark">{method.detail}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-stone transition-colors group-hover:text-gold md:justify-self-end"
                  />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-charcoal">
        <div className="container-luxe flex flex-col items-center py-24 text-center md:py-32">
          <div aria-hidden="true" className="flex items-center gap-5">
            <span className="h-px w-14 bg-gold/30" />
            <span className="text-gold/50">✦</span>
            <span className="h-px w-14 bg-gold/30" />
          </div>
          <p className="eyebrow eyebrow-on-dark mt-9">The SKJ letters</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.1] text-cream md:text-5xl">
            Notes on scent,
            <br />
            <em className="italic text-gold-light">sent rarely.</em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-cream/60">
            New compositions, atelier stories and early access — a small
            letter, seized from the noise of the world.
          </p>
          <div className="mt-10 flex w-full justify-center">
            <NewsletterForm />
          </div>
          <Link href="/shop" className="text-link text-link-light mt-14 text-cream">
            Back to the collection
          </Link>
        </div>
      </section>
    </>
  );
}