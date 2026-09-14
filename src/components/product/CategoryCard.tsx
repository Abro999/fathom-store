import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/types";

export function CategoryCard({ category, size = "md" }: { category: Category; size?: "sm" | "md" | "lg" }) {
  const aspect = size === "lg" ? "aspect-[16/10]" : size === "sm" ? "aspect-square" : "aspect-[4/5]";

  return (
    <Link href={`/category/${category.slug}`} className="group relative block overflow-hidden">
      <div className={`relative ${aspect} bg-ink-soft`}>
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl text-cream">{category.title}</h3>
            <p className="text-cream/70 text-sm font-sans mt-0.5 max-w-[220px]">{category.description}</p>
          </div>
          <span className="w-9 h-9 shrink-0 rounded-full bg-cream/15 backdrop-blur flex items-center justify-center text-cream transition-transform duration-300 ease-smooth group-hover:translate-x-1 group-hover:-translate-y-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
