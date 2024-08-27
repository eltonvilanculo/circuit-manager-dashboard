import AppSidebar from "@/components/AppSidebar";

import AppHeader from "@/components/AppHeader";

import { AppTable } from "@/components/AppTable";
import { equipmentsColumns } from "@/feature/equipment/equipments.columns";

import AppSideModal from "@/components/AppSideModal";

import CreateForm from "./forms/CreateForm";
import { indexEquipments } from "@/data/db/queries/equipment.query";
import AppButton from "@/components/AppButton";
import paths from "@/utils/paths";

export default async function EquipmentsPage() {
  const list = await indexEquipments();

  // useEffect(() => {
  //   _setCurrentPage("equipments");

  //   const getAllEquipments = async () => {
  //     const allEquipments = await getAllData();
  //     console.log("🚀 ~ getAllEquipments ~ allEquipments:", allEquipments);
  //   };

  //   getAllEquipments();
  // }, []);
  return (
    <div className="flex flex-col">
      <div className="self-end">
        <AppButton href={paths.equipment.store()} />
      </div>
      <section>
        <AppTable columns={equipmentsColumns} data={list} />
      </section>
    </div>
  );
}
