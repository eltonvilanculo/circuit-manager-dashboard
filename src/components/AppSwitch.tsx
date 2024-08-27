"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

type Props = {
  name: string;
  id: number;
};

export default function AppSwitch({ name, id }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    // TODO: Call firebase
    setIsActive(!isActive);
  };

  return (
    <div
      className={`flex flex-col  items-center space-y-4 p-8  rounded-2xl text-center font-normal transition-colors ${
        isActive
          ? "bg-primary-foreground text-white transition-all duration-3000"
          : "bg-gray-300 text-black"
      }`}
    >
      <Label
        htmlFor="airplane-mode"
        className={`px-3 py-1 rounded-2xl text-center w-full font-semibold transition-colors ${
          isActive ? " text-white transition-all duration-3000" : " text-black"
        }`}
      >
        {name}
      </Label>
      <Switch
        id="airplane-mode"
        checked={isActive}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
