import { PropsWithChildren } from "react";
import { SideBar } from "./ui/sidebar";
import { Bars3Icon } from "@heroicons/react/16/solid";

type Props = PropsWithChildren;

export function MobileNavbar({ children }: Props) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <SideBar
        triggerIcon={<Bars3Icon className="w-6 h-6 text-gray-700" />}
        triggerClassName="absolute top-3 left-3 focus:outline-none"
      >
        {children}
      </SideBar>
    </div>
  );
}
