import { Review } from "@/lib/types";

export const reviews: Review[] = [
  {
    id: "r-01",
    productId: "p-01",
    author: "Meera K.",
    rating: 5,
    title: "Better than headphones twice the price",
    body: "I edit audio for a living and was skeptical about a $179 pair. The mids are honest and the battery genuinely lasts the week.",
    verified: true,
    date: "2026-06-02",
  },
  {
    id: "r-02",
    productId: "p-01",
    author: "Daniel R.",
    rating: 4,
    title: "Comfortable for long sessions",
    body: "Wore these on a 14-hour flight and forgot they were on. Noise cancelling isn't Bose-level but it's very good for the price.",
    verified: true,
    date: "2026-05-14",
  },
  {
    id: "r-03",
    productId: "p-02",
    author: "Aarav S.",
    rating: 5,
    title: "Exactly the field watch I wanted",
    body: "Simple dial, solid movement, doesn't feel like a fashion piece. Quick-release strap is a nice touch.",
    verified: true,
    date: "2026-04-28",
  },
  {
    id: "r-04",
    productId: "p-03",
    author: "Priya M.",
    rating: 5,
    title: "My feet thank me daily",
    body: "Ordered these after wearing through two pairs of a bigger brand's sneaker in a year. Six months in, still holding up.",
    verified: true,
    date: "2026-03-19",
  },
  {
    id: "r-05",
    productId: "p-11",
    author: "Jonas W.",
    rating: 5,
    title: "Carries everything, looks sharp",
    body: "Laptop, gym clothes, a full grocery run — this tote has done it all without a seam giving way.",
    verified: true,
    date: "2026-02-11",
  },
  {
    id: "r-06",
    productId: "p-12",
    author: "Sofia L.",
    rating: 5,
    title: "Actually keeps ice for a full day",
    body: "Left ice in overnight during a heatwave and it was still there in the morning. No complaints.",
    verified: true,
    date: "2026-01-30",
  },
];

export function getReviewsForProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}
