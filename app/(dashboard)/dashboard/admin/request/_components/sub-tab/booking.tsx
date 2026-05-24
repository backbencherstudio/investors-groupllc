import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState, useEffect } from "react";
import {
  Column,
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";

import { useGetBookingRequestsQuery } from "@/redux/features/request/RequestApi";
import { format } from "date-fns";
import BookingRequestDetails from "./BookingRequestDetails";

interface BookingData {
  id: string;
  reqDate: string;
  name: string;
  requestId: string;
  property: string;
  propertyAddress: string;
  avatar: string;
  phone: string;
  status: string;
  statusRaw: string;
}

export default function Booking() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Build query params
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: search || undefined,
    status: status || undefined,
    from_date: fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
    to_date: toDate ? format(toDate, "yyyy-MM-dd") : undefined,
  };

  const { data, isLoading, error, refetch } = useGetBookingRequestsQuery(queryParams);

  // Transform API data to table format
  const bookingData: BookingData[] = data?.items.map((item) => ({
    id: item.id,
    reqDate: format(new Date(item.requestedAt), "MMM dd, yyyy"),
    name: item.requester.name,
    requestId: item.requestId,
    property: item.property.name,
    propertyAddress: item.property.address,
    avatar: item.requester.avatar,
    phone: item.requester.phone || "N/A",
    status: item.status,
    statusRaw: item.statusRaw,
  })) || [];

  const totalPages = data?.pagination.totalPages || 1;
  const totalResults = data?.pagination.total || 0;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, fromDate, toDate]);

  const tenantColumns: Column<BookingData>[] = [
    { 
      header: "Req Date", 
      accessor: "reqDate" as keyof BookingData 
    },
    {
      header: "Name",
      accessor: "name" as keyof BookingData,
      render: (value: string, row: BookingData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar || "/placeholder-avatar.png"}
            alt={value}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">{row.phone}</div>
          </div>
        </div>
      ),
    },
    { 
      header: "Request ID", 
      accessor: "requestId" as keyof BookingData 
    },
    {
      header: "Property Info",
      accessor: "property" as keyof BookingData,
      render: (value: string, row: BookingData) => (
        <div>
          <div className="font-semibold">{value}</div>
          {row.propertyAddress && (
            <div className="text-xs text-gray-500">{row.propertyAddress}</div>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status" as keyof BookingData,
      render: (value: string) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "id" as keyof BookingData,
      render: (value: string) => (
        <BookingRequestDetails reqId={value} />
      ),
    },
  ];

  // Status filter options
  const statusOptions = [
    { label: "All", value: "" },
    { label: "In Review", value: "under_review" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  if (isLoading && currentPage === 1) {
    return (
      <div className="p-6 flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center text-red-500">
          Error loading booking requests. Please try again.
          <button 
            onClick={() => refetch()} 
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold">Booking Requests</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <SearchInput 
                placeholder="Search by name, ID..." 
                value={search} 
                onChange={setSearch} 
              />
            </div>
            <div className="w-full md:w-48">
              <SelectDropDown
                value={status}
                onChange={setStatus}
                options={statusOptions}
                placeholder="Filter by status"
              />
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <DatePicker 
                label="From Date"
                value={fromDate} 
                onChange={setFromDate} 
              />
              <DatePicker 
                label="To Date"
                value={toDate} 
                onChange={setToDate} 
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={tenantColumns} data={bookingData} />
        </div>

        {/* Pagination */}
        {totalResults > 0 && (
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={totalResults}
            pageSize={itemsPerPage}
          />
        )}

        {/* Empty State */}
        {bookingData.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No booking requests found</p>
          </div>
        )}
      </Card>
    </div>
  );
}