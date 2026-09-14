"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function MobileTabBar() {
  const pathname = usePathname();
  const { lineCount, openCart } = useCart();

  const items = [
    { label: "Home", href: "/", icon: "M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10" },
    { label: "Shop", href: "/shop", icon: "M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 016 0v2" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-cream/95 backdrop-blur border-t border-line flex items-center justify-around h-16">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center gap-1 text-[11px] font-sans ${
            pathname === item.href ? "text-ink" : "text-charcoal/50"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={item.icon} />
          </svg>
          {item.label}
        </Link>
      ))}
      <button onClick={openCart} className="relative flex flex-col items-center gap-1 text-[11px] font-sans text-charcoal/50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 8h12l-1 12H7L6 8z" />
          <path d="M9 8V6a3 3 0 016 0v2" />
        </svg>
        Bag
        {lineCount > 0 && (
          <span className="absolute -top-0.5 right-3 w-4 h-4 rounded-full bg-brass text-[10px] text-ink flex items-center justify-center">
            {lineCount}
          </span>
        )}
      </button>
    </nav>
  );
}
