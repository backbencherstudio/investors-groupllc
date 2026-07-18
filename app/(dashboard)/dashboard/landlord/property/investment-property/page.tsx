"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import Link from "next/link";
import InvestmentCard from "./_components/investment-card";
import StatsCards from "@/app/(dashboard)/dashboard/admin/subscription/_components/StatsCards";
import { useGetInvestmentPropertyQuery } from "@/redux/features/landlord/property/propertyApi";

export default function InvestmentProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  const { data, isLoading } = useGetInvestmentPropertyQuery({});
  const apiData = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  return (
    <div>
      <StatsCards />
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
              href="/dashboard/admin-dashboard/property/investment-property/add-investment-property"
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-2 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Investment Property
            </Link>

            <div className="w-[47.5%] md:w-auto cursor-pointer">
              <SelectDropDown
                value={propertyType}
                onChange={setPropertyType}
                options={[
                  { label: "Passive", value: "Passive" },
                  { label: "Active", value: "Active" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Card Data */}
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
