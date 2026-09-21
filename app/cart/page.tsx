import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: { absolute: "Your Cart | SKJ Pure Presence" },
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
      <section className="bg-sand">
        <div className="container-luxe py-16 md:py-20">
          <div className="max-w-3xl text-base leading-8 text-bark">
            <p>
              Your cart is a place to pause and review the SKJ compositions you
              are considering before placing an order. Take a moment to check
              each fragrance, bottle size, and quantity so your final selection
              feels exactly right.
            </p>
            <p className="mt-5">
              To update an item, use the minus or plus controls beside its
              quantity. You can remove a fragrance completely with the close
              button on its row, then return to the collection whenever you
              would like to discover another extrait. Your subtotal updates as
              you make each change.
            </p>
            <p className="mt-5">
              Shipping is complimentary, and your order is prepared with care
              before it leaves the atelier. When you are ready, continue to
              checkout to review your details. If you need help choosing a
              composition, changing an order, or understanding delivery,
              contact the atelier at atelier@skjpurepresence.com and we will be
              glad to help.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}