'use client';

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  DashboardOverviewData,
  InvestmentsOverview,
  MaintenanceOverview,
  TotalCollectionOverview,
} from "@/redux/features/dashboard/dashboardTypes";

export default function InvestmentMaintenance({ data }: { data: DashboardOverviewData }) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3">
        <InvestmentCard investments={data?.investments} />
      </div>
      <div className="w-full lg:w-1/3">
        <MaintenanceCard maintenance={data?.maintenance} />
      </div>
      <div className="w-full lg:w-1/3">
        <TotalCollectionCard totalCollection={data?.totalCollection} />
      </div>
    </div>
  );
}

/* ==========================================================================
   Investment Card Component
   ========================================================================== */
function InvestmentCard({ investments }: { investments?: InvestmentsOverview }) {
  const formatCurrency = (val: number = 0) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  const items = [
    { label: "Total Investor", value: investments?.totalInvestors ?? 0 },
    { label: "Passive Investor", value: investments?.passiveInvestors ?? 0 },
    { label: "Active Investor", value: investments?.activeInvestors ?? 0 },
    { label: "Total Investment", value: formatCurrency(investments?.totalInvestmentAmount ?? 0) },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[260px] h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Investments</h2>
        <button className="text-orange-500 font-medium text-sm hover:underline">
          View all
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex justify-between items-center">
            <span className="text-[#404040] font-medium">{item.label}</span>
            <span className="font-semibold text-gray-900">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   Maintenance Card Component
   ========================================================================== */
function MaintenanceCard({ maintenance }: { maintenance?: MaintenanceOverview }) {
  const items = [
    { label: "Pending", value: maintenance?.pending ?? 0 },
    { label: "In Progress", value: maintenance?.inProgress ?? 0 },
    { label: "Completed", value: maintenance?.completed ?? 0 },
    { label: "Urgent Request", value: maintenance?.urgentRequests ?? 0 },
    { label: "Emergency Request", value: maintenance?.emergencyRequests ?? 0, danger: true },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[260px] w-full h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">Maintenance</h2>
        <button className="text-orange-500 font-medium text-sm hover:underline">
          View all
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex justify-between items-center">
            <span className="text-[#404040] font-medium">{item.label}</span>
            <span className={item.danger ? "text-red-500 font-bold" : "text-gray-900 font-semibold"}>
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   Total Collection Card Component
   ========================================================================== */
function TotalCollectionCard({ totalCollection }: { totalCollection?: TotalCollectionOverview }) {
  const formatCurrency = (val: number = 0) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const changePercent = totalCollection?.changePercent ?? 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-w-[260px] w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 font-medium">Total Collection</span>
          <span
            className={`font-medium text-xs px-3 py-1 rounded-md ${
              isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isPositive ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`}
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-4">
          {formatCurrency(totalCollection?.total ?? 0)}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 border rounded-xl p-3">
          <span className="bg-green-100 text-green-600 rounded-md p-2">
            <ArrowUp size={18} />
          </span>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalCollection?.income ?? 0)}
            </div>
            <div className="text-green-600 text-sm">Income</div>
          </div>
        </div>

        <div className="flex items-center gap-3 border rounded-xl p-3">
          <span className="bg-red-100 text-red-600 rounded-md p-2">
            <ArrowDown size={18} />
          </span>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalCollection?.expense ?? 0)}
            </div>
            <div className="text-red-600 text-sm">Expense</div>
          </div>
        </div>
      </div>
    </div>
  );
}