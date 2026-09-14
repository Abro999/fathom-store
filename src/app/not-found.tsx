import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState
        title="This page wandered off"
        description="The page you're looking for doesn't exist or may have moved."
        actionLabel="Back to shop"
        actionHref="/shop"
      />
    </div>
  );
}
