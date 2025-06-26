import { DataTable } from "@/app/(dashboard)/dashboard/_components/dashboard-table";
import StatusBadge from "@/components/common/StatusBadges";
import React from "react";

export default function PaymentReceving() {
  const paymentTableColumns = [
    {
      header: "Gateway",
      accessor: "gateway",
    },
    {
      header: "Method Supported",
      accessor: "method",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "action",
      render: () => <button>ON/OFF</button>,
    },
  ];
  return (
    <div>
      <DataTable columns={paymentTableColumns}></DataTable>
    </div>
  );
}
