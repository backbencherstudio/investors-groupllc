// src/components/tables/StatusBadge.tsx
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Due: "bg-red-100 text-red-700",
  Passive: "bg-green-100 text-green-700",
  Active: "bg-[#CDFDC6] text-[#04A755]",
  Inactive: "bg-[#FDEBEB] text-[#CB121D]",
  Success: "bg-green-100 text-green-700",
  Expanse: "bg-red-100 text-red-700",
  Approved: "bg-blue-100 text-blue-700",
  Pending: "bg-orange-100 text-orange-600",
  Rejected: "bg-red-100 text-red-600",
  Assigned: "bg-green-100 text-green-700",
  Basic: "bg-green-100 text-green-700",
  Trial: "bg-gray-100 text-gray-700",
  Premium: "bg-blue-100 text-blue-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "text-xs font-semibold px-3 py-1 rounded inline-block",
        statusStyles[status] || "bg-gray-100 text-gray-700"
      )}
    >
      {status}
    </span>
  );
}
