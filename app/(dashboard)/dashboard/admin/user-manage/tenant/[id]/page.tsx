import React from "react";
import AfterPurchase from "./_components/after-purchase";
import BeforePurchase from "./_components/before-purchase";

export default function TenantDetails() {
  // Mock data
  const tenant = {
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Johan Mitchell",
    phone: "+1555-123-7890",
    email: "johan@email.com",
    userId: "#T762349",
    address: "Maple Grove 42 Elm St, Austin, TX",
    employer: "Mahher Hereoan",
    jobTitle: "Business",
    salary: "$10,000-$20,000",
  };

  const isPurchase = true;

  return (
    <div>
      {/* Breadcrumb */}
      <div className=" text-gray-400 mb-6">
        User Management &gt; Tenant &gt;{" "}
        <span className="text-black font-semibold text-[18px]">
          Tenant Details
        </span>
      </div>
      {isPurchase ? (
        <AfterPurchase tenant={tenant} />
      ) : (
        <BeforePurchase tenant={tenant} />
      )}
    </div>
  );
}
