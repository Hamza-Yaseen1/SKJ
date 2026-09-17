/**
 * SKJ Pure Presence
 * Order domain: payload validation and server-side order resolution.
 *
 * Totals are recomputed here from the catalogue — never trusted from the client.
 */

import { getProductBySlug, getSize } from "@/lib/products";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Pakistani mobile numbers, with or without +92 / 0 and separators. */
const PHONE_RE = /^(?:\+92|0092|0)?3\d{9}$/;
const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "");
const ORDER_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export interface OrderContact {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
}

export interface OrderLineInput {
  slug: string;
  sizeId: string;
  quantity: number;
}

export interface CheckoutPayload {
  contact?: Partial<OrderContact>;
  items?: OrderLineInput[];
}

export interface OrderLine {
  slug: string;
  name: string;
  size: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ResolvedOrder {
  number: string;
  createdAt: Date;
  contact: OrderContact;
  lines: OrderLine[];
  subtotal: number;
  itemCount: number;
}

/** Raised for any client-supplied data we cannot reconcile. */
export class OrderValidationError extends Error {}

/** SKJ-XXXXXX — collision-resistant enough for hand-filled batches. */
export function generateOrderNumber(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ORDER_CHARS.charAt(Math.floor(Math.random() * ORDER_CHARS.length));
  }
  return `SKJ-${code}`;
}

function requireField(
  value: unknown,
  label: string
): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new OrderValidationError(`${label} is required.`);
  }
}

function resolveContact(raw: Partial<OrderContact> | undefined): OrderContact {
  if (!raw || typeof raw !== "object") {
    throw new OrderValidationError("Contact details are required.");
  }

  const fullName = (raw.fullName ?? "").trim();
  const email = (raw.email ?? "").trim().toLowerCase();
  const phone = (raw.phone ?? "").trim();
  const street = (raw.street ?? "").trim();
  const city = (raw.city ?? "").trim();
  const postalCode = (raw.postalCode ?? "").trim();

  requireField(fullName, "Full name");
  requireField(email, "Email");
  requireField(phone, "Phone");
  requireField(street, "Full address");
  requireField(city, "City");

  if (!EMAIL_RE.test(email)) {
    throw new OrderValidationError("A valid email is required.");
  }
  if (!PHONE_RE.test(normalizePhone(phone))) {
    throw new OrderValidationError("Enter a valid Pakistani mobile number.");
  }

  return { fullName, email, phone, street, city, postalCode };
}

function resolveLines(raw: OrderLineInput[] | undefined): OrderLine[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new OrderValidationError("Your bag is empty.");
  }
  if (raw.length > 50) {
    throw new OrderValidationError("Too many line items.");
  }

  const seen = new Set<string>();
  const lines: OrderLine[] = [];

  for (const entry of raw) {
    const slug = typeof entry?.slug === "string" ? entry.slug : "";
    const sizeId = typeof entry?.sizeId === "string" ? entry.sizeId : "";
    const quantity = Math.floor(Number(entry?.quantity));

    if (
      !slug ||
      !sizeId ||
      !Number.isFinite(quantity) ||
      quantity < 1 ||
      quantity > 99
    ) {
      throw new OrderValidationError("A line item is invalid.");
    }

    const product = getProductBySlug(slug);
    if (!product) {
      throw new OrderValidationError(`Unknown product “${slug}”.`);
    }
    const size = getSize(product, sizeId);
    if (!size) {
      throw new OrderValidationError(`Unknown size for “${product.name}”.`);
    }
    const key = `${slug}:${sizeId}`;
    if (seen.has(key)) {
      throw new OrderValidationError("A product appears more than once.");
    }
    seen.add(key);

    lines.push({
      slug: product.slug,
      name: product.name,
      size: size.label,
      quantity,
      unitPrice: size.price,
      lineTotal: size.price * quantity,
    });
  }

  return lines;
}

export function resolveOrder(payload: unknown): ResolvedOrder {
  if (!payload || typeof payload !== "object") {
    throw new OrderValidationError("Order payload is required.");
  }

  const contact = resolveContact((payload as CheckoutPayload).contact);
  const lines = resolveLines((payload as CheckoutPayload).items);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (subtotal > 5_000_000) {
    throw new OrderValidationError("Order total is unexpectedly large.");
  }

  return {
    number: generateOrderNumber(),
    createdAt: new Date(),
    contact,
    lines,
    subtotal,
    itemCount,
  };
}