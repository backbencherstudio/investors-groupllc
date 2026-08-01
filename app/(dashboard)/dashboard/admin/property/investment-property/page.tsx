"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import Link from "next/link";
import InvestmentCard from "./_components/investment-card";
import InvestorPropertyStats from "./_components/investor-property-stats";
import { useGetInvestmentPropertiesListQuery } from "@/redux/features/apartments/apartmentsApi";
import { InvestmentApartment } from "@/redux/features/apartments/apartmentsTypes";

const tabs = [
  {
    label: "Rental Property",
    value: "Rental Property",
    href: "/dashboard/admin/property/rental-property",
  },
  {
    label: "Investment Property",
    value: "Investment Property",
    href: "/dashboard/admin/property/investment-property",
  },
];

export default function InvestmentProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // RTK Query parameters
  const {
    data: investmentProperty,
    isLoading,
    isError,
  } = useGetInvestmentPropertiesListQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: propertySearch,
    investmentType: propertyType ? propertyType.toLowerCase() : undefined,
  });

  const apartmentsList: InvestmentApartment[] = investmentProperty?.data || [];
  const meta = investmentProperty?.meta;
  const totalPages = meta?.totalPages || 1;
  const totalResults = meta?.total || 0;

  return (
    <div>
      <div className="mb-6">
        <p className="pb-4">
          Property Management
          <span className="text-[18px] font-semibold">
            <span className="font-normal mx-2">&gt;</span>
            Investment Property
          </span>
        </p>

        <div className="w-full bg-transparent overflow-x-auto">
          <nav className="flex border-b border-gray-200 bg-transparent">
            {tabs.map((tab) => (
              <Link href={tab.href} key={tab.value}>
                <button
                  className={`relative px-6 py-3 text-[17px] font-semibold transition-colors duration-200 ${
                    tab.value === "Investment Property"
                      ? "text-black"
                      : "text-gray-500"
                  } cursor-pointer`}
                >
                  {tab.label}
                  <span
                    className={`absolute left-0 -bottom-[1px] h-0.5 w-full bg-orange-500 transition-transform duration-200 origin-left ${
                      tab.value === "Investment Property"
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  />
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <InvestorPropertyStats />

      <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">My Property List</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto cursor-pointer">
              <SearchInput
                value={propertySearch}
                onChange={(value) => {
                  setPropertySearch(value);
                  setCurrentPage(1); // Reset page to 1 on search
                }}
              />
            </div>

            <Link
              href="/dashboard/admin/property/investment-property/add-investment-property"
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-2 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Investment Property
            </Link>

            <div className="w-[47.5%] md:w-auto cursor-pointer">
              <SelectDropDown
                value={propertyType}
                onChange={(value) => {
                  setPropertyType(value);
                  setCurrentPage(1); // Reset page to 1 on filter
                }}
                options={[
                  { label: "All Types", value: "" },
                  { label: "Passive", value: "Passive" },
                  { label: "Active", value: "Active" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-gray-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500 font-medium">
            Failed to load properties. Please try again.
          </div>
        ) : apartmentsList.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            No properties found.
          </div>
        ) : (
          /* Card Data */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartmentsList.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && apartmentsList.length > 0 && (
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={totalResults}
            pageSize={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
}