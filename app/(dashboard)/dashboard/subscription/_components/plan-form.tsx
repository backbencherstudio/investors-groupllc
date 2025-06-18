"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface FormData {
  planName: string;
  planType: string;
  price: string;
  saveTagEnabled: boolean;
  saveTag: string;
  description: string;
  benefits: string[];
}

export function PlanModalForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    planName: "",
    planType: "Month",
    price: "",
    saveTagEnabled: false,
    saveTag: "",
    description: "",
    benefits: [""],
  });

  const handleChange = (field: keyof FormData, value: string | boolean) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setIsModalOpen(false);
    setFormData({
      planName: "",
      planType: "Month",
      price: "",
      saveTagEnabled: false,
      saveTag: "",
      description: "",
      benefits: [""],
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-amber-600 text-white rounded mt-8 flex items-center gap-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
          Add New plan
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:min-w-[600px] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Plan</DialogTitle>
          </DialogHeader>

          {/* Plan Name & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="planName">Plan Name</Label>
              <Input
                id="planName"
                value={formData.planName}
                onChange={(e) => handleChange("planName", e.target.value)}
                placeholder="Gold"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="planType">Type</Label>
              <Select
                value={formData.planType}
                onValueChange={(value) => handleChange("planType", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Month">Month</SelectItem>
                  <SelectItem value="Year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price & Save Tag Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="$199"
                className="mt-2"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 h-3.5">
                <Label htmlFor="saveTag">Save tag</Label>
                <Switch
                  checked={formData.saveTagEnabled}
                  onCheckedChange={(val) => handleChange("saveTagEnabled", val)}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
              <Input
                id="saveTag"
                value={formData.saveTag}
                disabled={!formData.saveTagEnabled}
                onChange={(e) => handleChange("saveTag", e.target.value)}
                placeholder="10%"
                className="mt-2"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Unlock exclusive features for a better rental experience."
              className="mt-2"
            />
          </div>

          {/* Benefits (Repeatable) */}
          <div className="mt-2">
            <Label>Benefit</Label>
            {formData.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleBenefitChange(idx, e.target.value)}
                  placeholder="Enter benefit"
                />
                {formData.benefits.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeBenefit(idx)}
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
            >
              <Plus className="w-4 h-4" />
              Add more
            </Button>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-amber-600 text-white rounded">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
