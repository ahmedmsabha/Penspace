import { DEFAULT_PAGE_SIZE } from "@/constants";
import { fetchUserPosts } from "@/lib/actions/posts.action";
import { NoPost } from "./_components/no-post";
import { PostList } from "./_components/post-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const UserPostPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Your Posts
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Manage and organize your blog posts
          </p>
        </div>
        <Button asChild className="gap-1.5">
          <Link href="/user/create-post">
            <PlusIcon className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-lg">
        {!posts || !posts.length ? (
          <NoPost />
        ) : (
          <PostList
            posts={posts}
            currentPage={page ? +page : 1}
            totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
          />
        )}
      </div>
    </div>
  );
};

export default UserPostPage;
