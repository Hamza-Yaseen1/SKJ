import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getAllProducts, Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Explore the full SKJ collection — six extraits et eaux de parfum composed in Pakistan across woody, floral, oriental, citrus, gourmand and chypre families.",
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    url: "/shop",
    title: "The Collection · SKJ",
    description:
      "Six extraits et eaux de parfum composed by hand in Pakistan across woody, floral, oriental, citrus, gourmand and chypre families.",
  },
};

const tagPriority = (product: Product): number => {
  switch (product.tag) {
    case "Signature":
      return 0;
    case "Bestseller":
      return 1;
    case "New":
      return 2;
    case "Limited":
      return 3;
    default:
      return 4;
  }
};

export default function Shop() {
  const products = getAllProducts();

  const ordered = [...products].sort(
    (a, b) => tagPriority(a) - tagPriority(b)
  );

  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-cream">
        <div className="container-luxe pt-20 pb-16 text-center md:pt-28 md:pb-20">
          <Reveal>
            <div aria-hidden="true" className="mx-auto flex items-center gap-5">
              <span className="h-px w-12 bg-gold/40" />
              <span className="text-gold/60">✦</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>
            <p className="eyebrow mt-8">The collection · Pakistan</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
              Six compositions,
              <br />
              <em className="italic text-gold">one house.</em>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-bark">
              Each extrait is composed by hand in Pakistan and restricted to a
              small yearly batch — so the choice can afford to be deliberate.
              Begin where you linger.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="bg-cream">
        <div className="container-luxe py-16 md:py-24">
          <div className="mb-14 flex items-center gap-6">
            <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
              In order of the house
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.07}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center gap-6 text-center">
            <span aria-hidden="true" className="h-px w-10 bg-gold/40" />
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
              Six compositions — the archive closes here
            </p>
          </div>
        </div>
      </section>

      {/* ── Discovery CTA ── */}
      <section className="bg-sand">
        <div className="container-luxe py-20 md:py-28">
          <Reveal className="mx-auto max-w-xl text-center">
            <div aria-hidden="true" className="flex items-center justify-center gap-5">
              <span className="h-px w-12 bg-gold/40" />
              <span className="text-gold/60">✦</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>
            <p className="eyebrow mt-9">A quiet hour, to begin</p>
            <p className="mt-6 font-serif text-2xl leading-snug text-ink md:text-3xl">
              Not sure where to start?{" "}
              <em className="italic text-gold">Begin with your quiet hour.</em>
            </p>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-bark">
              Write to the atelier — a perfumer will answer within a day with
              three considered suggestions, tailored to the way you live.
            </p>
            <a
              href="mailto:atelier@skjpurepresence.com?subject=A%20quiet%20hour%20to%20begin"
              className="text-link mt-10"
            >
              atelier@skjpurepresence.com
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <p className="mt-7 text-[11px] uppercase tracking-[0.16em] text-stone">
              Replies within one day, always
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}