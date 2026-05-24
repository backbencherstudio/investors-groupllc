"use client";

import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useGetUserByIdQuery } from "@/redux/features/user/UserApi";

interface VendorDetailsProps {
  id: string;
}

export default function VendorDetails({ id }: VendorDetailsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: user, isLoading } = useGetUserByIdQuery(id as string);

 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[400px]">
        <div className="text-neutral-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">Vendor not found</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="text-gray-400 mb-6">
        User Management &gt;{" "}
        <Link href="/dashboard/admin/user-manage">Vendor</Link> &gt;{" "}
        <span className="text-black font-semibold text-[18px]">Details</span>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="xl:col-span-8 bg-gray-50">
          {/* Vendor Card */}
          <div className="bg-gray-50">
            {/* Card */}
            <div className="bg-white rounded-xl p-6 mb-6 relative shadow-sm">
              <div className="flex items-start gap-4">
                <Image
                  src={user.profile?.avatar || "/default-avatar.png"}
                  className="rounded-full object-cover w-16 h-16"
                  alt=""
                  width={64}
                  height={64}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-xl text-neutral-900 mb-1 truncate">
                        {user.profile?.name || "N/A"}
                      </div>
                      <div className="flex items-center gap-3 text-[15px] text-neutral-700">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4 text-orange-500" />
                          {user.profile?.phone || "N/A"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-orange-500" />
                          {user.profile?.email || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <button
                        className="bg-orange-500 hover:bg-orange-600 rounded-lg p-2 text-white cursor-pointer"
                        title="Chat"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button
                        className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-2 text-zinc-500 cursor-pointer"
                        title="More"
                        onClick={toggleDropdown}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                          >
                            Edit
                          </a>
                          <div className="border-t border-dashed border-gray-200 my-1"></div>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                          >
                            Disable Chat
                          </a>
                          <div className="border-t border-dashed border-gray-200 my-1"></div>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                          >
                            Block
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-5 border-zinc-200" />
              {/* Details grid */}
              <div className="text-[15px] space-y-2">
                <div className="flex justify-between">
                  <div className="text-neutral-700">User ID</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {user.profile?.id || "N/A"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Current Address</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {user.profile?.address || "N/A"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Availability Status</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        user.profile?.availabilityStatus === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.profile?.availabilityStatus || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Service Type</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {user.profile?.serviceType || "N/A"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Total Jobs Completed</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {user.profile?.totalJobsCompleted || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Invoicing Card Start */}
          <div className="bg-white rounded-xl p-4 shadow-sm w-full">
            <div className="font-semibold text-base text-neutral-900 mb-2">
              Payment & Invoicing
            </div>
            <hr className="border-zinc-100 mb-2" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Paid</span>
                <span className="text-neutral-900 font-medium">
                  ${user.paymentInvoicing?.totalPaid?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pending Amount</span>
                <span className="text-neutral-900 font-medium">
                  ${user.paymentInvoicing?.pendingAmount?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Invoice Date</span>
                <span className="text-neutral-900 font-medium">
                  {user.paymentInvoicing?.lastInvoiceDate 
                    ? new Date(user.paymentInvoicing.lastInvoiceDate).toLocaleDateString() 
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
          {/* Payment & Invoicing Card End */}
        </div>

        {/* Right Section - Maintenance List */}
        <div className="bg-white rounded-xl p-4 shadow-sm w-full col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Maintenance List</h3>
            <span className="text-sm text-neutral-500 flex items-center gap-1 cursor-pointer select-none">
              All Status
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="space-y-3 max-h-90 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
            {user.maintenanceList && user.maintenanceList.length > 0 ? (
              user.maintenanceList.map((maintenance: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-zinc-100 flex gap-3 items-start"
                >
                  <Image
                    src={maintenance.propertyImage || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}
                    alt="property"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base text-neutral-900">
                      {maintenance.propertyName || "Property Name"}
                    </div>
                    <div className="text-xs text-neutral-500 mb-1">
                      {maintenance.propertyAddress || "Property Address"}
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-neutral-500">Status</span>
                      <span
                        className={`font-medium ${
                          maintenance.status === "On going"
                            ? "text-orange-500"
                            : maintenance.status === "In Review"
                            ? "text-blue-500"
                            : maintenance.status === "Completed"
                            ? "text-green-500"
                            : "text-neutral-500"
                        }`}
                      >
                        {maintenance.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        {maintenance.assignmentType || "Accepted Assignment"}
                      </span>
                      <span className="text-neutral-500">
                        {maintenance.date 
                          ? new Date(maintenance.date).toLocaleDateString() 
                          : "Date not set"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-neutral-500 py-8">
                No maintenance requests found
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Documents Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
        <h3 className="font-semibold mb-4 text-base">Documents</h3>
        <div className="flex flex-wrap gap-4">
          {(user.documents || []).map((doc: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-zinc-100 rounded-lg px-4 py-3 w-full sm:w-auto min-w-[180px] max-w-[220px] flex-1"
            >
              <div className="bg-red-100 rounded-md p-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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
                <div className="font-medium text-sm truncate">{doc.label}</div>
                <div className="text-xs text-neutral-400">
                  {doc.url?.split(".").pop()?.toUpperCase() || "FILE"}
                </div>
              </div>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-orange-500"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
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
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}