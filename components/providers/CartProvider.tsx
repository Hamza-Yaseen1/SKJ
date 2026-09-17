"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getProductBySlug,
  getSize,
  type Product,
  type ProductSize,
} from "@/lib/products";

/** A resolved cart line — product + chosen size + quantity. */
export interface CartLine {
  product: Product;
  size: ProductSize;
  quantity: number;
  lineTotal: number;
}

interface CartContextValue {
  /** Resolved lines (unknown/removed products are filtered out). */
  items: CartLine[];
  /** Persisted cart rows (what is stored in localStorage). */
  entries: CartEntry[];
  /** Total units across all lines. */
  count: number;
  /** Sum of line prices before shipping. */
  subtotal: number;
  /** True once rendered/hydrated in the browser. */
  hydrated: boolean;
  add: (slug: string, sizeId: string, quantity?: number) => void;
  updateQuantity: (slug: string, sizeId: string, quantity: number) => void;
  removeItem: (slug: string, sizeId: string) => void;
  clear: () => void;
}

export interface CartEntry {
  slug: string;
  sizeId: string;
  quantity: number;
}

type Entry = CartEntry;

const STORAGE_KEY = "skj.cart.v2";
const MAX_QTY = 99;

const sameLine = (entry: Entry, slug: string, sizeId: string) =>
  entry.slug === slug && entry.sizeId === sizeId;

/* ─────────────────────────────────────────────────────────────
   Tiny external store, persisted to localStorage.
   Source of truth is the `snapshot` array below; mutations
   replace it with a fresh reference (so useSyncExternalStore can
   diff), write to storage, and notify subscribers.
   ───────────────────────────────────────────────────────────── */

const EMPTY: Entry[] = [];
type Listener = () => void;

let snapshot: Entry[] = readStorage();
const listeners = new Set<Listener>();

function isValidEntry(value: unknown): value is Entry {
  if (!value || typeof value !== "object") return false;
  const { slug, sizeId, quantity } = value as Partial<Entry>;
  if (typeof slug !== "string" || typeof sizeId !== "string") return false;
  if (!Number.isInteger(quantity) || (quantity as number) <= 0) return false;
  const product = getProductBySlug(slug);
  return Boolean(product && getSize(product, sizeId));
}

function readStorage(): Entry[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed
      .filter(isValidEntry)
      .map((e) => ({
        slug: e.slug,
        sizeId: e.sizeId,
        quantity: Math.min(e.quantity, MAX_QTY),
      }));
  } catch {
    // Corrupt storage — start fresh.
    return EMPTY;
  }
}

function commit(next: Entry[]): void {
  snapshot = next;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Storage full or blocked — cart still works for the session.
  }
  listeners.forEach((listener) => listener());
}

function getSnapshot(): Entry[] {
  return snapshot;
}

/** SSR/hydration baseline — the server always renders an empty cart. */
function getServerSnapshot(): Entry[] {
  return EMPTY;
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  if (typeof window === "undefined") {
    return () => listeners.delete(listener);
  }
  // Stay in sync across browser tabs.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      const next = readStorage();
      if (next !== snapshot) {
        snapshot = next;
        listeners.forEach((l) => l());
      }
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function addEntry(slug: string, sizeId: string, quantity = 1): void {
  const product = getProductBySlug(slug);
  if (!product || !getSize(product, sizeId)) return;

  const qty = Math.max(1, Math.min(quantity, MAX_QTY));
  const existing = snapshot.find((e) => sameLine(e, slug, sizeId));
  commit(
    existing
      ? snapshot.map((e) =>
          sameLine(e, slug, sizeId)
            ? { ...e, quantity: Math.min(e.quantity + qty, MAX_QTY) }
            : e
        )
      : [...snapshot, { slug, sizeId, quantity: qty }]
  );
}

function updateEntry(slug: string, sizeId: string, quantity: number): void {
  const next = quantity < 1 ? 1 : Math.min(quantity, MAX_QTY);
  commit(
    snapshot.map((e) => (sameLine(e, slug, sizeId) ? { ...e, quantity: next } : e))
  );
}

function removeEntry(slug: string, sizeId: string): void {
  commit(snapshot.filter((e) => !sameLine(e, slug, sizeId)));
}

function clearEntries(): void {
  commit([]);
}

/* ───────────────────────────────────────────────────────────── */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // False on the server and during hydration, true afterwards — lets child
  // components gate rendering on persistence data without a hydration flash.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const items = useMemo<CartLine[]>(
    () =>
      entries.flatMap((entry) => {
        const product = getProductBySlug(entry.slug);
        if (!product) return [];
        const size = getSize(product, entry.sizeId);
        if (!size) return [];
        return [
          {
            product,
            size,
            quantity: entry.quantity,
            lineTotal: size.price * entry.quantity,
          },
        ];
      }),
    [entries]
  );

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of items) {
      count += line.quantity;
      subtotal += line.lineTotal;
    }
    return { count, subtotal };
  }, [items]);

  const add = useCallback(
    (slug: string, sizeId: string, quantity = 1) => addEntry(slug, sizeId, quantity),
    []
  );
  const updateQuantity = useCallback(
    (slug: string, sizeId: string, quantity: number) =>
      updateEntry(slug, sizeId, quantity),
    []
  );
  const removeItem = useCallback(
    (slug: string, sizeId: string) => removeEntry(slug, sizeId),
    []
  );
  const clear = useCallback(() => clearEntries(), []);

  const value = useMemo<CartContextValue>(
    () => ({ items, entries, count, subtotal, hydrated, add, updateQuantity, removeItem, clear }),
    [items, entries, count, subtotal, hydrated, add, updateQuantity, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a <CartProvider>.");
  }
  return context;
}
