import { Skeleton } from "@/components/ui/skeleton";

export function CommentCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 p-4">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="h-10 w-10 rounded-full border-2 border-slate-200 dark:border-slate-600" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}
