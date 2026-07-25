// "use client";

// import { useEffect } from "react";
// import { io, Socket } from "socket.io-client";

// let socket: Socket;

// export default function GameRoom() {
//   const roomId = "cmrip7g950004mcps5w6iih30";
//   const token =
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbmRsb3JkQGdtYWlsLmNvbSIsInN1YiI6ImNtbmU4bzRiNjAwMDNtMGFnNnVwOGg5azQiLCJpYXQiOjE3ODQ4ODY1NjgsImV4cCI6MTc4NDk3Mjk2OH0.ATmWCBQmUlSLgW_G3MAI1tU80Blq1QvNngWakJk_r9k";

//   useEffect(() => {
//     // ১. কানেকশন সেটআপ
//     socket = io("http://10.10.9.88:5006", {
//       path: "/socket.io",
//       extraHeaders: {
//         Authorization: token,
//       },
//     });

//     socket.on("connect", () => {
//       console.log("Connected to server");

//       // ২. 'message' ইভেন্টে ডেটা পাঠানো এবং Acknowledgement (Ack) নেওয়া
//       socket.emit("joinRoom", { room_id: roomId }, (response: any) => {
//         // পোস্টম্যানের Ack বক্স থেকে আসা রেসপন্স এখানে আসবে
//         console.log("Ack (joinRoom) response:", response);
//       });
//     });

//     // ৩. নির্দিষ্ট কোনো ইভেন্ট লিসেন করার জন্য
//     socket.on("message", (data) => {
//       console.log("New message received:", data);
//     });

//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, []);

