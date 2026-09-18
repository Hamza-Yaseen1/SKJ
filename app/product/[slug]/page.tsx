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
} from "@/lib/products";
import { siteConfig } from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every known fragrance at build time. */
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
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
  const description = `${product.name}: ${truncate(product.description, 120)} Composed in Pakistan.`;
  const url = `/product/${slug}`;

  return {
    title,
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
  const pageUrl = `${site}/product/${product.slug}`;
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
            item: `${site}/shop`,
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
            <Link href="/shop" className="transition-colors hover:text-ink">
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
              <Link href="/shop" className="text-link">
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