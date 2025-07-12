import { Button } from "@/components/ui/button";
import React from "react";
import { SubscriptionCard } from "../../../../_components/common/PriceCard";

// fake data
const pricingPlans = [
  {
    id: "standard",
    name: "Standard",
    price: "$0/monthly",
    description: "Unlock exclusive features for a better rental experience.",
    features: [
      { label: "Add & manage rental listings", included: true },
      { label: "Communicate with tenants", included: true },
      { label: "Access basic contractor messaging", included: true },
      { label: "No investment access", included: false },
      { label: "No full maintenance control", included: false },
      { label: "No advanced contractor tools", included: false },
    ],
    isPopular: false,
    savings: "",
    editIcon: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$299/monthly",
    description: "Unlock exclusive features for a better rental experience.",
    features: [
      { label: "Add & manage rental listings", included: true },
      { label: "Communicate with tenants", included: true },
      { label: "Access contractor messaging", included: true },
      { label: "Investment access", included: true },
      { label: "Full maintenance control dashboard", included: true },
      { label: "Contractor coordination tools", included: true },
    ],
    isPopular: true,
    savings: "Save 10%",
    editIcon: true,
  },
];

export default function ChoosePlan() {
  return (
    <>
      {/* plan info */}
      <div className="p-6 rounded-[12px] space-y-6 bg-white">
        <div className="">
          <div className="flex gap-2">
            <span>{giftIcon}</span>
            <h4 className="text-[#101010] text-lg font-bold mb-1">
              You’re currently on a Premium Trial
            </h4>
          </div>
          <p className="text-[#707070] font-medium">
            Your trial ends in 14 days. Upgrade now to avoid losing access to
            premium features like <br /> investment tools and full maintenance
            control.
          </p>
        </div>

        <Button className="bg-[#d80] text-white cursor-pointer">
          Upgread Now
        </Button>
      </div>

      <h2 className="font-semibold text-[#170A00] text-lg my-6">Choose Your Plan</h2>

      {/* price card */}
      <div className="bg-white p-6 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {pricingPlans.map((plan) => (
            <SubscriptionCard variant="landlord" key={plan.id} data={plan} />
          ))}
        </div>
      </div>
    </>
  );
}

const giftIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 11V15C4 18.2998 4 19.9497 5.02513 20.9749C6.05025 22 7.70017 22 11 22H13C16.2998 22 17.9497 22 18.9749 20.9749C20 19.9497 20 18.2998 20 15V11"
      stroke="#383838"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 9C3 8.25231 3 7.87846 3.20096 7.6C3.33261 7.41758 3.52197 7.26609 3.75 7.16077C4.09808 7 4.56538 7 5.5 7H18.5C19.4346 7 19.9019 7 20.25 7.16077C20.478 7.26609 20.6674 7.41758 20.799 7.6C21 7.87846 21 8.25231 21 9C21 9.74769 21 10.1215 20.799 10.4C20.6674 10.5824 20.478 10.7339 20.25 10.8392C19.9019 11 19.4346 11 18.5 11H5.5C4.56538 11 4.09808 11 3.75 10.8392C3.52197 10.7339 3.33261 10.5824 3.20096 10.4C3 10.1215 3 9.74769 3 9Z"
      stroke="#383838"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M6 3.78571C6 2.79949 6.79949 2 7.78571 2H8.14286C10.2731 2 12 3.7269 12 5.85714V7H9.21429C7.43908 7 6 5.56091 6 3.78571Z"
      stroke="#383838"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M18 3.78571C18 2.79949 17.2005 2 16.2143 2H15.8571C13.7269 2 12 3.7269 12 5.85714V7H14.7857C16.5609 7 18 5.56091 18 3.78571Z"
      stroke="#383838"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M12 11V22"
      stroke="#383838"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
