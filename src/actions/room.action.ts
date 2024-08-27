"use server";
import { Prisma } from "@prisma/client";

import { auth } from "@/utils/auth";
import z from "zod";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { db } from "@/data/db";
import paths from "@/utils/paths";

import { getServerSession } from "next-auth";

interface storeRoomFormState {
  feedback: {
    name?: string[];
    qty?: string[];
    description?: string[];
    otherErrors?: string[];
    success?: boolean;
  };
}

export async function storeRoom(
  formState: storeRoomFormState,
  formData: FormData
): Promise<storeRoomFormState> {
  const name = formData.get("name");

  const session = await getServerSession();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  });

  const result = inputSchema.safeParse({ name });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      feedback: result.error.flatten().fieldErrors,
    };
  }

  if (!session?.user) {
    return {
      feedback: {
        otherErrors: ["Precisa se autenticar para poder criar "],
      },
    };
  }

  const dto = result.data;
  console.log("🚀 ~ dto:", dto);
  const user = await db.user.findUnique({
    where: {
      email: session.user.email ?? "",
    },
  });

  try {
    await db.room.create({
      data: {
        name: dto.name,
        userId: Number(user?.id),
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        feedback: {
          otherErrors: ["Registro já existe"],
        },
      };
    } else {
      return {
        feedback: {
          otherErrors: ["Ocorreu um error ao adicionar categoria"],
        },
      };
    }
  }

  revalidatePath(paths.room.index());
  redirect(paths.room.index());
}
export async function updateRoom(
  id: string,
  formState: storeRoomFormState,
  formData: FormData
): Promise<storeRoomFormState> {
  const name = formData.get("name");

  const session = await getServerSession();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  });

  const result = inputSchema.safeParse({ name });

  let Room;

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      feedback: result.error.flatten().fieldErrors,
    };
  }

  if (!session?.user) {
    console.log("error");
    return {
      feedback: {
        otherErrors: ["Precisa se autenticar para poder criar "],
      },
    };
  }

  const dto = result.data;

  try {
    Room = await db.room.update({
      data: {
        name: dto.name,
      },
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ error:", error);
      return {
        feedback: {
          otherErrors: ["Erro no formato das datas"],
        },
      };
    } else {
      return {
        feedback: {
          otherErrors: ["Ocorreu um error ao adicionar categoria"],
        },
      };
    }
  }

  revalidatePath(paths.room.index());
  redirect(paths.room.index());
}
export async function deleteRoom(id: string) {
  let Room;

  try {
    Room = await db.room.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ error:", error);
      return {
        feedback: {
          otherErrors: ["Erro no formato das datas"],
        },
      };
    } else {
      return {
        feedback: {
          otherErrors: ["Ocorreu um error ao adicionar categoria"],
        },
      };
    }
  }

  revalidatePath(paths.room.index());
  redirect(paths.room.index());
}
