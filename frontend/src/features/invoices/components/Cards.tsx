import IacText from "@/src/components/ui/IacText";
import { Skeleton } from "@/src/components/ui/skeleton";
import { InvoiceDto } from "@/src/types/invoiceDto";
import { useGetCardData } from "../hooks/useGetCardData";

interface CardData {
  label: string;
  value: number | string;
  color: string;
}

export const Cards = ({
  data,
  isLoading,
}: {
  data: InvoiceDto[] | undefined;
  isLoading?: boolean;
}) => {
  const { totalInvoices, grossRevenue, netRevenue, averageInvoiceCost } =
    useGetCardData({ data });

  const cardData: CardData[] = [
    { label: "Total Invoices", value: totalInvoices, color: "bg-purple-500" },
    { label: "Gross Revenue", value: grossRevenue, color: "bg-green-500" },
    { label: "Net Revenue", value: netRevenue, color: "bg-red-500" },
    {
      label: "Average Invoice Cost",
      value: averageInvoiceCost,
      color: "bg-yellow-500",
    },
  ];

  if (isLoading) return <CardsSkeleton />;

  return (
    <CardWrapper>
      {cardData.map((i) => (
        <SingleCard key={i.label} data={i} />
      ))}
    </CardWrapper>
  );
};

const SingleCard = ({ data }: { data: CardData }) => {
  return (
    <div className="flex max-w-[230px] flex-1 flex-col rounded-xl border border-base100 p-3">
      <div className="flex items-center gap-2">
        <div className={`${data.color} h-2 w-2 rounded-full`} />
        <IacText
          text={data.label}
          size="sm"
          color="base400"
          weight="semibold"
        />
      </div>
      <IacText
        text={data.value.toString()}
        size="xl"
        weight="bold"
        color="base1000"
        truncate
      />
    </div>
  );
};

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-row gap-6">{children}</div>;
};

const CardsSkeleton = () => {
  return (
    <CardWrapper>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex max-w-[230px] flex-1 flex-col gap-4 rounded-xl border border-base100 p-3"
        >
          <div className="flex items-center gap-2">
            <Skeleton className={`h-2 w-2 rounded-full`} />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-4 w-1/6" />
        </div>
      ))}
    </CardWrapper>
  );
};
