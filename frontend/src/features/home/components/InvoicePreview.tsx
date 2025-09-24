import React from "react";
import IacText, { IacTextColor } from "@/src/components/ui/IacText";

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

const DEFAULT_COLUMNS = ["Item", "Qty", "Amount"];

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  summary = {
    invoiceNo: "21312312312",
    buyerName: "John Doe",
    invoiceDate: "01/01/2023",
    dueDate: "01/01/2023",
  },
  lineItems = [["Item 3", "1", "$10.00"]],
  columns = DEFAULT_COLUMNS,
}) => {
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
            text={summary.invoiceNo}
            color="accent200"
            weight="bold"
            size="sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <IacText text="Summary" color="base300" size="sm" />
          <div className="h-[2px] w-full bg-base200" />
        </div>

        <div className="flex flex-row flex-wrap justify-between gap-2">
          <LabeledValue label="Invoice No." value={summary.invoiceNo} />
          <LabeledValue label="Buyer name" value={summary.buyerName} />
          <div className="flex flex-col">
            <IacText
              text={`Invoice date ${summary.invoiceDate}`}
              size="sm"
              weight="medium"
            />
            <IacText
              text={`Due date ${summary.dueDate}`}
              size="sm"
              weight="medium"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col overflow-hidden rounded-lg border border-base200">
            <SingleRow items={columns} isHeader />
            {lineItems.map((row, idx) => (
              <SingleRow key={idx} items={padTo(row, columns.length)} />
            ))}
          </div>
          <InvoiceTotals subtotal="$100" tax="$23" total="$123" />
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
    <IacText text={value} color="accent200" weight="bold" size="sm" />
  </div>
);

const SingleRow: React.FC<{ items: string[]; isHeader?: boolean }> = ({
  items,
  isHeader,
}) => {
  const styles = singleRowStyles(isHeader);
  return (
    <div
      className={`flex flex-row justify-between gap-2 p-4 ${styles.background}`}
    >
      {items.map((text, index) => (
        <IacText
          key={`${text}-${index}`}
          text={text}
          size="sm"
          color={styles.text}
          className={`${index === 0 ? "flex-[3]" : "flex-1"} truncate`}
          weight={isHeader ? "bold" : "medium"}
        />
      ))}
    </div>
  );
};

const singleRowStyles = (
  isHeader?: boolean,
): { text: IacTextColor; background: string } =>
  isHeader
    ? { text: "base100", background: "bg-accent200" }
    : { text: "base1000", background: "bg-white" };

const padTo = <T,>(arr: T[], len: number, fill: T | "" = "" as T): T[] => {
  if (arr.length >= len) return arr.slice(0, len);
  return [...arr, ...Array(len - arr.length).fill(fill)];
};

type InvoiceTotalsProps = {
  subtotal: string;
  tax: string;
  total: string;
};

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({
  subtotal,
  tax,
  total,
}) => {
  return (
    <div className="flex w-72 flex-col gap-2 self-end">
      <div className="flex w-full flex-row justify-between gap-2">
        <IacText text="SubTotal " size="sm" color="base400" weight="bold" />
        <IacText text={subtotal} size="sm" color="base1000" weight="bold" />
      </div>

      <div className="flex w-full flex-row justify-between gap-2">
        <IacText text="Tax" size="sm" color="base400" weight="bold" />
        <IacText text={tax} size="sm" color="base1000" weight="bold" />
      </div>
      <div className="border-t border-t-base200 pt-2">
        <div className="mt-1 flex w-full flex-row items-center justify-between gap-2">
          <IacText text="Invoice Total" color="base1000" weight="bold" />
          <IacText
            text={total + 12341}
            size="2xl"
            color="accent200"
            weight="bold"
            truncate
          />
        </div>
      </div>
    </div>
  );
};
