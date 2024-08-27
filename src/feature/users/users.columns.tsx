"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DropDown from "@/components/DropDown";
import { IndexEquipments } from "@/data/db/queries/equipment.query";
import paths from "@/utils/paths";
import { deleteEquipment } from "@/actions/equipments.action";
import { IndexUsers } from "@/data/db/queries/user.query";
import { deleteUser } from "@/actions/users.action";

export const usersColumns: ColumnDef<IndexUsers>[] = [
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
    accessorKey: "email",
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activo desde <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <span className="px-4 py-2">
          {" "}
          {new Date(cell.getValue() as string).toDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actualizado em <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return (
        <span className="px-4 py-2">
          {cell.getValue() !== null
            ? new Date(cell.getValue() as string).toDateString()
            : "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      return <span className="px-4 py-2">{cell.getValue() as string}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ cell }) => {
      return (
        <DropDown
          editPage={paths.users.edit(cell.row.original.id)}
          deletePage={() => deleteUser(cell.row.original.id.toString())}
        />
      );
    },
  },
];
