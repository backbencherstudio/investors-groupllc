"use client";

import AfterPurchase from "./_components/after-purchase";
import BeforePurchase from "./_components/before-purchase";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetUserByIdQuery } from "@/redux/features/user/UserApi";
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
export default function TenantDetails() {




  const isPurchase = true;
  const { id } = useParams();
  console.log("id: ", id);


  return (
    <div>
      {/* Breadcrumb */}
      <div className=" text-gray-400 mb-6">
        User Management &gt; <Link href="/dashboard/admin/user-manage">Tenant</Link> &gt;{" "}
        <span className="text-black font-semibold text-[18px]">
          Tenant Details
        </span>
      </div>
      {isPurchase ? (
        <AfterPurchase id={id as string} />
      ) : (
        <BeforePurchase tenant={tenant} />
      )}
    </div>
  );
}
 