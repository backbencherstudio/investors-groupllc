"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FileIcon from "@/public/icons/file";
import {
  LucideWatch,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import React from "react";
import { useGetSingleInvestmentPropertyQuery } from "@/redux/features/apartments/apartmentsApi";
import type {
  InvestmentApartmentItem,
  Investor,
} from "@/redux/features/apartments/apartmentsDetailsTypes";
import { useParams } from "next/navigation";

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Helper function to get full image URL
const getImageUrl = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/uploads/${url}`;
};

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: propertyData,
    isLoading,
    error,
    isError,
  } = useGetSingleInvestmentPropertyQuery(id, {
    skip: !id,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d48806]"></div>
      </div>
    );
  }

  // Error state
  if (isError || !propertyData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        Error loading property details. Please try again.
      </div>
    );
  }

  // No ID provided
  if (!id) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-600">
        Property ID not provided.
      </div>
    );
  }

  // Destructure data with fallbacks
  const investmentType = propertyData.investmentType || "passive" ;
  const isActive = investmentType.toLowerCase() === "active";
  const investmentDetails = propertyData.investmentDetails?.[0];
  const images = propertyData.images || [];
  const strategies = propertyData.investmentStrategies || [];
  const faqs = propertyData.apartmentFAQs || [];
  const attachments = propertyData.attachments || [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow p-6">
        {/* Left column */}
        <div>
          {/* Images */}
          <div className="grid grid-cols-2 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                className={`relative ${index === 0 ? "col-span-2" : ""}`}
              >
                <img
                  src={getImageUrl(image.url)}
                  alt={`Property ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </div>
            ))}
            {images.length === 0 && (
              <div className="col-span-2 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                No images available
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-3 mt-4">
            <h1 className="font-medium text-lg">{propertyData.name || "Unnamed Property"}</h1>
            <p className="text-sm text-gray-600">{propertyData.description || "No description available"}</p>
            <div className="flex flex-wrap gap-2 text-gray-600 text-xs mb-2">
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                🛏 {propertyData.numberOfBedrooms || 0} Beds
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                🛁 {propertyData.numberOfBathrooms || 0} Baths
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                📅 {propertyData.propertyAge || 0} Year
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                🏢 {propertyData.numberOffloors || 0} Floor
              </span>
              <span className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                📐 {propertyData.propertySize || 0} sq ft
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <h1 className="font-medium mb-2">Amenities</h1>
            <div className="flex flex-wrap gap-2">
              {propertyData.amenities?.length > 0 ? (
                propertyData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 text-gray-600 bg-gray-50 rounded px-3 py-1 text-sm"
                  >
                    {amenity}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">No amenities listed</span>
              )}
            </div>
          </div>

          {/* Video */}
          {propertyData.video && (
            <div className="mt-4">
              <h1 className="font-medium mb-2">Property Virtual Video</h1>
              <video
                src={propertyData.video}
                controls
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Investors Card */}
          {isActive ? (
            <div>
              <SingleInvestor propertyData={propertyData} />
            </div>
          ) : (
            <div className="space-y-4 bg-white rounded-xl w-full">
              <InvestorsCard investors={propertyData.investments || []} />
            </div>
          )}

          {/* Property Name - Display only */}
          <div>
            <div className="mb-2 font-medium text-gray-700">Property Name</div>
            <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
              {propertyData.name || "N/A"}
            </div>
          </div>

          {/* Location - Display only */}
          <div>
            <div className="mb-2 font-medium text-gray-700">Location</div>
            <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
              {propertyData.location || "N/A"}
            </div>
            <div className="mt-2 rounded-lg overflow-hidden border h-32 flex items-center justify-center bg-gray-50 text-gray-400 text-xs">
              <span>📍 {propertyData.location || "Location not specified"}</span>
            </div>
          </div>

          {/* Investment Status - Display only */}
          <div>
            <div className="mb-2 font-medium text-gray-700">Investment Status</div>
            <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
              {propertyData.investmentType
                ? propertyData.investmentType.charAt(0).toUpperCase() +
                  propertyData.investmentType.slice(1)
                : "Passive"}
            </div>
          </div>

          {/* Property Sale Status - Display only */}
          {isActive && (
            <div>
              <div className="mb-2 font-medium text-gray-700">Property Sale Status</div>
              <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
                {investmentDetails?.sold ? "Sold" : "Available"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investment Details */}
      <div className="p-6 bg-white rounded-xl mt-5">
        <div className="space-y-5">
          {/* top column */}
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
                      ${investmentDetails?.aquisitionCost || "0"}
                    </span>
                    <span className="text-sm text-gray-600 mt-1">
                      ${investmentDetails?.projectSellPrice || "0"}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-full bg-gray-300 h-2 rounded-full">
                      <div
                        className="bg-[#D80] h-2 rounded-full"
                        style={{
                          width:
                            investmentDetails?.totalProjectCost &&
                            investmentDetails?.projectSellPrice
                              ? `${(parseFloat(investmentDetails.totalProjectCost) /
                                  parseFloat(
                                    investmentDetails.projectSellPrice
                                  )) *
                                  100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {investmentDetails?.totalProjectCost
                        ? `${Math.round(
                            (parseFloat(investmentDetails.totalProjectCost) /
                              parseFloat(
                                investmentDetails.projectSellPrice || "1"
                              )) *
                              100
                          )}% Funded`
                        : "0% Funded"}
                    </span>
                    <div className="text-xs text-gray-400">
                      {investmentDetails?.investmentAmount
                        ? `$${investmentDetails.investmentAmount} was invested`
                        : "No investments yet"}
                    </div>
                  </div>
                </div>

                {/* Alert */}
                <div className="mb-4">
                  <div className="bg-[#FCF1E6] flex gap-2 px-4 py-2 rounded-xl text-[#C9631E]">
                    <LucideWatch />
                    {investmentDetails?.investmentAmount
                      ? `$${investmentDetails.investmentAmount} was invested`
                      : "Waiting for investments"}
                  </div>
                </div>

                {/* ROI & Lock-in */}
                <div className="flex justify-between border border-gray-200 px-4 py-5 rounded-xl">
                  <div className="text-[#707070] flex flex-col">
                    <span>Annual ROI</span>
                    <span>Lock-In Period</span>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {investmentDetails?.annualReturnRate || "0%"} (Paid
                      Monthly)
                    </span>
                    <span>{investmentDetails?.lockInPeriod || "0"}</span>
                  </div>
                </div>
              </div>

              {/* Minimum Invest */}
              <div className="mt-9.5">
                {isActive ? (
                  <div className="flex-1">
                    <div className="mb-2 font-medium text-gray-700">Minimum Invest</div>
                    <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
                      ${investmentDetails?.minimumInvest || "0"}
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200 text-center p-6 rounded-xl space-y-2">
                    <h1 className="text-gray-400">
                      Investment value in 1 year increases
                    </h1>
                    <div className="space-x-3">
                      <span className="font-medium">
                        ${investmentDetails?.projectSellPrice || "0"}
                      </span>
                      <span className="px-3 py-1 border border-[#04A755] bg-[#CDFDC6] text-[#04A755] rounded-md">
                        {investmentDetails?.annualReturnRate || "0%"}
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Annual income{" "}
                      <span className="font-medium text-black">
                        $
                        {investmentDetails?.annualReturnRate &&
                        investmentDetails?.investmentAmount
                          ? (
                              (parseFloat(investmentDetails.annualReturnRate) /
                                100) *
                              parseFloat(investmentDetails.investmentAmount)
                            ).toFixed(2)
                          : "0"}
                      </span>
                    </p>
                    {/* Minimum & Maximum Invest */}
                    <div className="flex gap-5">
                      <div className="flex-1">
                        <div className="mb-2 font-medium text-gray-700">Minimum Invest</div>
                        <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
                          ${investmentDetails?.minimumInvest || "0"}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 font-medium text-gray-700">Maximum Invest</div>
                        <div className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800">
                          ${investmentDetails?.maximumInvest || "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Investment Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="my-4 font-semibold text-lg">
                Investment Strategy
              </h1>
              {strategies.length > 0 ? (
                strategies.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 mb-2"
                  >
                    <div className="font-semibold text-sm mb-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description?.map((desc, idx) => (
                        <div key={idx}>• {desc}</div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">
                  No investment strategies available
                </div>
              )}
            </div>

            <div>
              <span className="font-semibold text-lg">FAQ</span>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-2"
                defaultValue="item-1"
              >
                {faqs.length > 0 ? (
                  faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${index + 1}`}
                      className="border px-3 rounded-xl"
                    >
                      <AccordionTrigger>{faq.name}</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        {faq.description?.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm">
                    No FAQs available
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="mt-5 space-y-4 bg-white p-4 rounded-xl">
        <h3 className="text-lg font-medium">Documents</h3>
        <div className="flex flex-wrap gap-4">
          {attachments.length > 0 ? (
            attachments.map((doc) => (
              <div
                key={doc.id}
                className="flex gap-2 items-center bg-white p-3 rounded shadow text-gray-600 hover:shadow-md transition"
              >
                <FileIcon />
                <div>
                  <div className="text-sm">{doc.name}</div>
                  <div className="text-xs">{formatFileSize(doc.size)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">No documents available</div>
          )}
        </div>
      </div>
    </div>
  );
}

// Investors Card Component
function InvestorsCard({ investors }: { investors: Investor[] }) {
  const displayInvestors = investors.slice(0, 4);

  if (investors.length === 0) {
    return (
      <div className="rounded-xl shadow border bg-white w-full">
        <div className="px-4 py-3 bg-[#fff7e6] rounded-t-xl">
          <span className="font-medium text-gray-700 text-base">
            0 Investors
          </span>
        </div>
        <div className="p-6 text-center text-gray-400 text-sm">
          No investors yet
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow border bg-white w-full">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#fff7e6] rounded-t-xl">
        <div className="flex -space-x-2">
          {displayInvestors.slice(0, 3).map((inv, i) => (
            <img
              key={i}
              src={
                inv.avatar ||
                `https://randomuser.me/api/portraits/${
                  i % 2 === 0 ? "women" : "men"
                }/${i + 20}.jpg`
              }
              alt={inv.name || "Investor"}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
        <span className="ml-3 font-medium text-gray-700 text-base">
          {investors.length} Investors
        </span>
      </div>
      {/* List */}
      <div className="max-h-60 overflow-y-auto">
        {displayInvestors.map((inv, i) => (
          <div
            key={i}
            className={`flex items-center px-4 py-3 gap-3 border-b last:border-b-0 ${
              i === 0 ? "bg-[#fff7e6]" : ""
            }`}
          >
            <img
              src={
                inv.avatar ||
                `https://randomuser.me/api/portraits/${
                  i % 2 === 0 ? "women" : "men"
                }/${i + 30}.jpg`
              }
              alt={inv.name || "Investor"}
              className="w-9 h-9 rounded-full"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {inv.name || "Investor"}
              </div>
              <div className="text-xs text-gray-500">
                {inv.phone || "+1 555-123-7890"}
              </div>
            </div>
            <button>
              <MessageCircle className="w-5 h-5 text-gray-400 hover:text-[#d48806] transition" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Single Investor Component
function SingleInvestor({ propertyData }: { propertyData: InvestmentApartmentItem }) {
  const investor = propertyData.investments?.[0];

  if (!investor) {
    return (
      <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1 w-full">
        <div className="text-xs text-gray-500 mb-1">No investor yet</div>
        <div className="text-sm text-gray-400">
          Waiting for first investment
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff7e6] rounded-xl px-4 py-3 flex flex-col gap-1 w-full">
      <div className="text-xs text-gray-500 mb-1">Invested by</div>
      <div className="flex items-center gap-3">
        <img
          src={
            investor.avatar ||
            "https://randomuser.me/api/portraits/men/44.jpg"
          }
          alt={investor.name || "Investor"}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="font-semibold text-base">
            {investor.name || "Anonymous"}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-[#d48806]" />
              {investor.phone || "+1 555-123-7890"}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-[#d48806]" />
              {investor.email || "investor@email.com"}
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