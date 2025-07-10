import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import AddButton from "@/components/common/AddButton";

export default function ManageContact() {
  const [customerService, setCustomerService] = useState("");
  const [email, setEmail] = useState("");
  const [community, setCommunity] = useState("");
  const [website, setWebsite] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  
  const { register, handleSubmit } = useForm();

  // Add new title
  const handleAddTitle = () => {
    if (titleInput.trim()) {
      setTitles([...titles, titleInput.trim()]);
      setTitleInput("");
      setShowTitleInput(false);
    }
  };

  // Form submission handler
  const onSubmit = (data: unknown) => {
    const formData = data as Record<string, string>;
    // Map dynamic title fields to their actual names
    const extraInfo: Record<string, string> = {};
    titles.forEach((title, idx) => {
      extraInfo[title] = formData[`title_${idx}`] || "";
    });

    const allData = {
      customerService,
      email,
      community,
      website,
      ...extraInfo,
    };
    console.log("All Form Data:", allData);
  };

  return (
    <section className="bg-white p-8">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <hr className="h-[1px] bg-[#d6d6d6] mb-6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <Label htmlFor="customer-service">Customer Service</Label>
          <Input
            id="customer-service"
            name="customer-service"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="Johan Alex notify"
            value={customerService}
            onChange={(e) => setCustomerService(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="johan@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="community">Community</Label>
          <Input
            id="community"
            name="community"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="Community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="www.johana.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          {titles.map((title, idx) => (
            <div key={idx} className="mt-2">
              <span className="w-full">{title}</span>
              <Input
                className="flex-1 mt-2"
                placeholder={`Enter ${title}`}
                {...register(`title_${idx}`)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col md:flex-row  justify-between md:items-center gap-2">
          <p className="text-sm font-semibold">Extra info.</p>
          <div>
            {!showTitleInput ? (
              <AddButton type="button" onClick={() => setShowTitleInput(true)}>
                Add New Info
              </AddButton>
            ) : (
              <div className="flex flex-wrap gap-2 items-center">
                <Input
                  placeholder="Enter title"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-40 md:w-60 h-8 px-6 py-4 text-sm flex-1 border-gray-200"
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
