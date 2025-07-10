"use client";

import React, { useState } from "react";
import { ClipboardList, Plus, UserCheck, UserPlus } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import Link from "next/link";

import { PropertyCard } from "./_components/property-card";
import StatsCards from "../../user-manage/_components/card";

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
  {
    icon: UserCheck,
    value: 32,
    label: "Active",
  },
];

// 1. Add fake property data
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
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    status: "For Rent",
    title: "Elm Apartment",
    price: 3000,
    address: "1234 Elm Street, New York, NY 10001",
    beds: 2,
    baths: 2,
    year: 1,
    floor: 12,
    area: 950,
    owner: null,
    ownerLabel: null,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80",
    status: "For Rent",
    title: "Elm Apartment",
    price: 3000,
    address: "1234 Elm Street, New York, NY 10001",
    beds: 2,
    baths: 2,
    year: 1,
    floor: 12,
    area: 950,
    owner: null,
    ownerLabel: null,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    status: "For Sale",
    title: "Elm Apartment",
    price: 3000,
    address: "1234 Elm Street, New York, NY 10001",
    beds: 2,
    baths: 2,
    year: 1,
    floor: 12,
    area: 950,
    owner: null,
    ownerLabel: null,
  },
];

export default function RentalProperty() {
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  // const [propertyDate, setPropertyDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(propertyList.length / itemsPerPage);

  return (
    <div>
      <StatsCards cardData={cardData} />
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
    </div>
  );
}
