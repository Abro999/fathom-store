"use client";

import { useMemo, useState } from "react";
import { Category, Product, ProductFilters } from "@/lib/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Pagination } from "@/components/ui/Pagination";
import { FilterDrawer } from "@/components/shop/FilterDrawer";

const PAGE_SIZE = 8;

function applyClientFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];
  if (filters.category) result = result.filter((p) => p.category === filters.category);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
  }
  if (filters.minPrice !== undefined) result = result.filter((p) => p.price >= filters.minPrice!);
  if (filters.maxPrice !== undefined) result = result.filter((p) => p.price <= filters.maxPrice!);
  if (filters.minRating !== undefined) result = result.filter((p) => p.rating >= filters.minRating!);
  if (filters.inStockOnly) result = result.filter((p) => p.inventory > 0);
  if (filters.onSaleOnly) result = result.filter((p) => !!p.compareAtPrice && p.compareAtPrice > p.price);

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => (b.badges?.includes("new") ? 1 : 0) - (a.badges?.includes("new") ? 1 : 0));
      break;
  }
  return result;
}

export function ShopClient({
  products,
  categories,
  initialFilters,
  title = "All products",
}: {
  products: Product[];
  categories: Category[];
  initialFilters?: ProductFilters;
  title?: string;
}) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters ?? {});
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const filterableCategories = useMemo(
    () => categories.filter((c) => c.slug !== "new-arrivals"),
    [categories]
  );

  const filtered = useMemo(() => applyClientFilters(products, filters), [products, filters]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount = Object.values(filters).filter((v) => v !== undefined && v !== "").length;

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-8 md:mb-10">
        <h1 className="font-display text-3xl md:text-5xl text-charcoal">{title}</h1>
        <p className="font-sans text-charcoal/60 mt-2">{filtered.length} products</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-line">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-line rounded-full font-sans text-sm hover:border-charcoal transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="text-sm font-sans text-charcoal/50">
            Sort
          </label>
          <select
            id="sort"
            value={filters.sort ?? "featured"}
            onChange={(e) => {
              setFilters((f) => ({ ...f, sort: e.target.value as ProductFilters["sort"] }));
              setPage(1);
            }}
            className="bg-transparent border border-line rounded-full px-4 py-2.5 font-sans text-sm outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <ProductGrid products={paged} />

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <FilterDrawer
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={filterableCategories}
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
        onClear={() => {
          setFilters({});
          setPage(1);
        }}
      />
    </div>
  );
}
