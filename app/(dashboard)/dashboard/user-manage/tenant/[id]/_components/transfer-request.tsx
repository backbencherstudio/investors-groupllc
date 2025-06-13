"use client";

import * as React from "react";
import { Mail, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function TransferRequest() {
  const tenant = {
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Johan Mitchell",
    role: "Tenant",
    phone: "+1555-123-7890",
    email: "johan@email.com",
    currentAddress: "Maple Grove 42 Elm St, Austin, TX",
    employer: "Mahher Hereoan",
    jobTitle: "Business",
    salary: "$10,000-$20,000",
  };

  const property = {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80",
    name: "Murphy House",
    id: "#R-Murphy House",
    address: "4140 Parker Rd. Allentown, New Mexi",
    requestType: "Property Transfer",
    requestId: "#R-00123",
    status: "In Review",
    requestDate: "Apr 10, 2025",
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          View Details
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full">
        <div className="flex flex-col h-full bg-white rounded-t-[10px] p-6">
          <DrawerHeader className="flex flex-row justify-between border-b border-zinc-200 pb-4 mb-4">
            <DrawerTitle className="text-xl font-bold text-neutral-900">
              Transfer Request
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="h-6 w-6" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4">
            {/* Tenant & Property Header */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Tenant Info */}
              <div className="flex items-center gap-3">
                <img
                  src={tenant.avatar}
                  alt={tenant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-neutral-900">
                    {tenant.name}
                  </div>
                  <div className="text-sm text-neutral-500">{tenant.role}</div>
                </div>
              </div>
              {/* Property Info */}
              <div className="flex items-center justify-end gap-3">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="text-right">
                  <div className="font-medium text-neutral-900">
                    {property.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {property.address}
                  </div>
                </div>
              </div>
              <Button
                variant="link"
                className="text-orange-500 text-sm p-0 h-auto"
              >
                View Details
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex gap-4 text-sm text-neutral-700 mb-6">
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-orange-500" />
                {tenant.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-orange-500" />
                {tenant.email}
              </span>
            </div>

            {/* Tenant Details */}
            <div className="space-y-3 text-sm mb-6">
              {[
                ["Current Address", tenant.currentAddress],
                ["Employer Name", tenant.employer],
                ["Job Title", tenant.jobTitle],
                ["Annual Salary", tenant.salary],
              ].map(([label, value], i) => (
                <div className="flex justify-between" key={i}>
                  <span className="text-neutral-700">{label}</span>
                  <span className="font-medium text-neutral-900 text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Requested Property Details */}
            <div className="space-y-3 text-sm mb-6">
              {[
                ["Requested Property", property.name],
                ["Location", property.address],
                ["Request Type", property.requestType],
                ["Request ID", property.requestId],
                ["Request Date", property.requestDate],
              ].map(([label, value], i) => (
                <div className="flex justify-between" key={i}>
                  <span className="text-neutral-700">{label}</span>
                  <span className="font-medium text-neutral-900 text-right">
                    {value}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-neutral-700">Status</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-semibold">
                  {property.status}
                </span>
              </div>
            </div>

            {/* Documents */}
            <div className="mb-6">
              <div className="font-semibold text-neutral-900 mb-3">
                Documents
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Lease Agreement", "ID Verification", "Pay Receipt"].map(
                  (doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white border border-zinc-100 rounded-lg px-4 py-3"
                    >
                      <div className="bg-red-100 rounded-md p-2 flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            width="16"
                            height="20"
                            x="4"
                            y="2"
                            rx="2"
                            fill="#F87171"
                          />
                          <path
                            d="M8 6h8M8 10h8M8 14h4"
                            stroke="#fff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {doc}
                        </div>
                        <div className="text-xs text-neutral-400">12 MB</div>
                      </div>
                      <button className="text-zinc-400 hover:text-orange-500">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 4v12m0 0l-4-4m4 4l4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="4"
                            y="18"
                            width="16"
                            height="2"
                            rx="1"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <DrawerFooter className="mt-auto flex flex-row gap-3 p-4 border-t border-zinc-200 pt-4">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
              Accept
            </Button>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="flex-1 border border-zinc-200 text-neutral-700"
              >
                Reject
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
