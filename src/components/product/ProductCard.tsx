"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const { addItem } = useCart();
  const { show } = useToast();
  const [wishlisted, setWishlisted] = useState(false);
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
      : null;

  return (
    <div className="group relative flex flex-col">
      {rank !== undefined && (
        <span className="absolute top-3 left-3 z-10 font-display text-3xl text-cream mix-blend-difference">
          {String(rank).padStart(2, "0")}
        </span>
      )}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-paper-soft">
        <Image
          src={product.images[0]?.url}
          alt={product.images[0]?.alt ?? product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
        {product.images[1] && (
          <Image
            src={product.images[1].url}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100"
          />
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.badges?.map((b) => <Badge key={b} type={b} />)}
          {discount && <Badge type="sale" />}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((w) => !w);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-cream/90 backdrop-blur flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 ease-smooth group-hover:opacity-100 group-hover:translate-y-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" className="text-charcoal">
            <path d="M12 21s-7.5-4.6-10-9C.5 8.5 2 4 6 4c2.2 0 3.7 1.2 4.5 2.4C11.3 5.2 12.8 4 15 4c4 0 5.5 4.5 4 8-2.5 4.4-10 9-10 9z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product, product.variants[0]);
            show(`Added ${product.title} to cart`);
          }}
          className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 bg-ink text-cream text-sm font-sans py-2.5 rounded-full hidden sm:block"
        >
          Quick add
        </button>
      </Link>

      <div className="pt-3 flex flex-col gap-1">
        <Link href={`/product/${product.slug}`} className="font-display text-[17px] leading-snug text-charcoal">
          {product.title}
        </Link>
        <p className="text-sm text-charcoal/55 font-sans">{product.descriptor}</p>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="font-sans text-[15px] text-charcoal">${product.price}</span>
          {product.compareAtPrice && (
            <span className="font-sans text-[13px] text-charcoal/40 line-through">${product.compareAtPrice}</span>
          )}
          {discount && <span className="font-sans text-[13px] text-rust">-{discount}%</span>}
        </div>
      </div>
    </div>
  );
}
