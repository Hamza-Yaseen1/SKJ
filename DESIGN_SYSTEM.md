# DESIGN & QUALITY RULES — Perfume E-commerce Site
**Read this file completely before writing any code or styles. Follow every rule strictly.**

## Mission
Build a stunning, high-end perfume e-commerce website that feels like a real luxury fragrance house (Byredo / Le Labo / Diptyque level).  
It must **not** look AI-generated. No generic “vibe-coded” aesthetics.

## Absolute Prohibitions (AI Slop Kill List)
Never use any of the following:

- Purple, indigo, violet, or blue-to-purple gradients of any kind
- Multi-stop rainbow or neon gradients
- Glassmorphism / frosted glass panels with backdrop-blur + thin borders
- Oversized border-radius on everything (cards, buttons, images all looking the same)
- Inter font as the primary typeface (especially Inter 700)
- Three identical feature cards in a perfect row with icon + heading + short paragraph
- Floating “Most popular” gradient pills on pricing
- Glowing orbs, radial glows, or soft colorful blurs behind content
- Generic “Build the future” / “Elevate your senses” empty marketing copy
- Excessive letter-spacing on uppercase labels
- Bounce / elastic / over-the-top hover animations
- Nested cards inside cards
- Perfect centering of every single section
- Stock-looking floating perfume bottles in mist or gradient backgrounds

## Required Design System

### Color Palette (strict)
- Background: near-black / deep charcoal (#0F0F0F or #121212) and warm off-white / ivory (#F8F5F0)
- Text: soft near-white on dark, deep charcoal on light
- Accent: one sophisticated color only — choose deep burgundy, warm gold, or muted terracotta. Use sparingly.
- Neutrals: soft taupe, warm gray, soft sage
- Never introduce new bright colors without explicit approval.

### Typography
- Headlines: elegant serif (Playfair Display, Cormorant Garamond, or similar high-quality serif)
- Body / UI: refined sans-serif that is **not** Inter (prefer Geist, Satoshi, or a distinctive geometric sans)
- Clear hierarchy. Large, confident headlines with generous line-height.
- Avoid ultra-wide tracking on small text.

### Layout & Spacing
- Generous whitespace is a feature, not a bug.
- Prefer asymmetric or editorial layouts over rigid 3-column grids.
- Product grids can be clean, but avoid perfect cookie-cutter cards.
- Strong visual hierarchy and breathing room between sections.

### Components
- Buttons: solid or subtle outline, refined, not overly rounded or glowing.
- Cards: subtle shadow or border only when needed. Prefer clean edges.
- Product cards: focus on beautiful imagery + clear name + price. Hover should feel intentional (subtle scale or opacity, not bounce).
- Forms: clean, accessible, elegant.

### Imagery & Content
- Treat product photography as the hero. Large, high-quality bottle shots.
- Copy should feel atmospheric and specific to perfume (notes, mood, craftsmanship) — never generic SaaS language.
- Include scent notes, concentration, and short stories on product pages.

### Motion
- Very restrained. Prefer CSS transitions or minimal Framer Motion.
- No continuous background animations, no cursor-following effects, no fade-in on every scroll section by default.

## Development Rules for OpenCode
1. Always read this file + any PLAN.md first.
2. Build in clear steps: structure → design system → home page → shop → product detail → cart.
3. Use Next.js App Router + TypeScript + Tailwind.
4. Create a proper design tokens file (colors, fonts, spacing) and stick to it.
5. Prefer real semantic HTML and accessible patterns.
6. Keep the codebase clean and well-organized.
7. After major sections, pause and ask for feedback before continuing.

## Tone of the Site
Luxury, quiet confidence, sensory, editorial.  
Not trendy, not startup-y, not playful neon, not “AI perfume shop.”

If you feel the urge to add a gradient, a glass card, three identical feature cards, or Inter font — stop and choose the restrained alternative instead.