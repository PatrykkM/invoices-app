import { fetchApi } from "@/src/services/serviceBase";
import { InvoiceDto } from "../types/invoiceDto";

const invoicesService = {
  getInvoices: () => fetchApi<InvoiceDto[]>("GET", "api/invoices"),
};

export default invoicesService;
