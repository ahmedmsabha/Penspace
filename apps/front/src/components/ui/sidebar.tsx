"use client";

import { cn } from "@/lib/utils";
import {
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;

export function SideBar(props: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLDivElement>, () => setShow(false));

  return (
    <>
      <button
        aria-label="Toggle sidebar"
        className={props.triggerClassName}
        onClick={() => setShow((prev) => !prev)}
      >
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn(
          "w-64 absolute top-0 z-50 duration-300 transition-transform bg-white shadow-lg rounded-r-md min-h-screen",
          {
            "-translate-x-full": !show,
            "translate-x-0": show,
          }
        )}
        role="navigation"
        aria-hidden={!show}
      >
        {props.children}
      </div>
    </>
  );
}
