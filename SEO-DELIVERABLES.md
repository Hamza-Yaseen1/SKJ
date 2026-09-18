# SKJ Pure Presence — Pakistan SEO Deliverables

Target site: **https://skj-pure-presence.vercel.app**
Keywords: brand (SKJ, SKJ Pure Presence) + high-volume Pakistan perfume terms (j. perfumes, lattafa, janan, best perfume for men).

Everything marked **implemented** is already live in `app/`. The rest is copy-paste-ready.

---

## 1. Title Tags (under 60 chars)

Implemented in `app/layout.tsx`, `app/page.tsx`, `app/shop/page.tsx`, `app/about/page.tsx`, `app/deals/page.tsx`, `app/contact/page.tsx`, `app/product/[slug]/page.tsx`.

| Page | Title | Length |
| --- | --- | --- |
| Homepage | `SKJ Pure Presence \| Best Perfume in Karachi, Pakistan` | 53 |
| Compositions (Shop) | `SKJ Perfumes in Pakistan \| The Collection` | 41 |
| About / The House | `About SKJ Pure Presence \| The House, Karachi` | 44 |
| Deal of the Week | `Deal of the Week \| SKJ Perfume Promotions in Pakistan` | 53 |
| Contact | `Contact the SKJ Atelier \| Karachi, Pakistan` | 43 |
| Product (template) | `{Name} {Concentration} \| SKJ Pakistan` → e.g. `Yaqoot Extrait de Parfum \| SKJ Pakistan` | ~39–44 |
| Cart | `Your Bag \| SKJ Pure Presence` | — |
| Checkout | `Checkout \| SKJ Pure Presence` (noindex) | — |

> Product titles are generated from `product.name` + `product.concentration`, so they stay correct for Eau de Parfum SKUs (White Noor, Icy Noor, Perfume Tester).

---

## 2. Meta Descriptions (150–160 chars)

Implemented in the same files as above.

| Page | Meta description |
| --- | --- |
| Homepage | SKJ Pure Presence composes hand-filled extraits de parfum in Pakistan. Refillable, cruelty-free, 18–25% parfum. Discover the best perfume in Karachi. |
| Shop | Six hand-composed SKJ perfumes in Pakistan — woody, floral, oriental, white and chypre. Refillable, long-lasting extrait de parfum, from Rs. 1,200. |
| About | Born in Pakistan from a single unfinished sentence. The story of SKJ Pure Presence — a maison de parfum built on concentration, rarity and restraint. |
| Deals | The current SKJ Pure Presence promotion — a considered gesture from the atelier. Buy 1 Get 1 Free: any 100 ml extrait, a 50 ml free. |
| Contact | Reach the SKJ atelier in Karachi — fragrance guidance, press, private commissions, or simply to begin a conversation. |
| Product (template) | `{Name}: {description…} Composed in Pakistan.` — truncated to fit Google's window. |
| Blog posts | See section 9 below. |

---

## 3. Heading Structure

Implemented in `app/page.tsx` + `components/Hero.tsx`.

**Homepage H1 (brand + keyword, not stuffed):**

```html
<h1>
  SKJ Pure Presence.
  <br />
  <em>The quietest form of power.</em>
</h1>
```

**Homepage H2/H3 flow:**

- H2 `The edit` → H3 product names (featured collection)
- H2 `The house` (philosophy blockquote)
- H2 `Why the house is called the best perfume in Karachi.`
  - H3 `The best perfume in Karachi, composed by hand`
  - H3 `A luxury extrait de parfum, composed in Pakistan`
  - H3 `Refillable perfume in Pakistan, made to be kept`
  - H3 `Best perfume for men in Pakistan, priced in PKR`
  - H3 `For those who love J. Perfumes, Lattafa and Janan`
- H2 `The house, in plain words.` (FAQ)

Exactly one H1 per page. Product pages use the breadcrumb + product-name heading; shop/about use their own single H1.

---

## 4. JSON-LD Schema Code

Implemented in `app/page.tsx` (homepage) and `app/product/[slug]/page.tsx`.

