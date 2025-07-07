// pages/chat.js (or any other page in your Next.js project)
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Paperclip, Image as ImageIcon, Mic } from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "You",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:30 PM",
  },
  {
    id: 2,
    sender: "Mr. Joe",
    message: "Perfect. Thank you so much.",
    time: "06:30 PM",
  },

  {
    id: 3,
    sender: "You",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:40 PM",
  },
  {
    id: 4,
    sender: "You",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:30 PM",
  },
  {
    id: 5,
    sender: "You",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:30 PM",
  },
  {
    id: 6,
    sender: "You",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:30 PM",
  },
  {
    id: 9,
    sender: "Mr. Joe",
    message: "Perfect. Thank you so much.",
    time: "06:30 PM",
  },
  {
    id: 7,
    sender: "You",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:30 PM",
  },
  {
    id: 8,
    sender: "Mr. Joe",
    message:
      "Hi, I was wondering if I could schedule a maintenance visit for the kitchen sink. It's leaking again.",
    time: "06:30 PM",
  },
];

export default function ChatPage() {
  return (
    <div className="relative w-full h-[715px] bg-white p-6 rounded-xl shadow-md">
      {/* Header with user info */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-3">
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold text-lg">Mr. Joe</p>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">10 Feb, 2025</p>
      </div>

      {/* Messages */}
      <div className="space-y-4 h-[550px] overflow-x-auto py-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            } items-start space-x-3`}
          >
            {/* Sender Avatar */}
            {msg.sender !== "You" && (
              <Image
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Sender Avatar"
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            )}
            {/* Message Content */}
            <div
              className={`max-w-[70%] ${
                msg.sender === "You" ? "bg-blue-100 text-right" : "bg-gray-100"
              } p-4 rounded-lg`}
            >
              <p className="text-sm">{msg.message}</p>
              <span className="text-xs text-gray-500 block mt-2">
                {msg.time}
              </span>
            </div>
            {/* Sender Avatar (for "You") */}
            {msg.sender === "You" && (
              <Image
                src="https://randomuser.me/api/portraits/men/3.jpg"
                alt="You Avatar"
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            )}
          </div>
        ))}
      </div>

      {/* Typing message section */}
      <div className="w-full flex items-center gap-2">
        {/* Input with icons inside */}
        <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            type="button"
            className="p-1 text-gray-500 hover:text-[#d48806]"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1 text-gray-500 hover:text-[#d48806]"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Mic button */}
        <button className="bg-[#d48806] hover:bg-[#b97d05] p-3 rounded-xl text-white flex items-center justify-center">
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
