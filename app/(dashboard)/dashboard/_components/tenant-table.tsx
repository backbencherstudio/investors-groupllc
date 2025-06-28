"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState } from "react";
import { DashboardDataTable, Column } from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";

interface TenantData {
  paidDate: string;
  payment: string;
  recipient: string;
  id: string;
  property: string;
  amount: string;
  dueDate: string;
  status: string;
  action: string;
  avatar?: string;
  phone?: string;
  propertyAddress?: string;
}

const tenantData: TenantData[] = [
  {
    paidDate: "10/28/25",
    payment: "Success",
    recipient: "Kathryn Murphy",
    id: "RP-3021",
    property: "Trade Winds T.",
    amount: "$16,920",
    dueDate: "April 5",
    status: "Paid",
    action: "View",
  },
  {
    paidDate: "10/28/25",
    payment: "Success",
    recipient: "Kathryn Murphy",
    id: "RP-3022",
    property: "Trade Winds T.",
    amount: "$16,920",
    dueDate: "April 5",
    status: "Paid",
    action: "View",
  },
  {
    paidDate: "10/28/25",
    payment: "Success",
    recipient: "Kathryn Murphy",
    id: "RP-3023",
    property: "Trade Winds T.",
    amount: "$16,920",
    dueDate: "April 5",
    status: "Paid",
    action: "View",
  },
  {
    paidDate: "-",
    payment: "-",
    recipient: "Guy Hawkins",
    id: "RP-3024",
    property: "Skylight Squa.",
    amount: "$2,200",
    dueDate: "April 5",
    status: "Due",
    action: "View",
  },
  {
    paidDate: "-",
    payment: "-",
    recipient: "Guy Hawkins",
      id: "RP-3026",
    property: "Skylight Squa.",
    amount: "$2,200",
    dueDate: "April 5",
    status: "Due",
    action: "View",
  },
  {
    paidDate: "-",
    payment: "-",
    recipient: "Guy Hawkins",
    id: "RP-3027",
    property: "Skylight Squa.",
    amount: "$2,200",
    dueDate: "April 5",
    status: "Due",
    action: "View",
  },
]; // fetched from backend

export default function TenantTable() {
  const [tenantStatus, setTenantStatus] = useState("");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(tenantData.length / itemsPerPage);

  // TODO: Replace with SWR/React Query call to your API

  // fetched from backend

  const tenantColumns: Column<TenantData>[] = [
    { header: "Paid Date", accessor: "paidDate" },
    {
      header: "Payment",
      accessor: "payment",
      render: (value: string | undefined) => <StatusBadge status={value || ""} />,
    },
    {
      header: "Recipient",
      accessor: "recipient",
      render: (value: string | undefined, row: TenantData) => (
        <div className="flex items-center gap-2">
          {row.avatar && (
            <Image
              src={row.avatar}
              alt={value || ""}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div>
            <div className="font-semibold">{value}</div>
            {row.phone && <div className="text-xs text-gray-500">{row.phone}</div>}
          </div>
        </div>
      ),
    },
    { header: "ID", accessor: "id" },
    {
      header: "Property",
      accessor: "property",
      render: (value: string | undefined, row: TenantData) => (
        <div>
          <div>{value}</div>
          {row.propertyAddress && (
            <div className="text-xs text-gray-500">{row.propertyAddress}</div>
          )}
        </div>
      ),
    },
    { header: "Amount", accessor: "amount" },
    { header: "Due date", accessor: "dueDate" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string | undefined) => <StatusBadge status={value || ""} />,
    },
    {
      header: "Action",
      accessor: "action",
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
            <h2 className="text-2xl font-semibold ">Tenant Rent Payment</h2>
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
            <DashboardDataTable columns={tenantColumns} data={tenantData} />
          </div>

          {/* paggination */}
          <TablePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={tenantData.length}
            pageSize={itemsPerPage}
          ></TablePagination>
        </div>
      </Card>
    </div>
  );
}
