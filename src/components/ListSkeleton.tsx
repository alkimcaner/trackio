import ResponsiveGrid from "./ResponsiveGrid";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export default function ListSkeleton() {
  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center gap-4">
          {/* List name */}
          <Skeleton className="h-8 w-72" />
        </div>
        {/* List owner */}
        <Skeleton className="mt-2 h-4 w-48" />
      </div>
      {/* List description */}
      <Skeleton className="h-16 w-full" />
      <Separator />
      <ResponsiveGrid>
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </ResponsiveGrid>
    </section>
  );
}
