import Image from "next/image";
import Link from "next/link";
import { GlassWater, Hand, MapPin, Sparkles } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const trail = [
  "Hand-crafted",
  "Candle Cocktails",
  "Dessert Candles",
  "Small Batch",
  "Keep the Glass",
  "Made with Love",
];

const values = [
  {
    icon: GlassWater,
    title: "Good Enough to Drink",
    text: "Candles poured into real dessert and cocktail glasses — they look delicious, and smell even better.",
  },
  {
    icon: Hand,
    title: "Hand-crafted in Small Batches",
    text: "Every single candle is blended, poured and finished by hand in our shop. No two are exactly alike.",
  },
  {
    icon: MapPin,
    title: "A Real Shop You Can Visit",
    text: "Come smell the whole shelf in person — our little shop is full of colour, glitter and enchantment.",
  },
];

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="grid min-h-dvh md:grid-cols-2">
        <div className="flex flex-col justify-center px-5 pb-16 pt-32 md:px-12 md:pt-24 lg:px-16">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-amber-deep">
            <Sparkles className="h-4 w-4" aria-hidden />
            Hand-crafted candle cocktails &amp; desserts
          </p>
          <h1 className="mt-6">
            <span className="block font-script text-6xl leading-tight text-navy md:text-8xl">
              Margherita&rsquo;s
            </span>
            <span className="mt-2 block font-display text-3xl font-semibold uppercase tracking-[0.2em] text-amber-deep md:text-4xl">
              Enchanted Candles
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/70">
            Candles that look good enough to drink. Dessert and
            cocktail-inspired creations, Hand-crafted into real glasses you
            keep forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/shop"
              className="rounded-full bg-amber px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-navy hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Shop the collection
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium uppercase tracking-wider text-ruby underline-offset-8 transition-colors hover:underline"
            >
              Our story
            </Link>
          </div>
        </div>

        <div className="relative min-h-[55vh] md:min-h-0">
          <Image
            src="/images/lemon-drop.jpg"
            alt="Enchanted Lemon Drop dessert candles topped with whipped cream and lemon"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Gold marquee ─────────────────────────────────── */}
      <section
        aria-label="What we make"
        className="overflow-hidden border-y border-navy/10 bg-amber py-4"
      >
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...trail, ...trail].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 font-display text-lg italic text-navy"
            >
              {item}
              <Sparkles className="h-3.5 w-3.5 text-cream" aria-hidden />
            </span>
          ))}
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-deep">
              The collection
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Tonight&rsquo;s <em className="italic text-ruby">specials</em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium uppercase tracking-wider text-navy underline-offset-8 transition-colors hover:text-amber-deep hover:underline"
          >
            View all candles →
          </Link>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Story teaser (dark section) ──────────────────── */}
      <section className="bg-navy text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/shop-counter.jpg"
              alt="Inside Margherita's shop — shelves of candle cocktails and the giant martini glass"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber">
              Our story
            </p>
            <h2 className="mt-4 font-script text-5xl leading-tight text-amber md:text-6xl">
              Step inside the magic
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cream/75">
              Behind our doors you&rsquo;ll find shelves of candle cocktails,
              dessert glasses that smell like heaven, and one very famous
              giant martini glass. Every candle is poured right here — by
              hand, with love, and a little bit of glitter.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border border-amber/60 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-3 md:px-8 md:py-28">
          {values.map((v) => (
            <div key={v.title} className="max-w-sm">
              <v.icon className="h-7 w-7 text-amber-deep" aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-semibold">
                {v.title}
              </h3>
              <p className="mt-3 leading-relaxed text-navy/70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 text-center md:px-8 md:py-32">
        <h2 className="mx-auto max-w-3xl font-script text-5xl leading-tight text-navy md:text-7xl">
          Which one is calling <span className="text-amber-deep">your name?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-navy/70">
          Every glass is a candle, every candle is a little celebration.
        </p>
        <Link
          href="/shop"
          className="mt-10 inline-block rounded-full bg-navy px-10 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
        >
          Explore the shop
        </Link>
      </section>
    </>
  );
}