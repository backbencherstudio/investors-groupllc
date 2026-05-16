// userTableCol.tsx
import { Column } from "@/components/common/DashboardDataTable";
import { Eye, TrendingUp, DollarSign, Building, Briefcase, Home, Wrench } from "lucide-react";
import Image from "next/image";
import { UserRole } from "@/redux/features/user/UserTypes";

export interface UserTableData {
    id: string;
    avatar: string | null;
    name: string;
    role: UserRole;
    contact: string;
    email?: string;
    // Common fields
    status: string;
    // Investor specific
    investCount?: number;
    totalInvested?: number;
    profit?: number;
    roiPercent?: number;
    // Landlord specific
    propertyCount?: number;
    unitCount?: number;
    // Vendor specific
    vendorType?: string;
    serviceCount?: number;
    // Tenant specific
    leaseStart?: string;
    leaseEnd?: string;
    propertyName?: string;
    propertyImage?: string;
    propertyAddress?: string;
}

const FALLBACK_AVATAR = "https://randomuser.me/api/portraits/lego/1.jpg";

type UserCellValue = UserTableData[keyof UserTableData];

const asNumber = (value: UserCellValue) =>
    typeof value === "number" ? value : 0;

const actionColumn: Column<UserTableData> = {
    header: "", // Empty header matching the layout
    accessor: "id",
    render: () => (
        <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
            <Eye className="w-5 h-5" />
        </button>
    ),
};

