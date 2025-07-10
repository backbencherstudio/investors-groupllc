import React from "react";
import { MessageCircle } from "lucide-react";

export default function Massage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="mb-4">
        <MessageCircle className="w-16 h-16 text-gray-200" />
      </div>
      <h2 className="text-lg font-semibold text-gray-400 mb-1">
        No messages yet
      </h2>
      <p className="text-sm text-gray-300">
        Start the conversation by sending a message
      </p>
    </div>
  );
}
