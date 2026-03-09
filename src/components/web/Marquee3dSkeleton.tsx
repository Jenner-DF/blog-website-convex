import { Skeleton } from "../ui/skeleton";

export default function Marquee3dSkeleton() {
  return (
    <div className="hidden md:flex flex-col gap-4">
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  );
}
