import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { InvoiceFormValues } from "../schemas/invoiceForm";
import InvoicePreviewContent from "@/src/components/layouts/InvoicePreviewContent";

type InvoiceSummary = {
  invoiceNo: string;
  buyerName: string;
  invoiceDate: string;
  dueDate: string;
};

type InvoicePreviewProps = {
  summary?: InvoiceSummary;
  lineItems?: string[][];
  columns?: string[];
};

const InvoicePreview: React.FC<InvoicePreviewProps> = () => {
  const { control } = useFormContext<InvoiceFormValues>();
  const { buyer, dueDate, invoiceNumber, issueDate, items } = useWatch({
    control,
  });

  return (
    <InvoicePreviewContent
      invoice={{
        id: "",
        invoiceNumber: invoiceNumber ?? "",
        issueDate,
        dueDate: dueDate,
        buyer: {
          name: buyer?.name ?? "",
          NIP: buyer?.NIP ?? "",
        },
        items: (items ?? []).map((item) => ({
          description: item.description ?? "",
          quantity: item.quantity ?? 0,
          netPrice: item.netPrice ?? 0,
        })),
      }}
    />
  );
};

export default InvoicePreview;
