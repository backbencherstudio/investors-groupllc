"use client";
import {
  Column,
  DashboardDataTable,
} from "@/components/common/DashboardDataTable";
import ThreeDot from "@/components/icons/common/three-dot";

import React from "react";

const teamsData = [
  {
    id: 1,
    name: "Jeromon Bell",
    email: "j@gamilc.om",
    role: "Stuff",
    permission: "Manage telent",
  },
  {
    id: 2,
    name: "Jeromon Bell",
    email: "j@gamilc.om",
    role: "Stuff",
    permission: "Manage telent",
  },
  {
    id: 3,
    name: "Jeromon Bell",
    email: "j@gamilc.om",
    role: "Stuff",
    permission: "Manage telent",
  },
];

export default function TeamTable() {
  const TeamTableCol: Column<(typeof teamsData)[0]>[] = [
    {
      header: "Name",
      accessor: "name",
      className: "font-semibold",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
    },

    {
      header: "Permission",
      accessor: "permission",
    },
    {
      header: "",
      accessor: "id",
      render: () => <ThreeDot className="cursor-pointer" />,
    },
  ];

  return (
    <div>
      <DashboardDataTable columns={TeamTableCol} data={teamsData} />
    </div>
  );
}
