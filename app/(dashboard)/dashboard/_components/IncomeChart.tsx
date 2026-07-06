'use client'
import { useGetOverAllIncomeQuery } from "@/redux/features/dashboard/dashboardApi";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

// Fallback static data (used only if API fails)
const fallbackData = [
    { month: "Jan", earn: 32000, profit: 12000, roi: 20343 },
    { month: "Feb", earn: 45000, profit: 15000, roi: 24531 },
    { month: "Mar", earn: 55000, profit: 16000, roi: 12323 },
    { month: "Apr", earn: 29000, profit: 10000, roi: 19343 },
    { month: "May", earn: 67000, profit: 18000, roi: 25343 },
    { month: "Jun", earn: 34000, profit: 11000, roi: 20343 },
    { month: "Jul", earn: 21000, profit: 8000, roi: 17343 },
    { month: "Aug", earn: 59000, profit: 17000, roi: 23343 },
    { month: "Sep", earn: 32000, profit: 10500, roi: 20343 },
    { month: "Oct", earn: 69000, profit: 19000, roi: 26343 },
    { month: "Nov", earn: 52000, profit: 13000, roi: 22343 },
    { month: "Dec", earn: 19000, profit: 7500, roi: 15343 },
];

const COLORS = {
    earn: "#DD8800",
    profit: "#F1C796",
    roi: "#FCF1E6",
};

type TooltipPayload = {
    value: number;
    dataKey: string;
    name: string;
}[];

// Custom Tooltip to include ROI
const CustomTooltip = ({ 
    active, 
    payload, 
    label, 
    chartData 
}: { 
    active: boolean, 
    payload: TooltipPayload, 
    label: string,
    chartData: any[]
}) => {
    if (active && payload && payload.length) {
        const monthData = chartData.find((d) => d.month === label);
        
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border text-sm">
                <div className="flex items-center gap-2">
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: COLORS.earn }}
                    />
                    <span>Earn</span>
                    <span className="ml-auto font-semibold">
                        ${payload[0]?.value?.toLocaleString() || 0}
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: COLORS.profit }}
                    />
                    <span>Profit</span>
                    <span className="ml-auto font-semibold">
                        ${payload[1]?.value?.toLocaleString() || 0}
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: COLORS.roi }}
                    />
                    <span>ROI</span>
                    <span className="ml-auto font-semibold">
                        {monthData?.roi || 0}%
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

export default function IncomeChart() {
    const { data: overAllIncome, isLoading, error } = useGetOverAllIncomeQuery();
    console.log(overAllIncome);

    // Transform API data to chart format
    const chartData = useMemo(() => {
        // If API data exists and has series
        if (overAllIncome?.data?.series && overAllIncome.data.series.length > 0) {
            return overAllIncome.data.series.map((item: any) => ({
                month: item.month,
                // Map API fields to chart fields
                earn: item.investments || 0,
                profit: item.subscriptions || 0,
                roi: item.rent || 0,
            }));
        }
        // Fallback to static data
        return fallbackData;
    }, [overAllIncome]);

    // Calculate total income
    const income = useMemo(() => {
        return chartData.reduce((acc, d) => acc + d.earn, 0);
    }, [chartData]);

    // Calculate average ROI
    const totalRoi = useMemo(() => {
        if (chartData.length === 0) return "0";
        const avgRoi = chartData.reduce((acc, d) => acc + d.roi, 0) / chartData.length;
        return avgRoi.toFixed(2);
    }, [chartData]);

    // Get period from API or default to "This Year"
    const period = overAllIncome?.data?.period || "this_year";
    const periodDisplay = period === "this_year" ? "This Year" : "All Time";

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-center h-[360px]">
                    <div className="text-gray-500">Loading chart data...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-center h-[360px]">
                    <div className="text-red-500">Failed to load chart data. Showing fallback data.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-gray-500">Over all income</p>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-gray-900">
                            ${income.toLocaleString()}
                        </span>
                        <span className="bg-green-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                            <svg
                                className="w-4 h-4 inline mr-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 20 20"
                            >
                                <path d="M5 10l5-5 5 5" />
                            </svg>
                            {totalRoi}%
                        </span>
                    </div>
                </div>
                <div>
                    <button className="border rounded-xl px-4 py-2 text-base font-medium text-gray-700 flex items-center gap-2">
                        {periodDisplay}
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 20 20"
                        >
                            <path d="M7 7l3-3 3 3M7 13l3 3 3-3" />
                        </svg>
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={360}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
                    barCategoryGap="40%"
                    barGap={0}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="5 5"
                        stroke="#ececec"
                    />
                    <XAxis
                        axisLine={false}
                        dataKey="month"
                        tickLine={false}
                        padding={{ left: 10, right: 10 }}
                        dy={15}
                    />
                    <YAxis
                        axisLine={false}
                        tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                        content={(props) => (
                            <CustomTooltip 
                                active={props.active || false} 
                                payload={props.payload as TooltipPayload} 
                                label={props.label || ""}
                                chartData={chartData}
                            />
                        )} 
                    />
                    <Bar
                        dataKey="earn"
                        stackId="a"
                        fill={COLORS.earn}
                        radius={[4, 4, 4, 4]}
                        barSize={12}
                    />
                    <Bar
                        dataKey="profit"
                        stackId="a"
                        fill={COLORS.profit}
                        radius={[4, 4, 4, 4]}
                        barSize={12}
                    />
                    <Bar
                        dataKey="roi"
                        stackId="a"
                        fill={COLORS.roi}
                        radius={[4, 4, 4, 4]}
                        barSize={12}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}