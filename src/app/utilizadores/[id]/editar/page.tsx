import { getEquipmentById } from "@/data/db/queries/equipment.query";
import EditForm from "../../forms/EditForm";
import AppCard from "@/components/AppCard";
import { getUserById } from "@/data/db/queries/user.query";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getUserById(params.id);

  return (
    <AppCard>
      <EditForm user={user} />
    </AppCard>
  );
}
