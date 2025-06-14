"use client";

import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { InvestmentPerformance } from "./_components/investment-performance";

interface Tenant {
  avatar: string;
  name: string;
  phone: string;
  email: string;
  userId: string;
  address: string;
  employer: string;
  jobTitle: string;
  salary: string;
}

const tenant: Tenant = {
  avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  name: "Johan Mitchell",
  phone: "+1555-123-7890",
  email: "johan@email.com",
  userId: "#T762349",
  address: "Maple Grove 42 Elm St, Austin, TX",
  employer: "Mahher Hereoan",
  jobTitle: "Business",
  salary: "$10,000-$20,000",
};

const data = [
  {
    name: "Jan",

    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",

    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",

    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",

    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",

    pv: 4800,
    amt: 2181,
  },
];

export default function InvestorDetails() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="xl:col-span-8 bg-gray-50">
          {/* Tenant Card */}
          <div className="bg-gray-50">
            {/* Card */}
            <div className="bg-white rounded-xl p-6 mb-6 relative shadow-sm">
              <div className="flex items-start gap-4">
                <img
                  src={tenant.avatar}
                  className="rounded-full object-cover w-16 h-16"
                  alt=""
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-xl text-neutral-900 mb-1 truncate">
                        {tenant.name}
                      </div>
                      <div className="flex items-center gap-3 text-[15px] text-neutral-700">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4 text-orange-500" />
                          {tenant.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-orange-500" />
                          {tenant.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <button
                        className="bg-orange-500 hover:bg-orange-600 rounded-lg p-2 text-white cursor-pointer"
                        title="Chat"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-2 text-zinc-500  cursor-pointer"
                        title="More"
                        onClick={toggleDropdown}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                          >
                            Edit
                          </a>
                          <div className="border-t border-dashed border-gray-200 my-1"></div>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                          >
                            Disable Chat
                          </a>
                          <div className="border-t border-dashed border-gray-200 my-1"></div>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                          >
                            Block
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-5 border-zinc-200" />
              {/* Details grid */}
              <div className=" text-[15px]">
                <div className="flex justify-between">
                  <div className="text-neutral-700">User ID</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.userId}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Current Address</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.address}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Employer Name</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.employer}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Job Title</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.jobTitle}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Annual Salary</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.salary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Dashboard Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Left: Total Investment Return */}
              <div className="col-span-1 flex items-center justify-center bg-zinc-50 rounded-lg min-h-[140px]">
                <div className="text-center">
                  <div className="text-xs text-zinc-400 mb-1">
                    Total Investment Return
                  </div>
                  <div className="text-3xl font-semibold text-neutral-900 mb-1">
                    $128,00.00
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-green-500 font-medium">
                      +$50 (0.5%)
                    </span>
                    <span className="text-zinc-400">Monthly return</span>
                  </div>
                </div>
              </div>
              {/* Right: Stat Cards */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <rect
                        width="16"
                        height="20"
                        x="4"
                        y="2"
                        rx="2"
                        fill="#F59E42"
                      />
                      <path
                        d="M8 6h8M8 10h8M8 14h4"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">
                      Total Investment
                    </div>
                    <div className="font-semibold text-lg text-neutral-900">
                      $45,000.0
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <rect
                        width="16"
                        height="20"
                        x="4"
                        y="2"
                        rx="2"
                        fill="#F59E42"
                      />
                      <path
                        d="M8 6h8M8 10h8M8 14h4"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Total Earnings</div>
                    <div className="font-semibold text-lg text-neutral-900">
                      $1,450
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <rect
                        width="16"
                        height="20"
                        x="4"
                        y="2"
                        rx="2"
                        fill="#F59E42"
                      />
                      <path
                        d="M8 6h8M8 10h8M8 14h4"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Invest Count</div>
                    <div className="font-semibold text-lg text-neutral-900">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Details Section */}
            <div className="divide-y divide-zinc-100">
              {/* Active Investment */}
              <div className="py-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm text-zinc-500">Invest Type</span>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                    Active
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Invest Count</span>
                    <span className="text-neutral-900 font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Investment Value</span>
                    <span className="text-neutral-900 font-medium">
                      $75,000.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Profit</span>
                    <span className="text-neutral-900 font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Hold Period</span>
                    <span className="text-neutral-900 font-medium">
                      Until Property is Sold
                    </span>
                  </div>
                </div>
              </div>
              {/* Passive Investment */}
              <div className="py-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm text-zinc-500">Invest Type</span>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-500 border border-orange-200">
                    Passive
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Invest Count</span>
                    <span className="text-neutral-900 font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Investment Value</span>
                    <span className="text-neutral-900 font-medium">
                      $10,000.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Profit value</span>
                    <span className="text-neutral-900 font-medium">
                      $50/month (2 x $25)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Documents Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
            <h3 className="font-semibold mb-4 text-base">Documents</h3>
            <div className="flex flex-wrap gap-4">
              {[
                "Lease Agreement",
                "ID Verification",
                "Proof of Income",
                "Pay Receipts",
              ].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white border border-zinc-100 rounded-lg px-4 py-3 w-full sm:w-auto min-w-[180px] max-w-[220px] flex-1"
                >
                  <div className="bg-red-100 rounded-md p-2">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <rect
                        width="16"
                        height="20"
                        x="4"
                        y="2"
                        rx="2"
                        fill="#F87171"
                      />
                      <path
                        d="M8 6h8M8 10h8M8 14h4"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{name}</div>
                    <div className="text-xs text-neutral-400">12 MB</div>
                  </div>
                  <button className="text-zinc-400 hover:text-orange-500">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M12 4v12m0 0l-4-4m4 4l4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="4"
                        y="18"
                        width="16"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm w-full col-span-4">
          <div>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 12,
                right: 45,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#D80"
                strokeDasharray="5 5"
              />
              {/* <Line
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
                strokeDasharray="3 4 5 2"
              /> */}
            </LineChart>
          </div>
          {/* Invested Property Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Invested Property</h3>
              <span className="text-sm text-neutral-500 flex items-center gap-1 cursor-pointer select-none">
                All Type
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="space-y-4 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
              {/* Card 1 */}
              <div className="bg-white rounded-lg p-4 border border-zinc-100 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
                    alt="property"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between font-semibold text-base text-neutral-900 flex items-center gap-2">
                      Murphy House{" "}
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-500 border border-green-100">
                        Passive
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Start date: Jan 01, 2025
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Investment Amount</span>
                  <span className="text-neutral-900 font-medium">$5,000</span>
                </div>
                {/* Drawer */}
                <InvestmentPerformance />
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-lg p-4 border border-zinc-100 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=80&q=80"
                    alt="property"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between font-semibold text-base text-neutral-900 flex items-center gap-2">
                      Murphy House{" "}
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-500 border border-green-100">
                        Passive
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Start date: Jan 01, 2025
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Investment Amount</span>
                  <span className="text-neutral-900 font-medium">$5,000</span>
                </div>
                {/* Drawer */}
                <InvestmentPerformance />
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-lg p-4 border border-zinc-100 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=80&q=80"
                    alt="property"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between font-semibold text-base text-neutral-900  gap-2">
                      Murphy House{" "}
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                        Active
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Start date: Jan 01, 2025
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Investment Amount</span>
                  <span className="text-neutral-900 font-medium">$5,000</span>
                </div>
                {/* Drawer */}
                <InvestmentPerformance />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
