"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Paperclip, Image as ImageIcon, Mic, FileText } from "lucide-react";
import {
  useCreateConversationsMutation,
  useGetAllMessagQuery,
} from "@/redux/features/landlord/message/messageApi";
import { useParams } from "next/navigation";

interface SenderReceiver {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  onlineStatus: string;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface MessageItem {
  id: string;
  conversationId: string;
  sender: SenderReceiver;
  receiver: SenderReceiver;
  text: string | null;
  attachment: Attachment | null;
  status: string;
  createdAt: string;
  isMine: boolean;
}

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

function formatMessageTime(createdAt: string): string {
  const created = new Date(createdAt);
  return created.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(createdAt: string): string {
  const created = new Date(createdAt);
  return created.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ChatPage() {
  const [conversationsId, setConversationsId] = useState<string>();
  const { id } = useParams();

  const [createConversations] = useCreateConversationsMutation();

  useEffect(() => {
    if (id) {
      const createConv = async () => {
        try {
          const res = await createConversations({
            participantId: id,
          }).unwrap();
          setConversationsId(res?.data?.id);
        } catch (error) {
          console.error("Error creating conversation:", error);
        }
      };
      createConv();
    }
  }, [id, createConversations]);

  const { data } = useGetAllMessagQuery(conversationsId, {
    skip: !conversationsId,
  });
  const messages: MessageItem[] = Array.isArray(data?.data)
    ? data?.data
    : data?.data?.messages || data?.data?.items || [];
  // Derive the other participant (not the current user) from messages
  const otherParticipant = useMemo<SenderReceiver | null>(() => {
    if (!messages.length) return null;
    // Find the first message where the other person is the sender
    const otherMsg = messages.find((msg) => !msg.isMine);
    if (otherMsg) return otherMsg.sender;
    // If all messages are mine, use receiver from first message
    return messages[0].receiver;
  }, [messages]);

  return (
    <div className="relative w-full h-[715px] bg-white p-6 rounded-xl shadow-md">
      {/* Header with user info */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={
              otherParticipant?.avatar ||
              "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt={otherParticipant?.name || "User Avatar"}
            className="w-12 h-12 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div>
            <p className="font-semibold text-lg">
              {otherParticipant?.name || "User"}
            </p>
            <p className="text-sm text-gray-500">
              {otherParticipant?.onlineStatus === "online"
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {messages.length > 0 ? formatDate(messages[0].createdAt) : ""}
        </p>
      </div>

      {/* Messages */}
      <div className="space-y-4 h-[550px] overflow-x-auto py-2">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.isMine ? "justify-end" : "justify-start"
            } items-start space-x-3`}
          >
            {/* Sender Avatar (other person) */}
            {!msg.isMine && (
              <Image
                src={
                  msg.sender?.avatar ||
                  "https://randomuser.me/api/portraits/men/2.jpg"
                }
                alt={msg.sender?.name || "Sender Avatar"}
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
            )}
            {/* Message Content */}
            <div
              className={`max-w-[70%] ${
                msg.isMine ? "bg-blue-100 text-right" : "bg-gray-100"
              } p-4 rounded-lg`}
            >
              {/* Text message */}
              {msg.text && <p className="text-sm">{msg.text}</p>}

              {/* Attachment display */}
              {msg.attachment && (
                <div className="mt-2">
                  {msg.attachment.type.startsWith("image/") ? (
                    <Image
                      src={msg.attachment.url}
                      alt={msg.attachment.name}
                      className="max-w-full rounded-lg"
                      width={200}
                      height={200}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <a
                      href={msg.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      {msg.attachment.name}
                    </a>
                  )}
                </div>
              )}

              <span className="text-xs text-gray-500 block mt-2">
                {formatMessageTime(msg.createdAt)}
              </span>
            </div>
            {/* Sender Avatar (for current user) */}
            {msg.isMine && (
              <Image
                src={
                  msg.sender?.avatar ||
                  "https://randomuser.me/api/portraits/men/3.jpg"
                }
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
