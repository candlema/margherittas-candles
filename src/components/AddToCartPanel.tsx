"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartPanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-4 rounded-full border border-navy/20 px-4 py-3">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="cursor-pointer p-1 transition-colors hover:text-amber-deep"
        >
          <Minus className="h-4 w-4" aria-hidden />
        </button>
        <span className="min-w-6 text-center text-lg font-medium">{qty}</span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="cursor-pointer p-1 transition-colors hover:text-amber-deep"
        >
          <Plus className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          addItem(product, qty);
          setQty(1);
        }}
        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber sm:flex-none"
      >
        <ShoppingBag className="h-4 w-4" aria-hidden />
        Add to basket
      </button>
    </div>
  );
}