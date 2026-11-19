import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { site } from "@/lib/site";
import { deleteProduct } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const products = await db.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy"
        >
          + Add a candle
        </Link>
      </div>

      {saved && (
        <p className="mt-6 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
          Saved — the shop is updated.
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy/10 text-xs uppercase tracking-wider text-navy/50">
              <th className="px-5 py-4">Candle</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Featured</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-navy/50">/product/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-medium">
                  {site.currency}
                  {p.price.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  {p.featured ? (
                    <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold text-amber-deep">
                      On homepage
                    </span>
                  ) : (
                    <span className="text-navy/40">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="rounded-full border border-navy/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-amber-deep hover:text-amber-deep"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="cursor-pointer rounded-full border border-ruby/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ruby transition-colors hover:bg-ruby hover:text-cream"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-navy/60">
            No candles yet — add your first one.
          </p>
        )}
      </div>
    </div>
  );
}