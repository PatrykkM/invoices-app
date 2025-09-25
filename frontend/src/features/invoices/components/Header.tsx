import { Button } from "@/src/components/ui/button";
import IacText from "@/src/components/ui/IacText";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between">
      <IacText text="All Invoices" size="2xl" weight="bold" />
      <Button
        type="button"
        variant={"accent"}
        size={"lg"}
        className="self-start font-bold"
      >
        Create new invoice
      </Button>
    </div>
  );
};

export default Header;
