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
import { useCreateApartmentsMutation } from "@/redux/features/landlord/dashboard/apartments";
import { Plus, Upload, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PropertyUnitsModal, { Unit } from "../_components/property-units-modal";

export default function AddNewProperty() {
  const [createApartment] = useCreateApartmentsMutation();
  const [propertyName, setPropertyName] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("For Rent");
  const [description, setDescription] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      if (videoPreview) URL.revokeObjectURL(videoPreview);
    };
  }, [imagePreviews, videoPreview]);

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
    setShowAmenityInput(false);
    const val = parseInt(newSize, 10);
    if (!isNaN(val) && !sizeOptions.includes(val)) {
      setSizeOptions([...sizeOptions, val]);
      setSelectedSize(val);
      setNewSize("");
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    const selected = Array.from(files).slice(0, 5);
    const previews = selected.map((file) => URL.createObjectURL(file));

    setImageFiles(selected);
    setImagePreviews(previews);
  }

  function handleVideoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();

    // Build a primary unit from the main-page fields
    const primaryUnit = {
      unitNumber: "Unit 1",
      floor: Number(floor) || 1,
      price: Number(price) || 0,
      securityDeposit: 0,
      availabilityDate: availabilityDate
        ? new Date(availabilityDate).toISOString()
        : null,
      bedrooms: bed,
      bathrooms: bath,
      sizeSqFt: selectedSize,
      leaseTerm: "12 months",
    };

    // Include both the primary unit from main-page fields AND modal units
    const modalUnits =
      units.length > 0
        ? units.map((unit) => ({
            unitNumber: unit.unitNumber,
            floor: Number(unit.floor) || 0,
            price: Number(unit.price) || 0,
            securityDeposit: Number(unit.securityDeposit) || 0,
            availabilityDate: unit.availabilityDate
              ? new Date(unit.availabilityDate).toISOString()
              : null,
            bedrooms: unit.bedrooms,
            bathrooms: unit.bathrooms,
            sizeSqFt: unit.sizeSqFt,
            leaseTerm: "12 months",
          }))
        : [];

    const unitsPayload = [primaryUnit, ...modalUnits];

    formData.append("name", propertyName);
    formData.append("price", price);
    formData.append("address", location);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipCode", zipCode);
    formData.append("country", country);
    formData.append(
      "listingType",
      propertyStatus === "For Rent"
        ? "for_rent"
        : propertyStatus === "For Sale"
          ? "for_sale"
          : "for_rent",
    );
    formData.append("isRented", propertyStatus === "Rented" ? "true" : "false");
    formData.append("description", description);
    if (availabilityDate) {
      formData.append(
        "availabilityDate",
        new Date(availabilityDate).toISOString(),
      );
    }
    formData.append("units", JSON.stringify(unitsPayload));
    formData.append("amenities", JSON.stringify(amenities));
    formData.append(
      "utilitiesIncluded",
      JSON.stringify(["Electricity", "Water", "Gas"]),
    );

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      setIsSubmitting(true);
      const res = await createApartment(formData).unwrap();
      if (res.success) {
        setIsSubmitting(false);
        toast.success("Property submitted successfully.");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      toast.error("Failed to submit property.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="text-sm text-gray-500 flex items-start md:items-center gap-2">
            <span>Property List</span>
            <span className="mx-1">{">"}</span>
            <span className="text-gray-900 font-medium">Add New Property</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="submit"
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg px-4 py-3"
            >
              Cancel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 bg-white rounded-xl shadow p-6">
          <div className="space-y-6">
            {imagePreviews.length > 0 && (
              <div className="rounded-3xl border border-slate-200 overflow-hidden">
                <div className="relative h-72 bg-slate-100 flex items-center justify-center">
                  <img
                    src={imagePreviews[0]}
                    alt="Property preview"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex gap-3 p-4 overflow-x-auto bg-slate-50">
                  {imagePreviews.map((preview, idx) => (
                    <img
                      key={preview}
                      src={preview}
                      alt={`Preview ${idx + 1}`}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="mb-3 font-semibold text-slate-900">
                Property Image
              </div>
              <label
                htmlFor="property-image"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#F1C796] bg-[#FFF9E6] p-6 text-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-[#d48806]" />
                <div className="font-semibold text-[#d48806]">Upload Image</div>
                <p className="text-xs text-slate-500">
                  JPG, PNG, WEBP up to 10 MB
                </p>
                <input
                  type="file"
                  id="property-image"
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div>
              <div className="mb-3 font-semibold text-slate-900">
                Property Virtual Video
              </div>
              <label
                htmlFor="property-video"
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#F1C796] bg-[#FFF9E6] p-6 text-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-[#d48806]" />
                <div className="font-semibold text-[#d48806]">Upload Video</div>
                <p className="text-xs text-slate-500">
                  MP4, AVI, MOV up to 40 MB
                </p>
                <input
                  type="file"
                  id="property-video"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoChange}
                />
              </label>
              {videoPreview && (
                <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200">
                  <video controls className="w-full h-56 bg-black">
                    <source src={videoPreview} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 p-5">
              <div className="mb-4 font-semibold text-slate-900">
                Property size
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {sizeOptions.map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      selectedSize === size
                        ? "border-[#d48806] bg-[#fff7e6] text-[#d48806]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#d48806]"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size} sq ft
                  </button>
                ))}
                <div className="flex items-center gap-2">
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add"
                    type="number"
                    className="w-24 h-10 px-2 text-xs border-slate-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSize();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="bg-[#fff7e6] text-[#d48806] border border-[#d48806] px-3 h-10"
                    onClick={addSize}
                  >
                    Add <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 justify-between gap-4 text-slate-700">
                <div className="">
                  <div className="text-sm">Bed Room</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setBed(Math.max(1, bed - 1))}
                    >
                      -
                    </Button>
                    <span className="text-sm font-semibold flex justify-center items-center w-7 h-7 rounded-md border border-[#DD8800] text-[#DD8800]">
                      {bed}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setBed(bed + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="">
                  <div className="text-sm">Bath Room</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setBath(Math.max(1, bath - 1))}
                    >
                      -
                    </Button>
                    <span className="text-sm font-semibold flex justify-center items-center w-7 h-7 rounded-md border border-[#DD8800] text-[#DD8800]">
                      {bath}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setBath(bath + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="">
                  <div className="text-sm">Floors</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setFloor(Math.max(1, floor - 1))}
                    >
                      -
                    </Button>
                    <span className="text-sm font-semibold flex justify-center items-center w-7 h-7 rounded-md border border-[#DD8800] text-[#DD8800]">
                      {floor}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setFloor(floor + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="">
                  <div className="text-sm">Property Age</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setAge(Math.max(1, age - 1))}
                    >
                      -
                    </Button>
                    <span className="text-sm font-semibold flex justify-center items-center w-7 h-7 rounded-md border border-[#DD8800] text-[#DD8800]">
                      {age}
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setAge(age + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 p-5">
              <div className="mb-4 font-semibold text-slate-900">Amenities</div>
              <div className="flex flex-wrap gap-3">
                {amenityOptions.map((a) => (
                  <label
                    key={a}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(a)}
                      onChange={() => toggleAmenity(a)}
                      className="h-4 w-4 accent-[#d48806]"
                    />
                    <span>{a}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {showAmenityInput && (
                  <Input
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Add amenity"
                    className="w-full sm:w-64 h-10 px-2 text-xs border-slate-200"
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
                  className="bg-[#fff7e6] text-[#d48806] border border-[#d48806] px-3 h-10"
                  onClick={addAmenity}
                >
                  Add <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div>
              <div className="mb-3 font-semibold text-slate-900">Units</div>
              <div className="space-y-3">
                {units.length === 0 && (
                  <div className="text-sm text-slate-500">
                    No units added yet. Click "Add Units" to add units.
                  </div>
                )}

                {units.map((unit, idx) => (
                  <div
                    key={unit.id}
                    className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 border border-slate-200 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-white border flex items-center justify-center text-[#d48806]">
                        🏢
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {unit.unitNumber || `Unit ${idx + 1}`}
                        </div>
                        <div className="text-xs text-green-500 font-medium mt-1">
                          Available from{" "}
                          {unit.availabilityDate
                            ? new Date(
                                unit.availabilityDate,
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold">
                        {unit.price ? `$${unit.price}` : "-"}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <Button
                type="button"
                className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#DD8800] text-white font-medium hover:bg-[#c97a00] transition-colors"
                onClick={() => setIsUnitsModalOpen(true)}
              >
                Add Units
              </Button>
            </div>

            <PropertyUnitsModal
              open={isUnitsModalOpen}
              onOpenChange={setIsUnitsModalOpen}
              savedUnits={units}
              onSave={(newUnits) => setUnits(newUnits)}
              sizeOptions={sizeOptions}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-2 font-medium">Property Name</div>
              <Input
                value={propertyName}
                className="h-[56px]"
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="Enter property name"
              />
            </div>
            <div>
              <div className="mb-2 font-medium">City</div>
              <Input
                value={city}
                className="h-[56px]"
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div>
              <div className="mb-2 font-medium">State</div>
              <Input
                value={state}
                className="h-[56px]"
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
              />
            </div>
            <div>
              <div className="mb-2 font-medium">Zip Code</div>
              <Input
                value={zipCode}
                className="h-[56px]"
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zipCode"
              />
            </div>

            <div>
              <div className="mb-2 font-medium">Availability Date</div>
              <Input
                value={availabilityDate}
                className="h-[56px]"
                onChange={(e) => setAvailabilityDate(e.target.value)}
                placeholder="Select date"
                type="date"
              />
            </div>

            <div>
              <div className="mb-2 font-medium">Country</div>
              <Input
                value={country}
                className="h-[56px]"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter country"
              />
            </div>

            <div className="">
              <div>
                <div className="mb-2 font-medium">Price</div>
                <Input
                  value={price}
                  className="h-[56px]"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  type="number"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 font-medium">Location</div>
              <Input
                value={location}
                className="h-[56px]"
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Maple Grove 42 Elm St, Austin, TX"
              />
              <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 h-32 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
                Map Placeholder
              </div>
            </div>

            <div>
              <div className="mb-2 font-medium">Property Status</div>
              <Select value={propertyStatus} onValueChange={setPropertyStatus}>
                <SelectTrigger className="w-full h-[56px]!">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="mb-2 font-medium">Description</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d48806] focus:border-[#d48806] min-h-[96px]"
                placeholder="Enter a description of the property"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
