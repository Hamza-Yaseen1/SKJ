import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "The House",
  description:
    "SKJ Pure Presence was born in Grasse from a single unfinished sentence. The story of a maison de parfum built on concentration, rarity and restraint.",
};

const VALUES = [
  {
    title: "Composed in Grasse",
    copy: "Alongside the perfumers of the French Riviera, in the oldest perfume capital in the world.",
  },
  {
    title: "Small yearly batches",
    copy: "Rare materials, restricted runs. When a composition sells out, it does not return that year.",
  },
  {
    title: "Refillable flacons",
    copy: "Crystal and enamel meant to be kept. Replenish the essence, never the bottle.",
  },
  {
    title: "Responsible by design",
    copy: "Cruelty-free, traceable sourcing, and refills that cut waste at the source.",
  },
];

export default function About() {
  const image = getProductBySlug("ghazi")?.image ?? getAllProducts()[0]!.image;

  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-cream">
        <div className="container-luxe pt-20 pb-16 text-center md:pt-28 md:pb-24">
          <div aria-hidden="true" className="mx-auto flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow mt-9">The house</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
            Born of a single,
            <br />
            <em className="italic text-gold">unfinished sentence.</em>
          </h1>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="bg-sand">
        <div className="container-luxe grid items-center gap-14 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <div className="md:pr-8">
            <p className="eyebrow mb-6">Est. 2026</p>
            <div className="space-y-7 text-base leading-8 text-bark">
              <p>
                “Perfume is the only accessory you can never take off.” The
                sentence sat half-finished on an atelier wall in Grasse for
                four years before we knew how to complete it.
              </p>
              <p>
                We finished it the only way a maison should — by composing.
                Rare botanicals, worked at high concentration, in batches too
                small to be called a product. Ten compositions a year, filled
                by hand, worn like a signature.
              </p>
              <p className="font-serif text-xl italic text-ink">
                SKJ Pure Presence exists for the moments that deserve more than a crowd.
              </p>
            </div>
            <Link href="/shop" className="text-link mt-10">
              Explore the collection
            </Link>
          </div>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/30 md:block"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
              <Image
                src={image}
                alt="SKJ atelier — composition in progress"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                className="img-zoom object-cover"
              />
            </div>
            <p className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-bark">
              <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
              Composed in Grasse
            </p>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="bg-cream">
        <div className="container-luxe py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <p className="eyebrow mb-6">What we hold to</p>
              <h2 className="max-w-sm font-serif text-3xl leading-[1.12] text-ink md:text-4xl">
                Four principles,
                <br />
                <em className="italic text-gold">kept without compromise.</em>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-bark">
                Everything the house does — composing, filling, shipping and
                the rare refill — follows from these four. They keep the
                collection small and the work honest.
              </p>
            </div>
            <ol className="border-t border-ink/15">
              {VALUES.map((value, i) => (
                <li
                  key={value.title}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-x-5 border-b border-ink/15 py-7"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-lg italic text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{value.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-bark">
                      {value.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Closing band ── */}
      <section className="bg-ink">
        <div className="container-luxe flex flex-col items-center py-24 text-center md:py-32">
          <div aria-hidden="true" className="flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow eyebrow-on-dark mt-9">Join us</p>
          <p className="mt-6 max-w-2xl font-serif text-3xl leading-[1.12] text-cream md:text-5xl">
            Some scents are smelled.
            <br />
            <em className="italic text-gold-light">Ours are remembered.</em>
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/shop" className="btn btn-gold">
              Discover the collection
            </Link>
            <Link href="/contact" className="text-link text-link-light text-cream">
              Write to the atelier
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}