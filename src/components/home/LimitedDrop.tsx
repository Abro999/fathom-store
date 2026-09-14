"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";

// Configurable: pass a real ISO end date for a genuine promotion.
// If the date has passed, the section quietly hides the countdown.
function useCountdown(endDate: string) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(endDate).getTime();
    const tick = () => setRemaining(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (remaining === null) return null;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return { days, hours, minutes, seconds, ended: remaining <= 0 };
}

export function LimitedDrop({ product, endDate }: { product: Product; endDate: string }) {
  const countdown = useCountdown(endDate);
  if (!countdown || countdown.ended) return null;

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hrs", value: countdown.hours },
    { label: "Min", value: countdown.minutes },
    { label: "Sec", value: countdown.seconds },
  ];

  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-0 border border-line">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image src={product.images[0].url} alt={product.title} fill sizes="50vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 md:p-12 bg-ink text-cream">
          <span className="font-sans text-sm text-rust w-fit px-3 py-1 border border-rust/40 rounded-full">
            Limited drop — {product.variants[0]?.inventory ?? product.inventory} left
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-balance">{product.title}</h2>
          <p className="font-sans text-cream/70 max-w-sm">{product.descriptor}</p>
          <div className="flex gap-4">
            {units.map((u) => (
              <div key={u.label} className="flex flex-col items-center">
                <span className="font-display text-3xl">{String(u.value).padStart(2, "0")}</span>
                <span className="text-xs font-sans text-cream/50">{u.label}</span>
              </div>
            ))}
          </div>
          <Button href={`/product/${product.slug}`} variant="secondary" size="lg" className="w-fit mt-2">
            Shop before it's gone
          </Button>
        </div>
      </div>
    </section>
  );
}
