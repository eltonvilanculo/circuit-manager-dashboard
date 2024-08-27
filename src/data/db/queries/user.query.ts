"use server";
import { cache } from "react";
import { db } from "..";

export type IndexUsers = Awaited<ReturnType<typeof indexUsers>>[number];

export const indexUsers = cache(async () => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});
export const getUserById = cache((id: string) => {
  return db.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id: Number(id),
    },
  });
});
