import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Safe to re-run — upsert by slug updates existing rows and adds new ones.
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
      "Hand-crafted into a real glass — when the candle is done, wash it out and keep the glass. Zero waste, all charm.",
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
      "Crafted in a classic cocktail glass you can keep and reuse long after the last burn.",
    ],
    burnTime: "40+ hours",
    size: "Cocktail glass",
    featured: true,
  },
  {
    slug: "golden-hour-margarita",
    name: "Golden Hour Margarita",
    scentNotes: "Sweet orange · Vanilla salt · Agave",
    price: 26,
    image: "/images/golden-hour-margarita.jpg",
    shortDescription:
      "A sugar-rimmed classic — golden orange cream with a dried citrus garnish.",
    description: [
      "Golden Hour Margarita captures the best minute of the day — warm, golden orange folded into sweet vanilla cream, finished with a salted rim and a dried orange wheel.",
      "Hand-crafted into an elegant coupe glass that deserves a second life on your shelf.",
    ],
    burnTime: "40+ hours",
    size: "Coupe glass",
    featured: false,
  },
  {
    slug: "pina-colada-sunset",
    name: "Piña Colada Sunset",
    scentNotes: "Pineapple · Coconut cream · Rum warmth",
    price: 26,
    image: "/images/pina-colada-sunset.jpg",
    shortDescription:
      "A tropical sunset in a glass — pineapple, coconut and a flower on top.",
    description: [
      "Piña Colada Sunset is a holiday you can light. Juicy pineapple swirled through rich coconut cream, topped with a swirl of whipped wax and a tropical bloom.",
      "Hand-crafted into a tall hurricane glass — rinse it out after the last burn and keep the vacation going.",
    ],
    burnTime: "45+ hours",
    size: "Hurricane glass",
    featured: false,
  },
  {
    slug: "lime-in-the-coconut",
    name: "Lime in the Coconut",
    scentNotes: "Zesty lime · Coconut flakes · Cane sugar",
    price: 26,
    image: "/images/lime-in-the-coconut.jpg",
    shortDescription:
      "Cool green lime under a snowfall of coconut — fresh, bright, tropical.",
    description: [
      "Lime in the Coconut is the freshest thing we've ever made. Bright zesty lime chilled under a snowfall of coconut flakes, sweetened with a touch of cane sugar.",
      "Hand-crafted into a classic coupe — a glass worth keeping long after the scent is gone.",
    ],
    burnTime: "40+ hours",
    size: "Coupe glass",
    featured: false,
  },
  {
    slug: "whisky-on-the-rocks",
    name: "Whisky on the Rocks",
    scentNotes: "Smoked oak · Amber · Caramel",
    price: 28,
    image: "/images/whisky-on-the-rocks.jpg",
    shortDescription:
      "Warm amber and smoked oak over caramel — complete with wax ice cubes.",
    description: [
      "Whisky on the Rocks is the strong, quiet type. Deep amber and smoked oak mellowed with golden caramel — poured over wax ice cubes that never melt.",
      "Hand-crafted into a weighted tumbler glass. Masculine, warm, and impossible to forget.",
    ],
    burnTime: "45+ hours",
    size: "Whisky tumbler",
    featured: false,
  },
  {
    slug: "peppermint-candy-cane",
    name: "Peppermint Candy Cane",
    scentNotes: "Peppermint · Vanilla frosting · Winter berries",
    price: 22,
    image: "/images/peppermint-candy-cane.jpg",
    shortDescription:
      "Christmas in a glass — cool peppermint under whipped vanilla frosting.",
    description: [
      "Peppermint Candy Cane is pure holiday cheer. Cool, crisp peppermint swirled through sweet vanilla frosting, finished with a sprinkle of winter berries and a candy cane curl.",
      "A limited seasonal pour — when it's gone, it's gone until next Christmas.",
    ],
    burnTime: "35+ hours",
    size: "Dessert glass",
    featured: false,
  },
  {
    slug: "petal-purse-bouquet",
    name: "Petal Purse Bouquet",
    scentNotes: "Peony · Rose water · Soft musk",
    price: 45,
    image: "/images/petal-purse-bouquet.jpg",
    shortDescription:
      "A bouquet that never wilts — blush and cream blooms in a keepsake purse.",
    description: [
      "The Petal Purse Bouquet is our most giftable piece yet — hand-sculpted peonies and roses in blush pink and cream, arranged in an elegant keepsake purse with a golden chain.",
      "Every petal is hand-crafted wax, scented with peony, rose water and a whisper of soft musk. The purse stays as a decoration long after the candles are enjoyed.",
    ],
    burnTime: "Decorative set",
    size: "Keepsake purse",
    featured: false,
  },
  {
    slug: "midnight-rose-purse",
    name: "Midnight Rose Purse",
    scentNotes: "Black rose · Plum · Velvet oud",
    price: 45,
    image: "/images/midnight-rose-purse.jpg",
    shortDescription:
      "Dramatic black and blush roses in a chic black purse — bold and romantic.",
    description: [
      "Midnight Rose Purse is for the bold ones. Sculpted black dahlias and blush roses arranged in a sleek black keepsake purse with a gold chain — dramatic, romantic, unforgettable.",
      "Hand-sculpted wax blooms scented with black rose, dark plum and velvet oud.",
    ],
    burnTime: "Decorative set",
    size: "Keepsake purse",
    featured: false,
  },
  {
    slug: "sunshine-bloom-pot",
    name: "Sunshine Bloom Pot",
    scentNotes: "Daisy fields · Honey · Green stems",
    price: 35,
    image: "/images/sunshine-bloom-pot.jpg",
    shortDescription:
      "A golden chrysanthemum and rose arrangement in a textured white pot.",
    description: [
      "Sunshine Bloom Pot is pure morning light — a golden chrysanthemum surrounded by cream roses in a textured white ceramic pot, finished with a little butterfly visitor.",
      "Hand-crafted wax blooms scented with daisy fields, warm honey and fresh green stems.",
    ],
    burnTime: "Decorative set",
    size: "Ceramic pot",
    featured: false,
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