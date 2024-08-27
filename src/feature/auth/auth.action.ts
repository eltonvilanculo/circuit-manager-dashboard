"use server";

import z from "zod";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

interface LoginFormState {
  errors: {
    username?: string[];
    password?: string[];
    otherErrors?: string[];
  };
}

export async function loginWithUserAndPass(
  formState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = formData.get("username");
  const password = formData.get("password");

  const inputSchema = z.object({
    username: z
      .string()
      .min(3, "O nome do utilizador não está no formato correcto"),
    password: z.string().min(4, "Por favor, forneça uma senha válida"),
  });

  const result = inputSchema.safeParse({ username, password });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const usernameInput = result.data.username;
  const passwordInput = result.data.password;

  revalidatePath("/auth/selecionar-combinacao");
  redirect("/auth/selecionar-combinacao");
}
