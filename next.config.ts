import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Catalog imagery is served from Unsplash CDN
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Performance: serve AVIF/WebP and cache optimized images for 31 days.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    // Silence dev warnings and allow the qualities used in the codebase
    // (70 checkout, 75 cart, 80 cards, 82 hero, 85 product/deals) so they
    // aren't coerced to 75.
    qualities: [50, 70, 75, 80, 82, 85, 100],
  },
  async redirects() {
    return [
      {
        source: "/perfume-deals",
        destination: "/deals",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/all-perfumes",
        permanent: true,
      },
      {
        source: "/product/yakoot-perfume",
        destination: "/product/yakoot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;