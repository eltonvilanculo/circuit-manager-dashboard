import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  name: string;
  link: string;
};

export default function AppCardStats({ name, link }: Props) {
  return (
    <Link href={link}>
      {" "}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="text-2xl font-bold">3</div> */}
        </CardContent>
      </Card>
    </Link>
  );
}
