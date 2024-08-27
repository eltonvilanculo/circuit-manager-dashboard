"use server";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { indexEquipments } from "@/data/db/queries/equipment.query";

type Props = {
  list: { id: number; name: string }[];
};

export default async function AppSelectWithList({ list }: Props) {
  return (
    <div className="relative inline-block w-[180px]">
      <select className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        {list.map((item) => (
          <option key={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}
