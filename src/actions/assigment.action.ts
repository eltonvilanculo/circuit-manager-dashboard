"use server";
import { Prisma } from "@prisma/client";

import z from "zod";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import { db } from "@/data/db";
import paths from "@/utils/paths";

import { getServerSession } from "next-auth";

interface storeAssignmentFormState {
  feedback: {
    qty?: string[];

    otherErrors?: string[];
    success?: boolean;
  };
}

export async function storeAssignment(
  formState: storeAssignmentFormState,
  formData: FormData
): Promise<storeAssignmentFormState> {
  const room = Number(formData.get("room"));
  const qty = Number(formData.get("qty"));
  const returnDate = new Date(formData.get("returnDate") as string);
  const equipment = Number(formData.get("equipment"));

  const session = await getServerSession();

  const inputSchema = z.object({
    room: z.number(),
    qty: z.number(),
    equipment: z.number(),

    returnDate: z.date(),
  });

  const result = inputSchema.safeParse({ room, qty, returnDate, equipment });

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
    await db.roomEquipment.create({
      data: {
        userId: Number(user?.id),
        quantity: dto.qty,
        roomId: dto.room,
        equipmentId: dto.equipment,
        shoudReturnAT: dto.returnDate,
      },
    });

    await db.equipment.update({
      data: {
        qty: {
          decrement: dto.qty,
        },
      },
      where: {
        id: dto.equipment,
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
// export async function updateAssignment(
//   id: string,
//   formState: storeAssignmentFormState,
//   formData: FormData
// ): Promise<storeAssignmentFormState> {
//   const name = formData.get("name");

//   const session = await getServerSession();

//   const inputSchema = z.object({
//     name: z
//       .string()
//       .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
//   });

//   const result = inputSchema.safeParse({ name });

//   let Assignment;

//   if (!result.success) {
//     console.log(result.error.flatten().fieldErrors);
//     return {
//       feedback: result.error.flatten().fieldErrors,
//     };
//   }

//   if (!session?.user) {
//     console.log("error");
//     return {
//       feedback: {
//         otherErrors: ["Precisa se autenticar para poder criar "],
//       },
//     };
//   }

//   const dto = result.data;

//   try {
//     Assignment = await db.Assignment.update({
//       data: {
//         name: dto.name,
//       },
//       where: {
//         id: Number(id),
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("🚀 ~ error:", error);
//       return {
//         feedback: {
//           otherErrors: ["Erro no formato das datas"],
//         },
//       };
//     } else {
//       return {
//         feedback: {
//           otherErrors: ["Ocorreu um error ao adicionar categoria"],
//         },
//       };
//     }
//   }

//   revalidatePath(paths.Assignment.index());
//   redirect(paths.Assignment.index());
// }
// export async function deleteAssignment(id: string) {
//   let Assignment;

//   try {
//     Assignment = await db.Assignment.delete({
//       where: {
//         id: Number(id),
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log("🚀 ~ error:", error);
//       return {
//         feedback: {
//           otherErrors: ["Erro no formato das datas"],
//         },
//       };
//     } else {
//       return {
//         feedback: {
//           otherErrors: ["Ocorreu um error ao adicionar categoria"],
//         },
//       };
//     }
//   }

//   revalidatePath(paths.Assignment.index());
//   redirect(paths.Assignment.index());
// }
