import { SignInForm } from "./_components/signin-form";
import { Suspense } from "react";

function SignInFormWrapper() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading sign-in form...</div>}
    >
      <SignInForm />
    </Suspense>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - Branding/Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white justify-center items-center p-8">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg mb-6">
            Sign in to your account to access your personalized dashboard,
            create and manage content, and connect with other users.
          </p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <blockquote className="text-white/90 italic">
              &ldquo;PenSpace is an amazing platform that has transformed how I
              share my ideas with the world.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-blue-800 font-bold">
                JD
              </div>
              <div className="ml-3">
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-white/70">
                  Writer & Content Creator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center md:hidden">
            <h1 className="text-2xl font-bold text-blue-600">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your PenSpace account</p>
          </div>
          <SignInFormWrapper />
        </div>
      </div>
    </div>
  );
}
