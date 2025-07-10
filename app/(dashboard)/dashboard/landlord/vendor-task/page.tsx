"use client";

import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { useState } from "react";
import {
  DashboardDataTable,
  Column,
} from "@/components/common/DashboardDataTable";
import Image from "next/image";
// import DatePicker from "@/components/common/DatePicker";
import { TablePagination } from "@/components/common/TablePagination";
import { ClipboardList, UserCheck, UserPlus } from "lucide-react";
import StatsCards from "../user-manage/_components/card";


interface RequestData {
  id: string | number;
  name: string;
  nameRole: string;
  nameAvatar: string;
  requestId: string;
  assignTo: string;
  assignToRole: string;
  assignToAvatar: string;
  issue: string;
  issueType: string; // e.g., Emergency, Standard, Urgent
  propertyName: string;
  propertyImage: string;
  propertyAddress: string;
  reqDate: string;
  status: string;
}

const requestData: RequestData[] = [
  {
    id: 1,
    name: "Audry hawq",
    nameRole: "Tenant",
    nameAvatar: "/placeholder-avatar.png",
    requestId: "#M-00123",
    assignTo: "Audry hawq",
    assignToRole: "Vendor",
    assignToAvatar: "/placeholder-avatar.png",
    issue: "Leaking Kitchen",
    issueType: "Emergency",
    propertyName: "Murphy House",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "4140 Parker Rd.",
    reqDate: "Apr 10",
    status: "Completed",
  },
  {
    id: 2,
    name: "Audry hawq",
    nameRole: "Tenant",
    nameAvatar: "/placeholder-avatar.png",
    requestId: "#M-00123",
    assignTo: "Audry hawq",
    assignToRole: "Vendor",
    assignToAvatar: "/placeholder-avatar.png",
    issue: "AC Not Working",
    issueType: "Standard",
    propertyName: "Murphy House",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "4140 Parker Rd.",
    reqDate: "Apr 10",
    status: "On going",
  },
  {
    id: 3,
    name: "Audry hawq",
    nameRole: "Tenant",
    nameAvatar: "/placeholder-avatar.png",
    requestId: "#M-00123",
    assignTo: "Audry hawq",
    assignToRole: "Vendor",
    assignToAvatar: "/placeholder-avatar.png",
    issue: "AC Not Working",
    issueType: "Urgent",
    propertyName: "Murphy House",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "4140 Parker Rd.",
    reqDate: "Apr 10",
    status: "In Review",
  },
  {
    id: 4,
    name: "Audry hawq",
    nameRole: "Tenant",
    nameAvatar: "/placeholder-avatar.png",
    requestId: "#M-00123",
    assignTo: "Audry hawq",
    assignToRole: "Vendor",
    assignToAvatar: "/placeholder-avatar.png",
    issue: "AC Not Working",
    issueType: "Emergency",
    propertyName: "Murphy House",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "4140 Parker Rd.",
    reqDate: "Apr 10",
    status: "Completed",
  },
  {
    id: 5,
    name: "Audry hawq",
    nameRole: "Tenant",
    nameAvatar: "/placeholder-avatar.png",
    requestId: "#M-00123",
    assignTo: "Audry hawq",
    assignToRole: "Vendor",
    assignToAvatar: "/placeholder-avatar.png",
    issue: "Leaking Kitchen",
    issueType: "Emergency",
    propertyName: "Murphy House",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "4140 Parker Rd.",
    reqDate: "Apr 10",
    status: "In Review",
  },
  {
    id: 6,
    name: "Audry hawq",
    nameRole: "Tenant",
    nameAvatar: "/placeholder-avatar.png",
    requestId: "#M-00123",
    assignTo: "Audry hawq",
    assignToRole: "Vendor",
    assignToAvatar: "/placeholder-avatar.png",
    issue: "AC Not Working",
    issueType: "Standard",
    propertyName: "Murphy House",
    propertyImage: "/placeholder-avatar.png",
    propertyAddress: "4140 Parker Rd.",
    reqDate: "Apr 10",
    status: "In Review",
  },
];

const cardData = [
  {
    icon: ClipboardList,
    value: 52,
    label: "Total Tenant",
  },
  {
    icon: UserCheck,
    value: 32,
    label: "Active",
  },
  {
    icon: UserPlus,
    value: 20,
    label: "New",
  },
  {
    icon: UserCheck,
    value: 32,
    label: "Active",
  },
];

export default function VendorTask() {
  const [propertyStatus, setPropertyStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySearch, setPropertySearch] = useState("");
  // const [propertyDate, setPropertyDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(requestData.length / itemsPerPage);

  const requestColumns: Column<RequestData>[] = [
    {
      header: "Name",
      accessor: "name" as keyof RequestData,
      render: (value, row) => {
        const name = value as string;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.nameAvatar}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-xs text-gray-500">{row.nameRole}</div>
            </div>
          </div>
        );
      },
    },
    { header: "Request ID", accessor: "requestId" as keyof RequestData },
    {
      header: "Assign To",
      accessor: "assignTo" as keyof RequestData,
      render: (value, row) => {
        const assignTo = value as string;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.assignToAvatar}
              alt={assignTo}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">{assignTo}</div>
              <div className="text-xs text-gray-500">{row.assignToRole}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Issue",
      accessor: "issue" as keyof RequestData,
      render: (value, row) => {
        const issue = value as string;
        return (
          <div>
            <div>{issue}</div>
            <div
              className={
                row.issueType === "Emergency"
                  ? "text-xs text-red-500 font-semibold"
                  : row.issueType === "Urgent"
                  ? "text-xs text-orange-500 font-semibold"
                  : "text-xs text-blue-500 font-semibold"
              }
            >
              {row.issueType}
            </div>
          </div>
        );
      },
    },
    {
      header: "Property Info",
      accessor: "propertyName" as keyof RequestData,
      render: (value, row) => {
        const propertyName = value as string;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={row.propertyImage}
              alt={propertyName}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">{propertyName}</div>
              <div className="text-xs text-gray-500">{row.propertyAddress}</div>
            </div>
          </div>
        );
      },
    },
    { header: "Req Date", accessor: "reqDate" as keyof RequestData },
    {
      header: "Status",
      accessor: "status" as keyof RequestData,
      render: (value) => {
        const status = value as string;
        return (
          <span
            className={
              status === "Completed"
                ? "bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs"
                : status === "On going"
                ? "bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs"
                : "bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs"
            }
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessor: "requestId" as keyof RequestData,
      render: () => (
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path
              stroke="#222"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10 4.167c-5 0-7.5 5.833-7.5 5.833s2.5 5.833 7.5 5.833 7.5-5.833 7.5-5.833-2.5-5.833-7.5-5.833Zm0 7.5a1.667 1.667 0 1 1 0-3.334 1.667 1.667 0 0 1 0 3.334Z"
            />
          </svg>
        </button>
      ),
    },
  ];

  return (
    <div>
      <StatsCards cardData={cardData} />
      <div className="w-full overflow-hidden p-6 mt-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">Task List</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput
                value={propertySearch}
                onChange={setPropertySearch}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={propertyStatus}
                onChange={setPropertyStatus}
                options={["In Review", "Completed", "On going"]}
              />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={propertyType}
                onChange={setPropertyType}
                options={["Property", "Room"]}
              />
            </div>
          </div>
        </div>
        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={requestColumns} data={requestData} />
        </div>
        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={requestData.length}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
}
