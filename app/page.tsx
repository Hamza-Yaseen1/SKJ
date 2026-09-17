import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products";

export const metadata: Metadata = {
  title: { absolute: "SKJ Pure Presence · Luxury Perfume" },
  description:
    "SKJ Pure Presence composes rare, hand-filled extraits de parfum in Grasse — woody, floral, oriental and chypre fragrances for those who wear presence. Discover the collection.",
  alternates: { canonical: "/" },
};

const MARQUEE_WORDS = [
  "Grasse",
  "Extrait de parfum",
  "Hand-composed",
  "Exclusive",
  "Small batch",
  "Refillable flacon",
];

const HOUSE_FACTS: Array<[string, string]> = [
  ["House", "Grasse, France"],
  ["Compositions", "10 extraits"],
  ["Concentration", "18–25% parfum"],
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

  const philosophyImage = getProductBySlug("white")?.image ?? lead.image;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[96svh] items-end overflow-hidden bg-ink">
        <Image
          // src={heroSrc}
          src="/Images/Yakoot_by_SKJ_inspired_by_the_richness_of_Baccarat.jpg"

          alt="SKJ Pure Presence extrait de parfum flacon in dark, cinematic light"
          fill
          sizes="100vw"
          quality={80}
          preload
          className="object-cover opacity-60"
        />
        {/* Single monochrome scrim for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/15"
        />

        <div className="container-luxe relative z-10 pb-16 pt-40 md:pb-24 md:pt-52">
          <p className="eyebrow eyebrow-on-dark mb-8">
            Pure Presence · Grasse · Est. 2026
          </p>
          <h1 className="max-w-4xl font-serif text-[3.25rem] leading-[0.98] text-cream sm:text-7xl lg:text-[6.25rem]">
            The quietest
            <br />
            <em className="italic text-gold-light">form of power.</em>
          </h1>
          <p className="mt-8 max-w-lg text-base leading-8 text-cream/75 md:text-lg">
            SKJ Pure Presence composes rare, high-concentration fragrances for those who
            move through the world loudly — without saying a word.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Link href="/shop" className="btn btn-gold">
              Discover the collection
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Link href="/about" className="text-link text-link-light text-cream">
              Our philosophy
            </Link>
          </div>

          {/* Mini index */}
          <dl className="mt-16 flex max-w-2xl flex-wrap gap-x-12 gap-y-6 border-t border-cream/15 pt-8">
            {HOUSE_FACTS.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-cream/45">
                  {k}
                </dt>
                <dd className="mt-1.5 font-serif text-base italic text-cream/85">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

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

      {/* ── Featured collection ── */}
      <section className="bg-cream">
        <div className="container-luxe py-24 md:py-32">
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
                vocabulary of ten.
              </p>
            </div>
            <Link href="/shop" className="text-link">
              View all {getAllProducts().length} fragrances
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          {/* Editorial layout — lead signature on the left, rest stacked right */}
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <ProductCard product={lead} />
            </div>
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 md:col-span-5 md:pt-24">
              {rest.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy / The House ── */}
      <section className="bg-sand">
        <div className="container-luxe grid items-center gap-16 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-36">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/30 md:block"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
              <Image
                src={philosophyImage}
                // src="/Images/Yakoot_by_SKJ_inspired_by_the_richness_of_Baccarat.jpg"
                alt="An SKJ flacon resting in soft morning light"
                fill
                sizes="(max-width: 768px) 100vw, 44vw"
                quality={80}
                className="img-zoom object-cover"
              />
            </div>
            <p className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-bark">
              <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
              Composed in Grasse
            </p>
          </div>

          <div className="md:pl-4">
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
              and in silence — the way an atelier should. Ten compositions for
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
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
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
        </div>
      </section>
    </>
  );
}