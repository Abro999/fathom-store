import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "New arrivals", href: "/category/new-arrivals" },
      { label: "Best sellers", href: "/shop?sort=rating" },
      { label: "Categories", href: "/shop" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQs", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About DropEra", href: "/about" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="container-page py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4 max-w-xs">
          <span className="font-display text-2xl">DropEra</span>
          <p className="text-sm text-cream/60 font-sans leading-relaxed">
            We spend our time finding the things worth owning, so you don't have to dig through
            everything else to find them.
          </p>
          <div className="flex gap-3 pt-1">
            {["Instagram", "TikTok", "Pinterest"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs font-sans text-cream/60 hover:text-cream transition-colors underline-offset-4 hover:underline"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-sm text-cream/50 mb-4">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-sm text-cream/85 hover:text-brass transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page py-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-cream/40 font-sans">© {new Date().getFullYear()} DropEra Goods. All rights reserved.</p>
        <div className="flex items-center gap-3 text-xs text-cream/40 font-sans">
          {["Visa", "Mastercard", "Amex", "PayPal"].map((p) => (
            <span key={p} className="px-2 py-1 border border-cream/15 rounded-sm">
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
