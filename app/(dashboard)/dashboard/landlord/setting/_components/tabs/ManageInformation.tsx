import React from "react";
import FaqManagement from "./_components/manage-faq";
import ManageContact from "./_components/manage-contact";

export default function ManageInformation() {
  return (
    <div>
      {/* FAQ manangement */}
      <div>
        <FaqManagement />
      </div>

      {/* Contact management */}
      <div>
        <ManageContact/>
      </div>
    </div>
  );
}
