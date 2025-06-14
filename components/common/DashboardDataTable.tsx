// src/components/tables/DataTable.tsx
"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { TablePagination } from "./TablePagination";
// import { StatusBadge } from "./StatusBadge";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
};

interface DashboardDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function DashboardDataTable<T extends { id: string | number }>({
  columns,
  data,
}: DashboardDataTableProps<T>) {
  return (
    <div className="relative w-full">
      <div className="rounded-md border overflow-hidden">
        <div className="w-full overflow-x-auto ">
          <div className="min-w-[800px] md:min-w-0 ">
            <Table>
              <TableHeader className="bg-[#F5F5F5] rounded-t-md">
                <TableRow>
                  {columns.map((col, idx) => (
                    <TableHead
                      key={idx}
                      className={`${
                        col.className || ""
                      } whitespace-rnowap text-[#707070]`}
                    >
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((col, idx) => (
                      <TableCell
                        key={idx}
                        className={`${col.className || ""} whitespace-nowrap`}
                      >
                        {col.render
                          ? col.render(row[col.accessor], row)
                          : (row[col.accessor] as React.ReactNode)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
