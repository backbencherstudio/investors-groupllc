import React from "react";
import TeamTable from "./_components/team-table";
import AddTeamMemberModal from "./_components/add-team-modal";

export default function page() {
  return (
    <div>
      <h3 className="text-lg font-medium mb-6">Team Permission</h3>

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