### Organization + LocalBusiness (Store) + WebSite (SearchAction) — homepage

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://skj-pure-presence.vercel.app/#organization",
      "name": "SKJ Pure Presence",
      "url": "https://skj-pure-presence.vercel.app",
      "logo": "https://skj-pure-presence.vercel.app/icon.svg",
      "email": "atelier@skjpurepresence.com",
      "slogan": "The quietest form of power",
      "foundingDate": "2026",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SKJ House, 48 Gulberg Avenue",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "postalCode": "74200",
        "addressCountry": "PK"
      }
    },
    {
      "@type": "Store",
      "@id": "https://skj-pure-presence.vercel.app/#store",
      "name": "SKJ Pure Presence",
      "url": "https://skj-pure-presence.vercel.app",
      "email": "atelier@skjpurepresence.com",
      "priceRange": "Rs. 800 – Rs. 2,000",
      "currenciesAccepted": "PKR",
      "areaServed": ["Pakistan", "Karachi"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SKJ House, 48 Gulberg Avenue",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "postalCode": "74200",
        "addressCountry": "PK"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 24.8607, "longitude": 67.0011 },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Thursday", "Friday", "Saturday"],
          "opens": "12:00",
          "closes": "19:00"
        }
      ],
      "parentOrganization": { "@id": "https://skj-pure-presence.vercel.app/#organization" }
    },
    {
      "@type": "WebSite",
      "@id": "https://skj-pure-presence.vercel.app/#website",
      "url": "https://skj-pure-presence.vercel.app",
      "name": "SKJ Pure Presence",
      "inLanguage": "en",
      "publisher": { "@id": "https://skj-pure-presence.vercel.app/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://skj-pure-presence.vercel.app/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://skj-pure-presence.vercel.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where to buy SKJ Pure Presence in Karachi?",
          "acceptedAnswer": { "@type": "Answer", "text": "Directly on this website…" }
        }
      ]
    }
  ]
}
```

> The `SearchAction` points at a real, working `/search` page — implemented in `app/search/page.tsx` (noindexed, as Google requires).

### Product + BreadcrumbList — product pages (dynamic)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://skj-pure-presence.vercel.app/product/{slug}#product",
      "name": "{Name}",
      "brand": { "@type": "Brand", "name": "SKJ Pure Presence" },
      "sku": "{p-0X}",
      "image": ["https://skj-pure-presence.vercel.app{image-path}"],
      "description": "{description} {concentration}, composed in Pakistan.",
      "category": "{Family}",
      "offers": [
        {
          "@type": "Offer",
          "name": "{Name} — 30 ml",
          "price": 1200,
          "priceCurrency": "PKR",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "url": "https://skj-pure-presence.vercel.app/product/{slug}"
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://skj-pure-presence.vercel.app/product/{slug}#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skj-pure-presence.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Collection", "item": "https://skj-pure-presence.vercel.app/shop" },
        { "@type": "ListItem", "position": 3, "name": "{Name}", "item": "https://skj-pure-presence.vercel.app/product/{slug}" }
      ]
    }
  ]
}
```

> Replace `{slug}`, `{Name}`, `{p-0X}`, `{image-path}`, `{description}`, `{Family}` per product. Prices per size are auto-generated from `lib/products.ts`.

### Convenience: `robots.txt` + `sitemap.xml`

- `app/robots.ts` → `/robots.txt` (auto-generated, includes sitemap, disallows `/api`, `/cart`, `/checkout`, `/order-confirmation`, `/search`).
- `app/sitemap.ts` → `/sitemap.xml` (homepage, shop, deals, about, contact + every product page).

Submit on **Google Search Console → Sitemaps**: `https://skj-pure-presence.vercel.app/sitemap.xml`. Also add the site's **geo targeting** to Pakistan and load the verification fragment in the root `app/layout.tsx` `<head>` if GSC offers it.

---

## 5. Content Sections (100–150 words each)

Implemented on the homepage (`app/page.tsx`) as H3 editorial blocks. Copy below for reuse.

### 5.1 Best perfume in Karachi

