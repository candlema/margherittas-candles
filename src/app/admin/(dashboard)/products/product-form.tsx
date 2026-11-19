import Image from "next/image";
import type { Product } from "@/lib/products";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-amber-deep";
const labelClass =
  "text-xs font-medium uppercase tracking-wider text-navy/60";

// Plain HTML form + server action — works even with JavaScript disabled.
export default function ProductForm({
  action,
  product,
  error,
}: {
  action: (formData: FormData) => Promise<void>;
  product?: Product;
  error?: string;
}) {
  return (
    <form action={action} className="mt-8 grid gap-8 lg:grid-cols-3">
      {product && <input type="hidden" name="id" value={product.id} />}

      {error === "fields" && (
        <p className="rounded-lg bg-ruby/10 px-4 py-3 text-sm font-medium text-ruby lg:col-span-3">
          Please fill in the name, a price above 0, and at least one
          description paragraph.
        </p>
      )}
      {error === "image" && (
        <p className="rounded-lg bg-ruby/10 px-4 py-3 text-sm font-medium text-ruby lg:col-span-3">
          Please choose a product photo.
        </p>
      )}
      {error === "upload" && (
        <p className="rounded-lg bg-ruby/10 px-4 py-3 text-sm font-medium text-ruby lg:col-span-3">
          The photo upload failed — ask your developer to check the Vercel Blob
          token, then try again.
        </p>
      )}

      <div className="space-y-5 lg:col-span-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={product?.name}
            placeholder="Enchanted Lemon Drop"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className={labelClass}>
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={product?.price}
              placeholder="25"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="size" className={labelClass}>
              Size / glass
            </label>
            <input
              id="size"
              name="size"
              defaultValue={product?.size}
              placeholder="Dessert glass"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="scentNotes" className={labelClass}>
              Scent notes
            </label>
            <input
              id="scentNotes"
              name="scentNotes"
              defaultValue={product?.scentNotes}
              placeholder="Fresh lemon · Vanilla cream · Crumble"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="burnTime" className={labelClass}>
              Burn time
            </label>
            <input
              id="burnTime"
              name="burnTime"
              defaultValue={product?.burnTime}
              placeholder="40+ hours"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="shortDescription" className={labelClass}>
            Short description (shown on cards)
          </label>
          <input
            id="shortDescription"
            name="shortDescription"
            defaultValue={product?.shortDescription}
            placeholder="A slice of sunshine — zesty lemon under whipped vanilla cream."
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Full description (blank line between paragraphs)
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            defaultValue={product?.description.join("\n\n")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="image" className={labelClass}>
            Product photo
          </label>
          {product && (
            <span className="relative mt-1.5 block aspect-square w-full overflow-hidden rounded-lg bg-sand">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="300px"
                className="object-cover"
              />
            </span>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required={!product}
            className="mt-1.5 block w-full text-sm text-navy/70 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-navy file:px-5 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-cream hover:file:bg-amber hover:file:text-navy"
          />
          <p className="mt-2 text-xs text-navy/50">
            {product
              ? "Leave empty to keep the current photo."
              : "A square-ish photo works best."}
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            className="h-4 w-4 accent-[#c9a227]"
          />
          <span>
            <span className="font-medium">Feature on the homepage</span>
            <span className="block text-xs text-navy/50">
              Shown under &ldquo;Tonight&rsquo;s specials&rdquo;
            </span>
          </span>
        </label>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-full bg-navy py-3.5 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy"
        >
          {product ? "Save changes" : "Add candle"}
        </button>
      </div>
    </form>
  );
}