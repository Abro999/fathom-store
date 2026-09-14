import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StepList } from "@/components/layout/StepList";

export const metadata: Metadata = { title: "Returns" };

const steps = [
  { title: "Start your return", body: "Email hello@fathomgoods.example with your order number within 30 days of delivery." },
  { title: "Print your label", body: "We'll send a prepaid return label — no cost to you for domestic returns." },
  { title: "Pack it up", body: "Original packaging isn't required, but items must be unworn/unused with tags attached." },
  { title: "Get your refund", body: "Refunds are issued to your original payment method within 5 business days of us receiving the item." },
];

export default function ReturnsPage() {
  return (
    <>
      <PageHeader eyebrow="Policy" title="Returns" description="Thirty days to change your mind, no restocking fee." />
      <section className="container-page py-16 md:py-24 max-w-2xl">
        <StepList steps={steps} />
        <div className="mt-12 space-y-4 font-sans text-charcoal/70 leading-relaxed text-sm">
          <p>
            Sale items and gift cards are final sale unless the item arrived damaged or
            defective. Made-to-order items (like the Ceramic Pour Lamp) can be returned within
            14 days instead of 30, given the custom production run.
          </p>
          <p>
            Exchanges for a different size or color are free — just note it in your return
            request and we'll ship the replacement as soon as the original is on its way back
            to us.
          </p>
        </div>
      </section>
    </>
  );
}
