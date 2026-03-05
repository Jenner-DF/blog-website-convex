// components/web/BlogSkeletonGrid.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogsListSkeleton() {
  return (
    // MATCH THE GRID CLASSES FROM YOUR page.tsx EXACTLY
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* {Array.from({length:8}).map()} */}
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden border-none shadow-md">
          {/* Image Placeholder */}
          <Skeleton className="h-48 w-full rounded-none" />
          <CardContent className="p-4 space-y-3">
            {/* Title */}
            <Skeleton className="h-5 w-3/4" />
            {/* Author */}
            <Skeleton className="h-4 w-1/4" />
            {/* Body Lines */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
