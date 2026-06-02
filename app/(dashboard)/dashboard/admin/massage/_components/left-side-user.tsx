"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  useCreateConversationMutation,
  useGetContactsQuery,
  useGetConversationsQuery,
} from "@/redux/features/message/MessageApi";
import type {
  Contact,
  Conversation,
} from "@/redux/features/message/MessageTypes";

const filters: Array<"All" | "Tenant" | "Vendor" | "Landlord" | "Investor"> = [
  "All",
  "Tenant",
  "Vendor",
  "Landlord",
  "Investor",
];

export default function LeftSideUser() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: contacts, isLoading: isLoadingContacts } = useGetContactsQuery();
  const { data: conversationsData, isLoading: isLoadingConversations } = useGetConversationsQuery();
  const [createConversation, { isLoading: isCreatingConversation }] =
    useCreateConversationMutation();
  const [creatingContactId, setCreatingContactId] = useState<string | null>(
    null
  );
  
  const contactList = contacts?.data?.items || [];
  const conversationItems = conversationsData?.data?.items || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  // Filter conversations based on search and role filter
  const filteredConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return conversationItems.filter((conversation: Conversation) => {
      const matchesSearch = 
        conversation.participant.name.toLowerCase().includes(query) ||
        (conversation.lastMessage?.text || "").toLowerCase().includes(query) ||
        conversation.participant.role.toLowerCase().includes(query);
      
      const matchesFilter = 
        activeFilter === "All" || conversation.participant.role === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchTerm, conversationItems]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  const handleOpenContact = async (contact: Contact) => {
    if (contact.conversationId) {
      router.push(`/dashboard/admin/massage/${contact.conversationId}`);
      return;
    }

    try {
      setCreatingContactId(contact.id);
      const response = await createConversation({
        participantId: contact.id,
      }).unwrap();

      router.push(`/dashboard/admin/massage/${response.data.id}`);
    } catch (error) {
      console.error("Failed to create conversation", error);
    } finally {
      setCreatingContactId(null);
    }
  };

  if (isLoadingContacts || isLoadingConversations) {
    return (
      <aside className="flex h-full min-h-[420px] flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm xl:min-h-0">
        <div className="flex h-full items-center justify-center">
          <p className="text-slate-500">Loading...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex h-full min-h-[420px] flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm xl:min-h-0">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">Inbox</p>
          <h2 className="text-xl font-semibold text-slate-950">
            Conversations
          </h2>
        </div>
        <span className="rounded-full bg-[#d48806]/10 px-3 py-1 text-xs font-semibold text-[#d48806]">
          {conversationItems.length} chats
        </span>
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search by name, role, or message..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-none"
        />
      </div>

      {/* Avatar contacts row */}
      <div className="scrollbar-custom -mx-1 mb-5 overflow-x-auto px-1 pb-1">
        <div className="flex gap-2">
          {contactList.map((contact) => {
            const href = contact.conversationId
              ? `/dashboard/admin/massage/${contact.conversationId}`
              : undefined;
            const isActive = href ? pathname === href : false;
            const isCreating = creatingContactId === contact.id;

            return (
              <button
                key={contact.id}
                type="button"
                onClick={() => handleOpenContact(contact)}
                disabled={isCreatingConversation && isCreating}
                aria-current={isActive ? "page" : undefined}
                className="relative shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Image
                  src={contact.avatar ?? "/image/fallback-user2.jpg"}
                  alt={contact.name}
                  className={cn(
                    "h-14 w-14 rounded-full object-cover ring-2 ring-offset-2 transition",
                    isActive
                      ? "ring-[#d48806] ring-offset-white"
                      : "ring-transparent hover:ring-slate-200"
                  )}
                  width={56}
                  height={56}
                />
                {contact.onlineStatus === "online" && (
                  <span className="absolute bottom-0 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter buttons */}
      <div className="scrollbar-custom mb-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition",
                isActive
                  ? "bg-[#d48806] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Recent Chat header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-950">Recent Chat</h3>
        <p className="text-xs text-slate-400">
          {filteredConversations.length} result
          {filteredConversations.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Conversation List */}
      <ConversationList 
        conversations={filteredConversations} 
        pathname={pathname}
        formatDate={formatDate}
      />
    </aside>
  );
}

// Conversation List Component
function ConversationList({ 
  conversations, 
  pathname,
  formatDate 
}: { 
  conversations: Conversation[]; 
  pathname: string;
  formatDate: (date: string) => string;
}) {
  if (conversations.length === 0) {
    return (
      <div className="flex h-full min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
        <MessageCircle className="mb-3 h-8 w-8 text-slate-300" />
        <p className="font-medium text-slate-700">No conversations found</p>
        <p className="mt-1 text-sm text-slate-400">
          Try another search term or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="scrollbar-custom min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
      {conversations.map((conversation) => {
        const href = `/dashboard/admin/massage/${conversation.id}`;
        const isActive = pathname === href;

        return (
          <Link
            href={href}
            key={conversation.id}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-3 transition",
              isActive
                ? "border-[#d48806]/30 bg-[#d48806]/10"
                : "border-transparent hover:bg-slate-50"
            )}
          >
            <div className="relative shrink-0">
              <Image
                src={conversation.participant.avatar ?? "/image/fallback-user2.jpg"}
                alt={conversation.participant.name}
                className="h-12 w-12 rounded-full object-cover"
                width={48}
                height={48}
              />
              {conversation.participant.onlineStatus === "online" && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {conversation.participant.name}
                </p>
                <span className="shrink-0 text-xs text-slate-400">
                  {conversation.lastMessage 
                    ? formatDate(conversation.lastMessage.createdAt)
                    : formatDate(conversation.updatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm text-slate-500">
                  {conversation.lastMessage?.text || "No messages yet"}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#d48806] px-1.5 text-[11px] font-semibold text-white">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              {conversation.lastMessage && (
                <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                  {conversation.lastMessage.senderId === conversation.participant.id 
                    ? conversation.participant.name 
                    : "You"}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}