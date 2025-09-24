import { z } from "zod";
import { invoiceFormSchema } from "../schemas/invoiceForm";

export const invoiceImportSchema = z
  .object({
    invoiceNumber: z.string(),
    invoiceDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    buyer: z.object({
      name: z.string(),
      NIP: z.string(),
    }),
    items: z.array(
      z.object({
        description: z.string(),
        quantity: z.coerce.number(),
        netPrice: z.coerce.number(),
      }),
    ),
  })
  .pipe(invoiceFormSchema);
