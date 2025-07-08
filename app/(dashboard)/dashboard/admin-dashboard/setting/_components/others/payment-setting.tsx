
import React from "react";
import PaymentReceiving from "../tabs/_components/payment-receving-table";
import PaymentSending from "../tabs/_components/payment-sending-table";
import AddPaymentGatway from "../tabs/_components/payment-gateway-add";


export default function PaymentSetting() {
  return (
    <div>
      {/* payments receving */}
      <div className="bg-white p-6 rounded-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 ">
          Payments Receving
        </h2>
        <PaymentReceiving />
        <AddPaymentGatway />
      </div>

      {/* payment sending */}
      <div className="bg-white p-6 rounded-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 ">
          Payments Sending
        </h2>
        <PaymentSending />
        <AddPaymentGatway />
      </div>
    </div>
  );
}
