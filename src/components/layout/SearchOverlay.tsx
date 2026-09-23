"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/currency";

const RECENT_KEY = "dropera_recent_searches";
const POPULAR = ["Wireless headphones", "Field watch", "Weekender bag", "Linen"];

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = window.localStorage.getItem(RECENT_KEY);
      setRecent(stored ? JSON.parse(stored) : []);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return getAllProducts()
      .filter((p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)))
      .slice(0, 5);
  }, [query]);

  const runSearch = (term: string) => {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-cream animate-fade-up">
      <div className="container-page flex items-center gap-4 py-5 border-b border-line">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-charcoal/50">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && query.trim() && runSearch(query.trim())}
          placeholder="Search products, categories..."
          aria-label="Search"
          className="flex-1 bg-transparent font-display text-2xl md:text-3xl outline-none placeholder:text-charcoal/30"
        />
        <button onClick={onClose} aria-label="Close search" className="text-sm font-sans text-charcoal/60 hover:text-charcoal">
          Close
        </button>
      </div>

      <div className="container-page overflow-y-auto py-8 flex-1">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {results.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} onClick={onClose} className="group">
                <div className="relative aspect-[4/5] bg-paper-soft overflow-hidden mb-2">
                  <Image src={p.images[0].url} alt={p.title} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-sm font-sans text-charcoal">{p.title}</p>
                <p className="text-xs text-charcoal/50 font-sans">{formatPrice(p.price, p.currency)}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10 max-w-3xl">
            {recent.length > 0 && (
              <div>
                <h3 className="text-sm font-sans text-charcoal/50 mb-3">Recent searches</h3>
                <ul className="flex flex-col gap-2">
                  {recent.map((r) => (
                    <li key={r}>
                      <button onClick={() => runSearch(r)} className="text-charcoal font-sans hover:text-brass transition-colors">
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="text-sm font-sans text-charcoal/50 mb-3">Popular searches</h3>
              <ul className="flex flex-col gap-2">
                {POPULAR.map((p) => (
                  <li key={p}>
                    <button onClick={() => runSearch(p)} className="text-charcoal font-sans hover:text-brass transition-colors">
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-sans text-charcoal/50 mb-3">Categories</h3>
              <ul className="flex flex-col gap-2">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.id}>
                    <Link href={`/category/${c.slug}`} onClick={onClose} className="text-charcoal font-sans hover:text-brass transition-colors">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
