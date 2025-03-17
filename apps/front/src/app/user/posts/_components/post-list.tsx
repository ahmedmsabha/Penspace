import type { Post } from "@/lib/types/model-types";
import { PostListItem } from "./post-list-item";
import { Pagination } from "@/components/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
export function PostList({ posts, currentPage, totalPages }: Props) {
  return (
    <div className="divide-y divide-slate-200">
      <div className="grid grid-cols-8 px-6 py-4 text-sm font-medium text-slate-500 bg-slate-50/80">
        <div className="col-span-2">Post</div>
        <div>Details</div>
        <div>Created</div>
        <div>Status</div>
        <div className="text-center">Likes</div>
        <div className="text-center">Comments</div>
        <div className="text-center">Actions</div>
      </div>

      <div className="divide-y divide-slate-200">
        {posts.map((post) => (
          <PostListItem post={post} key={post.id} />
        ))}
      </div>

      <div className="px-6 py-4 bg-slate-50/50">
        <Pagination {...{ currentPage, totalPages }} />
      </div>
    </div>
  );
}
