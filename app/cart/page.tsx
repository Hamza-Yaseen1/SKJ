import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Bag | SKJ Pure Presence",
  description:
    "Review your SKJ selection — refine quantities and step quietly toward checkout.",
};

export default function CartPage() {
  return <CartView />;
}