"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice, type Product, type ProductSize } from "@/lib/products";

/**
 * Adds the chosen product size to the cart (persisted via CartProvider) and
 * shows a brief confirmation before reverting to ready state.
 */
export default function AddToCartButton({
  product,
  size,
}: {
  product: Product;
  size: ProductSize;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    add(product.slug, size.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={`btn btn-block btn-gold ${added ? "pointer-events-none" : ""}`}
    >
      {added ? (
        <>
          <Check size={14} strokeWidth={2} aria-hidden="true" />
          Added to bag
        </>
      ) : (
        <>
          <ShoppingBag size={15} strokeWidth={1.5} aria-hidden="true" />
          Add to bag — {formatPrice(size.price)}
        </>
      )}
    </button>
  );
}