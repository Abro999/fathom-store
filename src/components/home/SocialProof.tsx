import { Review } from "@/lib/types";
import { ReviewCard } from "@/components/product/ReviewCard";

export function SocialProof({ reviews }: { reviews: Review[] }) {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <div>
          <h2 className="font-display text-3xl md:text-5xl text-charcoal text-balance">
            What people actually say
          </h2>
          <p className="font-sans text-charcoal/60 mt-2">Verified purchases, unedited.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="font-display text-4xl text-charcoal">4.8</p>
          <p className="font-sans text-sm text-charcoal/50">from 1,900+ reviews</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </section>
  );
}
