"use client";

import React, { useEffect } from "react";
import InvoicePreview from "./components/InvoicePreview";
import { InvoiceForm } from "./components/InvoiceForm";
import { invoiceFormSchema, InvoiceFormValues } from "./schemas/invoiceForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { fetchApi } from "@/src/services/service-base";

const Home = () => {
  useEffect(() => {
    fetchApi("GET", "api/hello").then((data) => console.log(data));
  }, []);

  const invoiceForm = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "",
      issueDate: undefined,
      dueDate: undefined,
      buyer: { name: "", NIP: "" },
      items: [{ description: "", quantity: 0, netPrice: 0 }],
    },
  });
  return (
    <FormProvider {...invoiceForm}>
      <div className="flex h-full flex-col lg:flex-row">
        <InvoiceForm invoiceForm={invoiceForm} />
        <InvoicePreview />
      </div>
    </FormProvider>
  );
};

export default Home;
