"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState, useMemo, useEffect } from "react";
import { DashboardDataTable, Column } from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import { useGetInvestorTransactionsQuery } from "@/redux/features/dashboard/dashboardApi";
import type {
  InvestorTransaction,
  InvestorTransactionsQueryParams,
  InvestorPaymentStatus,
  InvestorStatus,
  InvestmentType,
  RecordStatus,
} from "@/redux/features/dashboard/dashboardTypes";

// Transform API data to match table format
interface InvestorTableData {
  id: string;
  displayId: string;
  paidDate: string;
  paymentStatus: InvestorPaymentStatus | string;
  recipient: string;
  recipientId: string;
  recipientPhone: string;
  recipientAvatar: string | null;
  property: string;
  propertyAddress: string;
  propertyImage: string;
  amount: string;
  status: InvestorStatus | string;
  investmentType: InvestmentType | string;
  recordStatus: RecordStatus | string;
  createdAt: string;
  action: string;
}

export default function InvestorTransactionList() {    
  // Filter states
  const [investorStatus, setInvestorStatus] = useState<string>("");
  const [investorSearch, setInvestorSearch] = useState<string>("");
  const [investorDate, setInvestorDate] = useState<Date | undefined>(undefined);
  const [investmentType, setInvestmentType] = useState<string>("");
  const [recordStatus, setRecordStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Build query params
  const queryParams = useMemo<InvestorTransactionsQueryParams>(() => ({
    page: currentPage,
    limit: itemsPerPage,
    search: investorSearch,
    status: investorStatus,
    dateFrom: investorDate ? investorDate.toISOString() : "",
    dateTo: "",
  }), [
    investorStatus,
    investorSearch,
    investorDate,
    currentPage,
    itemsPerPage,
  ]);

  // Fetch real data from API
  const { 
    data: apiResponse, 
    isLoading, 
    isError, 
    error 
  } = useGetInvestorTransactionsQuery(queryParams);

  // Transform API data to table format
  const investorData = useMemo(() => {
    if (!apiResponse?.data?.items) return [];

    return apiResponse.data.items.map((item: InvestorTransaction): InvestorTableData => {
      // Format paid date
      let formattedPaidDate = '-';
      if (item.paidDate) {
        formattedPaidDate = new Date(item.paidDate).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        });
      }

      // Format amount
      const formattedAmount = `$${item.amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;

      // Format created date
      const formattedCreatedAt = new Date(item.createdAt).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      return {
        id: item.id,
        displayId: item.displayId,
        paidDate: formattedPaidDate,
        paymentStatus: item.paymentStatus,
        recipient: item.recipient.name,
        recipientId: item.recipient.id,
        recipientPhone: item.recipient.phone,
        recipientAvatar: item.recipient.avatar,
        property: item.property.name,
        propertyAddress: item.property.address,
        propertyImage: item.property.imageUrl,
        amount: formattedAmount,
        status: item.status,
        investmentType: item.investmentType,
        recordStatus: item.recordStatus,
        createdAt: formattedCreatedAt,
        action: "View",
      };
    });
  }, [apiResponse]);

  // Get pagination data from API
  const totalItems = apiResponse?.data?.pagination?.total || 0;
  const totalPages = apiResponse?.data?.pagination?.totalPages || 1;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [investorStatus, investorSearch, investorDate, investmentType, recordStatus]);

  // Handle view action
  const handleView = (id: string) => {
    console.log("View investor transaction:", id);
    // Navigate to detail page or open modal
  };

  const investorColumns: Column<InvestorTableData>[] = [
    { 
      header: "Paid Date", 
      accessor: "paidDate" 
    },
    {
      header: "Payment",
      accessor: "paymentStatus",
      render: (value) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Recipient",
      accessor: "recipient",
      render: (value, row: InvestorTableData) => (
        <div className="flex items-center gap-2">
          {row.recipientAvatar && (
            <Image
              src={row.recipientAvatar}
              alt={value ?? ""}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <div className="font-semibold">{value}</div>
            {row.recipientPhone && (
              <div className="text-xs text-gray-500">{row.recipientPhone}</div>
            )}
          </div>
        </div>
      ),
    },
    { 
      header: "ID", 
      accessor: "displayId" 
    },
    {
      header: "Property",
      accessor: "property",
      render: (value, row: InvestorTableData) => (
        <div>
          <div className="font-medium">{value}</div>
          {row.propertyAddress && (
            <div className="text-xs text-gray-500 truncate max-w-[200px]">
              {row.propertyAddress}
            </div>
          )}
        </div>
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
      header: "Status", 
      accessor: "status",
      render: (value) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Investment Type",
      accessor: "investmentType",
      render: (value) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      header: "Record Status",
      accessor: "recordStatus",
      render: (value) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
    },
    {
      header: "Action",
      accessor: "id",
      render: (_value, row: InvestorTableData) => (
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
        <div className="text-center text-red-500 py-8">
          <p>Failed to load investor transactions</p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Please try again later"}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="">
      <Card className="w-full overflow-hidden p-6">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <h2 className="text-2xl font-semibold">Investor Transactions</h2>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <div className="w-full md:w-auto">
                <SearchInput 
                  value={investorSearch} 
                  onChange={setInvestorSearch} 
                  placeholder="Search investors..."
                />
              </div>
              <div className="w-[47.5%] md:w-auto">
                <SelectDropDown
                  value={investorStatus}
                  onChange={setInvestorStatus}
                  options={[
                    { label: "All Status", value: "" },
                    { label: "Pending", value: "Pending" },
                    { label: "Active", value: "Active" },
                    { label: "Completed", value: "Completed" },
                    { label: "Cancelled", value: "Cancelled" },
                    { label: "Overdue", value: "Overdue" },
                  ]}
                />
              </div>
              <div className="w-[47.5%] md:w-auto">
                <SelectDropDown
                  value={investmentType}
                  onChange={setInvestmentType}
                  options={[
                    { label: "All Types", value: "" },
                    { label: "Active", value: "active" },
                    { label: "Passive", value: "passive" },
                    { label: "Fixed", value: "fixed" },
                  ]}
                />
              </div>
              <div className="w-[47.5%] md:w-auto">
                <SelectDropDown
                  value={recordStatus}
                  onChange={setRecordStatus}
                  options={[
                    { label: "All Records", value: "" },
                    { label: "Pending", value: "pending" },
                    { label: "Active", value: "active" },
                    { label: "Completed", value: "completed" },
                    { label: "Cancelled", value: "cancelled" },
                  ]}
                />
              </div>
              <div className="w-[47.5%] md:w-auto">
                <DatePicker value={investorDate} onChange={setInvestorDate} />
              </div>
            </div>
          </div>
          
          <div className="w-full overflow-hidden mb-6">
            <DashboardDataTable 
              columns={investorColumns} 
              data={investorData} 
              // emptyMessage="No investor transactions found"
            />
          </div>

          {/* Pagination */}
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={totalItems}
            pageSize={itemsPerPage}
          />
        </div>
      </Card>
    </div>
  );
}