> Karachi gives a scent nothing for free. Humidity, heat and long evenings undo most perfumes by dinner — which is why an extrait de parfum, poured at 18–25% concentration, belongs here. SKJ Pure Presence composes for this particular light: rare botanicals worked slowly, in small batches, filled by hand at our Karachi atelier. Worn across Clifton, Zamzama and Gulberg, the collection holds through the afternoon and settles into evening without asking for attention. If you are searching for the best perfume in Karachi — one that lasts, refills and stays close — begin with the signature, Legend, and let the rest of the house find you in time.

### 5.2 Luxury extrait de parfum in Pakistan

> Most perfumes sold in Pakistan are eau de parfum, diluted for volume. An extrait is a different animal: 18–25% parfum, poured slowly, worn for hours. SKJ Pure Presence works in that rarefied register — the discipline of Grasse, balanced for Pakistani skin and climate. Rare woods, resins and flowers are blended in silence, in batches too small to be called a product. The result is a luxury extrait de parfum in Pakistan that behaves like a signature rather than a scent: it stays close when you need it, and blooms when you least expect it.

### 5.3 Refillable perfume Pakistan

> Most fragrance bottles are disposable by design. Ours are not. SKJ flacons are crystal and enamel, chosen to be kept, refilled and remembered. Refillable perfume in Pakistan is still rare, and it changes the relationship: you buy the composition once, then replenish the essence at a reduced price instead of buying a new bottle. It is kinder to the pocket, to the planet and to the scent itself. Every 30 ml and 50 ml SKJ flacon is refillable, hand-filled at the atelier and shipped across Pakistan with complimentary delivery. Keep the bottle. The essence will find you again.

### 5.4 Best perfume for men in Pakistan

> A men's perfume in Pakistan has to earn its place through heat and heavier days. SKJ's answer is a small edit of extraits built for the long wear: Ghazi — oud, smoke and leather, softened by davana — for the worn-in hour; Yaqoot — smoked cedar, black oud and saffron over a bruised rose — for the evening; Legend — molten amber and vanilla — for the nights worth gifting. All three pour at 18–25% parfum, are hand-filled in Karachi and start from Rs. 1,200. If you want the best perfume for men in Pakistan without the crowd on your shoulder, this is the edit the atelier recommends.

### 5.5 Perfume like J. / Lattafa / Janan

> J. Perfumes, Lattafa and Janan built modern fragrance culture in Pakistan, and they remain the doorway for most collectors. SKJ Pure Presence holds the same inheritance — Middle Eastern opulence, French discipline — with one difference: discipline. Where those houses pour eau de parfum at volume, SKJ works small, at 18–25% extrait concentration, with refillable flacons filled by hand in Karachi. Loyal to J. and Lattafa? Meet them at the same register — richer, longer, quieter. And because every SKJ composition is a variation rather than an imitation, it is a natural next step for anyone weaned on Janan.

---

## 6. FAQ Section (8 questions)

Implemented on the homepage as accessible `<details>`/`<summary>` markup + mirrored in the `FAQPage` JSON-LD.

| # | Question | Answer (summary) |
| --- | --- | --- |
| 1 | Where to buy SKJ Pure Presence in Karachi? | Directly on the site with complimentary shipping across Clifton, DHA, Zamzama and Gulberg. The Karachi atelier is open by appointment, Thursday–Saturday. Write to atelier@skjpurepresence.com. |
| 2 | Is SKJ perfume better than j. perfumes? | Better is taste; the difference is measurable. J. Perfumes is affordable eau de parfum at volume; SKJ is a small-batch extraction house — 18–25% parfum, hand-filled, refillable, cruelty-free. |
| 3 | What is the price of SKJ extrait de parfum in Pakistan? | 30 ml Rs. 1,200 · 50 ml Rs. 2,000 · 10 ml tester Rs. 800. All PKR, shipping complimentary, no payment taken online — order confirmed by email. |
| 4 | Which is the best luxury perfume for men in Pakistan? | Ghazi (oud/smoke/leather), Yaqoot (cedar/oud/saffron), Legend (amber/rose) — all 18–25% extrait de parfum, hand-filled in Karachi. |
| 5 | Is SKJ refillable perfume available in Pakistan? | Yes — every 30 ml and 50 ml flacon is refillable at a reduced price, with complimentary shipping nationwide. |
| 6 | How long does SKJ extrait de parfum last? | 8–12 hours on skin, days on fabric, at 18–25% parfum. Ghazi and Yaqoot are the most persistent. Depends on skin chemistry. |
| 7 | What is the difference between SKJ and Lattafa? | Lattafa produces at scale, eau de parfum strength — a gateway. SKJ works small at extrait concentration: hand-filled, refillable, cruelty-free. |
| 8 | Does SKJ ship across Pakistan? | Yes — Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and Quetta, complimentary. Hand-filled within 3 working days, confirmed by email with tracking. |

