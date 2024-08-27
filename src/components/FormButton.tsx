"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";

interface FormButtonProps {
  text?: string;
}

export default function FormButton({
  text = "Submeter",
  ...rest
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} disabled={pending} type="submit" className="text-white">
      {pending ? <Circle className="mr-2 h-4 w-4 animate-spin" /> : null}
      {text}
    </Button>
  );
}
