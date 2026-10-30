import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gift } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { activeDeal, type DealType } from "@/lib/deals";
import { getFeaturedProducts, getProductUrl } from "@/lib/products";

const DEAL_LABELS: Record<DealType, string> = {
  "free-tester": "Free tester",
  bogo: "Buy 1 Get 1",
  discount: "Limited discount",
  bundle: "Fragrance bundle",
};

const featured = getFeaturedProducts();
const spotlight = featured[0]!;

const openGraph = activeDeal
  ? {
      type: "website" as const,
      url: "/deals",
      title: `${activeDeal.title} · SKJ Pure Presence`,
      description: activeDeal.description,
      images: [{ url: activeDeal.image, alt: activeDeal.title }],
    }
  : undefined;

export const metadata: Metadata = {
  title: {
    absolute: activeDeal
      ? "The Atelier Offer | SKJ Pure Presence"
      : "No Offer Yet | SKJ Pure Presence",
  },
  description: activeDeal
    ? `Discover the current SKJ Pure Presence offer: ${activeDeal.description}`
    : "There is no offer just yet. Stay tuned for updates, or explore the SKJ Pure Presence fragrance collection.",
  alternates: { canonical: "/deals" },
  openGraph,
};

export default function DealsPage() {
  if (!activeDeal) {
    return (
      <>
        <section className="relative isolate overflow-hidden bg-ink text-cream">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.18em] -left-[0.08em] -z-10 select-none font-serif text-[48vw] italic leading-none text-cream/[0.025] md:text-[34rem]"
          >
            SKJ
          </span>
          <div className="container-luxe grid items-center gap-10 py-12 sm:py-16 md:min-h-[620px] md:grid-cols-[1fr_0.82fr] md:gap-12 md:py-20 lg:min-h-[700px] lg:gap-20">
            <Reveal className="relative z-10 max-w-2xl">
              <p className="eyebrow eyebrow-on-dark flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-gold-light/70" />
                A note from the atelier
              </p>
              <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                No offer
                <br />
                just yet.
                <em className="mt-2 block text-gold-light">Stay tuned.</em>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-cream/75 sm:text-lg sm:leading-8">
                We don’t have a special offer at the moment. While you wait,
                take a look at the fragrances we’ve composed for everyday
                presence and unforgettable evenings.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <Link
                  href="/all-perfumes"
                  className="btn btn-gold min-h-12 justify-center sm:justify-start"
                >
                  Explore the collection
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/about"
                  className="text-link text-link-light inline-flex min-h-11 items-center justify-center text-cream sm:justify-start"
                >
                  The story of SKJ
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/15 pt-5 text-[10px] uppercase tracking-[0.16em] text-cream/65">
                <span>Composed in Pakistan</span>
                <span>18–25% parfum</span>
              </div>
            </Reveal>

            <Reveal
              delay={0.12}
              className="relative mx-auto w-full max-w-md md:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 hidden h-full w-full border border-gold/40 sm:block"
              />
              <Link
                href={getProductUrl(spotlight.slug)}
                aria-label={`Discover ${spotlight.name}, a featured fragrance`}
                className="group relative block aspect-[4/3] overflow-hidden bg-charcoal focus-visible:outline-offset-4 sm:aspect-[5/4] md:aspect-[4/5]"
              >
                <Image
                  src={spotlight.image}
                  alt={`${spotlight.name} fragrance`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 43vw, 520px"
                  quality={85}
                  fetchPriority="high"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/10" />
                <span className="absolute left-5 top-5 border border-cream/50 bg-ink/45 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-cream backdrop-blur-sm sm:left-6 sm:top-6">
                  A house signature
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cream/70">
                      {spotlight.family} · {spotlight.concentration}
                    </p>
                    <p className="mt-2 font-serif text-3xl text-cream sm:text-4xl">
                      {spotlight.name}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-cream/50 text-cream transition-colors group-hover:border-gold-light group-hover:bg-gold-light group-hover:text-ink"
                  >
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-cream/50">
                Discover a fragrance made to stay with you
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-ivory">
          <div className="container-luxe py-16 sm:py-20 lg:py-28">
            <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow eyebrow-on-light mb-4">
                  The SKJ collection
                </p>
                <h2 className="max-w-lg font-serif text-3xl leading-tight text-ink sm:text-4xl">
                  Find the one that
                  <em className="text-gold"> feels like yours.</em>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-bark">
                  Explore our signatures, each composed with its own character
                  and point of view.
                </p>
              </div>
              <Link
                href="/all-perfumes"
                className="text-link inline-flex min-h-11 items-center self-start sm:self-auto"
              >
                See all fragrances
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-4">
              {featured.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.06}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="overflow-hidden bg-cream">
        <div className="container-luxe py-10 sm:py-14 lg:py-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
            <p className="eyebrow eyebrow-on-light">
              A considered gesture from the atelier
            </p>
            <span className="inline-flex items-center gap-2 border border-ink/15 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-bark">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-gold"
              />
              The current offer
            </span>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr] md:gap-12 lg:gap-20">
            <Reveal className="max-w-2xl">
              <div aria-hidden="true" className="mb-7 flex items-center gap-4">
                <span className="h-px w-10 bg-gold/60" />
                <Gift size={18} strokeWidth={1.4} className="text-gold" />
              </div>
              <p className="eyebrow eyebrow-on-light">
                {DEAL_LABELS[activeDeal.type]} · SKJ Pure Presence
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[1.04] text-ink sm:text-5xl lg:text-7xl">
                {activeDeal.title}
                <span className="mt-2 block text-bark">For a little while.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-bark sm:text-lg sm:leading-8">
                {activeDeal.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
                <Link
                  href={activeDeal.link}
                  className="btn btn-gold min-h-12 justify-center sm:justify-start"
                >
                  {activeDeal.buttonText}
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/all-perfumes"
                  className="text-link inline-flex min-h-11 items-center justify-center sm:justify-start"
                >
                  Browse every fragrance
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal
              delay={0.12}
              className="relative mx-auto w-full max-w-xl md:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 hidden h-full w-full border border-gold/40 sm:block"
              />
              <div className="relative aspect-[4/3] overflow-hidden bg-sand sm:aspect-[5/4] md:aspect-[4/5]">
                <Image
                  src={activeDeal.image}
                  alt={activeDeal.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 45vw, 540px"
                  quality={85}
                  fetchPriority="high"
                  className="img-zoom object-cover"
                />
                <span className="absolute left-4 top-4 bg-ink/80 px-3.5 py-2 text-[10px] uppercase tracking-[0.16em] text-cream sm:left-6 sm:top-6">
                  {DEAL_LABELS[activeDeal.type]}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ivory">
        <div className="container-luxe py-16 sm:py-20 lg:py-28">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow eyebrow-on-light mb-4">
                Consider, while it lasts
              </p>
              <h2 className="max-w-lg font-serif text-3xl leading-tight text-ink sm:text-4xl">
                The signatures,{" "}
                <em className="text-gold">as an encore.</em>
              </h2>
            </div>
            <Link
              href="/all-perfumes"
              className="text-link inline-flex min-h-11 items-center self-start sm:self-auto"
            >
              View all fragrances
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
