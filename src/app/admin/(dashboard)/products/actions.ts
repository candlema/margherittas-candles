"use server";

import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { db } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "candle"
  );
}

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  for (let i = 2; await db.product.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`;
  }
  return slug;
}

async function uploadImage(file: File | null): Promise<string | null | "error"> {
  if (!file || file.size === 0) return null;
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  try {
    const blob = await put(`products/${Date.now()}-${safeName}`, file, {
      access: "public",
    });
    return blob.url;
  } catch {
    // Usually means BLOB_READ_WRITE_TOKEN is missing or invalid
    return "error";
  }
}

async function maybeDeleteBlob(url: string): Promise<void> {
  if (!url.includes("blob.vercel-storage.com")) return;
  try {
    await del(url);
  } catch {
    // Old photo already gone — not worth failing the request over
  }
}

function readFields(formData: FormData) {
  const description = String(formData.get("description") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    name: String(formData.get("name") ?? "").trim(),
    price: Number(formData.get("price") ?? 0),
    scentNotes: String(formData.get("scentNotes") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description,
    burnTime: String(formData.get("burnTime") ?? "").trim(),
    size: String(formData.get("size") ?? "").trim(),
    featured: formData.get("featured") === "on",
  };
}

function invalid(data: ReturnType<typeof readFields>): string | null {
  if (!data.name) return "name";
  if (!(data.price > 0)) return "price";
  if (data.description.length === 0) return "description";
  return null;
}

export async function createProduct(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const data = readFields(formData);
  if (invalid(data)) redirect("/admin/products/new?error=fields");

  const image = await uploadImage(formData.get("image") as File | null);
  if (image === "error") redirect("/admin/products/new?error=upload");
  if (!image) redirect("/admin/products/new?error=image");

  await db.product.create({
    data: { ...data, image, slug: await uniqueSlug(data.name) },
  });
  redirect("/admin/products?saved=1");
}

export async function updateProduct(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const existing = await db.product.findUnique({ where: { id } });
  if (!existing) redirect("/admin/products");

  const data = readFields(formData);
  if (invalid(data)) redirect(`/admin/products/${id}?error=fields`);

  const newImage = await uploadImage(formData.get("image") as File | null);
  if (newImage === "error") redirect(`/admin/products/${id}?error=upload`);
  if (newImage) await maybeDeleteBlob(existing.image);

  await db.product.update({
    where: { id },
    data: { ...data, image: newImage ?? existing.image },
  });
  redirect("/admin/products?saved=1");
}

export async function deleteProduct(formData: FormData) {
  if (!(await isAuthed())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const existing = await db.product.findUnique({ where: { id } });
  if (existing) {
    await maybeDeleteBlob(existing.image);
    await db.product.delete({ where: { id } });
  }
  redirect("/admin/products");
}