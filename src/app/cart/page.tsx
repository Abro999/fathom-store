"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckoutService } from "@/services/CheckoutService";
import { getAllProducts } from "@/data/products";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const lines = cart?.lines ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const shippingEstimate = subtotal > 75 || subtotal === 0 ? 0 : 6.5;
  const total = subtotal + shippingEstimate;

  const crossSell = getAllProducts()
    .filter((p) => !lines.some((l) => l.productId === p.id))
    .slice(0, 4);

  const applyCoupon = () => {
    if (!coupon.trim()) return;
    setCouponError("That code isn't valid or has expired.");
  };

  const handleCheckout = async () => {
    if (!cart) return;
    setIsCheckingOut(true);
    try {
      // Delegates to whichever commerce backend is configured — Shopify's
      // hosted checkout, an Odoo payment portal, or Stripe/Razorpay/PayPal
      // behind a custom checkout. This app never collects card details itself.
      const checkoutUrl = await CheckoutService.start(cart);
      router.push(checkoutUrl);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Your bag is empty"
          description="Explore the collection and find something worth carrying."
          actionLabel="Shop the collection"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="font-display text-3xl md:text-5xl text-charcoal mb-10">Your bag</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <ul className="flex flex-col divide-y divide-line">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-5 py-6">
              <div className="relative w-24 h-28 sm:w-32 sm:h-36 shrink-0 bg-paper-soft overflow-hidden">
                <Image src={line.image} alt={line.productTitle} fill sizes="128px" className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link href={`/product/${line.slug}`} className="font-display text-lg text-charcoal">
                      {line.productTitle}
                    </Link>
                    <p className="text-sm text-charcoal/50 font-sans">{line.variantTitle}</p>
                  </div>
                  <span className="font-sans text-charcoal">${(line.price * line.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-line rounded-full">
                    <button
                      onClick={() => updateQuantity(line.id, line.quantity - 1)}
                      className="w-8 h-8 text-sm"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button
                      onClick={() => updateQuantity(line.id, line.quantity + 1)}
                      className="w-8 h-8 text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(line.id)}
                    className="text-sm font-sans text-charcoal/50 hover:text-rust transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6 h-fit border border-line p-6">
          <h2 className="font-display text-xl">Order summary</h2>

          <div className="flex gap-2">
            <label htmlFor="coupon" className="sr-only">
              Coupon code
            </label>
            <input
              id="coupon"
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setCouponError("");
              }}
              placeholder="Coupon code"
              className="flex-1 border border-line px-4 py-2.5 font-sans text-sm outline-none focus-visible:border-charcoal"
            />
            <Button variant="ghost" size="sm" onClick={applyCoupon} className="border border-line">
              Apply
            </Button>
          </div>
          {couponError && <p className="text-sm text-rust font-sans -mt-3">{couponError}</p>}

          <div className="flex flex-col gap-2 font-sans text-sm border-t border-line pt-4">
            <div className="flex justify-between text-charcoal/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-charcoal/70">
              <span>Shipping</span>
              <span>{shippingEstimate === 0 ? "Free" : `$${shippingEstimate.toFixed(2)}`}</span>
            </div>
            {shippingEstimate > 0 && (
              <p className="text-xs text-charcoal/45">
                Add ${(75 - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}
            <div className="flex justify-between font-display text-lg text-charcoal pt-2 border-t border-line">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button variant="primary" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
            {isCheckingOut ? "Redirecting…" : "Checkout"}
          </Button>
          <p className="text-xs text-center text-charcoal/45 font-sans">
            Secure checkout · Payments handled by Stripe
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl text-charcoal mb-6">Complete the setup</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {crossSell.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="group">
              <div className="relative aspect-[4/5] bg-paper-soft overflow-hidden mb-2">
                <Image
                  src={p.images[0].url}
                  alt={p.title}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-sm font-sans text-charcoal">{p.title}</p>
              <p className="text-xs text-charcoal/50 font-sans">${p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
