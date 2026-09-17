"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cart } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/context/CartContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-checkout-js")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RazorpayButton({ cart }: { cart: Cart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { show } = useToast();
  const { clearCart } = useCart();
  const router = useRouter();

  const startPayment = async () => {
    if (!cart || cart.lines.length === 0) return;
    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        show("Couldn't load payment gateway. Check your connection and try again.");
        setIsProcessing(false);
        return;
      }

      const orderRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        show(orderData.error ?? "Couldn't start checkout. Please try again.");
        setIsProcessing(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "DropEra",
        description: `${cart.lines.length} item${cart.lines.length > 1 ? "s" : ""}`,
        theme: { color: "#12181B" },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.valid) {
            clearCart();
            router.push(`/order-confirmed?payment_id=${response.razorpay_payment_id}`);
          } else {
            show("Payment could not be verified. If money was deducted, contact support.");
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      });

      razorpay.on("payment.failed", () => {
        show("Payment failed. Please try again.");
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (err) {
      show("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Button variant="primary" size="lg" onClick={startPayment} disabled={isProcessing}>
      {isProcessing ? "Opening secure checkout…" : "Proceed to checkout"}
    </Button>
  );
}
