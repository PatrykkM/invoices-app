import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceForm } from "../components/InvoiceForm";
import {
  invoiceFormSchema,
  type InvoiceFormValues,
} from "../schemas/invoiceForm";

jest.mock("@/src/components/ui/datePicker", () => ({
  DatePicker: ({
    value,
    onChange,
  }: {
    value?: Date;
    onChange: (d?: Date) => void;
  }) => (
    <input
      aria-label="date"
      type="date"
      value={value ? new Date(value).toISOString().slice(0, 10) : ""}
      onChange={(e) =>
        onChange(e.target.value ? new Date(e.target.value) : undefined)
      }
    />
  ),
}));

jest.mock("../components/ImportFromJsonButton", () => ({
  ImportFromJsonButton: () => <div aria-hidden="true" />,
}));

type NFProps = {
  name?: string;
  value?: string | number;
  onValueChange?: (v: { floatValue?: number; value: string }) => void;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
  id?: string;
};

jest.mock("react-number-format", () => ({
  NumericFormat: (props: NFProps) => {
    const { value, onValueChange, inputMode, className, id, name } = props;
    return (
      <input
        id={id}
        name={name}
        className={className}
        type="number"
        inputMode={
          (inputMode ??
            "numeric") as React.InputHTMLAttributes<HTMLInputElement>["inputMode"]
        }
        value={value ?? ""}
        onChange={(e) =>
          onValueChange?.({
            floatValue:
              e.target.value === "" ? undefined : parseFloat(e.target.value),
            value: e.target.value,
          })
        }
      />
    );
  },
}));

let mockCreate: jest.Mock;
let mockEdit: jest.Mock;

beforeEach(() => {
  mockCreate = jest.fn();
  mockEdit = jest.fn();
});

jest.mock("../hooks/useCreateInvoice", () => ({
  __esModule: true,
  default: () => ({ mutate: mockCreate }),
}));

jest.mock("../hooks/useEditInvoice", () => ({
  __esModule: true,
  default: () => ({ mutate: mockEdit }),
}));

function TestWrapper(props: {
  editedInvoiceId?: string;
  defaults?: Partial<InvoiceFormValues>;
}) {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "",
      issueDate: undefined,
      dueDate: undefined,
      buyer: { name: "", NIP: "" },
      items: [{ description: "", quantity: 1, netPrice: 0 }],
      ...props.defaults,
    },
    mode: "onSubmit",
  });
  return (
    <InvoiceForm invoiceForm={form} editedInvoiceId={props.editedInvoiceId} />
  );
}

function renderForm(props?: {
  editedInvoiceId?: string;
  defaults?: Partial<InvoiceFormValues>;
}) {
  render(<TestWrapper {...(props || {})} />);
}

describe("InvoiceForm", () => {
  it("renders fields and default item", () => {
    renderForm();
    expect(screen.getByLabelText(/invoice number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/buyer name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/buyer nip/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/item description/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create invoice/i }),
    ).not.toBeDisabled();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /create invoice/i }));

    expect(
      await screen.findByText(/invoice number must be at least 2/i),
    ).toBeInTheDocument();

    const nameErrors = await screen.findAllByText(/name must be at least 2/i);
    expect(nameErrors.length).toBeGreaterThan(0);

    expect(
      await screen.findByText(/issue date is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/due date is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/nip must be at least 8/i),
    ).toBeInTheDocument();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("adds and removes items", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: "" }));
    const descInputs = screen.getAllByPlaceholderText(/item description/i);
    expect(descInputs.length).toBeGreaterThanOrEqual(2);
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    for (const btn of removeButtons) await user.click(btn);
    expect(await screen.findByText(/no items yet/i)).toBeInTheDocument();
  });

  it("submits valid data and calls createInvoice", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/invoice number/i), "FV-2025-001");
    await user.type(screen.getByLabelText(/buyer name/i), "ACME");
    await user.type(screen.getByLabelText(/buyer nip/i), "12345678");

    const dateInputs = screen.getAllByLabelText("date");
    await user.type(dateInputs[0], "2025-01-01");
    await user.type(dateInputs[1], "2025-01-31");

    const desc = screen.getByPlaceholderText(/item description/i);
    const qty = document.querySelector(
      'input[name="items.0.quantity"]',
    ) as HTMLInputElement;
    const price = document.querySelector(
      'input[name="items.0.netPrice"]',
    ) as HTMLInputElement;

    await user.clear(desc);
    await user.type(desc, "Service A");

    fireEvent.change(qty, { target: { value: "2" } });
    fireEvent.change(price, { target: { value: "150" } });

    await user.click(screen.getByRole("button", { name: /create invoice/i }));

    expect(mockCreate).toHaveBeenCalledTimes(1);
    const payload = mockCreate.mock.calls[0][0] as InvoiceFormValues;
    expect(payload.invoiceNumber).toBe("FV-2025-001");
    expect(payload.buyer.name).toBe("ACME");
    expect(payload.buyer.NIP).toBe("12345678");
    expect(payload.items[0]).toMatchObject({
      description: "Service A",
      quantity: 2,
      netPrice: 150,
    });
    expect(payload.issueDate instanceof Date).toBe(true);
    expect(payload.dueDate instanceof Date).toBe(true);
  });

  it("calls editInvoice in edit mode and shows correct label", async () => {
    const user = userEvent.setup();
    renderForm({ editedInvoiceId: "abc123" });

    expect(screen.getByText(/you are in edit mode/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/invoice number/i), "FV-2");
    await user.type(screen.getByLabelText(/buyer name/i), "AA");
    await user.type(screen.getByLabelText(/buyer nip/i), "12345678");

    const [issue, due] = screen.getAllByLabelText("date");
    await user.type(issue, "2025-01-01");
    await user.type(due, "2025-01-31");

    const desc = screen.getByPlaceholderText(/item description/i);
    const price = document.querySelector(
      'input[name="items.0.netPrice"]',
    ) as HTMLInputElement;

    await user.type(desc, "OK");
    fireEvent.change(price, { target: { value: "1" } });

    await user.click(screen.getByRole("button", { name: /save changes/i }));
    expect(mockEdit).toHaveBeenCalled();
  });

  it("resets form to default values", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/invoice number/i), "FV-XYZ");
    await user.click(screen.getByRole("button", { name: /reset/i }));
    expect(
      (screen.getByLabelText(/invoice number/i) as HTMLInputElement).value,
    ).toBe("");
    expect(screen.getAllByPlaceholderText(/item description/i).length).toBe(1);
  });
});
