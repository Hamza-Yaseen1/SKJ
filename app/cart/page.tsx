import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Cart | SKJ Pure Presence",
  description:
    "Review your SKJ selection — refine quantities and step quietly toward checkout.",
};

export default function CartPage() {
  return (
    <main className="bg-cream">
      <div className="container-luxe pt-16 md:pt-20">
        <h1 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
          Your Cart
        </h1>
      </div>
      <CartView />
    </main>
  );
}