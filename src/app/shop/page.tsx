import { Metadata } from "next";
import { ProductService } from "@/services/ProductService";
import { ShopClient } from "@/components/shop/ShopClient";
import { ProductFilters } from "@/lib/types";

const VALID_SORTS: NonNullable<ProductFilters["sort"]>[] = [
  "featured",
  "price-asc",
  "price-desc",
  "rating",
  "newest",
];

export const metadata: Metadata = {
  title: "Shop all products",
  description: "Browse Fathom's full curated catalog across tech, home, fashion, accessories and outdoor.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { sort?: string; category?: string };
}) {
  const [products, categories] = await Promise.all([
    ProductService.list(),
    ProductService.categories(),
  ]);

  const sort = VALID_SORTS.find((s) => s === searchParams.sort) ?? "featured";

  return (
    <ShopClient
      products={products}
      categories={categories}
      initialFilters={{
        sort,
        category: searchParams.category,
      }}
    />
  );
}
