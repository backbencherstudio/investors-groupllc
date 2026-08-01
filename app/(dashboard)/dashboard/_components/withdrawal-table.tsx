"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState, useMemo, useEffect } from "react";
import { DashboardDataTable, Column } from "@/components/common/DashboardDataTable";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import { useGetWithdrawalsQuery } from "@/redux/features/dashboard/dashboardApi";
import type { WithdrawalItem, WithdrawalsQueryParams } from "@/redux/features/dashboard/dashboardTypes";
import { format } from "date-fns";

interface WithdrawalTableData {
  id: string;
  displayId: string;
  requestDate: string;
  name: string;
  phone: string;
  avatar: string | null;
  userType: string;
  amount: string;
  method: string;
  status: string;
  statusLabel: string;
  action: string;
}

export default function WithdrawalTable() {
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Format date for API (YYYY-MM-DD)
  const formatDateForApi = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
  };

  // Build query params using the buildWithdrawalsParams logic
  const queryParams = useMemo<WithdrawalsQueryParams>(() => {
    const params: WithdrawalsQueryParams = {
      page: currentPage,
      limit: itemsPerPage,
      search: search || undefined,
      status: status || undefined,
      user_type: userType || undefined,
      dateFrom: formatDateForApi(fromDate) || undefined,
      dateTo: formatDateForApi(toDate) || undefined,
    };

    // Remove undefined values (matches buildWithdrawalsParams behavior)
    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    ) as WithdrawalsQueryParams;
  }, [status, search, userType, fromDate, toDate, currentPage]);

  // Fetch real data from API
  const { 
    data: apiResponse, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useGetWithdrawalsQuery(queryParams);

  // Transform API data to table format
  const withdrawalData = useMemo(() => {
    if (!apiResponse?.data?.items) return [];

    return apiResponse.data.items.map((item: WithdrawalItem): WithdrawalTableData => {
      const formattedRequestDate = new Date(item.requestDate).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      const formattedAmount = `$${item.amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;

      return {
        id: item.id,
        displayId: item.displayId,
        requestDate: formattedRequestDate,
        name: item.name,
        phone: item.phone,
        avatar: item.avatar,
        userType: item.userType,
        amount: formattedAmount,
        method: item.method,
        status: item.status,
        statusLabel: item.statusLabel,
        action: "View",
      };
    });
  }, [apiResponse]);

  const totalItems = apiResponse?.data?.pagination?.total || 0;
  const totalPages = apiResponse?.data?.pagination?.totalPages || 1;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [status, search, userType, method, fromDate, toDate]);

  // Refetch data when query params change
  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  const handleView = (id: string) => {
    console.log("View withdrawal:", id);
  };

  const columns: Column<WithdrawalTableData>[] = [
    { header: "Request Date", accessor: "requestDate" },
    { 
      header: "ID", 
      accessor: "displayId" 
    },
    {
      header: "User",
      accessor: "name",
      render: (value, row: WithdrawalTableData) => (
        <div className="flex items-center gap-2">
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">{row.phone}</div>
          </div>
        </div>
      ),
    },
    {
      header: "User Type",
      accessor: "userType",
      render: (value) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      header: "Method",
      accessor: "method",
      render: (value) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "id",
      render: (_value, row: WithdrawalTableData) => (
        <button 
          className="text-gray-600 hover:text-primary transition-colors"
          onClick={() => handleView(row.id)}
        >
          <EyeIcon className="w-5 h-5" />
        </button>
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="w-full overflow-hidden p-6">
        <div className="text-center py-8">
          <p className="text-red-500 font-medium">Failed to load withdrawals</p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Please try again later"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2 className="text-2xl font-semibold">Withdrawals</h2>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="w-full md:w-auto">
            <SearchInput 
              value={search} 
              onChange={setSearch} 
              placeholder="Search by name or ID..."
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <SelectDropDown
              value={status}
              onChange={setStatus}
              options={[
                { label: "All Status", value: "" },
                { label: "Pending", value: "PENDING" },
                { label: "Approved", value: "APPROVED" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Rejected", value: "REJECTED" },
                { label: "Cancelled", value: "CANCELLED" },
              ]}
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <SelectDropDown
              value={userType}
              onChange={setUserType}
              options={[
                { label: "All Users", value: "" },
                { label: "Investor", value: "Investor" },
                { label: "Vendor", value: "Vendor" },
                { label: "Landlord", value: "Landlord" },
              ]}
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <SelectDropDown
              value={method}
              onChange={setMethod}
              options={[
                { label: "All Methods", value: "" },
                { label: "Bank Transfer", value: "Bank Transfer" },
                { label: "PayPal", value: "PayPal" },
                { label: "Zelle", value: "Zelle" },
                { label: "Crypto", value: "Crypto" },
                { label: "Check", value: "Check" },
              ]}
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <DatePicker 
              value={fromDate} 
              onChange={setFromDate}
              // placeholderText="From Date"
            />
          </div>
          <div className="w-[47.5%] md:w-auto">
            <DatePicker 
              value={toDate} 
              onChange={setToDate}
              // placeholderText="To Date"
            />
          </div>
        </div>
      </div>
      
      <div className="w-full overflow-hidden mb-6">
        <DashboardDataTable 
          columns={columns} 
          data={withdrawalData}
          // emptyMessage="No withdrawals found"
        />
      </div>

      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalResults={totalItems}
        pageSize={itemsPerPage}
      />
    </Card>
  );
}