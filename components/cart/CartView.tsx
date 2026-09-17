"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/products";

export default function CartView() {
  const { items, count, subtotal, hydrated, updateQuantity, removeItem } = useCart();

  // Before hydration we can't know the persisted cart — show a quiet wait state.
  if (!hydrated) {
    return (
      <section className="bg-cream">
        <div className="container-luxe py-24 md:py-32">
          <p className="eyebrow mb-6">Your bag</p>
          <div className="h-12 w-2/3 animate-pulse rounded bg-ink/10" />
          <div className="mt-16 max-w-3xl space-y-8">
            {[0, 1].map((i) => (
              <div key={i} className="flex animate-pulse gap-6">
                <div className="h-32 w-25 shrink-0 bg-sand" />
                <div className="flex-1 space-y-3 border-b border-ink/10 pb-8">
                  <div className="h-5 w-1/3 rounded bg-ink/10" />
                  <div className="h-4 w-1/4 rounded bg-ink/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="flex min-h-[60svh] items-center bg-cream">
        <div className="container-luxe py-24 text-center md:py-32">
          <div aria-hidden="true" className="mx-auto flex items-center gap-5">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-gold/60">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </div>
          <p className="eyebrow mt-9">Your bag</p>
          <h1 className="mx-auto max-w-2xl font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
            An empty bag is
            <em className="italic text-gold"> a quiet beginning.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-base leading-8 text-bark">
            The collection is ten extraits, composed by hand in Grasse.
            Begin where you linger — and the atelier will keep your selection
            safe whenever you return.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <Link href="/shop" className="btn btn-gold">
              Browse the collection
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Link
              href="mailto:atelier@skjpurepresence.com"
              className="text-link"
            >
              Write to the atelier
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream">
      <div className="container-luxe py-16 md:py-24">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Your bag</p>
            <h1 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
              What you have
              <em className="italic text-gold"> chosen.</em>
            </h1>
          </div>
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-stone">
            {count} {count === 1 ? "piece" : "pieces"}
            <span aria-hidden="true" className="text-gold">✦</span>
            {items.length} {items.length === 1 ? "composition" : "compositions"}
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Line items */}
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map(({ product, size, quantity, lineTotal }) => {
              return (
                <li key={`${product.slug}:${size.id}`} className="group flex gap-5 py-8 md:gap-8 md:py-9">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative aspect-4/5 w-24 shrink-0 overflow-hidden bg-sand md:w-28"
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} flacon`}
                      fill
                      sizes="112px"
                      quality={75}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Meta */}
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-serif text-lg leading-snug text-ink transition-colors hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-stone">
                          {size.label} · {product.family}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug, size.id)}
                        aria-label={`Remove ${product.name} from bag`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-error hover:text-error"
                      >
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity stepper */}
                      <div
                        className="flex items-center border border-ink/20"
                        aria-label={`Quantity for ${product.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.slug, size.id, quantity - 1)}
                          disabled={quantity <= 1}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={14} strokeWidth={1.5} />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.slug, size.id, quantity + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:text-ink"
                        >
                          <Plus size={14} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-stone">
                          {formatPrice(size.price)} each
                        </p>
                        <p className="mt-1 font-serif text-xl text-ink">{formatPrice(lineTotal)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="border border-ink/10 bg-ivory p-8">
              <p className="eyebrow mb-8">Order summary</p>

              <dl className="space-y-4 border-b border-ink/10 pb-7 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-bark">Subtotal</dt>
                  <dd className="text-ink">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-bark">Shipping</dt>
                  <dd className="font-serif italic text-gold">Complimentary</dd>
                </div>
              </dl>

              <div className="flex items-baseline justify-between py-7">
                <span className="text-[11px] uppercase tracking-[0.16em] text-bark">Total</span>
                <span className="font-serif text-3xl text-ink">{formatPrice(subtotal)}</span>
              </div>

              <Link href="/checkout" className="btn btn-gold btn-block mt-1">
                Proceed to checkout
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <p className="mt-5 text-center text-xs leading-6 text-stone">
                No payment is taken today — your order is confirmed by letter.
              </p>
            </div>

            <div className="pt-6 text-center">
              <Link href="/shop" className="text-link">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}