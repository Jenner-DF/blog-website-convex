import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article>
        {/* Hero Image Skeleton */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-10">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Presence Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Body Skeleton */}
        <div className="px-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </article>
    </div>
  );
}
