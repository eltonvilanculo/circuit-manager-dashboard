"use client";
import React from "react";
import { updateEquipment } from "@/actions/equipments.action";

import AppFormStateFeedback from "@/components/AppFormStateFeedback";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { EquipmentDTO } from "@/data/db/queries/equipment.query";

type Props = {
  equipment: EquipmentDTO | null;
};

export default function EditForm({ equipment }: Props) {
  const [formState, action] = useFormState(
    updateEquipment.bind(null, equipment?.id.toString() ?? ""),
    {
      feedback: {},
    }
  );

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
            defaultValue={equipment?.name}
          />
        </div>
        <div>
          <Label htmlFor="qty" className="text-right">
            Quantidade
          </Label>
          <Input
            id="qty"
            type="number"
            defaultValue={equipment?.qty}
            min={1}
            name="qty"
          />
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
          defaultValue={equipment?.description ?? ""}
        />
      </div>

      <div className="self-end">
        <FormButton text="Actualizar" />
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
