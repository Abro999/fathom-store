import { Button } from "./Button";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-20 px-6">
      <div className="w-14 h-14 rounded-full border border-line flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-2xl text-charcoal">{title}</h3>
        <p className="text-sm text-charcoal/60 max-w-sm">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="primary" className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
