"use client";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

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

// Custom Tooltip to include ROI
const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any, label: string } ) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: COLORS.earn }}
          />
          <span>Earn</span>
          <span className="ml-auto font-semibold">
            ${payload[0].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: COLORS.profit }}
          />
          <span>Profit</span>
          <span className="ml-auto font-semibold">
            ${payload[1].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: COLORS.roi }}
          />
          <span>ROI</span>
          <span className="ml-auto font-semibold">
            {data.find((d) => d.month === label)?.roi}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function IncomeChartSidebar() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[75%] bg-gray-100 p-4 rounded-md">
          {/* 795px div content */}
          <IncomeChart />
        </div>
        <div className="w-full lg:w-[25%]  rounded-md">
          {/* 259px div content */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export function IncomeChart() {
  // Example income stats (you can fetch from backend later)
  const income = useMemo(() => data.reduce((acc, d) => acc + d.earn, 0), []);
    const totalRoi = useMemo(
      () => (data.reduce((acc, d) => acc + d.roi, 0) / data.length).toFixed(2),
      []
    );

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-500">Over all income</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${income.toLocaleString()}
            </span>
            <span className="bg-green-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg
                className="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 20 20"
              >
                <path d="M5 10l5-5 5 5" />
              </svg>
              {totalRoi}%
            </span>
          </div>
        </div>
        <div>
          <button className="border rounded-xl px-4 py-2 text-base font-medium text-gray-700 flex items-center gap-2">
            This Year{" "}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 20 20"
            >
              <path d="M7 7l3-3 3 3M7 13l3 3 3-3" />
            </svg>
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
          barCategoryGap="40%"
          barGap={0}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="5 5"
            stroke="#ececec"
          />
          <XAxis
            axisLine={false}
            dataKey="month"
            // tick={{ fontSize: 16, fill: "#bcbcbc" }}
            tickLine={false}
            padding={{ left: 10, right: 10 }}
            dy={15}
          />
          <YAxis
            axisLine={false}
            tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            // domain={[0, 'dataMax + 10000']}
            // tick={{ fill: "#bcbcbc", fontSize: 16 }}
          />
          <Tooltip content={<CustomTooltip active={true} payload={[]} label={""} />} />
          <Bar
            dataKey="earn"
            stackId="a"
            fill={COLORS.earn}
            radius={[4, 4, 4, 4]}
            barSize={12}
            // background={{ fill: "#fff", stroke: "#fff" }}
          />
          <Bar
            dataKey="profit"
            stackId="a"
            fill={COLORS.profit}
            radius={[4, 4, 4, 4]}
            barSize={12}
            shape={(props: any) => (
              <rect
                {...props}
                y={props.y - 8} // offset upward by the gap amount
                height={props.height}
                rx={4}
                fill="#F1C796"
              />
            )}
          />
          <Bar
            dataKey="roi"
            stackId="a"
            fill={COLORS.roi}
            radius={[4, 4, 4, 4]}
            barSize={12}
            shape={(props: any) => (
              <rect
                {...props}
                y={props.y - 16} // offset upward by the gap amount
                height={props.height}
                rx={4}
                fill="#FCF1E6"
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="bg-white rounded-2xl px-6 py-5 shadow-sm w-full ">
      {/* Rent Collected Section */}
      <div className="border border-gray-200 rounded-xl px-6 py-4 mb-6">
        <p className="text-sm text-[#404040] mb-2">This Month</p>
        <h2 className="text-2xl font-bold text-[#170A00]">$52,400</h2>
        <p className="text-gray-600 font-medium">Rent Collected</p>

        {/* Progress Bar */}
        <div className="my-2">
          <div className="h-1 rounded-full bg-[#EDEDED] w-full">
            <div
              className="h-1 rounded-full bg-[#DD8800]"
              style={{ width: `${(1005 / 1205) * 100}%` }}
            />
          </div>
          <p className="text-sm text-[#707070] mt-2">1,005/1,205</p>
        </div>
      </div>

      {/* Team Section */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Team</h3>

      <ul className="space-y-4">
        {teamMembers.map((member) => (
          <li key={member.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={member.image}
                alt={member.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm text-gray-900 truncate">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const teamMembers = [
  {
    name: "Esther Howard",
    role: "Financial",
    image: "/images/team1.jpg", // Replace with actual path
  },
  {
    name: "Darlene Robertson",
    role: "Financial",
    image: "/images/team2.jpg",
  },
  {
    name: "Bessie Cooper",
    role: "Assignment",
    image: "/images/team3.jpg",
  },
];
