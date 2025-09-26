import invoicesService from "@/src/services/invoicesServices";
import { useQuery } from "@tanstack/react-query";

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: invoicesService.getInvoices,
    staleTime: 60_000,
    gcTime: 60_000,
    retry: 1,
  });
};
