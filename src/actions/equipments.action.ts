"use server";
import { Prisma } from "@prisma/client";

import { auth } from "@/utils/auth";
import z from "zod";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { db } from "@/data/db";
import paths from "@/utils/paths";

import { getServerSession } from "next-auth";

interface storeEquipmentFormState {
  feedback: {
    name?: string[];
    qty?: string[];
    description?: string[];
    otherErrors?: string[];
    success?: boolean;
  };
}

export async function storeEquipment(
  formState: storeEquipmentFormState,
  formData: FormData
): Promise<storeEquipmentFormState> {
  const name = formData.get("name");
  const qty = Number(formData.get("qty"));
  const description = formData.get("description");

  const session = await getServerSession();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    qty: z.number().min(1, { message: "Quantidade inválida" }),
    description: z
      .string()
      .min(3, { message: "A descrição deve ter no mínimo 3 caracteres" }),
  });

  const result = inputSchema.safeParse({ name, description, qty });

  let equipment;

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
  console.log("🚀 ~ dto:", dto);

  try {
    equipment = await db.equipment.create({
      data: {
        name: dto.name,
        description: dto.description,
        qty: dto.qty,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            feedback: {
              otherErrors: ["Registro já existe"],
            },
          };
        }
      }

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

  revalidatePath(paths.equipment.index());
  redirect(paths.equipment.index());
}
export async function updateEquipment(
  id: string,
  formState: storeEquipmentFormState,
  formData: FormData
): Promise<storeEquipmentFormState> {
  const name = formData.get("name");
  const qty = Number(formData.get("qty"));
  const description = formData.get("description");

  const session = await getServerSession();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    qty: z.number().min(1, { message: "Quantidade inválida" }),
    description: z
      .string()
      .min(3, { message: "A descrição deve ter no mínimo 3 caracteres" }),
  });

  const result = inputSchema.safeParse({ name, description, qty });

  let equipment;

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
  console.log("🚀 ~ dto:", dto);

  try {
    equipment = await db.equipment.update({
      data: {
        name: dto.name,
        description: dto.description,
        qty: dto.qty,
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

  revalidatePath(paths.equipment.index());
  redirect(paths.equipment.index());
}
export async function deleteEquipment(id: string) {
  let equipment;

  try {
    equipment = await db.equipment.delete({
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

  revalidatePath(paths.equipment.index());
  redirect(paths.equipment.index());
}
