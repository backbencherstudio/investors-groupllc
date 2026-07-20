"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SearchInput from "@/components/common/SearchInput";
import Link from "next/link";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import { DataTable } from "../admin/user-manage/_components/table";
import StatsCards from "@/app/(dashboard)/dashboard/admin/subscription/_components/StatsCards";
import { useGetApartmentsQuery } from "@/redux/features/landlord/dashboard/apartments";
import PersonalInfo from "@/components/dashboard/landlord/dashboard/PersonalInfo";
import Maintenance from "@/components/dashboard/landlord/dashboard/Maintenance";
import { useGetLandlordStatsQuery } from "@/redux/features/landlord/dashboard/dashboard";
import People from "@/components/icons/subscription/People";
import Monthly from "@/components/icons/subscription/Monthly";
import Diamond from "@/components/icons/subscription/Diamond";
import Revinew from "@/components/icons/subscription/Revinew";
import { PropertyCard } from "./property/rental-property/_components/property-card";

const chatData = [
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

export default function LandlordDashboard() {
  const { data } = useGetApartmentsQuery({});
  const apartments = data?.data || [];

  // const { data: stats, isLoading, error } = useGetSubscriptionStatsQuery();
  const { data: stats, isLoading, error } = useGetLandlordStatsQuery({});

  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  // const [propertyDate, setPropertyDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(apartments.length / itemsPerPage);
  const paginatedApartments = apartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Prepare card data from real API response
  const cardData = [
    {
      icon: People,
      value: stats?.propertyCount ?? 0,
      label: "Properties",
    },
    {
      icon: Monthly,
      value: stats?.tenantCount ?? 0,
      label: "Active Tenant",
    },
    {
      icon: Diamond,
      value: stats?.totalRentReceived ?? 0,
      label: "Total Rent",
    },
    {
      icon: Revinew,
      value: `$${stats?.balance ?? 0}`,
      label: "Balance",
    },
  ];
  // const cardData = [
  //   {
  //     icon: People,
  //     value: stats?.totalSubs ?? 0,
  //     label: "Total Subscribers",
  //   },
  //   {
  //     icon: Monthly,
  //     value: stats?.monthlyPlan ?? 0,
  //     label: "Monthly Plan",
  //   },
  //   {
  //     icon: Diamond,
  //     value: stats?.yearlyPlan ?? 0,
  //     label: "Yearly Plan",
  //   },
  //   {
  //     icon: Revinew,
  //     value: `$${stats?.revenue?.totalPlanAmount ?? 0}`,
  //     label: "Revenue",
  //   },
  // ];

  return (
    <div>
      <StatsCards cardData={cardData} isLoading={isLoading} error={error} />

      <div className="my-4">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section */}
          <PersonalInfo />

          {/* Right Section */}
          <Maintenance />
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
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                data={chatData}
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
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Stat Cards */}
          <div className="w-full flex flex-col gap-4 col-span-1 lg::col-span-3">
            <div className="bg-zinc-50 rounded-lg p-4 border w-full flex items-center gap-3">
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

      <div className="w-full p-6 mt-6 bg-white rounded-lg shadow-md">
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
                options={[
                  { label: "Property", value: "Property" },
                  { label: "Room", value: "Room" },
                ]}
              />
            </div>
          </div>
        </div>
        {/* Card Data */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedApartments?.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalResults={apartments.length}
            pageSize={itemsPerPage}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-6">
        <DataTable text="Tenant Rent Payment" />
      </div>
    </div>
  );
}
