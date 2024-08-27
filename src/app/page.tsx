import { AppTable } from "@/components/AppTable";

import { equipmentsAssignmentColumns } from "@/feature/equipmentAssignment/equipmentsAssignment.columns";
import { AppChart } from "@/components/AppChart";
import { indexAssignment } from "@/data/db/queries/assignment.query";
import { getServerSession } from "next-auth";

export default async function Home() {
  const list = await indexAssignment();

  const session = await getServerSession();
  console.log("🚀 ~ Home ~ session:", session);

  return (
    <section>
      <AppChart />
      <AppTable columns={equipmentsAssignmentColumns} data={list} />
    </section>
  );
}
