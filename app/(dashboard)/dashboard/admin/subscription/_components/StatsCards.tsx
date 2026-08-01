"use client";

import { StatsCardsSkeleton } from "@/components/common/Loader";

export default function StatsCards({
  cardData,
  isLoading,
  error,
}: {
  cardData?: any;
  isLoading?: any;
  error?: any;
}) {
  // Loading state
  if (isLoading) {
    return <StatsCardsSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-xl">
        Failed to load subscription stats
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {cardData?.map((item: any, idx: number) => (
        <div
          key={idx}
          className="flex items-center bg-white rounded-xl shadow p-3 sm:p-4 lg:p-6 w-full"
        >
          {/* Icon box */}
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg bg-orange-50 mr-3 sm:mr-4 shrink-0">
            {item.icon && <item.icon />}
          </div>
          {/* Number and label */}
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight truncate">
              {item.value}
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-500 font-medium mt-1 truncate">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
