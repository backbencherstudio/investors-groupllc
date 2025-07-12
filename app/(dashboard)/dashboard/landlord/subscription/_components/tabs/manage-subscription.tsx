import AddButton from "@/components/common/AddButton";
import React from "react";
import { SubscriptionTable } from "../subscription-table";

export default function ManageSubscription() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-white space-y-4">
        <div>
          <p className="text-[#707070] mb-1">Premium</p>
          <h4 className="text-[#101010] font-semibold text-lg">
            $ <span>29.00</span> per month
          </h4>
        </div>

        <p>Your subscription renews on Aug 28, 2024</p>

        <div className="flex gap-1 items-center">
          <span>{visaIcon}</span>
          <p className="text-[#9397A4]">****4251</p>
        </div>

        <AddButton>Add payment method</AddButton>
      </div>

      {/* subscription list table */}
      <div>
        <SubscriptionTable />
      </div>
    </div>
  );
}

const visaIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="32"
    viewBox="0 0 46 32"
    fill="none"
  >
    <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white" />
    <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F2F4F7" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.3321 21.1443H11.5858L9.52638 13.0565C9.42863 12.6845 9.22108 12.3556 8.91579 12.2005C8.15389 11.811 7.31432 11.5009 6.39844 11.3446V11.0332H10.8225C11.4331 11.0332 11.8911 11.5009 11.9674 12.0442L13.0359 17.8782L15.7809 11.0332H18.4509L14.3321 21.1443ZM19.9775 21.1443H17.3838L19.5195 11.0332H22.1132L19.9775 21.1443ZM25.4687 13.8351C25.545 13.2905 26.003 12.9791 26.5372 12.9791C27.3768 12.9009 28.2914 13.0573 29.0546 13.4455L29.5125 11.2685C28.7493 10.9571 27.9097 10.8008 27.1478 10.8008C24.6305 10.8008 22.7987 12.2013 22.7987 14.1451C22.7987 15.6238 24.0962 16.4003 25.0121 16.868C26.003 17.3344 26.3846 17.6458 26.3083 18.1122C26.3083 18.8118 25.545 19.1232 24.7831 19.1232C23.8672 19.1232 22.9514 18.89 22.1131 18.5004L21.6552 20.6787C22.5711 21.0669 23.5619 21.2233 24.4778 21.2233C27.3005 21.3001 29.0546 19.9009 29.0546 17.8008C29.0546 15.1561 25.4687 15.0011 25.4687 13.8351ZM38.1315 21.1443L36.0721 11.0332H33.8601C33.4021 11.0332 32.9442 11.3446 32.7915 11.811L28.978 21.1443H31.648L32.181 19.667H35.4615L35.7668 21.1443H38.1315ZM34.242 13.7578L35.0039 17.5685H32.8682L34.242 13.7578Z"
      fill="#172B85"
    />
  </svg>
);
