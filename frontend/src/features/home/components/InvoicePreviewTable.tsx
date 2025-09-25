import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export function InvoicePreviewTable({
  items,
}: {
  items?: { description?: string; quantity?: number; netPrice?: number }[];
}) {
  return (
    <Table className="w-full">
      <TableHeader className="h-14 bg-accent200">
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item, i) => (
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
