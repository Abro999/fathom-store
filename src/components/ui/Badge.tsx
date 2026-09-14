const styles: Record<string, string> = {
  new: "bg-teel text-cream",
  bestseller: "bg-brass text-ink",
  limited: "bg-rust text-cream",
  "low-stock": "bg-ink text-cream",
  sale: "bg-rust text-cream",
};

const labels: Record<string, string> = {
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited drop",
  "low-stock": "Almost gone",
  sale: "Sale",
};

export function Badge({ type }: { type: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[11px] tracking-wide rounded-sm font-sans font-medium ${
        styles[type] ?? "bg-ink text-cream"
      }`}
    >
      {labels[type] ?? type}
    </span>
  );
}
