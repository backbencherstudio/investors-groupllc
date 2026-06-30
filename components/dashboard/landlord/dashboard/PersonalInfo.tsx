"use client";

import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

export default function PersonalInfo() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className=" bg-white rounded-xl">
      {/* Tenant Card */}
      <div className="">
        {/* Card */}
        <div className="bg-white  p-6 mb-6 relative rounded-xl">
          <div className="flex items-start gap-4">
            <Image
              src={tenant.avatar}
              className="rounded-full object-cover w-16 h-16"
              width={64}
              height={64}
              alt=""
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
    </div>
  );
}
