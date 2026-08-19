"use client";

import { useState } from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import DatePicker from "@/components/common/DatePicker";
import StatusBadge from "@/components/common/StatusBadges";
import { TablePagination } from "@/components/common/TablePagination";
import TenantRequestDetails from "../others/tenant-request-details";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";

import { useGetPropertyTourRequestsQuery } from "@/redux/features/request/RequestApi";
import { PropertyTourRequest } from "@/redux/features/request/RequestTypes";
import PropertyTourDetails from "./PropertyTourDetails";
import Loader from "@/app/(dashboard)/dashboard/_components/common/Loader";


export default function PropertyTour() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const { data, isLoading, isFetching } = useGetPropertyTourRequestsQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: tenantSearch,
    status: tenantStatus,
    // date: tenantDate, // Uncomment if your API supports date filtering
  });

  const tenantColumns: Column<PropertyTourRequest>[] = [
    {
      header: "Request ID",
      accessor: "requestId",
      render: (_, row) => (
        <div className="flex items-center gap-2 shrink-0">
          <Image
            src={row.requester.avatar || "/placeholder-avatar.png"}
            alt={row.requester.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div>
            <div className="font-semibold">{row.requester.name}</div>
            <div className="text-xs text-gray-500">{row.requestId}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Tour ID",
      accessor: "requestId",
    },
    {
      header: "Property Info",
      accessor: "property",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.property.imageUrl || "/placeholder-property.png"}
            alt={row.property.name}
            width={32}
            height={32}
            className="rounded-md object-cover"
          />
          <div>
            <div className="font-semibold">{row.property.name}</div>
            <div className="text-xs text-gray-500">
              {row.property.address}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Req Date",
      accessor: "requestedAt",
      render: (value: any) =>
        new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: any) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "id",
      render: (_, row) => <PropertyTourDetails reqId={row.id} />,
    },
  ];

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="text-2xl font-semibold">
            Property Tour Requests
          </h2>

          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput
                value={tenantSearch}
                onChange={setTenantSearch}
              />
            </div>

            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={tenantStatus}
                onChange={setTenantStatus}
                options={[
                  { label: "All", value: "" },
                  { label: "Pending", value: "pending" },
                  { label: "In Review", value: "requested" },
                  { label: "Approved", value: "approved" },
                  { label: "Rejected", value: "rejected" },
                ]}
              />
            </div>

            <div className="w-[47.5%] md:w-auto">
              <DatePicker
                value={tenantDate}
                onChange={setTenantDate}
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden mt-6">
          <DashboardDataTable
            columns={tenantColumns}
            data={data?.items ?? []}
          />
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={data?.pagination.totalPages ?? 1}
          totalResults={data?.pagination.total ?? 0}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
}