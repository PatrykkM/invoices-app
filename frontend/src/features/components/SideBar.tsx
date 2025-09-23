"use client";

import { HomeIcon, LayoutList, LucideProps } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
    { name: "All Invoices", route: "/invoices", icon: LayoutList },
  ];

  const onItemClick = (route: Routes) => {
    router.push(route);
  };

  return (
    <div className="flex h-screen flex-col gap-6 overflow-y-auto border-r bg-red-50 px-6 py-6">
      {sideBarItems.map((item) => (
        <button
          key={item.name}
          onClick={() => onItemClick(item.route)}
          className="flex cursor-pointer flex-col items-center gap-2"
        >
          <div>
            <item.icon size={24} />
          </div>
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
