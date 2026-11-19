import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateProduct } from "../actions";
import ProductForm from "../product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const product = await db.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-navy/60 transition-colors hover:text-amber-deep"
      >
        ← Back to products
      </Link>
      <h1 className="mt-3 font-display text-4xl font-semibold">
        Edit <em className="italic text-ruby">{product.name}</em>
      </h1>
      <p className="mt-2 text-sm text-navy/50">
        Shop link: /product/{product.slug}
      </p>
      <ProductForm action={updateProduct} product={product} error={error} />
    </div>
  );
}