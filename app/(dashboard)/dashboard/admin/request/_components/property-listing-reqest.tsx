import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";

import Image from "next/image";
import PropertyListingStats from "./others/property-listing-stats";
import {
  useGetPropertyListingRequestStatsQuery,
  useGetAllAdminApartmentsQuery,
} from "@/redux/features/request/RequestApi";
import type { AdminAllApartment } from "@/redux/features/request/RequestTypes";
import PropertyListingDetails from "./others/PropertyListingDetails";
import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";

const PropertyListingRequestTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: apartments, isLoading } = useGetAllAdminApartmentsQuery({
    search: search || undefined,
    listingType: status || undefined,
  });

  const totalPages = Math.ceil((apartments?.length ?? 0) / itemsPerPage);
  const paginatedData = apartments?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) ?? [];

  const columns: Column<AdminAllApartment>[] = [
    {
      header: "Name",
      accessor: "name" as keyof AdminAllApartment,
      render: (value: any, row: AdminAllApartment) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.images?.[0]?.url || "/placeholder-avatar.png"}
            alt={value}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold max-w-[200px] truncate">{value}</div>
            <div className="text-xs text-gray-500">{row.city}, {row.state}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Address",
      accessor: "address" as keyof AdminAllApartment,
    },
    {
      header: "City",
      accessor: "city" as keyof AdminAllApartment,
    },
    {
      header: "Listing Type",
      accessor: "listingType" as keyof AdminAllApartment,
      render: (value:any) => (
        <StatusBadge status={value === "for_rent" ? "For Rent" : value === "for_sale" ? "For Sale" : value || ""} />
      ),
    },
    {
      header: "Pet Friendly",
      accessor: "petFriendly" as keyof AdminAllApartment,
      render: (value: any) => (
        <StatusBadge status={value ? "Yes" : "No"} />
      ),
    },
    {
      header: "Approved",
      accessor: "adminaproved" as keyof AdminAllApartment,
      render: (value: any) => (
        <StatusBadge status={value ? "Approved" : "Pending"} />
      ),
    },
    {
      header: "Featured",
      accessor: "isFeatured" as keyof AdminAllApartment,
      render: (value: any) => (
        <StatusBadge status={value ? "Yes" : "No"} />
      ),
    },
    {
          header: "Action",
          accessor: "id",
          render: (value: any, row: any) => (
            <PropertyListingDetails 
              applicationId={row.id}
              requestId={row.requestId}
            />
          ),
        },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Property Listing Requests</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={search} onChange={setSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={status}
                onChange={setStatus}
                options={[
                  { label: "For Rent", value: "for_rent" },
                  { label: "For Sale", value: "for_sale" },
                ]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <DatePicker value={date} onChange={setDate} />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          {isLoading ? (
            <Loader />
          ) : (
            <DashboardDataTable columns={columns} data={paginatedData} />
          )}
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={apartments?.length ?? 0}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
};




const InvestmentApplications = () => {
  const { data: stats, isLoading: statsLoading } = useGetPropertyListingRequestStatsQuery();

  return (
    <div className="space-y-6">
      <PropertyListingStats stats={stats} isLoading={statsLoading} />
      <PropertyListingRequestTable />
    </div>
  );
};

export default InvestmentApplications;
