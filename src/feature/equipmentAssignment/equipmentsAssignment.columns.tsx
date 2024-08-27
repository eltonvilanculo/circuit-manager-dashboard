"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DropDown from "@/components/DropDown";
import { IndexAssignment } from "@/data/db/queries/assignment.query";

export const equipmentsAssignmentColumns: ColumnDef<IndexAssignment>[] = [
  {
    accessorKey: "room.name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sala <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "equipment.name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Equipamento <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },
  {
    accessorKey: "allocatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alocado em <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <span className="px-4 py-2">
          {new Date(cell.getValue() as string).toDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "shoudReturnAT",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de retorno
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <span className="px-4 py-2">
          {new Date(cell.getValue() as string).toDateString()}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === "DEVOLVIDO" ? (
            <Badge className="bg-primary hover:bg-primary-foreground px-4 ml-4 text-white">
              Devolvido
            </Badge>
          ) : row.original.status === "ATRASADO" ? (
            <Badge className="bg-red-500 hover:bg-red-800 px-4 ml-4 text-white">
              Atrasado
            </Badge>
          ) : (
            <Badge className="bg-yellow-500 hover:bg-yellow-800 px-4 ml-4">
              Alocado
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
