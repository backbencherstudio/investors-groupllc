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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {cardData?.map((item: any, idx: number) => (
        <div
          key={idx}
          className="flex items-center bg-white rounded-xl shadow p-4 lg:p-6 min-w-[180px]"
        >
          {/* Icon box */}
          <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-orange-50 mr-4 ">
            {item.icon && <item.icon />}
          </div>
          {/* Number and label */}
          <div>
            <div className="text-3xl font-bold text-neutral-900 leading-tight">
              {item.value}
            </div>
            <div className="text-gray-500 text-lg font-medium mt-1">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
