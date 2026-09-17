const values = [
  {
    title: "Every product is chosen, not sourced in bulk",
    body: "We test before we list. If it doesn't earn a place in our own homes, it doesn't earn a place on DropEra.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" />
      </svg>
    ),
  },
  {
    title: "Checkout that doesn't make you nervous",
    body: "Encrypted payments, no stored card numbers on our servers, and order confirmations you can actually track.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
  {
    title: "Returns that take one form, not four",
    body: "Thirty days to change your mind. No restocking fee, no chat bot maze — just a label in your inbox.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-4.7M20 14a8 8 0 01-14 4.7" />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section className="bg-teel text-cream py-20 md:py-28">
      <div className="container-page">
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl text-balance mb-14 md:mb-20">
          The internet doesn't need another store with everything. It needs one with the right things.
        </h2>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-4">
              <div className="text-brass-soft">{v.icon}</div>
              <h3 className="font-display text-xl leading-snug">{v.title}</h3>
              <p className="font-sans text-cream/70 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
