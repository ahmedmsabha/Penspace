import Link from "next/link";
import { Button } from "./ui/button";
import { UserIcon, UserPlusIcon } from "lucide-react";

export function AuthPanel() {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors"
      >
        <UserIcon className="h-4 w-4" />
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button
        variant="default"
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 rounded-lg px-4 py-2 shadow-sm transition-colors"
      >
        <UserPlusIcon className="h-4 w-4" />
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
