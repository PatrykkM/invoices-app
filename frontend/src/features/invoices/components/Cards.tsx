import IacText from "@/src/components/ui/IacText";

interface CardData {
  label: string;
  value: string;
  color: string;
}

const cardData: CardData[] = [
  { label: "Total Invoices", value: "200", color: "bg-purple-500" },
  { label: "Gross Revenue", value: "150", color: "bg-green-500" },
  { label: "Net Revenue", value: "20", color: "bg-red-500" },
  { label: "Average Invoice Cost", value: "30", color: "bg-yellow-500" },
];

export const Cards = () => {
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
      <IacText text={data.value} size="xl" weight="bold" color="base1000" />
    </div>
  );
};

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-row gap-6">{children}</div>;
};
