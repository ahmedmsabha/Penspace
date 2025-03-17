"use server";

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetch-graphql";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gql-queries";
import { CommentEntity } from "../types/model-types";
import type { CreateCommentFormState } from "../types/form-state";
import { CommentFormSchema } from "../schemas/comment.schema";
export async function getPostComments({
  postId,
  take,
  skip,
}: {
  postId: number;
  take: number;
  skip: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.getPostCommentsCount as number,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  console.log({ data });

  if (data)
    return {
      message: "Success! Your comment saved!",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something went wrong!",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}
