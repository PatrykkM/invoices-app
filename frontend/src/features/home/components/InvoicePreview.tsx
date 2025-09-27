import React, { useMemo } from "react";
import IacText from "@/src/components/ui/IacText";
import { useFormContext, useWatch } from "react-hook-form";
import { InvoiceFormValues } from "../schemas/invoiceForm";
import { format } from "date-fns";
import { InvoicePreviewTotal } from "./InvoicePreviewTotal";
import { InvoicePreviewTable } from "./InvoicePreviewTable";

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

  const totalPrice = useMemo(() => {
    if (!items) return 0;
    return items.reduce((acc, item) => {
      const net = item.netPrice ?? 0;
      const qty = item.quantity ?? 0;
      return acc + net * qty;
    }, 0);
  }, [items]);

  const tax = useMemo(() => {
    return totalPrice * 0.23;
  }, [totalPrice]);

  return (
    <div className="flex flex-1 flex-col gap-6 bg-accent100 p-12">
      <IacText
        text="Invoice Preview"
        size="2xl"
        weight="bold"
        color="base1000"
      />
      <div className="flex flex-col gap-12 overflow-hidden rounded-lg bg-white p-12 shadow-sm">
        <div className="flex flex-col">
          <IacText
            text="Invoice No."
            color="base300"
            size="sm"
            weight="medium"
          />
          <IacText
            text={invoiceNumber ?? ""}
            color="accent200"
            weight="bold"
            size="sm"
            className="[overflow-wrap:anywhere]"
          />
        </div>

        <div className="flex items-center gap-2">
          <IacText text="Summary" color="base300" size="sm" />
          <div className="h-[2px] w-full bg-base200" />
        </div>

        <div className="flex flex-1 flex-row flex-wrap justify-between gap-2">
          <LabeledValue label="NIP" value={buyer?.NIP ?? ""} />
          <LabeledValue label="Buyer name" value={buyer?.name ?? ""} />
          <div className="flex flex-col">
            <IacText
              text={`Invoice date: ${
                issueDate ? format(issueDate, "dd-MM-yyyy") : "---"
              }`}
              size="sm"
              weight="medium"
            />
            <IacText
              text={`Due date: ${dueDate ? format(dueDate, "dd-MM-yyyy") : "---"}`}
              size="sm"
              weight="medium"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <InvoicePreviewTable items={items} />

          <InvoicePreviewTotal
            subtotal={`$${totalPrice.toFixed(2)}`}
            tax={`$${tax.toFixed(2)}`}
            total={`$${(totalPrice + tax).toFixed(2)}`}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;

const LabeledValue: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col">
    <IacText text={label} size="sm" weight="bold" />
    <IacText
      text={value}
      color="accent200"
      weight="bold"
      size="sm"
      className="[overflow-wrap:anywhere]"
    />
  </div>
);
