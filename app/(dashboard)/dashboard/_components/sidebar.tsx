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
  PanelRightClose,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "../../../../public/logo.svg";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const mainMenu = [
  // for admin
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/admin",
    roles: ["admin"],
  },
  {
    label: "User Manage",
    icon: Users,
    href: "/dashboard/admin/user-manage",
    roles: ["admin"],
  },
  {
    label: "Request",
    icon: GitBranch,
    href: "/dashboard/admin/request",
    roles: ["admin"],
  },
  {
    label: "VendorTask",
    icon: UserCog,
    href: "/dashboard/admin/vendor-task",
    roles: ["admin"],
  },
  {
    label: "Property",
    icon: Building,
    href: "/dashboard/admin/property/rental-property",
    roles: ["admin"],
  },
  {
    label: "Massage",
    icon: MessageCircle,
    href: "/dashboard/admin/massage",
    roles: ["admin"],
  },
  {
    label: "Financial",
    icon: CreditCard,
    href: "/dashboard/admin/financial",
    roles: ["admin"],
  },
  // for landlord
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/landlord",
    roles: ["landlord"],
  },
  {
    label: "Request",
    icon: GitBranch,
    href: "/dashboard/landlord/request",
    roles: ["landlord"],
  },
  {
    label: "VendorTask",
    icon: UserCog,
    href: "/dashboard/landlord/vendor-task",
    roles: ["landlord"],
  },
  {
    label: "Property",
    icon: Building,
    href: "/dashboard/landlord/property/rental-property",
    roles: ["landlord"],
  },
  {
    label: "Massage",
    icon: MessageCircle,
    href: "/dashboard/landlord/massage",
    roles: ["landlord"],
  },
  {
    label: "Financial",
    icon: CreditCard,
    href: "/dashboard/landlord/financial",
    roles: ["landlord"],
  },
];

const customMenu = [
  {
    label: "Team Permission",
    icon: ShieldPlus,
    href: "/dashboard/admin/team-permission",
    roles: ["admin"],
  },
  {
    label: "Subscription",
    icon: Crown,
    href: "/dashboard/admin/subscription",
    roles: ["admin"],
  },
  {
    label: "Setting",
    icon: Settings,
    href: "/dashboard/admin/setting",
    roles: ["admin"],
  },
  {
    label: "Subscription",
    icon: Crown,
    href: "/dashboard/landlord/subscription",
    roles: ["landlord"],
  },
  {
    label: "Setting",
    icon: Settings,
    href: "/dashboard/landlord/setting",
    roles: ["landlord"],
  },
];

export function AppSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const role = "admin";

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
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-[280px] flex flex-col bg-[#1c1c1c] text-white z-50 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute right-2.5 top-3 text-gray-400 hover:text-white"
        >
          {/* <X className="w-6 h-6" /> */}
          <PanelRightClose />
        </button>

        <div className="h-full w-full px-4 py-6 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="mb-6 px-2">
            <Image
              src={logo} // Replace with your logo
              alt="Investors Group LLC"
              width={161}
              height={80}
            />
          </div>

          {/* Main Menu */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-400 px-2 mb-1">Menu</p>
            {mainMenu
              .filter((item) => item.roles.includes(role))
              .map((item) => (
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
            <p className="text-sm font-medium text-gray-400 px-2 mb-1">
              Custom
            </p>
            {customMenu
              .filter((item) => item.roles.includes(role))
              .map((item) => (
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

// menuItems.filter((item) => item.roles.includes(userRole))
//                 .map(({ href, icon, label, iconTwo, subMenu, id }) => {
//                   const isActive = pathname === href;
//                   const manage =
//                     href.includes("client-management") ||
//                     href.includes("coach-management") ||
//                     href.includes("schedule") ||
//                     href.includes("financial-management");
//                   return (
//                     <div key={id}>
//                       {manage ? (
//                         <div>
//                           <button
//                             className={`flex w-full items-center cursor-pointer px-3 pr-1 gap-2 p-2 rounded-lg transition focus:bg-[#004D492E] focus:text-[#004D49] focus:font-semibold ${
//                               (id === subMenuOpen)
//                                 ? "bg-[#004D492E] text-[#004D49] font-semibold"
//                                 : "hover:bg-[rgba(0,77,73,0.18)]"
//                             }`}
//                             onClick={() => handleSubMenu(id)}
//                           >
//                             <div className="flex items-center gap-2  w-full">
//                               <span>{icon}</span>
//                               <div className="whitespace-nowrap flex items-center justify-between gap-[6px] w-full">
//                                 {label}
//                                 <span
//                                   className={`${
//                                     id === subMenuOpen
//                                       ? "rotate-180 duration-300"
//                                       : "rotate-0 duration-300"
//                                   }`}
//                                 >
//                                   {iconTwo}
//                                 </span>
//                               </div>
//                             </div>
