"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

type Props = {
  rows?: number;
};

export function InvoicesTableSkeleton({ rows = 8 }: Props) {
  const cols = [
    "select",
    "invoiceNumber",
    "buyerName",
    "dueDate",
    "issueDate",
    "totalGrossPrice",
    "actions",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="w-full max-w-sm">
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto" disabled>
              <Skeleton className="h-4 w-20" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {cols.map((key) => (
              <TableHead key={key}>
                <Skeleton className="h-4 w-1/2" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, r) => (
            <TableRow key={r}>
              {cols.map((key) => (
                <TableCell key={key}>
                  <Skeleton className="h-4 w-2/3" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Skeleton className="h-4 w-12" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Skeleton className="h-4 w-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}
