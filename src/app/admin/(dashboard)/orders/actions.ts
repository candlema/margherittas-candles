"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

const STATUSES = ["paid", "fulfilled", "cancelled"];

export async function createOrder(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const customerName = String(formData.get("customerName") ?? "").trim();
  if (!customerName) redirect("/admin/orders?error=name");

  const statusRaw = String(formData.get("status") ?? "paid");
  const status = STATUSES.includes(statusRaw) ? statusRaw : "paid";

  // Build items from the qty_<productId> inputs, priced from the database
  const products = await db.product.findMany();
  const items = products
    .map((p) => ({
      productId: p.id,
      name: p.name,
      price: p.price,
      quantity: Math.max(0, Math.floor(Number(formData.get(`qty_${p.id}`)) || 0)),
    }))
    .filter((i) => i.quantity > 0);

  if (items.length === 0) redirect("/admin/orders?error=items");

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  await db.order.create({
    data: {
      customerName,
      phone: String(formData.get("phone") ?? "").trim() || null,
      note: String(formData.get("note") ?? "").trim() || null,
      status,
      total,
      items: { create: items },
    },
  });
  redirect("/admin/orders?saved=1");
}

export async function setOrderStatus(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const statusRaw = String(formData.get("status") ?? "");
  if (STATUSES.includes(statusRaw)) {
    await db.order.update({ where: { id }, data: { status: statusRaw } });
  }
  redirect("/admin/orders");
}

export async function deleteOrder(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  await db.order.delete({ where: { id } }).catch(() => {});
  redirect("/admin/orders");
}