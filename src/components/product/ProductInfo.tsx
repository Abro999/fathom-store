"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/currency";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { show } = useToast();
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options.forEach((opt) => (initial[opt.name] = opt.values[0]));
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const variant = useMemo(() => {
    return (
      product.variants.find((v) =>
        Object.entries(selected).every(([key, val]) => v.options[key] === val)
      ) ?? product.variants[0]
    );
  }, [product.variants, selected]);

  const discount =
    variant.compareAtPrice && variant.compareAtPrice > variant.price
      ? Math.round(100 - (variant.price / variant.compareAtPrice) * 100)
      : null;

  const outOfStock = variant.inventory <= 0;
  const lowStock = variant.inventory > 0 && variant.inventory <= 5;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {product.badges?.map((b) => <Badge key={b} type={b} />)}
      </div>

      <div>
        <h1 className="font-display text-3xl md:text-4xl text-charcoal leading-tight text-balance">
          {product.title}
        </h1>
        <p className="mt-2 text-charcoal/60 font-sans">{product.descriptor}</p>
        <div className="mt-3">
          <Rating value={product.rating} count={product.reviewCount} size="md" />
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl text-charcoal">{formatPrice(variant.price, product.currency)}</span>
        {variant.compareAtPrice && (
          <span className="font-sans text-base text-charcoal/40 line-through">
            {formatPrice(variant.compareAtPrice, product.currency)}
          </span>
        )}
        {discount && <span className="font-sans text-sm text-rust">Save {discount}%</span>}
      </div>

      <p className="text-[15px] leading-relaxed text-charcoal/75 font-sans max-w-md">{product.description}</p>

      {product.options.map((option) => (
        <div key={option.name} className="flex flex-col gap-2">
          <span className="text-sm font-sans text-charcoal">
            {option.name}: <strong className="font-medium">{selected[option.name]}</strong>
          </span>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isActive = selected[option.name] === value;
              return (
                <button
                  key={value}
                  onClick={() => setSelected((s) => ({ ...s, [option.name]: value }))}
                  className={`px-4 py-2 text-sm font-sans border rounded-full transition-colors ${
                    isActive
                      ? "border-ink bg-ink text-cream"
                      : "border-line text-charcoal hover:border-charcoal"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-line rounded-full">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-sans text-sm" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(variant.inventory, q + 1))}
            className="w-10 h-10 flex items-center justify-center text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <span className="text-sm font-sans">
          {outOfStock ? (
            <span className="text-rust">Out of stock</span>
          ) : lowStock ? (
            <span className="text-rust">Only {variant.inventory} left</span>
          ) : (
            <span className="text-teel">In stock</span>
          )}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={outOfStock}
          onClick={() => {
            addItem(product, variant, quantity);
            show(`Added ${product.title} to cart`);
          }}
        >
          Add to cart
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="flex-1"
          disabled={outOfStock}
          onClick={async () => {
            await addItem(product, variant, quantity);
            router.push("/cart");
          }}
        >
          Buy now
        </Button>
        <button
          aria-label="Add to wishlist"
          className="w-14 h-14 shrink-0 rounded-full border border-line flex items-center justify-center hover:border-charcoal transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 21s-7.5-4.6-10-9C.5 8.5 2 4 6 4c2.2 0 3.7 1.2 4.5 2.4C11.3 5.2 12.8 4 15 4c4 0 5.5 4.5 4 8-2.5 4.4-10 9-10 9z" />
          </svg>
        </button>
      </div>

      <p className="text-sm text-charcoal/60 font-sans">{product.shipping}</p>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-line">
        {[
          { label: "Secure checkout", icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" },
          { label: "Easy returns", icon: "M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-4.7M20 14a8 8 0 01-14 4.7" },
          { label: "Fast dispatch", icon: "M3 12l4-8h10l4 8-4 8H7l-4-8z" },
        ].map((t) => (
          <div key={t.label} className="flex flex-col items-center text-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-teel">
              <path d={t.icon} />
            </svg>
            <span className="text-xs text-charcoal/60 font-sans">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
