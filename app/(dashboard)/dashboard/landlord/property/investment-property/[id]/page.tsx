"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileIcon from "@/public/icons/file";
import { useGetSingleInvestmentApartmentsQuery } from "@/redux/features/landlord/property/propertyApi";
import { LucideWatch, MessageCircle, Plus, Upload, Users } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";

/* ------------------------------------------------------------------ */
/*  Types — mirror the real API response you shared                   */
/* ------------------------------------------------------------------ */

interface Attachment {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  type: string;
  size: number; // bytes
  file: string; // url
  file_alt: string;
  investmentApartmentId: string | null;
  apartmentId: string | null;
  messageId: string | null;
}

interface InvestmentDetails {
  id: string;
  apartmentId: string | null;
  totalFoundGoal: string;
  autoRenue: boolean;
  maximumInvest: string;
  minimumInvest: string;
  annualReturnRate: string;
  investmentAmount: string;
  aquisitionCost: string;
  profitShare: string;
  lockInPeriod: string;
  doccument: string;
  sold: boolean;
  renovationCost: string;
  totalProjectCost: string;
  projectSellPrice: string;
  profit: string;
  firstLineHolder: boolean;
  startDate: string;
  completionDate: string;
  investmentApartmentId: string;
}

interface Apartment {
  id: string;
  name: string;
  location: string;
  investmentType: string;
  images: string[];
  investmentDetails: InvestmentDetails;
  attachments: Attachment[];
}

interface FundingOverview {
  totalFunded: number;
  totalFoundGoal: number;
  fundedPercentage: number;
  investorCount: number;
  annualReturnRate: number;
  lockInPeriod: string;
}

interface ActiveSummary {
  firstLineHolder: boolean;
  profitShare: string;
  estimatedDuration: string;
  lockInPeriod: string;
  investmentAmount: string;
  startDate: string;
  projectEnd: string;
  lockInEnds: string;
  exitCondition: string;
  totalFunded: number;
  totalFoundGoal: number;
  fundedPercentage: number;
  investorCount: number;
}

interface ApartmentCheckoutData {
  id: string;
  amount: string;
  type: string;
  status: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
  apartment: Apartment;
  fundingOverview: FundingOverview;
  activeSummary: ActiveSummary;
}

