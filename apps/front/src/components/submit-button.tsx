"use client";
import { useFormStatus } from "react-dom";
import { Button, type buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";

export function SubmitButton({
  children,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={props.variant}
      type="submit"
      aria-disabled={pending}
      {...props}
    >
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
}
