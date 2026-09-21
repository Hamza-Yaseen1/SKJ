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
    // (75 default, 85 hero, 80 product) so they aren't coerced to 75.
    qualities: [50, 75, 80, 85, 100],
  },
  async redirects() {
    return [
      {
        source: "/deals",
        destination: "/perfume-deals",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/all-perfumes",
        permanent: true,
      },
      {
        source: "/product/yakoot",
        destination: "/product/yakoot-perfume",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;