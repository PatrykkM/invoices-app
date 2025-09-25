import React from "react";
import clsx from "clsx";

const textSize = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

const textWeight = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const textColor = {
  base100: "text-base100",
  base300: "text-base300",
  base400: "text-base400",
  accent200: "text-accent200",
  base1000: "text-base1000",
};

export type IacTextColor = keyof typeof textColor;

const IacText = ({
  text,
  size = "base",
  weight = "normal",
  color = "base1000",
  className,
  truncate = false,
  ...props
}: {
  text: string;
  size?: keyof typeof textSize;
  weight?: keyof typeof textWeight;
  className?: string;
  color?: keyof typeof textColor;
  truncate?: boolean;
}) => {
  return (
    <p
      className={clsx(
        textSize[size],
        textWeight[weight],
        textColor[color],
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {text}
    </p>
  );
};

export default IacText;
