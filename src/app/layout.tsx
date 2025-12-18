// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HomeButton from "@/components/HomeButton";
import ReturnButton from "@/components/ReturnButton";
import DotCursor from "@/components/DotCursor";

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
    <html lang="en">
      <body className={`bg-black text-white ${inter.variable}`}>
        <DotCursor opacity={0.8} />

        <HomeButton />
        <ReturnButton />

        <main>{children}</main>
      </body>
    </html>
  );
}
