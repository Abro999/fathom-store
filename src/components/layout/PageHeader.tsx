export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="bg-ink text-cream">
      <div className="container-page py-16 md:py-24">
        {eyebrow && <p className="font-sans text-sm text-brass-soft mb-3">{eyebrow}</p>}
        <h1 className="font-display text-4xl md:text-6xl text-balance max-w-2xl">{title}</h1>
        {description && <p className="font-sans text-cream/70 mt-4 max-w-xl">{description}</p>}
      </div>
    </div>
  );
}
