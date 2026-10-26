import type { MetadataRoute } from "next";
import { getAllProducts, getProductUrl } from "@/lib/products";
import { siteConfig } from "@/lib/config";

/**
 * Generates /sitemap.xml.
 *
 * `lastModified` values reflect the last real content commit for each route
 * (git log), not the build time — a sitemap that changes on every deploy trains
 * crawlers to ignore `<lastmod>`.
 */
const LAST_MODIFIED = {
  home: new Date("2026-09-22"),
  collection: new Date("2026-10-23"),
  deals: new Date("2026-09-22"),
  about: new Date("2026-10-23"),
  contact: new Date("2026-10-23"),
  products: new Date("2026-09-22"),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteConfig.siteUrl;
  const absolute = (path: string) => `${site}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: site,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absolute("/all-perfumes"),
      lastModified: LAST_MODIFIED.collection,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absolute("/deals"),
      lastModified: LAST_MODIFIED.deals,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: absolute("/about"),
      lastModified: LAST_MODIFIED.about,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absolute("/contact"),
      lastModified: LAST_MODIFIED.contact,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map(
    (product) => ({
      url: absolute(getProductUrl(product.slug)),
      lastModified: LAST_MODIFIED.products,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absolute(product.image)],
    })
  );

  return [...staticRoutes, ...productRoutes];
}
