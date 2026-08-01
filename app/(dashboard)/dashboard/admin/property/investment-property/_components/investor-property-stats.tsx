import React from 'react';
import { useGetInvestorsApartmentsStatsQuery } from '@/redux/features/apartments/apartmentsApi';
import { Landlords } from '@/icons/Landlords';
import { Vendors } from '@/icons/Vendors';
import { InvestorStatsResponse } from '@/redux/features/apartments/apartmentsTypes';



export default function InvestorPropertyStats() {
  const { data: apartmentsStats } = useGetInvestorsApartmentsStatsQuery();

  // API response থেকে নতুন key-গুলো Destructure করা হলো
  const {
    totalProperty = 0,
    totalInvestedProperty = 0,
    totalActive = 0,
    totalPassive = 0,
  } = (apartmentsStats as InvestorStatsResponse) || {};

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Property"
          value={totalProperty}
          icon={<Landlords />}
        />
        <StatCard
          title="Total Invested Property"
          value={totalInvestedProperty}
          icon={<Vendors />}
        />
        <StatCard
          title="Total Active"
          value={totalActive}
          icon={<Landlords />}
        />
        <StatCard
          title="Total Passive"
          value={totalPassive}
          icon={<Vendors />}
        />
      </div>
    </div>
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