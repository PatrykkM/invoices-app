"use client";

import React, { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { FileJson } from "lucide-react";
import { z } from "zod";
import {
  invoiceFormSchema,
  type InvoiceFormValues,
} from "../schemas/invoiceForm";
import { toast } from "sonner";

const invoiceImportSchema = z
  .object({
    invoiceNumber: z.string(),
    issueDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    buyer: z.object({ name: z.string(), NIP: z.string() }),
    items: z.array(
      z.object({
        description: z.string(),
        quantity: z.coerce.number(),
        netPrice: z.coerce.number(),
      }),
    ),
  })
  .transform((data) => invoiceFormSchema.parse(data));

export function ImportFromJsonButton({
  form,
}: {
  form: UseFormReturn<InvoiceFormValues>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = () => fileRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const raw = JSON.parse(text);
      const parsed = invoiceImportSchema.parse(raw);
      toast.success("Successfully imported invoice data");
      form.reset(parsed);
    } catch (err) {
      toast.error(`Failed to import invoice data ${err}`);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={onFile}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="cursor-pointer gap-2"
        onClick={onPick}
      >
        <FileJson size={16} />
        Import from JSON
      </Button>
    </>
  );
}
