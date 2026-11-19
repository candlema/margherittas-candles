import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// The three launch products — safe to re-run (upsert by slug).
const items = [
  {
    slug: "enchanted-lemon-drop",
    name: "Enchanted Lemon Drop",
    scentNotes: "Fresh lemon · Vanilla cream · Crumble",
    price: 25,
    image: "/images/lemon-drop.jpg",
    shortDescription:
      "A slice of sunshine — zesty lemon under a cloud of whipped vanilla cream.",
    description: [
      "Our Enchanted Lemon Drop looks like dessert and smells like heaven. Bright, zesty lemon rises through layers of whipped vanilla cream and a buttery crumble base.",
      "Hand-poured into a real glass — when the candle is done, wash it out and keep the glass. Zero waste, all charm.",
    ],
    burnTime: "40+ hours",
    size: "Dessert glass",
    featured: true,
  },
  {
    slug: "blueberry-bliss",
    name: "Blueberry Bliss Parfait",
    scentNotes: "Blueberry · Sweet cream · Biscuit",
    price: 26,
    image: "/images/blueberry-bliss.jpg",
    shortDescription:
      "Juicy blueberries swirled through sweet cream over a biscuit crumble.",
    description: [
      "Blueberry Bliss is the crowd favourite — deep, juicy blueberry swirled through clouds of sweet cream, finished with a buttery biscuit crumble.",
      "It looks like a parfait, pours like a dream, and fills the room with the scent of a bakery at its best hour.",
    ],
    burnTime: "40+ hours",
    size: "Dessert glass",
    featured: true,
  },
  {
    slug: "mint-mojito-magic",
    name: "Mint Mojito Magic",
    scentNotes: "Fresh mint · Lime · Sugar",
    price: 25,
    image: "/images/mint-mojito.jpg",
    shortDescription:
      "The freshest pour on the shelf — crushed mint, lime and sweet sugar.",
    description: [
      "Mint Mojito Magic is happy hour in a glass. Crushed fresh mint and bright lime over a swirl of sweet sugar — cool, green and completely enchanting.",
      "Poured in a classic cocktail glass you can keep and reuse long after the last burn.",
    ],
    burnTime: "40+ hours",
    size: "Cocktail glass",
    featured: true,
  },
];

async function main() {
  for (const p of items) {
    await db.product.upsert({ where: { slug: p.slug }, update: p, create: p });
    console.log(`seeded: ${p.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());