import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Edit, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { PlanModalForm } from "./plan-form";

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

export default function SubscriptionPlan() {
  const [isModalOpen, setIsOpen] = useState(false);
  const [planData, setPlanData] = useState({});

  const handleModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {pricingPlans.map((plan) => (
          <SubscriptionCard key={plan.id} data={plan} />
        ))}
      </div>

      <PlanModalForm></PlanModalForm>
    </div>
  );
}

// Card now receives `data` prop
const SubscriptionCard = ({ data }) => {
  return (
    <Card className="w-full rounded-md py-4 gap-3 max-w-md">
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-[#404040]">{data.name}</h3>
          {data.editIcon && <Edit className="w-4 h-4 cursor-pointer" />}
        </div>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">{data.price}</CardTitle>
          {data.savings && (
            <div className="bg-[#CDFDC6] text-[#04A755] text-xs font-semibold px-[6px] py-0.5 rounded-[3px] border border-[#04A755]">
              {data.savings}
            </div>
          )}
        </div>
        <CardDescription className="font-medium">
          {data.description}
        </CardDescription>
        <hr className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-1">
        {data.features.map((feature, idx: number) => (
          <div
            key={idx}
            className="text-[#707070] text-xs flex items-center gap-2"
          >
            {feature.included ? (
              <Check className="w-4 h-4 font-semibold" color="#04A755" />
            ) : (
              <X className="w-4 h-4 font-semibold" color="#CB121D" />
            )}
            <span>{feature.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
