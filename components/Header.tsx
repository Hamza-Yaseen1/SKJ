"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();

  // Close the mobile menu with Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-baseline gap-3 text-cream transition-opacity hover:opacity-75"
          aria-label="SKJ Pure Presence, home"
        >
          <span className="font-serif text-2xl tracking-[0.32em] md:text-[1.7rem]">
            SKJ
          </span>
          <span className="hidden h-px w-8 bg-gold/70 sm:block" aria-hidden="true" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative pb-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out ${
                isActive(link.href)
                  ? "text-cream after:scale-x-100 after:bg-gold-light"
                  : "text-cream/55 after:bg-gold/60 hover:text-cream hover:after:scale-x-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream transition-colors hover:border-gold"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {hydrated && count > 0 && (
              <span
                key={count}
                className="badge-pop absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-medium tracking-wide text-ink"
                aria-hidden="true"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream transition-colors hover:border-gold md:hidden"
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — always mounted, animated while toggling state */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full border-t border-white/10 bg-ink transition-all duration-300 ease-out md:hidden ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-luxe">
          <ul className="divide-y divide-white/10">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="group flex items-baseline gap-5 py-5"
                >
                  <span className="w-7 shrink-0 font-serif text-base italic text-gold/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-serif text-3xl leading-none transition-colors ${
                      isActive(link.href)
                        ? "italic text-gold-light"
                        : "text-cream group-hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto h-px flex-1 self-center bg-white/15"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}