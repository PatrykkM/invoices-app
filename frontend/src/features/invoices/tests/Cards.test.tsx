import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Cards } from "../components/Cards";
import { useGetCardData } from "../hooks/useGetCardData";

jest.mock("../hooks/useGetCardData");
jest.mock("@/src/components/ui/IacText", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));
jest.mock("@/src/components/ui/skeleton", () => ({
  __esModule: true,
  Skeleton: () => <div role="status">loading</div>,
}));

const mockHook = useGetCardData as jest.MockedFunction<typeof useGetCardData>;

beforeEach(() => {
  mockHook.mockReturnValue({
    totalInvoices: 0,
    grossRevenue: 0,
    netRevenue: 0,
    averageInvoiceCost: "0",
  });
});

describe("Cards", () => {
  it("shows skeletons while loading", () => {
    render(<Cards data={undefined} isLoading />);
    expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
  });

  it("renders cards with correct labels and values", () => {
    mockHook.mockReturnValue({
      totalInvoices: 5,
      grossRevenue: 500,
      netRevenue: 400,
      averageInvoiceCost: "100",
    });

    render(<Cards data={[]} />);

    [
      "Total Invoices",
      "Gross Revenue",
      "Net Revenue",
      "Average Invoice Cost",
    ].forEach((t) => expect(screen.getByText(t)).toBeInTheDocument());

    ["5", "500", "400", "100"].forEach((v) =>
      expect(screen.getByText(v)).toBeInTheDocument(),
    );
  });
});
