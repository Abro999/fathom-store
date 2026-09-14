import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProductGrid({ products, ranked = false }: { products: Product[]; ranked?: boolean }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="Nothing matches yet"
        description="Try clearing a filter or searching a different term."
        actionLabel="View all products"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} rank={ranked ? i + 1 : undefined} />
      ))}
    </div>
  );
}
