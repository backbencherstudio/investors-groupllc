"use client";

import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import React, { useState } from "react";
import { TransferRequest } from "./transfer-request";
import Link from "next/link";
import Image from "next/image";

interface Tenant {
  avatar: string;
  name: string;
  phone: string;
  email: string;
  userId: string;
  address: string;
  employer: string;
  jobTitle: string;
  salary: string;
}

export default function AfterPurchase({ tenant }: { tenant: Tenant }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="xl:col-span-8 bg-gray-50">
          {/* Tenant Card */}
          <div className="bg-gray-50">
            {/* Card */}
            <div className="bg-white rounded-xl p-6 mb-6 relative shadow-sm">
              <div className="flex items-start gap-4">
                <Image
                  src={tenant.avatar}
                  alt={tenant.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-16 h-16"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-xl text-neutral-900 mb-1 truncate">
                        {tenant.name}
                      </div>
                      <div className="flex items-center gap-3 text-[15px] text-neutral-700">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4 text-orange-500" />
                          {tenant.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4 text-orange-500" />
                          {tenant.email}
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
                        className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-2 text-zinc-500  cursor-pointer"
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
              <div className=" text-[15px]">
                <div className="flex justify-between">
                  <div className="text-neutral-700">User ID</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.userId}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Current Address</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.address}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Employer Name</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.employer}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Job Title</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.jobTitle}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-neutral-700">Annual Salary</div>
                  <div className="text-right md:text-left font-medium text-neutral-900">
                    {tenant.salary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rent & Maintenance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Rent Payment */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Rent Payment</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Rent</span>
                  <span className="font-medium">$16,920</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Payment</span>
                  <span className="font-medium">Nov 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Month Count</span>
                  <span className="font-medium">6 Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-semibold">
                    Paid
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Due Amount</span>
                  <span className="text-red-500 font-semibold">$3,000</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="bg-orange-100 text-orange-600 px-4 py-1 rounded font-medium text-sm">
                  Reminder
                </button>
                <Link
                  href={"/dashboard/user-manage/tenant/paid-history"}
                  className="border border-zinc-200 px-4 py-1 rounded font-medium text-sm"
                >
                  History
                </Link>
              </div>
            </div>

            {/* Maintenance */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Maintenance</h3>
              <div className="space-y-2 text-sm">
                {[
                  ["Total task", 8],
                  ["Pending Task", 1],
                  ["On Going", 2],
                  ["In Review", 1],
                  ["Completed", 5],
                ].map(([label, count], i) => (
                  <div key={i} className="flex justify-between">
                    <span>{label}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href={"/dashboard/user-manage/tenant/maintenance-details"}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded font-medium text-sm"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          {/* Transfer Request */}
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-neutral-700 font-medium text-sm">
              Transfer Request
            </span>
            {/* <button className="border border-zinc-200 px-4 py-1 rounded font-medium text-sm">
              View Details
            </button> */}
            <TransferRequest />
          </div>
        </div>

        {/* Right Section */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Property"
              width={160}
              height={160}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <div className="flex gap-2 mb-3">
              {[1, 2, 3].map((_, i) => (
                <Image
                  key={i}
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-lg"
                  alt={`thumb${i}`}
                />
              ))}
              <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-neutral-600 font-semibold text-sm">
                +10
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Oakwood Avenue</h4>
            <div className="flex flex-wrap gap-2 mb-2 text-sm">
              {["2 Beds", "2 Baths", "950 sq ft", "12 Floor", "1 Year"].map(
                (item, i) => (
                  <span key={i} className="bg-zinc-100 px-2 py-1 rounded">
                    {item}
                  </span>
                )
              )}
            </div>
            <div className="flex items-center gap-2 text-neutral-700 text-sm mb-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="#F59E42"
                  strokeWidth="2"
                  d="M12 21s-6-5.686-6-10A6 6 0 0 1 18 11c0 4.314-6 10-6 10Z"
                />
                <circle
                  cx="12"
                  cy="11"
                  r="2"
                  stroke="#F59E42"
                  strokeWidth="2"
                />
              </svg>
              Maple Grove 42 Elm St, Austin, TX
            </div>
            <div className="bg-zinc-100 rounded-lg h-28 w-full flex items-center justify-center mb-3 relative overflow-hidden">
              <span className="text-neutral-400 text-sm absolute z-10">
                Map
              </span>
              <Image
                src="https://maps.googleapis.com/maps/api/staticmap?center=Austin,TX&zoom=13&size=300x100&key=AIzaSyDUMMY"
                alt="map"
                width={300}
                height={100}
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="font-semibold mb-1">Description</div>
            <div className="text-sm text-neutral-700 mb-4">
              Spacious apartment with hardwood floors, modern kitchen, walk-in
              closets, and a private balcony with city views...{" "}
              <span className="text-orange-500 cursor-pointer">Read More</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded font-medium text-sm">
                View Details
              </button>
              <button className="border border-zinc-200 px-4 py-1 rounded font-medium text-sm">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Documents Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
        <h3 className="font-semibold mb-4 text-base">Documents</h3>
        <div className="flex flex-wrap gap-4">
          {[
            "Lease Agreement",
            "ID Verification",
            "Proof of Income",
            "Pay Receipts",
          ].map((name, i) => (
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
                <div className="font-medium text-sm truncate">{name}</div>
                <div className="text-xs text-neutral-400">12 MB</div>
              </div>
              <button className="text-zinc-400 hover:text-orange-500">
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
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
