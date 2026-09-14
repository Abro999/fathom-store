import { commerce } from "@/lib/commerce";
import { ProductFilters } from "@/lib/types";

export const ProductService = {
  list: (filters?: ProductFilters) => commerce.getProducts(filters),
  get: (slug: string) => commerce.getProduct(slug),
  categories: () => commerce.getCategories(),
  category: (slug: string) => commerce.getCategory(slug),
  reviews: (productId: string) => commerce.getReviews(productId),
  search: (query: string) => commerce.searchProducts(query),
};
