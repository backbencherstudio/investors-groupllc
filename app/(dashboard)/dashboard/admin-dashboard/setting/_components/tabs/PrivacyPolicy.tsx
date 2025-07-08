import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AddButton from "@/components/common/AddButton";

export default function PrivacyPolicy() {
  const [dataSecurity, setDataSecurity] = useState("");
  const [shareInfo, setShareInfo] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [titleValues, setTitleValues] = useState<Record<string, string>>({});

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Add new title
  const handleAddTitle = () => {
    if (titleInput.trim()) {
      setTitles([...titles, titleInput.trim()]);
      setTitleInput("");
      setShowTitleInput(false);
    }
  };

  // Handle dynamic title value changes
  const handleTitleValueChange = (title: string, value: string) => {
    setTitleValues(prev => ({
      ...prev,
      [title]: value
    }));
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allData = {
      dataSecurity,
      shareInfo,
      ...titleValues,
    };
    console.log("Privacy Policy Form Data:", allData);
  };

  return (
    <section className="bg-white p-8 rounded-[12px] mt-4">
      <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
      <hr className="h-[1px] bg-[#d6d6d6] mb-6" />
      <form onSubmit={handleFormSubmit}>
        <div className="mb-6">
          <Label htmlFor="data-security">Data Security</Label>
          <Textarea
            id="data-security"
            name="data-security"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="We use industry-standard encryption and secure servers to protect your data. Only authorized users have access to your information."
            value={dataSecurity}
            onChange={(e) => setDataSecurity(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="share-info">Share of Information</Label>
          <Textarea
            id="share-info"
            name="share-info"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="We use industry-standard encryption and secure servers to protect your data. Only authorized users have access to your information."
            value={shareInfo}
            onChange={(e) => setShareInfo(e.target.value)}
          />
        </div>

        <div>
          {titles.map((title, idx) => (
            <div key={idx} className="mt-2">
              <span className="w-full">{title}</span>
              <Textarea
                className="flex-1 mt-2"
                placeholder={`Enter ${title}`}
                value={titleValues[title] || ""}
                onChange={(e) => handleTitleValueChange(title, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm font-medium">Extra info.</p>
          <div>
            {!showTitleInput ? (
              <AddButton type="button" onClick={() => setShowTitleInput(true)}>
                Add New Info
              </AddButton>
            ) : (
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Title"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-40 md:w-60 h-8 px-2 text-xs border-gray-200"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTitle();
                    }
                  }}
                />
                <AddButton type="button" onClick={handleAddTitle}>
                  Add New Info
                </AddButton>
              </div>
            )}
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <div className="flex gap-4 mt-6 md:mt-10">
          <Button variant="accept" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save"}
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
    </section>
  );
}
