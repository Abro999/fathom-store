import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      <div className="container-page grid md:grid-cols-2 gap-10 items-center pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <span className="font-sans text-sm text-brass-soft">Curated across tech, home & everyday carry</span>
          <h1 className="font-display text-[13vw] leading-[0.95] md:text-6xl lg:text-7xl tracking-tightest text-balance">
            Good taste, done finding things for you.
          </h1>
          <p className="font-sans text-cream/70 text-base md:text-lg max-w-md">
            DropEra is a running search for the object that actually earns its shelf space —
            tested, sourced, and shipped without the thirty tabs of research.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/shop" variant="secondary" size="lg">
              Shop the collection
            </Button>
            <Button href="/category/new-arrivals" variant="outline-light" size="lg">
              See what's new
            </Button>
          </div>
          <div className="flex items-center gap-3 pt-4 text-sm font-sans text-cream/50">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <span key={i} className="w-7 h-7 rounded-full bg-cream/20 border border-ink" />
              ))}
            </div>
            Trusted by 40,000+ considered shoppers
          </div>
        </div>

        <div className="relative order-1 md:order-2 grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] mt-8 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1000&auto=format&fit=crop"
              alt="Aura wireless headphones on a stand"
              fill
              priority
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
              alt="Field mechanical watch"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 pr-10 font-sans text-sm text-cream/40">
              <span>Free shipping over $75</span>
              <span>·</span>
              <span>Secure checkout</span>
              <span>·</span>
              <span>30-day returns</span>
              <span>·</span>
              <span>New drops every week</span>
              <span>·</span>
              <span>Real reviews, verified purchases</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
