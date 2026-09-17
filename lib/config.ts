/**
 * SKJ Pure Presence
 * Centralised site configuration read from environment variables.
 */

export const siteConfig = {
  /** Canonical URL base — used to build absolute URLs in SEO metadata. */
  siteUrl:
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),

  /** Display name + address used on the "From" line of outgoing email. */
  emailFrom: process.env.EMAIL_FROM ?? "SKJ Pure Presence <orders@skjpurepresence.com>",

  /** Where order notifications are delivered to the store owner. */
  storeEmail: process.env.STORE_EMAIL ?? "atelier@skjpurepresence.com",

  /** Resend API key. When unset, email sending is skipped (order still succeeds). */
  resendApiKey: process.env.RESEND_API_KEY,

  /** Local/testing shortcut — fake-sends emails without touching Resend. */
  emailDryRun: process.env.EMAIL_DRY_RUN === "true",
} as const;