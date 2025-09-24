export const invoiceTextFields = [
  {
    name: "invoiceNumber",
    label: "Invoice Number",
    placeholder: "FV/2025/01/01",
  },
  { name: "buyer.name", label: "Buyer Name", placeholder: "Patryk" },
  { name: "buyer.NIP", label: "Buyer NIP", placeholder: "1234567890" },
] as const;

export const invoiceDateFields = [
  { name: "issueDate", label: "Issue Date" },
  { name: "dueDate", label: "Due Date" },
] as const;
