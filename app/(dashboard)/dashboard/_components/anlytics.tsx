"use client";
import { useEffect, useState } from "react";

import Tenants from "@/icons/Tenants";
import React from "react";
import { Landlords } from "@/icons/Landlords";
import { Property } from "@/icons/Property";
import { Vendors } from "@/icons/Vendors";
import { useGetOverAllIncomeQuery } from "@/redux/features/dashboard/dashboardApi";
import { DashboardOverviewData } from "@/redux/features/dashboard/dashboardTypes";

// Mocked backend data
const mockAnalyticsData = {
  totalTenants: 1205,
  totalProperties: 500,
  totalLeases: 800,
  totalIncome: 350000,
};

// Replace this function with your actual API call later
async function fetchAnalyticsData() {
  // Simulate network delay with a timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnalyticsData);
    }, 1000);
  });
}

interface AnalyticsData {
  totalTenants: number;
  totalProperties: number;
  totalLeases: number;
  totalIncome: number;
}

export default function Analytics({ statsData }: { statsData: DashboardOverviewData }) {

  console.log(statsData,"statsData");

  const { activeTenants, activeVendors, totalProperties } = statsData || {};

  
  
  const { data: overAllIncome } = useGetOverAllIncomeQuery();
  console.log(overAllIncome);

  const [analyticsData, setAnalyticsData] = useState({
    totalTenants: 0,
    totalProperties: 0,
    totalLeases: 0,
    totalIncome: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data as AnalyticsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show a loading spinner while the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h3 className="text-lg font-medium text-[#707070] mb-4">Analytics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Tenants"
            value={activeTenants}
            icon={<Tenants />}
          />
          <StatCard
            title="Total Vendors"
            value={activeVendors}
            icon={<Vendors />}
          />

          <StatCard
            title="Total Properties"
            value={totalProperties}
            icon={<Landlords />}
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
