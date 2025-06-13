"use client";

import * as React from "react";
import { EyeIcon, X } from "lucide-react";
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

export function RentPaymentDetails() {
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
        <button className="text-gray-600 hover:text-primary cursor-pointer">
          <EyeIcon />
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-full sm:w-[480px]">
        <div className="flex flex-col h-full bg-white p-6">
          {/* Header */}
          <DrawerHeader className="flex flex-row justify-between items-center pb-4 border-b border-zinc-200 mb-4">
            <DrawerTitle className="text-[16px] font-semibold">
              Tenant Rent Payment Details
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="w-5 h-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* Tenant Info */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <img
                src={tenant.avatar}
                alt={tenant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{tenant.name}</div>
                <div className="text-sm text-muted-foreground">
                  {tenant.phone}
                </div>
                <div className="text-sm text-muted-foreground">
                  {tenant.email}
                </div>
              </div>
            </div>
            <Button
              variant="link"
              className="text-orange-500 text-sm p-0 h-auto cursor-pointer"
            >
              View Details
            </Button>
          </div>

          {/* Rental Info */}
          <div className="mb-6">
            <div className="font-semibold text-sm text-muted-foreground mb-2">
              Rental Information
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className="font-medium">{property.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {property.address}
                  </div>
                </div>
              </div>
              <Button
                variant="link"
                className="text-orange-500 text-sm p-0 h-auto  cursor-pointer"
              >
                View Details
              </Button>
            </div>

            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span className="text-green-700 font-semibold">
                  {property.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-semibold">
                  Success
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lease period</span>
                <span>Jan 10, 2025 – Dec 10, 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Paid Date</span>
                <span>Jan 10, 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date</span>
                <span>April 10, 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Count</span>
                <span>6 Month</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-semibold">
                  Paid
                </span>
              </div>
              <div className="flex justify-between">
                <span>Methods</span>
                <span>Credit Card</span>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="mb-6">
            <div className="font-semibold text-sm text-muted-foreground mb-3">
              Transaction Summary
            </div>
            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex justify-between">
                <span>Monthly fee (2,530×6)</span>
                <span>$15,180</span>
              </div>
              <div className="flex justify-between">
                <span>Service charge</span>
                <span>$2,100</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%)</span>
                <span>$750</span>
              </div>
              <div className="flex justify-between">
                <span>Get 6% off</span>
                <span className="text-red-500">− $1,080</span>
              </div>
              <hr className="border-zinc-200 my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$16,920</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <DrawerFooter className="flex flex-col sm:flex-row gap-2 mt-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              Send Invoice
            </Button>
            <Button className="w-full sm:w-auto">Download Receipt</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
