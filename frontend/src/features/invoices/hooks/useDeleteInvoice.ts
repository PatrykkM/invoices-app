import invoicesService from "@/src/services/invoicesServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => invoicesService.deleteInvoice(id),
    onSuccess: () => {
      toast.success(`Invoice deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (err) => {
      const message = err?.message || "Something went wrong try again later";
      toast.error(message);
    },
  });
};

export default useDeleteInvoice;
