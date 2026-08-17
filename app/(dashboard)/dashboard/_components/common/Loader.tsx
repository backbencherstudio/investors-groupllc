import React from "react";

export default function Loader() {
  return (
    <div className="p-6 flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DD8800]"></div>
    </div>
  );
}
