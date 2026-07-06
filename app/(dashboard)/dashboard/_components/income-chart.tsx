"use client";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React from "react";


import { useGetOverAllIncomeQuery } from "@/redux/features/dashboard/dashboardApi";
import IncomeChart from "./IncomeChart";

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
