"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const { lineCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled ? "bg-cream/95 backdrop-blur border-b border-line" : "bg-transparent"
        }`}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div className="container-page flex items-center justify-between h-[72px]">
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center -ml-2"
            aria-label="Open menu"
            onClick={() => setMobileNavOpen(true)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1H20M0 7H20M0 13H20" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <Link href="/" className="font-display text-2xl tracking-tight text-charcoal">
            Fathom
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-sans text-[15px] text-charcoal">
            <div onMouseEnter={() => setMenuOpen(true)}>
              <Link href="/shop" className="hover:text-brass transition-colors">
                Shop
              </Link>
            </div>
            <Link href="/category/new-arrivals" className="hover:text-brass transition-colors">
              New arrivals
            </Link>
            <Link href="/shop?sort=rating" className="hover:text-brass transition-colors">
              Best sellers
            </Link>
            <Link href="/about" className="hover:text-brass transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-9 h-9 hidden sm:flex items-center justify-center hover:text-brass transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>
            <button
              aria-label="Wishlist"
              className="w-9 h-9 hidden sm:flex items-center justify-center hover:text-brass transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7.5-4.6-10-9C.5 8.5 2 4 6 4c2.2 0 3.7 1.2 4.5 2.4C11.3 5.2 12.8 4 15 4c4 0 5.5 4.5 4 8-2.5 4.4-10 9-10 9z" />
              </svg>
            </button>
            <button
              aria-label="Account"
              className="w-9 h-9 hidden sm:flex items-center justify-center hover:text-brass transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </button>
            <button
              onClick={openCart}
              aria-label={`Cart, ${lineCount} items`}
              className="relative w-9 h-9 flex items-center justify-center hover:text-brass transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {lineCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brass text-[10px] text-ink flex items-center justify-center font-sans">
                  {lineCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && <MegaMenu />}
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
