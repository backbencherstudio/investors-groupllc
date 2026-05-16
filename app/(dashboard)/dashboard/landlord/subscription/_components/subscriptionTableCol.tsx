// columns.tsx
import { Column } from "@/components/common/DashboardDataTable";
import { Eye } from "lucide-react";
import Image from "next/image";


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

export type ApiStatus = "pending" | "active" | "past_due" | "canceled";
export type DisplayStatus = "Trial" | "Paid" | "Free Plan" | "Active" | "Expired";

export const subscriptionColumns: Column<SubscriptionTableData>[] = [
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
  {
    header: "Paid Date",
    accessor: "paidDate",
  },
  {
    header: "Plan Type",
    accessor: "planType",
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          value === "Premium"
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
  {
    header: "Amount",
    accessor: "amount",
  },
  {
    header: "Methods",
    accessor: "methods",
  },
  {
    header: "Status",
    accessor: "status",
    render: (value: string) => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          value === "Active"
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