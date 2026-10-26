import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/**
 * Generates /robots.txt.
 *
 * - `User-agent: *` applies to Googlebot, Bingbot and every other compliant crawler.
 * - API, admin, private, cart, checkout, order-confirmation and search routes are
 *   never useful in search results and are excluded from crawling.
 * - `/_next/` is intentionally NOT disallowed: it serves the CSS and JavaScript
 *   Googlebot needs to render pages. Blocking it would hurt SEO.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        // No trailing slash: covers both /cart and /cart/* (Next serves /cart).
        "/admin",
        "/private",
        // "/_next/", // Do not enable: blocks CSS/JS required for rendering.
        "/cart",
        "/checkout",
        "/order-confirmation",
        "/search",
      ],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
