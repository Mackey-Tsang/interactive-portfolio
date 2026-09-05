// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
// TypeScript may complain about side-effect CSS imports when no ambient
// declaration exists. Ignore the type check for this import.
// @ts-ignore
import "./globals.css";
import { Inter } from "next/font/google";
import HomeButton from "@/components/HomeButton";
import ReturnButton from "@/components/ReturnButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });


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

        {/* hidden below the md breakpoint — disabled entirely on mobile,
            not just visually hidden (display:none removes it from render,
            regardless of any position:fixed HomeButton uses internally) */}
        <div className="hidden md:block">
          <HomeButton />
        </div>
        <ReturnButton />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
