"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

interface Column<T> {
  key: keyof T;
  title: string;
}

interface GenerateColumnsProps<T> {
  columns: Column<T>[];
}

export const GenerateColumns = <T,>({ columns }: GenerateColumnsProps<T>): ColumnDef<T>[] => {
  return columns.map((column) => ({
    accessorKey: column.key as string,
    header: ({ column: tableColumn }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => tableColumn.toggleSorting(tableColumn.getIsSorted() === "asc")}
        >
          {column.title} <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }));
};
