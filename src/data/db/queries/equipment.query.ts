"use server";
import { cache } from "react";
import { db } from "..";

export type EquipmentDTO = Omit<IndexEquipments, "_count">;

export type IndexEquipments = Awaited<
  ReturnType<typeof indexEquipments>
>[number];

export const indexEquipments = cache(async () => {
  return db.equipment.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      qty: true,
      _count: {
        select: {
          roomEquipments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});
export const getEquipmentById = cache((id: string) => {
  return db.equipment.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      qty: true,
    },
    where: {
      id: Number(id),
    },
  });
});
