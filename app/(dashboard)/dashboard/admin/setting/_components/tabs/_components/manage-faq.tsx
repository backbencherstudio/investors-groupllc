import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddButton from "@/components/common/AddButton";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const USER_TYPES = [
  { value: "tenant", label: "Tenant" },
  { value: "landlord", label: "Landlord" },
  { value: "vendor", label: "Vendor" },
  { value: "admin", label: "Admin" },
];

type FaqEntry = { question: string; answer: string };

export default function FaqManagement() {
  const [userType, setUserType] = useState("");
  // Always have at least one FAQ input
  const [faqs, setFaqs] = useState<FaqEntry[]>([{ question: "", answer: "" }]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  //   const [showFaqs, setShowFaqs] = useState(false);

  // Handlers for FAQ list
  const handleAddFaq = () =>
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const handleFaqChange = (
    index: number,
    field: keyof FaqEntry,
    value: string
  ) => {
    setFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };
  const handleRemoveFaq = (index: number) => {
    // Don't allow removing the last FAQ
    if (faqs.length === 1) return;
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("Saved successfully!");
      //   setShowFaqs(true);
    }, 1000);
    // Log all FAQ data
    console.log({ userType, faqs });
  };

  return (
    <section className="bg-white p-8 rounded-xl mt-4">
      <h2 className="text-2xl font-semibold mb-4">FAQ Management</h2>
      <hr className="h-[1px] bg-[#d6d6d6] mb-6" />
      <form onSubmit={handleSubmit}>
        {/* User Type Selection */}
        <div className="mb-6 space-y-4">
          <p className="text-[#170A00] font-medium">Select User Type</p>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger className="w-full px-6 py-4">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {USER_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* FAQ List Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Label className="font-medium">FAQs</Label>
            <AddButton type="button" onClick={handleAddFaq}>
              Add New FAQ
            </AddButton>
          </div>
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-4  relative">
              <div className="flex-1">
                <Label htmlFor={`faq-question-${idx}`}>
                  Question: {faqs.length > 1 && idx + 1}
                </Label>
                <Input
                  id={`faq-question-${idx}`}
                  className="mt-2 mb-2 px-4 py-2"
                  placeholder="FAQ Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(idx, "question", e.target.value)
                  }
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`faq-answer-${idx}`}>Answer</Label>
                <Textarea
                  id={`faq-answer-${idx}`}
                  className="mt-2 mb-2 px-4 py-2"
                  placeholder="FAQ Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(idx, "answer", e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                className={` absolute right-0 top-0 text-red-500 hover:text-red-600 p-0.5 font-semibold bg-red-50 hover:bg-red-100 rounded cursor-pointer transition-colors ${
                  faqs.length === 1 && "hidden"
                }`}
                onClick={() => handleRemoveFaq(idx)}
                disabled={faqs.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <div className="flex gap-4 ">
          <Button variant="accept" type="submit" disabled={submitting}>
            {submitting ? "Saving.." : "Save"}
          </Button>
          <Button
            className="text-gray-700"
            variant="reject"
            type="button"
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Show all FAQs after submit */}
      {/* {showFaqs && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">All FAQs</h3>
          <ul className="space-y-4">
            {faqs.map((faq, idx) => (
              <li key={idx} className="border rounded p-4">
                <div className="font-semibold mb-2">Q: {faq.question}</div>
                <div className="text-gray-700">A: {faq.answer}</div>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </section>
  );
}
