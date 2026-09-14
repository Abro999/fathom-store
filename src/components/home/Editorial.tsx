import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export function Editorial({ products }: { products: Product[] }) {
  const [big, ...small] = products;

  return (
    <section className="bg-paper-soft py-16 md:py-24">
      <div className="container-page">
        <div className="max-w-xl mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl text-charcoal text-balance">
            Picked for the internet's slower corners
          </h2>
          <p className="font-sans text-charcoal/60 mt-3">
            Not a bestseller list — just the things our team keeps recommending to friends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {big && (
            <Link href={`/product/${big.slug}`} className="group relative block overflow-hidden aspect-[4/5] md:aspect-auto md:row-span-2">
              <Image
                src={big.images[0].url}
                alt={big.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="font-sans text-cream/70 text-sm mb-1">{big.descriptor}</p>
                <h3 className="font-display text-2xl md:text-3xl text-cream">{big.title}</h3>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-2 gap-6">
            {small.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group relative block overflow-hidden aspect-square">
                <Image
                  src={p.images[0].url}
                  alt={p.title}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-display text-base text-cream leading-tight">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
