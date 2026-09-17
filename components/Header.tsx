"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-baseline gap-2 text-cream transition-opacity hover:opacity-75"
          aria-label="AETHER — Maison de Parfum, home"
        >
          <span className="font-serif text-2xl tracking-[0.32em] md:text-[1.7rem] text-cream">
            AETHER
          </span>
          <span className="hidden h-px w-8 bg-gold/70 sm:block" aria-hidden="true" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b pb-1 text-[11px] uppercase tracking-[0.24em] transition-colors text-mist-50 ${
                isActive(link.href)
                  ? "border-gold-light text-cream"
                  : "border-transparent text-cream/55 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Shopping bag — coming soon"
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream transition-colors hover:border-gold"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold-light opacity-0 transition-opacity group-hover:opacity-100"
            />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream transition-colors hover:border-gold md:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-white/10 bg-ink/95 px-6 py-6 backdrop-blur-md md:hidden"
        >
          <ul className="space-y-5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between font-serif text-2xl tracking-wide ${
                    isActive(link.href) ? "text-gold-light italic" : "text-cream"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/30"
                  >
                    {link.href === "/" ? "Index" : link.href.slice(1)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}