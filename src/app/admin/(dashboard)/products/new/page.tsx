import Link from "next/link";
import { createProduct } from "../actions";
import ProductForm from "../product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-navy/60 transition-colors hover:text-amber-deep"
      >
        ← Back to products
      </Link>
      <h1 className="mt-3 font-display text-4xl font-semibold">
        Add a <em className="italic text-ruby">candle</em>
      </h1>
      <ProductForm action={createProduct} error={error} />
    </div>
  );
}