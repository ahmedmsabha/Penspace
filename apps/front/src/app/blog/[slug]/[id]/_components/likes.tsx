"use client";
import { SessionUser } from "@/lib/session";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { likePost, unLikePost } from "@/lib/actions/like.action";
import { getPostLikeData } from "@/lib/actions/like.action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  postId: number;
  user?: SessionUser;
  className?: string;
};

export function Like(props: Props) {
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", props.postId],
    queryFn: async () => await getPostLikeData(props.postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(props.postId),
    onSuccess: () => {
      refetchPostLikeData();
      toast.success("Added to your likes!");
    },
    onError: () => toast.error("Failed to like the post. Please try again."),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unLikePost(props.postId),
    onSuccess: () => {
      refetchPostLikeData();
      toast.success("Removed from your likes");
    },
    onError: () => toast.error("Failed to unlike the post. Please try again."),
  });

  const handleLikeAction = () => {
    if (!props.user) {
      toast.error("Please sign in to like posts");
      return;
    }

    if (data?.userLikedPost) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <div
      className={cn("flex items-center justify-start gap-2", props.className)}
    >
      <button
        onClick={handleLikeAction}
        disabled={likeMutation.isPending || unlikeMutation.isPending}
        className={cn(
          "group relative transition-transform active:scale-90",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:-translate-y-0.5 focus-visible:outline-none"
        )}
        aria-label={data?.userLikedPost ? "Unlike post" : "Like post"}
      >
        {data?.userLikedPost ? (
          <SolidHeartIcon
            className={cn(
              "w-6 h-6 text-rose-600",
              "transition-all duration-300",
              "group-hover:scale-110"
            )}
          />
        ) : (
          <HeartIcon
            className={cn(
              "w-6 h-6",
              "transition-all duration-300",
              "group-hover:text-rose-600 group-hover:scale-110",
              "group-hover:fill-rose-100"
            )}
          />
        )}
        {(likeMutation.isPending || unlikeMutation.isPending) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          data?.userLikedPost
            ? "text-rose-600"
            : "text-slate-600 dark:text-slate-400"
        )}
      >
        {data?.likeCount ?? 0}
      </span>
    </div>
  );
}
