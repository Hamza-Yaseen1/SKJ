import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductPurchase from "@/components/ProductPurchase";
import Reveal from "@/components/Reveal";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getProductRouteSlug,
  getProductUrl,
} from "@/lib/products";
import { siteConfig } from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every known fragrance at build time. */
export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: getProductRouteSlug(product.slug),
  }));
}

/** Anything outside the catalogue is a 404. */
export const dynamicParams = false;

/** Keep a meta description within Google's 150–160 char window. */
function truncate(text: string, max = 128): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Fragrance",
      description: "An SKJ Pure Presence fragrance, composed in Pakistan.",
      robots: { index: false },
    };
  }

  const title = `${product.name} ${product.concentration} | SKJ Pakistan`;
  const prices = product.sizes.map((s) => s.price);
  const priceRange = `${Math.min(...prices) ?? 0}–${
    Math.max(...prices) ?? 0
  } PKR`;
  const longevity =
    product.projection === "Rich" || product.projection === "Moderate"
      ? "long lasting perfume in Pakistan"
      : "serene, close-worn perfume in Pakistan";
  const description = `${product.name} — ${truncate(
    product.description,
    110
  )} ${product.concentration}, ${product.projection.toLowerCase()} wear, ${longevity}, priced ${priceRange} and composed by hand in Karachi.`;
  const url = getProductUrl(product.slug);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "SKJ Pure Presence",
      title,
      description,
      images: [
        {
          url: `${siteConfig.siteUrl}${product.image}`,
          alt: `${product.name} flacon — ${product.family} extrait de parfum`,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const site = siteConfig.siteUrl;
  const pageUrl = `${site}${getProductUrl(product.slug)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: product.name,
        brand: { "@type": "Brand", name: "SKJ Pure Presence" },
        sku: product.id,
        image: [`${site}${product.image}`],
        description: `${product.description} ${product.concentration}, composed in Pakistan.`,
        category: product.family,
        offers: product.sizes.map((size) => ({
          "@type": "Offer",
          name: `${product.name} — ${size.label}`,
          price: size.price,
          priceCurrency: "PKR",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          url: pageUrl,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          {
            "@type": "ListItem",
            position: 2,
            name: "Collection",
            item: `${site}/all-perfumes`,
          },
          { "@type": "ListItem", position: 3, name: product.name, item: pageUrl },
        ],
      },
    ],
  };

  const related = getRelatedProducts(product);
  const layers: Array<{ key: "top" | "heart" | "base"; label: string; note: string }> = [
    { key: "top", label: "Top notes", note: "The greeting" },
    { key: "heart", label: "Heart notes", note: "The character" },
    { key: "base", label: "Base notes", note: "The memory" },
  ];
  const productStories: Record<string, string[]> = {
    yakoot: [
      "Yaqoot opens with a warm, polished radiance: saffron and pink pepper lend a soft glow, while bergamot keeps the first impression fresh and lifted. It feels immediately elegant without trying too hard, like a jewel brought close to the skin.",
      "The heart deepens around damask rose, labdanum, and geranium, creating a velvet-smoke blend that is floral but never airy. This is where the perfume becomes more intimate and more personal, with rose held in a richer, darker register than usual.",
      "The dry down is where Yaqoot settles into its signature character. Black oud, cedar, vetiver, and amber leave a beautifully textured trail that feels luxurious, grounded, and unmistakably warm. It is ideal for evening wear, cooler seasons, and occasions when you want a fragrance that feels composed and quietly bold.",
      "Apply it to pulse points such as the wrists, neck, and chest, and let it warm naturally on the skin. Yaqoot is a compelling choice for someone who loves rich oud perfumes with softness, romance, and a mature, elegant finish."
    ],
    ghazi: [
      "Ghazi begins with black pepper, cardamom, and incense, creating a cool, smoky opening that feels assured rather than aggressive. The first impression is dark and textured, with a dry spice that gives the fragrance a quietly commanding presence.",
      "At the heart, oud, davana, and leather create a worn-in warmth that feels intimate and grounded. Davana softens the darker materials with a subtle herbal sweetness, while leather gives the composition its distinctive edge and depth.",
      "The base settles into patchouli, vetiver, charred cedar, and musk, leaving a dry, earthy trail that develops beautifully over several hours. Ghazi is especially suited to evening wear, cooler weather, and moments when you want a fragrance that feels personal, composed, and enduring.",
      "Apply Ghazi lightly to the wrists, neck, or chest and allow the warmth of the skin to reveal its layers. It is a strong choice for anyone drawn to oud, smoke, and leather, but who still wants a fragrance with balance, softness, and a refined finish.",
    ],
    legend: [
      "Legend is the house signature in a luminous, warm register: saffron, tangerine, and orange blossom create an immediate feeling of richness and brightness. It opens with a golden clarity that feels both inviting and memorable, like a generous welcome rather than a sudden statement.",
      "At its heart, Turkish rose, jasmine sambac, and cinnamon deepen the composition without making it heavy. The floral layers are lush and elegant, while the spice keeps the perfume alive and beautifully dimensional. This balance gives Legend its graceful, polished character.",
      "The base settles into amber, vanilla, tonka bean, and oud, creating a smooth and enveloping finish that lingers close and beautifully. It is a fragrance that feels both luxurious and approachable, suitable for dinners, celebrations, and evenings when you want to leave a lasting impression without overpowering the room.",
      "Wear Legend on warm skin at the wrist, behind the ears, and along the collarbone for a soft but enduring trail. It is an excellent choice for anyone who loves a rich floral-oriental perfume that feels romantic, memorable, and quietly grand."
    ],
    "white-noor": [
      "White Noor begins with neroli, pear, and green mandarin, creating a crisp and polished opening that feels bright, clean, and airy. The effect is fresh and luminous rather than sweet, which keeps the fragrance elegant from the very first spray.",
      "The heart opens into orange blossom, jasmine sambac, and peony, adding softness and a delicate floral brightness. This is where White Noor becomes more graceful and refined, with the florals speaking in a smooth, airy way rather than a loud or powdery one.",
      "The dry down settles into white musk, blonde woods, and ambergris, giving the perfume a soft, skin-close finish that feels quietly radiant. It is a beautiful choice for daytime wear, spring and summer evenings, and situations where you want something polished but fresh without being overpowering.",
      "Apply White Noor to the wrists, neck, and inner elbows, or on clothing for a more subtle, lingering effect. It suits someone who prefers clean, luminous florals with a modern edge and a soft, graceful trail that feels sophisticated and easy to wear."
    ],
    "icy-noor": [
      "Icy Noor opens with bergamot, lemon, neroli, and petitgrain, creating an immediate burst of freshness that feels cool, crisp, and uplifting. The top notes carry a clean, almost Mediterranean brightness, setting the tone for a fragrance that is both airy and polished.",
      "The heart introduces green fig, orange blossom, and jasmine, which gives the perfume a soft floral lift without losing its lightness. This middle phase is where Icy Noor becomes more fluid and elegant, balancing fruit and florals with a cool, refreshing finish.",
      "As it settles, white musk, cedar, and ambergris give the composition a clean, smooth base that feels refined and long-wearing yet never heavy. It is a fragrance that feels especially comfortable in warm weather, daytime settings, and relaxed summer occasions when you want to smell fresh, polished, and effortlessly present.",
      "Apply Icy Noor to pulse points or lightly on clothing for an airy, clean trail. It is an ideal choice for anyone who enjoys crisp white florals and luminous citrus notes with a modern, skin-like finish that feels invigorating and quietly elegant."
    ],
    "perfume-tester": [
      "The Perfume Tester is a practical way to experience the house before committing to a full bottle. It is designed for those who want to wear the fragrance over a few days, understand how it evolves on their skin, and decide whether the character suits their mood and routine.",
      "This sample-size format carries the same rich impression as the house signature, beginning with bergamot, saffron, and pink pepper before settling into a warm, elegant heart of damask rose, amber, and cedar. The effect is immediate without feeling abrupt, creating an opening that feels sophisticated and softly radiant.",
      "As the composition dries down, oud, vanilla, and musk add depth and softness, leaving a smooth, intimate trail that feels rich but not heavy. It is especially useful for travel, gifting, or testing a scent you are unsure about before investing in a larger bottle.",
      "Use the Perfume Tester on pulse points and revisit it through the day to see how it settles on your skin. It is a wise choice for anyone who wants to explore the collection carefully and pick a fragrance that feels personal, wearable, and beautifully composed."
    ],
  };
  const story = productStories[product.slug] ?? [product.description];
  return (
    <>
      {/* ── Structured data: Product + Breadcrumb ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Breadcrumb ── */}
      <nav
        aria-label="Breadcrumb"
        className="container-luxe border-b border-ink/10 py-5"
      >
        <ol className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-stone">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-stone/50">
            /
          </li>
          <li>
            <Link href="/all-perfumes" className="transition-colors hover:text-ink">
              Collection
            </Link>
          </li>
          <li aria-hidden="true" className="text-stone/50">
            /
          </li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      {/* ── Product hero ── */}
      <section className="bg-cream">
        <div className="container-luxe grid gap-14 py-14 md:grid-cols-2 md:gap-20 md:py-20">
          {/* Image */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/25 md:block"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-sand">
              <Image
                src={product.image}
                alt={`${product.name} flacon — ${product.family} extrait de parfum`}
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                quality={85}
                className="object-cover"
              />
              {product.tag && (
                <span
                  className={`absolute left-5 top-5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] ${
                    product.tag === "Signature"
                      ? "bg-gold text-ink"
                      : "bg-ink/80 text-cream"
                  }`}
                >
                  {product.tag}
                </span>
              )}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-stone">
                <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
                Composed in Pakistan
              </p>
              <p className="font-serif text-sm italic text-bark">
                {product.family} extrait
              </p>
            </div>
          </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.12}>
            <ProductPurchase product={product} />
          </Reveal>
        </div>
      </section>

      {/* ── Notes ── */}
      <section className="border-t border-ink/10 bg-ivory">
        <div className="container-luxe py-20 md:py-28">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5">The composition</p>
                <h2 className="max-w-md font-serif text-3xl text-ink md:text-4xl">
                  How <em className="italic text-gold">{product.name}</em> unfolds
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-bark">
                Each ingredient is chosen for what it surrenders on the skin —
                and what it keeps for the hours after.
              </p>
            </div>
          </Reveal>

          {/* Composition movements — an editorial table, not three cards */}
          <Reveal delay={0.1}>
            <ol className="mt-16">
            {layers.map((layer, i) => (
              <li
                key={layer.key}
                className="grid gap-7 border-t border-ink/10 py-10 md:grid-cols-[11rem_1fr] md:gap-12"
              >
                <div>
                  <p className="font-serif text-4xl leading-none italic text-gold/70">
                    0{i + 1}
                  </p>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-ink">
                    {layer.label}
                  </p>
                  <p className="mt-1.5 text-sm italic leading-6 text-bark">
                    {layer.note}
                  </p>
                </div>
                <div className="md:pt-1">
                  <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-3">
                    {product.notes[layer.key].map((note, j) => (
                      <li key={note} className="flex items-baseline gap-4">
                        {j > 0 && (
                          <span
                            aria-hidden="true"
                            className="text-xs text-gold/60"
                          >
                            ✦
                          </span>
                        )}
                        <span className="font-serif text-xl leading-snug text-ink md:text-2xl">
                          {note}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          </Reveal>

          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <span aria-hidden="true" className="h-px w-10 bg-gold/40" />
            <p className="max-w-md font-serif text-lg italic text-bark md:text-xl">
              Worn in three movements — the greeting, the character, the memory.
            </p>
          </div>

          <div className="mt-16 max-w-4xl text-base leading-8 text-bark">
            {story.map((paragraph) => (
              <p key={paragraph} className="mt-6 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="bg-cream">
        <div className="container-luxe py-20 md:py-28">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5">Continue the composition</p>
                <h2 className="font-serif text-3xl text-ink md:text-4xl">
                  Scent <em className="italic text-gold">in dialogue</em>
                </h2>
              </div>
              <Link href="/all-perfumes" className="text-link">
                View all fragrances
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}