import { db } from "@/lib/db";

// Products now live in the database — the client manages them from /admin.
// This type keeps every existing component working unchanged.
export type Product = {
  id: string;
  slug: string;
  name: string;
  scentNotes: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string[];
  burnTime: string;
  size: string;
  featured: boolean;
};

export async function getProducts(): Promise<Product[]> {
  return db.product.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return db.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getProduct(slug: string): Promise<Product | null> {
  return db.product.findUnique({ where: { slug } });
}