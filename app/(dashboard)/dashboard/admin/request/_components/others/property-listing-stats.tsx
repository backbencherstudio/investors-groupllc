"use client";

import Tenants from "@/icons/Tenants";
import React from "react";
import { Landlords } from "@/icons/Landlords";
import { Property } from "@/icons/Property";
import { Vendors } from "@/icons/Vendors";
import { PropertyListingRequestStats } from "@/redux/features/request/RequestTypes";
import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";

interface PropertyListingStatsProps {
  stats?: PropertyListingRequestStats;
  isLoading?: boolean;
}

export default function PropertyListingStats({ stats, isLoading }: PropertyListingStatsProps) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
            <h3 className="text-lg font-medium text-[#707070] mb-4">Property Listing Requests Stats</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Tenants"
            value={stats?.totalTenants ?? 0}
            icon={<Tenants />}
          />
          <StatCard
            title="Total Vendors"
            value={stats?.totalVendors ?? 0}
            icon={<Vendors />}
          />

          <StatCard
            title="Total Properties"
            value={stats?.totalProperties ?? 0}
            icon={<Landlords />}
          />
          <StatCard
            title="Total Leases"
            value={stats?.totalLeases ?? 0}
            icon={<Property />}
          />
        </div>
      </div>
    </>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-[12px] shadow-sm p-6">
      <div>
        <div className="p-4 rounded-md bg-[#FCF1E6] text-orange-600">
          {icon}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
        <p className="text-[#707070] font-medium text-lg">{title}</p>
      </div>
    </div>
  );
};
