"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState } from "react";
import { Column, DashboardDataTable } from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";

import { TablePagination } from "@/components/common/TablePagination";

interface WithdrawData {
  reqDate: string;
  name: string;
  avatar: string;
  phone: string;
  id: string;
  userType: string;
  amount: string;
  method: string;
  status: "Approved" | "Pending" | "Rejected";
}

const withdrawData: WithdrawData[] = [
  {
    reqDate: "Apr 28, 2025",
    name: "Kathryn Murphy",
    avatar: "/avatars/kathryn.jpg",
    phone: "+231 06-758207...",
    id: "RW-24571",
    userType: "Vendor",
    amount: "$300",
    method: "Bank Transfer",
    status: "Approved",
  },
  {
    reqDate: "Apr 28, 2025",
    name: "Esther Howard",
    avatar: "/avatars/esther.jpg",
    phone: "+231 06-758207...",
    id: "RW-24572",
    userType: "Investor",
    amount: "$450",
    method: "Credit",
    status: "Pending",
  },
  {
    reqDate: "Apr 28, 2025",
    name: "Esther Howard",
    avatar: "/avatars/esther.jpg",
    phone: "+231 06-758207...",
    id: "RW-24573",
    userType: "Vendor",
    amount: "$450",
    method: "Credit",
    status: "Rejected",
  },
  {
    reqDate: "Apr 28, 2025",
    name: "Esther Howard",
    avatar: "/avatars/esther.jpg",
    phone: "+231 06-758207...",
    id: "RW-24574",
    userType: "Vendor",
    amount: "$450",
    method: "Credit",
    status: "Rejected",
  },
];

export default function WithdrawalTable() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(withdrawData.length / itemsPerPage);

  // TODO: Replace with SWR/React Query call to your API

  // fetched from backend

  const columns: Column<WithdrawData>[]  = [
    { header: "Req date", accessor: "reqDate" as keyof WithdrawData },
    {
      header: "Name",
      accessor: "name" as keyof WithdrawData,
      render: (value: string | undefined, row: WithdrawData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={value || ""}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{value}</div>
            <div className="text-xs text-gray-500">{row.phone}</div>
          </div>
        </div>
      ),
    },
    { header: "ID", accessor: "id" as keyof WithdrawData },
    { header: "User Type", accessor: "userType" as keyof WithdrawData },
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
      render: () => (
        <button className="text-gray-600 hover:text-primary">
          <EyeIcon />
        </button>
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
                  options={["Paid", "Due"]}
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
