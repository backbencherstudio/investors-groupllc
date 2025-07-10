// pages/index.js

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Fake data (you can replace this with your API call data)
const chatData = [
  {
    id: 1,
    name: "John Whilham",
    message: "Hi, I'm John! We're...",
    time: "Now",
  },
  {
    id: 2,
    name: "John Whilham",
    message: "Hi, I'm John! We're...",
    time: "5 min",
  },
  {
    id: 3,
    name: "John Whilham",
    message: "Hi, I'm John! We're...",
    time: "5 min",
  },
  {
    id: 4,
    name: "John Whilham",
    message: "Hi, I'm John! We're...",
    time: "12hr",
  },
  {
    id: 5,
    name: "John Whilham",
    message: "Hi, I'm John! We're...",
    time: "12hr",
  },
  {
    id: 6,
    name: "John Whilham",
    message: "Hi, I'm John! We're...",
    time: "12hr",
  },
];

export default function LeftSideUser() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto h-[715px]">
      {/* Search bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search here..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto pb-2">
      <div className="flex gap-3">
        {chatData.map((chat, idx) => (
          <Link href={`/dashboard/admin-dashboard/massage/${chat.id}`} key={chat.id} className="relative">
            {/* Avatar */}
            <Image
              src={`https://randomuser.me/api/portraits/men/${chat.id}.jpg`}
              alt={chat.name}
              className="w-14 h-14 rounded-full object-cover"
              width={56}
              height={56}
            />
            {/* Online dot for the second avatar as an example */}
            {idx === 1 && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </Link>
        ))}
      </div>
    </div>

      <div className="space-y-3">
        <h1 className="font-medium">Recent Chat</h1>
        {/* Chat filter tabs */}
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 focus:outline-none">
            Tenant
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 focus:outline-none">
            Vendor
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 focus:outline-none">
            Landlord
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 focus:outline-none">
            Investor
          </button>
        </div>

        {/* Recent Chat List */}
        <div className="space-y-4">
          {chatData?.map((chat) => (
            <Link href={`/dashboard/landlord/massage/${chat.id}`}
              key={chat?.id}
              className="flex items-center space-x-4 border-b border-gray-200 pb-4"
            >
              {/* Avatar */}
              <Image
                src={`https://randomuser.me/api/portraits/men/${chat.id}.jpg`}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
                width={50}
                height={50}
              />

              {/* Chat Content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">{chat.name}</span>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <div className="text-sm text-gray-700 mt-1">{chat.message}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
