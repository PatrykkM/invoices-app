import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

describe("Header", () => {
  it("renders title and navigates on button click", async () => {
    const user = userEvent.setup();
    render(<Header />);
    expect(screen.getByText(/all invoices/i)).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /create new invoice/i }),
    );
    expect(mockPush).toHaveBeenCalledWith("/home");
  });
});
