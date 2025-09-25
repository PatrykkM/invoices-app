import IacText from "@/src/components/ui/IacText";

type InvoiceTotalsProps = {
  subtotal: string;
  tax: string;
  total: string;
};

export const InvoicePreviewTotal: React.FC<InvoiceTotalsProps> = ({
  subtotal,
  tax,
  total,
}) => {
  return (
    <div className="flex w-72 flex-col gap-2 self-end">
      <div className="flex w-full flex-row justify-between gap-2">
        <IacText text="SubTotal " size="sm" color="base400" weight="bold" />
        <IacText
          text={subtotal}
          size="sm"
          color="base1000"
          weight="bold"
          truncate
          className="min-w-0"
        />
      </div>

      <div className="flex w-full flex-row justify-between gap-2">
        <IacText text="Tax" size="sm" color="base400" weight="bold" />
        <IacText
          text={tax}
          size="sm"
          color="base1000"
          weight="bold"
          truncate
          className="min-w-0"
        />
      </div>
      <div className="border-t border-t-base200 pt-2">
        <div className="mt-1 flex w-full flex-row items-center justify-between gap-2">
          <IacText text="Invoice Total" color="base1000" weight="bold" />
          <IacText
            text={total}
            size="2xl"
            color="accent200"
            weight="bold"
            truncate
            className="min-w-0"
          />
        </div>
      </div>
    </div>
  );
};
