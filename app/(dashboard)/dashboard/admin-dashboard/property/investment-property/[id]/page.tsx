"use client";

import PropertyImage from "@/app/(dashboard)/dashboard/_components/property-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileIcon from "@/public/icons/file";
import {
  LucideWatch,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const strategy = [
  {
    title: "Early Withdrawal Policy",
    desc: "15% penalty if withdrawn before lock-in ends",
  },
  {
    title: "Investment Return Policy",
    desc: "The app automatically distributes monthly returns to the investor's account. Investor can withdraw monthly earnings or reinvest.",
  },
  {
    title: "Smart Investment Opportunities",
    desc: "Discover high-potential assets tailored to your financial goals. Track performance, diversify risk, and grow your portfolio confidently.",
  },
  {
    title: "Investor Insights",
    desc: "Access real-time data, personalized reports, and expert analysis to make informed decisions.",
  },
  {
    title: "Flexible Leasing Options",
    desc: "Simplify asset management with customizable lease plans. View terms, manage contracts, and stay ahead with automated reminders.",
  },
];

const investors = [
  {
    name: "Esther Howard",
    phone: "+1 555-123-7890",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    highlight: true,
  },
  {
    name: "Darlene Robertson",
    phone: "+1 555-123-7890",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Lila Thompson",
    phone: "+1 555-123-7890",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    name: "Bessie Cooper",
    phone: "+1 555-123-7890",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
];

const investor = {
  name: "Johan Mitchell",
  phone: "+1 555-123-7890",
  email: "johan@email.com",
  avatar: "https://randomuser.me/api/portraits/men/44.jpg",
};

export default function PropertyDetails() {
  const isActive = true;
  const [isSold, setIsSold] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [formState, setFormState] = useState({
    acquisitionCost: "",
    renovationCost: "",
    totalProjectCost: "",
    projectedSalePrice: "",
    profit: "",
    titles: [],
  });
  console.log(formState?.acquisitionCost);

  const { register, handleSubmit } = useForm();

  // Add new title
  const handleAddTitle = () => {
    if (titleInput.trim()) {
      setTitles([...titles, titleInput.trim()]);
      setTitleInput("");
      setShowTitleInput(false);
    }
  };

  // On form submit, store all data in state
  const onSubmit = (data) => {
    data.titles = titles.map((title, idx) => data[`title_${idx}`] || "");
    setFormState(data);
    setShowModal(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
        {/* Left column */}
        <div>
          {/* Image */}
          <PropertyImage />
          {/* Video */}
          <div className="space-y-3">
            <h1 className="font-medium">Property Virtual Video</h1>
            <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-bed" /> {1} Beds
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-bath" /> {5} Baths
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-calendar" /> {2} Year
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-building" /> {5} Floor
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-expand" /> {3} sq ft
              </span>
            </div>
          </div>
          <div>
            <h1 className="font-medium">Amenities</h1>
            <span className="flex items-center gap-1 text-gray-500 rounded px-2 py-1">
              <i className="fa fa-expand" />
              Parking
            </span>
            <span className="flex items-center gap-1 text-gray-500 rounded px-2 py-1">
              <i className="fa fa-expand" />
              Gym Access
            </span>
            <span className="flex items-center gap-1 text-gray-500 rounded px-2 py-1">
              <i className="fa fa-expand" />
              Balcony
            </span>
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Investors Card */}

          {isActive ? (
            <div>
              <SingleInvestor />
            </div>
          ) : (
            <div className="space-y-4 bg-white rounded-xl w-full">
              <InvestorsCard />
            </div>
          )}

          <div>
            <div className="mb-2 font-medium">Property Name</div>
            <Input placeholder="Enter you name" className="" />
          </div>
          {/* Location */}
          <div>
            <div className="mb-2 font-medium">Location</div>
            <Input placeholder="Maple Grove 42 Elm St, Austin, TX" />
            <div className="mt-2 rounded-lg overflow-hidden border h-32 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
              {/* Map placeholder */}
              <span>Map Placeholder</span>
            </div>
          </div>
          {/* Investment Status */}
          <div>
            <div className="mb-2 font-medium">Investment Status</div>
            <Input defaultValue={"Passive"} />
          </div>
          {/* Property Sale Status */}
          {isActive && (
            <div>
              <div className="mb-2 font-medium">Property Sale Status</div>
              <div className="mb-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lien"
                  className="accent-[#d48806] w-4 h-4"
                  checked={isSold}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setIsSold(checked);
                    if (checked) setShowModal(true);
                  }}
                />
                <label htmlFor="lien" className="text-sm font-medium">
                  Sold
                </label>
              </div>
              {/* Modal */}
              {showModal && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                >
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl w-full space-y-4">
                    <div className="space-y-4">
                      <h1 className="font-semibold">Add Investment Summary</h1>
                      <div>
                        {/* input */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="mb-2">Acquisition Cost</div>
                            <Input
                              {...register("acquisitionCost")}
                              placeholder="$50,000"
                            />
                          </div>
                          <div>
                            <div className="mb-2">Renovation Cost</div>
                            <Input
                              {...register("renovationCost")}
                              placeholder="$25,000"
                            />
                          </div>
                          {/* ======Show added titles as label + input */}
                          {titles.map((title, idx) => (
                            <div key={idx} className="mt-2">
                              <span className="w-full">{title}</span>
                              <Input
                                className="flex-1 mt-2"
                                placeholder={`Enter ${title}`}
                                {...register(`title_${idx}`)}
                              />
                            </div>
                          ))}
                        </div>
                        {/* Title Add Feature ====*/}
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
                                    handleAddTitle();
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                size="sm"
                                className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] w-[75px] px-2 h-8 cursor-pointer"
                                onClick={handleAddTitle}
                              >
                                Add <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2">Total Project Cost</div>
                        <Input
                          {...register("totalProjectCost")}
                          placeholder="$75,000"
                        />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="mb-2">Projected Sale Price</div>
                          <Input
                            {...register("projectedSalePrice")}
                            placeholder="$150,000"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2">Profit</div>
                          <Input
                            {...register("profit")}
                            placeholder="$75,000"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium">
                          Upload Documents
                        </label>
                        <label
                          htmlFor="file-upload"
                          className="w-full lg:w-[350px] border-2 border-dashed border-gray-300 rounded-lg bg-white text-center py-8 cursor-pointer flex flex-col items-center justify-center"
                        >
                          <Upload className="w-6 h-6 mb-2 text-gray-700" />
                          <span className="font-medium text-gray-800">
                            Upload Image
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            Format: JPG, PNG, PDF (10 mb max/size)
                          </span>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            {...register("file")}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 rounded bg-[#d48806] text-white cursor-pointer"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-gray-200 cursor-pointer"
                        type="button"
                        onClick={() => {
                          setIsSold(false);
                          setShowModal(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Investment Details */}
      <div className="p-6 bg-white rounded-xl mt-5">
        <div className=" space-y-5">
          {/* top column */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Investment Value Increase Ratio */}
              <div>
                {/* Investment Value */}
                <div className="text-xl font-medium mb-3">
                  Investment Value Increase Ratio
                </div>
                <div className="mb-4 border border-gray-200 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 mt-1">
                      $130,000.00
                    </span>
                    <span className="text-sm text-gray-600 mt-1">
                      $150,000.00
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-300 h-2 rounded-full ">
                      <div
                        className="bg-[#D80] h-2 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">80% Funded</span>
                    <div className="text-xs text-gray-400">
                      60K was invested in the past 24 hours
                    </div>
                  </div>
                </div>
                {/* watch */}
                <div className="mb-4">
                  <div className="bg-[#FCF1E6] flex gap-2 px-4 py-2 rounded-xl text-[#C9631E]">
                    <LucideWatch /> 60K was invested in the past 24 hours
                  </div>
                </div>
                {/*  */}
                <div className="flex justify-between border border-gray-200 px-4 py-5 rounded-xl">
                  <div className="text-[#707070] flex flex-col">
                    <span>Annual ROI</span>
                    <span>Lock-In Period</span>
                  </div>
                  <div className="flex flex-col">
                    <span>6% (Paid Monthly)</span>
                    <span>12 Months</span>
                  </div>
                </div>
              </div>

              {/* Minimum Invest or  */}
              <div className="mt-9.5">
                {isActive ? (
                  <div className="flex-1">
                    <div className="mb-2 font-medium">Minimum Invest</div>
                    <Input placeholder="$5,000" />
                  </div>
                ) : (
                  <div className="border border-gray-200 text-center p-6 rounded-xl space-y-2">
                    <h1 className="text-gray-400">
                      Investment value in 1 year increases
                    </h1>
                    <div className="space-x-3">
                      <span className="font-medium">$5,334.93</span>
                      <span className="px-3 py-1 border border-[#04A755] bg-[#CDFDC6] text-[#04A755] rounded-md">
                        6%
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Annual income{" "}
                      <span className="font-medium text-black">$334.93</span>
                    </p>
                    {/* Minimum & Maximum Invest */}
                    <div className="flex gap-5">
                      <div className="flex-1">
                        <div className="mb-2 font-medium">Minimum Invest</div>
                        <Input placeholder="$5,000" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 font-medium">Maximum Invest</div>
                        <Input placeholder="$1200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* middle column */}
          {isActive && formState?.acquisitionCost && (
            <div className=" bg-[#F5F5F5] flex items-center justify-center z-50 rounded-lg">
              <div className="rounded-lg p-6 w-full space-y-4">
                <div className="space-y-4">
                  <h1 className="font-semibold">Add Investment Summary</h1>
                  <div>
                    {/* input */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="mb-2">Acquisition Cost</div>
                        <Input {...register("acquisitionCost")} />
                      </div>
                      <div>
                        <div className="mb-2">Renovation Cost</div>
                        <Input {...register("renovationCost")} />
                      </div>
                      {/* Show added titles as label + input */}
                      {titles.map((title, idx) => (
                        <div key={idx} className="mt-2">
                          <span className="w-full">{title}</span>
                          <Input
                            className="flex-1 mt-2"
                            {...register(`title_${idx}`)}
                          />
                        </div>
                      ))}
                    </div>
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
                                handleAddTitle();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            size="sm"
                            className="bg-[#fff7e6] hover:bg-[#fff7e6] text-[#d48806] border border-[#d48806] w-[75px] px-2 h-8 cursor-pointer"
                            onClick={handleAddTitle}
                          >
                            Add <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">Total Project Cost</div>
                    <Input {...register("totalProjectCost")} />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <div className="mb-2">Projected Sale Price</div>
                      <Input {...register("projectedSalePrice")} />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">Profit</div>
                      <Input {...register("profit")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* button column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Investment Strategy */}
            <div>
              <h1 className="my-4 font-semibold">Investment Strategy</h1>
              {strategy.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-3 mb-2"
                >
                  <div className="font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              ))}
            </div>
            <div>
              <span className="font-semibold">FAQ</span>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-2"
                defaultValue="item-1"
              >
                <AccordionItem
                  value="item-1"
                  className="border px-3 rounded-xl"
                >
                  <AccordionTrigger>Product Information</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Our flagship product combines cutting-edge technology with
                      sleek design. Built with premium materials, it offers
                      unparalleled performance and reliability.
                    </p>
                    <p>
                      Key features include advanced processing capabilities, and
                      an intuitive user interface designed for both beginners
                      and experts.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="border px-3 rounded-xl"
                >
                  <AccordionTrigger>Shipping Details</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      We offer worldwide shipping through trusted courier
                      partners. Standard delivery takes 3-5 business days, while
                      express shipping ensures delivery within 1-2 business
                      days.
                    </p>
                    <p>
                      All orders are carefully packaged and fully insured. Track
                      your shipment in real-time through our dedicated tracking
                      portal.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-3"
                  className="border px-3 rounded-xl"
                >
                  <AccordionTrigger>Return Policy</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      We stand behind our products with a comprehensive 30-day
                      return policy. If you&apos;re not completely satisfied,
                      simply return the item in its original condition.
                    </p>
                    <p>
                      Our hassle-free return process includes free return
                      shipping and full refunds processed within 48 hours of
                      receiving the returned item.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-4"
                  className="border px-3 rounded-xl"
                >
                  <AccordionTrigger>Shipping Details</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      We offer worldwide shipping through trusted courier
                      partners. Standard delivery takes 3-5 business days, while
                      express shipping ensures delivery within 1-2 business
                      days.
                    </p>
                    <p>
                      All orders are carefully packaged and fully insured. Track
                      your shipment in real-time through our dedicated tracking
                      portal.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      {/* Documents Section */}
      <div className="mt-5 space-y-4 bg-white p-4 rounded-xl">
        <h3 className="text-lg font-medium">Documents</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2 items-center bg-white p-3 rounded shadow text-gray-600">
            <FileIcon />
            <div>
              <div className="text-sm">Lease Agreement</div>
              <div className="text-xs">12 MB</div>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-3 rounded shadow text-gray-600">
            <FileIcon />
            <div>
              <div className="text-sm">ID Verification</div>
              <div className="text-xs">10 MB</div>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-3 rounded shadow text-gray-600">
            <FileIcon />
            <div>
              <div className="text-sm">Proof of Income</div>
              <div className="text-xs">15 MB</div>
            </div>
          </div>
          <div className="flex gap-2 items-center bg-white p-3 rounded shadow text-gray-600">
            <FileIcon />
            <div>
              <div className="text-sm">Pay Receipts</div>
              <div className="text-xs">18 MB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestorsCard() {
  return (
    <div className="rounded-xl shadow border bg-white w-full">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#fff7e6] rounded-t-xl">
        <div className="flex -space-x-2">
          {investors.slice(0, 3).map((inv, i) => (
            <img
              key={i}
              src={inv.avatar}
              alt={inv.name}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <span className="ml-3 font-medium text-gray-700 text-base">
          120 Investors
        </span>
      </div>
      {/* List */}
      <div className="max-h-60 overflow-y-auto">
        {investors.map((inv, i) => (
          <div
            key={i}
            className={`flex items-center px-4 py-3 gap-3 border-b last:border-b-0 ${
              i === 0 ? "bg-[#fff7e6]" : ""
            }`}
          >
            <img
              src={inv.avatar}
              alt={inv.name}
              className="w-9 h-9 rounded-full"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">{inv.name}</div>
              <div className="text-xs text-gray-500">{inv.phone}</div>
            </div>
            <button>
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SingleInvestor() {
  return (
    <div className="bg-[#fff7e6] rounded-xl px-4 py-3 flex flex-col gap-1 w-full">
      <div className="text-xs text-gray-500 mb-1">Invested by</div>
      <div className="flex items-center gap-3">
        <img
          src={investor.avatar}
          alt={investor.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="font-semibold text-base">{investor.name}</div>
          <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-[#d48806]" />
              {investor.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-[#d48806]" />
              {investor.email}
            </span>
          </div>
        </div>
        <button className="ml-2 bg-[#fff2cc] rounded-full p-2 hover:bg-[#ffe7ba] transition">
          <MessageCircle className="w-5 h-5 text-[#d48806]" />
        </button>
      </div>
    </div>
  );
}
