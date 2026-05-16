// SubscriptionTable.tsx
"use client";
import {
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import { Card } from "@/components/ui/card";
import React, { useMemo, useEffect } from "react";
import { useGetSubscriptionListQuery } from "@/redux/features/subscription/SubscriptionApi";
import { TableSkeleton } from "@/components/common/Loader";
import { useTableSearch } from "@/hooks/table/useTableSearch";
import { useTableFilters } from "@/hooks/table/useTableFilters";
import { useTablePagination } from "@/hooks/table/useTablePagination";
import { SubscriptionListItem } from "@/redux/features/subscription/SubscriptionTypes";
import { subscriptionColumns } from "./subscriptionTableCol";




// types.ts
export interface SubscriptionTableData {
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



// constants.ts
export const STATUS_OPTIONS: { label: DisplayStatus; value: DisplayStatus }[] = [
  { label: "Trial", value: "Trial" },
  { label: "Paid", value: "Paid" },
  { label: "Free Plan", value: "Free Plan" },
  { label: "Active", value: "Active" },
  { label: "Expired", value: "Expired" },
];

export const DISPLAY_TO_API_STATUS: Record<DisplayStatus, ApiStatus> = {
  Trial: "pending",
  Paid: "active",
  "Free Plan": "active",
  Active: "active",
  Expired: "past_due",
};

export const PERIOD_OPTIONS: { label: string; value: string | undefined }[] = [
  { label: "All time", value: undefined },
  { label: "This month", value: "this_month" },
  { label: "Last month", value: "last_month" },
  { label: "Last 3 months", value: "last_3_months" },
  { label: "Last 6 months", value: "last_6_months" },
  { label: "Last year", value: "last_year" },
];

export const FALLBACK_AVATAR = "https://randomuser.me/api/portraits/lego/1.jpg";

export type ApiStatus = "pending" | "active" | "past_due" | "canceled";
export type DisplayStatus = "Trial" | "Paid" | "Free Plan" | "Active" | "Expired";

// utils.ts
export function deriveStatus(item: SubscriptionListItem): string {
  if (!item.expiryDate) return "Active";
  return new Date(item.expiryDate) > new Date() ? "Active" : "Expired";
}


export function transformToTableData(
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
    amount:   "-",
    methods: "-",
    // amount: item.amount ? `$${item.amount}` : "-",
    // methods: item.paymentMethod || "-",
    status: deriveStatus(item),
  }));
}


export function SubscriptionTable() {
  const { search, setSearch } = useTableSearch();

  const { filters, setFilter } = useTableFilters<{
    search?: string;
    status?: DisplayStatus;
    period?: typeof PERIOD_OPTIONS[number]["value"];
  }>();

  const { currentPage, setCurrentPage, itemsPerPage } = useTablePagination();

  const periodValue = filters.period || undefined;

  const { data: apiData, isLoading, isError } = useGetSubscriptionListQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: search || undefined,
    status: filters.status ? DISPLAY_TO_API_STATUS[filters.status] : undefined,
    period: periodValue,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters.status, filters.period, setCurrentPage]);

  const tableData = useMemo(() => {
    if (!apiData?.items?.length) return [];
    return transformToTableData(apiData.items);
  }, [apiData]);

  const pagination = apiData?.pagination;

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
    <Card className="w-full overflow-hidden p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Subscriptions</h2>

        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <SearchInput value={search} onChange={setSearch} />
          </div>

          <div className="w-[47.5%] md:w-auto">
            <SelectDropDown
              value={filters.status || ""}
              onChange={(val) =>
                setFilter("status", (val as DisplayStatus) || undefined)
              }
              options={STATUS_OPTIONS}
            />
          </div>

          <div className="w-[47.5%] md:w-auto">
            <SelectDropDown
              value={filters.period || ""}
              onChange={(val) => {
                setFilter("period", val as typeof PERIOD_OPTIONS[number]["value"] || undefined);
              }}
              options={PERIOD_OPTIONS as { label: string; value: string }[]}
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <DashboardDataTable columns={subscriptionColumns} data={tableData} />
      </div>

      {pagination && pagination.totalPages > 1 && (
        <TablePagination
          pagination={pagination}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Card>
  );
}