"use client";

import React, { useState } from "react";
import Header from "./_components/header";
import { AppSidebar } from "./_components/sidebar";
// import { TableDemo } from "@/components/common/TableDemo";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <AppSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-full">
        {/* Header */}
        <header className="w-full border-b bg-white sticky top-0 z-40">
          <Header onMobileMenuClick={toggleMobileMenu} />
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 md:px-6 py-4 md:py-6 overflow-x-hidden">
          <div className="max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
