"use client";

import ArchProjectCards from "@/components/ArchProjectCards";

const projects = [
  {
    title: "The Third Place",
    slug: "/work/architecture/third-place",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Third%20Ground/3.jpg?raw=true",
    year: "Project 2026 Mar - Jun",
    caption: "Youth / Playful / CBD",
  },
  {
    title: "Puzzle Block",
    slug: "/work/architecture/kinderspace",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Kinderspace/0.jpg?raw=true",
    year: "Project 2025 Nov - Jan",
    caption: "Kinderspace / Playful / Urban",
  },
  {
    title: "Awa Market Hall",
    slug: "/work/architecture/awa-market-hall",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Awa%20Market%20Hall/p1.jpg?raw=true",
    year: "Project 2025 Jul - Oct",
    caption: "Market / Co-working / Water",
  },
  {
    title: "The Overlapping Intersection",
    slug: "/work/architecture/overlapping-intersection",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/The%20Overlapping%20Intersection/p3.jpg?raw=true",
    year: "Young Designer Open Call 2024",
    caption: "Temporary / Communal / Experiential",
  },
  {
    title: "Lumen Vestige",
    slug: "/work/architecture/lumen-vestige",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Lumen%20Vestige/p1.jpg?raw=true",
    year: "120 Hours 2025",
    caption: "Public / Pavilion / Light",
  },
  {
    title: "The Forge Hub & Forum of Voices",
    slug: "/work/architecture/forge-hub",
    cover: "/architecture/p5.jpg",
    year: "Project 2024 Jul - Oct",
    caption: "Community / Structure / Light",
  },
  {
    title: "Inception - Architecture Media",
    slug: "/work/architecture/inception",
    cover: "https://github.com/Mackey-Tsang/photo-host/blob/main/Architecture%20Project/Inception/p27.jpg?raw=true",
    year: "Project 2023 Jul - Oct",
    caption: "Drawing System / Model Making / Speculative Design",
  },
];

export default function ArchitectureWorkPage() {
  return (
    <main className="mx-auto max-w p-6 bg-neutral-200 text-black">
      <ArchProjectCards
        projects={projects}
        className="max-w-5xl mx-auto px-0 py-12"  // <— match your current page width
      />
    </main>
  );
}
