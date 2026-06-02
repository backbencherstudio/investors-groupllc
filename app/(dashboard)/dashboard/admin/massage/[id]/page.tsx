"use client";

import { cn } from "@/lib/utils";
import {
  Download,
  FileText,
  Image as ImageIcon,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  SendHorizontal,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/features/message/MessageApi";

const formatMessageTime = (dateString: string) =>
  new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));

const getApiErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string; error?: string } })
      .data;
    return data?.message ?? data?.error ?? "Failed to send message";
  }

  return "Failed to send message";
};

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const conversationId = params.id;
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const {
    data: conversationsData,
    isLoading: isLoadingConversations,
    isFetching: isFetchingConversations,
  } = useGetConversationsQuery();
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    isFetching: isFetchingMessages,
  } = useGetMessagesQuery(conversationId);
  const [sendMessage, { isLoading: isSendingMessage }] =
    useSendMessageMutation();

  const conversation = conversationsData?.data.items.find(
    (item) => item.id === conversationId
  );
  const threadMessages = messagesData?.data.items ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threadMessages.length]);

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage && !selectedFile) return;

    try {
      setSendError(null);
      const formData = new FormData();
      formData.append("message", trimmedMessage);
      if (selectedFile) formData.append("attachment", selectedFile);

      await sendMessage({
        conversationId,
        formData,
      }).unwrap();
      setNewMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (error) {
      setSendError(getApiErrorMessage(error));
      console.error("Failed to send message", error);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const isLoading =
    isLoadingConversations ||
    isLoadingMessages ||
    (!conversation && isFetchingConversations);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[520px] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white px-6 text-center shadow-sm xl:min-h-0">
        <p className="text-sm font-medium text-slate-500">
          Loading conversation...
        </p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex h-full min-h-[520px] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white px-6 text-center shadow-sm xl:min-h-0">
        <h2 className="mb-2 text-xl font-semibold text-slate-950">
          Conversation not found
        </h2>
        <p className="max-w-sm text-sm leading-6 text-slate-500">
          The selected chat does not exist in the current conversation list.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm xl:min-h-0">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <Image
              src={conversation.participant.avatar ?? "/image/fallback-user2.jpg"}
              alt={conversation.participant.name}
              className="h-12 w-12 rounded-full object-cover"
              width={48}
              height={48}
            />
            {conversation.participant.onlineStatus === "online" && (
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="truncate text-lg font-semibold text-slate-950">
                {conversation.participant.name}
              </p>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                {conversation.participant.role}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {conversation.participant.onlineStatus === "online"
                ? "Online now"
                : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 sm:flex"
            aria-label="Start voice call"
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 sm:flex"
            aria-label="Start video call"
          >
            <Video className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Open conversation menu"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="scrollbar-custom min-h-0 flex-1 overflow-y-auto bg-slate-50/70 px-5 py-6 [scrollbar-gutter:stable]">
        <div className="mx-auto mb-6 w-fit rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-400 shadow-sm">
          Today
        </div>

        <div className="space-y-5">
          {isFetchingMessages && threadMessages.length === 0 ? (
            <p className="text-center text-sm text-slate-400">
              Loading messages...
            </p>
          ) : null}

          {threadMessages.length === 0 && !isFetchingMessages ? (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">
              <MessageCircle className="mb-3 h-8 w-8 text-slate-300" />
              <p className="font-medium text-slate-700">No messages yet</p>
              <p className="mt-1 text-sm text-slate-400">
                Send the first message to start this conversation.
              </p>
            </div>
          ) : null}

          {threadMessages.map((message) => {
            const isMine = message.isMine;
            const attachmentIsImage =
              message.attachment?.type.startsWith("image/");

            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-3",
                  isMine ? "justify-end" : "justify-start"
                )}
              >
                {!isMine && (
                  <Image
                    src={
                      message.sender.avatar ??
                      "/image/fallback-user2.jpg"
                    }
                    alt={message.sender.name}
                    className="h-9 w-9 rounded-full object-cover"
                    width={36}
                    height={36}
                  />
                )}

                <div
                  className={cn(
                    "max-w-[82%] rounded-3xl px-4 py-3 shadow-sm sm:max-w-[68%]",
                    isMine
                      ? "rounded-br-md bg-[#d48806] text-white"
                      : "rounded-bl-md bg-white text-slate-700"
                  )}
                >
                  {message.text && (
                    <p className="text-sm leading-6">{message.text}</p>
                  )}
                  {message.attachment && (
                    <a
                      href={message.attachment.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "mt-3 block overflow-hidden rounded-2xl border",
                        isMine ? "border-white/20" : "border-slate-100"
                      )}
                    >
                      {attachmentIsImage ? (
                        <Image
                          src={message.attachment.url}
                          alt={message.attachment.name}
                          className="max-h-64 w-full object-cover"
                          width={360}
                          height={240}
                        />
                      ) : (
                        <span
                          className={cn(
                            "flex items-center gap-3 p-3 text-sm",
                            isMine ? "bg-white/10" : "bg-slate-50"
                          )}
                        >
                          <FileText className="h-5 w-5 shrink-0" />
                          <span className="min-w-0 flex-1 truncate">
                            {message.attachment.name}
                          </span>
                          <Download className="h-4 w-4 shrink-0" />
                        </span>
                      )}
                    </a>
                  )}
                  <div
                    className={cn(
                      "mt-2 flex items-center gap-2 text-[11px]",
                      isMine ? "justify-end text-white/75" : "text-slate-400"
                    )}
                  >
                    <span>{formatMessageTime(message.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="border-t border-slate-100 bg-white p-4"
      >
        {sendError && (
          <p className="mb-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {sendError}
          </p>
        )}

        {selectedFile && (
          <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d48806]/10 text-[#d48806]">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-700">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearSelectedFile}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-white hover:text-red-500"
              aria-label="Remove selected file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="flex items-end gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-2">
          <div className="flex gap-1 pb-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-[#d48806]"
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-[#d48806]"
              aria-label="Attach image"
            >
              <ImageIcon className="h-5 w-5" />
            </button>
          </div>

          <textarea
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            rows={1}
            placeholder="Type your message..."
            className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={(!newMessage.trim() && !selectedFile) || isSendingMessage}
            className="flex h-11 shrink-0 items-center gap-2 rounded-2xl bg-[#d48806] px-4 text-sm font-semibold text-white transition hover:bg-[#b97d05] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="hidden sm:inline">
              {isSendingMessage ? "Sending..." : "Send"}
            </span>
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
