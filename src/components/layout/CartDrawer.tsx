"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllProducts } from "@/data/products";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const lines = cart?.lines ?? [];
  const crossSell = getAllProducts()
    .filter((p) => !lines.some((l) => l.productId === p.id))
    .slice(0, 3);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeCart}
      title={`Your bag${lines.length ? ` (${lines.length})` : ""}`}
      footer={
        lines.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between font-sans text-sm">
              <span className="text-charcoal/60">Estimated shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between font-display text-lg">
              <span>Subtotal</span>
              <span>${cart?.subtotal.toFixed(2)}</span>
            </div>
            <Button href="/cart" variant="primary" size="lg" onClick={closeCart}>
              Checkout
            </Button>
          </div>
        ) : undefined
      }
    >
      {lines.length === 0 ? (
        <EmptyState
          title="Your bag is empty"
          description="Explore the collection and find something worth carrying."
          actionLabel="Shop the collection"
          actionHref="/shop"
        />
      ) : (
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-5">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-4">
                <div className="relative w-20 h-24 shrink-0 bg-paper-soft overflow-hidden">
                  <Image src={line.image} alt={line.productTitle} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between gap-2">
                    <Link href={`/product/${line.slug}`} onClick={closeCart} className="font-sans text-sm text-charcoal leading-snug">
                      {line.productTitle}
                    </Link>
                    <button
                      onClick={() => removeItem(line.id)}
                      aria-label={`Remove ${line.productTitle}`}
                      className="text-charcoal/40 hover:text-charcoal shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                  <span className="text-xs text-charcoal/50 font-sans">{line.variantTitle}</span>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center border border-line rounded-full">
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        className="w-7 h-7 text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-xs">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        className="w-7 h-7 text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-sans text-sm">${(line.price * line.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {crossSell.length > 0 && (
            <div className="pt-5 border-t border-line">
              <h3 className="font-display text-base mb-3">Complete the set</h3>
              <div className="flex flex-col gap-3">
                {crossSell.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} onClick={closeCart} className="flex gap-3 items-center group">
                    <div className="relative w-14 h-16 shrink-0 bg-paper-soft overflow-hidden">
                      <Image src={p.images[0].url} alt={p.title} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-sans text-charcoal group-hover:underline">{p.title}</p>
                      <p className="text-xs text-charcoal/50 font-sans">${p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}
