import React from "react";
import PaymentReceving from "./_components/payment-receving-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddPaymentGateway from "./_components/add-payment-gateway";
import AddButton from "@/components/common/AddButton";
import AddPaymentGatway from "./_components/add-payment-gateway";

export default function PaymentSetting() {
  return (
    <div>
      {/* payments receving */}
      <div className="bg-white p-6 rounded-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 ">
          Payments Receving
        </h2>
        <PaymentReceving />
        <AddPaymentGateway />
      </div>

      {/* payment sending */}
      <div className="bg-white p-6 rounded-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 ">
          Payments Sending
        </h2>
        <PaymentReceving />
        <AddPaymentGatway />
      </div>
    </div>
  );
}
