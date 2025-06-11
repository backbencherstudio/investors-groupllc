import React from "react";
import Header from "./_components/header";
import { AppSidebar } from "./_components/sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside className="lg:w-64 ">
        <AppSidebar />
      </aside>
      <div className="flex-1 bg-[#F9FAFB]">
        <div className="">
          <div className="flex justify-end items-center py-4 bg-white">
            <Header />
          </div>
          <div className="md:px-6 px-4 md:py-7 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
