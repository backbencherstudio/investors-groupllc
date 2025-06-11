"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  UserCog,
  Building,
  MessageCircle,
  CreditCard,
  Settings,
  ShieldPlus,
  Crown,
  X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // make sure you have cn helper

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "User Manage", icon: Users, href: "/dashboard/user-manage" },
  { label: "Request", icon: GitBranch, href: "/dashboard/request" },
  { label: "VendorTask", icon: UserCog, href: "/dashboard/vendor-task" },
  { label: "Property", icon: Building, href: "/dashboard/property" },
  { label: "Massage", icon: MessageCircle, href: "/dashboard/massage" },
  { label: "Financial", icon: CreditCard, href: "/dashboard/financial" },
];

const customMenu = [
  {
    label: "Team Permission",
    icon: ShieldPlus,
    href: "/dashboard/team-permission",
  },
  { label: "Subscription", icon: Crown, href: "/dashboard/subscription" },
  { label: "Setting", icon: Settings, href: "/dashboard/setting" },
];

export function AppSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-[280px] flex flex-col bg-[#1c1c1c] text-white z-50 transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute right-4 top-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full w-full px-4 py-6 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="mb-6 px-2">
            <Image
              src="/logo.svg" // Replace with your logo
              alt="Investors Group LLC"
              width={160}
              height={50}
            />
          </div>

          {/* Main Menu */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-400 px-2 mb-1">Menu</p>
            {mainMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-zinc-800 transition",
                  pathname === item.href
                    ? "bg-zinc-700 text-white"
                    : "text-gray-300"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Custom Menu */}
          <div className="flex flex-col gap-1 mt-6">
            <p className="text-sm font-medium text-gray-400 px-2 mb-1">Custom</p>
            {customMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-zinc-800 transition",
                  pathname === item.href
                    ? "bg-zinc-700 text-white"
                    : "text-gray-300"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
