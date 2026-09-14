import { MetadataRoute } from "next";
import { getAllProducts } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.fathomgoods.example";

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
