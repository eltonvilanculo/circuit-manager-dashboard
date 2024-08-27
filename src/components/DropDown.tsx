"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  DeleteIcon,
  EllipsisVertical,
  Menu,
  Pencil,
  Trash,
} from "lucide-react";
import { FormHTMLAttributes, HTMLAttributes } from "react";

type Props = {
  handleDelete?: () => void;
  seeDetailsPage?: string;
  editPage?: string;
  deletePage?: any;
};

export default function DropDown({
  handleDelete,
  seeDetailsPage,
  editPage,
  deletePage,
}: Props) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acções</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText("okok");
              toast.success("Copiado com sucesso!");
            }}
            className="cursor-pointer"
          >
            Copiar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {handleDelete && (
            <DropdownMenuItem>
              <button onClick={handleDelete}>Apagar</button>
            </DropdownMenuItem>
          )}

          {seeDetailsPage && (
            <DropdownMenuItem>
              <Link href={seeDetailsPage}>Ver</Link>
            </DropdownMenuItem>
          )}

          {editPage && (
            <DropdownMenuItem>
              <Link href={editPage}>
                <div className="grid grid-cols-[min-content_1fr] items-center gap-1">
                  <Pencil size={12} /> Editar
                </div>
              </Link>
            </DropdownMenuItem>
          )}
          {deletePage && (
            <DropdownMenuItem>
              <form action={deletePage}>
                <Button className="p-0 font-normal h-2" variant={"ghost"}>
                  <div className="grid grid-cols-[min-content_1fr] items-center gap-1">
                    <Trash size={12} /> Apagar
                  </div>
                </Button>
              </form>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
