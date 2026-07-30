"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState } from "react";
import {
  Column,
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";

import { TablePagination } from "@/components/common/TablePagination";
import { useGetWithdrawalMyQuery } from "@/redux/features/landlord/financial/financialApi";
import TenantRequestDetails from "../../../request/_components/others/tenant-request-details";

// API response item shape from /withdrawal/my
interface WithdrawalResponse {
  id: string;
  amount: string;
  method: string;
  status: string;
  note: string | null;
  adminNote: string | null;
  cardHolderName: string | null;
  cardNumber: string | null;
  expiryDate: string | null;
  saveCard: boolean;
  paymentDetails: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  completedAt: string | null;
  createdAt: string;
}

interface WithdrawData {
  reqDate: string;
  name: string;
  amount: string;
  method: string;
  id: string;
  status: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatMethod(method: string): string {
  const map: Record<string, string> = {
    CREDIT_DEBIT_CARD: "Credit/Debit Card",
    BANK_TRANSFER: "Bank Transfer",
    PAYPAL: "PayPal",
    CASH: "Cash",
  };
  return map[method] || method;
}

function normalizeStatus(status: string): string {
  // "PENDING" → "Pending", "APPROVED" → "Approved", "REJECTED" → "Rejected"
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export default function MyWithdrawalTable() {
  const { data } = useGetWithdrawalMyQuery({});
  const rawData: WithdrawalResponse[] = data?.data || [];

  const withdrawData: WithdrawData[] = rawData.map((item) => ({
    reqDate: formatDate(item.createdAt),
    name: item.cardHolderName || "N/A",
    amount: `$${parseFloat(item.amount).toFixed(2)}`,
    method: formatMethod(item.method),
    id: item.id,
    status: normalizeStatus(item.status),
  }));

  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(withdrawData.length / itemsPerPage);

  const columns: Column<WithdrawData>[] = [
    { header: "Req date", accessor: "reqDate" as keyof WithdrawData },
    {
      header: "Name",
      accessor: "name" as keyof WithdrawData,
      render: (value: string | undefined) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            {value ? value.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <div className="font-semibold">{value}</div>
          </div>
        </div>
      ),
    },
    { header: "ID", accessor: "id" as keyof WithdrawData },
    { header: "Amount", accessor: "amount" as keyof WithdrawData },
    { header: "Method", accessor: "method" as keyof WithdrawData },
    {
      header: "Status",
      accessor: "status" as keyof WithdrawData,
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "action" as keyof WithdrawData,
      render: (value: string | number, row) => (
        <TenantRequestDetails data={row} />
      ),
    },
  ];

  return (
    <div className="">
      <Card className="w-full overflow-hidden p-6">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <h2 className="text-2xl font-semibold ">Withdrawal list</h2>
            <div className="flex flex-wrap gap-4 ">
              <div className="w-full md:w-auto ">
                <SearchInput value={tenantSearch} onChange={setTenantSearch} />
              </div>
              <div className="w-[47.5%] md:w-auto">
                <SelectDropDown
                  value={tenantStatus}
                  onChange={setTenantStatus}
                  options={[
                    { label: "Approved", value: "Approved" },
                    { label: "Pending", value: "Pending" },
                    { label: "Rejected", value: "Rejected" },
                  ]}
                />
              </div>
              <div className="w-[47.5%] md:w-auto ">
                <DatePicker value={tenantDate} onChange={setTenantDate} />
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden mb-6">
            <DashboardDataTable columns={columns} data={withdrawData} />
          </div>

          {/* paggination */}
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={withdrawData.length}
            pageSize={itemsPerPage}
          ></TablePagination>
        </div>
      </Card>
    </div>
  );
}
