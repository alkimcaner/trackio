import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/app/providers";

export const dynamic = "force-static";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Trackio",
  description:
    "Track your movies and games, discover new ones, and share your favorites with friends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
