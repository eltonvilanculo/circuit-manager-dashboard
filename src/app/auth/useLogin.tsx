import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useAppDispatch } from "@/data/redux/useRedux";
import { toggleLoading } from "@/feature/global/AppSlice";
import { toast } from "react-toastify";

export default function useLogin() {
  const initInputValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(initInputValues);

  const dispatch = useAppDispatch();

  const onChangeText = (target: string, value: any) => {
    setInputs((prev) => ({ ...prev, [target]: value }));
  };

  const handleSignInByUserAndPassword = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(toggleLoading());

    console.log(inputs);

    try {
      await signIn("credentials", {
        email: inputs.email,
        password: inputs.password,

        redirect: true,
        callbackUrl: "/",
      });

      toast.success(`Bem vindo/a `);
    } catch (error) {
      console.log("🚀 ~ handleSignInByUserAndPassword ~ error:", error);
      toast.error(`Falha ao autenticar`);
    } finally {
      dispatch(toggleLoading());
    }
  };

  return { inputs, onChangeText, handleSignInByUserAndPassword };
}
