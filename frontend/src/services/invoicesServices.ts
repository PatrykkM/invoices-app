import { fetchApi } from "@/src/services/serviceBase";
import { InvoiceDto } from "../types/invoiceDto";
import { CreateInvoiceDto } from "../types/createInvoiceDto";

const invoicesService = {
  getInvoices: () => fetchApi<InvoiceDto[]>("GET", "api/invoices"),

  createInvoice: (body: CreateInvoiceDto) =>
    fetchApi<InvoiceDto>("POST", "api/invoices", { body }),

  deleteInvoice: (id: string) => fetchApi<void>("DELETE", `api/invoices/${id}`),
};

export default invoicesService;
