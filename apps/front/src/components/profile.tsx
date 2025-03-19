import { SessionUser } from "@/lib/session";
import {
  LogOutIcon,
  LayoutDashboardIcon,
  PencilIcon,
  FileTextIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  user: SessionUser;
};

export function Profile({ user }: Props) {
  // Create avatar initials from name or use default
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Popover>
      <PopoverTrigger className="outline-none">
        <div className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm">
            <AvatarImage
              className="object-cover"
              src={user.avatar}
              alt={user.name || "User"}
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-slate-700 dark:text-slate-200 hidden md:block">
            {user.name || "User"}
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0 overflow-hidden" align="end">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
          <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow">
            <AvatarImage
              className="object-cover"
              src={user.avatar}
              alt={user.name || "User"}
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">
              {user.name || "User"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Author</p>
          </div>
        </div>

        <nav className="py-2">
          <div className="px-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <LayoutDashboardIcon className="h-4 w-4 text-slate-500" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/user/create-post"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <PencilIcon className="h-4 w-4 text-slate-500" />
              <span>Create New Post</span>
            </Link>

            <Link
              href="/user/posts"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FileTextIcon className="h-4 w-4 text-slate-500" />
              <span>My Posts</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <SettingsIcon className="h-4 w-4 text-slate-500" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-2 px-1">
            <a
              href="/api/auth/signout"
              className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </a>
          </div>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
