"use client";
import {
  DashboardDataTable,
  type Column,
} from "@/components/common/DashboardDataTable";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import DatePicker from "@/components/common/DatePicker";
import { useGetSubscriptionListQuery } from "@/redux/features/subscription/SubscriptionApi";
import type { SubscriptionListItem } from "@/redux/features/subscription/SubscriptionTypes";
import { TableSkeleton } from "@/components/common/Loader";

const FALLBACK_AVATAR =
  "https://randomuser.me/api/portraits/lego/1.jpg";

interface SubscriptionTableData {
  id: string;
  name: string;
  role: string;
  avatar: string;
  paidDate: string;
  planType: string;
  amount: string;
  methods: string;
  status: string;
}

type ApiStatus = "pending" | "active" | "past_due" | "canceled";

type DisplayStatus = "Trial" | "Paid" | "Free Plan" | "Active" | "Expired";

const STATUS_OPTIONS: DisplayStatus[] = [
  "Trial",
  "Paid",
  "Free Plan",
  "Active",
  "Expired",
];

const DISPLAY_TO_API_STATUS: Record<DisplayStatus, ApiStatus> = {
  Trial: "pending",
  Paid: "active",
  "Free Plan": "active",
  Active: "active",
  Expired: "past_due",
};

function formatPeriod(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function deriveStatus(item: SubscriptionListItem): string {
  if (!item.expiryDate) return "Active";
  return new Date(item.expiryDate) > new Date() ? "Active" : "Expired";
}

function transformToTableData(
  items: SubscriptionListItem[]
): SubscriptionTableData[] {
  return items.map((item) => ({
    id: item.id,
    name: item.user.name ?? "—",
    role: item.user.role,
    avatar: item.user.avatar ?? FALLBACK_AVATAR,
    paidDate: new Date(item.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    planType: item.plan.name,
    amount: "-",
    methods: "-",
    status: deriveStatus(item),
  }));
}

export function SubscriptionTable() {
  const [statusFilter, setStatusFilter] = useState<DisplayStatus | "">("");
  const [subscriptionDate, setSubscriptionDate] = useState<Date | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: apiData, isLoading, isError } = useGetSubscriptionListQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: search || undefined,
    status: statusFilter
      ? DISPLAY_TO_API_STATUS[statusFilter]
      : undefined,
    period: subscriptionDate ? formatPeriod(subscriptionDate) : undefined,
  });

  const tableData = useMemo<SubscriptionTableData[]>(() => {
    if (!apiData?.items?.length) return [];
    return transformToTableData(apiData.items);
  }, [apiData]);

  const totalPages = apiData?.pagination.totalPages ?? 1;
  const totalResults = apiData?.pagination.total ?? 0;

  const columns: Column<SubscriptionTableData>[] = [
    {
      header: "Name",
      accessor: "name",
      render: (_value: string, row: SubscriptionTableData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={row.name}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">{row.name}</div>
            <div className="text-xs text-gray-500">{row.role}</div>
          </div>
        </div>
      ),
    },
    { header: "Paid Date", accessor: "paidDate" },
    {
      header: "Plan Type",
      accessor: "planType",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${value === "Premium"
              ? "bg-blue-100 text-blue-600"
              : value === "Basic"
                ? "bg-orange-100 text-orange-600"
                : "bg-purple-100 text-purple-600"
            }`}
        >
          {value}
        </span>
      ),
    },
    { header: "Amount", accessor: "amount" },
    { header: "Methods", accessor: "methods" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${value === "Active"
              ? "bg-green-100 text-green-600"
              : value === "Expired"
                ? "bg-red-100 text-red-500"
                : "bg-gray-100 text-gray-600"
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "id",
      render: () => (
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden p-6">
        <div className="flex justify-center items-center h-64">
          <TableSkeleton rows={5} columns={6} />
        </div> 
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full overflow-hidden p-6">
        <div className="flex justify-center items-center h-64 text-red-500">
          Failed to load subscriptions. Please try again.
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Subscriptions</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={search} onChange={setSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={statusFilter}
                onChange={(val) => setStatusFilter(val as DisplayStatus | "")}
                options={STATUS_OPTIONS}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <DatePicker
                value={subscriptionDate}
                onChange={setSubscriptionDate}
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={columns} data={tableData} />
        </div>

        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={totalResults}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
}