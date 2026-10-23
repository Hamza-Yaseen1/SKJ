import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "The Collection", href: "/all-perfumes" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/skjpurepresence",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6v2H6.7v3.2h2.8V21h3.9Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/skjpurepresence",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@skjpurepresence",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M19.6 8.1a7.2 7.2 0 0 1-4.3-1.4v7.1a5.5 5.5 0 1 1-4.7-5.4v3.7a1.9 1.9 0 1 0 1.1 1.7V2.5h3.6c.2 2.2 1.8 3.9 4.3 4.1v1.5Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:atelier@skjpurepresence.com",
    icon: <Mail size={18} strokeWidth={1.5} aria-hidden="true" />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-cream">
      <div className="container-luxe pb-14 pt-24 md:pb-16 md:pt-32">
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <p className="font-serif text-3xl tracking-[0.24em] md:text-4xl">
              SKJ
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-gold/80">
              Pure Presence · est. 2026
            </p>
            <p className="mt-8 max-w-sm text-[15px] leading-8 text-cream/60">
              Rare, high-concentration fragrances composed in Pakistan for those
              who wear presence. Witness, not noise.
            </p>
            <div className="mt-10 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("https://") ? "_blank" : undefined}
                  rel={social.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-cream/70 transition-colors hover:border-gold-light hover:text-gold-light"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="eyebrow mb-7">Explore</p>
            <ul className="space-y-5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-[15px] text-cream/70 transition-colors hover:text-gold-light"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-4 bg-gold/50 transition-all duration-300 group-hover:w-6 group-hover:bg-gold-light"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier */}
          <div>
            <p className="eyebrow mb-7">The Atelier</p>
            <div className="space-y-5 text-[15px] leading-8 text-cream/70">
              <p className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.25} className="mt-1.5 shrink-0 text-gold/70" />
                <span>
                  SKJ House
                  <br />
                  48 Gulberg Avenue
                  <br />
                  Karachi, Pakistan
                </span>
              </p>
              <a
                href="mailto:atelier@skjpurepresence.com"
                className="inline-flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold/50" />
                atelier@skjpurepresence.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-9 md:mt-24 md:flex-row">
          <p className="text-[11px] uppercase tracking-[0.14em] text-stone">
            © {new Date().getFullYear()} SKJ Pure Presence. All rights reserved.
          </p>
          <p className="font-serif text-[15px] italic text-cream/60">
            Composed in Pakistan. Worn everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}