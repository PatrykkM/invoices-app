"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

interface TableData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  NIP: string;
  totalGrossPrice: number;
}

export function InvoicesTable({
  items,
}: {
  items?: { description?: string; quantity?: number; netPrice?: number }[];
}) {
  const mockData: TableData[] = [
    {
      invoiceNumber: "Item 1",
      issueDate: "2023-10-10",
      dueDate: "2023-10-20",
      NIP: "123-456-78-90",
      totalGrossPrice: 100,
    },
    {
      invoiceNumber: "Item 2",
      issueDate: "2023-11-01",
      dueDate: "2023-11-10",
      NIP: "123-456-78-90",
      totalGrossPrice: 100,
    },
    {
      invoiceNumber: "Item 3",
      issueDate: "2023-12-01",
      dueDate: "2023-12-20",
      NIP: "123-456-78-90",
      totalGrossPrice: 100,
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice Number</TableHead>
          <TableHead>Issue Date</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>NIP</TableHead>
          <TableHead>Total Gross Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockData?.map((item, i) => (
          <TableRow key={i} className="h-14">
            <TableCell className="whitespace-normal font-medium [overflow-wrap:anywhere]">
              {item.invoiceNumber}
            </TableCell>
            <TableCell className="whitespace-normal font-medium [overflow-wrap:anywhere]">
              {item.NIP}
            </TableCell>
            <TableCell className="whitespace-normal font-medium [overflow-wrap:anywhere]">
              {item.issueDate}
            </TableCell>
            <TableCell className="whitespace-normal font-medium [overflow-wrap:anywhere]">
              {item.dueDate}
            </TableCell>
            <TableCell>{item.totalGrossPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
