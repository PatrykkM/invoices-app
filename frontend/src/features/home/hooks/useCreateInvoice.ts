import invoicesService from "@/src/services/invoicesServices";
import { CreateInvoiceDto } from "@/src/types/createInvoiceDto";
import { InvoiceDto } from "@/src/types/invoiceDto";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateInvoice = () =>
  useMutation<InvoiceDto, Error, CreateInvoiceDto>({
    mutationFn: async (data) => invoicesService.createInvoice(data),
    onSuccess: (data) => {
      toast.success(`Invoice ${data.invoiceNumber} created successfully`);
    },
    onError: (err) => {
      const message = err?.message || "Something went wrong try again later";
      toast.error(message);
    },
  });

export default useCreateInvoice;
