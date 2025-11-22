// src/app/work/cyber-physical/page.tsx
"use client";

import CyberProjectCards from "@/components/CyberProjectCards";

const PROJECTS = [
  {
    slug: "cy-phy-workshop",
    title: "Engineering Tomorrow",
    year: "2025",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Cy-Phy%20Workshop/p1.jpg?raw=true",
    variant: "blue" as const,
  },
  {
    slug: "soft-thresholds-veilspace",
    title: "Soft Thresholds - Veilspace",
    year: "2025",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Soft%20Thresholds%20%E2%80%93%20Veilspace/p11.JPG?raw=true",
    variant: "pink" as const,
  },
];

export default function CyberPhysicalPage() {
  return (
    <main className="min-h-dvh w-full bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-12 md:pt-14">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide py-10">
          Cyber-Physical Projects
        </h1>
      </div>

      <CyberProjectCards projects={PROJECTS} />
    </main>
  );
}
