import CreatePostContainer from "./_components/create-post-container";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CreatePostPage() {
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
              Create New Post
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-600 ml-12">
            Share your thoughts with the world
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-lg">
        <CreatePostContainer />
      </div>
    </div>
  );
}
