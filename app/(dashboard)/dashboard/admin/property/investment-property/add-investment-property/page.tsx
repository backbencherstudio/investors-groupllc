// app/(dashboard)/dashboard/property/investment-property/add-investment-property/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PropertyImage from "@/app/(dashboard)/dashboard/_components/property-image";

import { toast } from "sonner";
import { useCreateInvestmentPropertyMutation } from "@/redux/features/apartments/apartmentsApi";

export default function AddInvestmentProperty() {
  const router = useRouter();
  const [createProperty, { isLoading }] = useCreateInvestmentPropertyMutation();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    investmentType: "active" as "active" | "passive",
    propertyAge: 1,
    propertySize: 1350,
    numberOffloors: 1,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    petFriendly: true,
    isRented: false,
  });

  // UI state
  const [showInput, setShowInput] = useState(false);
  const [showAmenityInput, setShowAmenityInput] = useState(false);
  const [bed, setBed] = useState(1);
  const [bath, setBath] = useState(1);
  const [floor, setFloor] = useState(1);
  const [age, setAge] = useState(1);
  const [sizeOptions, setSizeOptions] = useState([950, 1350, 1550, 1600]);
  const [selectedSize, setSelectedSize] = useState(1350);
  const [newSize, setNewSize] = useState("");
  const [amenities, setAmenities] = useState(["Parking", "Gym Access"]);
  const [amenityInput, setAmenityInput] = useState("");
  const [amenityOptions, setAmenityOptions] = useState([
    "Parking",
    "Gym Access",
    "CCTV",
    "Balcony",
  ]);
  const [status, setStatus] = useState("active");

  // File states
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [detailDocumentFile, setDetailDocumentFile] = useState<File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  function toggleAmenity(a: string) {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  }

  function addAmenity() {
    setShowAmenityInput(true);
    if (amenityInput && !amenityOptions.includes(amenityInput)) {
      setAmenityOptions([...amenityOptions, amenityInput]);
      setAmenities([...amenities, amenityInput]);
      setAmenityInput("");
    }
  }

  function addSize() {
    setShowInput(true);
    const val = parseInt(newSize);
    if (!isNaN(val) && !sizeOptions.includes(val)) {
      setSizeOptions([...sizeOptions, val]);
      setNewSize("");
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles((prev) => [...prev, ...fileArray]);
      console.log("Images selected:", fileArray);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      console.log("Video selected:", file);
    }
  };

  const handleDetailDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDetailDocumentFile(file);
      console.log("Detail document selected:", file);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setDocumentFiles((prev) => [...prev, ...fileArray]);
      console.log("Documents selected:", fileArray);
    }
  };

  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      // Create FormData for API
      const formDataObj = new FormData();

      // Add basic fields
      formDataObj.append("name", formData.name);
      formDataObj.append("location", formData.location);
      formDataObj.append("description", formData.description);
      formDataObj.append("investmentType", formData.investmentType);
      formDataObj.append("propertyAge", formData.propertyAge.toString());
      formDataObj.append("propertySize", formData.propertySize.toString());
      formDataObj.append("numberOffloors", formData.numberOffloors.toString());
      formDataObj.append("numberOfBedrooms", formData.numberOfBedrooms.toString());
      formDataObj.append("numberOfBathrooms", formData.numberOfBathrooms.toString());
      formDataObj.append("petFriendly", String(true));
      formDataObj.append("isRented", String(false));

      // Add images
      imageFiles.forEach((file) => {
        formDataObj.append("images", file);
      });

      // Add amenities as JSON string
      formDataObj.append("amenities", JSON.stringify(amenities));

      // Add investment details (sample data - you should collect this from form)
      const investmentDetails = [{
        totalFoundGoal: 500000,
        annualReturnRate: 12,
        autoRenue: false,
        maximumInvest: 100000,
        minimumInvest: 5000,
        investmentAmount: 500000,
        aquisitionCost: 400000,
        profitShare: 10,
        lockInPeriod: "5 Years",
        sold: false,
        renovationCost: 20000,
        totalProjectCost: 600000,
        projectSellPrice: 800000,
        profit: 200000,
        firstLineHolder: true,
        startDate: "2026-05-01T00:00:00.000Z",
        completionDate: "2031-05-01T00:00:00.000Z"
      }];
      formDataObj.append("investmentDetails", JSON.stringify(investmentDetails));

      // Add investment strategies
      const investmentStrategies = [{
        title: "Long Term Capital Gain",
        description: ["Hold for 5 years to maximize profit", "Reinvest dividend to compound earnings"]
      }];
      formDataObj.append("investmentStrategies", JSON.stringify(investmentStrategies));

      // Add apartment FAQs
      const apartmentFAQs = [{
        name: "Is my investment refundable?",
        description: ["Yes, it is fully refundable after the lock-in period ends."]
      }];
      formDataObj.append("apartmentFAQs", JSON.stringify(apartmentFAQs));

      // Add documents
      if (detailDocumentFile) {
        formDataObj.append("detailsDocument", detailDocumentFile);
      }

      documentFiles.forEach((file) => {
        formDataObj.append("document", file);
      });

      // Submit to API
      const result = await createProperty(formDataObj).unwrap();
      toast.success("Property created successfully!");
      console.log("Property created:", result);

      // Navigate to property details or list
      // router.push(`/dashboard/admin/property/investment-property/${result.id}`);
      router.push(`/dashboard/admin/property/investment-property/${result?.data?.id}`);
    } catch (error) {
      console.error("Error creating property:", error);
      toast.error("Failed to create property. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 flex flex-col md:flex-row justify-start items-center gap-2">
            <span>Property List</span>
            <span className="mx-1">&gt;</span>
            <span className="text-gray-900 font-medium">
              Add Investment Property
            </span>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg px-4 py-3"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* <div>
              <PropertyImage />
            </div> */}

            {/* Image upload */}
            <div>
              <div className="mb-2 font-medium">Property Image</div>
              <label
                htmlFor="property-image"
                className="border-2 border-dashed border-[#ffe7ba] bg-[#fff7e6] rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-[#d48806] mb-2" />
                <div className="font-medium text-[#d48806]">Upload Image</div>
                <div className="text-xs text-gray-400 mt-1">
                  Format: JPG, PNG (10mb max/size)
                </div>
                <input
                  type="file"
                  id="property-image"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {imageFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {imageFiles.length} image(s) selected
                </div>
              )}
            </div>

            {/* Video upload */}
            <div className="mt-6">
              <div className="mb-2 font-medium">Property Virtual Video</div>
              <label
                htmlFor="property-video"
                className="border-2 border-dashed border-[#ffe7ba] bg-[#fff7e6] rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer"
              >
                <Upload className="w-8 h-8 text-[#d48806] mb-2" />
                <div className="font-medium text-[#d48806]">Upload Video</div>
                <div className="text-xs text-gray-400 mt-1">
                  Format: MP4, AVI, MOV, WMV (40mb max/size)
                </div>
                <input
                  type="file"
                  id="property-video"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>
              {videoFile && (
                <div className="mt-2 text-sm text-gray-600">
                  Video selected: {videoFile.name}
                </div>
              )}
            </div>

            {/* Property size chips */}
            <div>
              <div className="mb-2 font-medium">Property size</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {sizeOptions.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={`px-3 py-1 rounded border text-xs font-medium transition-colors duration-150 ${
                      selectedSize === size
                        ? "bg-[#fff7e6] border-[#d48806] text-[#d48806]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-[#d48806]"
                    }`}
                    onClick={() => {
                      setSelectedSize(size);
                      setFormData((prev) => ({ ...prev, propertySize: size }));
                    }}
                  >
                    {size} sq ft
                  </button>
                ))}
                {showInput && (
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add"
                    className="w-24 h-8 px-2 text-xs border-gray-200"
                    type="number"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSize();
                      }
                    }}
                  />
                )}
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] px-2 h-8 cursor-pointer"
                  onClick={addSize}
                >
                  Add <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bed/Bath/Floor/Age steppers */}
            <div className="flex justify-between items-center gap-4 mb-2">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="font-semibold mb-1">Bed Room</div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = Math.max(1, bed - 1);
                        setBed(newVal);
                        setFormData((prev) => ({ ...prev, numberOfBedrooms: newVal }));
                      }}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{bed}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = bed + 1;
                        setBed(newVal);
                        setFormData((prev) => ({ ...prev, numberOfBedrooms: newVal }));
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Bath Room</div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = Math.max(1, bath - 1);
                        setBath(newVal);
                        setFormData((prev) => ({ ...prev, numberOfBathrooms: newVal }));
                      }}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{bath}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = bath + 1;
                        setBath(newVal);
                        setFormData((prev) => ({ ...prev, numberOfBathrooms: newVal }));
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="font-semibold mb-1">Floors</div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = Math.max(1, floor - 1);
                        setFloor(newVal);
                        setFormData((prev) => ({ ...prev, numberOffloors: newVal }));
                      }}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{floor}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = floor + 1;
                        setFloor(newVal);
                        setFormData((prev) => ({ ...prev, numberOffloors: newVal }));
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Property Age</div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = Math.max(1, age - 1);
                        setAge(newVal);
                        setFormData((prev) => ({ ...prev, propertyAge: newVal }));
                      }}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{age}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => {
                        const newVal = age + 1;
                        setAge(newVal);
                        setFormData((prev) => ({ ...prev, propertyAge: newVal }));
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <div className="mb-2 font-medium">Amenities</div>
              <div className="flex flex-wrap gap-4 mb-2">
                {amenityOptions.map((a) => (
                  <label
                    key={a}
                    className="flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                      className="accent-[#d48806]"
                    />
                    {a}
                  </label>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                {showAmenityInput && (
                  <Input
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Add"
                    className="w-24 h-8 px-2 text-xs border-gray-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAmenity();
                      }
                    }}
                  />
                )}
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] px-2 h-8 cursor-pointer"
                  onClick={addAmenity}
                >
                  Add <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2 font-medium">Property Name</div>
              <Input
                placeholder="Enter property name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            {/* Location */}
            <div>
              <div className="mb-2 font-medium">Location</div>
              <Input
                placeholder="Maple Grove 42 Elm St, Austin, TX"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
              <div className="mt-2 rounded-lg overflow-hidden border h-32 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
                <span>Map Placeholder</span>
              </div>
            </div>

            {/* Investment Status */}
            <div>
              <div className="mb-2 font-medium">Investment Status</div>
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setFormData((prev) => ({
                    ...prev,
                    investmentType: value as "active" | "passive",
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="passive">Passive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <div className="mb-2 font-medium">Description</div>
              <textarea
                placeholder="Enter a description of the property"
                rows={4}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d48806] focus:border-[#d48806] min-h-[96px]"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            {/* Document Uploads */}
            <div>
              <div className="mb-2 font-medium">Detail Document</div>
              <label
                htmlFor="detail-document"
                className="border-2 border-dashed border-[#ffe7ba] bg-[#fff7e6] rounded-lg flex flex-col items-center justify-center py-4 cursor-pointer"
              >
                <Upload className="w-6 h-6 text-[#d48806] mb-1" />
                <div className="text-xs text-[#d48806]">Upload Detail Document</div>
                <input
                  type="file"
                  id="detail-document"
                  className="hidden"
                  onChange={handleDetailDocumentUpload}
                />
              </label>
              {detailDocumentFile && (
                <div className="mt-1 text-xs text-gray-600">
                  Document: {detailDocumentFile.name}
                </div>
              )}
            </div>

            <div>
              <div className="mb-2 font-medium">Additional Documents</div>
              <label
                htmlFor="additional-documents"
                className="border-2 border-dashed border-[#ffe7ba] bg-[#fff7e6] rounded-lg flex flex-col items-center justify-center py-4 cursor-pointer"
              >
                <Upload className="w-6 h-6 text-[#d48806] mb-1" />
                <div className="text-xs text-[#d48806]">Upload Additional Documents</div>
                <input
                  type="file"
                  id="additional-documents"
                  multiple
                  className="hidden"
                  onChange={handleDocumentUpload}
                />
              </label>
              {documentFiles.length > 0 && (
                <div className="mt-1 text-xs text-gray-600">
                  {documentFiles.length} document(s) selected
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Button side */}
      <div className="w-full mt-8">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full mb-4 relative">
          <div
            className="h-1 bg-[#d48806] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="bg-white border border-gray-300 rounded px-6 py-2 font-medium cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="bg-[#d48806] text-white rounded px-8 py-2 font-medium flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : currentStep === steps.length - 1 ? (
              "Submit"
            ) : (
              <>
                Continue <span aria-hidden>→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}