import React from "react";
import InvoicePreview from "./components/InvoicePreview";
import { InvoiceForm } from "./components/InvoiceForm";

const Home = () => {
  return (
    <div className="flex flex-row px-6 py-6">
      <InvoiceForm />
      <InvoicePreview />
    </div>
  );
};

export default Home;
