// components/ui/StatsCardsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsSkeletonProps {
  count?: number; // Number of skeleton cards to show, defaults to 4
  className?: string; // Optional additional classes
}

export default function StatsCardsSkeleton({ 
  count = 4, 
  className = "" 
}: StatsCardsSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex items-center bg-white rounded-xl shadow p-4 lg:p-6">
          <Skeleton className="w-16 h-16 rounded-lg mr-4" />
          <div className="flex-1">
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}