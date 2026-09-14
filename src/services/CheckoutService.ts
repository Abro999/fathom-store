import { commerce } from "@/lib/commerce";
import { Cart } from "@/lib/types";

// CheckoutService intentionally does NOT implement payment collection
// itself. It hands off to the connected commerce backend's own hosted,
// PCI-compliant checkout (Shopify Checkout, an Odoo payment portal, or
// a PaymentService wrapping Stripe/Razorpay/PayPal behind this same
// interface). No card data should ever be handled directly by this
// frontend.
export const CheckoutService = {
  start: async (cart: Cart) => {
    const { checkoutUrl } = await commerce.createCheckout(cart);
    return checkoutUrl;
  },
};

// PaymentService is a placeholder integration point. Wire it to
// Stripe/Razorpay/PayPal server-side only, behind an API route —
// never call payment provider secret keys from client components.
export const PaymentService = {
  // createPaymentIntent, confirmPayment, etc. would live here, calling
  // a Next.js API route (`/app/api/payments/*`) that holds the secret key.
};
