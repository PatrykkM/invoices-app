import invoicesService from "@/src/services/invoicesServices";
import { CreateInvoiceDto } from "@/src/types/createInvoiceDto";
import { InvoiceDto } from "@/src/types/invoiceDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateInvoice = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation<InvoiceDto, Error, CreateInvoiceDto>({
    mutationFn: async (data) => invoicesService.createInvoice(data),
    onSuccess: async (data) => {
      toast.success(`Invoice ${data.invoiceNumber} created successfully`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      router.push("/invoices");
    },
    onError: (err) => {
      const message = err?.message || "Something went wrong try again later";
      toast.error(message);
    },
  });
};

export default useCreateInvoice;
