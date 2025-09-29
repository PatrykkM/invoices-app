import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InvoicesTable } from "../components/InvoicesTable";
import type { InvoiceDto } from "@/src/types/invoiceDto";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/src/hooks/useGetInvoiceTotals", () => ({
  useGetInvoiceTotals: ({
    items,
  }: {
    items: { netPrice: number; quantity: number }[];
  }) => ({
    grossTotal: items.reduce(
      (a, i) => a + (i.netPrice ?? 0) * (i.quantity ?? 0),
      0,
    ),
  }),
}));

const makeRow = (i: number): InvoiceDto => ({
  id: `id-${i}`,
  invoiceNumber: `FV-${String(i).padStart(3, "0")}`,
  issueDate: new Date(),
  dueDate: new Date(),
  buyer: { name: `Buyer ${i}`, NIP: "1234567890" },
  items: [{ description: "X", netPrice: 50, quantity: 2 }],
});

const renderWithClient = (ui: React.ReactElement) => {
  const qc = new QueryClient();
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe("InvoicesTable sad paths", () => {
  it("shows empty state when no data", () => {
    renderWithClient(<InvoicesTable data={[]} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("shows empty after filtering unmatched invoice", async () => {
    const user = userEvent.setup();
    renderWithClient(<InvoicesTable data={[makeRow(1), makeRow(2)]} />);
    await user.type(
      screen.getByPlaceholderText(/filter by invoice number/i),
      "XYZ",
    );
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
