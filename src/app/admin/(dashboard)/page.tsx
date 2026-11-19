import { db } from "@/lib/db";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-amber/20 text-amber-deep",
  fulfilled: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-ruby/10 text-ruby line-through",
};

export default async function AdminOverview() {
  const [revenueAgg, orderCount, itemsSold, bestSellers, recent, sixMonthsAgo] =
    await Promise.all([
      db.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "cancelled" } },
      }),
      db.order.count({ where: { status: { not: "cancelled" } } }),
      db.orderItem.aggregate({
        _sum: { quantity: true },
        where: { order: { status: { not: "cancelled" } } },
      }),
      db.orderItem.groupBy({
        by: ["name"],
        _sum: { quantity: true },
        where: { order: { status: { not: "cancelled" } } },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
      db.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),
      Promise.resolve(
        (() => {
          const d = new Date();
          d.setDate(1);
          d.setMonth(d.getMonth() - 5);
          d.setHours(0, 0, 0, 0);
          return d;
        })()
      ),
    ]);

  const recentOrders = await db.order.findMany({
    where: { createdAt: { gte: sixMonthsAgo }, status: { not: "cancelled" } },
    select: { createdAt: true, total: true },
  });

  // Bucket revenue into the last 6 calendar months
  const months: { label: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    months.push({
      label: d.toLocaleString("en", { month: "short" }),
      total: 0,
    });
  }
  for (const o of recentOrders) {
    const idx =
      (o.createdAt.getFullYear() - new Date().getFullYear()) * 12 +
      (o.createdAt.getMonth() - new Date().getMonth()) +
      5;
    if (idx >= 0 && idx < 6) months[idx].total += o.total;
  }
  const maxMonth = Math.max(...months.map((m) => m.total), 1);

  const stats = [
    {
      label: "Revenue",
      value: `${site.currency}${(revenueAgg._sum.total ?? 0).toFixed(2)}`,
    },
    { label: "Orders", value: String(orderCount) },
    { label: "Candles sold", value: String(itemsSold._sum.quantity ?? 0) },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold">Overview</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-navy/50">
              {s.label}
            </p>
            <p className="mt-2 font-display text-4xl font-semibold">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Revenue by month */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-navy/60">
            Revenue — last 6 months
          </h2>
          <div className="mt-6 flex h-40 items-stretch gap-3">
            {months.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-navy/60">
                  {m.total > 0 ? `${site.currency}${Math.round(m.total)}` : ""}
                </span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md ${m.total > 0 ? "bg-amber" : "bg-navy/10"}`}
                    style={{ height: `${Math.max((m.total / maxMonth) * 100, 3)}%` }}
                  />
                </div>
                <span className="text-xs uppercase text-navy/50">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best sellers */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-navy/60">
            Best sellers
          </h2>
          {bestSellers.length === 0 ? (
            <p className="mt-6 text-sm text-navy/60">
              No sales yet — log your first one on the Orders page.
            </p>
          ) : (
            <ol className="mt-4 space-y-3">
              {bestSellers.map((b, i) => (
                <li key={b.name} className="flex items-center gap-3 text-sm">
                  <span className="font-script text-2xl text-amber-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-medium">{b.name}</span>
                  <span className="text-navy/60">{b._sum.quantity} sold</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-navy/60">
          Recent sales
        </h2>
        {recent.length === 0 ? (
          <p className="mt-6 text-sm text-navy/60">
            Nothing here yet — sales you log will show up here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-navy/10">
            {recent.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                <span className="font-medium">{o.customerName}</span>
                <span className="text-navy/50">
                  {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                </span>
                <span className="ml-auto font-semibold">
                  {site.currency}
                  {o.total.toFixed(2)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[o.status] ?? ""}`}
                >
                  {o.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}