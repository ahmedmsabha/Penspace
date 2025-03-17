"use client";
import { PropsWithChildren, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
type Props = PropsWithChildren;

export function DesktopNavbar({ children }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  return (
    <nav
      className={cn(
        "hidden fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 md:block",
        (isScrolled || !isHomePage) &&
          "bg-white/95 text-gray-900 shadow-lg backdrop-blur-lg"
      )}
    >
      <div className="flex px-8 py-5 items-center container mx-auto">
        {children}
      </div>
      <hr className="border-b border-gray-300/50" />
    </nav>
  );
}
