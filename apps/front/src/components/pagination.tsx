import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
type PagenationProps = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};

export function Pagination({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  className,
}: PagenationProps) {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    totalPages,
    currentPage,
  });

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {currentPage !== 1 && (
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
          <Link
            href={`?page=${currentPage - 1}`}
            className="flex items-center justify-center w-full h-full"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn(
            "flex h-9 min-w-[2.25rem] items-center justify-center rounded-md text-sm font-medium transition-colors",
            {
              "border border-slate-300 text-slate-700 hover:bg-slate-100":
                currentPage !== page && page !== "...",
              "bg-blue-600 text-white shadow-sm hover:bg-blue-700":
                currentPage === page,
              "cursor-not-allowed text-slate-400": page === "...",
            }
          )}
        >
          {page === "..." ? (
            <span className="px-1">&#8230;</span>
          ) : (
            <Link
              href={`?page=${page}`}
              className="flex items-center justify-center w-full h-full"
            >
              {page}
            </Link>
          )}
        </button>
      ))}

      {currentPage !== totalPages && (
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
          <Link
            href={`?page=${currentPage + 1}`}
            className="flex items-center justify-center w-full h-full"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </button>
      )}
    </div>
  );
}
