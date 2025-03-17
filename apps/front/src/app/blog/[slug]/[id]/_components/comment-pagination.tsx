import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};

export function CommentPagination({
  pageNeighbors = 2,
  currentPage,
  totalPages,
  setCurrentPage,
  className,
}: Props) {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages)
      setCurrentPage(page);
  };

  return (
    <nav
      className={cn(className, "flex items-center justify-center gap-1")}
      aria-label="Comments pagination"
    >
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600"
        )}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          onClick={() => handleClick(page)}
          key={index}
          disabled={page === "..."}
          className={cn(
            "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
            "hover:bg-slate-100 dark:hover:bg-slate-800",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600",
            {
              "bg-slate-100 dark:bg-slate-800":
                currentPage !== page && page !== "...",
              "bg-blue-500 text-white hover:bg-blue-600": currentPage === page,
              "cursor-not-allowed": page === "...",
            }
          )}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page === "..." ? (
            <span aria-hidden="true">...</span>
          ) : (
            <span>{page}</span>
          )}
        </button>
      ))}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors",
          "hover:bg-slate-100 dark:hover:bg-slate-800",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600"
        )}
        aria-label="Go to next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
