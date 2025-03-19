"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/posts.action";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const InterceptorDeletePostPage = (props: Props) => {
  const params = use(props.params);
  const postId = parseInt(params.id);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      router.push("/user/posts");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  return (
    <AlertDialog open>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <ExclamationTriangleIcon className="h-6 w-6" />
            Delete Post
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            This action cannot be undone. This will permanently delete your post
            and remove all of its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-4">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <a href="/user/posts">Cancel</a>
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={handleDelete}
            >
              Delete Post
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage;
