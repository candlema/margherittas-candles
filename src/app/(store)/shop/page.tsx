import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop — Margherita's Enchanted Candles",
  description:
    "Browse the full candle menu — dessert and cocktail candles Hand-crafted into real glasses you keep forever.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-deep">
        The full collection
      </p>
      <h1 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
        The candle <em className="italic text-ruby">menu</em>
      </h1>
      <p className="mt-5 max-w-lg text-lg text-navy/70">
        Dessert and cocktail candles, Hand-crafted into real glasses.
        Pick your pour — every one smells as good as it looks.
      </p>

      {products.length === 0 ? (
        <p className="mt-16 font-display text-2xl italic text-navy/60">
          New candles are being poured right now — check back soon.
        </p>
      ) : (
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}