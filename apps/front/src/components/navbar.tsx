import Link from "next/link";
import { getSession } from "@/lib/session";
import { AuthPanel } from "./auth-panel";
import { Profile } from "./profile";

export async function Navbar() {
  const session = await getSession();
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Pen Space</h1>
      <div className="flex gap-8 ml-auto md:items-center md:justify-center md:ml-auto px-4 flex-col md:flex-row">
        <Link
          href="/"
          className="px-5 py-3 text-base font-semibold rounded-lg hover:text-indigo-700 hover:bg-indigo-100 transition-all duration-200"
        >
          Blog
        </Link>
        <Link
          href="#about"
          className="px-5 py-3 text-base font-semibold rounded-lg hover:text-indigo-700 hover:bg-indigo-100 transition-all duration-200"
        >
          About
        </Link>
        <Link
          href="#contact"
          className="px-5 py-3 text-base font-semibold rounded-lg hover:text-indigo-700 hover:bg-indigo-100 transition-all duration-200"
        >
          Contact
        </Link>
        {session && session.user ? (
          <Profile user={session.user} />
        ) : (
          <AuthPanel />
        )}
      </div>
    </>
  );
}
