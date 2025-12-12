"use client";

import ArchProjectCards from "@/components/ArchProjectCards";

const projects = [
    {
    title: "Awa Market Hall",
    slug: "/work/architecture/awa-market-hall",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Awa%20Market%20Hall/p1.jpg?raw=true",
    year: "Project 2025 Jul - Oct",
    caption: "Market / Co-working / Water",
  },
  {
    title: "The Overlapping Intersection",
    slug: "/work/architecture/overlapping-intersection",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Scene/p1.jpg?raw=true",
    year: "Young Designer Open Call 2024",
    caption: "Temporary / Communal / Experiential",
  },
  {
    title: "Lumen Vestige",
    slug: "/work/architecture/lumen-vestige",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Scene/p6.jpg?raw=true",
    year: "120 Hours 2025",
    caption: "Public / Pavilion / Light",
  },
  {
    title: "The Forge Hub & Forum of Voices",
    slug: "/work/architecture/forge-hub",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Scene/p5.jpg?raw=true",
    year: "Project 2024 Jul - Oct",
    caption: "Community / Structure / Light",
  },
];

export default function ArchitectureWorkPage() {
  return (
    <main className="mx-auto max-w p-6 bg-neutral-200 text-black">
      <ArchProjectCards
        projects={projects}
        className="max-w-6xl mx-auto px-0 py-12"  // <— match your current page width
      />
    </main>
  );
}
