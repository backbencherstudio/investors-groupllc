import React from "react";
import LeftSideUser from "./_components/left-side-user";

export default function MassageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-semibold mb-5 text-xl">Message</h1>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <LeftSideUser />
        </div>
        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
