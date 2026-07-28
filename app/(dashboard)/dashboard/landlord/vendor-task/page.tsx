"use client";

import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
import Image from "next/image";
import { TablePagination } from "@/components/common/TablePagination";
import StatsCards from "@/app/(dashboard)/dashboard/admin/subscription/_components/StatsCards";
import { useGetVendorTaskQuery } from "@/redux/features/landlord/vendor-task/vendorTask";
import TenantRequestDetails from "../request/_components/others/tenant-request-details";

interface VendorTaskItem {
  id: string | number;
  maintenanceId: string;
  vendorName: string;
  vendorImage: string | null;
  tenantName: string;
  tenantImage: string | null;
}

export default function VendorTask() {
  const { data } = useGetVendorTaskQuery({});
  const apiData: VendorTaskItem[] = (data?.data ?? []).map((item: any) => ({
    id: item.maintenanceId,
    maintenanceId: item.maintenanceId,
    vendorName: item.vendor?.name || "",
    vendorImage: item.vendor?.image || null,
    tenantName: item.tenant?.name || "",
    tenantImage: item.tenant?.image || null,
  }));

  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  // const [propertyDate, setPropertyDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<VendorTaskItem | null>(
    null,
  );
  const itemsPerPage = 5;
  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  const requestColumns: Column<VendorTaskItem>[] = [
    {
      header: "Vendor Name",
      accessor: "vendorName" as keyof VendorTaskItem,
      render: (value, row) => {
        const name = value as string;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.vendorImage || "/placeholder-avatar.png"}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">{name}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Tenant Name",
      accessor: "tenantName" as keyof VendorTaskItem,
      render: (value, row) => {
        const name = value as string;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.tenantImage || "/placeholder-avatar.png"}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">{name}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Maintenance ID",
      accessor: "maintenanceId" as keyof VendorTaskItem,
    },
    {
      header: "Action",
      accessor: "maintenanceId" as keyof VendorTaskItem,
      render: (value, row) => (
        <TenantRequestDetails
          data={row}
          onOpen={() => setSelectedBooking(row)}
        />
      ),
    },
  ];

  return (
    <div>
      <StatsCards />
      <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">Task List</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput
                value={propertySearch}
                onChange={setPropertySearch}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={propertyStatus}
                onChange={setPropertyStatus}
                options={[
                  { label: "In Review", value: "In Review" },
                  { label: "Completed", value: "Completed" },
                  { label: "On going", value: "On going" },
                ]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
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
        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={requestColumns} data={apiData} />
        </div>
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
