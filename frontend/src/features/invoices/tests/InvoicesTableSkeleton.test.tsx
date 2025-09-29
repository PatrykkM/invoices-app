import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { InvoicesTableSkeleton } from "../components/InvoicesSkeleton";

describe("InvoicesTableSkeleton", () => {
  it("renders default 8 skeleton rows", () => {
    const { container } = render(<InvoicesTableSkeleton />);
    const bodyRows = container.querySelectorAll("tbody tr");
    expect(bodyRows.length).toBe(8);

    screen.getAllByRole("button").forEach((b) => {
      expect(b).toBeDisabled();
    });
  });

  it("respects custom rows prop", () => {
    const { container } = render(<InvoicesTableSkeleton rows={3} />);
    const bodyRows = container.querySelectorAll("tbody tr");
    expect(bodyRows.length).toBe(3);
  });
});
