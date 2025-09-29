import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InvoicesTable } from "../components/InvoicesTable";
import type { InvoiceDto } from "@/src/types/invoiceDto";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/src/hooks/useGetInvoiceTotals", () => ({
  useGetInvoiceTotals: ({
    items,
  }: {
    items: { netPrice?: number; quantity?: number }[];
  }) => ({
    grossTotal: items.reduce(
      (a, i) => a + (i.netPrice ?? 0) * (i.quantity ?? 0),
      0,
    ),
  }),
}));

const row = (i: number, o: Partial<InvoiceDto> = {}): InvoiceDto => ({
  id: `id-${i}`,
  invoiceNumber: `FV-${String(i).padStart(3, "0")}`,
  issueDate: new Date(2025, 0, 1 + i),
  dueDate: new Date(2025, 0, 10 + i),
  buyer: { name: `Buyer ${i}`, NIP: "1234567890" },
  items: [{ description: "X", netPrice: 50, quantity: 2 }],
  ...o,
});

const renderWithProviders = (ui: React.ReactElement) => {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe("InvoicesTable", () => {
  it("filters by invoice number", async () => {
    const user = userEvent.setup();
    renderWithProviders(<InvoicesTable data={[row(1), row(2), row(33)]} />);
    await user.type(
      screen.getByPlaceholderText(/filter by invoice number/i),
      "FV-033",
    );
    expect(screen.queryByText("FV-001")).not.toBeInTheDocument();
    expect(screen.getByText("FV-033")).toBeInTheDocument();
  });

  it("selects a row and shows counter", async () => {
    const user = userEvent.setup();
    renderWithProviders(<InvoicesTable data={[row(1), row(2), row(3)]} />);
    const firstRowCheckbox = screen.getAllByRole("checkbox", {
      name: /select row/i,
    })[0];
    await user.click(firstRowCheckbox);
    expect(screen.getByText(/1 of 3 row\(s\) selected/i)).toBeInTheDocument();
  });

  it("shows gross total per row", () => {
    renderWithProviders(
      <InvoicesTable
        data={[
          row(1, { items: [{ description: "A", netPrice: 10, quantity: 3 }] }),
          row(2, { items: [{ description: "B", netPrice: 7.5, quantity: 2 }] }),
        ]}
      />,
    );
    const money = screen.getAllByText(/^\$/);
    expect(money[0]).toHaveTextContent("$30");
    expect(money[1]).toHaveTextContent("$15");
  });
});
