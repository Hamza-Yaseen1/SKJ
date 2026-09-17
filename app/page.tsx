import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products";
import { activeDeal } from "@/lib/deals";

export const metadata: Metadata = {
  title: { absolute: "SKJ Pure Presence · Luxury Perfume" },
  description:
    "SKJ Pure Presence composes rare, hand-filled extraits de parfum in Pakistan — woody, floral, oriental and chypre fragrances for those who wear presence. Discover the collection.",
  alternates: { canonical: "/" },
};

const MARQUEE_WORDS = [
  "Pakistan",
  "Extrait de parfum",
  "Hand-composed",
  "Exclusive",
  "Small batch",
  "Refillable flacon",
];

const PRACTICES: Array<[string, string]> = [
  ["Hand-filled", "Every flacon poured and signed by hand"],
  ["Refillable", "Keep the bottle, replenish the essence"],
  ["Cruelty-free", "Responsible sourcing, always"],
];

export default function Home() {
  const featured = getFeaturedProducts();
  const lead = featured.find((product) => product.tag === "Signature") ?? featured[0]!;
  const rest = featured.filter((product) => product.id !== lead.id);

  const philosophyImage = getProductBySlug("white-noor")?.image ?? lead.image;

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        slides={getAllProducts().map((product) => ({
          image: product.image,
          name: product.name,
        }))}
        count={getAllProducts().length}
      />

      {/* ── Marquee ── */}
      <div
        className="overflow-hidden border-y border-gold/25 bg-charcoal py-4"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max items-center">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-gold/60"
            >
              {word}
              <span className="text-gold/25">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Deal of the week banner ── */}
      {activeDeal && (
        <Reveal y={16}>
          <section
            aria-label="Deal of the week"
            className="border-b border-gold/25 bg-charcoal"
          >
            <div className="container-luxe flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-8">
              <div className="flex items-center gap-6">
                <span
                  aria-hidden="true"
                  className="hidden h-12 w-px bg-gold/40 sm:block"
                />
                <div>
                  <p className="eyebrow eyebrow-on-dark">Deal of the week</p>
                  <p className="mt-2 font-serif text-2xl text-cream md:text-3xl">
                    {activeDeal.title}
                  </p>
                </div>
              </div>
              <Link href="/deals" className="text-link text-link-light text-cream">
                View the deal
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Featured collection ── */}
      <section className="bg-cream">
        <div className="container-luxe py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div className="max-w-md">
                <p className="eyebrow mb-6">The edit</p>
                <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
                  Four signatures.
                  <br />
                  <em className="italic text-gold">One language.</em>
                </h2>
                <p className="mt-6 text-sm leading-7 text-bark">
                  The atelier&rsquo;s introduction — four extraits chosen for the
                  way they speak to one another, distilled from a wider
                  vocabulary of six.
                </p>
              </div>
              <Link href="/shop" className="text-link">
                View all {getAllProducts().length} fragrances
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Editorial layout — lead signature on the left, rest stacked right */}
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <Reveal delay={0.05}>
                <ProductCard product={lead} />
              </Reveal>
            </div>
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 md:col-span-5 md:pt-24">
              {rest.map((product, i) => (
                <Reveal key={product.id} delay={0.1 + i * 0.08}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy / The House ── */}
      <section className="bg-sand">
        <div className="container-luxe grid items-center gap-16 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-36">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/30 md:block"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
              <Image
                src={philosophyImage}
                alt="An SKJ flacon resting in soft morning light"
                fill
                sizes="(max-width: 768px) 100vw, 44vw"
                quality={80}
                className="img-zoom object-cover"
              />
            </div>
            <p className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-bark">
              <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
              Composed in Pakistan
            </p>
          </Reveal>

          <Reveal delay={0.12} className="md:pl-4">
            <p className="eyebrow mb-8">The house</p>
            <blockquote className="font-serif text-2xl leading-[1.3] text-ink md:text-4xl md:leading-[1.15]">
              <span
                aria-hidden="true"
                className="mb-3 block font-serif text-6xl leading-[0.7] text-gold"
              >
                &ldquo;
              </span>
              A fragrance is the only accessory you truly never take off —
              <em className="text-gold">
                and the first thing anyone remembers.
              </em>
              &rdquo;
            </blockquote>
            <p className="mt-8 max-w-md text-base leading-8 text-bark">
              We blend rare materials in small batches, at high concentration,
              and in silence — the way an atelier should. Six compositions for
              the moments that deserve more than a crowd.
            </p>

            <ol className="mt-10 border-t border-ink/15">
              {PRACTICES.map(([title, copy], i) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-5 border-b border-ink/15 py-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-lg italic text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-6 text-bark">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link href="/about" className="text-link mt-10">
              Read the story
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Newsletter CTA removed — arrives with the collection release ── */}
    </>
  );
}