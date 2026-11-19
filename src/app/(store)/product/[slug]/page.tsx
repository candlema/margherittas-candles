import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Flame, Package, Timer } from "lucide-react";
import { getProduct, getProducts } from "@/lib/products";
import { site } from "@/lib/site";
import AddToCartPanel from "@/components/AddToCartPanel";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Margherita's Enchanted Candles`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const others = (await getProducts())
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-navy/60 transition-colors hover:text-amber-deep"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to shop
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-deep">
            {product.scentNotes}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-3xl">
            {site.currency}
            {product.price.toFixed(2)}
          </p>

          <div className="mt-6 space-y-4 leading-relaxed text-navy/75">
            {product.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-navy/10 py-6 text-sm">
            <div className="flex items-center gap-3">
              <Timer className="h-4 w-4 shrink-0 text-amber-deep" aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy/50">
                  Burn time
                </dt>
                <dd className="font-medium">{product.burnTime}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 shrink-0 text-amber-deep" aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy/50">
                  Size
                </dt>
                <dd className="font-medium">{product.size}</dd>
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <Flame className="h-4 w-4 shrink-0 text-amber-deep" aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-wider text-navy/50">
                  Made with
                </dt>
                <dd className="font-medium">
                  100% natural soy wax · crackling wooden wick · phthalate-free
                  fragrance
                </dd>
              </div>
            </div>
          </dl>

          <AddToCartPanel product={product} />
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            You may also <em className="italic">love</em>
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}