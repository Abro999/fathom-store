"use client";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 pt-12" aria-label="Pagination">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-line disabled:opacity-30 hover:bg-ink/5 transition-colors"
        aria-label="Previous page"
      >
        ←
      </button>
      {Array.from({ length: totalPages }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-current={page === n ? "page" : undefined}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors ${
              page === n ? "bg-ink text-cream" : "hover:bg-ink/5 text-charcoal"
            }`}
          >
            {n}
          </button>
        );
      })}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-line disabled:opacity-30 hover:bg-ink/5 transition-colors"
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}
