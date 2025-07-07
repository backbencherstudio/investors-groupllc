"use client";

import PropertyImage from "@/app/(dashboard)/dashboard/_components/property-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import React, { useState } from "react";

export default function PropertyDetails() {
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
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  function toggleAmenity(a: string) {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
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

  return (
    <div className="p-6 q">
      <form>
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 flex flex-col md:flex-row justify-start items-center gap-2">
            <span>Property List</span>
            <span className="mx-1">&gt;</span>
            <span className="text-gray-900 font-medium">Property Details</span>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="submit"
              className="bg-[#DD8800] hover:bg-[#b97d05] text-white rounded-lg px-6 py-3"
            >
              Saved
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <div>
              <PropertyImage />
            </div>
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
                  className="hidden"
                  onChange={(e) =>
                    console.log("Image selected:", e.target.files?.[0])
                  }
                />
              </label>
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
                  onChange={(e) =>
                    console.log("Video selected:", e.target.files?.[0])
                  }
                />
              </label>
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
                    onClick={() => setSelectedSize(size)}
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
                      onClick={() => setBed(Math.max(1, bed - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{bed}</span>
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
                <div>
                  <div className="font-semibold mb-1">Bath Room</div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setBath(Math.max(1, bath - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{bath}</span>
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
                      onClick={() => setFloor(Math.max(1, floor - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{floor}</span>
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
                <div>
                  <div className="font-semibold mb-1">Property Age</div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="px-2"
                      onClick={() => setAge(Math.max(1, age - 1))}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">{age}</span>
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
              <Input placeholder="Enter you name" className="" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="mb-2 font-medium">Price</div>
                <Input placeholder="Enter Price" />
              </div>
              <div className="">
                <div className="mb-2 font-medium">&nbsp;</div>
                <Select defaultValue="USD">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="mb-2 font-medium">Location</div>
              <Input placeholder="Maple Grove 42 Elm St, Austin, TX" />
              <div className="mt-2 rounded-lg overflow-hidden border h-32 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
                {/* Map placeholder */}
                <span>Map Placeholder</span>
              </div>
            </div>
            <div>
              <div className="mb-2 font-medium">Property Status</div>
              <Select defaultValue="For Rent">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="For Rent" />
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
                placeholder="Enter a description of the property"
                rows={4}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d48806] focus:border-[#d48806] min-h-[96px]"
              />
            </div>
            <div>
              <div className="mb-2 font-medium">
                Automatic Lease Agreement Generation
              </div>
              <Input placeholder="Enter your lease agreement generation" />
            </div>
            <div>
              <div className="mb-2 font-medium">No Credit Impact</div>
              <Input placeholder="Enter" />
            </div>
            {/* Show added titles as label + input */}
            {titles.map((title, idx) => (
              <div key={idx} className="mt-2">
                <span className="font-semibold w-full">{title}</span>
                <Input className="flex-1 mt-2" placeholder={`Enter ${title}`} />
              </div>
            ))}
            {/* Title Add Feature */}
            <div className="mt-4">
              {!showTitleInput ? (
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] w-[75px] px-2 h-8 cursor-pointer"
                  onClick={() => setShowTitleInput(true)}
                >
                  Add <Plus className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="Title"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="w-40 h-8 px-2 text-xs border-gray-200"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (titleInput.trim()) {
                          setTitles([...titles, titleInput.trim()]);
                          setTitleInput("");
                          setShowTitleInput(false);
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] w-[75px] px-2 h-8 cursor-pointer"
                    onClick={() => {
                      if (titleInput.trim()) {
                        setTitles([...titles, titleInput.trim()]);
                        setTitleInput("");
                        setShowTitleInput(false);
                      }
                    }}
                  >
                    Add <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
