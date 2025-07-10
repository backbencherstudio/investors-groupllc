"use client";
// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
import Tenants from "@/icons/Tenants";
import { Landlords } from "@/icons/Landlords";
import { Property } from "@/icons/Property";
import { Vendors } from "@/icons/Vendors";

// Replacing the data with static values from your design
const analyticsData = {
  totalApply: 45,
  pending: 12,
  approved: 29,
  rejected: 4,
};

export default function InvestmentApplicationStats() {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium text-[#707070] mb-4">Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Apply"
            value={analyticsData.totalApply}
            icon={<Tenants />}
            bgColor="bg-[#F4F1E6]"
          />
          <StatCard
            title="Pending"
            value={analyticsData.pending}
            icon={<Landlords />}
            bgColor="bg-[#FFF2E6]"
          />
          <StatCard
            title="Approved"
            value={analyticsData.approved}
            icon={<Vendors />}
            bgColor="bg-[#E6F5F1]"
          />
          <StatCard
            title="Rejected"
            value={analyticsData.rejected}
            icon={<Property />}
            bgColor="bg-[#FFE6E6]"
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
  bgColor: string;
}

const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-[12px] shadow-sm p-6">
      <div>
        <div className={`p-4 rounded-md ${bgColor} text-orange-600`}>
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
