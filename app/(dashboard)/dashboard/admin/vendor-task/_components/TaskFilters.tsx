// _components/TaskFilters.tsx
import React from "react";
import SearchInput from "@/components/common/SearchInput";
import SelectDropDown from "@/components/common/SelectDropDown";

interface TaskFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  priority: string;
  onPriorityChange: (value: string) => void;
}

const statusOptions = [

    { label: "All Status", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Assigned", value: "assigned" },
    { label: "On going", value: "on_going" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in_progress" },
    { label: "Canceled", value: "canceled" },
    { label: "Submitted", value: "submitted" },
    { label: "Payment Request", value: "payment_request" },
];

// "status must be one of the following values: pending, assigned, on_going, completed, in_progress, canceled, submitted, payment_request"


const priorityOptions = [
  { label: "All Priority", value: "" },
  { label: "Emergency", value: "Emergency" },
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const TaskFilters: React.FC<TaskFiltersProps> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full md:w-auto">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by name, request ID..."
        />
      </div>
      <div className="w-[47.5%] md:w-auto">
        <SelectDropDown
          value={status}
          onChange={onStatusChange}
          options={statusOptions}
        />
      </div>
      <div className="w-[47.5%] md:w-auto">
        <SelectDropDown
          value={priority}
          onChange={onPriorityChange}
          options={priorityOptions}
        />
      </div>
    </div>
  );
};

export default TaskFilters;