import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-page py-10 md:py-14">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-4 w-32 mb-10" />
      <ProductGridSkeleton />
    </div>
  );
}