interface ApartmentCheckoutResponse {
  success: boolean;
  message: string;
  data: ApartmentCheckoutData;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const formatCurrency = (value?: string | number) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num === undefined || num === null || isNaN(num)) return "$0";
  return `$${num.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatBytes = (bytes?: number) => {
  if (!bytes) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

/* ------------------------------------------------------------------- */
/*  Plain value display (no <Input>) — used wherever data is read-only */
/* ------------------------------------------------------------------- */

function ValueField({ value }: { value: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 bg-gray-50">
      {value}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image gallery — renders the real images from apartment.images     */
/* ------------------------------------------------------------------ */

function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        No images available
      </div>
    );
  }

  return (
    <div>
      <img
        src={images[active]}
        alt="Property"
        className="w-full h-64 object-cover rounded-lg"
      />
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Property thumbnail ${idx + 1}`}
              onClick={() => setActive(idx)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                idx === active ? "border-[#d48806]" : "border-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function PropertyDetails() {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetSingleInvestmentApartmentsQuery(id) as {
    data?: ApartmentCheckoutResponse;
    isLoading: boolean;
    isError: boolean;
  };

  const payload = response?.data;
  const apartment = payload?.apartment;
  const investmentDetails = apartment?.investmentDetails;
  const fundingOverview = payload?.fundingOverview;
  const activeSummary = payload?.activeSummary;
  const attachments = apartment?.attachments ?? [];
  const images = apartment?.images ?? [];

  const isActive = apartment?.investmentType === "active";

  const [isSold, setIsSold] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm();

  // Keep the "sold" checkbox and form defaults in sync with real API data
  useEffect(() => {
    if (investmentDetails) {
      setIsSold(investmentDetails.sold);
      reset({
        acquisitionCost: investmentDetails.aquisitionCost,
        renovationCost: investmentDetails.renovationCost,
        totalProjectCost: investmentDetails.totalProjectCost,
        projectedSalePrice: investmentDetails.projectSellPrice,
        profit: investmentDetails.profit,
      });
    }
  }, [investmentDetails, reset]);

  const handleAddTitle = () => {
    if (titleInput.trim()) {
      setTitles([...titles, titleInput.trim()]);
      setTitleInput("");
      setShowTitleInput(false);
    }
  };

  // TODO: wire this up to your update/mutation endpoint to persist changes
  const onSubmit = (formData: FieldValues) => {
    formData.titles = titles.map(
      (title, idx) => formData[`title_${idx}`] || "",
    );
    console.log("Investment summary submitted:", formData);
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        Loading property details...
      </div>
    );
  }

  if (isError || !payload || !apartment) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-red-500">
        Unable to load property details.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
        {/* Left column */}
        <div>
          {/* Images */}
          <ImageGallery images={images} />

          {/* Quick facts (from real investment details) */}
          <div className="space-y-3 mt-4">
            <h1 className="font-medium">Investment Timeline</h1>
            <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-calendar" /> Start:{" "}
                {formatDate(investmentDetails?.startDate)}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-calendar-check" /> Completion:{" "}
                {formatDate(investmentDetails?.completionDate)}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-lock" /> Lock-In:{" "}
                {investmentDetails?.lockInPeriod ?? "-"}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                <i className="fa fa-percent" /> ROI:{" "}
                {investmentDetails?.annualReturnRate ?? "-"}%
              </span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Investors summary (real data — only aggregate count is available) */}
          <InvestorSummary
            investorCount={fundingOverview?.investorCount ?? 0}
            firstLineHolder={
              activeSummary?.firstLineHolder ??
              investmentDetails?.firstLineHolder
            }
          />

          <div>
            <div className="mb-2 font-medium">Property Name</div>
            <ValueField value={apartment.name} />
          </div>

          {/* Location */}
          <div>
            <div className="mb-2 font-medium">Location</div>
            <ValueField value={apartment.location} />
            <div className="mt-2 rounded-lg overflow-hidden border h-32 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
              {/* Map placeholder — no coordinates provided by the API */}
              <span>Map Placeholder</span>
            </div>
          </div>

          {/* Investment Status */}
          <div>
            <div className="mb-2 font-medium">Investment Status</div>
            <ValueField
              value={
                apartment.investmentType.charAt(0).toUpperCase() +
                apartment.investmentType.slice(1)
              }
            />
          </div>

          {/* Property Sale Status */}
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
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="mb-2">Acquisition Cost</div>
                          <Input {...register("acquisitionCost")} />
                        </div>
                        <div>
                          <div className="mb-2">Renovation Cost</div>
                          <Input {...register("renovationCost")} />
                        </div>
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
                        setIsSold(investmentDetails?.sold ?? false);
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
        </div>
      </div>

      {/* Investment Details */}
      <div className="p-6 bg-white rounded-xl mt-5">
        <div className="space-y-5">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Investment Value Increase Ratio */}
              <div>
                <div className="text-xl font-medium mb-3">
                  Investment Value Increase Ratio
                </div>
                <div className="mb-4 border border-gray-200 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 mt-1">
                      {formatCurrency(fundingOverview?.totalFunded)}
                    </span>
                    <span className="text-sm text-gray-600 mt-1">
                      {formatCurrency(fundingOverview?.totalFoundGoal)}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-300 h-2 rounded-full">
                      <div
                        className="bg-[#D80] h-2 rounded-full"
                        style={{
                          width: `${Math.min(fundingOverview?.fundedPercentage ?? 0, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {fundingOverview?.fundedPercentage ?? 0}% Funded
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="bg-[#FCF1E6] flex gap-2 px-4 py-2 rounded-xl text-[#C9631E]">
                    <LucideWatch />
                    {fundingOverview?.investorCount ?? 0} investor
                    {(fundingOverview?.investorCount ?? 0) === 1
                      ? ""
                      : "s"}{" "}
                    have funded this property
                  </div>
                </div>

                <div className="flex justify-between border border-gray-200 px-4 py-5 rounded-xl">
                  <div className="text-[#707070] flex flex-col">
                    <span>Annual ROI</span>
                    <span>Lock-In Period</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span>
                      {investmentDetails?.annualReturnRate ??
                        fundingOverview?.annualReturnRate}
                      %
                    </span>
                    <span>
                      {investmentDetails?.lockInPeriod ??
                        fundingOverview?.lockInPeriod}
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimum / Maximum Invest */}
              <div className="mt-9.5">
                {isActive ? (
                  <div className="flex gap-5">
                    <div className="flex-1">
                      <div className="mb-2 font-medium">Minimum Invest</div>
                      <ValueField
                        value={formatCurrency(investmentDetails?.minimumInvest)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 font-medium">Maximum Invest</div>
                      <ValueField
                        value={formatCurrency(investmentDetails?.maximumInvest)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200 text-center p-6 rounded-xl space-y-2">
                    <h1 className="text-gray-400">Investment amount</h1>
                    <div className="space-x-3">
                      <span className="font-medium">
                        {formatCurrency(investmentDetails?.investmentAmount)}
                      </span>
                      <span className="px-3 py-1 border border-[#04A755] bg-[#CDFDC6] text-[#04A755] rounded-md">
                        {investmentDetails?.annualReturnRate}%
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Profit share{" "}
                      <span className="font-medium text-black">
                        {investmentDetails?.profitShare}%
                      </span>
                    </p>
                    <div className="flex gap-5">
                      <div className="flex-1">
                        <div className="mb-2 font-medium">Minimum Invest</div>
                        <ValueField
                          value={formatCurrency(
                            investmentDetails?.minimumInvest,
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 font-medium">Maximum Invest</div>
                        <ValueField
                          value={formatCurrency(
                            investmentDetails?.maximumInvest,
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Investment Summary (real cost/profit breakdown from investmentDetails) */}
          {investmentDetails && (
            <div className="bg-[#F5F5F5] flex items-center justify-center rounded-lg">
              <div className="rounded-lg p-6 w-full space-y-4">
                <h1 className="font-semibold">Investment Summary</h1>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="mb-2 text-sm text-gray-500">
                      Acquisition Cost
                    </div>
                    <ValueField
                      value={formatCurrency(investmentDetails.aquisitionCost)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-gray-500">
                      Renovation Cost
                    </div>
                    <ValueField
                      value={formatCurrency(investmentDetails.renovationCost)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-gray-500">
                      Total Project Cost
                    </div>
                    <ValueField
                      value={formatCurrency(investmentDetails.totalProjectCost)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-gray-500">
                      Projected Sale Price
                    </div>
                    <ValueField
                      value={formatCurrency(investmentDetails.projectSellPrice)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-gray-500">Profit</div>
                    <ValueField
                      value={formatCurrency(investmentDetails.profit)}
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-gray-500">Sold</div>
                    <ValueField value={investmentDetails.sold ? "Yes" : "No"} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Strategy + FAQ (static informational content, not tied to API data) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      This investment listing reflects live data pulled directly
                      from the apartment record, including funding progress,
                      ROI, and lock-in terms.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="border px-3 rounded-xl"
                >
                  <AccordionTrigger>Lock-In & Exit</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Lock-in period: {investmentDetails?.lockInPeriod ?? "-"}
                    </p>
                    <p>Exit condition: {activeSummary?.exitCondition ?? "-"}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-3"
                  className="border px-3 rounded-xl"
                >
                  <AccordionTrigger>Timeline</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                      Start date: {formatDate(investmentDetails?.startDate)}
                    </p>
                    <p>
                      Estimated duration:{" "}
                      {activeSummary?.estimatedDuration ?? "-"}
                    </p>
                    <p>Project end: {formatDate(activeSummary?.projectEnd)}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section — real attachments from the API */}
      <div className="mt-5 space-y-4 bg-white p-4 rounded-xl">
        <h3 className="text-lg font-medium">Documents</h3>
        <div className="flex flex-wrap gap-4">
          {attachments.length === 0 && (
            <div className="text-sm text-gray-400">No documents uploaded.</div>
          )}
          {attachments.map((doc) => (
            <a
              key={doc.id}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center bg-white p-3 rounded shadow text-gray-600 hover:bg-gray-50"
            >
              <FileIcon />
              <div>
                <div className="text-sm">{doc.name}</div>
                <div className="text-xs">{formatBytes(doc.size)}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static, non-API marketing copy — left in place intentionally      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Investor summary — only aggregate data is available from the API  */
/*  (no individual investor names/avatars/phone numbers are returned) */
/* ------------------------------------------------------------------ */

function InvestorSummary({
  investorCount,
  firstLineHolder,
}: {
  investorCount: number;
  firstLineHolder?: boolean;
}) {
  return (
    <div className="bg-[#fff7e6] rounded-xl px-4 py-3 flex items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-3">
        <div className="bg-[#ffe7ba] rounded-full p-2">
          <Users className="w-5 h-5 text-[#d48806]" />
        </div>
        <div>
          <div className="font-semibold text-base">
            {investorCount} Investor{investorCount === 1 ? "" : "s"}
          </div>
          {firstLineHolder && (
            <div className="text-xs text-gray-600">
              You are the first-line holder
            </div>
          )}
        </div>
      </div>
      <button className="bg-[#fff2cc] rounded-full p-2 hover:bg-[#ffe7ba] transition">
        <MessageCircle className="w-5 h-5 text-[#d48806]" />
      </button>
    </div>
  );
}
