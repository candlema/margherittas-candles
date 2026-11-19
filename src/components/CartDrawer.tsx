"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { site } from "@/lib/site";

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, setQty, removeItem, clear } =
    useCart();

  // Esc to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello ${site.shortName}! I'd like to order:\n\n${lines
      .map(
        (l) =>
          `• ${l.qty} × ${l.product.name} — ${site.currency}${(
            l.product.price * l.qty
          ).toFixed(2)}`
      )
      .join("\n")}\n\nTotal: ${site.currency}${subtotal.toFixed(2)}\n\nThank you!`
  );

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 h-full w-full cursor-default bg-navy/50 backdrop-blur-sm"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
          <h2 className="font-display text-2xl font-semibold">Your Basket</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-amber"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-navy/30" aria-hidden />
            <p className="font-display text-xl">Your basket is empty</p>
            <p className="text-sm text-navy/60">
              Every enchanted evening starts with a single flame.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 rounded-full bg-navy px-6 py-3 text-sm font-medium uppercase tracking-wider text-cream transition-colors hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              Browse candles
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-navy/10 overflow-y-auto px-6">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sand"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeCart}
                        className="font-display text-lg font-semibold leading-snug hover:text-amber-deep"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="cursor-pointer p-1 text-navy/40 transition-colors hover:text-amber-deep"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                    <p className="text-xs text-navy/50">{product.scentNotes}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 rounded-full border border-navy/15 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="cursor-pointer p-1 transition-colors hover:text-amber-deep"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        <span className="min-w-4 text-center text-sm font-medium">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="cursor-pointer p-1 transition-colors hover:text-amber-deep"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">
                        {site.currency}
                        {(product.price * qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-navy/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-wider text-navy/60">
                  Subtotal
                </p>
                <p className="font-display text-2xl font-semibold">
                  {site.currency}
                  {subtotal.toFixed(2)}
                </p>
              </div>
              <p className="mt-1 text-xs text-navy/50">
                Delivery calculated when we confirm your order.
              </p>
              <a
                href={`https://wa.me/${site.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-full bg-amber px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-amber-deep hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                Order via WhatsApp
              </a>
              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full cursor-pointer text-center text-xs text-navy/50 underline-offset-2 transition-colors hover:text-amber-deep hover:underline"
              >
                Clear basket
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}