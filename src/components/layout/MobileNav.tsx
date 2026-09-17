"use client";

import Link from "next/link";
import { useEffect } from "react";
import { categories } from "@/data/categories";

const links = [
  { label: "Shop all", href: "/shop" },
  { label: "New arrivals", href: "/category/new-arrivals" },
  { label: "Best sellers", href: "/shop?sort=rating" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-[65] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute top-0 left-0 h-full w-[82%] max-w-sm bg-cream transition-transform duration-300 ease-smooth overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <span className="font-display text-2xl text-charcoal">DropEra</span>
          <button onClick={onClose} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="py-3 border-b border-line font-display text-xl text-charcoal">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4">
          <p className="text-sm font-sans text-charcoal/50 mb-3">Categories</p>
          <div className="flex flex-col gap-2">
            {categories.map((c) => (
              <Link key={c.id} href={`/category/${c.slug}`} onClick={onClose} className="text-charcoal font-sans">
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
