"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

type Props = {
  name: string;
  id: number;
  active: boolean;
  consumption?: number;
  i?: string;
  p?: string;
  v?: string;
  handleToggle: (value: boolean) => Promise<void>;
};

export default function AppSwitch({
  name,
  id,
  active = false,
  consumption,
  handleToggle,
  i,
  v,
  p,
}: Props) {
  return (
    <div
      className={`flex flex-col  items-center space-y-4 p-8  rounded-2xl text-center font-normal transition-colors ${
        active
          ? "bg-primary-foreground text-white transition-all duration-3000"
          : "bg-gray-300 text-black"
      }`}
    >
      <Label
        htmlFor="airplane-mode"
        className={`px-3 py-1 rounded-2xl text-center w-full font-semibold transition-colors ${
          active ? " text-white transition-all duration-3000" : " text-black"
        }`}
      >
        {name}
      </Label>
      <div className="flex flex-grid items-center gap-2">
        <p className="text-sm">Consumo {consumption}</p>
        <p className="text-sm">Intensidade {i}</p>
        <p className="text-sm">Tensão {v}</p>
        <p className="text-sm">Potência {p}</p>
      </div>

      <Switch
        id="airplane-mode"
        checked={active}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
