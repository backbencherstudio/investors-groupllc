"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import Link from "next/link";
import { PropertyCard } from "./_components/property-card";
import StatsCards from "@/app/(dashboard)/dashboard/admin/subscription/_components/StatsCards";
import { useGetApartmentsQuery } from "@/redux/features/landlord/dashboard/apartments";

export default function RentalProperty() {
  const { data } = useGetApartmentsQuery({});
  const apartments = data?.data || [];

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
              href="/dashboard/landlord/property/rental-property/add-new-property"
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
    </div>
  );
}
