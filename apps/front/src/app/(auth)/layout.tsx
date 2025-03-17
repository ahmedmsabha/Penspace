// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (session) {
  //   redirect("/");
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
}
