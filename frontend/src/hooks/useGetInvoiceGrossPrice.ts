import { useMemo } from "react";

export const useGetInvoiceGrossPrice = ({
  items,
}: {
  items: { netPrice?: number; quantity?: number }[] | undefined;
}): {
  totalPrice: number;
  tax: number;
} => {
  const totalPrice = useMemo(() => {
    if (!items) return 0;
    return items.reduce((acc, item) => {
      const net = item.netPrice ?? 0;
      const qty = item.quantity ?? 0;
      return acc + net * qty;
    }, 0);
  }, [items]);

  const tax = useMemo(() => {
    return totalPrice * 0.23;
  }, [totalPrice]);

  return { totalPrice, tax };
};
