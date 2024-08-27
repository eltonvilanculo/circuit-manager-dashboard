"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import useLogin from "./useLogin";
import { useSession } from "next-auth/react";

export default function AuthPage() {
  const router = useRouter();

  const { inputs, onChangeText, handleSignInByUserAndPassword } = useLogin();

  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col justify-center w-1/4 p-8 bg-[#003b5c] rounded-r-lg">
        <form className="space-y-4" onSubmit={handleSignInByUserAndPassword}>
          <h1 className="mb-8 text-4xl font-bold text-white">Entrar</h1>
          <div className="mb-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Username or Email"
                className="w-full pl-10 pr-4 py-2 rounded-full"
                value={inputs.email}
                onChange={(e) => onChangeText("email", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 rounded-full"
                value={inputs.password}
                onChange={(e) => onChangeText("password", e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            className="w-full py-2 mt-4 text-white bg-primary hover:bg-primary-foreground rounded-full"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </div>

      <div className="flex items-center justify-center w-1/2 bg-gray-100 rounded-l-lg">
        <h1 className="text-5xl font-bold text-[#003b5c]">
          SISTEMAS ELÉCTRICOS
        </h1>

        <div className="absolute top-0 left-0 w-24 h-24 bg-primary rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2 "></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-foreground rounded-full opacity-50 transform translate-x-1/2 "></div>
        <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-primary rounded-lg opacity-50 transform rotate-45 hover:rounded-[40px] transition-all duration-300"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-primary-foreground rounded-[32px] hover:rounded-none opacity-50 transition-all duration-300"></div>
      </div>
    </div>
  );
}
