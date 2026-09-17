import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Catalog imagery is served from Unsplash CDN
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;