"use client";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth.action";
import {
  EyeIcon,
  EyeOffIcon,
  XCircleIcon,
  UserIcon,
  GithubIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BACKEND_URL } from "@/constants";

export function SignUpForm() {
  const [state, action] = useActionState(signUp, null);
  const [showPassword, setShowPassword] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one letter", regex: /[a-zA-Z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character", regex: /[@$!%*?&]/ },
  ];

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm transition-all">
      {state?.message && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-start border-b border-red-100 dark:border-red-800">
          <XCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="p-6 md:p-8">
        <form action={action} className="space-y-5">
          {/* Name field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Full name
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <UserIcon className="h-5 w-5" />
              </div>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                defaultValue={state?.data?.name || ""}
                className={`pl-10 pr-4 py-2.5 h-11 w-full bg-white dark:bg-slate-900 border ${
                  state?.errors?.name
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                required
                autoComplete="name"
              />
            </div>
            {state?.errors?.name && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1.5">
                <XCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{state.errors.name[0]}</span>
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email address
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <Input
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                defaultValue={state?.data?.email || ""}
                className={`pl-10 pr-4 py-2.5 h-11 w-full bg-white dark:bg-slate-900 border ${
                  state?.errors?.email
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                required
                autoComplete="email"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1.5">
                <XCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{state.errors.email[0]}</span>
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                defaultValue={state?.data?.password || ""}
                className={`pl-10 pr-10 py-2.5 h-11 w-full bg-white dark:bg-slate-900 border ${
                  state?.errors?.password
                    ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1.5">
                <XCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{state.errors.password[0]}</span>
              </p>
            )}

            {/* Password requirements */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                Password must contain:
              </p>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {passwordRequirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-3.5 w-3.5 mr-1.5 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-blue-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-1">
            <SubmitButton className="w-full h-11 flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Create account
            </SubmitButton>
          </div>

          <div className="relative my-6">
            <Separator className="absolute inset-0 m-auto" />
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              className="h-11 flex items-center justify-center gap-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
              onClick={() => {
                window.location.href = `${BACKEND_URL}/auth/google/login`;
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              className="h-11 flex items-center justify-center gap-2 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
              onClick={() => {
                window.location.href = `${BACKEND_URL}/auth/github/login`;
              }}
            >
              <GithubIcon className="h-5 w-5" />
              GitHub
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
