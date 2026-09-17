/**
 * SKJ Pure Presence
 * "Deal of the Week" — data layer.
 *
 * ────────────────────────────────────────────────────────
 * HOW TO MANAGE (no code changes needed anywhere else):
 *
 *  1. ACTIVATE a deal → uncomment one object in the
 *     "LIVE DEAL" slot below and paste your values.
 *
 *  2. REMOVE the deal  → comment that object back out so
 *     the slot reads `export const activeDeal = null;`.
 *     The site then shows "No deal available".
 *
 *  3. EDIT copy         → change the strings inside the
 *     object. `link` can be "/shop", "/product/legend",
 *     or any route you like.
 *
 *  There are ready-made templates at the bottom — copy any
 *  one up into the LIVE slot to rotate the promotion.
 * ────────────────────────────────────────────────────────
 */

export type DealType = "free-tester" | "bogo" | "discount" | "bundle";

export interface Deal {
  /** Machine-readable kind — powers the small label chip on the page. */
  type: DealType;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

// =================================================================
//  LIVE DEAL  (only one may be active — keep the rest commented out)
// =================================================================
export const activeDeal: Deal | null = {
  type: "bogo",
  title: "Buy 1 Get 1 Free",
  description:
    "Buy any 100 ml extrait and receive a 50 ml of your choice, free.",
  image: "/Images/yakoot/yakoot.jpg",
  buttonText: "Shop Now",
  link: "/shop",
};

/* =================================================================
   ALTERNATE DEAL TEMPLATES
   Copy one of the blocks below up into the LIVE slot to rotate.
   Remember: only ONE `activeDeal` may be exported at a time.

   ── Free Tester with any perfume ────────────────────────────────
   export const activeDeal: Deal | null = {
     type: "free-tester",
     title: "Free Tester with Every Order",
     description:
       "A complimentary tester flacon with every fragrance — the house, tried before it is kept.",
     image: "/Images/Perfume-tester/0c7b951f-5463-42de-b41e-bb067b780bc0.jpg",
     buttonText: "Claim the Tester",
     link: "/shop",
   };

   ── Discount on selected perfumes ───────────────────────────────
   export const activeDeal: Deal | null = {
     type: "discount",
     title: "20% Off the White Collection",
     description:
       "White Noor and Icy Noor, considered a little more kindly this week.",
     image: "/Images/White-noor/White_Noor_inspired_by_Musil.jpg",
     buttonText: "Shop the Discount",
     link: "/shop",
   };

   ── Bundle offer ────────────────────────────────────────────────
   export const activeDeal: Deal | null = {
     type: "bundle",
     title: "The Evening Pair",
     description:
       "Yaqoot and Legend in one considered bundle — the house signature and its shadow.",
     image: "/Images/Legend/abf7e7fb-d55f-4773-a333-cd379ac3fddc.jpg",
     buttonText: "View the Bundle",
     link: "/shop",
   };

   ── No deal at all ──────────────────────────────────────────────
   Comment out every `activeDeal` object so that only
   `export const activeDeal = null;` remains in the file.
   ================================================================= */