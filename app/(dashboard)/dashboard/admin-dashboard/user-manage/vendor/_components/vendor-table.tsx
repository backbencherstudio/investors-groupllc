"use client";
import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import Link from "next/link";
import { Paginations } from "@/app/(dashboard)/dashboard/_components/pagination";
import Image from "next/image";

const vendors = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Seattle, WA",
    rent: "Active",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Miami, FL",
    rent: "Inactive",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Denver, CO",
    rent: "Active",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Portland, OR",
    rent: "Active",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Chicago, IL",
    rent: "Active",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "San Diego, CA",
    rent: "Active",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Boston, MA",
    rent: "Active",
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Miami, FL",
    rent: "Inactive",
  },
  {
    id: 9,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Audry hawq",
    subtitle: "vendor",
    email: "abcde123@gmail.com",
    contact: "+231 06-75820711",
    location: "Denver, CO",
    rent: "Active",
  },
];

const rentStatusClass = (status: string) =>
  status === "Active"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-500";

const PAGE_SIZE = 7;

export function VendorTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(vendors.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = vendors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Active Vendor List</h2>
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
              <th className="py-3 px-4 text-left font-medium">Email</th>
              <th className="py-3 px-4 text-left font-medium">Contact</th>
              <th className="py-3 px-4 text-left font-medium">
                Current Location
              </th>
              <th className="py-3 px-4 text-left font-medium">Rent</th>
              <th className="py-3 px-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((vendor, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <Image
                    src={vendor.avatar}
                    alt={vendor.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 leading-tight">
                      {vendor.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {vendor.subtitle}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{vendor.email}</td>
                <td className="py-3 px-4 text-gray-700">{vendor.contact}</td>
                <td className="py-3 px-4 text-gray-700">{vendor.location}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${rentStatusClass(
                      vendor.rent
                    )}`}
                  >
                    {vendor.rent}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <Link href={`/dashboard/user-manage/vendor/${vendor.id}`}>
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
            vendors.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
          }–${Math.min(currentPage * PAGE_SIZE, vendors.length)} of ${
            vendors.length
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
