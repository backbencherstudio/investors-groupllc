"use client";
import React, { useState } from "react";
import { Eye } from "lucide-react";

import Link from "next/link";
import { Paginations } from "../../../_components/pagination";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const landlords = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
    ],
    subscription: "Basic",
    joinedDate: "May 2, 2025",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=80&q=80",
    ],
    subscription: "Premium",
    joinedDate: "April 15, 2026",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [],
    subscription: "",
    joinedDate: "July 4, 2023",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [],
    subscription: "Basic",
    joinedDate: "November 30, 2024",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=80&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80",
    ],
    subscription: "Premium",
    joinedDate: "February 14, 2027",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
    ],
    subscription: "Basic",
    joinedDate: "September 1, 2025",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Audry hawq",
    contact: "+231 06-75820711",
    properties: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80",
    ],
    subscription: "Basic",
    joinedDate: "March 21, 2025",
  },
];

const PAGE_SIZE = 7;

export function LandlordTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(landlords.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = landlords.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Active Landlord List</h2>
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
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-sm ">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Contact</th>
              <th className="py-3 px-4 text-left font-medium">Property</th>
              <th className="py-3 px-4 text-left font-medium">Subscription</th>
              <th className="py-3 px-4 text-left font-medium">Joined Date</th>
              <th className="py-3 px-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((landlord, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <Image
                    src={landlord.avatar}
                    alt={landlord.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 leading-tight">
                      {landlord.name}
                    </div>
                    <div className="text-xs text-gray-400">Landlord</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{landlord.contact}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {Array.isArray(landlord.properties) &&
                    landlord.properties.length > 0 ? (
                      <>
                        {landlord.properties.slice(0, 2).map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt="property"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded object-cover border border-white -ml-2 first:ml-0"
                          />
                        ))}
                        {landlord.properties.length > 2 && (
                          <span className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center text-xs text-neutral-600 font-semibold -ml-2">
                            +{landlord.properties.length - 2}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      landlord.subscription === "Premium"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {landlord.subscription}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {landlord.joinedDate}
                </td>
                <td className="py-3 px-4 text-center">
                  <Link href={`/dashboard/user-manage/landlord/${landlord.id}`}>
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
            landlords.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
          }–${Math.min(currentPage * PAGE_SIZE, landlords.length)} of ${
            landlords.length
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
