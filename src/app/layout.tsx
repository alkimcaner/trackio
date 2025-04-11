import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/app/providers";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

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
      <body className={`${poppins.className} flex min-h-screen flex-col`}>
        <Providers>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
