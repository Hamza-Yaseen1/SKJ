/**
 * SKJ Pure Presence
 * Order emails — composed as self-contained HTML for maximum email-client
 * compatibility (tables, inline styles, web-safe families).
 *
 * Two messages for every order:
 *   1. Store owner  — full order details, subject "New Order – SKJ #<number>"
 *   2. Customer     — luxury confirmation, subject "Thank you for your order – SKJ"
 *
 * Delivered through the Brevo (Sendinblue) transactional email API.
 */

import { siteConfig } from "@/lib/config";
import type { ResolvedOrder } from "@/lib/orders";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";

const INK = "#0a0a0a";
const CREAM = "#f5f0e8";
const GOLD = "#c9a227";
const GOLD_LIGHT = "#d4af37";
const BARK = "#6e675c";
const SAND = "#ece5d8";
const CHARCOAL = "#17140f";

const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Arial, sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMoney(value: number): string {
  return `Rs. ${value.toLocaleString("en-US")}`;
}

function formatDate(date: Date): string {
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Shared fragments ── */

function orderRowsHtml(order: ResolvedOrder): string {
  return order.lines
    .map(
      (line) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${SAND};">
            <p style="margin:0;font-family:${SERIF};font-size:15px;color:${INK};">${escapeHtml(line.name)}</p>
            <p style="margin:4px 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${BARK};">${escapeHtml(line.size)} &middot; ${formatMoney(line.unitPrice)} each &middot; Qty ${line.quantity}</p>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid ${SAND};text-align:right;vertical-align:top;">
            <p style="margin:0;font-family:${SANS};font-size:14px;color:${INK};">${formatMoney(line.lineTotal)}</p>
          </td>
        </tr>`
    )
    .join("");
}

function cityLineHtml(contact: ResolvedOrder["contact"]): string {
  return contact.postalCode
    ? `${escapeHtml(contact.city)} ${escapeHtml(contact.postalCode)}`
    : escapeHtml(contact.city);
}

function shippingBlockHtml(order: ResolvedOrder): string {
  const a = order.contact;
  return `<p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:${INK};">${escapeHtml(a.fullName)}<br />${escapeHtml(a.street)}<br />${cityLineHtml(a)}</p>`;
}

/* ── Email shells ── */

function lightShell(inner: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fbf8f2;">
          <tr>
            <td style="padding:40px 48px 0;">
              <p style="margin:0;font-family:${SERIF};font-size:22px;letter-spacing:0.32em;color:${INK};text-align:center;">SKJ</p>
              <p style="margin:10px 0 0;font-family:${SANS};font-size:10px;letter-spacing:0.34em;text-transform:uppercase;color:${BARK};text-align:center;">Pure Presence &middot; Pakistan</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 48px 40px;">${inner}</td>
          </tr>
          <tr>
            <td style="padding:28px 48px;border-top:1px solid ${SAND};" bgcolor="#f2ecdf">
              <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.8;color:${BARK};text-align:center;">Hand-filled in Pakistan &middot; Refillable flacon &middot;<br />
              <span style="color:${GOLD};">atelier@skjpurepresence.com</span></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function darkShell(inner: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${INK};padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${CHARCOAL};">
          <tr>
            <td style="padding:40px 48px 0;">
              <p style="margin:0;font-family:${SERIF};font-size:22px;letter-spacing:0.32em;color:${CREAM};text-align:center;">SKJ</p>
              <p style="margin:10px 0 0;font-family:${SANS};font-size:10px;letter-spacing:0.34em;text-transform:uppercase;color:#8d8579;text-align:center;">Atelier order</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 48px 40px;">${inner}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

/* ── The two messages ── */

export function ownerEmailHtml(order: ResolvedOrder): string {
  const a = order.contact;
  const inner = `
    <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD_LIGHT};">New order</p>
    <h1 style="margin:12px 0 0;font-family:${SERIF};font-size:28px;font-weight:500;color:${CREAM};">SKJ&nbsp;#${escapeHtml(order.number)}</h1>
    <p style="margin:8px 0 0;font-family:${SANS};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#8d8579;">${escapeHtml(formatDate(order.createdAt))}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
      <tr>
        <td style="padding:10px 14px;background:${INK};">
          <p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:${GOLD_LIGHT};">Customer &amp; shipping</p>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 14px;background:#211d16;">
          <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.9;color:${CREAM};">${escapeHtml(a.fullName)}<br />${escapeHtml(a.email)}<br />${escapeHtml(a.phone)}<br />${escapeHtml(a.street)}<br />${cityLineHtml(a)}</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
      <tr>
        <td style="padding:10px 14px;background:${INK};">
          <p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:${GOLD_LIGHT};">Ordered &middot; ${order.itemCount} ${order.itemCount === 1 ? "piece" : "pieces"}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 14px;background:#211d16;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #2c261e;">
                <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8d8579;">Item</p>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid #2c261e;text-align:right;">
                <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8d8579;">Amount</p>
              </td>
            </tr>
            ${orderRowsHtml(order)}
            <tr>
              <td style="padding:18px 0 0;">
                <p style="margin:0;font-family:${SANS};font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#8d8579;">Total</p>
              </td>
              <td style="padding:18px 0 0;text-align:right;">
                <p style="margin:0;font-family:${SERIF};font-size:20px;color:${GOLD_LIGHT};">${formatMoney(order.subtotal)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:28px 0 0;font-family:${SANS};font-size:12px;line-height:1.8;color:#8d8579;">Reply to this email to manage the order. Payment is arranged privately with the customer.</p>`;

  return darkShell(inner);
}

export function customerEmailHtml(order: ResolvedOrder): string {
  const inner = `
    <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD};">Order received</p>
    <h1 style="margin:12px 0 0;font-family:${SERIF};font-size:30px;font-weight:500;line-height:1.1;color:${INK};">Thank you, <em style="color:${GOLD};">${escapeHtml(order.contact.fullName.split(" ")[0])}</em>.</h1>
    <p style="margin:14px 0 0;font-family:${SANS};font-size:14px;line-height:1.8;color:${BARK};">Your composition has been accepted and already rests with the atelier. Reference it by your order number — it will keep with us until the flacon is on its way to you.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td style="padding:16px 0;border-top:2px solid ${INK};border-bottom:1px solid ${SAND};">
          <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${BARK};">Order number</p>
          <p style="margin:6px 0 0;font-family:${SERIF};font-size:22px;letter-spacing:0.22em;color:${GOLD};">${escapeHtml(order.number)}</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${SAND};">
          <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:${BARK};">Your order &middot; ${order.itemCount} ${order.itemCount === 1 ? "piece" : "pieces"}</p>
        </td>
      </tr>
      ${orderRowsHtml(order)}
      <tr>
        <td style="padding:18px 0 0;text-align:right;">
          <p style="margin:0;font-family:${SERIF};font-size:22px;color:${INK};">${formatMoney(order.subtotal)}</p>
          <p style="margin:4px 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};">Shipping complimentary</p>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td style="padding:20px 0 16px;border-top:1px solid ${SAND};">
          <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:${BARK};">Delivering to</p>
          <p style="margin:10px 0 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${INK};">${shippingBlockHtml(order)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:32px 0 0;padding:20px 24px;border-left:2px solid ${GOLD};background:${SAND};font-family:${SERIF};font-size:15px;font-style:italic;line-height:1.8;color:${INK};">“Fragrance is the only accessory you never take off. Wear it with quiet certainty — our perfumer will be in touch shortly to arrange payment and delivery.”</p>

    <p style="margin:24px 0 0;font-family:${SANS};font-size:12px;line-height:1.8;color:${BARK};">With gratitude,<br /><strong style="color:${INK};">The SKJ atelier</strong></p>`;

  return lightShell(inner);
}

/* ── Brevo delivery ── */

export interface EmailDelivery {
  owner: string | null;
  customer: string | null;
}

interface BrevoMessage {
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  replyTo?: { email: string; name: string };
  subject: string;
  htmlContent: string;
}

/** Parses `"SKJ Pure Presence <orders@skjpurepresence.com>"` into name + email. */
function parseSender(from: string): { name: string; email: string } {
  const match = /^(.*?)\s*<([^>]+)>$/.exec(from);
  const name = match?.[1]?.trim() || "SKJ Pure Presence";
  const email = match?.[2]?.trim() || from.trim();
  return { name, email };
}

async function sendBrevo(message: BrevoMessage): Promise<string> {
  const { brevoApiKey } = siteConfig;
  if (!brevoApiKey) {
    throw new Error("BREVO_API_KEY is not set");
  }

  const response = await fetch(BREVO_SMTP_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const detail =
      (body as { message?: string } | null)?.message ??
      `Brevo returned HTTP ${response.status}`;
    throw new Error(detail);
  }

  const messageId = (body as { messageId?: string } | null)?.messageId;
  return messageId ?? "sent";
}

export async function sendOrderEmails(order: ResolvedOrder): Promise<EmailDelivery> {
  const { ownerEmail, emailFrom, emailDryRun } = siteConfig;

  if (emailDryRun) {
    return { owner: "dry-run", customer: "dry-run" };
  }

  if (!siteConfig.brevoApiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[email] BREVO_API_KEY is not set — emails skipped for",
        order.number
      );
    }
    return { owner: null, customer: null };
  }

  const sender = parseSender(emailFrom);

  const deliver = async (
    label: string,
    message: BrevoMessage
  ): Promise<string | null> => {
    try {
      return await sendBrevo(message);
    } catch (err) {
      console.error(
        `[email] failed to deliver ${label} email for ${order.number}:`,
        err
      );
      return null;
    }
  };

  const owner = await deliver("owner", {
    sender,
    to: [{ email: ownerEmail, name: "SKJ Atelier" }],
    subject: `New Order – SKJ #${order.number}`,
    htmlContent: ownerEmailHtml(order),
  });
  const customer = await deliver("customer", {
    sender,
    to: [{ email: order.contact.email, name: order.contact.fullName }],
    subject: "Thank you for your order – SKJ",
    htmlContent: customerEmailHtml(order),
  });

  return { owner, customer };
}

/* ── Contact letters ── */

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export function contactLetterHtml(contact: ContactMessage): string {
  const inner = `
    <p style="margin:0;font-family:${SANS};font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD};">Letter from the website</p>
    <h1 style="margin:12px 0 0;font-family:${SERIF};font-size:28px;font-weight:500;line-height:1.1;color:${INK};">${escapeHtml(contact.name)}</h1>
    <p style="margin:6px 0 0;font-family:${SANS};font-size:13px;color:${BARK};">${escapeHtml(contact.email)}</p>

    <p style="margin:28px 0 0;padding:20px 24px;border-left:2px solid ${GOLD};background:${SAND};font-family:${SERIF};font-size:15px;font-style:italic;line-height:1.8;color:${INK};">${escapeHtml(contact.message).replace(/\n/g, "<br />")}</p>

    <p style="margin:24px 0 0;font-family:${SANS};font-size:12px;line-height:1.8;color:${BARK};">Reply to ${escapeHtml(contact.email)} to reach this sender.</p>`;

  return lightShell(inner);
}

/** Delivers a website contact letter to the atelier. Returns whether it was sent. */
export async function sendContactLetter(
  contact: ContactMessage
): Promise<boolean> {
  const { ownerEmail, emailFrom, emailDryRun } = siteConfig;

  if (emailDryRun) return true;

  if (!siteConfig.brevoApiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[email] BREVO_API_KEY is not set — contact letter skipped");
    }
    return false;
  }

  try {
    await sendBrevo({
      sender: parseSender(emailFrom),
      to: [{ email: ownerEmail, name: "SKJ Atelier" }],
      replyTo: { email: contact.email, name: contact.name },
      subject: `Letter from the website — ${contact.name}`,
      htmlContent: contactLetterHtml(contact),
    });
    return true;
  } catch (err) {
    console.error("[email] failed to deliver contact letter:", err);
    return false;
  }
}