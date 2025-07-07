import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const USER_TYPES = [
  { value: "tenant", label: "Tenant" },
  { value: "landlord", label: "Landlord" },
  { value: "vendor", label: "Vendor" },
  { value: "admin", label: "Admin" },
];

const NOTIFICATION_TYPES = [
  { id: "rent-payment", label: "Rent Payment" },
  { id: "property-update", label: "Property Update" },
  { id: "auto-pay-reminder", label: "Auto Pay Reminder" },
  { id: "maintenance-req", label: "Maintenance Requirement" },
];

const SEND_METHODS = [
  { id: "in-app", label: "In App Notification" },
  { id: "email", label: "Email" },
];

export default function ManageNotification() {
  const [userType, setUserType] = useState("");
  const [notificationTypes, setNotificationTypes] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendMethods, setSendMethods] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCheckboxChange = (
    id: string,
    checked: boolean,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validation
    if (!userType) {
      setError("Please select a user type.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a notification title.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }
    if (sendMethods.length === 0) {
      setError("Please select at least one send method.");
      return;
    }
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess("Notification sent successfully!");
      // Reset form
      setUserType("");
      setNotificationTypes([]);
      setTitle("");
      setMessage("");
      setSendMethods([]);
    }, 1200);
    // Here you would send the data to your backend
    console.log({
      userType,
      notificationTypes,
      title,
      message,
      sendMethods,
    });
  };

  return (
    <section className="bg-white p-8">
      <h2 className="text-2xl font-semibold mb-4">Manage Notification</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-6 flex flex-wrap gap-4">
          {NOTIFICATION_TYPES.map((nt) => (
            <div className="flex items-center gap-3" key={nt.id}>
              <Checkbox
                id={nt.id}
                checked={notificationTypes.includes(nt.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(nt.id, !!checked, setNotificationTypes)
                }
              />
              <Label htmlFor={nt.id}>{nt.label}</Label>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Label htmlFor="notification-title">Notification Title</Label>
          <Input
            id="notification-title"
            name="notification-title"
            className="px-6 py-4 border border-[#c2c2c2] rounded-[8px] mt-4"
            placeholder="Johan Alex notify"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </div>
        <div className="mb-6">
          <Label htmlFor="message">Message</Label>
          <Textarea
            rows={12}
            className="mt-4 px-6 py-4 min-h-[140px]"
            placeholder="Type your message here..."
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mb-6 flex gap-4">
          {SEND_METHODS.map((sm) => (
            <div className="flex items-center gap-3" key={sm.id}>
              <Checkbox
                id={sm.id}
                checked={sendMethods.includes(sm.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(sm.id, !!checked, setSendMethods)
                }
              />
              <Label htmlFor={sm.id}>{sm.label}</Label>
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <div className="flex gap-4">
          <Button variant="accept" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Notification"}
          </Button>
          <Button
            className="text-gray-700"
            variant="reject"
            type="button"
            onClick={() => {
              setUserType("");
              setNotificationTypes([]);
              setTitle("");
              setMessage("");
              setSendMethods([]);
              setError("");
              setSuccess("");
            }}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
