"use client";
import React, { useEffect } from "react";
import { storeEquipment } from "@/actions/equipments.action";

import AppFormStateFeedback from "@/components/AppFormStateFeedback";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { storeUser } from "@/actions/users.action";
type Props = {};

export default function CreateForm({}: Props) {
  const [formState, action] = useFormState(storeUser, {
    feedback: {},
  });

  useEffect(() => {
    toast.error(formState.feedback.otherErrors?.join(" ,"));
  }, [formState.feedback.otherErrors]);
  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 items-center gap-4">
        <div>
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            id="name"
            placeholder="Digite o nome do utilizador"
            name="name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Email@mail.com"
            name="email"
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-right">
            Senha
          </Label>
          <Input
            id="password"
            placeholder="**********"
            name="password"
            type="password"
          />
        </div>
      </div>

      <div className="self-end">
        <FormButton text="submeter" />
      </div>

      {formState?.feedback && (
        <AppFormStateFeedback keyName="name" feedback={formState.feedback} />
      )}
      {formState?.feedback && (
        <AppFormStateFeedback
          keyName="description"
          feedback={formState.feedback}
        />
      )}
      {formState?.feedback && (
        <AppFormStateFeedback keyName="qty" feedback={formState.feedback} />
      )}
    </form>
  );
}
