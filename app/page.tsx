import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products";
import { activeDeal } from "@/lib/deals";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    absolute: "SKJ Pure Presence | Best Perfume in Karachi, Pakistan",
  },
  description:
    "SKJ Pure Presence composes hand-filled extraits de parfum in Pakistan. Refillable, cruelty-free, 18–25% parfum. Discover the best perfume in Karachi.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SKJ Pure Presence",
    title: "SKJ Pure Presence | Best Perfume in Karachi, Pakistan",
    description:
      "Hand-filled extraits de parfum composed in Pakistan — refillable, cruelty-free, 18–25% parfum.",
  },
};

const MARQUEE_WORDS = [
  "Pakistan",
  "Extrait de parfum",
  "Hand-composed",
  "Exclusive",
  "Small batch",
  "Refillable flacon",
];

const PRACTICES: Array<[string, string]> = [
  ["Hand-filled", "Every flacon poured and signed by hand"],
  ["Refillable", "Keep the bottle, replenish the essence"],
  ["Cruelty-free", "Responsible sourcing, always"],
];

const FAQ_QUESTIONS: Array<{ q: string; a: string }> = [
  {
    q: "Where to buy SKJ Pure Presence in Karachi?",
    a: "Directly on this website, with complimentary shipping across Karachi — Clifton, DHA, Zamzama and Gulberg included. The atelier in Karachi also welcomes visits by appointment, Thursday to Saturday. For guidance before you buy, write to atelier@skjpurepresence.com.",
  },
  {
    q: "Is SKJ perfume better than j. perfumes?",
    a: "Better is a matter of taste; the difference is measurable. J. Perfumes is a reliable, affordable eau de parfum house. SKJ is a small-batch extraction house — 18–25% parfum concentration, hand-filled in Karachi, refillable and cruelty-free. If longevity and intensity matter most, SKJ is designed for them.",
  },
  {
    q: "What is the price of SKJ extrait de parfum in Pakistan?",
    a: "The 30 ml extrait is Rs. 1,200 and the 50 ml flacon is Rs. 2,000. A 10 ml tester costs Rs. 800. All prices are in PKR, shipping is complimentary, and no payment is taken online — the atelier confirms every order by email.",
  },
  {
    q: "Which is the best luxury perfume for men in Pakistan?",
    a: "Ghazi — oud, smoke and leather — for the worn-in hour; Yaqoot — smoked cedar, black oud and saffron — for the evening; Legend — molten amber and Turkish rose — for nights worth gifting. All three are 18–25% extrait de parfum, hand-filled in Karachi and balanced for long days.",
  },
  {
    q: "Is SKJ refillable perfume available in Pakistan?",
    a: "Yes. Every 30 ml and 50 ml flacon is refillable — the crystal and enamel are made to be kept, and refills are available at a reduced price with complimentary shipping across the country.",
  },
  {
    q: "How long does SKJ extrait de parfum last?",
    a: "Expect 8–12 hours on skin and several days on fabric. At 18–25% parfum concentration, SKJ extraits sit close and release slowly. Longevity also depends on skin chemistry — Ghazi and Yaqoot are the house's most persistent compositions.",
  },
  {
    q: "What is the difference between SKJ and Lattafa?",
    a: "Both respect the richness of Middle Eastern perfumery. Lattafa produces at scale and sells widely at eau de parfum strength — an excellent gateway. SKJ works in small batches at extrait concentration: hand-filled, refillable and cruelty-free. Lattafa opened the door; SKJ is the quieter room beyond it.",
  },
  {
    q: "Does SKJ ship across Pakistan?",
    a: "Yes. SKJ ships to Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and Quetta, with complimentary delivery. Orders are hand-filled within three working days and confirmed by email with tracking.",
  },
];

const PLACEHOLDER_YAKOOT = "/Images/yakoot/yakoot2.jpg";
const PLACEHOLDER_LEGEND =
  "/Images/Legend/abf7e7fb-d55f-4773-a333-cd379ac3fddc.jpg";
const PLACEHOLDER_TESTER =
  "/Images/Perfume-tester/0c7b951f-5463-42de-b41e-bb067b780bc0.jpg";
const PLACEHOLDER_GHAZI = "/Images/ghazi/ghazi.jpg";
const PLACEHOLDER_WHITE_NOOR = "/Images/White-noor/white-noor2.jpg";

