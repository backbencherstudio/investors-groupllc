"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import { SubscriptionList } from "./_components/subscription-list";
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

const tenant: Tenant = {
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

export default function LandlordDetails() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-zinc-50 min-h-screen p-6">
      {/* Breadcrumb */}
      <div className="text-xs text-zinc-400 mb-4 flex gap-1">
        <span>User Management</span>
        <span>/</span>
        <span>Landlord</span>
        <span>/</span>
        <span className="text-zinc-700 font-medium">Landlord Details</span>
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Image
                src={tenant.avatar}
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16"
                alt={tenant.name}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-xl text-neutral-900 mb-1 truncate">
                      {tenant.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[15px] text-neutral-700">
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
                      className="bg-orange-500 hover:bg-orange-600 rounded-lg p-2 text-white"
                      title="Chat"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button
                      className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-2 text-zinc-500"
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

            {/* Details Grid */}
            <div className="text-[15px] space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-700">User ID</span>
                <span className="text-neutral-900 font-medium text-right">
                  {tenant.userId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-700">Current Address</span>
                <span className="text-neutral-900 font-medium text-right">
                  {tenant.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-700">Employer Name</span>
                <span className="text-neutral-900 font-medium text-right">
                  {tenant.employer}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-700">Job Title</span>
                <span className="text-neutral-900 font-medium text-right">
                  {tenant.jobTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-700">Annual Salary</span>
                <span className="text-neutral-900 font-medium text-right">
                  {tenant.salary}
                </span>
              </div>
            </div>
          </div>
          {/* Rent & Maintenance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2">
              <div className="font-semibold text-base mb-2">
                Rent Collection
              </div>
              <div className="flex justify-between text-sm">
                <span>Monthly</span>
                <span className="font-medium">$1,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tenant</span>
                <span className="font-medium">02</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Total Collection</span>
                <span className="font-medium">$14,400</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2">
              <div className="font-semibold text-base mb-2">Maintenance</div>
              <div className="flex justify-between text-sm">
                <span>Requests</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completed</span>
                <span className="font-medium">6</span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl p-4 flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-700">
                Maintenance Request (2)
              </span>
              <button className="border border-zinc-200 rounded px-4 py-1 text-sm font-medium hover:bg-zinc-50">
                View Details
              </button>
            </div>
            <div className="bg-white rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm text-zinc-700">Booking Request (1)</span>
              <button className="border border-zinc-200 rounded px-4 py-1 text-sm font-medium hover:bg-zinc-50">
                View Details
              </button>
            </div>
          </div>
        </div>
        {/* Right Column: Properties */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="font-semibold text-lg mb-4">Properties</div>
            <div className="grid grid-cols-1 gap-4 pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-zinc-100 p-4 flex flex-col gap-2"
                >
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                      alt="property"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-semibold">
                      For Rent
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="font-semibold text-base text-neutral-900">
                      Elm Apartment
                    </div>
                    <span className="text-green-500 font-semibold text-lg">
                      $3,000
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mb-1">
                    1234 Elm Street, New York, NY10001
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 text-xs">
                    <span className="bg-zinc-100 px-2 py-1 rounded">
                      2 Beds
                    </span>
                    <span className="bg-zinc-100 px-2 py-1 rounded">
                      2 Baths
                    </span>
                    <span className="bg-zinc-100 px-2 py-1 rounded">
                      950 sq ft
                    </span>
                    <span className="bg-zinc-100 px-2 py-1 rounded">
                      12 Floor
                    </span>
                    <span className="bg-zinc-100 px-2 py-1 rounded">
                      1 Year
                    </span>
                  </div>
                  <button className="border border-zinc-200 rounded-lg py-1 font-medium text-sm hover:bg-orange-50 transition">
                    Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Subscription List */}
      <SubscriptionList />

      {/* Documents */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
        <div className="font-semibold mb-4 text-base">Documents</div>
        <div className="flex flex-wrap gap-4">
          {[
            "Business License",
            "Insurance Certificate",
            "Identity Verification",
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
                <div className="text-xs text-neutral-400">12MB</div>
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
