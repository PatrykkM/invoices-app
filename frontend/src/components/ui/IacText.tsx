import React from "react";
import clsx from "clsx";

const textSize = {
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
};

const textColor = {
  base100: "text-base1000",
  base300: "text-base300",
  base400: "text-base400",
  accent200: "text-accent200",
  base1000: "text-base1000",
};

const IacText = ({
  text,
  size = "base",
  weight = "normal",
  color = "base1000",
  className,
  ...props
}: {
  text: string;
  size?: keyof typeof textSize;
  weight?: keyof typeof textWeight;
  className?: string;
  color?: keyof typeof textColor;
}) => {
  return (
    <p
      className={clsx(
        textSize[size],
        textWeight[weight],
        textColor[color],
        className,
      )}
      {...props}
    >
      {text}
    </p>
  );
};

export default IacText;
