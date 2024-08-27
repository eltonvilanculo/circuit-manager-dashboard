"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DropDown from "@/components/DropDown";

import paths from "@/utils/paths";
import { deleteEquipment } from "@/actions/equipments.action";
import { IndexRooms } from "@/data/db/queries/room.query";
import { deleteRoom } from "@/actions/room.action";

export const roomColumns: ColumnDef<IndexRooms>[] = [
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
    id: "actions",
    cell: ({ cell }) => {
      return (
        <DropDown
          editPage={paths.room.edit(cell.row.original.id)}
          deletePage={() => deleteRoom(cell.row.original.id.toString())}
        />
      );
    },
  },
];
