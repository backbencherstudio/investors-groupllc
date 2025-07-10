import { DashboardDataTable } from "@/components/common/DashboardDataTable";

import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";
import Diamond from "@/components/icons/subscription/Diamond";
import Monthly from "@/components/icons/subscription/Monthly";
import People from "@/components/icons/subscription/People";
import Revinew from "@/components/icons/subscription/Revinew";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import StatsCards from "../../../_components/common/card";


type SubscriptionData = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  paidDate: string;
  planType: string;
  amount: string;
  methods: string;
  status: string;
};

const subscriptionData: SubscriptionData[] = [
  {
    id: "1",
    name: "Jenny Wilson",
    role: "Landlord",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    paidDate: "Apr 28, 2025",
    planType: "Trail",
    amount: "Free",
    methods: "-",
    status: "Trial",
  },
  {
    id: "2",
    name: "Kristin Watson",
    role: "Landlord",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    paidDate: "May 28, 2025",
    planType: "Premium",
    amount: "$29",
    methods: "Credit Card",
    status: "Paid",
  },
  {
    id: "3",
    name: "Courtney Henry",
    role: "Landlord",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    paidDate: "Jun 28, 2025",
    planType: "Basic",
    amount: "Free",
    methods: "-",
    status: "Free Plan",
  },
];

const cardData = [
  {
    icon: People,
    value: 320,
    label: "Total Subscribers",
  },
  {
    icon: Monthly,
    value: 210,
    label: "Monthly Plan",
  },
  {
    icon: Diamond,
    value: 110,
    label: "Yearly Plan",
  },
  {
    icon: Revinew,
    value: "$14,800",
    label: "Revenew",
  },
];

export default function SubscriptionPlan() {
  return (
    <div className="">
      {/* Card stats */}
      <section className="my-6">
        <StatsCards cardData={cardData} />
      </section>
      {/* Table */}
      <div className="">
        <SubscriptionTable />
      </div>
    </div>
  );
}

function SubscriptionTable() {
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(subscriptionData.length / itemsPerPage);

  // Table columns
  const columns = [
    {
      header: "Name",
      accessor: "name",
      render: (value: string, row: SubscriptionData) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar}
            alt={row.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold">{row.name}</div>
            <div className="text-xs text-gray-500">{row.role}</div>
          </div>
        </div>
      ),
    },
    { header: "Paid Date", accessor: "paidDate" },
    {
      header: "Plan Type",
      accessor: "planType",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold
            ${
              value === "Premium"
                ? "bg-blue-100 text-blue-600"
                : value === "Basic"
                ? "bg-orange-100 text-orange-600"
                : "bg-blue-50 text-blue-400"
            }
          `}
        >
          {value}
        </span>
      ),
    },
    { header: "Amount", accessor: "amount" },
    { header: "Methods", accessor: "methods" },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold
            ${
              value === "Paid"
                ? "bg-green-100 text-green-600"
                : value === "Free Plan"
                ? "bg-blue-50 text-blue-400"
                : value === "Trial"
                ? "bg-green-50 text-green-400"
                : ""
            }
          `}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "action",
      render: (_: any, row: SubscriptionData) => (
        <button className="p-2 hover:bg-gray-100 rounded">
          <span role="img" aria-label="view">
            <Eye></Eye>
          </span>
        </button>
      ),
    },
  ];

  return (
    <div>
      <Card className="w-full overflow-hidden p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2 className="text-2xl font-semibold">Subscriptions</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <SearchInput value={search} onChange={setSearch} />
            </div>
            <div className="w-[47.5%] md:w-auto">
              <SelectDropDown
                value={statusFilter}
                onChange={setStatusFilter}
                options={["Trial", "Paid", "Free Plan"]}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DashboardDataTable columns={columns} data={subscriptionData} />
        </div>

        {/* Pagination */}
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalResults={subscriptionData.length}
          pageSize={itemsPerPage}
        />
      </Card>
    </div>
  );
}
