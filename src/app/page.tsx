import { ProductService } from "@/services/ProductService";
import { reviews as allReviews } from "@/data/reviews";
import { categories } from "@/data/categories";
import { Hero } from "@/components/home/Hero";
import { TrendingRail } from "@/components/home/TrendingRail";
import { WhyUs } from "@/components/home/WhyUs";
import { BestSellers } from "@/components/home/BestSellers";
import { Editorial } from "@/components/home/Editorial";
import { SocialProof } from "@/components/home/SocialProof";
import { LimitedDrop } from "@/components/home/LimitedDrop";
import { Newsletter } from "@/components/home/Newsletter";
import { CategoryCard } from "@/components/product/CategoryCard";

export default async function HomePage() {
  const products = await ProductService.list();
  const bestSellers = products.filter((p) => p.badges?.includes("bestseller"));
  const limited = products.find((p) => p.badges?.includes("limited"));
  // Configurable end date for the current promotion.
  const dropEndDate = new Date(Date.now() + 1000 * 60 * 60 * 52).toISOString();

  return (
    <>
      <Hero />
      <TrendingRail products={products.slice(0, 8)} />

      <section className="container-page pb-16 md:pb-24">
        <h2 className="font-display text-3xl md:text-5xl text-charcoal text-balance mb-10 md:mb-14">
          Shop by category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.slice(0, 6).map((c, i) => (
            <CategoryCard key={c.id} category={c} size={i === 0 ? "lg" : "md"} />
          ))}
        </div>
      </section>

      <WhyUs />

      <BestSellers products={bestSellers.length ? bestSellers : products.slice(0, 5)} />

      <Editorial products={products.slice(4, 9)} />

      {limited && <LimitedDrop product={limited} endDate={dropEndDate} />}

      <SocialProof reviews={allReviews} />

      <Newsletter />
    </>
  );
}
