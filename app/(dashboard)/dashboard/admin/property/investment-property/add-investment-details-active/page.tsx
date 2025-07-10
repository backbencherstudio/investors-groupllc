/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Plus, Upload } from "lucide-react";

export default function AddInvestmentDetailsActive() {
  const [faqs, setFaqs] = useState(["",]);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow p-6 mt-6 text-sm">
      <h2 className="text-xl font-semibold mb-4">Add Investment Details</h2>
      <p className="xl:w-[50%] mb-5">
        Send an invitation directly to the user's email. They'll receive a
        secure link to join the dashboard, create a password, and set up their
        profile.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Investment Amount</label>
          <Input placeholder="Enter" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Acquisition Cost</label>
          <Input placeholder="Enter" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Profit Share</label>
          <Input placeholder="Enter" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Lock In Period</label>
          <Input placeholder="Enter" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Documents</label>
        <label
          htmlFor="file-upload"
          className="w-full lg:w-[350px] border-2 border-dashed border-gray-300 rounded-lg bg-white text-center py-8 cursor-pointer flex flex-col items-center justify-center"
        >
          <Upload className="w-6 h-6 mb-2 text-gray-700" />
          <span className="font-medium text-gray-800">Upload Image</span>
          <span className="text-xs text-gray-500 mt-1">
            Format: JPG, PNG, PDF (10 mb max/size)
          </span>
          <input id="file-upload" type="file" className="hidden" />
        </label>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input type="checkbox" id="lien" className="accent-[#d48806] w-4 h-4" />
        <label htmlFor="lien" className="text-sm font-medium">
          Investor&apos;s First Lien Holder
        </label>
      </div>
      <div>
        <label className="block font-medium mb-3">Timeline & Publish</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <Input type="date" defaultValue="2025-07-15" />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Est. Completion Date
            </label>
            <Input type="date" defaultValue="2026-03-01" />
          </div>
        </div>
      </div>
      <h3 className="text-base font-semibold mt-6 mb-2">Investment Strategy</h3>
      <p className="text-xs text-gray-500 mb-4">
        Explore our investment strategies designed to enhance returns and reduce
        risks. Our experts analyze market trends to help you create a portfolio
        that aligns with your financial goals. Whether you're a pro or a
        beginner.
      </p>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Held/Retained Notice</label>
        <Input placeholder="Enter" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Profit Structure</label>
        <Textarea placeholder={"Enter"} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Smart Investment Opportunities
        </label>
        <Textarea placeholder={"Enter"} />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Investor Insights</label>
        <Input placeholder="Enter" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Flexible Leasing Options
        </label>
        <Textarea placeholder={"Enter"} />
      </div>
      <h3 className="text-base font-semibold mt-6 mb-2">Add FAQ</h3>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Smart Investment Opportunities
        </label>
        <Textarea placeholder={"Enter"} />
      </div>
      {faqs.map((faq, idx) => (
        <div className="mb-4" key={idx}>
          <span className="min-w-[28px] font-semibold">
            {idx + 1} Enter your FAQ
          </span>
          <Input
            className="mt-3"
            placeholder="Enter your FAQ"
            value={faq}
            onChange={(e) => {
              const newFaqs = [...faqs];
              newFaqs[idx] = e.target.value;
              setFaqs(newFaqs);
            }}
          />
        </div>
      ))}
      <div className="mt-4">
        <Button
          type="button"
          size="sm"
          className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] w-[75px] px-2 h-8 cursor-pointer"
          onClick={() => setFaqs([...faqs, ""])}
        >
          Add <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Button side */}
      <div className="w-full mt-8">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full relative">
          <div
            className="h-1 bg-[#d48806] rounded-full transition-all"
            style={{ width: `full` }}
          />
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            className="bg-white border border-gray-300 rounded px-6 py-2 font-medium cursor-pointer"
            onClick={handleBack}
          >
            Back
          </button>
          {/* Publish Button */}
          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              className="bg-[#d48806] text-white rounded px-8 py-2 font-medium text-base"
            >
              Publish <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
