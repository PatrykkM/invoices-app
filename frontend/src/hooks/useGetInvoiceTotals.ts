import { useMemo } from "react";

const round2 = (n: number) => Math.round(n * 100) / 100;

export const useGetInvoiceTotals = ({
  items,
  vatRate = 0.23,
}: {
  items?: { netPrice?: number; quantity?: number }[];
  vatRate?: number;
}) => {
  const netTotal = useMemo(() => {
    if (!items?.length) return 0;
    const sum = items.reduce(
      (acc, { netPrice = 0, quantity = 0 }) => acc + netPrice * quantity,
      0,
    );
    return round2(sum);
  }, [items]);

  const taxTotal = useMemo(
    () => round2(netTotal * vatRate),
    [netTotal, vatRate],
  );
  const grossTotal = useMemo(
    () => round2(netTotal + taxTotal),
    [netTotal, taxTotal],
  );

  return { netTotal, taxTotal, grossTotal };
};
