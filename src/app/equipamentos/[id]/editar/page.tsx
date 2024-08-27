import { getEquipmentById } from "@/data/db/queries/equipment.query";
import EditForm from "../../forms/EditForm";
import AppCard from "@/components/AppCard";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const equipment = await getEquipmentById(params.id);

  return (
    <AppCard>
      <EditForm equipment={equipment} />
    </AppCard>
  );
}
