import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductService } from "@/services/ProductService";
import { categories } from "@/data/categories";
import { ShopClient } from "@/components/shop/ShopClient";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await ProductService.category(params.slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await ProductService.category(params.slug);
  if (!category) notFound();

  const [products, allCategories] = await Promise.all([
    ProductService.list({ category: category.slug }),
    ProductService.categories(),
  ]);

  return (
    <ShopClient
      products={category.slug === "new-arrivals" ? await ProductService.list() : products}
      categories={allCategories}
      initialFilters={
        category.slug === "new-arrivals" ? { sort: "newest" } : { category: category.slug }
      }
      title={category.title}
    />
  );
}
