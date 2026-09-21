import { NextResponse } from "next/server";
import { Cart } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { cart }: { cart: Cart } = await req.json();

    if (!cart || cart.lines.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay isn't configured yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
        { status: 500 }
      );
    }

    const amountInSmallestUnit = Math.round(cart.subtotal * 100);
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const itemsSummary = cart.lines
      .map((l) => `${l.productTitle} (${l.variantTitle}) x${l.quantity}`)
      .join(", ")
      .slice(0, 500);

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInSmallestUnit,
        currency: cart.currency || "INR",
        receipt: `order_${Date.now()}`,
        notes: { items: itemsSummary, cartId: cart.id },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.description ?? "Razorpay order creation failed" }, { status: 500 });
    }

    return NextResponse.json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId,
    });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong creating the order." }, { status: 500 });
  }
}
