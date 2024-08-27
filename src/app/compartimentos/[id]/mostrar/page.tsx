import { getEquipmentById } from "@/data/db/queries/equipment.query";
import EditForm from "../../forms/EditForm";
import AppCard from "@/components/AppCard";
import {
  getEquipmentByRoomById,
  getRoomById,
} from "@/data/db/queries/room.query";
import AppSwitch from "@/components/AppSwitch";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const dto = await getEquipmentByRoomById(params.id);

  return (
    <div className="grid grid-cols-2 items-center gap-32">
      {dto?.roomEquipments.map((room) => (
        <AppSwitch
          key={room.equipment.id}
          name={room.equipment.name}
          id={room.equipment.id}
        />
      ))}
    </div>
  );
}
