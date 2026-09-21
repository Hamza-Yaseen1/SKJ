"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/** Shared luxury easing — gentle deceleration, no bounce. */
const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

/** Time each fragrance stays on screen before it fades to the next. */
const SLIDE_MS = 5000;

interface HeroSlide {
  image: string;
  name: string;
}

interface HeroProps {
  slides: HeroSlide[];
  count: number;
}

/**
 * Editorial hero with a full-bleed, auto-advancing carousel of every
 * fragrance behind the copy. Slides crossfade with a slow, cinematic
 * settle; all movement is disabled under prefers-reduced-motion.
 */
export default function Hero({ slides, count }: HeroProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, slides.length]);

  const active = slides[index];
  const travel = reduce ? 0 : 28;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: travel },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-ink">
      {/* ── Background carousel ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: reduce ? 1 : 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduce ? 0 : 6, ease: EASE }}
              className="h-full w-full"
            >
              <Image
                src={active.image}
                alt=""
                fill
                sizes="100vw"
                quality={82}
                priority={index === 0}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scrims for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
      </div>

      {/* Faint oversized wordmark for depth */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-4 select-none font-serif text-[28vw] italic leading-none text-cream/[0.04] lg:text-[22rem]"
      >
        SKJ
      </span>

      {/* ── Copy ── */}
      <div className="container-luxe relative z-10 w-full py-24 md:py-28">
        <motion.p {...fade(0)} className="eyebrow eyebrow-on-dark mb-8">
          Pure Presence · Pakistan · Est. 2026
        </motion.p>
        <motion.h1
          {...fade(0.12)}
          className="max-w-4xl font-serif text-[3.25rem] leading-[0.98] text-cream sm:text-7xl lg:text-[6.25rem]"
        >
          The best
          <br />
          <em className="italic text-gold-light">
            perfume in Pakistan.
          </em>
        </motion.h1>
        <motion.p
          {...fade(0.24)}
          className="mt-8 max-w-xl text-base leading-8 text-cream/75 md:text-lg"
        >
          SKJ Pure Presence composes rare, long-lasting extraits de parfum —
          18&ndash;25% parfum — hand-filled in Karachi. A luxury perfume in
          Pakistan that projects all evening, and
          starts at Rs. 1,200.
        </motion.p>

        <motion.div
          {...fade(0.36)}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
        >
          <Link href="/all-perfumes" className="btn btn-gold">
            Discover the collection
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link href="/about" className="text-link text-link-light text-cream">
            Our philosophy
          </Link>
        </motion.div>

        {/* Mini index */}
        <motion.dl
          {...fade(0.5)}
          className="mt-16 flex max-w-2xl flex-wrap gap-x-12 gap-y-6 border-t border-cream/15 pt-8"
        >
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-cream/45">
              Origins
            </dt>
            <dd className="mt-1.5 font-serif text-base italic text-cream/85">
              Pakistan
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-cream/45">
              Compositions
            </dt>
            <dd className="mt-1.5 font-serif text-base italic text-cream/85">
              {count} extraits
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-cream/45">
              Concentration
            </dt>
            <dd className="mt-1.5 font-serif text-base italic text-cream/85">
              18–25% parfum
            </dd>
          </div>
        </motion.dl>

        {/* Active fragrance marker */}
        <motion.p
          {...fade(0.6)}
          className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-cream/50"
        >
          <span aria-hidden="true" className="h-px w-8 bg-gold/50" />
          {active.name} — {String(index + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </motion.p>
      </div>

      {/* ── Carousel progress ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 hidden md:block">
        <div className="container-luxe flex items-center justify-end gap-2 pb-10">
          {slides.map((slide, i) => (
            <span
              key={slide.image}
              className={`h-px transition-all duration-500 ${
                i === index ? "w-12 bg-gold-light" : "w-4 bg-cream/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}