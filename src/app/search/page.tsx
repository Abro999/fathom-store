import { Metadata } from "next";
import { ProductService } from "@/services/ProductService";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? "";
  const results = query ? await ProductService.search(query) : [];

  return (
    <div className="container-page py-10 md:py-14">
      <h1 className="font-display text-3xl md:text-5xl text-charcoal mb-2">
        {query ? `Results for "${query}"` : "Search"}
      </h1>
      <p className="font-sans text-charcoal/60 mb-10">{results.length} products found</p>
      <ProductGrid products={results} />
    </div>
  );
}
