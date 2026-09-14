import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  {
    title: "What we collect",
    body: "Order details (name, shipping address, email), browsing behavior on this site via analytics, and payment confirmation from our payment processor — we never see or store your full card number.",
  },
  {
    title: "How we use it",
    body: "To fulfill and ship your order, send order updates, respond to support requests, and — only if you opt in — send our weekly newsletter.",
  },
  {
    title: "Who we share it with",
    body: "Shipping carriers (to deliver your order), our payment processor (to process payment), and analytics providers (in aggregated, anonymized form). We do not sell your personal information.",
  },
  {
    title: "Your rights",
    body: "You can request a copy of your data, ask us to delete it, or unsubscribe from marketing emails at any time by contacting hello@fathomgoods.example.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to keep your cart working and optional analytics cookies to understand how the site is used. You can disable non-essential cookies in your browser settings.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated September 2026." />
      <section className="container-page py-16 md:py-24 max-w-2xl flex flex-col gap-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl text-charcoal mb-2">{s.title}</h2>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