// Common columns matching the design layout
const commonColumns: Partial<Record<keyof UserTableData, Column<UserTableData>>> = {
    name: {
        header: "Name",
        accessor: "name",
        render: (_value: UserCellValue, row: UserTableData) => (
            <div className="flex items-center gap-3">
                <Image
                    src={row.avatar || FALLBACK_AVATAR}
                    alt={row.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover w-9 h-9"
                />
                <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-800">{row.name}</div>
                    <div className="text-xs text-gray-400">{row.role || "Tenant"}</div>
                </div>
            </div>
        ),
    },
    email: {
        header: "Email",
        accessor: "email",
        render: (value: UserCellValue) => (
            <span className="text-sm text-gray-500">{value ? String(value) : "-"}</span>
        ),
    },
    contact: {
        header: "Contact",
        accessor: "contact",
        render: (value: UserCellValue) => (
            <span className="text-sm text-gray-500">{value ? String(value) : "-"}</span>
        ),
    },
    status: {
        header: "Rent",
        accessor: "status",
        render: (value: UserCellValue) => {
            const statusStr = String(value ?? "").toUpperCase();
            const isActive = statusStr === "ACTIVE";

            return (
                <span
                    className={`px-3 py-1 rounded-md text-xs font-medium tracking-wide ${isActive
                            ? "bg-[#DCFCE7] text-[#16A34A]" // Soft green variant from mockup
                            : "bg-[#FEE2E2] text-[#DC2626]" // Soft red variant from mockup
                        }`}
                >
                    {isActive ? "Active" : "Inactive"}
                </span>
            );
        },
    },
};

// Updated TENANT specific columns matching image configuration
const tenantColumns: Column<UserTableData>[] = [
    commonColumns.name as Column<UserTableData>,
    {
        header: "Property Info",
        accessor: "propertyName",
        render: (_value: UserCellValue, row: UserTableData) => {
            // Handle the fallback state exactly like row #2 in your image
            // if (!row.propertyName) {
            //     return <span className="text-sm text-gray-500">-</span>;
            // }
            console.log("propertyImage", row);
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src={row.propertyImage || "/images/property-placeholder.png"} // Added logic for property image thumbnail
                        alt={row.propertyName || "Property Image"}
                        width={36}
                        height={36}
                        className="rounded-lg object-cover w-9 h-9"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">{row.propertyName || "Property Name"}</span>
                        <span className="text-xs text-gray-400 truncate max-w-[180px]">
                            {row.propertyAddress || "Property Address"}
                        </span>
                    </div>
                </div>
            );
        },
    },
    commonColumns.email as Column<UserTableData>,
    commonColumns.contact as Column<UserTableData>,
    commonColumns.status as Column<UserTableData>,
    actionColumn,
];
// INVESTOR Specific Columns
const investorColumns: Column<UserTableData>[] = [
    commonColumns.name as Column<UserTableData>,
    commonColumns.contact as Column<UserTableData>, // Positioned 2nd matching the mockup
    {
        header: "Invest Count",
        accessor: "investCount",
        render: (value: UserCellValue) => {
            const num = asNumber(value);
            return (
                <span className="text-sm text-gray-800 font-medium">
                    {num > 0 ? num : "-"}
                </span>
            );
        },
    },
    {
        header: "Total Invested",
        accessor: "totalInvested",
        render: (value: UserCellValue) => (
            <span className="text-sm text-gray-500">
                ${asNumber(value).toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </span>
        ),
    },
    {
        header: "Profit",
        accessor: "profit",
        render: (value: UserCellValue) => (
            <span className="text-sm font-semibold text-gray-800">
                ${asNumber(value).toLocaleString()}
            </span>
        ),
    },
    {
        header: "ROI",
        accessor: "roiPercent",
        render: (value: UserCellValue) => (
            <span className="text-sm text-gray-500">
                {asNumber(value)}%
            </span>
        ),
    },
    {
        header: "Status",
        accessor: "status",
        render: (value: UserCellValue) => {
            const statusStr = String(value ?? "").trim().toUpperCase();
            const isNotInvested = statusStr === "NOT INVESTED" || statusStr === "NOT_INVESTED";

            return (
                <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${isNotInvested
                            ? "bg-[#FEF3C7] text-[#D97706]" // Amber/Orange pill for "Not invested"
                            : "bg-[#DCFCE7] text-[#16A34A]" // Soft green pill for "Active"
                        }`}
                >
                    {isNotInvested ? "Not invested" : "Active"}
                </span>
            );
        },
    },
    actionColumn,
];

// VENDOR Specific Columns
const vendorColumns: Column<UserTableData>[] = [
    commonColumns.name as Column<UserTableData>,
    {
        header: "Service Type",
        accessor: "vendorType",
        render: (value: UserCellValue) => (
            <span className="text-sm font-medium text-gray-800">
                {value ? String(value) : "-"}
            </span>
        ),
    },
    commonColumns.email as Column<UserTableData>,
    commonColumns.contact as Column<UserTableData>,
    {
        header: "Status",
        accessor: "status",
        render: (value: UserCellValue) => {
            const statusStr = String(value ?? "").toUpperCase();
            const isAvailable = statusStr === "AVAILABLE" || statusStr === "ACTIVE";

            return (
                <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${isAvailable
                            ? "bg-[#DCFCE7] text-[#16A34A]" // Soft green pill for "Available"
                            : "bg-[#FEE2E2] text-[#DC2626]" // Soft red pill for "Unavailable"
                        }`}
                >
                    {isAvailable ? "Available" : "Unavailable"}
                </span>
            );
        },
    },
    actionColumn,
];
// LANDLORD specific columns
const landlordColumns: Column<UserTableData>[] = [
    commonColumns.name as Column<UserTableData>,
    commonColumns.contact as Column<UserTableData>,
    commonColumns.email as Column<UserTableData>,
    {
        header: "Properties",
        accessor: "propertyCount",
        render: (value: UserCellValue) => (
            <div className="flex items-center gap-1">
                <Building className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-gray-700">{asNumber(value)}</span>
            </div>
        ),
    },
    {
        header: "Units",
        accessor: "unitCount",
        render: (value: UserCellValue) => (
            <span className="text-gray-900">{asNumber(value)}</span>
        ),
    },
    commonColumns.status as Column<UserTableData>,
    actionColumn,
];

// ADMIN specific columns
const adminColumns: Column<UserTableData>[] = [
    commonColumns.name as Column<UserTableData>,
    commonColumns.contact as Column<UserTableData>,
    commonColumns.email as Column<UserTableData>,
    {
        header: "Role",
        accessor: "role",
        render: (value: UserCellValue) => (
            <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold">
                {String(value ?? "")}
            </span>
        ),
    },
    commonColumns.status as Column<UserTableData>,
    actionColumn,
];

// Column mapper based on user type
export const getUserColumns = (userType: UserRole): Column<UserTableData>[] => {
    switch (userType) {
        case "INVESTOR":
            return investorColumns;
        case "LANDLORD":
            return landlordColumns;
        case "VENDOR":
            return vendorColumns;
        case "TENANT":
            return tenantColumns;
        case "ADMIN":
            return adminColumns;
        default:
            return investorColumns;
    }
};