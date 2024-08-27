import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
  buttonLabel?: string;
};
export default function AppSideModal({
  title,
  description,
  children,
  buttonLabel = "Criar",
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{buttonLabel}</Button>
      </SheetTrigger>
      <SheetContent className="w-[1000px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
