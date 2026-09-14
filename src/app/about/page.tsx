import { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Fathom — a curated store for objects worth finding.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="We got tired of scrolling through everything to find the right thing."
        description="Fathom started as a shared list between three friends who kept sending each other links to things worth owning. It's now a store — same standard, more categories."
      />

      <section className="container-page py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] overflow-hidden order-2 md:order-1">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
            alt="Fathom's small product review team at a work table"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2 flex flex-col gap-4">
          <h2 className="font-display text-3xl text-charcoal">How we choose</h2>
          <p className="font-sans text-charcoal/70 leading-relaxed">
            Every product on Fathom is used by someone on our small team before it's listed. We
            care about materials, how something ages, and whether the price matches what's
            actually inside it — not just how it photographs.
          </p>
          <p className="font-sans text-charcoal/70 leading-relaxed">
            We work directly with manufacturers and small studios, which means we can keep
            prices honest without cutting corners on shipping speed or support.
          </p>
        </div>
      </section>

      <section className="bg-paper-soft py-16 md:py-24">
        <div className="container-page grid sm:grid-cols-3 gap-10 text-center">
          {[
            { stat: "40,000+", label: "considered shoppers" },
            { stat: "4.8 / 5", label: "average rating" },
            { stat: "30 days", label: "to change your mind" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl text-charcoal">{s.stat}</p>
              <p className="font-sans text-charcoal/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 md:py-24 text-center flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-4xl text-charcoal max-w-lg text-balance">
          Ready to find something worth keeping?
        </h2>
        <Button href="/shop" variant="primary" size="lg">
          Shop the collection
        </Button>
      </section>
    </>
  );
}
