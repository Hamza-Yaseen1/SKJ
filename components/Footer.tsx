import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "The Collection", href: "/all-perfumes" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  // TODO: add the real Instagram / Pinterest profile URLs once the brand
  // accounts exist. Generic homepage URLs were removed so the footer never
  // links visitors to a placeholder page.
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