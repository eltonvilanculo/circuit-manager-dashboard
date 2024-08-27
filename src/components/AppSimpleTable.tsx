import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ComponentProps } from "react";

// Extract props from Text component
type TableProps = ComponentProps<typeof Table>;

type Props = {} & TableProps;

export default function AppSimpleTable({ ...rest }: Props) {
  return (
    <Table {...rest}>
      <TableHeader className="bg-gray-300">
        <TableRow>
          <TableHead className="">Idioma</TableHead>
          <TableHead>Função</TableHead>
          <TableHead>Tipo de Papel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Português</TableCell>
          <TableCell>000</TableCell>
          <TableCell>000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Inglês</TableCell>
          <TableCell>000</TableCell>
          <TableCell>000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
