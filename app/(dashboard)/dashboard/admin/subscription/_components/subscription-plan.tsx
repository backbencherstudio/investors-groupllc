import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Edit, Plus, Trash, X } from "lucide-react";
import React, { useState } from "react";
import { PlanModalForm } from "./plan-form";
import { useDeleteSubscriptionMutation, useGetAllSubscriptionsQuery } from "@/redux/features/subscription/SubscriptionApi";
import { toast } from "sonner";
import { DeleteConfirmToast } from "@/components/reusable/DeleteConfirmToast";
import type { Subscription } from "@/redux/features/subscription/SubscriptionTypes";

export default function SubscriptionPlan() {
  const { data: subscriptions, isLoading, error } = useGetAllSubscriptionsQuery();
  const [deleteSubscription, { isLoading: isDeleting }] = useDeleteSubscriptionMutation();

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);

  const handleEditClick = (plan: Subscription) => {
    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  };



  const handleDeleteClick = (plan: Subscription) => {
    toast.custom((t) => (
      <DeleteConfirmToast
        toastId={t as string}
        planName={plan.name}
        onConfirm={() => deleteSubscription(plan.id)}
      />
    ), { duration: Infinity });
  };

  
  const handleAddClick = () => {
    setSelectedPlan(null);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedPlan(null);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-md">
        <div className="text-center py-8">Loading subscriptions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-md">
        <div className="text-center py-8 text-red-500">
          Error loading subscriptions. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md">
      <div className="flex justify-end mb-6">
        <Button type="button" onClick={handleAddClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Add plan
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {(Array.isArray(subscriptions) ? subscriptions : []).map((plan: Subscription) => (
          <SubscriptionCard
            key={plan.id}
            data={plan}
            onEdit={() => handleEditClick(plan)}
            onDelete={() => handleDeleteClick(plan)}
          />
        ))}
      </div>

      <PlanModalForm
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        editData={selectedPlan}
      />
    </div>
  );
}

// Updated SubscriptionCard component
const SubscriptionCard = ({
  data,
  onEdit,
  onDelete
}: {
  data: Subscription;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  // Format price from cents to dollars
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: data.currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(data.amount / 100);

  // Format interval display
  const getIntervalText = (interval: string) => {
    switch (interval.toLowerCase()) {
      case 'month': return 'monthly';
      case 'year': return 'yearly';
      case 'week': return 'weekly';
      default: return interval;
    }
  };

  // Prepare features array for display
  // Note: Since your API doesn't have a features array with included flags,
  // we're using benefits directly. You might want to enhance this based on your needs.
  const features = data.benefits.map(benefit => ({
    label: benefit,
    included: true
  }));

  // You can add common features that are missing as false
  const commonFeatures = [
    { label: "Add & manage rental listings", included: true },
    { label: "Communicate with tenants", included: true },
    { label: "Access contractor messaging", included: true },
    { label: "Investment access", included: false },
    { label: "Full maintenance control dashboard", included: false },
    { label: "Contractor coordination tools", included: false },
  ];

  // Merge benefits with common features
  const allFeatures = [
    ...features,
    ...commonFeatures.filter(
      cf => !features.some(f => f.label === cf.label)
    )
  ];

  return (
    <Card className={`w-full rounded-md py-4 gap-3 max-w-md ${!data.isActive ? 'opacity-60' : ''}`}>
      <CardHeader className="px-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-[#404040]">{data.name}</h3>
            {!data.isActive && (
              <span className="text-xs text-red-500 ml-2">(Inactive)</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Edit
              className="w-4 h-4 cursor-pointer hover:text-amber-600 transition-colors"
              onClick={onEdit}
            />

            <Trash className="w-4 h-4 cursor-pointer hover:text-amber-600 transition-colors" onClick={onDelete} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">
            {formattedPrice}/{getIntervalText(data.interval)}
          </CardTitle>
          {data.discountPercentage > 0 && (
            <div className="bg-[#CDFDC6] text-[#04A755] text-xs font-semibold px-[6px] py-0.5 rounded-[3px] border border-[#04A755]">
              Save {data.discountPercentage}%
            </div>
          )}
        </div>
        <CardDescription className="font-medium">
          {data.description}
        </CardDescription>
        <hr className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-1">
        {allFeatures.map((feature, idx) => (
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
        {data.trialDays && data.trialDays > 0 && (
          <div className="mt-2 text-xs text-amber-600 font-medium">
            {data.trialDays} days free trial
          </div>
        )}
      </CardContent>
    </Card>
  );
};