"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { site } from "@/lib/site";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-2xl bg-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="font-display text-2xl font-semibold leading-tight transition-colors hover:text-amber-deep"
          >
            {product.name}
          </Link>
          <p className="pt-1 text-lg font-medium">
            {site.currency}
            {product.price.toFixed(2)}
          </p>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-navy/50">
          {product.scentNotes}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy/70">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add to basket
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-medium uppercase tracking-wider text-navy/60 underline-offset-4 transition-colors hover:text-amber-deep hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}