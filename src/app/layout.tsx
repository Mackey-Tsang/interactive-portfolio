// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HomeButton from "@/components/HomeButton";
import ReturnButton from "@/components/ReturnButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Mackey Tsang — Portfolio",
  description: "Photography • Architecture • Cyber-Physical Design / Interactive Systems",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full bg-black text-white ${inter.variable}`}>
        {/* Global Home button */}
        <HomeButton />
        <ReturnButton />
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
