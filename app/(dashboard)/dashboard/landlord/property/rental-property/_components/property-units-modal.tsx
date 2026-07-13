"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type Unit = {
  id: string;
  unitNumber: string;
  floor: number;
  price: string;
  availabilityDate: string | null;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  securityDeposit: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedUnits: Unit[];
  onSave: (units: Unit[]) => void;
  sizeOptions: number[];
};

function createUnit(): Unit {
  return {
    id: `unit-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    unitNumber: "",
    floor: 1,
    price: "",
    availabilityDate: "",
    bedrooms: 1,
    bathrooms: 1,
    sizeSqFt: 1350,
    securityDeposit: "",
  };
}

export default function PropertyUnitsModal({
  open,
  onOpenChange,
  savedUnits,
  onSave,
  sizeOptions,
}: Props) {
  const [units, setUnits] = useState<Unit[]>(
    savedUnits.length > 0 ? savedUnits : [createUnit()],
  );

  function handleUnitChange(
    index: number,
    field: keyof Unit,
    value: string | number,
  ) {
    setUnits((prev) =>
      prev.map((unit, idx) =>
        idx === index ? { ...unit, [field]: value } : unit,
      ),
    );
  }

  function addSingleUnit() {
    setUnits((prev) => [...prev, createUnit()]);
  }

  function removeUnit(index: number) {
    setUnits((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleSave() {
    const hasInvalid = units.some(
      (unit) => !unit.unitNumber || !unit.price || !unit.availabilityDate,
    );

    if (hasInvalid) {
      toast.error(
        "Please fill in all required fields for each unit (Unit Number, Price, and Availability Date).",
      );
      return;
    }

    const normalized = units.map((unit) => ({
      ...unit,
      availabilityDate: unit.availabilityDate
        ? new Date(unit.availabilityDate).toISOString()
        : null,
    }));

    onSave(normalized);
    onOpenChange(false);
    toast.success(`${normalized.length} units saved successfully!`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Units</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {units.map((unit, index) => (
            <div
              key={unit.id}
              className="rounded-3xl border border-[#DD8800] text-[#DD8800] p-4 relative"
            >
              <button
                type="button"
                onClick={() => removeUnit(index)}
                className="absolute top-3 right-3 p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-sm text-slate-500">Unit {index + 1}</div>
                  <div className="text-base font-semibold text-slate-900">
                    {unit.unitNumber || "New Unit"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="mb-2 font-medium text-sm">
                    Unit Number <span className="text-red-500">*</span>
                  </div>
                  <Input
                    value={unit.unitNumber}
                    className="h-[56px]"
                    onChange={(e) =>
                      handleUnitChange(index, "unitNumber", e.target.value)
                    }
                    placeholder="101, A-5, 2B"
                    type="text"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2 font-medium text-sm">Floor</div>
                    <Input
                      value={unit.floor}
                      className="h-[56px]"
                      onChange={(e) =>
                        handleUnitChange(index, "floor", Number(e.target.value))
                      }
                      placeholder="1"
                      type="number"
                    />
                  </div>
                  <div>
                    <div className="mb-2 font-medium text-sm">
                      Availability Date <span className="text-red-500">*</span>
                    </div>
                    <Input
                      value={unit.availabilityDate ?? ""}
                      className="h-[56px]"
                      onChange={(e) =>
                        handleUnitChange(
                          index,
                          "availabilityDate",
                          e.target.value,
                        )
                      }
                      placeholder="Select date"
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <div className="mb-2 font-medium text-sm">
                      Price <span className="text-red-500">*</span>
                    </div>
                    <Input
                      value={unit.price}
                      className="h-[56px]"
                      onChange={(e) =>
                        handleUnitChange(index, "price", e.target.value)
                      }
                      placeholder="$1200"
                      type="number"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Bedrooms</div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="px-2"
                        onClick={() =>
                          handleUnitChange(
                            index,
                            "bedrooms",
                            Math.max(1, unit.bedrooms - 1),
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="text-sm font-semibold flex justify-center items-center w-7 h-7 rounded-md border border-[#DD8800] text-[#DD8800]">
                        {unit.bedrooms}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="px-2"
                        onClick={() =>
                          handleUnitChange(index, "bedrooms", unit.bedrooms + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Bathrooms</div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="px-2"
                        onClick={() =>
                          handleUnitChange(
                            index,
                            "bathrooms",
                            Math.max(1, unit.bathrooms - 1),
                          )
                        }
                      >
                        -
                      </Button>
                      <span className="text-sm font-semibold flex justify-center items-center w-7 h-7 rounded-md border border-[#DD8800] text-[#DD8800]">
                        {unit.bathrooms}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="px-2"
                        onClick={() =>
                          handleUnitChange(
                            index,
                            "bathrooms",
                            unit.bathrooms + 1,
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 font-medium text-sm">Unit Size</div>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={`${unit.id}-size-${size}`}
                        type="button"
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                          unit.sizeSqFt === size
                            ? "border-[#d48806] bg-[#fff7e6] text-[#d48806]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#d48806]"
                        }`}
                        onClick={() =>
                          handleUnitChange(index, "sizeSqFt", size)
                        }
                      >
                        {size} sq ft
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 font-medium text-sm">
                    Security Deposit
                  </div>
                  <Input
                    value={unit.securityDeposit}
                    className="h-[56px]"
                    onChange={(e) =>
                      handleUnitChange(index, "securityDeposit", e.target.value)
                    }
                    placeholder="Enter deposit"
                    type="number"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-2 p-4 rounded-lg border border-[#DD8800] text-[#DD8800]">
          <div className="text-sm font-medium">Add unit:</div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border border-[#DD8800]/50"
            onClick={addSingleUnit}
          >
            <Plus className="w-4 h-4 mr-1" /> Add 1 Unit
          </Button>
        </div>

        <DialogFooter className="mt-2 gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-[#DD8800] text-white hover:bg-[#c97a00]"
            onClick={handleSave}
          >
            Save {units.length} Unit{units.length > 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
