"use client";
import React from "react";
import { updateEquipment } from "@/actions/equipments.action";

import AppFormStateFeedback from "@/components/AppFormStateFeedback";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";

import { updateRoom } from "@/actions/room.action";
import { IndexRooms } from "@/data/db/queries/room.query";

type Props = {
  dto: IndexRooms | null;
};

export default function EditForm({ dto }: Props) {
  const [formState, action] = useFormState(
    updateRoom.bind(null, dto?.id.toString() ?? ""),
    {
      feedback: {},
    }
  );

  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="grid  items-center gap-4">
        <div>
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            id="name"
            placeholder="Digite o nome do compartimento"
            name="name"
            defaultValue={dto?.name}
          />
        </div>
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
