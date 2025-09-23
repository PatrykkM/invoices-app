import React from "react";
import clsx from "clsx";

const textSize = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const textWeight = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const IacText = ({
  text,
  size = "base",
  weight = "normal",
  ...props
}: {
  text: string;
  size?: keyof typeof textSize;
  weight?: keyof typeof textWeight;
}) => {
  return (
    <p
      className={clsx(textSize[size], textWeight[weight], "text-base1000")}
      {...props}
    >
      {text}
    </p>
  );
};

export default IacText;
