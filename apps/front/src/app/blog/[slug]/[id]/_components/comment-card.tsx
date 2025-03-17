import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CommentEntity } from "@/lib/types/model-types";
import { UserIcon } from "@heroicons/react/20/solid";

type Props = {
  comment: CommentEntity;
};
export function CommentCard({ comment }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border-2 border-slate-200 dark:border-slate-600">
          <AvatarImage src={comment.author.avatar} className="object-cover" />
          <AvatarFallback className="bg-slate-100 dark:bg-slate-700">
            <UserIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-slate-900 dark:text-white">
            {comment.author.name}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        {comment.content}
      </p>
    </div>
  );
}
