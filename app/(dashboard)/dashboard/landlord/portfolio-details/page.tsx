"use client";

import {
  useGetInvestmentMyStatisticsQuery,
  useGetLandlordStatsQuery,
} from "@/redux/features/landlord/dashboard/dashboard";
import { useGetInvestmentPropertyQuery } from "@/redux/features/landlord/property/propertyApi";
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
import InvestmentCard from "../property/investment-property/_components/investment-card";
import { TablePagination } from "@/components/common/TablePagination";

export default function page() {
  const { data: landlordStats } = useGetLandlordStatsQuery({});
  const { data: ivestmentMyStatistics } = useGetInvestmentMyStatisticsQuery({});
  const { data, isLoading } = useGetInvestmentPropertyQuery({});
  const apiData = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  const chartData = (ivestmentMyStatistics?.data?.chartData || []).map(
    (item: { label: string; value: number; date: string }) => ({
      name: item.label,
      pv: item.value,
      amt: item.value,
      date: item.date,
    }),
  );
  return (
    <div>
      <div className="bg-white rounded-xl p-4 shadow-sm w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Left: Total Investment Return */}
          <div className="col-span-1 lg:col-span-3 flex items-center justify-center bg-zinc-50 rounded-lg min-h-[140px]">
            <div className="text-center">
              <div className="text-xs text-zinc-400 mb-1">
                Total Investment Return
              </div>
              <div className="text-3xl font-semibold text-neutral-900 mb-1">
                $ {landlordStats?.data?.totalInvestmentReturnAmmount}
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
                  {landlordStats?.data?.monthlyReturnPercentage} %
                </span>
                <span className="text-zinc-400">Monthly return</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-1 lg:col-span-6">
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                data={chartData}
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
          <div className="w-full flex flex-col lg:col-span-3 gap-4">
            <div className="bg-zinc-50 rounded-lg p-4 w-full flex items-center gap-3">
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
                  ${landlordStats?.data?.totalInvestAmmount}
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
                  ${landlordStats?.data?.totalEarningsAmmount}
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
                  {landlordStats?.data?.activeInvestCount +
                    landlordStats?.data?.passiveInvestCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Data */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#DD8800]" />
          </div>
        ) : apiData.length === 0 ? (
          <div className="flex justify-center items-center py-20 text-gray-400">
            <p className="text-lg">No investment property found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiData.map((investment: any) => (
              <InvestmentCard
                key={investment.id || investment.apartmentId}
                investment={investment}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={apiData.length}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
}
