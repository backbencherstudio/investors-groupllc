import React from "react";
import { MessageCircle, Search, SendHorizontal } from "lucide-react";

export default function Massage() {
  return (
    <div className="flex h-full min-h-[520px] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white px-6 text-center shadow-sm">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#d48806]/10">
        <MessageCircle className="h-10 w-10 text-[#d48806]" />
      </div>

      <h2 className="mb-2 text-xl font-semibold text-slate-950">
        Select a conversation
      </h2>
      <p className="max-w-sm text-sm leading-6 text-slate-500">
        Choose a recent chat from the left side to view message history, send a
        reply, and manage the conversation.
      </p>

      <div className="mt-8 grid w-full max-w-md gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <Search className="mx-auto mb-2 h-5 w-5 text-slate-500" />
          <p className="text-xs font-medium text-slate-600">Find contact</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <MessageCircle className="mx-auto mb-2 h-5 w-5 text-slate-500" />
          <p className="text-xs font-medium text-slate-600">Open thread</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <SendHorizontal className="mx-auto mb-2 h-5 w-5 text-slate-500" />
          <p className="text-xs font-medium text-slate-600">Send message</p>
        </div>
      </div>
    </div>
  );
}
