"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DropDown from "@/components/DropDown";

type Employee = {
  id: string;
  description: string;
  status: string;
  date: string;
};

export const equipmentsColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === "Equipada" ? (
            <Badge className="bg-primary hover:bg-primary-foreground px-4 ml-4 text-white">
              Equipada
            </Badge>
          ) : (
            <Badge className="bg-yellow-500 hover:bg-yellow-800 px-4 ml-4">
              Pendente
            </Badge>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ cell }) => {
      return <DropDown />;
    },
  },
];
