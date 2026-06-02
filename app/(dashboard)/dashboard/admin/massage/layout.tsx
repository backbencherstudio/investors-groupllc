import React from "react";
import LeftSideUser from "./_components/left-side-user";

export default function MassageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-[#d48806]">Admin Messages</p>
        <h1 className="text-2xl font-semibold text-slate-950">Message Center</h1>
      </div>

      <div className="grid min-h-[calc(100vh-210px)] grid-cols-1 gap-5 xl:h-[calc(100vh-210px)] xl:min-h-0 xl:grid-cols-12">
        <div className="min-h-[420px] xl:col-span-4 xl:min-h-0">
          <LeftSideUser />
        </div>
        <div className="min-h-[520px] xl:col-span-8 xl:min-h-0">{children}</div>
      </div>
    </div>
  );
}
