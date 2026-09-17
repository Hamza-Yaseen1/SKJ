# SKJ Pure Presence

### The quietest form of power.

SKJ Pure Presence is a modern maison de parfum for fragrances that stay close,
wear beautifully, and say something without asking for attention. The house
composes rare, high-concentration scents in small batches, shaped by the
tradition of Grasse and made for the moments that deserve more than a crowd.

<p align="center">
	<a href="https://github.com/Hamza-Yaseen1/SKJ"><strong>Explore the house</strong></a>
	&nbsp;&nbsp;·&nbsp;&nbsp;
	<a href="http://localhost:3000/shop"><strong>View the collection</strong></a>
</p>

---

## The House

The story began with an unfinished sentence on an atelier wall in Grasse:
“Perfume is the only accessory you can never take off.” SKJ Pure Presence
finished it the only way a maison should: by composing.

Every fragrance is developed around character rather than category. Rare
botanicals are worked at high concentration, poured by hand, and released in
limited yearly batches. The result is a small, considered collection that is
meant to be worn, remembered, and returned to.

**Our principles**

| Principle | What it means |
| --- | --- |
| Composed in Grasse | Developed alongside the perfumers of the French Riviera. |
| Small yearly batches | Restricted runs that keep the work rare and intentional. |
| Refillable flacons | Keep the bottle and replenish the essence. |
| Responsible by design | Cruelty-free values, considered sourcing, and less waste. |

## The Collection

Ten compositions make up the current house vocabulary, spanning woody, floral,
oriental, citrus, gourmand, green, and chypre families.

- **Yaqoot** - smoked cedar, black oud, saffron, and a bruised rose.
- **Legend** - molten amber, vanilla, Turkish rose, and oud.
- **White** - iris, heliotrope, white musk, and blonde woods.
- **White Noor** - orange blossom, jasmine, soft musk, and light.
- **Ghazi** - oud, smoke, cold earth, davana, and black pepper.
- **Shaheen** - bergamot, neroli, green fig, and white musk.
- **Sultan** - rum-drenched vanilla, dried fig, warm leather, and benzoin.
- **Heer** - rose, saffron, honeyed amber, tonka, and soft leather.
- **Chinar** - crushed ivy, wet tea leaf, galbanum, and living green notes.
- **Bahadur** - orris, violet, oakmoss, sandalwood, and old-world glamour.

Each fragrance is available in 50 ml and 100 ml sizes, with pricing in PKR.
Product pages include the fragrance story, concentration, projection, and notes
across the top, heart, and base.

## This Digital Atelier

This repository contains the SKJ Pure Presence e-commerce experience: an
editorial storefront where customers can discover the house, compare the
collection, choose a size, add a fragrance to their bag, and complete an order.

### Experience highlights

- A cinematic, image-led homepage with the house story and featured signatures
- Collection browsing organized by fragrance family
- Dedicated product pages with notes, concentration, projection, and sizing
- Persistent cart state with quantity controls and order summary
- Checkout and order confirmation flows
- Contact and newsletter touchpoints for guidance, press, and atelier enquiries
- Optional Brevo email notifications for completed orders
- Responsive, accessible layouts with a restrained editorial visual system

## Technology

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide](https://lucide.dev/) icons
- [Brevo](https://www.brevo.com/) for transactional email
- Next Image and `next/font` for optimized media and typography

## Run Locally

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to enter the atelier.

### Available commands

```bash
npm run dev       # Start the development server
npm run build     # Create an optimized production build
npm run start     # Serve the production build
npm run lint      # Run ESLint
```

## Environment Variables

Copy `.env.example` to `.env.local` for local configuration:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO and Open Graph metadata. |
| `BREVO_API_KEY` | Brevo API key for order emails. Optional in dry-run mode. |
| `EMAIL_FROM` | Verified sender address for transactional email. |
| `OWNER_EMAIL` | Inbox for new-order notifications. |
| `EMAIL_DRY_RUN` | Set to `true` to test checkout without sending email. |

The storefront remains usable without Brevo credentials; order email delivery
is skipped until the provider is configured.

## Project Shape

```text
app/                 Pages, layouts, checkout API, and route handlers
components/          Shared storefront, cart, checkout, and form components
lib/products.ts      Product catalogue and collection accessors
lib/orders.ts        Order validation and order resolution
lib/emails.ts        Brevo integration and email delivery
public/Images/       Local brand and product imagery
DESIGN_SYSTEM.md     Visual direction and quality rules for the house
```

Product data is currently maintained in `lib/products.ts`, which keeps the
catalogue easy to edit while the commerce foundation is established. The data
layer is intentionally isolated so it can later be replaced by a CMS or
database without changing the storefront experience.

## Deployment

The project is ready for deployment on [Vercel](https://vercel.com/). Add the
environment variables above in the Vercel project settings, especially
`NEXT_PUBLIC_SITE_URL`, `EMAIL_FROM`, and `OWNER_EMAIL`. The build command is:

```bash
npm run build
```

## Contact the Atelier

For fragrance guidance, press, private commissions, or a considered beginning,
write to [atelier@skjpurepresence.com](mailto:atelier@skjpurepresence.com).

SKJ Pure Presence is composed in Grasse and made for presence, not noise.
