"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DropDown from "@/components/DropDown";
import { IndexEquipments } from "@/data/db/queries/equipment.query";
import paths from "@/utils/paths";
import { deleteEquipment } from "@/actions/equipments.action";

export const equipmentsColumns: ColumnDef<IndexEquipments>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <span className="px-4 py-2 md:truncate">
          {cell.getValue() as string}
        </span>
      );
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
    accessorKey: "qty",
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
    accessorKey: "_count.roomEquipments",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alocações <ArrowUpDown className="ml-2 h-4 w-4" />
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
          {row.original._count.roomEquipments > 0 ? (
            <Badge className="bg-primary hover:bg-primary-foreground px-4 ml-4 text-white md:truncate">
              Alocado
            </Badge>
          ) : (
            <Badge className="bg-yellow-500 hover:bg-yellow-800 px-4 ml-4 md:truncate">
              Não alocado
            </Badge>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ cell }) => {
      return (
        <DropDown
          editPage={paths.equipment.edit(cell.row.original.id)}
          deletePage={() => deleteEquipment(cell.row.original.id.toString())}
        />
      );
    },
  },
];
