import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  label?: string;
  href: string;
};

export default function AppButton({ label = "Criar", href }: Props) {
  return (
    <Link href={href}>
      <Button className="bg-primary-foreground text-white rounded-md">
        {label}
      </Button>
    </Link>
  );
}
