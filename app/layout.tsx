import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { CartProvider } from "@/components/providers/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "SKJ Pure Presence",
    template: "%s · SKJ",
  },
  description:
    "SKJ Pure Presence composes rare, high-concentration fragrances for those who wear presence. Discover the collection — woody, floral, oriental and beyond.",
  keywords: [
    "luxury perfume",
    "niche fragrance",
    "extrait de parfum",
    "SKJ Pure Presence",
    "maison de parfum",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "SKJ Pure Presence",
      title: "SKJ Pure Presence",
    description:
      "Rare, high-concentration fragrances composed in Grasse for those who wear presence.",
  },
  twitter: {
    card: "summary_large_image",
      title: "SKJ Pure Presence",
    description:
      "Rare, high-concentration fragrances composed in Grasse for those who wear presence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${geist.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col bg-cream font-sans text-ink antialiased">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}