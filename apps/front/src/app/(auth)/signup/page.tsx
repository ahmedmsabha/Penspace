import { SignUpForm } from "./_components/signup-form";
import { Suspense } from "react";

function SignUpFormWrapper() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading sign-up form...</div>}
    >
      <SignUpForm />
    </Suspense>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - Branding/Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 text-white justify-center items-center p-8">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">Join PenSpace Today</h1>
          <p className="text-lg mb-6">
            Create your account to start sharing your ideas, connect with other
            writers, and build your personal portfolio of content.
          </p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <blockquote className="text-white/90 italic">
              &ldquo;Joining PenSpace was one of the best decisions I made for
              my writing career. The community and tools have been
              invaluable.&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-400 flex items-center justify-center text-indigo-800 font-bold">
                MS
              </div>
              <div className="ml-3">
                <p className="font-medium">Mark Smith</p>
                <p className="text-sm text-white/70">Bestselling Author</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center md:hidden">
            <h1 className="text-2xl font-bold text-indigo-600">
              Join PenSpace
            </h1>
            <p className="text-gray-600">
              Create your account in just a few steps
            </p>
          </div>
          <SignUpFormWrapper />
        </div>
      </div>
    </div>
  );
}
