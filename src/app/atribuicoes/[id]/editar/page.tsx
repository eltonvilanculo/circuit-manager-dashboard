import { getEquipmentById } from "@/data/db/queries/equipment.query";
import EditForm from "../../forms/EditForm";
import AppCard from "@/components/AppCard";
import { getRoomById } from "@/data/db/queries/room.query";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const dto = await getRoomById(params.id);

  return (
    <AppCard>
      <EditForm dto={dto} />
    </AppCard>
  );
}
