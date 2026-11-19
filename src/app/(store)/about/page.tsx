import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — Margherita's Enchanted Candles",
  description:
    "Step inside Margherita's Enchanted Candles — a little shop full of candle cocktails, dessert candles, glitter and magic.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-deep">
          Our story
        </p>
        <h1 className="mt-3 font-script text-6xl leading-tight text-navy md:text-7xl">
          Welcome to the enchanted shelf
        </h1>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl items-start gap-12 px-5 md:grid-cols-5 md:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-2">
          <Image
            src="/images/shop-shelves.jpg"
            alt="Shelves of Hand-crafted candles inside Margherita's Enchanted Candles shop"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-navy/75 md:col-span-3">
          <p>
            Margherita&rsquo;s Enchanted Candles is not your ordinary candle
            shop. It&rsquo;s a place where dessert meets daylight, where every
            candle is poured into a real glass, and where the whole shelf
            smells like a bakery and a cocktail bar fell in love.
          </p>
          <p>
            Every candle starts as molten wax, fragrance and a little
            imagination — blended, layered and topped by hand until it looks
            like something you&rsquo;d order at a café. Whipped-cream swirls,
            crumbly bases, tiny fruit details: all wax, all enchanted.
          </p>
          <p>
            And when the candle has burned its last? The glass stays with you.
            Wash it, keep it, pour yourself something nice — that&rsquo;s the
            kind of magic we believe in.
          </p>
          <p className="font-script text-4xl text-navy">
            Come say hello — the kettle of wax is always warm.
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-navy/50">
            — Margherita, founder &amp; candle maker
          </p>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block rounded-full bg-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              Browse the candles
            </Link>
          </div>
        </div>
      </div>

      {/* Second shop photo band */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-[21/9]">
          <Image
            src="/images/shop-counter.jpg"
            alt="The counter at Margherita's Enchanted Candles, with the famous giant martini glass"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Process strip */}
      <section className="mt-24 bg-navy text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-3 md:px-8">
          {[
            {
              step: "Blend",
              text: "Fragrance meets molten wax at exactly the right temperature — every scent balanced by hand.",
            },
            {
              step: "Pour & Build",
              text: "Layers, swirls and crumbles go into the glass one by one, just like building a real dessert.",
            },
            {
              step: "Top it off",
              text: "Whipped wax cream, tiny wax fruit, a final dusting of love — then it earns a place on the shelf.",
            },
          ].map((s, i) => (
            <div key={s.step}>
              <p className="font-script text-5xl text-amber">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold">
                {s.step}
              </h2>
              <p className="mt-3 leading-relaxed text-cream/70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}