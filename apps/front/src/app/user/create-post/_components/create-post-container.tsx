"use client";

import { useActionState } from "react";
import { UpsertPostForm } from "./upsert-post-form";
import { saveNewPost } from "@/lib/actions/posts.action";

const CreatePostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined);
  return <UpsertPostForm state={state} formAction={action} />;
};

export default CreatePostContainer;
