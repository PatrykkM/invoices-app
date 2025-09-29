import "@testing-library/jest-dom";
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { InvoicePreviewTable } from "../components/InvoicePreviewTable";

jest.mock("@/src/components/ui/table", () => ({
  __esModule: true,
  Table: ({ children }: React.PropsWithChildren) => <table>{children}</table>,
  TableHeader: ({ children }: React.PropsWithChildren) => (
    <thead>{children}</thead>
  ),
  TableBody: ({ children }: React.PropsWithChildren) => (
    <tbody>{children}</tbody>
  ),
  TableRow: ({ children }: React.PropsWithChildren) => <tr>{children}</tr>,
  TableHead: ({ children }: React.PropsWithChildren) => <th>{children}</th>,
  TableCell: ({ children }: React.PropsWithChildren) => <td>{children}</td>,
}));

describe("InvoicePreviewTable", () => {
  it("renders headers and rows", () => {
    render(
      <InvoicePreviewTable
        items={[
          { description: "Item A", quantity: 2, netPrice: 100 },
          { description: "Item B", quantity: 1, netPrice: 59 },
        ]}
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "Description" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Qty" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Price" }),
    ).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    const bodyRow = rows[1];
    expect(within(bodyRow).getByText("Item A")).toBeInTheDocument();
    expect(within(bodyRow).getByText("2")).toBeInTheDocument();
    expect(within(bodyRow).getByText("$100")).toBeInTheDocument();

    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("$59")).toBeInTheDocument();
  });

  it("renders only header when no items", () => {
    render(<InvoicePreviewTable items={[]} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });
});
