export function StepList({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="flex flex-col divide-y divide-line border-y border-line">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-5 py-6">
          <span className="font-display text-2xl text-brass shrink-0 w-10">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-display text-lg text-charcoal mb-1">{s.title}</h3>
            <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
