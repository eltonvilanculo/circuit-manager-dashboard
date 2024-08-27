"use client";
import React, { useEffect, useState } from "react";

import AppFormStateFeedback from "@/components/AppFormStateFeedback";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";
import { toast } from "react-toastify";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { storeAssignment } from "@/actions/assigment.action";

type Props = {};

export default function CreateForm({}: Props) {
  const [formState, action] = useFormState(storeAssignment, {
    feedback: {},
  });

  const [dataList, setDataList] = useState<{
    rooms: Array<{ id: number; name: string }>;
    equipments: Array<{ id: number; name: string }>;
  }>({ rooms: [], equipments: [] });

  useEffect(() => {
    toast.error(formState.feedback.otherErrors?.join(" ,"));
  }, [formState.feedback.otherErrors]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/data");

      const data = await response.json();
      console.log("🚀 ~ data:", data);

      setDataList(data);
    })();
  }, []);
  return (
    <form action={action} className="flex flex-col space-y-4">
      <div className="grid  grid-cols-2 items-center gap-4">
        <div>
          <Label htmlFor="name" className="text-right">
            Compartimento
          </Label>
          <Select name="room">
            {dataList.rooms.length > 0 && (
              <SelectTrigger>
                <SelectValue
                  placeholder="Selecione o compartimento"
                  className="disabled text-muted"
                />
              </SelectTrigger>
            )}

            <SelectContent>
              {dataList.rooms.map((room) => (
                <SelectItem value={room.id.toString()} key={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="name" className="text-right">
            Equipamento
          </Label>
          <Select name="equipment">
            {dataList.equipments.length > 0 && (
              <SelectTrigger>
                <SelectValue
                  placeholder="Selecione o equipamento"
                  className="disabled text-muted"
                />
              </SelectTrigger>
            )}

            <SelectContent>
              {dataList.equipments.map((equipment) => (
                <SelectItem value={equipment.id.toString()} key={equipment.id}>
                  {equipment.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid  grid-cols-2 items-center gap-4">
        <div>
          <Label htmlFor="name" className="text-right">
            Quantidade
          </Label>
          <Input
            id="name"
            placeholder="Digite o nome do compartimento"
            name="qty"
            type="number"
            min={1}
            defaultValue={1}
          />
        </div>
        <div>
          <Label htmlFor="name" className="text-right">
            Data de retorno
          </Label>
          <Input
            id="name"
            placeholder="Digite o nome do compartimento"
            name="returnDate"
            type="date"
            defaultValue={`${new Date().toDateString()}`}
            min={`${new Date()}`}
          />
        </div>
      </div>

      <div className="self-end">
        <FormButton text="Alocar" />
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
