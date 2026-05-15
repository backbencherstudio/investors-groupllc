// components/ui/StatsCardsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsSkeletonProps {
  count?: number; // Number of skeleton cards to show, defaults to 4
  className?: string; // Optional additional classes
}

function StatsCardsSkeleton({ 
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



interface TableSkeletonProps {
  rows?: number; // Number of rows to show, defaults to 5
  columns?: number; // Number of columns, defaults to 6
  showHeader?: boolean; // Show header skeleton, defaults to true
  className?: string; // Additional classes
}

function TableSkeleton({ 
  rows = 5, 
  columns = 6,
  showHeader = true,
  className = ""
}: TableSkeletonProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Table Header */}
      {showHeader && (
        <div className="flex gap-4 mb-4 pb-2 border-b">
          {Array.from({ length: columns }).map((_, idx) => (
            <Skeleton key={`header-${idx}`} className="h-6 flex-1" />
          ))}
        </div>
      )}
      
      {/* Table Rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex gap-4 items-center">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton key={`col-${rowIdx}-${colIdx}`} className="h-8 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export { StatsCardsSkeleton, TableSkeleton };