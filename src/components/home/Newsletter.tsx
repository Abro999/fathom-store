"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export function Newsletter() {
  const { show } = useToast();
  const [email, setEmail] = useState("");

  return (
    <section className="bg-brass-soft/40">
      <div className="container-page py-16 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <h2 className="font-display text-3xl md:text-4xl text-charcoal text-balance">
          Get the good stuff before everyone else.
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) return;
            show("You're on the list — welcome to Fathom.");
            setEmail("");
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 bg-cream border border-line px-5 py-3.5 font-sans text-sm outline-none focus-visible:border-charcoal"
          />
          <button
            type="submit"
            className="bg-ink text-cream font-sans text-sm px-6 py-3.5 rounded-full hover:bg-charcoal transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="font-sans text-xs text-charcoal/50 md:col-start-2">
          One email a week, unsubscribe anytime. We don't sell your information — see our{" "}
          <a href="/privacy" className="underline">
            privacy policy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
