"use client";

import { Input } from "@/components/ui/input";
import { useGetAllConversationsQuery } from "@/redux/features/landlord/message/messageApi";
import Image from "next/image";
import Link from "next/link";

// Helper function to format time to relative time
function formatTime(createdAt: string): string {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "Now";
  if (diffMinutes < 60) return `${diffMinutes} min`;
  if (diffHours < 24) return `${diffHours}hr`;
  if (diffDays < 7) return `${diffDays}d`;
  return created.toLocaleDateString();
}

interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  onlineStatus: string;
}

interface LastMessage {
  id: string;
  text: string | null;
  attachmentType: string | null;
  createdAt: string;
  senderId: string;
}

interface ChatItem {
  id: string;
  participant: Participant;
  lastMessage: LastMessage;
  unreadCount: number;
  updatedAt: string;
  createdAt: string;
}

export default function LeftSideUser() {
  const { data } = useGetAllConversationsQuery({});
  const items: ChatItem[] = data?.data?.items || [];

  return (
    <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto h-[715px]">
      {/* Search bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search here..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3">
        <h1 className="font-medium">Recent Chat</h1>

        {/* Recent Chat List */}
        <div className="space-y-4">
          {items?.map((chat) => (
            <Link
              href={`/dashboard/landlord/massage/${chat.participant.id}`}
              key={chat?.id}
              className="flex items-center space-x-4 border-b border-gray-200 pb-4"
            >
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={
                    chat.participant?.avatar ||
                    `https://randomuser.me/api/portraits/men/1.jpg`
                  }
                  alt={chat.participant?.name || "User"}
                  className="w-12 h-12 rounded-full object-cover"
                  width={50}
                  height={50}
                />
                {chat.participant?.onlineStatus === "online" && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              {/* Chat Content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm">
                    {chat.participant?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(chat.updatedAt)}
                  </span>
                </div>
                {/* <div className="text-sm text-gray-700 mt-1">
                  {chat.lastMessage?.text ||
                    (chat.lastMessage?.attachmentType ? "📎 Attachment" : "")}
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
