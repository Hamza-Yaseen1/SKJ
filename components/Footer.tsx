import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "The Collection", href: "/shop" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.5 20.5c.5-2 .9-4.2 1.2-6M10.3 14.6c.3-1.2 1.4-2 2.5-2 1.9 0 3.2 1.5 3.2 3.4 0 2.3-1.5 4.2-3.8 4.2-1.4 0-2.4-.9-2.4-2.2 0-.4.1-.8.3-1.2" />
        <path d="M9.5 14c-.5-1.9.3-4.6 2.1-5.6 1.5-.8 3.6-.5 4 1.2.4 1.6-.2 4.3-1 6.3" />
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
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 text-cream/70 transition-colors hover:border-gold-light hover:text-gold-light"
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