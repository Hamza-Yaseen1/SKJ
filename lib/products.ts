/**
 * SKJ Pure Presence
 * Product catalogue (Day 1 static data layer).
 *
 * Replace this file with a CMS / database fetch when commerce is added;
 * every page reads exclusively through the helpers at the bottom of this file.
 */

export type Family =
  | "Yaqoot"
  | "White"
  | "Oriental"
  | "Ghazi"
  | "Gourmand"
  | "Chypre"
  | "Green";

export type Tag = "Bestseller" | "Signature" | "New" | "Limited";

export type Projection = "Subtle" | "Intimate" | "Moderate" | "Rich";

export interface Notes {
  top: string[];
  heart: string[];
  base: string[];
}

/** A purchasable bottle size. Prices are in Pakistani Rupees (PKR). */
export interface ProductSize {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  family: Family;
  concentration: string;
  sizes: ProductSize[];
  tag?: Tag;
  projection: Projection;
  description: string;
  notes: Notes;
  image: string;
  featured: boolean;
}

/** The two house sizes, priced in PKR. */
const sizes = (half: number, full: number): ProductSize[] => [
  { id: "30ml", label: "30 ml", price: half },
  { id: "50ml", label: "50 ml", price: full },
];

export const products: Product[] = [
  {
    id: "p-01",
    slug: "yakoot",
    name: "Yaqoot",
    family: "Yaqoot",
    concentration: "Extrait de Parfum",
    sizes: sizes(1200, 2000),
    tag: "Bestseller",
    projection: "Rich",
    description:
      "A ruby held to the light. Smoked cedar and black oud rest over a bruised rose, lit from within by a thread of saffron.",
    notes: {
      top: ["Bergamot", "Saffron", "Pink Pepper"],
      heart: ["Damask Rose", "Labdanum", "Geranium"],
      base: ["Black Oud", "Smoked Cedar", "Vetiver", "Amber"],
    },
    image: "/Images/yakoot/yakoot.jpg",
    featured: true,
  },
  {
    id: "p-02",
    slug: "legend",
    name: "Legend",
    family: "Oriental",
    concentration: "Extrait de Parfum",
    sizes: sizes(1200, 2000),
    tag: "Signature",
    projection: "Rich",
    description:
      "A richly luminous floral-oriental perfume shaped by saffron, Turkish rose, amber, and vanilla. It opens radiant and warm, then settles into a close, memorable trail.",
    notes: {
      top: ["Saffron", "Tangerine", "Orange Blossom"],
      heart: ["Turkish Rose", "Jasmine Sambac", "Cinnamon"],
      base: ["Golden Amber", "Vanilla", "Tonka Bean", "Oud"],
    },
    image: "/Images/Legend/abf7e7fb-d55f-4773-a333-cd379ac3fddc.jpg",
    featured: true,
  },
  {
    id: "p-03",
    slug: "ghazi",
    name: "Ghazi",
    family: "Ghazi",
    concentration: "Extrait de Parfum",
    sizes: sizes(1200, 2000),
    tag: "New",
    projection: "Rich",
    description:
      "Our most personal composition — oud and smoke over cold earth, softened by davana and black pepper. Not worn. Inhabited.",
    notes: {
      top: ["Black Pepper", "Cardamom", "Incense"],
      heart: ["Oud", "Davana", "Leather"],
      base: ["Patchouli", "Vetiver", "Charred Cedar", "Musk"],
    },
    image: "/Images/ghazi/ghazi.jpg",
    featured: true,
  },
  {
    id: "p-04",
    slug: "white-noor",
    name: "White Noor",
    family: "White",
    concentration: "Eau de Parfum",
    sizes: sizes(1200, 2000),
    projection: "Moderate",
    description:
      "A luminous white floral inspired by cool marble, orange blossom, jasmine, and clean musk. It feels poised, fresh, and quietly radiant from the first spray.",
    notes: {
      top: ["Neroli", "Pear", "Green Mandarin"],
      heart: ["Orange Blossom", "Jasmine Sambac", "Peony"],
      base: ["White Musk", "Blonde Woods", "Ambergris"],
    },
    image: "/Images/White-noor/White_Noor_inspired_by_Musil.jpg",
    featured: false,
  },
  {
    id: "p-05",
    slug: "icy-noor",
    name: "Icy Noor",
    family: "White",
    concentration: "Eau de Parfum",
    sizes: sizes(1200, 2000),
    projection: "Moderate",
    description:
      "A crisp white floral with bergamot, neroli, and fig unfolding into a fresh, airy musk. It feels bright and clean, like a cool summer morning in full light.",
    notes: {
      top: ["Bergamot", "Lemon", "Neroli", "Petitgrain"],
      heart: ["Green Fig", "Orange Blossom", "Jasmine"],
      base: ["White Musk", "Cedar", "Ambergris"],
    },
    image: "/Images/Icy-noor/icy-noor-3.jpg",
    featured: true,
  },
  {
    id: "p-06",
    slug: "perfume-tester",
    name: "Perfume Tester",
    family: "Oriental",
    concentration: "Eau de Parfum",
    sizes: [
      { id: "10ml", label: "10 ml", price: 800 },
    ],
    projection: "Subtle",
    description:
      "A sample-size fragrance experience that lets you wear the house before committing to a full bottle. Easy to carry, easy to try, and made for discovering your favourite scent.",
    notes: {
      top: ["Bergamot", "Saffron", "Pink Pepper"],
      heart: ["Damask Rose", "Amber", "Cedar"],
      base: ["Oud", "Vanilla", "Musk"],
    },
    image: "/Images/Perfume-tester/0c7b951f-5463-42de-b41e-bb067b780bc0.jpg",
    featured: false,
  },
];

/* ── Accessors ── */

const PRODUCT_ROUTE_SLUGS: Record<string, string> = {
  yakoot: "yakoot-perfume",
};

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  const catalogSlug = slug === "yakoot-perfume" ? "yakoot" : slug;
  return products.find((p) => p.slug === catalogSlug);
}

export function getProductRouteSlug(slug: string): string {
  return PRODUCT_ROUTE_SLUGS[slug] ?? slug;
}

export function getProductUrl(slug: string): string {
  return `/product/${getProductRouteSlug(slug)}`;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** The size selected by default (the smallest, lowest-priced bottle). */
export function getDefaultSize(product: Product): ProductSize {
  return product.sizes[0]!;
}

export function getSize(product: Product, sizeId: string): ProductSize | undefined {
  return product.sizes.find((size) => size.id === sizeId);
}

/** Prefer products from the same family, then fill with the rest. */
export function getRelatedProducts(current: Product, count = 4): Product[] {
  const sameFamily = products.filter(
    (p) => p.slug !== current.slug && p.family === current.family
  );
  const others = products.filter(
    (p) => p.slug !== current.slug && p.family !== current.family
  );
  return [...sameFamily, ...others].slice(0, count);
}

/** Formats a PKR amount, e.g. 4500 → "Rs. 4,500". */
export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-US")}`;
}