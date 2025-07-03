import React from "react";
import PaymentReceving from "./_components/payment-receving-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PaymentSetting() {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 ">
          Payments Receving
        </h2>
        <PaymentReceving />

        <Button className="bg-white text-black border rounded font-normal">
          <Plus></Plus>
          Add Gateway
        </Button>
      </div>
    </div>
  );
}
