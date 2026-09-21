import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { activeDeal, type DealType } from "@/lib/deals";
import { getFeaturedProducts } from "@/lib/products";

const DEAL_LABELS: Record<DealType, string> = {
  "free-tester": "Free Tester",
  bogo: "Buy 1 Get 1",
  discount: "Limited Discount",
  bundle: "Bundle",
};

const openGraph = activeDeal
  ? {
      type: "website" as const,
      url: "/deals",
      title: `${activeDeal.title} · SKJ`,
      description: activeDeal.description,
      images: [{ url: activeDeal.image, alt: activeDeal.title }],
    }
  : undefined;

export const metadata: Metadata = {
  title: "Deal of the Week | SKJ Perfume Promotions in Pakistan",
  description:
    "The current SKJ Pure Presence promotion — a considered gesture from the atelier. Buy 1 Get 1 Free: any 100 ml extrait, a 50 ml free.",
  alternates: { canonical: "/deals" },
  openGraph,
};

export default function DealsPage() {
  const deal = activeDeal;

  if (!deal) {
    return (
      <section className="bg-cream">
        <div className="container-luxe flex flex-col items-center py-24 text-center md:py-40">
          <div aria-hidden="true" className="flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow mt-9">The atelier</p>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            No deal available
            <em className="italic text-gold"> at the moment.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-8 text-bark">
            Check back soon — the house is always composing something. While
            you wait, the collection is open.
          </p>
          <Link href="/shop" className="btn btn-gold mt-10">
            Discover the collection
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  const featured = getFeaturedProducts();

  return (
    <>
      {/* ── Deal hero ── */}
      <section className="bg-cream">
        <div className="container-luxe grid gap-14 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-20 md:py-24">
          <Reveal className="md:pr-4">
            <div aria-hidden="true" className="flex items-center gap-5">
              <span className="h-px w-10 bg-gold/40" />
              <span className="text-gold/60">✦</span>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <p className="eyebrow mt-8">Deal of the week</p>
            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
              <em className="italic text-gold">{deal.title}.</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-bark">
              {deal.description}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-bark">
              Discover the current offers from the SKJ atelier, where thoughtful fragrances and limited-time savings come together. These promotions are available for a short window, so it is worth reviewing the selection while the offer lasts and adding your favourites to cart before it ends. We refresh the collection with new discoveries over time, so check back often if you are waiting for the next special offer or a seasonal scent to return.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href={deal.link} className="btn btn-gold">
                {deal.buttonText}
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/shop" className="text-link">
                Browse the collection
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 hidden h-full w-full border border-gold/25 md:block"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-sand">
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                quality={85}
                className="img-zoom object-cover"
              />
              <span className="absolute left-5 top-5 bg-ink/80 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cream">
                {DEAL_LABELS[deal.type]}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured, while the offer lasts ── */}
      <section className="border-t border-ink/10 bg-ivory">
        <div className="container-luxe py-20 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-5">Consider, while it lasts</p>
              <h2 className="max-w-md font-serif text-3xl text-ink md:text-4xl">
                The signatures,{" "}
                <em className="italic text-gold">as an encore.</em>
              </h2>
            </div>
            <Link href="/shop" className="text-link">
              View all fragrances
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}