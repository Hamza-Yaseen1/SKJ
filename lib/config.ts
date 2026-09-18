/**
 * SKJ Pure Presence
 * Centralised site configuration read from environment variables.
 */

export const siteConfig = {
  /**
   * Canonical URL base — used to build absolute URLs in SEO metadata,
   * the sitemap and robots.txt.
   *
   * Production fallback is hard-coded to the real deployment domain so the
   * sitemap/canonical/OG never emit `localhost` on a fresh Vercel build
   * (a past bug). Override via NEXT_PUBLIC_SITE_URL in Project → Settings →
   * Environment Variables for preview/staging or a custom domain.
   */
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://skj-pure-presence.vercel.app"
  ).replace(/\/+$/, ""),

  /** Display name + address used on the "From" line of outgoing email. */
  emailFrom: process.env.EMAIL_FROM ?? "SKJ Pure Presence <orders@skjpurepresence.com>",

  /** Where order notifications are delivered to the store owner. */
  ownerEmail: process.env.OWNER_EMAIL ?? "atelier@skjpurepresence.com",

  /** Brevo (formerly Sendinblue) API key. When unset, email sending is skipped (order still succeeds). */
  brevoApiKey: process.env.BREVO_API_KEY,

  /** Local/testing shortcut — fake-sends emails without touching Brevo. */
  emailDryRun: process.env.EMAIL_DRY_RUN === "true",
} as const;