'use client'

import React from "react";
import TeamTable from "./_components/team-table";
import AddTeamMemberModal from "./_components/add-team-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function page() {

  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center  mb-6">
        <h3 className="text-lg font-medium ">Team Permission</h3>

        <Button className="bg-black text-white border font-normal  hover:bg-gray-700 cursor-pointer rounded-lg" onClick={() => router.push('/dashboard/admin/team-permission/roles')}>
          
          Roles Management
        </Button>
      </div>

      <section className="p-6 rounded-lg bg-white">
        <h2 className="text-2xl text-[#170A00] font-semibold mb-4 md:mb-6">
          Team Permission
        </h2>
        {/* table */}
        <TeamTable />

        {/* add team member */}
        <AddTeamMemberModal />
      </section>
    </div>
  );
}
