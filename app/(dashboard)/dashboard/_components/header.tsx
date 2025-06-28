import { Input } from "@/components/ui/input";
import { Menu, Crown, Settings as SettingsIcon, LogOut } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import NotificationDropdown from "./notifications";

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

export default function Header({ onMobileMenuClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
        <h1 className="text-xl md:text-2xl font-semibold text-zinc-900">
          Dashboard
        </h1>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-4 relative">
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
        {/* <button className="p-2 hover:bg-zinc-100 rounded-full">
          <Bell className="h-5 w-5 text-zinc-700" />
        </button> */}
        <NotificationDropdown />
        {/* Profile Image and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open user menu"
          >
            <Image
              src="/avatars/esther.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border z-50 animate-fade-in-up">
              <ul className="py-2">
                <li>
                  <button className="w-full flex items-center gap-3 px-5 py-2 text-zinc-800 hover:bg-zinc-100 transition">
                    <Crown className="h-5 w-5" />
                    <span>Subscription</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-5 py-2 text-zinc-800 hover:bg-zinc-100 transition">
                    <SettingsIcon className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-5 py-2 text-red-600 hover:bg-zinc-100 transition">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
