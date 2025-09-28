import invoicesService from "@/src/services/invoicesServices";
import { CreateInvoiceDto } from "@/src/types/createInvoiceDto";
import { InvoiceDto } from "@/src/types/invoiceDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEditInvoice = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<InvoiceDto, Error, CreateInvoiceDto>({
    mutationFn: async (data) => invoicesService.editInvoice(id, data),
    onSuccess: async (data) => {
      toast.success(`Invoice ${data.invoiceNumber} updated successfully`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (err) => {
      const message = err?.message || "Something went wrong try again later";
      toast.error(message);
    },
  });
};

export default useEditInvoice;
