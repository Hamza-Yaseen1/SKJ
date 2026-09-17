/**
 * SKJ Pure Presence
 * Product catalogue (Day 1 static data layer).
 *
 * Replace this file with a CMS / database fetch when commerce is added;
 * every page reads exclusively through the helpers at the bottom of this file.
 */

export type Family =
  | "Woody"
  | "Floral"
  | "Oriental"
  | "Citrus"
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

/** Unsplash photo — each source requests an optimum width at q=80. */
const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** The two house sizes, priced in PKR. */
const sizes = (half: number, full: number): ProductSize[] => [
  { id: "50ml", label: "50 ml", price: half },
  { id: "100ml", label: "100 ml", price: full },
];

export const products: Product[] = [
  {
    id: "p-01",
    slug: "yaqoot",
    name: "Yaqoot",
    family: "Woody",
    concentration: "Extrait de Parfum",
    sizes: sizes(6500, 11000),
    tag: "Bestseller",
    projection: "Rich",
    description:
      "A ruby held to the light. Smoked cedar and black oud rest over a bruised rose, lit from within by a thread of saffron.",
    notes: {
      top: ["Bergamot", "Saffron", "Pink Pepper"],
      heart: ["Damask Rose", "Labdanum", "Geranium"],
      base: ["Black Oud", "Smoked Cedar", "Vetiver", "Amber"],
    },
    image: img("photo-1773527142301-9aa77252e5c2", 1600),
    featured: true,
  },
  {
    id: "p-02",
    slug: "legend",
    name: "Legend",
    family: "Oriental",
    concentration: "Extrait de Parfum",
    sizes: sizes(7500, 12500),
    tag: "Signature",
    projection: "Rich",
    description:
      "The house signature — molten amber and vanilla wrapped in a cloud of Turkish rose. Legend wears like held light, close and generous at once.",
    notes: {
      top: ["Saffron", "Tangerine", "Orange Blossom"],
      heart: ["Turkish Rose", "Jasmine Sambac", "Cinnamon"],
      base: ["Golden Amber", "Vanilla", "Tonka Bean", "Oud"],
    },
    image: img("photo-1760920248537-c1185bbc5c61", 1600),
    featured: true,
  },
  {
    id: "p-03",
    slug: "white",
    name: "White",
    family: "Floral",
    concentration: "Eau de Parfum",
    sizes: sizes(4500, 7500),
    projection: "Subtle",
    description:
      "Pale, cinematic powder. Iris and heliotrope drift over a skin of white musk — a fragrance that whispers long after the room has gone quiet.",
    notes: {
      top: ["Aldehyde", "Pear", "Pink Pepper"],
      heart: ["Iris", "Heliotrope", "Orange Blossom"],
      base: ["White Musk", "Blonde Woods", "Vetiver"],
    },
    image: img("photo-1774682060910-ba9a26f958ad", 1600),
    featured: true,
  },
  {
    id: "p-04",
    slug: "white-noor",
    name: "White Noor",
    family: "Floral",
    concentration: "Eau de Parfum",
    sizes: sizes(5200, 8800),
    projection: "Moderate",
    description:
      "Light on white marble. Orange blossom and jasmine settle into soft musk and blonde woods — luminous, serene, quietly radiant.",
    notes: {
      top: ["Neroli", "Pear", "Green Mandarin"],
      heart: ["Orange Blossom", "Jasmine Sambac", "Peony"],
      base: ["White Musk", "Blonde Woods", "Ambergris"],
    },
    image: img("photo-1761329842950-f3551938e4da", 1600),
    featured: false,
  },
  {
    id: "p-05",
    slug: "ghazi",
    name: "Ghazi",
    family: "Woody",
    concentration: "Extrait de Parfum",
    sizes: sizes(8500, 14000),
    tag: "New",
    projection: "Rich",
    description:
      "Our most personal composition — oud and smoke over cold earth, softened by davana and black pepper. Not worn. Inhabited.",
    notes: {
      top: ["Black Pepper", "Cardamom", "Incense"],
      heart: ["Oud", "Davana", "Leather"],
      base: ["Patchouli", "Vetiver", "Charred Cedar", "Musk"],
    },
    image: img("photo-1763631403216-8d193008481e", 1600),
    featured: false,
  },
  {
    id: "p-06",
    slug: "shaheen",
    name: "Shaheen",
    family: "Citrus",
    concentration: "Eau de Parfum",
    sizes: sizes(3900, 6500),
    projection: "Moderate",
    description:
      "A cold Mediterranean morning. Bergamot and neroli over sun-warmed fig, drying into a clean white-musk caress that insists on summer.",
    notes: {
      top: ["Bergamot", "Lemon", "Neroli", "Petitgrain"],
      heart: ["Green Fig", "Orange Blossom", "Jasmine"],
      base: ["White Musk", "Cedar", "Ambergris"],
    },
    image: img("photo-1768025719875-48ed072f3084", 1600),
    featured: true,
  },
  {
    id: "p-07",
    slug: "sultan",
    name: "Sultan",
    family: "Gourmand",
    concentration: "Extrait de Parfum",
    sizes: sizes(6900, 11500),
    tag: "Limited",
    projection: "Rich",
    description:
      "The nightcap of the collection. Rum-drenched vanilla orchid and dried fig sit over warm leather and benzoin — dangerously good, impossibly indulgent.",
    notes: {
      top: ["Rum", "Cinnamon", "Cardamom"],
      heart: ["Vanilla Orchid", "Tonka Bean", "Dried Fig"],
      base: ["Benzoin", "Soft Leather", "Prune", "Amber"],
    },
    image: img("photo-1774682060992-46c7e9f2e50b", 1600),
    featured: false,
  },
  {
    id: "p-08",
    slug: "heer",
    name: "Heer",
    family: "Gourmand",
    concentration: "Extrait de Parfum",
    sizes: sizes(5900, 9900),
    projection: "Moderate",
    description:
      "A love letter in amber. Rose, saffron and honeyed amber melt into tonka and soft leather — devoted, warm, and impossible to forget.",
    notes: {
      top: ["Saffron", "Rose", "Pink Pepper"],
      heart: ["Turkish Rose", "Honey", "Jasmine"],
      base: ["Amber", "Tonka Bean", "Soft Leather", "Musk"],
    },
    image: img("photo-1774682060910-ba9a26f958ad", 1600),
    featured: false,
  },
  {
    id: "p-09",
    slug: "chinar",
    name: "Chinar",
    family: "Green",
    concentration: "Eau de Parfum",
    sizes: sizes(3500, 5900),
    projection: "Subtle",
    description:
      "The first green morning of the year. Crushed ivy and galbanum give way to wet tea leaf and lily of the valley — clean, exact, alive.",
    notes: {
      top: ["Green Mandarin", "Ivy", "Galbanum"],
      heart: ["Lily of the Valley", "Tea Leaf", "Basil"],
      base: ["White Musk", "Amberwood", "Wet Earth"],
    },
    image: img("photo-1666621630026-862eea07236c", 1600),
    featured: false,
  },
  {
    id: "p-10",
    slug: "bahadur",
    name: "Bahadur",
    family: "Chypre",
    concentration: "Extrait de Parfum",
    sizes: sizes(6200, 10500),
    projection: "Intimate",
    description:
      "Old-world glamour, re-cut. Aldehydes fall over orris and violet before settling on oakmoss and sandalwood — like cashmere ash and gold dust.",
    notes: {
      top: ["Aldehyde", "Bergamot", "Peach"],
      heart: ["Orris", "Violet", "Rose"],
      base: ["Sandalwood", "Cashmeran", "Oakmoss", "Musk"],
    },
    image: img("photo-1609749282774-5883a366cdd1", 1600),
    featured: false,
  },
];

/* ── Accessors ── */

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
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
