"use client";
import React from "react";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceDetails } from "./maintenance-details";

const tenants = [
  {
    id: "#M-00123",
    assignee: {
      name: "Audry hawq",
      role: "Vendor",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    issue: { title: "Leaking Kitchen", type: "Emergency" },
    date: "Apr 10",
    status: "Pending",
    property: {
      image:
        "https://images.unsplash.com/photo-1570129477488-c1e19488e3c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Murphy House",
      address: "4140 Parker Rd. Allentown, New Mexi",
      priority: "Emergency",
    },
    contact: { phone: "+1555-123-7890", email: "johan@email.com" },
    taskDetails: {
      tenantName: "Jonathan Davis",
      issue: "Leaking Kitchen Faucet",
      position: "Kitchen",
      category: "Plumbing",
      preferredDateTime: "Apr 10, 2025 10:20 - 11:00 AM",
      requestId: "#M-00123",
      status: "Pending",
      requestDate: "Apr 10, 2025",
      description:
        "Spacious apartment with hardwood floors, modern kitchen, walk in closets, and a private balcony with city views",
      media: [
        "https://images.unsplash.com/photo-1582268750849-6f1c4a0e9b0b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1598282367500-1c3f6f1c7d2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  },
  {
    id: "#M-00124",
    assignee: {
      name: "Audry hawq",
      role: "Vendor",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    issue: { title: "AC Not Working", type: "Standard" },
    date: "Apr 10",
    status: "On going",
    property: {
      image:
        "https://images.unsplash.com/photo-1570129477488-c1e19488e3c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sunny Apartment",
      address: "123 Main St. Anytown, USA",
      priority: "Standard",
    },
    contact: { phone: "+1555-987-6543", email: "jane@email.com" },
    taskDetails: {
      tenantName: "Jane Doe",
      issue: "AC Not Blowing Cold Air",
      position: "Living Room",
      category: "HVAC",
      preferredDateTime: "Apr 11, 2025 09:00 - 10:00 AM",
      requestId: "#M-00124",
      status: "On going",
      requestDate: "Apr 09, 2025",
      description:
        "Air conditioning unit is making a strange noise and not cooling the apartment effectively.",
      media: [
        "https://images.unsplash.com/photo-1587582423111-ec072bda51b0?auto=format&fit=crop&w=200&q=80",
      ],
    },
  },
  {
    id: "#M-00125",
    assignee: {
      name: "Audry hawq",
      role: "Vendor",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    issue: { title: "AC Not Working", type: "Standard" },
    date: "Apr 10",
    status: "On going",
    property: {
      image:
        "https://images.unsplash.com/photo-1570129477488-c1e19488e3c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Cozy Cottage",
      address: "456 Oak Ave. Smallville, CA",
      priority: "Low",
    },
    contact: { phone: "+1555-555-1212", email: "john@email.com" },
    taskDetails: {
      tenantName: "John Smith",
      issue: "Broken Window Pane",
      position: "Bedroom",
      category: "General Repair",
      preferredDateTime: "Apr 12, 2025 02:00 - 03:00 PM",
      requestId: "#M-00125",
      status: "On going",
      requestDate: "Apr 08, 2025",
      description:
        "Small crack in the bedroom window pane, needs to be replaced.",
      media: [],
    },
  },
  {
    id: "#M-00126",
    assignee: {
      name: "Audry hawq",
      role: "Vendor",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    issue: { title: "AC Not Working", type: "Emergency" },
    date: "Apr 10",
    status: "Completed",
    property: {
      image:
        "https://images.unsplash.com/photo-1570129477488-c1e19488e3c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Grand Residence",
      address: "789 Pine Ln. Metropolis, NY",
      priority: "Emergency",
    },
    contact: { phone: "+1555-777-8888", email: "emily@email.com" },
    taskDetails: {
      tenantName: "Emily White",
      issue: "Burst Pipe in Bathroom",
      position: "Bathroom",
      category: "Plumbing",
      preferredDateTime: "Apr 09, 2025 11:00 - 12:00 PM",
      requestId: "#M-00126",
      status: "Completed",
      requestDate: "Apr 09, 2025",
      description: "Major water leak from a burst pipe under the sink.",
      media: [
        "https://images.unsplash.com/photo-1587582423111-ec072bda51b0?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1598282367500-1c3f6f1c7d2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  },
  {
    id: "#M-00127",
    assignee: {
      name: "Audry hawq",
      role: "Vendor",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    issue: { title: "Leaking Kitchen", type: "Emergency" },
    date: "Apr 10",
    status: "In Review",
    property: {
      image:
        "https://images.unsplash.com/photo-1570129477488-c1e19488e3c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Riverside Apt",
      address: "321 River Rd. Lakeside, FL",
      priority: "Emergency",
    },
    contact: { phone: "+1555-111-2222", email: "chris@email.com" },
    taskDetails: {
      tenantName: "Chris Green",
      issue: "Leaking Faucet",
      position: "Bathroom",
      category: "Plumbing",
      preferredDateTime: "Apr 13, 2025 01:00 - 02:00 PM",
      requestId: "#M-00127",
      status: "In Review",
      requestDate: "Apr 10, 2025",
      description:
        "Faucet in the guest bathroom is dripping constantly and needs repair.",
      media: [
        "https://images.unsplash.com/photo-1587582423111-ec072bda51b0?auto=format&fit=crop&w=200&q=80",
      ],
    },
  },
];

export function MaintenanceList() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">Maintenance List</h2>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 w-[200px] lg:w-[300px] bg-zinc-100 rounded-md"
            />
          </div>
          <div className="relative">
            <Select>
              <SelectTrigger className="w-[100px] md:w-[120px]">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Select>
              <SelectTrigger className="w-[100px] md:w-[120px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-100 mt-4">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3 font-medium">Request ID</th>
              <th className="px-4 py-3 font-medium">Assign To</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Req Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-gray-800">{row.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={row.assignee.avatar}
                      alt={row.assignee.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {row.assignee.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {row.assignee.role}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="text-gray-900 font-medium">
                    {row.issue.title}
                  </div>
                  <div
                    className={`text-xs ${
                      row.issue.type === "Emergency"
                        ? "text-red-500"
                        : "text-blue-600"
                    }`}
                  >
                    {row.issue.type}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{row.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status === "Pending"
                        ? "bg-gray-100 text-gray-500"
                        : row.status === "On going"
                        ? "bg-orange-100 text-orange-600"
                        : row.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : row.status === "In Review"
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <MaintenanceDetails
                    property={row.property}
                    contact={row.contact}
                    taskDetails={row.taskDetails}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
