import { cache } from "react";
import { db } from "..";

export type IndexAssignment = Awaited<
  ReturnType<typeof indexAssignment>
>[number];
type Assignment = {
  id: number;
  quantity: number;
  status: boolean;
  allocatedAt: Date;
  shoudReturnAT: Date | null;
  room: { name: string };
  equipment: { name: string };
};
export const indexAssignment = cache(async () => {
  let assignments = await db.roomEquipment.findMany({
    select: {
      id: true,
      quantity: true,
      status: true,
      shoudReturnAT: true,
      allocatedAt: true,
      equipment: {
        select: {
          name: true,
        },
      },
      room: {
        select: {
          name: true,
        },
      },
    },
  });

  assignments.forEach(async (row: any) => {
    if (
      row.shoudReturnAT &&
      row.shoudReturnAT < new Date() &&
      row.status === "PENDENTE"
    ) {
      await db.roomEquipment.update({
        data: {
          status: "ATRASADO",
        },
        where: {
          id: row.id,
        },
      });
    }
  });

  return assignments;
});
