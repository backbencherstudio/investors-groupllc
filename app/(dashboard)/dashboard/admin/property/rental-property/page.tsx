"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import Link from "next/link";
import { PropertyCard } from "./_components/property-card";

import { useGetRentalPropertiesListQuery } from "@/redux/features/apartments/apartmentsApi";
import { Apartment } from "@/redux/features/apartments/apartmentsTypes";
import RentalPropertyStats from "./_components/rental-property-stats";

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

export default function RentalProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pass query parameters if supported by your API endpoint hook
  const {
    data: rentalResponse,
    isLoading,
    isError,
  } = useGetRentalPropertiesListQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: propertySearch,
  });

  const apartments: Apartment[] = rentalResponse?.data || [];
  const meta = rentalResponse?.meta;
  const totalPages = meta?.totalPages || 1;
  const totalResults = meta?.total || 0;

  // Transform backend Apartment schema to the shape expected by PropertyCard
  const mappedProperties = apartments.map((apt) => ({
    id: apt.id,
    image:
      apt.images?.[0]?.url ||
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    status: apt.isRented
      ? "Rented"
      : apt.listingType === "for_rent"
        ? "For Rent"
        : "For Sale",
    title: apt.name,
    price: apt.price ?? 0,
    address: `${apt.address}, ${apt.city}, ${apt.state} ${apt.zipCode}`,
    beds: 2, // Map from backend field if available in future schemas
    baths: 2,
    year: apt.builtYear ? new Date(apt.builtYear).getFullYear() : undefined,
    floor: apt.numberOffloors,
    area: 950,
    owner: null,
    ownerLabel: null,
    isFeatured: apt.isFeatured,
  }));

  return (
    <div>
      <div className="mb-6">
        <p className="pb-4">
          Property Management
          <span className="text-[18px] font-semibold">
            <span className="font-normal mx-2">&gt;</span>
            Rental Property
          </span>
        </p>

        <div className="w-full bg-transparent overflow-x-auto">
          <nav className="flex border-b border-gray-200 bg-transparent">
            {tabs.map((tab) => (
              <Link href={tab.href} key={tab.value}>
                <button
                  className={`relative px-6 py-3 text-[17px] font-semibold transition-colors duration-200 ${tab.value === "Rental Property"
                      ? "text-black"
                      : "text-gray-500"
                    } cursor-pointer`}
                >
                  {tab.label}
                  <span
                    className={`absolute left-0 -bottom-[1px] h-0.5 w-full bg-orange-500 transition-transform duration-200 origin-left ${tab.value === "Rental Property"
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

      <RentalPropertyStats />

   

      <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">My Property List</h2>

          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput
                value={propertySearch}
                onChange={(val) => {
                  setPropertySearch(val);
                  setCurrentPage(1); // Reset page on new search
                }}
              />
            </div>

            {/* <Link
              href="/dashboard/admin/property/rental-property/add-new-property"
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-2 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Property
            </Link> */}

            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={propertyType}
                onChange={setPropertyType}
                options={[
                  { label: "All Types", value: "" },
                  { label: "For Rent", value: "for_rent" },
                  { label: "For Sale", value: "for_sale" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-gray-500">
            Loading properties...
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-12 text-center text-red-500">
            Failed to load properties. Please try again.
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && mappedProperties.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No properties found.
          </div>
        )}

        {/* Card Grid */}
        {!isLoading && !isError && mappedProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalResults > 0 && (
          <div className="mt-6">
            <TablePagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalResults={totalResults}
              pageSize={itemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
