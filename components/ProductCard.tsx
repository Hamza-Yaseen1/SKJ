import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice, getDefaultSize } from "@/lib/products";

/**
 * Portrait product card used across the home, shop and related-products
 * grids. The entire card is one link; hover lifts the image and reveals
 * an implicit "view" affordance.
 */
export default function ProductCard({ product }: { product: Product }) {
  const signature = [product.notes.top[0], product.notes.heart[0], product.notes.base[0]]
    .filter(Boolean)
    .join(" · ");
  const price = getDefaultSize(product).price;

  return (
    <article className="group">
      <Link
        href={`/product/${product.slug}`}
        className="block focus-visible:outline-offset-4"
        aria-label={`${product.name} — from ${formatPrice(price)}`}
      >
        {/* Image */}
        <div className="relative aspect-4/5 overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={`${product.name} flacon — ${product.family} fragrance`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 25vw"
            quality={80}
            className="img-zoom object-cover"
          />

          {/* Tag badge */}
          {product.tag && (
            <span
              className={`absolute left-4 top-4 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cream ${
                product.tag === "Signature" ? "bg-gold text-ink" : "bg-ink/80"
              }`}
            >
              {product.tag}
            </span>
          )}

          {/* Family label */}
          <span className="absolute bottom-4 left-4 border-b border-cream/40 pb-1 text-[10px] uppercase tracking-[0.16em] text-cream/90">
            {product.family}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="translate-y-3 border border-cream/60 px-6 py-3 text-[10px] uppercase tracking-[0.16em] text-cream transition-transform duration-500 group-hover:translate-y-0">
              View fragrance
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="border-b border-ink/10 pt-5 pb-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-xl leading-snug text-ink transition-colors group-hover:text-gold group-hover:italic">
              {product.name}
            </h3>
            <span className="shrink-0 font-sans text-xs tracking-wide text-gold">
              from {formatPrice(price)}
            </span>
          </div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-stone">
            {signature}
          </p>
        </div>
      </Link>
    </article>
  );
}