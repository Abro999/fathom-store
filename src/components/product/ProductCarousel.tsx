"use client";

import { useRef } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-px-5 snap-x snap-mandatory pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[68%] sm:min-w-[300px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="hidden md:flex gap-2 absolute -top-16 right-0">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
