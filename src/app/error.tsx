"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-24 flex flex-col items-center text-center gap-5">
      <h1 className="font-display text-3xl text-charcoal">Something went sideways</h1>
      <p className="font-sans text-charcoal/60 max-w-sm">
        A network hiccup or a temporary error on our end. Nothing was charged and your cart is safe.
      </p>
      <Button onClick={() => reset()} variant="primary" size="lg">
        Try again
      </Button>
    </div>
  );
}
