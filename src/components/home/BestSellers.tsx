import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export function BestSellers({ products }: { products: Product[] }) {
  const [featured, ...rest] = products;

  return (
    <section className="container-page py-16 md:py-24">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <h2 className="font-display text-3xl md:text-5xl text-charcoal text-balance">
          Best sellers, ranked
        </h2>
        <Button href="/shop?sort=rating" variant="ghost" size="md" className="hidden md:inline-flex">
          View all →
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-8">
        {featured && (
          <div className="relative">
            <span className="absolute top-4 left-4 z-10 font-display text-5xl text-cream mix-blend-difference">
              01
            </span>
            <ProductCard product={featured} />
          </div>
        )}
        <div className="grid grid-cols-2 gap-5">
          {rest.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} rank={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
