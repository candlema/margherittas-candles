import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import CopyrightYear from "@/components/CopyrightYear";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="relative block w-56 aspect-[655/258] overflow-hidden rounded-lg">
            <Image
              src="/images/logo-wide.jpg"
              alt={site.name}
              fill
              sizes="224px"
              className="object-cover"
            />
          </span>
          <p className="font-script text-4xl text-amber md:text-5xl">
            Light a candle, make a wish.
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-cream/15 pt-10 md:grid-cols-3">
          <div>
            <p className="font-script text-2xl text-amber">Margherita&rsquo;s</p>
            <p className="mt-3 max-w-xs text-sm text-cream/70">
              Dessert &amp; cocktail-inspired candles, Hand-crafted in small
              batches. They look good enough to drink — please don&rsquo;t.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link className="transition-colors hover:text-amber" href="/">Home</Link></li>
              <li><Link className="transition-colors hover:text-amber" href="/shop">Shop</Link></li>
              <li><Link className="transition-colors hover:text-amber" href="/about">Our Story</Link></li>
              <li><Link className="transition-colors hover:text-amber" href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
              Get in touch
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="rounded-full border border-cream/20 p-2.5 transition-colors hover:border-amber hover:text-amber"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Send us an email"
                className="rounded-full border border-cream/20 p-2.5 transition-colors hover:border-amber hover:text-amber"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="rounded-full border border-cream/20 p-2.5 transition-colors hover:border-amber hover:text-amber"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="mt-4 text-sm text-cream/60">{site.address}</p>
          </div>
        </div>

        <p className="mt-12 text-xs text-cream/40">
          © <CopyrightYear /> {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}