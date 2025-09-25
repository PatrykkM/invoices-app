"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export function InvoicesTable({
  items,
}: {
  items?: { description?: string; quantity?: number; netPrice?: number }[];
}) {
  const mockData = [
    { description: "Item 1", quantity: 2, netPrice: 50 },
    { description: "Item 2", quantity: 1, netPrice: 100 },
    { description: "Item 3", quantity: 5, netPrice: 20 },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockData?.map((item, i) => (
          <TableRow key={i} className="h-14">
            <TableCell className="whitespace-normal font-medium [overflow-wrap:anywhere]">
              {item.description}
            </TableCell>
            <TableCell className="w-20 [overflow-wrap:anywhere]">
              {item.quantity}
            </TableCell>
            <TableCell className="w-28 [overflow-wrap:anywhere]">
              ${item.netPrice}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
