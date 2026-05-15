"use client";
import React from "react";
import { useGetSubscriptionStatsQuery } from "@/redux/features/subscription/SubscriptionApi";
import Diamond from "@/components/icons/subscription/Diamond";
import Monthly from "@/components/icons/subscription/Monthly";
import People from "@/components/icons/subscription/People";
import Revinew from "@/components/icons/subscription/Revinew";
import { StatsCardsSkeleton } from "@/components/common/Loader";

export default function StatsCards() {
  const { data: stats, isLoading, error } = useGetSubscriptionStatsQuery();

  // Prepare card data from real API response
  const cardData = [
    {
      icon: People,
      value: stats?.totalSubs ?? 0,
      label: "Total Subscribers",
    },
    {
      icon: Monthly,
      value: stats?.monthlyPlan ?? 0,
      label: "Monthly Plan",
    },
    {
      icon: Diamond,
      value: stats?.yearlyPlan ?? 0,
      label: "Yearly Plan",
    },
    {
      icon: Revinew,
      value: `$${stats?.revenue?.totalPlanAmount ?? 0}`,
      label: "Revenue",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
     <StatsCardsSkeleton />
    );
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
      {cardData.map((item, idx) => (
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