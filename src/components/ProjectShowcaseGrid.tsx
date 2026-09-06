// src/components/ProjectShowcaseGrid.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";

export interface ShowcaseProject {
  id: string;
  name: string;
  /** Path to the project image — e.g. "/showcase/sediment-ring.jpg" under
   *  your Next.js "public" folder. */
  image: string;
  /** Where "View Project" links to — e.g. "/work/architecture/the-third-ground". */
  href: string;
}

interface ProjectShowcaseGridProps {
  projects: ShowcaseProject[];
  className?: string;
}

export default function ProjectShowcaseGrid({ projects, className = "" }: ProjectShowcaseGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Defensive: a bad reference upstream (e.g. a typo'd key when pulling a
  // project out of a lookup table) silently produces `undefined` in JS
  // rather than throwing there — this is where that would otherwise crash
  // as "Cannot read properties of undefined". Filter those out and say so,
  // instead of taking the whole page down.
  const validProjects = useMemo(() => {
    const missing = projects.reduce((n, p) => (p ? n : n + 1), 0);
    if (missing > 0) {
      // eslint-disable-next-line no-console
      console.error(
        `[ProjectShowcaseGrid] ${missing} entr${missing === 1 ? "y was" : "ies were"} undefined in the "projects" ` +
          `array passed in — check for a mistyped key when referencing a project (e.g. from a lookup table like ` +
          `PROJECT_POOL) in whatever component renders this grid.`
      );
    }
    return projects.filter((p): p is ShowcaseProject => Boolean(p));
  }, [projects]);

  const open = validProjects.find((p) => p.id === openId) ?? null;

  return (
    <div className={className}>
      {/* 1 column on mobile, up to 3 on larger screens */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {validProjects.map((p) => (
          <div key={p.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.name}
              draggable={false}
              onClick={() => setOpenId(p.id)}
              className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() =>
                // eslint-disable-next-line no-console
                console.error(
                  `[ProjectShowcaseGrid] Failed to load image for "${p.name}" at "${p.image}". ` +
                    `Check the file exists under your Next.js "public" folder at that exact path.`
                )
              }
            />
            {/* legibility scrim so the name/link read over any image */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <p className="absolute bottom-3 left-4 font-mono text-sm text-white drop-shadow">{p.name}</p>

            <Link
              href={p.href}
              className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.1em] text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              View Project →
            </Link>
          </div>
        ))}
      </div>

      <Lightbox open={open !== null} src={open?.image} alt={open?.name} onClose={() => setOpenId(null)} />
    </div>
  );
}
