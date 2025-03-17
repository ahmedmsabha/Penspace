"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormState } from "@/lib/types/form-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};
export function UpsertPostForm({ state, formAction }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (state?.message)
      if (state?.ok) {
        toast.success(state?.message);
      } else {
        toast.error(state?.message);
      }
  }, [state]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-slate-800">
          {state?.data?.postId ? "Update Post" : "Create New Post"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <input hidden name="postId" defaultValue={state?.data?.postId} />

          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-slate-700"
            >
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter the title of your post"
              defaultValue={state?.data?.title}
              className="w-full"
            />
            {!!state?.errors?.title && (
              <p className="text-sm text-red-500 animate-shake">
                {state.errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-sm font-medium text-slate-700"
            >
              Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your post content here..."
              rows={8}
              defaultValue={state?.data?.content}
              className="w-full resize-y min-h-[200px]"
            />
            {!!state?.errors?.content && (
              <p className="text-sm text-red-500 animate-shake">
                {state.errors.content}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="thumbnail"
                className="text-sm font-medium text-slate-700"
              >
                Thumbnail Image
              </Label>
              <Input
                id="thumbnail"
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files)
                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                }}
                className="w-full"
              />
              {!!state?.errors?.thumbnail && (
                <p className="text-sm text-red-500 animate-shake">
                  {state.errors.thumbnail}
                </p>
              )}
            </div>

            {(!!imageUrl || !!state?.data?.previousThumbnailUrl) && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200">
                <Image
                  src={(imageUrl || state?.data?.previousThumbnailUrl) ?? ""}
                  alt="Post thumbnail preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="tags"
              className="text-sm font-medium text-slate-700"
            >
              Tags
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="Enter tags (comma-separated)"
              defaultValue={state?.data?.tags}
              className="w-full"
            />
            {!!state?.errors?.tags && (
              <p className="text-sm text-red-500 animate-shake">
                {state.errors.tags}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="published"
              type="checkbox"
              name="published"
              defaultChecked={state?.data?.published === "on"}
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <Label
              htmlFor="published"
              className="text-sm font-medium text-slate-700"
            >
              Publish immediately
            </Label>
          </div>
          {!!state?.errors?.isPublished && (
            <p className="text-sm text-red-500 animate-shake">
              {state.errors.isPublished}
            </p>
          )}

          <div className="pt-4">
            <SubmitButton className="w-full">
              {state?.data?.postId ? "Update Post" : "Create Post"}
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
