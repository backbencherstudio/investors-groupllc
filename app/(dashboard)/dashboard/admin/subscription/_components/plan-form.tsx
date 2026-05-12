"use client";
import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "@/redux/features/subscription/SubscriptionApi";
import { CreateSubscriptionDto } from "@/redux/features/subscription/SubscriptionTypes";
import { toast } from "sonner"

interface Subscription {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  amount: number;
  currency: string;
  interval: string;
  trialDays: number | null;
  benefits: string[];
  discountPercentage: number;
}

interface PlanModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: Subscription | null;
}

export function PlanModalForm({ isOpen, onClose, editData }: PlanModalFormProps) {
  const [createSubscription, { isLoading: isCreating }] = useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdating }] = useUpdateSubscriptionMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    amount: "",
    currency: "usd",
    interval: "month",
    trialDays: "",
    benefits: [""],
    discountPercentage: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        description: editData.description,
        isActive: editData.isActive,
        amount: editData.amount.toString(),
        currency: editData.currency,
        interval: editData.interval,
        trialDays: editData.trialDays?.toString() || "",
        benefits: editData.benefits.length ? editData.benefits : [""],
        discountPercentage: editData.discountPercentage.toString(),
      });
    } else {
      // Reset form for create mode
      setFormData({
        name: "",
        description: "",
        isActive: true,
        amount: "",
        currency: "usd",
        interval: "month",
        trialDays: "",
        benefits: [""],
        discountPercentage: "",
      });
    }
  }, [editData]);

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBenefitChange = (idx: number, value: string) => {
    const updated = [...formData.benefits];
    updated[idx] = value;
    setFormData((prev) => ({ ...prev, benefits: updated }));
  };

  const addBenefit = () => {
    setFormData((prev) => ({ ...prev, benefits: [...prev.benefits, ""] }));
  };

  const removeBenefit = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== idx),
    }));
  };

  // Helper to check if any field has changed for PATCH
  const getChangedFields = (original: Subscription | null | undefined, current: typeof formData) => {
    if (!original) return null;

    const changed: Partial<CreateSubscriptionDto> = {};
    
    if (original.name !== current.name) changed.name = current.name;
    if (original.description !== current.description) changed.description = current.description;
    if (original.isActive !== current.isActive) changed.isActive = current.isActive;
    if (original.amount !== parseInt(current.amount)) changed.amount = parseInt(current.amount);
    if (original.currency !== current.currency) changed.currency = current.currency;
    if (original.interval !== current.interval) changed.interval = current.interval;
    if (original.trialDays !== (current.trialDays ? parseInt(current.trialDays) : null)) {
      changed.trialDays = current.trialDays ? parseInt(current.trialDays) : null;
    }
    if (JSON.stringify(original.benefits) !== JSON.stringify(current.benefits.filter(b => b.trim() !== ""))) {
      changed.benefits = current.benefits.filter(b => b.trim() !== "");
    }
    if (original.discountPercentage !== parseInt(current.discountPercentage)) {
      changed.discountPercentage = parseInt(current.discountPercentage);
    }
    
    return changed;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Filter out empty benefits
    const filteredBenefits = formData.benefits.filter(benefit => benefit.trim() !== "");

    if (filteredBenefits.length === 0) {
      toast.error("Please add at least one benefit");
      return;
    }
    
    try {
      if (editData?.id) {
        // PATCH: Only send changed fields
        const changedFields = getChangedFields(editData, formData);
        
        // Check if any fields were changed
        if (changedFields && Object.keys(changedFields).length === 0) {
          toast.info("No changes were made");
          onClose();
          return;
        }
        
        // Ensure benefits is always included if it was modified
        const payload = {
          ...changedFields,
          // Always ensure benefits is an array
          benefits: changedFields?.benefits || filteredBenefits,
        };
        
        await updateSubscription({ 
          id: editData.id, 
          ...payload 
        }).unwrap();
        
        toast.success("Subscription updated successfully");
      } else {
        // POST: Send all fields for creation
        const payload = {
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          amount: parseInt(formData.amount) || 0,
          currency: formData.currency,
          interval: formData.interval,
          trialDays: formData.trialDays ? parseInt(formData.trialDays) : null,
          benefits: filteredBenefits,
          discountPercentage: formData.discountPercentage ? parseInt(formData.discountPercentage) : 0,
        };
        
        await createSubscription(payload).unwrap();
        
        toast.success("Subscription created successfully");
      }
      onClose();
    } catch (error: any) {
      console.error("Error saving subscription:", error);
      toast.error(error?.data?.message || "Failed to save subscription");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:min-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editData ? "Edit Plan" : "Add New Plan"}</DialogTitle>
          </DialogHeader>

          {/* Plan Name & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Starter20"
                className="mt-2"
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 h-3.5">
                <Label htmlFor="isActive">Active Status</Label>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(val) => handleChange("isActive", val)}
                  className="data-[state=checked]:bg-amber-500"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Enable/disable this plan</p>
            </div>
          </div>

          {/* Amount & Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="amount">Amount (in cents)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="1999"
                className="mt-2"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Amount in cents (e.g., $19.99 = 1999)</p>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleChange("currency", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interval & Trial Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="interval">Billing Interval</Label>
              <Select
                value={formData.interval}
                onValueChange={(value) => handleChange("interval", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="trialDays">Trial Days (optional)</Label>
              <Input
                id="trialDays"
                type="number"
                value={formData.trialDays}
                onChange={(e) => handleChange("trialDays", e.target.value)}
                placeholder="14"
                className="mt-2"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for no trial</p>
            </div>
          </div>

          {/* Discount Percentage */}
          <div className="mt-2">
            <Label htmlFor="discountPercentage">Discount Percentage</Label>
            <Input
              id="discountPercentage"
              type="number"
              value={formData.discountPercentage}
              onChange={(e) => handleChange("discountPercentage", e.target.value)}
              placeholder="10"
              className="mt-2"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">Discount percentage (e.g., 10 for 10% off)</p>
          </div>

          {/* Description */}
          <div className="mt-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="For new landlords"
              className="mt-2"
              required
              disabled={isLoading}
            />
          </div>

          {/* Benefits (Repeatable) */}
          <div className="mt-2">
            <Label>Benefits</Label>
            {formData.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleBenefitChange(idx, e.target.value)}
                  placeholder="Enter benefit"
                  disabled={isLoading}
                />
                {formData.benefits.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeBenefit(idx)}
                    disabled={isLoading}
                  >
                    <Minus />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2 mt-2 text-amber-600"
              onClick={addBenefit}
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Add more benefit
            </Button>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-amber-600 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (editData ? "Update Plan" : "Add Plan")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}