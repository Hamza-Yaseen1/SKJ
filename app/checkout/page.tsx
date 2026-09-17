import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "A considered checkout — share your address and confirm your SKJ order. No payment is taken online.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}