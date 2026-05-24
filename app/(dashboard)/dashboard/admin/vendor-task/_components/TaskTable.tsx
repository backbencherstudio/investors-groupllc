// _components/TaskTable.tsx
import React from "react";
import { DashboardDataTable } from "@/components/common/DashboardDataTable";
import { TaskTableRow, getTaskColumns } from "./columns";

interface TaskTableProps {
  data: TaskTableRow[];
  onViewTask?: (taskId: string) => void;
  onAssignVendor?: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ data, onViewTask, onAssignVendor }) => {
  const columns = getTaskColumns({ onViewTask, onAssignVendor });

  return (
    <div className="w-full overflow-hidden">
      <DashboardDataTable columns={columns} data={data} />
    </div>
  );
};

export default TaskTable;