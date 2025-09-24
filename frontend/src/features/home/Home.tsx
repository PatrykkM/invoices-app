import React from "react";
import InvoicePreview from "./components/InvoicePreview";
import { InvoiceForm } from "./components/InvoiceForm";

const Home = () => {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <InvoiceForm />
      <InvoicePreview />
    </div>
  );
};

export default Home;
