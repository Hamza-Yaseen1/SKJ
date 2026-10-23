"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const announcements = [
  {
    id: "advance-payment",
    message: "Pay in advance and save Rs. 100 on delivery",
  },
  {
    id: "free-shipping",
    message: "Complimentary delivery on orders over Rs. 5,000",
  },
  {
    id: "new-collection",
    message: "Discover the new fragrance collection",
    href: "/all-perfumes",
  },
  {
    id: "signature-scent",
    message: "Find the fragrance that feels like you",
    href: "/all-perfumes",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/skjpurepresence",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
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
        className="size-[18px]"
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
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M19.6 8.1a7.2 7.2 0 0 1-4.3-1.4v7.1a5.5 5.5 0 1 1-4.7-5.4v3.7a1.9 1.9 0 1 0 1.1 1.7V2.5h3.6c.2 2.2 1.8 3.9 4.3 4.1v1.5Z" />
      </svg>
    ),
  },
];

export function AnnouncementBar() {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [api, paused]);

  return (
    <div className="w-full border-b border-gold/25 bg-ink text-cream">
      <div className="mx-auto grid min-h-16 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:gap-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="SKJ Pure Presence home"
          className="flex min-h-11 items-center gap-2 rounded-full transition-opacity hover:opacity-80"
        >
          <Image
            src="/Images/skjpurepresences_profile_picture.jpg"
            alt=""
            width={1080}
            height={1080}
            className="size-9 rounded-full border border-gold/50 object-cover sm:size-10"
          />
          <span className="hidden font-serif text-[10px] uppercase leading-tight tracking-[0.18em] text-cream/80 sm:block">
            SKJ
            <span className="mt-0.5 block font-sans text-[8px] tracking-[0.14em] text-gold-light">
              Pure Presence
            </span>
          </span>
        </Link>

        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          aria-label="Store announcements"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
          className="mx-auto w-full max-w-3xl"
        >
          <CarouselContent>
            {announcements.map((announcement) => (
              <CarouselItem
                key={announcement.id}
                className="flex min-h-16 items-center justify-center px-10 text-center sm:px-12"
              >
                <p className="font-sans text-[9px] font-medium uppercase leading-relaxed tracking-[0.1em] text-cream/85 sm:text-[11px] sm:tracking-[0.16em]">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block size-1.5 rounded-full bg-gold-light align-middle"
                  />
                  {announcement.href ? (
                    <Link
                      href={announcement.href}
                      className="decoration-gold/70 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
                    >
                      {announcement.message}
                    </Link>
                  ) : (
                    announcement.message
                  )}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Previous announcement"
            variant="ghost"
            size="icon-lg"
            className="left-0 min-h-11 min-w-11 rounded-full text-cream/70 hover:bg-white/10 hover:text-gold-light"
          />
          <CarouselNext
            aria-label="Next announcement"
            variant="ghost"
            size="icon-lg"
            className="right-0 min-h-11 min-w-11 rounded-full text-cream/70 hover:bg-white/10 hover:text-gold-light"
          />
        </Carousel>

        <nav aria-label="Social media" className="hidden items-center gap-1 lg:flex">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit SKJ Pure Presence on ${social.label}`}
              className="flex size-11 items-center justify-center rounded-full text-cream/65 transition-colors hover:bg-white/5 hover:text-gold-light focus-visible:text-gold-light"
            >
              {social.icon}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
