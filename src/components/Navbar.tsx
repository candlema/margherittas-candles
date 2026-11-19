"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-cream/95 backdrop-blur transition-shadow duration-300 ${
        scrolled || menuOpen ? "border-b border-navy/10" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <span className="relative block h-11 w-11 overflow-hidden rounded-full border border-amber/40">
            <Image
              src="/images/logo-mark.jpg"
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-script text-2xl text-navy md:text-3xl">
              Margherita&rsquo;s
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-deep md:text-xs">
              Enchanted Candles
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide uppercase transition-colors hover:text-amber-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber ${
                pathname === l.href ? "text-amber-deep" : "text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative cursor-pointer rounded-full p-2.5 transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-xs font-semibold text-navy">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="cursor-pointer rounded-full p-2.5 transition-colors hover:bg-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-navy/10 bg-cream px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-3 font-display text-2xl ${
                pathname === l.href ? "text-amber-deep" : "text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}