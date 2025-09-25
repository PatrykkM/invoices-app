import IacText, { IacTextColor } from "@/src/components/ui/IacText";

const COL_WIDTHS: Record<number, string> = {
  1: "w-24", // Qty
  2: "w-28", // Price
};

const cellWrapperClass = (index: number) =>
  index === 0
    ? "flex-[3] basis-0 min-w-0"
    : `${COL_WIDTHS[index] ?? "w-24"} shrink-0 min-w-0 overflow-hidden`;

export const InvoicePreviewRow: React.FC<{
  items: string[];
  isHeader?: boolean;
}> = ({ items, isHeader }) => {
  const styles = singleRowStyles(isHeader);
  return (
    <div className={`flex w-full flex-row gap-2 p-4 ${styles.background}`}>
      {items.map((text, index) => (
        <div key={`${text}-${index}`} className={cellWrapperClass(index)}>
          <IacText
            text={text}
            size="sm"
            color={styles.text}
            className={cellTextClass(index)}
            weight={isHeader ? "bold" : "medium"}
          />
        </div>
      ))}
    </div>
  );
};

const singleRowStyles = (
  isHeader?: boolean,
): { text: IacTextColor; background: string } =>
  isHeader
    ? { text: "base100", background: "bg-accent200" }
    : { text: "base1000", background: "bg-white" };

const cellTextClass = (index: number, isHeader?: boolean) => {
  const base = "block truncate";
  const align = index === 0 ? "text-left" : "text-right";
  const weight = isHeader ? "font-bold" : "";
  return `${base} ${align} ${weight}`;
};
