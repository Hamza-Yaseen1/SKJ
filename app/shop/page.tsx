import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Explore the full SKJ collection — ten extraits de parfum composed in Grasse across woody, floral, oriental, citrus, gourmand and chypre families.",
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    url: "/shop",
    title: "The Collection · SKJ",
    description:
      "Ten extraits de parfum composed by hand in Grasse across woody, floral, oriental, citrus, gourmand and chypre families.",
  },
};

const FAMILY_ORDER = [
  "Woody",
  "Floral",
  "Oriental",
  "Citrus",
  "Gourmand",
  "Green",
  "Chypre",
] as const;

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

  const byFamily = FAMILY_ORDER.reduce<Record<string, number>>((acc, family) => {
    acc[family] = products.filter((p) => p.family === family).length;
    return acc;
  }, {});

  const ordered = [...products].sort(
    (a, b) => tagPriority(a) - tagPriority(b)
  );

  return (
    <>
      {/* ── Intro ── */}
      <section className="bg-cream">
        <div className="container-luxe pt-20 pb-16 text-center md:pt-28 md:pb-20">
          <div aria-hidden="true" className="mx-auto flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow mt-8">The collection · Grasse</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
            Ten compositions,
            <br />
            <em className="italic text-gold">one house.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-bark">
            Each extrait is composed by hand in Grasse and restricted to a
            small yearly batch — so the choice can afford to be deliberate.
            Begin where you linger.
          </p>
        </div>
      </section>

      {/* ── Filter bar (decorative until commerce) ── */}
      <section className="border-y border-ink/10 bg-ivory">
        <div className="container-luxe flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
            View by family
          </p>
          <ul
            aria-label="Fragrance families — visual placeholder"
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {["All", ...FAMILY_ORDER].map((family) => (
              <li key={family}>
                {family === "All" ? (
                  <span className="cursor-default border-b border-gold pb-0.5 text-[11px] uppercase tracking-[0.16em] text-ink select-none">
                    All
                    <span className="ml-2 font-serif text-xs italic text-gold">
                      · 10
                    </span>
                  </span>
                ) : (
                  <span className="cursor-default text-[11px] uppercase tracking-[0.16em] text-stone transition-colors select-none hover:text-ink">
                    {family}
                    <span className="ml-2 font-serif text-xs italic text-gold/80">
                      · {byFamily[family]}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="text-[11px] uppercase tracking-[0.16em] text-stone md:text-right">
            {products.length} extraits
          </p>
        </div>
        <p className="sr-only">
          Filtering is a visual placeholder until commerce is wired in.
        </p>
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
            {ordered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center gap-6 text-center">
            <span aria-hidden="true" className="h-px w-10 bg-gold/40" />
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone">
              Ten compositions — the archive closes here
            </p>
          </div>
        </div>
      </section>

      {/* ── Discovery CTA ── */}
      <section className="bg-sand">
        <div className="container-luxe py-20 md:py-28">
          <div className="mx-auto max-w-xl text-center">
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
          </div>
        </div>
      </section>
    </>
  );
}