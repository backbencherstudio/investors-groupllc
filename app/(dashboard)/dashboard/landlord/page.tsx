"use client";
import { ClipboardList, Plus, UserCheck, UserPlus } from "lucide-react";
import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SearchInput from "@/components/common/SearchInput";
import Link from "next/link";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";

import StatsCards from "@/app/(dashboard)/dashboard/_components/common/StatsCards";
import { PropertyCard } from "../admin/property/rental-property/_components/property-card";
import { DataTable } from "../admin/user-manage/_components/table";

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

const cardData = [
  {
    icon: ClipboardList,
    value: 52,
    label: "Total Tenant",
  },
  {
    icon: UserCheck,
    value: 32,
    label: "Active",
  },
  {
    icon: UserPlus,
    value: 20,
    label: "New",
  },
];

const propertyList = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    status: "Rented",
    title: "Elm Apartment",
    price: 3000,
    address: "1234 Elm Street, New York, NY 10001",
    beds: 2,
    baths: 2,
    year: 1,
    floor: 12,
    area: 950,
    owner: {
      name: "Darlene Robertson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    ownerLabel: "Rented by",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    status: "Rented",
    title: "Elm Apartment",
    price: 3000,
    address: "1234 Elm Street, New York, NY 10001",
    beds: 2,
    baths: 2,
    year: 1,
    floor: 12,
    area: 950,
    owner: {
      name: "Ralph Edwards",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    ownerLabel: "Rented by",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    status: "Rented",
    title: "Elm Apartment",
    price: 3000,
    address: "1234 Elm Street, New York, NY 10001",
    beds: 2,
    baths: 2,
    year: 1,
    floor: 12,
    area: 950,
    owner: {
      name: "Wade Warren",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    },
    ownerLabel: "Rented by",
  },
];

export default function LandlordDashboard() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  // const [propertyDate, setPropertyDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(propertyList.length / itemsPerPage);

  return (
    <div>
      <StatsCards cardData={cardData} />

      <div className="my-4">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className=" bg-white rounded-xl">
            {/* Tenant Card */}
            <div className="">
              {/* Card */}
              <div className="bg-white  p-6 mb-6 relative rounded-xl">
                <div className="flex items-start gap-4">
                  <Image
                    src={tenant.avatar}
                    className="rounded-full object-cover w-16 h-16"
                    width={64}
                    height={64}
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
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm w-full">
            <div className="rounded-xl p-6 w-full mb-6">
              <h2 className="text-lg font-semibold text-[#1c1c1c] mb-4">
                Maintenance
              </h2>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[15px] text-[#222]">
                  <span>Pending</span>
                  <span>42</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#222]">
                  <span>In Progress</span>
                  <span>21</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#222]">
                  <span>Completed</span>
                  <span>89</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#222]">
                  <span>Urgent Request</span>
                  <span>10</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#222]">
                  <span>Emergency Request</span>
                  <span className="text-red-600 font-medium">5</span>
                </div>
              </div>
              <button className="bg-[#D18A00] hover:bg-[#b87700] text-white rounded-md px-6 py-2 font-medium text-[15px] w-fit">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Left: Total Investment Return */}
          <div className="col-span-1 lg:col-span-3 flex items-center justify-center bg-zinc-50 rounded-lg min-h-[140px]">
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
                <span className="text-green-500 font-medium">+$50 (0.5%)</span>
                <span className="text-zinc-400">Monthly return</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-1 lg:col-span-6">
            <LineChart
              width={750}
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

          {/* Right: Stat Cards */}
          <div className="flex flex-col gap-4 col-span-1 lg::col-span-3">
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
                <div className="text-xs text-zinc-400">Total Investment</div>
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
                <div className="font-semibold text-lg text-neutral-900">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">My Property List</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto cursor-pointer">
              <SearchInput
                value={propertySearch}
                onChange={setPropertySearch}
              />
            </div>

            <Link
              href="/dashboard/admin-dashboard/property/rental-property/add-new-property"
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-2 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add New Property
            </Link>

            <div className="w-[47.5%] md:w-auto cursor-pointer">
              <SelectDropDown
                value={propertyType}
                onChange={setPropertyType}
                options={["Property", "Room"]}
              />
            </div>
          </div>
        </div>
        {/* Card Data */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyList.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={propertyList.length}
          pageSize={itemsPerPage}
        />
      </div>

      <DataTable />
    </div>
  );
}
