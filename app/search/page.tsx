import type { Metadata } from "next";
import { ArrowUpRight, SearchIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search the Collection | SKJ Pure Presence",
  description:
    "Search the SKJ Pure Presence collection — extraits de parfum composed and hand-filled in Pakistan.",
  alternates: { canonical: "/all-perfumes" },
  robots: { index: false, follow: true },
};

const normalize = (value: string) => value.trim().toLowerCase();

interface SearchProps {
  searchParams: Promise<{ q?: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? normalize(q) : "";
  const products = getAllProducts();

  const results = query
    ? products.filter((product) => {
        const haystack = [
          product.name,
          product.family,
          product.concentration,
          product.description,
          ...product.notes.top,
          ...product.notes.heart,
          ...product.notes.base,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : [];

  return (
    <>
      <section className="bg-cream">
        <div className="container-luxe py-20 md:py-28">
          <div aria-hidden="true" className="flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow mt-9">Search the house</p>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            Find your <em className="italic text-gold">composition.</em>
          </h1>

          <form action="/search" className="mt-10 max-w-xl" role="search">
            <label htmlFor="search-q" className="sr-only">
              Search the collection
            </label>
            <div className="flex items-stretch border border-ink/15 bg-ivory focus-within:border-gold">
              <SearchIcon
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="my-auto ml-5 shrink-0 text-stone"
              />
              <input
                id="search-q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Oud, rose, amber…"
                className="input-luxe border-0 bg-transparent focus:outline-none"
              />
              <button type="submit" className="btn btn-gold m-2 shrink-0">
                Search
              </button>
            </div>
          </form>

          {query && (
            <p className="mt-8 text-sm text-bark">
              {results.length === 0
                ? `Nothing matches "${query}" — the collection is small, the archive closes.`
                : `${results.length} ${results.length === 1 ? "composition" : "compositions"} found for "${query}".`}
            </p>
          )}

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {(query ? results : products).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {query && results.length === 0 && (
            <div className="mt-20 border-t border-ink/10 pt-12 text-center">
              <Link href="/all-perfumes" className="text-link">
                Browse the full collection instead
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}