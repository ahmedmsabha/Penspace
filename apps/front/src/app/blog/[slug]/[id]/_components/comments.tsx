"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CommentCard } from "./comment-card";
import { CommentPagination } from "./comment-pagination";
import { CommentCardSkeleton } from "./comment-card-skeleton";
import { SessionUser } from "@/lib/session";
import { getPostComments } from "@/lib/actions/comments.action";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { AddComment } from "./add-comment";
import { MessageSquareIcon } from "lucide-react";

type Props = {
  postId: number;
  user?: SessionUser;
};

const Comments = ({ postId, user }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
        take: DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.count ?? 0) / DEFAULT_PAGE_SIZE);

  return (
    <section className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquareIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Comments
        </h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          ({data?.count ?? 0})
        </span>
      </div>

      {!!user && (
        <div className="mb-8">
          <AddComment user={user} postId={postId} refetch={refetch} />
        </div>
      )}

      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <CommentCardSkeleton key={index} />
            ))
          : data?.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </div>

      {!isLoading && data?.comments.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <CommentPagination
            currentPage={page}
            setCurrentPage={(p) => setPage(p)}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default Comments;
