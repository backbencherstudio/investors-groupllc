// components/SubscriptionList.js

import { Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Paginations } from "@/app/(dashboard)/dashboard/_components/pagination";


const subscriptionData = [
  {
    id: 1,
    date: "Apr 28, 2024",
    planType: "Trial",
    amount: "Free",
    methods: "-",
    status: "Trial",
  },
  {
    id: 2,
    date: "May 28, 2024",
    planType: "Premium",
    amount: "$29",
    methods: "Credit Card",
    status: "Paid",
  },
  {
    id: 3,
    date: "Jun 28, 2024",
    planType: "Basic",
    amount: "Free",
    methods: "-",
    status: "Free Plan",
  },
  {
    id: 4,
    date: "July 28, 2025",
    planType: "Basic",
    amount: "Free",
    methods: "-",
    status: "Free Plan",
  },
  {
    id: 5,
    date: "Aug 28, 2024",
    planType: "Premium",
    amount: "$29",
    methods: "Paypal",
    status: "Paid",
  },
];

const PAGE_SIZE = 7;

export function SubscriptionList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(subscriptionData.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = subscriptionData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Subscription List</h2>
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
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-sm">
              <th className="py-3 px-4 text-left font-medium">Paid Date</th>
              <th className="py-3 px-4 text-left font-medium">Plan Type</th>
              <th className="py-3 px-4 text-left font-medium">Amount</th>
              <th className="py-3 px-4 text-left font-medium">Methods</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((subscription, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700">{subscription.date}</td>
                <td className="py-3 px-4 text-gray-700">
                  {subscription.planType}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {subscription.amount}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {subscription.methods}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      subscription.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <Link href={`/subscriptions/${subscription.id}`}>
                    <Eye className="w-5 h-5 text-gray-400 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="text-sm text-zinc-500">
          {`Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
            currentPage * PAGE_SIZE,
            subscriptionData.length
          )} of ${subscriptionData.length} results`}
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
