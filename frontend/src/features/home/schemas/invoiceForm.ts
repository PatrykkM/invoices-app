import { z } from "zod";

export const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(2, {
    message: "Invoice number must be at least 2 characters.",
  }),

  issueDate: z
    .union([z.date(), z.undefined()])
    .refine((d) => d !== undefined, { message: "Invoice date is required" })
    .refine((d) => d === undefined || !Number.isNaN(d.getTime()), {
      message: "Invalid issue date",
    }),

  dueDate: z
    .union([z.date(), z.undefined()])
    .refine((d) => d !== undefined, { message: "Due date is required" })
    .refine((d) => d === undefined || !Number.isNaN(d.getTime()), {
      message: "Invalid due date",
    }),
  buyer: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    NIP: z.string().min(8, { message: "NIP must be at least 8 characters." }),
  }),
  items: z
    .array(
      z.object({
        description: z
          .string()
          .min(2, { message: "Item name must be at least 2 characters." }),
        quantity: z.coerce
          .number()
          .int()
          .min(1, { message: "Quantity must be at least 1." }),
        netPrice: z.coerce
          .number()
          .min(0.01, { message: "Net price must be at least 0.01." }),
      }),
    )
    .min(1, { message: "At least one item is required." }),
});

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;