---

## 7. Internal Linking Strategy

Implemented in the homepage content blocks. Keep this map as the site grows.

```
Homepage ──► /shop (anchor: "Shop the collection" / "View the collection")
   │  └────► /product/legend (anchors: "Legend", "Compare the signatures")
   │  └────► /product/yakoot (anchors: "Yaqoot", "Explore the extraction")
   │  └────► /product/ghazi  (anchor: "Ghazi")
   └────────► /about (hero "Our philosophy" + "Read the story")
Shop ──────► each ProductCard ──► /product/{slug}
Product ───► "View all fragrances" ──► /shop (footer of related grid)
Footer ────► /shop, /about, /contact
```

**Anchor-text rules:** use natural, descriptive labels (`begin with the signature, Legend`) — never repeat "perfume in Pakistan" in every link. Product card titles are self-anchoring. Every future blog post should link out with these anchors: *SKJ Pure Presence*, *best perfume in Karachi*, *refillable perfume in Pakistan*, *extrait de parfum in Pakistan*.

---

## 8. Image Alt Text Suggestions

The `ProductCard` and product pages already write: `"{Name} flacon — {Family} fragrance"`. Use these richer variants where images are added/edited:

| Image | Alt text |
| --- | --- |
| Yaqoot flacon | `Yaqoot extrait de parfum flacon — smoked cedar, black oud and saffron, hand-filled in Karachi` |
| Legend flacon | `Legend by SKJ Pure Presence — molten amber and Turkish rose extrait, composed in Pakistan` |
| Ghazi flacon | `Ghazi extrait de parfum — oud, smoke and leather, hand-filled at the SKJ atelier in Karachi` |
| White Noor / Icy Noor | `White Noor eau de parfum from SKJ — orange blossom and jasmine over white musk, Pakistan` |
| Perfume Tester | `SKJ perfume tester flacon — the house extrait, sampled before it is kept` |
| Hero/lifestyle | `Luxury perfume in Pakistan — SKJ Pure Presence flacon resting in soft morning light` |
| Atelier/production | `SKJ atelier in Karachi — a flacon being hand-filled with extrait de parfum` |
| Refill | `Refillable perfume Pakistan — the SKJ flacon being replenished with essence` |

**Editorial homepage blocks (implemented in `app/page.tsx`, using placeholder images):**

| Section | Alt text (live) |
| --- | --- |
| The city | `SKJ Pure Presence extrait de parfum flacon, hand-filled at the atelier in Karachi` |
| The concentration | `SKJ Pure Presence Legend extrait de parfum flacon, composed in Pakistan` |
| The flacon | `Refillable perfume in Pakistan — SKJ Pure Presence crystal flacon at the Karachi atelier` |
| For him | `SKJ Pure Presence Ghazi extrait de parfum flacon — long-lasting men's perfume in Pakistan` |
| In good company | `SKJ Pure Presence White Noor flacon in soft natural light from the Karachi atelier` |

> Placeholder image paths live at the top of `app/page.tsx` (`PLACEHOLDER_*` constants) — swap the strings when real photography arrives; alt text is already final.

---

## 9. Blog Post Titles (10) — with meta descriptions

All funnel to SKJ (brand intent). Publish 1/week. Suggested slug + target keyword in parentheses.

