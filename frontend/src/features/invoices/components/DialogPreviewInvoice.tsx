"use client";

import InvoicePreviewContent from "@/src/components/layouts/InvoicePreviewContent";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { InvoiceDto } from "@/src/types/invoiceDto";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: InvoiceDto;
};

export function DialogPreviewInvoice({ open, onOpenChange, invoice }: Props) {
  if (!invoice) return undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{`${invoice.invoiceNumber}`}</DialogTitle>
        </DialogHeader>
        <InvoicePreviewContent invoice={invoice} />
        <DialogDescription asChild>
          <VisuallyHidden>
            Podgląd faktury {invoice.invoiceNumber}
          </VisuallyHidden>
        </DialogDescription>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