//   return <div>Joining room via message event...</div>;
// }

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Paperclip, Image as ImageIcon, FileText, Send, X } from "lucide-react";
import {
  useCreateConversationsMutation,
  useGetAllMessagQuery,
} from "@/redux/features/landlord/message/messageApi";
import { useParams } from "next/navigation";
import { useSendMessageMutation } from "@/redux/features/message/MessageApi";
import { io, Socket } from "socket.io-client";
import { getAccessToken } from "@/lib/session";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";

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

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export default function ChatPage() {
  const [conversationsId, setConversationsId] = useState<string>();
  const { id } = useParams();

  // Socket state
  const [socket, setSocket] = useState<Socket | null>(null);

  // Real-time messages buffer (prepended before API fetch completes)
  const [realtimeMessages, setRealtimeMessages] = useState<MessageItem[]>([]);

  // Message text state
  const [messageText, setMessageText] = useState("");

  // File attachment state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(
    null,
  );

  // Hidden file input refs
  const documentInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Ref to scroll to bottom of messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = useAppSelector(selectUser);

  const [createConversations] = useCreateConversationsMutation();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Helper: check if the message was sent by the current logged-in user
  const isCurrentUserMessage = (msg: MessageItem): boolean => {
    return msg.sender.id === currentUser?.id;
  };

  useEffect(() => {
    if (id) {
      const createConv = async () => {
        try {
          const res = await createConversations({
            participantId: id,
          }).unwrap();
          setConversationsId(res?.data?.id);
        } catch (error) {
          console.error("Error creating :", error);
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

  // Merge realtime messages with API messages (deduplicate by id)
  const allMessages = useMemo(() => {
    const apiIds = new Set(messages.map((m) => m.id));
    const uniqueRealtime = realtimeMessages.filter((rm) => !apiIds.has(rm.id));
    return [...messages, ...uniqueRealtime];
  }, [messages, realtimeMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  // Derive the other participant (not the current user) from messages
  const otherParticipant = useMemo<SenderReceiver | null>(() => {
    if (!allMessages.length) return null;
    // Find the first message where the other person is the sender
    const otherMsg = allMessages.find((msg) => !isCurrentUserMessage(msg));
    if (otherMsg) return otherMsg.sender;
    // If all messages are mine, use receiver from first message
    return allMessages[0].receiver;
  }, [allMessages]);

  // ─── Socket.io connection ─────────────────────────────────────────────
  useEffect(() => {
    if (!conversationsId) return;

    let socketInstance: Socket | null = null;

    const initSocket = async () => {
      // Get token from httpOnly cookie via server action
      const token = await getAccessToken();

      socketInstance = io(SOCKET_URL, {
        // ✅ Force polling transport only — extraHeaders only work with polling
        transports: ["polling"],
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });

      socketInstance.on("connect", () => {
        // console.log("Socket connected:", socketInstance?.id);
        // console.log(socketInstance);
        // console.log(conversationsId);
        // Join the conversation room
        socketInstance?.emit("joinRoom", { room_id: conversationsId });
      });

      // socketInstance.on("message", (data) => {
      //   console.log("New message received:", data);
      // });

      // Listen for incoming messages on the "message" event
      socketInstance.on("message", (newMessage: any) => {
        // Extract the actual message object (handle nested data structure)
        const receivedMsg: MessageItem =
          newMessage?.data?.message || newMessage;
        setRealtimeMessages((prev) => {
          // Avoid duplicates
          if (prev.some((m) => m.id === receivedMsg.id)) return prev;
          return [...prev, receivedMsg];
        });
      });

      socketInstance.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      setSocket(socketInstance);
    };

    initSocket();

    return () => {
      if (socketInstance) {
        socketInstance.emit("joinRoom", { room_id: conversationsId });
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  }, [conversationsId]);

  // Handle document file selection
  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // If it's an image, create a preview
      if (file.type.startsWith("image/")) {
        setSelectedFilePreview(URL.createObjectURL(file));
      } else {
        setSelectedFilePreview(null);
      }
    }
    // Reset input value so the same file can be selected again
    e.target.value = "";
  };

  // Handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Always create preview for images
      setSelectedFilePreview(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (selectedFilePreview) {
      URL.revokeObjectURL(selectedFilePreview);
      setSelectedFilePreview(null);
    }
  };

  // Send message with text and/or attachment
  const handleSendMessage = async () => {
    if (!messageText.trim() && !selectedFile) return;
    if (!conversationsId) return;

    try {
      const formData = new FormData();

      // Append text if present
      if (messageText.trim()) {
        formData.append("message", messageText.trim());
      }

      // Append file if selected
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      await sendMessage({ conversationId: conversationsId, formData }).unwrap();

      // Emit the new message via socket for real-time delivery
      if (socket && socket.connected) {
        socket.emit("joinRoom", {
          room_id: conversationsId,
          text: messageText.trim(),
        });
      }

      // Clear input after successful send
      setMessageText("");
      handleRemoveFile();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative w-full h-[715px] bg-white p-6 rounded-xl shadow-md flex flex-col">
      {/* Header with user info */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
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
          {allMessages.length > 0 ? formatDate(allMessages[0].createdAt) : ""}
        </p>
      </div>

      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {allMessages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              isCurrentUserMessage(msg) ? "justify-end" : "justify-start"
            } items-start space-x-3`}
          >
            {/* Sender Avatar (other person) */}
            {!isCurrentUserMessage(msg) && (
              <Image
                src={
                  msg.sender?.avatar ||
                  "https://randomuser.me/api/portraits/men/2.jpg"
                }
                alt={msg.sender?.name || "Sender Avatar"}
                className="w-10 h-10 rounded-full object-cover shrink-0"
                width={40}
                height={40}
              />
            )}
            {/* Message Content */}
            <div
              className={`max-w-[70%] ${
                isCurrentUserMessage(msg)
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100"
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
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">{msg.attachment.name}</span>
                    </a>
                  )}
                </div>
              )}

              <span className="text-xs text-gray-500 block mt-2">
                {formatMessageTime(msg.createdAt)}
              </span>
            </div>
            {/* Sender Avatar (for current user) */}
            {isCurrentUserMessage(msg) && (
              <Image
                src={
                  msg.sender?.avatar ||
                  "https://randomuser.me/api/portraits/men/3.jpg"
                }
                alt="You Avatar"
                className="w-10 h-10 rounded-full object-cover shrink-0"
                width={40}
                height={40}
              />
            )}
          </div>
        ))}
        {/* Invisible element to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Selected file preview bar */}
      {selectedFile && (
        <div className="mb-2 flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
          {selectedFilePreview ? (
            <Image
              src={selectedFilePreview}
              alt="Preview"
              className="w-10 h-10 rounded object-cover"
              width={40}
              height={40}
            />
          ) : (
            <FileText className="w-5 h-5 text-gray-500" />
          )}
          <span className="text-sm text-gray-600 truncate flex-1">
            {selectedFile.name}
          </span>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Message input section */}
      <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
        {/* Hidden file inputs */}
        <input
          ref={documentInputRef}
          type="file"
          className="hidden"
          onChange={handleDocumentSelect}
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        {/* Input with icons inside */}
        <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-sm"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="p-1 text-gray-500 hover:text-[#d48806] transition-colors"
            onClick={() => documentInputRef.current?.click()}
            title="Attach document"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1 text-gray-500 hover:text-[#d48806] transition-colors"
            onClick={() => imageInputRef.current?.click()}
            title="Attach image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Send button */}
        <button
          type="button"
          className="bg-[#d48806] hover:bg-[#b97d05] p-3 rounded-xl text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={isSending || (!messageText.trim() && !selectedFile)}
        >
          {isSending ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
