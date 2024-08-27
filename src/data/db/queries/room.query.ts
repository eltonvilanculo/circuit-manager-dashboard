import { cache } from "react";
import { db } from "..";

export type IndexRooms = Awaited<ReturnType<typeof indexRooms>>[number];

export const indexRooms = cache(async () => {
  return db.room.findMany({
    select: {
      id: true,
      name: true,
    },
  });
});
export const getRoomById = cache((id: string) => {
  return db.room.findUnique({
    select: {
      id: true,
      name: true,
    },
    where: {
      id: Number(id),
    },
  });
});
export const getEquipmentByRoomById = cache((id: string) => {
  return db.room.findUnique({
    select: {
      id: true,
      name: true,
      roomEquipments: {
        select: {
          equipment: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
    where: {
      id: Number(id),
    },
  });
});
