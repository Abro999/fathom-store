import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductService } from "@/services/ProductService";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Accordion } from "@/components/ui/Accordion";
import { ReviewCard } from "@/components/product/ReviewCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Rating } from "@/components/ui/Rating";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await ProductService.get(params.slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.descriptor,
    openGraph: {
      title: product.title,
      description: product.descriptor,
      images: product.images.map((i) => ({ url: i.url })),
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await ProductService.get(params.slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    ProductService.reviews(product.id),
    Promise.resolve(getRelatedProducts(product)),
  ]);

  const accordionItems = [
    { title: "Description", content: product.description },
    {
      title: "Features",
      content: (
        <ul className="list-disc pl-4 space-y-1">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Specifications",
      content: (
        <dl className="space-y-1.5">
          {product.specifications.map((s) => (
            <div key={s.label} className="flex justify-between gap-4">
              <dt className="text-charcoal/50">{s.label}</dt>
              <dd className="text-charcoal">{s.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { title: "Shipping & returns", content: `${product.shipping} Returns accepted within 30 days of delivery.` },
    ...(product.faqs.length
      ? [
          {
            title: "FAQs",
            content: (
              <div className="space-y-3">
                {product.faqs.map((f) => (
                  <div key={f.question}>
                    <p className="text-charcoal font-medium">{f.question}</p>
                    <p>{f.answer}</p>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.descriptor,
    image: product.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.reviewCount
      ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount }
      : undefined,
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Shop", item: "/shop" },
      { "@type": "ListItem", position: 2, name: product.category, item: `/category/${product.category}` },
      { "@type": "ListItem", position: 3, name: product.title },
    ],
  };

  return (
    <div className="container-page py-8 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <nav aria-label="Breadcrumb" className="text-sm font-sans text-charcoal/50 mb-6 flex gap-2">
        <Link href="/shop" className="hover:text-charcoal">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-charcoal capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-charcoal">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <ProductGallery images={product.images} title={product.title} />
        <div className="md:sticky md:top-24 self-start">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="max-w-2xl mt-16">
        <Accordion items={accordionItems} defaultOpenIndex={0} />
      </div>

      {reviews.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-charcoal">Reviews</h2>
            <Rating value={product.rating} count={product.reviewCount} size="md" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-8">You might also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
