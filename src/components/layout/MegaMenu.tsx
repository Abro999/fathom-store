import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export function MegaMenu() {
  return (
    <div className="absolute left-0 right-0 top-full bg-cream border-t border-b border-line shadow-[0_20px_40px_-20px_rgba(18,24,27,0.15)]">
      <div className="container-page py-8 grid grid-cols-4 gap-6">
        {categories.slice(0, 4).map((c) => (
          <Link key={c.id} href={`/category/${c.slug}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft mb-3">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="20vw"
                className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
              />
            </div>
            <p className="font-display text-lg text-charcoal">{c.title}</p>
            <p className="text-xs text-charcoal/50 font-sans">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
