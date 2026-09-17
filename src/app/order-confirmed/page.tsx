"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

function OrderConfirmedContent() {
  const params = useSearchParams();
  const paymentId = params.get("payment_id");

  return (
    <div className="container-page py-24 flex flex-col items-center text-center gap-5">
      <div className="w-16 h-16 rounded-full bg-teel flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 className="font-display text-3xl md:text-4xl text-charcoal">Order confirmed</h1>
      <p className="font-sans text-charcoal/60 max-w-md">
        Thank you — your payment went through and your order is being prepared. A confirmation has been
        recorded against your payment.
      </p>
      {paymentId && (
        <p className="font-sans text-xs text-charcoal/40">Payment reference: {paymentId}</p>
      )}
      <Button href="/shop" variant="primary" size="lg" className="mt-4">
        Continue shopping
      </Button>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
