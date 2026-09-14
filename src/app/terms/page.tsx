import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  { title: "Orders & pricing", body: "All prices are listed in USD and may change without notice. We reserve the right to refuse or cancel any order, including in cases of suspected fraud or pricing errors." },
  { title: "Product availability", body: "Inventory is shown in real time where possible, but items can sell out between browsing and checkout. If that happens, you'll be refunded in full for that item." },
  { title: "Shipping & risk of loss", body: "Risk of loss and title for items pass to you upon delivery to the carrier. See our Shipping page for estimated timelines by region." },
  { title: "Returns", body: "Governed by our Returns policy, linked in the footer. Returning an item does not obligate us to accept it if it doesn't meet the stated condition requirements." },
  { title: "Limitation of liability", body: "Fathom is not liable for indirect, incidental, or consequential damages arising from use of this site or its products, to the extent permitted by law." },
  { title: "Changes to these terms", body: "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms." },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" description="Last updated September 2026." />
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
