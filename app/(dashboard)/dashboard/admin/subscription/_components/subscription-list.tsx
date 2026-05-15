import {
  DashboardDataTable,
  type Column,
} from "@/components/common/DashboardDataTable";

import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";
import { TablePagination } from "@/components/common/TablePagination";

import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import StatsCards from "./StatsCards";
import { SubscriptionTable } from "../../../landlord/subscription/_components/subscription-table";

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



export default function SubscriptionPlan() {
  return (
    <div className="">
      {/* Card stats */}
      <section className="my-6">
        <StatsCards />
      </section>
      {/* Table */}
      <div className="">
        <SubscriptionTable />
      </div>
    </div>
  );
}

