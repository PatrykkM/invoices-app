import { InvoiceFormValues } from "../features/home/schemas/invoiceForm";

export interface InvoiceDto extends InvoiceFormValues {
  id: string;
}
