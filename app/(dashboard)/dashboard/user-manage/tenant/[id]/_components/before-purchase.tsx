"use client";

import PropertyIcon from "@/public/icons/property";
import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

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

export default function BeforePurchase({ tenant }: { tenant: Tenant }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-gray-50  p-6">
      {/* Tenant Info Card */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
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

      {/* No Property Placeholder */}
      <div className="flex flex-col items-center justify-center gap-3 py-10">
        <PropertyIcon />
        <h3 className="text-xl font-semibold text-neutral-500 mb-1">
          No property yet
        </h3>
        <p className="text-sm text-neutral-400 text-center">
          Just a heads up, users don&apos;t rent properties here.
        </p>
      </div>
    </div>
  );
}
