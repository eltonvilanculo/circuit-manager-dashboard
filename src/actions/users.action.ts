"use server";
import { Prisma } from "@prisma/client";

import z from "zod";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { db } from "@/data/db";
import paths from "@/utils/paths";
import bcrypt from "bcrypt";

import { getServerSession } from "next-auth";

interface storeEquipmentFormState {
  feedback: {
    name?: string[];
    email?: string[];
    description?: string[];
    otherErrors?: string[];
    success?: boolean;
  };
}

export async function storeUser(
  formState: storeEquipmentFormState,
  formData: FormData
): Promise<storeEquipmentFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const session = await getServerSession();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    email: z.string().email({ message: "Formato de email inválido" }),
    password: z
      .string()
      .min(3, { message: "A senha deve ter no mínimo 3 caracteres" }),
  });

  const result = inputSchema.safeParse({ name, email, password });
  console.log("🚀 ~ { name, email, password:", { name, email });

  let users;

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
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  try {
    users = await db.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
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

  revalidatePath(paths.users.index());
  redirect(paths.users.index());
}
export async function updateUser(
  id: string,
  formState: storeEquipmentFormState,
  formData: FormData
): Promise<storeEquipmentFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password") as string;

  const session = await getServerSession();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    email: z.string().email({ message: "Formato de email inválido" }),
  });

  const result = inputSchema.safeParse({ name, email });
  let user;

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

  if (password.length > 3) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: Number(id),
      },
    });
  }

  try {
    user = await db.user.update({
      data: {
        name: dto.name,
        email: dto.email,
        updatedAt: new Date(),
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

  revalidatePath(paths.users.index());
  redirect(paths.users.index());
}
export async function deleteUser(id: string) {
  let user;

  try {
    user = await db.user.delete({
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

  revalidatePath(paths.users.index());
  redirect(paths.users.index());
}
