import { DashboardDataTable } from "@/components/common/DashboardDataTable";
import StatusBadge from "@/components/common/StatusBadges";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { PaymentMethodData } from "./payment.type";

// import axios from "axios";

// Sample data to pass into the table
const paymentData: PaymentMethodData[] = [
  {
    id: 1,
    gateway: "Stripe",
    method: "Credit & Debit",
    status: "Active",
    action: true,
  },
  {
    id: 2,
    gateway: "PayPal",
    method: "Wallet",
    status: "Active",
    action: true,
  },
  {
    id: 3,
    gateway: "ACH Bank",
    method: "Bank Transfer",
    status: "Inactive",
    action: false,
  },
];

export default function PaymentReceiving() {
  // State to manage action for each row
  const [data, setData] = useState<PaymentMethodData[]>(paymentData);

  // Handle the switch change and call API
  const handleSwitchChange = async (id: number) => {
    // Find the row that is being updated
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, action: !item.action } : item
    );

    // Update local state immediately (optimistic UI)
    setData(updatedData);

    // console.log(!data.find((item) => item.id === id)?.action,)
    const actionBody = !data.find((item) => item.id === id)?.action;
    console.log(actionBody);

    // Call the API to sync with the backend
    // try {
    //   const response = await axios.post('/api/updatePaymentMethod', {
    //     id,
    //     action: !data.find((item) => item.id === id)?.action,
    //   });

    //   // Optionally, log or handle the response
    //   console.log('API Response:', response.data);
    // } catch (error) {
    //   // Handle the error (e.g., revert state, show notification)
    //   console.error('Error updating payment method:', error);
    //   // You could revert the state if API call fails:
    //   setData(data); // Reset to the previous state if needed
    // }
  };

  // Define the columns for the table
  const paymentTableColumns = [
    {
      header: "Gateway",
      accessor: "gateway" as keyof PaymentMethodData, // Explicitly type accessor
    },
    {
      header: "Method Supported",
      accessor: "method" as keyof PaymentMethodData, // Explicitly type accessor
    },
    {
      header: "Status",
      accessor: "status" as keyof PaymentMethodData,
      render: (value: string | number | boolean) => (
        <StatusBadge status={String(value)} />
      ),
    },
    {
      header: "Action",
      accessor: "action" as keyof PaymentMethodData,
      render: (value: string | number | boolean, row: PaymentMethodData) => (
        <Switch
          checked={Boolean(value)}
          onCheckedChange={() => handleSwitchChange(row.id)}
        />
      ),
    },
  ];

  return (
    <div>
      <DashboardDataTable columns={paymentTableColumns} data={data} />
    </div>
  );
}
