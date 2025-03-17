import { fetchPostById } from "@/lib/actions/posts.action";
import UpdatePostContainer from "./_components/update_post_container";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/user/posts">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Update Post
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-600 ml-12">
            Make changes to your post
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-lg">
        <UpdatePostContainer post={post} />
      </div>
    </div>
  );
};

export default UpdatePostPage;
