"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, Zap } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice, type Product, type ProductSize } from "@/lib/products";

/**
 * Adds the chosen product size to the cart (persisted via CartProvider) and
 * shows a brief confirmation before reverting to ready state.
 *
 * When `buyNow` is true, the item is added and the user is taken straight to
 * the bag instead of showing the confirmation state.
 */
export default function AddToCartButton({
  product,
  size,
  buyNow = false,
}: {
  product: Product;
  size: ProductSize;
  buyNow?: boolean;
}) {
  const router = useRouter();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    add(product.slug, size.id);
    if (buyNow) {
      router.push("/cart");
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={`btn btn-block ${buyNow ? "btn-dark" : "btn-gold"} ${
        added ? "pointer-events-none" : ""
      }`}
    >
      {added ? (
        <>
          <Check size={14} strokeWidth={2} aria-hidden="true" />
          Added to bag
        </>
      ) : buyNow ? (
        <>
          <Zap size={15} strokeWidth={1.5} aria-hidden="true" />
          Buy Now — {formatPrice(size.price)}
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