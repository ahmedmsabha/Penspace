"use server";

import { authFetchGraphQL, fetchGraphQL } from "../fetch-graphql";
import {
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  GET_POSTS,
  GET_POST_BY_ID,
  GET_USER_POSTS,
  UPDATE_POST_MUTATION,
} from "../gql-queries";
import { Post } from "@/lib/types/model-types";
import { transformTakeSkip } from "../helpers";
import { print } from "graphql";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import type { PostFormState } from "../types/form-state";
import { PostFormSchema } from "../schemas/post.schema";
import { uploadThumbnail } from "../upload";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const validPage = isNaN(Number(page)) ? undefined : Number(page);
  const validPageSize = isNaN(Number(pageSize)) ? undefined : Number(pageSize);

  let { skip, take } = transformTakeSkip({
    page: validPage,
    pageSize: validPageSize,
  });

  skip = skip !== null && !isNaN(skip) ? skip : 0;
  take = take !== null && !isNaN(take) ? take : DEFAULT_PAGE_SIZE;

  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });

  return { posts: data.posts as Post[], totalPosts: data.postsCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

  return data.post as Post;
};

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    take,
    skip,
  });

  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  let thumbnailUrl = "";
  if (
    validatedFields.data.thumbnail &&
    validatedFields.data.thumbnail instanceof File &&
    validatedFields.data.thumbnail.size > 0
  )
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);

  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    input: {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      tags: validatedFields.data.tags,
      published: validatedFields.data.published,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) return { message: "Success! New Post Saved", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function updatePost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = PostFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const { thumbnail, ...inputs } = validatedFields.data;

  let thumbnailUrl = "";
  if (thumbnail) thumbnailUrl = await uploadThumbnail(thumbnail);

  const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
    input: {
      ...inputs,
      ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
    },
  });

  if (data) return { message: "Success! The Post Updated", ok: true };
  return {
    message: "Oops, Something Went Wrong",
    data: Object.fromEntries(formData.entries()),
  };
}

export async function deletePost(postId: number) {
  const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
    postId,
  });

  return data.deletePost;
}
