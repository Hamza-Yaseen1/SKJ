import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact the SKJ Atelier | Karachi, Pakistan",
  description:
    "Reach the SKJ atelier in Karachi — fragrance guidance, press, private commissions, or simply to begin a conversation.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  {
    label: "Write to us",
    value: "atelier@skjpurepresence.com",
    href: "mailto:atelier@skjpurepresence.com",
  },
  {
    label: "The atelier",
    value: "The SKJ Atelier, Karachi",
    detail: "Open by appointment, Thursday–Saturday",
    href: "https://maps.google.com/?q=Karachi,+Pakistan",
  },
];

export default function Contact() {
  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-cream">
        <div className="container-luxe pt-20 pb-14 text-center md:pt-28 md:pb-20">
          <Reveal>
            <div aria-hidden="true" className="mx-auto flex items-center gap-5">
              <span className="h-px w-12 bg-gold/40" />
              <span className="text-gold/60">✦</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>
            <p className="eyebrow mt-9">Contact</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
              Write to
              <em className="italic text-gold"> the atelier.</em>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-bark">
              Guidance, press, private commissions or simply a hello — every
              letter is read by a human who can smell the difference.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Form + atelier details ── */}
      <section className="bg-ivory">
        <div className="container-luxe grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="border border-ink/10 bg-cream p-8 md:p-10">
              <div className="mb-8 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
                <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
                  Send a letter
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>

          {/* Atelier details */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
                  <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
                    The atelier
                  </p>
                </div>
                <ul className="border-t border-ink/10">
                  {DETAILS.map((detail) => (
                    <li key={detail.label} className="border-b border-ink/10">
                      <a
                        href={detail.href}
                        target={
                          detail.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          detail.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group py-6"
                      >
                        <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
                          {detail.label}
                        </p>
                        <p className="mt-2 font-serif text-xl italic leading-snug text-ink transition-colors group-hover:text-gold md:text-2xl">
                          {detail.value}
                        </p>
                        {detail.detail && (
                          <p className="mt-2 text-sm text-bark">
                            {detail.detail}
                          </p>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gold/30 bg-sand p-8 text-center">
                <p className="font-serif text-lg italic leading-snug text-ink md:text-xl">
                  Replies within one working day,
                  <em className="text-gold"> always.</em>
                </p>
                <Link href="/shop" className="text-link mt-6">
                  Explore the collection meanwhile
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}