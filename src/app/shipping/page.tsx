import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Shipping" };

const rows = [
  { region: "Continental US", time: "3–5 business days", cost: "Free over $75, otherwise $8" },
  { region: "US territories & Alaska/Hawaii", time: "5–8 business days", cost: "$14" },
  { region: "Canada", time: "6–9 business days", cost: "$16" },
  { region: "Rest of world", time: "8–14 business days", cost: "Calculated at checkout" },
];

export default function ShippingPage() {
  return (
    <>
      <PageHeader eyebrow="Policy" title="Shipping" description="Where we ship, how long it takes, and what it costs." />
      <section className="container-page py-16 md:py-24 max-w-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans border-collapse">
            <thead>
              <tr className="border-b border-line text-left text-charcoal/50">
                <th className="py-3 pr-4 font-normal">Region</th>
                <th className="py-3 pr-4 font-normal">Estimated time</th>
                <th className="py-3 font-normal">Cost</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.region} className="border-b border-line">
                  <td className="py-4 pr-4 text-charcoal">{r.region}</td>
                  <td className="py-4 pr-4 text-charcoal/70">{r.time}</td>
                  <td className="py-4 text-charcoal/70">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 space-y-4 font-sans text-charcoal/70 leading-relaxed text-sm">
          <p>
            Orders are processed within 1–2 business days. You'll receive a tracking link by
            email as soon as your order ships — no account required to track it.
          </p>
          <p>
            Some items ship directly from our manufacturing partners and may arrive separately
            from the rest of your order if you purchase multiple items in one checkout.
          </p>
          <p>
            International orders may be subject to customs duties and import taxes, which are
            calculated and collected at checkout so there are no surprise charges on delivery.
          </p>
        </div>
      </section>
    </>
  );
}
