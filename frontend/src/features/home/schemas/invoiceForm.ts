import { z } from "zod";

export const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(2, {
    message: "Invoice number must be at least 2 characters.",
  }),
  invoiceDate: z
    .date()
    .refine((d) => !Number.isNaN(d.getTime()), { message: "Invalid date" })
    .refine((d) => d <= new Date(), {
      message: "Date cannot be in the future",
    }),
  dueDate: z
    .date()
    .refine((d) => !Number.isNaN(d.getTime()), { message: "Invalid date" })
    .refine((d) => d <= new Date(), {
      message: "Date cannot be in the future",
    }),
  buyer: z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    NIP: z.string().min(10, { message: "NIP must be at least 10 characters." }),
  }),
  items: z
    .array(
      z.object({
        description: z
          .string()
          .min(2, { message: "Item name must be at least 2 characters." }),
        quantity: z
          .number()
          .min(1, { message: "Quantity must be at least 1." }),
        netPrice: z
          .number()
          .min(0.01, { message: "Net price must be at least 0.01." }),
      }),
    )
    .min(1, { message: "At least one item is required." }),
});

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;
