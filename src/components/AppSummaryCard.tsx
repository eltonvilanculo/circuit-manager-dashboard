import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  active?: boolean;
};
export const AppSummaryCard = ({
  title,
  description,
  icon,
  active = false,
}: Props) => {
  return (
    <Card
      className={`${
        active
          ? "bg-white text-primary-foreground"
          : "bg-primary-foreground text-white"
      } p-1/2`}
    >
      <CardHeader>
        <CardTitle className="text-md truncate font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">{description} </CardDescription>
        <div className="flex flex-row justify-between">
          <div className="grid grid-cols-[min-content_1fr] gap-1 items-center">
            <span className="text-xs px-2  rounded-sm bg-primary">16</span>
            <p className="text-xs font-light">Compartimentos</p>
          </div>
          <div className="grid grid-cols-[min-content_1fr] gap-1 items-center">
            <span className="text-xs px-2  rounded-sm bg-primary">16</span>
            <p className="text-xs font-light">Compartimentos</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
