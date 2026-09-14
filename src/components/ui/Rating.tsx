export function Rating({ value, count, size = "sm" }: { value: number; count?: number; size?: "sm" | "md" }) {
  const dim = size === "sm" ? 13 : 16;
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const fillPct = Math.max(0, Math.min(1, value - i)) * 100;
          return (
            <span key={i} className="relative inline-block" style={{ width: dim, height: dim }}>
              <svg viewBox="0 0 20 20" width={dim} height={dim} className="absolute inset-0 fill-line">
                <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
              </svg>
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct}%` }}>
                <svg viewBox="0 0 20 20" width={dim} height={dim} className="fill-brass">
                  <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-charcoal/60 font-sans">({count})</span>
      )}
    </div>
  );
}
