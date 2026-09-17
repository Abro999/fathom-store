"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllProducts } from "@/data/products";
import { RazorpayButton } from "@/components/checkout/RazorpayButton";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const lines = cart?.lines ?? [];
  const crossSell = getAllProducts()
    .filter((p) => !lines.some((l) => l.productId === p.id))
    .slice(0, 4);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon.trim()) return;
    setCouponError("That code isn't valid or has expired.");
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

      <div className="grid md:grid-cols-[1fr_360px] gap-12">
        <ul className="flex flex-col divide-y divide-line">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-5 py-6">
              <div className="relative w-24 h-28 md:w-28 md:h-32 shrink-0 bg-paper-soft overflow-hidden">
                <Image src={line.image} alt={line.productTitle} fill sizes="120px" className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex justify-between gap-2">
                  <Link href={`/product/${line.slug}`} className="font-display text-lg text-charcoal">
                    {line.productTitle}
                  </Link>
                  <span className="font-sans text-base text-charcoal">${(line.price * line.quantity).toFixed(2)}</span>
                </div>
                <span className="text-sm text-charcoal/50 font-sans">{line.variantTitle}</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-line rounded-full">
                    <button onClick={() => updateQuantity(line.id, line.quantity - 1)} className="w-8 h-8 text-sm" aria-label="Decrease quantity">
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{line.quantity}</span>
                    <button onClick={() => updateQuantity(line.id, line.quantity + 1)} className="w-8 h-8 text-sm" aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItem(line.id)} className="text-sm font-sans text-charcoal/50 hover:text-rust transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="flex flex-col gap-6 h-fit border border-line p-6">
          <h2 className="font-display text-xl text-charcoal">Order summary</h2>

          <form onSubmit={applyCoupon} className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                setCouponError("");
              }}
              placeholder="Coupon code"
              aria-label="Coupon code"
              className="flex-1 border border-line px-4 py-2.5 text-sm font-sans outline-none focus-visible:border-charcoal"
            />
