import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      {/* Hero Skeleton */}
      <section className="grid md:grid-cols-2 gap-12 md:gap-4 py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6 w-full text-center md:text-left">
          <Skeleton className="h-5 w-32 mx-auto md:mx-0" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-3/4 mx-auto md:mx-0" />
          <div className="flex gap-3 justify-center md:justify-start">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Marquee Skeleton */}
        <div className="hidden md:flex flex-col gap-4">
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </section>

      <Separator />

      {/* Stats/Marquee Area Skeleton */}
      <div className="py-12 px-6">
        <Skeleton className="h-32 w-full max-w-5xl mx-auto rounded-xl" />
      </div>

      <Separator />

      {/* Features Skeleton */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
