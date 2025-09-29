import { describe, it, expect } from "@jest/globals";
import { invoiceFormSchema } from "../schemas/invoiceForm";

describe("invoiceFormSchema", () => {
  const base = {
    invoiceNumber: "FV-2025-001",
    issueDate: new Date("2025-01-01"),
    dueDate: new Date("2025-01-15"),
    buyer: { name: "ACME Sp. z o.o.", NIP: "12345678" },
    items: [{ description: "Service A", quantity: 1, netPrice: 100 }],
  };

  it("passes with valid data", () => {
    const r = invoiceFormSchema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it("requires invoice number with at least 2 characters", () => {
    const r = invoiceFormSchema.safeParse({ ...base, invoiceNumber: "A" });
    expect(r.success).toBe(false);
  });

  it("requires valid issue and due dates", () => {
    const r1 = invoiceFormSchema.safeParse({ ...base, issueDate: undefined });
    const r2 = invoiceFormSchema.safeParse({ ...base, dueDate: undefined });
    const invalidDate = new Date("invalid");
    const r3 = invoiceFormSchema.safeParse({ ...base, issueDate: invalidDate });
    expect(r1.success).toBe(false);
    expect(r2.success).toBe(false);
    expect(r3.success).toBe(false);
  });

  it("validates buyer fields", () => {
    const r = invoiceFormSchema.safeParse({
      ...base,
      buyer: { name: "A", NIP: "123" },
    });
    expect(r.success).toBe(false);
  });

  it("requires at least one item", () => {
    const r = invoiceFormSchema.safeParse({ ...base, items: [] });
    expect(r.success).toBe(false);
  });

  it("validates item details", () => {
    const r = invoiceFormSchema.safeParse({
      ...base,
      items: [{ description: "A", quantity: 0, netPrice: 0 }],
    });
    expect(r.success).toBe(false);
  });
});
