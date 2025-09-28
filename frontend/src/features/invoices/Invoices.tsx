"use client";

import React from "react";
import IacText from "@/src/components/ui/IacText";
import { Cards } from "./components/Cards";
import Header from "./components/Header";
import { InvoicesTable } from "./components/InvoicesTable";
import { useGetInvoices } from "./hooks/useGetInvoices";

const Invoices = () => {
  const { data, isLoading } = useGetInvoices();

  return (
    <div className="flex h-full flex-1 flex-col gap-8 bg-base50 px-16 py-6">
      <IacText text="Invoices" size="2xl" weight="bold" />
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-6">
        <Header />
        <Cards data={data} isLoading={isLoading} />
        <InvoicesTable data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Invoices;