| # | Title (H1) | Meta description (~150–160) | Target |
| --- | --- | --- | --- |
| 1 | J. Perfumes vs SKJ: Which Is Worth Your Money in Pakistan? | J. Perfumes built Pakistani fragrance culture. SKJ is the extrait answer. Compare price, concentration, longevity and value in PKR before you buy. | `j. perfumes` |
| 2 | Lattafa vs SKJ Pure Presence: Extrait vs Eau de Parfum, Explained | The difference between Lattafa's eau de parfum at volume and SKJ's 18–25% extrait, hand-filled in Karachi. Longevity, price, and who each suits. | `lattafa perfume` |
| 3 | Janan Perfume Price in Pakistan Compared: A Buyer's Guide | Janan perfume price in Pakistan is only part of the story. See how concentration and batch size change value — and what to spend on next. | `janan perfume price in pakistan` |
| 4 | Best Perfume for Men in Pakistan: 7 Long-Lasting Picks for 2026 | The best perfume for men in Pakistan, tested in heat. Oud, amber and smoke extraits from Rs. 1,200, with honest wear-time notes. | `best perfume for men in pakistan` |
| 5 | Why Extrait de Parfum Lasts Longer — and Where to Buy It in Pakistan | Long-lasting perfume in Pakistan is rarely about sprays, usually about concentration. Why 18–25% parfum beats eau de parfum, and where to find it. | `long lasting perfume pakistan` |
| 6 | Best Perfume in Karachi: What the City Actually Wears | From Clifton to Gulberg, Karachi wears perfume differently. The best perfume in Karachi holds through the heat — these extraits do. A local's guide. | `best perfume in karachi` |
| 7 | Refillable Perfume in Pakistan: Is It Really Cheaper? | Refillable perfume in Pakistan costs less per wear and wastes no glass. We do the math on flacons, refills and the bottles you keep. | `refillable perfume pakistan` |
| 8 | Luxury Perfume in Pakistan Without the Import Price Tag | Luxury perfume in Pakistan carries heavy import duty. A Karachi house, composed locally at extrait strength, changes the price. Here's how. | `luxury perfume pakistan` |
| 9 | J., Lattafa or Janan? How to Choose Your Signature in Pakistan | J., Lattafa and Janan all have their place. A plain guide to choosing your signature in Pakistan — and the extrait step after them. | `j. perfumes` / sem. |
| 10 | SKJ Pure Presence: The Karachi House Composing 18–25% Parfum | Inside SKJ Pure Presence, Karachi's quiet luxury house — refillable flacons, hand filling, and six extraits that behave like signatures. | Brand |

**Every post should:** include one of the 5 homepage content sections as an excerpt, link back to `/shop` + the named product page, and end with a "Discover the best perfume in Karachi" CTA. Use PKR prices, Karachi place names, and at least one Urdu-flavored phrase where natural.

---

## 10. Google Business Profile Description (≈757 chars)

Targets "best perfume in Karachi".

> SKJ Pure Presence is a luxury extrait de parfum house composed in Karachi, Pakistan. The quietest form of power. We pour rare, hand-filled fragrances at 18–25% parfum in small yearly batches, into refillable crystal-and-enamel flacons, cruelty-free, from Rs. 1,200 in PKR, with complimentary shipping across Pakistan. Signatures include Yaqoot (smoked cedar, black oud, rose), Ghazi (oud, smoke, leather), Legend (amber, vanilla, Turkish rose) and White Noor (orange blossom, musk). Where others sell eau de parfum, we compose extrait de parfum lasting 8–12 hours on skin. Searching for the best perfume in Karachi or a long-lasting perfume in Pakistan? Begin here. Order on the website or write to the atelier for guided help. Karachi, Pakistan. Est. 2026.

**GBP setup checklist:** verify with a Karachi address → category "Perfume Store" or "Cosmetic & Perfume Store" → add business hours (Thu–Sat by appointment) → upload flacon/lifestyle photos with the alt text from section 8 → collect Google reviews (link from order-confirmation email) → cross-post the site's address exactly as in the LocalBusiness schema.

---

## Pakistan-specific execution (off-site)

- [x] `sitemap.xml` + `robots.txt` auto-generated (submit to GSC, geo-target Pakistan)
- [ ] Google Business Profile with Karachi address (section 10)
- [ ] Daraz, OLX, Facebook Marketplace listings (funnel → site; "price in Pakistan" search volume captures)
- [ ] Reviews: Google + Facebook, requested via order confirmation
- [ ] PKR pricing on site (already the case — `lib/products.ts`)
- [ ] Comparison content cadence: one "SKJ vs X" post per month (titles above)