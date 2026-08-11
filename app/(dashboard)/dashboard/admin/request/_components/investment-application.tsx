import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState, useMemo } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import Image from "next/image";

import InvestmentApplicationStats from "./others/investment-application-stats";

import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInvestmentApplicationsQuery, useUpdateInvestmentApplicationStatusMutation } from "@/redux/features/request/RequestApi";
import InvestmentApplicationDetails from "./others/InvestmentApplicationDetails";
import { toast } from "sonner";

function InvestmentApplicationsTable() {
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from API
  const { data, isLoading, isError } = useGetInvestmentApplicationsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter || undefined,
    search: searchTerm || undefined,
  });

 
  // console.log("Data is ", data?.stats)
  const statsData= data?.stats;
  console.log("Stats Data", statsData)

  // Transform API data to match table format
  const tableData = useMemo(() => {
    if (!data?.items) return [];

    return data.items.map((item) => ({
      id: item.id,
      requestId: item.requestId,
      name: item.requester.name,
      avatar: item.requester.avatar,
      property: item.property.name,
      propertyAddress: item.property.address,
      propertyImage: item.property.imageUrl,
      amount: `$${item.amount.toLocaleString()}`,
      amountRaw: item.amount,
      status: item.status,
      statusRaw: item.statusRaw,
      requestedAt: format(new Date(item.requestedAt), "MMM dd, yyyy"),
      requesterId: item.requester.id,
      requesterRole: item.requester.role,
    }));
  }, [data]);

  // Status options for filter
  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  const columns: Column<any>[] = [
    {
      header: "Request ID",
      accessor: "name",
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar || "/placeholder-avatar.png"}
            alt={value}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-sm">{value}</div>
            <div className="text-xs text-gray-500">{row.requestId}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Property",
      accessor: "property",
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.propertyImage || "/placeholder-property.png"}
            alt={value}
            width={32}
            height={32}
            className="rounded object-cover"
          />
          <div>
            <div className="font-semibold text-sm">{value}</div>
            <div className="text-xs text-gray-500">{row.propertyAddress}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value: string) => (
        <div className="text-sm font-semibold text-gray-900">{value}</div>
      ),
    },
    {
      header: "Req Date",
      accessor: "requestedAt",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "id",
      render: (value: string, row: any) => (
        <InvestmentApplicationDetails
          applicationId={row.id}
          requestId={row.requestId}
        />
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden p-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="w-full overflow-hidden p-6">
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load investment applications</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Investment Applications</h2>
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name or ID..."
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <SelectDropDown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              placeholder="Filter by status"
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>
        </div>
      </div>

      <InvestmentApplicationStats statsData={statsData} />

      {/* Data Table */}
      <div className="w-full overflow-hidden">
        <DashboardDataTable columns={columns} data={tableData} />
      </div>

      {/* Pagination */}
      {data?.pagination && (
        <TablePagination
          totalPages={data.pagination.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={data.pagination.total}
          pageSize={itemsPerPage}
        />
      )}
    </Card>
  );
}

const InvestmentApplications = () => {
  return (
    <div className="space-y-0">

      <InvestmentApplicationsTable />
    </div>
  );
};

export default InvestmentApplications;