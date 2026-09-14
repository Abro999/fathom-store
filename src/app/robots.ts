import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/search"],
    },
    sitemap: "https://www.fathomgoods.example/sitemap.xml",
  };
}
