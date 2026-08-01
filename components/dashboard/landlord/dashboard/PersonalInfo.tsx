"use client";

import { useFetchMeQuery } from "@/redux/features/auth/authApi";
import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PersonalInfo() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data } = useFetchMeQuery();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="bg-white rounded-xl w-full">
      {/* Tenant Card */}
      <div className="">
        {/* Card */}
        <div className="bg-white p-4 sm:p-6 mb-6 relative rounded-xl">
          <div className="flex items-start gap-3 sm:gap-4">
            <Image
              src={data?.avatar || "/placeholder-avatar.png"}
              className="rounded-full object-cover w-14 h-14 sm:w-16 sm:h-16 shrink-0"
              width={64}
              height={64}
              alt=""
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-bold text-lg sm:text-xl text-neutral-900 mb-1 truncate">
                    {data?.name || "-"}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm sm:text-[15px] text-neutral-700">
                    <span className="flex items-center gap-1 truncate">
                      <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="truncate">{data?.phone || "-"}</span>
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="truncate">{data?.email || "-"}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 relative shrink-0">
                  <button
                    className="bg-[#DD8800] rounded-lg p-2 text-white cursor-pointer"
                    title="Chat"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-2 text-zinc-500 cursor-pointer"
                    title="More"
                    onClick={toggleDropdown}
                  >
                    <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
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
          <div className="text-sm sm:text-[15px]">
            <div className="flex justify-between gap-2">
              <div className="text-neutral-700 shrink-0">User ID</div>
              <div className="text-right md:text-left font-medium text-neutral-900 truncate">
                {data?.id || "-"}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-neutral-700 shrink-0">Current Address</div>
              <div className="text-right md:text-left font-medium text-neutral-900 truncate">
                {data?.address || "-"}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-neutral-700 shrink-0">Employer Name</div>
              <div className="text-right md:text-left font-medium text-neutral-900 truncate">
                {data?.occupation || "-"}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-neutral-700 shrink-0">Job Title</div>
              <div className="text-right md:text-left font-medium text-neutral-900 truncate">
                {data?.job_title || "-"}
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="text-neutral-700 shrink-0">Annual Salary</div>
              <div className="text-right md:text-left font-medium text-neutral-900 truncate">
                {data?.annual_salary || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
