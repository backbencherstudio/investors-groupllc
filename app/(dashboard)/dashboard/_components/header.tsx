import { Input } from "@/components/ui/input";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  return (
    <div className="w-full flex items-center justify-between px-4 md:px-6 pt-[32px] pb-[24px] bg-white">
      <div className="flex items-center gap-2">
        {/* Mobile Menu Trigger */}
        <button 
          onClick={onMobileMenuClick}
          className="lg:hidden p-1 hover:bg-zinc-100 rounded-md"
        >
          <Menu className="h-6 w-6 text-zinc-700" />
        </button>
        
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-semibold text-zinc-900">Dashboard</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search Input - Hidden on mobile */}
        <div className="hidden md:block relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </span>
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 w-[200px] lg:w-[300px] bg-zinc-100 rounded-md"
          />
        </div>

        {/* Notification Bell */}
        <button className="p-2 hover:bg-zinc-100 rounded-full">
          <Bell className="h-5 w-5 text-zinc-700" />
        </button>

        {/* Profile Image */}
        <button className="flex items-center">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        </button>
      </div>
    </div>
  );
}
