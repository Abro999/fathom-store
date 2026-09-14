"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { useToast } from "@/components/ui/Toast";

const faqs = [
  { title: "How long does shipping take?", content: "Most orders arrive in 3–5 business days within the continental US, and 6–10 days internationally." },
  { title: "Can I change or cancel my order?", content: "Reach out within 2 hours of ordering and we can usually adjust it before it ships." },
  { title: "Do you ship internationally?", content: "Yes, to most countries. Duties and taxes are calculated at checkout, not after." },
  { title: "What's your return policy?", content: "30 days from delivery, unworn and in original packaging. See our full returns page for details." },
];

export default function ContactPage() {
  const { show } = useToast();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="We're here to help"
        title="Get in touch"
        description="Questions about an order, a product, or a partnership — we read every message ourselves."
      />

      <section className="container-page py-16 md:py-24 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-2xl text-charcoal mb-6">Send us a message</h2>
          {submitted ? (
            <div className="border border-line p-8 text-center">
              <p className="font-display text-xl text-charcoal mb-2">Message sent</p>
              <p className="font-sans text-charcoal/60 text-sm">We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                show("Message sent — we'll be in touch soon.");
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-sans text-charcoal/60 block mb-1.5">
                    Name
                  </label>
                  <input id="name" required className="w-full border border-line px-4 py-3 font-sans text-sm outline-none focus-visible:border-charcoal" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-sans text-charcoal/60 block mb-1.5">
                    Email
                  </label>
                  <input id="email" type="email" required className="w-full border border-line px-4 py-3 font-sans text-sm outline-none focus-visible:border-charcoal" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-sans text-charcoal/60 block mb-1.5">
                  Subject
                </label>
                <input id="subject" required className="w-full border border-line px-4 py-3 font-sans text-sm outline-none focus-visible:border-charcoal" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-sans text-charcoal/60 block mb-1.5">
                  Message
                </label>
                <textarea id="message" required rows={5} className="w-full border border-line px-4 py-3 font-sans text-sm outline-none focus-visible:border-charcoal resize-none" />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-fit">
                Send message
              </Button>
            </form>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl text-charcoal mb-6">Frequently asked</h2>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
