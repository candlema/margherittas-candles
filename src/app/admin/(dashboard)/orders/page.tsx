import { db } from "@/lib/db";
import { site } from "@/lib/site";
import { createOrder, deleteOrder, setOrderStatus } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-amber/20 text-amber-deep",
  fulfilled: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-ruby/10 text-ruby line-through",
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-amber-deep";
const labelClass =
  "text-xs font-medium uppercase tracking-wider text-navy/60";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const [products, orders] = await Promise.all([
    db.product.findMany({ orderBy: { createdAt: "asc" } }),
    db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold">Orders</h1>
      <p className="mt-2 max-w-xl text-sm text-navy/60">
        Customers order through WhatsApp — when one pays, log the sale here so
        your stats stay up to date.
      </p>

      {saved && (
        <p className="mt-6 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
          Sale logged.
        </p>
      )}
      {error === "name" && (
        <p className="mt-6 rounded-lg bg-ruby/10 px-4 py-3 text-sm font-medium text-ruby">
          Please add the customer&rsquo;s name.
        </p>
      )}
      {error === "items" && (
        <p className="mt-6 rounded-lg bg-ruby/10 px-4 py-3 text-sm font-medium text-ruby">
          Choose at least one candle with a quantity above 0.
        </p>
      )}

      {/* ── Log a sale ─────────────────────────────────── */}
      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-semibold">
          Log a <em className="italic text-ruby">sale</em>
        </h2>
        <form action={createOrder} className="mt-5 space-y-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="customerName" className={labelClass}>
                Customer name
              </label>
              <input
                id="customerName"
                name="customerName"
                required
                placeholder="Ama K."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="WhatsApp number"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="status" className={labelClass}>
                Status
              </label>
              <select id="status" name="status" className={inputClass}>
                <option value="paid">Paid</option>
                <option value="fulfilled">Fulfilled (collected/delivered)</option>
              </select>
            </div>
          </div>

          <div>
            <p className={labelClass}>Candles in this sale</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <label
                  key={p.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-navy/15 px-4 py-3 text-sm transition-colors hover:border-amber"
                >
                  <span>
                    <span className="font-medium">{p.name}</span>
                    <span className="block text-xs text-navy/50">
                      {site.currency}
                      {p.price.toFixed(2)}
                    </span>
                  </span>
                  <input
                    type="number"
                    name={`qty_${p.id}`}
                    min="0"
                    defaultValue="0"
                    aria-label={`Quantity of ${p.name}`}
                    className="w-16 rounded-md border border-navy/20 px-2 py-1.5 text-center outline-none focus:border-amber-deep"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="note" className={labelClass}>
              Note (optional)
            </label>
            <input
              id="note"
              name="note"
              placeholder="e.g. birthday gift, deliver Friday"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-full bg-navy px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy"
          >
            Log sale
          </button>
        </form>
      </section>

      {/* ── Orders table ───────────────────────────────── */}
      <section className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy/10 text-xs uppercase tracking-wider text-navy/50">
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/5">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-5 py-4 text-navy/60">
                  {o.createdAt.toLocaleDateString("en", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium">{o.customerName}</p>
                  {o.phone && <p className="text-xs text-navy/50">{o.phone}</p>}
                  {o.note && (
                    <p className="text-xs italic text-navy/50">{o.note}</p>
                  )}
                </td>
                <td className="px-5 py-4 text-navy/70">
                  {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                </td>
                <td className="px-5 py-4 font-semibold">
                  {site.currency}
                  {o.total.toFixed(2)}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[o.status] ?? ""}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <form action={setOrderStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={o.id} />
                      <select
                        name="status"
                        defaultValue={o.status}
                        aria-label="Order status"
                        className="rounded-md border border-navy/20 px-2 py-1.5 text-xs outline-none"
                      >
                        <option value="paid">Paid</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        type="submit"
                        className="cursor-pointer rounded-full border border-navy/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-amber-deep hover:text-amber-deep"
                      >
                        Set
                      </button>
                    </form>
                    <form action={deleteOrder}>
                      <input type="hidden" name="id" value={o.id} />
                      <button
                        type="submit"
                        className="cursor-pointer rounded-full border border-ruby/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ruby transition-colors hover:bg-ruby hover:text-cream"
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
        {orders.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-navy/60">
            No sales logged yet — use the form above when the first WhatsApp
            order pays.
          </p>
        )}
      </section>
    </div>
  );
}