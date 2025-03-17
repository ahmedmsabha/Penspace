import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/comments.action";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/model-types";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { MessageSquarePlusIcon } from "lucide-react";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};

export function AddComment(props: Props) {
  const [state, action] = useActionState(saveComment, undefined);

  useEffect(() => {
    if (state?.message)
      toast(state?.ok ? "Success" : "Oops!", {
        description: state?.message,
      });
    if (state?.ok) props.refetch();
  }, [props, state]);

  return (
    <Dialog open={state?.open}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto" variant="outline">
          <MessageSquarePlusIcon className="w-4 h-4 mr-2" />
          Leave a Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-xl font-semibold">
          Write Your Comment
        </DialogTitle>
        <DialogDescription className="text-slate-500 dark:text-slate-400">
          Share your thoughts and engage with the community
        </DialogDescription>
        <form action={action} className={cn("mt-4", props.className)}>
          <input hidden name="postId" defaultValue={props.postId} />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment</Label>
              <div className="relative">
                <Textarea
                  id="comment"
                  name="content"
                  placeholder="Write your comment here..."
                  className="min-h-[150px] resize-none"
                  required
                />
                {!!state?.errors?.content && (
                  <p className="absolute -bottom-6 left-0 text-sm text-red-500 animate-shake">
                    {state.errors.content}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Commenting as
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {props.user.name}
                </span>
              </div>
              <SubmitButton>Post Comment</SubmitButton>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