interface EditorialBlockProps {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  /** Flip the image to the left of the text on desktop. */
  flip?: boolean;
  action?: { href: string; label: string };
  children: ReactNode;
}

/**
 * Two-column editorial block — image opposite the copy, alternate sides on
 * desktop, image-first on mobile. Images are placeholders until the real
 * atelier photography lands.
 */
function EditorialBlock({
  eyebrow,
  title,
  image,
  alt,
  flip = false,
  action,
  children,
}: EditorialBlockProps) {
  return (
    <Reveal>
      <div className="grid gap-10 border-t border-ink/10 py-12 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-16">
        {/* Text */}
        <div className={`order-2 ${flip ? "md:order-2" : "md:order-1"}`}>
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="mt-5 font-serif text-2xl text-ink md:text-3xl">
            {title}
          </h3>
          <div className="mt-6 max-w-xl text-base leading-8 text-bark">
            {children}
          </div>
          {action && (
            <Link href={action.href} className="text-link mt-7">
              {action.label}
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Image — placeholder until real photography is supplied */}
        <div
          className={`order-1 relative aspect-4/5 overflow-hidden bg-sand ${
            flip ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
            quality={82}
            className="img-zoom object-cover"
          />
        </div>
      </div>
    </Reveal>
  );
}

export default function Home() {
  const featured = getFeaturedProducts();
  const lead = featured.find((product) => product.tag === "Signature") ?? featured[0]!;
  const rest = featured.filter((product) => product.id !== lead.id);

  const philosophyImage = getProductBySlug("white-noor")?.image ?? lead.image;

  const site = siteConfig.siteUrl;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: "SKJ Pure Presence",
        url: site,
        logo: `${site}/icon.svg`,
        email: "atelier@skjpurepresence.com",
        slogan: "The quietest form of power",
        foundingDate: "2026",
        address: {
          "@type": "PostalAddress",
          streetAddress: "SKJ House, 48 Gulberg Avenue",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          postalCode: "74200",
          addressCountry: "PK",
        },
        sameAs: ["https://www.instagram.com", "https://www.pinterest.com"],
      },
      {
        "@type": "Store",
        "@id": `${site}/#store`,
        name: "SKJ Pure Presence",
        url: site,
        image: `${site}/icon.svg`,
        email: "atelier@skjpurepresence.com",
        priceRange: "Rs. 800 – Rs. 2,000",
        currenciesAccepted: "PKR",
        areaServed: ["Pakistan", "Karachi"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "SKJ House, 48 Gulberg Avenue",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          postalCode: "74200",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 24.8607,
          longitude: 67.0011,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Thursday", "Friday", "Saturday"],
            opens: "12:00",
            closes: "19:00",
          },
        ],
        parentOrganization: { "@id": `${site}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: "SKJ Pure Presence",
        inLanguage: "en",
        publisher: { "@id": `${site}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site}/#faq`,
        mainEntity: FAQ_QUESTIONS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        slides={getAllProducts().map((product) => ({
          image: product.image,
          name: product.name,
        }))}
        count={getAllProducts().length}
      />

      {/* ── Marquee ── */}
      <div
        className="overflow-hidden border-y border-gold/25 bg-charcoal py-4"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max items-center">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-gold/60"
            >
              {word}
              <span className="text-gold/25">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Deal of the week banner ── */}
      {activeDeal && (
        <Reveal y={16}>
          <section
            aria-label="Deal of the week"
            className="border-b border-gold/25 bg-charcoal"
          >
            <div className="container-luxe flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-8">
              <div className="flex items-center gap-6">
                <span
                  aria-hidden="true"
                  className="hidden h-12 w-px bg-gold/40 sm:block"
                />
                <div>
                  <p className="eyebrow eyebrow-on-dark">Deal of the week</p>
                  <p className="mt-2 font-serif text-2xl text-cream md:text-3xl">
                    {activeDeal.title}
                  </p>
                </div>
              </div>
              <Link href="/perfume-deals" className="text-link text-link-light text-cream">
                View the deal
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Featured collection ── */}
      <section className="bg-cream">
        <div className="container-luxe py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div className="max-w-md">
                <p className="eyebrow mb-6">The edit</p>
                <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
                  Four signatures.
                  <br />
                  <em className="italic text-gold">One language.</em>
                </h2>
                <p className="mt-6 text-sm leading-7 text-bark">
                  The atelier&rsquo;s introduction — four extraits chosen for the
                  way they speak to one another, distilled from a wider
                  vocabulary of six.
                </p>
              </div>
              <Link href="/all-perfumes" className="text-link">
                View all {getAllProducts().length} fragrances
                <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Editorial layout — lead signature on the left, rest stacked right */}
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7">
              <Reveal delay={0.05}>
                <ProductCard product={lead} />
              </Reveal>
            </div>
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 md:col-span-5 md:pt-24">
              {rest.map((product, i) => (
                <Reveal key={product.id} delay={0.1 + i * 0.08}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy / The House ── */}
      <section className="bg-sand">
        <div className="container-luxe grid items-center gap-16 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-36">
          <Reveal className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full border border-gold/30 md:block"
            />
            <div className="relative aspect-4/5 overflow-hidden bg-charcoal">
              <Image
                src={philosophyImage}
                alt="An SKJ flacon resting in soft morning light"
                fill
                sizes="(max-width: 768px) 100vw, 44vw"
                quality={80}
                className="img-zoom object-cover"
              />
            </div>
            <p className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-bark">
              <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
              Composed in Pakistan
            </p>
          </Reveal>

          <Reveal delay={0.12} className="md:pl-4">
            <p className="eyebrow mb-8">The house</p>
            <blockquote className="font-serif text-2xl leading-[1.3] text-ink md:text-4xl md:leading-[1.15]">
              <span
                aria-hidden="true"
                className="mb-3 block font-serif text-6xl leading-[0.7] text-gold"
              >
                &ldquo;
              </span>
              A fragrance is the only accessory you truly never take off —
              <em className="text-gold">
                and the first thing anyone remembers.
              </em>
              &rdquo;
            </blockquote>
            <p className="mt-8 max-w-md text-base leading-8 text-bark">
              We blend rare materials in small batches, at high concentration,
              and in silence — the way an atelier should. Six compositions for
              the moments that deserve more than a crowd.
            </p>

            <ol className="mt-10 border-t border-ink/15">
              {PRACTICES.map(([title, copy], i) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.75rem_1fr] items-baseline gap-x-5 border-b border-ink/15 py-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-lg italic text-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{title}</h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-6 text-bark">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link href="/about" className="text-link mt-10">
              Read the story
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SEO content — best perfume in Karachi & Pakistan ── */}
      <section className="border-t border-ink/10 bg-ivory">
        <div className="container-luxe py-20 md:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-5">The collection, in plain words</p>
              <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
                Why the house is called
                <em className="italic text-gold"> the best perfume in Karachi.</em>
              </h2>
            </div>
          </Reveal>

          <div className="mt-16">
            {/* The city */}
            <EditorialBlock
              eyebrow="01 · The city"
              title="The best perfume in Karachi, composed by hand"
              image={PLACEHOLDER_YAKOOT}
              alt="SKJ Pure Presence extrait de parfum flacon, hand-filled at the atelier in Karachi"
              action={{ href: "/all-perfumes", label: "Shop the collection" }}
            >
              Karachi gives a scent nothing for free. Humidity, heat and long
              evenings undo most perfumes by dinner — which is why an extrait de
              parfum, poured at 18–25% concentration, belongs here. SKJ Pure
              Presence composes for this particular light: rare botanicals
              worked slowly, in small batches, filled by hand at our Karachi
              atelier. Worn across Clifton, Zamzama and Gulberg, the collection
              holds through the afternoon and settles into evening without
              asking for attention. If you are searching for the best perfume in
              Karachi — one that lasts, refills and stays close — begin with the
              signature, <Link href="/product/legend" className="text-link">Legend</Link>
              , and let the rest of the house find you in time.
            </EditorialBlock>

            {/* The concentration */}
            <EditorialBlock
              eyebrow="02 · The concentration"
              title="A luxury extrait de parfum, composed in Pakistan"
              image={PLACEHOLDER_LEGEND}
              alt="SKJ Pure Presence Legend extrait de parfum flacon, composed in Pakistan"
              flip
              action={{ href: "/product/yakoot-perfume", label: "Explore the extraction" }}
            >
              Most perfumes sold in Pakistan are eau de parfum, diluted for
              volume. An extrait is a different animal: 18–25% parfum, poured
              slowly, worn for hours. SKJ Pure Presence works in that rarefied
              register — the discipline of Grasse, balanced for Pakistani skin
              and climate. Rare woods, resins and flowers are blended in
              silence, in batches too small to be called a product. The result
              is a luxury extrait de parfum in Pakistan that behaves like a
              signature rather than a scent: it stays close when you need it,
              and blooms when you least expect it.
            </EditorialBlock>

            {/* The flacon */}
            <EditorialBlock
              eyebrow="03 · The flacon"
              title="Refillable perfume in Pakistan, made to be kept"
              image={PLACEHOLDER_TESTER}
              alt="Refillable perfume in Pakistan — SKJ Pure Presence crystal flacon at the Karachi atelier"
              action={{ href: "/all-perfumes", label: "View the collection" }}
            >
              Most fragrance bottles are disposable by design. Ours are not. SKJ
              flacons are crystal and enamel, chosen to be kept, refilled and
              remembered. Refillable perfume in Pakistan is still rare, and it
              changes the relationship: you buy the composition once, then
              replenish the essence at a reduced price instead of buying a new
              bottle. It is kinder to the pocket, to the planet and to the scent
              itself. Every 30 ml and 50 ml SKJ flacon is refillable, hand-filled
              at the atelier and shipped across Pakistan with complimentary
              delivery. Keep the bottle. The essence will find you again.
            </EditorialBlock>

            {/* For him */}
            <EditorialBlock
              eyebrow="04 · For him"
              title="Best perfume for men in Pakistan, priced in PKR"
              image={PLACEHOLDER_GHAZI}
              alt="SKJ Pure Presence Ghazi extrait de parfum flacon — long-lasting men's perfume in Pakistan"
              flip
            >
              A men&rsquo;s perfume in Pakistan has to earn its place through
              heat and heavier days. SKJ&rsquo;s answer is a small edit of extraits
              built for the long wear:{" "}
              <Link href="/product/ghazi" className="text-link">Ghazi</Link> —
              oud, smoke and leather, softened by davana — for the worn-in hour;{" "}
              <Link href="/product/yakoot-perfume" className="text-link">Yaqoot</Link> —
              smoked cedar, black oud and saffron over a bruised rose — for the
              evening; <Link href="/product/legend" className="text-link">Legend</Link>{" "}
              — molten amber and vanilla — for the nights worth gifting. All
              three pour at 18–25% parfum, are hand-filled in Karachi and start
              from Rs. 1,200. If you want the best perfume for men in Pakistan
              without the crowd on your shoulder, this is the edit the atelier
              recommends.
            </EditorialBlock>

            {/* In good company */}
            <EditorialBlock
              eyebrow="05 · In good company"
              title="For those who love J. Perfumes, Lattafa and Janan"
              image={PLACEHOLDER_WHITE_NOOR}
              alt="SKJ Pure Presence White Noor flacon in soft natural light from the Karachi atelier"
              action={{ href: "/product/legend", label: "Compare the signatures" }}
            >
              J. Perfumes, Lattafa and Janan built modern fragrance culture in
              Pakistan, and they remain the doorway for most collectors. SKJ
              Pure Presence holds the same inheritance — Middle Eastern
              opulence, French discipline — with one difference: discipline.
              Where those houses pour eau de parfum at volume, SKJ works small,
              at 18–25% extrait concentration, with refillable flacons filled
              by hand in Karachi. Loyal to J. and Lattafa? Meet them at the same
              register — richer, longer, quieter. And because every SKJ
              composition is a variation rather than an imitation, it is a
              natural next step for anyone weaned on Janan.
            </EditorialBlock>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-ink/10 bg-cream">
        <div className="container-luxe py-20 md:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow mb-5">Questions, answered</p>
              <h2 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">
                The house, <em className="italic text-gold">in plain words.</em>
              </h2>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl">
            {FAQ_QUESTIONS.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-ink/10"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 font-serif text-lg leading-snug text-ink transition-colors hover:text-gold md:text-xl">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-sans text-2xl font-light text-gold transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-7 text-sm leading-7 text-bark md:text-base md:leading-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Structured data: Organization, Store, WebSite, FAQ ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Newsletter CTA removed — arrives with the collection release ── */}
    </>
  );
}