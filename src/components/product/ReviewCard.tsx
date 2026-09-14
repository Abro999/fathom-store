import { Review } from "@/lib/types";
import { Rating } from "@/components/ui/Rating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-3 p-6 border border-line bg-cream h-full">
      <Rating value={review.rating} />
      <h4 className="font-display text-lg text-charcoal leading-snug">{review.title}</h4>
      <p className="text-sm text-charcoal/70 font-sans leading-relaxed flex-1">{review.body}</p>
      <div className="flex items-center gap-2 pt-2 border-t border-line">
        <span className="font-sans text-sm text-charcoal">{review.author}</span>
        {review.verified && (
          <span className="flex items-center gap-1 text-xs text-teel font-sans">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Verified purchase
          </span>
        )}
      </div>
    </div>
  );
}
