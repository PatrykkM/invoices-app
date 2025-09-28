"use client";

import React, { useEffect, useState } from "react";
import InvoicePreview from "./components/InvoicePreview";
import { InvoiceForm } from "./components/InvoiceForm";
import { invoiceFormSchema, InvoiceFormValues } from "./schemas/invoiceForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { InvoiceDto } from "@/src/types/invoiceDto";

const defaultValues: InvoiceFormValues = {
  invoiceNumber: "",
  issueDate: undefined,
  dueDate: undefined,
  buyer: { name: "", NIP: "" },
  items: [{ description: "", quantity: 0, netPrice: 0 }],
};

const Home = () => {
  const router = useRouter();

  const params = useParams();

  const queryClient = useQueryClient();

  const invoiceId = params?.id?.[0];

  const invoiceForm = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: defaultValues,
  });

  const [editedInvoiceId, setEditedInvoiceId] = useState("");

  useEffect(() => {
    if (!invoiceId) return;

    const list = queryClient.getQueryData<InvoiceDto[]>(["invoices"]);

    const inv = list?.find((i) => i.id === invoiceId);

    if (inv) {
      invoiceForm.reset({
        invoiceNumber: inv.invoiceNumber ?? "",
        issueDate: inv.issueDate ? new Date(inv.issueDate) : undefined,
        dueDate: inv.dueDate ? new Date(inv.dueDate) : undefined,
        buyer: { name: inv.buyer?.name ?? "", NIP: inv.buyer?.NIP ?? "" },
        items:
          inv.items?.map((it) => ({
            description: it.description ?? "",
            quantity: it.quantity ?? 0,
            netPrice: it.netPrice ?? 0,
          })) ?? [],
      });
      setEditedInvoiceId(invoiceId);
    } else {
      router.replace("/home");
    }
  }, [invoiceId, queryClient, invoiceForm, router]);

  return (
    <FormProvider {...invoiceForm}>
      <div className="flex h-full flex-col lg:flex-row">
        <InvoiceForm
          invoiceForm={invoiceForm}
          editedInvoiceId={editedInvoiceId}
        />
        <InvoicePreview />
      </div>
    </FormProvider>
  );
};

export default Home;
