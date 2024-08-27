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
type Props = {};

export default function CreateForm({}: Props) {
  const [formState, action] = useFormState(storeEquipment, {
    feedback: {},
  });

  useEffect(() => {
    toast.error(formState.feedback.otherErrors?.join(" ,"));
  }, [formState.feedback.otherErrors]);
  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 items-center gap-4">
        <div>
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            id="name"
            placeholder="Digite o nome do equipamento"
            name="name"
          />
        </div>
        <div>
          <Label htmlFor="qty" className="text-right">
            Quantidade
          </Label>
          <Input id="qty" type="number" defaultValue="1" min={1} name="qty" />
        </div>
      </div>
      <div>
        <Label htmlFor="description" className="text-right">
          Descrição
        </Label>
        <Textarea
          id="description"
          placeholder="Digite a descrição do equipamento"
          className="col-span-3 w-full"
          name="description"
        />
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
