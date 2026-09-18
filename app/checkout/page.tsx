import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | SKJ Pure Presence",
  description:
    "Complete your SKJ order — complimentary shipping across Pakistan, confirmation by email. No payment is taken online.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}