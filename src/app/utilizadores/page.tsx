import AppSidebar from "@/components/AppSidebar";

import AppHeader from "@/components/AppHeader";

import { AppTable } from "@/components/AppTable";
import { equipmentsColumns } from "@/feature/equipment/equipments.columns";

import AppSideModal from "@/components/AppSideModal";

import CreateForm from "./forms/CreateForm";
import { indexEquipments } from "@/data/db/queries/equipment.query";
import AppButton from "@/components/AppButton";
import paths from "@/utils/paths";
import { indexUsers } from "@/data/db/queries/user.query";
import { usersColumns } from "@/feature/users/users.columns";

export default async function EquipmentsPage() {
  const list = await indexUsers();

  return (
    <div className="flex flex-col">
      <div className="self-end">
        <AppButton href={paths.users.store()} />
      </div>
      <section>
        <AppTable columns={usersColumns} data={list} />
      </section>
    </div>
  );
}
