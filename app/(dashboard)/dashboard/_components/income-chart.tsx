"use client";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React from "react";

import { useGetOverAllIncomeQuery } from "@/redux/features/dashboard/dashboardApi";
import IncomeChart from "./IncomeChart";
import Sidebar from "./team-sidebar";
import { DashboardOverviewData } from "@/redux/features/dashboard/dashboardTypes";

// Sample data
const data = [
  { month: "Jan", earn: 32000, profit: 12000, roi: 20343 },
  { month: "Feb", earn: 45000, profit: 15000, roi: 24531 },
  { month: "Mar", earn: 55000, profit: 16000, roi: 12323 },
  { month: "Apr", earn: 29000, profit: 10000, roi: 19343 },
  { month: "May", earn: 67000, profit: 18000, roi: 25343 },
  { month: "Jun", earn: 34000, profit: 11000, roi: 20343 },
  { month: "Jul", earn: 21000, profit: 8000, roi: 17343 },
  { month: "Aug", earn: 59000, profit: 17000, roi: 23343 },
  { month: "Sep", earn: 32000, profit: 10500, roi: 20343 },
  { month: "Oct", earn: 69000, profit: 19000, roi: 26343 },
  { month: "Nov", earn: 52000, profit: 13000, roi: 22343 },
  { month: "Dec", earn: 19000, profit: 7500, roi: 15343 },
];

const COLORS = {
  earn: "#DD8800",
  profit: "#F1C796",
  roi: "#FCF1E6",
};

type TooltipPayload = {
  value: number;
  dataKey: string;
  name: string;
}[];

export default function IncomeChartSidebar({
  data,
}: {
  data: DashboardOverviewData;
}) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="w-full lg:w-[75%] bg-gray-100 p-3 sm:p-4 rounded-md">
          {/* 795px div content */}
          <IncomeChart />
        </div>
        <div className="w-full lg:w-[25%] rounded-md">
          {/* 259px div content */}
          <Sidebar sidebarData={data} />
        </div>
      </div>
    </>
  );
}
