"use client";

import { Button } from "@/src/components/ui/button";
import IacText from "@/src/components/ui/IacText";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <IacText text="All Invoices" size="2xl" weight="bold" />
      <Button
        type="button"
        variant={"accent"}
        size={"lg"}
        className="self-start font-bold"
        onClick={() => router.push("/home")}
      >
        Create new invoice
      </Button>
    </div>
  );
};

export default Header;
