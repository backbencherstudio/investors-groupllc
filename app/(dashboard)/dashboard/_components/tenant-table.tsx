"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState } from "react";
import { DashboardDataTable } from "@/components/common/DashboardDataTable";
import Image from "next/image";
import StatusBadge from "@/components/common/StatusBadges";
import { EyeIcon } from "lucide-react";
import DatePicker from "@/components/common/DatePicker";

export default function TenantTable() {
  const [tenantStatus, setTenantStatus] = useState("Due");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);

  // TODO: Replace with SWR/React Query call to your API
  // fetched from backend

  const tenantColumns = [
    { header: "Paid Date", accessor: "paidDate" },
    { header: "Payment", accessor: "payment" },
    {
      header: "Recipient",
      accessor: "recipient",
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={value}
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
    { header: "ID", accessor: "id" },
    {
      header: "Property",
      accessor: "property",
      render: (value: string, row: any) => (
        <div>
          <div>{value}</div>
          <div className="text-xs text-gray-500">{row.propertyAddress}</div>
        </div>
      ),
    },
    { header: "Amount", accessor: "amount" },
    { header: "Due date", accessor: "dueDate" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => <StatusBadge status={value} />,
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

  const tenantData = [
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
      paidDate: "-",
      payment: "-",
      recipient: "Guy Hawkins",
      id: "RP-3025",
      property: "Skylight Squa.",
      amount: "$2,200",
      dueDate: "April 5",
      status: "Due",
      action: "View",
    },
  ]; // fetched from backend

  return (
    <div className="mb-40 pb-12">
      <Card className="w-full overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h2 className="text-2xl font-semibold mb-4">Tenant Rent Payment</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="w-full md:w-auto ">
                <SearchInput value={tenantSearch} onChange={setTenantSearch} />
              </div>
              <div className=" w-[47.5%]  md:w-auto">
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
          <div className="w-full overflow-hidden">
            <DashboardDataTable columns={tenantColumns} data={tenantData} />
          </div>
        </div>
      </Card>
    </div>
  );
}
