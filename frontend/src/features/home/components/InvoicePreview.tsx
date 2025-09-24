import IacText from "@/src/components/ui/IacText";
import React from "react";

const InvoicePreview = () => {
  return (
    <div className="bg-accent100 flex flex-1 flex-col gap-6 p-12">
      <IacText
        text="Invoice Preview"
        size="2xl"
        weight="bold"
        color="base1000"
      />
      <div className="bg-white flex flex-col gap-12 p-12">
        <div className="flex flex-col">
          <IacText
            text="Invoice No."
            color="base300"
            size="sm"
            weight="medium"
          />
          <IacText
            text="21312312312"
            color="accent200"
            weight="bold"
            size="sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <IacText text="Summary" color="base300" size="sm" />
          <div className="bg-base200 h-[2px] w-full" />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col">
            <IacText text="Invoice No." size="sm" weight="bold" />
            <IacText
              text="21312312312"
              color="accent200"
              weight="bold"
              size="sm"
            />
          </div>
          <div className="flex flex-col">
            <IacText text="Buyer name" size="sm" weight="bold" />
            <IacText
              text="21312312312"
              color="accent200"
              weight="bold"
              size="sm"
            />
          </div>
          <div className="flex flex-col">
            <IacText text="Invoice date 01/01/2023" size="sm" weight="medium" />
            <IacText text="Due date 01/01/2023" weight="medium" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
