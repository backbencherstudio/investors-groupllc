// _components/columns.tsx
import React from "react";
import Image from "next/image";
import { Column } from "@/components/common/DashboardDataTable";
import TaskDetails from "./TaskDetails";
import { ChevronDown, Eye, UserPlus } from "lucide-react";

export interface TaskTableRow {
    id: string;
    name: string;
    nameAvatar: string;
    nameRole: string;
    requestId: string;
    assignTo: string;
    assignToAvatar: string;
    assignToRole: string;
    issue: string;
    issueType: string;
    propertyName: string;
    propertyImage: string;
    propertyAddress: string;
    reqDate: string;
    status: string;
    statusRaw: string;
}

interface ColumnsProps {
    onViewTask?: (taskId: string) => void;
    onAssignVendor?: (taskId: string) => void;
}

export const getTaskColumns = ({ onViewTask, onAssignVendor }: ColumnsProps = {}): Column<TaskTableRow>[] => [
    {
        header: "Name",
        accessor: "name",
        render: (value, row) => {
            const name = value as string;
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src={row.nameAvatar || "/default-avatar.png"}
                        alt={name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-xs text-gray-500">{row.nameRole}</div>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Request ID",
        accessor: "requestId"
    },
    {
        header: "Assign To",
        accessor: "assignTo",
        render: (value, row) => {
            const assignTo = value as string;
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src={row.assignToAvatar}
                        alt={assignTo}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold">{assignTo}</div>
                        <div className="text-xs text-gray-500">{row.assignToRole}</div>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Issue",
        accessor: "issue",
        render: (value, row) => {
            const issue = value as string;
            const getPriorityColor = (priority: string) => {
                switch (priority?.toLowerCase()) {
                    case "emergency":
                        return "text-red-500";
                    case "high":
                        return "text-orange-500";
                    case "medium":
                        return "text-yellow-500";
                    case "low":
                        return "text-blue-500";
                    default:
                        return "text-gray-500";
                }
            };

            return (
                <div>
                    <div>{issue}</div>
                    <div className={`text-xs font-semibold ${getPriorityColor(row.issueType)}`}>
                        {row.issueType}
                    </div>
                </div>
            );
        },
    },
    {
        header: "Property Info",
        accessor: "propertyName",
        render: (value, row) => {
            const propertyName = value as string;
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src={row.propertyImage || "/default-property.png"}
                        alt={propertyName}
                        width={32}
                        height={32}
                        className="rounded-lg object-cover"
                    />
                    <div>
                        <div className="font-semibold">{propertyName}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[150px]">
                            {row.propertyAddress}
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Req Date",
        accessor: "reqDate"
    },

    //   "status must be one of the following values: pending, assigned, on_going, completed, in_progress, canceled, submitted, payment_request"

    {
        header: "Status",
        accessor: "statusRaw",
        render: (value, row) => {
            //   const status = row.status as string;
            const status = value as string;

            console.log("status: ", status);
            const getStatusStyles = (status: string) => {
                switch (status) {
                    case "completed":
                        return "bg-green-100 text-green-600";
                    case "in_progress":
                    case "on going":
                        return "bg-orange-100 text-orange-600";
                    case "in_review":
                        return "bg-purple-100 text-purple-600";
                    case "canceled":
                        return "bg-red-100 text-red-600";
                    case "submitted":
                        return "bg-blue-100 text-blue-600";
                    case "payment_request":
                        return "bg-purple-100 text-purple-600";
                    default:
                        return "bg-blue-100 text-blue-600";
                }
            };

            return (
                <span className={`${getStatusStyles(status)} px-3 py-1 rounded-full text-xs font-medium`}>
                    {row.status === "InProgress" ? "On going" : row.status}
                </span>
            );
        },
    },
    {
        header: "Action",
        accessor: "requestId",
        render: (_, row) => (
            <>
                <div className="flex items-center gap-3">
                    {/* View Details Button */}
                    <TaskDetails data={row.id}>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                            <Eye className="w-4 h-4" />
                            {/* <span>View Details</span> */}
                        </button>
                    </TaskDetails>

                    {/* Assign Vendor Button */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-600/80 rounded-lg hover:bg-yellow-600 transition-all duration-200 shadow-sm"
                        onClick={() => onAssignVendor?.(row.id)}
                    >
                        {/* <UserPlus className="w-4 h-4" /> */}
                        <span className="text-xs">Assign Vendor</span>
                    </button>
                </div>
            </>
        ),
    },

];