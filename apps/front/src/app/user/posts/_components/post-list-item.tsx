import type { Post } from "@/lib/types/model-types";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { PostActions } from "./posts-action";

type Props = {
  post: Post;
};
export function PostListItem({ post }: Props) {
  return (
    <div className="grid grid-cols-8 rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow transition-all duration-200 text-center bg-white">
      <div className="col-span-2 flex items-center">
        <div className="relative w-48 h-32">
          <Image
            src={post.thumbnail || "/no-image.png"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-lg font-medium line-clamp-1 px-2 text-slate-700">
          {post.title}
        </h3>
        <p className="text-sm line-clamp-2 px-2 text-slate-500">
          {post.content}
        </p>
      </div>

      <div className="flex justify-center items-center text-sm text-slate-600">
        {new Date(post.createdAt).toLocaleDateString()}
      </div>

      <div className="flex justify-center items-center">
        {post.published ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckIcon className="w-4 h-4 mr-1" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <XMarkIcon className="w-4 h-4 mr-1" />
            Draft
          </span>
        )}
      </div>

      <div className="flex justify-center items-center">
        <span className="inline-flex items-center text-sm text-slate-600">
          {post._count.likes}
        </span>
      </div>

      <div className="flex justify-center items-center">
        <span className="inline-flex items-center text-sm text-slate-600">
          {post._count.comments}
        </span>
      </div>

      <PostActions postId={post.id} />
    </div>
  );
}
