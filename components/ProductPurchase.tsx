"use client";

import { useState } from "react";
import { Droplets, Gem, Sparkles } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice, type Product } from "@/lib/products";

/**
 * The interactive half of the product page: size selection drives the
 * displayed price and the cart line that gets added. Kept client-side so
 * the rest of the page can stay a server component.
 */
export default function ProductPurchase({ product }: { product: Product }) {
  const [sizeId, setSizeId] = useState(product.sizes[0]!.id);
  const selected =
    product.sizes.find((size) => size.id === sizeId) ?? product.sizes[0]!;

  const facts: Array<[string, string]> = [
    ["Concentration", product.concentration],
    ["Projection", product.projection],
    ["Family", product.family],
  ];

  return (
    <div className="md:pt-6">
      <p className="eyebrow mb-5">{product.family}</p>
      <h1 className="font-serif text-5xl leading-[1.02] text-ink md:text-6xl">
        {product.name}
      </h1>
      <p className="mt-5 font-serif text-2xl italic text-gold">
        {formatPrice(selected.price)}
      </p>

      {/* Composition facts */}
      <dl className="mt-10 grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10">
        {facts.map(([k, v]) => (
          <div key={k} className="py-6 pl-5 first:pl-0">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-stone">
              {k}
            </dt>
            <dd className="mt-2 font-serif text-base italic text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-9 max-w-lg text-base leading-8 text-bark">
        {product.description}
      </p>

      {/* Size selector */}
      <fieldset className="mt-11">
        <legend className="mb-5 block text-[11px] uppercase tracking-[0.16em] text-ink">
          Size
        </legend>
        <div
          className="grid grid-cols-2 border border-ink/15"
          role="radiogroup"
          aria-label="Choose a size"
        >
          {product.sizes.map((size, i) => {
            const active = size.id === selected.id;
            return (
              <button
                key={size.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSizeId(size.id)}
                className={`flex flex-col gap-1.5 px-6 py-5 text-left transition-colors ${
                  i > 0 ? "border-l border-ink/15" : ""
                } ${active ? "bg-ink text-cream" : "text-bark hover:bg-ink/[0.03]"}`}
              >
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                  <span
                    aria-hidden="true"
                    className={`text-[10px] ${active ? "text-gold-light" : "text-gold"}`}
                  >
                    ✦
                  </span>
                  {size.label}
                </span>
                <span className="font-serif text-base italic">
                  {formatPrice(size.price)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-6 text-stone">
          Both sizes are refillable — keep your flacon, replenish the essence.
        </p>
      </fieldset>

      <div className="mt-9">
        <div className="grid gap-4 sm:grid-cols-2">
          <AddToCartButton product={product} size={selected} />
          <AddToCartButton product={product} size={selected} buyNow />
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.16em] text-stone">
          <span className="flex items-center gap-2">
            <Droplets size={13} strokeWidth={1.5} aria-hidden="true" /> Refillable flacon
          </span>
          <span className="flex items-center gap-2">
            <Gem size={13} strokeWidth={1.5} aria-hidden="true" /> Hand-filled in Pakistan
          </span>
          <span className="flex items-center gap-2">
            <Sparkles size={13} strokeWidth={1.5} aria-hidden="true" /> Cruelty-free
          </span>
        </p>
      </div>
    </div>
  );
}
