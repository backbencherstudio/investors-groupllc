"use client";

import { useGetUserByIdQuery } from "@/redux/features/user/UserApi";
import { Mail, MessageCircle, MoreVertical, Phone } from "lucide-react";
import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { InvestmentPerformance } from "./investment-performance";
import Link from "next/link";
    
interface InvestorDetailsProps {
    id: string;
}

export default function InvestorDetails({ id }: InvestorDetailsProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: user, isLoading } = useGetUserByIdQuery(id as string);



    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Calculate active vs passive investments count
    const activeInvestments = user?.investedProperties?.filter(
        (prop: any) => prop.status === "active"
    ).length || 0;

    const pendingInvestments = user?.investedProperties?.filter(
        (prop: any) => prop.status === "pending"
    ).length || 0;

    // Prepare chart data from investment metrics
    const chartData = [
        { name: "Jan", value: 0 },
        { name: "Feb", value: 0 },
        { name: "Mar", value: 0 },
        { name: "Apr", value: user?.investmentMetrics?.investmentValue || 0 },
        { name: "May", value: user?.investmentMetrics?.investmentValue || 0 },
    ];

    if (isLoading) {
        return (
            <div className="p-4 flex justify-center items-center min-h-[400px]">
                <div className="text-neutral-500">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-4 flex justify-center items-center min-h-[400px]">
                <div className="text-red-500">Investor not found</div>
            </div>
        );
    }

    return (
        <div className="p-4">

            {/* Breadcrumb */}
            <div className="text-gray-400 mb-6">
                User Management &gt;{" "}
                <Link href="/dashboard/admin/user-manage">Investor</Link> &gt;{" "}
                <span className="text-black font-semibold text-[18px]">Details</span>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Section */}
                <div className="xl:col-span-8 bg-gray-50">
                    {/* Investor Card */}
                    <div className="bg-gray-50">
                        {/* Card */}
                        <div className="bg-white rounded-xl p-6 mb-6 relative shadow-sm">
                            <div className="flex items-start gap-4">
                                <img
                                    src={user.profile?.avatar || "/default-avatar.png"}
                                    className="rounded-full object-cover w-16 h-16"
                                    width={64}
                                    height={64}
                                    alt=""
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-bold text-xl text-neutral-900 mb-1 truncate">
                                                {user.profile?.name || "N/A"}
                                            </div>
                                            <div className="flex items-center gap-3 text-[15px] text-neutral-700">
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4 text-orange-500" />
                                                    {user.profile?.phone || "N/A"}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-4 h-4 text-orange-500" />
                                                    {user.profile?.email || "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 relative">
                                            <button
                                                className="bg-orange-500 hover:bg-orange-600 rounded-lg p-2 text-white cursor-pointer"
                                                title="Chat"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="bg-zinc-100 hover:bg-zinc-200 rounded-lg p-2 text-zinc-500 cursor-pointer"
                                                title="More"
                                                onClick={toggleDropdown}
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                            {showDropdown && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                                                    >
                                                        Edit
                                                    </a>
                                                    <div className="border-t border-dashed border-gray-200 my-1"></div>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                                                    >
                                                        Disable Chat
                                                    </a>
                                                    <div className="border-t border-dashed border-gray-200 my-1"></div>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100"
                                                    >
                                                        Block
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-5 border-zinc-200" />
                            {/* Details grid */}
                            <div className="text-[15px] space-y-2">
                                <div className="flex justify-between">
                                    <div className="text-neutral-700">User ID</div>
                                    <div className="text-right md:text-left font-medium text-neutral-900">
                                        {user.profile?.id || "N/A"}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-neutral-700">Current Address</div>
                                    <div className="text-right md:text-left font-medium text-neutral-900">
                                        {user.profile?.address || "Not provided"}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-neutral-700">Investment Status</div>
                                    <div className="text-right md:text-left font-medium text-neutral-900">
                                        <span
                                            className={`px-2 py-0.5 rounded text-xs font-semibold ${user.profile?.investmentStatus === "Active"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {user.profile?.investmentStatus || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Investment Dashboard Card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Left: Total Investment Return */}
                            <div className="col-span-1 flex items-center justify-center bg-zinc-50 rounded-lg min-h-[140px]">
                                <div className="text-center">
                                    <div className="text-xs text-zinc-400 mb-1">
                                        Total Investment Value
                                    </div>
                                    <div className="text-3xl font-semibold text-neutral-900 mb-1">
                                        ${user.investmentMetrics?.investmentValue?.toLocaleString() || "0"}
                                    </div>
                                    <div className="flex items-center justify-center gap-1 text-xs">
                                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                            <path
                                                d="M5 12l5 5L20 7"
                                                stroke="#22c55e"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className="text-green-500 font-medium">
                                            +${user.investmentMetrics?.profit?.toLocaleString() || "0"} ({user.investmentMetrics?.monthlyRatePercent || 0}%)
                                        </span>
                                        <span className="text-zinc-400">Monthly return</span>
                                    </div>
                                </div>
                            </div>
                            {/* Right: Stat Cards */}
                            <div className="col-span-2 flex flex-col gap-4">
                                <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-md">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <rect
                                                width="16"
                                                height="20"
                                                x="4"
                                                y="2"
                                                rx="2"
                                                fill="#F59E42"
                                            />
                                            <path
                                                d="M8 6h8M8 10h8M8 14h4"
                                                stroke="#fff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">
                                            Total Investment
                                        </div>
                                        <div className="font-semibold text-lg text-neutral-900">
                                            ${user.investmentMetrics?.investmentValue?.toLocaleString() || "0"}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-md">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <rect
                                                width="16"
                                                height="20"
                                                x="4"
                                                y="2"
                                                rx="2"
                                                fill="#F59E42"
                                            />
                                            <path
                                                d="M8 6h8M8 10h8M8 14h4"
                                                stroke="#fff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">Total Earnings</div>
                                        <div className="font-semibold text-lg text-neutral-900">
                                            ${user.investmentMetrics?.profit?.toLocaleString() || "0"}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-md">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <rect
                                                width="16"
                                                height="20"
                                                x="4"
                                                y="2"
                                                rx="2"
                                                fill="#F59E42"
                                            />
                                            <path
                                                d="M8 6h8M8 10h8M8 14h4"
                                                stroke="#fff"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs text-zinc-400">Invest Count</div>
                                        <div className="font-semibold text-lg text-neutral-900">
                                            {user.investmentMetrics?.propertyCount || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Details Section - Active vs Pending */}
                        <div className="divide-y divide-zinc-100">
                            {/* Active Investment */}
                            <div className="py-4">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-sm text-zinc-500">Active Investments</span>
                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                                        Active
                                    </span>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Invest Count</span>
                                        <span className="text-neutral-900 font-medium">{activeInvestments}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">ROI</span>
                                        <span className="text-neutral-900 font-medium">
                                            {user.investmentMetrics?.roiPercent || 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Pending Investment */}
                            <div className="py-4">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-sm text-zinc-500">Pending Investments</span>
                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-500 border border-orange-200">
                                        Pending
                                    </span>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Invest Count</span>
                                        <span className="text-neutral-900 font-medium">{pendingInvestments}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500">Expected Return</span>
                                        <span className="text-neutral-900 font-medium">
                                            {user.investedProperties?.[0]?.expectedAnnualReturnPercent || 12}% annually
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Documents Section - Note: No documents in API yet */}
                    <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
                        <h3 className="font-semibold mb-4 text-base">Documents</h3>
                        <div className="text-center text-neutral-500 py-8">
                            No documents available
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-white rounded-xl p-4 shadow-sm w-full col-span-4">
                    <div>
                        <LineChart
                            width={500}
                            height={300}
                            data={chartData}
                            margin={{
                                top: 12,
                                right: 45,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#D80"
                                strokeDasharray="5 5"
                            />
                        </LineChart>
                    </div>
                    {/* Invested Property Section */}
                    <div className="bg-white rounded-xl p-4 shadow-sm mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">Invested Property</h3>
                            <span className="text-sm text-neutral-500 flex items-center gap-1 cursor-pointer select-none">
                                All Type
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path
                                        d="M6 9l6 6 6-6"
                                        stroke="#888"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="space-y-4 h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
                            {(user.investedProperties || []).map((property: any, index: number) => (
                                <div
                                    key={property.id || index}
                                    className="bg-white rounded-lg p-4 border border-zinc-100 flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={property.imageUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"}
                                            alt={property.propertyName}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between font-semibold text-base text-neutral-900 gap-2">
                                                {property.propertyName}{" "}
                                                <span
                                                    className={`px-2 py-0.5 rounded text-xs font-semibold ${property.status === "active"
                                                            ? "bg-green-50 text-green-500 border border-green-100"
                                                            : "bg-orange-50 text-orange-500 border border-orange-100"
                                                        }`}
                                                >
                                                    {property.status === "active" ? "Active" : "Pending"}
                                                </span>
                                            </div>
                                            <div className="text-xs text-neutral-400">
                                                Start date: {new Date(property.investedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Investment Amount</span>
                                        <span className="text-neutral-900 font-medium">
                                            ${property.amount?.toLocaleString() || "0"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Expected Annual Return</span>
                                        <span className="text-neutral-900 font-medium">
                                            {property.expectedAnnualReturnPercent || 0}%
                                        </span>
                                    </div>
                                    {/* Drawer */}
                                    <InvestmentPerformance property={property} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}