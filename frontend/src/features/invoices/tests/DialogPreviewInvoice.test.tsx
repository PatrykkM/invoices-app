import "@testing-library/jest-dom";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DialogPreviewInvoice } from "../components/DialogPreviewInvoice";
import { InvoiceDto } from "@/src/types/invoiceDto";

jest.mock("@/src/components/layouts/InvoicePreviewContent", () => ({
  __esModule: true,
  default: ({ invoice }: { invoice: InvoiceDto }) => (
    <div data-testid="invoice-preview-content">{invoice.invoiceNumber}</div>
  ),
}));

const invoice: InvoiceDto = {
  id: "id-1",
  invoiceNumber: "FV-001",
  buyer: { name: "Buyer A", NIP: "1234567890" },
  items: [{ netPrice: 100, quantity: 1, description: "Item 1" }],
  dueDate: new Date("2025-01-11"),
  issueDate: new Date("2025-01-02"),
};

describe("DialogPreviewInvoice", () => {
  it("renders dialog with invoice title when open", () => {
    render(
      <DialogPreviewInvoice open onOpenChange={jest.fn()} invoice={invoice} />,
    );

    const dialog = screen.getByRole("dialog");

    expect(
      within(dialog).getByRole("heading", { name: "FV-001" }),
    ).toBeInTheDocument();

    expect(
      within(dialog).getByTestId("invoice-preview-content"),
    ).toHaveTextContent("FV-001");

    const closeButtons = within(dialog).getAllByRole("button", {
      name: /close/i,
    });
    expect(closeButtons.length).toBeGreaterThan(0);
  });

  it("calls onOpenChange(false) when any Close button clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <DialogPreviewInvoice
        open
        onOpenChange={onOpenChange}
        invoice={invoice}
      />,
    );

    const dialog = screen.getByRole("dialog");

    const [someCloseBtn] = within(dialog).getAllByRole("button", {
      name: /close/i,
    });

    await user.click(someCloseBtn);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
