import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavbarContainer } from "@/components/navbar-container";
import { Navbar } from "@/components/navbar";
import QueryProvider from "./query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Penspace",
  description:
    "Penspace is a platform for creating and sharing posts, articles, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
          {children}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
