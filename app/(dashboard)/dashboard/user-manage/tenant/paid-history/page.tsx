"use client";

import { Card } from "@/components/ui/card";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import React, { useState } from "react";
import StatusBadge from "@/components/common/StatusBadges";
import DatePicker from "@/components/common/DatePicker";
import { Paginations } from "../../../_components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RentPaymentDetails } from "./_components/rent-payment-details";

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

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
}

export default function PaidHistory() {
  const [tenantStatus, setTenantStatus] = useState("Due");
  const [tenantSearch, setTenantSearch] = useState("");
  const [tenantDate, setTenantDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 2;

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
    {
      paidDate: "7/11/25",
      payment: "Pending",
      recipient: "Eleanor Pena",
      id: "RP-3039",
      property: "Maple Grove",
      amount: "$16,920",
      dueDate: "April 5",
      status: "Due",
      action: "View",
    },
    {
      paidDate: "5/27/25",
      payment: "Paid",
      recipient: "Dianne Russell",
      id: "RP-3045",
      property: "Oak Ridge",
      amount: "$16,920",
      dueDate: "April 5",
      status: "Paid",
      action: "View",
    },
    {
      paidDate: "8/16/25",
      payment: "Rejected",
      recipient: "Annette Black",
      id: "RP-3067",
      property: "Pine Valley",
      amount: "$2,200",
      dueDate: "April 5",
      status: "Due",
      action: "View",
    },
  ];

  const totalPages = Math.ceil(tenantData.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = tenantData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const tenantColumns: Column<TenantData>[] = [
    { header: "Paid Date", accessor: "paidDate" },
    {
      header: "Payment",
      accessor: "payment",
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    { header: "ID", accessor: "id" },
    { header: "Amount", accessor: "amount" },
    { header: "Due date", accessor: "dueDate" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string | undefined) => (
        <StatusBadge status={value || ""} />
      ),
    },
    {
      header: "Action",
      accessor: "action",
      render: () => <RentPaymentDetails />,
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-gray-400 mb-6">
        User Management &gt; Tenant &gt;{" "}
        <span className="text-black font-semibold text-[18px]">
          Rent Paid History
        </span>
      </div>

      {/* Filter & Table */}
      <div className="pb-12">
        <Card className="w-full overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
              <div className="flex flex-wrap gap-4 mb-4">
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
                    options={["Paid", "Due"]}
                  />
                </div>
                <div className="w-[47.5%] md:w-auto">
                  <DatePicker value={tenantDate} onChange={setTenantDate} />
                </div>
              </div>
            </div>

            {/* table */}
            <div className="relative w-full">
              <div className="rounded-md border">
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px] md:min-w-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {tenantColumns.map((col, idx) => (
                            <TableHead
                              key={idx}
                              className={`whitespace-rnowap`}
                            >
                              {col.header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedData.map((row) => (
                          <TableRow key={row.id}>
                            {tenantColumns.map((col, idx) => (
                              <TableCell
                                key={idx}
                                className={`whitespace-nowrap`}
                              >
                                {col.render
                                  ? col.render(row[col.accessor], row)
                                  : (row[col.accessor] as React.ReactNode)}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-zinc-500">
                {`Showing ${
                  tenantData.length === 0
                    ? 0
                    : (currentPage - 1) * PAGE_SIZE + 1
                }–${Math.min(currentPage * PAGE_SIZE, tenantData.length)} of ${
                  tenantData.length
                } results`}
              </div>
              <Paginations
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
