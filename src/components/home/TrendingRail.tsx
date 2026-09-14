import { Product } from "@/lib/types";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { Button } from "@/components/ui/Button";

export function TrendingRail({ products }: { products: Product[] }) {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <h2 className="font-display text-3xl md:text-5xl text-charcoal text-balance">
            Trending this week
          </h2>
          <p className="font-sans text-charcoal/60 mt-2 max-w-md">
            What everyone's adding to their cart right now, across every category.
          </p>
        </div>
        <Button href="/shop" variant="ghost" size="md" className="hidden md:inline-flex">
          View all →
        </Button>
      </div>
      <ProductCarousel products={products} />
    </section>
  );
}
