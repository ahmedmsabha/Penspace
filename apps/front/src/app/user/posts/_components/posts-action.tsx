import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  postId: number;
};

export function PostActions({ postId }: Props) {
  return (
    <div className="flex justify-center items-center gap-3 px-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700"
              asChild
            >
              <Link href={`/user/posts/${postId}/update`}>
                <PencilIcon className="w-4 h-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-yellow-600 text-white">
            <p>Edit Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              asChild
            >
              <Link href={`/user/posts/${postId}/delete`}>
                <TrashIcon className="w-4 h-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-red-600 text-white">
            <p>Delete Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
