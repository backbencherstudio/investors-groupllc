"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paginations } from "../../../_components/pagination";
import Link from "next/link";
import { Eye } from "lucide-react";

const investors = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Kathryn Murphy",
    contact: "+231 06-75820711",
    investType: ["Active", "Passive"],
    investCount: 3,
    totalInvested: "$45,000",
    status: "Invested",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Robert Fox",
    contact: "+231 06-75820711",
    investType: ["Active", "Passive"],
    investCount: 3,
    totalInvested: "$45,000",
    status: "Invested",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Cameron Williamson",
    contact: "+231 06-75820711",
    investType: [],
    investCount: "-",
    totalInvested: "$0.00",
    status: "Not Invested",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Ronald Richards",
    contact: "+231 06-75820711",
    investType: ["Active"],
    investCount: 1,
    totalInvested: "$45,000",
    status: "Invested",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Arlene McCoy",
    contact: "+231 06-75820711",
    investType: ["Passive"],
    investCount: 1,
    totalInvested: "$45,000",
    status: "Invested",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Ronald Richards",
    contact: "+231 06-75820711",
    investType: ["Active"],
    investCount: 1,
    totalInvested: "$45,000",
    status: "Invested",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Ronald Richards",
    contact: "+231 06-75820711",
    investType: ["Active"],
    investCount: 1,
    totalInvested: "$45,000",
    status: "Invested",
  },
];

const PAGE_SIZE = 7;

export function InvestorTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(investors.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = investors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Active Investor List</h2>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-[200px] lg:w-[300px] bg-zinc-100 rounded-md"
            />
          </div>
          <div className="relative">
            <Select>
              <SelectTrigger className="w-[100px] md:w-[120px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Select>
              <SelectTrigger className="w-[100px] md:w-[120px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-sm">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Contact</th>
              <th className="py-3 px-4 text-left font-medium">Invest Type</th>
              <th className="py-3 px-4 text-left font-medium">Invest Count</th>
              <th className="py-3 px-4 text-left font-medium">
                Total Invested
              </th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((investor, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={investor.avatar}
                    alt={investor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 leading-tight">
                      {investor.name}
                    </div>
                    <div className="text-xs text-gray-400">Investor</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{investor.contact}</td>
                <td className="py-3 px-4 flex gap-2">
                  {investor.investType.length === 0 && (
                    <span className="text-gray-400">-</span>
                  )}
                  {investor.investType.map((type, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        type === "Active"
                          ? "bg-blue-100 text-blue-600 border border-blue-200"
                          : "bg-orange-100 text-orange-500 border border-orange-200"
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {investor.investCount}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {investor.totalInvested}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      investor.status === "Invested"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-50 text-orange-400"
                    }`}
                  >
                    {investor.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <Link href={`/dashboard/user-manage/investor/${investor.id}`}>
                    <Eye className="w-5 h-5 text-gray-400 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="text-sm text-zinc-500">
          {`Showing ${
            investors.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
          }–${Math.min(currentPage * PAGE_SIZE, investors.length)} of ${
            investors.length
          } results`}
        </div>
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
