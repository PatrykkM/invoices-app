"use client";

import { HomeIcon, LayoutList, LucideProps } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import IacText from "../ui/IacText";

type Routes = "/home" | "/invoices";

interface SideBarType {
  name: string;
  route: Routes;
  icon: React.ComponentType<LucideProps>;
}

const SideBar = () => {
  const router = useRouter();

  const sideBarItems: SideBarType[] = [
    { name: "Home", route: "/home", icon: HomeIcon },
    { name: "Invoices", route: "/invoices", icon: LayoutList },
  ];

  const onItemClick = (route: Routes) => {
    router.push(route);
  };

  return (
    <div className="flex h-screen flex-col gap-6 overflow-y-auto border-r p-6">
      {sideBarItems.map((item) => (
        <button
          key={item.name}
          onClick={() => onItemClick(item.route)}
          className="flex cursor-pointer flex-col items-center gap-2"
        >
          <div>
            <item.icon size={24} />
          </div>
          <IacText text={item.name} size="xs" weight="bold" />
        </button>
      ))}
    </div>
  );
};

export default SideBar;
