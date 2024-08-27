"use server";
import { Badge } from "@/components/ui/badge";
import SwitchField from "@/components/compartment/SwitchField";
import AppCardStats from "@/components/AppCardStats";
import AppButton from "@/components/AppButton";
import { AppTable } from "@/components/AppTable";
import paths from "@/utils/paths";
import { indexRooms } from "@/data/db/queries/room.query";
import { roomColumns } from "@/feature/room/room.columns";

export default async function CompartmentsPage() {
  const list = await indexRooms();
  return (
    <section className="space-y-12">
      <AppButton label="Adicionar sala" href="/compartimentos/criar" />
      <div className="grid grid-cols-2 items-center gap-4">
        {list.map((room) => (
          <AppCardStats
            key={room.id}
            name={room.name}
            link={`/compartimentos/${room.id.toString()}/mostrar`}
          />
        ))}
      </div>
      {/* <div className="grid grid-cols-4 items-cente  gap-8">
        <div className="flex flex-col  space-y-2">
          <Badge className="py-2 text-center  bg-gray-300">Sala 1</Badge>
          <Badge className="py-2 text-center ">Sala 1</Badge>
          <Badge className="py-2 text-center ">Sala 1</Badge>
        </div>

        <div className="flex space-y-4 border border-primary justify-center items-center rounded-sm p-2">
          <SwitchField />
        </div>
        <div className="flex space-y-4 border border-primary justify-center items-center rounded-sm p-2">
          <SwitchField />
        </div>
      </div>

      <section>
        <div className="self-end space-x-4">
          <AppButton href={paths.room.store()} />
          <AppButton href={paths.assignment.store()} label="Associar" />
        </div>
        <section>
          <AppTable columns={roomColumns} data={list} />
        </section>
      </section> */}
    </section>
  );
}
