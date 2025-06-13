"use client";
import { useEffect, useState } from "react";

import Tenants from "@/icons/Tenants";
import React from "react";
import { Landlords } from "@/icons/Landlords";
import { Property } from "@/icons/Property";
import { Vendors } from "@/icons/Vendors";

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
      resolve(mockAnalyticsData); // Return the mocked data
    }, 1000); // 1 second delay to simulate fetching
  });
}

export default function Analytics() {
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
        const data = await fetchAnalyticsData(); // Fetch the mocked data
        setAnalyticsData(data);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Tenants"
            value={analyticsData.totalTenants}
            icon={<Tenants />}
          />
          <StatCard
            title="Total Vendors"
            value={analyticsData.totalIncome}
            icon={<Vendors />}
          />

          <StatCard
            title="Total Properties"
            value={analyticsData.totalProperties}
            icon={<Landlords />}
          />
          <StatCard
            title="Total Leases"
            value={analyticsData.totalLeases}
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
