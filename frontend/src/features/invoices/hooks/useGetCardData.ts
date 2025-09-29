import { useGetInvoiceTotals } from "@/src/hooks/useGetInvoiceTotals";
import { InvoiceDto } from "@/src/types/invoiceDto";

export const useGetCardData = ({
  data,
}: {
  data: InvoiceDto[] | undefined;
}) => {
  const items = data?.flatMap((invoice) => invoice.items) || [];
  const { grossTotal, netTotal } = useGetInvoiceTotals({ items });

  const totalInvoices = data?.length ?? 0;

  const netRevenue = netTotal;
  const averageInvoiceCost = (
    totalInvoices > 0 ? grossTotal / totalInvoices : 0
  ).toFixed(2);

  const grossRevenue = grossTotal;

  return {
    totalInvoices,
    grossRevenue,
    netRevenue,
    averageInvoiceCost,
  };
};
